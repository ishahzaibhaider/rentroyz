"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { calm, revealUp, stagger } from "@/lib/motion";

const AVATARS = [
  "/avatars/john-doe.png",
  "/avatars/john-smith.png",
  "/avatars/tamara-bellis.png",
];

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const locale = useLocale();
  const items = t.raw("items") as { quote: string; name: string; title: string }[];
  const scrollerRef = useRef<HTMLUListElement>(null);

  const scrollBy = (visualDir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 32 : el.clientWidth * 0.9;
    // Invert direction in RTL so "Next" still moves forward in reading order.
    const physical = locale === "ar" ? -visualDir : visualDir;
    el.scrollBy({ left: step * physical, behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-sand-soft px-6 pb-24 pt-28 sm:pt-32 lg:px-10 lg:pb-32 lg:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: calm }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-4xl leading-[1.1] tracking-tight text-ink-deep sm:text-5xl lg:text-6xl">
            {t("titleLineOne")}{" "}
            <span className="font-semibold italic">{t("titleLineTwo")}</span>
          </h2>
          <div className="mt-5 h-px w-56 bg-ember/60" />
          <p className="mt-6 text-lg text-ink-deep/55 sm:text-xl">
            {t("tagline")}
          </p>
        </motion.div>

        <motion.ul
          ref={scrollerRef}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-24 flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6 ps-2 pt-12 [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-visible [&::-webkit-scrollbar]:hidden lg:[&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:gap-8"
        >
          {items.map((item, i) => (
            <motion.li
              key={item.name}
              data-card
              variants={revealUp}
              className="relative w-[85vw] max-w-[420px] shrink-0 snap-center rounded-xl bg-white px-8 pb-10 pt-16 shadow-[0_8px_24px_rgba(15,31,36,0.06)] sm:w-[70vw] lg:w-auto lg:max-w-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={AVATARS[i]}
                alt=""
                className="absolute -top-12 start-8 h-24 w-24 rounded-full border-4 border-sand-soft object-cover shadow-md"
              />
              <p className="text-base leading-relaxed text-ink-deep/65">
                {item.quote}
              </p>
              <div className="mt-6 flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <StarIcon key={j} className="h-5 w-5 text-ember" />
                ))}
              </div>
              <div className="mt-6">
                <p className="font-display text-xl text-ink-deep">{item.name}</p>
                <p className="mt-1 text-sm text-ink-deep/55">{item.title}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-10 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label={t("prev")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-deep/15 text-ink-deep transition-colors duration-300 ease-calm hover:border-ink-deep/40 hover:bg-white"
          >
            <ChevronIcon className="h-5 w-5 -rotate-90 rtl:rotate-90" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label={t("next")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-ink-deep/15 text-ink-deep transition-colors duration-300 ease-calm hover:border-ink-deep/40 hover:bg-white"
          >
            <ChevronIcon className="h-5 w-5 rotate-90 rtl:-rotate-90" />
          </button>
        </div>
      </div>
    </section>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
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
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
