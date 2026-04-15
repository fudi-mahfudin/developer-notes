# Race Condition, Deadlock, dan Mitigasi

## Core Idea (Feynman Concept Applied)

Race condition itu seperti dua orang menulis di papan yang sama bersamaan, hasilnya bisa kacau. Deadlock itu dua orang saling menunggu kunci dan tidak ada yang maju.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Race condition terjadi saat urutan eksekusi memengaruhi hasil akhir.
- Deadlock terjadi saat proses saling menunggu lock/resource.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: pessimistic locking.
  - Kapan dipakai: transaksi kritikal.
  - Kelebihan: konsistensi kuat.
  - Keterbatasan: throughput menurun.
- Strategi 2: optimistic locking.
  - Kapan dipakai: konflik relatif jarang.
  - Kelebihan: performa lebih baik.
  - Keterbatasan: butuh retry logic.

### Risiko dan Pitfall
- Risiko 1: lock terlalu lama.
  - Gejala: antrean transaksi panjang.
  - Dampak: latency meningkat.
  - Mitigasi: transaksi singkat.
- Risiko 2: retry tanpa batas.
  - Gejala: load naik terus.
  - Dampak: service tidak stabil.
  - Mitigasi: retry cap + backoff.

### Pros dan Cons
- **Pros**
  - Data konsisten.
  - Duplikasi transaksi berkurang.
- **Cons**
  - Kompleksitas concurrency logic naik.
  - Throughput bisa turun jika lock agresif.

### Trade-off Praktis di Produksi
- Konsistensi ketat vs performa.
- Lock kuat vs user latency.
- Keputusan dari conflict rate dan transaction latency.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Booking slot dokter**
  - Kondisi: banyak user memilih slot sama.
  - Masalah tanpa strategi: double booking.
  - Solusi: optimistic lock + version.
  - Hasil yang diharapkan: slot unik terjaga.
  - Catatan trade-off: user mungkin perlu retry.
- **Kasus 2: Update stok inventory**
  - Kondisi: retur dan penjualan bersamaan.
  - Masalah tanpa strategi: saldo stok salah.
  - Solusi: transaksi DB + lock ordering.
  - Hasil yang diharapkan: stok konsisten.
  - Catatan trade-off: write throughput sedikit turun.

## Best Practices

- Jaga critical section sekecil mungkin.
- Tetapkan urutan lock konsisten.
- Gunakan unique constraint untuk mencegah duplikasi.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
let stock = 1;

async function reserve() {
  // Simulasi critical section
  if (stock > 0) {
    await new Promise((r) => setTimeout(r, 10));
    stock -= 1;
  }
}
// Tanpa sinkronisasi, dua reserve paralel bisa bikin data salah.
```

## Checklist Pemahaman

- [ ] Bisa jelaskan contoh race condition di API.
- [ ] Tahu strategi menghindari deadlock.

## Latihan Mandiri

- Simulasikan race condition pada update inventory dan cari mitigasinya.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: conflict rate, lock wait time.
- Metrik bisnis: insiden mismatch data.
- Ambang batas awal: mismatch kritikal = 0.
