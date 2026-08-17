export interface SubscriberPayload {
  email: string;
  consentTimestamp: string;
  privacyVersion: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface EspResponse {
  success: boolean;
  provider: "resend" | "klaviyo" | "mailchimp" | "mock-logger";
  reservationKey: string;
  message?: string;
}

export interface EspAdapter {
  subscribe(payload: SubscriberPayload): Promise<EspResponse>;
}
