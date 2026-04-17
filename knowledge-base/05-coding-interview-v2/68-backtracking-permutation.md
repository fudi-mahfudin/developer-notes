# Topik 68 — Backtracking: Permutasi

Permutasi semua urutan elemen **distinct** dengan DFS + `used[]` boolean. Untuk **duplikat**, sort input dan lewati elemen sama di level yang sama ketika elemen sebelumnya belum dipakai.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Depth equals `n`; setiap level pilih elemen yang belum `used`. Kompleksitas `O(n!·n)` untuk generate semua. Skip duplicate: `if (i>0 && nums[i]===nums[i-1] && !used[i-1]) continue` pola standar setelah sort.

---

## 2. Mengapa topik ini keluar di interview

- Permutations II, next permutation.

---

## 3. Distinct permutations

Lihat topik 25—kode `used` array.

---

## 4. Next permutation lexicographic

Algoritma O(n): dari belakang cari pivot `i` dengan `nums[i]<nums[i+1]`, swap dengan smallest larger di kanan, reverse suffix.

---

## 5. Kompleksitas

Faktorial output.

---

## 6. Pitfall: swap backtrack

Untuk generate permutations by swapping array in-place—varian lain.

---

## 7. Pitfall: duplicate handling

Tanpa sort + skip, output duplikat.

---

## 8. Pola interview

Jelaskan `used` vs multiset count decrement.

---

## 9. Latihan

Permutation II trace kecil dengan duplikat.

---

## 10. Checklist

- [ ] used boolean path.
- [ ] Duplicate skip condition.
- [ ] next permutation steps.

---

## 11. Referensi

Knuth permutations.

---

## 12. Anti-pattern

Sort output set untuk unik—tidak skalabel.

---

## 13. Flashcard

- **used[]:** track picks.

---

## 14. Latihan tulis

Permutation by swapping `swap(i,j)` backtrack.

---

## 15. Testing

Bandingkan count `n!` untuk distinct.

---

## 16. Penutup

Permutasi adalah backtracking penuh dengan kedalaman n.

---

## 17. Tambahan: derangement

Permutation tanpa fixed point—advanced.

---

## 18. Tambahan: multiset k!

Dengan frekuensi—bagi faktorial duplikat.

---

## 19. Kompleksitas memori

O(n) stack + path.

---

## 20. Rangkuman

Distinct: `used`; duplicates: sort+prune; next perm: swap+reverse.

---

## 21. Soal terkait

Letter case permutation—biner pilih case.

---

## 22. Edge: n=0

Satu permutasi kosong? tergantung soal.

---

## 23. Edge: n=1

Satu output.

---

## 24. Drill

Generate permutations `1,1,2` unik.

---

## 25. Performa

Faktorial meledak cepat.

---

## 26. Integrasi TypeScript

Immutable path copy.

---

## 27. Debugging

Cetak tree rekursi kecil.

---

## 28. Memori

Jangan simpan semua jika streaming—gunakan callback.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Tanyakan apakah perlu semua permutasi atau hitung saja.

---

## 31. Kompleksitas factorial

Menghasilkan **semua** permutasi n elemen berbeda membutuhkan **Ω(n!)** waktu karena banyaknya output. Interview sering meminta optimasi ketika elemen **berulang** (multiset) atau ketika Anda hanya perlu permutasi **berikutnya** leksikografis tanpa menghasilkan seluruh daftar.

---

## 32. Swap vs dipilih/tidak

Dua gaya implementasi umum: **swap** elemen di array in-place (sering untuk permutasi penuh), atau membangun **path** dengan `used[]` boolean. Keduanya valid; pilih yang paling minim bug untuk Anda saat whiteboard.

---

Dokumen ini melengkapi permutasi dengan penekanan pada duplikat dan next permutation.
