# Palindromic Substrings

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Expand around center / DP
- **Inti masalah:** Hitung **jumlah** substring palindrome (termasuk karakter tunggal), bisa overlapping.

---

- Soal: `countSubstrings(s)` int.
- Input: string
- Output: count
- Constraints utama: O(n²) centers expand count ++ per layer; DP `dp[i][j]` cumulative.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Mirip longest palindrome tetapi **tiap** expand increment `ans++` setiap widening step (each valid window). Atau DP: `if s[i]==s[j] && (j-i<2 || dp[i+1][j-1])` then `dp[i][j]=true`, `ans++`. O(n²).

Struktur cepat:
- Observasi inti masalah: Each palindrome uniquely identified by its center expansion layers counting.
- Strategi final yang dipilih: Center expansion counting or DP boolean grid.
- Kenapa strategi ini paling cocok: O(n²) straightforward.
- Time complexity: O(n²)
- Space complexity: O(1) expand; O(n²) DP
- Edge case utama: all same chars `n(n+1)/2` palindromes.

## 3) Versi Ultra Singkat (10-20 detik)

> Expand from each center; each valid expansion adds one palindrome count.

## 4) Pseudocode Ringkas (5-10 baris)

```text
ans = 0
for each center expand odd/even:
  while palindrome:
    ans++
    expand
return ans
```

## 5) Implementasi Final (Inti Saja)

```js
function countSubstrings(s) {
  const n = s.length;
  let ans = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < n && s[l] === s[r]) {
      ans++;
      l--;
      r++;
    }
  };
  for (let i = 0; i < n; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return ans;
}
```

## 6) Bukti Correctness (Wajib)

- Every palindrome has unique center expansion sequence counted exactly once when expanding from its central axis.

## 7) Dry Run Singkat

- `"abc"` → 3 single letters; `"aaa"` → 6.

## 8) Red Flags (Yang Harus Dihindari)

- Counting duplicates wrong — each substring distinct by indices.

## 9) Follow-up yang Sering Muncul

- Longest palindromic substring — same expand machinery.

## 10) Trade-off Keputusan

- DP table if need substrings info later — expand simpler counting only.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: —

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Palindrome counting
- Inti masalah (1 kalimat): Count all palindrome substrings.
- Soal: Integer.
- Strategi final: Center expand tally
- Kompleksitas: O(n²), O(1)
- 2 edge case: single char string; repeated chars
- 1 potensi bug: double count same substring
- 1 alasan valid: each palindrome found from unique center width
