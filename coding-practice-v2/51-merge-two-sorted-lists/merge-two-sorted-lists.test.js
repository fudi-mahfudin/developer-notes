/**
 * Tes Topik 51 — `pnpm test -- coding-practice-v2/51-merge-two-sorted-lists/merge-two-sorted-lists.test.js`
 */
import { describe, it, expect } from "vitest";
import {
  arrayToList,
  listToArray,
  mergeTwoLists,
  mergeTwoListsRecursive,
  listsEqual,
  listLength,
} from "./merge-two-sorted-lists.js";

describe("Topik 51 — merge two sorted lists", () => {
  it("merge klasik iteratif", () => {
    const a = arrayToList([1, 2, 4]);
    const b = arrayToList([1, 3, 4]);
    expect(listToArray(mergeTwoLists(a, b))).toEqual([1, 1, 2, 3, 4, 4]);
  });

  it("merge rekursif sama dengan contoh", () => {
    const a = arrayToList([1, 2, 4]);
    const b = arrayToList([1, 3, 4]);
    expect(listToArray(mergeTwoListsRecursive(a, b))).toEqual([1, 1, 2, 3, 4, 4]);
  });

  it("salah satu null", () => {
    expect(listToArray(mergeTwoLists(null, arrayToList([1])))).toEqual([1]);
  });

  it("listsEqual", () => {
    expect(listsEqual(arrayToList([1, 2]), arrayToList([1, 2]))).toBe(true);
    expect(listsEqual(arrayToList([1]), arrayToList([2]))).toBe(false);
  });

  it("listLength", () => {
    expect(listLength(null)).toBe(0);
    expect(listLength(arrayToList([1, 2, 3]))).toBe(3);
  });
});
