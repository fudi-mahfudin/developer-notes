/**
 * Tes Topik 23 — `pnpm test -- coding-practice-v2/23-kadane-maximum-subarray/kadane-maximum-subarray.test.js`
 */
import { describe, it, expect } from "vitest";
import { maxSubArrayRange, maxSubArraySum, maxSubArraySumWithMaxLength } from "./kadane-maximum-subarray.js";

describe("Topik 23 — Kadane", () => {
  describe("maxSubArraySum", () => {
    it("contoh README", () => {
      expect(maxSubArraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
    });

    it("satu elemen", () => {
      expect(maxSubArraySum([5])).toBe(5);
    });

    it("semua negatif", () => {
      expect(maxSubArraySum([-3, -1, -2])).toBe(-1);
    });
  });

  describe("maxSubArrayRange", () => {
    it("rentang untuk contoh klasik", () => {
      const r = maxSubArrayRange([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
      expect(r.sum).toBe(6);
      expect(r.end).toBeGreaterThanOrEqual(r.start);
      const slice = [-2, 1, -3, 4, -1, 2, 1, -5, 4].slice(r.start, r.end + 1);
      expect(slice.reduce((a, b) => a + b, 0)).toBe(6);
    });
  });

  describe("maxSubArraySumWithMaxLength", () => {
    it("membatasi panjang", () => {
      expect(maxSubArraySumWithMaxLength([1, -2, 3, 4], 2)).toBe(7);
    });
  });
});
