/**
 * Tes Topik 20 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  binarySearchIndex,
  closestValueSorted,
  countOccurrencesSorted,
  findMinRotatedSorted,
  lowerBound,
  searchInsert,
  upperBound,
} from "./binary-search-sorted-array.js";

describe("Topik 20 — binary search", () => {
  const arr = [1, 2, 2, 2, 3, 5];

  describe("lowerBound / upperBound", () => {
    it("lower bound untuk 2", () => {
      expect(lowerBound(arr, 2)).toBe(1);
    });

    it("upper bound untuk 2", () => {
      expect(upperBound(arr, 2)).toBe(4);
    });
  });

  describe("binarySearchIndex", () => {
    it("ketemu", () => {
      expect(binarySearchIndex(arr, 3)).toBe(4);
    });

    it("tidak ketemu", () => {
      expect(binarySearchIndex(arr, 4)).toBe(-1);
    });
  });

  describe("searchInsert", () => {
    it("posisi sisip", () => {
      expect(searchInsert([1, 3, 5], 4)).toBe(2);
    });
  });

  describe("countOccurrencesSorted", () => {
    it("duplikat", () => {
      expect(countOccurrencesSorted(arr, 2)).toBe(3);
    });
  });

  describe("closestValueSorted", () => {
    it("antara dua", () => {
      expect(closestValueSorted([1, 3, 5], 4)).toBe(3);
    });
  });

  describe("findMinRotatedSorted", () => {
    it("rotasi", () => {
      expect(findMinRotatedSorted([3, 4, 5, 1, 2])).toBe(1);
    });
  });
});
