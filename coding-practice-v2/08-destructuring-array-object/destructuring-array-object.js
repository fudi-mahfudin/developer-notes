/**
 * Judul: Topik 8 — Destructuring array dan object
 *
 * Soal test:
 * - swapImmutable: `[1,2,3]` indeks 0↔2 → `[3,2,1]`; array asal tidak berubah.
 * - pickKeys: hanya key yang diminta dan yang ada di sumber.
 * - mapRowToUserDto: `{ id, name }` → `{ userId, name }` dengan rename id.
 *
 * Ringkasan soal:
 * - Swap / rest / default value.
 * - Rename property dan nested pick.
 *
 * Solusi: Sintaks destructuring untuk API yang stabil dan membaca field dengan nama baru.
 *
 * @see knowledge-base/05-coding-interview-v2/08-destructuring-array-object.md
 *
 * Menjalankan tes: dari root repo Career, jalankan `pnpm test`.
 */

/**
 * Judul: Swap dua elemen array (imutabel)
 *
 * Soal test:
 * - `swapImmutable([1,2,3], 0, 2)` → `[3,2,1]`; argumen array asal tetap `[1,2,3]`.
 *
 * Ringkasan soal:
 * - Kembalikan array baru dengan indeks `i` dan `j` ditukar.
 *
 * Kontrak:
 * - `arr` array; `i`, `j` indeks valid integer; jika tidak → `RangeError`.
 *
 * Solusi: Salin dengan spread lalu `[a[i], a[j]] = [a[j], a[i]]` pada salinan, atau destructuring tuple.
 *
 * @template T
 * @param {T[]} arr
 * @param {number} i
 * @param {number} j
 * @returns {T[]}
 */
export function swapImmutable(arr, i, j) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  if (!Number.isInteger(i) || !Number.isInteger(j)) throw new RangeError("indices must be integers");
  if (i < 0 || j < 0 || i >= arr.length || j >= arr.length) {
    throw new RangeError("indices out of range");
  }
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

/**
 * Judul: Pick subset key dari object
 *
 * Soal test:
 * - `pickKeys({ a:1, b:2, c:3 }, ["a","c"])` → `{ a:1, c:3 }`.
 *
 * Ringkasan soal:
 * - Dari `source`, ambil hanya `keys`.
 *
 * Kontrak: `source` object; `keys` array string unik; jika key tidak ada → properti dihilangkan atau `undefined` — di sisi ini hanya copy yang ada.
 *
 * Solusi: `Object.fromEntries` + `keys.map`.
 *
 * @param {Record<string, unknown>} source
 * @param {string[]} keys
 */
export function pickKeys(source, keys) {
  if (source === null || typeof source !== "object" || Array.isArray(source)) {
    throw new TypeError("source must be a non-null object");
  }
  if (!Array.isArray(keys)) throw new TypeError("keys must be an array");
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(source, k)) {
      out[k] = source[k];
    }
  }
  return out;
}

/**
 * Judul: Rename field — `id` sebagai `userId`
 *
 * Soal test:
 * - `mapRowToUserDto({ id: 9, name: "Ada" })` → `{ userId: 9, name: "Ada" }`.
 *
 * Ringkasan soal:
 * - Input `{ id: number, name: string }` → `{ userId, name }`.
 *
 * Kontrak: `id` harus ada dan bertipe number finite; jika tidak → `RangeError`.
 *
 * Solusi: `const { id: userId, ...rest }` atau eksplisit.
 *
 * @param {{ id: number; name: string }} row
 */
export function mapRowToUserDto(row) {
  if (row === null || typeof row !== "object") throw new TypeError("row must be an object");
  const { id, name } = row;
  if (typeof id !== "number" || !Number.isFinite(id)) throw new RangeError("id must be a finite number");
  if (typeof name !== "string") throw new RangeError("name must be a string");
  return { userId: id, name };
}
