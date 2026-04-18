import { describe, it, expect } from "vitest";
import {
  longestCommonSubsequence,
  longestCommonSubsequenceString,
  lcsLengthSpaceOptimized,
  longestCommonSubstringLength,
} from "./longest-common-subsequence.js";

describe("Topik 74 — LCS", () => {
  it("panjang LCS", () => {
    expect(longestCommonSubsequence("abcde", "ace")).toBe(3);
    expect(longestCommonSubsequence("", "x")).toBe(0);
  });

  it("string LCS dan space optimized", () => {
    expect(longestCommonSubsequenceString("abcde", "ace")).toBe("ace");
    expect(lcsLengthSpaceOptimized("abcba", "abcbc")).toBe(longestCommonSubsequence("abcba", "abcbc"));
  });

  it("longest common substring", () => {
    expect(longestCommonSubstringLength("abcdxyz", "xyzabcd")).toBe(4);
  });
});
