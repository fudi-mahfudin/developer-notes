import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  computeBackoffDelay,
  isRetryableByStatus,
  retryWithBackoff,
  classifyHttpStatus,
  retryHttpTask,
} from "./retry-backoff.js";

describe("Topik 86 — retry backoff", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("delay + status classifier", () => {
    expect(computeBackoffDelay(10, 2, 0)).toBe(10);
    expect(computeBackoffDelay(10, 2, 2)).toBe(40);
    expect(isRetryableByStatus(503)).toBe(true);
    expect(isRetryableByStatus(404)).toBe(false);
    expect(classifyHttpStatus(500).retryable).toBe(true);
  });

  it("retryWithBackoff succeed after retries", async () => {
    let c = 0;
    const p = retryWithBackoff(async () => {
      c += 1;
      if (c < 3) throw new Error("x");
      return "ok";
    }, { attempts: 3, baseDelay: 5, factor: 2 });
    await vi.runAllTimersAsync();
    await expect(p).resolves.toBe("ok");
  });

  it("retryHttpTask status-based", async () => {
    let c = 0;
    const p = retryHttpTask(async () => {
      c += 1;
      if (c < 2) throw { status: 503 };
      return 200;
    }, { attempts: 2, baseDelay: 1 });
    await vi.runAllTimersAsync();
    await expect(p).resolves.toBe(200);
  });
});

