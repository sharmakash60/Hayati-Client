import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // Brand Scale mapped to CSS Variables
        brand: {
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          300: "var(--color-brand-300)",
          400: "var(--color-brand-400)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
          900: "var(--color-brand-900)",
          950: "var(--color-brand-950)",
        },
        // Flavor Accent Primitives
        accent: {
          orange: "var(--color-accent-orange)",
          cyan: "var(--color-accent-cyan)",
          purple: "var(--color-accent-purple)",
          pink: "var(--color-accent-pink)",
          amber: "var(--color-accent-amber)",
          blue: "var(--color-accent-blue)",
        },
        // Obsidian Neutral Scale
        neutral: {
          0: "var(--color-neutral-00)",
          50: "var(--color-neutral-50)",
          100: "var(--color-neutral-100)",
          200: "var(--color-neutral-200)",
          300: "var(--color-neutral-300)",
          400: "var(--color-neutral-400)",
          500: "var(--color-neutral-500)",
          600: "var(--color-neutral-600)",
          700: "var(--color-neutral-700)",
          800: "var(--color-neutral-800)",
          850: "var(--color-neutral-850)",
          900: "var(--color-neutral-900)",
          950: "var(--color-neutral-950)",
          999: "var(--color-neutral-999)",
        },
        // Status Colors
        status: {
          success: "var(--color-status-success)",
          error: "var(--color-status-error)",
          warning: "var(--color-status-warning)",
          info: "var(--color-status-info)",
        },
        // Semantic Aliases
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
          glass: "var(--color-bg-glass)",
        },
        surface: {
          card: "var(--color-surface-card)",
          "card-hover": "var(--color-surface-card-hover)",
          elevated: "var(--color-surface-elevated)",
        },
        border: {
          subtle: "var(--color-border-subtle)",
          strong: "var(--color-border-strong)",
          active: "var(--color-border-active)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
          brand: "var(--color-text-brand)",
        },
        cta: {
          bg: "var(--color-cta-bg)",
          text: "var(--color-cta-text)",
          hover: "var(--color-cta-hover)",
          "secondary-bg": "var(--color-cta-secondary-bg)",
          "secondary-text": "var(--color-cta-secondary-text)",
          "secondary-border": "var(--color-cta-secondary-border)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        "2xs": "var(--font-size-2xs)",
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
      },
      spacing: {
        "0": "var(--spacing-0)",
        "1": "var(--spacing-1)",
        "2": "var(--spacing-2)",
        "3": "var(--spacing-3)",
        "4": "var(--spacing-4)",
        "5": "var(--spacing-5)",
        "6": "var(--spacing-6)",
        "8": "var(--spacing-8)",
        "10": "var(--spacing-10)",
        "12": "var(--spacing-12)",
        "16": "var(--spacing-16)",
        "20": "var(--spacing-20)",
        "24": "var(--spacing-24)",
        "32": "var(--spacing-32)",
        section: "var(--spacing-section)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)", // 34.95rem Full Pill
        pill: "var(--radius-lg)", // Semantic alias for 34.95rem
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "glow-brand": "var(--shadow-glow-brand)",
        "glow-accent": "var(--shadow-glow-accent)",
        "glow-orange": "var(--shadow-glow-orange)",
        "inner-border": "var(--shadow-inner-border)",
      },
      backgroundImage: {
        "brand-glow": "var(--gradient-brand-1)",
        "legibility-overlay": "var(--gradient-brand-2)",
        "bottom-fade": "var(--gradient-brand-3)",
        "brand-cta": "var(--gradient-brand-cta)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
