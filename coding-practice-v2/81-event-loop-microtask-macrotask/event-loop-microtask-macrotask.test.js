import { describe, it, expect } from "vitest";
import {
  scheduleDemoOrder,
  simulateEventLoopQueue,
  createMacro,
  runSyncOnly,
} from "./event-loop-microtask-macrotask.js";

describe("Topik 81 — event loop", () => {
  it("real order demo", async () => {
    const log = await scheduleDemoOrder();
    expect(log).toEqual(["sync-start", "sync-end", "micro", "macro"]);
  });

  it("simulator order", () => {
    const out = simulateEventLoopQueue(
      ["s1"],
      ["m1", "m2"],
      [createMacro("M1", ["m3"]), createMacro("M2")],
    );
    expect(out).toEqual(["s1", "m1", "m2", "M1", "m3", "M2"]);
  });

  it("sync only helper", () => {
    expect(runSyncOnly(["a", "b"])).toEqual(["a", "b"]);
  });
});

