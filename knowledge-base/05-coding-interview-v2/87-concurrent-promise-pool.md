# Topik 87 — Pool Konkurensi untuk Promise

Ketika ada **banyak tugas async** (misalnya ribuan URL) tetapi hanya boleh **N** yang berjalan bersamaan, kita memakai **concurrency pool** / **semaphore** untuk membatasi paralelisme. Tanpa batas, Anda bisa kehabisan socket, memori, atau memicu rate limit.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Pola: simpan antrian tugas; jalankan hingga `N` worker; setiap selesai, ambil berikutnya dari antrian. Bisa diimplementasikan dengan **counter**, **async queue**, atau pustaka (`p-limit`, `bluebird.map` concurrency). Kompleksitas waktu tetap memproses semua tugas; **wall-clock** mendekati `total_time` dengan faktor `ceil(m/N)` jika setiap tugas serupa—intinya mengganti burst dengan aliran terkendali.

---

## 2. Mengapa topik ini keluar di interview

- Soal “Promise.all dengan batas 5” adalah klasik.
- Membedakan pool vs batching vs worker threads.

---

## 3. Implementasi ringkas

```javascript
async function runPool(limit, tasks) {
  const results = new Array(tasks.length);
  let i = 0;
  async function worker() {
    while (i < tasks.length) {
      const idx = i++;
      results[idx] = await tasks[idx]();
    }
  }
  const workers = Array.from({ length: Math.min(limit, tasks.length) }, () =>
    worker()
  );
  await Promise.all(workers);
  return results;
}
```

---

## 4. Varian: iterable factory

Daripada array fungsi besar, terima generator `nextTask()` untuk menghemat memori.

---

## 5. Kompleksitas

O(tasks) eksekusi; overhead sinkronisasi O(1) per task pada implementasi baik.

---

## 6. Pitfall: `Promise.all` tanpa batas

Membuka ribuan request sekaligus.

---

## 7. Pitfall: race pada indeks

Gunakan atomic increment atau queue struktur—contoh di atas memakai `i++` sequential di single thread JS aman.

---

## 8. Pitfall: error di satu task

Putuskan: gagal total (`Promise.all`) atau lanjut (`allSettled`).

---

## 9. Pola interview: map URL dengan limit

`p-limit` atau manual pool.

---

## 10. Pola interview: scrape dengan delay + pool

Gabung throttle server-side politeness.

---

## 11. Latihan konsep

Buktikan mengapa `chunk` array + `Promise.all` per chunk tidak sama dengan pool jika tugas tidak seragam panjangnya.

---

## 12. Latihan kode

Tulis pool yang mendukung **prioritas** sederhana.

---

## 13. Edge cases

- `limit=1` menjadi sequential.
- `tasks` kosong: resolve cepat.

---

## 14. Checklist

- [ ] Batas N jelas.
- [ ] Propagasi error konsisten.
- [ ] Tidak membocorkan promise mengambang.

---

## 15. Referensi

`p-queue`, `p-limit`; Node `async.cargo` legacy.

---

## 16. Anti-pattern

`setInterval` spawn tanpa backpressure—gunakan pool.

---

## 17. Flashcard

- **Backpressure:** mengatur laju produksi vs konsumsi.

---

## 18. Testing

Simulasi task dengan delay acak; assert max concurrent dengan counter.

---

## 19. Performa

Menstabilkan throughput dan menghindari OOM.

---

## 20. Integrasi TypeScript

`tasks: (() => Promise<T>)[]`.

---

## 21. Debugging

Log `active` count pada start/finish task.

---

## 22. Memori

Antrian besar—streaming task lebih baik daripada array besar.

---

## 23. Parallel

Worker threads untuk CPU; pool promise untuk I/O concurrency pada satu thread.

---

## 24. Etika wawancara

Tanyakan apakah urutan hasil harus sama dengan input (contoh di atas ya).

---

## 25. Rangkuman

Semaphore promise membatasi paralelisme tanpa mengubah semantik selesai semua tugas.

---

## 26. Soal terkait

Weighted fair queue—lanjutan sistem.

---

## 27. Drill manual

10 task, limit 3 — sketsa slot waktu jika masing-masing 1s.

---

## 28. Varian: dynamic limit

Turunkan N saat error 429 naik.

---

## 29. Penutup

Pool adalah jembatan antara kode async “naif” dan perilaku produksi yang terkendali.

---

Dokumen ini menjelaskan concurrency pool untuk promise, implementasi worker, dan jebakan Promise.all tak terbatas.
