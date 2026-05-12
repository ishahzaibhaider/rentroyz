import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./lib/i18n/request";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
});

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*|api).*)"],
};
