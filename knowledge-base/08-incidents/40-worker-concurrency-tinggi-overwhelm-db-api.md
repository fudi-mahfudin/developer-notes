# #40 — Worker concurrency terlalu tinggi → overwhelm DB / API

**Indeks:** [`README.md`](./README.md) · **ID:** `#40` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

Meningkatkan **parallelism** worker (BullMQ concurrency, Kafka consumer `max.poll.records` besar) tanpa memahami **kapasitas database** atau API eksternal dapat menyebabkan oversubscribe—ribuan query/transaksi bersamaan melebihi pool dan timeout semua. Di healthcare, burst worker untuk mengejar backlog setelah downtime dapat mematikan sistem yang baru pulih (**retry storm** berlapis dengan [#34](34-retry-tanpa-exponential-backoff.md)).

---

## Mitigasi ideal (~60 detik)

“Concurrency harus **match** dengan pool DB dan SLA eksternal—gunakan **rate limiter global** dan **semaphore** per dependensi. Pantau **queue lag** vs **DB CPU/p95 query**. Naikkan concurrency secara bertahap setelah load test. Untuk integrasi payer, hormati contract rate—lebih baik backlog terkontrol daripada membombardir.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Little's law relation:** backlog ≈ throughput × waktu proses; menaikkan concurrency tanpa menurunkan waktu proses tidak selalu membantu.
- **Bulkhead:** membatasi concurrency per kelas job.

---

## Mengapa pola ini sangat umum di healthcare

1. Tekanan bisnis untuk “habiskan antrian” cepat setelah incident.
2. Auto-scaling worker tanpa kontrol keluaran DB.
3. Satu worker menjalankan job berat dan ringan tanpa pemisahan.

---

## Pola gagal (ilustrasi)

`concurrency: 100` pada worker yang masing-masing membuka transaksi DB panjang.

---

## Gejala di production

- DB connection errors dan timeout massal saat backlog diproses.
- API eksternal mulai membalas 429/503.

---

## Diagnosis

1. Plot concurrency worker vs DB active connections.
2. Korelasikan lonjakan error dengan restart worker scale-up.

---

## Mitigasi yang disarankan

1. Dynamic concurrency berdasarkan health downstream.
2. Pisahkan queue berat vs ringan.
3. Backpressure—perlambat producer.

---

## Trade-off dan risiko

- Concurrency rendah meningkatkan lag—komunikasikan SLA antrian.

---

## Aspek khusus healthcare

- Job radiologi besar dapat menelan GPU/IO—isolasi worker pool.

---

## Checklist review PR

- [ ] Perubahan concurrency disertai estimasi dampak pool DB.

---

## Kata kunci untuk pencarian

`worker concurrency`, `backpressure`, `bulkhead`, `rate limit`

---

## Catatan tambahan operasional

Implementasikan **adaptive concurrency** yang menurunkan otomatis ketika error rate downstream melampaui ambang.

Integrasikan metrik concurrency dengan **SLO layanan downstream** untuk menghindari kontrak yang tidak disengaja melampaui SLA vendor.

Konfigurasikan **queue priorities** agar tugas pengembalian layanan penting tidak tertahan di belakang batch berat yang bisa ditunda.

---

## Referensi internal

- [`README.md`](./README.md) · **#16**, **#34**.
