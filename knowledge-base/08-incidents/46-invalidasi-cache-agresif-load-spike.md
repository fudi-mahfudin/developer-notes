# #46 — Invalidasi cache terlalu agresif → load spike

**Indeks:** [`README.md`](./README.md) · **ID:** `#46` · **Kategori:** Worker, cron, lock terdistribusi & cache

---

## Ringkasan

Mem-flush seluruh namespace cache atau mengirim **broadcast invalidation** terlalu sering—misalnya setiap pembaruan kecil pada formularium—memaksa ribuan klien untuk **recompute** bersamaan. Tanpa rate limiting recompute, sistem mengalami spike mirip stampede meskipun tanpa expiry alami.

---

## Mitigasi ideal (~60 detik)

“Gunakan **granular keys**—invalidasi per entitas, bukan seluruh map. Gunakan **version counter** dalam key (`formularium:v12`) untuk atomic switch tanpa flush global. Debounce invalidasi pada burst edit admin. Kombinasikan dengan warm cache async. Untuk healthcare, bedakan obat yang berubah jarang vs sering—jangan flush semua karena satu baris.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Granular invalidation:** menghapus hanya subset key terdampak.
- **Versioned cache key:** mengganti versi daripada flush.

---

## Mengapa pola ini sangat umum di healthcare

1. Tim yang khawatir stale data memilih “flush all”.
2. CMS internal mengedit banyak item berurutan.
3. Pub/sub invalidation tanpa throttle.

---

## Pola gagal (ilustrasi)

Setiap PUT ke API admin memanggil `redis.flushdb()` pada environment micro—meledakkan load.

---

## Gejala di production

- Lonjakan DB mengikuti aktivitas admin, bukan pasien.

---

## Diagnosis

1. Bandingkan timeline admin edits dengan traffic DB.
2. Audit kode invalidasi cache.

---

## Mitigasi yang disarankan

1. Key-space tagging per cabang/obat.
2. Delayed batch invalidation queue.
3. Metrics pada jumlah key yang dihapus per event.

---

## Trade-off dan risiko

- Granular invalidasi lebih rumuh—butuh mapping dependency.

---

## Aspek khusus healthcare

- Formularium dan alergen—kesalahan cache bisa berbahaya; gunakan versioning ketimbang flush brutal.

---

## Checklist review PR

- [ ] Tidak ada flush global untuk perubahan tunggal kecil.

---

## Kata kunci untuk pencarian

`cache invalidation`, `granular keys`, `versioned cache`

---

## Catatan tambahan operasional

Rekam **berapa banyak key** yang ter-invalidate per event untuk mendeteksi regresi konfigurasi admin.

Gunakan **canary invalidation** pada subset pod sebelum flush luas ketika melakukan migrasi skema cache.

Ubah pelatihan admin agar **batch edit** tidak memicu ratusan invalidation berturut-turut tanpa jeda.

Catat **event invalidation** ke metrics untuk melihat korelasi dengan lonjakan DB admin.

---

## Referensi internal

- [`README.md`](./README.md) · **#45**, **#47**.
