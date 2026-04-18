import { describe, it, expect } from "vitest";
import {
  coinChangeMin,
  coinChangeWays,
  coinChangeOrderings,
  coinChangeMinVsGreedyNote,
} from "./coin-change.js";

describe("Topik 73 — coin change", () => {
  it("minimum coins", () => {
    expect(coinChangeMin([1, 2, 5], 11)).toBe(3);
    expect(coinChangeMin([2], 3)).toBe(-1);
    expect(coinChangeMin([1], 0)).toBe(0);
  });

  it("ways (kombinasi unik urutan tidak penting)", () => {
    expect(coinChangeWays([1, 2, 5], 5)).toBe(4);
  });

  it("orderings (urutan penting)", () => {
    expect(coinChangeOrderings([1, 2], 3)).toBe(3);
  });

  it("note helper", () => {
    expect(coinChangeMinVsGreedyNote([1, 3, 4], 6)).toBe(2);
  });
});
