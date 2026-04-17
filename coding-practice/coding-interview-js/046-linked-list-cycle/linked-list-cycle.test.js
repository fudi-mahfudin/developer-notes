import { describe, it, expect } from 'vitest';
import { ListNode, hasCycle } from './linked-list-cycle.js';

describe('hasCycle', () => {
  it('ada siklus', () => {
    const a = new ListNode(3);
    const b = new ListNode(2);
    const c = new ListNode(0);
    const d = new ListNode(-4);
    a.next = b;
    b.next = c;
    c.next = d;
    d.next = b;
    expect(hasCycle(a)).toBe(true);
  });

  it('tidak ada', () => {
    const a = new ListNode(1);
    a.next = new ListNode(2);
    expect(hasCycle(a)).toBe(false);
  });

  it('null', () => {
    expect(hasCycle(null)).toBe(false);
  });
});
