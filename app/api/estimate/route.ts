import { NextResponse } from "next/server";

const AIRBTICS_BASE =
  "https://crap0y5bx5.execute-api.us-east-2.amazonaws.com/prod";

// Each city slug maps to one or more query strings to try against
// /markets/search?query=...&country_code=SA. Saudi cities sometimes have
// multiple name variants (e.g., "Dammam" / "Ad-Dammam") and Airbtics stores
// them under specific spellings — we try each in turn until one hits.
const CITY_QUERIES: Record<string, string[]> = {
  riyadh: ["Riyadh", "Ar-Riyadh", "Al-Riyadh"],
  jeddah: ["Jeddah", "Jiddah", "Jedda"],
  dammam: ["Dammam", "Ad-Dammam", "Ad Dammam", "Eastern Province"],
};

// Airbtics has no Al Khobar market — confirmed via the search API, which
// returns an empty list for every Khobar spelling. Al Khobar is part of the
// Dammam–Dhahran–Khobar metropolitan area (one continuous short-stay rental
// market), so Khobar requests resolve to — and share the cache with —
// Dammam's market.
const CITY_MARKET_ALIAS: Record<string, string> = {
  khobar: "dammam",
};

// Airbtics returns revenue/ADR in USD. We display in SAR (pegged ~3.75 SAR/USD).
const USD_TO_SAR = 3.75;

// Our four property type labels are all "whole apartment" rentals on Airbnb,
// so they all map to "entire_home". Bedrooms count drives the distinction.
const PROPERTY_TYPE_MAP: Record<string, string[]> = {
  apartment: ["entire_home"],
  villa: ["entire_home"],
  townhouse: ["entire_home"],
  studio: ["entire_home"],
};

// Furnishing isn't an Airbtics filter — apply as a post-multiplier on revenue
// and ADR. Premium listings command ~15-20% more nightly. Tune with the client.
const FURNISHING_MULTIPLIER: Record<string, number> = {
  standard: 1.0,
  premium: 1.18,
};

// Mock baselines (used only when AIRBTICS_API_KEY isn't set).
const CITY_BASELINE: Record<string, number> = {
  riyadh: 38000,
  jeddah: 34000,
  dammam: 28000,
  khobar: 30000,
};

const PROPERTY_TYPE_MOCK_MULT: Record<string, number> = {
  apartment: 1.0,
  villa: 1.45,
  townhouse: 1.2,
  studio: 0.7,
};

type EstimateInput = {
  city: string;
  // District is collected by the form and sent in the request body, but the
  // Airbtics API resolves figures at the city/market level — there is no
  // district filter — so it does not (yet) affect the estimate.
  district?: string;
  propertyType: string;
  bedrooms: number;
  furnishing: string;
};

// In-memory cache for market lookups. Survives within a single serverless
// container; cold starts re-fetch. That's fine — saves on most calls.
const marketCache = new Map<string, number>();

async function searchOnce(query: string, apiKey: string) {
  const url = `${AIRBTICS_BASE}/markets/search?query=${encodeURIComponent(
    query
  )}&country_code=SA`;
  const res = await fetch(url, { headers: { "x-api-key": apiKey } });
  if (!res.ok) {
    console.error(
      "[estimate] markets/search failed",
      res.status,
      "for query:",
      query
    );
    return null;
  }
  const data = await res.json();
  // Airbtics wraps results in `message`. Fall through to other shapes defensively.
  const list: Record<string, unknown>[] = Array.isArray(data)
    ? data
    : ((data?.message ??
        data?.markets ??
        data?.results ??
        data?.data ??
        []) as Record<string, unknown>[]);
  return list;
}

async function findMarketId(
  city: string,
  apiKey: string
): Promise<number | null> {
  // Resolve any city alias first (e.g. khobar → dammam) so the cache key,
  // the query list, and the lookup all use the market we actually hit.
  const resolved = CITY_MARKET_ALIAS[city] ?? city;

  const cached = marketCache.get(resolved);
  if (cached) return cached;

  const queries = CITY_QUERIES[resolved] ?? [resolved];

  for (const query of queries) {
    const list = await searchOnce(query, apiKey);
    if (!list || !list.length) continue;

    // Prefer a verified, exact-name match on the right country.
    const isSA = (m: Record<string, unknown>) =>
      m.country_code === "SA" || m.countryCode === "SA";

    const exact = list.find(
      (m) =>
        isSA(m) &&
        typeof m.name === "string" &&
        m.name.toLowerCase() === query.toLowerCase()
    );
    const verified = list.find((m) => isSA(m) && m.verified === true);
    const anySA = list.find(isSA);
    const best = exact ?? verified ?? anySA ?? list[0];

    const id = (best.id ?? best.market_id ?? best.marketId) as
      | number
      | undefined;
    if (typeof id !== "number") continue;

    console.log(
      "[estimate] resolved",
      resolved,
      "via query",
      JSON.stringify(query),
      "→ market_id:",
      id,
      "(",
      best.name,
      ")"
    );
    marketCache.set(resolved, id);
    return id;
  }

  console.error(
    "[estimate] no market found for",
    resolved,
    "after trying:",
    queries
  );
  return null;
}

