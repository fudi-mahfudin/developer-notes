# Contoh Defect / Bug Report — Clinical Hub (Fiksi)

> **Disclaimer:** Tiket ilustratif.

---

## Metadata

| Field | Nilai |
|-------|--------|
| ID | CLIN-204 |
| Judul | Submit rujukan menghasilkan 409 meskipun idempotency key baru |
| Pelapor | QA — Rina |
| Tanggal laporan | 16 Apr 2026 |
| Lingkungan | staging |
| Build | `1.5.0-rc2` |
| Komponen | referral-svc |
| Severity | S2 — degradasi alur kritis tanpa bypass aman |
| Priority | P1 |

---

## Ringkasan

Pada percobaan submit pertama untuk rujungan baru, server kadang mengembalikan **409 REF_CONFLICT** seolah terjadi konflik versi, meskipun header `Idempotency-Key` unik dan belum pernah dipakai.

---

## Langkah reproduksi

1. Login sebagai `dr.sender@siteA` pada staging-pilot.
2. Buat rujungan baru untuk pasien sintetis `PP-009`, lengkapi field wajib.
3. Kirim permintaan submit dengan header `Idempotency-Key: uuid-baru-...` (generated oleh UI).
4. Perhatikan respons **409** sporadis (sekitar 1 dari 12 percobaan berulang).

---

## Hasil yang diharapkan

**200/201** dan status `Submitted` pada percobaan pertama yang valid.

---

## Hasil aktual

**409** dengan body `REF_CONFLICT` dan tidak ada duplikasi rujukan terlihat di DB.

---

## Data tambahan

- **Trace ID contoh:** `tr-9f3c21`
- **Request timestamp:** 2026-04-16T08:14:22Z
- **Referral internal ID (non-PHI):** `b2c7f0a1-...`

---

## Analisis awal (diisi dev)

Race antara dua request duplicate dari double-click UI yang mengirim **dua key berbeda** namun bersamaan pada baris yang sama — investigasi mengarah ke optimistic lock pada versi ringkasan.

---

## Perbaikan

PR `#4821` — serialisasi submit di layer layanan + penonaktifan ganda tombol di UI.

---

## Verifikasi

QA menjalankan ulang **TC-REF-013** pada `rc3` — Pass.

---

## Status akhir

**Closed / Verified** pada 17 Apr 2026.

---

## Lampiran — cuplikan log (redaksi)

```
level=error trace=tr-9f3c21 code=REF_CONFLICT referralId=b2c7f0a1-...
```

---

## Tautan terkait

- PR `#4821` — perbaikan utama  
- TC-REF-013 — kasus uji regresi

---

## Nota pascamortem (jika diperlukan)

Jika defect memicu insiden S1, tautkan ke `INC-2026-04-09` (fiksi) dan sertakan tindakan pencegahan: nonaktifkan double-submit di semua tombol kritis.

**Akhir contoh defect report.**

