/**
 * Tes Topik 8 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import { mapRowToUserDto, pickKeys, swapImmutable } from "./destructuring-array-object.js";

describe("Topik 8 — destructuring", () => {
  describe("swapImmutable", () => {
    it("menukar indeks tanpa mutasi input", () => {
      const a = [1, 2, 3];
      expect(swapImmutable(a, 0, 2)).toEqual([3, 2, 1]);
      expect(a).toEqual([1, 2, 3]);
    });
  });

  describe("pickKeys", () => {
    it("hanya key yang ada", () => {
      expect(pickKeys({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });
  });

  describe("mapRowToUserDto", () => {
    it("rename id → userId", () => {
      expect(mapRowToUserDto({ id: 9, name: "Ada" })).toEqual({ userId: 9, name: "Ada" });
    });
  });
});
