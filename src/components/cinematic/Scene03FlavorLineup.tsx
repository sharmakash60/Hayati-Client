"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SIX_FLAVORS } from "@/lib/motion/3dConfig";
import { useMaster3D } from "@/components/3d/Master3DExperience";
import { useCartStore } from "@/lib/store/cartStore";
import { Sparkles, ShoppingBag, ArrowRight, Check, Eye } from "lucide-react";

export function Scene03FlavorLineup() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const { setActiveFlavor } = useMaster3D();
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const flavor = SIX_FLAVORS[activeIdx];

  const handleSelectFlavor = (idx: number) => {
    setActiveIdx(idx);
    setActiveFlavor(idx);
  };

  const handleAddToCart = () => {
    const pricePaise =
      flavor.collection === "Signature Botanicals"
        ? 21900
        : flavor.collection === "Fruit Splash"
        ? 16900
        : 18900;

    addItem({
      id: flavor.id,
      name: `Hayati ${flavor.name}`,
      collection: flavor.collection,
      flavor: flavor.subname,
      price: pricePaise,
      canImage: flavor.imageFallback,
      accentColor: flavor.accentColor,
      inStock: true,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section
      id="flavors-scene"
      className="relative min-h-[140vh] flex flex-col justify-between items-center text-center px-6 py-28 z-20 overflow-hidden"
    >
      {/* Top Header */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>03 / BOTANICAL FLAVOR PROFILES</span>
        </div>

        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none mb-6">
          6 Signature Formulas.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-accent-cyan">
            One Core Precision.
          </span>
        </h2>

        {/* 6 Flavor Selection Button Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-pill bg-neutral-950/90 backdrop-blur-2xl border border-border-subtle shadow-2xl">
          {SIX_FLAVORS.map((f, idx) => (
            <button
              key={f.id}
              onClick={() => handleSelectFlavor(idx)}
              className={`px-4 py-2 rounded-pill text-xs font-mono font-bold uppercase transition-all duration-300 ${
                activeIdx === idx
                  ? "shadow-xl text-black scale-105 font-black"
                  : "text-text-secondary hover:text-white"
              }`}
              style={
                activeIdx === idx
                  ? { backgroundColor: f.accentColor }
                  : {}
              }
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Clearance Spacing (The 3D Constellation orbits here in WebGL) */}
      <div className="h-[320px] sm:h-[400px] w-full pointer-events-none" aria-hidden="true" />

      {/* Bottom Focused Flavor Spec Card & Actions */}
      <div className="relative z-20 w-full max-w-3xl mx-auto">
        <div className="glass-card p-6 sm:p-8 border-border-subtle bg-neutral-950/85 backdrop-blur-2xl rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left space-y-1.5">
            <span
              className="text-xs font-mono uppercase tracking-widest font-bold block"
              style={{ color: flavor.accentColor }}
            >
              {flavor.collection}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">{flavor.name}</h3>
            <p className="text-xs sm:text-sm text-text-secondary font-mono">{flavor.badge}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-3 rounded-pill text-xs sm:text-sm font-bold bg-brand-400 text-black hover:scale-105 transition-transform shadow-glow-brand"
            >
              {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              <span>{added ? "Added to Cart" : "Add to Cart • ₹189"}</span>
            </button>

            <Link
              href={`/products/${flavor.id}`}
              className="flex items-center gap-1.5 px-5 py-3 rounded-pill text-xs sm:text-sm font-bold bg-neutral-900 border border-border-subtle text-white hover:text-brand-400 hover:border-brand-500/40 transition-colors"
            >
              <Eye className="h-4 w-4" />
              <span>3D Inspect</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
