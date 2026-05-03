import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-ink text-sand">{children}</body>
    </html>
  );
}
