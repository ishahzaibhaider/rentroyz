"use client";

import { motion } from "framer-motion";
import RevealUp from "./ui/RevealUp";
import { stagger, revealUp } from "@/lib/motion";

const PILLARS = [
  {
    title: "Simplicity",
    body:
      "We design our services and communication to be clear and easy to use. Complexity is removed wherever possible.",
  },
  {
    title: "Trust",
    body:
      "We manage properties with transparency, accountability, and consistency. Owners trust Rent Royz to protect their assets.",
  },
  {
    title: "Care",
    body:
      "We treat every property with attention and responsibility. Through proactive maintenance and thoughtful guest management, we ensure long-term value.",
  },
];

function PetalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden>
      <path
        d="M32 6 C 48 6, 56 22, 48 38 C 40 22, 24 22, 16 38 C 8 22, 16 6, 32 6 Z"
        fill="currentColor"
      />
      <path
        d="M32 58 C 48 58, 56 42, 48 26 C 40 42, 24 42, 16 26 C 8 42, 16 58, 32 58 Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  );
}

export default function Pillars() {
  return (
    <section
      id="pillars"
      className="relative overflow-hidden bg-ink-deep px-6 py-28 sm:py-36 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <RevealUp className="max-w-2xl">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-ember">
            What we stand for
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-sand sm:text-5xl lg:text-6xl">
            Three pillars.
            <br />
            <span className="text-sand/60">One promise.</span>
          </h2>
        </RevealUp>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-3"
        >
          {PILLARS.map((p) => (
            <motion.li
              variants={revealUp}
              key={p.title}
              className="group relative rounded-3xl border border-sand/10 bg-ink p-8 transition-colors duration-500 ease-calm hover:border-sand/25 sm:p-10"
            >
              <PetalIcon className="h-12 w-12 text-ember transition-transform duration-700 ease-calm group-hover:rotate-[15deg] group-hover:scale-110" />
              <h3 className="mt-8 font-display text-2xl text-sand">{p.title}</h3>
              <p className="mt-4 text-sand/70 leading-relaxed">{p.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
