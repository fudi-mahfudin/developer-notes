/**
 * Judul: Topik 22 — Rotasi array dan teknik reversal
 *
 * Soal test:
 * - rotateRightCopy: `[1,2,3,4,5]` kanan 2 → `[4,5,1,2,3]`; `k` negatif dinormalisasi.
 * - rotateRightInPlace: triple reverse — hasil sama dengan copy untuk kasus uji.
 * - rotateLeftCopy: rotasi kiri untuk melengkapi API enterprise.
 *
 * Ringkasan soal:
 * - Rotasi siklis: normalisasi `k % n`; salinan O(n) ruang atau reversal in-place O(1) ekstra.
 *
 * Solusi: Triple reverse untuk kanan: reverse all, reverse [0..k-1], reverse [k..n-1].
 *
 * @see knowledge-base/05-coding-interview-v2/22-array-rotation-reversal.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/22-array-rotation-reversal/array-rotation-reversal.test.js`
 */

/**
 * Judul: Normalisasi langkah rotasi
 *
 * Soal test:
 * - `k = 7`, `n = 5` → efektif `2` (kanan).
 *
 * Ringkasan soal:
 * - Hindari putaran penuh berulang.
 *
 * Kontrak: `n` integer ≥ 0; `k` integer sembarang.
 *
 * Solusi: `((k % n) + n) % n`.
 *
 * @param {number} k
 * @param {number} n
 */
function normalizeK(k, n) {
  if (n === 0) return 0;
  if (!Number.isInteger(k)) throw new RangeError("k must be integer");
  return ((k % n) + n) % n;
}

/**
 * Judul: Balik rentang in-place
 *
 * Soal test:
 * - Dipakai oleh `rotateRightInPlace`; tidak diekspor ke tes langsung.
 *
 * Ringkasan soal:
 * - Dua pointer menuju tengah.
 *
 * Kontrak: `lo`, `hi` indeks valid; `lo <= hi`.
 *
 * Solusi: While swap.
 *
 * @param {unknown[]} arr
 * @param {number} lo
 * @param {number} hi
 */
export function reverseRange(arr, lo, hi) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  if (!Number.isInteger(lo) || !Number.isInteger(hi)) throw new RangeError("indices must be integers");
  let i = lo;
  let j = hi;
  while (i < j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    i += 1;
    j -= 1;
  }
}

/**
 * Judul: Rotasi ke kanan — salinan baru
 *
 * Soal test:
 * - `rotateRightCopy([1,2,3,4,5], 2)` → `[4,5,1,2,3]`; array asal tidak berubah.
 *
 * Ringkasan soal:
 * - Indeks baru: `(i + k) % n` untuk elemen di `i` setelah normalisasi `k` — rumus setara dengan shift.
 *
 * Kontrak: `nums` array; `k` integer; elemen disalin by reference (shallow).
 *
 * Solusi: Loop isi `out[(i+k)%n] = nums[i]` setelah `k = normalizeK(k,n)`.
 *
 * @template T
 * @param {T[]} nums
 * @param {number} k
 * @returns {T[]}
 */
export function rotateRightCopy(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  const n = nums.length;
  if (n === 0) return [];
  const kk = normalizeK(k, n);
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    out[(i + kk) % n] = nums[i];
  }
  return out;
}

/**
 * Judul: Rotasi ke kanan — in-place (void)
 *
 * Soal test:
 * - Setelah panggilan, array sama dengan `rotateRightCopy` untuk data uji.
 *
 * Ringkasan soal:
 * - Triple reverse pada salinan yang sama dengan pseudocode klasik.
 *
 * Kontrak: mutasi `nums`; panjang 0 no-op.
 *
 * Solusi: `reverse all`, `reverse 0..k-1`, `reverse k..n-1`.
 *
 * @template T
 * @param {T[]} nums
 * @param {number} k
 */
export function rotateRightInPlace(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  const n = nums.length;
  if (n <= 1) return;
  const kk = normalizeK(k, n);
  if (kk === 0) return;
  reverseRange(nums, 0, n - 1);
  reverseRange(nums, 0, kk - 1);
  reverseRange(nums, kk, n - 1);
}

/**
 * Judul: Rotasi ke kiri — salinan baru
 *
 * Soal test:
 * - `rotateLeftCopy([1,2,3,4,5], 2)` → `[3,4,5,1,2]`.
 *
 * Ringkasan soal:
 * - Setara rotasi kanan dengan `n - (k mod n)` langkah.
 *
 * Kontrak: sama seperti `rotateRightCopy`.
 *
 * Solusi: Delegasi `rotateRightCopy(nums, -k)` atau `normalizeK` kiri.
 *
 * @template T
 * @param {T[]} nums
 * @param {number} k
 * @returns {T[]}
 */
export function rotateLeftCopy(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  const n = nums.length;
  if (n === 0) return [];
  const kk = normalizeK(k, n);
  return rotateRightCopy(nums, n - kk);
}
