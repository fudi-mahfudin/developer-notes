/**
 * Judul: Topik 11 — Iterables, iterators, `for...of`
 *
 * Soal test:
 * - IntegerRange: `[...new IntegerRange(1,4)]` → `[1,2,3]`; `[...new IntegerRange(0,0)]` → `[]`.
 * - takeIterable: 3 elemen pertama dari rentang besar → `[0,1,2]`.
 * - zipIterables: zip berhenti di yang lebih pendek.
 * - sumIterable: `[1,2,3]` → `6`; `[1, NaN]` → `TypeError`.
 * - iteratorToArray: `IntegerRange(2,5)` → `[2,3,4]`.
 * - enumerateIterable: `["x","y"]` → `[[0,"x"],[1,"y"]]`.
 *
 * Ringkasan soal:
 * - Mengimplementasikan iterable kustom dengan `[Symbol.iterator]`.
 * - Menggabungkan iterator (`take`, `zip`), mengonversi ke array, menjumlahkan.
 * - Memahami protokol iterator (objek dengan `next()` mengembalikan `{ value, done }`).
 *
 * Solusi: Kelas / factory mengembalikan objek dengan method `Symbol.iterator` yang menghasilkan
 * iterator standar; helper murni memakai loop `for...of` di mana memungkinkan.
 *
 * @see knowledge-base/05-coding-interview-v2/11-iterables-iterators-for-of.md
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
 * Judul: Rentang bilangan bulat [start, end) — iterable
 *
 * Soal test:
 * - `[...new IntegerRange(1, 4)]` → `[1, 2, 3]`; `[...new IntegerRange(0, 0)]` → `[]`.
 *
 * Ringkasan soal:
 * - Iterasi dari `start` inklusif sampai `end` eksklusif dengan step 1.
 * - Mendukung `for...of` dan spread ke array.
 *
 * Kontrak:
 * - `start`, `end` bilangan bulat; `start <= end`; jika tidak → `RangeError`.
 *
 * Solusi: Method `[Symbol.iterator]` mengembalikan iterator dengan `next` yang mengincrement cursor.
 */
export class IntegerRange {
  /**
   * @param {number} start
   * @param {number} end
   */
  constructor(start, end) {
    if (!Number.isInteger(start) || !Number.isInteger(end)) {
      throw new RangeError("start and end must be integers");
    }
    if (start > end) {
      throw new RangeError("start must be <= end");
    }
    this.start = start;
    this.end = end;
  }

  /**
   * @returns {Iterator<number>}
   */
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current >= end) {
          return { value: undefined, done: true };
        }
        const value = current;
        current += 1;
        return { value, done: false };
      },
    };
  }
}

/**
 * Judul: Ambil paling banyak `n` elemen dari iterable
 *
 * Soal test:
 * - `[...takeIterable(new IntegerRange(0, 100), 3)]` → `[0, 1, 2]`.
 *
 * Ringkasan soal:
 * - Tanpa mengonversi seluruh iterable ke memori jika tidak perlu — berhenti setelah `n` nilai.
 *
 * Kontrak:
 * - `n` bilangan bulat ≥ 0; iterable harus punya `[Symbol.iterator]`.
 *
 * Solusi: Iterator manual: panggil `iter.next()` sampai `n` kali atau `done`.
 *
 * @param {Iterable<unknown>} iterable
 * @param {number} n
 * @returns {IterableIterator<unknown>}
 */
export function takeIterable(iterable, n) {
  assertNonNegativeInteger(n);
  if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
    throw new TypeError("iterable must have Symbol.iterator");
  }

  function* takeGen() {
    const it = iterable[Symbol.iterator]();
    let count = 0;
    while (count < n) {
      const step = it.next();
      if (step.done) break;
      yield step.value;
      count += 1;
    }
  }
  return takeGen();
}

/**
 * Judul: Zip dua iterable sampai salah satu habis
 *
 * Soal test:
 * - `zipIterables([1,2], ["a","b","c"])` → `[[1,"a"],[2,"b"]]` (lebih pendek menentukan panjang).
 *
 * Ringkasan soal:
 * - Hasilkan pasangan `[a_i, b_i]` untuk i = 0,1,… sampai salah satu iterator selesai.
 *
 * Kontrak: keduanya iterable; jika tidak → `TypeError`.
 *
 * Solusi: Dua iterator paralel; `next` keduanya setiap langkah.
 *
 * @template A
 * @template B
 * @param {Iterable<A>} a
 * @param {Iterable<B>} b
 * @returns {IterableIterator<[A, B]>}
 */
export function zipIterables(a, b) {
  if (a == null || typeof a[Symbol.iterator] !== "function") {
    throw new TypeError("a must be iterable");
  }
  if (b == null || typeof b[Symbol.iterator] !== "function") {
    throw new TypeError("b must be iterable");
  }

  function* zipGen() {
    const itA = a[Symbol.iterator]();
    const itB = b[Symbol.iterator]();
    for (;;) {
      const na = itA.next();
      const nb = itB.next();
      if (na.done || nb.done) break;
      yield [na.value, nb.value];
    }
  }
  return zipGen();
}

/**
 * Judul: Jumlahkan iterable angka
 *
 * Soal test:
 * - `sumIterable([1, 2, 3])` → `6`; `sumIterable([1, NaN])` → `TypeError`.
 *
 * Ringkasan soal:
 * - Gunakan `for...of` untuk akumulasi (bukan spread besar array).
 *
 * Kontrak: setiap elemen finite number; jika tidak → `TypeError`.
 *
 * Solusi: Loop dan `+=`.
 *
 * @param {Iterable<number>} iterable
 */
export function sumIterable(iterable) {
  if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
    throw new TypeError("iterable must have Symbol.iterator");
  }
  let total = 0;
  for (const x of iterable) {
    if (typeof x !== "number" || !Number.isFinite(x)) {
      throw new TypeError("every element must be a finite number");
    }
    total += x;
  }
  return total;
}

/**
 * Judul: Iterable ke array
 *
 * Soal test:
 * - `iteratorToArray(new IntegerRange(2, 5))` → `[2, 3, 4]`.
 *
 * Ringkasan soal:
 * - Materialisasi penuh (hati-hati untuk infinite iterable — tidak digunakan di sini).
 *
 * Kontrak: iterable valid.
 *
 * Solusi: `Array.from` atau spread `[...iterable]`.
 *
 * @param {Iterable<T>} iterable
 * @template T
 * @returns {T[]}
 */
export function iteratorToArray(iterable) {
  if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
    throw new TypeError("iterable must have Symbol.iterator");
  }
  return Array.from(iterable);
}

/**
 * Judul: Enumerate — pasangan (index, value)
 *
 * Soal test:
 * - `[...enumerateIterable(["x", "y"])]` → `[[0, "x"], [1, "y"]]`.
 *
 * Ringkasan soal:
 * - Seperti `entries` pada array tetapi untuk iterable sembarang.
 *
 * Kontrak: iterable valid; indeks mulai 0.
 *
 * Solusi: Generator dengan counter.
 *
 * @template T
 * @param {Iterable<T>} iterable
 * @returns {IterableIterator<[number, T]>}
 */
export function enumerateIterable(iterable) {
  if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
    throw new TypeError("iterable must have Symbol.iterator");
  }
  function* enumGen() {
    let i = 0;
    for (const value of iterable) {
      yield [i, value];
      i += 1;
    }
  }
  return enumGen();
}
