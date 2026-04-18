# Defect / Bug Report

Panduan ini menjelaskan **fungsi laporan defect**, **field standar**, **severity/priority**, **alur hidup tiket**, integrasi **postmortem**, serta **kesalahan** yang membuat bug tidak dapat direproduksi atau diprioritaskan.

---

## 1. Definisi singkat

**Defect report** adalah catatan terstruktur bahwa perilaku aktual sistem **tidak sesuai** dengan requirement yang disepakati (termasuk regresi). Istilah **bug** sering dipakai bergantian dalam praktik sehari-hari.

Laporan yang baik memungkinkan developer **mereproduksi** dan **memperbaiki** dengan cepat.

---

## 2. Mengapa dokumen/template ini sering dipakai

Support, QA, dan developer membuka laporan bug **setiap hari**. Tanpa template, waktu hilang untuk bertanya ulang tentang lingkungan dan langkah reproduksi.

---

## 3. Field inti

| Field | Penjelasan |
|-------|------------|
| Judul ringkas | Gejala utama |
| Langkah reproduksi | Bernomor, deterministik |
| Expected vs Actual | Kontras eksplisit |
| Lingkungan | dev/stage/prod, versi build |
| Akun/peran | peran yang dipakai |
| Log/trace | ID korelasi |
| Severity | dampak bisnis/klinis |
| Priority | urutan perbaikan |
| Lampiran | screenshot log (tanpa PHI) |

---

## 4. Severity vs Priority

- **Severity**: seberapa buruk dampaknya jika terjadi (data corrupted > typo UI).
- **Priority**: kapan tim harus menanganinya—dapat berbeda (severity tinggi tetapi mitigasi mudah).

Healthcare sering menambahkan **patient safety** sebagai faktor severity.

---

## 5. Siklus hidup

Open → Triaged → In Progress → Ready for QA → Verified → Closed; variasi per organisasi.

---

## 6. Duplikat

Sediakan panduan mencari tiket duplikat sebelum membuat baru—backlog berisi duplikat menjadi sulit diprioritaskan.

---

## 7. Postmortem

Untuk incident besar, defect utama ditautkan ke dokumen **postmortem** dengan akar masalah dan tindakan pencegahan.

---

## 8. Privasi

Lampiran tidak boleh berisi **identitas pasien**—gunakan ID sintetis.

---

## 9. Kesalahan umum

- “Tidak jalan” tanpa langkah.
- Campur beberapa bug dalam satu tiket.
- Versi build salah — developer memperbaiki kode yang tidak pernah di-deploy.

---

## 10. Ringkasan

Template defect adalah **protokol komunikasi** antara pengamat gejala dan pembuat perbaikan. Dokumen ini adalah salah satu yang paling sering diisi dan dibaca developer selama hardening dan operasi produksi.

---

## 11. Template untuk incident produksi

Incident sering membutuhkan field tambahan: **start/end time**, **jumlah pengguna terdampak**, **workaround**, **komunikasi pelanggan**. Dokumentasikan perbedaan template defect sprint vs incident agar engineer tidak mengisi field yang salah.

---

## 12. Lampiran log aman

Berikan panduan meredaksi log sebelum upload—menghapus token, alamat IP internal jika sensitif, dan semua identifier pasien.

---

## 13. Penautan ke requirement

Menautkan defect ke **Req ID** membantu memperbarui RTM dan mengukur **quality debt** per area fitur.

---

## 14. Metrik defect

Gunakan laporan agregat defect untuk retro: **escape rate**, **mean time to resolve**, **reopen rate**—bukan untuk menyalahkan individu tetapi untuk memperbaiki proses.

