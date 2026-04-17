import { describe, it, expect } from "vitest";
import { exist, countWordsPresent, filterWordsPresent, isRectangularGrid } from "./word-search-grid.js";

describe("Topik 70 — word search", () => {
  const board = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ];

  it("exist", () => {
    expect(exist(board, "ABCCED")).toBe(true);
    expect(exist(board, "SEE")).toBe(true);
    expect(exist(board, "ABCB")).toBe(false);
  });

  it("countWordsPresent dan filter", () => {
    const words = ["SEE", "XYZ", "ADEE"];
    expect(countWordsPresent(board, words)).toBeGreaterThanOrEqual(1);
    expect(filterWordsPresent(board, ["SEE"])).toEqual(["SEE"]);
  });

  it("isRectangularGrid", () => {
    expect(isRectangularGrid(board)).toBe(true);
    expect(isRectangularGrid([])).toBe(false);
  });
});
