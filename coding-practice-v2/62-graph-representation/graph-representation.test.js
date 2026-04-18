import { describe, it, expect } from "vitest";
import {
  buildUndirectedAdj,
  buildDirectedAdj,
  buildUndirectedMatrix,
  undirectedEdgeListFromAdj,
  degree,
  inOutDegree,
  hasEdgeUndirectedAdj,
  countUndirectedEdges,
} from "./graph-representation.js";

describe("Topik 62 — graph representation", () => {
  it("undirected adj dan edge list round-trip", () => {
    const adj = buildUndirectedAdj(4, [
      [0, 1],
      [1, 2],
      [2, 3],
    ]);
    expect(undirectedEdgeListFromAdj(adj)).toEqual([
      [0, 1],
      [1, 2],
      [2, 3],
    ]);
    expect(countUndirectedEdges(adj)).toBe(3);
  });

  it("directed in/out degree", () => {
    const adj = buildDirectedAdj(3, [
      [0, 1],
      [0, 2],
    ]);
    const d = inOutDegree(adj);
    expect(d.out[0]).toBe(2);
    expect(d.in[1]).toBe(1);
    expect(d.in[2]).toBe(1);
  });

  it("matrix dan hasEdge", () => {
    const m = buildUndirectedMatrix(3, [
      [0, 1],
      [1, 2],
    ]);
    expect(m[0][1]).toBe(1);
    expect(m[1][0]).toBe(1);
    const adj = buildUndirectedAdj(3, [
      [0, 1],
      [1, 2],
    ]);
    expect(hasEdgeUndirectedAdj(adj, 0, 1)).toBe(true);
    expect(hasEdgeUndirectedAdj(adj, 0, 2)).toBe(false);
  });

  it("degree", () => {
    const adj = buildUndirectedAdj(3, [[0, 1]]);
    expect(degree(adj, 0)).toBe(1);
    expect(degree(adj, 2)).toBe(0);
  });
});
