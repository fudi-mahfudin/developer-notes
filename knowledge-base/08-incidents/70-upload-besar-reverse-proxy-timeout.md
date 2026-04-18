# #70 — Upload file besar timeout di reverse proxy tanpa chunk

**Indeks:** [`README.md`](./README.md) · **ID:** `#70` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

Unggah PDF hasil radiologi atau bundle gambar besar dapat melebihi **timeout baca** pada reverse proxy / load balancer (`proxy_read_timeout`, idle timeout ALB) ketika menggunakan single POST besar tanpa **chunked transfer** atau multipart streaming. Klien melihat gagal padahal server aplikasi masih menerima—atau sebaliknya.

---

## Mitigasi ideal (~60 detik)

“Naikkan timeout secara terukur untuk endpoint upload **terpisah**, gunakan **multipart upload** ke object storage langsung dengan presigned URL [#71](71-presigned-url-kedaluwarsa-upload-lambat.md), atau aktifkan **chunked encoding** dengan resume. Pantau ukuran dan durasi dengan metrics gateway. Untuk PHI, encrypt in transit sesuai kebijakan.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Direct-to-storage upload:** browser mengunggah ke S3/GCS lewat presigned URL mengurangi hop melalui Node.

---

## Mengapa pola ini sangat umum di healthcare

1. Pemeriksaan imaging menghasilkan file besar.
2. Proxy default 60 detik.
3. Bandwidth pasien lambat meningkatkan durasi total.

---

## Pola gagal (ilustrasi)

POST 300MB melalui satu hop Nginx ke Node—timeout di tengah.

---

## Gejala di production

- Upload gagal di wilayah jaringan tertentu saja.

---

## Diagnosis

1. Trace hop-by-hop untuk melihat siapa yang menutup koneksi.
2. Bandingkan dengan upload langsung ke storage.

---

## Mitigasi yang disarankan

1. Presigned multipart upload.
2. Tune timeouts per location pada proxy.
3. Compress jika sesuai standar medis.

---

## Trade-off dan risiko

- Timeout panjang meningkatkan risiko slowloris—gunakan auth dan rate limit.

---

## Aspek khusus healthcare

- Dokumen diagnostik tidak boleh gagal diam-diam—UX harus mendukung resume.

---

## Checklist review PR

- [ ] Endpoint upload besar tidak melalui jalur proxy singkat tanpa tuning.

---

## Kata kunci untuk pencarian

`reverse proxy timeout`, `multipart upload`, `presigned URL`, `chunked`

---

## Skenario regresi yang disarankan

1. Unggah file besar dari koneksi 1 Mbps dengan latency tinggi.
2. Matikan proxy timeout sementara di staging untuk reproduce.
3. Verifikasi checksum file di storage vs sumber.

---

## KPI pemantauan

- Persentase upload gagal berdasarkan ukuran file bucket.

---

## Catatan tambahan operasional

Pisahkan **route upload** pada subdomain dengan batas timeout berbeda dari API JSON umum.

---

## Referensi internal

- [`README.md`](./README.md) · **#71**, **#55**.
