/**
 * Tes Topik 46 — `pnpm test -- coding-practice-v2/46-bfs-tree-level-order/bfs-tree-level-order.test.js`
 */
import { describe, it, expect } from "vitest";
import { TreeNode, levelOrder, treeHeight } from "./bfs-tree-level-order.js";

describe("Topik 46 — BFS tree", () => {
  it("levelOrder", () => {
    const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    expect(levelOrder(root)).toEqual([[3], [9, 20], [15, 7]]);
  });

  it("treeHeight", () => {
    const root = new TreeNode(1, new TreeNode(2), null);
    expect(treeHeight(root)).toBe(1);
  });
});
