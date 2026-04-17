import { describe, it, expect } from "vitest";
import {
  TreeNode,
  isBalanced,
  isBalancedNaive,
  heightEdges,
  minDepthNodes,
  depthSpread,
} from "./height-balanced-tree.js";

describe("Topik 57 — height balanced tree", () => {
  it("seimbang penuh", () => {
    const root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    expect(isBalanced(root)).toBe(true);
    expect(isBalancedNaive(root)).toBe(true);
  });

  it("skew tidak seimbang", () => {
    const root = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
    expect(isBalanced(root)).toBe(false);
  });

  it("heightEdges", () => {
    expect(heightEdges(null)).toBe(-1);
    expect(heightEdges(new TreeNode(1))).toBe(0);
  });

  it("minDepthNodes dan depthSpread", () => {
    expect(minDepthNodes(null)).toBe(0);
    const skew = new TreeNode(1, new TreeNode(2, new TreeNode(3)));
    expect(minDepthNodes(skew)).toBe(3);
    const unbalanced = new TreeNode(1, new TreeNode(2, new TreeNode(4)), new TreeNode(3));
    expect(minDepthNodes(unbalanced)).toBe(2);
    expect(depthSpread(unbalanced)).toBe(1);
  });
});
