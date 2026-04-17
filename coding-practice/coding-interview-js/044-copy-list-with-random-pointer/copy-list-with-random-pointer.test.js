import { describe, it, expect } from 'vitest';
import { Node, copyRandomList } from './copy-list-with-random-pointer.js';

describe('copyRandomList', () => {
  it('structurally equal copy', () => {
    const a = new Node(7);
    const b = new Node(13);
    const c = new Node(11);
    const d = new Node(10);
    const e = new Node(1);
    a.next = b;
    b.next = c;
    c.next = d;
    d.next = e;
    b.random = a;
    c.random = e;
    d.random = c;
    e.random = a;

    const h = copyRandomList(a);
    expect(h).not.toBe(a);
    expect(h.val).toBe(7);
    expect(h.next.val).toBe(13);
    expect(h.next.random).toBe(h);
    expect(h.next.next.random.val).toBe(1);
  });
});
