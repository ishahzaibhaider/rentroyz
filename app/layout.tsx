import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rent Royz — We Manage. You Earn.",
  description:
    "Premium end-to-end short-stay property management in Saudi Arabia. We furnish it. We list it. We manage it.",
  metadataBase: new URL("https://rentroyz.com"),
  openGraph: {
    title: "Rent Royz — We Manage. You Earn.",
    description:
      "Premium end-to-end short-stay property management in Saudi Arabia.",
    type: "website",
  },
};

// This root layout intentionally renders children directly without <html>/<body>.
// The real html element lives in [locale]/layout.tsx so it can read the locale
// param and set lang + dir per-locale (static generation can't read headers()).
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
