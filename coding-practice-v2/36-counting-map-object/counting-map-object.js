/**
 * Judul: Topik 36 — Counting dengan Map / object
 *
 * Soal test:
 * - countBy: frekuensi nilai dalam iterable (kunci `String(key)`).
 * - countChars: frekuensi per karakter (Map).
 * - totalsFromCounts: jumlah total item dari map count.
 *
 * Kontrak: kunci serializable; tidak mengubah konvensi equality `Map`.
 *
 * Solusi: Iterasi + increment; hindari prototype pollution pada plain object — gunakan `Map` atau `Object.create(null)`.
 *
 * @see knowledge-base/05-coding-interview-v2/36-counting-map-object.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/36-counting-map-object/counting-map-object.test.js`
 */

/**
 * Judul: Hitung kemunculan tiap nilai (Map)
 *
 * Soal test:
 * - `["a","b","a"]` → Map dengan `a:2`, `b:1`.
 *
 * Kontrak: iterable elemen hashable sebagai kunci Map (primitive atau object by ref).
 *
 * Solusi: `for..of` + `get/set`.
 *
 * @template T
 * @param {Iterable<T>} items
 * @returns {Map<T, number>}
 */
export function countBy(items) {
  /** @type {Map<any, number>} */
  const m = new Map();
  for (const x of items) {
    m.set(x, (m.get(x) ?? 0) + 1);
  }
  return m;
}

/**
 * Judul: Frekuensi karakter (Unicode code unit)
 *
 * Soal test:
 * - `"aba"` → `a:2`, `b:1`.
 *
 * Kontrak: `s` string.
 *
 * Solusi: `for..of` pada string.
 *
 * @param {string} s
 * @returns {Map<string, number>}
 */
export function countChars(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  return countBy(s);
}

/**
 * Judul: Jumlahkan values count map
 *
 * Soal test:
 * - Map `a:2,b:3` → `5`.
 *
 * Kontrak: nilai integer non-negatif.
 *
 * Solusi: Reduce values.
 *
 * @param {Map<unknown, number>} counts
 */
export function totalsFromCounts(counts) {
  if (!(counts instanceof Map)) throw new TypeError("counts must be a Map");
  let t = 0;
  for (const v of counts.values()) {
    if (!Number.isInteger(v) || v < 0) throw new RangeError("counts must be non-negative integers");
    t += v;
  }
  return t;
}

/**
 * Judul: Gabungkan dua map count — jumlahkan nilai untuk kunci yang sama
 *
 * Soal test:
 * - `mergeCountMaps(Map(a:1), Map(a:2,b:1))` → `a:3, b:1`.
 *
 * Kontrak: nilai integer non-negatif.
 *
 * Solusi: Iterasi kunci dari keduanya.
 *
 * @param {Map<unknown, number>} a
 * @param {Map<unknown, number>} b
 * @returns {Map<unknown, number>}
 */
export function mergeCountMaps(a, b) {
  if (!(a instanceof Map) || !(b instanceof Map)) throw new TypeError("expected Map");
  /** @type {Map<unknown, number>} */
  const out = new Map(a);
  for (const [k, v] of b) {
    if (!Number.isInteger(v) || v < 0) throw new RangeError("counts must be non-negative integers");
    out.set(k, (out.get(k) ?? 0) + v);
  }
  return out;
}

/**
 * Judul: Object literal aman (tanpa prototype) — hitung string key
 *
 * Soal test:
 * - `countByObjectKeys(["x","y","x"])` → `{ x:2, y:1 }` dengan `Object.create(null)`.
 *
 * Kontrak: kunci string; nilai integer.
 *
 * Solusi: Plain object `Object.create(null)`.
 *
 * @param {string[]} keys
 * @returns {Record<string, number>}
 */
export function countByObjectKeys(keys) {
  if (!Array.isArray(keys)) throw new TypeError("keys must be array");
  /** @type {Record<string, number>} */
  const o = Object.create(null);
  for (const k of keys) {
    if (typeof k !== "string") throw new TypeError("string keys only");
    o[k] = (o[k] ?? 0) + 1;
  }
  return o;
}

/**
 * Judul: Normalisasi — pastikan semua nilai count positif integer
 *
 * Soal test:
 * - Map valid tidak melempar; nilai negatif → `RangeError`.
 *
 * Kontrak: validasi defensif API publik.
 *
 * Solusi: Loop values.
 *
 * @param {Map<unknown, number>} counts
 */
export function assertNonNegativeIntegerCounts(counts) {
  if (!(counts instanceof Map)) throw new TypeError("counts must be a Map");
  for (const v of counts.values()) {
    if (!Number.isInteger(v) || v < 0) throw new RangeError("counts must be non-negative integers");
  }
}
