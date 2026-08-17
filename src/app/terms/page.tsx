import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, AlertTriangle } from "lucide-react";

// DRAFT — REQUIRES LEGAL REVIEW BEFORE LAUNCH
// This page has been migrated to reflect Indian jurisdiction (IT Act 2000,
// Consumer Protection (E-Commerce) Rules 2020, Indian Contract Act 1872).
// All Shopify-specific order/returns mechanics reference hayatiworld.com checkout.

export default function TermsPage() {
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

        {/* Legal Review Banner */}
        <div className="p-4 rounded-xl bg-status-warning/10 border border-status-warning/30 flex items-start gap-3 mb-8">
          <AlertTriangle className="h-5 w-5 text-status-warning shrink-0 mt-0.5" />
          <div className="text-xs text-text-secondary leading-relaxed">
            <span className="font-bold text-white uppercase block mb-0.5">
              DRAFT — Requires Legal Review Before Commercial Launch
            </span>
            This document is subject to formal review by qualified Indian legal counsel prior to
            live publication. Content has been migrated from hayatiworld.com and adapted for
            Indian jurisdiction compliance.
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-6 w-6 text-brand-400" />
          <span className="text-xs font-mono text-text-muted">TERMS & CONDITIONS // HAYATI WORLD</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-2">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs font-mono text-text-muted mb-8">Last updated: 2026 · Governing Law: India</p>

        <div className="space-y-8 text-sm text-text-secondary leading-relaxed">

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Introduction</h2>
            <p>
              Welcome to Hayati World (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or
              purchasing from <a href="https://hayatiworld.com" className="text-brand-400 hover:underline">hayatiworld.com</a>,
              you agree to be bound by these Terms &amp; Conditions and all applicable Indian laws and regulations,
              including the Information Technology Act, 2000 and the Consumer Protection (E-Commerce) Rules, 2020.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Products &amp; Ordering</h2>
            <p>
              All products listed on hayatiworld.com are subject to availability. We reserve the right to limit
              quantities, discontinue products, or modify prices at any time without prior notice. Orders are
              confirmed only upon receipt of payment and dispatch confirmation via email.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Pricing &amp; Payment</h2>
            <p>
              All prices are listed in Indian Rupees (INR) and are inclusive of applicable GST unless stated
              otherwise. Payments are processed securely via Shopify Payments, Razorpay, UPI, or other
              payment gateways integrated on our checkout page. We do not store card or UPI details on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Shipping &amp; Delivery</h2>
            <p>
              We ship across India. Estimated delivery timelines are 3–7 business days for most pin codes.
              Delivery timelines may vary due to courier delays, public holidays, or circumstances beyond our
              control. We are not liable for delays caused by third-party logistics partners once the shipment
              is dispatched.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Cancellation &amp; Refund</h2>
            <p>
              Please refer to our dedicated{" "}
              <Link href="/refund-policy" className="text-brand-400 hover:underline">
                Cancellation &amp; Refund Policy
              </Link>{" "}
              for full details on cancellations, returns, and refunds.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">6. Food &amp; Beverage Disclaimer</h2>
            <p>
              Hayati beverages are food products regulated under the Food Safety and Standards Act, 2006 (FSSAI).
              Product claims such as &ldquo;Zero Sugar,&rdquo; &ldquo;Enriched with Vitamin C,&rdquo; and
              &ldquo;Probiotic&rdquo; are based on formulation data and are subject to FSSAI-compliant
              substantiation. These statements are not intended to diagnose, treat, cure, or prevent any disease.
              Consult a physician before consuming if you have medical conditions or allergies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">7. Intellectual Property</h2>
            <p>
              The Hayati brand name, logo, product imagery, and all associated creative assets are the exclusive
              intellectual property of Hayati World. Unauthorised reproduction, distribution, or commercial use
              is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">8. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of India. Any disputes
              arising shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">9. Contact</h2>
            <div className="p-4 rounded-xl bg-neutral-900 border border-border-subtle font-mono text-xs space-y-1.5 text-text-secondary">
              <div><strong className="text-white">Email:</strong>{" "}
                <a href="mailto:info@hayatiworld.com" className="text-brand-400 hover:underline">info@hayatiworld.com</a>
              </div>
              <div><strong className="text-white">Phone:</strong> +91 87920 09700</div>
              <div><strong className="text-white">WhatsApp:</strong>{" "}
                <a href="https://wa.me/918792009700" className="text-brand-400 hover:underline">wa.me/918792009700</a>
              </div>
              <div><strong className="text-white">Instagram:</strong>{" "}
                <a href="https://instagram.com/hayati_world_official" className="text-brand-400 hover:underline">@hayati_world_official</a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
