/**
 * Tes Topik 31 — `pnpm test -- coding-practice-v2/31-run-length-encoding/run-length-encoding.test.js`
 */
import { describe, it, expect } from "vitest";
import {
  assertAsciiLowercase,
  decodeRle,
  encodeRle,
  isWellFormedRle,
  rleCompressionRatio,
  rleRunStats,
} from "./run-length-encoding.js";

describe("Topik 31 — RLE", () => {
  it("encode + decode round-trip", () => {
    const s = "aaabbc";
    expect(decodeRle(encodeRle(s))).toBe(s);
  });

  it("encode panjang run", () => {
    expect(encodeRle("aaaa")).toBe("a4");
  });

  it("ratio < 1 untuk berulang", () => {
    expect(rleCompressionRatio("a".repeat(20))).toBeLessThan(1);
  });

  it("rleRunStats", () => {
    expect(rleRunStats("aaabbc")).toEqual({ runs: 3, maxRun: 3 });
  });

  it("assertAsciiLowercase", () => {
    expect(() => assertAsciiLowercase("A")).toThrow(RangeError);
  });

  it("isWellFormedRle", () => {
    expect(isWellFormedRle("a3b2")).toBe(true);
    expect(isWellFormedRle("3a")).toBe(false);
  });
});
