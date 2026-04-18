import { describe, it, expect } from "vitest";
import {
  arrayToList,
  listToArray,
  middleNode,
  middleValue,
  findMiddleLeft,
  deleteMiddleLeftMiddle,
} from "./middle-linked-list.js";

describe("Topik 52 — middle linked list", () => {
  it("middleNode ganjil", () => {
    const h = arrayToList([1, 2, 3, 4, 5]);
    expect(middleNode(h)?.val).toBe(3);
  });

  it("middleNode genap (kanan)", () => {
    const h = arrayToList([1, 2, 3, 4]);
    expect(middleNode(h)?.val).toBe(3);
  });

  it("middleValue", () => {
    expect(middleValue(arrayToList([1, 2, 3, 4, 5]))).toBe(3);
  });

  it("findMiddleLeft", () => {
    const h = arrayToList([1, 2, 3, 4]);
    expect(findMiddleLeft(h)?.val).toBe(2);
  });

  it("deleteMiddleLeftMiddle", () => {
    const h = arrayToList([1, 2, 3, 4]);
    expect(listToArray(deleteMiddleLeftMiddle(h))).toEqual([1, 3, 4]);
  });
});
