/**
 * Tes Topik 26 — `pnpm test -- coding-practice-v2/26-subset-powerset/subset-powerset.test.js`
 */
import { describe, it, expect } from "vitest";
import {
  allSubsetsBacktrack,
  allSubsetsBitmask,
  subsetSumCount,
  subsetSumExists,
} from "./subset-powerset.js";

function normalizeSubsets(subs) {
  return subs
    .map((s) => [...s].sort((a, b) => String(a).localeCompare(String(b))))
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
}

describe("Topik 26 — powerset", () => {
  describe("allSubsetsBacktrack vs bitmask", () => {
    it("multiset subset sama", () => {
      const a = [1, 2, 3];
      const b1 = normalizeSubsets(allSubsetsBacktrack(a));
      const b2 = normalizeSubsets(allSubsetsBitmask(a));
      expect(b1).toEqual(b2);
    });
  });

  describe("subsetSumExists", () => {
    it("ada / tidak", () => {
      expect(subsetSumExists([1, 2, 3], 5)).toBe(true);
      expect(subsetSumExists([1, 2, 3], 10)).toBe(false);
    });
  });

  describe("subsetSumCount", () => {
    it("beberapa subset", () => {
      expect(subsetSumCount([1, 1, 1], 2)).toBe(3);
    });
  });
});
