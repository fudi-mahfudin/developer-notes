import { describe, it, expect } from "vitest";
import {
  setIn,
  getIn,
  updateIn,
  removeIn,
  mergeIn,
  applyManyUpdates,
} from "./immutable-nested-update.js";

describe("Topik 100 — immutable nested update", () => {
  it("set/get/update", () => {
    const s1 = setIn({}, ["a", "b"], 1);
    expect(s1).toEqual({ a: { b: 1 } });
    expect(getIn(s1, ["a", "b"])).toBe(1);
    const s2 = updateIn(s1, ["a", "b"], (x) => x + 1, 0);
    expect(s2.a.b).toBe(2);
    expect(s1.a.b).toBe(1);
  });

  it("remove + merge", () => {
    const s1 = { a: { b: 1, c: 2 }, cfg: { x: 1 } };
    expect(removeIn(s1, ["a", "b"])).toEqual({ a: { c: 2 }, cfg: { x: 1 } });
    expect(mergeIn(s1, ["cfg"], { y: 2 })).toEqual({ a: { b: 1, c: 2 }, cfg: { x: 1, y: 2 } });
  });

  it("apply many", () => {
    const out = applyManyUpdates(
      { n: 1 },
      [
        { type: "update", path: ["n"], updater: (x) => x + 1 },
        { type: "set", path: ["a", "b"], value: 3 },
      ],
    );
    expect(out).toEqual({ n: 2, a: { b: 3 } });
  });
});

