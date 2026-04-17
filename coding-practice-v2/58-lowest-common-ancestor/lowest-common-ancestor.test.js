import { describe, it, expect } from "vitest";
import {
  TreeNode,
  lowestCommonAncestor,
  lowestCommonAncestorBST,
  findNodeByValue,
} from "./lowest-common-ancestor.js";

describe("Topik 58 — lowest common ancestor", () => {
  it("LCA binary tree", () => {
    const p = new TreeNode(5);
    const q = new TreeNode(1);
    const root = new TreeNode(3, p, q);
    expect(lowestCommonAncestor(root, p, q)).toBe(root);
  });

  it("LCA BST", () => {
    const n2 = new TreeNode(2, new TreeNode(0), new TreeNode(4));
    const n8 = new TreeNode(8, new TreeNode(7), new TreeNode(9));
    const root = new TreeNode(6, n2, n8);
    expect(lowestCommonAncestorBST(root, n2, n8)).toBe(root);
  });

  it("findNodeByValue", () => {
    const p = new TreeNode(5);
    const q = new TreeNode(1);
    const root = new TreeNode(3, p, q);
    expect(findNodeByValue(root, 5)).toBe(p);
    expect(findNodeByValue(root, 99)).toBeNull();
  });
});
