import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  promisePool,
  mapWithConcurrency,
  settleWithConcurrency,
  createDelayedTask,
} from "./concurrent-promise-pool.js";

describe("Topik 87 — concurrent promise pool", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("promisePool preserves order", async () => {
    const tasks = [() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)];
    await expect(promisePool(tasks, 2)).resolves.toEqual([1, 2, 3]);
  });

  it("mapWithConcurrency", async () => {
    await expect(mapWithConcurrency([1, 2, 3], async (x) => x * 2, 2)).resolves.toEqual([2, 4, 6]);
  });

  it("settleWithConcurrency + max running", async () => {
    let running = 0;
    let peak = 0;
    const mk = (v) =>
      createDelayedTask(
        10,
        v,
        () => {
          running += 1;
          peak = Math.max(peak, running);
        },
        () => {
          running -= 1;
        },
      );
    const p = settleWithConcurrency([mk("a"), mk("b"), mk("c")], 2);
    await vi.runAllTimersAsync();
    const out = await p;
    expect(out[0].status).toBe("fulfilled");
    expect(peak).toBeLessThanOrEqual(2);
  });
});

