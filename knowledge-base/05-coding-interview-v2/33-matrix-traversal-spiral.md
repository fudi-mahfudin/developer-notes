# Topik 33 — Traversal Matriks (Spiral, Baris/Kolom)

Traversal **spiral** mengunjungi elemen matriks `m×n` dari luar ke dalam mengikuti pola kanan → bawah → kiri → atas, mengecilkan batas `top,bottom,left,right` setiap lapisan. Kompleksitas O(mn) waktu, O(1) tambahan jika output array dihitung selain penyimpanan hasil.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Invariant: selama `left<=right` dan `top<=bottom`, iterasi empat sisi: baris atas kiri→kanan, kolom kanan atas→bawah (eksklusif titik sudut ganda), baris bawah kanan→kiri, kolom kiri bawah→atas. Setelah satu lapisan, `top++`, `bottom--`, `left++`, `right--`. Hati-hati matriks tidak persegi: sisa satu baris/kolom tanpa mengunjungi dua kali.

---

## 2. Mengapa topik ini keluar di interview

- Soal spiral order, rotate image, word search menggunakan traversal grid.
- Menguji off-by-one dan kondisi terminasi.

---

## 3. Implementasi inti

```javascript
function spiralOrder(matrix) {
  const out = [];
  if (matrix.length === 0) return out;
  let top = 0,
    bottom = matrix.length - 1;
  let left = 0,
    right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) out.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) out.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) out.push(matrix[r][left]);
      left++;
    }
  }
  return out;
}
```

---

## 4. Kompleksitas

- Waktu O(mn), ruang O(1) ekstra selain output.

---

## 5. Pitfall: baris/kolom tunggal tersisa

Kondisi `if (top<=bottom)` dan `if (left<=right)` mencegah duplikasi.

---

## 6. Pitfall: matriks tidak persegi

Tetap valid dengan guard di atas.

---

## 7. Variasi: traversal diagonal

Berbeda pola—jangan campur dengan spiral.

---

## 8. Pola interview

Gambarkan boundary yang menyusut per lapisan.

---

## 9. Latihan

Trace manual pada `3×3` dan `3×4`.

---

## 10. Checklist

- [ ] Empat loop dengan guard.
- [ ] Update batas setelah sisi.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Matrix layer peeling—umum di platform soal.

---

## 12. Anti-pattern

Mengunjungi sel dengan `visited` boolean 2D untuk spiral—berlebihan.

---

## 13. Flashcard

- **Shrink bounds:** top/bottom/left/right.

---

## 14. Latihan tulis

Generate spiral untuk `n×n` berisi `1..n^2`.

---

## 15. Testing

Bandingkan panjang output `m*n`.

---

## 16. Penutup

Spiral adalah latihan boundary—mirip merge intervals dalam 2D.

---

## 17. Tambahan: clockwise vs ccw

Sesuaikan urutan sisi—jelaskan ke interviewer.

---

## 18. Tambahan: inward recursion

Bisa rekursi peel layer—iteratif lebih umum.

---

## 19. Kompleksitas memori output

O(mn) untuk daftar hasil.

---

## 20. Rangkuman

Empat sisi, susutkan batas, guard untuk sisa strip.

---

## 21. Soal terkait

“Diagonal traverse” zigzag—beda pola.

---

## 22. Edge: matriks kosong

Return [].

---

## 23. Edge: satu elemen

Satu lapisan valid.

---

## 24. Drill

Tulis urutan indeks untuk `2×3`.

---

## 25. Performa

Satu pass—optimal.

---

## 26. Integrasi JS

`matrix[r][c]` asumsikan baris konsisten panjang—validasi jika perlu.

---

## 27. Debugging

Print batas setiap lapisan.

---

## 28. TypedArray

Untuk numerik besar, flatten bisa lebih cache-friendly—jarang perlu di interview.

---

## 29. Variasi: spiral II

Bangun matriks dari urutan 1..n²—isi sesuai spiral.

---

## 30. Etika wawancara

Konfirmasi arah putaran sebelum kode.

---

Dokumen ini melengkapi traversal matriks spiral sebagai pola grid standar.
