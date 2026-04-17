import { describe, it, expect } from "vitest";
import {
  curry,
  partial,
  __,
  partialWithPlaceholder,
  uncurry,
  partialRight,
  isFunction,
  curry2,
  applyCurried,
  arityOf,
} from "./curry-partial-application.js";

describe("Topik 98 — curry partial application", () => {
  const sum3 = (a, b, c) => a + b + c;

  it("curry", () => {
    const c = curry(sum3);
    expect(c(1)(2)(3)).toBe(6);
    expect(c(1, 2)(3)).toBe(6);
  });

  it("partial variants", () => {
    expect(partial(sum3, 1)(2, 3)).toBe(6);
    expect(partialWithPlaceholder(sum3, __, 2, __)(1, 3)).toBe(6);
    expect(partialRight(sum3, 3)(1, 2)).toBe(6);
  });

  it("helpers", () => {
    const c = curry(sum3);
    expect(uncurry(c, 3)(1, 2, 3)).toBe(6);
    expect(isFunction(c)).toBe(true);
    expect(curry2((a, b) => a + b)(1)(2)).toBe(3);
    expect(applyCurried(c, [1, 2, 3])).toBe(6);
    expect(arityOf(sum3)).toBe(3);
  });
});

