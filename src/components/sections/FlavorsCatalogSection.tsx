"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { Sparkles, ShoppingBag, Eye, Check, Zap, ShieldCheck } from "lucide-react";

interface FlavorItem {
  id: string;
  series: string;
  seriesGoal: string;
  name: string;
  benefitHook: string;
  description: string;
  priceSingle: number;
  priceCase: number;
  accentColor: string;
  image: string;
  electrolytes: string;
  sugar: string;
  badge: string;
}

const STANDARDIZED_FLAVORS: FlavorItem[] = [
  {
    id: "alder-apple",
    series: "ALDER SERIES",
    seriesGoal: "Daily Hydration & Focus",
    name: "Crisp Apple",
    benefitHook: "Instant Hydration & Mental Clarity",
    description: "Crisp orchard green apple infused with 450mg of bioavailable Himalayan pink minerals.",
    priceSingle: 18900,
    priceCase: 219900,
    accentColor: "#a3e635",
    image: "/media/products/Alder_Apple.webp",
    electrolytes: "450mg",
    sugar: "0g Sugar",
    badge: "Best Seller",
  },
  {
    id: "alder-lime",
    series: "ALDER SERIES",
    seriesGoal: "Daily Hydration & Focus",
    name: "Zesty Lime",
    benefitHook: "Clean Citrus Revitalization",
    description: "Cold-pressed lime and lemon peel extract with balanced magnesium for muscle recovery.",
    priceSingle: 18900,
    priceCase: 219900,
    accentColor: "#22c55e",
    image: "/media/products/Alder_Lime.webp",
    electrolytes: "450mg",
    sugar: "0g Sugar",
    badge: "Refreshing",
  },
  {
    id: "hopp-ginger-lime",
    series: "HOPP SERIES",
    seriesGoal: "Stress Recovery & Mood",
    name: "Ginger Lime",
    benefitHook: "Adaptogenic Warmth & Gut Health",
    description: "Warm organic ginger root and zesty lime infused with full-spectrum organic Ashwagandha.",
    priceSingle: 18900,
    priceCase: 219900,
    accentColor: "#f59e0b",
    image: "/media/products/HOPP_Ginger_Lime.webp",
    electrolytes: "450mg",
    sugar: "0g Sugar",
    badge: "Adaptogenic",
  },
  {
    id: "hopp-strawberry",
    series: "HOPP SERIES",
    seriesGoal: "Stress Recovery & Mood",
    name: "Wild Strawberry",
    benefitHook: "Sustained Calm & Antioxidants",
    description: "Sun-ripened wild strawberries blended with soothing Rhodiola rosea adaptogens.",
    priceSingle: 18900,
    priceCase: 219900,
    accentColor: "#f43f5e",
    image: "/media/products/HOPP_Strawberry.webp",
    electrolytes: "450mg",
    sugar: "0g Sugar",
    badge: "Botanical",
  },
  {
    id: "signature-blue-lagoon",
    series: "SIGNATURE SERIES",
    seriesGoal: "Immunity & Performance",
    name: "Blue Lagoon",
    benefitHook: "Deep Island Electrolyte Surge",
    description: "Blue spirulina and tropical coconut notes enriched with 100% daily natural Vitamin C.",
    priceSingle: 21900,
    priceCase: 249900,
    accentColor: "#06b6d4",
    image: "/media/products/Blue_Lagoon.webp",
    electrolytes: "520mg",
    sugar: "0g Sugar",
    badge: "Signature",
  },
  {
    id: "fruit-splash-grape-ape",
    series: "FRUIT SPLASH",
    seriesGoal: "20% Real Fruit Juice",
    name: "Grape Splash",
    benefitHook: "Pure Cold-Pressed Fruit Energy",
    description: "20% real concord grape juice with zero added artificial concentrates or syrups.",
    priceSingle: 16900,
    priceCase: 189900,
    accentColor: "#a855f7",
    image: "/media/products/Grape_Ape.webp",
    electrolytes: "380mg",
    sugar: "Natural Fruit",
    badge: "20% Real Juice",
  },
];

