"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import clsx from "clsx";

export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  const switchTo = (next: "en" | "ar") => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div className={clsx("flex items-center gap-1 text-xs", className)}>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={clsx(
          "px-2 py-1 uppercase tracking-wider transition-colors duration-200",
          locale === "en"
            ? "text-sand"
            : "text-sand/50 hover:text-sand/80"
        )}
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
      >
        {t("english")}
      </button>
      <span className="text-sand/30" aria-hidden>
        /
      </span>
      <button
        type="button"
        onClick={() => switchTo("ar")}
        className={clsx(
          "px-2 py-1 font-display tracking-wider transition-colors duration-200",
          locale === "ar"
            ? "text-sand"
            : "text-sand/50 hover:text-sand/80"
        )}
        aria-label="Switch to Arabic"
        aria-pressed={locale === "ar"}
      >
        {t("arabic")}
      </button>
    </div>
  );
}
