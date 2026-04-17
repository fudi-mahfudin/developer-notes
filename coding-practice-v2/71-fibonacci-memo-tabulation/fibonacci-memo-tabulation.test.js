import { describe, it, expect } from "vitest";
import {
  fibonacciMemo,
  fibonacciTab,
  fibonacciIterO1,
  fibonacciCompareAll,
  fibonacciSequenceUpTo,
} from "./fibonacci-memo-tabulation.js";

describe("Topik 71 — Fibonacci memo / tabulation", () => {
  it("nilai dasar dan konsistensi", () => {
    expect(fibonacciMemo(0)).toBe(0);
    expect(fibonacciTab(1)).toBe(1);
    expect(fibonacciIterO1(10)).toBe(55);
    expect(fibonacciCompareAll(30)).toBe(true);
  });

  it("sequence", () => {
    expect(fibonacciSequenceUpTo(5)).toEqual([0, 1, 1, 2, 3, 5]);
  });
});
