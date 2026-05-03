"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://dev.rentroyz.com";

const STAGES = [
  {
    range: [0.26, 0.30, 0.45, 0.49] as const,
    eyebrow: "01 — Onboard",
    title: "We furnish it.",
    body:
      "From a bare apartment to a fully styled, hospitality-grade space. Our team handles design, sourcing, and installation.",
  },
  {
    range: [0.51, 0.55, 0.70, 0.74] as const,
    eyebrow: "02 — List",
    title: "We list it.",
    body:
      "We publish your property on Airbnb, Booking.com, and our own platform — with professional photography and copy that converts.",
  },
  {
    range: [0.76, 0.80, 0.92, 0.96] as const,
    eyebrow: "03 — Manage",
    title: "We manage it.",
    body:
      "Guest communication, check-in, cleaning, maintenance, and revenue optimisation. You see the earnings, not the work.",
  },
];

export default function Transformation() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const targetTime = useRef(0);
  const rafScheduled = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // rAF-batched seek: at most one currentTime write per frame, regardless of
  // how many scroll events fire in between. Eliminates the lag/jank from
  // assigning currentTime on every motion event.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !hasVideo) return;
    const dur = v.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;
    targetTime.current = Math.max(0, Math.min(dur - 0.001, p * dur));
    if (rafScheduled.current) return;
    rafScheduled.current = true;
    requestAnimationFrame(() => {
      rafScheduled.current = false;
      const v2 = videoRef.current;
      if (!v2) return;
      if (Math.abs(v2.currentTime - targetTime.current) > 0.033) {
        v2.currentTime = targetTime.current;
      }
    });
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onError = () => setHasVideo(false);
    v.addEventListener("error", onError);
    return () => v.removeEventListener("error", onError);
  }, []);

  const fallbackBg = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(135deg, #1a2528 0%, #243E40 60%, #2c3a3c 100%)",
      "linear-gradient(135deg, #4a3528 0%, #C46237 50%, #D3CDC3 100%)",
    ]
  );

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[400vh] bg-ink md:h-[500vh]"
    >
      <div
        id="transformation"
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
      >
        {hasVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/video/transform.mp4"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
          />
        )}

        <motion.div
          className="absolute inset-0 -z-10"
          style={{ background: fallbackBg }}
        />

        {/* Dark overlay so light text always reads, even on bright video frames */}
        <div className="pointer-events-none absolute inset-0 bg-ink/45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/80" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />

        <HeroPhase progress={scrollYProgress} />

        {STAGES.map((stage, i) => (
          <Stage key={i} progress={scrollYProgress} stage={stage} />
        ))}

        <ClosingSlogan progress={scrollYProgress} />
      </div>
    </section>
  );
}

function HeroPhase({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.02, 0.18, 0.24], [1, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.24], [0, -24]);
  const cueOpacity = useTransform(progress, [0, 0.06, 0.18], [1, 1, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-10 flex items-center px-6 lg:px-16"
    >
      <div className="max-w-2xl">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-sand/70">
          Property management — Saudi Arabia
        </p>
        <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-sand sm:text-6xl lg:text-8xl">
          We Manage.
          <br />
          <span className="text-sand/70">You Earn.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-sand/85 lg:text-xl">
          Manage properties. Minus the headaches. We furnish your apartment,
          list it on Airbnb and Booking.com, and handle every guest — so you
          earn without lifting a finger.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-sand px-7 py-4 text-sm font-medium text-ink-deep transition-all duration-500 ease-calm hover:bg-ember hover:text-sand"
          >
            Get a Revenue Estimate
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-500 ease-calm group-hover:translate-x-1"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href={`${APP_URL}/auth/register`}
            className="inline-flex items-center justify-center rounded-full border border-sand/30 px-7 py-4 text-sm text-sand transition hover:border-sand"
          >
            List Your Property
          </a>
        </div>
      </div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-10 left-6 right-6 flex items-center justify-between text-xs text-sand/60 lg:left-16 lg:right-16"
      >
        <span className="hidden sm:inline">Scroll to see the transformation</span>
        <span className="sm:hidden">Scroll</span>
        <svg width="14" height="22" viewBox="0 0 14 22" className="animate-bounce" fill="none">
          <rect x="1" y="1" width="12" height="20" rx="6" stroke="currentColor" strokeOpacity="0.5" />
          <circle cx="7" cy="7" r="1.5" fill="currentColor" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function Stage({
  progress,
  stage,
}: {
  progress: MotionValue<number>;
  stage: (typeof STAGES)[number];
}) {
  const [start, fadeIn, fadeOut, end] = stage.range;
  const opacity = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, fadeIn], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 z-10 flex items-end px-6 pb-24 sm:items-center sm:pb-0 lg:px-16"
    >
      <div className="max-w-xl">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-ember">
          {stage.eyebrow}
        </p>
        <h3 className="mt-4 font-display text-4xl leading-tight text-sand sm:text-6xl">
          {stage.title}
        </h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-sand/85 sm:text-lg">
          {stage.body}
        </p>
      </div>
    </motion.div>
  );
}

function ClosingSlogan({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.95, 0.99], [0, 1]);
  const scale = useTransform(progress, [0.95, 0.99], [0.96, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 z-20 flex items-center justify-center px-6"
    >
      <h2 className="text-center font-display text-5xl leading-[0.95] tracking-tight text-sand sm:text-7xl lg:text-9xl">
        We Manage.
        <br />
        <span className="text-ember">You Earn.</span>
      </h2>
    </motion.div>
  );
}
