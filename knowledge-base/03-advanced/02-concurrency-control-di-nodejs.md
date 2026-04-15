# Concurrency Control di Node.js

## Core Idea (Feynman Concept Applied)

Concurrency control itu seperti pengatur pintu lift: banyak orang bisa datang bersamaan, tapi yang masuk dibatasi agar lift tidak overload.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Concurrency control membatasi jumlah pekerjaan paralel agar dependency tidak jenuh.
- Node.js async perlu limit di titik DB/API eksternal.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: semaphore.
  - Kapan dipakai: task paralel internal service.
  - Kelebihan: sederhana.
  - Keterbatasan: perlu tuning manual.
- Strategi 2: queue + worker.
  - Kapan dipakai: beban burst tinggi.
  - Kelebihan: stabil pada spike.
  - Keterbatasan: eventual consistency.

### Risiko dan Pitfall
- Risiko 1: unbounded concurrency.
  - Gejala: timeout massal.
  - Dampak: SLA turun.
  - Mitigasi: limit + backpressure.
- Risiko 2: limit terlalu rendah.
  - Gejala: antrean panjang.
  - Dampak: throughput turun.
  - Mitigasi: capacity testing berkala.

### Pros dan Cons
- **Pros**
  - Stabilitas sistem meningkat.
  - Dependency lebih terlindungi.
- **Cons**
  - Tuning perlu iterasi.
  - Bisa mengurangi throughput puncak.

### Trade-off Praktis di Produksi
- Throughput maksimum vs kestabilan SLA.
- Respons cepat vs keamanan dependency.
- Keputusan berdasarkan p95, timeout rate, saturation.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Generate laporan akhir bulan**
  - Kondisi: request paralel tinggi.
  - Masalah tanpa strategi: DB overload.
  - Solusi: semaphore + pool limit.
  - Hasil yang diharapkan: timeout menurun.
  - Catatan trade-off: waktu total report bisa naik.
- **Kasus 2: Sinkronisasi data vendor**
  - Kondisi: burst API call ke pihak ketiga.
  - Masalah tanpa strategi: throttling eksternal.
  - Solusi: queue + concurrency cap.
  - Hasil yang diharapkan: error 429 vendor berkurang.
  - Catatan trade-off: delay sinkronisasi bertambah.

## Best Practices

- Tetapkan batas concurrency berdasarkan kapasitas dependency.
- Gunakan circuit breaker saat dependency tidak stabil.
- Pantau saturation metric.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
async function runWithLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const current = index++;
      results[current] = await tasks[current]();
    }
  }

  await Promise.all(Array.from({ length: limit }, worker));
  return results;
}
```

## Checklist Pemahaman

- [ ] Tahu risiko unbounded concurrency.
- [ ] Bisa jelaskan manfaat semaphore/pool.

## Latihan Mandiri

- Uji `limit=2` vs `limit=10` terhadap waktu total dan error rate.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: saturation, timeout rate, queue wait time.
- Metrik bisnis: keberhasilan proses batch.
- Ambang batas awal: timeout endpoint kritikal < 1%.
