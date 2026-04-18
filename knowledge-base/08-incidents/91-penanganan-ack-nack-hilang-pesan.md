# #91 — Penanganan ACK/NACK salah → pesan dianggap terkirim padahal ditolak

**Indeks:** [`README.md`](./README.md) · **ID:** `#91` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

Protokol HL7 melibatkan **ACK/NACK** untuk mengonfirmasi pesan diproses. Salah menginterpretasi kode ACK atau tidak menangani **NACK/persist negative** menyebabkan sistem pengirim mengira pesan laboratorium atau ADT telah diterima padahal ditolak—menghasilkan **kesenjangan data** tanpa retry.

---

## Mitigasi ideal (~60 detik)

“Implementasikan **state machine** pengiriman: tunggu ACK dengan kriteria sukses jelas (`AA` vs `AE/AR`), retry dengan backoff untuk failure, simpan pesan hingga ACK sukses [#38](38-tanpa-outbox-pesan-hilang-antara-db-dan-queue.md). Log mentah ACK untuk RCA.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Commit ACK:** acknowledgment bahwa pesan dapat diproses downstream.

---

## Mengapa pola ini sangat umum di healthcare

1. Implementasi minimal yang menganggap TCP success cukup.
2. Pes beda versi ACK structure.
3. Firewall memutus session sebelum ACK.

---

## Pola gagal (ilustrasi)

Menandai pesan sebagai terkirima setelah socket write tanpa membaca ACK.

---

## Gejala di production

- Laboratorium tidak pernah menerima order meskipun UI pengirim menunjukkan sukses.

---

## Diagnosis

1. Bandingkan log ACK dengan antrian pesan.
2. Uji dengan simulator HL7 yang mengirim AE.

---

## Mitigasi yang disarankan

1. Integration engine (Mirth/Rhapsody) vs custom parser—pilih dengan hati-hati.
2. Metrics untuk ACK latency dan error codes.

---

## Trade-off dan risiko

- Retry dapat menduplikasi—gunakan control id [#37](37-webhook-duplicate-tugas-klinis-duplikat.md).

---

## Aspek khusus healthcare

- Order lab hilang dapat menunda diagnosis—severity tinggi.

---

## Checklist review PR

- [ ] Gateway HL7 menyertakan tes ACK positif dan negatif.

---

## Kata kunci untuk pencarian

`HL7 ACK`, `MLLP`, `AE AR`, `retry`

---

## Skenario regresi yang disarankan

1. Simulator kirim AE untuk OBX tertentu—workflow harus alert operator.
2. Putus socket sebelum ACK—pesan harus pending retry.

---

## KPI pemantauan

- Persentase pesan tanpa ACK final sukses.

---

## Catatan tambahan operasional

Rancang **dashboard operator** untuk antrian pesan bermasalah dengan pemindaian cepat pesan mentah.

---

## Referensi internal

- [`README.md`](./README.md) · **#37**, **#38**.
