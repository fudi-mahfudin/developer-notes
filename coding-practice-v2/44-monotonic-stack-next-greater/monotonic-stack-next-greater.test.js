/**
 * Tes Topik 44 — `pnpm test -- coding-practice-v2/44-monotonic-stack-next-greater/monotonic-stack-next-greater.test.js`
 */
import { describe, it, expect } from "vitest";
import { nextGreaterElementsRight } from "./monotonic-stack-next-greater.js";

describe("Topik 44 — next greater", () => {
  it("ke kanan", () => {
    expect(nextGreaterElementsRight([2, 1, 2, 4, 3])).toEqual([4, 2, 4, -1, -1]);
  });
});
