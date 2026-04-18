import { describe, it, expect } from "vitest";
import {
  TreeNode,
  hasPathSum,
  allRootToLeafSums,
  pathSumAnyStart,
  minRootToLeafSum,
} from "./path-sum-tree.js";

describe("Topik 59 — path sum tree", () => {
  it("hasPathSum", () => {
    const root = new TreeNode(
      5,
      new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
      new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1))),
    );
    expect(hasPathSum(root, 22)).toBe(true);
    expect(hasPathSum(root, 100)).toBe(false);
  });

  it("allRootToLeafSums", () => {
    const root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    expect(allRootToLeafSums(root).sort((a, b) => a - b)).toEqual([3, 4]);
  });

  it("pathSumAnyStart", () => {
    const root = new TreeNode(10, new TreeNode(5, new TreeNode(3, new TreeNode(3), new TreeNode(-2))), new TreeNode(-3, null, new TreeNode(11)));
    expect(pathSumAnyStart(root, 8)).toBeGreaterThanOrEqual(1);
  });

  it("minRootToLeafSum", () => {
    const root = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    expect(minRootToLeafSum(root)).toBe(3);
  });
});
