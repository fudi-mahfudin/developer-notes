import { describe, it, expect } from "vitest";
import {
  TreeNode,
  preorder,
  inorder,
  postorder,
  levelOrderValues,
  levelOrderGrouped,
  countNodes,
  iterativePreorder,
  maxDepth,
  preorderRecursiveMatchesIterative,
} from "./binary-tree-traversal.js";

describe("Topik 56 — binary tree traversal", () => {
  it("traversal pada 1(2,3)", () => {
    const root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    expect(preorder(root)).toEqual([1, 2, 3]);
    expect(inorder(root)).toEqual([2, 1, 3]);
    expect(postorder(root)).toEqual([2, 3, 1]);
    expect(levelOrderValues(root)).toEqual([1, 2, 3]);
    expect(levelOrderGrouped(root)).toEqual([[1], [2, 3]]);
    expect(countNodes(root)).toBe(3);
  });

  it("iterativePreorder sama dengan preorder", () => {
    const root = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
    expect(iterativePreorder(root)).toEqual(preorder(root));
    expect(preorderRecursiveMatchesIterative(root)).toBe(true);
  });

  it("maxDepth", () => {
    expect(maxDepth(null)).toBe(0);
    const root = new TreeNode(1, new TreeNode(2), null);
    expect(maxDepth(root)).toBe(2);
  });
});
