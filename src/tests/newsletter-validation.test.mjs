import { test, describe } from "node:test";
import assert from "node:assert";
import { z } from "zod";

const NewsletterRequestSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address.").max(255),
  consent: z.boolean().default(true),
  _hp_company: z.string().optional(),
});

describe("Newsletter Request Schema Validation", () => {
  test("accepts valid email address", () => {
    const payload = { email: "tester@hayati.com", consent: true };
    const result = NewsletterRequestSchema.safeParse(payload);
    assert.strictEqual(result.success, true);
  });

  test("rejects invalid email without @ symbol", () => {
    const payload = { email: "invalid-email-address", consent: true };
    const result = NewsletterRequestSchema.safeParse(payload);
    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.strictEqual(result.error.issues[0].message, "Please provide a valid email address.");
    }
  });

  test("rejects empty email string", () => {
    const payload = { email: "", consent: true };
    const result = NewsletterRequestSchema.safeParse(payload);
    assert.strictEqual(result.success, false);
  });

  test("identifies honeypot bot trap submission", () => {
    const payload = {
      email: "spambot@example.com",
      consent: true,
      _hp_company: "BotAutomationsLLC",
    };
    const result = NewsletterRequestSchema.safeParse(payload);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.data._hp_company, "BotAutomationsLLC");
  });
});
