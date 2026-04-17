/**
 * Judul: Topik 28 — String matching (brute force & KMP)
 *
 * Soal test:
 * - findAllOccurrencesBrute: semua indeks awal kemunculan pola.
 * - kmpSearch: hasil sama dengan brute pada kasus ASCII.
 * - computeLPS: tabel prefix function untuk KMP.
 *
 * Ringkasan soal:
 * - Brute O(nm); KMP O(n+m) dengan geser pola memakai LPS tanpa mundur di teks.
 *
 * Solusi: KMP klasik: `while j>0 && text[i]!==pattern[j] j=lps[j-1]`; match `j===m`.
 *
 * @see knowledge-base/05-coding-interview-v2/28-string-matching-basics.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/28-string-matching-basics/string-matching-basics.test.js`
 */

/**
 * Judul: Brute force — semua kemunculan
 *
 * Soal test:
 * - `"ababa"`, `"aba"` → `[0, 2]`.
 *
 * Ringkasan soal:
 * - Perbandingan karakter per offset.
 *
 * Kontrak: `text`, `pattern` string; pola kosong → definisikan sebagai tidak match / `[]` (di sini `[]`).
 *
 * Solusi: Dua loop.
 *
 * @param {string} text
 * @param {string} pattern
 * @returns {number[]}
 */
export function findAllOccurrencesBrute(text, pattern) {
  if (typeof text !== "string" || typeof pattern !== "string") {
    throw new TypeError("text and pattern must be strings");
  }
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return [];
  /** @type {number[]} */
  const out = [];
  for (let i = 0; i + m <= n; i++) {
    let ok = true;
    for (let j = 0; j < m; j++) {
      if (text[i + j] !== pattern[j]) {
        ok = false;
        break;
      }
    }
    if (ok) out.push(i);
  }
  return out;
}

/**
 * Judul: LPS (longest prefix which is also suffix) untuk KMP
 *
 * Soal test:
 * - `"ababac"` menghasilkan tabel konsisten dengan definisi.
 *
 * Ringkasan soal:
 * - `lps[i]` = panjang proper prefix terpanjang dari `pattern[0..i]` yang juga suffix.
 *
 * Kontrak: `pattern` string non-kosong.
 *
 * Solusi: Satu pass dengan pointer `len`.
 *
 * @param {string} pattern
 * @returns {number[]}
 */
export function computeLPS(pattern) {
  if (typeof pattern !== "string") throw new TypeError("pattern must be a string");
  const m = pattern.length;
  if (m === 0) return [];
  /** @type {number[]} */
  const lps = new Array(m).fill(0);
  let len = 0;
  for (let i = 1; i < m; i++) {
    while (len > 0 && pattern[i] !== pattern[len]) {
      len = lps[len - 1];
    }
    if (pattern[i] === pattern[len]) len += 1;
    lps[i] = len;
  }
  return lps;
}

/**
 * Judul: KMP — semua kemunculan
 *
 * Soal test:
 * - Hasil identik dengan `findAllOccurrencesBrute` untuk berkas uji ASCII.
 *
 * Ringkasan soal:
 * - Satu pass linear pada teks.
 *
 * Kontrak: pola kosong → `[]`.
 *
 * Solusi: KMP standar.
 *
 * @param {string} text
 * @param {string} pattern
 * @returns {number[]}
 */
export function kmpSearch(text, pattern) {
  if (typeof text !== "string" || typeof pattern !== "string") {
    throw new TypeError("text and pattern must be strings");
  }
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return [];
  const lps = computeLPS(pattern);
  /** @type {number[]} */
  const out = [];
  let j = 0;
  for (let i = 0; i < n; i++) {
    while (j > 0 && text[i] !== pattern[j]) {
      j = lps[j - 1];
    }
    if (text[i] === pattern[j]) j += 1;
    if (j === m) {
      out.push(i - m + 1);
      j = lps[j - 1];
    }
  }
  return out;
}

/**
 * Judul: Boolean — apakah pola muncul sekali saja
 *
 * Soal test:
 * - `containsPattern("hello", "ll")` true.
 *
 * Ringkasan soal:
 * - Early exit cepat; bisa `text.includes` tetapi di sini pakai KMP untuk konsistensi.
 *
 * Kontrak: string.
 *
 * Solusi: `kmpSearch` panjang ≥ 1.
 *
 * @param {string} text
 * @param {string} pattern
 */
export function containsPattern(text, pattern) {
  return kmpSearch(text, pattern).length > 0;
}
