/**
 * Judul: Topik 72 — Climbing stairs (1–2 langkah) + varian biaya / tribonacci
 *
 * Soal test eksplisit:
 * - climbStairs(n): cara mencapai anak ke-n dari 0 dengan langkah 1 atau 2 (= F(n+1) dengan F(1)=1).
 * - minCostClimbingStairs(cost): biaya minimum mencapai atas; boleh mulai index 0 atau 1 (LC 746 style).
 * - climbStairs3(n): langkah 1,2, atau 3 (tribonacci ways).
 *
 * Kontrak (opsional): n ≥ 1 untuk climb; cost.length ≥ 2 untuk min cost.
 *
 * Contoh output:
 * - n=3 → 3 cara (111,12,21).
 *
 * Solusi detail: DP linear; min cost: dp[i]=cost[i]+min(dp[i-1],dp[i-2]); akhir min(last two).
 *
 * @see knowledge-base/05-coding-interview-v2/72-climbing-stairs.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/72-climbing-stairs/climbing-stairs.test.js`
 */

/**
 * Judul: Jumlah cara naik tangga dengan langkah 1 atau 2
 *
 * Soal test eksplisit:
 * - n=1 → 1; n=2 → 2; n=5 → 8.
 *
 * Contoh output:
 * - Sama dengan fibonacci shift: ways(n)=fib(n+1) dengan fib(1)=1,fib(2)=1 klasik stair.
 *
 * Solusi detail: dp[i]=dp[i-1]+dp[i-2]; base dp[1]=1, dp[2]=2.
 *
 * @param {number} n
 * @returns {number}
 */
export function climbStairs(n) {
  if (!Number.isInteger(n) || n < 1) throw new RangeError("n must be positive integer");
  if (n <= 2) return n;
  let a = 1;
  let b = 2;
  for (let i = 3; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}

/**
 * Judul: Minimum cost untuk mencapai luar atas (bisa start index 0 atau 1)
 *
 * Soal test eksplisit:
 * - cost [10,15,20] → min path ke "top" setelah index terakhir.
 *
 * Kontrak (opsional): cost[i] ≥ 0.
 *
 * Contoh output:
 * - LC contoh [1,100,1,1,1,100,1,1,100,1] → 6.
 *
 * Solusi detail: dp[i] = cost[i] + min(dp[i-1], dp[i-2]); jawaban min(dp[n-1], dp[n-2]) atau extend dengan 0 di akhir.
 *
 * @param {number[]} cost
 * @returns {number}
 */
export function minCostClimbingStairs(cost) {
  if (!Array.isArray(cost) || cost.length < 2) throw new RangeError("cost length >= 2");
  const n = cost.length;
  /** @type {number[]} */
  const dp = Array(n);
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i < n; i++) dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
  return Math.min(dp[n - 1], dp[n - 2]);
}

/**
 * Judul: Cara naik dengan langkah 1, 2, atau 3
 *
 * Soal test eksplisit:
 * - n=4 → tribonacci(4) dengan base 1,2,4 untuk n=1,2,3 — sesuaikan.
 *
 * Contoh output:
 * - n=1 → 1; n=2 → 2; n=3 → 4; n=4 → 7.
 *
 * Solusi detail: dp[i]=dp[i-1]+dp[i-2]+dp[i-3].
 *
 * @param {number} n
 * @returns {number}
 */
export function climbStairs3(n) {
  if (!Number.isInteger(n) || n < 1) throw new RangeError("n invalid");
  if (n === 1) return 1;
  if (n === 2) return 2;
  if (n === 3) return 4;
  let a = 1;
  let b = 2;
  let c = 4;
  for (let i = 4; i <= n; i++) {
    const d = a + b + c;
    a = b;
    b = c;
    c = d;
  }
  return c;
}

/**
 * Judul: Verifikasi climbStairs sama dengan definisi DP eksplisit
 *
 * Soal test eksplisit:
 * - climbStairsExplicit(10) === climbStairs(10).
 *
 * @param {number} n
 */
export function climbStairsExplicit(n) {
  if (!Number.isInteger(n) || n < 1) throw new RangeError("n invalid");
  /** @type {number[]} */
  const dp = Array(n + 1).fill(0);
  dp[1] = 1;
  if (n >= 2) dp[2] = 2;
  for (let i = 3; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}
