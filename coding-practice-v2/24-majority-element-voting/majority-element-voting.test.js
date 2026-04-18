/**
 * Tes Topik 24 — `pnpm test -- coding-practice-v2/24-majority-element-voting/majority-element-voting.test.js`
 */
import { describe, it, expect } from "vitest";
import {
  countOccurrences,
  majorityAtLeastThird,
  majorityElement,
  majorityElementVerify,
} from "./majority-element-voting.js";

describe("Topik 24 — majority voting", () => {
  describe("majorityElement", () => {
    it("contoh README", () => {
      expect(majorityElement([2, 2, 1, 1, 1, 2, 2])).toBe(2);
    });
  });

  describe("countOccurrences", () => {
    it("frekuensi", () => {
      expect(countOccurrences([1, 2, 1], 1)).toBe(2);
    });
  });

  describe("majorityElementVerify", () => {
    it("tanpa majority", () => {
      expect(majorityElementVerify([1, 2, 3])).toBeNull();
    });

    it("dengan majority", () => {
      expect(majorityElementVerify([1, 1, 2])).toBe(1);
    });
  });

  describe("majorityAtLeastThird", () => {
    it("kandidat ter-verifikasi", () => {
      const r = majorityAtLeastThird([1, 2, 3, 1, 2, 3, 1, 2]);
      expect(r.length).toBeGreaterThan(0);
      for (const x of r) {
        expect(countOccurrences([1, 2, 3, 1, 2, 3, 1, 2], x) * 3).toBeGreaterThan(8);
      }
    });
  });
});
