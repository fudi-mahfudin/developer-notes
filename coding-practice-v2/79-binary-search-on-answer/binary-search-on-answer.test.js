import { describe, it, expect } from "vitest";
import {
  lowerBoundAnswer,
  upperBoundAnswer,
  shippingDaysNeeded,
  minimumCapacityForShipping,
  canPlaceWithDistance,
  maximumMinimumDistance,
} from "./binary-search-on-answer.js";

describe("Topik 79 — binary search on answer", () => {
  it("lower/upper bound utility", () => {
    expect(lowerBoundAnswer(1, 10, (x) => x >= 7)).toBe(7);
    expect(upperBoundAnswer(1, 10, (x) => x <= 7)).toBe(7);
  });

  it("shipping helper + minimum capacity", () => {
    expect(shippingDaysNeeded([3, 2, 2, 4, 1, 4], 6)).toBe(3);
    expect(minimumCapacityForShipping([1, 2, 3, 1, 1], 4)).toBe(3);
  });

  it("maximize minimum distance", () => {
    expect(canPlaceWithDistance([1, 2, 4, 8, 9], 3, 3)).toBe(true);
    expect(maximumMinimumDistance([1, 2, 4, 8, 9], 3)).toBe(3);
  });
});

