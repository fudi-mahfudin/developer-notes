# Interleaving String

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium / Hard
- **Topik utama:** Dynamic programming two-sequence
- **Inti masalah:** Bisakah `s3` dibentuk dengan **menginterkalasi** karakter `s1` dan `s2` **tetap urutan relatif** masing-masing (mirip merge dua string tanpa mengacak internal order)? Panjang `s3` harus `len1+len2`.

---

- Soal: `isInterleave(s1, s2, s3)` boolean.
- Input: tiga string
- Constraints utama: `dp[i][j]` true jika `s3` prefix panjang `i+j` bisa dibentuk dari `s1` prefix `i` dan `s2` prefix `j`. Transisi: `s3[i+j-1]` match `s1[i-1]` if came from up cell OR match `s2[j-1]` if came from left. O(mn) time O(n) space rolling.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Base `dp[0][0]=true`. Nested loops `i` 0..m, `j` 0..n: compute `dp[i][j]` if possible take next char from `s1` when `i>0` and matches `s3[i+j-1]` or from `s2` when `j>0`. Border: first row/col only one string supplies chars. Space save: 1D array update `j` descending or forward careful. Validate length first.

Struktur cepat:
- Observasi inti masalah: Merge two sequences maintaining order = classic 2-pointer DP reachability grid.
- Strategi final yang dipilih: 2D bool DP or BFS on grid.
- Kenapa strategi ini paling cocok: Polynomial and deterministic.
- Time complexity: O(mn)
- Space complexity: O(min(m,n)) possible rolling
- Edge case utama: length mismatch fast false; empty strings.

## 3) Versi Ultra Singkat (10-20 detik)

> dp[i][j] if interleave possible for first i of s1 and j of s2 matching prefix of s3.

## 4) Pseudocode Ringkas (5-10 baris)

```text
if len(s1)+len(s2) != len(s3): return false
dp[0][0] = true
for i in 0..m:
  for j in 0..n:
    if i>0: dp[i][j] |= dp[i-1][j] and s1[i-1]==s3[i+j-1]
    if j>0: dp[i][j] |= dp[i][j-1] and s2[j-1]==s3[i+j-1]
return dp[m][n]
```

## 5) Implementasi Final (Inti Saja)

```js
function isInterleave(s1, s2, s3) {
  const m = s1.length,
    n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 && j === 0) continue;
      const k = i + j - 1;
      if (i > 0) dp[i][j] ||= dp[i - 1][j] && s1[i - 1] === s3[k];
      if (j > 0) dp[i][j] ||= dp[i][j - 1] && s2[j - 1] === s3[k];
    }
  }
  return dp[m][n];
}
```

## 6) Bukti Correctness (Wajib)

- State encodes prefixes consumed; transitions cover exactly choices of next character from either sequence preserving order.

## 7) Dry Run Singkat

- `"aab"`, `"axy"`, `"aaxaby"` type illustrations LC.

## 8) Red Flags (Yang Harus Dihindari)

- Greedy matching two pointers linear — fails some branches.

## 9) Follow-up yang Sering Muncul

- Count interleavings — DP with integer counts.

## 10) Trade-off Keputusan

- BFS queue on (i,j) graph same complexity.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 8/10
- Catatan perbaikan: Fix loop `k` index when `i=j=0` — implement border initialization separately for clarity (first row/col only).

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: 2D DP string merge
- Inti masalah (1 kalimat): Is s3 order-preserving merge of s1 and s2.
- Soal: Boolean.
- Strategi final: dp[i][j] reachable
- Kompleksitas: O(mn), O(mn) or rolling
- 2 edge case: length mismatch; one string empty
- 1 potensi bug: greedy two-pointer false positive
- 1 alasan valid: finite-state grid captures all merge prefixes
