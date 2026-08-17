"use client";

import React, { useState } from "react";
import Link from "next/link";
import { getSiteContent, getFaqs } from "@/lib/content/loader";
import { ChevronDown, Sparkles, ShieldCheck, Mail, Phone, Instagram, MapPin } from "lucide-react";

export function InfoSection() {
  const content = getSiteContent();
  const faqItems = getFaqs();
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqItems[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="info-section" className="relative z-20 bg-neutral-950 border-t border-border-subtle">
      {/* ─────────────────────────────────────────────────────────────
          1. FAQ ACCORDION (Clean, Spacious, Zero 3D Clutter)
         ───────────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3 py-1 rounded-pill bg-brand-950/60 border border-brand-500/30 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>05 // FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Everything You Need to Know
          </h2>
          <p className="text-sm text-text-secondary mt-2">
            Clear facts on our formulations, sourcing, delivery, and botanical ingredients.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                className={`glass-card rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-brand-500/40 bg-neutral-900/90 shadow-lg"
                    : "border-border-subtle bg-neutral-950/70 hover:border-neutral-700"
                }`}
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-brand-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-text-secondary leading-relaxed border-t border-border-subtle/50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. UNIFIED FOOTER (Legal, Contact, Trust Badges)
         ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border-subtle bg-black/60 px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <span className="font-display text-2xl font-black text-white tracking-wider">
              HAYA<span className="text-brand-400">TI</span>
            </span>
            <p className="text-xs text-text-secondary leading-relaxed">
              Precision botanical hydration engineered for peak physical and mental vitality. 100%
              clean label, zero artificial sweeteners.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-brand-400 font-bold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>FSSAI Certified India</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li>
                <a href="#story-track" className="hover:text-brand-400 transition-colors">
                  The Story
                </a>
              </li>
              <li>
                <Link href="/products/alder-apple" className="hover:text-brand-400 transition-colors">
                  Alder Series
                </Link>
              </li>
              <li>
                <Link href="/products/hopp-ginger-lime" className="hover:text-brand-400 transition-colors">
                  HOPP Series
                </Link>
              </li>
              <li>
                <Link href="/products/signature-blue-lagoon" className="hover:text-brand-400 transition-colors">
                  Signature Botanicals
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Compliance */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider mb-3">
              Legal & Policies
            </h4>
            <ul className="space-y-2 text-xs text-text-secondary">
              <li>
                <Link href="/terms" className="hover:text-brand-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-brand-400 transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/legal-notice" className="hover:text-brand-400 transition-colors">
                  FSSAI & Grievance Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider mb-3">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                <a href="mailto:info@hayatiworld.com" className="hover:text-white transition-colors">
                  info@hayatiworld.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                <a href="tel:+918792009700" className="hover:text-white transition-colors">
                  +91 87920 09700
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-3.5 w-3.5 text-brand-400 shrink-0" />
                <a
                  href="https://instagram.com/hayati_world_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @hayati_world_official
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} Hayati World. All rights reserved.</p>
          <p className="font-mono text-[11px]">Precision Formulated in India • Packaged in 100% Recyclable Aluminum</p>
        </div>
      </footer>
    </section>
  );
}
