import { describe, it, expect } from "vitest";
import {
  deepMerge,
  mergeMany,
  deepMergeWithResolver,
  sameJson,
  pickMergeMode,
} from "./deep-merge-objects.js";

describe("Topik 91 — deep merge objects", () => {
  it("basic nested merge", () => {
    const a = { a: { b: 1 }, x: 1 };
    const b = { a: { c: 2 }, y: 3 };
    const out = deepMerge(a, b);
    expect(out).toEqual({ a: { b: 1, c: 2 }, x: 1, y: 3 });
    expect(sameJson(a, { a: { b: 1 }, x: 1 })).toBe(true);
  });

  it("array mode", () => {
    expect(deepMerge({ arr: [1] }, { arr: [2] }).arr).toEqual([2]);
    expect(deepMerge({ arr: [1] }, { arr: [2] }, { modeArray: "concat" }).arr).toEqual([1, 2]);
  });

  it("merge many + resolver", () => {
    expect(mergeMany({}, { a: 1 }, { b: 2 }, { a: 3 })).toEqual({ a: 3, b: 2 });
    const custom = deepMergeWithResolver({ n: 1 }, { n: 2 }, (_k, l, r) => l + r);
    expect(custom.n).toBe(3);
    expect(pickMergeMode("concat")).toBe("concat");
  });
});

