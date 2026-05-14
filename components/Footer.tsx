import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import SocialLinks from "./SocialLinks";
import PaymentMethods from "./PaymentMethods";

// Saudi business registration numbers — official identifiers, kept as
// constants (not translated). The displayed labels are translated; the
// numbers themselves stay in Latin digits and forced LTR so they render
// correctly in both English and Arabic.
const VAT_NUMBER = "314497025100003";
const COMMERCE_REGISTRATION_NUMBER = "7053041203";

export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer className="bg-ink-deep py-12 text-center text-sand/70">
      <div className="mx-auto max-w-7xl px-6">
        <SocialLinks />

        <div className="mt-10">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-sand/40">
            {t("paymentsLabel")}
          </p>
          <PaymentMethods />
        </div>

        <div className="mt-10 flex flex-wrap items-stretch justify-center gap-3 sm:gap-4">
          {/* VAT credential — official Saudi VAT registration badge */}
          <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ink-deep shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/legal/vat.png"
              alt="Saudi VAT registered"
              className="h-12 w-auto sm:h-14"
            />
            <div className="text-start">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-deep/55">
                {t("vat")}
              </p>
              <p
                dir="ltr"
                className="mt-0.5 font-mono text-sm font-semibold tracking-wide sm:text-base"
              >
                {VAT_NUMBER}
              </p>
            </div>
          </div>

          {/* Commerce Registration credential — Saudi Ministry of Commerce */}
          <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-ink-deep shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/legal/ministry-of-commerce.png"
              alt="Saudi Ministry of Commerce"
              className="h-12 w-auto sm:h-14"
            />
            <div className="text-start">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-deep/55">
                {t("commerceRegistration")}
              </p>
              <p
                dir="ltr"
                className="mt-0.5 font-mono text-sm font-semibold tracking-wide sm:text-base"
              >
                {COMMERCE_REGISTRATION_NUMBER}
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link
            href="/privacy-policy"
            className="text-sand/60 transition-colors hover:text-sand"
          >
            {t("privacyPolicy")}
          </Link>
          <span className="text-sand/20" aria-hidden>
            •
          </span>
          <Link
            href="/terms"
            className="text-sand/60 transition-colors hover:text-sand"
          >
            {t("terms")}
          </Link>
          <span className="text-sand/20" aria-hidden>
            •
          </span>
          <Link
            href="/payment-policy"
            className="text-sand/60 transition-colors hover:text-sand"
          >
            {t("paymentPolicy")}
          </Link>
        </nav>

        <p className="mt-6 text-sm">
          {t("copyright")} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
