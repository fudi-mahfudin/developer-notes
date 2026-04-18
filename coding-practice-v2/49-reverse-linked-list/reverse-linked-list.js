/**
 * Judul: Topik 49 — Reverse linked list
 *
 * Soal test:
 * - ListNode + reverseList: iteratif pointer; round-trip values.
 *
 * Kontrak: singly-linked; tidak siklus (kecuali tes khusus).
 *
 * Solusi: Tiga pointer `prev`, `cur`, `next`.
 *
 * @see knowledge-base/05-coding-interview-v2/49-reverse-linked-list.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/49-reverse-linked-list/reverse-linked-list.test.js`
 */

/**
 * Judul: Node linked list singly
 */
export class ListNode {
  /**
   * @param {number} val
   * @param {ListNode | null} [next]
   */
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * Judul: Balik linked list — iteratif
 *
 * Soal test:
 * - `1->2->3` menjadi `3->2->1`.
 *
 * Kontrak: `head` boleh null → null.
 *
 * Solusi: Reverse edges.
 *
 * @param {ListNode | null} head
 * @returns {ListNode | null}
 */
export function reverseList(head) {
  /** @type {ListNode | null} */
  let prev = null;
  let cur = head;
  while (cur !== null) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}

/**
 * Judul: Array ke list (helper tes)
 *
 * Soal test:
 * - Round-trip dengan `listToArray`.
 *
 * @param {number[]} arr
 */
export function arrayToList(arr) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be array");
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let cur = head;
  for (let i = 1; i < arr.length; i++) {
    cur.next = new ListNode(arr[i]);
    cur = cur.next;
  }
  return head;
}

/**
 * Judul: List ke array
 *
 * @param {ListNode | null} head
 */
export function listToArray(head) {
  /** @type {number[]} */
  const out = [];
  let cur = head;
  while (cur !== null) {
    out.push(cur.val);
    cur = cur.next;
  }
  return out;
}

/**
 * Judul: Reverse linked list — rekursif
 *
 * Soal test:
 * - Hasil sama dengan `reverseList` iteratif pada kasus uji.
 *
 * Kontrak: tidak terlalu dalam (stack overflow) — n kecil.
 *
 * Solusi: `head.next` reverse lalu append.
 *
 * @param {ListNode | null} head
 * @returns {ListNode | null}
 */
export function reverseListRecursive(head) {
  if (head === null || head.next === null) return head;
  const rest = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return rest;
}

/**
 * Judul: Panjang list
 *
 * Soal test:
 * - `[1,2,3]` → `3`.
 *
 * Kontrak: tidak siklus.
 *
 * Solusi: Walk.
 *
 * @param {ListNode | null} head
 */
export function listLength(head) {
  let n = 0;
  let cur = head;
  while (cur !== null) {
    n += 1;
    cur = cur.next;
  }
  return n;
}

/**
 * Judul: Ambil node di indeks (0-based)
 *
 * Soal test:
 * - `getNodeAt(head,0)` adalah head.
 *
 * Kontrak: indeks valid.
 *
 * Solusi: Loop `i` kali `next`.
 *
 * @param {ListNode | null} head
 * @param {number} index
 */
export function getNodeAt(head, index) {
  if (!Number.isInteger(index) || index < 0) throw new RangeError("index must be non-negative integer");
  let cur = head;
  let i = 0;
  while (cur !== null && i < index) {
    cur = cur.next;
    i += 1;
  }
  if (cur === null) throw new RangeError("index out of range");
  return cur;
}
