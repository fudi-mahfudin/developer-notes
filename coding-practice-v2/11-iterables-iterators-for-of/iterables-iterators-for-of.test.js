/**
 * Tes Topik 11 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  IntegerRange,
  enumerateIterable,
  iteratorToArray,
  sumIterable,
  takeIterable,
  zipIterables,
} from "./iterables-iterators-for-of.js";

describe("Topik 11 — iterables / iterators", () => {
  describe("IntegerRange", () => {
    it("for...of dan spread", () => {
      expect([...new IntegerRange(1, 4)]).toEqual([1, 2, 3]);
    });

    it("rentang kosong", () => {
      expect([...new IntegerRange(0, 0)]).toEqual([]);
    });
  });

  describe("takeIterable", () => {
    it("membatasi panjang", () => {
      expect([...takeIterable(new IntegerRange(0, 100), 3)]).toEqual([0, 1, 2]);
    });
  });

  describe("zipIterables", () => {
    it("zip sampai lebih pendek", () => {
      expect([...zipIterables([1, 2], ["a", "b", "c"])]).toEqual([
        [1, "a"],
        [2, "b"],
      ]);
    });
  });

  describe("sumIterable", () => {
    it("menjumlahkan", () => {
      expect(sumIterable([1, 2, 3])).toBe(6);
    });

    it("menolak non-number", () => {
      expect(() => sumIterable([1, NaN])).toThrow(TypeError);
    });
  });

  describe("iteratorToArray", () => {
    it("materialisasi", () => {
      expect(iteratorToArray(new IntegerRange(2, 5))).toEqual([2, 3, 4]);
    });
  });

  describe("enumerateIterable", () => {
    it("indeks + nilai", () => {
      expect([...enumerateIterable(["x", "y"])]).toEqual([
        [0, "x"],
        [1, "y"],
      ]);
    });
  });
});
