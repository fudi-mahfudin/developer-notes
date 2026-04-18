import { describe, it, expect } from "vitest";
import { permute, permuteUnique, factorial, countPermutationsUnique } from "./backtracking-permutation.js";

describe("Topik 68 — permutation", () => {
  it("permute unik", () => {
    const p = permute([1, 2, 3]);
    expect(p.length).toBe(6);
    expect(factorial(3)).toBe(6);
  });

  it("permuteUnique", () => {
    const u = permuteUnique([1, 1, 2]);
    expect(u.length).toBe(3);
    expect(countPermutationsUnique([1, 1, 2])).toBe(3);
  });
});
