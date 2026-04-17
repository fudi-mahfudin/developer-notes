/**
 * Judul: Topik 32 — Longest common prefix / substring
 *
 * Soal test:
 * - longestCommonPrefix: array string — prefix bersama semua.
 * - longestCommonSubstring: dua string — substring kontigu panjang maksimum (DP O(n*m)).
 *
 * Kontrak: string ASCII; substring memakai indeks byte (bukan grapheme).
 *
 * Solusi: Prefix: sort + bandingkan ujung; substring: `dp[i][j]` panjang LC suffix ending at i-1,j-1.
 *
 * @see knowledge-base/05-coding-interview-v2/32-longest-common-prefix-substring.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/32-longest-common-prefix-substring/longest-common-prefix-substring.test.js`
 */

/**
 * Judul: Prefix bersama semua string dalam array
 *
 * Soal test:
 * - `["flower","flow","flight"]` → `"fl"`; `["dog","racecar","car"]` → `""`.
 *
 * Kontrak: `strs` non-kosong; setiap elemen string.
 *
 * Solusi: Bandingkan karakter per indeks sampai mismatch atau min length.
 *
 * @param {string[]} strs
 */
export function longestCommonPrefix(strs) {
  if (!Array.isArray(strs) || strs.length === 0) throw new RangeError("strs must be non-empty");
  for (const w of strs) {
    if (typeof w !== "string") throw new TypeError("every element must be string");
  }
  let minLen = Infinity;
  for (const w of strs) minLen = Math.min(minLen, w.length);
  let i = 0;
  while (i < minLen) {
    const c = strs[0][i];
    for (let k = 1; k < strs.length; k++) {
      if (strs[k][i] !== c) return strs[0].slice(0, i);
    }
    i += 1;
  }
  return strs[0].slice(0, minLen);
}

/**
 * Judul: Substring kontigu terpanjang yang sama di dua string
 *
 * Soal test:
 * - `"abcde"`, `"xbcdza"` → `"bcd"` (panjang 3).
 *
 * Kontrak: `a`, `b` string (boleh kosong → `""`).
 *
 * Solusi: DP `dp[j+1][i+1] = dp[i][j]+1` jika `a[i]===b[j]`.
 *
 * @param {string} a
 * @param {string} b
 */
export function longestCommonSubstring(a, b) {
  if (typeof a !== "string" || typeof b !== "string") throw new TypeError("a and b must be strings");
  const n = a.length;
  const m = b.length;
  if (n === 0 || m === 0) return "";
  /** @type {number[][]} */
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  let best = 0;
  let endA = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > best) {
          best = dp[i][j];
          endA = i;
        }
      }
    }
  }
  if (best === 0) return "";
  return a.slice(endA - best, endA);
}

/**
 * Judul: Panjang saja — substring umum
 *
 * Soal test:
 * - Sama numerik dengan `longestCommonSubstring(...).length`.
 *
 * Kontrak: sama.
 *
 * Solusi: Delegasi ke fungsi substring penuh (O(nm) waktu).
 *
 * @param {string} a
 * @param {string} b
 */
export function longestCommonSubstringLength(a, b) {
  return longestCommonSubstring(a, b).length;
}

/**
 * Judul: Panjang prefix bersama — angka saja
 *
 * Soal test:
 * - Sama dengan `longestCommonPrefix(strs).length`.
 *
 * Kontrak: `strs` non-kosong.
 *
 * Solusi: Delegasi.
 *
 * @param {string[]} strs
 */
export function longestCommonPrefixLength(strs) {
  return longestCommonPrefix(strs).length;
}

/**
 * Judul: Apakah semua string berbagi prefix panjang `len`
 *
 * Soal test:
 * - `["flow","flower","flight"]`, len 2 → true (`fl`).
 *
 * Kontrak: `strs` non-kosong; `len` ≤ panjang minimum.
 *
 * Solusi: Bandingkan slice pertama dengan semua.
 *
 * @param {string[]} strs
 * @param {number} len
 */
export function allSharePrefixOfLength(strs, len) {
  if (!Array.isArray(strs) || strs.length === 0) throw new RangeError("strs must be non-empty");
  if (!Number.isInteger(len) || len < 0) throw new RangeError("len must be non-negative integer");
  if (len === 0) return true;
  const base = strs[0];
  if (typeof base !== "string") throw new TypeError("strings only");
  if (base.length < len) return false;
  const pref = base.slice(0, len);
  for (let k = 1; k < strs.length; k++) {
    const w = strs[k];
    if (typeof w !== "string") throw new TypeError("strings only");
    if (w.slice(0, len) !== pref) return false;
  }
  return true;
}
