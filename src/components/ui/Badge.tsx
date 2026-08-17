import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "brand" | "outline" | "accent" | "muted";
  accentColor?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "brand",
  accentColor,
  className,
  icon,
}: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-mono font-bold tracking-wide uppercase";

  const variants = {
    brand: "bg-brand-950/90 text-brand-400 border border-brand-800/80 shadow-sm",
    outline: "bg-transparent text-white border border-white/20",
    accent: "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/40",
    muted: "bg-neutral-800 text-text-muted border border-border-subtle",
  };

  const customStyle = accentColor
    ? {
        backgroundColor: `${accentColor}18`,
        color: accentColor,
        borderColor: `${accentColor}40`,
      }
    : {};

  return (
    <span
      className={twMerge(clsx(base, !accentColor && variants[variant], className))}
      style={customStyle}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
