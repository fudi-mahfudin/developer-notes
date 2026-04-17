/**
 * Tes Topik 33 — `pnpm test -- coding-practice-v2/33-matrix-traversal-spiral/matrix-traversal-spiral.test.js`
 */
import { describe, it, expect } from "vitest";
import { assertRectangularNumberMatrix, generateSpiralFilled, spiralElementCount, spiralOrder } from "./matrix-traversal-spiral.js";

describe("Topik 33 — spiral matrix", () => {
  it("3x3 klasik", () => {
    const m = [
      [1, 2, 3],
      [8, 9, 4],
      [7, 6, 5],
    ];
    expect(spiralOrder(m)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("jumlah elemen", () => {
    expect(spiralElementCount(3, 4)).toBe(12);
  });

  it("generateSpiralFilled konsisten dengan spiralOrder", () => {
    const g = generateSpiralFilled(3, 3);
    assertRectangularNumberMatrix(g);
    expect(spiralOrder(g)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
