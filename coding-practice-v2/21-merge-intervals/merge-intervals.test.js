/**
 * Tes Topik 21 — dari root repo Career:
 * `pnpm test -- coding-practice-v2/21-merge-intervals/merge-intervals.test.js`
 */
import { describe, it, expect } from "vitest";
import { insertInterval, intervalsOverlap, mergeIntervals } from "./merge-intervals.js";

describe("Topik 21 — merge intervals", () => {
  describe("mergeIntervals", () => {
    it("merge contoh klasik", () => {
      expect(
        mergeIntervals([
          [1, 3],
          [2, 6],
          [8, 10],
          [15, 18],
        ]),
      ).toEqual([
        [1, 6],
        [8, 10],
        [15, 18],
      ]);
    });

    it("kosong", () => {
      expect(mergeIntervals([])).toEqual([]);
    });

    it("satu interval", () => {
      expect(mergeIntervals([[4, 7]])).toEqual([[4, 7]]);
    });

    it("nested swallow", () => {
      expect(
        mergeIntervals([
          [1, 4],
          [0, 4],
        ]),
      ).toEqual([[0, 4]]);
    });
  });

  describe("intervalsOverlap", () => {
    it("touching di ujung", () => {
      expect(intervalsOverlap([1, 5], [5, 8])).toBe(true);
    });

    it("disjoint", () => {
      expect(intervalsOverlap([1, 4], [5, 6])).toBe(false);
    });
  });

  describe("insertInterval", () => {
    it("merge setelah insert", () => {
      expect(insertInterval([[1, 2], [5, 8]], [2, 5])).toEqual([[1, 8]]);
    });
  });
});
