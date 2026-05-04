"use client";

import { motion } from "framer-motion";
import { calm, revealUp, stagger } from "@/lib/motion";

const ITEMS = [
  { src: "/operations/pricing.png", label: "Pricing and yield optimization" },
  { src: "/operations/cleaning.png", label: "Cleaning cycles & quality control" },
  { src: "/operations/platform.png", label: "Platform synchronization" },
  { src: "/operations/screening.png", label: "Guest screening & communication" },
  { src: "/operations/maintenance.png", label: "Maintenance & issue resolution" },
  { src: "/operations/licensing.png", label: "Licensing & compliance" },
  { src: "/operations/reviews.png", label: "Reviews & reputation management" },
  { src: "/operations/reporting.png", label: "Owner reporting & payouts" },
  { src: "/operations/checkin.png", label: "Check-in & check-out coordination" },
];

export default function Operations() {
  return (
    <section
      id="operations"
      className="relative overflow-hidden bg-sand-soft py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto flex max-w-[1670px] flex-col gap-12 lg:flex-row lg:items-center lg:gap-12">
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: calm }}
          className="shrink-0 px-6 lg:w-[344px] lg:pl-10"
        >
          <h2 className="font-display text-4xl leading-[1.1] tracking-tight text-ink-deep sm:text-5xl lg:text-6xl">
            We Handle{" "}
            <span className="font-semibold italic">Everything</span>
          </h2>
          <div className="mt-5 h-[3px] w-56 bg-ember" />
          <p className="mt-6 max-w-xs text-base leading-relaxed text-ink-deep/85 sm:text-lg">
            Every operational detail — managed with precision
          </p>
        </motion.div>

        {/* Horizontal scrollable card row */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex snap-x snap-proximity gap-8 overflow-x-auto px-6 pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.label}
              variants={revealUp}
              className={`flex w-[260px] shrink-0 snap-start flex-col gap-5 sm:w-[300px] ${
                // Vary alignment slightly so the row reads as a curated grid, not a uniform strip.
                i % 3 === 1 ? "lg:pt-0" : "lg:pt-12"
              }`}
            >
              <div className="relative h-[346px] overflow-hidden rounded-[26px] sm:h-[399px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.label}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <p className="font-display text-xl font-semibold leading-tight text-ink-deep sm:text-2xl">
                {item.label}
              </p>
            </motion.li>
          ))}
          {/* Right-edge spacer so the last card has breathing room */}
          <li className="w-2 shrink-0 lg:w-10" aria-hidden />
        </motion.ul>
      </div>
    </section>
  );
}
