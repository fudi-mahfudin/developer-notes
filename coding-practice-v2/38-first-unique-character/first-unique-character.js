/**
 * Judul: Topik 38 — First unique character
 *
 * Soal test:
 * - firstUniqCharIndex: indeks pertama karakter yang hanya muncul sekali; tidak ada → `-1`.
 * - firstUniqChar: karakter atau `null`.
 *
 * Kontrak: perbandingan code unit (`charAt`); string ASCII untuk tes.
 *
 * Solusi: Dua pass — hitung frekuensi; scan kiri ke kanan cari count 1.
 *
 * @see knowledge-base/05-coding-interview-v2/38-first-unique-character.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/38-first-unique-character/first-unique-character.test.js`
 */

/**
 * Judul: Indeks first non-repeating
 *
 * Soal test:
 * - `"leetcode"` → `0` (`l`); `"loveleetcode"` → `2` (`v`).
 *
 * Kontrak: `s` string (boleh kosong → `-1`).
 *
 * Solusi: Map count + second loop.
 *
 * @param {string} s
 */
export function firstUniqCharIndex(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  const m = new Map();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    m.set(ch, (m.get(ch) ?? 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (m.get(s[i]) === 1) return i;
  }
  return -1;
}

/**
 * Judul: Karakter first unique atau null
 *
 * Soal test:
 * - Konsisten dengan indeks; tidak ada → `null`.
 *
 * Kontrak: sama.
 *
 * Solusi: `s[i]` jika indeks valid.
 *
 * @param {string} s
 */
export function firstUniqChar(s) {
  const i = firstUniqCharIndex(s);
  return i === -1 ? null : s[i];
}

/**
 * Judul: Semua indeks karakter yang muncul tepat sekali (urutan naik)
 *
 * Soal test:
 * - `"aba"` → `[2]` (hanya indeks `a` terakhir? actually a appears twice - only b at index 1 once) 
 *   `"aba"`: a at 0 and 2, b at 1 - only b once → [1]
 *
 * Kontrak: dua pass.
 *
 * Solusi: Map count lalu filter indeks.
 *
 * @param {string} s
 * @returns {number[]}
 */
export function allUniqueCharIndices(s) {
  if (typeof s !== "string") throw new TypeError("s must be a string");
  const m = new Map();
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    m.set(ch, (m.get(ch) ?? 0) + 1);
  }
  /** @type {number[]} */
  const out = [];
  for (let i = 0; i < s.length; i++) {
    if (m.get(s[i]) === 1) out.push(i);
  }
  return out;
}

/**
 * Judul: Karakter paling sering pertama (mode sederhana — tie-break kiri)
 *
 * Soal test:
 * - `"aabbb"` → `b` (count 3).
 *
 * Kontrak: string non-kosong.
 *
 * Solusi: Dua pass count + scan.
 *
 * @param {string} s
 */
export function firstMostFrequentChar(s) {
  if (typeof s !== "string" || s.length === 0) throw new RangeError("non-empty string");
  const m = new Map();
  for (const ch of s) m.set(ch, (m.get(ch) ?? 0) + 1);
  let best = s[0];
  let bestC = 0;
  for (const ch of s) {
    const c = m.get(ch) ?? 0;
    if (c > bestC) {
      bestC = c;
      best = ch;
    }
  }
  return best;
}
