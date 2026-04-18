/**
 * Tes Topik 5 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  isEmptyForValidation,
  looseEqual,
  sameValueZeroStyle,
  strictEqual,
} from "./coercion-equality-truthy-falsy.js";

describe("Topik 5 — coercion / equality / truthy", () => {
  describe("strictEqual", () => {
    it("tidak meng-coerce", () => {
      expect(strictEqual(0, "0")).toBe(false);
      expect(strictEqual(null, undefined)).toBe(false);
    });
  });

  describe("looseEqual", () => {
    it("meng-coerce sesuai ==", () => {
      expect(looseEqual(0, "0")).toBe(true);
      expect(looseEqual("", 0)).toBe(true);
    });
  });

  describe("isEmptyForValidation", () => {
    it("null/undefined/string kosong/spasi", () => {
      expect(isEmptyForValidation(null)).toBe(true);
      expect(isEmptyForValidation(undefined)).toBe(true);
      expect(isEmptyForValidation("")).toBe(true);
      expect(isEmptyForValidation("   ")).toBe(true);
    });

    it("0 dan false bukan kosong", () => {
      expect(isEmptyForValidation(0)).toBe(false);
      expect(isEmptyForValidation(false)).toBe(false);
    });
  });

  describe("sameValueZeroStyle", () => {
    it("NaN dan -0", () => {
      expect(sameValueZeroStyle(NaN, NaN)).toBe(true);
      expect(sameValueZeroStyle(0, -0)).toBe(false);
    });
  });
});
