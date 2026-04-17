/**
 * Judul: Topik 17 — Sliding window (fixed & variable)
 *
 * Soal test:
 * - maxSumSubarraySizeK: contoh enam elemen, k=3 → `9`.
 * - slidingWindowAverages: `[1,2,3,4]` k=2 → `[1.5, 2.5, 3.5]`.
 * - longestSubstringAtMostKDistinct: `"eceba"`, k=2 → panjang `3`.
 * - minSubarrayLenAtLeastSum: target `7` → panjang subarray minimal `2`.
 * - longestOnesAfterKFlips: contoh biner, k=2 flip → panjang `6`.
 *
 * Ringkasan soal:
 * - Jendela berukuran tetap `k`: jumlah / rata-rata / maksimum subarray.
 * - Jendela variabel dengan invariant (misalnya paling banyak `k` karakter berbeda).
 *
 * Solusi: Geser `left`/`right`; untuk fixed window perbarui akumulasi O(1) saat slide; untuk variable
 * sesuaikan `left` saat invariant dilanggar.
 *
 * @see knowledge-base/05-coding-interview-v2/17-sliding-window.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * @param {number} k
 * @param {number} n
 */
function assertValidWindow(k, n) {
  if (!Number.isInteger(k) || k <= 0) {
    throw new RangeError("k must be a positive integer");
  }
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError("n must be a non-negative integer");
  }
  if (k > n) {
    throw new RangeError("k cannot exceed array length");
  }
}

/**
 * Judul: Jumlah maksimum subarray berukuran `k`
 *
 * Soal test:
 * - `maxSumSubarraySizeK([2, 1, 5, 1, 3, 2], 3)` → `9`.
 *
 * Ringkasan soal:
 * - Array angka; cari jumlah `k` elemen berurutan terbesar.
 *
 * Kontrak: `nums` finite numbers; `k` sesuai `assertValidWindow`.
 *
 * Solusi: Pertama jumlahkan `[0,k)`; slide: `sum += nums[i] - nums[i-k]`.
 *
 * @param {number[]} nums
 * @param {number} k
 */
export function maxSumSubarraySizeK(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  assertValidWindow(k, nums.length);
  let sum = 0;
  for (let i = 0; i < k; i++) {
    const x = nums[i];
    if (typeof x !== "number" || !Number.isFinite(x)) {
      throw new TypeError("elements must be finite numbers");
    }
    sum += x;
  }
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    const x = nums[i];
    if (typeof x !== "number" || !Number.isFinite(x)) {
      throw new TypeError("elements must be finite numbers");
    }
    sum += x - nums[i - k];
    best = Math.max(best, sum);
  }
  return best;
}

/**
 * Judul: Rata-rata subarray ukuran `k` — sliding
 *
 * Soal test:
 * - `slidingWindowAverages([1, 2, 3, 4], 2)` mengembalikan `[1.5, 2.5, 3.5]`.
 *
 * Ringkasan soal:
 * - Kembalikan array rata-rata untuk setiap posisi jendela.
 *
 * Kontrak: sama seperti fixed window; `nums.length >= k`.
 *
 * Solusi: Sama seperti max sum tetapi bagi `k`.
 *
 * @param {number[]} nums
 * @param {number} k
 * @returns {number[]}
 */
export function slidingWindowAverages(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  assertValidWindow(k, nums.length);
  const out = [];
  let sum = 0;
  for (let i = 0; i < k; i++) {
    const x = nums[i];
    if (typeof x !== "number" || !Number.isFinite(x)) {
      throw new TypeError("elements must be finite numbers");
    }
    sum += x;
  }
  out.push(sum / k);
  for (let i = k; i < nums.length; i++) {
    const x = nums[i];
    if (typeof x !== "number" || !Number.isFinite(x)) {
      throw new TypeError("elements must be finite numbers");
    }
    sum += x - nums[i - k];
    out.push(sum / k);
  }
  return out;
}

/**
 * Judul: Panjang substring terpanjang dengan paling banyak `k` karakter berbeda
 *
 * Soal test:
 * - `longestSubstringAtMostKDistinct("eceba", 2)` → `3`.
 *
 * Ringkasan soal:
 * - Jendela variabel: perbesar `right`, perkecil `left` jika distinct > `k`.
 *
 * Kontrak: `s` string; `k` bilangan bulat non-negatif.
 *
 * Solusi: `Map` frekuensi karakter; hitung `distinct`; update panjang maksimum.
 *
 * @param {string} s
 * @param {number} k
 */
export function longestSubstringAtMostKDistinct(s, k) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  if (!Number.isInteger(k) || k < 0) throw new RangeError("k must be non-negative integer");
  if (k === 0) return 0;
  /** @type {Map<string, number>} */
  const freq = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
    while (freq.size > k) {
      const leftCh = s[left];
      const c = /** @type {number} */ (freq.get(leftCh)) - 1;
      if (c === 0) freq.delete(leftCh);
      else freq.set(leftCh, c);
      left += 1;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}

/**
 * Judul: Subarray terpendek dengan jumlah ≥ `target` (bilangan positif)
 *
 * Soal test:
 * - `minSubarrayLenAtLeastSum([2, 3, 1, 2, 4, 3], 7)` → `2`.
 *
 * Ringkasan soal:
 * - Varian sliding window: perbesar sampai sum ≥ target, perkecil dari kiri untuk minimalkan panjang.
 *
 * Kontrak: `nums` positif (untuk invariant monoton); `target` > 0.
 *
 * Solusi: Dua pointer; `sum` akumulasi.
 *
 * @param {number[]} nums
 * @param {number} target
 */
export function minSubarrayLenAtLeastSum(nums, target) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (typeof target !== "number" || !Number.isFinite(target) || target <= 0) {
    throw new RangeError("target must be finite and positive");
  }
  let left = 0;
  let sum = 0;
  let best = Infinity;
  for (let right = 0; right < nums.length; right++) {
    const x = nums[right];
    if (typeof x !== "number" || !Number.isFinite(x) || x <= 0) {
      throw new RangeError("nums must be positive finite numbers");
    }
    sum += x;
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left];
      left += 1;
    }
  }
  return best === Infinity ? 0 : best;
}

/**
 * Judul: Maksimum bilangan 1 berurutan setelah mengubah paling banyak `k` buah 0 menjadi 1
 *
 * Soal test:
 * - `longestOnesAfterKFlips([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)` → `6`.
 *
 * Ringkasan soal:
 * - Sliding window dengan paling banyak `k` nol di dalam jendela.
 *
 * Kontrak: `nums` berisi 0 atau 1; `k` non-negative integer.
 *
 * Solusi: Hitung `zeros` di window; geser `left` jika `zeros > k`.
 *
 * @param {number[]} nums
 * @param {number} k
 */
export function longestOnesAfterKFlips(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (!Number.isInteger(k) || k < 0) throw new RangeError("k must be non-negative integer");
  let left = 0;
  let zeros = 0;
  let best = 0;
  for (let right = 0; right < nums.length; right++) {
    const x = nums[right];
    if (x !== 0 && x !== 1) throw new RangeError("elements must be 0 or 1");
    if (x === 0) zeros += 1;
    while (zeros > k) {
      if (nums[left] === 0) zeros -= 1;
      left += 1;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
