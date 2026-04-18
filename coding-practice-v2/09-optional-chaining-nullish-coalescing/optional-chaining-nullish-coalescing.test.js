/**
 * Tes Topik 9 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  firstElement,
  getNestedAB,
  resolveLimit,
  resolveLimitWithOr,
} from "./optional-chaining-nullish-coalescing.js";

describe("Topik 9 — ?. dan ??", () => {
  describe("getNestedAB", () => {
    it("aman saat null/undefined di tengah", () => {
      expect(getNestedAB(null)).toBeUndefined();
      expect(getNestedAB({ a: {} })).toBeUndefined();
      expect(getNestedAB({ a: { b: 42 } })).toBe(42);
    });
  });

  describe("resolveLimit vs resolveLimitWithOr", () => {
    it("?? mempertahankan 0", () => {
      expect(resolveLimit({ limit: 0 })).toBe(0);
      expect(resolveLimitWithOr({ limit: 0 })).toBe(10);
    });

    it("default 10 jika undefined", () => {
      expect(resolveLimit({})).toBe(10);
    });
  });

  describe("firstElement", () => {
    it("optional indexing", () => {
      expect(firstElement(undefined)).toBeUndefined();
      expect(firstElement([7, 8])).toBe(7);
    });
  });
});
