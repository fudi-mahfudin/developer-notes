/**
 * Tes Topik 15 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  pragmaUseStrictRecognized,
  runStrictFunction,
  sloppyLocalVarDeleteReturnsBoolean,
  strictAssignToFrozenObjectThrows,
  strictAssignUndeclaredThrows,
  strictContextObjectIsZeroVsNegZero,
  strictDeleteNonConfigurableThrows,
  strictDuplicateParameterInInnerFunctionThrows,
  strictThisOnPlainCallIsUndefined,
  strictModeIsolationHint,
} from "./strict-mode-gotchas.js";

describe("Topik 15 — strict mode", () => {
  describe("runStrictFunction", () => {
    it("eval dalam strict", () => {
      expect(runStrictFunction("return 1 + 1;")).toBe(2);
    });
  });

  describe("strictDeleteNonConfigurableThrows", () => {
    it("TypeError", () => {
      expect(() => strictDeleteNonConfigurableThrows()).toThrow(TypeError);
    });
  });

  describe("strictThisOnPlainCallIsUndefined", () => {
    it("this undefined", () => {
      expect(strictThisOnPlainCallIsUndefined()).toBeUndefined();
    });
  });

  describe("strictAssignUndeclaredThrows", () => {
    it("ReferenceError", () => {
      expect(() => strictAssignUndeclaredThrows()).toThrow(ReferenceError);
    });
  });

  describe("strictDuplicateParameterInInnerFunctionThrows", () => {
    it("SyntaxError dari Function constructor", () => {
      expect(() => strictDuplicateParameterInInnerFunctionThrows()).toThrow(SyntaxError);
    });
  });

  describe("sloppyLocalVarDeleteReturnsBoolean", () => {
    it("delete configurable", () => {
      expect(sloppyLocalVarDeleteReturnsBoolean()).toBe(true);
    });
  });

  describe("strictAssignToFrozenObjectThrows", () => {
    it("TypeError", () => {
      expect(() => strictAssignToFrozenObjectThrows()).toThrow(TypeError);
    });
  });

  describe("strictContextObjectIsZeroVsNegZero", () => {
    it("Object.is", () => {
      expect(strictContextObjectIsZeroVsNegZero()).toBe(true);
    });
  });

  describe("pragmaUseStrictRecognized", () => {
    it("true", () => {
      expect(pragmaUseStrictRecognized()).toBe(true);
    });
  });

  describe("strictModeIsolationHint", () => {
    it("non-kosong", () => {
      expect(strictModeIsolationHint().length).toBeGreaterThan(30);
    });
  });
});
