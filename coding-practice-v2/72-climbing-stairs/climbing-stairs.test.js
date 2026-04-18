import { describe, it, expect } from "vitest";
import {
  climbStairs,
  minCostClimbingStairs,
  climbStairs3,
  climbStairsExplicit,
} from "./climbing-stairs.js";

describe("Topik 72 — climbing stairs", () => {
  it("climbStairs", () => {
    expect(climbStairs(1)).toBe(1);
    expect(climbStairs(3)).toBe(3);
    expect(climbStairs(5)).toBe(8);
    expect(climbStairsExplicit(10)).toBe(climbStairs(10));
  });

  it("minCostClimbingStairs", () => {
    expect(minCostClimbingStairs([10, 15, 20])).toBe(15);
  });

  it("climbStairs3", () => {
    expect(climbStairs3(1)).toBe(1);
    expect(climbStairs3(4)).toBe(7);
  });
});
