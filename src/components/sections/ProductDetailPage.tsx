"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { getSiteContent } from "@/lib/content/loader";
import { useCartStore } from "@/lib/store/cartStore";
import { ProductBadgeRow } from "@/components/ui/ProductBadgeRow";
import { ShoppingBag, Plus, Minus, ArrowLeft, Check, AlertCircle, Lock } from "lucide-react";

interface ProductDetailPageProps {
  productId: string;
}

// INR pricing — keyed by collection to allow per-line pricing
const PRICE_BY_COLLECTION: Record<string, number> = {
  "Alder Series": 18900,          // ₹189
  "HOPP Series": 18900,           // ₹189
  "Signature Botanicals": 21900,  // ₹219
  "Fruit Splash": 16900,          // ₹169
  "Classic Soda": 18900,          // ₹189
  default: 18900,
};

function formatINR(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(paise / 100);
}

import { Interactive3DViewer } from "@/components/3d/Interactive3DViewer";

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const content = getSiteContent();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [viewMode, setViewMode] = useState<"3D" | "PHOTO">("3D");

  // Get all variants in the same collection as the target product
  const baseVariant = content.variants.find((v) => v.id === productId) ?? content.variants[0];
  const collectionVariants = content.variants.filter(
    (v) => v.collection === baseVariant.collection
  );

  const [activeVariantId, setActiveVariantId] = useState(baseVariant.id);
  const [quantity, setQuantity] = useState(1);
  const [addedState, setAddedState] = useState<"idle" | "added" | "error">("idle");

  const activeVariant = collectionVariants.find((v) => v.id === activeVariantId) ?? baseVariant;
  const price = PRICE_BY_COLLECTION[activeVariant.collection ?? "default"] ?? PRICE_BY_COLLECTION.default;

  // Refs for Prompt-10-style swap animation
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  function animateSwap(callback: () => void) {
    const tl = gsap.timeline({ onComplete: callback });
    // Fade + scale down outgoing
    tl.to([imageRef.current, infoRef.current], {
      opacity: 0,
      scale: 0.96,
      y: 10,
      duration: 0.2,
      ease: "power2.in",
      stagger: 0.04,
    });
    // Swap state happens in callback, then animate in
    tl.to([imageRef.current, infoRef.current], {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.35,
      ease: "power3.out",
      stagger: 0.05,
    });
  }

  function handleVariantSwitch(newId: string) {
    if (newId === activeVariantId) return;
    animateSwap(() => setActiveVariantId(newId));
    setAddedState("idle");
    setQuantity(1);
  }

  function handleAddToCart() {
    if (!activeVariant.inStock) {
      setAddedState("error");
      return;
    }
    addItem({
      id: activeVariant.id,
      name: activeVariant.name,
      collection: activeVariant.collection,
      flavor: activeVariant.tagline,
      price,
      canImage: activeVariant.media.canImage,
      accentColor: activeVariant.accentColor,
      inStock: activeVariant.inStock,
    });
    setAddedState("added");
    setTimeout(() => setAddedState("idle"), 2500);
  }

  const isComingSoon = !activeVariant.inStock;

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-xs font-mono text-text-muted">
          <button onClick={() => window.history.back()} className="flex items-center gap-1 hover:text-brand-400 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Shop
          </button>
          <span>/</span>
          <span className="text-text-secondary">{activeVariant.collection}</span>
          <span>/</span>
          <span className="text-white font-bold">{activeVariant.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: Interactive 3D Can / Hi-Res Product Visual ── */}
          <div ref={imageRef} className="sticky top-28 flex flex-col items-center">
            {/* Accent glow halo */}
            <div
              className="absolute w-80 h-80 rounded-full blur-[100px] opacity-30 pointer-events-none -z-10"
              style={{ backgroundColor: activeVariant.accentColor }}
            />

            {/* 3D vs Photo Mode Switcher Tabs */}
            <div className="flex items-center gap-2 mb-4 p-1 rounded-pill bg-neutral-900 border border-border-subtle z-20">
              <button
                onClick={() => setViewMode("3D")}
                className={`px-4 py-1.5 rounded-pill text-xs font-mono font-bold transition-all ${
                  viewMode === "3D"
                    ? "bg-brand-400 text-black shadow-md"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                3D Interactive Model
              </button>
              <button
                onClick={() => setViewMode("PHOTO")}
                className={`px-4 py-1.5 rounded-pill text-xs font-mono font-bold transition-all ${
                  viewMode === "PHOTO"
                    ? "bg-brand-400 text-black shadow-md"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                Studio Photo
              </button>
            </div>

            {viewMode === "3D" ? (
              <div className="w-full flex justify-center">
                <Interactive3DViewer
                  flavorId={activeVariant.id}
                  accentColor={activeVariant.accentColor}
                />
              </div>
            ) : (
              <Image
                src={activeVariant.media.canImage}
                alt={activeVariant.media.altText ?? activeVariant.name}
                width={420}
                height={560}
                priority
                className="w-full max-w-sm h-auto object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.85)] transition-none"
              />
            )}

            {/* Tasting notes strip below image */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {activeVariant.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="px-3 py-1 rounded-pill text-[11px] font-mono bg-neutral-900 border border-border-subtle text-text-secondary"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Product Info ── */}
          <div ref={infoRef} className="flex flex-col gap-6">

            {/* Collection Badge */}
            <span
              className="self-start px-3 py-1 rounded-pill text-[11px] font-mono font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${activeVariant.accentColor}20`,
                color: activeVariant.accentColor,
                border: `1px solid ${activeVariant.accentColor}40`,
              }}
            >
              {activeVariant.badge}
            </span>

            {/* Title & Tagline */}
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
                {activeVariant.name}
              </h1>
              <p className="mt-2 text-sm font-mono font-bold" style={{ color: activeVariant.accentColor }}>
                {activeVariant.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-display font-black text-white">
                {formatINR(price)}
              </span>
              <span className="text-sm font-mono text-text-muted">/ 355ml can</span>
              <span className="text-xs font-mono text-text-secondary ml-auto px-2 py-1 bg-neutral-900 rounded-pill border border-border-subtle">
                12-CAN CASE: {formatINR(price * 12 * 0.88)} ·&nbsp;12% off
              </span>
            </div>

            {/* Flavor Description */}
            <p className="text-base text-text-secondary leading-relaxed">
              {activeVariant.description}
            </p>

            {/* Real Badge Row (Prompt 20 extracted claims) */}
            <ProductBadgeRow
              badges={activeVariant.tastingNotes}
              accentColor={activeVariant.accentColor}
            />

            {/* Flavor Profile */}
            <div className="text-xs font-mono text-text-muted uppercase tracking-widest">
              <span className="text-text-secondary">BOTANICAL PROFILE&nbsp;·&nbsp;</span>
              {activeVariant.flavorProfile}
            </div>

            {/* Nutrition Grid */}
            <div className="grid grid-cols-5 gap-2 p-4 rounded-xl bg-neutral-900/80 border border-border-subtle text-center">
              {activeVariant.nutrition.map((item) => (
                <div key={item.label}>
                  <div className="text-sm font-mono font-black text-white">{item.value}</div>
                  <div className="text-[9px] font-mono text-text-muted uppercase tracking-wide mt-1 line-clamp-2">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Variant Flavor Switcher — only if collection has multiple SKUs */}
            {collectionVariants.length > 1 && (
              <div>
                <div className="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">
                  SWITCH FLAVOR ({collectionVariants.length} in {activeVariant.collection})
                </div>
                <div className="flex flex-wrap gap-2">
                  {collectionVariants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => handleVariantSwitch(v.id)}
                      aria-pressed={v.id === activeVariantId}
                      className={`relative px-4 py-2 rounded-pill text-xs font-mono font-bold border transition-all ${
                        v.id === activeVariantId
                          ? "text-black shadow-md scale-105"
                          : "bg-neutral-900 border-border-subtle text-text-secondary hover:text-white hover:border-white/20"
                      }`}
                      style={
                        v.id === activeVariantId
                          ? { backgroundColor: v.accentColor, borderColor: v.accentColor }
                          : {}
                      }
                    >
                      {v.name.split(" ").slice(-1)[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 pt-2">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 px-3 py-2 bg-neutral-900 border border-border-subtle rounded-pill">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center text-sm font-mono font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="text-text-secondary hover:text-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart / Out of Stock */}
              <button
                onClick={handleAddToCart}
                disabled={isComingSoon}
                aria-label={isComingSoon ? "Coming soon — join VIP reserve list" : `Add ${quantity}× ${activeVariant.name} to cart`}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-pill text-sm font-bold transition-all ${
                  isComingSoon
                    ? "bg-neutral-800 text-text-muted border border-border-subtle cursor-not-allowed"
                    : addedState === "added"
                    ? "bg-green-500 text-white"
                    : addedState === "error"
                    ? "bg-red-500/20 text-red-400 border border-red-500/40"
                    : "text-black hover:scale-[1.02] shadow-lg hover:shadow-xl"
                }`}
                style={
                  !isComingSoon && addedState === "idle"
                    ? { backgroundColor: activeVariant.accentColor }
                    : {}
                }
              >
                {isComingSoon ? (
                  <><Lock className="h-4 w-4" /> VIP Reserve — Join Waitlist</>
                ) : addedState === "added" ? (
                  <><Check className="h-4 w-4" /> Added to Cart!</>
                ) : addedState === "error" ? (
                  <><AlertCircle className="h-4 w-4" /> Out of Stock</>
                ) : (
                  <><ShoppingBag className="h-4 w-4" /> Add to Cart · {formatINR(price * quantity)}</>
                )}
              </button>
            </div>

            {/* Shopify checkout trust signal */}
            <p className="text-[11px] font-mono text-text-muted text-center mt-1">
              🔒&nbsp;Secure checkout via Shopify · Free shipping on orders over ₹1,499
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
