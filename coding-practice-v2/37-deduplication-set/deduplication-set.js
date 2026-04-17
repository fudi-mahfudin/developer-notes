/**
 * Judul: Topik 37 — Deduplication dengan Set
 *
 * Soal test:
 * - uniqueArray: urutan pertama kali muncul dipertahankan.
 * - uniqueCount: banyak elemen unik.
 * - hasAllUnique: apakah array tanpa duplikat.
 *
 * Kontrak: elemen primitive atau perbandingan referensi untuk object.
 *
 * Solusi: `Set` + filter linear; atau Set size vs length.
 *
 * @see knowledge-base/05-coding-interview-v2/37-deduplication-set.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/37-deduplication-set/deduplication-set.test.js`
 */

/**
 * Judul: Unik — stabil (pertahankan urutan pertama)
 *
 * Soal test:
 * - `[1,2,1,3]` → `[1,2,3]`.
 *
 * Kontrak: `arr` array sembarang.
 *
 * Solusi: `Set` + push saat belum ada.
 *
 * @template T
 * @param {T[]} arr
 * @returns {T[]}
 */
export function uniqueArray(arr) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  const seen = new Set();
  /** @type {any[]} */
  const out = [];
  for (const x of arr) {
    if (seen.has(x)) continue;
    seen.add(x);
    out.push(x);
  }
  return out;
}

/**
 * Judul: Banyak nilai unik
 *
 * Soal test:
 * - `[1,1,2]` → `2`.
 *
 * Kontrak: sama.
 *
 * Solusi: `new Set(arr).size`.
 *
 * @template T
 * @param {T[]} arr
 */
export function uniqueCount(arr) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  return new Set(arr).size;
}

/**
 * Judul: Semua elemen berbeda
 *
 * Soal test:
 * - `[1,2,3]` true; `[1,1]` false.
 *
 * Kontrak: sama.
 *
 * Solusi: `uniqueCount === length`.
 *
 * @template T
 * @param {T[]} arr
 */
export function hasAllUnique(arr) {
  if (!Array.isArray(arr)) throw new TypeError("arr must be an array");
  return uniqueCount(arr) === arr.length;
}

/**
 * Judul: Irisan dua array (urutan tidak dijamin)
 *
 * Soal test:
 * - `[1,2,3]` ∩ `[2,4]` → mengandung `2`.
 *
 * Kontrak: perbandingan `===`.
 *
 * Solusi: Set kecil iterasi.
 *
 * @template T
 * @param {T[]} a
 * @param {T[]} b
 * @returns {T[]}
 */
export function intersectionArrays(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) throw new TypeError("arrays expected");
  const sb = new Set(b);
  /** @type {Set<any>} */
  const seen = new Set();
  /** @type {any[]} */
  const out = [];
  for (const x of a) {
    if (!sb.has(x) || seen.has(x)) continue;
    seen.add(x);
    out.push(x);
  }
  return out;
}

/**
 * Judul: Elemen di `a` yang tidak ada di `b`
 *
 * Soal test:
 * - `[1,2,1]`, `[2]` → `[1]` stabil pertama.
 *
 * Kontrak: filter dengan Set `b`.
 *
 * Solusi: Satu pass.
 *
 * @template T
 * @param {T[]} a
 * @param {T[]} b
 */
export function differenceArrays(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) throw new TypeError("arrays expected");
  const sb = new Set(b);
  /** @type {any[]} */
  const out = [];
  for (const x of a) {
    if (!sb.has(x)) out.push(x);
  }
  return out;
}

/**
 * Judul: Gabungan unik (set union sebagai array — urutan: dulu `a` lalu sisa `b`)
 *
 * Soal test:
 * - `[1,2]`, `[2,3]` → `[1,2,3]`.
 *
 * Kontrak: primitive equality.
 *
 * Solusi: `uniqueArray([...a,...b])`.
 *
 * @template T
 * @param {T[]} a
 * @param {T[]} b
 */
export function unionUnique(a, b) {
  return uniqueArray([...a, ...b]);
}
