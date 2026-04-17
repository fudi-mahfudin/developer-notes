/**
 * Tes Topik 42 — `pnpm test -- coding-practice-v2/42-map-collision-concept/map-collision-concept.test.js`
 */
import { describe, it, expect } from "vitest";
import { SimpleHashMap, collisionBucketCount, hashString } from "./map-collision-concept.js";

describe("Topik 42 — hash map collision", () => {
  it("hash deterministik", () => {
    expect(hashString("a")).toBe(hashString("a"));
  });

  it("SimpleHashMap", () => {
    const m = new SimpleHashMap(4);
    m.set("a", 1);
    m.set("b", 2);
    expect(m.get("a")).toBe(1);
    expect(m.has("b")).toBe(true);
    m.set("a", 3);
    expect(m.get("a")).toBe(3);
  });

  it("collisionBucketCount", () => {
    const m = new SimpleHashMap(2);
    m.set("x", 1);
    m.set("y", 2);
    m.set("z", 3);
    expect(collisionBucketCount(m)).toBeGreaterThanOrEqual(0);
  });
});
