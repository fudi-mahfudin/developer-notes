# #51 — Event loop terblokir (`JSON.parse` payload FHIR sangat besar)

**Indeks:** [`README.md`](./README.md) · **ID:** `#51` · **Kategori:** Runtime Node.js & waktu

---

## Ringkasan

`JSON.parse` pada main thread Node.js bersifat **sinkron**—payload bundle FHIR multi-megabyte dapat memblokir **event loop** selama milidetik hingga detik, menunda semua request lain pada proses tersebut. Latency burst ini terlihat seperti masalah DB atau jaringan padahal akar masalahnya parsing CPU-bound di aplikasi healthcare Node.

---

## Mitigasi ideal (~60 detik)

“Kurangi ukuran payload—streaming parse jika memungkinkan, atau offload parsing besar ke **worker thread** (`worker_threads`) atau layanan terpisah. Terapkan **limit ukuran body** di reverse proxy dan validasi cepat sebelum parse penuh. Untuk FHIR, gunakan pagination `_count` ketat dan beri tahu partner integrasi batas Anda. Pantau **event loop lag** dengan metric `perf_hooks` atau lib external.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Event loop lag:** selisih antara waktu timer diharapkan vs aktual karena blocking.
- **CPU-bound pada JS:** parsing, kompresi, kripto sinkron.

---

## Mengapa pola ini sangat umum di healthcare

1. Vendor mengirim bundle besar berisi banyak Observation.
2. Logging yang mem-`JSON.stringify` objek besar di jalur panas.
3. Gateway menggabungkan banyak resource untuk kemudahan klien.

---

## Pola gagal (ilustrasi)

Middleware express.json tanpa `limit` → parse 50MB body dalam satu tick.

---

## Gejala di production

- Semua endpoint pada satu pod lambat bersamaan tanpa DB overload.
- Metric event loop lag spike mengikuti request FHIR besar.

---

## Diagnosis

1. Profiling dengan `--prof` atau clinic.js.
2. Tambahkan middleware mengukur durasi parse.

---

## Mitigasi yang disarankan

1. Body size limit cocok dengan SLA memori.
2. Worker threads untuk parse/transform berat.
3. Chunked upload + pipeline processing.

---

## Trade-off dan risiko

- Worker threads menambah kompleksitas debugging—serialisasi data masuk/keluar.

---

## Aspek khusus healthcare

- Bundle besar sering mengandung PHI—pertimbangkan streaming ke storage objek daripada memuat utuh di memori aplikasi.

---

## Checklist review PR

- [ ] Endpoint FHIR bulk punya limit dan jalur worker untuk transform berat.

---

## Kata kunci untuk pencarian

`JSON.parse`, `event loop lag`, `worker_threads`, `body size limit`

---

## Catatan tambahan operasional

Cantumkan **maximum bundle size** dalam kontrak integrasi dengan vendor rumah sakit mitra.

Tambahkan **middleware pengukuran** durasi parse pada endpoint FHIR untuk mendeteksi vendor yang mengirim bundle di luar kontrak.

Audit **heap external** saat menerima bundle besar untuk memastikan tidak ada duplikasi buffer antara middleware.

---

## Referensi internal

- [`README.md`](./README.md) · **#52**, **#88**.
