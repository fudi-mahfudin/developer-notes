# Topik 21 — Merge Intervals / Overlapping Intervals

Diberikan kumpulan interval `[start, end]`, seringkali kita perlu **menggabungkan** yang saling overlap menjadi interval disjoint yang setara secara union. Pola umum: **sort by start**, lalu **sweep** linear sambil mempertahankan interval “aktif” terakhir.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Setelah mengurutkan berdasarkan `start` (dan tie-break `end` jika perlu), iterasi satu kali: jika interval berikutnya mulai sebelum atau sama dengan akhir interval gabungan saat ini, gabungkan dengan memperbarui `end` menjadi `max(end, next.end)`; jika tidak, dorong interval baru ke output. Kompleksitas dominan **O(n log n)** dari sorting; sweep **O(n)**. Ini juga dasar analisis “meeting rooms” (topik 80) meskipun pertanyaannya berbeda (minimal ruangan).

---

## 2. Mengapa topik ini keluar di interview

- Representasi waktu sebagai interval sangat umum di kalender, SLA, jendela pemeliharaan.
- Menguji sorting + greedy invariant.

---

## 3. Implementasi JavaScript

```javascript
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const out = [intervals[0].slice()];
  for (let i = 1; i < intervals.length; i++) {
    const [s, e] = intervals[i];
    const last = out[out.length - 1];
    if (s <= last[1]) last[1] = Math.max(last[1], e);
    else out.push([s, e]);
  }
  return out;
}
```

---

## 4. Definisi overlap

Umumnya `[a,b]` dan `[c,d]` overlap jika `max(a,c) <= min(b,d)`. Untuk merge setelah sort by `a`, cukup cek `c <= b` dengan `b` interval sebelumnya.

---

## 5. Kompleksitas

- Sort: O(n log n)
- Sweep: O(n)
- Ruang: O(n) output (bukan in-place pada umumnya)

---

## 6. Edge cases

- Interval kosong sebagai input.
- Interval tunggal.
- Interval yang sepenuhnya menelan yang lain setelah sort tetap ter-merge oleh `max(end)`.

---

## 7. Pitfall: mutasi input

Sort in-place mengubah array asli—salin jika tidak diinginkan.

---

## 8. Pitfall: tipe terbuka/tutup

Soal kadang `[start, end)` — uji ketidaksamaan strict; sesuaikan kondisi.

---

## 9. Variasi: insert interval ke merged list

Gunakan merge satu kali dengan binary search untuk posisi insert—latihan lanjutan.

---

## 10. Variasi: union area pada garis nomor

Konsep sama di 1D; 2D persegi lebih rumit (bukan cakupan singkat).

---

## 11. Pola wawancara

Sebutkan “sort + greedy sweep” dan invariant: “output tetap disjoint dan mencakup union.”

---

## 12. Latihan

Diberikan interval jam kerja dan timezone—diskusikan normalisasi ke UTC sebelum merge.

---

## 13. Checklist

- [ ] Sort key yang benar.
- [ ] Update `end` dengan max.
- [ ] Handle input kosong.

---

## 14. Referensi

Interval merging adalah greedy klasik; bukti: setelah sort by start, urutan greedy optimal untuk union.

---

## 15. Hubungan jadwal

Minimal conference rooms: gunakan min-heap atau sweep endpoints—topik 80.

---

## 16. Quiz

`[[1,4],[0,4]]` setelah sort by start: `[0,4]` dulu—merge menjadi satu.

---

## 17. Anti-pattern

Nested loop cek semua pasangan O(n²) untuk merge total.

---

## 18. Flashcard

- **Sort:** by start.
- **Sweep:** perpanjang `end` jika overlap.

---

## 19. Latihan tulis

Implementasikan `intervalIntersection(a, b)` untuk dua daftar interval terurut merged—gunakan two pointers.

---

## 20. Testing

Generate interval acak kecil, brute force union discrete timeline untuk verifikasi.

---

## 21. Immutability

Gunakan `.slice()` atau spread saat push untuk hindari sharing reference yang tidak sengaja.

---

## 22. Kompleksitas ruang

Dapat O(1) tambahan jika merge in-place dengan hati-hati—jarang dituntut di interview JS.

---

## 23. Penutup

Merge interval adalah latihan menyambungkan sorting dengan greedy satu pass—sangat standar.

---

## 24. Tambahan: string sebagai interval leksikografis

Kurang umum; pastikan ordering terdefinisi.

---

## 25. Tambahan: bigint interval

Gunakan BigInt konsisten untuk `start/end` jika nilai sangat besar.

---

## 26. Diagram mental

Timeline horizontal, interval sebagai segmen—merge menyatukan segmen yang menyentuh.

---

## 27. Kesalahan umum junior

Lupa sort dan mengira sweep linear bekerja.

---

## 28. Komparator alternatif

Sort by `(start, end)` untuk determinisme tie-break.

---

## 29. Integrasi API

Interval dari JSON sering string ISO—parse ke number ms sebelum merge.

---

## 30. Rangkuman

Sort by start, linear merge dengan `max` pada ujung—O(n log n) total.

---

Dokumen ini mempersiapkan Anda untuk variasi interval yang sering muncul di platform soal.
