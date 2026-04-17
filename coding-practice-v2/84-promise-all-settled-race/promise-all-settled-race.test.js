import { describe, it, expect } from "vitest";
import {
  runAllStrict,
  runAllSettledSummary,
  runRaceFirst,
  resolveAfter,
  rejectAfter,
  runTaskFactoriesAll,
  runTaskFactoriesSettled,
} from "./promise-all-settled-race.js";

describe("Topik 84 — promise all/settled/race", () => {
  it("all strict", async () => {
    await expect(runAllStrict([Promise.resolve(1), Promise.resolve(2)])).resolves.toEqual([1, 2]);
  });

  it("allSettled summary", async () => {
    const s = await runAllSettledSummary([Promise.resolve(1), Promise.reject(new Error("x"))]);
    expect(s.fulfilled).toBe(1);
    expect(s.rejected).toBe(1);
  });

  it("race + factories", async () => {
    await expect(runRaceFirst([resolveAfter(1, "fast"), resolveAfter(5, "slow")])).resolves.toBe("fast");
    await expect(runRaceFirst([rejectAfter(1, "fail"), resolveAfter(5, "ok")])).rejects.toThrow("fail");
    await expect(runTaskFactoriesAll([() => Promise.resolve(3), () => Promise.resolve(4)])).resolves.toEqual([3, 4]);
    const settled = await runTaskFactoriesSettled([() => Promise.resolve(1), () => Promise.reject(new Error("bad"))]);
    expect(settled.rejected).toBe(1);
  });
});

