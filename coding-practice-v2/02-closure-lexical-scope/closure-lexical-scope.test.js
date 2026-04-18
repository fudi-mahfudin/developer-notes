/**
 * Tes Topik 2 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  createCounter,
  lexicalShadowingInnerWins,
  twoIndependentCounters,
} from "./closure-lexical-scope.js";

describe("Topik 2 — closure / lexical scope", () => {
  describe("createCounter", () => {
    it("increment/decrement/get/reset dengan state privat", () => {
      const c = createCounter(10);
      expect(c.get()).toBe(10);
      expect(c.increment(3)).toBe(13);
      expect(c.decrement(5)).toBe(8);
      expect(c.reset(0)).toBe(0);
      expect(c.get()).toBe(0);
    });

    it("menolak initial bukan bilangan bulat", () => {
      expect(() => createCounter(1.2)).toThrow(RangeError);
    });

    it("menolak delta bukan bilangan bulat", () => {
      const c = createCounter(0);
      expect(() => c.increment(1.5)).toThrow(RangeError);
    });
  });

  describe("lexicalShadowingInnerWins", () => {
    it("mengembalikan inner karena shadowing", () => {
      expect(lexicalShadowingInnerWins()).toBe("inner");
    });
  });

  describe("twoIndependentCounters", () => {
    it("dua instance tidak berbagi state", () => {
      const { a, b } = twoIndependentCounters();
      a.increment(5);
      expect(a.get()).toBe(5);
      expect(b.get()).toBe(0);
    });
  });
});
