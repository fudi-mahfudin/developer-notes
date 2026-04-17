/**
 * Judul: Topik 20 — Binary search pada array terurut
 *
 * Soal test:
 * - `lowerBound`/`upperBound` pada `[1,2,2,2,3,5]` dengan target `2`; `binarySearchIndex` ketemu/tidak;
 *   `searchInsert([1,3,5],4)`; `countOccurrencesSorted` untuk duplikat; `closestValueSorted`; minimum
 *   array terrotasi.
 *
 * Ringkasan soal:
 * - Pencarian biner pada array **non-decreasing** (boleh duplikat).
 * - `lowerBound` (first >= target), `upperBound` (first > target), `searchInsert`.
 *
 * Solusi: Invariant `lo`/`hi` atau `left`/`right` dengan mid; hindari overflow `mid = lo + ((hi-lo)>>1)`.
 *
 * @see knowledge-base/05-coding-interview-v2/20-binary-search-sorted-array.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Pastikan array terurut non-menurun
 *
 * Soal test:
 * - Semua kasus uji memakai array non-decreasing; jika prekondisi dilanggar, pemanggilan API yang
 *   memakai `assertSortedNonDecreasing` harus melempar `RangeError`.
 *
 * Ringkasan soal:
 * - Prekondisi untuk API pencarian biner.
 *
 * Kontrak: `arr` array finite numbers.
 *
 * Solusi: Scan linear O(n).
 *
 * @param {number[]} arr
 */
export function assertSortedNonDecreasing(arr) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  for (let i = 1; i < arr.length; i++) {
    const a = arr[i - 1];
    const b = arr[i];
    if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b)) {
      throw new TypeError("elements must be finite numbers");
    }
    if (a > b) {
      throw new RangeError("array must be sorted non-decreasing");
    }
  }
}

/**
 * Judul: Lower bound — indeks pertama `arr[i] >= target`
 *
 * Soal test:
 * - `describe("lowerBound / upperBound")`: `arr = [1,2,2,2,3,5]`; `lowerBound(arr, 2) === 1`.
 *
 * Ringkasan soal:
 * - Jika semua `< target`, kembalikan `length`.
 *
 * Kontrak: `arr` terurut non-menurun; `target` finite.
 *
 * Solusi: Biner `left` inclusive, `right` exclusive.
 *
 * @param {number[]} arr
 * @param {number} target
 */
export function lowerBound(arr, target) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  if (typeof target !== "number" || !Number.isFinite(target)) {
    throw new RangeError("target must be finite");
  }
  assertSortedNonDecreasing(arr);
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * Judul: Upper bound — indeks pertama `arr[i] > target`
 *
 * Soal test:
 * - Sama seperti `lowerBound`: `upperBound(arr, 2) === 4` pada `arr` berisi tiga `2` berturut-turut.
 *
 * Ringkasan soal:
 * - Setara dengan lower bound untuk `target + epsilon` pada integer bisa diaproksimasi dengan
 *   `> target`; implementasi langsung dengan `arr[mid] <= target`.
 *
 * Kontrak: sama seperti `lowerBound`.
 *
 * Solusi: Biner.
 *
 * @param {number[]} arr
 * @param {number} target
 */
export function upperBound(arr, target) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  if (typeof target !== "number" || !Number.isFinite(target)) {
    throw new RangeError("target must be finite");
  }
  assertSortedNonDecreasing(arr);
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * Judul: Binary search — kembalikan indeks atau `-1`
 *
 * Soal test:
 * - `binarySearchIndex(arr, 3) === 4`; `binarySearchIndex(arr, 4) === -1` pada array terurut yang sama.
 *
 * Ringkasan soal:
 * - Klasik: `target` ada atau tidak.
 *
 * Kontrak: array terurut.
 *
 * Solusi: `lowerBound` lalu cek `arr[i]===target`.
 *
 * @param {number[]} arr
 * @param {number} target
 */
export function binarySearchIndex(arr, target) {
  const i = lowerBound(arr, target);
  if (i !== arr.length && arr[i] === target) return i;
  return -1;
}

/**
 * Judul: Search insert position (LeetCode 35)
 *
 * Soal test:
 * - `searchInsert([1, 3, 5], 4) === 2` (sisip antara `3` dan `5`).
 *
 * Ringkasan soal:
 * - Indeks tempat `target` harus disisipkan agar tetap terurut.
 *
 * Kontrak: sama seperti lower bound.
 *
 * Solusi: Setara `lowerBound`.
 *
 * @param {number[]} arr
 * @param {number} target
 */
export function searchInsert(arr, target) {
  return lowerBound(arr, target);
}

/**
 * Judul: Hitung frekuensi `target` dalam array terurut
 *
 * Soal test:
 * - `countOccurrencesSorted([1,2,2,2,3,5], 2) === 3`.
 *
 * Ringkasan soal:
 * - `upperBound - lowerBound` pada array dengan duplikat.
 *
 * Kontrak: array terurut.
 *
 * Solusi: Dua panggilan biner.
 *
 * @param {number[]} arr
 * @param {number} target
 */
export function countOccurrencesSorted(arr, target) {
  return upperBound(arr, target) - lowerBound(arr, target);
}

/**
 * Judul: Nilai terdekat (absolute) — linear dari kandidat biner
 *
 * Soal test:
 * - `closestValueSorted([1, 3, 5], 4) === 3` (lebih dekat ke `3` daripada ke `5`).
 *
 * Ringkasan soal:
 * - Cari elemen yang paling dekat ke `target` (bisa dua kandidat di sekitar lower bound).
 *
 * Kontrak: `arr` non-kosong, terurut.
 *
 * Solusi: `i = lowerBound`; bandingkan `i` dan `i-1`.
 *
 * @param {number[]} arr
 * @param {number} target
 */
export function closestValueSorted(arr, target) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new RangeError("arr must be non-empty array");
  }
  assertSortedNonDecreasing(arr);
  let i = lowerBound(arr, target);
  if (i === 0) return arr[0];
  if (i === arr.length) return arr[arr.length - 1];
  const before = arr[i - 1];
  const after = arr[i];
  return target - before <= after - target ? before : after;
}

/**
 * Judul: Rotasi array — cari minimum (tanpa duplikat)
 *
 * Soal test:
 * - `findMinRotatedSorted([3, 4, 5, 1, 2]) === 1` (nilai minimum setelah rotasi).
 *
 * Ringkasan soal:
 * - Array yang dirotasi tetap terurut per segmen; cari indeks minimum.
 *
 * Kontrak: `nums` hasil rotasi array terurut ascending unik.
 *
 * Solusi: Bandingkan `mid` dengan `right` untuk memutus sisi.
 *
 * @param {number[]} nums
 */
export function findMinRotatedSorted(nums) {
  if (!Array.isArray(nums) || nums.length === 0) {
    throw new RangeError("nums must be non-empty");
  }
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}
