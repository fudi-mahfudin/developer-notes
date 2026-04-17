/**
 * Judul: Topik 5 — Coercion, `==` vs `===`, truthy / falsy
 *
 * Soal test:
 * - strictEqual: `strictEqual(0, "0")` dan `strictEqual(null, undefined)` false (tanpa coercion).
 * - looseEqual: `looseEqual(0, "0")` dan `looseEqual("", 0)` true.
 * - isEmptyForValidation: `null`/`undefined`/""/`"   "` true; `0` dan `false` false.
 * - sameValueZeroStyle: `sameValueZeroStyle(NaN, NaN)` true; `sameValueZeroStyle(0, -0)` false.
 *
 * Ringkasan soal:
 * - Perbandingan ketat vs longgar (hindari `==` di API publik kecuali dokumentasi eksplisit).
 * - Deteksi nilai “kosong” yang sering salah di form (`""`, `0`, `null`).
 * - `Object.is` untuk edge `-0` vs `+0` dan `NaN`.
 *
 * Solusi: API enterprise memakai `===` / `Number.isNaN` / `Object.is` secara eksplisit; dokumentasikan coercion jika terpaksa.
 *
 * @see knowledge-base/05-coding-interview-v2/05-coercion-equality-truthy-falsy.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Sama secara ketat — wrapper dokumentasi
 *
 * Soal test:
 * - `strictEqual(0, "0")` false; `strictEqual(null, undefined)` false.
 *
 * Ringkasan soal:
 * - Ekspor fungsi yang memakai `===` untuk dua nilai (tanpa coercion).
 *
 * Kontrak: sembarang nilai; tidak melempar.
 *
 * Solusi: `a === b`.
 *
 * @param {unknown} a
 * @param {unknown} b
 */
export function strictEqual(a, b) {
  return a === b;
}

/**
 * Judul: Sama secara longgar — `==` (hanya untuk latihan perilaku)
 *
 * Soal test:
 * - `looseEqual(0, "0")` true; `looseEqual("", 0)` true.
 *
 * Ringkasan soal:
 * - Implementasi perbandingan `==` untuk pasangan uji tertentu.
 *
 * Kontrak: sembarang nilai.
 *
 * Solusi: `a == b` (Abstract Equality Comparison).
 *
 * @param {unknown} a
 * @param {unknown} b
 */
export function looseEqual(a, b) {
  return a == b;
}

/**
 * Judul: Apakah nilai “kosong” untuk validasi form (bukan sekadar falsy)
 *
 * Soal test:
 * - `null`/`undefined`/""/`"   "` → true; `0` dan `false` → false.
 *
 * Ringkasan soal:
 * - Anggap `null`, `undefined`, `""`, dan string hanya-spasi sebagai kosong.
 * - **Jangan** menganggap `0` atau `false` kosong (nilai bisnis bisa sah).
 *
 * Kontrak: `value` sembarang.
 *
 * Solusi: Cek tipe string dengan `trim`; untuk non-string hanya `null`/`undefined`.
 *
 * @param {unknown} value
 */
export function isEmptyForValidation(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  return false;
}

/**
 * Judul: `Object.is` vs `===` untuk `NaN` dan `-0`
 *
 * Soal test:
 * - `sameValueZeroStyle(NaN, NaN)` true; `sameValueZeroStyle(0, -0)` false.
 *
 * Ringkasan soal:
 * - `Object.is(NaN, NaN)` true; `Object.is(0, -0)` false.
 *
 * Kontrak: dua finite number atau NaN.
 *
 * Solusi: Delegasi ke `Object.is`.
 *
 * @param {number} a
 * @param {number} b
 */
export function sameValueZeroStyle(a, b) {
  return Object.is(a, b);
}
