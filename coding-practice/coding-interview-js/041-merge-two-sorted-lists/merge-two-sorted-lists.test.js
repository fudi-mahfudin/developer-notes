import { describe, it, expect } from 'vitest';
import { ListNode, mergeTwoLists } from './merge-two-sorted-lists.js';

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

describe('mergeTwoLists', () => {
  it('interleave', () => {
    const got = mergeTwoLists(fromArr([1, 2, 4]), fromArr([1, 3, 4]));
    expect(toArr(got)).toEqual([1, 1, 2, 3, 4, 4]);
  });

  it('satu null', () => {
    expect(toArr(mergeTwoLists(null, fromArr([0])))).toEqual([0]);
  });
});
