"use client";

import { motion } from "framer-motion";
import PetalPattern from "./ui/PetalPattern";
import { calm } from "@/lib/motion";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.rentroyz.com";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {/* Soft animated gradient backdrop until the start-frame poster is added */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_30%,rgba(36,62,64,0.55),transparent),radial-gradient(80%_60%_at_30%_70%,rgba(196,98,55,0.18),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/30 via-ink/0 to-ink" />
      </div>

      <PetalPattern className="text-sand" opacity={0.04} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: calm, delay: 0.1 }}
          className="font-sans text-xs uppercase tracking-[0.3em] text-sand/60"
        >
          Property management — Saudi Arabia
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: calm, delay: 0.25 }}
          className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-sand sm:text-6xl lg:text-8xl"
        >
          We Manage.
          <br />
          <span className="text-sand/70">You Earn.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: calm, delay: 0.55 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-sand/75 lg:text-xl"
        >
          Manage properties. Minus the headaches. We furnish your apartment, list
          it on Airbnb and Booking.com, and handle every guest — so you earn
          without lifting a finger.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: calm, delay: 0.75 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-sand px-7 py-4 text-sm font-medium text-ink-deep transition-all duration-500 ease-calm hover:bg-ember hover:text-sand"
          >
            Get a Revenue Estimate
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-500 ease-calm group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href={`${APP_URL}/register`}
            className="inline-flex items-center justify-center rounded-full border border-sand/30 px-7 py-4 text-sm text-sand transition hover:border-sand"
          >
            List Your Property
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: calm, delay: 1.4 }}
          className="absolute bottom-10 left-6 right-6 flex items-center justify-between text-xs text-sand/50 lg:left-10 lg:right-10"
        >
          <span className="hidden sm:inline">Scroll to see the transformation</span>
          <span className="sm:hidden">Scroll</span>
          <svg width="14" height="22" viewBox="0 0 14 22" className="animate-bounce" fill="none">
            <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeOpacity="0.4" />
            <circle cx="7" cy="7" r="1.5" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
