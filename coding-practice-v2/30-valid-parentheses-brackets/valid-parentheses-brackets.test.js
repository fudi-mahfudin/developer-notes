/**
 * Tes Topik 30 — `pnpm test -- coding-practice-v2/30-valid-parentheses-brackets/valid-parentheses-brackets.test.js`
 */
import { describe, it, expect } from "vitest";
import {
  isValidBrackets,
  longestValidParenthesesLength,
  minParenthesesToAdd,
} from "./valid-parentheses-brackets.js";

describe("Topik 30 — brackets", () => {
  describe("isValidBrackets", () => {
    it("valid / invalid", () => {
      expect(isValidBrackets("")).toBe(true);
      expect(isValidBrackets("{[]}")).toBe(true);
      expect(isValidBrackets("([)]")).toBe(false);
    });
  });

  describe("minParenthesesToAdd", () => {
    it(")(", () => {
      expect(minParenthesesToAdd(")(")).toBe(2);
    });
  });

  describe("longestValidParenthesesLength", () => {
    it("contoh", () => {
      expect(longestValidParenthesesLength(")()())")).toBe(4);
    });
  });
});
