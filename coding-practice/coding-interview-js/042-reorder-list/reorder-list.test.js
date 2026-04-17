import { describe, it, expect } from 'vitest';
import { ListNode, reorderList } from './reorder-list.js';

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

describe('reorderList', () => {
  it('contoh', () => {
    const h = fromArr([1, 2, 3, 4]);
    reorderList(h);
    expect(toArr(h)).toEqual([1, 4, 2, 3]);
  });

  it('ganjil panjang', () => {
    const h = fromArr([1, 2, 3, 4, 5]);
    reorderList(h);
    expect(toArr(h)).toEqual([1, 5, 2, 4, 3]);
  });
});
