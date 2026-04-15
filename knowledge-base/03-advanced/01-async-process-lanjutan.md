# Async Process Lanjutan

## Core Idea (Feynman Concept Applied)

Async process lanjutan itu seperti dapur besar: ada beberapa jalur kerja berbeda yang harus diatur supaya masakan cepat keluar tanpa saling tabrak.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Async process lanjutan memecah workflow besar menjadi unit kerja yang bisa diproses paralel atau bertahap.
- Pola fan-out/fan-in, pipeline, dan batch dipakai untuk mengelola throughput tinggi.
- Backpressure menjaga sistem tetap stabil saat antrian masuk lebih cepat dari kapasitas worker.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: pipeline bertahap.
  - Kapan dipakai: alur validasi berurutan.
  - Kelebihan: kontrol kualitas tiap tahap jelas.
  - Keterbatasan: total durasi bisa lebih panjang.
- Strategi 2: fan-out/fan-in.
  - Kapan dipakai: subtask independen.
  - Kelebihan: proses lebih cepat.
  - Keterbatasan: koordinasi hasil lebih kompleks.

### Risiko dan Pitfall
- Risiko 1: antrian menumpuk.
  - Gejala: backlog naik terus.
  - Dampak: SLA terlewat.
  - Mitigasi: scaling worker + batas concurrency.
- Risiko 2: hasil parsial tidak terkendali.
  - Gejala: data antar tahap tidak sinkron.
  - Dampak: output final tidak valid.
  - Mitigasi: checkpoint dan idempotent step.

### Pros dan Cons
- **Pros**
  - Throughput tinggi untuk beban besar.
  - Sistem lebih tahan lonjakan traffic.
- **Cons**
  - Debugging alur lintas tahap lebih sulit.
  - Membutuhkan observability matang.

### Trade-off Praktis di Produksi
- Kecepatan proses vs konsistensi lintas tahap.
- Throughput tinggi vs kompleksitas orkestrasi.
- Keputusan memakai metrik backlog, processing time, dan failure rate.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Sinkronisasi klaim multi-sumber**
  - Kondisi: data datang dari beberapa provider.
  - Masalah tanpa strategi: proses lambat dan error sulit dilacak.
  - Solusi: fan-out validasi + fan-in agregasi.
  - Hasil yang diharapkan: SLA sinkronisasi membaik.
  - Catatan trade-off: koordinasi status jadi lebih kompleks.
- **Kasus 2: Rekap laporan harian**
  - Kondisi: data jutaan baris diproses malam hari.
  - Masalah tanpa strategi: job sering timeout.
  - Solusi: batch processing + backpressure.
  - Hasil yang diharapkan: job selesai stabil.
  - Catatan trade-off: hasil tidak real-time.

## Best Practices

- Batasi jumlah task paralel.
- Pisahkan task cepat dan task berat.
- Catat metrik durasi dan kegagalan per task.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
async function processBatch<T>(items: T[], worker: (x: T) => Promise<void>) {
  // Proses batch satu per satu agar aman dari lonjakan
  for (const item of items) {
    await worker(item);
  }
}
```

## Checklist Pemahaman

- [ ] Tahu konsep backpressure.
- [ ] Tahu kapan pakai batch processing.

## Latihan Mandiri

- Implementasi worker batch dengan retry sederhana.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: queue backlog, processing duration, failure rate.
- Metrik bisnis: keterlambatan laporan/sinkronisasi.
- Ambang batas awal: backlog tidak tumbuh terus selama 15 menit.
