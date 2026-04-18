# Topik 67 — Backtracking: Subset dan Kombinasi

Backtracking membangun solusi langkah demi langkah, **undo** saat buntu. **Subset** setiap elemen include/exclude. **Combination** pilih `k` elemen dengan loop indeks `start` untuk menghindari duplikasi urutan.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Subset: rekursi `dfs(i)` memilih skip atau take `nums[i]`. Kombinasi `C(n,k)`: `dfs(start, path)` loop `j` dari `start` ke `n`, push `j+1`, rekursi dengan `start=j+1`. Kompleksitas proporsional jumlah solusi × panjang path. Duplikat input: sort + skip sama seperti permutasi.

---

## 2. Mengapa topik ini keluar di interview

- Subsets, combinations, combination sum.

---

## 3. Subsets

Lihat topik 26—struktur sama.

---

## 4. Combination sum

Pruning jika partial sum > target (elemen positif).

---

## 5. Kompleksitas

Eksponensial pada output.

---

## 6. Pitfall: salinan array

`path.slice()` saat push hasil.

---

## 7. Pitfall: reuse elemen

Soal unlimited coins vs sekali pakai—beda struktur loop.

---

## 8. Pola interview

Sebutkan `start` index untuk kombinasi unik.

---

## 9. Latihan

Combination sum II dengan duplikat array—sort + skip.

---

## 10. Checklist

- [ ] Include/exclude vs start loop.
- [ ] Pruning.
- [ ] Duplikat handling.

---

## 11. Referensi

Skiena backtracking patterns.

---

## 12. Anti-pattern

Generate permutasi lalu filter ukuran k—boros.

---

## 13. Flashcard

- **start index:** combinations.

---

## 14. Latihan tulis

`partition to k equal sum subsets`—backtracking dengan buckets.

---

## 15. Testing

Bandingkan jumlah subset dengan `2^n`.

---

## 16. Penutup

Backtracking = DFS pada ruang state dengan undo.

---

## 17. Tambahan: bitmask DP

Untuk subset meet-in-the-middle—lanjutan.

---

## 18. Tambahan: memoization on bitmask

Untuk TSP kecil—advanced.

---

## 19. Kompleksitas memori

Rekursi O(n) stack.

---

## 20. Rangkuman

Subset pick/skip; kombinasi loop start.

---

## 21. Soal terkait

Palindrome partitioning—potong string.

---

## 22. Edge: k=0

Kombinasi satu: `[]`.

---

## 23. Edge: k>n

Tidak ada solusi.

---

## 24. Drill

List semua kombinasi `[1..4]` choose 2.

---

## 25. Performa

Gunakan pruning agresif jika bisa.

---

## 26. Integrasi TypeScript

Type `number[][]` hasil.

---

## 27. Debugging

Log path pada setiap rekursi.

---

## 28. Memori

Hindari menyimpan semua partial di global.

---

## 29. Parallel

Tidak umum.

---

## 30. Etika wawancara

Konfirmasi boleh reuse elemen atau tidak.

---

## 31. Kombinasi vs subset powerset

**Powerset** sering dihasilkan dengan memilih “masuk/tidak” untuk setiap indeks—kompleksitas eksponensial O(2^n). **Kombinasi(n,k)** membatasi ukuran subset sehingga ruang pencarian lebih kecil; backtracking dengan parameter `start` menghindari duplikasi urutan yang dianggap sama.

---

## 32. Pruning sederhana

Jika soal memiliki batas tambahan (misalnya jumlah elemen terpilih, atau jumlah tertentu), hentikan cabang lebih awal ketika **tidak mungkin** lagi mencapai target—ini mengurangi konstanta meskipun worst-case tetap eksponensial pada banyak masalah kombinatorik.

---

Dokumen ini memfokuskan backtracking untuk subset dan kombinasi tanpa tumpang tindih permutasi.
