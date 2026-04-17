/**
 * Tes Topik 3 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  addWithThisCall,
  arrowGetterLexicalThis,
  boundGetLabel,
  detachedMethodThrowsTypeError,
  productWithThisApply,
} from "./this-binding-call-apply-bind.js";

describe("Topik 3 — this / call / apply / bind", () => {
  describe("addWithThisCall", () => {
    it("memanggil fungsi dengan this dari call", () => {
      expect(addWithThisCall(10, 1, 2)).toBe(13);
    });

    it("menolak non-finite", () => {
      expect(() => addWithThisCall(NaN, 1, 2)).toThrow(RangeError);
    });
  });

  describe("productWithThisApply", () => {
    it("apply dengan array argumen", () => {
      expect(productWithThisApply(2, [2, 3])).toBe(12);
    });

    it("menolak array kosong", () => {
      expect(() => productWithThisApply(1, [])).toThrow(RangeError);
    });
  });

  describe("detachedMethodThrowsTypeError", () => {
    it("method tanpa receiver melempar TypeError di strict mode", () => {
      expect(() => detachedMethodThrowsTypeError()).toThrow(TypeError);
    });
  });

  describe("boundGetLabel", () => {
    it("bind mengembalikan fungsi dengan this stabil", () => {
      const g = boundGetLabel(7);
      expect(g()).toBe(7);
    });
  });

  describe("arrowGetterLexicalThis", () => {
    it("arrow tetap melihat instance meski dipanggil longgar", () => {
      const get = arrowGetterLexicalThis(99);
      expect(get()).toBe(99);
    });
  });
});
