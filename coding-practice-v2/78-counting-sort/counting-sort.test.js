import { describe, it, expect } from "vitest";
import { countingSort, countingSortUnstable, sameMultisetSorted } from "./counting-sort.js";

describe("Topik 78 — counting sort", () => {
  it("terurut dan multiset", () => {
    const a = [3, 0, 2, 2, 5, 1];
    const s = countingSort(a);
    expect(s).toEqual([0, 1, 2, 2, 3, 5]);
    expect(sameMultisetSorted(a, s)).toBe(true);
  });

  it("unstable vs stable hasil multiset", () => {
    const a = [2, 0, 2, 1];
    expect(sameMultisetSorted(countingSortUnstable(a), countingSort(a))).toBe(true);
  });
});
