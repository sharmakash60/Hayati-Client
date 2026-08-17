"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FlavorsCatalogSection } from "@/components/sections/FlavorsCatalogSection";
import { ScienceBenefitsSection } from "@/components/sections/ScienceBenefitsSection";
import { IngredientsTransparencySection } from "@/components/sections/IngredientsTransparencySection";
import { VipAllocationSection } from "@/components/sections/VipAllocationSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { CartDrawer } from "@/components/sections/CartDrawer";
import { CookieConsent } from "@/components/ui/CookieConsent";

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="relative min-h-screen bg-neutral-950 text-white selection:bg-brand-400 selection:text-black overflow-x-hidden"
    >
      {/* 1. Fixed Header Navigation */}
      <Navbar />

      {/* 2. Global Slide-out Cart Drawer */}
      <CartDrawer />

      {/* 3. Hero Section (Headline, Value Prop, Pricing, 3D 6-Can Stage) */}
      <HeroSection />

      {/* 4. Signature Formulas Catalog (Collection Tabs, 6 Cards, Direct Add to Cart) */}
      <FlavorsCatalogSection />

      {/* 5. Science & Formulation Pillars (Positive, Confident USPs) */}
      <ScienceBenefitsSection />

      {/* 6. Clean Facts & Ingredients Transparency (100% Disclosed Active Minerals) */}
      <IngredientsTransparencySection />

      {/* 7. Founder Drop VIP Allocation (Priority Access Email Capture) */}
      <VipAllocationSection />

      {/* 8. Frequently Asked Questions (Categorized Accordion) */}
      <FAQSection />

      {/* 9. Comprehensive Footer (Legal, FSSAI, Contact, Security Seals) */}
      <FooterSection />

      {/* 10. Cookie Consent Banner */}
      <CookieConsent />
    </main>
  );
}