export function FlavorsCatalogSection() {
  const [selectedSeries, setSelectedSeries] = useState<string>("ALL");
  const [packOption, setPackOption] = useState<"SINGLE" | "CASE">("SINGLE");
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const addItem = useCartStore((s) => s.addItem);

  const seriesTabs = ["ALL", "ALDER SERIES", "HOPP SERIES", "SIGNATURE SERIES", "FRUIT SPLASH"];

  const filteredFlavors =
    selectedSeries === "ALL"
      ? STANDARDIZED_FLAVORS
      : STANDARDIZED_FLAVORS.filter((f) => f.series === selectedSeries);

  const handleAddToCart = (flavor: FlavorItem) => {
    const isCase = packOption === "CASE";
    const price = isCase ? flavor.priceCase : flavor.priceSingle;
    const name = isCase ? `Hayati ${flavor.name} (Case of 12)` : `Hayati ${flavor.name}`;

    addItem({
      id: `${flavor.id}-${packOption.toLowerCase()}`,
      name,
      collection: flavor.series,
      flavor: flavor.benefitHook,
      price,
      canImage: flavor.image,
      accentColor: flavor.accentColor,
      inStock: true,
    });

    setAddedIds((prev) => ({ ...prev, [flavor.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [flavor.id]: false }));
    }, 2000);
  };

  return (
    <section id="flavors" className="relative py-28 px-6 sm:px-10 lg:px-16 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3 py-1 rounded-pill bg-brand-950/60 border border-brand-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>02 // SIGNATURE FORMULA CATALOG</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Explore The 6 Formulas
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl">
              Standardized by physiological goal: daily hydration, stress recovery, or antioxidant surge.
              Every can is crafted with 100% natural ingredients and bioavailable minerals.
            </p>
          </div>

          {/* Pack Option Selector (Single Can vs Case of 12) */}
          <div className="flex items-center gap-3 p-1.5 rounded-pill bg-neutral-900 border border-neutral-800 w-fit">
            <button
              onClick={() => setPackOption("SINGLE")}
              className={`px-4 py-2 rounded-pill text-xs font-mono font-bold transition-all cursor-pointer ${
                packOption === "SINGLE"
                  ? "bg-brand-400 text-black shadow-md font-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Single Can (from ₹169)
            </button>
            <button
              onClick={() => setPackOption("CASE")}
              className={`px-4 py-2 rounded-pill text-xs font-mono font-bold transition-all cursor-pointer ${
                packOption === "CASE"
                  ? "bg-brand-400 text-black shadow-md font-black"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Case of 12 (Save 15%)
            </button>
          </div>
        </div>

        {/* Series Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {seriesTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedSeries(tab)}
              className={`px-4 py-2 rounded-pill text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedSeries === tab
                  ? "bg-neutral-800 text-white border border-brand-400/50 shadow-sm"
                  : "bg-neutral-900/60 text-neutral-400 hover:text-white border border-neutral-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 6 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlavors.map((item) => {
            const isAdded = !!addedIds[item.id];
            const displayPrice =
              packOption === "CASE"
                ? `₹${(item.priceCase / 100).toLocaleString("en-IN")}`
                : `₹${(item.priceSingle / 100).toLocaleString("en-IN")}`;

            return (
              <div
                key={item.id}
                className="glass-card rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col justify-between hover:border-brand-500/40 transition-all duration-300 group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-pill"
                      style={{
                        backgroundColor: `${item.accentColor}15`,
                        color: item.accentColor,
                        border: `1px solid ${item.accentColor}30`,
                      }}
                    >
                      {item.series}
                    </span>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      {item.seriesGoal}
                    </span>
                  </div>

                  {/* High Quality Can Image */}
                  <div className="relative h-60 w-full flex items-center justify-center my-3 group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={item.image}
                      alt={`Hayati ${item.name}`}
                      width={180}
                      height={240}
                      className="h-52 w-auto object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Standardized Naming Hierarchy */}
                  <div className="space-y-1 mt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white group-hover:text-brand-300 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-lg font-black text-white font-mono">{displayPrice}</span>
                    </div>
                    <p
                      className="text-xs font-bold font-mono tracking-wide"
                      style={{ color: item.accentColor }}
                    >
                      ★ {item.benefitHook}
                    </p>
                    <p className="text-xs text-neutral-300 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Key Fact Pills */}
                  <div className="flex items-center gap-2 pt-4">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-neutral-800/80 text-white border border-neutral-700/60 flex items-center gap-1">
                      <Zap className="h-3 w-3 text-brand-400" />
                      <span>{item.electrolytes}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-neutral-800/80 text-white border border-neutral-700/60 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-accent-cyan" />
                      <span>{item.sugar}</span>
                    </span>
                  </div>
                </div>

                {/* Bottom Actions: Add to Cart & 3D Inspect */}
                <div className="flex items-center gap-3 pt-6 border-t border-neutral-800/80 mt-6">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-pill text-xs font-bold bg-brand-400 text-black hover:scale-105 transition-transform shadow-glow-brand cursor-pointer font-mono uppercase"
                  >
                    {isAdded ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                    <span>{isAdded ? "Added to Cart" : `Add to Cart • ${displayPrice}`}</span>
                  </button>

                  <Link
                    href={`/products/${item.id}`}
                    className="flex items-center gap-1.5 px-4 py-3 rounded-pill text-xs font-bold bg-neutral-900 border border-neutral-800 text-white hover:text-brand-400 hover:border-brand-500/40 transition-colors font-mono"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>3D</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Distinct Coming Soon Heritage Callout */}
        <div className="mt-16 p-8 rounded-3xl border border-neutral-800/80 bg-neutral-900/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Upcoming Q3 Line // Pre-Release
            </span>
            <h4 className="text-xl font-bold text-white">Classic Botanical Soda Heritage Collection</h4>
            <p className="text-xs text-neutral-400 max-w-lg">
              Reimagining vintage cola and tonic botanicals with prebiotic plant fibers. Currently in
              batch trial.
            </p>
          </div>
          <a
            href="#vip"
            className="px-6 py-3 rounded-pill text-xs font-mono font-bold bg-neutral-900 border border-amber-500/40 text-amber-300 hover:bg-amber-950/40 transition-colors shrink-0"
          >
            Get Notified on Launch
          </a>
        </div>
      </div>
    </section>
  );
}
