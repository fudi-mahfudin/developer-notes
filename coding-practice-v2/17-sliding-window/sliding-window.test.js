/**
 * Tes Topik 17 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  longestOnesAfterKFlips,
  longestSubstringAtMostKDistinct,
  maxSumSubarraySizeK,
  minSubarrayLenAtLeastSum,
  slidingWindowAverages,
} from "./sliding-window.js";

describe("Topik 17 — sliding window", () => {
  describe("maxSumSubarraySizeK", () => {
    it("jumlah maksimum", () => {
      expect(maxSumSubarraySizeK([2, 1, 5, 1, 3, 2], 3)).toBe(9);
    });
  });

  describe("slidingWindowAverages", () => {
    it("rata-rata bergeser", () => {
      expect(slidingWindowAverages([1, 2, 3, 4], 2)).toEqual([1.5, 2.5, 3.5]);
    });
  });

  describe("longestSubstringAtMostKDistinct", () => {
    it("eceba dengan k=2", () => {
      expect(longestSubstringAtMostKDistinct("eceba", 2)).toBe(3);
    });
  });

  describe("minSubarrayLenAtLeastSum", () => {
    it("contoh positif", () => {
      expect(minSubarrayLenAtLeastSum([2, 3, 1, 2, 4, 3], 7)).toBe(2);
    });
  });

  describe("longestOnesAfterKFlips", () => {
    it("flip k nol", () => {
      expect(longestOnesAfterKFlips([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)).toBe(6);
    });
  });
});
