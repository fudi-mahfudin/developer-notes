import { describe, it, expect } from 'vitest';
import { ListNode, reverseList } from './reverse-linked-list.js';

function fromArr(arr) {
  if (!arr.length) return null;
  const head = new ListNode(arr[0]);
  let p = head;
  for (let i = 1; i < arr.length; i++) {
    p.next = new ListNode(arr[i]);
    p = p.next;
  }
  return head;
}

function toArr(head) {
  const out = [];
  for (let p = head; p; p = p.next) out.push(p.val);
  return out;
}

describe('reverseList', () => {
  it('contoh', () => {
    expect(toArr(reverseList(fromArr([1, 2, 3, 4, 5])))).toEqual([5, 4, 3, 2, 1]);
  });

  it('kosong', () => {
    expect(reverseList(null)).toBe(null);
  });
});
