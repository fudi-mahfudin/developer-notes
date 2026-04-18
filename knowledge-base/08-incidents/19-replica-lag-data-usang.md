# #19 — Replica lag → user membaca data usang setelah write

**Indeks:** [`README.md`](./README.md) · **ID:** `#19` · **Kategori:** Database & transaksi

---

## Ringkasan

**Read replica** menerapkan WAL/ZIP log tertunda dari primary. Saat beban tulis tinggi atau jaringan lambat, **lag** membuat pembacaan dari replica menampilkan status **sebelum** penulisan terbaru. Di aplikasi healthcare, pengguna menyimpan catatan lalu membuka daftar dari endpoint yang membaca replica—data “hilang” selama beberapa detik, menimbulkan kebingungan klinis.

---

## Mitigasi ideal (~60 detik)

“Replica lag bikin **read-your-writes** tidak terjadi. Mitigasinya: setelah mutasi, arahkan baca konsisten ke **primary** untuk sesi tersebut (sticky session / token); atau gunakan **sync replica** untuk subset kritis; atau terima eventual consistency tapi beri **indikator refresh** di UI. Pantau **replication lag** dalam detik sebagai metrik alarm. Di healthcare, hindari replica untuk layar yang langsung mengikuti input klinisi.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Replication lag:** keterlambatan apply pada replica vs primary wall clock.
- **Read-after-write consistency:** jaminan aplikasi untuk melihat tulisan sendiri.

---

## Mengapa pola ini sangat umum di healthcare

1. Skema umum: primary write, replica untuk API read-heavy.
2. Portal pasien melakukan submit form lalu redirect ke list.
3. Integrasi webhook menulis di primary; polling dari replica.

---

## Pola gagal (ilustrasi)

POST encounter ke primary sukses; GET list dari replica belum menyertakan encounter baru.

---

## Gejala di production

- Keluhan “data tidak tersimpan” padahal insert sukses (status 201).
- Insiden intermiten mengikuti lonjakan tulis.

---

## Diagnosis

1. Metrik lag replika—bandingkan dengan timeline keluhan.
2. Lacak apakah GET setelah POST memakai host replica.

---

## Mitigasi yang disarankan

1. Routing baca tulis konsisten pasca-mutasi.
2. Parameter klien `readConsistency=strong` pada route sensitif.
3. Tingkatkan kapasitas replica atau kurangi beban tulis burst.

---

## Trade-off dan risiko

- Semua baca ke primary mengurangi skala offload—keseimbangan desain.

---

## Aspek khusus healthcare

- Order time-sensitive (STAT lab) harus terlihat segera oleh perawat.

---

## Checklist review PR

- [ ] Route yang mengikuti mutasi kritis tidak default ke replica.

---

## Kata kunci untuk pencarian

`replication lag`, `read replica`, `read-after-write`, `sticky session`

---

## Catatan tambahan operasional

Catat SLA lag maksimum yang dapat diterima bisnis pada dokumen arsitektur data.

Untuk fitur yang membutuhkan konsistensi kuat setelah tulis, pertimbangkan **token konsistensi** pada respons POST yang memaksa klien memakai route baca yang menyalurkan ke primary hingga token kedaluwarsa.

Uji failover replica ke primary secara berkala untuk memastikan routing konsistensi tetap berlaku ketika topology berubah.

---

## Referensi internal

- [`README.md`](./README.md) · **#20**.
