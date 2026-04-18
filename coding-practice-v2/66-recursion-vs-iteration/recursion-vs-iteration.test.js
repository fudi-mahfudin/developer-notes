import { describe, it, expect } from "vitest";
import {
  fibonacciRec,
  fibonacciIter,
  factorialRec,
  factorialIter,
  sumArrayRec,
  sumArrayIter,
  powerRec,
  powerIter,
  fibPairsMatch,
} from "./recursion-vs-iteration.js";

describe("Topik 66 — recursion vs iteration", () => {
  it("fibonacci", () => {
    for (let n = 0; n <= 15; n++) expect(fibonacciRec(n)).toBe(fibonacciIter(n));
    expect(fibPairsMatch(15)).toBe(true);
    expect(fibonacciIter(10)).toBe(55);
    expect(fibonacciIter(20)).toBe(6765);
  });

  it("factorial", () => {
    expect(factorialRec(0)).toBe(1);
    expect(factorialIter(5)).toBe(120);
    expect(factorialRec(6)).toBe(factorialIter(6));
  });

  it("sum array", () => {
    const a = [1, 2, 3, 4];
    expect(sumArrayRec(a)).toBe(sumArrayIter(a));
  });

  it("power", () => {
    expect(powerRec(2, 10)).toBe(powerIter(2, 10));
    expect(powerRec(5, 0)).toBe(1);
  });
});
