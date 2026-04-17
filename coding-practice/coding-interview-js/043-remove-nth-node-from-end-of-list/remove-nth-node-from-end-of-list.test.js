import { describe, it, expect } from 'vitest';
import { ListNode, removeNthFromEnd } from './remove-nth-node-from-end-of-list.js';

function fromArr(arr) {
  if (!arr.length) return null;
  const h = new ListNode(arr[0]);
  let p = h;
  for (let i = 1; i < arr.length; i++) {
    p.next = new ListNode(arr[i]);
    p = p.next;
  }
  return h;
}

function toArr(h) {
  const o = [];
  for (let p = h; p; p = p.next) o.push(p.val);
  return o;
}

describe('removeNthFromEnd', () => {
  it('hapus dari belakang', () => {
    const h = removeNthFromEnd(fromArr([1, 2, 3, 4, 5]), 2);
    expect(toArr(h)).toEqual([1, 2, 3, 5]);
  });

  it('hapus head', () => {
    const h = removeNthFromEnd(fromArr([1]), 1);
    expect(h).toBe(null);
  });
});
