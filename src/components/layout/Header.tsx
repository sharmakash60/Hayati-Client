"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSiteContent } from "@/lib/content/loader";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import { getLenis } from "@/lib/motion/lenis";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Button } from "@/components/ui/Button";
import { Menu, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";

export function Header() {
  const content = getSiteContent();
  const { isScrolled } = useScrollPosition(30);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  // Section IDs for scroll-spy
  const sectionIds = ["hero", "variants", "benefits", "faq", "newsletter"];
  const activeSectionId = useScrollSpy(sectionIds);
  const activeAnchor = `#${activeSectionId}`;

  const handleSmoothAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const lenis = getLenis();
      const target = document.querySelector(href);
      if (target && lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 });
      } else if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-bg-glass backdrop-blur-xl border-b border-border-subtle py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 font-display text-2xl font-black tracking-tight text-white group"
          >
            <div className="relative h-8 w-auto flex items-center justify-center">
              <Image
                src="/logo.webp"
                alt={`${content.brand.name} Logo`}
                width={110}
                height={34}
                priority
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium"
          >
            {content.header.navLinks.map((link) => {
              const isActive = activeAnchor === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothAnchor(e, link.href)}
                  aria-current={isActive ? "location" : undefined}
                  className={`transition-all duration-200 relative py-1 ${
                    link.isBadge
                      ? "rounded-pill bg-brand-950 px-3 py-1 text-xs font-mono font-bold text-brand-400 border border-brand-800 hover:bg-brand-900 shadow-sm"
                      : isActive
                      ? "text-brand-400 font-bold"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <span>{link.label}</span>
                  {!link.isBadge && isActive && (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-brand-400 rounded-full animate-in fade-in" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA + Cart Icon */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart Icon with count badge */}
            <button
              onClick={openCart}
              aria-label={`Open cart — ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              className="relative p-2.5 rounded-pill bg-neutral-900 border border-border-subtle text-text-secondary hover:text-brand-400 hover:border-brand-500/40 transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-400 text-black text-[10px] font-mono font-black flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
            <a
              href={content.header.cta.href}
              onClick={(e) => handleSmoothAnchor(e, content.header.cta.href)}
            >
              <Button variant="primary" size="sm">
                {content.header.cta.label}
              </Button>
            </a>
          </div>

          {/* Mobile: Cart + Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={openCart}
              aria-label={`Open cart — ${cartCount} items`}
              className="relative p-2.5 rounded-pill bg-neutral-900 border border-border-subtle text-text-secondary hover:text-brand-400 transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-400 text-black text-[10px] font-mono font-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="p-2.5 rounded-pill bg-neutral-900 border border-border-subtle text-white hover:text-brand-400 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={content.header.navLinks}
        activeAnchor={activeAnchor}
        cta={content.header.cta}
        brandName={content.brand.name}
      />
    </>
  );
}
