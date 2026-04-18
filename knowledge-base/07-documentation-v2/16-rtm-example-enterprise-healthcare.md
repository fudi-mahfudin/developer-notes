# Contoh RTM — Modul Rujukan Clinical Hub (Fiksi)

> **Disclaimer:** Matriks ilustratif; ID dan status fiksi.

**Produk:** NHA Clinical Hub — Rujukan  
**Versi baseline:** SRS 0.4 / Build 1.5.0-rc2  
**Tanggal:** 18 April 2026  
**Pemilik:** Quality & Regulatory Affairs (fiksi)

---

## 1. Tujuan

Menyediakan pelacakan dari requirement sistem ke bukti verifikasi untuk rilis wave enam site.

---

## 2. Legenda status

| Kode | Makna |
|------|--------|
| V | Verified Pass pada lingkungan referensi |
| P | Partial — substantif lolos, catatan minor |
| N | Not run |

---

## 3. Matriks (cuplikan)

| Req ID | Deskripsi ringkas | Sumber | Desain | Metode | Test ID | Status | Catatan |
|--------|-------------------|--------|--------|--------|---------|--------|---------|
| SYS-FR-001 | Buat rujukan Draft | SRS §3 | TSD §5 | Test | TC-REF-010 | V | staging rc2 |
| SYS-FR-002 | Cegah submit tanpa field wajib | SRS §3 | LLD validasi | Test | TC-REF-012 | V | |
| SYS-FR-003 | Catat transisi status | SRS §3 | LLD log | Test + Demo | TC-REF-030 | V | Inspeksi log |
| SYS-FR-004 | Daftar rujukan terfilter otorisasi | SRS §3 | HLD | Test | TC-REF-040 | P | Bug minor filter |
| SYS-NFR-002 | Audit akses ringkasan | SRS §4 | TSD audit | Analysis + Test | TC-REF-050 | V | |

---

## 4. Requirement tanpa tes (harus kosong)

Tidak ada SYS-FR Must yang tanpa baris test pada baseline ini—jika ada, baris berikut harus terisi sebelum sign-off:

| Req ID | Alasan sementara | Owner | Target penutupan |
|--------|------------------|-------|------------------|
| — | — | — | — |

---

## 5. Forward trace ringkas

```
SRS SYS-FR-002 → LLD ValidationPolicy → TC-REF-012 → Hasil Pass (log QA-042)
```

---

## 6. Backward trace — dari defect

**CLIN-204** idempotency → berkaitan dengan **SYS-FR-002** validasi submit dan **TC-REF-013** — setelah perbaikan, rerun TC-REF-013 dan update RTM baris terkait jika scope expand.

---

## 7. Tanda tangan review

| Peran | Nama | Tanggal |
|-------|------|---------|
| QA Lead | … | |
| Engineering Lead | … | |

---

## 8. Pemeliharaan

Perbarui RTM pada setiap **perubahan requirement** atau penambahan kasus uji material; simpan versi PDF untuk audit snapshot rilis.

---

## 9. Lampiran

- Ekspor CSV dari TestRail (fiksi) `rtm-export-20260418.csv`

---

## 10. Contoh baris lengkap (fiksi)

| Req ID | Deskripsi | Sumber | Desain | Metode | Test ID | Status | Catatan |
|--------|-----------|--------|--------|--------|---------|--------|---------|
| SYS-NFR-003 | TLS boundary eksternal | SRS §4 | HLD §5 | Analysis | SEC-CHK-01 | V | Scan bulanan |

---

## 11. Catatan integrasi alat

Jika TestRail ID berbeda dari spreadsheet internal, sediakan **kolom alias** agar penelusuran lintas tim tidak putus.

---

## 12. Contoh filter pelacakan (SQL/BI, fiksi)

Laporan `coverage_by_component` menghitung persentase requirement SYS-FR dengan setidaknya satu tes **Pass** pada minggu ini—digunakan pada review kualitas mingguan.

**Akhir contoh RTM.**

