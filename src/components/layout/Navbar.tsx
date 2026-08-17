"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { ShoppingBag, ArrowRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const items = useCartStore((s) => s.items);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 py-3.5 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-1.5">
          <span className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider">
            HAYA<span className="text-brand-400">TI</span>
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
          <a href="#flavors" className="hover:text-white transition-colors">
            Flavors
          </a>
          <a href="#science" className="hover:text-white transition-colors">
            Science
          </a>
          <a href="#ingredients" className="hover:text-white transition-colors">
            Ingredients
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
        </nav>

        {/* Right Cart & Action CTA */}
        <div className="flex items-center gap-3">
          {/* Cart Icon with Counter Badge */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-2.5 rounded-pill bg-neutral-900 border border-neutral-800 text-white hover:text-brand-400 hover:border-brand-500/40 transition-all cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-400 text-black text-[10px] font-mono font-black h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center animate-pulse">
                {totalQuantity}
              </span>
            )}
          </button>

          {/* Primary Shop Now Button */}
          <a
            href="#flavors"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-pill text-xs font-bold bg-brand-400 text-black hover:scale-105 transition-transform shadow-glow-brand font-mono uppercase cursor-pointer"
          >
            <span>Shop Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
