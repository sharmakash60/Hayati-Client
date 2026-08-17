"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { getSiteContent } from "@/lib/content/loader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Hero3DStage } from "@/components/3d/Hero3DStage";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { getGSAP } from "@/lib/motion/gsap";
import { EASE_SMOOTH, EASE_EXPO } from "@/lib/motion/primitives";
import { getLenis } from "@/lib/motion/lenis";

export function Scene01Hero() {
  const content = getSiteContent();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { gsap } = getGSAP();
    if (!heroRef.current) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (isReduced) {
        gsap.set([".hero-badge", ".hero-headline", ".hero-subheadline", ".hero-ctas", ".hero-stats"], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: EASE_SMOOTH },
        delay: 0.1,
      });

      tl.fromTo(".hero-badge", { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".hero-headline-line",
          { opacity: 0, y: 40, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8, stagger: 0.12, ease: EASE_EXPO },
          "-=0.3"
        )
        .fromTo(".hero-subheadline", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(".hero-ctas > *", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .fromTo(".hero-stat-card", { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.3");
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = getLenis();
    const target = document.querySelector("#story-scene");
    if (target && lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero-scene"
      className="relative min-h-screen flex flex-col justify-between items-center text-center px-6 pt-32 pb-16 z-20"
    >
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-[650px] bg-gradient-brand-1 opacity-80 z-0" />

      {/* Top Header Content */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center">
        {/* Category Trust Badge */}
        <div className="hero-badge mb-6">
          <Badge
            variant="brand"
            className="hover:scale-105 transition-transform cursor-default text-xs py-1.5 px-4"
            icon={<Sparkles className="h-3.5 w-3.5" />}
          >
            {content.hero.badge}
          </Badge>
        </div>

        {/* Display Headline */}
        <h1 className="hero-headline font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.02] mb-6 max-w-4xl">
          <span className="hero-headline-line block">{content.hero.headline}</span>
          <span className="hero-headline-line block text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-accent-cyan">
            {content.hero.headlineSuffix}
          </span>
        </h1>

        {/* Subheadline Copy */}
        <p className="hero-subheadline max-w-2xl text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed mb-6">
          {content.hero.subheadline}
        </p>

        {/* 6-Flavor Interactive 3D Stage (Lineup, Carousel, Master Can) */}
        <Hero3DStage className="my-6 z-30" />

        {/* Dual Actions CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-4 z-30">
          <Link href={content.hero.primaryCta.href} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base font-bold shadow-glow-brand"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {content.hero.primaryCta.label}
            </Button>
          </Link>

          <Link href="#flavors-scene" onClick={handleScrollDown} className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base">
              Explore 6 Flavors
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom Trust Stats & Scroll Cue */}
      <div className="relative z-20 w-full max-w-4xl flex flex-col items-center mt-12">
        <div className="hero-stats grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8">
          {content.hero.trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="hero-stat-card glass-card p-4 text-center border-border-subtle bg-neutral-950/60 backdrop-blur-md hover:border-brand-500/30 transition-all duration-300"
            >
              <div className="text-base font-bold text-white tracking-wide">{badge.label}</div>
              <div className="text-xs font-mono text-brand-400 mt-1 font-semibold">{badge.detail}</div>
            </div>
          ))}
        </div>

        <a
          href="#story-scene"
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-1 text-xs font-mono text-text-muted hover:text-brand-400 transition-colors group cursor-pointer"
        >
          <span className="tracking-widest uppercase text-[10px]">SCROLL TO DISCOVER</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-brand-400 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
