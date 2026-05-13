"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { useTranslations } from "next-intl";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://owner.rentroyz.com";

// Multiplier on scroll-to-video mapping. >1 means the video advances faster
// than the scroll — small scroll moves cover more video. The video finishes
// at scroll progress 1/VIDEO_SPEED and then holds the last frame for the
// remaining text phases.
const VIDEO_SPEED = 1.4;

const STAGE_RANGES: readonly (readonly [number, number, number, number])[] = [
  [0.26, 0.30, 0.45, 0.49],
  [0.51, 0.55, 0.70, 0.74],
  [0.76, 0.80, 0.92, 0.96],
];

type StageText = { eyebrow: string; title: string; body: string };

export default function Transformation() {
  const t = useTranslations("transformation");
  const stages = t.raw("stages") as StageText[];

  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  // videoSrc is determined client-side (need window.matchMedia). Initialized
  // to null so on SSR/first render the <video> tag is not emitted yet — we
  // render it once we know which file to serve. This is critical for iOS:
  // setting src via JS on an already-rendered <video> element is unreliable;
  // iOS handles src-from-JSX much better.
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const targetTime = useRef(0);
  const rafScheduled = useRef(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    setVideoSrc(
      isMobile ? "/video/transform-mobile.mp4" : "/video/transform.mp4"
    );
  }, []);

  // Seek is gated on videoReady so it only fires once the full blob is in
  // memory — preventing the cancelled-byte-range death spiral on CDNs.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !hasVideo || !videoReady) return;
    const dur = v.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;
    targetTime.current = Math.max(0, Math.min(dur - 0.001, p * VIDEO_SPEED * dur));
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

  // iOS Safari specifics being addressed here:
  //
  // 1. iOS Safari silently downgrades `preload="auto"` to `preload="none"` on
  //    cellular networks. Result: setting src does not start downloading the
  //    file on its own. We call .load() explicitly to force the issue.
  //
  // 2. iOS Safari will NOT render frames on currentTime changes alone — the
  //    video pipeline has to be "woken up" by a .play() call first. After
  //    that, even when paused, currentTime writes will render the frame at
  //    that timestamp. Without this play+pause warm-up, our scroll-driven
  //    scrubbing produces a black screen on iOS while working fine in Chrome.
  //
  // 3. Muted autoplay is allowed on iOS without user gesture (the muted
  //    attribute on the <video> element grants the permission), so the
  //    play() call here will not be blocked.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;

    let cancelled = false;

    // Force iOS to start the download even when it would otherwise lazily wait.
    v.load();

    const markReady = () => {
      if (cancelled) return;
      const dur = v.duration;
      if (Number.isFinite(dur) && dur > 0) {
        const p = scrollYProgress.get();
        v.currentTime = Math.max(
          0,
          Math.min(dur - 0.001, p * VIDEO_SPEED * dur)
        );
      }
      setVideoReady(true);
      window.dispatchEvent(new Event("rentroyz:video-ready"));
    };

    const onLoadedMetadata = async () => {
      if (cancelled) return;
      // The play+pause dance that iOS Safari needs. Muted autoplay is allowed
      // without a user gesture, so the play() promise should resolve. If it
      // rejects (rare), we still proceed — most platforms work without it.
      try {
        const playPromise = v.play();
        if (playPromise !== undefined) await playPromise;
        v.pause();
      } catch {
        // Autoplay blocked / interrupted — continue regardless; non-iOS
        // browsers don't need the warm-up.
      }
      if (cancelled) return;
      markReady();
    };

    const onError = () => {
      if (cancelled) return;
      console.error("[transformation] video element error", v.error);
      setHasVideo(false);
    };

    v.addEventListener("loadedmetadata", onLoadedMetadata);
    v.addEventListener("error", onError);

    return () => {
      cancelled = true;
      v.removeEventListener("loadedmetadata", onLoadedMetadata);
      v.removeEventListener("error", onError);
    };
  }, [videoSrc, scrollYProgress]);

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
        {hasVideo && videoSrc && (
          <video
            ref={videoRef}
            // `key={videoSrc}` forces a clean element remount if the source
            // ever changes (it shouldn't after first mount, but guards against
            // viewport-resize edge cases). Critical: `src` is in JSX, not set
            // via setAttribute from useEffect — iOS Safari handles JSX-rendered
            // src much more reliably.
            key={videoSrc}
            src={videoSrc}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{ opacity: videoReady ? 1 : 0 }}
            muted
            autoPlay
            playsInline
            preload="auto"
          />
        )}

        <motion.div
          className="absolute inset-0 -z-10"
          style={{ background: fallbackBg }}
        />

        {/* Dark overlay so light text always reads, even on bright video frames */}
        <div className="pointer-events-none absolute inset-0 bg-ink/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/30 to-ink/90" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/35 to-transparent" />

        <HeroPhase progress={scrollYProgress} />

        {stages.map((stage, i) => (
          <Stage
            key={i}
            progress={scrollYProgress}
            range={STAGE_RANGES[i]}
            text={stage}
          />
        ))}

        <ClosingSlogan progress={scrollYProgress} />
      </div>
    </section>
  );
}

