/**
 * Judul: Topik 73 — Coin change: minimum koin (unbounded) + jumlah cara kombinasi
 *
 * Soal test eksplisit:
 * - coinChangeMin(coins, amount): koin tak terbatas; tidak mungkin → -1.
 * - coinChangeWays(coins, amount): banyak kombinasi terurut non-menurun (atau counting order — dokumentasikan); standar LC 518 = urutan tidak penting, kombinasi unik per multiset.
 *
 * Kontrak (opsional): coins positif unik di tes; amount ≥ 0.
 *
 * Contoh output:
 * - coins [1,2,5], amount 11 → min 3 (5+5+1).
 *
 * Solusi detail: Min — unbounded knapsack min; Ways — DP[i] += DP[i-c] dengan loop coin luar untuk kombinasi unik.
 *
 * @see knowledge-base/05-coding-interview-v2/73-coin-change.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/73-coin-change/coin-change.test.js`
 */

/**
 * Judul: Minimum jumlah koin untuk amount (setiap koin unlimited)
 *
 * Soal test eksplisit:
 * - amount 0 → 0; tidak ada solusi → -1.
 *
 * Contoh output:
 * - [2], amount 3 → -1.
 *
 * Solusi detail: dp[a]=min(dp[a], dp[a-c]+1); dp[0]=0.
 *
 * @param {number[]} coins
 * @param {number} amount
 * @returns {number}
 */
export function coinChangeMin(coins, amount) {
  if (!Number.isInteger(amount) || amount < 0) throw new RangeError("amount invalid");
  /** @type {number[]} */
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a >= c && dp[a - c] !== Infinity) dp[a] = Math.min(dp[a], dp[a - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Judul: Jumlah kombinasi (order tidak penting — loop coin di luar)
 *
 * Soal test eksplisit:
 * - coins [1,2,3], amount 4 → berapa cara (1+1+1+1, 1+1+2, 2+2, 1+3).
 *
 * Contoh output:
 * - amount 0 → 1 (satu cara kosong).
 *
 * Solusi detail: dp[0]=1; untuk tiap coin, untuk a dari c..amount: dp[a]+=dp[a-c].
 *
 * @param {number[]} coins
 * @param {number} amount
 * @returns {number}
 */
export function coinChangeWays(coins, amount) {
  if (!Number.isInteger(amount) || amount < 0) throw new RangeError("amount invalid");
  /** @type {number[]} */
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins) {
    for (let a = c; a <= amount; a++) dp[a] += dp[a - c];
  }
  return dp[amount];
}

/**
 * Judul: Jumlah permutasi koin (order penting) — varian berbeda dari ways
 *
 * Soal test eksplisit:
 * - [1,2], amount 3 → 3 (1+1+1, 1+2, 2+1).
 *
 * Kontrak (opsional): loop amount di luar, coin di dalam.
 *
 * Contoh output:
 * - Berbeda dengan coinChangeWays untuk amount>0.
 *
 * Solusi detail: dp[a] = sum_c dp[a-c].
 *
 * @param {number[]} coins
 * @param {number} amount
 * @returns {number}
 */
export function coinChangeOrderings(coins, amount) {
  if (!Number.isInteger(amount) || amount < 0) throw new RangeError("amount invalid");
  /** @type {number[]} */
  const dp = Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a >= c) dp[a] += dp[a - c];
    }
  }
  return dp[amount];
}

/**
 * Judul: Greedy tidak selalu optimal — counterexample check (dokumentasi saja)
 *
 * Soal test eksplisit:
 * - coins [1,3,4], amount 6 → min greedy by largest might fail vs DP.
 *
 * @param {number[]} coins
 * @param {number} amount
 */
export function coinChangeMinVsGreedyNote(coins, amount) {
  return coinChangeMin(coins, amount);
}
