# Topik 69 — N-Queens dan Sudoku (Backtracking Klasik)

**N-Queens** menempatkan `n` ratu pada papan `n×n` tanpa saling menyerang baris/kolom/diagonal. **Sudoku** mengisi grid `9×9` dengan constraint baris/kolom/kotak 3×3. Keduanya memakai **backtracking** dengan **pruning** kuat.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

N-Queens: tempatkan per baris, simpan `cols`, `diag1`, `diag2` sets untuk cek konflik O(1). Rekursi baris berikutnya; jika tidak ada slot valid, backtrack. Sudoku: cari sel kosong, coba angka 1-9, validasi 3 constraint, rekursi; jika gagal, undo. Kompleksitas eksponensial worst-case tetapi pruning kuat di praktik untuk n kecil / sudoku unik.

---

## 2. Mengapa topik ini keluar di interview

- Menunjukkan kemampuan merepresentasikan constraint dan pruning.

---

## 3. N-Queens constraint sets

`diag1 = r+c`, `diag2 = r-c` dengan set atau boolean array offset.

---

## 4. Sudoku valid check

Subgrid index `(r/3)*3 + (c/3)` atau iterate 3×3 block.

---

## 5. Kompleksitas

Sangat buruk worst-case; n queens untuk n=14+ berat.

---

## 6. Pitfall: menyalin board penuh setiap langkah

Gunakan single board + undo.

---

## 7. Pitfall: tidak undo

Backtracking gagal.

---

## 8. Pola interview

Sebutkan struktur constraint untuk diagonal cepat.

---

## 9. Latihan

Hitung solusi N=4 manual.

---

## 10. Checklist

- [ ] Representasi diagonal.
- [ ] Undo pada sudoku.
- [ ] Tahu eksponensial worst-case.

---

## 11. Referensi

Classic CSP backtracking.

---

## 12. Anti-pattern

Brute force semua posisi tanpa pruning.

---

## 13. Flashcard

- **Queen attacks:** row/col/diag.

---

## 14. Latihan tulis

Sudoku solver dengan forward checking minimal.

---

## 15. Testing

Puzzle sudoku dengan solusi diketahui.

---

## 16. Penutup

Constraint satisfaction + backtracking = pola universal.

---

## 17. Tambahan: dancing links

Algorithm X—advanced exact cover.

---

## 18. Tambahan: bitmask untuk 9x9

Gunakan bit untuk angka tersisa per baris—micro-optimasi.

---

## 19. Kompleksitas memori

O(n²) board.

---

## 20. Rangkuman

Pruning dan struktur constraint menentukan kecepatan praktis.

---

## 21. Soal terkait

Word search II dengan trie—kombinasi grid + backtracking.

---

## 22. Edge: n=1

Satu solusi.

---

## 23. Edge: n=2,3

Tidak ada / sedikit solusi.

---

## 24. Drill

Letakkan 4 queens pada 4x4.

---

## 25. Performa

Bitset dan heuristik MRV—advanced.

---

## 26. Integrasi TypeScript

`number[][]` board.

---

## 27. Debugging

Print board setiap depth kecil.

---

## 28. Memori

Hindari copy dalam loop dalam.

---

## 29. Parallel

Tidak umum.

---

## 30. Etika wawancara

Jika waktu pendek, jelaskan constraint sets tanpa selesaikan penuh.

---

## 31. Forward checking (konsep)

Selain mencoba nilai dan mundur saat gagal, Anda dapat memelihara **domain tersisa** untuk sel yang belum terisi dan mendeteksi **failure lebih awal** ketika suatu sel kehabisan pilihan legal. Ini adalah inti “forward checking” dan pendekatan CSP yang lebih cerdas daripada brute murni—di interview sering cukup disebut sebagai arah optimasi.

---

## 32. Sudoku vs N-Queens dalam satu kalimat

**Sudoku** memiliki constraint kotak 3×3 tambahan dan domain 1..9 pada sel kosong; **N-Queens** berfokus pada serangan diagonal dan kolom dengan satu ratu per baris. Keduanya adalah latihan struktur constraint + backtracking, tetapi implementasi detail berbeda.

---

Dokumen ini mengaitkan dua puzzle klasik dengan kerangka CSP backtracking.
