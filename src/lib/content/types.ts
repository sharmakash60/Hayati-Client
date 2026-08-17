export interface BrandConfig {
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  mission: string;
  metaDescription: string;
  contactEmail: string;
  contactPhone?: string;
  whatsapp?: string;
  websiteUrl?: string;
  social: Record<string, string>;
}

export interface ProductVariantItem {
  id: string;
  name: string;
  collection?: string;
  tagline: string;
  description: string;
  flavorProfile: string;
  accentColor: string;
  glowColor: string;
  badge: string;
  media: {
    canImage: string;
    altText?: string;
  };
  tastingNotes: string[];
  nutrition: Array<{ label: string; value: string }>;
  inStock: boolean;
  ctaLink: string;
}

export interface BenefitStepItem {
  stepNumber: number;
  id: string;
  title: string;
  subtitle: string;
  claimSwap: {
    standardReality: string;
    canInnovation: string;
  };
  description: string;
  metric: {
    value: string;
    label: string;
  };
  media: {
    type: "video" | "image";
    url: string;
    poster: string;
    alt: string;
  };
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface SiteContent {
  brand: BrandConfig;
  preloader: {
    monogram: string;
    statusPhrases: string[];
    readyText: string;
  };
  header: {
    navLinks: Array<{ label: string; href: string; isBadge?: boolean }>;
    cta: { label: string; href: string };
  };
  hero: {
    badge: string;
    headline: string;
    headlineSuffix?: string;
    subheadline: string;
    primaryCta: { label: string; href: string; ariaLabel?: string };
    secondaryCta: { label: string; href: string; ariaLabel?: string };
    trustBadges: Array<{ label: string; detail: string }>;
  };
  variants: ProductVariantItem[];
  benefits: {
    sectionHeader: {
      badge: string;
      headline: string;
      subheadline: string;
    };
    steps: BenefitStepItem[];
  };
  newsletter: {
    sectionHeader: {
      badge: string;
      headline: string;
      subheadline: string;
    };
    inputPlaceholder: string;
    submitButtonText: string;
    submittingText: string;
    successTitle: string;
    successMessage: string;
    privacyConsent: string;
  };
  footer: {
    brandStamp: string;
    missionStatement: string;
    links: {
      product: Array<{ label: string; href: string }>;
      brand: Array<{ label: string; href: string }>;
      legal: Array<{ label: string; href: string }>;
    };
    copyright: string;
  };
}
