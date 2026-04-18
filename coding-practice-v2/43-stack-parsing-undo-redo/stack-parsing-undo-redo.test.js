/**
 * Tes Topik 43 — `pnpm test -- coding-practice-v2/43-stack-parsing-undo-redo/stack-parsing-undo-redo.test.js`
 */
import { describe, it, expect } from "vitest";
import { TextEditorUndo, isBalancedParens } from "./stack-parsing-undo-redo.js";

describe("Topik 43 — stack / undo", () => {
  it("TextEditorUndo", () => {
    const ed = new TextEditorUndo();
    ed.type("a");
    ed.type("b");
    expect(ed.getText()).toBe("ab");
    ed.undo();
    expect(ed.getText()).toBe("a");
    ed.redo();
    expect(ed.getText()).toBe("ab");
  });

  it("isBalancedParens", () => {
    expect(isBalancedParens("(())")).toBe(true);
    expect(isBalancedParens("(()")).toBe(false);
  });
});
