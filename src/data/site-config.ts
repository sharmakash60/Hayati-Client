import {
  ColorToken,
  TypographyToken,
  SpacingToken,
  RadiusToken,
  ShadowToken,
  GradientToken,
} from "@/types/tokens";

export const siteConfig = {
  name: "CAn",
  tagline: "Liquid Precision. Zero Compromise.",
  description: "Next-generation functional beverage engineered with pure natural electrolytes and zero artificial sweeteners. Canned in infinitely recyclable aluminum.",
  navLinks: [
    { label: "Overview", href: "#hero" },
    { label: "Flavors", href: "#variants" },
    { label: "Benefits", href: "#benefits" },
    { label: "FAQ", href: "#faq" },
    { label: "Design System", href: "/design-system", isBadge: true },
  ],
  hero: {
    badge: "100% Recyclable • Zero Sugar",
    headline: "REFRESH YOUR ENGINE",
    subheadline: "Crafted for high performers. Formulated with organic botanical nootropics, crisp mountain water, and pristine hydration.",
    primaryCta: { text: "Claim First Drop", href: "#newsletter" },
    secondaryCta: { text: "Explore Flavors", href: "#variants" },
  },
  variants: [
    {
      id: "electric-lime",
      name: "Electric Lime",
      tagline: "Crisp Citrus Awakening",
      flavorProfile: "Key Lime • Yuzu Zest • Sea Salt",
      accentColor: "#a3e635",
      glowColor: "rgba(163, 230, 53, 0.4)",
      badge: "Flagship",
      nutrition: [
        { label: "Calories", value: "5" },
        { label: "Sugar", value: "0g" },
        { label: "Electrolytes", value: "450mg" },
      ],
      inStock: true,
    },
    {
      id: "blood-orange",
      name: "Solar Orange",
      tagline: "Vibrant Blood Citrus",
      flavorProfile: "Sicilian Blood Orange • Ginger",
      accentColor: "#ff5e18",
      glowColor: "rgba(255, 94, 24, 0.4)",
      badge: "Popular",
      nutrition: [
        { label: "Calories", value: "5" },
        { label: "Sugar", value: "0g" },
        { label: "Electrolytes", value: "420mg" },
      ],
      inStock: true,
    },
    {
      id: "cyber-cyan",
      name: "Glacier Mint",
      tagline: "Sub-Zero Alpine Rush",
      flavorProfile: "Wild Spearmint • Blue Agave Extract",
      accentColor: "#00f0ff",
      glowColor: "rgba(0, 240, 255, 0.4)",
      badge: "New",
      nutrition: [
        { label: "Calories", value: "0" },
        { label: "Sugar", value: "0g" },
        { label: "Electrolytes", value: "500mg" },
      ],
      inStock: true,
    },
    {
      id: "cosmic-berry",
      name: "Cosmic Blackberry",
      tagline: "Deep Forest Infusion",
      flavorProfile: "Wild Blackberry • Acai • Hibiscus",
      accentColor: "#a855f7",
      glowColor: "rgba(168, 85, 247, 0.4)",
      badge: "Limited",
      nutrition: [
        { label: "Calories", value: "10" },
        { label: "Sugar", value: "0g" },
        { label: "Electrolytes", value: "400mg" },
      ],
      inStock: true,
    },
    {
      id: "ruby-grapefruit",
      name: "Neon Grapefruit",
      tagline: "Tart Botanical Bite",
      flavorProfile: "Pink Grapefruit • Rosemary • Ginseng",
      accentColor: "#ec4899",
      glowColor: "rgba(236, 72, 153, 0.4)",
      badge: "Seasonal",
      nutrition: [
        { label: "Calories", value: "5" },
        { label: "Sugar", value: "0g" },
        { label: "Electrolytes", value: "460mg" },
      ],
      inStock: true,
    },
    {
      id: "golden-mango",
      name: "Golden Yuzu",
      tagline: "Tropical Energy Catalyst",
      flavorProfile: "Alphonso Mango • Passionfruit • Ashwagandha",
      accentColor: "#f59e0b",
      glowColor: "rgba(245, 158, 11, 0.4)",
      badge: "Exclusive",
      nutrition: [
        { label: "Calories", value: "10" },
        { label: "Sugar", value: "0g" },
        { label: "Electrolytes", value: "480mg" },
      ],
      inStock: true,
    },
  ],
  benefits: [
    {
      step: 1,
      id: "benefits-1",
      title: "Alpine Natural Purity",
      subtitle: "Zero Synthetic Chemistry",
      description: "Sourced directly from protected deep mountain aquifers, filtered naturally through mineralized limestone strata.",
      metric: { value: "100%", label: "Natural Spring Purity" },
    },
    {
      step: 2,
      id: "benefits-2",
      title: "Infinite Aluminum Loop",
      subtitle: "100% Recyclable Packaging",
      description: "Infinitely recyclable aluminum cans cool 40% faster than glass and reduce single-use plastic pollution to zero.",
      metric: { value: "0%", label: "Plastic Footprint" },
    },
    {
      step: 3,
      id: "benefits-3",
      title: "Cellular Electrolyte Matrix",
      subtitle: "Optimal Hydration Ratio",
      description: "Balanced with essential potassium, magnesium, and bioavailable marine pink salt for sustained hydration without blood sugar spikes.",
      metric: { value: "450mg", label: "Bioavailable Ionic Salts" },
    },
    {
      step: 4,
      id: "benefits-4",
      title: "Cognitive Botanical Blend",
      subtitle: "Sustained Mental Flow",
      description: "Infused with organic L-Theanine and organic green tea polyphenols for calm, laser-sharp focus without caffeine jitters.",
      metric: { value: "0g", label: "Crash & Sugar Jitters" },
    },
  ],
  faqs: [
    {
      question: "What makes CAn different from standard canned energy or sparkling water?",
      answer: "CAn pairs functional hydration (450mg bioavailable electrolytes) with organic botanical adaptogens and zero artificial sweeteners, packaged exclusively in chilled aluminum cans.",
      category: "Ingredients",
    },
    {
      question: "Is there any sugar, sucralose, or erythritol in CAn?",
      answer: "None. We use zero artificial sweeteners, zero sugar alcohols, and zero synthetic preservatives. The crisp taste comes strictly from natural cold-pressed fruit essences.",
      category: "Ingredients",
    },
    {
      question: "How does the pre-order and shipping schedule work?",
      answer: "Early-access orders ship within 48 hours via climate-neutral priority ground delivery across the continental US.",
      category: "Shipping",
    },
    {
      question: "Can I recycle the packaging?",
      answer: "Every component—from our aluminum cans to our unbleached outer shipping carton—is 100% curbside recyclable.",
      category: "Sustainability",
    },
  ],
};

