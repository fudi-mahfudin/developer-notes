/**
 * Judul: Topik 77 — Merge sort (stabil) dan Quick sort (Lomuto partition)
 *
 * Soal test eksplisit:
 * - mergeSort(arr): ascending; stabil untuk merge; tidak mutasi input asli (salin).
 * - quickSort(arr): in-place pada salinan; Lomuto partition.
 *
 * Kontrak (opsional): angka atau perbandingan default `<` untuk number; tidak memodifikasi `Array.prototype.sort`.
 *
 * Contoh output:
 * - [3,1,4,1,5] → [1,1,3,4,5].
 *
 * Solusi detail: merge = bagi dua + merge dua terurut; quick = pivot terakhir, partition, rekursi kiri/kanan.
 *
 * @see knowledge-base/05-coding-interview-v2/77-merge-sort-quick-sort.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/77-merge-sort-quick-sort/merge-sort-quick-sort.test.js`
 */

/**
 * Judul: Merge dua subarray terurut naik
 *
 * Soal test eksplisit:
 * - [1,3] + [2,4] → [1,2,3,4].
 *
 * Contoh output:
 * - Kosong + x → x.
 *
 * Solusi detail: dua pointer; push sisa.
 *
 * @param {number[]} left
 * @param {number[]} right
 * @returns {number[]}
 */
export function merge(left, right) {
  /** @type {number[]} */
  const out = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]);
    else out.push(right[j++]);
  }
  while (i < left.length) out.push(left[i++]);
  while (j < right.length) out.push(right[j++]);
  return out;
}

/**
 * Judul: Merge sort — return array baru terurut
 *
 * Soal test eksplisit:
 * - [] → []; satu elemen → sama.
 *
 * Contoh output:
 * - Stabil: jika sama, elemen kiri tetap lebih dulu (merge pakai <=).
 *
 * Solusi detail: split mid, mergeSort kiri/kanan, merge.
 *
 * @param {number[]} arr
 * @returns {number[]}
 */
export function mergeSort(arr) {
  if (arr.length <= 1) return arr.slice();
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

/**
 * Judul: Lomuto partition — pivot = arr[hi]; return index pivot final
 *
 * Soal test eksplisit:
 * - Semua lebih kecil dari pivot → pivot di akhir.
 *
 * @param {number[]} arr
 * @param {number} lo
 * @param {number} hi
 */
export function partitionLomuto(arr, lo, hi) {
  const pivot = arr[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i += 1;
    }
  }
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  return i;
}

/**
 * Judul: Quick sort — in-place pada salinan
 *
 * Soal test eksplisit:
 * - Hasil terurut sama dengan mergeSort untuk permutasi acak kecil.
 *
 * Kontrak (opsional): worst case O(n²) — tidak diuji worst case.
 *
 * Solusi detail: qsort(lo, hi); pivot di hi; rekursi [lo,p-1] dan [p+1,hi].
 *
 * @param {number[]} arr
 * @returns {number[]}
 */
export function quickSort(arr) {
  const a = arr.slice();
  /**
   * @param {number} lo
   * @param {number} hi
   */
  function qsort(lo, hi) {
    if (lo >= hi) return;
    const p = partitionLomuto(a, lo, hi);
    qsort(lo, p - 1);
    qsort(p + 1, hi);
  }
  if (a.length) qsort(0, a.length - 1);
  return a;
}

/**
 * Judul: Cek array terurut naik (helper)
 *
 * Soal test eksplisit:
 * - [1,2,2] → true.
 *
 * @param {number[]} arr
 */
export function isSortedNonDecreasing(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}
