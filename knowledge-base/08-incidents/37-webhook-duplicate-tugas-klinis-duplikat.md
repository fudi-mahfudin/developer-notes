# #37 — Pengiriman webhook duplicate → tugas klinis duplikat

**Indeks:** [`README.md`](./README.md) · **ID:** `#37` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

Penyedia eksternal sering mengirim **webhook lebih dari sekali** untuk event yang sama ketika mereka tidak menerima ACK cepat atau ketika jaringan mengulang. Tanpa **deduplication** berbasis ID event + signature verifikasi, sistem internal dapat membuat dua tugas perawat, dua entri inventory, atau dua entri billing. Healthcare sangat sensitif terhadap duplikasi tugas klinis.

---

## Mitigasi ideal (~60 detik)

“Terima webhook sebagai **at-least-once**: simpan ID unik event di tabel dedup dengan constraint unik sebelum memproses efek samping. Verifikasi **HMAC signature** dan timestamp skew. Jawab 200 cepat setelah persist snapshot payload mentah—proses berat boleh async. Untuk FHIR Subscription, ikuti semantik topic/id yang disediakan vendor.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Inbox pattern:** menyimpan payload webhook mentah untuk audit dan retry proses.
- **Dedup key:** kombinasi `(source, event_id)` stabil.

---

## Mengapa pola ini sangat umum di healthcare

1. EMR vendor mengirim ulang hingga 24 jam.
2. Load balancer timeout menyebabkan vendor mengira gagal.
3. Worker internal retry mengirim efek downstream ganda.

---

## Pola gagal (ilustrasi)

Handler webhook langsung memicu `createTask()` tanpa cek idempotensi.

---

## Gejala di production

- Duplikat task di sistem perawat untuk satu hasil lab.

---

## Diagnosis

1. Log `event_id` vendor dan cari duplikat.
2. Bandingkan timestamp webhook vs waktu pemrosesan.

---

## Mitigasi yang disarankan

1. Tabel `webhook_events` dengan unique constraint.
2. Status mesin `received → processed`.
3. Queue consumer yang idempoten.

---

## Trade-off dan risiko

- Menyimpan payload webhook mentah—enkripsi dan retensi sesuai PHI.

---

## Aspek khusus healthcare

- Task duplikat dapat menyebabkan obat diberikan dua kali—severity tinggi.

---

## Checklist review PR

- [ ] Handler webhook menyimpan dedup sebelum efek samping.

---

## Kata kunci untuk pencarian

`webhook idempotency`, `HMAC signature`, `event dedup`, `inbox`

---

## Catatan tambahan operasional

Rotasi secret tanda tangan webhook harus **dual-key** agar tidak ada jeda verifikikasi.

Log **latency ACK** ke vendor—mereka sering mengirim ulang ketika ACK lambat meskipun pemrosesan sudah berhasil.

Berikan SLA ACK internal kepada tim integrasi agar tuning timeout jaringan tidak kontradiktif dengan deduplikasi.

Pantau **jumlah dedup** per sumber vendor—lonjakan menunjukkan perubahan semantik pengiriman di sisi mereka.

---

## Referensi internal

- [`README.md`](./README.md) · **#35**, **#38**.
