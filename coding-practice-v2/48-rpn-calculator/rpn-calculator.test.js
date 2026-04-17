/**
 * Tes Topik 48 — `pnpm test -- coding-practice-v2/48-rpn-calculator/rpn-calculator.test.js`
 */
import { describe, it, expect } from "vitest";
import { evalRpn } from "./rpn-calculator.js";

describe("Topik 48 — RPN", () => {
  it("contoh", () => {
    expect(evalRpn(["2", "1", "+", "3", "*"])).toBe(9);
    expect(evalRpn(["4", "13", "5", "/", "+"])).toBe(6);
  });
});
