/**
 * Judul: Topik 67 — Subset & combination dengan backtracking
 *
 * Soal test eksplisit:
 * - subsets: semua subset dari array unik (urutan leksikografis subset bisa di-sort).
 * - combinations(n,k): semua kombinasi k elemen dari [1..n].
 * - combinationSum: (varian) pilih angka dari candidates yang jumlahnya = target (tanpa batas ulang).
 *
 * Contoh output:
 * - subsets([1,2]) → [[],[1],[2],[1,2]] (urutan bisa di-sort untuk assert).
 *
 * Solusi: backtrack include/skip; kombinasi mulai dari index untuk hindari duplikat.
 *
 * @see knowledge-base/05-coding-interview-v2/67-backtracking-subset-combination.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/67-backtracking-subset-combination/backtracking-subset-combination.test.js`
 */

/**
 * Judul: Power set — semua subset
 *
 * Soal test eksplisit:
 * - [] → [[]].
 *
 * Contoh output:
 * - [1,2,3] → 8 subset.
 *
 * Solusi: DFS indeks i; push/pop path.
 *
 * @param {number[]} nums
 * @returns {number[][]}
 */
export function subsets(nums) {
  /** @type {number[][]} */
  const out = [];
  const n = nums.length;
  /** @type {number[]} */
  const path = [];

  /**
   * @param {number} start
   */
  function backtrack(start) {
    out.push([...path]);
    for (let i = start; i < n; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }
  backtrack(0);
  return out;
}

/**
 * Judul: Kombinasi C(n,k) — nilai 1..n
 *
 * Soal test eksplisit:
 * - C(4,2) = 6 kombinasi.
 *
 * Contoh output:
 * - combinations(4,2) mengandung [1,2],[1,3],...
 *
 * @param {number} n
 * @param {number} k
 * @returns {number[][]}
 */
export function combinations(n, k) {
  /** @type {number[][]} */
  const out = [];
  /** @type {number[]} */
  const path = [];

  /**
   * @param {number} start
   */
  function backtrack(start) {
    if (path.length === k) {
      out.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1);
      path.pop();
    }
  }
  backtrack(1);
  return out;
}

/**
 * Judul: Kombinasi sum — unlimited reuse candidates (sorted ascending)
 *
 * Soal test eksplisit:
 * - candidates [2,3], target 5 → [[2,3]].
 *
 * Contoh output:
 * - Urutan kombinasi sorted untuk assert.
 *
 * Solusi: DFS mulai dari index; rekursi dengan same index (reuse).
 *
 * @param {number[]} candidates
 * @param {number} target
 * @returns {number[][]}
 */
export function combinationSum(candidates, target) {
  const sorted = [...candidates].sort((a, b) => a - b);
  /** @type {number[][]} */
  const out = [];
  /** @type {number[]} */
  const path = [];

  /**
   * @param {number} start
   * @param {number} remain
   */
  function dfs(start, remain) {
    if (remain === 0) {
      out.push([...path]);
      return;
    }
    if (remain < 0) return;
    for (let i = start; i < sorted.length; i++) {
      const x = sorted[i];
      if (x > remain) break;
      path.push(x);
      dfs(i, remain - x);
      path.pop();
    }
  }
  dfs(0, target);
  return out;
}

/**
 * Judul: Subset dengan duplikat (sort + skip duplicate di level)
 *
 * Soal test eksplisit:
 * - [1,2,2] → subset unik tidak dobel karena permutasi duplikat.
 *
 * Contoh output:
 * - Panjang < 2^n jika banyak duplikat.
 *
 * @param {number[]} nums
 * @returns {number[][]}
 */
export function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  /** @type {number[][]} */
  const out = [];
  /** @type {number[]} */
  const path = [];

  /**
   * @param {number} start
   */
  function backtrack(start) {
    out.push([...path]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }
  backtrack(0);
  return out;
}
