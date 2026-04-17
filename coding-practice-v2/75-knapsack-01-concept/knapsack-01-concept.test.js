import { describe, it, expect } from "vitest";
import {
  knapsack01,
  knapsack01SpaceOptimized,
  canPartitionEqualSum,
  subsetSumExists,
} from "./knapsack-01-concept.js";

describe("Topik 75 — knapsack 0/1", () => {
  it("max value", () => {
    expect(knapsack01([1, 2, 3], [6, 10, 12], 5)).toBe(22);
    expect(knapsack01SpaceOptimized([1, 2, 3], [6, 10, 12], 5)).toBe(22);
  });

  it("partition & subset sum", () => {
    expect(canPartitionEqualSum([1, 5, 11, 5])).toBe(true);
    expect(subsetSumExists([1, 2, 3, 4], 6)).toBe(true);
    expect(subsetSumExists([2], 3)).toBe(false);
  });
});
