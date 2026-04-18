import { describe, it, expect } from "vitest";
import {
  ListNode,
  arrayToList,
  listToArray,
  getIntersectionNode,
  getIntersectionNodeSwap,
  attachTail,
  hasIntersection,
} from "./intersection-two-lists.js";

describe("Topik 54 — intersection two lists", () => {
  it("shared tail", () => {
    const shared = new ListNode(8, new ListNode(9, new ListNode(10)));
    const a = new ListNode(1, new ListNode(2, shared));
    const b = new ListNode(5, shared);
    expect(getIntersectionNode(a, b)).toBe(shared);
    expect(getIntersectionNodeSwap(a, b)).toBe(shared);
  });

  it("no intersection", () => {
    const a = arrayToList([1, 2]);
    const b = arrayToList([3, 4]);
    expect(getIntersectionNode(a, b)).toBeNull();
    expect(hasIntersection(a, b)).toBe(false);
  });

  it("attachTail + intersection", () => {
    const tail = arrayToList([7, 8]);
    const headA = arrayToList([1, 2]);
    const headB = arrayToList([3, 4]);
    if (headA && tail) attachTail(headA, tail);
    if (headB && tail) attachTail(headB, tail);
    expect(getIntersectionNode(headA, headB)).toBe(tail);
    expect(listToArray(getIntersectionNode(headA, headB))).toEqual([7, 8]);
  });
});
