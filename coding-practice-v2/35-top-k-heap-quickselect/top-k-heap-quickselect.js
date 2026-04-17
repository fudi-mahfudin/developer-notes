/**
 * Judul: Topik 35 — Top K (heap / quickselect)
 *
 * Soal test:
 * - topKSmallest: `k` elemen terkecil (heap max ukuran k atau sort slice).
 * - quickSelectKth: elemen ke-k terkecil (1-indexed) — median kasus rata-rata O(n).
 *
 * Kontrak: array finite number; `k` valid.
 *
 * Solusi: `topK` via sort O(n log n) atau heap; quickselect Lomuto/partition.
 *
 * @see knowledge-base/05-coding-interview-v2/35-top-k-heap-quickselect.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/35-top-k-heap-quickselect/top-k-heap-quickselect.test.js`
 */

/**
 * Judul: Partition — Lomuto
 *
 * Soal test:
 * - Dipakai internal `quickSelectKth`; pivot akhir range.
 *
 * Kontrak: `lo`, `hi` indeks valid.
 *
 * Solusi: Klasik.
 *
 * @param {number[]} arr
 * @param {number} lo
 * @param {number} hi
 */
function partition(arr, lo, hi) {
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
 * Judul: Elemen ke-k terkecil (1-indexed)
 *
 * Soal test:
 * - `[3,2,1,5,6,4]`, k=2 → `2` (elemen kedua terkecil).
 *
 * Kontrak: `nums` non-kosong; `k` integer 1..`nums.length`; **mutasi** array input (salin di pemanggil jika perlu).
 *
 * Solusi: Quickselect pada salinan — di sini salin internal agar API murni.
 *
 * @param {number[]} nums
 * @param {number} k
 */
export function quickSelectKth(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (nums.length === 0) throw new RangeError("nums must be non-empty");
  if (!Number.isInteger(k) || k < 1 || k > nums.length) {
    throw new RangeError("k must be integer in [1, nums.length]");
  }
  const arr = nums.slice();
  for (const x of arr) {
    if (typeof x !== "number" || !Number.isFinite(x)) throw new TypeError("elements must be finite numbers");
  }
  let lo = 0;
  let hi = arr.length - 1;
  const target = k - 1;
  while (lo <= hi) {
    const p = partition(arr, lo, hi);
    if (p === target) return arr[p];
    if (p < target) lo = p + 1;
    else hi = p - 1;
  }
  throw new Error("unreachable");
}

/**
 * Judul: K elemen terkecil — terurut naik
 *
 * Soal test:
 * - `topKSmallest([4,1,3,2], 2)` → `[1,2]` (urutan sorted).
 *
 * Kontrak: tidak mutasi input asli (salin sort).
 *
 * Solusi: Sort penuh O(n log n); ambil `k` pertama.
 *
 * @param {number[]} nums
 * @param {number} k
 * @returns {number[]}
 */
export function topKSmallest(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (!Number.isInteger(k) || k < 0 || k > nums.length) {
    throw new RangeError("k must be integer in [0, nums.length]");
  }
  const copy = [...nums];
  for (const x of copy) {
    if (typeof x !== "number" || !Number.isFinite(x)) throw new TypeError("elements must be finite numbers");
  }
  copy.sort((a, b) => a - b);
  return copy.slice(0, k);
}
