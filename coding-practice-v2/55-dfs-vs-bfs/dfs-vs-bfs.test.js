import { describe, it, expect } from "vitest";
import {
  buildUndirectedAdj,
  dfsPreorder,
  bfsOrder,
  hasPathBfs,
  hasPathDfs,
  countComponents,
  undirectedEdgeCount,
} from "./dfs-vs-bfs.js";

describe("Topik 55 — DFS vs BFS", () => {
  it("DFS preorder baris", () => {
    const adj = buildUndirectedAdj(3, [
      [0, 1],
      [1, 2],
    ]);
    expect(dfsPreorder(adj, 0)).toEqual([0, 1, 2]);
  });

  it("BFS star", () => {
    const adj = buildUndirectedAdj(4, [
      [0, 1],
      [0, 2],
      [0, 3],
    ]);
    expect(bfsOrder(adj, 0)).toEqual([0, 1, 2, 3]);
  });

  it("hasPathBfs", () => {
    const adj = buildUndirectedAdj(4, [
      [0, 1],
      [2, 3],
    ]);
    expect(hasPathBfs(adj, 0, 1)).toBe(true);
    expect(hasPathBfs(adj, 0, 3)).toBe(false);
  });

  it("hasPathDfs konsisten dengan BFS", () => {
    const adj = buildUndirectedAdj(5, [
      [0, 1],
      [1, 2],
      [3, 4],
    ]);
    expect(hasPathDfs(adj, 0, 2)).toBe(hasPathBfs(adj, 0, 2));
    expect(hasPathDfs(adj, 0, 4)).toBe(hasPathBfs(adj, 0, 4));
  });

  it("undirectedEdgeCount", () => {
    expect(undirectedEdgeCount([])).toBe(0);
    expect(undirectedEdgeCount([[0, 1]])).toBe(1);
  });

  it("countComponents", () => {
    const adj = buildUndirectedAdj(4, [
      [0, 1],
      [2, 3],
    ]);
    expect(countComponents(adj)).toBe(2);
  });
});
