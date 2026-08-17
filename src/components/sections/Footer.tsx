import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getSiteContent } from "@/lib/content/loader";
import { Instagram, Twitter, Youtube, ArrowUp } from "lucide-react";

export function Footer() {
  const content = getSiteContent();
  const currentYear = new Date().getFullYear();

  const socialIcons: Record<string, React.ReactNode> = {
    instagram: <Instagram className="h-4 w-4" />,
    twitter: <Twitter className="h-4 w-4" />,
    youtube: <Youtube className="h-4 w-4" />,
  };

  return (
    <footer id="footer" className="border-t border-border-subtle bg-neutral-999 text-text-secondary pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-border-subtle/50">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-block group">
              <Image
                src="/logo.webp"
                alt={`${content.brand.name} Brand Logo`}
                width={130}
                height={40}
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-xs sm:text-sm text-text-secondary max-w-sm leading-relaxed">
              {content.footer.missionStatement}
            </p>
            <div className="font-mono text-xs text-brand-400 font-semibold">
              {content.brand.tagline}
            </div>

            {/* Social Channels */}
            <div className="pt-2 flex items-center gap-3">
              {Object.entries(content.brand.social).map(([platform, url]) => {
                if (!url) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow ${content.brand.name} on ${platform}`}
                    className="p-2.5 rounded-full bg-neutral-900 border border-border-subtle text-text-secondary hover:text-brand-400 hover:border-brand-500/40 transition-all hover:scale-105"
                  >
                    {socialIcons[platform] || <span className="font-mono text-xs uppercase">{platform[0]}</span>}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Product
            </div>
            <ul className="space-y-2.5 text-xs">
              {content.footer.links.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Brand
            </div>
            <ul className="space-y-2.5 text-xs">
              {content.footer.links.brand.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              Legal & Compliance
            </div>
            <ul className="space-y-2.5 text-xs">
              {content.footer.links.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-brand-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Dynamic Year */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-muted">
          <div>
            © {currentYear} {content.brand.name} Beverages Inc. All rights reserved. {content.brand.name}™ and Liquid Precision™ are registered trademarks.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#hero"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 text-brand-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
