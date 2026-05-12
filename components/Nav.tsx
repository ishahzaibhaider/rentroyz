"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Wordmark from "./ui/Wordmark";
import LanguageSwitcher from "./LanguageSwitcher";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://dev.rentroyz.com";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll on <html> (not <body>) while the mobile menu is open. Lenis
  // smooth-scroll attaches to <body>, so mutating body styles can race with
  // its DOM updates and surface as React reconciliation errors. <html> is
  // safe to touch. Also closes the menu on Escape.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-calm",
          scrolled
            ? "bg-ink-deep/85 backdrop-blur-md border-b border-sand/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a href="#top" className="flex items-center gap-2 text-sand">
            <Wordmark className="h-7 w-auto" />
          </a>

          <nav className="hidden items-center gap-10 text-sm tracking-wide text-sand/80 md:flex">
            <a className="transition hover:text-sand" href="#transformation">{t("services")}</a>
            <a className="transition hover:text-sand" href="#pillars">{t("about")}</a>
            <a className="transition hover:text-sand" href="#contact">{t("contact")}</a>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <LanguageSwitcher />
            <span className="h-4 w-px bg-sand/20" aria-hidden />
            <a
              href={`${APP_URL}/auth/register`}
              className="text-sm text-sand/80 transition hover:text-sand"
            >
              {t("signIn")}
            </a>
            <a
              href={`${APP_URL}/auth/register`}
              className="rounded-full bg-sand px-5 py-2 text-sm font-medium text-ink-deep transition-transform duration-300 ease-calm hover:scale-[1.02]"
            >
              {t("register")}
            </a>
          </div>

          <button
            aria-label="Open menu"
            className="md:hidden text-sand"
            onClick={() => setOpen(true)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu rendered as a SIBLING of <header>, not inside it.
          Inside the header, `backdrop-blur-md` (applied when scrolled) creates
          a containing block for fixed-positioned descendants — which would
          shrink this overlay to the header's height and reveal the page behind. */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink-deep px-6 py-6 md:hidden">
          <div className="flex items-center justify-between">
            <Wordmark className="h-7 w-auto text-sand" />
            <button
              aria-label="Close menu"
              className="text-sand"
              onClick={() => setOpen(false)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-8 text-3xl font-display text-sand">
            <a onClick={() => setOpen(false)} href="#transformation">{t("services")}</a>
            <a onClick={() => setOpen(false)} href="#pillars">{t("about")}</a>
            <a onClick={() => setOpen(false)} href="#contact">{t("contact")}</a>
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <div className="flex justify-center pb-2">
              <LanguageSwitcher />
            </div>
            <a href={`${APP_URL}/auth/register`} className="rounded-full border border-sand/30 px-6 py-3 text-center text-sand">
              {t("signIn")}
            </a>
            <a href={`${APP_URL}/auth/register`} className="rounded-full bg-sand px-6 py-3 text-center font-medium text-ink-deep">
              {t("register")}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
