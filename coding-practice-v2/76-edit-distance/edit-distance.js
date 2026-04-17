/**
 * Judul: Topik 76 — Edit distance (Levenshtein): insert, delete, substitute
 *
 * Soal test eksplisit:
 * - minDistance(s,t): jarak edit minimum; "" ke string → panjang string.
 * - minDistanceOneRow: versi O(min(m,n)) memori (dua baris atau satu baris + var).
 *
 * Kontrak (opsional): operasi sama biaya 1; string ASCII.
 *
 * Contoh output:
 * - "horse","ros" → 3.
 *
 * Solusi detail: DP[i][j] = min hapus, tambah, ganti; base dp[i][0]=i, dp[0][j]=j.
 *
 * @see knowledge-base/05-coding-interview-v2/76-edit-distance.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/76-edit-distance/edit-distance.test.js`
 */

/**
 * Judul: Levenshtein distance — DP penuh
 *
 * Soal test eksplisit:
 * - Dua string sama → 0.
 *
 * Contoh output:
 * - "intention","execution" → 5 (contoh klasik).
 *
 * Solusi detail: if s[i-1]===t[j-1] cost 0 else 1; dp[i][j]=min(dp[i-1][j]+1, dp[i][j-1]+1, dp[i-1][j-1]+cost).
 *
 * @param {string} word1
 * @param {string} word2
 * @returns {number}
 */
export function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  /** @type {number[][]} */
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[m][n];
}

/**
 * Judul: Edit distance — O(n) memori (satu baris)
 *
 * Soal test eksplisit:
 * - Sama dengan minDistance untuk semua pasangan pendek.
 *
 * Kontrak (opsional): hanya menyimpan baris sebelumnya.
 *
 * Contoh output:
 * - Hemat memori untuk string panjang.
 *
 * Solusi detail: prev[j] = dp[i-1][j]; cur[j] dihitung dari prev dan cur[j-1].
 *
 * @param {string} word1
 * @param {string} word2
 */
export function minDistanceOneRow(word1, word2) {
  if (word1.length < word2.length) return minDistanceOneRow(word2, word1);
  const m = word1.length;
  const n = word2.length;
  /** @type {number[]} */
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  /** @type {number[]} */
  let cur = Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = word1[i - 1] === word2[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    const t = prev;
    prev = cur;
    cur = t;
  }
  return prev[n];
}

/**
 * Judul: Hanya delete + insert (tanpa substitute) — jarak LCS-related / indel only
 *
 * Soal test eksplisit:
 * - Panjang |m-n| + 2*something — gunakan sebagai varian dokumentasi.
 *
 * Contoh output:
 * - Untuk bandingkan dengan full edit distance.
 *
 * Solusi detail: max(len1,len2) - 2*LCS? Actually indel only distance = len1+len2-2*LCS.
 *
 * @param {string} a
 * @param {string} b
 */
export function indelOnlyDistance(a, b) {
  const lcs = lcsLenSimple(a, b);
  return a.length + b.length - 2 * lcs;
}

/**
 * @param {string} a
 * @param {string} b
 */
function lcsLenSimple(a, b) {
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
 * Judul: Apakah edit distance ≤ k (pruning untuk wawancara)
 *
 * Soal test eksplisit:
 * - k=0 hanya jika string sama.
 *
 * @param {string} a
 * @param {string} b
 * @param {number} k
 */
export function isEditDistanceAtMost(a, b, k) {
  return minDistance(a, b) <= k;
}
