# #35 — Retry pada operasi non-idempoten → duplikat order / charge

**Indeks:** [`README.md`](./README.md) · **ID:** `#35` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

HTTP client atau worker queue yang **mengulang POST** pembuatan order lab, charge ke kartu, atau pengiriman resep elektronik tanpa **idempotency key** dapat menciptakan **duplikat efek samping** di sistem luar ketika respons asli hilang atau timeout ambigu. Di healthcare, duplikasi bisa berarti dua kali pengambilan spesimen atau klaim ganda.

---

## Mitigasi ideal (~60 detik)

“Anggap semua efek samping sebagai **idempoten secara desain**: kirim header **`Idempotency-Key`** atau kunci bisnis stabil; gunakan **`POST -> upsert`** dengan constraint unik di DB; untuk pembayaran ikuti panduan gateway. Retry hanya pada kesalahan yang Anda tahu **belum dieksekusi**. Untuk webhook keluar, simpan status pengiriman di DB sebelum call sehingga retry tidak mengirim payload baru dengan ID berbeda.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **At-least-once delivery:** bisa duplicate tanpa proteksi idempoten.
- **Effectively-once:** kombinasi idempotency + dedup.

---

## Mengapa pola ini sangat umum di healthcare

1. Timeout gateway menghasilkan respons kosong meskipun server eksternal berhasil.
2. Worker NATS/Kafka retry default agresif.
3. Kurangnya constraint unik pada ID pesanan eksternal.

---

## Pola gagal (ilustrasi)

Timeout HTTP → klien mengira gagal → POST ulang → dua order dengan nomor berbeda di LIS.

---

## Gejala di production

- Duplikat baris pada sistem billing eksternal.
- Pasien mendapat dua SMS konfirmasi.

---

## Diagnosis

1. Bandingkan log request ID gateway dengan DB internal.
2. Cari pola duplikat dengan grouping fingerprint payload.

---

## Mitigasi yang disarankan

1. Idempotency store (Redis/DB) dengan TTL.
2. Unique constraint pada `(source_system, external_correlation_id)`.
3. Webhook konsumen dedup berdasarkan header signature + ID [#37](37-webhook-duplicate-tugas-klinis-duplikat.md).

---

## Trade-off dan risiko

- Menyimpan idempotency record panjang—TTL dan privasi data.

---

## Aspek khusus healthcare

- Keselamatan pasien: duplikasi tes invasif tidak dapat diterima—alarm pada duplikat mendadak.

---

## Checklist review PR

- [ ] Endpoint yang memicu efek luar punya strategi idempotensi terdokumentasi.

---

## Kata kunci untuk pencarian

`idempotency`, `duplicate charge`, `at-least-once`, `retry safety`

---

## Catatan tambahan operasional

Berlatih skenario **timeout tepat setelah commit server** dalam tes chaos untuk memastikan dedup berfungsi.

Catat **versi kontrak** payload pada idempotensi agar upgrade skema tidak mengacaukan deduplikasi historis.

Lakukan **reconciliation** harian antara sistem internal dan layanan eksternal untuk menemukan duplikat yang lolos.

---

## Referensi internal

- [`README.md`](./README.md) · **#36**, **#37**.
