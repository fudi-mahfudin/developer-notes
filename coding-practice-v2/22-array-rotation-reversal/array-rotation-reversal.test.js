/**
 * Tes Topik 22 — `pnpm test -- coding-practice-v2/22-array-rotation-reversal/array-rotation-reversal.test.js`
 */
import { describe, it, expect } from "vitest";
import { rotateLeftCopy, rotateRightCopy, rotateRightInPlace } from "./array-rotation-reversal.js";

describe("Topik 22 — array rotation", () => {
  describe("rotateRightCopy", () => {
    it("contoh README: kanan 2", () => {
      expect(rotateRightCopy([1, 2, 3, 4, 5], 2)).toEqual([4, 5, 1, 2, 3]);
    });

    it("k negatif", () => {
      expect(rotateRightCopy([1, 2, 3], -1)).toEqual([2, 3, 1]);
    });

    it("tidak mutasi input", () => {
      const a = [1, 2, 3];
      const b = rotateRightCopy(a, 1);
      expect(a).toEqual([1, 2, 3]);
      expect(b).toEqual([3, 1, 2]);
    });
  });

  describe("rotateRightInPlace", () => {
    it("sama dengan copy", () => {
      const a = [1, 2, 3, 4, 5];
      const k = 2;
      const expected = rotateRightCopy([1, 2, 3, 4, 5], k);
      rotateRightInPlace(a, k);
      expect(a).toEqual(expected);
    });
  });

  describe("rotateLeftCopy", () => {
    it("kiri 2", () => {
      expect(rotateLeftCopy([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5, 1, 2]);
    });
  });
});
