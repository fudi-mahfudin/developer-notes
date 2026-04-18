import { describe, it, expect } from "vitest";
import { Trie, countWordsWithPrefix, collectWordsWithPrefix, removeWord } from "./trie-prefix-tree.js";

describe("Topik 61 — trie prefix tree", () => {
  it("insert search startsWith", () => {
    const t = new Trie();
    t.insert("app");
    t.insert("apple");
    expect(t.search("app")).toBe(true);
    expect(t.search("ap")).toBe(false);
    expect(t.startsWith("ap")).toBe(true);
    expect(t.startsWith("b")).toBe(false);
  });

  it("countWordsWithPrefix dan collectWordsWithPrefix", () => {
    const t = new Trie();
    t.insert("app");
    t.insert("apple");
    t.insert("apricot");
    t.insert("cat");
    expect(countWordsWithPrefix(t, "ap")).toBe(3);
    expect(collectWordsWithPrefix(t, "ap").sort()).toEqual(["app", "apple", "apricot"]);
    expect(collectWordsWithPrefix(t, "z")).toEqual([]);
  });

  it("removeWord mem-prune cabang", () => {
    const t = new Trie();
    t.insert("app");
    t.insert("apple");
    expect(removeWord(t, "apple")).toBe(true);
    expect(t.search("apple")).toBe(false);
    expect(t.search("app")).toBe(true);
    expect(t.startsWith("app")).toBe(true);
  });
});
