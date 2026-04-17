/**
 * Judul: Topik 39 — Group by key
 *
 * Soal test:
 * - groupBy: fungsi key — `Map` key → array elemen.
 * - groupAnagrams: signature frekuensi seperti topik 27.
 *
 * Kontrak: key stabil dan comparable via `Map`.
 *
 * Solusi: Reduce ke `Map`; untuk anagram gunakan string signature terurut.
 *
 * @see knowledge-base/05-coding-interview-v2/39-group-by-key.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/39-group-by-key/group-by-key.test.js`
 */

/**
 * Judul: Group by callback key
 *
 * Soal test:
 * - Kelompokkan bilangan genap/ganjil.
 *
 * Kontrak: `items` array; `keyFn` murni.
 *
 * Solusi: `Map` dengan key dari `keyFn(x)`.
 *
 * @template T
 * @template K
 * @param {T[]} items
 * @param {(x: T) => K} keyFn
 * @returns {Map<K, T[]>}
 */
export function groupBy(items, keyFn) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  if (typeof keyFn !== "function") throw new TypeError("keyFn must be a function");
  /** @type {Map<any, any[]>} */
  const m = new Map();
  for (const x of items) {
    const k = keyFn(x);
    if (!m.has(k)) m.set(k, []);
    m.get(k).push(x);
  }
  return m;
}

/**
 * Judul: Signature frekuensi untuk anagram
 *
 * Soal test:
 * - Dua anagram → signature sama.
 *
 * Kontrak: huruf kecil `a-z`.
 *
 * Solusi: Array 26 counter → join.
 *
 * @param {string} s
 */
function anagramKey(s) {
  const c = new Array(26).fill(0);
  for (const ch of s) {
    const i = ch.charCodeAt(0) - 97;
    if (i < 0 || i >= 26) throw new RangeError("only a-z");
    c[i] += 1;
  }
  return c.join("#");
}

/**
 * Judul: Group anagrams
 *
 * Soal test:
 * - Mirip LeetCode 49.
 *
 * Kontrak: kata huruf kecil.
 *
 * Solusi: `groupBy` dengan `anagramKey`.
 *
 * @param {string[]} strs
 * @returns {string[][]}
 */
export function groupAnagramsByKey(strs) {
  if (!Array.isArray(strs)) throw new TypeError("strs must be an array");
  const m = groupBy(strs, (w) => {
    if (typeof w !== "string") throw new TypeError("strings only");
    return anagramKey(w);
  });
  return [...m.values()];
}

/**
 * Judul: Group by properti object (nama field)
 *
 * Soal test:
 * - `[{k:1},{k:2},{k:1}]` by `k` → dua grup.
 *
 * Kontrak: setiap item object dengan field tersebut.
 *
 * Solusi: `keyFn = (x) => x[field]`.
 *
 * @template T extends Record<string, unknown>
 * @param {T[]} items
 * @param {string} field
 * @returns {Map<unknown, T[]>}
 */
export function groupByField(items, field) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  if (typeof field !== "string") throw new TypeError("field must be string");
  return groupBy(items, (x) => {
    if (x === null || typeof x !== "object") throw new TypeError("objects only");
    return /** @type {Record<string, unknown>} */ (x)[field];
  });
}

/**
 * Judul: Index unik — satu entri per key (throw jika duplikat key)
 *
 * Soal test:
 * - `[{id:1},{id:2}]` → Map size 2.
 *
 * Kontrak: key unik.
 *
 * Solusi: Loop; jika key ada → `RangeError`.
 *
 * @template T
 * @param {T[]} items
 * @param {(x: T) => string} keyFn
 * @returns {Map<string, T>}
 */
export function keyByUnique(items, keyFn) {
  if (!Array.isArray(items)) throw new TypeError("items must be an array");
  if (typeof keyFn !== "function") throw new TypeError("keyFn must be a function");
  /** @type {Map<string, T>} */
  const m = new Map();
  for (const x of items) {
    const k = String(keyFn(x));
    if (m.has(k)) throw new RangeError(`duplicate key: ${k}`);
    m.set(k, x);
  }
  return m;
}
