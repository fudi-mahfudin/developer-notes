/**
 * Tes Topik 19 — dari root repo Career, jalankan `pnpm test`.
 */
import { describe, it, expect } from "vitest";
import {
  partitionCopy,
  sortByPriorityDescNameAsc,
  sortNumbers,
  sortStringsCaseInsensitive,
  stableSortByKey,
  stableSortByNestedKey,
} from "./sorting-comparator-stability.js";

describe("Topik 19 — sorting / comparator", () => {
  describe("stableSortByKey", () => {
    it("key sama mempertahankan urutan asli", () => {
      const items = [
        { key: 1, payload: "a" },
        { key: 2, payload: "b" },
        { key: 1, payload: "c" },
      ];
      const out = stableSortByKey(items);
      expect(out.map((x) => x.payload)).toEqual(["a", "c", "b"]);
    });
  });

  describe("sortStringsCaseInsensitive", () => {
    it("aba", () => {
      expect(sortStringsCaseInsensitive(["B", "a", "C"])).toEqual(["a", "B", "C"]);
    });
  });

  describe("sortByPriorityDescNameAsc", () => {
    it("prioritas lalu nama", () => {
      const rows = [
        { name: "b", priority: 1 },
        { name: "a", priority: 2 },
        { name: "c", priority: 2 },
      ];
      expect(sortByPriorityDescNameAsc(rows).map((r) => r.name)).toEqual(["a", "c", "b"]);
    });
  });

  describe("sortNumbers", () => {
    it("desc", () => {
      expect(sortNumbers([3, 1, 2], "desc")).toEqual([3, 2, 1]);
    });
  });

  describe("stableSortByNestedKey", () => {
    it("nested", () => {
      const items = [{ outer: { inner: 2 } }, { outer: { inner: 1 } }];
      expect(stableSortByNestedKey(items)).toEqual([{ outer: { inner: 1 } }, { outer: { inner: 2 } }]);
    });
  });

  describe("partitionCopy", () => {
    it("pisah", () => {
      expect(partitionCopy([1, 2, 3, 4], (x) => x % 2 === 0)).toEqual({ pass: [2, 4], fail: [1, 3] });
    });
  });
});
