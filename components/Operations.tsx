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

  // translateX = total horizontal distance the track must travel to fully
  // reveal its overflow. Measured from refs after mount, recomputed on resize.
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
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
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // RTL: cards overflow LEFT, translate POSITIVE x to reveal.
  // LTR: cards overflow RIGHT, translate NEGATIVE x.
  const xTarget = locale === "ar" ? translateX : -translateX;
  const x = useTransform(scrollYProgress, [0, 1], [0, xTarget]);

  return (
    <section
      ref={sectionRef}
      id="operations"
      className="relative bg-sand-soft"
      style={
        translateX > 0
          ? { height: `calc(100vh + ${translateX}px)` }
          : undefined
      }
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="flex h-full w-full flex-col justify-center gap-6 py-12 sm:gap-8 sm:py-16 lg:flex-row lg:items-center lg:gap-12 lg:py-0">
          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: calm }}
            className="shrink-0 px-6 lg:w-[344px] lg:ps-10"
          >
            <h2 className="font-display text-3xl leading-[1.1] tracking-tight text-ink-deep sm:text-4xl lg:text-5xl xl:text-6xl">
              {t("titleLineOne")}{" "}
              <span className="font-semibold italic">{t("titleLineTwo")}</span>
            </h2>
            <div className="mt-4 h-[3px] w-40 bg-ember sm:mt-5 sm:w-56" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-deep/85 sm:mt-6 sm:text-base lg:text-lg">
              {t("tagline")}
            </p>
          </motion.div>

          {/* Cards container — overflow-hidden so the translating track gets clipped */}
          <div
            ref={containerRef}
            className="overflow-hidden lg:flex-1"
          >
            <motion.ul
              ref={trackRef}
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              style={{ x }}
              className="flex gap-6 ps-6 will-change-transform sm:gap-8 lg:ps-0"
            >
              {ITEMS.map((item, i) => {
                const label = tItems(item.key);
                return (
                  <motion.li
                    key={item.key}
                    variants={revealUp}
                    className={`flex w-[230px] shrink-0 flex-col gap-4 sm:w-[280px] sm:gap-5 lg:w-[300px] ${
                      i % 3 === 1 ? "lg:pt-0" : "lg:pt-12"
                    }`}
                  >
                    <div className="relative h-[280px] overflow-hidden rounded-[22px] sm:h-[340px] sm:rounded-[26px] lg:h-[399px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={label}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <p className="font-display text-base font-semibold leading-tight text-ink-deep sm:text-xl lg:text-2xl">
                      {label}
                    </p>
                  </motion.li>
                );
              })}
              {/* End-edge spacer so the last card has breathing room */}
              <li className="w-6 shrink-0 lg:w-12" aria-hidden />
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
