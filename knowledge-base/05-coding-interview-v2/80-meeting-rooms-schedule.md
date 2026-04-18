# Topik 80 — Meeting Rooms (Jadwal Interval)

Diberikan interval `[start, end]`, pertanyaan klasik: **berapa minimum ruangan** untuk menampung semua meeting tanpa overlap? Atau: **bisa atau tidak** satu ruangan? Atau: **maksimum overlap** bersamaan? Pola umum: **urutkan** menurut waktu, lalu **greedy** atau **heap** / **two pointers** pada timeline.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Minimum rooms:** urutkan `start`, pakai **min-heap** akhir meeting per ruangan (atau multiset); untuk setiap meeting, jika `start >= heap.min` gunakan ruangan itu (pop); jika tidak, buka ruangan baru (push `end`). Kompleksitas **O(n log n)**. **Cek non-overlap satu ruangan:** urutkan `start`, pastikan `end` sebelumnya ≤ `start` berikutnya. **Merge interval** sering prasyarat untuk membersihkan data.

---

## 2. Mengapa topik ini keluar di interview

- Representasi waktu sebagai angka; edge timezone DST tidak umum di soal algoritma.
- Menguji heap vs greedy vs sweep line.

---

## 3. Minimum conference rooms (heap)

```javascript
function minMeetingRooms(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const heap = []; // simpan end times; pop min manual → gunakan struktur heap beneran di produksi
  const push = (x) => {
    heap.push(x);
    heap.sort((a, b) => a - b);
  };
  const popMin = () => heap.shift();
  for (const [s, e] of intervals) {
    if (heap.length && heap[0] <= s) popMin();
    push(e);
  }
  return heap.length;
}
```

Catatan: `sort` berulang O(n) per iterasi di atas hanya untuk ilustrasi—gunakan **min-heap** sebenarnya O(log n).

---

## 4. Alternatif: timeline events

Ubah setiap interval menjadi `(time, +1)` mulai dan `(time, -1)` selesai; urutkan; sweep akumulasi overlap—**O(n log n)**.

---

## 5. Satu ruangan cukup?

```javascript
function canAttendAll(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}
```

Perhatikan inklusif `end === start` berikutnya—biasanya **boleh** (definisikan kontrak).

---

## 6. Kompleksitas

- Sort: O(n log n)
- Heap: n operasi × O(log n) = O(n log n)

---

## 7. Pitfall: inklusif vs eksklusif ujung

`[1,5]` dan `[5,10]` overlap atau tidak? Soal biasanya: **tidak overlap** jika satu dimulai saat yang lain selesai—gunakan `<=` saat melepas ruangan.

---

## 8. Pitfall: urutkan salah

Urut `start` dulu; jika seri, urut `end` naik untuk deterministik.

---

## 9. Pola interview: merge intervals

Gabung yang overlap menjadi interval lebih kasar—sort by start, linear scan.

---

## 10. Pola interview: free time

Cari celah antara interval ter-merge.

---

## 11. Latihan konsep

Buktikan greedy heap untuk minimum rooms optimal.

---

## 12. Latihan kode

Implementasikan versi **sweep line** tanpa heap eksplisit.

---

## 13. Edge cases

- Interval kosong: daftar kosong → 0 room.
- Semua identik: satu room atau banyak tergantung overlap.

---

## 14. Checklist

- [ ] Kontrak equality di ujung.
- [ ] Heap vs sweep.
- [ ] Merge vs schedule.

---

## 15. Referensi

Leetcode 253, 252, 56.

---

## 16. Anti-pattern

O(n²) cek pasangan untuk n besar.

---

## 17. Flashcard

- **Sweep:** ubah interval ke event +1/-1.

---

## 18. Testing

Generator interval acak; bandingkan brute kecil dengan heap.

---

## 19. Performa

Heap sebenarnya penting untuk skala besar.

---

## 20. Integrasi TypeScript

Tipe `Interval = readonly [number, number]`.

---

## 21. Debugging

Plot timeline ASCII untuk kasus kecil.

---

## 22. Memori

Heap O(k) dengan k ruangan aktif.

---

## 23. Parallel

Tidak relevan.

---

## 24. Etika wawancara

Tanyakan apakah meeting `[a,b]` dan `[b,c]` bentrok.

---

## 25. Rangkuman

Sort + heap atau sweep untuk jadwal interval—fondasi banyak soal kalender.

---

## 26. Soal terkait

Employee free time (multiple lists)—merge kLists dulu.

---

## 27. Drill manual

Interval `[[0,30],[5,10],[15,20]]` → 2 rooms.

---

## 28. Varian: resource dengan kapasitas

Heap kapasitas atau network flow—lanjutan.

---

## 29. Varian: weighted

Biaya ruangan berbeda—DP atau LP—bukan greedy sederhana.

---

## 30. Penutup

Meeting rooms mengajar representasi waktu sebagai bilangan dan pola greedy pada timeline terurut.

---

Dokumen ini merangkum minimum rooms, attendance, dan hubungan merge interval untuk persiapan interview.
