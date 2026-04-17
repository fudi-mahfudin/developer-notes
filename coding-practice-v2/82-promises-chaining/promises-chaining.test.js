import { describe, it, expect, vi } from "vitest";
import {
  runPipelineChain,
  chainWithRecovery,
  toResultObject,
  asyncAdd,
  asyncFail,
  composeThen,
  runWithFinally,
} from "./promises-chaining.js";

describe("Topik 82 — promises chaining", () => {
  it("pipeline chain", async () => {
    const out = await runPipelineChain(2, [(x) => x + 1, (x) => asyncAdd(x, 1), (x) => x * 2]);
    expect(out).toBe(8);
  });

  it("recovery", async () => {
    const out = await chainWithRecovery(1, [(x) => x + 1, () => asyncFail()], () => 10, (x) => x + 1);
    expect(out).toBe(11);
  });

  it("result object + finally + compose", async () => {
    expect((await toResultObject(Promise.resolve(5))).ok).toBe(true);
    expect((await toResultObject(asyncFail())).ok).toBe(false);
    const cleanup = vi.fn();
    await runWithFinally(1, [(x) => x + 1], cleanup);
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(await composeThen([(x) => x + 2])(3)).toBe(5);
  });
});

