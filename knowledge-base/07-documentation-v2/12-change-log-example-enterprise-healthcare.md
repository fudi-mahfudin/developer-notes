# Contoh Change Log — Paket `@nha/clinical-api-client` (Fiksi)

> **Disclaimer:** Versi dan entri fiksi.

Semua perubahan penting pada SDK klien API Clinical Hub didokumentasikan di file ini.

Format mengikuti Keep a Changelog dan Semantic Versioning.

---

## [Unreleased]

### Planned

- Dukungan retry backoff untuk error 429.

---

## [2.3.1] — 2026-04-18

### Fixed

- Memperbaiki serialisasi header `Idempotency-Key` pada lingkungan browser lama (Safari 14).

### Security

- Memperbarui dependensi `crypto-utils` ke 3.2.1 untuk advisori npm moderate.

---

## [2.3.0] — 2026-03-02

### Added

- Metode `referrals.submit(id, { idempotencyKey })` pada klien tingkat tinggi.
- Tipe TypeScript `ClinicalSummaryDraft` selaras dengan OpenAPI `v1`.

### Changed

- Timeout default HTTP naik dari 10s menjadi 15s untuk menyesuaikan latency antar-site.

### Deprecated

- Properti `legacyPatientId` pada `CreateReferralRequest` — akan dihapus di 3.0.0; gunakan `patientCanonicalId`.

---

## [2.2.4] — 2026-01-11

### Fixed

- Menangani respons 422 dari layanan `patient-index` dengan error bertipe `PatientNotResolved`.

---

## [2.2.0] — 2025-11-05

### Added

- Dukungan environment variable `NHA_API_BASE_URL` untuk pipeline CI.

### Security

- Menghapus logging debug yang secara tidak sengaja mencetak token pada mode verbose.

---

## [2.1.0] — 2025-09-19

### Changed

- Minimum Node.js didukung naik menjadi 18 LTS.

---

## [2.0.0] — 2025-06-01

### Breaking

- Mengganti namespace error dari `NhaError` menjadi `ClinicalHubError` dengan struktur `code` stabil.
- Menghapus endpoint helper untuk API `v0` yang telah sunset.

### Migration

Lihat `MIGRATION-2.0.md` di repo dokumentasi developer (fiksi).

---

## Catatan pelaksanaan rilis

Setiap tag Git `v2.x.x` pada repo SDK menyertakan artefak npm dan SBOM ringkas untuk audit supply chain internal.

---

## Kontributor changelog

Entri dikurasi oleh tim Platform SDK; merge otomatis dari conventional commits dengan review PR.

---

## Kebijakan pemeliharaan cabang rilis

Cabang `release/2.x` menerima cherry-pick **hanya** untuk perbaikan bug dan security sesuai kebijakan LTS internal.

**Akhir contoh change log.**
