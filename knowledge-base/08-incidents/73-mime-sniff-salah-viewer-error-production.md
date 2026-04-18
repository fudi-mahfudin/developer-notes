# #73 — MIME sniff salah → viewer error hanya di production

**Indeks:** [`README.md`](./README.md) · **ID:** `#73` · **Kategori:** Frontend & edge (browser / proxy)

---

## Ringkasan

Header **`Content-Type`** yang salah (`application/octet-stream` untuk PDF) atau **sniffing** konten oleh browser dapat menyebabkan viewer dokumen klinis gagal dibuka—sering **hanya di production** karena CDN/proxy mengubah header atau kompresi berbeda dari lingkungan dev. Pola ini menyita waktu debugging karena kode aplikasi identik.

---

## Mitigasi ideal (~60 detik)

“Set **`Content-Type` akurat** pada penyimpanan objek (`application/pdf`), gunakan **`Content-Disposition`** dengan filename aman. Hindari menyegel tipe secara dinamis tidak konsisten. Untuk viewer inline, pertimbangkan **`X-Content-Type-Options: nosniff`**. Verifikasi header pada rantai produksi lengkap dengan `curl -I`.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **MIME sniffing:** browser menebak tipe dari magic bytes vs header.

---

## Mengapa pola ini sangat umum di healthcare

1. Bucket migration mengatur metadata konten tidak lengkap.
2. Gateway mengompres respons dan menghapus header asli jika salah konfigurasi.
3. Signed URL generator salah parameter response headers.

---

## Pola gagal (ilustrasi)

Upload menetapkan `binary/octet-stream` — viewer PDF internal mengandalkan MIME.

---

## Gejala di production

- Dokumen sama dibuka dev tetapi gagal prod.

---

## Diagnosis

1. Bandingkan header respons dev vs prod untuk URL yang sama.
2. Periksa metadata objek pada storage.

---

## Mitigasi yang disarankan

1. IaC untuk metadata objek konsisten.
2. Automated check pada pipeline deploy bucket.
3. Fallback viewer blob dengan deteksi client-side eksplisit.

---

## Trade-off dan risiko

- nosniff dapat memutus kompatibilitas lama—uji viewer.

---

## Aspek khusus healthcare

- Praktisi tidak boleh terhambat membuka hasil kritikal—header harus benar.

---

## Checklist review PR

- [ ] Pipeline upload mengatur Content-Type sesuai jenis dokumen medis.

---

## Kata kunci untuk pencarian

`Content-Type`, `nosniff`, `S3 metadata`, `CDN headers`

---

## Skenario regresi yang disarankan

1. `curl -I` pada URL dokumen prod vs staging.
2. Uji viewer pada Safari/Firefox/Chrome—perbedaan sniff.
3. Uji dengan gzip enabled pada proxy.

---

## KPI pemantauan

- Rasio error viewer vs volume dokumen dibuka.

---

## Catatan tambahan operasional

Simpan **checksum content** untuk memastikan file tidak rusak oleh transcoding proxy.

---

## Referensi internal

- [`README.md`](./README.md) · **#70**.
