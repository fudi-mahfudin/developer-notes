# Topik 35 — Top-K Elements (Heap; Quickselect)

Menemukan **k elemen terbesar/terkecil** bisa dilakukan dengan **min-heap ukuran k** untuk top-k terbesar (simpan k terbesar dengan heap terkecil), atau **max-heap** untuk top-k terkecil sebaliknya. **Quickselect** adalah varian QuickSort partition untuk mencari statistik order-k dalam **O(n)** rata-rata, O(n²) worst-case tanpa random pivot.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Untuk `k` kecil dibanding `n`, heap `O(n log k)` waktu dan `O(k)` ruang sering optimal dan mudah. Untuk `k≈n/2`, pertimbangkan quickselect atau sort penuh `O(n log n)`. Di JS, tidak ada heap built-in—implementasi manual array + `siftUp/siftDown` atau gunakan library—di interview sering cukup jelaskan API heap atau pakai sort untuk kesederhanaan jika diizinkan.

---

## 2. Mengapa topik ini keluar di interview

- Top K frequent elements, kth largest, median finder.
- Trade-off heap vs sort vs quickselect.

---

## 3. Min-heap untuk k largest

Masukkan elemen; jika ukuran > k, pop terkecil. Akhirnya heap berisi k terbesar (atau gunakan negasi untuk menyederhanakan).

---

## 4. Quickselect ide

Partition seperti quicksort, rekursi ke sisi yang mengandung indeks `n-k`.

---

## 5. Kompleksitas

- Heap: build stream O(n log k)
- Quickselect average O(n), worst O(n²)
- Sort: O(n log n)

---

## 6. Pitfall: `k` besar

Heap tidak menguntungkan; sort bisa lebih sederhana.

---

## 7. Pitfall: duplikat

Tidak masalah untuk order statistic dengan partition stabil pada duplikat—perhatikan pivot strategy.

---

## 8. Pola interview

Sebutkan “min-heap of size k untuk k largest” dengan jelas.

---

## 9. Latihan

Jelaskan mengapa min-heap (bukan max-heap) untuk k largest stream.

---

## 10. Checklist

- [ ] Argumen heap ukuran k.
- [ ] Tahu kompleksitas sort alternatif.
- [ ] Tahu quickselect average case.

---

## 11. Referensi

CLRS order statistics; heap di heap sort.

---

## 12. Anti-pattern

Sort seluruh array jika hanya perlu elemen ke-k—boros jika n besar dan k kecil.

---

## 13. Flashcard

- **k largest:** min-heap k.
- **k smallest:** max-heap k.

---

## 14. Latihan tulis

Implementasikan `class MinHeap` minimal dengan `push/pop` untuk integer.

---

## 15. Testing

Bandingkan hasil dengan sort untuk verifikasi random.

---

## 16. Penutup

Pilih struktur sesuai k dan constraint streaming vs offline.

---

## 17. Tambahan: priority queue JS

Tidak ada stdlib—gunakan array + heapify manual atau pustaka.

---

## 18. Tambahan: multiset

Jika banyak duplikat dengan frekuensi—pair `(freq, key)` di heap.

---

## 19. Kompleksitas memori

Heap O(k), quickselect O(1) tambahan jika in-place.

---

## 20. Rangkuman

Heap untuk k kecil; quickselect untuk order statistic satu nilai.

---

## 21. Soal terkait

Find median from data stream—dua heaps balancing.

---

## 22. Edge: k=1

Cukup satu pass max/min.

---

## 23. Edge: k=n

Sort atau return array.

---

## 24. Drill

Simulasikan heap ops untuk `[3,1,4,1,5]` k=3.

---

## 25. Performa konstanta

Heap lebih rumit implementasi—pertimbangkan sort jika waktu pendek.

---

## 26. Randomized pivot

Mengurangi worst-case quickselect—sebutkan di diskusi.

---

## 27. Integrasi TypeScript

Generic heap dengan comparator `(a,b)=>number`.

---

## 28. Debugging

Invariant heap: parent ≤ children untuk min-heap.

---

## 29. Paralel

Top-k terdistribusi—map-reduce count lalu heap merge—advanced.

---

## 30. Etika wawancara

Tanyakan boleh asumsi `k << n` atau tidak sebelum memilih struktur.

---

Dokumen ini merangkum strategi top-k yang paling sering dibahas di interview.

---

## 31. Tambahan: median dua array terurut

Masalah klasik dengan binary search pada partition—topik terpisah yang masih berkaitan dengan order statistics.

---

## 32. Tambahan: streaming vs batch

Heap unggul jika data datang bertahap tanpa menyimpan seluruh `n` sekaligus (asumsi memori terbatas untuk menyimpan hanya `k`).

