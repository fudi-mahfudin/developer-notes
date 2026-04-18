# Topik 34 — 2D Prefix Sum

Prefix sum 2D memungkinkan query jumlah sub-rectangle axis-aligned dalam **O(1)** setelah preprocessing **O(mn)** pada matriks `m×n`. Mirip 1D, gunakan inclusion-exclusion pada empat sudut prefix.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Definisikan `P[i][j]` sebagai jumlah elemen dari `(0,0)` hingga `(i,j)` inklusif. Bangun dengan rekurens:

`P[i][j]=A[i][j]+P[i-1][j]+P[i][j-1]-P[i-1][j-1]`.

Query rectangle `[r1,c1]` hingga `[r2,c2]`:

`sum = P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]` dengan penanganan indeks nol menggunakan padding baris/kolom nol.

---

## 2. Mengapa topik ini keluar di interview

- Range sum query 2D statis; fondasi untuk beberapa soal DP grid.
- Menguji inclusion-exclusion.

---

## 3. Build dengan padding

```javascript
function build2D(a) {
  const m = a.length,
    n = a[0].length;
  const p = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      p[i][j] = a[i - 1][j - 1] + p[i - 1][j] + p[i][j - 1] - p[i - 1][j - 1];
    }
  }
  return p;
}
```

---

## 4. Query

```javascript
function rectSum(p, r1, c1, r2, c2) {
  // asumsi 0-index pada a; convert to 1-index padded:
  const R1 = r1 + 1,
    C1 = c1 + 1,
    R2 = r2 + 1,
    C2 = c2 + 1;
  return p[R2][C2] - p[R1 - 1][C2] - p[R2][C1 - 1] + p[R1 - 1][C1 - 1];
}
```

---

## 5. Kompleksitas

- Build O(mn), query O(1), memori O(mn).

---

## 6. Pitfall: off-by-one

Padding mengurangi kesalahan indeks—biasakan 1-based pada `P`.

---

## 7. Pitfall: update titik

Statis saja—untuk update pakai 2D Fenwick/Segment tree.

---

## 8. Pola interview

Gambarkan persegi besar dikurangi dua strip ditambah double-counted corner.

---

## 9. Latihan

Hitung manual `P` untuk matriks `2×3` kecil.

---

## 10. Checklist

- [ ] Rumus inclusion-exclusion.
- [ ] Padding baris/kolom nol.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Integral image di computer vision—konsep sama.

---

## 12. Anti-pattern

Menjumlahkan nested loop setiap query—O(area) berulang.

---

## 13. Flashcard

- **2D prefix:** empat sudut.

---

## 14. Latihan tulis

Gunakan 2D prefix untuk menghitung jumlah submatrix dengan jumlah target—kadang hash pada profil baris—advanced.

---

## 15. Testing

Random small matrix, compare query dengan brute sum.

---

## 16. Penutup

2D prefix adalah alat dasar query range statis pada grid.

---

## 17. Tambahan: difference 2D

Range update rectangle dengan difference array 2D + prefix rebuild—paralel 1D.

---

## 18. Tambahan: multiple queries

Bangun sekali, jawab banyak—titik kuat prefix.

---

## 19. Kompleksitas memori

Satu matriks `P` berukuran `(m+1)(n+1)`.

---

## 20. Rangkuman

Build akumulatif 2D, query dengan empat referensi prefix.

---

## 21. Soal terkait

Maximum sum rectangle—kadang Kadane 1D di setiap pasangan kolom—beda teknik.

---

## 22. Edge: dimensi 0

Tangani matrix kosong.

---

## 23. Edge: rectangle penuh

Query sama dengan total `P[m][n]` (dengan padding).

---

## 24. Drill

Verifikasi formula dengan persegi `1×1` di tengah.

---

## 25. Performa

Sangat cepat untuk banyak query.

---

## 26. Integrasi JS

Nested array vs typed 2D—pilih sesuai ukuran.

---

## 27. Debugging

Cetak `P` kecil untuk cek.

---

## 28. BigInt

Jika jumlah sangat besar—pertimbangkan modulo di soal.

---

## 29. Submatrix count K

Kombinasi hash + prefix baris—lanjutan.

---

## 30. Etika wawancara

Jelaskan padding untuk menghindari kasus khusus `-1` index.

---

Dokumen ini melengkapi rangkaian prefix dari 1D ke 2D untuk soal matriks.
