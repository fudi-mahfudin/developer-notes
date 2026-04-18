import { describe, it, expect } from "vitest";
import {
  subsets,
  combinations,
  combinationSum,
  subsetsWithDup,
} from "./backtracking-subset-combination.js";

describe("Topik 67 — subset & combination", () => {
  it("subsets", () => {
    const s = subsets([1, 2]).map((x) => x.join(",")).sort();
    expect(s).toEqual(["", "1", "1,2", "2"]);
  });

  it("combinations C(n,k)", () => {
    const c = combinations(4, 2);
    expect(c.length).toBe(6);
    expect(c).toContainEqual([1, 2]);
  });

  it("combinationSum", () => {
    const r = combinationSum([2, 3, 1], 5);
    expect(r.map((x) => x.slice().sort((a, b) => a - b)).length).toBeGreaterThanOrEqual(1);
    expect(r.some((arr) => arr.reduce((a, b) => a + b, 0) === 5)).toBe(true);
  });

  it("subsetsWithDup", () => {
    const u = subsetsWithDup([1, 2, 2]);
    expect(u.length).toBeLessThan(8);
  });
});
