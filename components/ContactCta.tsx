"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { calm } from "@/lib/motion";

const CALENDLY_URL =
  "https://calendly.com/rentroyz/30min?hide_event_type_details=1&hide_gdpr_banner=1&background_color=d3cdc3&text_color=243e40&primary_color=480f07";
const CALENDLY_SRC = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export default function ContactCta() {
  const t = useTranslations("contact");
  const email = t("email");
  const phone = t("phone");
  const widgetRef = useRef<HTMLDivElement>(null);

  // Manually load the Calendly script and init the widget once both the ref
  // and the Calendly global are ready. We avoid Calendly's class-based
  // auto-mount (`.calendly-inline-widget`) because in production with hydration,
  // the script can run before React has rendered the target div — auto-scan
  // finds nothing and the widget never appears. Explicit init via the JS API
  // sidesteps that race entirely.
  useEffect(() => {
    const el = widgetRef.current;
    if (!el) return;

    const init = () => {
      if (window.Calendly && el) {
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: el,
        });
      }
    };

    if (window.Calendly) {
      init();
    } else {
      const existing = document.querySelector<HTMLScriptElement>(
        `script[src="${CALENDLY_SRC}"]`
      );
      if (existing) {
        existing.addEventListener("load", init);
      } else {
        const script = document.createElement("script");
        script.src = CALENDLY_SRC;
        script.async = true;
        script.addEventListener("load", init);
        document.body.appendChild(script);
      }
    }

    return () => {
      // Strict Mode double-mount cleanup: remove the iframe Calendly inserted
      // so the second mount creates a fresh widget instead of stacking.
      if (el) el.innerHTML = "";
    };
  }, []);

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

        <div
          ref={widgetRef}
          className="mt-12 h-[1200px] w-full overflow-hidden rounded-2xl shadow-[0_12px_36px_rgba(15,31,36,0.08)] sm:h-[1100px] lg:h-[1050px]"
        />

        <div className="mt-12 flex flex-col items-center gap-2 text-base text-ink-deep/60 sm:flex-row sm:gap-6">
          <span className="text-ink-deep/40">Or reach us directly:</span>
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
    </section>
  );
}
