/**
 * Tes Topik 32 — `pnpm test -- coding-practice-v2/32-longest-common-prefix-substring/longest-common-prefix-substring.test.js`
 */
import { describe, it, expect } from "vitest";
import {
  longestCommonPrefix,
  longestCommonSubstring,
  longestCommonSubstringLength,
} from "./longest-common-prefix-substring.js";

describe("Topik 32 — LCP / LCS substring", () => {
  describe("longestCommonPrefix", () => {
    it("contoh", () => {
      expect(longestCommonPrefix(["flower", "flow", "flight"])).toBe("fl");
      expect(longestCommonPrefix(["dog", "racecar", "car"])).toBe("");
    });
  });

  describe("longestCommonSubstring", () => {
    it("dua string", () => {
      expect(longestCommonSubstring("abcde", "xbcdza")).toBe("bcd");
    });
  });

  describe("longestCommonSubstringLength", () => {
    it("konsisten panjang", () => {
      const a = "abcde";
      const b = "xbcdza";
      expect(longestCommonSubstringLength(a, b)).toBe(longestCommonSubstring(a, b).length);
    });
  });
});
