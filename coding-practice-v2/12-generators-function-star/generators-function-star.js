/**
 * Judul: Topik 12 — Generators (`function*`)
 *
 * Soal test:
 * - rangeGenerator: `[...rangeGenerator(2, 5)]` → `[2, 3, 4]`.
 * - fibonacciGenerator: 7 suku pertama → `[0, 1, 1, 2, 3, 5, 8]`.
 * - flattenDeep: nested array → daun flat `[1,2,3,4,5]`.
 * - takeGenerator: membatasi panjang dari generator `range(0,100)` ke 4 elemen.
 * - generatorToArray: `fibonacciGenerator(5)` → `[0, 1, 1, 2, 3]`.
 * - chainGenerators: dua rentang berurutan → `[0, 1, 10, 11]`.
 *
 * Ringkasan soal:
 * - Generator menghasilkan alur nilai malas (lazy) dengan `yield` / `yield*`.
 * - Flatten bertingkat memakai delegasi `yield*`.
 * - Fibonacci terbatas untuk latihan urutan yield.
 *
 * Solusi: `function*` mengembalikan `Generator` object; `yield*` mendelegasi ke iterable/iterator lain.
 *
 * @see knowledge-base/05-coding-interview-v2/12-generators-function-star.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * @param {number} n
 */
function assertNonNegativeInteger(n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError("expected non-negative integer");
  }
}

/**
 * Judul: Generator rentang [start, end)
 *
 * Soal test:
 * - `[...rangeGenerator(2, 5)]` → `[2, 3, 4]`.
 *
 * Ringkasan soal:
 * - Sama numerik dengan iterable `Range`, tetapi pakai `function*`.
 *
 * Kontrak: `start`, `end` bilangan bulat, `start <= end`.
 *
 * Solusi: `yield` dalam loop `for`.
 *
 * @param {number} start
 * @param {number} end
 * @returns {Generator<number, void, unknown>}
 */
export function* rangeGenerator(start, end) {
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    throw new RangeError("start and end must be integers");
  }
  if (start > end) {
    throw new RangeError("start must be <= end");
  }
  for (let i = start; i < end; i++) {
    yield i;
  }
}

/**
 * Judul: Fibonacci — `count` bilangan pertama
 *
 * Soal test:
 * - `[...fibonacciGenerator(7)]` → `[0, 1, 1, 2, 3, 5, 8]`.
 *
 * Ringkasan soal:
 * - Mulai F0=0, F1=1; yield `count` suku.
 *
 * Kontrak: `count` bilangan bulat ≥ 0.
 *
 * Solusi: Dua variabel bergantian atau loop dengan update.
 *
 * @param {number} count
 * @returns {Generator<number, void, unknown>}
 */
export function* fibonacciGenerator(count) {
  assertNonNegativeInteger(count);
  let a = 0;
  let b = 1;
  for (let i = 0; i < count; i++) {
    yield a;
    const next = a + b;
    a = b;
    b = next;
  }
}

/**
 * Judul: Flatten nested — `yield*`
 *
 * Soal test:
 * - `[...flattenDeep([1, [2, [3, 4]], 5])]` → `[1, 2, 3, 4, 5]`.
 *
 * Ringkasan soal:
 * - Input: array yang elemennya angka atau array bersarang (tanpa siklus).
 * - Output: depth-first traversal, daun berupa angka.
 *
 * Kontrak: setiap daun finite `number`; struktur JSON-like array.
 *
 * Solusi: Jika `Array.isArray(x)` rekursi / `yield* flattenDeep(x)`; else `yield x`.
 *
 * @param {unknown} nested
 * @returns {Generator<number, void, unknown>}
 */
export function* flattenDeep(nested) {
  if (typeof nested === "number" && Number.isFinite(nested)) {
    yield nested;
    return;
  }
  if (Array.isArray(nested)) {
    for (const item of nested) {
      yield* flattenDeep(item);
    }
    return;
  }
  throw new TypeError("nested must be finite number or array of such");
}

/**
 * Judul: Ambil paling banyak `n` yield dari generator
 *
 * Soal test:
 * - `[...takeGenerator(() => rangeGenerator(0, 100), 4)]` → `[0, 1, 2, 3]`.
 *
 * Ringkasan soal:
 * - Bungkus generator lain agar berhenti setelah `n` nilai.
 *
 * Kontrak: `n` ≥ 0; `genFn` callable yang mengembalikan generator.
 *
 * Solusi: Loop `n` kali pada iterator dari `genFn()`.
 *
 * @template T
 * @param {() => Generator<T>} genFn
 * @param {number} n
 * @returns {Generator<T, void, unknown>}
 */
export function* takeGenerator(genFn, n) {
  assertNonNegativeInteger(n);
  if (typeof genFn !== "function") {
    throw new TypeError("genFn must be a function");
  }
  const it = genFn();
  if (it == null || typeof it.next !== "function") {
    throw new TypeError("genFn must return a generator/iterator");
  }
  let count = 0;
  while (count < n) {
    const step = it.next();
    if (step.done) break;
    yield step.value;
    count += 1;
  }
}

/**
 * Judul: Kumpulkan generator ke array
 *
 * Soal test:
 * - `generatorToArray(fibonacciGenerator(5))` → `[0, 1, 1, 2, 3]`.
 *
 * Ringkasan soal:
 * - Materialisasi penuh (hati-hati infinite generator).
 *
 * Kontrak: generator berhingga.
 *
 * Solusi: `for...of` + `push`.
 *
 * @template T
 * @param {Generator<T>} gen
 * @returns {T[]}
 */
export function generatorToArray(gen) {
  if (gen == null || typeof gen[Symbol.iterator] !== "function") {
    throw new TypeError("expected iterable generator");
  }
  return Array.from(gen);
}

/**
 * Judul: Chain dua generator berurutan
 *
 * Soal test:
 * - `chainGenerators(() => rangeGenerator(0,2), () => rangeGenerator(10,12))` → `[0, 1, 10, 11]`.
 *
 * Ringkasan soal:
 * - Hasilkan semua nilai dari generator pertama, lalu semua dari kedua.
 *
 * Kontrak: keduanya callable mengembalikan iterator.
 *
 * Solusi: `yield*` pada hasil masing-masing.
 *
 * @template T
 * @param {() => Iterable<T>} first
 * @param {() => Iterable<T>} second
 * @returns {Generator<T, void, unknown>}
 */
export function* chainGenerators(first, second) {
  if (typeof first !== "function" || typeof second !== "function") {
    throw new TypeError("first and second must be functions");
  }
  yield* first();
  yield* second();
}
