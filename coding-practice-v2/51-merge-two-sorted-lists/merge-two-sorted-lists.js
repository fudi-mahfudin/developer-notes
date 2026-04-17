/**
 * Judul: Topik 51 — Merge dua sorted linked list
 *
 * Soal test:
 * - mergeTwoLists: gabung `1->2->4` dan `1->3->4` → `1->1->2->3->4->4` (nilai terurut non-menurun).
 * - mergeTwoListsRecursive: hasil sama dengan iteratif pada kasus uji.
 * - listToArray / arrayToList: round-trip untuk asersi.
 *
 * Kontrak: kedua list terurut naik menurut `val`; `null` untuk list kosong.
 *
 * Contoh output:
 * - mergeTwoLists(1→2→4, 1→3→4) → head berurutan nilai [1,1,2,3,4,4].
 *
 * Solusi: Pointer `cur`; bandingkan `l1.val` vs `l2.val`; atau rekursi pilih kepala lebih kecil.
 *
 * @see knowledge-base/05-coding-interview-v2/51-merge-two-sorted-lists.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/51-merge-two-sorted-lists/merge-two-sorted-lists.test.js`
 */

/**
 * Judul: Node singly linked list
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
 * Judul: Array angka → list (urutan sama)
 *
 * Soal test:
 * - `[]` → `null`; `[1,2]` → `1→2`.
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
 * Soal test:
 * - Round-trip dengan `arrayToList`.
 *
 * @param {ListNode | null} head
 * @returns {number[]}
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
 * Judul: Merge dua list terurut — iteratif (dummy head)
 *
 * Soal test:
 * - `list1=[1,2,4]`, `list2=[1,3,4]` → `[1,1,2,3,4,4]`.
 *
 * Contoh output:
 * - mergeTwoLists(…) → `listToArray` = `[1,1,2,3,4,4]`.
 *
 * Kontrak: input terurut naik; tidak mutasi node selain `next` pada hasil gabungan.
 *
 * Solusi: `pre` dummy; `p` tail; `l1`/`l2` advance.
 *
 * @param {ListNode | null} list1
 * @param {ListNode | null} list2
 * @returns {ListNode | null}
 */
export function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let p = dummy;
  let l1 = list1;
  let l2 = list2;
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      p.next = l1;
      l1 = l1.next;
    } else {
      p.next = l2;
      l2 = l2.next;
    }
    p = p.next;
  }
  p.next = l1 !== null ? l1 : l2;
  return dummy.next;
}

/**
 * Judul: Merge dua list — rekursif
 *
 * Soal test:
 * - Sama numerik dengan `mergeTwoLists` untuk contoh kecil.
 *
 * Contoh output:
 * - mergeTwoListsRecursive(1→2, 3→4) → `[1,2,3,4]`.
 *
 * Kontrak: sama; kedalaman rekursi = panjang gabungan (n kecil untuk latihan).
 *
 * Solusi: `return l1.val<=l2.val ? l1.next=merge(l1.next,l2) : ...`
 *
 * @param {ListNode | null} list1
 * @param {ListNode | null} list2
 * @returns {ListNode | null}
 */
export function mergeTwoListsRecursive(list1, list2) {
  if (list1 === null) return list2;
  if (list2 === null) return list1;
  if (list1.val <= list2.val) {
    list1.next = mergeTwoListsRecursive(list1.next, list2);
    return list1;
  }
  list2.next = mergeTwoListsRecursive(list1, list2.next);
  return list2;
}

/**
 * Judul: Bandingkan dua list sama nilai dan panjang
 *
 * Soal test:
 * - `[1,2]` vs `[1,2]` true; `[1]` vs `[2]` false.
 *
 * Kontrak: tidak siklus.
 *
 * Solusi: Walk paralel.
 *
 * @param {ListNode | null} a
 * @param {ListNode | null} b
 */
export function listsEqual(a, b) {
  let x = a;
  let y = b;
  while (x !== null && y !== null) {
    if (x.val !== y.val) return false;
    x = x.next;
    y = y.next;
  }
  return x === null && y === null;
}

/**
 * Judul: Panjang list
 *
 * Soal test:
 * - `null` → `0`; chain `1→2→3` → `3`.
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
