import { describe, it, expect } from "vitest";
import {
  TokenBucketLimiter,
  SlidingWindowLimiter,
  simulateRequests,
  allowAll,
  estimateWaitMs,
} from "./rate-limiter-token-bucket.js";

describe("Topik 95 — rate limiter", () => {
  it("token bucket simulate", () => {
    const out = simulateRequests((nowFn) => new TokenBucketLimiter(2, 1, nowFn), [0, 0, 0]);
    expect(out).toEqual([true, true, false]);
  });

  it("sliding window", () => {
    const out = simulateRequests((nowFn) => new SlidingWindowLimiter(2, 1000, nowFn), [0, 100, 200, 1200]);
    expect(out).toEqual([true, true, false, true]);
  });

  it("allowAll + wait estimate", () => {
    let t = 0;
    const nowFn = () => t;
    const b = new TokenBucketLimiter(1, 2, nowFn);
    const s = new SlidingWindowLimiter(5, 1000, nowFn);
    expect(allowAll([b, s])).toBe(true);
    expect(allowAll([b, s])).toBe(false);
    expect(estimateWaitMs(b, 1)).toBeGreaterThan(0);
  });
});

