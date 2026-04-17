import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce, createDebounceController, throttle, createThrottleController, noop } from "./throttle-debounce.js";

describe("Topik 85 — throttle debounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("debounce", () => {
    const fn = vi.fn();
    const d = debounce(fn, 50);
    d();
    d();
    d();
    vi.advanceTimersByTime(49);
    expect(fn).toHaveBeenCalledTimes(0);
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("debounce cancel", () => {
    const fn = vi.fn();
    const c = createDebounceController(fn, 30);
    c.call();
    c.cancel();
    vi.advanceTimersByTime(30);
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("throttle + cancel trailing", () => {
    const fn = vi.fn();
    const t = createThrottleController(fn, 20);
    t.call("a");
    t.call("b");
    expect(fn).toHaveBeenCalledTimes(1);
    t.cancel();
    vi.advanceTimersByTime(20);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(noop()).toBeUndefined();
    const raw = throttle(fn, 10);
    raw("x");
    vi.advanceTimersByTime(10);
  });
});

