import { describe, it, expect } from "vitest";
import { LRUCache, fromEntries, snapshot, cacheHitRate } from "./lru-cache-map-order.js";

describe("Topik 94 — lru cache", () => {
  it("classic get/put", () => {
    const c = new LRUCache(2);
    c.put(1, 1);
    c.put(2, 2);
    expect(c.get(1)).toBe(1);
    c.put(3, 3);
    expect(c.get(2)).toBe(-1);
    expect(c.keysLeastRecentFirst()).toEqual([1, 3]);
  });

  it("helpers", () => {
    const c = fromEntries(2, [[1, 1], [2, 2], [3, 3]]);
    expect(snapshot(c)).toEqual([[2, 2], [3, 3]]);
    expect(cacheHitRate(c, [2, 9, 3])).toBeCloseTo(2 / 3);
  });
});

