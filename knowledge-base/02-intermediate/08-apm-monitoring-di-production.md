# APM Monitoring di Production

## Core Idea (Feynman Concept Applied)

APM itu seperti ruang kontrol bandara: tim bisa melihat jalur mana yang macet, delay terjadi di mana, dan pesawat mana yang butuh prioritas.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- APM (Application Performance Monitoring) memantau performa aplikasi secara end-to-end.
- Data utama APM: transaction trace, latency, error rate, throughput, dependency map.
- APM membantu tim menemukan bottleneck tanpa menebak.

### Istilah Umum Monitoring dan Cara Membacanya
- **Throughput (RPS/TPM)**: jumlah request/transaksi yang diproses per detik/menit.
  - Cara baca:
    - Throughput naik + latency stabil -> sistem masih sehat.
    - Throughput naik + latency/error ikut naik -> kapasitas mulai jenuh.
- **Latency (p50/p95/p99)**: waktu respon request.
  - Cara baca:
    - p50 = pengalaman user "rata-rata".
    - p95/p99 = pengalaman user pada kondisi lambat (tail latency), biasanya indikator utama untuk alert.
- **Error Rate**: persentase request gagal (umumnya 5xx + timeout).
  - Cara baca:
    - Error rate kecil tapi konsisten bisa berarti bug permanen.
    - Error rate spike mendadak biasanya terkait incident/dependency down.
- **Saturation**: tingkat kejenuhan resource (CPU, memory, connection pool, queue depth).
  - Cara baca:
    - CPU/connection pool mendekati batas + latency naik -> bottleneck resource.
    - Queue depth terus naik -> worker tidak mengejar laju incoming job.
- **Apdex/User Frustration Index**: skor kepuasan performa user.
  - Cara baca:
    - Skor turun walau throughput stabil -> response mulai lambat untuk user.
- **Dependency Latency/Error**: performa service eksternal (DB, payment gateway, third-party API).
  - Cara baca:
    - Endpoint internal lambat sering berasal dari dependency latency tinggi.
    - Lihat breakdown trace per span untuk menemukan komponen paling lambat.

### Pola Cepat Membaca Dashboard APM (Praktis)
- Langkah 1: cek **error rate** dulu (ada incident aktif atau tidak).
- Langkah 2: cek **p95/p99 latency** pada endpoint kritikal.
- Langkah 3: cek **throughput** (apakah ada spike trafik).
- Langkah 4: cek **saturation** (CPU/memory/DB pool/queue).
- Langkah 5: buka **trace** untuk endpoint paling terdampak, identifikasi span paling lambat.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: full instrumentation endpoint kritikal.
  - Kapan dipakai: transaksi, login, pembayaran.
  - Kelebihan: visibilitas lengkap.
  - Keterbatasan: biaya observability lebih tinggi.
- Strategi 2: sampling trace bertahap.
  - Kapan dipakai: trafik tinggi.
  - Kelebihan: biaya lebih terkendali.
  - Keterbatasan: tidak semua request terekam.

### Risiko dan Pitfall
- Risiko 1: alert noise berlebihan.
  - Gejala: alert terlalu sering.
  - Dampak: alert fatigue.
  - Mitigasi: tetapkan threshold berdasarkan SLO.
- Risiko 2: blind spot instrumentation.
  - Gejala: komponen tertentu tidak terpantau.
  - Dampak: RCA lama.
  - Mitigasi: checklist coverage instrumentation.

### Pros dan Cons
- **Pros**
  - MTTR turun karena akar masalah lebih cepat ditemukan.
  - Keputusan tuning berbasis data nyata.
- **Cons**
  - Perlu governance metrik, dashboard, dan alert.
  - Biaya tooling dan penyimpanan data bisa tinggi.

### Trade-off Praktis di Produksi
- Visibilitas penuh vs biaya monitoring.
- Alert sensitif vs false positive.
- Keputusan memakai metrik error budget, p95 latency, dan incident frequency.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Endpoint transaksi melambat**
  - Kondisi: p95 naik pada jam sibuk.
  - Masalah tanpa strategi: tim tidak tahu bottleneck.
  - Solusi: APM trace + service map.
  - Hasil yang diharapkan: bottleneck query/dependency cepat terisolasi.
  - Catatan trade-off: perlu tuning sampling.
- **Kasus 2: Integrasi payment timeout**
  - Kondisi: error sporadis saat callback.
  - Masalah tanpa strategi: hanya log tersebar.
  - Solusi: APM error analytics + correlation ID di log.
  - Hasil yang diharapkan: RCA lebih cepat dan akurat.
  - Catatan trade-off: butuh standar instrumentasi lintas tim.

## Best Practices

- Instrument endpoint kritikal lebih dulu.
- Kaitkan APM dengan SLO/error budget.
- Gunakan logging sebagai pelengkap bukti detail.
- Review dashboard dan alert tiap sprint.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
// 1) Tujuan contoh: instrument transaksi kritikal
import apm from "elastic-apm-node";

// 2) Konfigurasi dasar (contoh sederhana)
apm.start({ serviceName: "billing-api" });

// 3) Implementasi inti
export async function createInvoice() {
  const tx = apm.startTransaction("create-invoice");
  try {
    // proses bisnis utama
    return { ok: true };
  } finally {
    tx?.end();
  }
}
```

## Checklist Pemahaman

- [ ] Saya bisa menjelaskan kapan APM lebih penting daripada log biasa.
- [ ] Saya paham metrik utama yang harus dipantau.
- [ ] Saya paham strategi alert berbasis SLO.
- [ ] Saya bisa mengaitkan APM dengan RCA incident.

## Latihan Mandiri

- Latihan 1 (basic): buat dashboard p95 + error rate.
- Latihan 2 (intermediate): tambah tracing untuk 1 endpoint kritikal.
- Latihan 3 (simulasi produksi): desain alerting rule untuk lonjakan timeout.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: p95/p99 latency, error rate, throughput, dependency latency.
- Metrik bisnis: kegagalan transaksi, waktu pemulihan insiden.
- Ambang batas awal: error rate endpoint kritikal < 1%.
