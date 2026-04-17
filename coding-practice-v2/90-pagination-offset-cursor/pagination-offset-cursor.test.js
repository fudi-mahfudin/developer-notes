import { describe, it, expect } from "vitest";
import {
  paginateOffset,
  paginateCursor,
  encodeCursor,
  decodeCursor,
  totalPages,
  validatePaginationParams,
} from "./pagination-offset-cursor.js";

describe("Topik 90 — pagination offset cursor", () => {
  it("offset", () => {
    const out = paginateOffset([0, 1, 2, 3, 4], 2, 2);
    expect(out.items).toEqual([2, 3]);
    expect(out.hasMore).toBe(true);
  });

  it("cursor encode/decode + paginate", () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const first = paginateCursor(data, null, 2, (x) => x.id);
    expect(first.items.map((x) => x.id)).toEqual([1, 2]);
    const second = paginateCursor(data, first.nextCursor, 2, (x) => x.id);
    expect(second.items.map((x) => x.id)).toEqual([3]);
    expect(decodeCursor(encodeCursor(10))).toBe(10);
  });

  it("helpers", () => {
    expect(totalPages(10, 3)).toBe(4);
    expect(validatePaginationParams(0, 10).ok).toBe(true);
    expect(validatePaginationParams(-1, 10).ok).toBe(false);
  });
});

