# Roadmap & Milestone Plan

Panduan ini menjelaskan **apa itu roadmap produk/teknis**, **perbedaannya dengan backlog harian**, **format milestone**, komunikasi dengan stakeholder, serta **kesalahan** yang membuat roadmap menjadi janji kosong.

---

## 1. Definisi singkat

**Roadmap** adalah representasi **waktu dan tema** untuk mencapai visi produk: biasanya horizon **kuartal hingga multi-tahun**, dengan kelompok fitur atau outcome per fase. **Milestone** adalah **titik kontrol** pada timeline—rilis besar, go-live pilot, gate regulasi—dengan deliverable terukur.

Roadmap **bukan** daftar sprint; itu adalah **lapisan perencanaan** di atas epik.

---

## 2. Mengapa roadmap sering dipakai

PM, leadership, dan customer success membuka roadmap untuk **menjawab “kapan”** tanpa membaca ratusan tiket. Engineering memakai roadmap untuk **kapasitas dan dependensi antar tim** dalam perencanaan kuartalan.

---

## 3. Jenis roadmap

- **Outcome-based:** menekankan hasil bisnis (“kurangi waktu rujukan”) lebih dari nama fitur.
- **Theme-based:** kelompok kerja seperti “Interoperabilitas”, “Adopsi klinisi”.
- **Technology roadmap:** upgrade platform, migrasi database—kadang terpisah dari produk.

Healthcare enterprise sering memerlukan **roadmap compliance** paralel (audit, sertifikasi).

---

## 4. Milestone vs release

- **Milestone** bisa berupa **event bisnis** (go-live pilot) tanpa selaras persis dengan tag semver produk.
- **Release** adalah artefak deployable; satu milestone bisa membutuhkan beberapa cut rilis ke staging.

---

## 5. Isi dokumen milestone plan

1. **Ringkasan visi** dan metrik tahunan.
2. **Horizon waktu** (H1/H2 atau Q1–Q4).
3. **Daftar milestone** dengan tanggal target, owner, dependensi.
4. **Risiko & mitigasi** lintas milestone (vendor, regulasi).
5. **Status review** bulanan—roadmap hidup, bukan patung.

---

## 6. Estimasi dan ketidakpastian

Gunakan rentang atau label **confidence** ketika tanggal masih lemah. Menyembunyikan ketidakpastian menghasilkan janji yang tidak dapat dipenuhi.

---

## 7. Komunikasi eksternal

Roadmap pelanggan sering **kurang detail** dari internal; hindari mengunci fitur yang belum divalidasi discovery.

---

## 8. Hubungan ke BRD/PRD

BRD mendukung **alur investasi** pada tema roadmap; PRD memecah tema menjadi **deliverable** pada kuartal tertentu.

---

## 9. Kesalahan umum

- Roadmap = daftar fitur tanpa **kapasitas tim**.
- Tidak ada **trade-off** yang terdokumentasi ketika prioritas bergeser.
- Milestone **terlalu rapat** tanpa buffer integrasi antar-site (khusus enterprise).

---

## 10. Tooling

Slide, Notion, Productboard, Jira Advanced Roadmaps—semua bisa bekerja asalkan **sumber kebenaran** tunggal dan versi terbaru jelas.

---

## 11. Ringkasan

Roadmap menjawab **arah dan urutan besar**; milestone menjawab **titik akuntabilitas**. Developer merujuk roadmap saat mempertanyakan **mengapa** sebuah epik masuk sprint ini dan bukan lain—maka dokumen ini tetap penting meskipun tidak sehari-hari seperti issue tracker.

---

## 12. Capacity planning vs roadmap

Roadmap harus selaras dengan **kapasitas engineering** yang tersedia setelah menghitung overhead support, utang teknis, dan kejadian darurat. Menempatkan tema besar tanpa headcount atau tanpa vendor cadangan menghasilkan dokumen strategis yang tidak pernah terlaksana—lebih baik menurunkan ambisi kuartal daripada kehilangan kepercayaan stakeholder.

---

## 13. Now / Next / Later

Salah satu format ringkas yang populer adalah **Now–Next–Later**: mengurangi ilusi tanggal palsu untuk item Later sambil tetap memberi arah. Dokumentasikan definisi ketiga horizon tersebut agar organisasi tidak menafsirkan “Later” sebagai “minggu depan”.

---

## 14. Integrasi dengan risiko regulasi

Pada healthcare, milestone dapat bergantung pada **persetujuan governance** (privacy impact assessment, clinical safety sign-off). Cantumkan milestone non-teknis ini secara eksplisit agar tidak tertabrak oleh optimisme roadmap produk semata.
