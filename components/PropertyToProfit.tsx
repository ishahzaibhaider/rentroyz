"use client";

import { motion } from "framer-motion";
import { calm, revealUp, stagger } from "@/lib/motion";

const STEPS = [
  {
    title: "Register & Prepare",
    body: "Submit your property once. We handle setup, pricing, and readiness.",
    Icon: DocumentIcon,
  },
  {
    title: "List & Operate",
    body:
      "Your property is published across all major booking platforms, and operation is all handled continuously.",
    Icon: GearIcon,
  },
  {
    title: "Profit",
    body: "Revenue is generated, optimized, and paid out with full visibility.",
    Icon: TrendUpIcon,
  },
];

export default function PropertyToProfit() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-sand-soft px-6 py-24 sm:py-28 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: calm }}
          className="text-center font-display text-4xl leading-[1.05] tracking-tight text-ink-deep sm:text-5xl lg:text-6xl"
        >
          From Property to Profit
          <br />
          <span className="font-semibold">Smoothly</span>
        </motion.h2>

        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-16 grid grid-cols-1 gap-12 sm:gap-16 lg:mt-20 lg:grid-cols-3 lg:gap-8"
        >
          {/* Wavy connectors — visible only at lg+, between cards */}
          <Connector className="hidden lg:block lg:absolute lg:left-[16.66%] lg:top-[42px] lg:w-[16.66%]" />
          <Connector className="hidden lg:block lg:absolute lg:left-[66.66%] lg:top-[42px] lg:w-[16.66%]" />

          {STEPS.map(({ title, body, Icon }, i) => (
            <motion.li
              key={title}
              variants={revealUp}
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <div className="flex h-[88px] w-[88px] items-center justify-center rounded-3xl bg-[#51787a]/15">
                <Icon className="h-11 w-11 text-ink-deep" />
              </div>
              <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-ink-deep sm:text-2xl">
                {title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-deep/70 sm:text-base lg:max-w-[26ch]">
                {body}
              </p>
              <span className="sr-only">Step {i + 1}</span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function Connector({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 80"
      preserveAspectRatio="none"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M 0 40 C 90 -10, 180 90, 270 40 C 315 15, 340 35, 360 40"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="text-ink-deep/40"
      />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6M9 9h2" />
    </svg>
  );
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.05a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.05a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function TrendUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M14 7h7v7" />
    </svg>
  );
}
