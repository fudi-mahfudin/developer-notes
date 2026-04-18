# #45 — Cache stampede pada key panas (jadwal dokter populer, dll.)

**Indeks:** [`README.md`](./README.md) · **ID:** `#45` · **Kategori:** Worker, cron, lock terdistribusi & cache

---

## Ringkasan

Ketika entri cache untuk **key sangat panas** kadaluwarsa, banyak request bersamaan melewati cache miss dan menabrak database/API asli bersamaan—**cache stampede**. Halaman jadwal dokter populer atau konfigurasi formularium yang di-cache dapat menyebabkan lonjakan beban yang melebihi traffic normal.

---

## Mitigasi ideal (~60 detik)

“Gunakan **probabilistic early expiration**, **single-flight** lock per key, atau **refresh ahead** dengan background worker. Untuk data jarang berubah, **TTL panjang** + invalidasi eksplisit lebih baik daripada TTL pendek agresif. Pertimbangkan **layer CDN** untuk read-only publik. Di healthcare, gabungkan stampede mitigation dengan [#46](46-invalidasi-cache-agresif-load-spike.md) untuk tidak mengganti satu masalah dengan lain.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Thundering herd on miss:** banyak miss bersamaan setelah expiry.
- **Single-flight:** satu compute untuk banyak waiter identik.

---

## Mengapa pola ini sangat umum di healthcare

1. Dokter tertentu sangat diminati—key jadwal panas.
2. TTL pendek untuk “freshness” tanpa memahami beban.
3. Burst traffic pagi saat pembukaan slot.

---

## Pola gagal (ilustrasi)

TTL 30 detik untuk daftar dokter rumah sakit besar—miss massal tiap 30 detik.

---

## Gejala di production

- Lonjakan DB tiap interval tetap walau pengguna tidak naik drastis.

---

## Diagnosis

1. Plot cache miss rate vs DB query untuk key sama.
2. Identifikasi key dengan cardinality rendah tetapi QPS tinggi.

---

## Mitigasi yang disarankan

1. Library seperti `memoizee` dengan promise coalescing.
2. Redis `SET` dengan Mutex around recompute.
3. Panjangkan TTL + pub/sub invalidasi selektif.

---

## Trade-off dan risiko

- Refresh ahead bisa menyajikan data sedikit usang—terima atau gunakan versioning.

---

## Aspek khusus healthcare

- Slot kuota obat langka dapat menyebabkan stampede pada cache inventaris—kombinasikan dengan kontrol konkurensi DB [#95](95-race-decrement-inventory-stok-negatif.md).

---

## Checklist review PR

- [ ] Cache untuk key dengan QPS tinggi punya strategi stampede.

---

## Kata kunci untuk pencarian

`cache stampede`, `single flight`, `probabilistic early expiration`, `redis`

---

## Catatan tambahan operasional

Instrumentasikan **mutex wait time** pada recomputasi cache untuk mendeteksi contention internal.

Siapkan **capacity plan** untuk cold start populer—misalnya dokter tertentu saat kampanye kesehatan nasional.

Gunakan **request coalescing** di GraphQL/DataLoader untuk menyatukan miss identik dalam satu jendela mikro.

Tambahkan **load test** khusus yang mensimulasikan kedaluwarsa cache serentak untuk key dokter populer.

---

## Referensi internal

- [`README.md`](./README.md) · **#46**, **#47**.
