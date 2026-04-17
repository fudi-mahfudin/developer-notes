/**
 * Tes Topik 37 — `pnpm test -- coding-practice-v2/37-deduplication-set/deduplication-set.test.js`
 */
import { describe, it, expect } from "vitest";
import { hasAllUnique, uniqueArray, uniqueCount } from "./deduplication-set.js";

describe("Topik 37 — Set dedup", () => {
  it("uniqueArray stabil", () => {
    expect(uniqueArray([1, 2, 1, 3])).toEqual([1, 2, 3]);
  });

  it("uniqueCount", () => {
    expect(uniqueCount([1, 1, 2])).toBe(2);
  });

  it("hasAllUnique", () => {
    expect(hasAllUnique([1, 2, 3])).toBe(true);
    expect(hasAllUnique([1, 1])).toBe(false);
  });
});
