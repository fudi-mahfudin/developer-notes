import { describe, it, expect } from "vitest";
import { minDistance, minDistanceOneRow, indelOnlyDistance, isEditDistanceAtMost } from "./edit-distance.js";

describe("Topik 76 — edit distance", () => {
  it("Levenshtein", () => {
    expect(minDistance("horse", "ros")).toBe(3);
    expect(minDistance("", "abc")).toBe(3);
    expect(minDistanceOneRow("horse", "ros")).toBe(minDistance("horse", "ros"));
  });

  it("indel only", () => {
    expect(indelOnlyDistance("a", "b")).toBe(2);
  });

  it("threshold", () => {
    expect(isEditDistanceAtMost("abc", "abc", 0)).toBe(true);
    expect(isEditDistanceAtMost("a", "b", 1)).toBe(true);
  });
});
