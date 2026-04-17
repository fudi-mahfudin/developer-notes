import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  makeAbortableDelay,
  withTimeoutAbort,
  chainAbortSignals,
  isAbortError,
} from "./abort-controller-cancellation.js";

describe("Topik 88 — abort controller cancellation", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("abortable delay aborted", async () => {
    const c = new AbortController();
    const p = makeAbortableDelay(100, c.signal);
    c.abort();
    await expect(p).rejects.toMatchObject({ name: "AbortError" });
  });

  it("with timeout abort", async () => {
    const p = withTimeoutAbort((signal) => makeAbortableDelay(100, signal), 10);
    const assertion = expect(p).rejects.toMatchObject({ name: "AbortError" });
    await vi.runAllTimersAsync();
    await assertion;
  });

  it("chain signals + guard", () => {
    const a = new AbortController();
    const b = new AbortController();
    const merged = chainAbortSignals([a.signal, b.signal]);
    expect(merged.aborted).toBe(false);
    a.abort();
    expect(merged.aborted).toBe(true);
    expect(isAbortError(Object.assign(new Error("x"), { name: "AbortError" }))).toBe(true);
  });
});

