import { describe, it, expect } from "vitest";
import {
  deepEqualLimited,
  compareArraysStrictOrder,
  equalByKeys,
  shallowEqual,
  stableStringify,
} from "./deep-equality-limited.js";

describe("Topik 93 — deep equality limited", () => {
  it("deep equal nested", () => {
    expect(deepEqualLimited({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
    expect(deepEqualLimited({ a: 1 }, { a: 2 })).toBe(false);
  });

  it("array order + key subset", () => {
    expect(compareArraysStrictOrder([1, 2], [1, 2])).toBe(true);
    expect(compareArraysStrictOrder([1, 2], [2, 1])).toBe(false);
    expect(equalByKeys({ a: 1, b: 2 }, { a: 1, b: 3 }, ["a"])).toBe(true);
  });

  it("shallow + stable string", () => {
    expect(shallowEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(stableStringify({ b: 1, a: 2 })).toBe("{\"a\":2,\"b\":1}");
  });
});

