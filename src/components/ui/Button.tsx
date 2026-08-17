import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold font-sans transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-cta-bg text-cta-text hover:bg-cta-hover shadow-glow-brand hover:scale-105",
    secondary:
      "bg-neutral-800 text-white hover:bg-neutral-700 border border-border-subtle hover:border-border-strong",
    outline:
      "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-white/40",
    ghost: "bg-transparent text-text-secondary hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-pill gap-1.5",
    md: "px-6 py-3 text-sm rounded-pill gap-2",
    lg: "px-8 py-4 text-base rounded-pill gap-2.5",
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
}