async function fetchMarketSummary(
  marketId: number,
  propertyType: string,
  bedrooms: number,
  apiKey: string
) {
  // Bedrooms: studio=0, 1-4 as-is, 5 expands to 5+6+ so the bucket isn't empty.
  const bedroomFilter =
    bedrooms === 0
      ? ["0"]
      : bedrooms >= 5
      ? ["5", "6+"]
      : [String(bedrooms)];

  const body = {
    market_id: marketId,
    filters: {
      property_type: PROPERTY_TYPE_MAP[propertyType] ?? ["entire_home"],
      bedrooms: bedroomFilter,
    },
  };

  const res = await fetch(`${AIRBTICS_BASE}/markets/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error(
      "[estimate] markets/summary failed",
      res.status,
      await res.text().catch(() => "")
    );
    return null;
  }

  return res.json();
}

type Percentiles = { p25?: number; p50?: number; p75?: number; p90?: number };

type AirbticsMarketSummary = {
  occupancy?: number;
  average_daily_rate?: number;
  revenue?: number;
  occupancy_percentiles?: Percentiles;
  average_daily_rate_percentiles?: Percentiles;
  revenue_percentiles?: Percentiles;
  active_listings_count?: number;
  market_grade?: string;
};

function parseAirbticsResponse(
  data: Record<string, unknown>,
  furnishingMult: number
) {
  // Actual Airbtics /markets/summary shape:
  //   { message: { revenue, occupancy, average_daily_rate,
  //                revenue_percentiles: { p25, p50, p75, p90 },
  //                occupancy_percentiles: { ... },
  //                average_daily_rate_percentiles: { ... },
  //                active_listings_count, market_grade, regulations },
  //     metadata: { district, country_code, verified_tier } }
  const msg = (data.message ?? data) as AirbticsMarketSummary;

  const baseRevenue = msg.revenue;
  if (typeof baseRevenue !== "number") return null;

  const rev = msg.revenue_percentiles;
  const adr = msg.average_daily_rate_percentiles;

  const sarRev = (usd: number) =>
    Math.round(usd * furnishingMult * USD_TO_SAR);
  const sarAdr = (usd: number) =>
    Math.round(usd * furnishingMult * USD_TO_SAR);

  const medianRevenue = rev?.p50 ?? baseRevenue;
  const medianAdr = adr?.p50 ?? msg.average_daily_rate ?? 0;

  return {
    annualRevenue: sarRev(medianRevenue),
    occupancyRate: Math.round(msg.occupancy ?? 0),
    nightlyRate: sarAdr(medianAdr),
    range: {
      low: {
        annualRevenue: sarRev(rev?.p25 ?? medianRevenue * 0.7),
        nightlyRate: sarAdr(adr?.p25 ?? medianAdr * 0.75),
      },
      high: {
        annualRevenue: sarRev(rev?.p75 ?? medianRevenue * 1.4),
        nightlyRate: sarAdr(adr?.p75 ?? medianAdr * 1.3),
      },
    },
    currency: "SAR",
    isMock: false,
  };
}

function mockEstimate({
  city,
  propertyType,
  bedrooms,
  furnishing,
}: EstimateInput) {
  const cityBase = CITY_BASELINE[city] ?? 30000;
  const typeMult = PROPERTY_TYPE_MOCK_MULT[propertyType] ?? 1.0;
  const furnishMult = FURNISHING_MULTIPLIER[furnishing] ?? 1.0;
  const bedroomMult = bedrooms === 0 ? 0.7 : 0.8 + bedrooms * 0.25;

  const annualRevenue = Math.round(
    cityBase * typeMult * bedroomMult * furnishMult
  );
  const occupancyRate = Math.min(
    96,
    Math.round(68 + bedrooms * 1.5 + (furnishing === "premium" ? 4 : 0))
  );
  const bookedNights = Math.max(1, (365 * occupancyRate) / 100);
  const nightlyRate = Math.round(annualRevenue / bookedNights);

  return {
    annualRevenue,
    occupancyRate,
    nightlyRate,
    range: {
      low: {
        annualRevenue: Math.round(annualRevenue * 0.7),
        nightlyRate: Math.round(nightlyRate * 0.75),
      },
      high: {
        annualRevenue: Math.round(annualRevenue * 1.4),
        nightlyRate: Math.round(nightlyRate * 1.3),
      },
    },
    currency: "SAR",
    isMock: true,
  };
}

export async function POST(req: Request) {
  let body: Partial<EstimateInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const city = String(body.city ?? "").toLowerCase();
  const propertyType = String(body.propertyType ?? "").toLowerCase();
  const bedrooms = Number(body.bedrooms ?? 1);
  const furnishing = String(body.furnishing ?? "standard").toLowerCase();

  if (!city || !propertyType) {
    return NextResponse.json(
      { error: "Missing city or propertyType" },
      { status: 400 }
    );
  }

  const apiKey = process.env.AIRBTICS_API_KEY;

  if (apiKey) {
    try {
      const marketId = await findMarketId(city, apiKey);
      if (!marketId) {
        // City not resolved — fall back to mock so the form still works for
        // demo purposes, but flag it.
        console.warn("[estimate] no market_id for city, falling back:", city);
        return NextResponse.json(
          mockEstimate({ city, propertyType, bedrooms, furnishing })
        );
      }

      const data = await fetchMarketSummary(
        marketId,
        propertyType,
        bedrooms,
        apiKey
      );
      if (!data) {
        return NextResponse.json(
          mockEstimate({ city, propertyType, bedrooms, furnishing })
        );
      }

      const furnishingMult = FURNISHING_MULTIPLIER[furnishing] ?? 1.0;
      const estimate = parseAirbticsResponse(data, furnishingMult);
      if (!estimate) {
        console.error("[estimate] could not parse Airbtics response shape", data);
        return NextResponse.json(
          mockEstimate({ city, propertyType, bedrooms, furnishing })
        );
      }

      return NextResponse.json(estimate);
    } catch (err) {
      console.error("[estimate] unexpected error", err);
      return NextResponse.json(
        mockEstimate({ city, propertyType, bedrooms, furnishing })
      );
    }
  }

  // No API key configured — pure mock mode.
  return NextResponse.json(
    mockEstimate({ city, propertyType, bedrooms, furnishing })
  );
}
