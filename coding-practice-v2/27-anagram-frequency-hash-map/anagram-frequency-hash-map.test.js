/**
 * Tes Topik 27 — `pnpm test -- coding-practice-v2/27-anagram-frequency-hash-map/anagram-frequency-hash-map.test.js`
 */
import { describe, it, expect } from "vitest";
import {
  buildFrequencyMap,
  canSubtractFrequency,
  charFrequencySignature,
  groupAnagrams,
  isAnagramPair,
} from "./anagram-frequency-hash-map.js";

describe("Topik 27 — anagram / frequency", () => {
  describe("buildFrequencyMap", () => {
    it("menghitung", () => {
      const m = buildFrequencyMap("aabb");
      expect(m.get("a")).toBe(2);
      expect(m.get("b")).toBe(2);
    });
  });

  describe("charFrequencySignature", () => {
    it("listen / silent", () => {
      expect(charFrequencySignature("listen")).toBe(charFrequencySignature("silent"));
    });
  });

  describe("isAnagramPair", () => {
    it("true / false", () => {
      expect(isAnagramPair("anagram", "nagaram")).toBe(true);
      expect(isAnagramPair("rat", "car")).toBe(false);
    });
  });

  describe("groupAnagrams", () => {
    it("grup", () => {
      const g = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
      expect(g.some((gr) => gr.length === 3 && gr.includes("eat"))).toBe(true);
    });
  });

  describe("canSubtractFrequency", () => {
    it("subset multiset", () => {
      expect(canSubtractFrequency("aabc", "ab")).toBe(true);
      expect(canSubtractFrequency("a", "aa")).toBe(false);
    });
  });
});
