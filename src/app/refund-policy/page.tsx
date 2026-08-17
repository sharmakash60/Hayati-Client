import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCcw, AlertTriangle } from "lucide-react";

// DRAFT — REQUIRES LEGAL REVIEW BEFORE LAUNCH
// Cancellation & Refund Policy for Indian e-commerce under
// Consumer Protection Act 2019 & Consumer Protection (E-Commerce) Rules 2020.

export default function RefundPolicyPage() {
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
              DRAFT — Requires Legal Review Before Commercial Launch
            </span>
            This policy has been structured under Indian Consumer Protection law. Review with qualified
            legal counsel and verify all return timelines align with Shopify order management capabilities
            before publishing.
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <RefreshCcw className="h-6 w-6 text-brand-400" />
          <span className="text-xs font-mono text-text-muted">CANCELLATION & REFUND POLICY // HAYATI WORLD</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-2">
          Cancellation &amp; Refund Policy
        </h1>
        <p className="text-xs font-mono text-text-muted mb-8">Last updated: 2026 · Governing Law: India</p>

        <div className="space-y-8 text-sm text-text-secondary leading-relaxed">

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Order Cancellation</h2>
            <p>
              Orders may be cancelled within <strong className="text-white">24 hours of placement</strong> for
              a full refund, provided the order has not yet been dispatched. To cancel, contact us immediately at{" "}
              <a href="mailto:info@hayatiworld.com" className="text-brand-400 hover:underline">info@hayatiworld.com</a>{" "}
              or{" "}
              <a href="https://wa.me/918792009700" className="text-brand-400 hover:underline">WhatsApp +91 87920 09700</a>{" "}
              with your order number.
            </p>
            <p>
              Once an order has been dispatched, it cannot be cancelled. Please refer to the Returns section below.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Returns</h2>
            <p>
              As Hayati products are consumable food and beverage items, we accept returns only in the following
              circumstances:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Product received is damaged, defective, or leaking</li>
              <li>Wrong product or flavour was delivered</li>
              <li>Product is past its &ldquo;Best Before&rdquo; date at the time of delivery</li>
            </ul>
            <p>
              Return requests must be raised within <strong className="text-white">48 hours of delivery</strong>{" "}
              with photographic evidence of the issue. We do not accept returns for change of mind on food products.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Refund Process</h2>
            <p>
              Approved refunds will be processed within <strong className="text-white">5–7 business days</strong>{" "}
              to the original payment method. Refunds for UPI and net banking are typically faster (2–3 days)
              than card refunds, which depend on your bank&apos;s processing timelines.
            </p>
            <p>
              Shipping charges are non-refundable unless the return is due to our error (wrong or damaged product).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Replacement</h2>
            <p>
              Where a refund is not feasible, we may offer a replacement shipment at our discretion. Replacements
              are dispatched within 2–3 business days of return approval.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. How to Raise a Return/Refund Request</h2>
            <div className="p-4 rounded-xl bg-neutral-900 border border-border-subtle font-mono text-xs space-y-1.5 text-text-secondary">
              <div>1. Email <a href="mailto:info@hayatiworld.com" className="text-brand-400 hover:underline">info@hayatiworld.com</a> with subject: <strong className="text-white">RETURN — [Your Order Number]</strong></div>
              <div>2. Include photos of the damaged/incorrect product</div>
              <div>3. We will respond within 1 business day</div>
              <div className="pt-1"><strong className="text-white">WhatsApp Support:</strong>{" "}
                <a href="https://wa.me/918792009700" className="text-brand-400 hover:underline">+91 87920 09700</a>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">6. Governing Law</h2>
            <p>
              This policy is governed by the Consumer Protection Act, 2019 and the Consumer Protection
              (E-Commerce) Rules, 2020. For unresolved disputes, you may approach the relevant Consumer
              Disputes Redressal Commission.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
