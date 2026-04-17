/**
 * Judul: Topik 53 — Remove Nth node from end (satu pass, dummy head)
 *
 * Soal test eksplisit:
 * - removeNthFromEnd: `[1,2,3,4,5]`, `n=2` → `[1,2,3,5]` (hapus `4`).
 * - removeNthFromEnd: satu node, `n=1` → `null`.
 * - nthFromEndValue / isValidNthFromEnd: validasi dan baca tanpa mutasi.
 * - removeKthFromStart: hapus indeks 0-based dari depan (soal sejenis).
 *
 * Kontrak (opsional): `n` integer 1..length dari **belakang**; head `null` aman.
 *
 * Contoh output:
 * - `1→2→3`, `n=1` → hapus `3` → `[1,2]`.
 *
 * Solusi: dummy node; `fast` maju `n+1` dari dummy; `slow` mengikuti; unlink `slow.next`.
 *
 * @see knowledge-base/05-coding-interview-v2/53-remove-nth-from-end.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/53-remove-nth-from-end/remove-nth-from-end.test.js`
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
 * Judul: Array → list
 *
 * @param {number[]} arr
 * @returns {ListNode | null}
 */
export function arrayToList(arr) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
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
 * Judul: List → array
 *
 * @param {ListNode | null} head
 * @returns {number[]}
 */
export function listToArray(head) {
  const out = [];
  let cur = head;
  while (cur !== null) {
    out.push(cur.val);
    cur = cur.next;
  }
  return out;
}

/**
 * Judul: Panjang list
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
 * Judul: Hapus node ke-n dari belakang (1-indexed dari end)
 *
 * Soal test:
 * - `[1,2,3,4,5]`, `n=2` → `[1,2,3,5]`.
 * - Satu node, `n=1` → `null`.
 *
 * Contoh output:
 * - removeNthFromEnd(1→2→3, n=1) → `[1,2]`.
 *
 * Kontrak: `n` harus integer 1..length; `head` null → `null`.
 *
 * Solusi: Dummy head; `leading` maju `n+1`; `lag` mengikuti; unlink `lag.next`.
 *
 * @param {ListNode | null} head
 * @param {number} n
 * @returns {ListNode | null}
 */
export function removeNthFromEnd(head, n) {
  if (head === null) return null;
  if (!Number.isInteger(n) || n < 1) throw new RangeError("n must be positive integer");
  const len = listLength(head);
  if (n > len) throw new RangeError("n must be <= length");
  const dummy = new ListNode(0, head);
  let slow = dummy;
  let fast = dummy;
  for (let i = 0; i < n + 1; i++) fast = fast.next;
  while (fast !== null) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}

/**
 * Judul: Node ke-n dari akhir (nilai), tanpa hapus
 *
 * Soal test:
 * - `[1,2,3,4,5]`, `n=2` → `4`.
 *
 * Kontrak: `n` dalam [1, length].
 *
 * Solusi: Dua pointer; atau `length - n` langkah dari awal.
 *
 * @param {ListNode | null} head
 * @param {number} n
 * @returns {number | null}
 */
export function nthFromEndValue(head, n) {
  if (head === null) return null;
  const len = listLength(head);
  if (!Number.isInteger(n) || n < 1 || n > len) throw new RangeError("invalid n");
  let cur = head;
  for (let i = 0; i < len - n; i++) cur = cur.next;
  return cur.val;
}

/**
 * Judul: Hapus node ke-k dari depan (0-indexed)
 *
 * Soal test:
 * - `[10,20,30]`, `k=1` → `[10,30]`.
 *
 * Contoh output:
 * - removeKthFromStart([1,2,3], k=0) → `[2,3]`.
 *
 * @param {ListNode | null} head
 * @param {number} k
 * @returns {ListNode | null}
 */
export function removeKthFromStart(head, k) {
  if (head === null) return null;
  let len = listLength(head);
  if (!Number.isInteger(k) || k < 0 || k >= len) throw new RangeError("invalid k");
  if (k === 0) return head.next;
  const dummy = new ListNode(0, head);
  let slow = dummy;
  for (let i = 0; i < k; i++) slow = slow.next;
  slow.next = slow.next.next;
  return dummy.next;
}

/**
 * Judul: Validasi apakah `n` sah untuk `head`
 *
 * Soal test:
 * - length 3, n=1..3 true; n=0 false.
 *
 * @param {ListNode | null} head
 * @param {number} n
 */
export function isValidNthFromEnd(head, n) {
  if (head === null) return false;
  const len = listLength(head);
  return Number.isInteger(n) && n >= 1 && n <= len;
}
