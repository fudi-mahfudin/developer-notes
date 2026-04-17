import { describe, it, expect } from "vitest";
import { mergeSort, quickSort, isSortedNonDecreasing, merge } from "./merge-sort-quick-sort.js";

describe("Topik 77 — merge & quick sort", () => {
  it("merge helper", () => {
    expect(merge([1, 3], [2, 4])).toEqual([1, 2, 3, 4]);
  });

  it("mergeSort", () => {
    expect(mergeSort([3, 1, 4, 1, 5])).toEqual([1, 1, 3, 4, 5]);
    expect(isSortedNonDecreasing(mergeSort([2, 2, 1]))).toBe(true);
  });

  it("quickSort", () => {
    const a = [9, 3, 7, 1, 0];
    expect(quickSort(a)).toEqual([0, 1, 3, 7, 9]);
    expect(quickSort([])).toEqual([]);
  });
});
