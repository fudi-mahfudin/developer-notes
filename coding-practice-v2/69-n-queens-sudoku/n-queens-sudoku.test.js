import { describe, it, expect } from "vitest";
import { nQueensCount, nQueensSolutions, isValidSudokuPartial } from "./n-queens-sudoku.js";

describe("Topik 69 — n-queens & sudoku", () => {
  it("nQueensCount", () => {
    expect(nQueensCount(1)).toBe(1);
    expect(nQueensCount(4)).toBe(2);
    expect(nQueensCount(8)).toBe(92);
  });

  it("nQueensSolutions", () => {
    expect(nQueensSolutions(4).length).toBe(2);
  });

  it("isValidSudokuPartial", () => {
    const empty = Array.from({ length: 9 }, () => Array(9).fill("."));
    expect(isValidSudokuPartial(empty)).toBe(true);
    const bad = empty.map((row) => [...row]);
    bad[0][0] = "1";
    bad[0][1] = "1";
    expect(isValidSudokuPartial(bad)).toBe(false);
  });
});
