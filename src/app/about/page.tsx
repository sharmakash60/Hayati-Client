import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Instagram } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Hayati World | Premium Functional Beverages",
  description:
    "Learn about Hayati World — our mission to craft premium functional beverages that energise and hydrate using only the finest natural ingredients.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 hover:text-brand-300 mb-10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Hayati World</span>
        </Link>

        {/* Hero Block */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-8">
            <Image
              src="/logo.webp"
              alt="Hayati World Logo"
              width={160}
              height={50}
              className="h-12 w-auto object-contain"
            />
          </div>
          <span className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-4">
            Our Story
          </span>
          <h1 className="font-display text-5xl sm:text-7xl font-black text-white uppercase tracking-tight mb-6 leading-none">
            Crafted for Life&apos;s<br />
            <span className="text-brand-400">Best Moments</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed">
            Hayati World was born from a simple belief: that premium, functional hydration should
            taste extraordinary. We craft beverages that energise, hydrate, and delight — using
            only the finest natural ingredients, with zero artificial compromises.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Our Mission",
              body: "To craft premium functional beverages that energise and hydrate, using only the finest natural ingredients.",
              icon: "🌿",
            },
            {
              title: "Our Promise",
              body: "Zero artificial sweeteners, zero synthetic preservatives. Every Hayati can is a commitment to your wellbeing and to the planet.",
              icon: "🔬",
            },
            {
              title: "Our Packaging",
              body: "100% recyclable aluminum cans. Endlessly recyclable without quality loss — the most sustainable choice in beverage packaging.",
              icon: "♻️",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="glass-card p-6 border-border-subtle bg-neutral-900/60 space-y-3"
            >
              <span className="text-3xl">{item.icon}</span>
              <h2 className="text-lg font-bold text-white">{item.title}</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Product Collections Brief */}
        <div className="glass-card p-8 border-border-subtle bg-neutral-900/60 mb-12">
          <h2 className="font-display text-3xl font-black text-white uppercase tracking-tight mb-6">
            Our Collections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-text-secondary">
            {[
              {
                name: "Alder Series",
                desc: "Alpine fruit botanical infusions — crisp, clean, and refreshing. Apple, Lime, Pineapple, Raspberry, and Peach.",
              },
              {
                name: "HOPP Series",
                desc: "Adaptogenic sparkling beverages with real botanicals. Ginger Lime, Lemon Mint, Strawberry, and Wild Berry.",
              },
              {
                name: "Signature Botanicals",
                desc: "Our premium functional line with probiotic and vitamin enrichment. Blue Lagoon, Green Mint, Hazelnut, and more.",
              },
              {
                name: "Fruit Splash",
                desc: "20% real fruit juice charged with Vitamin C and zero caffeine. Bold flavours, real ingredients.",
              },
            ].map((col) => (
              <div key={col.name} className="p-4 rounded-xl bg-neutral-950/80 border border-border-subtle">
                <h3 className="font-bold text-white mb-1">{col.name}</h3>
                <p>{col.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Block */}
        <div className="glass-card p-8 border-border-subtle bg-neutral-900/60 text-center">
          <h2 className="font-display text-3xl font-black text-white uppercase tracking-tight mb-2">
            Get in Touch
          </h2>
          <p className="text-text-secondary text-sm mb-6">
            Questions, wholesale enquiries, or just want to say hello — we&apos;re here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:info@hayatiworld.com"
              className="px-6 py-3 rounded-pill text-sm font-bold bg-brand-400 text-black hover:scale-105 transition-transform"
            >
              info@hayatiworld.com
            </a>
            <a
              href="https://wa.me/918792009700"
              className="px-6 py-3 rounded-pill text-sm font-bold bg-neutral-800 border border-border-subtle text-white hover:text-brand-400 hover:border-brand-500/40 transition-colors"
            >
              WhatsApp: +91 87920 09700
            </a>
            <a
              href="https://instagram.com/hayati_world_official"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-pill text-sm font-bold bg-neutral-800 border border-border-subtle text-white hover:text-brand-400 hover:border-brand-500/40 transition-colors"
            >
              <Instagram className="h-4 w-4" />
              @hayati_world_official
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