/* ==========================================================================
   Complete Design Tokens Registry for /design-system Inspection
   ========================================================================== */

export const colorTokens: ColorToken[] = [
  // Brand Scale
  { name: "Brand 50", variable: "--color-brand-50", value: "#f7fee7", category: "brand" },
  { name: "Brand 100", variable: "--color-brand-100", value: "#ecfccb", category: "brand" },
  { name: "Brand 200", variable: "--color-brand-200", value: "#d9f99d", category: "brand" },
  { name: "Brand 300", variable: "--color-brand-300", value: "#bef264", category: "brand" },
  { name: "Brand 400 (Core)", variable: "--color-brand-400", value: "#a3e635", category: "brand", description: "Primary brand accent and CTA base" },
  { name: "Brand 500", variable: "--color-brand-500", value: "#84cc16", category: "brand" },
  { name: "Brand 600", variable: "--color-brand-600", value: "#65a30d", category: "brand" },
  { name: "Brand 700", variable: "--color-brand-700", value: "#4d7c0f", category: "brand" },
  { name: "Brand 800", variable: "--color-brand-800", value: "#3f6212", category: "brand" },
  { name: "Brand 900", variable: "--color-brand-900", value: "#365314", category: "brand" },
  { name: "Brand 950", variable: "--color-brand-950", value: "#1a2e05", category: "brand" },

  // Accent Primitives
  { name: "Accent Orange", variable: "--color-accent-orange", value: "#ff5e18", category: "accent", description: "Solar Orange variant" },
  { name: "Accent Cyan", variable: "--color-accent-cyan", value: "#00f0ff", category: "accent", description: "Glacier Mint variant" },
  { name: "Accent Purple", variable: "--color-accent-purple", value: "#a855f7", category: "accent", description: "Cosmic Blackberry variant" },
  { name: "Accent Pink", variable: "--color-accent-pink", value: "#ec4899", category: "accent", description: "Neon Grapefruit variant" },
  { name: "Accent Amber", variable: "--color-accent-amber", value: "#f59e0b", category: "accent", description: "Golden Yuzu variant" },
  { name: "Accent Blue", variable: "--color-accent-blue", value: "#3b82f6", category: "accent" },

  // Neutrals (Obsidian Scale)
  { name: "Neutral 00 (Pure Black)", variable: "--color-neutral-00", value: "#000000", category: "neutral" },
  { name: "Neutral 50", variable: "--color-neutral-50", value: "#fafafa", category: "neutral" },
  { name: "Neutral 100", variable: "--color-neutral-100", value: "#f4f4f5", category: "neutral" },
  { name: "Neutral 200", variable: "--color-neutral-200", value: "#e4e4e7", category: "neutral" },
  { name: "Neutral 300", variable: "--color-neutral-300", value: "#d4d4d8", category: "neutral" },
  { name: "Neutral 400", variable: "--color-neutral-400", value: "#a1a1aa", category: "neutral" },
  { name: "Neutral 500", variable: "--color-neutral-500", value: "#71717a", category: "neutral" },
  { name: "Neutral 600", variable: "--color-neutral-600", value: "#52525b", category: "neutral" },
  { name: "Neutral 700", variable: "--color-neutral-700", value: "#3f3f46", category: "neutral" },
  { name: "Neutral 800", variable: "--color-neutral-800", value: "#27272a", category: "neutral" },
  { name: "Neutral 850", variable: "--color-neutral-850", value: "#1c1c20", category: "neutral" },
  { name: "Neutral 900", variable: "--color-neutral-900", value: "#18181b", category: "neutral" },
  { name: "Neutral 950 (Canvas)", variable: "--color-neutral-950", value: "#0d0d0f", category: "neutral", description: "Primary background canvas" },
  { name: "Neutral 999 (Deep Void)", variable: "--color-neutral-999", value: "#050507", category: "neutral" },

  // Semantic
  { name: "CTA Background", variable: "--color-cta-bg", value: "var(--color-brand-400)", category: "semantic" },
  { name: "CTA Text", variable: "--color-cta-text", value: "#000000", category: "semantic" },
  { name: "Card Surface", variable: "--color-surface-card", value: "rgba(28, 28, 32, 0.85)", category: "semantic" },
  { name: "Subtle Border", variable: "--color-border-subtle", value: "rgba(255, 255, 255, 0.08)", category: "semantic" },
  { name: "Status Success", variable: "--color-status-success", value: "#10b981", category: "status" },
  { name: "Status Error", variable: "--color-status-error", value: "#ef4444", category: "status" },
];

