import { test, describe } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

describe("Content Integrity & Zero Lorem Ipsum Verification", () => {
  const contentPath = path.resolve(process.cwd(), "src/content/content.json");
  const rawContent = fs.readFileSync(contentPath, "utf-8");
  const content = JSON.parse(rawContent);

  test("contains no lorem ipsum substrings anywhere in content", () => {
    const lowerContent = rawContent.toLowerCase();
    assert.strictEqual(lowerContent.includes("lorem ipsum"), false);
    assert.strictEqual(lowerContent.includes("dolor sit amet"), false);
  });

  test("brand is configured as Hayati with valid contact points", () => {
    assert.strictEqual(content.brand.name, "Hayati");
    assert.ok(content.brand.contactEmail.includes("@"));
    assert.strictEqual(content.brand.tagline.length > 5, true);
  });

  test("all flavor variants have complete nutritional and color profiles with real product imagery", () => {
    assert.ok(content.variants.length >= 6);
    content.variants.forEach((variant) => {
      assert.ok(variant.id.length > 0);
      assert.ok(variant.name.length > 0);
      assert.ok(variant.accentColor.startsWith("#"));
      assert.ok(variant.nutrition.length >= 3);
      assert.ok(variant.media.canImage.includes("/media/"));
    });
  });

  test("benefits section contains exactly 4 stages with parallel claims", () => {
    assert.strictEqual(content.benefits.steps.length, 4);
    content.benefits.steps.forEach((step, index) => {
      assert.strictEqual(step.stepNumber, index + 1);
      assert.ok(step.claimSwap.standardReality.length > 10);
      assert.ok(step.claimSwap.canInnovation.length > 10);
      assert.ok(step.metric.value.length > 0);
    });
  });
});
