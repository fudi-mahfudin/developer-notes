/**
 * Tes Topik 12 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  chainGenerators,
  fibonacciGenerator,
  flattenDeep,
  generatorToArray,
  rangeGenerator,
  takeGenerator,
} from "./generators-function-star.js";

describe("Topik 12 — generators", () => {
  describe("rangeGenerator", () => {
    it("yield rentang", () => {
      expect([...rangeGenerator(2, 5)]).toEqual([2, 3, 4]);
    });
  });

  describe("fibonacciGenerator", () => {
    it("beberapa suku pertama", () => {
      expect([...fibonacciGenerator(7)]).toEqual([0, 1, 1, 2, 3, 5, 8]);
    });
  });

  describe("flattenDeep", () => {
    it("yield* nested", () => {
      expect([...flattenDeep([1, [2, [3, 4]], 5])]).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe("takeGenerator", () => {
    it("membatasi panjang", () => {
      expect([...takeGenerator(() => rangeGenerator(0, 100), 4)]).toEqual([0, 1, 2, 3]);
    });
  });

  describe("generatorToArray", () => {
    it("materialisasi", () => {
      expect(generatorToArray(fibonacciGenerator(5))).toEqual([0, 1, 1, 2, 3]);
    });
  });

  describe("chainGenerators", () => {
    it("gabung urutan", () => {
      expect([
        ...chainGenerators(
          () => rangeGenerator(0, 2),
          () => rangeGenerator(10, 12),
        ),
      ]).toEqual([0, 1, 10, 11]);
    });
  });
});
