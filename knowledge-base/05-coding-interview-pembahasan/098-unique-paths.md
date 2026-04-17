# Unique Paths

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Dynamic programming / combinatorics
- **Inti masalah:** Grid `m×n`; dari kiri-atas ke kanan-bawah hanya gerak **kanan atau bawah**; hitung **banyak** jalur berbeda.

---

- Soal: `uniquePaths(m, n)` int.
- Input: dimensi grid
- Constraints utama: `dp[i][j] = dp[i-1][j] + dp[i][j-1]`; base row/col 1; space O(n) rolling row. Combinatorics `C(m+n-2, m-1)`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Setiap jalur butuh `(m-1)` down dan `(n-1)` right steps — total `m+n-2` steps pilih mana `m-1` adalah down → binomial coefficient. **DP grid**: `dp[0][*]=dp[*][0]=1`; nested loops `dp[i][j]=dp[i-1][j]+dp[i][j-1]`. O(mn) time, O(n) optimized. Hindari overflow use BigInt if combinatorics direct.

Struktur cepat:
- Observasi inti masalah: Paths decompose from cell above or left only — additive recurrence.
- Strategi final yang dipilih: 1D DP row update or math combination.
- Kenapa strategi ini paling cocok: Simple and integer-friendly for moderate sizes.
- Time complexity: O(mn) DP; O(min(m,n)) multiplicative for binomial
- Space complexity: O(n) rolling
- Edge case utama: m or n = 1 → 1 path.

## 3) Versi Ultra Singkat (10-20 detik)

> dp path counts = sum of up + left; or combinations C(m+n-2,m-1).

## 4) Pseudocode Ringkas (5-10 baris)

```text
row = [1]*n
for i in 1..m-1:
  for j in 1..n-1:
    row[j] += row[j-1]
return row[n-1]
```

## 5) Implementasi Final (Inti Saja)

```js
function uniquePaths(m, n) {
  const row = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) row[j] += row[j - 1];
  }
  return row[n - 1];
}
```

## 6) Bukti Correctness (Wajib)

- First cell in row always 1; each interior cell splits exclusively from up or left incoming path counts.

## 7) Dry Run Singkat

- `m=3,n=7` → 28.

## 8) Red Flags (Yang Harus Dihindari)

- factorial overflow in combination without reduction.

## 9) Follow-up yang Sering Muncul

- Unique paths II with obstacles — `if obstacle dp=0`.

## 10) Trade-off Keputusan

- Math formula faster if big modulus prime inverse needed — DP simpler.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 10/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: —

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Grid DP / combinatorics
- Inti masalah (1 kalimat): Count monotonic right/down paths.
- Soal: Integer.
- Strategi final: 1D rolling DP
- Kompleksitas: O(mn) time, O(n) space
- 2 edge case: single row or column; 1x1
- 1 potensi bug: initialize row all ones
- 1 alasan valid: Pascal on grid path lattice
