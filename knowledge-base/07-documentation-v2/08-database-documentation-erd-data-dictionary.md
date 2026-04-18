# Dokumentasi Basis Data (ERD & Data Dictionary)

Penjelasan ini membahas **mengapa dokumentasi basis data termasuk dokumen yang sering dibuka developer**, komponen utama (**ERD**, **data dictionary**, **konvensi penamaan**), serta praktik menjaga konsistensi antara skema nyata dan dokumentasi.

---

## 1. Definisi singkat

**Dokumentasi basis data** adalah kumpulan artefak yang menjelaskan **struktur logis dan fisik data**: entitas, relasi, kardinalitas, constraint, indeks penting, makna kolom, kualitas data yang diharapkan, kepemilikan (owner domain), klasifikasi sensitivitas, dan kebijakan retensi referensi.

Tanpa dokumentasi ini, engineer baru dan analis akan menebak makna kolom dari nama yang ambigu (`status`, `type`, `flag1`).

---

## 2. ERD (Entity Relationship Diagram)

**ERD** menggambarkan **entitas** dan **relasi** antar entitas pada level konseptual/logis.

- Berguna untuk **diskusi domain** dan review integritas referensial.
- Tidak selalu sama dengan diagram fisik jika ada denormalisasi atau partitioning.

Tool umum: dbdiagram.io, ERStudio, PlantUML, atau generate dari IDE.

---

## 3. Data dictionary

**Data dictionary** adalah tabel atau dokumen yang mendefinisikan setiap **kolom**:

| Metadata | Contoh |
|----------|--------|
| Nama kolom | `patient_canonical_id` |
| Tipe | UUID |
| Nullable | NO |
| Referensi | `patients.canonical_id` |
| Deskripsi bisnis | Identifier pasien kanonis lintas site |
| Sensitivitas | PHI |
| Update oleh | layanan patient-index |
| Catatan | Tidak boleh diubah manual oleh operator |

Untuk organisasi healthcare, klasifikasi **PHI** dan **alasan hukum pemrosesan** sering dicatat di kamus data tingkat enterprise.

---

## 4. Mengapa developer sering membuka dokumen ini

- Menulis **query dan migrasi** dengan konteks constraint yang benar.
- Men-debug **inkonsistensi** antar layanan yang mereferensi kolom berbeda.
- Mendesain **laporan** dan materialized view tanpa salah join.

---

## 5. Sinkron dengan migrasi

Skema hidup berubah lewat migrasi (`Flyway`, `Liquibase`). Dokumentasi harus:

- direferensikan dari **nomor migrasi** atau tag rilis,
- atau **otomatis generate** outline dari DB (dengan review manusia untuk makna bisnis).

---

## 6. Lingkungan dan variance

Prod/stage/dev bisa berbeda minor—dokumentasi harus menyatakan **lingkungan referensi** atau menggunakan **schema drift detection** sebagai gate.

---

## 7. Privasi dan minimisasi

Data dictionary membantu **privacy engineering**: kolom mana yang harus di-mask di analytics, kolom mana yang tidak boleh diekspor ke sandbox.

---

## 8. Anti-pattern

- ERD indah di wiki yang **tidak pernah diperbarui** setelah migrasi besar.
- Kolom tanpa **owner domain**—menyebabkan perubahan sembarangan.
- Istilah ganda untuk konsep sama (`mrn` vs `medical_record_number`) tanpa alias resmi.

---

## 9. Integrasi dengan LLD/SRS

Untuk sistem terregulasi, requirement SRS sering menuntut **traceability** ke definisi data—data dictionary menjadi jembatan antara requirement dan implementasi fisik.

---

## 10. Ringkasan

ERD menjawab **hubungan konseptual**; data dictionary menjawab **arti dan aturan kolom**. Keduanya adalah dokumen referensi tinggi untuk backend engineer, data engineer, dan auditor data—maka masuk daftar dokumentasi yang paling sering dibuka saat menyentuh domain kompleks seperti healthcare.

---

## 11. Konvensi penamaan dan kamus bersama

Tim data sering mendefinisikan **standard naming** untuk prefix/suffix (`*_id`, `*_at`, `*_by`) dan **business glossary** yang menghubungkan istilah klinis dengan nama kolom. Dokumentasi basis data harus merujuk glossary tersebut agar perubahan istilah bisnis tidak memicu kolom baru yang redundan tanpa keputusan domain.

---

## 12. Diagram aliran data (pelengkap ERD)

Untuk compliance, kadang diperlukan **data flow** yang menunjukkan dari tabel mana PHI mengalir ke warehouse atau layanan analitik. Ini melengkapi ERD yang statis dengan konteks **pemakaian** data—berguna saat audit menanyakan “siapa konsumen kolom ini?”.

