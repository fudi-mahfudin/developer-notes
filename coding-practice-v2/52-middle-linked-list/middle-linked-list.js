/**
 * Judul: Topik 52 — Middle of linked list (fast/slow, variasi definisi tengah)
 *
 * Soal test eksplisit:
 * - middleNode: panjang ganjil → satu node tengah; panjang genap → node **kanan** dari dua tengah (konvensi LeetCode 876).
 * - findMiddleLeft: panjang genap → node **kiri** dari dua tengah (varian wawancara).
 * - deleteMiddleLeftMiddle: hapus “left middle” pada list panjang ≥2.
 *
 * Kontrak (opsional): tidak ada siklus; `null` head → semua API mengembalikan `null` atau 0 panjang sesuai nama.
 *
 * Contoh output:
 * - `[1,2,3,4,5]` + middleNode → `val === 3`.
 * - `[1,2,3,4]` + middleNode → `val === 3`; + findMiddleLeft → `val === 2`.
 *
 * Solusi: dua pointer `slow`/`fast`; untuk left-middle, `fast` berhenti sebelum tail genap; untuk hapus, dummy + prev.
 *
 * @see knowledge-base/05-coding-interview-v2/52-middle-linked-list.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/52-middle-linked-list/middle-linked-list.test.js`
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
 * Soal test:
 * - `arrayToList([1,2,3])` → `listToArray` → `[1,2,3]`; `[]` → `null`.
 *
 * Kontrak (opsional): input array angka; throw jika bukan array.
 *
 * Contoh output:
 * - `[4,5]` → head `val` 4, tail 5.
 *
 * Solusi: satu pass, sambung `next` berurutan.
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
 * Soal test:
 * - Round-trip dengan `arrayToList`; `null` → `[]`.
 *
 * Contoh output:
 * - `1→2→3` → `[1,2,3]`.
 *
 * Solusi: while cur, push val.
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
 * Judul: Middle node — fast/slow pointer
 *
 * Soal test:
 * - `[1,2,3,4,5]` → node `val` 3 (indeks 2).
 * - `[1,2,3,4]` → node `val` 3 (dua tengah: pilih kanan).
 *
 * Contoh output:
 * - middleNode(1→2→3→4→5) → `val === 3`.
 *
 * Kontrak: `head` null → `null`.
 *
 * Solusi: `slow` maju 1, `fast` maju 2; saat `fast` habis, `slow` tengah.
 *
 * @param {ListNode | null} head
 * @returns {ListNode | null}
 */
export function middleNode(head) {
  if (head === null) return null;
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

/**
 * Judul: Panjang list
 *
 * Soal test:
 * - `null` → 0; chain panjang 5 → 5.
 *
 * @param {ListNode | null} head
 */
export function lengthList(head) {
  let n = 0;
  let cur = head;
  while (cur !== null) {
    n += 1;
    cur = cur.next;
  }
  return n;
}

/**
 * Judul: Middle dengan indeks eksplisit (satu pass count)
 *
 * Soal test:
 * - Panjang 5 → indeks 2; panjang 4 → indeks 1 (left middle).
 *
 * Contoh output:
 * - findMiddleLeft(1→2→3→4) → `val === 2`.
 *
 * Kontrak: tidak mengubah list.
 *
 * Solusi: Hitung `n`, lalu jalan `floor((n-1)/2)`.
 *
 * @param {ListNode | null} head
 * @returns {ListNode | null}
 */
export function findMiddleLeft(head) {
  if (head === null) return null;
  const n = lengthList(head);
  const steps = Math.floor((n - 1) / 2);
  let cur = head;
  for (let i = 0; i < steps; i++) cur = cur.next;
  return cur;
}

/**
 * Judul: Nilai middle node (middleNode LeetCode)
 *
 * Soal test:
 * - `[1,2,3,4,5]` → `3`.
 *
 * @param {ListNode | null} head
 */
export function middleValue(head) {
  const m = middleNode(head);
  return m === null ? null : m.val;
}

/**
 * Judul: Hapus middle node (tanpa head dummy)
 *
 * Soal test:
 * - `[1,2,3,4]` → hapus `2` atau `3` tergantung definisi; di sini hapus **left middle** (nilai 2).
 *
 * Contoh output:
 * - deleteMiddleLeftMiddle([1,2,3,4]) → `[1,3,4]`.
 *
 * Kontrak: panjang ≤1 → `null` (list kosong/satu node dihapus).
 *
 * Solusi: Temukan prev dari `findMiddleLeft` dengan dua pointer atau scan.
 *
 * @param {ListNode | null} head
 * @returns {ListNode | null}
 */
export function deleteMiddleLeftMiddle(head) {
  if (head === null || head.next === null) return null;
  const dummy = new ListNode(0, head);
  let slow = head;
  let fast = head;
  let prev = dummy;
  while (fast.next !== null && fast.next.next !== null) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }
  prev.next = slow.next;
  return dummy.next;
}
