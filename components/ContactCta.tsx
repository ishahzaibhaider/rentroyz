"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { calm } from "@/lib/motion";

export default function ContactCta() {
  const t = useTranslations("contact");
  const email = t("email");
  const phone = t("phone");
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-sand-soft px-6 py-24 text-ink-deep sm:py-28 lg:px-10 lg:py-36"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: calm }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2 className="font-display text-4xl font-black leading-[1.1] tracking-tight text-ink-deep sm:text-5xl lg:text-6xl">
          {t("title")}
        </h2>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-deep/60 sm:text-xl">
          {t("subtitle")}
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-5">
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(t("scheduleBtn"))}`}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink-deep px-8 py-4 text-base font-bold text-sand shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-all duration-500 ease-calm hover:bg-ember hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)]"
          >
            <CalendarIcon className="h-5 w-5" />
            {t("scheduleBtn")}
          </a>
          <a
            href={`mailto:${email}`}
            className="group inline-flex items-center justify-center gap-3 rounded-full border-[1.5px] border-ink-deep/20 bg-white px-8 py-4 text-base font-semibold text-ink-deep transition-all duration-500 ease-calm hover:border-ink-deep/50 hover:bg-white/80"
          >
            <ChatIcon className="h-5 w-5" />
            {t("contactBtn")}
          </a>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-base text-ink-deep/60 sm:flex-row sm:gap-6">
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

function CalendarIcon({ className }: { className?: string }) {
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
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
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
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}
