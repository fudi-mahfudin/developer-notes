# Dokumentasi JIRA / Issue Tracker

Panduan ini menjelaskan **peran issue tracker** (sering Jira) dalam pengembangan perangkat lunak, **artefak yang patut didokumentasikan**, **konvensi tiket**, dan **kesalahan** yang membuat backlog menjadi kekacauan yang tidak dapat diprediksi.

---

## 1. Definisi singkat

**Issue tracker** adalah sistem pencatatan kerja berbasis tiket: **epik**, **story**, **task**, **bug**, **sub-task**, kadang **spike** atau **RFC**. Dokumentasi di sini merujuk pada **aturan penggunaan proyek**, bukan manual resmi Atlassian—namun prinsipnya berlaku untuk Linear, Azure DevOps, GitHub Issues, dll.

---

## 2. Mengapa ini “dokumen yang sering dipakai”

Developer, QA, PM, dan support **membuka board dan tiket setiap hari**. Tanpa dokumentasi konvensi:

- prioritas menjadi subjektif,
- duplikasi tiket merajalela,
- definisi “selesai” tidak konsisten antar tim.

---

## 3. Komponen dokumentasi yang disarankan

1. **Project charter ringkas** di wiki — tujuan produk, pemilik, channel komunikasi.
2. **Workflow diagram** — status apa saja, siapa transisi, guard (misalnya QA sign-off).
3. **Issue type dictionary** — kapan memakai Story vs Task vs Bug.
4. **Field wajib** — komponen, versi rilis, lingkungan reproduksi untuk bug.
5. **Labeling strategy** — area (`referral`), layer (`backend`), risiko (`phi`).
6. **SLA triage** — waktu respons untuk severity tertentu (terutama incident production).
7. **Integrasi** — menghubungkan ke Git (smart commits), CI, Slack.

---

## 4. Epik vs story

- **Epik** mengelompokkan pekerjaan besar yang membutuhkan banyak sprint.
- **Story** adalah unit nilai pengguna yang dapat direncanakan dalam satu sprint (idealnya).

Dokumentasikan **kriteria breakdown** epik → story agar PO tidak memecah secara sembarangan.

---

## 5. Definisi Ready dan Done

**Definition of Ready (DoR)** untuk story: deskripsi, acceptance criteria, desain jika perlu, dependensi jelas.

**Definition of Done (DoD)** untuk tim: tes tertulis, dokumen API diperbarui, monitoring dasar, dsb.

Keduanya harus **tertulis**—bukan hanya lisan di retro.

---

## 6. Bug versus improvement

Dokumentasi harus menjelaskan kapan sesuatu adalah **defect** (tidak memenuhi perilaku yang disepakati) versus **enhancement** (permintaan baru). Perbedaan ini mempengaruhi **prioritas** dan pelaporan kualitas rilis.

---

## 7. Healthcare dan audit

Untuk domain terregulasi, tiket terkadang menjadi **bukti proses**—siapa menyetujui perubahan requirement risiko. Field **risk class** atau **validation impact** dapat ditambahkan untuk produk medis.

---

## 8. Pelaporan dan dashboard

Dokumentasikan **metrik resmi** tim (throughput, lead time, defect escape rate) agar tidak ada definisi ganda antara dashboard eksekutif dan tim.

---

## 9. Kesalahan umum

- Terlalu banyak status custom → workflow kabur.
- Story berisi **dua fitur** sekaligus → tidak dapat diuji atomik.
- Bug tanpa **langkah reproduksi** dan lingkungan.
- Komponen tidak dipetakan → sulit menugaskan ownership.

---

## 10. Otomasi yang layak didokumentasikan

- Auto-assign berdasarkan komponen.
- Membuat sub-task QA dari template story.
- Menghubungkan branch Git ke tiket untuk traceability rilis.

---

## 11. Ringkasan

Jira/issue tracker adalah **sistem operasi pengiriman perangkat lunak**. Dokumentasi cara menggunakannya—bukan sekadar lisensi admin—menentukan apakah alat itu **mempercepat** atau **memperlambat** organisasi. Developer berinteraksi dengan dokumen ini secara implisit setiap kali mereka membuka tiket.

---

## 12. Template tiket yang disarankan

Sediakan **template** untuk story (deskripsi, acceptance criteria, risiko), bug (langkah reproduksi, expected/actual, build), dan spike (pertanyaan riset, timebox, keluaran). Template mengurangi bolak-balik komentar dan membuat metrik lead time lebih akurat karena field terisi konsisten sejak awal.

---

## 13. Hak akses dan tata kelola

Dokumentasikan **siapa** boleh mengubah workflow, **siapa** boleh menghapus epik, dan prosedur **pemulihan** tiket yang terhapus secara tidak sengaja. Tanpa kejelasan ini, audit internal menemukan jejak kerja yang putus—berbahaya untuk produk healthcare yang memerlukan akuntabilitas perubahan.
