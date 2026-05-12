"use client";

import { motion } from "framer-motion";
import { calm } from "@/lib/motion";

type Props = {
  id?: string;
  /** First line of the heading (lighter weight). */
  titleLineOne: string;
  /** Second line of the heading (bolder weight). Optional — pass null for single-line titles. */
  titleLineTwo?: string;
  body: string[];
  imageSrc: string;
  imageAlt: string;
  /** Mirrors the layout (text left, image right). Defaults to image-left. */
  reverse?: boolean;
  /** Adds a subtle dark overlay over the image (used when image is a photograph behind the heading). */
  imageOverlay?: boolean;
  /** Renders the image with object-contain (e.g. for product/phone shots) instead of object-cover. */
  imageContain?: boolean;
  /** Decorative oversized type rendered behind the section, partially clipped. */
  decorativeText?: string;
  /** Aligns the decorative text edge to "left" or "right". */
  decorativeAlign?: "left" | "right";
  ctaHref?: string;
  /** CTA label — pass a translated string. */
  ctaLabel?: string;
};

export default function BlogSection({
  id,
  titleLineOne,
  titleLineTwo,
  body,
  imageSrc,
  imageAlt,
  reverse = false,
  imageOverlay = false,
  imageContain = false,
  decorativeText,
  decorativeAlign = "left",
  ctaHref = "#contact",
  ctaLabel = "Read More",
}: Props) {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-sand-soft px-6 py-20 sm:py-24 lg:px-10 lg:py-32"
    >
      {decorativeText && (
        <div
          aria-hidden
          className={`pointer-events-none absolute bottom-[-40px] hidden select-none whitespace-nowrap font-display text-[28vw] font-bold leading-none tracking-tight text-ink-deep/[0.06] sm:bottom-[-60px] sm:text-[26vw] lg:bottom-[-80px] lg:block lg:text-[22vw] ${
            decorativeAlign === "right" ? "end-[-2%]" : "start-[-2%]"
          }`}
        >
          {decorativeText}
        </div>
      )}

      <div className="relative mx-auto max-w-7xl">
        <div
          className={`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14 ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 32 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: calm }}
            className="relative w-full shrink-0 overflow-hidden rounded-[26px] lg:w-1/2"
          >
            <div className="relative aspect-[762/760]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className={`absolute inset-0 h-full w-full ${
                  imageContain ? "object-contain" : "object-cover"
                }`}
              />
              {imageOverlay && (
                <div className="absolute inset-0 bg-black/20" />
              )}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: calm, delay: 0.1 }}
            className={`flex w-full flex-col gap-6 lg:w-1/2 ${
              reverse ? "lg:items-end lg:text-end" : ""
            }`}
          >
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-3xl leading-[1.1] tracking-tight text-ink-deep sm:text-4xl lg:text-5xl xl:text-6xl">
                <span className="font-light">{titleLineOne}</span>
                {titleLineTwo && (
                  <>
                    <br />
                    <span className="font-medium">{titleLineTwo}</span>
                  </>
                )}
              </h2>
              <div
                className={`h-[3px] w-56 bg-ember ${
                  reverse ? "self-end" : ""
                }`}
              />
            </div>

            <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-deep/85 sm:text-lg lg:text-xl">
              {body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <a
              href={ctaHref}
              className={`group inline-flex items-center gap-3 text-lg text-ember transition-colors duration-300 hover:text-ember/80 ${
                reverse ? "self-end" : ""
              }`}
            >
              {ctaLabel}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-7 transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
