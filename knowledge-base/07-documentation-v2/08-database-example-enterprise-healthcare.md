# Contoh Dokumentasi Basis Data — Domain Rujukan NHA (Fiksi)

> **Disclaimer:** Skema ilustratif. Nama tabel dan constraint tidak untuk dipakai langsung di produksi tanpa review DBA dan compliance.

**Basis data layanan:** `clinical_hub` (PostgreSQL, ilustrasi)  
**Versi dokumen:** 0.3  
**Tanggal:** 18 April 2026  
**DBA pemilik:** Enterprise Data Platform

---

## 1. Ringkasan domain

Skema mendukung penyimpanan **rujukan**, **snapshot ringkasan klinis** yang divulkanisasi untuk audit tampilan, dan **outbox** untuk publikasi event.

---

## 2. ERD (deskripsi relasi)

- **referrals** (1) — (N) **referral_summary_versions**: satu rujungan punya banyak versi ringkasan setiap kali diedit sebelum submit final (opsional bisnis).
- **referrals** (1) — (N) **referral_status_events**: log transisi untuk audit cepat.
- **referrals** (1) — (N) **referral_outbox**: pola outbox untuk Kafka.

Diagram gambar dapat dihasilkan dari tool ER; di sini cukup narasi konsistensi FK.

---

## 3. Data dictionary — `referrals`

| Kolom | Tipe | Null | Deskripsi | Sensitivitas |
|-------|------|------|-----------|--------------|
| id | uuid | NO | Primary key rujukan | Internal |
| tenant_id | uuid | NO | Pemilik tenant | Internal |
| patient_canonical_id | uuid | NO | Referensi logis ke indeks pasien | PHI |
| origin_site_id | uuid | NO | Site pengirim | Internal |
| dest_site_id | uuid | NO | Site penerima | Internal |
| status | varchar(32) | NO | Mesin status terkini | Internal |
| summary_version | int | NO | Versi optimistic locking ringkasan | Internal |
| created_by | uuid | NO | User id SSO | PHI-indirect |
| created_at | timestamptz | NO | Waktu pembuatan | Internal |
| updated_at | timestamptz | NO | Waktu ubah terakhir | Internal |

**Constraint:** `CHECK (status IN (...))` selaras enum aplikasi.

---

## 4. Data dictionary — `referral_summary_versions`

| Kolom | Tipe | Null | Deskripsi |
|-------|------|------|-----------|
| referral_id | uuid | NO | FK ke `referrals.id` |
| version | int | NO | Nomor versi naik |
| payload | jsonb | NO | Snapshot ringkasan (struktur disepakati schema registry) |
| edited_by | uuid | NO | Pelaku edit |
| edited_at | timestamptz | NO | Timestamp |

**Index:** `(referral_id, version DESC)` untuk membaca versi terbaru.

---

## 5. Data dictionary — `referral_status_events`

Mencatat transisi untuk query audit cepat tanpa memparse log aplikasi.

| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | bigserial | PK |
| referral_id | uuid | FK |
| from_status | varchar(32) | Status sebelum |
| to_status | varchar(32) | Status sesudah |
| actor_id | uuid | Pelaku |
| occurred_at | timestamptz | Waktu |

---

## 6. Indeks penting

- `referrals (tenant_id, status, created_at)` untuk daftar kerja staf.
- `referrals (patient_canonical_id)` untuk investigasi dukungan—akses terbatas role.

---

## 7. Retensi dan arsip

Kebijakan organisasi dapat memindahkan event audit ke **cold storage** setelah N tahun; detail di dokumen records management—bukan bagian skema aplikasi semata.

---

## 8. Variasi lingkungan

| Lingkungan | Catatan |
|------------|---------|
| dev | boleh reset data sintetik |
| staging | subset data anonim |
| prod | tidak ada akses SQL langsung operator non-DBA |

---

## 9. Alur perubahan skema

Semua perubahan melalui migrasi berversi `V0xx__*.sql` dengan review DBA dan dampak pada pipeline CDC jika ada.

---

## 10. Glosarium singkat

| Istilah | Makna |
|---------|--------|
| Snapshot ringkasan | Representasi JSON yang ditampilkan ke UI setelah policy masking |
| Canonical patient id | ID stabil dari layanan indeks pasien |

---

## 11. Daftar tabel tambahan (cuplikan)

**`referral_outbox`**: menyimpan payload event hingga publish sukses—kolom `published_at` menandai selesainya pengiriman.

---

## 12. Checklist review dokumentasi data

- [ ] Setiap kolom PHI punya klasifikasi.
- [ ] FK dan ON DELETE behavior tercatat di migrasi + dictionary.
- [ ] Tidak ada istilah ganda untuk patient ID.

**Akhir contoh dokumentasi basis data.**
