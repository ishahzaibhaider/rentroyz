import {
  Inter,
  Space_Grotesk,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { locales, type Locale } from "@/lib/i18n/request";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// IBM Plex Sans Arabic — modern professional Arabic sans, common in Saudi/Gulf
// brands. One font covers both body and display; weight contrast (400 for body,
// 600/700 for headings) creates the hierarchy.
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${sans.variable} ${display.variable} ${arabic.variable}`}
    >
      <head>
        {/* Pre-warm the hero video. The browser fires these requests as soon
            as the HTML is parsed — before React hydrates, before the splash
            even renders — so the bytes are already on their way (or in cache)
            by the time Transformation does its blob fetch. The `media`
            attribute makes each browser download only the size-appropriate
            encode: phones get the 4.7 MB mobile file, larger screens get the
            6.9 MB desktop file. Same files Transformation fetches; the second
            fetch hits the disk cache instead of the network. */}
        <link
          rel="preload"
          as="video"
          type="video/mp4"
          href="/video/transform-mobile.mp4"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          as="video"
          type="video/mp4"
          href="/video/transform.mp4"
          media="(min-width: 769px)"
        />
      </head>
      <body className="bg-ink text-sand">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
