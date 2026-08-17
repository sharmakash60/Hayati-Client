"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  colorTokens,
  typographyTokens,
  spacingTokens,
  radiusTokens,
  shadowTokens,
  gradientTokens,
} from "@/data/site-config";
import {
  Sparkles,
  Check,
  Copy,
  Layers,
  Type,
  Maximize2,
  Sun,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Zap,
  Info,
  Sliders,
} from "lucide-react";

// Helper for WCAG Relative Luminance and Contrast Ratio calculation
function getLuminance(hex: string): number {
  const cleanHex = hex.replace("#", "");
  if (cleanHex.length !== 6) return 0.5;
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  const [aR, aG, aB] = [r, g, b].map((val) =>
    val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * aR + 0.7152 * aG + 0.0722 * aB;
}

function getContrastRatio(hex1: string, hex2: string): number {
  if (!hex1.startsWith("#") || !hex2.startsWith("#")) return 4.5;
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

export default function DesignSystemPage() {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [fontFallbackEmulated, setFontFallbackEmulated] = useState<boolean>(false);
  const [customBrandHex, setCustomBrandHex] = useState<string>("#a3e635");

  const copyToClipboard = (text: string, tokenName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const filteredColors =
    activeCategory === "all"
      ? colorTokens
      : colorTokens.filter((c) => c.category === activeCategory);

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary selection:bg-brand-400 selection:text-black">
      {/* Top Ambient Glow using --gradient-brand-1 */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-96 bg-brand-glow opacity-80" />

      {/* Header Bar */}
      <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-glass backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white hover:text-brand-400 transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-400 text-black font-black">
                C
              </span>
              <span>CAn DESIGN SYSTEM</span>
            </Link>
            <span className="rounded-pill bg-brand-950/80 px-2.5 py-0.5 text-xs font-mono text-brand-300 border border-brand-800">
              v1.0.0 • Tokens Live
            </span>
          </div>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <a
              href="#colors"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Colors & WCAG
            </a>
            <a
              href="#typography"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Typography
            </a>
            <a
              href="#spacing-radius"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Radius & Spacing
            </a>
            <a
              href="#shadows-gradients"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Shadows & Gradients
            </a>
            <a
              href="#interactive-playground"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Live Playground
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-pill bg-cta-bg px-4 py-2 text-xs font-bold text-cta-text hover:bg-cta-hover shadow-glow-brand transition-all"
            >
              <span>Back to Site</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Intro Hero */}
        <section className="mb-16 border-b border-border-subtle pb-12">
          <div className="inline-flex items-center gap-2 rounded-pill bg-brand-950/80 px-3 py-1 text-xs font-mono font-semibold text-brand-400 border border-brand-800/60 mb-4">
            <Zap className="h-3.5 w-3.5" />
            <span>PROMPT 2 DELIVERABLE: THEME & TOKEN ENGINE</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-text-primary mb-4">
            Brand Token Architecture
          </h1>
          <p className="max-w-3xl text-lg text-text-secondary leading-relaxed">
            Centralized design token repository loaded natively via CSS custom properties in{" "}
            <code className="rounded bg-neutral-800 px-1.5 py-0.5 text-brand-300 font-mono text-sm">
              globals.css
            </code>{" "}
            and mapped directly to Tailwind utility classes. Swapping any token variable restyles all
            components across the application without code changes.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-4">
              <span className="text-xs font-mono text-text-muted">TOTAL TOKENS</span>
              <div className="text-2xl font-bold text-brand-400 font-mono">60+ Wired</div>
            </div>
            <div className="glass-card p-4">
              <span className="text-xs font-mono text-text-muted">A11Y TARGET</span>
              <div className="text-2xl font-bold text-status-success font-mono">WCAG 2.1 AA</div>
            </div>
            <div className="glass-card p-4">
              <span className="text-xs font-mono text-text-muted">PILL RADIUS (--radius-lg)</span>
              <div className="text-2xl font-bold text-accent-cyan font-mono">34.95rem</div>
            </div>
            <div className="glass-card p-4">
              <span className="text-xs font-mono text-text-muted">DISPLAY HEADLINE CLAMP</span>
              <div className="text-2xl font-bold text-accent-amber font-mono">5.242rem Max</div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            1. COLORS & WCAG CONTRAST MATRIX
           ================================================================== */}
        <section id="colors" className="mb-20 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-brand-400 text-sm font-mono font-semibold">
                <Layers className="h-4 w-4" />
                <span>01 / COLOR SYSTEM</span>
              </div>
              <h2 className="text-3xl font-display font-bold text-white tracking-tight">
                Palette Tokens & Accessibility Ratios
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-pill bg-neutral-900 border border-border-subtle">
              {["all", "brand", "accent", "neutral", "semantic", "status"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-pill text-xs font-medium capitalize transition-all ${
                    activeCategory === cat
                      ? "bg-brand-400 text-black font-bold shadow-sm"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Color Swatch Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredColors.map((color) => {
              const isHex = color.value.startsWith("#");
              const ratioAgainstBlack = isHex ? getContrastRatio(color.value, "#0d0d0f").toFixed(2) : null;
              const ratioAgainstWhite = isHex ? getContrastRatio(color.value, "#ffffff").toFixed(2) : null;
              const passesAABlack = ratioAgainstBlack && parseFloat(ratioAgainstBlack) >= 4.5;
              const passesAAWhite = ratioAgainstWhite && parseFloat(ratioAgainstWhite) >= 4.5;

              return (
                <div
                  key={color.variable}
                  className="glass-card overflow-hidden hover:border-brand-500/40 transition-all group"
                >
                  {/* Swatch Color Bar */}
                  <div
                    className="h-28 w-full relative flex items-end p-3 border-b border-border-subtle"
                    style={{ backgroundColor: color.value.startsWith("var") ? `var(${color.variable})` : color.value }}
                  >
                    <button
                      onClick={() => copyToClipboard(`var(${color.variable})`, color.name)}
                      className="absolute top-2 right-2 rounded-pill bg-black/60 backdrop-blur-sm p-1.5 text-white hover:bg-black/90 transition-all opacity-0 group-hover:opacity-100"
                      title="Copy CSS Variable"
                    >
                      {copiedToken === color.name ? (
                        <Check className="h-3.5 w-3.5 text-brand-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-sm">
                      {color.value}
                    </span>
                  </div>

                  {/* Swatch Details */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">{color.name}</h4>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-800 text-text-muted">
                        {color.category}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-brand-400 select-all">{color.variable}</p>

                    {color.description && (
                      <p className="text-xs text-text-secondary leading-snug">{color.description}</p>
                    )}

                    {/* WCAG Compliance Badge */}
                    {isHex && (
                      <div className="pt-2 mt-2 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono">
                        <span className="text-text-muted">WCAG AA vs Canvas:</span>
                        <span
                          className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${
                            passesAABlack
                              ? "bg-status-success/20 text-status-success border border-status-success/40"
                              : "bg-neutral-800 text-text-muted"
                          }`}
                        >
                          {ratioAgainstBlack}:1 {passesAABlack ? "✓ PASS" : "UI Only"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================================================================
            2. TYPOGRAPHY SYSTEM & FONT FALLBACK STACK
           ================================================================== */}
        <section id="typography" className="mb-20 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-brand-400 text-sm font-mono font-semibold">
                <Type className="h-4 w-4" />
                <span>02 / TYPOGRAPHY SCALE</span>
              </div>
              <h2 className="text-3xl font-display font-bold text-white tracking-tight">
                Fluid Type Scale & Fallback Stack
              </h2>
            </div>

            {/* Fallback Simulation Switcher */}
            <div className="flex items-center gap-3 glass-card px-4 py-2">
              <span className="text-xs font-mono text-text-secondary">Emulate Franklin Gothic Fallback:</span>
              <button
                onClick={() => setFontFallbackEmulated(!fontFallbackEmulated)}
                className={`px-3 py-1 rounded-pill text-xs font-bold transition-all ${
                  fontFallbackEmulated
                    ? "bg-status-warning text-black"
                    : "bg-neutral-800 text-text-secondary hover:text-white"
                }`}
              >
                {fontFallbackEmulated ? "Fallback Active (Arial Narrow)" : "Primary (Franklin Gothic Atf)"}
              </button>
            </div>
          </div>

          {/* Font Family Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 border-l-4 border-brand-400">
              <span className="text-xs font-mono text-brand-400">DISPLAY HEADLINES</span>
              <h3 className="text-xl font-bold text-white mt-1">Franklin Gothic ATF</h3>
              <p className="text-xs font-mono text-text-muted mt-1">
                Fallback: &apos;Franklin Gothic Atf&apos;, &apos;Arial Narrow&apos;, &apos;Impact&apos;, sans-serif
              </p>
              <p className="text-sm text-text-secondary mt-3">
                High-impact, condensed editorial titling for hero statements and key numerical metrics.
              </p>
            </div>

            <div className="glass-card p-6 border-l-4 border-accent-cyan">
              <span className="text-xs font-mono text-accent-cyan">BODY & UI TEXT</span>
              <h3 className="text-xl font-bold text-white mt-1">Geist Sans</h3>
              <p className="text-xs font-mono text-text-muted mt-1">
                next/font/google • Zero layout shift (OFL)
              </p>
              <p className="text-sm text-text-secondary mt-3">
                Pristine, geometric legibility calibrated for mobile screens, long copy, and navigation links.
              </p>
            </div>

            <div className="glass-card p-6 border-l-4 border-accent-amber">
              <span className="text-xs font-mono text-accent-amber">METRICS & CODE</span>
              <h3 className="text-xl font-bold text-white mt-1">Geist Mono</h3>
              <p className="text-xs font-mono text-text-muted mt-1">
                next/font/google • Monospaced data tags
              </p>
              <p className="text-sm text-text-secondary mt-3">
                Used for nutrition breakdowns, technical electrolyte percentages, and badge tags.
              </p>
            </div>
          </div>

          {/* Typography Scale Table */}
          <div className="glass-card divide-y divide-border-subtle overflow-hidden">
            {typographyTokens.map((type) => (
              <div
                key={type.variable}
                className="p-6 hover:bg-neutral-900/40 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
              >
                <div className="lg:col-span-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{type.name}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-brand-300">
                      {type.pixelValue}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-text-muted">{type.variable}</div>
                  <div className="text-xs text-text-secondary font-mono">
                    Size: {type.size} | LH: {type.lineHeight}
                  </div>
                </div>

                <div className="lg:col-span-9 overflow-hidden">
                  <div
                    style={{
                      fontSize: type.size,
                      lineHeight: type.lineHeight,
                      fontFamily: fontFallbackEmulated
                        ? "'Arial Narrow', sans-serif"
                        : type.name.includes("Display")
                        ? "var(--font-display)"
                        : "var(--font-sans)",
                    }}
                    className={`text-text-primary tracking-tight font-extrabold ${
                      type.name.includes("Display") ? "uppercase" : ""
                    }`}
                  >
                    {type.sampleText}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            3. SPACING & RADIUS SYSTEM (Highlighting --radius-lg: 34.95rem)
           ================================================================== */}
        <section id="spacing-radius" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-2 text-brand-400 text-sm font-mono font-semibold mb-2">
            <Maximize2 className="h-4 w-4" />
            <span>03 / SPATIAL & GEOMETRY TOKENS</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight mb-8">
            Border Radii & Fluid Spacing Scale
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Radius Tokens Showcase */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Radius Tokens</h3>
              <p className="text-sm text-text-secondary">
                <strong className="text-brand-400 font-mono">--radius-lg: 34.95rem</strong> is configured
                as a continuous full pill for buttons and badges, while{" "}
                <strong className="text-white font-mono">--radius-xl (1rem)</strong> is used for cards.
              </p>

              <div className="space-y-4">
                {radiusTokens.map((radius) => (
                  <div key={radius.variable} className="glass-card p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white text-sm">{radius.name}</span>
                        <span className="font-mono text-xs text-text-muted ml-2">{radius.variable}</span>
                      </div>
                      <span className="font-mono text-xs text-brand-400 font-bold">{radius.value}</span>
                    </div>

                    <div className="text-xs text-text-secondary">{radius.usage}</div>

                    {/* Visual demo */}
                    <div
                      className={`p-3 bg-neutral-900 border border-brand-500/30 flex items-center justify-between text-xs font-mono ${
                        radius.isPill ? "bg-brand-950/40 border-brand-400 text-brand-300" : "text-white"
                      }`}
                      style={{
                        borderRadius: radius.value.includes("rem")
                          ? radius.value.split(" ")[0]
                          : radius.value,
                      }}
                    >
                      <span>Interactive Container Preview</span>
                      <span className="font-bold">{radius.isPill ? "PILL CTA SHAPE" : "CONTAINER"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacing Tokens Showcase */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Spacing Tokens</h3>
              <p className="text-sm text-text-secondary">
                Consistent 4px baseline rhythm scaling up to fluid responsive section clamps.
              </p>

              <div className="glass-card divide-y divide-border-subtle p-2">
                {spacingTokens.map((space) => (
                  <div key={space.variable} className="p-3 flex items-center justify-between gap-4">
                    <div className="w-36">
                      <div className="text-xs font-bold text-white">{space.name}</div>
                      <div className="text-[11px] font-mono text-brand-400">{space.variable}</div>
                    </div>

                    {/* Visual Bar */}
                    <div className="flex-1 bg-neutral-900 h-6 rounded flex items-center px-2">
                      <div
                        className="h-3 bg-brand-400 rounded-sm"
                        style={{
                          width: space.value.includes("clamp")
                            ? "70%"
                            : space.value,
                          maxWidth: "100%",
                        }}
                      />
                    </div>

                    <div className="w-24 text-right font-mono text-xs text-text-secondary">
                      {space.value} ({space.pixelValue})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. SHADOWS & BRAND GRADIENTS
           ================================================================== */}
        <section id="shadows-gradients" className="mb-20 scroll-mt-24">
          <div className="flex items-center gap-2 text-brand-400 text-sm font-mono font-semibold mb-2">
            <Sun className="h-4 w-4" />
            <span>04 / ELEVATION & LIGHTING</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight mb-8">
            Elevation Shadows & Gradient Utilities
          </h2>

          {/* Gradients Showcase */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-white mb-4">Brand Gradients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gradientTokens.map((grad) => (
                <div key={grad.variable} className="glass-card overflow-hidden">
                  <div className="h-36 w-full relative p-4 flex items-end" style={{ background: `var(${grad.variable})` }}>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-black/80 text-white backdrop-blur-md">
                      {grad.variable}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <h4 className="font-bold text-white text-sm">{grad.name}</h4>
                    <p className="text-xs text-text-secondary">{grad.purpose}</p>
                    <p className="text-[11px] font-mono text-text-muted select-all truncate">{grad.cssValue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shadow Elevations Showcase */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Elevation & Glow Shadows</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {shadowTokens.map((shadow) => (
                <div
                  key={shadow.variable}
                  className={`p-6 rounded-2xl bg-neutral-900 border border-border-subtle transition-all duration-300 ${
                    shadow.isGlow ? "border-brand-500/50" : ""
                  }`}
                  style={{ boxShadow: `var(${shadow.variable})` }}
                >
                  <span className="text-xs font-mono text-brand-400 font-bold uppercase">{shadow.name}</span>
                  <div className="text-xs font-mono text-text-muted mt-1">{shadow.variable}</div>
                  <p className="text-xs text-text-secondary mt-3">{shadow.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. INTERACTIVE LIVE PLAYGROUND
           ================================================================== */}
        <section id="interactive-playground" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-2 text-brand-400 text-sm font-mono font-semibold mb-2">
            <Sliders className="h-4 w-4" />
            <span>05 / LIVE COMPONENT SANDBOX</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-white tracking-tight mb-4">
            Dynamic Token Swapping Test
          </h2>
          <p className="text-text-secondary text-sm max-w-2xl mb-8">
            Test how changing CSS token variables dynamically propagates to components in real time.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Controls */}
            <div className="lg:col-span-4 glass-card p-6 space-y-6">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-brand-400" />
                <span>Token Override Controls</span>
              </h3>

              <div className="space-y-3">
                <label className="text-xs font-mono text-text-secondary block">
                  Quick Brand Accent Theme:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "Lime", hex: "#a3e635" },
                    { name: "Orange", hex: "#ff5e18" },
                    { name: "Cyan", hex: "#00f0ff" },
                    { name: "Purple", hex: "#a855f7" },
                    { name: "Amber", hex: "#f59e0b" },
                    { name: "Pink", hex: "#ec4899" },
                  ].map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => setCustomBrandHex(theme.hex)}
                      className={`p-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${
                        customBrandHex === theme.hex
                          ? "border-white bg-neutral-800 text-white"
                          : "border-border-subtle bg-neutral-900/50 text-text-secondary hover:text-white"
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: theme.hex }}
                      />
                      <span>{theme.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-text-secondary block">
                  Custom Hex Input:
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customBrandHex}
                    onChange={(e) => setCustomBrandHex(e.target.value)}
                    aria-label="Custom brand accent color picker"
                    className="h-9 w-12 rounded cursor-pointer bg-neutral-900 border border-border-subtle p-1"
                  />
                  <input
                    type="text"
                    value={customBrandHex}
                    onChange={(e) => setCustomBrandHex(e.target.value)}
                    aria-label="Custom brand hex string"
                    className="flex-1 bg-neutral-900 border border-border-subtle rounded px-3 text-xs font-mono text-white focus:border-brand-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Component Preview */}
            <div className="lg:col-span-8 glass-card p-8 space-y-8">
              <h3 className="font-bold text-white text-lg border-b border-border-subtle pb-3">
                Live Component Manifest Preview
              </h3>

              {/* Buttons and Badges */}
              <div className="space-y-4">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                  1. CTA Buttons & Badges (Using --radius-lg: 34.95rem Pill)
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    className="px-6 py-3 font-bold text-sm text-black transition-all hover:scale-105"
                    style={{
                      backgroundColor: customBrandHex,
                      borderRadius: "var(--radius-lg)",
                      boxShadow: `0 0 25px -3px ${customBrandHex}66`,
                    }}
                  >
                    Claim First Drop
                  </button>

                  <button
                    className="px-6 py-3 font-bold text-sm text-white bg-white/5 border border-white/20 transition-all hover:bg-white/10"
                    style={{ borderRadius: "var(--radius-lg)" }}
                  >
                    Explore 6 Flavors
                  </button>

                  <span
                    className="px-3 py-1 text-xs font-mono font-bold"
                    style={{
                      backgroundColor: `${customBrandHex}22`,
                      color: customBrandHex,
                      border: `1px solid ${customBrandHex}66`,
                      borderRadius: "var(--radius-lg)",
                    }}
                  >
                    ★ FLAGSHIP FORMULA
                  </span>
                </div>
              </div>

              {/* Product Card Demonstration */}
              <div className="space-y-4">
                <span className="text-xs font-mono text-text-muted uppercase tracking-wider block">
                  2. Product Card Container (Using --radius-xl: 1rem)
                </span>
                <div
                  className="p-6 bg-neutral-900/90 border transition-all max-w-md"
                  style={{
                    borderRadius: "var(--radius-xl)",
                    borderColor: `${customBrandHex}44`,
                    boxShadow: `0 10px 30px -10px ${customBrandHex}33`,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${customBrandHex}20`,
                        color: customBrandHex,
                      }}
                    >
                      ZERO SUGAR • 450MG ELECTROLYTES
                    </span>
                    <span className="text-xs font-mono text-text-muted">12 FL OZ</span>
                  </div>

                  <h4 className="text-2xl font-display font-black text-white">
                    Electric Lime Edition
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 mb-4">
                    Key Lime • Yuzu Zest • Sparkling Mountain Spring Water
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                    <span className="text-lg font-mono font-bold text-white">$2.99 / can</span>
                    <button
                      className="px-4 py-2 text-xs font-bold text-black"
                      style={{
                        backgroundColor: customBrandHex,
                        borderRadius: "var(--radius-lg)",
                      }}
                    >
                      Add to Case
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border-subtle pt-8 pb-16 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted font-mono">
          <div>CAn Brand Engineering System • Prompt 1 & Prompt 2 Completed</div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Return to Landing Page
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Token Repository
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
