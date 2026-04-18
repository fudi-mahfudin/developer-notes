/**
 * Tes Topik 35 — `pnpm test -- coding-practice-v2/35-top-k-heap-quickselect/top-k-heap-quickselect.test.js`
 */
import { describe, it, expect } from "vitest";
import { quickSelectKth, topKSmallest } from "./top-k-heap-quickselect.js";

describe("Topik 35 — top K / quickselect", () => {
  it("quickSelectKth", () => {
    expect(quickSelectKth([3, 2, 1, 5, 6, 4], 2)).toBe(2);
  });

  it("topKSmallest", () => {
    expect(topKSmallest([4, 1, 3, 2], 2)).toEqual([1, 2]);
  });
});
