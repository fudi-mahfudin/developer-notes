/**
 * Tes Topik 47 — `pnpm test -- coding-practice-v2/47-deque-sliding-window-max/deque-sliding-window-max.test.js`
 */
import { describe, it, expect } from "vitest";
import { maxSlidingWindow } from "./deque-sliding-window-max.js";

describe("Topik 47 — sliding window max", () => {
  it("klasik", () => {
    expect(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([3, 3, 5, 5, 6, 7]);
  });
});
