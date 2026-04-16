import { describe, it, expect } from 'vitest';
import { ListNode, mergeKLists } from './merge-k-sorted-lists.js';

function fromArr(a) {
  if (!a?.length) return null;
  const h = new ListNode(a[0]);
  let p = h;
  for (let i = 1; i < a.length; i++) {
    p.next = new ListNode(a[i]);
    p = p.next;
  }
  return h;
}

function toArr(h) {
  const o = [];
  for (let p = h; p; p = p.next) o.push(p.val);
  return o;
}

describe('mergeKLists', () => {
  it('beberapa list', () => {
    const got = mergeKLists([fromArr([1, 4, 5]), fromArr([1, 3, 4]), fromArr([2, 6])]);
    expect(toArr(got)).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
  });

  it('kosong', () => {
    expect(mergeKLists([])).toBe(null);
  });
});
