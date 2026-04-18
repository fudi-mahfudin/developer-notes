import { describe, it, expect } from "vitest";
import {
  flattenArrayDepth,
  flattenArrayIterative,
  flattenObjectDot,
  unflattenObjectDot,
  flattenObjectWithArray,
  joinPath,
  getByDotPath,
} from "./flatten-nested-array-object.js";

describe("Topik 92 — flatten nested array/object", () => {
  it("flatten array", () => {
    expect(flattenArrayDepth([1, [2, [3]]], 1)).toEqual([1, 2, [3]]);
    expect(flattenArrayIterative([1, [2, [3]]])).toEqual([1, 2, 3]);
  });

  it("flatten/unflatten object", () => {
    const flat = flattenObjectDot({ a: { b: 1, c: { d: 2 } } });
    expect(flat).toEqual({ "a.b": 1, "a.c.d": 2 });
    expect(unflattenObjectDot(flat)).toEqual({ a: { b: 1, c: { d: 2 } } });
  });

  it("with array + path helpers", () => {
    expect(flattenObjectWithArray({ a: [10, { b: 20 }] })).toEqual({ "a.0": 10, "a.1.b": 20 });
    expect(joinPath("a", "b")).toBe("a.b");
    expect(getByDotPath({ a: { b: 1 } }, "a.b")).toBe(1);
  });
});

