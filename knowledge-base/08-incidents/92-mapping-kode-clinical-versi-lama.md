# #92 — Mapping kode ICD / SNOMED / LOINC versi lama → downstream salah

**Indeks:** [`README.md`](./README.md) · **ID:** `#92` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

**Terminologi klinis** berevolusi—versi baru ICD/SNOMED/LOINC dapat mengubah makna atau meng deprecate kode. Menggunakan **map statis** tanpa pembaruan menyebabkan pengkodean billing, pelaporan wabah, dan CDS salah—meskipun sistem tetap berjalan.

---

## Mitigasi ideal (~60 detik)

“Kelola **versioned terminology service**; jadwalkan upgrade dengan testing regresi; simpan kode asli + versi dalam catatan; gunakan map resmi NRDM/hasil vendor. Untuk integrasi legacy, dokumentasikan ‘frozen version’ eksplisit dan jangan mencampur tanpa translasi.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Terminology drift:** perbedaan makna antar versi.

---

## Mengapa pola ini sangat umum di healthcare

1. Lisensi terminologi mahal—tim menunda upgrade.
2. Data historis besar sulit dimigrasi.
3. Mapping manual Excel tidak terawasi.

---

## Pola gagal (ilustrasi)

Map ICD lokal ke ICD-10-CM versi 2019 padaham payer membutuhkan 2024.

---

## Gejala di production

- Klaim ditolak karena kode tidak valid pada tahun layanan tertentu.

---

## Diagnosis

1. Scan kode yang tidak dikenal oleh validator payer.
2. Audit versi terminologi di DB.

---

## Mitigasi yang disarankan

1. OTSS/FHIR terminology server.
2. Migration batch dengan dual-write periode.

---

## Trade-off dan risiko

- Upgrade besar memakan waktu—rencanakan cutover.

---

## Aspek khusus healthcare

- Pelaporan wabah mengandalkan kode LOINC/SNOMED tepat—salah kode berdampak kesehatan masyarakat.

---

## Checklist review PR

- [ ] Perubahan mapping terminologi menyertakan versi sumber dan tanggal efektif.

---

## Kata kunci untuk pencarian

`ICD version`, `SNOMED release`, `LOINC`, `terminology server`

---

## Skenario regresi yang disarankan

1. Jalankan validator kode pada seluruh catatan tahun lalu setelah upgrade.
2. Bandingkan hasil CDS sebelum/sesudah upgrade pada dataset tiruan.

---

## KPI pemantauan

- Jumlah kode tidak valid menurut validator eksternal per bulan.

---

## Catatan tambahan operasional

Libatkan **coding specialist** klinis dalam uji upgrade terminologi besar.

---

## Referensi internal

- [`README.md`](./README.md) · **#88**.
