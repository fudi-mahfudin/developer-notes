/**
 * Judul: Topik 75 — Knapsack 0/1 — max value dengan berat terbatas + varian subset
 *
 * Soal test eksplisit:
 * - knapsack01(weights, values, capacity): nilai maksimum tanpa pecah item.
 * - knapsack01SpaceOptimized: dua baris prev/cur.
 * - canPartitionEqualSum(nums): apakah bisa bagi dua subset sama jumlah (subset sum).
 *
 * Kontrak (opsional): weights/values panjang sama; capacity ≥ 0.
 *
 * Contoh output:
 * - weights [1,2,3], values [6,10,12], cap 5 → pilih 2+3 value 22.
 *
 * Solusi detail: dp[i][w] = max tanpa/tambah item i; 1D mundur w dari capacity ke weight[i].
 *
 * @see knowledge-base/05-coding-interview-v2/75-knapsack-01-concept.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/75-knapsack-01-concept/knapsack-01-concept.test.js`
 */

/**
 * Judul: 0/1 knapsack — DP 2D
 *
 * Soal test eksplisit:
 * - Satu item melebihi capacity → skip semua jika tidak muat kombinasi.
 *
 * Contoh output:
 * - capacity 0 → 0.
 *
 * Solusi detail: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wi]+vi) jika wi<=w.
 *
 * @param {number[]} weights
 * @param {number[]} values
 * @param {number} capacity
 * @returns {number}
 */
export function knapsack01(weights, values, capacity) {
  if (weights.length !== values.length) throw new Error("weights and values length mismatch");
  const n = weights.length;
  /** @type {number[][]} */
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    const w = weights[i - 1];
    const v = values[i - 1];
    for (let c = 0; c <= capacity; c++) {
      dp[i][c] = dp[i - 1][c];
      if (c >= w) dp[i][c] = Math.max(dp[i][c], dp[i - 1][c - w] + v);
    }
  }
  return dp[n][capacity];
}

/**
 * Judul: 0/1 knapsack — satu array 1D (mundur)
 *
 * Soal test eksplisit:
 * - Sama optimal dengan knapsack01 pada tes kecil.
 *
 * Kontrak (opsional): loop w dari capacity menurun ke weight.
 *
 * Solusi detail: dp[w] = max(dp[w], dp[w-wi]+vi); overwrite aman karena 0/1.
 *
 * @param {number[]} weights
 * @param {number[]} values
 * @param {number} capacity
 */
export function knapsack01SpaceOptimized(weights, values, capacity) {
  if (weights.length !== values.length) throw new Error("mismatch");
  /** @type {number[]} */
  const dp = Array(capacity + 1).fill(0);
  const n = weights.length;
  for (let i = 0; i < n; i++) {
    const w = weights[i];
    const v = values[i];
    for (let c = capacity; c >= w; c--) dp[c] = Math.max(dp[c], dp[c - w] + v);
  }
  return dp[capacity];
}

/**
 * Judul: Partition equal subset sum (subset sum DP boolean)
 *
 * Soal test eksplisit:
 * - [1,5,11,5] → true (11 vs 1+5+5 tidak — actually [1,5,5] vs [11] no; [1,5,5] sum 11 and [11] — true).
 *
 * Contoh output:
 * - Ganjil total → false.
 *
 * Solusi detail: target = sum/2; dp[s] can achieve sum s.
 *
 * @param {number[]} nums
 * @returns {boolean}
 */
export function canPartitionEqualSum(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const target = sum / 2;
  /** @type {boolean[]} */
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x];
  }
  return dp[target];
}

/**
 * Judul: Apakah subset mencapai target sum (decision knapsack)
 *
 * Soal test eksplisit:
 * - nums [1,2,3,4], target 6 → true (2+4).
 *
 * @param {number[]} nums
 * @param {number} target
 */
export function subsetSumExists(nums, target) {
  /** @type {boolean[]} */
  const dp = Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let s = target; s >= x; s--) dp[s] = dp[s] || dp[s - x];
  }
  return dp[target];
}
