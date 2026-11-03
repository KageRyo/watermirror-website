import assert from "node:assert/strict";
import { test } from "node:test";

import { pickLocale } from "../src/lib/pickLocale.ts";

test("Traditional Chinese regions and script map to zh-TW", () => {
  for (const tag of ["zh-TW", "zh-HK", "zh-MO", "zh-Hant", "zh-Hant-HK"]) assert.equal(pickLocale([tag]), "zh-TW", tag);
});

test("Simplified Chinese regions, script and bare zh map to zh-CN", () => {
  for (const tag of ["zh-CN", "zh-SG", "zh-Hans", "zh-Hans-TW", "zh"]) assert.equal(pickLocale([tag]), "zh-CN", tag);
});

test("the first supported language in the preference order wins", () => {
  assert.equal(pickLocale(["en-US", "zh-TW"]), "en");
  assert.equal(pickLocale(["fr-FR", "ja-JP", "en"]), "ja");
});

test("unsupported or missing preferences fall back to English", () => {
  assert.equal(pickLocale(["fr", "de-DE"]), "en");
  assert.equal(pickLocale([]), "en");
});
