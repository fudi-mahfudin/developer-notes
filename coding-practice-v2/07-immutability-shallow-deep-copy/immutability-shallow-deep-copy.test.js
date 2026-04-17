/**
 * Tes Topik 7 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  deepCloneJsonSafe,
  immutableSetNestedName,
  shallowCloneObject,
} from "./immutability-shallow-deep-copy.js";

describe("Topik 7 — immutability / copy", () => {
  describe("shallowCloneObject", () => {
    it("menduplikasi satu level; nested shared", () => {
      const inner = { z: 1 };
      const a = { x: 1, inner };
      const b = shallowCloneObject(a);
      expect(b).not.toBe(a);
      expect(b.inner).toBe(inner);
    });
  });

  describe("deepCloneJsonSafe", () => {
    it("nested independen", () => {
      const a = { a: { b: 1 } };
      const c = deepCloneJsonSafe(a);
      c.a.b = 2;
      expect(a.a.b).toBe(1);
    });
  });

  describe("immutableSetNestedName", () => {
    it("tidak mutasi root", () => {
      const root = { user: { name: "a", id: 1 } };
      const next = immutableSetNestedName(root, "name", "b");
      expect(root.user.name).toBe("a");
      expect(next.user.name).toBe("b");
      expect(next.user.id).toBe(1);
    });
  });
});
