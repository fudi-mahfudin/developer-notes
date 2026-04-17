/**
 * Tes Topik 34 — `pnpm test -- coding-practice-v2/34-2d-prefix-sum/2d-prefix-sum.test.js`
 */
import { describe, it, expect } from "vitest";
import { batchRangeSum2D, buildPrefixSum2D, diffTwoRegions, rangeSum2D, sumEntireMatrixFromPrefix } from "./2d-prefix-sum.js";

describe("Topik 34 — 2D prefix sum", () => {
  it("query submatrix", () => {
    const m = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const ps = buildPrefixSum2D(m);
    expect(rangeSum2D(ps, 0, 0, 1, 2)).toBe(21);
    expect(rangeSum2D(ps, 0, 1, 1, 2)).toBe(16);
  });

  it("sum entire + batch + diff", () => {
    const m = [
      [1, 2],
      [3, 4],
    ];
    const ps = buildPrefixSum2D(m);
    expect(sumEntireMatrixFromPrefix(ps, 2, 2)).toBe(10);
    expect(batchRangeSum2D(ps, [[0, 0, 0, 0]])).toEqual([1]);
    expect(diffTwoRegions(ps, [0, 0, 1, 1], [0, 0, 0, 0])).toBe(9);
  });
});
