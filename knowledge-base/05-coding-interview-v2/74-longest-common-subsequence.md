# Topik 74 — Longest Common Subsequence (LCS)

**LCS** dari string `A` dan `B` adalah panjang subsequence terpanjang yang muncul di keduanya dengan urutan sama tetapi tidak harus kontigu. DP: `dp[i][j]` panjang LCS untuk prefix `A[0..i-1]` dan `B[0..j-1]`.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Rekurens:

- Jika `A[i-1]===B[j-1]` maka `dp[i][j]=dp[i-1][j-1]+1`
- Else `dp[i][j]=max(dp[i-1][j], dp[i][j-1])`

Kompleksitas O(nm) waktu, O(nm) ruang; optimasi baris tunggal O(min(n,m)).

---

## 2. Mengapa topik ini keluar di interview

- Fundamental 2D DP; dasar diff algoritma.

---

## 3. Implementasi

```javascript
function longestCommonSubsequence(a, b) {
  const m = a.length,
    n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}
```

---

## 4. Rekonstruksi string

Backtrack dari `dp[m][n]` mengikuti asal max.

---

## 5. Kompleksitas

O(nm) time; space dapat O(min(n,m)).

---

## 6. Pitfall: substring vs subsequence

Substring kontigu—DP berbeda.

---

## 7. Pitfall: empty strings

Hasil 0.

---

## 8. Pola interview

Jelaskan tabel DP kecil 5x5.

---

## 9. Latihan

LCS untuk `abcde` dan `ace` → 3.

---

## 10. Checklist

- [ ] Rekurens if match else max.
- [ ] Dimensi (m+1)(n+1).
- [ ] Space optimization opsional.

---

## 11. Referensi

Classic DP; Myers diff related.

---

## 12. Anti-pattern

Exponential brute subsequence.

---

## 13. Flashcard

- **Subsequence:** boleh loncat.

---

## 14. Latihan tulis

Hanya dua baris dp rolling.

---

## 15. Testing

Random string kecil brute.

---

## 16. Penutup

LCS adalah fondasi pemahaman alignment sequence.

---

## 17. Tambahan: Hirschberg

Rekursi bagi dua untuk reconstruct dengan memori O(n)—advanced.

---

## 18. Tambahan: LCS tiga string

3D DP—lebih berat.

---

## 19. Kompleksitas memori

O(nm) default.

---

## 20. Rangkuman

Match diagonal +1, else max up/left.

---

## 21. Soal terkait

Delete operation for two strings to equal—hubung LCS.

---

## 22. Edge: satu string kosong

0.

---

## 23. Edge: string identik

Panjang string.

---

## 24. Drill

Isi tabel kecil manual.

---

## 25. Performa

Quadratic—berat untuk string sangat panjang.

---

## 26. Integrasi TypeScript

`Uint16Array` untuk dp row.

---

## 27. Debugging

Print dp grid kecil.

---

## 28. Memori

Rolling array perlu iterate j tertentu order.

---

## 29. Parallel

Antidiagonal paralel—advanced.

---

## 30. Etika wawancara

Konfirmasi subsequence vs substring.

---

Dokumen ini menjelaskan LCS sebagai DP 2D standar dengan rekonstruksi opsional.
