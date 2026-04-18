/**
 * Judul: Topik 54 — Intersection of two linked lists (identitas node, bukan nilai)
 *
 * Soal test eksplisit:
 * - getIntersectionNode: tail bersama → kembalikan pointer pertama pada rantai bersama (bukan duplikat nilai).
 * - getIntersectionNodeSwap: O(1) memori, dua pointer “swap path” — hasil sama pada kasus uji.
 * - attachTail: utilitas bangun fixture enterprise (prefix unik + suffix shared).
 *
 * Kontrak (opsional): tidak siklus pada soal klasik; equality `===` antar node.
 *
 * Contoh output:
 * - A: `a1→c1→c2`, B: `b1→c1→c2` dengan `c1` sama → LCA-style intersection = `c1`.
 *
 * Solusi: samakan panjang lalu jalan paralel; atau `a = a?a.next:headB` hingga bertemu.
 *
 * @see knowledge-base/05-coding-interview-v2/54-intersection-two-lists.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/54-intersection-two-lists/intersection-two-lists.test.js`
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
 * Judul: Temukan node perpotongan (referensi sama)
 *
 * Soal test:
 * - Dua head berbeda menuju tail yang sama → kembalikan node awal bagian bersama.
 * - Tidak ada perpotongan → `null`.
 *
 * Contoh output:
 * - A: a1→a2→c1→c2, B: b1→c1→c2 → `getIntersectionNode` = `c1`.
 *
 * Kontrak: tidak siklus (kecuali tes khusus); perbandingan identitas `===`.
 *
 * Solusi: Potong selisih panjang; jalan paralel sampai `a===b`.
 *
 * @param {ListNode | null} headA
 * @param {ListNode | null} headB
 * @returns {ListNode | null}
 */
export function getIntersectionNode(headA, headB) {
  const lenA = listLength(headA);
  const lenB = listLength(headB);
  let a = headA;
  let b = headB;
  if (lenA > lenB) {
    for (let i = 0; i < lenA - lenB; i++) a = a.next;
  } else if (lenB > lenA) {
    for (let i = 0; i < lenB - lenA; i++) b = b.next;
  }
  while (a !== null && b !== null) {
    if (a === b) return a;
    a = a.next;
    b = b.next;
  }
  return null;
}

/**
 * Judul: Alternatif dua pointer (swap heads)
 *
 * Soal test:
 * - Hasil sama dengan `getIntersectionNode` pada kasus uji.
 *
 * Kontrak: sama; setelah a+b dan b+a traversal, bertemu di intersection atau null.
 *
 * Solusi: `a = a ? a.next : headB` (satu loop sampai a===b).
 *
 * @param {ListNode | null} headA
 * @param {ListNode | null} headB
 * @returns {ListNode | null}
 */
export function getIntersectionNodeSwap(headA, headB) {
  let a = headA;
  let b = headB;
  while (a !== b) {
    a = a === null ? headB : a.next;
    b = b === null ? headA : b.next;
  }
  return a;
}

/**
 * Judul: Bangun list dari array (node baru)
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
 * Judul: List → array nilai
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
 * Judul: Gabungkan tail list `suffix` ke akhir `prefix` (mutasi)
 *
 * Soal test:
 * - prefix `[1,2]`, suffix shared node → tail `prefix.next` = shared.
 *
 * Kontrak: `prefix` tidak null; `suffix` node yang akan jadi tail bersama.
 *
 * @param {ListNode} prefixHead
 * @param {ListNode} sharedTailStart
 */
export function attachTail(prefixHead, sharedTailStart) {
  let cur = prefixHead;
  while (cur.next !== null) cur = cur.next;
  cur.next = sharedTailStart;
}

/**
 * Judul: Apakah dua head menuju node referensi yang sama di jalur mana pun
 *
 * Soal test:
 * - Tanpa intersection → false.
 *
 * Solusi: `getIntersectionNode !== null`.
 *
 * @param {ListNode | null} headA
 * @param {ListNode | null} headB
 */
export function hasIntersection(headA, headB) {
  return getIntersectionNode(headA, headB) !== null;
}
