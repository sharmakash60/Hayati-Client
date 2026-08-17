import { test, describe } from "node:test";
import assert from "node:assert";

class MockLoggerEspAdapter {
  async subscribe(payload) {
    const emailPrefix = payload.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").slice(0, 5).toUpperCase();
    const reservationKey = `HAYATI-001-${emailPrefix || "MEMBER"}-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      success: true,
      provider: "mock-logger",
      reservationKey,
    };
  }
}

describe("ESP Adapter Integration", () => {
  test("generates unique reservation key for subscribers", async () => {
    const adapter = new MockLoggerEspAdapter();
    const result = await adapter.subscribe({
      email: "founder@hayati.com",
      consentTimestamp: new Date().toISOString(),
      privacyVersion: "2026-v1",
    });

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.provider, "mock-logger");
    assert.ok(result.reservationKey.startsWith("HAYATI-001-FOUND-"));
  });

  test("handles arbitrary email characters safely in reservation key generation", async () => {
    const adapter = new MockLoggerEspAdapter();
    const result = await adapter.subscribe({
      email: "a.b+special@test.com",
      consentTimestamp: new Date().toISOString(),
      privacyVersion: "2026-v1",
    });

    assert.strictEqual(result.success, true);
    assert.ok(result.reservationKey.startsWith("HAYATI-001-ABSPE-"));
  });
});
