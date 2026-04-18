/**
 * Tes Topik 36 — `pnpm test -- coding-practice-v2/36-counting-map-object/counting-map-object.test.js`
 */
import { describe, it, expect } from "vitest";
import { countBy, countChars, totalsFromCounts } from "./counting-map-object.js";

describe("Topik 36 — counting Map", () => {
  it("countBy", () => {
    const m = countBy(["a", "b", "a"]);
    expect(m.get("a")).toBe(2);
    expect(m.get("b")).toBe(1);
  });

  it("countChars", () => {
    expect(countChars("aba").get("a")).toBe(2);
  });

  it("totalsFromCounts", () => {
    const m = new Map([
      ["a", 2],
      ["b", 3],
    ]);
    expect(totalsFromCounts(m)).toBe(5);
  });
});
