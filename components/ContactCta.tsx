"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { calm } from "@/lib/motion";

// Calendly inline embed. Colors are baked into the URL params (sand bg,
// ink-muted text, burgundy accent) so the widget feels native to the brand.
const CALENDLY_URL =
  "https://calendly.com/rentroyz/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=d3cdc3&text_color=243e40&primary_color=480f07";

export default function ContactCta() {
  const t = useTranslations("contact");
  const email = t("email");
  const phone = t("phone");

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-sand-soft px-6 py-24 text-ink-deep sm:py-28 lg:px-10 lg:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: calm }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <h2 className="font-display text-4xl font-black leading-[1.1] tracking-tight text-ink-deep sm:text-5xl lg:text-6xl">
          {t("title")}
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-deep/60 sm:text-xl">
          {t("subtitle")}
        </p>

        {/* Calendly inline widget. The script (loaded lazily below) scans for
            elements with class `calendly-inline-widget` and mounts the iframe.
            Height is sized for the tallest step (the booking form on mobile) so
            users never have to scroll *inside* the iframe to reach the confirm
            button — the whole flow lives within the natural page scroll. */}
        <div
          className="calendly-inline-widget mt-12 h-[1200px] w-full overflow-hidden rounded-2xl shadow-[0_12px_36px_rgba(15,31,36,0.08)] sm:h-[1100px] lg:h-[1050px]"
          data-url={CALENDLY_URL}
        />

        <div className="mt-12 flex flex-col items-center gap-2 text-base text-ink-deep/60 sm:flex-row sm:gap-6">
          <span className="text-ink-deep/40">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Or reach us directly:
          </span>
          <a
            href={`mailto:${email}`}
            className="transition-colors hover:text-ink-deep"
          >
            {email}
          </a>
          <span className="hidden sm:inline" aria-hidden>
            •
          </span>
          <a
            href={`tel:${phone.replace(/[^+\d]/g, "")}`}
            className="transition-colors hover:text-ink-deep"
            dir="ltr"
          >
            {phone}
          </a>
        </div>
      </motion.div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
