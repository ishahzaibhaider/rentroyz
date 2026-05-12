"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { calm, revealUp, stagger } from "@/lib/motion";

const ITEMS = [
  { src: "/operations/pricing.png", key: "pricing" },
  { src: "/operations/cleaning.png", key: "cleaning" },
  { src: "/operations/platform.png", key: "platform" },
  { src: "/operations/screening.png", key: "screening" },
  { src: "/operations/maintenance.png", key: "maintenance" },
  { src: "/operations/licensing.png", key: "licensing" },
  { src: "/operations/reviews.png", key: "reviews" },
  { src: "/operations/reporting.png", key: "reporting" },
  { src: "/operations/checkin.png", key: "checkin" },
] as const;

export default function Operations() {
  const t = useTranslations("operations");
  const tItems = useTranslations("operations.items");
  const locale = useLocale();

  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  // pinReady: only true on lg+ viewports. Below that we fall back to a
  // regular manual horizontal scroll, since a multi-screen pinned section
  // is a poor experience on small screens.
  const [pinReady, setPinReady] = useState(false);
  // translateX: total horizontal distance the track must move to fully reveal
  // its overflowing right edge (LTR) / left edge (RTL).
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setPinReady(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!pinReady) {
      setTranslateX(0);
      return;
    }
    const measure = () => {
      if (!trackRef.current || !containerRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = containerRef.current.clientWidth;
      setTranslateX(Math.max(0, trackWidth - containerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinReady]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // RTL: cards overflow to the LEFT, so we translate POSITIVE x to reveal them.
  // LTR: cards overflow to the RIGHT, so we translate NEGATIVE x.
  const xTarget = locale === "ar" ? translateX : -translateX;
  const x = useTransform(scrollYProgress, [0, 1], [0, xTarget]);

  return (
    <section
      ref={sectionRef}
      id="operations"
      className="relative bg-sand-soft"
      style={
        pinReady && translateX > 0
          ? { height: `calc(100vh + ${translateX}px)` }
          : undefined
      }
    >
      <div
        className={
          pinReady
            ? "sticky top-0 flex h-[100vh] items-center overflow-hidden"
            : "overflow-hidden"
        }
      >
        <div className="flex h-full w-full flex-col gap-8 py-24 sm:py-28 lg:flex-row lg:items-center lg:gap-12 lg:py-0">
          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: calm }}
            className="shrink-0 px-6 lg:w-[344px] lg:ps-10"
          >
            <h2 className="font-display text-4xl leading-[1.1] tracking-tight text-ink-deep sm:text-5xl lg:text-6xl">
              {t("titleLineOne")}{" "}
              <span className="font-semibold italic">{t("titleLineTwo")}</span>
            </h2>
            <div className="mt-5 h-[3px] w-56 bg-ember" />
            <p className="mt-6 max-w-xs text-base leading-relaxed text-ink-deep/85 sm:text-lg">
              {t("tagline")}
            </p>
          </motion.div>

          {/* Cards container — overflow-hidden on lg+ so the translating track
              gets clipped. On mobile, no clip; ul handles its own overflow-x. */}
          <div ref={containerRef} className="lg:flex-1 lg:overflow-hidden">
            <motion.ul
              ref={trackRef}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              style={pinReady ? { x } : undefined}
              className={
                pinReady
                  ? "flex gap-8 will-change-transform"
                  : "flex snap-x snap-proximity gap-8 overflow-x-auto px-6 pb-4 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              }
            >
              {ITEMS.map((item, i) => {
                const label = tItems(item.key);
                return (
                  <motion.li
                    key={item.key}
                    variants={revealUp}
                    className={`flex w-[260px] shrink-0 snap-start flex-col gap-5 sm:w-[300px] ${
                      i % 3 === 1 ? "lg:pt-0" : "lg:pt-12"
                    }`}
                  >
                    <div className="relative h-[346px] overflow-hidden rounded-[26px] sm:h-[399px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={label}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <p className="font-display text-xl font-semibold leading-tight text-ink-deep sm:text-2xl">
                      {label}
                    </p>
                  </motion.li>
                );
              })}
              {/* End-edge spacer so the last card has breathing room */}
              <li className="w-2 shrink-0 lg:w-12" aria-hidden />
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
