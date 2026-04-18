# #39 — Poison message tanpa DLQ yang jelas

**Indeks:** [`README.md`](./README.md) · **ID:** `#39` · **Kategori:** Async, reliability & antrian

---

## Ringkasan

**Poison message** adalah pesan yang tidak dapat diproses berhasil—misalnya skema tidak kompatibel atau bug parser—sehingga konsumen gagal terus-menerus. Tanpa **dead-letter queue (DLQ)** dan alarm, worker dapat terjebak dalam loop retry, menghambat seluruh antrian integrasi klinis. Di healthcare, pesan bisa berisi hasil lab yang tidak pernah masuk sistem meskipun vendor mengira terkirim.

---

## Mitigasi ideal (~60 detik)

“Setelah N percobaan dengan backoff, pindahkan pesan ke **DLQ** dengan metadata error; jangan biarkan poison menghambat antrian utama. Buat dashboard DLQ untuk tim integrasi. Tambahkan **schema validation** di ingress untuk menolak buruk lebih awal. Untuk PHI, DLQ harus memiliki kontrol akses dan retensi seperti antrian utama.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Poison:** pesan yang selalu gagal decode/validasi bisnis fatal.
- **DLQ:** saluran sekunder untuk inspeksi manual/reprocess.

---

## Mengapa pola ini sangat umum di healthcare

1. Vendor mengubah format HL7 tanpa pemberitahuan memadai.
2. Versi aplikasi konsumen tertinggal di subset worker.
3. Retry tanpa batas default pada library queue.

---

## Pola gagal (ilustrasi)

Worker crash loop pada satu pesan buruk—seluruh throughput turun ke nol.

---

## Gejala di production

- Lag antrian meningkat tanpa lonjakan input.
- Satu tenant/vendor tidak pernah diproses.

---

## Diagnosis

1. Lihat oldest unacked message age.
2. Sample error log konsumen untuk pola berulang.

---

## Mitigasi yang disarankan

1. DLQ + alerting threshold.
2. Schema validation dengan versi eksplisit pada envelope pesan.
3. Poison pill tests pada CI.

---

## Trade-off dan risiko

- DLQ bisa menumpuk—jadwalkan audit rutin dan tool reprocess aman.

---

## Aspek khusus healthcare

- Hasil lab poison tidak boleh hilang dari pengawasan—DLQ adalah antrian kerja integrasi, bukan tempat sampah.

---

## Checklist review PR

- [ ] Konsumen queue punya batas retry dan jalur DLQ.

---

## Kata kunci untuk pencarian

`dead letter queue`, `poison message`, `SQS DLQ`, `Kafka poison`

---

## Catatan tambahan operasional

Definisikan **runbook reprocess** DLQ yang mencakup validasi hukum sebelum mengirim ulang ke antrian hidup.

Catat **versi parser** pada metadata DLQ agar upgrade cepat dapat mengurangi backlog poison historis.

Buat alarm ketika DLQ menyentuh ambang backlog jam tertentu—inisiasi eskalasi integrasi vendor.

---

## Referensi internal

- [`README.md`](./README.md) · **#38**, **#40**.