export const typographyTokens: TypographyToken[] = [
  { name: "Display 5XL", variable: "--font-size-5xl", size: "clamp(3.2rem, 9vw, 7.5rem)", pixelValue: "~52px - 120px", lineHeight: "1.02", sampleText: "PURE IMPACT" },
  { name: "Display 4XL (Hero)", variable: "--font-size-4xl", size: "clamp(2.5rem, 6.5vw, 5.242rem)", pixelValue: "~40px - 84px", lineHeight: "1.05", sampleText: "REFRESH YOUR ENGINE" },
  { name: "Heading 3XL", variable: "--font-size-3xl", size: "2.25rem", pixelValue: "36px", lineHeight: "1.2", sampleText: "High-Performance Clean Hydration" },
  { name: "Heading 2XL", variable: "--font-size-2xl", size: "1.5rem", pixelValue: "24px", lineHeight: "1.25", sampleText: "Infinitely Recyclable Aluminum Can" },
  { name: "Heading XL", variable: "--font-size-xl", size: "1.25rem", pixelValue: "20px", lineHeight: "1.3", sampleText: "Zero Artificial Additives or Sugars" },
  { name: "Body Large (LG)", variable: "--font-size-lg", size: "1.125rem", pixelValue: "18px", lineHeight: "1.5", sampleText: "Formulated for peak mental clarity and cellular hydration." },
  { name: "Body Base (Base)", variable: "--font-size-base", size: "1rem", pixelValue: "16px", lineHeight: "1.5", sampleText: "Every sip delivers bioavailable marine electrolytes and crisp mountain spring water." },
  { name: "Body Small (SM)", variable: "--font-size-sm", size: "0.875rem", pixelValue: "14px", lineHeight: "1.4", sampleText: "450mg Electrolytes • 0g Sugar • 100% Recyclable" },
  { name: "Caption (XS)", variable: "--font-size-xs", size: "0.75rem", pixelValue: "12px", lineHeight: "1.3", sampleText: "LIMITED FIRST DROP ALLOCATION • SHIPS IMMEDIATE" },
  { name: "Micro (2XS)", variable: "--font-size-2xs", size: "0.6875rem", pixelValue: "11px", lineHeight: "1.2", sampleText: "BATCH NO. 80492-CAN" },
];

