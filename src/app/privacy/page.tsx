import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock, AlertTriangle } from "lucide-react";

// DRAFT — REQUIRES LEGAL REVIEW BEFORE LAUNCH
// Migrated for Indian jurisdiction: IT Act 2000, PDPB (Personal Data Protection),
// and Consumer Protection (E-Commerce) Rules 2020.

export default function PrivacyPage() {
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
            This Privacy Policy has been structured for Indian jurisdiction compliance and should be
            reviewed by qualified Indian legal counsel before live publication.
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Lock className="h-6 w-6 text-brand-400" />
          <span className="text-xs font-mono text-text-muted">PRIVACY POLICY // HAYATI WORLD</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-text-muted mb-8">Last updated: 2026 · Governing Law: India</p>

        <div className="space-y-8 text-sm text-text-secondary leading-relaxed">

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
            <p>When you visit hayatiworld.com or make a purchase, we may collect:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Name, email address, phone number, and shipping/billing address</li>
              <li>Payment information (processed securely by Shopify — we do not store card details)</li>
              <li>Order history and product preferences</li>
              <li>Device type, browser, IP address, and usage data (via Shopify Analytics and cookies)</li>
              <li>Communications you send us via email or WhatsApp</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Process and fulfil your orders and send order confirmations</li>
              <li>Communicate about shipping, delivery, and customer support</li>
              <li>Send marketing communications (only with your consent, and you can opt out at any time)</li>
              <li>Improve our website, products, and services</li>
              <li>Comply with applicable Indian laws and regulations</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Sharing of Information</h2>
            <p>
              We do not sell your personal data. We may share it with:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li><strong className="text-white">Shopify Inc.</strong> — our e-commerce platform and payment processor</li>
              <li><strong className="text-white">Logistics partners</strong> — to fulfil and deliver your orders</li>
              <li><strong className="text-white">Legal authorities</strong> — if required by applicable Indian law</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Cookies</h2>
            <p>
              We use cookies to maintain your shopping session, remember preferences, and analyse site usage.
              You can manage cookie preferences via our Cookie Consent banner or your browser settings.
              Disabling certain cookies may affect site functionality (e.g. cart persistence).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">5. Your Rights</h2>
            <p>
              You have the right to access, rectify, or request deletion of your personal data at any time.
              To exercise these rights, please contact us at{" "}
              <a href="mailto:info@hayatiworld.com" className="text-brand-400 hover:underline">
                info@hayatiworld.com
              </a>{" "}
              or call{" "}
              <a href="tel:+918792009700" className="text-brand-400 hover:underline">
                +91 87920 09700
              </a>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">6. Data Retention</h2>
            <p>
              We retain your personal data for as long as necessary to fulfil your orders, comply with legal
              obligations, and resolve disputes. Order records may be retained for up to 7 years as required
              under Indian accounting and tax regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">7. Security</h2>
            <p>
              All data transmitted between your browser and hayatiworld.com is encrypted via TLS 1.3.
              Payment processing is handled exclusively by PCI-DSS Level 1 certified processors via Shopify.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">8. Contact</h2>
            <div className="p-4 rounded-xl bg-neutral-900 border border-border-subtle font-mono text-xs space-y-1.5 text-text-secondary">
              <div><strong className="text-white">Email:</strong>{" "}
                <a href="mailto:info@hayatiworld.com" className="text-brand-400 hover:underline">info@hayatiworld.com</a>
              </div>
              <div><strong className="text-white">Phone / WhatsApp:</strong> +91 87920 09700</div>
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
