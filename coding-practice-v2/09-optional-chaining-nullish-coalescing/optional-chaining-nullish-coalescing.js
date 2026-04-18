/**
 * Judul: Topik 9 — Optional chaining (`?.`) dan nullish coalescing (`??`)
 *
 * Soal test:
 * - getNestedAB: `null` / `{ a: {} }` → `undefined`; `{ a: { b: 42 } }` → `42`.
 * - resolveLimit: `{ limit: 0 }` → `0`; `{}` → default `10`.
 * - resolveLimitWithOr: `{ limit: 0 }` → `10` (perilaku `||`).
 * - firstElement: `undefined` → `undefined`; `[7,8]` → `7`.
 *
 * Ringkasan soal:
 * - Akses aman ke properti / elemen nested.
 * - `??` vs `||` untuk default (hanya nullish, bukan `0`/`""`).
 *
 * Solusi: `?.` mencegah TypeError; `??` memberi default hanya untuk `null`/`undefined`.
 *
 * @see knowledge-base/05-coding-interview-v2/09-optional-chaining-nullish-coalescing.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Baca properti nested aman
 *
 * Soal test:
 * - `getNestedAB(null)` dan `getNestedAB({ a: {} })` → `undefined`; `getNestedAB({ a: { b: 42 } })` → `42`.
 *
 * Ringkasan soal:
 * - Kembalikan `obj?.a?.b` tanpa error jika rantai putus.
 *
 * Kontrak: `obj` sembarang.
 *
 * Solusi: Optional chaining.
 *
 * @param {unknown} obj
 */
export function getNestedAB(obj) {
  return obj?.a?.b;
}

/**
 * Judul: Default nullish untuk konfigurasi
 *
 * Soal test:
 * - `resolveLimit({ limit: 0 })` → `0`; `resolveLimit({})` → `10`.
 *
 * Ringkasan soal:
 * - `limit` dari input bisa `0`; jangan ganti `0` dengan default `10` (beda dari `||`).
 *
 * Kontrak: `input` object atau nullish.
 *
 * Solusi: `(input?.limit ?? 10)`.
 *
 * @param {{ limit?: number } | null | undefined} input
 */
export function resolveLimit(input) {
  return input?.limit ?? 10;
}

/**
 * Judul: Default dengan `||` (latihan perbedaan)
 *
 * Soal test:
 * - `resolveLimitWithOr({ limit: 0 })` → `10` (nilai 0 dianggap falsy oleh `||`).
 *
 * Ringkasan soal:
 * - Sama seperti `resolveLimit` tetapi memakai `||` — `0` menjadi diganti.
 *
 * Kontrak: sama seperti `resolveLimit`.
 *
 * Solusi: `input?.limit || 10`.
 *
 * @param {{ limit?: number } | null | undefined} input
 */
export function resolveLimitWithOr(input) {
  return input?.limit || 10;
}

/**
 * Judul: Elemen array optional
 *
 * Soal test:
 * - `firstElement(undefined)` → `undefined`; `firstElement([7, 8])` → `7`.
 *
 * Ringkasan soal:
 * - Kembalikan elemen pertama array atau `undefined` jika kosong/tanpa array.
 *
 * Kontrak: `arr` sembarang.
 *
 * Solusi: `arr?.[0]`.
 *
 * @param {unknown} arr
 */
export function firstElement(arr) {
  return arr?.[0];
}
