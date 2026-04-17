/**
 * Tes Topik 38 — `pnpm test -- coding-practice-v2/38-first-unique-character/first-unique-character.test.js`
 */
import { describe, it, expect } from "vitest";
import { firstUniqChar, firstUniqCharIndex } from "./first-unique-character.js";

describe("Topik 38 — first unique", () => {
  it("indeks", () => {
    expect(firstUniqCharIndex("leetcode")).toBe(0);
    expect(firstUniqCharIndex("loveleetcode")).toBe(2);
  });

  it("karakter", () => {
    expect(firstUniqChar("leetcode")).toBe("l");
    expect(firstUniqChar("aabb")).toBeNull();
  });
});
