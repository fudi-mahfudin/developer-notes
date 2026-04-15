# Multi-thread dengan Worker Threads

## Core Idea (Feynman Concept Applied)

Worker thread itu seperti menambah koki khusus untuk tugas berat, supaya kasir utama tetap melayani pelanggan.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Worker thread menjalankan CPU-bound task di thread terpisah.
- Main thread tetap fokus melayani request I/O.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: worker per task.
  - Kapan dipakai: task sporadis.
  - Kelebihan: implementasi mudah.
  - Keterbatasan: overhead spawn tinggi.
- Strategi 2: worker pool.
  - Kapan dipakai: task berat berulang.
  - Kelebihan: stabil dan efisien.
  - Keterbatasan: perlu queue dan lifecycle management.

### Risiko dan Pitfall
- Risiko 1: data payload terlalu besar.
  - Gejala: latensi komunikasi thread tinggi.
  - Dampak: performa tidak membaik.
  - Mitigasi: kirim payload minimal.
- Risiko 2: worker leak.
  - Gejala: memori naik.
  - Dampak: service tidak stabil.
  - Mitigasi: cleanup dan timeout worker.

### Pros dan Cons
- **Pros**
  - Event loop tetap responsif.
  - Task CPU berat lebih terisolasi.
- **Cons**
  - Kompleksitas operasional naik.
  - Ada overhead komunikasi data.

### Trade-off Praktis di Produksi
- Responsivitas API vs kompleksitas arsitektur.
- Throughput komputasi vs biaya resource.
- Keputusan dari event loop delay dan CPU utilization.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Generate PDF laporan**
  - Kondisi: laporan besar saat jam kerja.
  - Masalah tanpa strategi: API utama melambat.
  - Solusi: pindahkan render PDF ke worker.
  - Hasil yang diharapkan: endpoint utama stabil.
  - Catatan trade-off: waktu generate bisa sedikit lebih lama.
- **Kasus 2: Hashing batch dokumen**
  - Kondisi: validasi file massal.
  - Masalah tanpa strategi: CPU main thread penuh.
  - Solusi: worker pool.
  - Hasil yang diharapkan: proses paralel terkendali.
  - Catatan trade-off: perlu monitoring pool depth.

## Best Practices

- Gunakan worker pool, bukan spawn worker berlebihan.
- Batasi payload pesan.
- Tangani error dan timeout worker.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
// main.ts
import { Worker } from "node:worker_threads";

function runHeavyTask(input: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./worker.js", import.meta.url), {
      workerData: input,
    });
    worker.on("message", resolve); // hasil dari worker
    worker.on("error", reject); // error dari worker
  });
}
```

## Checklist Pemahaman

- [ ] Tahu kapan perlu worker thread.
- [ ] Tahu biaya komunikasi antarthread.

## Latihan Mandiri

- Buat worker untuk komputasi checksum file besar.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: event loop delay, worker queue depth.
- Metrik bisnis: durasi generate dokumen.
- Ambang batas awal: event loop delay stabil di beban puncak.
