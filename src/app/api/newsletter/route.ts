import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getEspAdapter } from "@/lib/esp/adapter";

// Server-side Zod validation schema
const NewsletterRequestSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address.").max(255),
  consent: z.boolean().default(true),
  _hp_company: z.string().optional(), // Honeypot field for bot detection
});

// Simple in-memory rate limiter (5 submissions per minute per IP)
const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    ipRateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 1000 });
    return true;
  }

  if (entry.count >= 5) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting check
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a minute before submitting again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse and validate JSON payload
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload." },
        { status: 400 }
      );
    }

    const parseResult = NewsletterRequestSchema.safeParse(rawBody);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid submission.";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 422 }
      );
    }

    const { email, _hp_company } = parseResult.data;

    // 3. Honeypot check: silently accept bot submissions without triggering actions
    if (_hp_company && _hp_company.trim().length > 0) {
      return NextResponse.json({
        success: true,
        reservationKey: "HAYATI-BOT-NULL",
        message: "Reservation confirmed.",
      });
    }

    // 4. Delegate to pluggable ESP adapter
    const esp = getEspAdapter();
    const result = await esp.subscribe({
      email,
      consentTimestamp: new Date().toISOString(),
      privacyVersion: "2026-v1",
      ipAddress: clientIp,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    return NextResponse.json(
      {
        success: true,
        reservationKey: result.reservationKey,
        message: "Your allocation for Batch 001 Priority Dispatch is confirmed.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Never leak stack traces or internal secrets to response
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while reserving your allocation. Please try again.",
      },
      { status: 500 }
    );
  }
}
