/**
 * Tes Topik 18 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  buildPrefixSum,
  buildPrefixSum2D,
  rangeSum2D,
  rangeSumFromPrefix,
  rollingAveragesFromPrefix,
  subarraySumEqualsK,
} from "./prefix-sum.js";

describe("Topik 18 — prefix sum", () => {
  describe("buildPrefixSum + rangeSumFromPrefix", () => {
    it("query rentang", () => {
      const arr = [2, 4, -1, 3];
      const ps = buildPrefixSum(arr);
      expect(rangeSumFromPrefix(ps, 1, 3)).toBe(6);
    });
  });

  describe("subarraySumEqualsK", () => {
    it("contoh klasik", () => {
      expect(subarraySumEqualsK([1, 1, 1], 2)).toBe(2);
    });
  });

  describe("buildPrefixSum2D + rangeSum2D", () => {
    it("submatrix", () => {
      const m = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      const ps = buildPrefixSum2D(m);
      expect(rangeSum2D(ps, 0, 0, 1, 2)).toBe(21);
      expect(rangeSum2D(ps, 0, 1, 1, 2)).toBe(16);
    });
  });

  describe("rollingAveragesFromPrefix", () => {
    it("rata-rata bergeser", () => {
      expect(rollingAveragesFromPrefix([1, 2, 3, 4], 2)).toEqual([1.5, 2.5, 3.5]);
    });
  });
});
