/**
 * Judul: Topik 25 — Permutasi & kombinasi (pengantar backtracking)
 *
 * Soal test:
 * - permuteDistinct: semua permutasi elemen unik; urutan lex sesuai DFS.
 * - combinationsRange: pilih `k` bilangan dari `1..n` (kombinasi matematika).
 * - binomialCoefficient: `C(n,k)` dengan DP Pascal / perkalian.
 *
 * Ringkasan soal:
 * - Permutasi: urutan penting; kombinasi: subset ukuran k tanpa urutan (generate dengan `start` indeks naik).
 *
 * Solusi: Backtracking + `path.slice()` saat push hasil; kombinasi `dfs(start)`.
 *
 * @see knowledge-base/05-coding-interview-v2/25-permutation-combination-intro.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/25-permutation-combination-intro/permutation-combination-intro.test.js`
 */

/**
 * Judul: Semua permutasi (elemen unik)
 *
 * Soal test:
 * - `permuteDistinct([1,2,3])` panjang `6` dan memuat `[3,2,1]`.
 *
 * Ringkasan soal:
 * - `n!` hasil; hindari mutasi array hasil bersama.
 *
 * Kontrak: `nums` elemen unik (per `===`); panjang kecil untuk kompleksitas wajar.
 *
 * Solusi: DFS + `used` boolean array.
 *
 * @template T
 * @param {T[]} nums
 * @returns {T[][]}
 */
export function permuteDistinct(nums) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  const n = nums.length;
  /** @type {T[][]} */
  const res = [];
  /** @type {T[]} */
  const path = [];
  const used = new Array(n).fill(false);
  function dfs() {
    if (path.length === n) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < n; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  }
  dfs();
  return res;
}

/**
 * Judul: Kombinasi — pilih `k` dari bilangan 1..n
 *
 * Soal test:
 * - `combinationsRange(4, 2)` memuat `[1,2]` dan `[3,4]`; panjang `C(4,2)=6`.
 *
 * Ringkasan soal:
 * - Setiap kombinasi terurut naik — menghindari duplikat urutan.
 *
 * Kontrak: `n >= 1`, `1 <= k <= n`, integer.
 *
 * Solusi: `dfs(start)` loop dari `start` sampai `n`.
 *
 * @param {number} n
 * @param {number} k
 * @returns {number[][]}
 */
export function combinationsRange(n, k) {
  if (!Number.isInteger(n) || n < 1) throw new RangeError("n must be positive integer");
  if (!Number.isInteger(k) || k < 1 || k > n) throw new RangeError("k must be integer in [1, n]");
  /** @type {number[][]} */
  const res = [];
  /** @type {number[]} */
  const path = [];
  function dfs(start) {
    if (path.length === k) {
      res.push(path.slice());
      return;
    }
    const need = k - path.length;
    for (let i = start; i <= n - need + 1; i++) {
      path.push(i);
      dfs(i + 1);
      path.pop();
    }
  }
  dfs(1);
  return res;
}

/**
 * Judul: Koefisien binomial C(n, k)
 *
 * Soal test:
 * - `C(5,2)=10`, `C(5,0)=1`, `C(5,5)=1`.
 *
 * Ringkasan soal:
 * - Identitas Pascal; gunakan bigint untuk besar (di sini number aman untuk n kecil).
 *
 * Kontrak: integer 0 <= k <= n.
 *
 * Solusi: `res = res * (n-i) / (i+1)` iteratif menghindari overflow sebisa mungkin.
 *
 * @param {number} n
 * @param {number} k
 */
export function binomialCoefficient(n, k) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n must be non-negative integer");
  if (!Number.isInteger(k) || k < 0 || k > n) throw new RangeError("k must be integer in [0, n]");
  if (k > n - k) k = n - k;
  let res = 1;
  for (let i = 0; i < k; i++) {
    res = (res * (n - i)) / (i + 1);
  }
  return res;
}

/**
 * Judul: Permutasi dengan duplikat — hasil unik
 *
 * Soal test:
 * - `permuteWithDup([1,1,2])` panjang `3` (bukan 6).
 *
 * Ringkasan soal:
 * - Sort dulu; skip elemen sama di posisi yang sama pada level DFS.
 *
 * Kontrak: `nums` array angka finite.
 *
 * Solusi: Sort; `if (i > 0 && nums[i]===nums[i-1] && !used[i-1]) continue` klasik.
 *
 * @param {number[]} nums
 * @returns {number[][]}
 */
export function permuteWithDup(nums) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  const sorted = [...nums].sort((a, b) => a - b);
  const n = sorted.length;
  /** @type {number[][]} */
  const res = [];
  /** @type {number[]} */
  const path = [];
  const used = new Array(n).fill(false);
  function dfs() {
    if (path.length === n) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < n; i++) {
      if (used[i]) continue;
      if (i > 0 && sorted[i] === sorted[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      path.push(sorted[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  }
  dfs();
  return res;
}
