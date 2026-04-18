/**
 * Judul: Topik 47 — Sliding window maximum (deque / monotonic)
 *
 * Soal test:
 * - maxSlidingWindow: untuk setiap jendela ukuran `k`, nilai maksimum — contoh klasik.
 *
 * Kontrak: `nums.length >= k >= 1`; deque simpan indeks monoton decreasing values.
 *
 * Solusi: Indeks di deque; pop back while smaller than incoming; pop front if out of window.
 *
 * @see knowledge-base/05-coding-interview-v2/47-deque-sliding-window-max.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/47-deque-sliding-window-max/deque-sliding-window-max.test.js`
 */

/**
 * Judul: Sliding window maximum
 *
 * Soal test:
 * - `[1,3,-1,-3,5,3,6,7]`, `k=3` → `[3,3,5,5,6,7]`.
 *
 * Kontrak: `nums` finite numbers.
 *
 * Solusi: Monotonic deque of indices (decreasing values).
 *
 * @param {number[]} nums
 * @param {number} k
 * @returns {number[]}
 */
export function maxSlidingWindow(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (!Number.isInteger(k) || k < 1 || k > nums.length) {
    throw new RangeError("k must be integer in [1, nums.length]");
  }
  /** @type {number[]} */
  const dq = [];
  /** @type {number[]} */
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (typeof x !== "number" || !Number.isFinite(x)) throw new TypeError("finite numbers only");
    while (dq.length > 0 && nums[dq[dq.length - 1]] <= x) dq.pop();
    dq.push(i);
    if (dq[0] <= i - k) dq.shift();
    if (i >= k - 1) out.push(nums[dq[0]]);
  }
  return out;
}

/**
 * Judul: Sliding window minimum (deque monoton naik)
 *
 * Soal test:
 * - `[1,3,-1,-3,5,3]`, k=3 → `[ -3, -3, -3, 3]` (min per window).
 *
 * Kontrak: analog `maxSlidingWindow`.
 *
 * Solusi: Symmetric — pop while `>=` incoming untuk min.
 *
 * @param {number[]} nums
 * @param {number} k
 * @returns {number[]}
 */
export function minSlidingWindow(nums, k) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (!Number.isInteger(k) || k < 1 || k > nums.length) {
    throw new RangeError("k must be integer in [1, nums.length]");
  }
  /** @type {number[]} */
  const dq = [];
  /** @type {number[]} */
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    if (typeof x !== "number" || !Number.isFinite(x)) throw new TypeError("finite numbers only");
    while (dq.length > 0 && nums[dq[dq.length - 1]] >= x) dq.pop();
    dq.push(i);
    if (dq[0] <= i - k) dq.shift();
    if (i >= k - 1) out.push(nums[dq[0]]);
  }
  return out;
}

/**
 * Judul: Jumlah maksimum dalam jendela — alias dokumentasi
 *
 * Soal test:
 * - Delegasi ke `maxSlidingWindow`.
 *
 * @param {number[]} nums
 * @param {number} k
 */
export function maxInEachWindow(nums, k) {
  return maxSlidingWindow(nums, k);
}

/**
 * Judul: Verifikasi konsistensi — max ≥ min di setiap indeks jendela
 *
 * Soal test:
 * - Untuk setiap `i`, `maxSlidingWindow[i] >= minSlidingWindow[i]`.
 *
 * Kontrak: `nums`, `k` valid.
 *
 * Solusi: Dua panggilan — hanya untuk asersi integrasi.
 *
 * @param {number[]} nums
 * @param {number} k
 */
export function assertMaxGeMinPerWindow(nums, k) {
  const mx = maxSlidingWindow(nums, k);
  const mn = minSlidingWindow(nums, k);
  for (let i = 0; i < mx.length; i++) {
    if (mx[i] < mn[i]) throw new RangeError("max < min");
  }
}
