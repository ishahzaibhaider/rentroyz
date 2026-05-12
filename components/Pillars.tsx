"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { calm, revealUp, stagger } from "@/lib/motion";

const ICONS = ["/icons/smooth.svg", "/icons/trust.svg", "/icons/care.svg"];
const ACCENTS = [false, true, false];

export default function Pillars() {
  const t = useTranslations("pillars");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <section
      id="pillars"
      className="relative overflow-hidden bg-sand-soft px-6 py-24 sm:py-28 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: calm }}
          className="text-center font-display text-4xl leading-tight tracking-tight text-ink-deep sm:text-5xl lg:text-6xl"
        >
          {t("titleLineOne")}{" "}
          <span className="font-semibold italic">{t("titleLineTwo")}</span>
        </motion.h2>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-20 grid grid-cols-1 gap-16 sm:gap-20 lg:mt-28 lg:grid-cols-3 lg:items-start lg:gap-6"
        >
          {items.map((p, i) => (
            <motion.li
              variants={revealUp}
              key={p.title}
              className={`relative flex flex-col items-center rounded-[3rem] border bg-transparent px-8 pb-12 pt-20 text-center sm:px-12 sm:pb-16 sm:pt-24 lg:pt-28 ${
                ACCENTS[i]
                  ? "border-ember lg:mt-[74px]"
                  : "border-ember/60"
              }`}
            >
              <div className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full border-[2.5px] border-sand/40">
                <div className="flex h-[119px] w-[119px] items-center justify-center rounded-full bg-gradient-to-b from-sand to-white shadow-[0_24px_48px_rgba(0,0,0,0.18)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ICONS[i]} alt="" className="h-14 w-14" />
                </div>
              </div>
              <h3 className="mt-10 font-display text-3xl font-semibold text-ink-deep sm:text-4xl">
                {p.title}
              </h3>
              <p className="mt-5 max-w-xs text-lg leading-[1.5] text-ink-deep/70 sm:text-xl">
                {p.body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
