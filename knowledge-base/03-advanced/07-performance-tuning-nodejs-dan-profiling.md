# Performance Tuning Node.js dan Profiling

## Core Idea (Feynman Concept Applied)

Performance tuning itu seperti servis mobil: cek dulu bagian paling lambat sebelum ganti komponen.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Tuning performa dimulai dari baseline dan profiling.
- Fokus ke bottleneck terbesar yang berdampak ke user.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: APM-driven tuning.
  - Kapan dipakai: production workload.
  - Kelebihan: data real.
  - Keterbatasan: biaya monitoring.
- Strategi 2: benchmark lokal terkontrol.
  - Kapan dipakai: eksperimen awal.
  - Kelebihan: cepat iterasi.
  - Keterbatasan: belum merefleksikan trafik nyata.

### Risiko dan Pitfall
- Risiko 1: optimasi prematur.
  - Gejala: kode makin kompleks tanpa dampak.
  - Dampak: maintainability turun.
  - Mitigasi: prioritaskan berdasarkan metrik.
- Risiko 2: ubah banyak hal sekaligus.
  - Gejala: sulit tahu perubahan efektif.
  - Dampak: RCA tuning sulit.
  - Mitigasi: one-change-at-a-time.

### Pros dan Cons
- **Pros**
  - Latency dan biaya turun terukur.
  - Kapasitas sistem naik.
- **Cons**
  - Butuh disiplin eksperimen.
  - Risiko regressi jika tanpa guardrail test.

### Trade-off Praktis di Produksi
- Performa tinggi vs kesederhanaan kode.
- Waktu tuning vs delivery fitur.
- Keputusan berdasar p95/p99, CPU, error rate.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Endpoint transaksi lambat**
  - Kondisi: p95 melonjak di peak hour.
  - Masalah tanpa strategi: user timeout.
  - Solusi: profiling + query/index tuning.
  - Hasil yang diharapkan: p95 turun konsisten.
  - Catatan trade-off: migration index perlu jadwal aman.
- **Kasus 2: Memory leak service worker**
  - Kondisi: memori naik perlahan.
  - Masalah tanpa strategi: restart berulang.
  - Solusi: heap profiling + refactor object lifecycle.
  - Hasil yang diharapkan: stabilitas meningkat.
  - Catatan trade-off: investigasi butuh waktu.

## Best Practices

- Ukur baseline sebelum optimasi.
- Ubah satu hal, ukur lagi, bandingkan hasil.
- Prioritaskan bottleneck yang berdampak ke user.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
const start = performance.now();
await expensiveOperation();
const end = performance.now();
console.log(`durasi operasi: ${Math.round(end - start)}ms`);
```

## Checklist Pemahaman

- [ ] Tahu metrik utama performa API.
- [ ] Tahu cara melakukan before/after measurement.

## Latihan Mandiri

- Ukur 1 endpoint lambat, lalu coba 2 strategi optimasi berbeda.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: p95/p99 latency, CPU, memory.
- Metrik bisnis: waktu transaksi selesai.
- Ambang batas awal: p95 endpoint kritikal < target SLA.
