"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { calm } from "@/lib/motion";
import { DISTRICTS } from "@/lib/districts";
import SearchableSelect from "@/components/ui/SearchableSelect";

const CITIES = ["riyadh", "jeddah", "dammam", "khobar"] as const;
const PROPERTY_TYPES = ["apartment", "villa", "townhouse", "studio"] as const;
const BEDROOMS = [
  { value: 0, key: "studio" },
  { value: 1, key: "one" },
  { value: 2, key: "two" },
  { value: 3, key: "three" },
  { value: 4, key: "four" },
  { value: 5, key: "five" },
] as const;
const FURNISHING = ["standard", "premium"] as const;

type Estimate = {
  annualRevenue: number;
  occupancyRate: number;
  nightlyRate: number;
  range: {
    low: { annualRevenue: number; nightlyRate: number };
    high: { annualRevenue: number; nightlyRate: number };
  };
  currency: string;
  isMock?: boolean;
};

export default function RevenueEstimator() {
  const t = useTranslations("estimator");
  const locale = useLocale();
  const numberLocale = locale === "ar" ? "ar-SA" : "en-US";

  const [city, setCity] = useState<(typeof CITIES)[number]>("riyadh");
  // District depends on the selected city; empty means "not specified".
  const [district, setDistrict] = useState<string>("");
  const [propertyType, setPropertyType] =
    useState<(typeof PROPERTY_TYPES)[number]>("apartment");
  const [bedrooms, setBedrooms] = useState<number>(2);
  const [furnishing, setFurnishing] =
    useState<(typeof FURNISHING)[number]>("standard");

  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          district,
          propertyType,
          bedrooms,
          furnishing,
        }),
      });
      if (!res.ok) throw new Error("estimate failed");
      const data: Estimate = await res.json();
      setEstimate(data);
    } catch {
      setError(t("error"));
      setEstimate(null);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (n: number, currency: string) =>
    new Intl.NumberFormat(numberLocale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <section
      id="estimate"
      className="relative overflow-hidden bg-sand-soft px-6 py-24 text-ink-deep sm:py-28 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: calm }}
          className="text-center"
        >
          <h2 className="font-display text-4xl leading-[1.1] tracking-tight text-ink-deep sm:text-5xl lg:text-6xl">
            {t("titleLineOne")}{" "}
            <span className="font-semibold italic">{t("titleLineTwo")}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-deep/70 sm:text-lg">
            {t("tagline")}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: calm, delay: 0.1 }}
          onSubmit={onSubmit}
          className="mt-12 rounded-3xl border border-ink-deep/10 bg-white/60 p-6 shadow-[0_12px_36px_rgba(15,31,36,0.06)] backdrop-blur-sm sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label={t("cityLabel")}>
              <Select
                value={city}
                onChange={(v) => {
                  setCity(v as typeof city);
                  // Districts are city-specific — clear the stale selection.
                  setDistrict("");
                }}
                options={CITIES.map((c) => ({ value: c, label: t(`cities.${c}`) }))}
              />
            </Field>

            <Field label={t("districtLabel")}>
              <SearchableSelect
                value={district}
                onChange={setDistrict}
                options={(DISTRICTS[city] ?? []).map((d) => ({
                  value: d.value,
                  label: locale === "ar" ? d.ar : d.en,
                }))}
                placeholder={t("districtPlaceholder")}
                searchPlaceholder={t("districtSearch")}
                noResultsText={t("districtNoResults")}
              />
            </Field>

            <Field label={t("propertyTypeLabel")}>
              <Select
                value={propertyType}
                onChange={(v) => setPropertyType(v as typeof propertyType)}
                options={PROPERTY_TYPES.map((p) => ({
                  value: p,
                  label: t(`types.${p}`),
                }))}
              />
            </Field>

            <Field label={t("bedroomsLabel")}>
              <Select
                value={String(bedrooms)}
                onChange={(v) => setBedrooms(Number(v))}
                options={BEDROOMS.map((b) => ({
                  value: String(b.value),
                  label: t(`bedroomOptions.${b.key}`),
                }))}
              />
            </Field>

            <Field label={t("furnishingLabel")} className="sm:col-span-2">
              <div className="flex gap-2">
                {FURNISHING.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFurnishing(f)}
                    className={`flex-1 rounded-full border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      furnishing === f
                        ? "border-ink-deep bg-ink-deep text-sand"
                        : "border-ink-deep/20 bg-transparent text-ink-deep/70 hover:border-ink-deep/40"
                    }`}
                  >
                    {t(`furnishing.${f}`)}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink-deep px-8 py-4 text-base font-bold text-sand shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-all duration-500 ease-calm hover:bg-ember hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[280px]"
          >
            {loading ? (
              <>
                <Spinner className="h-4 w-4" />
                {t("submitting")}
              </>
            ) : (
              <>
                <ChartIcon className="h-5 w-5" />
                {t("submit")}
              </>
            )}
          </button>
        </motion.form>

        <AnimatePresence>
          {estimate && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.6, ease: calm }}
              className="mt-10"
            >
              <div className="rounded-3xl bg-ink-deep p-6 text-sand shadow-[0_24px_56px_rgba(15,31,36,0.18)] sm:p-10">
                {estimate.isMock && (
                  <p className="mb-4 inline-block rounded-full bg-ember/20 px-4 py-1 text-xs text-ember">
                    {t("result.mockNotice")}
                  </p>
                )}

                <p className="text-sm uppercase tracking-[0.3em] text-sand/60">
                  {t("result.estimatedAnnualRevenue")}
                </p>
                <p className="mt-3 font-display text-5xl font-semibold leading-none tracking-tight text-sand sm:text-6xl lg:text-7xl">
                  {formatMoney(estimate.annualRevenue, estimate.currency)}
                </p>

                <p className="mt-4 text-sm text-sand/60">
                  {t("result.rangeLabel")}: {formatMoney(estimate.range.low.annualRevenue, estimate.currency)} —{" "}
                  {formatMoney(estimate.range.high.annualRevenue, estimate.currency)}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6 border-t border-sand/15 pt-6 sm:grid-cols-2">
                  <Metric
                    label={t("result.occupancyRate")}
                    value={`${estimate.occupancyRate}%`}
                  />
                  <Metric
                    label={t("result.nightlyRate")}
                    value={formatMoney(estimate.nightlyRate, estimate.currency)}
                  />
                </div>

                <p className="mt-8 text-xs leading-relaxed text-sand/50">
                  {t("result.disclaimer")}
                </p>

                <a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-sand px-6 py-3 text-sm font-medium text-ink-deep transition-all duration-500 ease-calm hover:bg-ember hover:text-sand"
                >
                  {t("result.scheduleCta")}
                  <ArrowIcon className="h-4 w-4 rtl:-scale-x-100" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <p className="mt-6 rounded-2xl bg-burgundy/10 px-6 py-4 text-center text-sm text-burgundy">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className="text-xs font-medium uppercase tracking-wider text-ink-deep/55">
        {label}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-2xl border border-ink-deep/15 bg-white px-4 py-3 pr-10 text-base text-ink-deep transition-colors duration-300 ease-calm hover:border-ink-deep/30 focus:border-ink-deep focus:outline-none rtl:pe-4 rtl:ps-10"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        className="pointer-events-none absolute end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-deep/50"
        aria-hidden
      />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-sand/50">{label}</p>
      <p className="mt-2 font-display text-3xl font-medium text-sand sm:text-4xl">
        {value}
      </p>
    </div>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 17l6-6 4 4 8-8M14 7h7v7" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