export const spacingTokens: SpacingToken[] = [
  { name: "Spacing 1", variable: "--spacing-1", value: "0.25rem", pixelValue: "4px" },
  { name: "Spacing 2", variable: "--spacing-2", value: "0.5rem", pixelValue: "8px" },
  { name: "Spacing 3", variable: "--spacing-3", value: "0.75rem", pixelValue: "12px" },
  { name: "Spacing 4", variable: "--spacing-4", value: "1rem", pixelValue: "16px" },
  { name: "Spacing 6", variable: "--spacing-6", value: "1.5rem", pixelValue: "24px" },
  { name: "Spacing 8", variable: "--spacing-8", value: "2rem", pixelValue: "32px" },
  { name: "Spacing 12", variable: "--spacing-12", value: "3rem", pixelValue: "48px" },
  { name: "Spacing 16", variable: "--spacing-16", value: "4rem", pixelValue: "64px" },
  { name: "Spacing 24", variable: "--spacing-24", value: "6rem", pixelValue: "96px" },
  { name: "Spacing Section", variable: "--spacing-section", value: "clamp(4rem, 8vw, 8rem)", pixelValue: "64px - 128px" },
];

export const radiusTokens: RadiusToken[] = [
  { name: "Radius None", variable: "--radius-none", value: "0px", usage: "Sharp grid elements" },
  { name: "Radius SM", variable: "--radius-sm", value: "0.25rem (4px)", usage: "Micro tags, small tooltips" },
  { name: "Radius MD", variable: "--radius-md", value: "0.5rem (8px)", usage: "Standard input fields, dropdown menus" },
  { name: "Radius XL", variable: "--radius-xl", value: "1rem (16px)", usage: "Content cards, product modals" },
  { name: "Radius 2XL", variable: "--radius-2xl", value: "1.5rem (24px)", usage: "Section panels, hero containers" },
  { name: "Radius LG (Pill)", variable: "--radius-lg", value: "34.95rem (~559px)", usage: "Primary CTAs, badges, pills, toggle switches", isPill: true },
];

export const shadowTokens: ShadowToken[] = [
  { name: "Shadow SM", variable: "--shadow-sm", value: "0 1px 2px 0 rgba(0,0,0,0.4)", usage: "Subtle card depth" },
  { name: "Shadow MD", variable: "--shadow-md", value: "0 4px 6px -1px rgba(0,0,0,0.5)", usage: "Hover card states" },
  { name: "Shadow LG", variable: "--shadow-lg", value: "0 10px 15px -3px rgba(0,0,0,0.6)", usage: "Floating navigation bar" },
  { name: "Shadow XL", variable: "--shadow-xl", value: "0 20px 25px -5px rgba(0,0,0,0.7)", usage: "Active modals & drawers" },
  { name: "Shadow Glow Brand", variable: "--shadow-glow-brand", value: "0 0 35px -5px rgba(163,230,53,0.35)", usage: "Primary CTA hover aura & lime highlights", isGlow: true },
  { name: "Shadow Glow Accent (Cyan)", variable: "--shadow-glow-accent", value: "0 0 35px -5px rgba(0,240,255,0.35)", usage: "Glacier Mint accent highlight", isGlow: true },
  { name: "Shadow Glow Orange", variable: "--shadow-glow-orange", value: "0 0 35px -5px rgba(255,94,24,0.35)", usage: "Solar Orange accent highlight", isGlow: true },
];

export const gradientTokens: GradientToken[] = [
  {
    name: "Gradient Brand 1 (Hero Glow)",
    variable: "--gradient-brand-1",
    cssValue: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(163, 230, 53, 0.22), transparent 70%)",
    purpose: "Hero ambient top-center glow for high-impact visual energy",
  },
  {
    name: "Gradient Brand 2 (Legibility Overlay)",
    variable: "--gradient-brand-2",
    cssValue: "linear-gradient(180deg, rgba(13, 13, 15, 0) 0%, rgba(13, 13, 15, 0.65) 60%, rgba(13, 13, 15, 0.98) 100%)",
    purpose: "Video and product image background legibility scrim",
  },
  {
    name: "Gradient Brand 3 (Bottom Fade)",
    variable: "--gradient-brand-3",
    cssValue: "linear-gradient(180deg, transparent 0%, rgba(5, 5, 7, 0.85) 65%, #050507 100%)",
    purpose: "Section exit smooth blending into obsidian footer void",
  },
  {
    name: "Gradient Brand CTA",
    variable: "--gradient-brand-cta",
    cssValue: "linear-gradient(135deg, #bef264 0%, #a3e635 50%, #84cc16 100%)",
    purpose: "High-contrast dynamic CTA button gradient fill",
  },
];
