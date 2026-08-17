"use client";

import React from "react";
import { Sparkles, CheckCircle2, ShieldCheck, Award, Beaker } from "lucide-react";

export function IngredientsTransparencySection() {
  const ingredients = [
    {
      name: "Magnesium Glycinate",
      amount: "150 mg",
      purpose: "Cellular Recovery & Muscle Relaxation",
      source: "High-bioavailability chelated mineral salt",
    },
    {
      name: "Potassium Citrate",
      amount: "200 mg",
      purpose: "Intracellular Fluid Balance & Focus",
      source: "Pure mineral electrolyte complex",
    },
    {
      name: "Himalayan Pink Mineral Salt",
      amount: "100 mg",
      purpose: "Hydration Retention & Trace Minerals",
      source: "Ancient unrefined sea salt with 84 trace minerals",
    },
    {
      name: "Organic Ashwagandha (KSM-66)",
      amount: "125 mg",
      purpose: "Cortisol Balance & Sustained Energy",
      source: "Standardized organic full-spectrum root extract",
    },
    {
      name: "Cold-Pressed Fruit Essence",
      amount: "20% Real Juice",
      purpose: "Natural Vitamin C & Crisp Flavor",
      source: "Sun-ripened whole fruits with zero concentrates",
    },
  ];

  return (
    <section id="ingredients" className="relative py-28 px-6 sm:px-10 lg:px-16 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-400 font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-pill bg-brand-950/60 border border-brand-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>04 // INGREDIENT TRANSPARENCY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            100% Disclosed. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-accent-cyan">
              Zero Proprietary Blends.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            We believe you have the right to know exactly what enters your body. Every milligram of
            active mineral and botanical extract is precisely listed.
          </p>
        </div>

        {/* Ingredients Table Card */}
        <div className="glass-card rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-10 mb-12 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-800 text-xs font-mono text-neutral-400 uppercase tracking-wider pb-4">
                  <th className="pb-4 font-bold">Functional Ingredient</th>
                  <th className="pb-4 font-bold">Amount Per Can</th>
                  <th className="pb-4 font-bold">Physiological Purpose</th>
                  <th className="pb-4 font-bold">Source Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                {ingredients.map((ing) => (
                  <tr key={ing.name} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-4 font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                      <span>{ing.name}</span>
                    </td>
                    <td className="py-4 font-mono font-bold text-brand-300">{ing.amount}</td>
                    <td className="py-4 text-neutral-300 text-xs sm:text-sm">{ing.purpose}</td>
                    <td className="py-4 text-neutral-400 text-xs font-mono">{ing.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regulatory & Purity Badges Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            {
              icon: <ShieldCheck className="h-5 w-5 text-brand-400" />,
              title: "FSSAI Certified",
              desc: "License No. 10020043003412",
            },
            {
              icon: <Beaker className="h-5 w-5 text-accent-cyan" />,
              title: "Lab Tested Purity",
              desc: "Heavy Metals & Microbials Free",
            },
            {
              icon: <Award className="h-5 w-5 text-brand-300" />,
              title: "Non-GMO & Vegan",
              desc: "100% Plant-Based Adaptogens",
            },
            {
              icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
              title: "Zero Artificial Sugars",
              desc: "No Sucralose or Aspartame",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="glass-card p-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 text-center flex flex-col items-center"
            >
              <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 mb-2">
                {b.icon}
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">{b.title}</h4>
              <p className="text-[11px] text-neutral-400 font-mono">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
