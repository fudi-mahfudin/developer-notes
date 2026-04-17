import { describe, it, expect } from "vitest";
import {
  numIslands,
  maxAreaOfIsland,
  countComponentsUndirected,
  buildUndirectedAdjSimple,
} from "./connected-components-islands.js";

describe("Topik 65 — islands & components", () => {
  it("numIslands", () => {
    const g = [
      ["1", "1", "0"],
      ["1", "0", "0"],
      ["0", "0", "1"],
    ];
    expect(numIslands(g)).toBe(2);
  });

  it("maxAreaOfIsland", () => {
    const g = [
      ["1", "1"],
      ["1", "0"],
    ];
    expect(maxAreaOfIsland(g)).toBe(3);
  });

  it("countComponentsUndirected", () => {
    const adj = buildUndirectedAdjSimple(4, [
      [0, 1],
      [2, 3],
    ]);
    expect(countComponentsUndirected(adj)).toBe(2);
  });
});
