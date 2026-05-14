import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import LegalPage from "@/components/LegalPage";
import { type Locale } from "@/lib/i18n/request";
import { getLegalDoc } from "@/lib/legal";

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Metadata {
  const doc = getLegalDoc(locale as Locale, "terms");
  return { title: `${doc.title} — Rent Royz`, description: doc.tagline };
}

export default function Terms({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  return <LegalPage locale={locale as Locale} docId="terms" />;
}
