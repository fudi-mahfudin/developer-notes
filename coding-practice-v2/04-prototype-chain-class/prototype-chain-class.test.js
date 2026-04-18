/**
 * Tes Topik 4 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import { Dog, Species, getConstructorChainLabels } from "./prototype-chain-class.js";

describe("Topik 4 — prototype / class", () => {
  describe("Dog extends Species", () => {
    it("instanceof dan describe", () => {
      const d = new Dog("Rex", "lab");
      expect(d).toBeInstanceOf(Dog);
      expect(d).toBeInstanceOf(Species);
      expect(d.describe()).toBe("Rex is a lab");
    });

    it("validasi nama/breed", () => {
      expect(() => new Dog("", "x")).toThrow(RangeError);
      expect(() => new Dog("a", "")).toThrow(RangeError);
    });
  });

  describe("prototype chain", () => {
    it("Object.getPrototypeOf mengarah ke Dog.prototype", () => {
      const d = new Dog("a", "b");
      expect(Object.getPrototypeOf(d)).toBe(Dog.prototype);
    });
  });

  describe("getConstructorChainLabels", () => {
    it("naik dari prototype instance Dog ke atas", () => {
      const d = new Dog("a", "b");
      expect(getConstructorChainLabels(d)).toEqual(["Dog", "Species", "Object"]);
    });

    it("menolak non-object", () => {
      expect(() => getConstructorChainLabels(null)).toThrow(TypeError);
    });
  });
});
