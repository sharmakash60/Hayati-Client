"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getSiteContent } from "@/lib/content/loader";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Sparkles, Send, Copy, Check } from "lucide-react";

const NewsletterFormSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
  consent: z.boolean(),
  _hp_company: z.string().optional(),
});

type NewsletterFormData = z.infer<typeof NewsletterFormSchema>;

export function NewsletterForm() {
  const content = getSiteContent();
  const [reservationKey, setReservationKey] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: {
      email: "",
      consent: true,
      _hp_company: "",
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setServerError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setServerError(resData.error || "Failed to submit reservation. Please try again.");
        return;
      }

      setReservationKey(resData.reservationKey || `HAYATI-001-${Math.floor(1000 + Math.random() * 9000)}`);
      reset();
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  };

  const copyReservationKey = () => {
    if (!reservationKey) return;
    navigator.clipboard.writeText(reservationKey);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="newsletter" className="relative py-28 border-t border-border-subtle overflow-hidden bg-bg-primary">
      {/* Ambient Gradient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-brand-1 opacity-35 z-0" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-500/10 blur-[140px] z-0" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="glass-card p-8 sm:p-14 text-center border-brand-500/40 shadow-2xl relative overflow-hidden bg-neutral-950/80">
          <div className="inline-flex items-center gap-2 text-brand-400 text-xs font-mono font-bold uppercase tracking-widest mb-3">
            <Sparkles className="h-4 w-4" />
            <span>{content.newsletter.sectionHeader.badge}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-4">
            {content.newsletter.sectionHeader.headline}
          </h2>

          <p className="text-sm sm:text-base text-text-secondary max-w-lg mx-auto mb-10 leading-relaxed">
            {content.newsletter.sectionHeader.subheadline}
          </p>

          {reservationKey ? (
            /* Confirmed Allocation Card State */
            <div className="p-6 sm:p-8 rounded-2xl bg-brand-950/90 border border-brand-400 text-left max-w-lg mx-auto shadow-glow-brand/20 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-brand-400 shrink-0 mt-1" />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white font-display uppercase tracking-tight">
                    {content.newsletter.successTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed">
                    {content.newsletter.successMessage}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-neutral-900/90 border border-border-subtle flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[9px] font-mono text-text-muted uppercase">ALLOCATION ACCESS KEY</div>
                      <div className="font-mono text-xs sm:text-sm text-brand-400 font-bold tracking-wider">
                        {reservationKey}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={copyReservationKey}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                      aria-label="Copy allocation access key"
                    >
                      {isCopied ? <Check className="h-4 w-4 text-brand-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Active Form State */
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4 text-left" noValidate>
              {/* Honeypot Spam Trap Field (Hidden from humans) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_hp_company">Company</label>
                <input
                  id="_hp_company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("_hp_company")}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="flex-1">
                  <input
                    type="email"
                    {...register("email")}
                    placeholder={content.newsletter.inputPlaceholder}
                    disabled={isSubmitting}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="w-full bg-neutral-900/90 border border-border-subtle rounded-pill px-5 py-3.5 text-sm text-white placeholder:text-text-muted focus:border-brand-400 focus:outline-none transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="h-4 w-4" />}
                  className="font-bold shrink-0 shadow-glow-brand"
                >
                  {isSubmitting ? content.newsletter.submittingText : content.newsletter.submitButtonText}
                </Button>
              </div>

              {/* Validation & Server Error Messages */}
              {errors.email && (
                <div id="email-error" className="flex items-center gap-1.5 text-xs text-status-error px-2">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{errors.email.message}</span>
                </div>
              )}

              {serverError && (
                <div className="flex items-center gap-1.5 text-xs text-status-error px-2">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <p className="text-[11px] text-text-muted leading-relaxed pt-1 text-center">
                {content.newsletter.privacyConsent}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
