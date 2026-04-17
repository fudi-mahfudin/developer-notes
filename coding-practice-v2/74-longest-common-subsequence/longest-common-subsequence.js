/**
 * Judul: Topik 74 — Longest Common Subsequence (LCS)
 *
 * Soal test eksplisit:
 * - longestCommonSubsequence(a,b): panjang LCS string.
 * - longestCommonSubsequencePrint: salah satu string LCS (untuk verifikasi).
 * - lcsLengthSpaceOptimized: O(min(m,n)) memori.
 *
 * Kontrak (opsional): string ASCII; indeks 0-based; subsequence = urutan tanpa harus contiguous.
 *
 * Contoh output:
 * - "abcde", "ace" → panjang 3 ("ace").
 *
 * Solusi detail: DP[i][j] = panjang LCS untuk a[0..i-1] dan b[0..j-1]; transisi jika a[i-1]===b[j-1] tambah 1, else max kiri/atas.
 *
 * @see knowledge-base/05-coding-interview-v2/74-longest-common-subsequence.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/74-longest-common-subsequence/longest-common-subsequence.test.js`
 */

/**
 * Judul: Panjang LCS — DP 2D klasik
 *
 * Soal test eksplisit:
 * - Salah satu string kosong → 0.
 *
 * Kontrak (opsional): |a|,|b| reasonable untuk O(nm) memori.
 *
 * Contoh output:
 * - "abc","abc" → 3.
 *
 * Solusi detail: tabel (m+1)×(n+1); isi baris demi baris.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function longestCommonSubsequence(a, b) {
  const m = a.length;
  const n = b.length;
  /** @type {number[][]} */
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

/**
 * Judul: Rekonstruksi satu LCS sebagai string
 *
 * Soal test eksplisit:
 * - Panjang string hasil === longestCommonSubsequence(a,b).
 *
 * Contoh output:
 * - "abcde","ace" → "ace".
 *
 * Solusi detail: backtrack dari dp[m][n]; jika char sama ambil diagonal; else max(atas, kiri).
 *
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
export function longestCommonSubsequenceString(a, b) {
  const m = a.length;
  const n = b.length;
  /** @type {number[][]} */
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  /** @type {string[]} */
  const out = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      out.push(a[i - 1]);
      i -= 1;
      j -= 1;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) i -= 1;
    else j -= 1;
  }
  return out.reverse().join("");
}

/**
 * Judul: LCS panjang dengan O(min(m,n)) memori (dua baris)
 *
 * Soal test eksplisit:
 * - Sama dengan longestCommonSubsequence untuk tes acak kecil.
 *
 * Kontrak (opsional): hanya panjang, bukan string.
 *
 * Contoh output:
 * - Hemat memori untuk string panjang.
 *
 * Solusi detail: baris prev/cur; roll tiap i.
 *
 * @param {string} a
 * @param {string} b
 */
export function lcsLengthSpaceOptimized(a, b) {
  const m = a.length;
  const n = b.length;
  /** @type {number[]} */
  let prev = Array(n + 1).fill(0);
  /** @type {number[]} */
  let cur = Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) cur[j] = prev[j - 1] + 1;
      else cur[j] = Math.max(prev[j], cur[j - 1]);
    }
    [prev, cur] = [cur, prev];
  }
  return prev[n];
}

/**
 * Judul: Longest Common Substring (bonus — contiguous) untuk kontras dengan LCS
 *
 * Soal test eksplisit:
 * - "abc","bcd" → substring terpanjang "bc" panjang 2; LCS subsequence "bc" juga 2 di contoh ini.
 *
 * Contoh output:
 * - Beda definisi: substring harus contiguous di kedua string.
 *
 * Solusi detail: dp[i][j] = jika a[i-1]===b[j-1] maka dp[i-1][j-1]+1 else 0; track max.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export function longestCommonSubstringLength(a, b) {
  const m = a.length;
  const n = b.length;
  let best = 0;
  /** @type {number[][]} */
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        best = Math.max(best, dp[i][j]);
      }
    }
  }
  return best;
}
