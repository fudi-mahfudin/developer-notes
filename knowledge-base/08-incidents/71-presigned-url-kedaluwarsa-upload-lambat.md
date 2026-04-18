# #71 — Presigned URL kedaluwarsa saat upload lambat

**Indeks:** [`README.md`](./README.md) · **ID:** `#71` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

URL **presigned** untuk unggah langsung ke object storage memiliki **TTL pendek** demi keamanan. Pada koneksi lambat atau jeda pengguna, unggah dapat mencapai storage setelah URL kedaluwarsa—menghasilkan error **403** yang membingungkan. Tanpa **refresh URL** atau retry cerdas, pengguna mengulang dari awal dengan frustrasi—meningkatkan risiko abandon dokumen penting.

---

## Mitigasi ideal (~60 detik)

“Gunakan **TTL yang memadai** ditambah margin berdasarkan persentil durasi upload observasi; sediakan endpoint untuk **minta URL baru** dengan idempotensi unggahan yang sama. Implementasi klien detect 403 signature expired dan minta refresh otomatis. Untuk PHI, audit siapa meminta URL baru.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Signed URL refresh:** mengeluarkan URL baru untuk session upload yang sama.

---

## Mengapa pola ini sangat umum di healthcare

1. Unggah dari lokasi rural dengan LTE buruk.
2. TTL singkat mengikuti template keamanan AWS default.
3. Pengguna meninggalkan tab lalu kembali.

---

## Pola gagal (ilustrasi)

TTL 60 detik untuk file 200MB pada 2 Mbps teoritis memakan waktu lebih lama dari menit.

---

## Gejala di production

- Keluhan sporadis “upload gagal” tanpa pola server-side.

---

## Diagnosis

1. Korelasikan 403 SignatureDoesNotMatch / Expired dengan durasi klien.
2. Analisis distribusi waktu upload.

---

## Mitigasi yang disarankan

1. Gunakan multipart upload dengan URL per bagian lebih pendek tetapi refreshable.
2. Heartbeat progress client untuk memperpanjang sesi server-side jika didukung.

---

## Trade-off dan risiko

- TTL panjang meningkatkan risiko URL dibagikan—seimbangkan dengan token sekali pakai.

---

## Aspek khusus healthcare

- Keterlambatan dokumen rujukan dapat menunda perawatan—UX harus jelas dan membantu resume.

---

## Checklist review PR

- [ ] Alur upload presigned punya jalur refresh URL dan tes lambat.

---

## Kata kunci untuk pencarian

`presigned URL`, `S3 expired`, `multipart upload`, `TTL`

---

## Skenario regresi yang disarankan

1. Throttle upload ke 256 Kbps pada file besar.
2. Jeda upload di tengah selama > TTL lalu lanjutkan—harus refresh otomatis.
3. Uji dengan jam sistem klien tidak akurat (skew).

---

## KPI pemantauan

- Rasio 403 expired signature vs upload sukses.

---

## Catatan tambahan operasional

Log **upload session id** terpisah dari PHI untuk melacak retry tanpa menyimpan konten file di log aplikasi.

---

## Referensi internal

- [`README.md`](./README.md) · **#70**, **#72**.
