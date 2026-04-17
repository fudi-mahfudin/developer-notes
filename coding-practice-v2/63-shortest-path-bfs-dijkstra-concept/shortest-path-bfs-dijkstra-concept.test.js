import { describe, it, expect } from "vitest";
import {
  shortestPathUnweighted,
  dijkstra,
  buildWeightedDirectedAdj,
  buildUndirectedAdjForBfs,
} from "./shortest-path-bfs-dijkstra-concept.js";

describe("Topik 63 — shortest path BFS / Dijkstra", () => {
  it("BFS jarak edge", () => {
    const adj = buildUndirectedAdjForBfs(4, [
      [0, 1],
      [1, 2],
      [2, 3],
    ]);
    const r = shortestPathUnweighted(adj, 0, 3);
    expect(r.dist).toBe(3);
    expect(r.path).toEqual([0, 1, 2, 3]);
  });

  it("BFS tidak terhubung", () => {
    const adj = buildUndirectedAdjForBfs(3, [[0, 1]]);
    const r = shortestPathUnweighted(adj, 0, 2);
    expect(r.dist).toBe(Infinity);
    expect(r.path).toBeNull();
  });

  it("Dijkstra bobot", () => {
    const w = buildWeightedDirectedAdj(3, [
      [0, 1, 4],
      [0, 2, 1],
      [2, 1, 1],
    ]);
    const r = dijkstra(w, 0, 1);
    expect(r.dist).toBe(2);
    expect(r.path).toEqual([0, 2, 1]);
  });
});
