/**
 * Judul: Topik 41 — Longest substring without repeating characters
 *
 * Soal test:
 * - lengthOfLongestSubstring: panjang maksimum substring tanpa duplikat (sliding window + Map last index).
 *
 * Kontrak: string ASCII/code unit; window `left` geser saat duplikat.
 *
 * Solusi: `right` expand; jika `ch` pernah di jendela, `left = max(left, last[ch]+1)`.
 *
 * @see knowledge-base/05-coding-interview-v2/41-longest-substring-without-repeat.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/41-longest-substring-without-repeat/longest-substring-without-repeat.test.js`
 */

/**
 * Judul: Panjang substring terpanjang tanpa karakter berulang
 *
 * Soal test:
 * - `"abcabcbb"` → `3` (`abc`); `"bbbbb"` → `1`.
 *
 * Kontrak: `s` string (boleh kosong → `0`).
 *
 * Solusi: Sliding window O(n); `last` map indeks terakhir.
 *
 * @param {string} s
 */
export function lengthOfLongestSubstring(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  /** @type {Map<string, number>} */
  const last = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch)) {
      left = Math.max(left, (last.get(ch) ?? 0) + 1);
    }
    last.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

/**
 * Judul: Panjang substring terpanjang dengan paling banyak `maxDistinct` karakter berbeda
 *
 * Soal test:
 * - `maxDistinct=2` pada `"eceba"` → `3` (sama dengan sliding window topik 17).
 *
 * Kontrak: `maxDistinct` integer ≥ 1.
 *
 * Solusi: Map frekuensi + shrink `left`.
 *
 * @param {string} s
 * @param {number} maxDistinct
 */
export function lengthOfLongestSubstringKDistinct(s, maxDistinct) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  if (!Number.isInteger(maxDistinct) || maxDistinct < 1) throw new RangeError("maxDistinct must be >= 1");
  /** @type {Map<string, number>} */
  const freq = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
    while (freq.size > maxDistinct) {
      const lc = s[left];
      const c = /** @type {number} */ (freq.get(lc)) - 1;
      if (c === 0) freq.delete(lc);
      else freq.set(lc, c);
      left += 1;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}

/**
 * Judul: Cek apakah ada substring panjang `len` tanpa duplikat
 *
 * Soal test:
 * - `"abcd"`, len 4 → true; `"aabb"`, len 3 → false.
 *
 * Kontrak: `len` ≥ 0.
 *
 * Solusi: `lengthOfLongestSubstring(s) >= len`.
 *
 * @param {string} s
 * @param {number} len
 */
export function hasSubstringNoRepeatOfLength(s, len) {
  if (!Number.isInteger(len) || len < 0) throw new RangeError("len must be non-negative integer");
  return lengthOfLongestSubstring(s) >= len;
}

/**
 * Judul: Alias — panjang substring unik klasik (nama soal LeetCode)
 *
 * Soal test:
 * - Identik dengan `lengthOfLongestSubstring`.
 *
 * @param {string} s
 */
export function lengthOfLongestSubstringNoRepeat(s) {
  return lengthOfLongestSubstring(s);
}
