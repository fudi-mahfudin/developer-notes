# JavaScript Runtime dan Event Loop

## Core Idea (Feynman Concept Applied)

Bayangkan kamu punya satu kasir di minimarket. Semua pelanggan masuk antrean. Kasir melayani satu per satu dengan cepat. Kalau ada pesanan yang butuh waktu lama (misalnya cek stok gudang), kasir lanjut ke pelanggan lain dulu. Saat hasil cek stok selesai, tugasnya masuk antrean lagi. Itu cara kerja event loop.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Node.js mengeksekusi JavaScript pada satu main thread.
- Event loop mengambil pekerjaan dari antrean ketika call stack kosong.
- Operasi I/O dijalankan async oleh runtime, lalu hasilnya dikembalikan ke antrean callback.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: async I/O untuk operasi baca/tulis data.
  - Kapan dipakai: endpoint API yang sering dipanggil.
  - Kelebihan: tidak memblok request lain.
  - Keterbatasan: perlu kontrol error dan timeout.
- Strategi 2: worker thread untuk CPU-heavy task.
  - Kapan dipakai: komputasi berat.
  - Kelebihan: main thread tetap responsif.
  - Keterbatasan: ada biaya komunikasi antarthread.

### Risiko dan Pitfall
- Risiko 1: blocking event loop.
  - Gejala: API melambat serentak.
  - Dampak: timeout dan SLA turun.
  - Mitigasi: pindahkan CPU-heavy task ke worker thread.
- Risiko 2: antrean callback menumpuk.
  - Gejala: delay meningkat saat trafik naik.
  - Dampak: UX buruk.
  - Mitigasi: batasi concurrency dan optimalkan I/O.

### Pros dan Cons
- **Pros**
  - Efisien untuk beban I/O tinggi.
  - Konsumsi resource relatif hemat.
- **Cons**
  - Rawan tersendat jika ada proses CPU-bound.
  - Sulit di-debug jika alur async tidak terstruktur.

### Trade-off Praktis di Produksi
- Latency cepat vs kompleksitas kontrol async.
- Throughput tinggi vs risiko overload dependency.
- Keputusan diambil dari metrik p95, error rate, dan event loop delay.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Dashboard status pasien**
  - Kondisi: banyak request baca paralel.
  - Masalah tanpa strategi: query menumpuk.
  - Solusi: async I/O + caching.
  - Hasil yang diharapkan: response stabil.
  - Catatan trade-off: data sedikit delay.
- **Kasus 2: Generate laporan besar**
  - Kondisi: laporan diunduh saat jam operasional.
  - Masalah tanpa strategi: API lain ikut lambat.
  - Solusi: worker thread/background job.
  - Hasil yang diharapkan: layanan utama tetap cepat.
  - Catatan trade-off: waktu laporan bisa lebih lama.

## Best Practices

- Hindari operasi CPU berat di main thread.
- Gunakan async I/O (`fs.promises`, HTTP async) agar server tetap responsif.
- Pahami urutan microtask (`Promise`) vs macrotask (`setTimeout`) saat debugging.
- Batasi jumlah proses paralel ke dependency eksternal untuk mencegah antrean callback menumpuk.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
// 1) Tujuan contoh: melihat urutan eksekusi sync, microtask, dan macrotask
console.log("A: mulai");

setTimeout(() => {
  // 3) Macrotask: masuk ke timer queue, diproses setelah microtask selesai
  console.log("C: dari setTimeout");
}, 0);

Promise.resolve().then(() => {
  // 2) Microtask: diproses lebih dulu setelah call stack kosong
  console.log("B: dari Promise");
});

console.log("D: selesai");
// 4) Edge case: jika ada loop CPU berat sebelum ini, urutan tetap sama tapi semua output bisa tertunda
// 5) Output normal: A, D, B, C
```

## Checklist Pemahaman

- [ ] Bisa jelaskan call stack, queue, dan event loop.
- [ ] Tahu kenapa `Promise.then` biasanya jalan sebelum `setTimeout`.
- [ ] Tahu risiko blocking main thread.
- [ ] Bisa memilih kapan harus pakai worker thread untuk CPU-heavy task.

## Latihan Mandiri

- Latihan 1 (basic): Ubah contoh dengan dua `setTimeout` berbeda delay.
- Latihan 2 (intermediate): Tambah operasi loop berat dan lihat dampak urutan output.
- Latihan 3 (simulasi produksi): Simulasikan endpoint API yang memanggil 3 I/O async paralel, lalu ukur perubahan p95 saat ditambah beban CPU-heavy.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: event loop delay, p95 latency.
- Metrik bisnis: waktu tunggu dashboard.
- Ambang batas awal: p95 < 500ms.
