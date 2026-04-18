# #89 — Parsing HL7: field opsional berbeda antar vendor → null silent

**Indeks:** [`README.md`](./README.md) · **ID:** `#89` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

Pesan **HL7 v2** sering menggunakan field opsional secara berbeda antar vendor—misalnya PID-5 komponen nama atau OBX-3 untuk kode hasil. Parser yang mengasumsikan struktur tetap dapat mengisi **`null` tanpa error**, menyebabkan mapping **gelap**—hasil lab atau demografi hilang dari sistem downstream tanpa alarm keras.

---

## Mitigasi ideal (~60 detik)

“Bangun **profil integrasi per vendor** dengan mapping eksplisit dan validasi schema; gunakan tes fixture pesan nyata; fail fast ketika field wajib bisnis kosong—jangan silent continue. Simpan pesan mentah untuk reprocessing [#39](39-poison-message-tanpa-dlq.md). Untuk onboarding vendor baru, jalankan parallel shadow mode.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Shadow mode:** memproses pesan baru tanpa mempengaruhi produksi sampai diverifikasi.

---

## Mengapa pola ini sangat umum di healthcare

1. Ratusan variasi OBX untuk instrumen berbeda.
2. Parser regex rapuh.
3. Upgrade vendor mengubah encoding komponen.

---

## Pola gagal (ilustrasi)

`segment.PID.name` undefined → sistem menyimpan pasien tanpa nama tanpa error.

---

## Gejala di production

- Data kosong pada laporan billing atau lab tanpa trigger.

---

## Diagnosis

1. Monitoring field null rate per vendor.
2. Sampling pesan mentah vs output DB.

---

## Mitigasi yang disarankan

1. Structured validation dengan error queue.
2. Vendor-specific adapters.
3. Dashboard completeness metrics.

---

## Trade-off dan risiko

- Strict validation meningkatkan DLQ—perlu engagement operasional.

---

## Aspek khusus healthcare

- Nama pasien salah/kosong berisiko keselamatan ekstrem—wajib alarm.

---

## Checklist review PR

- [ ] Parser HL7 baru menyertakan tes dengan pesan vendor nyata minimal 10 skenario.

---

## Kata kunci untuk pencarian

`HL7 mapping`, `null safety`, `vendor profile`, `OBX`

---

## Skenario regresi yang disarankan

1. Kirim pesan dengan field nama di lokasi tidak standar—harus error atau mapping alternatif eksplisit.
2. Snapshot diff output sebelum/after upgrade vendor.

---

## KPI pemantauan

- Completeness score per vendor per hari.

---

## Catatan tambahan operasional

Simpan **dictionary mapping versi** untuk setiap rumah sakit mitra dalam repositori infra.

---

## Referensi internal

- [`README.md`](./README.md) · **#90**.
