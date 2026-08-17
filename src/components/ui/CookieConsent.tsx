"use client";

/**
 * CookieConsent Banner — Prompt 26 (India F&B Compliance)
 *
 * Reimplements the cookie consent banner from hayatiworld.com.
 * Consent is stored in localStorage under "hayati-cookie-consent-v1".
 * On acceptance: analytics/marketing cookies may fire.
 * On rejection: only strictly necessary cookies are used (Shopify cart session).
 */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";

const CONSENT_KEY = "hayati-cookie-consent-v1";
const CONSENT_VERSION = "1"; // bump version to re-prompt after policy changes

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) {
        // Delay slightly so it doesn&apos;t compete with page entrance animations
        const timer = setTimeout(() => setVisible(true), 2000);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable (e.g. private browsing) — show banner
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ decision: "accept", version: CONSENT_VERSION, ts: Date.now() })
      );
    } catch { /* ignore */ }
    setVisible(false);
    // Fire optional analytics initialisation here when integrated
  }

  function rejectOptional() {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ decision: "essential-only", version: CONSENT_VERSION, ts: Date.now() })
      );
    } catch { /* ignore */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[110] animate-in slide-in-from-bottom-4 fade-in duration-500"
    >
      <div className="relative glass-card bg-neutral-950/95 border border-border-subtle p-5 rounded-2xl shadow-2xl">
        {/* Close (reject) icon */}
        <button
          onClick={rejectOptional}
          aria-label="Decline optional cookies"
          className="absolute top-3 right-3 p-1.5 rounded-full text-text-muted hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon + Heading */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 rounded-lg bg-brand-400/15">
            <Cookie className="h-4 w-4 text-brand-400" />
          </div>
          <span className="text-sm font-bold text-white">Cookies &amp; Privacy</span>
        </div>

        {/* Body */}
        <p className="text-xs text-text-secondary leading-relaxed mb-4">
          We use cookies to keep your cart active and to understand how you explore our site.
          Optional analytics cookies help us improve the experience. You can change your
          preferences anytime.{" "}
          <Link href="/privacy" className="text-brand-400 hover:underline">
            Privacy Policy
          </Link>
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={acceptAll}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-pill text-xs font-bold bg-brand-400 text-black hover:scale-[1.02] transition-transform"
          >
            <Check className="h-3.5 w-3.5" />
            Accept All
          </button>
          <button
            onClick={rejectOptional}
            className="flex-1 py-2.5 px-3 rounded-pill text-xs font-bold bg-neutral-800 border border-border-subtle text-text-secondary hover:text-white transition-colors"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
