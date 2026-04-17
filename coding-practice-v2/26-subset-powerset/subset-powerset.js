/**
 * Judul: Topik 26 — Subset / powerset
 *
 * Soal test:
 * - allSubsetsBacktrack: `2^n` subset untuk array kecil; urutan bisa mengikuti DFS.
 * - allSubsetsBitmask: hasil sama sebagai multiset (sort bandingkan).
 * - subsetSumExists: decision subset sum (tanpa enumerasi penuh untuk n besar kecil).
 *
 * Ringkasan soal:
 * - Powerset = semua subset termasuk kosong; bitmask atau backtracking `take/skip`.
 *
 * Solusi: DFS `i` elemen: cabang tanpa `nums[i]` / dengan `nums[i]`; bitmask `mask` 0..2^n-1.
 *
 * @see knowledge-base/05-coding-interview-v2/26-subset-powerset.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/26-subset-powerset/subset-powerset.test.js`
 */

/**
 * Judul: Powerset — backtracking
 *
 * Soal test:
 * - `[1,2]` → `[[], [2], [1], [1,2]]` (urutan pasti sesuai implementasi DFS).
 *
 * Ringkasan soal:
 * - Waktu O(n·2^n) untuk materialisasi.
 *
 * Kontrak: `nums` panjang ≤ 20 untuk praktik; elemen disalin by reference.
 *
 * Solusi: Rekursi `dfs(i)` dengan `i === n` push `path.slice()`.
 *
 * @template T
 * @param {T[]} nums
 * @returns {T[][]}
 */
export function allSubsetsBacktrack(nums) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  /** @type {T[][]} */
  const res = [];
  /** @type {T[]} */
  const path = [];
  function dfs(i) {
    if (i === nums.length) {
      res.push(path.slice());
      return;
    }
    dfs(i + 1);
    path.push(nums[i]);
    dfs(i + 1);
    path.pop();
  }
  dfs(0);
  return res;
}

/**
 * Judul: Powerset — enumerasi bitmask
 *
 * Soal test:
 * - Untuk input yang sama dengan backtrack, multiset subset (sort + JSON) sama.
 *
 * Ringkasan soal:
 * - `mask` dari `0` sampai `2^n-1`; bit `i` = ambil `nums[i]`.
 *
 * Kontrak: `n` tidak terlalu besar (memori eksponensial pada output).
 *
 * Solusi: `if (mask & (1<<i))` kumpulkan elemen.
 *
 * @template T
 * @param {T[]} nums
 * @returns {T[][]}
 */
export function allSubsetsBitmask(nums) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  const n = nums.length;
  const total = 1 << n;
  /** @type {T[][]} */
  const res = [];
  for (let mask = 0; mask < total; mask++) {
    /** @type {T[]} */
    const cur = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) cur.push(nums[i]);
    }
    res.push(cur);
  }
  return res;
}

/**
 * Judul: Apakah ada subset dengan jumlah tepat `target`
 *
 * Soal test:
 * - `[1,2,3]`, target `5` → true (`[2,3]`); target `10` → false.
 *
 * Ringkasan soal:
 * - NP-complete umum; untuk n kecil bitmask atau brute OK.
 *
 * Kontrak: `nums` integer kecil; `target` integer.
 *
 * Solusi: Loop semua mask; jumlahkan elemen terpilih.
 *
 * @param {number[]} nums
 * @param {number} target
 */
export function subsetSumExists(nums, target) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (!Number.isInteger(target)) throw new RangeError("target must be integer");
  for (const x of nums) {
    if (!Number.isInteger(x)) throw new TypeError("elements must be integers");
  }
  const n = nums.length;
  const total = 1 << n;
  for (let mask = 0; mask < total; mask++) {
    let s = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) s += nums[i];
    }
    if (s === target) return true;
  }
  return false;
}

/**
 * Judul: Jumlah subset dengan jumlah = target (banyaknya)
 *
 * Soal test:
 * - `[1,1,1]`, target `2` → `3` cara (pilih dua dari tiga indeks).
 *
 * Ringkasan soal:
 * - Enumerasi untuk n kecil; DP untuk n besar (tidak di sini).
 *
 * Kontrak: sama seperti `subsetSumExists`.
 *
 * Solusi: Hitung mask yang memenuhi.
 *
 * @param {number[]} nums
 * @param {number} target
 */
export function subsetSumCount(nums, target) {
  if (!Array.isArray(nums)) throw new TypeError("nums must be an array");
  if (!Number.isInteger(target)) throw new RangeError("target must be integer");
  for (const x of nums) {
    if (!Number.isInteger(x)) throw new TypeError("elements must be integers");
  }
  const n = nums.length;
  const total = 1 << n;
  let cnt = 0;
  for (let mask = 0; mask < total; mask++) {
    let s = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) s += nums[i];
    }
    if (s === target) cnt += 1;
  }
  return cnt;
}
