/**
 * Tes Topik 16 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  isPalindromeAlphanumeric,
  maxAreaWater,
  mergeSorted,
  trapRainWater,
  twoSumSorted,
  validPalindromeAtMostOneDelete,
} from "./two-pointers.js";

describe("Topik 16 — two pointers", () => {
  describe("twoSumSorted", () => {
    it("menemukan pasangan", () => {
      expect(twoSumSorted([1, 2, 3, 4, 6], 6)).toEqual([1, 3]);
    });

    it("null jika tidak ada", () => {
      expect(twoSumSorted([1, 2], 10)).toBeNull();
    });
  });

  describe("isPalindromeAlphanumeric", () => {
    it("aba", () => {
      expect(isPalindromeAlphanumeric("A man, a plan, a canal: Panama")).toBe(true);
    });

    it("bukan palindrome", () => {
      expect(isPalindromeAlphanumeric("race a car")).toBe(false);
    });
  });

  describe("maxAreaWater", () => {
    it("contoh klasik", () => {
      expect(maxAreaWater([1, 8, 6, 2, 5, 4, 8, 3, 7])).toBe(49);
    });
  });

  describe("validPalindromeAtMostOneDelete", () => {
    it("true", () => {
      expect(validPalindromeAtMostOneDelete("abca")).toBe(true);
    });
  });

  describe("mergeSorted", () => {
    it("gabung", () => {
      expect(mergeSorted([1, 3], [2, 4])).toEqual([1, 2, 3, 4]);
    });
  });

  describe("trapRainWater", () => {
    it("contoh", () => {
      expect(trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6);
    });
  });
});
