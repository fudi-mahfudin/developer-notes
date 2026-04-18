/**
 * Tes Topik 29 — `pnpm test -- coding-practice-v2/29-string-parsing-tokenization/string-parsing-tokenization.test.js`
 */
import { describe, it, expect } from "vitest";
import {
  parseCsvSimple,
  parsePathSegments,
  parseQueryKeyValues,
  splitByDelimiter,
  tokenizeWhitespace,
} from "./string-parsing-tokenization.js";

describe("Topik 29 — tokenization", () => {
  describe("splitByDelimiter", () => {
    it("token kosong di tengah", () => {
      expect(splitByDelimiter("a,b,,c", ",")).toEqual(["a", "b", "", "c"]);
    });
  });

  describe("tokenizeWhitespace", () => {
    it("collapse", () => {
      expect(tokenizeWhitespace("  a   b  c ")).toEqual(["a", "b", "c"]);
    });
  });

  describe("parsePathSegments", () => {
    it("slash ganda", () => {
      expect(parsePathSegments("/a/b//c/")).toEqual(["a", "b", "c"]);
    });
  });

  describe("parseCsvSimple", () => {
    it("tiga kolom", () => {
      expect(parseCsvSimple("name,age,city")).toEqual(["name", "age", "city"]);
    });
  });

  describe("parseQueryKeyValues", () => {
    it("a=1&b=2", () => {
      expect(parseQueryKeyValues("a=1&b=2")).toEqual({ a: "1", b: "2" });
    });
  });
});
