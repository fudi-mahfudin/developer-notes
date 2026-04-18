/**
 * Judul: Topik 66 — Rekursi vs iterasi (kesetaraan hasil, base case)
 *
 * Soal test eksplisit:
 * - fibonacciRec vs fibonacciIter: nilai sama untuk n kecil.
 * - factorialRec vs factorialIter.
 * - sumArrayRec vs sumArrayIter.
 * - powerRec vs powerIter (eksponen non-negatif).
 *
 * Contoh output:
 * - fib(10) = 55 (urutan F(0)=0,F(1)=1 — dokumentasikan di komentar).
 *
 * Solusi: rekursi langsung vs loop akumulator; hindari stack overflow pada n besar di produksi.
 *
 * @see knowledge-base/05-coding-interview-v2/66-recursion-vs-iteration.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/66-recursion-vs-iteration/recursion-vs-iteration.test.js`
 */

/**
 * Judul: Fibonacci — F(0)=0, F(1)=1
 *
 * Soal test eksplisit:
 * - n=0..10 rekursi === iteratif.
 *
 * Contoh output:
 * - fib(6)=8.
 *
 * Solusi: rekursi ganda O(2^n) untuk demo; iteratif O(n).
 *
 * @param {number} n
 * @returns {number}
 */
export function fibonacciRec(n) {
  if (n < 0 || !Number.isInteger(n)) throw new RangeError("n must be non-negative integer");
  if (n <= 1) return n;
  return fibonacciRec(n - 1) + fibonacciRec(n - 2);
}

/**
 * Judul: Fibonacci iteratif
 *
 * Soal test eksplisit:
 * - Sama numerik dengan fibonacciRec untuk n≤25.
 *
 * @param {number} n
 * @returns {number}
 */
export function fibonacciIter(n) {
  if (n < 0 || !Number.isInteger(n)) throw new RangeError("n must be non-negative integer");
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
 * Judul: Faktorial
 *
 * Soal test eksplisit:
 * - 0! = 1; 5! = 120.
 *
 * Contoh output:
 * - rekursi dan iterasi sama.
 *
 * @param {number} n
 */
export function factorialRec(n) {
  if (n < 0 || !Number.isInteger(n)) throw new RangeError("n invalid");
  if (n <= 1) return 1;
  return n * factorialRec(n - 1);
}

/**
 * @param {number} n
 */
export function factorialIter(n) {
  if (n < 0 || !Number.isInteger(n)) throw new RangeError("n invalid");
  let p = 1;
  for (let i = 2; i <= n; i++) p *= i;
  return p;
}

/**
 * Judul: Jumlah elemen array
 *
 * Soal test eksplisit:
 * - [] → 0; [1,2,3] → 6.
 *
 * @param {number[]} arr
 */
export function sumArrayRec(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArrayRec(arr.slice(1));
}

/**
 * @param {number[]} arr
 */
export function sumArrayIter(arr) {
  let s = 0;
  for (const x of arr) s += x;
  return s;
}

/**
 * Judul: Pangkat integer base^exp, exp ≥ 0
 *
 * Soal test eksplisit:
 * - 2^10 = 1024; 5^0 = 1.
 *
 * Contoh output:
 * - rekursi multiply dan iterasi sama.
 *
 * @param {number} base
 * @param {number} exp
 */
export function powerRec(base, exp) {
  if (exp < 0 || !Number.isInteger(exp)) throw new RangeError("exp invalid");
  if (exp === 0) return 1;
  return base * powerRec(base, exp - 1);
}

/**
 * @param {number} base
 * @param {number} exp
 */
export function powerIter(base, exp) {
  if (exp < 0 || !Number.isInteger(exp)) throw new RangeError("exp invalid");
  let r = 1;
  for (let i = 0; i < exp; i++) r *= base;
  return r;
}

/**
 * Judul: Bandingkan pasangan rekursi/iterasi (utilitas tes)
 *
 * Soal test eksplisit:
 * - fibonacciRec(15) === fibonacciIter(15).
 *
 * @param {number} n
 */
export function fibPairsMatch(n) {
  return fibonacciRec(n) === fibonacciIter(n);
}
