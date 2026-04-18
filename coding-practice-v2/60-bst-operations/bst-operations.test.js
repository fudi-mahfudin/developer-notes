import { describe, it, expect } from "vitest";
import {
  buildBSTFromKeys,
  search,
  deleteNode,
  inorderValues,
  contains,
  treeSize,
  minValue,
  maxValue,
  isInorderSorted,
} from "./bst-operations.js";

describe("Topik 60 — BST operations", () => {
  it("insert + inorder sorted", () => {
    const root = buildBSTFromKeys([3, 1, 4]);
    expect(inorderValues(root)).toEqual([1, 3, 4]);
  });

  it("search", () => {
    const root = buildBSTFromKeys([5, 3, 7]);
    expect(search(root, 3)?.val).toBe(3);
    expect(search(root, 99)).toBeNull();
  });

  it("delete", () => {
    let root = buildBSTFromKeys([5, 3, 7, 2, 4, 8]);
    root = deleteNode(root, 3);
    expect(inorderValues(root)).toEqual([2, 4, 5, 7, 8]);
  });

  it("contains, treeSize, min/max, isInorderSorted", () => {
    const root = buildBSTFromKeys([5, 3, 7]);
    expect(contains(root, 3)).toBe(true);
    expect(contains(root, 99)).toBe(false);
    expect(treeSize(root)).toBe(3);
    expect(minValue(root)).toBe(3);
    expect(maxValue(root)).toBe(7);
    expect(isInorderSorted(root)).toBe(true);
  });
});
