# Contoh Dokumentasi & Konfigurasi Proyek Jira — NHA Clinical Hub (Fiksi)

> **Disclaimer:** Konvensi fiksi; sesuaikan dengan kebijakan organisasi dan lisensi Jira Anda.

**Proyek Jira:** `CLIN` — Clinical Hub  
**Lead:** Product Operations  
**Versi panduan:** 1.0  
**Tanggal:** 18 April 2026

---

## 1. Tujuan proyek (ringkas)

Menyampaikan **modul rujukan terpadu** dan integrasi master pasien untuk jaringan NHA dengan pelacakan kerja yang dapat diaudit.

---

## 2. Jenis isu dan kapan dipakai

| Jenis | Kapan |
|-------|--------|
| Epic | Inisiatif multi-sprint (contoh: “Referral Hub Phase 1”). |
| Story | Nilai pengguna pada satu sprint. |
| Task | Pekerjaan teknis tanpa narasi pengguna langsung (refactor mendukung story). |
| Bug | Perilaku tidak sesuai AC atau regresi. |
| Spike | Investigasi time-boxed (proof API vendor). |
| Sub-task | Pecahan story/task per orang (opsional). |

---

## 3. Workflow (status)

**Story/Task:** `Backlog → Selected for Sprint → In Progress → In Review → QA → Done`  
**Bug:** `Open → Triaged → In Progress → Ready for QA → Verified → Closed`

Guard: transisi ke **Done** memerlukan **field QA sign-off** untuk story dengan komponen `clinical-risk`.

---

## 4. Field wajib

| Field | Wajib untuk |
|-------|-------------|
| Component | Semua tiket (`referral-ui`, `referral-svc`, `platform`) |
| Fix Version | Story/Bug yang masuk rilis |
| Risk | Story yang menyentuh PHI atau klinis |
| Environment | Bug prod/stage/dev |

---

## 5. Label

- `phi` — tiket menyentuh data sensitif; review keamanan tambahan.
- `pilot-site` — hanya relevan untuk site pilot.
- `vendor-ehr` — ketergantungan eksternal.

---

## 6. Contoh Epic

**Kunci:** `CLIN-100`  
**Ringkasan:** Referral Hub — Phase 1 Delivery  
**Deskripsi:** … merujuk BRD/PRD internal …  
**Link Confluence:** halaman visi produk (fiksi).

---

## 7. Contoh Story

**Kunci:** `CLIN-121`  
**Ringkasan:** Sebagai staf rujukan saya ingin melihat antrian tertunda SLA  
**Acceptance Criteria:**  
- Filter status `Submitted` dan `InReview`  
- Kolom SLA menampilkan countdown …

**Story Points:** 5

---

## 8. Contoh Bug

**Kunci:** `CLIN-204`  
**Ringkasan:** Submit rujukan menghasilkan 409 meskipun idempotency key baru  
**Langkah reproduksi:**  
1. Login sebagai user U di site A  
2. …  
**Expected:** 201/200 sesuai AC  
**Actual:** 409 `REF_CONFLICT`  
**Environment:** staging, build `1.4.0-rc2`

---

## 9. Board

**Sprint board** untuk tim pengiriman; **Kanban support** terpisah untuk defect produksi dengan prioritas berdasarkan dampak klinis.

---

## 10. Integrasi

- Smart commit: `CLIN-121 #comment … #time 1h 30m`  
- Branch naming: `feature/CLIN-121-referral-queue`

---

## 11. SLA triage (contoh)

| Severity | Respons awal |
|----------|----------------|
| S1 — blokir perawatan | 30 menit on-call |
| S2 — degradasi besar | 4 jam kerja |
| S3 — minor | 2 hari kerja |

---

## 12. Pelaporan

Dashboard resmi: **lead time story**, **escape rate defect**, **burn-down** sprint saat ini.

---

## 13. Retensi dan audit

Tiket dengan label `phi` tidak boleh menyertakan **identitas pasien** di komentar—gunakan ID internal redaksi.

**Akhir contoh dokumentasi Jira.**
