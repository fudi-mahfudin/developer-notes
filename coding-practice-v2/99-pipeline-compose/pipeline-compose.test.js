import { describe, it, expect, vi } from "vitest";
import {
  pipe,
  compose,
  pipeAsync,
  tap,
  guard,
  branch,
  add,
  mul,
  toString,
  tryPipe,
  parallelMap,
} from "./pipeline-compose.js";

describe("Topik 99 — pipeline compose", () => {
  it("pipe + compose", () => {
    expect(pipe(add(1), mul(2))(2)).toBe(6);
    expect(compose(mul(2), add(1))(2)).toBe(6);
  });

  it("pipe async", async () => {
    const f = pipeAsync(add(1), async (x) => x * 3);
    await expect(f(2)).resolves.toBe(9);
  });

  it("tap guard branch", () => {
    const logger = vi.fn();
    const f = pipe(tap(logger), guard((x) => x > 0), branch((x) => x % 2 === 0, add(10), mul(10)), toString);
    expect(f(2)).toBe("12");
    expect(logger).toHaveBeenCalledWith(2);
    expect(tryPipe((x) => {
      if (x < 0) throw new Error("bad");
      return x;
    }, -1).ok).toBe(false);
    expect(parallelMap(add(1))([1, 2])).toEqual([2, 3]);
  });
});

