/**
 * Tes Topik 6 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import { Dog, Species } from "../04-prototype-chain-class/prototype-chain-class.js";
import {
  getValueCategory,
  isInstanceOf,
  isPlainObject,
} from "./typeof-instanceof-type-checking.js";

describe("Topik 6 — typeof / instanceof", () => {
  describe("getValueCategory", () => {
    it("membedakan null dan object", () => {
      expect(getValueCategory(null)).toBe("null");
      expect(getValueCategory({})).toBe("object");
    });

    it("array terpisah dari object", () => {
      expect(getValueCategory([])).toBe("array");
    });
  });

  describe("isPlainObject", () => {
    it("objek literal true; array/null false", () => {
      expect(isPlainObject({ a: 1 })).toBe(true);
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject(null)).toBe(false);
    });
  });

  describe("isInstanceOf", () => {
    it("rantai instanceof", () => {
      const d = new Dog("x", "y");
      expect(isInstanceOf(d, Dog)).toBe(true);
      expect(isInstanceOf(d, Species)).toBe(true);
    });

    it("validasi argumen", () => {
      expect(() => isInstanceOf(null, Dog)).toThrow(TypeError);
    });
  });
});
