"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useCartStore } from "@/lib/store/cartStore";
import { X, Minus, Plus, ShoppingBag, ArrowUpRight, Trash2 } from "lucide-react";

function formatINR(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(paise / 100);
}

export function CartDrawer() {
  const {
    isOpen,
    items,
    closeCart,
    removeItem,
    updateQuantity,
    totalItems,
    subtotalPaise,
    getCheckoutUrl,
  } = useCartStore();

  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // GSAP slide-in / slide-out animation
  useEffect(() => {
    if (!drawerRef.current || !overlayRef.current) return;
    if (isOpen) {
      gsap.set(drawerRef.current, { x: "100%" });
      gsap.set(overlayRef.current, { autoAlpha: 0, display: "block" });
      const tl = gsap.timeline();
      tl.to(overlayRef.current, { autoAlpha: 1, duration: 0.2, ease: "power1.out" });
      tl.to(drawerRef.current, { x: "0%", duration: 0.4, ease: "power3.out" }, "-=0.1");
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          if (overlayRef.current) gsap.set(overlayRef.current, { display: "none" });
        },
      });
      tl.to(drawerRef.current, { x: "100%", duration: 0.3, ease: "power2.in" });
      tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.2, ease: "power1.in" }, "-=0.1");
    }
  }, [isOpen]);

  // Trap focus and close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeCart();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleCheckout = () => {
    const url = getCheckoutUrl("hayatiworld.com");
    window.open(url, "_blank", "noopener");
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        ref={overlayRef}
        onClick={closeCart}
        aria-hidden="true"
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
        style={{ display: "none" }}
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-neutral-950 border-l border-border-subtle shadow-2xl z-[100] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-brand-400" />
            <h2 className="font-display text-lg font-black text-white uppercase tracking-tight">
              Your Cart
            </h2>
            {totalItems() > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-400 text-black">
                {totalItems()}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 rounded-full hover:bg-neutral-800 text-text-secondary hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Line Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          {items.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-neutral-900 border border-border-subtle flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-text-muted" />
              </div>
              <div>
                <p className="font-display text-xl font-black text-white uppercase">Cart is empty</p>
                <p className="mt-1 text-sm text-text-secondary">
                  Add a flavor to start your Hayati order.
                </p>
              </div>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 rounded-pill text-sm font-bold bg-brand-400 text-black hover:scale-105 transition-transform"
              >
                Explore Flavors
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900 border border-border-subtle hover:border-white/10 transition-colors"
              >
                {/* Can Image */}
                <div className="relative w-14 h-20 shrink-0">
                  <Image
                    src={item.canImage}
                    alt={item.name}
                    fill
                    className="object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
                  />
                </div>

                {/* Item Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{item.name}</div>
                  <div
                    className="text-xs font-mono mt-0.5 truncate"
                    style={{ color: item.accentColor }}
                  >
                    {item.flavor}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-neutral-950 border border-border-subtle rounded-pill px-2.5 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="text-text-muted hover:text-white transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="text-text-muted hover:text-white transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-mono font-bold text-white">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="p-1.5 rounded-full hover:bg-red-500/20 text-text-muted hover:text-red-400 transition-colors shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer: Subtotal + Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border-subtle px-6 py-5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-text-secondary">Subtotal</span>
              <span className="text-lg font-display font-black text-white">
                {formatINR(subtotalPaise())}
              </span>
            </div>
            <p className="text-xs font-mono text-text-muted">
              Shipping &amp; taxes calculated at checkout
            </p>

            {/* Checkout CTA — Shopify hosted checkout handoff */}
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-pill text-sm font-bold text-black bg-brand-400 hover:scale-[1.02] hover:shadow-glow-brand transition-all shadow-lg"
            >
              <span>Checkout via Shopify</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            {/* Trust line */}
            <p className="text-[11px] font-mono text-text-muted text-center">
              🔒 Secure · PCI-DSS via Shopify · Shop Pay / UPI / Cards
            </p>
          </div>
        )}
      </div>
    </>
  );
}
