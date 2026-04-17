/**
 * Tes Topik 25 — `pnpm test -- coding-practice-v2/25-permutation-combination-intro/permutation-combination-intro.test.js`
 */
import { describe, it, expect } from "vitest";
import {
  binomialCoefficient,
  combinationsRange,
  permuteDistinct,
  permuteWithDup,
} from "./permutation-combination-intro.js";

describe("Topik 25 — permutation / combination", () => {
  describe("permuteDistinct", () => {
    it("3! = 6", () => {
      const p = permuteDistinct([1, 2, 3]);
      expect(p).toHaveLength(6);
      expect(p.some((x) => x.join(",") === "3,2,1")).toBe(true);
    });
  });

  describe("combinationsRange", () => {
    it("C(4,2)=6", () => {
      const c = combinationsRange(4, 2);
      expect(c).toHaveLength(6);
      expect(c.some((x) => x[0] === 1 && x[1] === 2)).toBe(true);
    });
  });

  describe("binomialCoefficient", () => {
    it("nilai klasik", () => {
      expect(binomialCoefficient(5, 2)).toBe(10);
      expect(binomialCoefficient(5, 0)).toBe(1);
      expect(binomialCoefficient(5, 5)).toBe(1);
    });
  });

  describe("permuteWithDup", () => {
    it("duplikat", () => {
      const p = permuteWithDup([1, 1, 2]);
      expect(p).toHaveLength(3);
    });
  });
});
