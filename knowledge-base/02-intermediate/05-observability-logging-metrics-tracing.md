# Observability: Logging, Metrics, Tracing

## Core Idea (Feynman Concept Applied)

Observability itu seperti CCTV + speedometer + peta perjalanan. Kamu bisa tahu apa yang terjadi, seberapa cepat, dan di titik mana macet.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Di production, pendekatan utama monitoring adalah APM karena memberi gambaran end-to-end performa request.
- Logging tetap penting sebagai bukti detail saat investigasi, tetapi bukan satu-satunya sumber keputusan.
- Metrics dan trace dari APM membantu menemukan bottleneck sebelum user banyak komplain.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: APM-first monitoring.
  - Kapan dipakai: service production kritikal.
  - Kelebihan: visibilitas latency/error lintas komponen.
  - Keterbatasan: perlu setup agen dan biaya observability.
- Strategi 2: logging-focused baseline.
  - Kapan dipakai: sistem kecil/dev.
  - Kelebihan: implementasi cepat.
  - Keterbatasan: sulit melihat akar masalah lintas service.

### Risiko dan Pitfall
- Risiko 1: hanya mengandalkan log.
  - Gejala: sulit tahu bottleneck sistemik.
  - Dampak: troubleshooting lambat.
  - Mitigasi: aktifkan APM metrics + tracing.
- Risiko 2: observability noise.
  - Gejala: alert terlalu banyak.
  - Dampak: tim mengabaikan alarm penting.
  - Mitigasi: threshold bertahap dan alert berbasis SLO.

### Pros dan Cons
- **Pros**
  - Deteksi masalah lebih cepat.
  - RCA lebih akurat karena ada trace + metrik.
- **Cons**
  - Perlu governance data observability.
  - Biaya dan kompleksitas tooling bertambah.

### Trade-off Praktis di Produksi
- Visibilitas tinggi vs biaya monitoring.
- Alert sensitif vs false positive.
- Keputusan dibuat dari MTTR, error budget, dan impact bisnis.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Transaksi melambat saat jam sibuk**
  - Kondisi: p95 naik signifikan.
  - Masalah tanpa strategi: tim menebak-nebak sumber lambat.
  - Solusi: APM trace untuk isolasi bottleneck query/service.
  - Hasil yang diharapkan: perbaikan lebih cepat.
  - Catatan trade-off: perlu tuning sampling trace.
- **Kasus 2: Insiden timeout integrasi eksternal**
  - Kondisi: error sporadis di endpoint kritikal.
  - Masalah tanpa strategi: log tersebar sulit dikorelasi.
  - Solusi: APM error tracking + request id di log.
  - Hasil yang diharapkan: RCA jelas dalam satu timeline.
  - Catatan trade-off: biaya storage observability meningkat.

## Best Practices

- Gunakan APM untuk endpoint kritikal sebagai sumber utama insight performa.
- Pertahankan structured logging (JSON) sebagai pelengkap investigasi detail.
- Pantau golden signals: latency, traffic, errors, saturation.
- Tambahkan correlation/request id untuk menyambungkan trace dan log.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
const requestId = "req-123";
console.log(
  JSON.stringify({
    level: "info",
    requestId,
    message: "create order start",
  })
);
```

## Checklist Pemahaman

- [ ] Tahu peran APM sebagai monitoring utama di production.
- [ ] Tahu peran log sebagai pelengkap RCA.
- [ ] Tahu metrik minimum yang wajib dipantau API.
- [ ] Bisa menentukan alert threshold awal berbasis SLO.

## Latihan Mandiri

- Latihan 1 (basic): Tambah request-id di middleware Express.
- Latihan 2 (intermediate): Buat dashboard APM sederhana untuk 1 endpoint kritikal.
- Latihan 3 (simulasi produksi): Rancang aturan alert p95/error-rate dan proses eskalasi incident berbasis APM.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: p95/p99 latency, error rate, saturation.
- Metrik bisnis: kegagalan transaksi per jam.
- Ambang batas awal: error rate endpoint kritikal < 1%.
