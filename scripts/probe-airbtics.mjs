// One-off probe: asks Airbtics, for every city × bedrooms combination, whether
// it returns a usable revenue figure. Mirrors the logic in
// app/api/estimate/route.ts exactly so the result reflects what the live form
// would actually get.
//
// Note: the route maps ALL property types to "entire_home", so property type
// does not change the Airbtics query — only city and bedrooms do. That's why
// this probes 4 cities × 6 bedroom buckets = 24 combos, not × property type.
//
// Run: node scripts/probe-airbtics.mjs

import { readFileSync } from "node:fs";

// Load AIRBTICS_API_KEY from .env.local without extra deps.
const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const API_KEY = Object.fromEntries(
  env
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    })
).AIRBTICS_API_KEY;

if (!API_KEY) {
  console.error("AIRBTICS_API_KEY not found in .env.local");
  process.exit(1);
}

const AIRBTICS_BASE =
  "https://crap0y5bx5.execute-api.us-east-2.amazonaws.com/prod";

const CITY_QUERIES = {
  riyadh: ["Riyadh", "Ar-Riyadh", "Al-Riyadh"],
  jeddah: ["Jeddah", "Jiddah", "Jedda"],
  dammam: ["Dammam", "Ad-Dammam", "Ad Dammam", "Eastern Province"],
  khobar: ["Al Khobar", "Al-Khobar", "Khobar", "Al-Khubar"],
};

const BEDROOMS = [0, 1, 2, 3, 4, 5];

// Space requests out — if the 403s are rate limiting rather than plan limits,
// a delay between calls will make the "forbidden" markets start succeeding.
const DELAY_MS = 3000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function searchOnce(query) {
  await sleep(DELAY_MS);
  const url = `${AIRBTICS_BASE}/markets/search?query=${encodeURIComponent(
    query
  )}&country_code=SA`;
  const res = await fetch(url, { headers: { "x-api-key": API_KEY } });
  if (!res.ok) {
    console.log(
      `   [search "${query}" → HTTP ${res.status}: ${(
        await res.text().catch(() => "")
      ).slice(0, 120)}]`
    );
    return null;
  }
  const data = await res.json();
  return Array.isArray(data)
    ? data
    : data?.message ?? data?.markets ?? data?.results ?? data?.data ?? [];
}

async function findMarketId(city) {
  for (const query of CITY_QUERIES[city] ?? [city]) {
    const list = await searchOnce(query);
    if (!list || !list.length) continue;
    const isSA = (m) => m.country_code === "SA" || m.countryCode === "SA";
    const exact = list.find(
      (m) =>
        isSA(m) &&
        typeof m.name === "string" &&
        m.name.toLowerCase() === query.toLowerCase()
    );
    const verified = list.find((m) => isSA(m) && m.verified === true);
    const best = exact ?? verified ?? list.find(isSA) ?? list[0];
    const id = best.id ?? best.market_id ?? best.marketId;
    if (typeof id === "number")
      return { id, name: best.name, via: query };
  }
  return null;
}

async function fetchSummary(marketId, bedrooms) {
  await sleep(DELAY_MS);
  const bedroomFilter =
    bedrooms === 0 ? ["0"] : bedrooms >= 5 ? ["5", "6+"] : [String(bedrooms)];
  const res = await fetch(`${AIRBTICS_BASE}/markets/summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify({
      market_id: marketId,
      filters: { property_type: ["entire_home"], bedrooms: bedroomFilter },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, status: res.status, body: body.slice(0, 160) };
  }
  const data = await res.json();
  const msg = data.message ?? data;
  return {
    ok: true,
    revenue: typeof msg.revenue === "number" ? msg.revenue : null,
    listings: msg.active_listings_count ?? null,
    occupancy: msg.occupancy ?? null,
  };
}

const coverage = {};

for (const city of Object.keys(CITY_QUERIES)) {
  const market = await findMarketId(city);
  if (!market) {
    console.log(`\n${city.toUpperCase()}: ✗ no market_id resolved`);
    coverage[city] = [];
    continue;
  }
  console.log(
    `\n${city.toUpperCase()}  →  market_id ${market.id} ("${market.name}", via "${market.via}")`
  );
  const available = [];
  for (const bedrooms of BEDROOMS) {
    const r = await fetchSummary(market.id, bedrooms);
    const label = bedrooms === 0 ? "studio" : `${bedrooms} bdr`;
    if (!r.ok) {
      console.log(
        `   ${label.padEnd(8)} ✗  HTTP ${r.status}  ${r.body ?? ""}`
      );
    } else if (r.revenue == null) {
      console.log(
        `   ${label.padEnd(8)} ✗  no revenue  (listings: ${r.listings ?? "?"})`
      );
    } else {
      available.push(bedrooms);
      console.log(
        `   ${label.padEnd(8)} ✓  revenue ${Math.round(
          r.revenue
        )}  listings ${r.listings ?? "?"}  occ ${r.occupancy ?? "?"}`
      );
    }
  }
  coverage[city] = available;
}

console.log("\n\n=== COVERAGE MAP (bedroom values with real data) ===");
console.log(JSON.stringify(coverage, null, 2));
