/**
 * Tes Topik 40 — `pnpm test -- coding-practice-v2/40-subarray-sum-equals-k/subarray-sum-equals-k.test.js`
 */
import { describe, it, expect } from "vitest";
import { subarraySumEqualsK } from "./subarray-sum-equals-k.js";

describe("Topik 40 — subarray sum k", () => {
  it("klasik", () => {
    expect(subarraySumEqualsK([1, 1, 1], 2)).toBe(2);
  });
});
