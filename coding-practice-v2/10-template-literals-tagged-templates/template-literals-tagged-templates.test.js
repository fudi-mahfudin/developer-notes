/**
 * Tes Topik 10 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  joinTagged,
  parseTaggedStructure,
  sql,
} from "./template-literals-tagged-templates.js";

describe("Topik 10 — template literals / tagged", () => {
  describe("joinTagged", () => {
    it("setara interpolasi", () => {
      const n = 2;
      expect(joinTagged`a ${n} b`).toBe(`a ${n} b`);
    });
  });

  describe("parseTaggedStructure", () => {
    it("memecah parts dan values", () => {
      const x = parseTaggedStructure`hello ${1} world ${2}`;
      expect(x.parts).toEqual(["hello ", " world ", ""]);
      expect(x.values).toEqual([1, 2]);
    });
  });

  describe("sql", () => {
    it("escape string dan angka", () => {
      expect(sql`SELECT * FROM t WHERE id = ${1} AND name = ${"O'Brien"}`).toBe(
        "SELECT * FROM t WHERE id = 1 AND name = 'O''Brien'",
      );
    });

    it("menolak tipe lain", () => {
      expect(() => sql`${true}`).toThrow(TypeError);
    });
  });
});
