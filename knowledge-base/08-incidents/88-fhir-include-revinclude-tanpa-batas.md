# #88 — FHIR `_include` / `_revinclude` tanpa batas → timeout

**Indeks:** [`README.md`](./README.md) · **ID:** `#88` · **Kategori:** Domain healthcare & integrasi

---

## Ringkasan

Parameter FHIR **`_include`** dan **`_revinclude`** dapat meledakkan ukuran **Bundle** respons ketika relasi one-to-many besar—misalnya semua `Observation` yang merujuk `Patient`—mengakibatkan **query database** dan **JSON** raksasa—memblokir event loop Node [#51](51-event-loop-json-parse-fhir-bundle-besar.md) dan timeout gateway.

---

## Mitigasi ideal (~60 detik)

“Batasi hasil dengan `_count`, pagination bundle, atau endpoint khusus agregasi. Untuk graf besar gunakan **[batch/async]** atau prefetch bertahap. Dokumentasikan SLA ukuran bundle yang didukung. Pada server sendiri enforce max include depth/size.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Graph explosion:** penyertaan rekursif atau revinclude menghasilkan ribuan resource.

---

## Mengapa pola ini sangat umum di healthcare

1. Konsumen ingin satu request untuk seluruh chart.
2. Query tidak teroptimasi menghasilkan join besar.
3. Sandbox kecil menyembunyikan masalah.

---

## Pola gagal (ilustrasi)

`/Patient/123?_revinclude=Observation:patient` tanpa filter tanggal pada pasien tahunan besar.

---

## Gejala di production

- Timeout 504 sporadis pada endpoint yang sama dengan parameter include.

---

## Diagnosis

1. Profil SQL dengan revinclude queries.
2. Ukur ukuran Bundle respons.

---

## Mitigasi yang disarankan

1. Endpoint summary terpisah.
2. Filter tanggal/status wajib.
3. Cursor pagination untuk bundle besar.

---

## Trade-off dan risiko

- Lebih banyak round-trip meningkatkan kompleksitas klien—gunakan batch terkontrol.

---

## Aspek khusus healthcare

- Mengirim seluruh riwayat tanpa filter dapat melanggar minimasi data untuk aplikasi tertentu.

---

## Checklist review PR

- [ ] Endpoint publik FHIR membatasi include/revinclude dengan tes beban.

---

## Kata kunci untuk pencarian

`_include`, `_revinclude`, `FHIR bundle size`, `pagination`

---

## Skenario regresi yang disarankan

1. Generate dataset besar sintetis—ukur waktu query include.
2. Matikan fitur include pada tenant yang tidak membayar SLA besar (optional).

---

## KPI pemantauan

- Persentil ukuran Bundle respons per endpoint.

---

## Catatan tambahan operasional

Cantumkan **kontrak antar-lembaga** tentang parameter include yang boleh dipakai mitra.

---

## Referensi internal

- [`README.md`](./README.md) · **#87**.
