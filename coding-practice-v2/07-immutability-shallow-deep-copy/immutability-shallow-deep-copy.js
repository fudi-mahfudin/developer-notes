/**
 * Judul: Topik 7 — Immutability, shallow vs deep copy
 *
 * Soal test:
 * - shallowCloneObject: salinan satu level; properti nested masih referensi sama dengan asal.
 * - deepCloneJsonSafe: mengubah nested clone tidak mengubah objek sumber.
 * - immutableSetNestedName: root tidak berubah; nilai nested `name` ter-update; field lain tetap.
 *
 * Ringkasan soal:
 * - Spread untuk salinan dangkal.
 * - Deep copy terbatas untuk JSON-serializable (tanpa cycle, tanpa function).
 *
 * Solusi: Shallow = spread satu level; deep = rekursi atau `structuredClone` jika tersedia (di sini JSON untuk portabilitas uji).
 *
 * @see knowledge-base/05-coding-interview-v2/07-immutability-shallow-deep-copy.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Shallow clone object
 *
 * Soal test:
 * - Objek baru bukan identik dengan input; `inner` nested tetap `===` referensi yang sama.
 *
 * Ringkasan soal:
 * - Duplikat satu level; nested object masih berbagi referensi.
 *
 * Kontrak: `obj` plain object; jika bukan → `TypeError`.
 *
 * Solusi: `{ ...obj }`.
 *
 * @param {Record<string, unknown>} obj
 */
export function shallowCloneObject(obj) {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    throw new TypeError("obj must be a non-null plain object");
  }
  return { ...obj };
}

/**
 * Judul: Deep clone JSON-safe
 *
 * Soal test:
 * - Setelah mengubah `c.a.b` pada hasil clone, `a.a.b` pada objek asal tidak berubah.
 *
 * Ringkasan soal:
 * - Salin dalam untuk struktur JSON (object/array/primitive/string/boolean/null) tanpa `Date`/`Map`/fungsi.
 *
 * Kontrak:
 * - Jika nilai mengandung circular reference → `TypeError` dari JSON atau deteksi manual.
 * - Di sini gunakan `JSON` round-trip; `undefined` di object dihilangkan (perilaku JSON).
 *
 * Solusi: `JSON.parse(JSON.stringify(value))` dengan dokumentasi batasan.
 *
 * @param {unknown} value
 */
export function deepCloneJsonSafe(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    throw new TypeError("value must be JSON-serializable (no cycles, no BigInt/undefined in arrays)");
  }
}

/**
 * Judul: Update imutabel nested — set path satu level dalam
 *
 * Soal test:
 * - `root.user.name` tetap `"a"`; hasil punya `name` baru; `id` user tidak hilang.
 *
 * Ringkasan soal:
 * - Diberi `{ user: { name: 'a' } }`, kembalikan objek baru dengan `user.name = b` tanpa mutasi input.
 *
 * Kontrak: `root` plain object; `innerKey` string; jika struktur tidak sesuai → `RangeError`.
 *
 * Solusi: Spread root dan spread nested.
 *
 * @param {Record<string, Record<string, unknown>>} root
 * @param {string} innerKey
 * @param {unknown} newName
 */
export function immutableSetNestedName(root, innerKey, newName) {
  if (root === null || typeof root !== "object" || Array.isArray(root)) {
    throw new TypeError("root must be a non-null object");
  }
  const inner = root.user;
  if (inner === null || typeof inner !== "object" || Array.isArray(inner)) {
    throw new RangeError("root.user must be an object");
  }
  if (typeof innerKey !== "string" || innerKey.length === 0) {
    throw new RangeError("innerKey must be a non-empty string");
  }
  return {
    ...root,
    user: {
      ...inner,
      [innerKey]: newName,
    },
  };
}
