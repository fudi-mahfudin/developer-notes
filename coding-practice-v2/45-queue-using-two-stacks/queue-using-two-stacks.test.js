/**
 * Tes Topik 45 — `pnpm test -- coding-practice-v2/45-queue-using-two-stacks/queue-using-two-stacks.test.js`
 */
import { describe, it, expect } from "vitest";
import { QueueTwoStacks } from "./queue-using-two-stacks.js";

describe("Topik 45 — queue two stacks", () => {
  it("FIFO", () => {
    const q = new QueueTwoStacks();
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    expect(q.dequeue()).toBe(1);
    expect(q.peek()).toBe(2);
    expect(q.dequeue()).toBe(2);
    expect(q.dequeue()).toBe(3);
    expect(q.size).toBe(0);
  });
});