function HeroPhase({ progress }: { progress: MotionValue<number> }) {
  const t = useTranslations("transformation");
  const opacity = useTransform(progress, [0, 0.02, 0.18, 0.24], [1, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.24], [0, -24]);
  const cueOpacity = useTransform(progress, [0, 0.06, 0.18], [1, 1, 0]);
  // Disable pointer events once the hero has faded out, so the (now invisible)
  // overlay can't intercept clicks that the user thinks are landing on the
  // stages or page below.
  const pointerEvents = useTransform(opacity, (o) =>
    o > 0.15 ? "auto" : "none"
  );

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className="absolute inset-0 z-10 flex items-center px-6 lg:px-16"
    >
      <div className="max-w-2xl [text-shadow:_0_2px_18px_rgb(0_0_0_/_0.55)]">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-sand/85">
          {t("eyebrow")}
        </p>
        <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-sand sm:text-6xl lg:text-8xl">
          {t("heroTitle")}
          <br />
          <span className="text-sand/80">{t("heroSubtitle")}</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-sand/95 lg:text-xl">
          {t("heroBody")}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#estimate"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-sand px-7 py-4 text-sm font-medium text-ink-deep transition-all duration-500 ease-calm hover:bg-ember hover:text-sand"
          >
            {t("cta1")}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform duration-500 ease-calm group-hover:translate-x-1 rtl:-scale-x-100"
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
            {t("cta2")}
          </a>
        </div>
      </div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute bottom-10 left-6 right-6 flex items-center justify-between text-xs text-sand/60 lg:left-16 lg:right-16"
      >
        <span className="hidden sm:inline">{t("scrollLong")}</span>
        <span className="sm:hidden">{t("scrollShort")}</span>
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
  range,
  text,
}: {
  progress: MotionValue<number>;
  range: readonly [number, number, number, number];
  text: StageText;
}) {
  const [start, fadeIn, fadeOut, end] = range;
  const opacity = useTransform(
    progress,
    [start, fadeIn, fadeOut, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [start, fadeIn], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-0 z-10 flex items-end px-6 pb-24 sm:items-center sm:pb-0 lg:px-16"
    >
      <div className="max-w-xl [text-shadow:_0_2px_18px_rgb(0_0_0_/_0.55)]">
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-ember">
          {text.eyebrow}
        </p>
        <h3 className="mt-4 font-display text-4xl leading-tight text-sand sm:text-6xl">
          {text.title}
        </h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-sand/95 sm:text-lg">
          {text.body}
        </p>
      </div>
    </motion.div>
  );
}

function ClosingSlogan({ progress }: { progress: MotionValue<number> }) {
  const t = useTranslations("transformation");
  const opacity = useTransform(progress, [0.95, 0.99], [0, 1]);
  const scale = useTransform(progress, [0.95, 0.99], [0.96, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
    >
      <h2 className="text-center font-display text-5xl leading-[0.95] tracking-tight text-sand [text-shadow:_0_4px_28px_rgb(0_0_0_/_0.6)] sm:text-7xl lg:text-9xl">
        {t("closingTitle")}
        <br />
        <span className="text-ember">{t("closingSubtitle")}</span>
      </h2>
    </motion.div>
  );
}
