/**
 * Tes Topik 28 — `pnpm test -- coding-practice-v2/28-string-matching-basics/string-matching-basics.test.js`
 */
import { describe, it, expect } from "vitest";
import {
  computeLPS,
  containsPattern,
  findAllOccurrencesBrute,
  kmpSearch,
} from "./string-matching-basics.js";

describe("Topik 28 — string matching", () => {
  describe("findAllOccurrencesBrute", () => {
    it("overlap", () => {
      expect(findAllOccurrencesBrute("ababa", "aba")).toEqual([0, 2]);
    });
  });

  describe("computeLPS", () => {
    it("non-kosong", () => {
      const l = computeLPS("ababac");
      expect(l.length).toBe("ababac".length);
      expect(l[0]).toBe(0);
    });
  });

  describe("kmpSearch vs brute", () => {
    it("hasil sama untuk beberapa teks", () => {
      const samples = [
        ["ababa", "aba"],
        ["aaaaa", "aa"],
        ["abc", "d"],
      ];
      for (const [t, p] of samples) {
        expect(kmpSearch(t, p)).toEqual(findAllOccurrencesBrute(t, p));
      }
    });
  });

  describe("containsPattern", () => {
    it("hello", () => {
      expect(containsPattern("hello", "ll")).toBe(true);
    });
  });
});
