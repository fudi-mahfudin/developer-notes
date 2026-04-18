# Topik 78 — Counting Sort

**Counting sort** mengurutkan bilangan bulat dengan **menghitung frekuensi** setiap nilai dalam rentang terbatas, lalu membangun array keluaran dengan **prefix sum** frekuensi. Ini **bukan comparison sort**: kompleksitas **O(n + k)** dengan `k` = rentang nilai (atau jumlah bucket diskrit).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Algoritma:

1. Hitung `count[v]` untuk setiap nilai `v` dalam input.
2. Ubah `count` menjadi prefix kumulatif: posisi akhir setiap nilai di output.
3. Iterasi input dari belakang ke depan (untuk **stabilitas**) atau sesuai definisi, tempatkan elemen ke `output` dan kurangi indeks.

Syarat: nilai dalam rentang kecil terhadap `n` (misalnya 0..k-1). Jika `k` sangat besar dibanding `n`, counting sort tidak efisien.

---

## 2. Mengapa topik ini keluar di interview

- Membedakan **linear-time sorting** vs batas Ω(n log n) comparison sort.
- Prasyarat radix sort / bucket sort.

---

## 3. Implementasi (0..k-1)

```javascript
function countingSort(a, k) {
  const count = new Array(k).fill(0);
  for (const x of a) count[x]++;
  for (let i = 1; i < k; i++) count[i] += count[i - 1];
  const out = new Array(a.length);
  for (let i = a.length - 1; i >= 0; i--) {
    const x = a[i];
    count[x]--;
    out[count[x]] = x;
  }
  return out;
}
```

---

## 4. Stabilitas

Loop mundur pada input menjaga stabilitas relatif—penting sebagai digit sort dalam radix sort.

---

## 5. Kompleksitas

- **Waktu:** O(n + k)
- **Ruang:** O(n + k) untuk `count` dan `out`

---

## 6. Pitfall: rentang tidak dari 0

Shift dengan `min`/`max`: indeks internal = `x - min`, `k = max - min + 1`.

---

## 7. Pitfall: k besar

Memori `count` meledak—pertimbangkan map frekuensi + sort kunci (k log k) atau algoritma lain.

---

## 8. Pitfall: bilangan negatif

Offset ke non-negatif sebelum counting.

---

## 9. Pola interview: radix sort

Urutkan digit dem digit dengan counting sort stabil—**O(d · (n + r))** dengan basis `r`.

---

## 10. Pola interview: sort by key kecil

Misalnya nilai 1..100 pada juta elemen—counting sangat cocok.

---

## 11. Latihan konsep

Jelaskan mengapa counting sort melanggar lower bound comparison sort.

---

## 12. Latihan kode

Implementasikan counting sort untuk array objek `{ key, payload }` stabil terhadap `key`.

---

## 13. Edge cases

- Array kosong: kembalikan salinan kosong.
- Semua nilai sama: satu bucket penuh.

---

## 14. Checklist

- [ ] Tahu kapan O(n + k) mengalahkan O(n log n).
- [ ] Bisa jelaskan stabilitas loop mundur.
- [ ] Tahu transformasi min/max.

---

## 15. Referensi

CLRS counting sort; radix sort chaining.

---

## 16. Anti-pattern

Counting sort pada `k ≈ 2^32`—bunuh memori.

---

## 17. Flashcard

- **Non-comparison:** mengandalkan struktur nilai.

---

## 18. Testing

Bandingskan hasil dengan `sort` untuk array kecil acak dalam rentang.

---

## 19. Performa

Sangat cepat untuk `k` kecil; bottleneck I/O jika `count` besar tidak muat cache.

---

## 20. Integrasi TypeScript

Generik terbatas pada key numerik diskrit; untuk string gunakan radix.

---

## 21. Debugging

Cetak `count` sebelum dan sesudah prefix untuk trace.

---

## 22. Memori

In-place counting sulit untuk array umum—biasanya output terpisah.

---

## 23. Parallel

Prefix sum bisa diparalelkan (scan)—lanjutan.

---

## 24. Etika wawancara

Tanyakan rentang nilai dan apakah stabilitas diperlukan.

---

## 25. Rangkuman

Frekuensi + prefix + penempatan stabil = linear saat rentang terkendali.

---

## 26. Soal terkait

Sort scores 0..100 — klasik counting.

---

## 27. Drill manual

Input `[2,0,2,1]` k=3 — isi langkah count dan output.

---

## 28. Perbandingan bucket sort

Bucket sort untuk distribusi kontinu memakai wadah; counting adalah kasus diskrit sederhana.

---

## 29. Catatan floating point

Counting tidak cocok untuk float umum—perlu kuantisasi atau algoritma lain.

---

## 30. BigInt

Rentang besar bisa pakai `Map` frekuensi lalu urutkan kunci—itu bukan O(n+k) murni jika kunci unik banyak.

---

## 31. Penutup

Counting sort mengajar bahwa asumsi pada data membuka jalan melewati batas comparison sort.

---

Dokumen ini menjelaskan counting sort, stabilitas, kompleksitas, dan kapan menggunakannya dalam interview.
