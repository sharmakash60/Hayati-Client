import React from "react";
import Link from "next/link";
import { ArrowLeft, Building2, AlertTriangle } from "lucide-react";

// PROMPT 26 — Indian F&B Regulatory & E-Commerce Compliance
// This page consolidates all mandatory Indian disclosures:
//   - Company/Seller identity (Consumer Protection E-Commerce Rules 2020)
//   - FSSAI license number (FSSA 2006)
//   - Registered address
//   - Grievance officer details

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary px-6 py-16">
      <div className="mx-auto max-w-3xl glass-card p-8 sm:p-12 border-border-subtle bg-neutral-950/80">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 hover:text-brand-300 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Hayati World</span>
        </Link>

        <div className="p-4 rounded-xl bg-status-warning/10 border border-status-warning/30 flex items-start gap-3 mb-8">
          <AlertTriangle className="h-5 w-5 text-status-warning shrink-0 mt-0.5" />
          <div className="text-xs text-text-secondary leading-relaxed">
            <span className="font-bold text-white uppercase block mb-0.5">
              DRAFT — Requires Legal Review & Client Data Before Commercial Launch
            </span>
            Fields marked <strong>[PENDING CLIENT INPUT]</strong> must be supplied by the client
            before this page goes live. Do not fabricate FSSAI license numbers or registered addresses.
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Building2 className="h-6 w-6 text-brand-400" />
          <span className="text-xs font-mono text-text-muted">LEGAL NOTICE & COMPANY INFO // HAYATI WORLD</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-2">
          Legal Notice
        </h1>
        <p className="text-xs font-mono text-text-muted mb-8">
          Mandatory disclosures under Indian law · Consumer Protection (E-Commerce) Rules 2020
        </p>

        <div className="space-y-8 text-sm text-text-secondary leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Seller / Company Information</h2>
            <div className="p-4 rounded-xl bg-neutral-900 border border-border-subtle font-mono text-xs space-y-2 text-text-secondary">
              <div><strong className="text-white">Brand Name:</strong> Hayati World</div>
              <div>
                <strong className="text-white">Registered Business Name:</strong>{" "}
                <span className="text-yellow-400">[ PENDING CLIENT INPUT — Legal entity name as registered ]</span>
              </div>
              <div>
                <strong className="text-white">Registered Address:</strong>{" "}
                <span className="text-yellow-400">[ PENDING CLIENT INPUT — Full registered office address ]</span>
              </div>
              <div>
                <strong className="text-white">CIN / GSTIN:</strong>{" "}
                <span className="text-yellow-400">[ PENDING CLIENT INPUT ]</span>
              </div>
              <div><strong className="text-white">Email:</strong>{" "}
                <a href="mailto:info@hayatiworld.com" className="text-brand-400 hover:underline">info@hayatiworld.com</a>
              </div>
              <div><strong className="text-white">Phone:</strong>{" "}
                <a href="tel:+918792009700" className="text-brand-400 hover:underline">+91 87920 09700</a>
              </div>
              <div><strong className="text-white">WhatsApp:</strong>{" "}
                <a href="https://wa.me/918792009700" className="text-brand-400 hover:underline">wa.me/918792009700</a>
              </div>
              <div><strong className="text-white">Website:</strong>{" "}
                <a href="https://hayatiworld.com" className="text-brand-400 hover:underline">hayatiworld.com</a>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. FSSAI License</h2>
            <div className="p-4 rounded-xl bg-neutral-900 border border-border-subtle font-mono text-xs space-y-2 text-text-secondary">
              <div>
                <strong className="text-white">FSSAI License Number:</strong>{" "}
                <span className="text-yellow-400">[ PENDING CLIENT INPUT — Do NOT fabricate ]</span>
              </div>
              <div>
                <strong className="text-white">License Holder Name:</strong>{" "}
                <span className="text-yellow-400">[ PENDING CLIENT INPUT ]</span>
              </div>
              <div>
                <strong className="text-white">Manufacturing Address:</strong>{" "}
                <span className="text-yellow-400">[ PENDING CLIENT INPUT — Address where product is manufactured/co-packed ]</span>
              </div>
            </div>
            <p className="text-xs text-text-muted">
              Per the Food Safety and Standards Act, 2006 (FSSAI), every food business operator must
              display their valid FSSAI license number. This field will be populated once the client
              supplies the official license documentation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Grievance Officer</h2>
            <p>
              As required by the Consumer Protection (E-Commerce) Rules 2020 and IT (Intermediary Guidelines
              and Digital Media Ethics Code) Rules 2021, we have designated a Grievance Officer:
            </p>
            <div className="p-4 rounded-xl bg-neutral-900 border border-border-subtle font-mono text-xs space-y-2 text-text-secondary">
              <div>
                <strong className="text-white">Grievance Officer Name:</strong>{" "}
                <span className="text-yellow-400">[ PENDING CLIENT INPUT ]</span>
              </div>
              <div><strong className="text-white">Email:</strong>{" "}
                <a href="mailto:info@hayatiworld.com" className="text-brand-400 hover:underline">info@hayatiworld.com</a>
              </div>
              <div><strong className="text-white">Response Time:</strong> Within 48 hours of receipt</div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Hosting & Platform</h2>
            <p>
              This website is built on Next.js and hosted on globally distributed edge infrastructure.
              The e-commerce checkout is powered by Shopify, a PCI-DSS Level 1 certified payment
              processing platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Consumer Dispute Resolution</h2>
            <p>
              For any grievance or dispute, please first contact us at{" "}
              <a href="mailto:info@hayatiworld.com" className="text-brand-400 hover:underline">info@hayatiworld.com</a>{" "}
              or +91 87920 09700. Unresolved disputes may be escalated to the Consumer Disputes
              Redressal Commission under the Consumer Protection Act, 2019.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
