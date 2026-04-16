import { describe, it, expect } from 'vitest';
import { ListNode, addTwoNumbers } from './add-two-numbers.js';

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

describe('addTwoNumbers', () => {
  it('342 + 465 = 807', () => {
    const got = addTwoNumbers(fromArr([2, 4, 3]), fromArr([5, 6, 4]));
    expect(toArr(got)).toEqual([7, 0, 8]);
  });

  it('carry panjang beda', () => {
    const got = addTwoNumbers(fromArr([9, 9, 9, 9, 9, 9, 9]), fromArr([9, 9, 9, 9]));
    expect(toArr(got)).toEqual([8, 9, 9, 9, 0, 0, 0, 1]);
  });
});
