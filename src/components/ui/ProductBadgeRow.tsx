"use client";

import React from "react";
import { CheckCircle, Zap, Leaf, Droplets, Shield, Star } from "lucide-react";

interface Badge {
  label: string;
  icon?: React.ReactNode;
}

const BADGE_ICON_MAP: Record<string, React.ReactNode> = {
  "Zero Sugar": <Zap className="h-3.5 w-3.5" />,
  "0g Sugar": <Zap className="h-3.5 w-3.5" />,
  "No Caffeine": <Leaf className="h-3.5 w-3.5" />,
  "Caffeine Free": <Leaf className="h-3.5 w-3.5" />,
  "20% fruit juice": <Droplets className="h-3.5 w-3.5" />,
  "20% Fruit Juice": <Droplets className="h-3.5 w-3.5" />,
  "Enriched with Vitamin C": <Shield className="h-3.5 w-3.5" />,
  "Vitamin C": <Shield className="h-3.5 w-3.5" />,
  "Probiotic Drink": <Star className="h-3.5 w-3.5" />,
  "Probiotics": <Star className="h-3.5 w-3.5" />,
  "Crisp Sparkling Taste": <CheckCircle className="h-3.5 w-3.5" />,
  "450mg Electrolytes": <Droplets className="h-3.5 w-3.5" />,
  "450mg Ionic Electrolytes": <Droplets className="h-3.5 w-3.5" />,
  "100% Recyclable Aluminum": <Leaf className="h-3.5 w-3.5" />,
  "Antioxidant Rich": <Shield className="h-3.5 w-3.5" />,
  "Alpine Spring Water": <Droplets className="h-3.5 w-3.5" />,
  "Adaptogenic Blend": <Star className="h-3.5 w-3.5" />,
};

interface ProductBadgeRowProps {
  badges: string[];
  accentColor?: string;
  size?: "sm" | "md";
  className?: string;
}

export function ProductBadgeRow({
  badges,
  accentColor = "#a3e635",
  size = "md",
  className = "",
}: ProductBadgeRowProps) {
  if (!badges || badges.length === 0) return null;

  const textSize = size === "sm" ? "text-[10px]" : "text-[11px]";
  const padding = size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5";

  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="list" aria-label="Product claims">
      {badges.map((badge) => (
        <span
          key={badge}
          role="listitem"
          className={`inline-flex items-center gap-1.5 ${padding} rounded-pill ${textSize} font-mono font-bold uppercase tracking-wider transition-transform hover:scale-105`}
          style={{
            backgroundColor: `${accentColor}18`,
            color: accentColor,
            border: `1px solid ${accentColor}35`,
          }}
        >
          {BADGE_ICON_MAP[badge] ?? <CheckCircle className="h-3.5 w-3.5" />}
          {badge}
        </span>
      ))}
    </div>
  );
}
