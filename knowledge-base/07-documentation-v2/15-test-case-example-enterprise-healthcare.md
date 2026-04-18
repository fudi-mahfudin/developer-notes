# Contoh Test Scenario & Test Case — Modul Rujukan (Fiksi)

> **Disclaimer:** Data dan ID fiksi.

**Produk:** Clinical Hub — Rujukan  
**Versi:** 1.5.0  
**Tanggal:** 18 April 2026

---

## Test Scenario S-REF-01

**Judul:** Pengiriman rujukan lengkap dari site asal ke site tujuan  
**Requirement:** SYS-FR-002, AC PRD submit  
**Prioritas:** P1

### Deskripsi

Mengirim klinisi membuat rujukan, melengkapi ringkasan wajib, mengirim, dan penerima menerima notifikasi sesuai konfigurasi.

---

### Test Case TC-REF-011 (positif)

| Field | Nilai |
|-------|--------|
| ID | TC-REF-011 |
| Preconditions | User `dr.sender@siteA` aktif; pasien `P-SYN-0007` ada di staging-data |
| Steps | 1. Login sebagai pengirim site A |
| | 2. Buka pasien P-SYN-0007 |
| | 3. Buat rujukan ke site B |
| | 4. Isi diagnosis utama `J45`, alergi `Penisilin`, obat aktif minimal satu |
| | 5. Klik Kirim |
| Expected | Status `Submitted`; banner sukses; event audit tercatat |
| Automate? | Ya (API-level subset) |

---

### Test Case TC-REF-012 (negatif — field wajib)

| Field | Nilai |
|-------|--------|
| ID | TC-REF-012 |
| Preconditions | Sama kecuali diagnosis dikosongkan |
| Steps | Ulangi hingga langkah 4 tanpa diagnosis; klik Kirim |
| Expected | Error field diagnosis; status tetap `Draft` |

---

### Test Case TC-REF-013 (idempotency)

| Field | Nilai |
|-------|--------|
| ID | TC-REF-013 |
| Preconditions | Rujukan pada status `Draft` siap submit |
| Steps | 1. Kirim dengan `Idempotency-Key: k-test-001` |
| | 2. Ulangi POST submit sama dalam 60 detik |
| Expected | Respons konsisten; tidak ada duplikasi rujukan |

---

## Test Scenario S-REF-02

**Judul:** Penolakan rujukan dengan alasan terstruktur  
**Requirement:** SYS-FR-005

### Test Case TC-REF-021

| Field | Nilai |
|-------|--------|
| Preconditions | Rujukan `Submitted`; user penerima site B |
| Steps | 1. Buka rujukan 2. Klik Tolak tanpa pilih alasan 3. Simpan |
| Expected | Validasi mencegah simpan; pesan menjelaskan kewajiban alasan |

---

## Matriks pelacakan cepat

| TC ID | Terakhir dijalankan | Status | Catatan |
|-------|---------------------|--------|---------|
| TC-REF-011 | 2026-04-17 | Pass | |
| TC-REF-012 | 2026-04-17 | Pass | |
| TC-REF-013 | 2026-04-17 | Fail | Bug CLIN-204 — fix rc3 |

---

## Lampiran — data sintetis

Pasien P-SYN-0007 dibuat oleh skrip seeding QA; tidak merepresentasikan individu nyata.

---

## Test Scenario S-REF-03 — Audit akses ringkasan

**Requirement:** SYS-NFR-002

### TC-REF-050

| Field | Nilai |
|-------|--------|
| Preconditions | Audit sink menyimpan event; user auditor berwenang |
| Steps | 1. Akses ringkasan pasien melalui rujungan 2. Buka laporan audit untuk pasien yang sama |
| Expected | Entri akses terdaftar dengan user, waktu, dan tujuan konteks |

---

## Catatan pelaksanaan

Semua TC di atas dijalankan pada build `1.5.0-rc2` kecuali TC-REF-013 yang menunggu `rc3`.

**Akhir contoh test case.**
