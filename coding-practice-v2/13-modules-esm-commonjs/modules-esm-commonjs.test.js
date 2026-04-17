/**
 * Tes Topik 13 — dari root repo Career, jalankan `pnpm test`.
 */
import { createRequire } from "module";
import { describe, it, expect } from "vitest";
import {
  API_VERSION,
  MODULE_KIND_ESM,
  barrel,
  createConfig,
  isCompatibleWithCjsApiVersion,
  looksLikeFrozenConfig,
  mergeConfig,
  migrationHintEsMFirst,
  normalizePackageName,
} from "./modules-esm-commonjs.js";

const require = createRequire(import.meta.url);
const cjs = require("./cjs-exports.cjs");

describe("Topik 13 — ESM vs CommonJS", () => {
  describe("createConfig", () => {
    it("membuat config beku", () => {
      const c = createConfig({ env: "test", label: "demo" });
      expect(c.moduleKind).toBe(MODULE_KIND_ESM);
      expect(c.apiVersion).toBe(API_VERSION);
      expect(looksLikeFrozenConfig(c)).toBe(true);
    });

    it("menolak env tidak dikenal", () => {
      expect(() => createConfig({ env: "staging", label: "x" })).toThrow(RangeError);
    });
  });

  describe("mergeConfig", () => {
    it("shallow merge", () => {
      expect(mergeConfig({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });
  });

  describe("normalizePackageName", () => {
    it("trim + lowercase", () => {
      expect(normalizePackageName("  MyPkg  ")).toBe("mypkg");
    });
  });

  describe("CJS interop via createRequire", () => {
    it("API_VERSION konsisten", () => {
      expect(cjs.API_VERSION).toBe(API_VERSION);
      expect(isCompatibleWithCjsApiVersion(cjs.API_VERSION)).toBe(true);
    });

    it("buildGreeting dari CJS", () => {
      expect(cjs.buildGreeting("Ada")).toBe("Hello, Ada");
    });

    it("kind cjs", () => {
      expect(cjs.kind).toBe("cjs");
    });
  });

  describe("barrel", () => {
    it("ekspor fungsi", () => {
      expect(typeof barrel.createConfig).toBe("function");
    });
  });

  describe("migrationHintEsMFirst", () => {
    it("non-kosong", () => {
      expect(migrationHintEsMFirst().length).toBeGreaterThan(20);
    });
  });
});
