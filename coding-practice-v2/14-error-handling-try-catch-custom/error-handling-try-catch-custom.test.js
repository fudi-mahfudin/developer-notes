/**
 * Tes Topik 14 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  AppError,
  ValidationError,
  assertHasKey,
  errorToLogMessage,
  isRetryableError,
  parseJsonSafe,
  tryCatchResult,
  wrapAsync,
} from "./error-handling-try-catch-custom.js";

describe("Topik 14 — errors / try-catch", () => {
  describe("parseJsonSafe", () => {
    it("parse valid", () => {
      expect(parseJsonSafe('{"a":1}')).toEqual({ a: 1 });
    });

    it("invalid JSON → ValidationError dengan cause", () => {
      try {
        parseJsonSafe("{");
        expect.fail("should throw");
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
        expect(/** @type {ValidationError} */ (e).cause).toBeInstanceOf(SyntaxError);
      }
    });
  });

  describe("assertHasKey", () => {
    it("key ada", () => {
      expect(() => assertHasKey({ x: 1 }, "x")).not.toThrow();
    });

    it("key hilang", () => {
      expect(() => assertHasKey({}, "x")).toThrow(ValidationError);
    });
  });

  describe("wrapAsync", () => {
    it("melewatkan AppError", async () => {
      const err = new AppError("x", "X");
      await expect(
        wrapAsync(async () => {
          throw err;
        }, "WRAP"),
      ).rejects.toBe(err);
    });

    it("membungkus Error biasa", async () => {
      await expect(
        wrapAsync(async () => {
          throw new Error("boom");
        }, "WRAP"),
      ).rejects.toMatchObject({ code: "WRAP" });
    });
  });

  describe("tryCatchResult", () => {
    it("ok path", () => {
      expect(tryCatchResult(() => 42)).toEqual({ ok: true, value: 42 });
    });

    it("error path", () => {
      const r = tryCatchResult(() => {
        throw new Error("n");
      });
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.error.message).toBe("n");
    });
  });

  describe("errorToLogMessage", () => {
    it("string untuk non-Error", () => {
      expect(errorToLogMessage(123)).toBe("123");
    });
  });

  describe("isRetryableError", () => {
    it("ValidationError false", () => {
      expect(isRetryableError(new ValidationError("f", "x"))).toBe(false);
    });
  });
});
