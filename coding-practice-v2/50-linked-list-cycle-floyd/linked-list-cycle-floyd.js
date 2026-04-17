/**
 * Judul: Topik 50 — Linked list cycle (Floyd)
 *
 * Soal test:
 * - hasCycle: tortoise & hare — ada siklus → true.
 * - cycleStartNode: node awal siklus (opsional) atau null.
 *
 * Kontrak: jika tidak ada siklus, `hasCycle` false.
 *
 * Solusi: `slow` satu langkah, `fast` dua langkah; meet ⇒ cycle; reset satu pointer ke head untuk start node.
 *
 * @see knowledge-base/05-coding-interview-v2/50-linked-list-cycle-floyd.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/50-linked-list-cycle-floyd/linked-list-cycle-floyd.test.js`
 */

/**
 * Judul: Node linked list (sama konsep dengan topik 49; didefinisikan ulang agar modul mandiri)
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
 * Judul: Deteksi siklus (Floyd)
 *
 * Soal test:
 * - List berputar ke belakang → `true`; linear → `false`.
 *
 * Kontrak: `head` boleh null.
 *
 * Solusi: Two pointers.
 *
 * @param {ListNode | null} head
 */
export function hasCycle(head) {
  if (head === null) return false;
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = /** @type {ListNode} */ (slow).next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

/**
 * Judul: Node mulai siklus (jika ada)
 *
 * Soal test:
 * - Siklus menuju indeks tertentu — node tersebut dikembalikan.
 *
 * Kontrak: jika `hasCycle` false → `null`.
 *
 * Solusi: Setelah meet, pindahkan `slow` ke `head`; sama langkah sampai bertemu.
 *
 * @param {ListNode | null} head
 * @returns {ListNode | null}
 */
export function cycleStartNode(head) {
  if (head === null) return null;
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = /** @type {ListNode} */ (slow).next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  if (fast === null || fast.next === null) return null;
  slow = head;
  while (slow !== fast) {
    slow = /** @type {ListNode} */ (slow).next;
    fast = /** @type {ListNode} */ (fast).next;
  }
  return slow;
}

/**
 * Judul: Panjang list sampai null (tanpa siklus) atau batas maksimum
 *
 * Soal test:
 * - List linear panjang 3 → `3`; dengan siklus melebihi `max` → `max`.
 *
 * Kontrak: `max` pengaman infinite loop.
 *
 * Solusi: Walk dengan counter.
 *
 * @param {ListNode | null} head
 * @param {number} [max]
 */
export function listLengthBounded(head, max = 1_000_000) {
  let n = 0;
  let cur = head;
  while (cur !== null && n < max) {
    n += 1;
    cur = cur.next;
  }
  return n;
}

/**
 * Judul: Panjang siklus jika Floyd menemukan meet (opsional)
 *
 * Soal test:
 * - List berputar panjang siklus L → fungsi mengembalikan L setelah meet.
 *
 * Kontrak: `hasCycle(head)` harus true; jika tidak → `0`.
 *
 * Solusi: Setelah temu slow=fast, advance satu pointer satu langkah per iterasi dengan counter.
 *
 * @param {ListNode | null} head
 */
export function cycleLengthIfExists(head) {
  if (head === null) return 0;
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = /** @type {ListNode} */ (slow).next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  if (fast === null || fast.next === null) return 0;
  let len = 0;
  let cur = /** @type {ListNode} */ (slow);
  do {
    cur = /** @type {ListNode} */ (cur.next);
    len += 1;
  } while (cur !== slow);
  return len;
}

/**
 * Judul: Apakah linked list palindrome nilai (tanpa mutasi struktur) — bonus dua pointer
 *
 * Soal test:
 * - `1->2->2->1` true; `1->2` false.
 *
 * Kontrak: n kecil; O(n) ruang array.
 *
 * Solusi: `listToArray` dua pointer — but we don't have listToArray here; build array walk.
 *
 * @param {ListNode | null} head
 */
export function isPalindromeValues(head) {
  /** @type {number[]} */
  const vals = [];
  let cur = head;
  while (cur !== null) {
    vals.push(cur.val);
    cur = cur.next;
  }
  let l = 0;
  let r = vals.length - 1;
  while (l < r) {
    if (vals[l] !== vals[r]) return false;
    l += 1;
    r -= 1;
  }
  return true;
}
