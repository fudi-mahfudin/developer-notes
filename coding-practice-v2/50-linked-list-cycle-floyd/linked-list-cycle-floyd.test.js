/**
 * Tes Topik 50 — `pnpm test -- coding-practice-v2/50-linked-list-cycle-floyd/linked-list-cycle-floyd.test.js`
 */
import { describe, it, expect } from "vitest";
import { ListNode, cycleStartNode, hasCycle } from "./linked-list-cycle-floyd.js";

describe("Topik 50 — Floyd cycle", () => {
  it("hasCycle", () => {
    const a = new ListNode(1);
    const b = new ListNode(2);
    a.next = b;
    b.next = a;
    expect(hasCycle(a)).toBe(true);
    const linear = new ListNode(1);
    linear.next = new ListNode(2);
    expect(hasCycle(linear)).toBe(false);
  });

  it("cycleStartNode", () => {
    const n1 = new ListNode(1);
    const n2 = new ListNode(2);
    const n3 = new ListNode(3);
    n1.next = n2;
    n2.next = n3;
    n3.next = n2;
    expect(cycleStartNode(n1)).toBe(n2);
  });
});
