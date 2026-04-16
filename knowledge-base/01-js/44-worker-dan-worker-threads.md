# Worker (browser) / `worker_threads` (Node)

Materi ini melengkapi baris indeks di `README.md`. Satu bagian berisi **penjelasan konsep**; satu bagian berisi **contoh soal coding** yang disusun mengikuti `00-template-jawaban-ideal-singkat-coding-test.md`.

---

## Pengantar: pindahkan kerja CPU berat

Worker menjalankan JS di thread terpisah sehingga main thread tidak terblokir.

### Mengapa dipedulikan di interview & produksi?

- Menjaga UI tetap responsif saat hitung berat.  
- Memanfaatkan multi-core untuk workload CPU-bound.  
- Membantu desain boundary data antar thread.

---

# Contoh soal coding: `runInWorkerLike`

## 1) Ringkasan Soal

- **Tingkat kesulitan:** Medium  
- **Topik utama:** worker mental model  
- **Inti masalah:** Simulasikan API yang menerima fungsi berat lalu menjalankannya async agar caller tidak blocked sinkron.

---

- Soal: `runInWorkerLike(fn, ...args)` -> Promise hasil.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Untuk latihan, jadwalkan dengan microtask/macrotask asinkron. Di produksi, gunakan Worker asli.

## 3) Versi Ultra Singkat (10-20 detik)

> Bungkus eksekusi ke Promise async boundary.

## 4) Pseudocode Ringkas (5-10 baris)

```text
runInWorkerLike(fn,args):
  return Promise.resolve().then(() => fn(...args))
```

## 5) Implementasi Final (Inti Saja)

```js
export function runInWorkerLike(fn, ...args) {
  return Promise.resolve().then(() => fn(...args));
}
```

## 6) Bukti Correctness (Wajib)

- Caller menerima Promise, bukan hasil sinkron langsung.  
- Error dari `fn` menjadi rejection.

## 7) Dry Run Singkat

- `await runInWorkerLike((a,b)=>a+b,1,2)` -> `3`.

## 8) Red Flags (Yang Harus Dihindari)

- Mengira ini benar-benar multi-thread.  
- Mengirim objek besar bolak-balik tanpa memikirkan biaya clone.

## 9) Follow-up yang Sering Muncul

- `postMessage` dan transferables.  
- Worker pool.

## 10) Trade-off Keputusan

- Simulasi mudah untuk latihan, worker asli diperlukan untuk parallel CPU nyata.

## 11) Checklist Siap Submit

- [ ] Solusi lolos contoh soal.  
- [ ] Kompleksitas disebutkan jelas.  
- [ ] Edge case minimum sudah dicek.  
- [ ] Nama variabel jelas dan tidak ambigu.  
- [ ] Tidak ada mutasi input yang tidak perlu.  
- [ ] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 1-10  
- Efisiensi: 1-10  
- Kejelasan penjelasan: 1-10  
- Kerapihan implementasi: 1-10  
- Catatan perbaikan:

---

## Template Drill Cepat (Isi < 2 Menit)

- Buat sketsa worker pool ukuran 2 untuk proses array job.

---

## Tautan ke indeks

- Kembali ke daftar topik: [`README.md`](./README.md)
