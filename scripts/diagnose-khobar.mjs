// Diagnostic: ONE Airbtics search call for "Khobar", dumps the full raw
// response so we can see whether Airbtics has the market at all — and if so,
// why findMarketId() in app/api/estimate/route.ts didn't match it.
//
// Exactly 1 API call (~$0.25). Run: node scripts/diagnose-khobar.mjs

import { readFileSync } from "node:fs";

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

const AIRBTICS_BASE =
  "https://crap0y5bx5.execute-api.us-east-2.amazonaws.com/prod";

const url = `${AIRBTICS_BASE}/markets/search?query=${encodeURIComponent(
  "Khobar"
)}&country_code=SA`;

console.log(`GET ${url}\n`);
const res = await fetch(url, { headers: { "x-api-key": API_KEY } });
console.log(`HTTP ${res.status}\n`);

const data = await res.json();
console.log("── raw response ──");
console.log(JSON.stringify(data, null, 2));

const list = Array.isArray(data)
  ? data
  : data?.message ?? data?.markets ?? data?.results ?? data?.data ?? [];

if (Array.isArray(list) && list.length) {
  console.log(`\n── ${list.length} market(s), key fields ──`);
  for (const m of list) {
    console.log(
      `  id=${m.id ?? m.market_id ?? m.marketId}  name=${JSON.stringify(
        m.name
      )}  country_code=${m.country_code ?? m.countryCode}  verified=${
        m.verified
      }`
    );
  }
} else {
  console.log("\n(no market list found in the response)");
}
