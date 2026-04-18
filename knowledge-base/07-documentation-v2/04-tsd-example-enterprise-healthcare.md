# Contoh TSD — Layanan Rujukan NHA (Fiksi)

> **Disclaimer:** Ilustrasi teknis; parameter dan nama layanan fiksi. Kontrak produksi harus mengikuti standar keamanan organisasi.

**Fitur:** Referral Service — fase pilot  
**Versi:** 0.3  
**Tanggal:** 18 April 2026  
**Pemilik teknis:** Platform Engineering — Clinical Services  
**Referensi:** SRS Modul Rujukan v0.4, PRD Rujukan Terpadu v0.9

---

## 1. Ringkasan teknis

Layanan **referral-svc** menyediakan API untuk siklus hidup `Referral`, berintegrasi dengan **patient-index**, **notification-bus**, dan **policy-engine** untuk masking field. UI memanggil API melalui **BFF (backend-for-frontend)** `clinical-bff`.

---

## 2. Batas sistem

**Termasuk:** persistensi rujukan, validasi field wajib berdasarkan konfigurasi tenant, transisi status, audit emit.  
**Tidak termasuk:** rendering UI detail, penjadwalan operasi, billing.

---

## 3. Diagram konteks (deskripsi)

- **Actor:** pengguna klinis/admin melalui UI → `clinical-bff` → `referral-svc`.
- **Downstream:** `patient-index` (resolve ID), `notification-bus` (event), `policy-engine` (masking), `audit-sink` (async).

---

## 4. Komponen dan tanggung jawab

| Komponen | Tanggung jawab |
|----------|----------------|
| `clinical-bff` | Otentikasi sesi, agregasi response, tidak menyimpan PHI jangka panjang. |
| `referral-svc` | Domain rujukan, state machine, validasi, publikasi domain event. |
| `patient-index` | Sumber kebenaran identitas pasien kanonis. |
| `policy-engine` | Keputusan field-level visibility. |

---

## 5. Alur submit (sinkron + async)

1. UI memanggil `POST /referrals` (draft create) melalui BFF dengan token bearer.
2. `referral-svc` memvalidasi tenant dan mengikat `patientCanonicalId`.
3. `POST /referrals/{id}/submit` memicu validasi field wajib; jika lolos → status `Submitted`.
4. Event `referral.submitted` ke bus; konsumen notifikasi mengirim email/in-app sesuai template.
5. Kegagalan notifikasi: status rujukan tetap `Submitted`; event gagal masuk DLQ untuk retry; operator mengikuti runbook alert `NOTIF_DLQ_DEPTH`.

---

## 6. State machine

Status yang didukung: `Draft`, `Submitted`, `InReview`, `Accepted`, `Rejected`, `Cancelled`.  
Transisi yang tidak valid mengembalikan **409 Conflict** dengan kode error stabil `REF_INVALID_TRANSITION`.

---

## 7. Kontrak API (ikutkan referensi)

Sumber kebenaran struktur payload: lampiran OpenAPI `referral-v1.yaml` (repo `api-specs`). TSD ini tidak menduplikasi skema penuh.

**Idempotency:** header `Idempotency-Key` wajib pada `submit` untuk mencegah double submit di retry jaringan.

---

## 8. Model data layanan (ringkas)

Entitas `referral`: `id`, `tenantId`, `originSiteId`, `destSiteId`, `patientCanonicalId`, `status`, `summarySnapshot` (versi denormalized untuk audit display), `createdBy`, timestamps.  
Field klinis detail disimpan sebagai dokumen versi dengan hash untuk audit perubahan ringkasan.

---

## 9. Keamanan

- JWT dari SSO; klaim `sites` membatasi query scope.
- PHI tidak dicatat di log aplikasi pada level INFO; trace ID saja.
- Enkripsi at-rest mengikuti standar bucket DB organisasi.

---

## 10. Observabilitas

Metrik: `referral_submit_total`, `referral_submit_validation_failed`, `referral_transition_total{from,to}`.  
Log terstruktur dengan `referralId`, `tenantId`, tanpa field klinis bebas.

---

## 11. Deployment

Feature flag `referral_hub_enabled` per tenant di layanan konfigurasi. Migrasi DB versi `V014__referral_tables.sql`.

---

## 12. Risiko teknis

| Risiko | Mitigasi |
|--------|----------|
| Lonjakan latency `patient-index` | Timeout 300ms, circuit open → error terjemahan ramah pengguna + retry idempotent |
| Race condition update parallel | Optimistic locking pada versi ringkasan |

---

## 13. Kriteria selesai teknis

- OpenAPI merge gate hijau; kontrak tes konsumen untuk BFF.
- Load test skenario submit pada profil beban referensi dokumentasi QA.
- Runbook DLQ notifikasi terhubung ke dashboard on-call.

**Akhir contoh TSD.**
