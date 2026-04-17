/**
 * Tes Topik 39 — `pnpm test -- coding-practice-v2/39-group-by-key/group-by-key.test.js`
 */
import { describe, it, expect } from "vitest";
import { groupAnagramsByKey, groupBy } from "./group-by-key.js";

describe("Topik 39 — group by", () => {
  it("groupBy genap ganjil", () => {
    const m = groupBy([1, 2, 3, 4], (n) => n % 2);
    expect(m.get(0)).toEqual([2, 4]);
    expect(m.get(1)).toEqual([1, 3]);
  });

  it("groupAnagramsByKey", () => {
    const g = groupAnagramsByKey(["eat", "tea", "tan", "ate", "nat", "bat"]);
    expect(g.length).toBe(3);
  });
});
