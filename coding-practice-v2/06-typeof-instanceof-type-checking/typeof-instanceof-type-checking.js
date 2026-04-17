/**
 * Judul: Topik 6 — `typeof`, `instanceof`, type checking praktis
 *
 * Soal test:
 * - getValueCategory: `null` → `"null"`; `{}` → `"object"`; `[]` → `"array"`.
 * - isPlainObject: `{ a: 1 }` true; `[]` dan `null` false.
 * - isInstanceOf: `new Dog(...)` true untuk `Dog` dan `Species`; `isInstanceOf(null, Dog)` → `TypeError`.
 *
 * Ringkasan soal:
 * - Beda `typeof null === 'object'` dan deteksi array.
 * - `instanceof` untuk rantai prototipe.
 * - `Object.prototype.toString` untuk tag internal (opsional di latihan).
 *
 * Solusi: Gabungkan `typeof`, `Array.isArray`, dan `instanceof` sesuai kebutuhan; dokumentasikan batasan.
 *
 * @see knowledge-base/05-coding-interview-v2/06-typeof-instanceof-type-checking.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Kategori nilai untuk validasi API
 *
 * Soal test:
 * - `getValueCategory(null)` → `"null"`; `getValueCategory({})` → `"object"`; `getValueCategory([])` → `"array"`.
 *
 * Ringkasan soal:
 * - Kembalikan salah satu: `'null' | 'undefined' | 'array' | 'object' | 'string' | 'number' | 'boolean' | 'function' | 'bigint' | 'symbol'`.
 * - `null` tidak boleh dilabel `'object'`.
 *
 * Kontrak: `value` sembarang.
 *
 * Solusi: `value === null` dulu; lalu `Array.isArray`; lalu `typeof`.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function getValueCategory(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return "array";
  const t = typeof value;
  if (t === "object") return "object";
  return t;
}

/**
 * Judul: Plain object (bukan array, bukan null)
 *
 * Soal test:
 * - `isPlainObject({ a: 1 })` true; `isPlainObject([])` dan `isPlainObject(null)` false.
 *
 * Ringkasan soal:
 * - `isPlainObject(x)` true hanya untuk objek literal / yang `Object.getPrototypeOf(x) === Object.prototype` atau `null` prototype (beberapa pola).
 *
 * Kontrak: sembarang input.
 *
 * Solusi: Cek `typeof x === 'object' && x !== null && !Array.isArray(x)` dan prototipe `Object.prototype` atau `null`.
 *
 * @param {unknown} value
 */
export function isPlainObject(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Judul: `instanceof` untuk pewarisan
 *
 * Soal test:
 * - Untuk `new Dog("x","y")`: `isInstanceOf(d, Dog)` dan `isInstanceOf(d, Species)` true; `isInstanceOf(null, Dog)` → `TypeError`.
 *
 * Ringkasan soal:
 * - Diberi instance `Dog`, pastikan `instanceof Dog` dan `instanceof Species`.
 *
 * Kontrak: `inst` harus object; `Ctor` harus function; jika tidak → `TypeError`.
 *
 * Solusi: `inst instanceof Ctor`.
 *
 * @param {object} inst
 * @param {Function} Ctor
 */
export function isInstanceOf(inst, Ctor) {
  if (inst === null || typeof inst !== "object") {
    throw new TypeError("inst must be a non-null object");
  }
  if (typeof Ctor !== "function") {
    throw new TypeError("Ctor must be a constructor function");
  }
  return inst instanceof Ctor;
}
