/**
 * Tes Topik 49 — `pnpm test -- coding-practice-v2/49-reverse-linked-list/reverse-linked-list.test.js`
 */
import { describe, it, expect } from "vitest";
import { arrayToList, listToArray, reverseList } from "./reverse-linked-list.js";

describe("Topik 49 — reverse list", () => {
  it("reverse", () => {
    const h = arrayToList([1, 2, 3]);
    expect(listToArray(reverseList(h))).toEqual([3, 2, 1]);
  });
});
