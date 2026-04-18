/**
 * Judul: Topik 71 — Fibonacci: memoization vs tabulation vs O(1) space
 *
 * Soal test eksplisit:
 * - fibonacciMemo(n): top-down dengan Map; sama dengan fibonacciTab(n) untuk n ≥ 0.
 * - fibonacciTab(n): bottom-up array dp[0..n].
 * - fibonacciIterO1(n): dua variabel; sama numerik dengan tabulasi.
 * - fibonacciCompareAll(n): utilitas invariant tiga implementasi.
 *
 * Kontrak (opsional): F(0)=0, F(1)=1; n integer ≥ 0; untuk n besar hindari memo rekursif murni di produksi (stack depth).
 *
 * Contoh output:
 * - n=10 → 55; n=20 → 6765.
 *
 * Solusi detail: Memo = cache hasil subproblem F(k); tabulasi = isi dp[i]=dp[i-1]+dp[i-2]; O(1) = rolling (a,b).
 *
 * @see knowledge-base/05-coding-interview-v2/71-fibonacci-memo-tabulation.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/71-fibonacci-memo-tabulation/fibonacci-memo-tabulation.test.js`
 */

/**
 * Judul: Fibonacci — memoization (top-down)
 *
 * Soal test eksplisit:
 * - fibonacciMemo(0)===0, fibonacciMemo(1)===1.
 *
 * Kontrak (opsional): n ≤ ~10000 aman untuk Map; rekursi dalam batas engine.
 *
 * Contoh output:
 * - fibonacciMemo(10) → 55.
 *
 * Solusi detail: `memo.get(n)` jika ada; else `memo.set(n, fib(n-1)+fib(n-2))`.
 *
 * @param {number} n
 * @returns {number}
 */
export function fibonacciMemo(n) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n must be non-negative integer");
  /** @type {Map<number, number>} */
  const memo = new Map([
    [0, 0],
    [1, 1],
  ]);

  /**
   * @param {number} k
   */
  function fib(k) {
    if (memo.has(k)) return memo.get(k);
    const v = fib(k - 1) + fib(k - 2);
    memo.set(k, v);
    return v;
  }
  return fib(n);
}

/**
 * Judul: Fibonacci — tabulasi (bottom-up)
 *
 * Soal test eksplisit:
 * - Sama dengan fibonacciMemo untuk n=0..50.
 *
 * Contoh output:
 * - dp[10]=55.
 *
 * Solusi detail: `dp[i]=dp[i-1]+dp[i-2]`; panjang n+1.
 *
 * @param {number} n
 * @returns {number}
 */
export function fibonacciTab(n) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n must be non-negative integer");
  if (n <= 1) return n;
  /** @type {number[]} */
  const dp = Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}

/**
 * Judul: Fibonacci — O(1) memori (iteratif dua variabel)
 *
 * Soal test eksplisit:
 * - fibonacciIterO1(20) === fibonacciTab(20).
 *
 * Kontrak (opsional): tidak alokasi array panjang n.
 *
 * Contoh output:
 * - Rolling a,b setelah iterasi.
 *
 * Solusi detail: `a,b = b, a+b` dalam loop.
 *
 * @param {number} n
 * @returns {number}
 */
export function fibonacciIterO1(n) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n must be non-negative integer");
  if (n <= 1) return n;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}

/**
 * Judul: Bandingkan ketiga implementasi (utilitas tes / invariant)
 *
 * Soal test eksplisit:
 * - fibonacciCompareAll(25) → true.
 *
 * Contoh output:
 * - false jika salah satu beda (bug detector).
 *
 * Solusi detail: panggil ketiga fungsi dan bandingkan ===.
 *
 * @param {number} n
 */
export function fibonacciCompareAll(n) {
  const a = fibonacciMemo(n);
  const b = fibonacciTab(n);
  const c = fibonacciIterO1(n);
  return a === b && b === c;
}

/**
 * Judul: Daftar Fibonacci F(0)..F(n) — tabulasi (untuk analisis / plot)
 *
 * Soal test eksplisit:
 * - Panjang n+1; first two 0,1.
 *
 * Kontrak (opsional): n besar membuat array besar.
 *
 * Contoh output:
 * - n=5 → [0,1,1,2,3,5].
 *
 * Solusi detail: isi dp seperti fibonacciTab tapi simpan semua prefix.
 *
 * @param {number} n
 * @returns {number[]}
 */
export function fibonacciSequenceUpTo(n) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n must be non-negative integer");
  if (n === 0) return [0];
  /** @type {number[]} */
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp;
}
