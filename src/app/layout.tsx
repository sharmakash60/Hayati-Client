import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MotionProvider from "@/lib/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hayatiworld.com"),
  title: "Hayati World – Premium Functional Beverages | India",
  description:
    "Hayati World crafts premium functional beverages that energise and hydrate using only the finest natural ingredients — Zero Sugar, real fruit juice, and 100% recyclable aluminum cans. Shop online in India.",
  keywords: [
    "Hayati",
    "Hayati World",
    "functional beverage India",
    "zero sugar drinks",
    "fruit juice drinks India",
    "electrolyte drink",
    "probiotic drink India",
    "sparkling water India",
    "aluminum can drinks",
    "natural hydration",
  ],
  authors: [{ name: "Hayati World", url: "https://hayatiworld.com" }],
  openGraph: {
    title: "Hayati World – Liquid Precision. Zero Compromise.",
    description:
      "Premium functional beverages with real fruit juice, zero sugar, and ionic electrolytes. Free shipping above ₹1,499.",
    type: "website",
    locale: "en_IN",
    siteName: "Hayati World",
    url: "https://hayatiworld.com",
    images: [{ url: "/logo.webp", width: 800, height: 400, alt: "Hayati World Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hayati World – Premium Functional Beverages",
    description: "Zero sugar. Real fruit juice. 100% recyclable aluminum. Shop Hayati World.",
    site: "@hayati_world_official",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#0d0d0f" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <JsonLd />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased selection:bg-brand-400 selection:text-black">
        {/* Accessible Skip to Content Link (WCAG 2.1 AA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-2.5 focus:bg-brand-400 focus:text-black focus:font-bold focus:rounded-pill focus:shadow-glow-brand focus:outline-none"
        >
          Skip to main content
        </a>

        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
