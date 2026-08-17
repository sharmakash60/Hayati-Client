"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { getSiteContent } from "@/lib/content/loader";
import { useVariantScrollSync } from "@/lib/hooks/useVariantScrollSync";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, ShoppingBag, Lock } from "lucide-react";

export function VariantScroller() {
  const content = getSiteContent();
  const allVariants = content.variants;

  const [selectedCollection, setSelectedCollection] = useState<string>("All");

  const collections = [
    "All",
    "Alder Series",
    "HOPP Series",
    "Signature Botanicals",
    "Fruit Splash",
    "Classic Soda",
  ];

  const filteredVariants = useMemo(() => {
    if (selectedCollection === "All") return allVariants;
    return allVariants.filter(
      (v) => (v.collection || "").toLowerCase() === selectedCollection.toLowerCase()
    );
  }, [allVariants, selectedCollection]);

  const {
    sectionRef,
    trackRef,
    activeIndex,
    setActiveIndex,
    isMobile,
  } = useVariantScrollSync({
    variantCount: filteredVariants.length,
  });

  const activeVariant = filteredVariants[activeIndex] || filteredVariants[0] || allVariants[0];

  const handleMobileScrollBy = (direction: "left" | "right") => {
    if (trackRef.current) {
      const amount = direction === "left" ? -340 : 340;
      trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const handleShopifyCheckout = (variantId: string) => {
    // Generate Shopify Cart Permalink for hybrid checkout
    const checkoutUrl = `https://hayatiworld.com/cart/${variantId}:1?discount=FIRSTDROP`;
    // If not live yet, smoothly scroll to newsletter pre-order allocation
    const target = document.querySelector("#newsletter");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="variants"
      className="relative min-h-screen py-24 flex flex-col justify-center overflow-hidden border-t border-border-subtle bg-bg-primary"
      style={{
        transition: "background-color 0.6s ease",
      }}
    >
      {/* Dynamic Ambient Background Glow tied to Active Variant Accent */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[150px] opacity-30 transition-all duration-700 ease-out z-0"
        style={{
          backgroundColor: activeVariant?.accentColor || "#a3e635",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-brand-400 uppercase tracking-widest block font-bold">
                02 / BOTANICAL FLAVOR PROFILES & COLLECTIONS
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-neutral-900 border border-border-subtle text-text-secondary">
                {activeIndex + 1} OF {filteredVariants.length}
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
              Engineered Formulas
            </h2>
          </div>

          {/* Navigation Controls on Desktop / Mobile */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMobileScrollBy("left")}
              aria-label="Scroll Variants Left"
              className="p-3 rounded-pill bg-neutral-900 border border-border-subtle text-white hover:text-brand-400 hover:border-brand-500/40 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleMobileScrollBy("right")}
              aria-label="Scroll Variants Right"
              className="p-3 rounded-pill bg-neutral-900 border border-border-subtle text-white hover:text-brand-400 hover:border-brand-500/40 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Collection Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {collections.map((col) => (
            <button
              key={col}
              onClick={() => {
                setSelectedCollection(col);
                setActiveIndex(0);
              }}
              className={`px-4 py-2 text-xs font-mono rounded-pill shrink-0 transition-all font-bold ${
                selectedCollection === col
                  ? "bg-brand-400 text-black shadow-glow-brand/40 scale-105"
                  : "bg-neutral-900/90 text-text-secondary hover:text-white border border-border-subtle"
              }`}
            >
              {col === "Classic Soda" ? "Classic Soda (Coming Soon)" : col}
            </button>
          ))}
        </div>

        {/* Horizontal Track (GSAP Pinned on Desktop, CSS Touch Snap on Mobile) */}
        <div
          ref={trackRef}
          className={`${
            isMobile
              ? "flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-none"
              : "flex gap-8 will-change-transform"
          }`}
          tabIndex={0}
          role="region"
          aria-label="Product Flavor Carousel Track"
        >
          {filteredVariants.map((variant, idx) => {
            const isActive = activeIndex === idx;
            const isComingSoon = variant.inStock === false;

            return (
              <div
                key={variant.id}
                onClick={() => setActiveIndex(idx)}
                className={`snap-start shrink-0 w-[310px] sm:w-[360px] lg:w-[380px] glass-card p-6 sm:p-7 relative overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between group ${
                  isActive
                    ? "border-brand-400/90 shadow-2xl scale-[1.01] bg-neutral-900/90 ring-1 ring-brand-400/50"
                    : "border-border-subtle hover:border-white/20 bg-neutral-900/60 opacity-85 hover:opacity-100"
                }`}
              >
                {/* Accent Radial Halo */}
                <div
                  className="absolute -top-24 -right-24 h-52 w-52 rounded-full opacity-20 pointer-events-none blur-3xl transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: variant.accentColor }}
                />

                {/* Top Badge & Collection */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-pill text-[11px] font-mono font-bold uppercase tracking-wider transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: `${variant.accentColor}20`,
                        color: variant.accentColor,
                        border: `1px solid ${variant.accentColor}40`,
                      }}
                    >
                      {variant.badge}
                    </span>
                    <span className="text-[11px] font-mono text-text-muted">12 FL OZ // 355ML</span>
                  </div>

                  {/* Can Product Render */}
                  <div className="h-64 w-full flex items-center justify-center my-3 relative">
                    <Image
                      src={variant.media.canImage}
                      alt={variant.name}
                      width={200}
                      height={280}
                      priority={idx < 3}
                      className="h-full max-h-60 w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1"
                    />
                  </div>

                  {/* Flavor Heading & Tagline */}
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight mb-1">
                    {variant.name}
                  </h3>
                  <div
                    className="text-xs font-mono font-bold mb-2 tracking-wide"
                    style={{ color: variant.accentColor }}
                  >
                    {variant.tagline}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">
                    {variant.description}
                  </p>
                </div>

                {/* Nutrition Breakdown & Pricing / Action */}
                <div className="pt-4 border-t border-border-subtle/60 space-y-4">
                  {/* Nutrition Spec Grid */}
                  <div className="grid grid-cols-3 gap-1.5 py-2 px-2 rounded-lg bg-neutral-950/80 border border-border-subtle text-center">
                    {variant.nutrition.slice(0, 3).map((item) => (
                      <div key={item.label}>
                        <div className="text-xs font-mono font-bold text-white">{item.value}</div>
                        <div className="text-[9px] font-mono text-text-muted uppercase tracking-wider mt-0.5">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Case Pricing & Action Button */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <div>
                      <div className="text-[10px] font-mono text-text-muted uppercase">12-CAN CASE</div>
                      <div className="text-sm font-mono font-bold text-white">$38.00 USD</div>
                    </div>

                    {isComingSoon ? (
                      <button
                        onClick={() => handleShopifyCheckout(variant.id)}
                        className="py-2.5 px-4 text-xs font-bold text-text-muted bg-neutral-800 rounded-pill border border-border-subtle flex items-center gap-1.5"
                      >
                        <Lock className="h-3.5 w-3.5" />
                        <span>VIP Reserve</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleShopifyCheckout(variant.id)}
                        className="py-2.5 px-4 text-xs font-bold text-black transition-all hover:scale-[1.03] shadow-sm flex items-center gap-1.5 group-hover:shadow-glow-brand"
                        style={{
                          backgroundColor: variant.accentColor,
                          borderRadius: "var(--radius-lg)",
                        }}
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>Shop Now</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Indicator */}
        <div className="mt-8 flex items-center justify-between font-mono text-xs text-text-muted border-t border-border-subtle/50 pt-4">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
            FORMULATION: 450MG IONIC ELECTROLYTES • ZERO SUGAR • 100% RECYCLABLE ALUMINUM
          </span>
          <span className="hidden sm:inline">OFFICIAL HAYATI WORLD STORE</span>
        </div>
      </div>
    </section>
  );
}
