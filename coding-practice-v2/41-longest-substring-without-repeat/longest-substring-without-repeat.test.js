/**
 * Tes Topik 41 — `pnpm test -- coding-practice-v2/41-longest-substring-without-repeat/longest-substring-without-repeat.test.js`
 */
import { describe, it, expect } from "vitest";
import { lengthOfLongestSubstring } from "./longest-substring-without-repeat.js";

describe("Topik 41 — longest unique substring", () => {
  it("contoh", () => {
    expect(lengthOfLongestSubstring("abcabcbb")).toBe(3);
    expect(lengthOfLongestSubstring("bbbbb")).toBe(1);
  });
});
