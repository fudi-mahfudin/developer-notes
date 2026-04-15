# Async/Await dan Promise Pattern

## Core Idea (Feynman Concept Applied)

Promise itu seperti tiket antrean makanan: kamu pesan sekarang, ambil saat siap. `async/await` membuat alur ini terbaca seperti langkah biasa.

## Penjelasan Detail Aspek Penting

### Konsep dan Mekanisme Inti
- Promise merepresentasikan hasil operasi async.
- `async/await` menyederhanakan alur async agar terbaca linear.
- Paralelisme async meningkatkan kecepatan ketika tugas saling independen.

### Variasi/Strategi yang Umum Dipakai
- Strategi 1: `Promise.all`.
  - Kapan dipakai: semua call wajib sukses.
  - Kelebihan: cepat karena paralel.
  - Keterbatasan: gagal satu, gagal semua.
- Strategi 2: `Promise.allSettled`.
  - Kapan dipakai: toleran gagal sebagian.
  - Kelebihan: hasil per task tetap didapat.
  - Keterbatasan: perlu logika post-processing.

### Risiko dan Pitfall
- Risiko 1: await berantai tidak perlu.
  - Gejala: response lambat.
  - Dampak: latency naik.
  - Mitigasi: ubah ke eksekusi paralel.
- Risiko 2: unhandled rejection.
  - Gejala: proses berhenti tiba-tiba.
  - Dampak: job gagal diam-diam.
  - Mitigasi: handler error terpusat + logging.

### Pros dan Cons
- **Pros**
  - Kode lebih mudah dipahami.
  - Alur async lebih terkontrol.
- **Cons**
  - Salah desain paralel bisa overload dependency.
  - Debug race condition tetap menantang.

### Trade-off Praktis di Produksi
- Kecepatan response vs beban ke downstream service.
- Toleransi gagal vs konsistensi data lengkap.
- Keputusan diambil dari p95 latency dan error rate.

### Contoh Kasus Proses Bisnis Nyata
- **Kasus 1: Load dashboard operasional**
  - Kondisi: butuh 3 sumber data.
  - Masalah tanpa strategi: loading lama.
  - Solusi: `Promise.all` + timeout.
  - Hasil yang diharapkan: load lebih cepat.
  - Catatan trade-off: kegagalan satu sumber memengaruhi hasil.
- **Kasus 2: Rekap notifikasi harian**
  - Kondisi: sebagian sumber kadang gagal.
  - Masalah tanpa strategi: proses batal total.
  - Solusi: `Promise.allSettled` + fallback.
  - Hasil yang diharapkan: proses tetap jalan.
  - Catatan trade-off: data parsial perlu ditandai.

## Best Practices

- Jalankan pekerjaan independen secara paralel.
- Pakai `try/catch` di level yang tepat.
- Hindari `await` berantai jika tidak saling bergantung.
- Tambahkan timeout dan fallback untuk dependency yang sering tidak stabil.

## Contoh Praktis Ringkas (dengan komentar kode)

```ts
async function loadDashboard() {
  // Dua operasi independen, jalankan paralel
  const [patients, orders] = await Promise.all([
    fetchPatients(),
    fetchOrders(),
  ]);
  return { patients, orders };
}
```

## Checklist Pemahaman

- [ ] Tahu kapan pakai `Promise.all` vs `allSettled`.
- [ ] Tahu error handling async.
- [ ] Bisa mengidentifikasi kapan eksekusi harus paralel vs berurutan.
- [ ] Bisa menjelaskan risiko unhandled rejection di produksi.

## Latihan Mandiri

- Latihan 1 (basic): Buat helper `withTimeout(promise, ms)`.
- Latihan 2 (intermediate): Ubah flow serial menjadi paralel lalu bandingkan latency.
- Latihan 3 (simulasi produksi): Simulasikan 3 dependency API, satu sering timeout, lalu rancang fallback agar endpoint tetap merespons.

## Catatan Metrik yang Perlu Dipantau (Opsional)

- Metrik teknis: p95 latency, timeout rate.
- Metrik bisnis: waktu muat dashboard.
- Ambang batas awal: p95 endpoint agregasi < 800ms.
