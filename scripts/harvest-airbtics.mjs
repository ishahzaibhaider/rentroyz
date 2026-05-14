// ONE-TIME harvest: pulls every city × bedrooms summary from Airbtics and
// writes them to lib/airbtics-snapshot.json. After this runs, /api/estimate
// serves from that snapshot and never calls Airbtics again — so the API cost
// is a deliberate one-off (~$6.50), not a per-visitor leak.
//
// Airbtics bills ~$0.25 per call. Budget cap: $8. This script HARD-STOPS at
// MAX_CALLS so it physically cannot overspend, even if something loops.
//
// Prerequisite: the Airbtics account must have credit. Run the probe first
// (node scripts/probe-airbtics.mjs) — if it still says "insufficient_credits",
// do NOT run this; the account needs funding first.
//
// Run: node scripts/harvest-airbtics.mjs

import { readFileSync, writeFileSync } from "node:fs";

// ── Budget guard ───────────────────────────────────────────────────────────
const COST_PER_CALL = 0.25;
const MAX_CALLS = 30; // hard stop at $7.50 — leaves headroom under the $8 cap
let callCount = 0;

function guardedFetch(url, init) {
  if (callCount >= MAX_CALLS) {
    throw new Error(
      `BUDGET GUARD: reached MAX_CALLS (${MAX_CALLS} ≈ $${(
        MAX_CALLS * COST_PER_CALL
      ).toFixed(2)}). Aborting before overspend.`
    );
  }
  callCount++;
  return fetch(url, init);
}

// ── Setup ──────────────────────────────────────────────────────────────────
const env = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const API_KEY = Object.fromEntries(
  env
    .split("\n")
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [
        l.slice(0, i).trim(),
        l.slice(i + 1).trim().replace(/^["']|["']$/g, ""),
      ];
    })
).AIRBTICS_API_KEY;

if (!API_KEY) {
  console.error("AIRBTICS_API_KEY not found in .env.local");
  process.exit(1);
}

const AIRBTICS_BASE =
  "https://crap0y5bx5.execute-api.us-east-2.amazonaws.com/prod";

// Market IDs already resolved by the probe — hardcoded to save 3 search calls.
// Khobar wasn't resolvable while the account was out of credits, so it still
// needs a live search.
const KNOWN_MARKET_IDS = {
  riyadh: 191171,
  jeddah: 191170,
  dammam: 314062,
};
const KHOBAR_QUERIES = ["Al Khobar", "Al-Khobar", "Khobar", "Al-Khubar"];
const CITIES = ["riyadh", "jeddah", "dammam", "khobar"];
const BEDROOMS = [0, 1, 2, 3, 4, 5];
const DELAY_MS = 800;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function resolveKhobar() {
  for (const query of KHOBAR_QUERIES) {
    await sleep(DELAY_MS);
    const res = await guardedFetch(
      `${AIRBTICS_BASE}/markets/search?query=${encodeURIComponent(
        query
      )}&country_code=SA`,
      { headers: { "x-api-key": API_KEY } }
    );
    if (!res.ok) {
      console.log(`   search "${query}" → HTTP ${res.status}`);
      continue;
    }
    const data = await res.json();
    const list = Array.isArray(data)
      ? data
      : data?.message ?? data?.markets ?? data?.results ?? data?.data ?? [];
    const isSA = (m) => m.country_code === "SA" || m.countryCode === "SA";
    const best =
      list.find(
        (m) =>
          isSA(m) &&
          typeof m.name === "string" &&
          m.name.toLowerCase() === query.toLowerCase()
      ) ??
      list.find((m) => isSA(m) && m.verified === true) ??
      list.find(isSA) ??
      list[0];
    const id = best?.id ?? best?.market_id ?? best?.marketId;
    if (typeof id === "number") {
      console.log(`   resolved Khobar → market_id ${id} ("${best.name}")`);
      return id;
    }
  }
  console.log("   ⚠ could not resolve Khobar — snapshot will omit it");
  return null;
}

async function fetchSummary(marketId, bedrooms) {
  await sleep(DELAY_MS);
  const bedroomFilter =
    bedrooms === 0 ? ["0"] : bedrooms >= 5 ? ["5", "6+"] : [String(bedrooms)];
  const res = await guardedFetch(`${AIRBTICS_BASE}/markets/summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    body: JSON.stringify({
      market_id: marketId,
      filters: { property_type: ["entire_home"], bedrooms: bedroomFilter },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.log(`   ✗ HTTP ${res.status} ${body.slice(0, 120)}`);
    return null;
  }
  const data = await res.json();
  // Store the full `message` object — parseAirbticsResponse() in the route
  // needs revenue + the percentile blocks + occupancy.
  return data.message ?? data;
}

// ── Run ────────────────────────────────────────────────────────────────────
console.log(
  `Harvest starting. Hard cap: ${MAX_CALLS} calls ($${(
    MAX_CALLS * COST_PER_CALL
  ).toFixed(2)}).\n`
);

const markets = { ...KNOWN_MARKET_IDS };

try {
  console.log("Resolving Khobar market_id…");
  const khobarId = await resolveKhobar();
  if (khobarId) markets.khobar = khobarId;

  const summaries = {};
  for (const city of CITIES) {
    const marketId = markets[city];
    if (!marketId) {
      console.log(`\n${city.toUpperCase()}: skipped (no market_id)`);
      continue;
    }
    console.log(`\n${city.toUpperCase()} (market_id ${marketId})`);
    summaries[city] = {};
    for (const bedrooms of BEDROOMS) {
      const msg = await fetchSummary(marketId, bedrooms);
      const label = bedrooms === 0 ? "studio" : `${bedrooms} bdr`;
      if (msg && typeof msg.revenue === "number") {
        summaries[city][bedrooms] = msg;
        console.log(`   ${label.padEnd(8)} ✓ revenue ${Math.round(msg.revenue)}`);
      } else if (msg) {
        console.log(`   ${label.padEnd(8)} — no revenue, skipped`);
      }
    }
  }

  const snapshot = {
    harvestedAt: new Date().toISOString(),
    note: "Static Airbtics snapshot. /api/estimate serves from this — no live API calls. Re-run scripts/harvest-airbtics.mjs to refresh.",
    markets,
    summaries,
  };
  const outPath = new URL("../lib/airbtics-snapshot.json", import.meta.url);
  writeFileSync(outPath, JSON.stringify(snapshot, null, 2) + "\n");

  console.log(
    `\n✓ Wrote lib/airbtics-snapshot.json — ${callCount} calls used (≈ $${(
      callCount * COST_PER_CALL
    ).toFixed(2)}).`
  );
} catch (err) {
  console.error(`\n✗ ${err.message}`);
  console.error(
    `Calls used before abort: ${callCount} (≈ $${(
      callCount * COST_PER_CALL
    ).toFixed(2)}).`
  );
  process.exit(1);
}
