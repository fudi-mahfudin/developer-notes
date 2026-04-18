/**
 * Judul: Topik 68 — Permutation dengan backtracking
 *
 * Soal test eksplisit:
 * - permute: semua permutasi elemen unik.
 * - permuteUnique: elemen duplikat → hasil unik (sort + skip).
 * - nextPermutation (bonus): leksikografis berikutnya untuk array.
 *
 * Contoh output:
 * - [1,2,3] → 6 permutasi.
 *
 * Solusi: swap / used[] boolean / sort + skip duplicate.
 *
 * @see knowledge-base/05-coding-interview-v2/68-backtracking-permutation.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/68-backtracking-permutation/backtracking-permutation.test.js`
 */

/**
 * Judul: Permutasi — elemen unik
 *
 * Soal test eksplisit:
 * - Panjang hasil = n!.
 *
 * Contoh output:
 * - [0,1] → [[0,1],[1,0]].
 *
 * Solusi: backtrack dengan used boolean array.
 *
 * @param {number[]} nums
 * @returns {number[][]}
 */
export function permute(nums) {
  const n = nums.length;
  /** @type {number[][]} */
  const out = [];
  /** @type {number[]} */
  const path = [];
  /** @type {boolean[]} */
  const used = Array(n).fill(false);

  function dfs() {
    if (path.length === n) {
      out.push([...path]);
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
  return out;
}

/**
 * Judul: Permutasi dengan duplikat — hasil unik
 *
 * Soal test eksplisit:
 * - [1,1,2] → 3! / 2! = 3 permutasi unik.
 *
 * Contoh output:
 * - Sort input; skip duplicate pada level sama seperti subsets II.
 *
 * @param {number[]} nums
 * @returns {number[][]}
 */
export function permuteUnique(nums) {
  const sorted = [...nums].sort((a, b) => a - b);
  const n = sorted.length;
  /** @type {number[][]} */
  const out = [];
  /** @type {number[]} */
  const path = [];
  /** @type {boolean[]} */
  const used = Array(n).fill(false);

  function dfs() {
    if (path.length === n) {
      out.push([...path]);
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
  return out;
}

/**
 * Judul: Faktorial n (untuk validasi jumlah permutasi)
 *
 * Soal test eksplisit:
 * - 5! = 120.
 *
 * @param {number} n
 */
export function factorial(n) {
  if (n < 0 || !Number.isInteger(n)) throw new RangeError("n invalid");
  let p = 1;
  for (let i = 2; i <= n; i++) p *= i;
  return p;
}

/**
 * Judul: Jumlah permutasi unik multiset (sederhana: bagi faktorial)
 *
 * Soal test eksplisit:
 * - [a,a,b] → 3!/2! = 3.
 *
 * Contoh output:
 * - Hanya untuk tes kecil; hitung frekuensi.
 *
 * @param {number[]} nums
 */
export function countPermutationsUnique(nums) {
  return permuteUnique(nums).length;
}
