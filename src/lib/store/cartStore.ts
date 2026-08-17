/**
 * Hayati Cart Store
 * Client-side cart state with Shopify Cart Permalink checkout handoff.
 * Cart state is persisted via localStorage (keyed to a cartToken).
 * On checkout, generates a Shopify cart permalink URL.
 *
 * Architecture: Hybrid (ADR-002-Option-B)
 *   - Cart UI lives in Next.js
 *   - Transactional checkout delegates to Shopify hosted checkout
 *   - No custom checkout form ever built here (PCI-DSS stays with Shopify)
 */

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLineItem {
  id: string;           // variant id / product id
  name: string;         // product display name
  collection?: string;  // e.g. "Alder Series"
  flavor: string;       // flavor / tagline short
  price: number;        // INR price in paise (e.g. 3150 = ₹31.50)
  quantity: number;
  canImage: string;
  accentColor: string;
  inStock: boolean;
}

interface CartStore {
  isOpen: boolean;
  items: CartLineItem[];

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (item: Omit<CartLineItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  totalItems: () => number;
  subtotalPaise: () => number;

  /** Generates a Shopify cart permalink for hosted checkout handoff. */
  getCheckoutUrl: (shopifyDomain?: string) => string;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      isOpen: false,
      items: [],

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (incoming) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === incoming.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === incoming.id
                  ? { ...i, quantity: i.quantity + (incoming.quantity ?? 1) }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...incoming, quantity: incoming.quantity ?? 1 },
            ],
          };
        });
        // Auto-open cart drawer on add
        set({ isOpen: true });
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotalPaise: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      /**
       * Generates a Shopify cart permalink:
       * https://{shop}/cart/{variantId}:{quantity},{variantId}:{quantity}?...
       * Falls back to #newsletter if no items.
       */
      getCheckoutUrl: (shopifyDomain = "hayatiworld.com") => {
        const items = get().items;
        if (items.length === 0) return "#newsletter";
        const cartString = items
          .map((i) => `${encodeURIComponent(i.id)}:${i.quantity}`)
          .join(",");
        return `https://${shopifyDomain}/cart/${cartString}?channel=buy_button`;
      },
    }),
    {
      name: "hayati-cart-v1",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
