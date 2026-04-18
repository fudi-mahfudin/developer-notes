import { describe, it, expect } from "vitest";
import {
  memoize,
  memoizeAsync,
  memoizeWithTTL,
  memoStats,
  firstArgResolver,
} from "./memoization-wrapper.js";

describe("Topik 97 — memoization wrapper", () => {
  it("memoize sync", () => {
    let calls = 0;
    const fn = memoize((a, b) => {
      calls += 1;
      return a + b;
    });
    expect(fn(1, 2)).toBe(3);
    expect(fn(1, 2)).toBe(3);
    expect(calls).toBe(1);
    expect(memoStats(fn).size).toBe(1);
  });

  it("memoize async dedupe", async () => {
    let calls = 0;
    const fn = memoizeAsync(async (x) => {
      calls += 1;
      return x * 2;
    });
    const [a, b] = await Promise.all([fn(3), fn(3)]);
    expect(a).toBe(6);
    expect(b).toBe(6);
    expect(calls).toBe(1);
  });

  it("memoize ttl + custom resolver", () => {
    let t = 0;
    let calls = 0;
    const fn = memoizeWithTTL((x) => {
      calls += 1;
      return x + 1;
    }, 100, () => t, firstArgResolver);
    expect(fn(1, 99)).toBe(2);
    expect(fn(1, 123)).toBe(2);
    t = 101;
    expect(fn(1, 123)).toBe(2);
    expect(calls).toBe(2);
  });
});

