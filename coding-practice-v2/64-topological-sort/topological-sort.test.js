import { describe, it, expect } from "vitest";
import {
  topologicalSortKahn,
  topologicalSortDFS,
  hasCycleDirected,
} from "./topological-sort.js";

describe("Topik 64 — topological sort", () => {
  it("DAG linear", () => {
    const n = 3;
    const edges = [
      [0, 1],
      [1, 2],
    ];
    const o = topologicalSortKahn(n, edges);
    expect(o.length).toBe(3);
    expect(o.indexOf(0)).toBeLessThan(o.indexOf(1));
    expect(o.indexOf(1)).toBeLessThan(o.indexOf(2));
  });

  it("siklus → []", () => {
    expect(
      topologicalSortKahn(2, [
        [0, 1],
        [1, 0],
      ]),
    ).toEqual([]);
  });

  it("DFS topo konsisten dengan tidak ada siklus", () => {
    const n = 4;
    const edges = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
    ];
    const a = topologicalSortKahn(n, edges);
    const b = topologicalSortDFS(n, edges);
    expect(a.length).toBe(n);
    expect(b.length).toBe(n);
  });

  it("hasCycleDirected", () => {
    expect(hasCycleDirected(2, [[0, 1]])).toBe(false);
    expect(hasCycleDirected(2, [[0, 1], [1, 0]])).toBe(true);
  });
});
