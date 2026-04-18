import { describe, it, expect } from "vitest";
import {
  arrayToList,
  listToArray,
  removeNthFromEnd,
  nthFromEndValue,
  removeKthFromStart,
  isValidNthFromEnd,
} from "./remove-nth-from-end.js";

describe("Topik 53 — remove nth from end", () => {
  it("contoh klasik", () => {
    const h = arrayToList([1, 2, 3, 4, 5]);
    expect(listToArray(removeNthFromEnd(h, 2))).toEqual([1, 2, 3, 5]);
  });

  it("satu node", () => {
    expect(removeNthFromEnd(arrayToList([1]), 1)).toBeNull();
  });

  it("nthFromEndValue", () => {
    expect(nthFromEndValue(arrayToList([1, 2, 3, 4, 5]), 2)).toBe(4);
  });

  it("removeKthFromStart", () => {
    expect(listToArray(removeKthFromStart(arrayToList([10, 20, 30]), 1))).toEqual([10, 30]);
  });

  it("isValidNthFromEnd", () => {
    const h = arrayToList([1, 2, 3]);
    expect(isValidNthFromEnd(h, 1)).toBe(true);
    expect(isValidNthFromEnd(h, 0)).toBe(false);
  });
});
