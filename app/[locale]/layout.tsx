import {
  Inter,
  Space_Grotesk,
  Cairo,
  Aref_Ruqaa,
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

const arabicBody = Cairo({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

// Aref Ruqaa = Diwani-influenced calligraphic Arabic font. Used for the
// hero/section headings only — body keeps Cairo (above) for readability.
const arabicDisplay = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic-display",
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
      className={`${sans.variable} ${display.variable} ${arabicBody.variable} ${arabicDisplay.variable}`}
    >
      <body className="bg-ink text-sand">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
