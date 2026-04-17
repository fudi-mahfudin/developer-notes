# Topik 76 — Edit Distance (Levenshtein)

**Edit distance** antara dua string adalah minimum operasi insert, delete, substitute untuk mengubah satu menjadi lain. DP `dp[i][j]` untuk prefix panjang `i` dan `j`.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Rekurens:

- Jika `A[i-1]===B[j-1]` → `dp[i][j]=dp[i-1][j-1]`
- Else `dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])`

Kompleksitas O(mn) waktu, O(mn) ruang; optimasi baris O(min(m,n)).

---

## 2. Mengapa topik ini keluar di interview

- Operasi string fundamental; dasar diff tools.

---

## 3. Implementasi

```javascript
function minDistance(a, b) {
  const m = a.length,
    n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else
        dp[i][j] =
          1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}
```

---

## 4. Variasi biaya berbeda

Ubah `+1` menjadi biaya custom.

---

## 5. Kompleksitas

O(mn) time.

---

## 6. Pitfall: hanya insert+delete

Tanpa substitute—beda recurrence (LCS related).

---

## 7. Pitfall: space

Gunakan dua baris jika perlu.

---

## 8. Pola interview

Jelaskan tiga opsi min pada mismatch.

---

## 9. Latihan

Hitung `horse`→`ros` manual kecil.

---

## 10. Checklist

- [ ] Base baris/kolom indeks.
- [ ] Match case gratis.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Levenshtein distance; Wagner-Fischer algorithm.

---

## 12. Anti-pattern

BFS pada graph state space untuk string panjang—terlalu besar.

---

## 13. Flashcard

- **Substitute:** diagonal +1.

---

## 14. Latihan tulis

Hanya dua baris dp.

---

## 15. Testing

Kosong ke string = panjang string.

---

## 16. Penutup

Edit distance adalah DP 2D dengan tiga transisi jelas.

---

## 17. Tambahan: Damerau-Levenshtein

Transposisi adjacent—varian.

---

## 18. Tambahan: weighted edit

Biaya berbeda per karakter—ubah min weights.

---

## 19. Kompleksitas memori

O(mn) full; O(n) rolling.

---

## 20. Rangkuman

Mismatch: min tiga arah +1; match: diagonal free.

---

## 21. Soal terkait

One edit distance—cek kasus khusus.

---

## 22. Edge: kedua kosong

0.

---

## 23. Edge: satu kosong

Panjang yang lain.

---

## 24. Drill

Isi matriks 4x4 kecil.

---

## 25. Performa

Quadratic—berat untuk string sangat panjang (gunakan heuristik di produksi).

---

## 26. Integrasi TypeScript

Fungsi pure string.

---

## 27. Debugging

Print dp small.

---

## 28. Memori

Rolling perlu menyimpan diagonal cell sebelumnya.

---

## 29. Parallel

Antidiagonal—advanced.

---

## 30. Etika wawancara

Konfirmasi biaya operasi sama atau tidak.

---

Dokumen ini merangkum edit distance sebagai aplikasi langsung DP string.
