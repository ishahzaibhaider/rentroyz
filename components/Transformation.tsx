"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const STAGES = [
  {
    pct: 0.0,
    eyebrow: "01 — Onboard",
    title: "We furnish it.",
    body:
      "From a bare apartment to a fully styled, hospitality-grade space. Our team handles design, sourcing, and installation.",
  },
  {
    pct: 0.34,
    eyebrow: "02 — List",
    title: "We list it.",
    body:
      "We publish your property on Airbnb, Booking.com, and our own platform — with professional photography and copy that converts.",
  },
  {
    pct: 0.67,
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Drive video.currentTime from scroll progress (works both ways)
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !hasVideo) return;
    const dur = v.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;
    const t = Math.max(0, Math.min(dur - 0.001, p * dur));
    if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t;
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onError = () => setHasVideo(false);
    v.addEventListener("error", onError);
    // If src 404s, the error event fires
    return () => v.removeEventListener("error", onError);
  }, []);

  // Visual fallback: fade from "raw" gradient to "warm" gradient as scroll progresses
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
      id="transformation"
      ref={ref}
      className="relative h-[300vh] md:h-[400vh] bg-ink"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Video layer */}
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

        {/* Animated gradient fallback (also visible while video loads / if missing) */}
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ background: fallbackBg }}
        />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-transparent" />

        {/* Stage callouts */}
        {STAGES.map((stage, i) => (
          <Stage key={i} progress={scrollYProgress} stage={stage} />
        ))}

        {/* Closing slogan */}
        <ClosingSlogan progress={scrollYProgress} />
      </div>
    </section>
  );
}

function Stage({
  progress,
  stage,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  stage: (typeof STAGES)[number];
}) {
  const start = stage.pct;
  const fadeIn = start + 0.04;
  const fadeOut = start + 0.27;
  const end = start + 0.31;

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
        <p className="mt-5 max-w-md text-base leading-relaxed text-sand/80 sm:text-lg">
          {stage.body}
        </p>
      </div>
    </motion.div>
  );
}

function ClosingSlogan({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, [0.92, 0.98], [0, 1]);
  const scale = useTransform(progress, [0.92, 0.98], [0.96, 1]);

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
