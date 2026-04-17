import { describe, it, expect, vi } from "vitest";
import {
  safeAwait,
  executeWithFallback,
  withRetrySimple,
  runManySafe,
  executeWithLogging,
} from "./async-await-error-handling.js";

describe("Topik 83 — async await error handling", () => {
  it("safeAwait + fallback", async () => {
    expect(await safeAwait(Promise.resolve(5))).toEqual([null, 5]);
    const [err] = await safeAwait(Promise.reject(new Error("x")));
    expect(err).toBeInstanceOf(Error);
    expect(await executeWithFallback(async () => { throw new Error("bad"); }, "N/A")).toBe("N/A");
  });

  it("retry simple", async () => {
    let c = 0;
    const out = await withRetrySimple(async () => {
      c += 1;
      if (c < 3) throw new Error("fail");
      return 42;
    }, 3);
    expect(out).toBe(42);
  });

  it("runManySafe + logging", async () => {
    const r = await runManySafe([async () => 1, async () => { throw new Error("x"); }]);
    expect(r[0].ok).toBe(true);
    expect(r[1].ok).toBe(false);
    const onError = vi.fn();
    await expect(executeWithLogging(async () => { throw new Error("boom"); }, onError)).rejects.toThrow("boom");
    expect(onError).toHaveBeenCalledTimes(1);
  });
});

