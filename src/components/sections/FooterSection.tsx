"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, Instagram, Lock } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="bg-black border-t border-neutral-900 px-6 sm:px-10 lg:px-16 py-16 text-neutral-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left">
        {/* Col 1 & 2: Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="inline-block">
            <span className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider">
              HAYA<span className="text-brand-400">TI</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
            Precision botanical hydration engineered for peak physical endurance and cognitive
            focus. Crafted in India using 100% recyclable aluminum canisters.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-brand-400 font-bold px-3 py-1 rounded-pill bg-brand-950/60 border border-brand-500/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>FSSAI Lic. 10020043003412</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-300 font-semibold px-3 py-1 rounded-pill bg-neutral-900 border border-neutral-800">
              <Lock className="h-3.5 w-3.5 text-brand-400" />
              <span>Shopify PCI-DSS Level 1</span>
            </div>
          </div>
        </div>

        {/* Col 3: Formulas */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider mb-4">
            Formulas
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/products/alder-apple" className="hover:text-brand-400 transition-colors">
                Alder Apple (₹189)
              </Link>
            </li>
            <li>
              <Link href="/products/alder-lime" className="hover:text-brand-400 transition-colors">
                Alder Lime (₹189)
              </Link>
            </li>
            <li>
              <Link href="/products/hopp-ginger-lime" className="hover:text-brand-400 transition-colors">
                HOPP Ginger Lime (₹189)
              </Link>
            </li>
            <li>
              <Link href="/products/hopp-strawberry" className="hover:text-brand-400 transition-colors">
                HOPP Strawberry (₹189)
              </Link>
            </li>
            <li>
              <Link href="/products/signature-blue-lagoon" className="hover:text-brand-400 transition-colors">
                Signature Blue Lagoon (₹219)
              </Link>
            </li>
            <li>
              <Link href="/products/fruit-splash-grape-ape" className="hover:text-brand-400 transition-colors">
                Fruit Splash Grape (₹169)
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal Policies */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider mb-4">
            Legal & Compliance
          </h4>
          <ul className="space-y-2.5 text-xs">
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
            <li>
              <Link href="/about" className="hover:text-brand-400 transition-colors">
                About Hayati World
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Contact & Sourcing */}
        <div>
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider mb-4">
            Direct Support
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-400 shrink-0" />
              <a href="mailto:info@hayatiworld.com" className="hover:text-white transition-colors">
                info@hayatiworld.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-400 shrink-0" />
              <a href="tel:+918792009700" className="hover:text-white transition-colors">
                +91 87920 09700
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-brand-400 shrink-0" />
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

      {/* Bottom Legal Bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Hayati World Private Limited. All rights reserved.</p>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span>UPI / Cards / NetBanking Accepted</span>
          <span>•</span>
          <span>Free Delivery Above ₹1,499</span>
        </div>
      </div>
    </footer>
  );
}
