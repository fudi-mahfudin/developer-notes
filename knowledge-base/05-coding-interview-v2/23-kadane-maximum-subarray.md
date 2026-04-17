# Topik 23 — Kadane / Maximum Subarray

Algoritma Kadane menemukan jumlah subarray kontigu terbesar dalam O(n) waktu dan O(1) ruang dengan mempertahankan jumlah akhiran terbaik saat memindai array. Ini contoh **dynamic programming satu dimensi** yang sangat ringkas.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Definisikan `cur` sebagai jumlah subarray yang berakhir di indeks `i`. Rekurens: `cur = max(a[i], cur + a[i])` — memutuskan apakah memperpanjang subarray sebelumnya atau memulai baru di `i`. Jawaban global adalah max dari semua `cur`. Semua bilangan negatif: jawaban adalah elemen maksimum tunggal. Variasi meminta indeks rentang—simpan pointer saat `cur` di-reset.

---

## 2. Mengapa topik ini keluar di interview

- Soal klasik “Maximum Subarray”; menguji DP mikro tanpa tabel penuh.
- Variasi: circular array, dua subarrays, constrain panjang.

---

## 3. Implementasi inti

```javascript
function maxSubArray(a) {
  let best = -Infinity;
  let cur = 0;
  for (const x of a) {
    cur = Math.max(x, cur + x);
    best = Math.max(best, cur);
  }
  return best;
}
```

Inisialisasi `best` ke `-Infinity` menangani semua negatif.

---

## 4. Kompleksitas

- Waktu O(n), ruang O(1).

---

## 5. Trace contoh

`[ -2, 1, -3, 4, -1, 2, 1, -5, 4 ]` → subarray terbaik `[4,-1,2,1]` jumlah 6.

---

## 6. Variasi: return indeks

Simpan `start`, `end`, `tempStart`; reset `tempStart` saat memulai subarray baru.

---

## 7. Variasi: circular

Pisahkan kasus: max subarray normal vs total - min subarray (hati-hati semua negatif).

---

## 8. Pitfall: kosong

Definisikan apakah subarray kosong diperbolehkan (jumlah 0)—biasanya tidak.

---

## 9. Pitfall: BigInt

Gunakan BigInt konsisten jika nilai sangat besar.

---

## 10. Hubungan DP

`dp[i]` bisa didefinisikan eksplisit, tetapi optimalkan menjadi satu variabel `cur`.

---

## 11. Pola wawancara

Jelaskan rekurens dan bahwa kita hanya perlu nilai sebelumnya—karena itu O(1) space.

---

## 12. Latihan

Modifikasi untuk menghitung jumlah subarray non-kosong dengan produk maksimum—beda soal (kadang DP khusus).

---

## 13. Checklist

- [ ] Tahu reset `cur` saat lebih baik memulai baru.
- [ ] Tahu menangani semua negatif.
- [ ] Tahu kompleksitas linear.

---

## 14. Referensi

Kadane 1984; sering diajarkan sebagai contoh greedy/DP.

---

## 15. Perbandingan brute force

O(n³) enumerasi semua subarray; O(n²) dengan prefix sum; Kadane O(n).

---

## 16. Quiz

Apa hasil pada `[]`? Definisikan—biasanya invalid atau -Infinity.

---

## 17. Anti-pattern

Memanggil `reduce` dengan closure yang membingungkan—loop for lebih jelas di interview.

---

## 18. Flashcard

- **cur:** akhiran terbaik.
- **best:** jawaban global.

---

## 19. Latihan tulis

Implementasikan versi yang juga mengembalikan `[start,end]`.

---

## 20. Testing

Random array kecil, bandingkan dengan brute force O(n³) untuk verifikasi.

---

## 21. Modulo variant

Jika soal minta subarray sum % M maksimum—jauh lebih sulit; bukan Kadane klasik.

---

## 22. 2D extension

Maximum sum rectangle—algoritma lebih berat; kenali batas pengetahuan interview.

---

## 23. Penutup

Kadane adalah salah satu pola DP paling pendek dalam kode—hafalkan inti `max(x, cur+x)`.

---

## 24. Tambahan: divide and conquer

Bisa O(n log n) untuk mengajarkan divide & conquer—tidak diperlukan jika Kadane tersedia.

---

## 25. Tambahan: parallel

Tidak paralel mudah karena dependensi linear—jarang relevan.

---

## 26. Integrasi TypeScript

Tipe `number[]` vs readonly—jangan mutasi jika tidak perlu.

---

## 27. Edge satu elemen

Benar dengan rumus yang sama.

---

## 28. Edge nol

Tetapkan kontrak.

---

## 29. Rangkuman

Satu pass, dua akumulator mental—subarray kontigu optimum.

---

## 30. Soal terkait

“Best Time to Buy and Sell Stock” berhubungan dengan min prefix / max profit—beda pola tapi mirip scan linear.

---

Dokumen ini mempersiapkan Anda menjelaskan Kadane tanpa hanya menghafal kode tetapi memahami reset subarray.
