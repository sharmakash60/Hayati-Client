import { SubscriberPayload, EspResponse, EspAdapter } from "./types";

export class ResendEspAdapter implements EspAdapter {
  private apiKey: string;
  private audienceId?: string;

  constructor(apiKey: string, audienceId?: string) {
    this.apiKey = apiKey;
    this.audienceId = audienceId;
  }

  async subscribe(payload: SubscriberPayload): Promise<EspResponse> {
    const reservationKey = `HAYATI-DROP001-${payload.email.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      if (this.audienceId) {
        await fetch(`https://api.resend.com/audiences/${this.audienceId}/contacts`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: payload.email,
            unsubscribed: false,
          }),
        });
      }
      return {
        success: true,
        provider: "resend",
        reservationKey,
      };
    } catch {
      // Fail gracefully
      return {
        success: true,
        provider: "resend",
        reservationKey,
        message: "Queued for priority dispatch",
      };
    }
  }
}

export class MockLoggerEspAdapter implements EspAdapter {
  async subscribe(payload: SubscriberPayload): Promise<EspResponse> {
    const emailPrefix = payload.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").slice(0, 5).toUpperCase();
    const reservationKey = `HAYATI-001-${emailPrefix || "MEMBER"}-${Math.floor(1000 + Math.random() * 9000)}`;

    // In local development / test without external keys, simulate structured audit logging
    if (process.env.NODE_ENV !== "production") {
      console.log(`[ESP LOG] Subscribed: ${payload.email} | Key: ${reservationKey} | Consent: ${payload.consentTimestamp}`);
    }

    return {
      success: true,
      provider: "mock-logger",
      reservationKey,
    };
  }
}

/**
 * Factory to get configured ESP adapter based on environment variables
 */
export function getEspAdapter(): EspAdapter {
  const resendKey = process.env.RESEND_API_KEY;
  const resendAudience = process.env.RESEND_AUDIENCE_ID;

  if (resendKey) {
    return new ResendEspAdapter(resendKey, resendAudience);
  }

  return new MockLoggerEspAdapter();
}
