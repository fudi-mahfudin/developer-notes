import { describe, it, expect, vi } from "vitest";
import { PubSub, createEmitter, replay } from "./observer-pub-sub.js";

describe("Topik 96 — observer pub-sub", () => {
  it("subscribe publish unsubscribe", () => {
    const bus = new PubSub();
    const fn = vi.fn();
    const off = bus.subscribe("ev", fn);
    bus.publish("ev", 1);
    expect(fn).toHaveBeenCalledWith(1);
    off();
    bus.publish("ev", 2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("once + wildcard + replay", () => {
    const bus = new PubSub();
    const onceFn = vi.fn();
    const wc = vi.fn();
    bus.once("x", onceFn);
    bus.subscribe("*", wc);
    replay(bus, [["x", 1], ["x", 2]]);
    expect(onceFn).toHaveBeenCalledTimes(1);
    expect(wc).toHaveBeenCalledTimes(2);
  });

  it("emitter facade", () => {
    const em = createEmitter();
    const fn = vi.fn();
    em.on("a", fn);
    em.emit("a", 7);
    expect(fn).toHaveBeenCalledWith(7);
    expect(em.count("a")).toBe(1);
  });
});

