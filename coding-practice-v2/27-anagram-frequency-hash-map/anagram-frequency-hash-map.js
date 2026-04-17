/**
 * Judul: Topik 27 — Anagram & frequency counter (hash map)
 *
 * Soal test:
 * - buildFrequencyMap: frekuensi Unicode aman dengan Map.
 * - isAnagramPair: dua string multiset sama.
 * - groupAnagrams: grup berdasarkan signature frekuensi.
 * - charFrequencySignature: string kunci kanonik untuk grup.
 *
 * Ringkasan soal:
 * - Bandingkan vektor frekuensi O(n) vs sort O(n log n); grup pakai kunci string dari Map 26 atau unicode.
 *
 * Solusi: `Map` untuk karakter → count; signature `JSON.stringify([...map].sort())` atau string 26-slot.
 *
 * @see knowledge-base/05-coding-interview-v2/27-anagram-frequency-hash-map.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/27-anagram-frequency-hash-map/anagram-frequency-hash-map.test.js`
 */

/**
 * Judul: Frekuensi per karakter (Map)
 *
 * Soal test:
 * - `"aabb"` → `a:2, b:2`.
 *
 * Ringkasan soal:
 * - Mendukung Unicode (code point per `for..of`).
 *
 * Kontrak: `s` string sembarang.
 *
 * Solusi: Increment `Map`.
 *
 * @param {string} s
 * @returns {Map<string, number>}
 */
export function buildFrequencyMap(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  const m = new Map();
  for (const ch of s) {
    m.set(ch, (m.get(ch) ?? 0) + 1);
  }
  return m;
}

/**
 * Judul: Signature kanonik untuk anagram (untuk dipakai sebagai Map key)
 *
 * Soal test:
 * - `listen` dan `silent` menghasilkan signature sama.
 *
 * Ringkasan soal:
 * - Sort pasangan `[char, count]` agar deterministik.
 *
 * Kontrak: `s` string.
 *
 * Solusi: Dari `buildFrequencyMap`, serialisasi terurut.
 *
 * @param {string} s
 */
export function charFrequencySignature(s) {
  const m = buildFrequencyMap(s);
  const entries = [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  return JSON.stringify(entries);
}

/**
 * Judul: Apakah anagram (panjang sama + frekuensi sama)
 *
 * Soal test:
 * - `anagram` / `nagaram` true; `rat` / `car` false.
 *
 * Ringkasan soal:
 * - Case-sensitive sesuai string JS.
 *
 * Kontrak: dua string.
 *
 * Solusi: Bandingkan signature atau bandingkan Map.
 *
 * @param {string} a
 * @param {string} b
 */
export function isAnagramPair(a, b) {
  if (typeof a !== "string" || typeof b !== "string") throw new TypeError("expected strings");
  if (a.length !== b.length) return false;
  return charFrequencySignature(a) === charFrequencySignature(b);
}

/**
 * Judul: Group anagrams (array string)
 *
 * Soal test:
 * - Input LeetCode klasik: kata-kata anagram satu grup.
 *
 * Ringkasan soal:
 * - Kunci: signature frekuensi.
 *
 * Kontrak: `strs` array string.
 *
 * Solusi: `Map<string, string[]>` akumulasi.
 *
 * @param {string[]} strs
 * @returns {string[][]}
 */
export function groupAnagrams(strs) {
  if (!Array.isArray(strs)) throw new TypeError("strs must be an array");
  /** @type {Map<string, string[]>} */
  const map = new Map();
  for (const w of strs) {
    if (typeof w !== "string") throw new TypeError("every element must be a string");
    const key = charFrequencySignature(w);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(w);
  }
  return [...map.values()];
}

/**
 * Judul: Kurangi frekuensi `sub` dari `super_` (multiset inclusion)
 *
 * Soal test:
 * - `canSubtractFrequency("aabc", "ab")` true; `canSubtractFrequency("a", "aa")` false.
 *
 * Ringkasan soal:
 * - Dipakai window anagram / “bisa membentuk” dari huruf cadangan.
 *
 * Kontrak: string nonnegatif counts.
 *
 * Solusi: Clone map lalu decrement.
 *
 * @param {string} super_
 * @param {string} sub
 */
export function canSubtractFrequency(super_, sub) {
  if (typeof super_ !== "string" || typeof sub !== "string") throw new TypeError("expected strings");
  const m = buildFrequencyMap(super_);
  for (const ch of sub) {
    const c = (m.get(ch) ?? 0) - 1;
    if (c < 0) return false;
    m.set(ch, c);
  }
  return true;
}
