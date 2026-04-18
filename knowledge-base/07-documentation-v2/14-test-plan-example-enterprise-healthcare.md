# Contoh Test Plan — Clinical Hub 1.5.0 (Fiksi)

> **Disclaimer:** Rencana ilustratif; data dan jadwal fiksi.

**Produk:** NHA Clinical Hub  
**Versi uji:** 1.5.0 RC  
**ID dokumen:** TP-CLIN-2026-04  
**Tanggal:** 18 April 2026  
**Pemilik QA:** QA Lead — Clinical Platform

---

## 1. Ringkasan eksekutif

Rencana ini mencakup pengujian **modul Rujukan Terpadu** untuk wave enam site, dengan fokus validasi ringkasan klinis, transisi status, notifikasi, dan audit akses.

---

## 2. Referensi dokumen

| Dokumen | Versi |
|---------|-------|
| PRD Rujukan Terpadu | 0.9 |
| SRS Modul Rujukan | 0.4 |
| Release notes internal 1.5.0 | draft |

---

## 3. Lingkup pengujian

### Termasuk

- Alur happy path rujukan Draft → Submitted → Accepted.
- Validasi field wajib dan error yang konsisten.
- Idempotency submit.
- Audit event akses ringkasan.

### Tidak termasuk

- Integrasi laboratorium prioritas rendah (fase berikutnya).
- Performa di bawah beban ekstrem (akan dicakup tes kinerja terpisah).

---

## 4. Strategi pengujian

| Lapisan | Pendekatan |
|---------|------------|
| Unit | Tim dev — state machine rujukan |
| Integrasi | QA otomasi API + kontrak |
| E2E | QA manual + subset otomasi stabil |
| Eksploratori | Sesi time-boxed 2 jam pasca-regresi |

---

## 5. Lingkungan

| Lingkungan | Kegunaan |
|------------|----------|
| staging-nha | Eksekusi utama |
| staging-data | Dataset de-identified batch 2026-03 |

Akun peran: `sender.md`, `receiver.md`, `staff.ref` — kredensial di vault QA.

---

## 6. Kriteria masuk (entry)

- Build `1.5.0-rc2` deploy pada staging.
- Smoke suite otomatis hijau.
- Tidak ada defect S1 terbuka pada modul inti.

---

## 7. Kriteria keluar (exit)

- Semua kasus **Prioritas 1** Pass.
- Defect Prioritas 2 terbuka maksimal **3** dengan workaround tertulis.
- Sign-off QA & Product untuk GA wave.

---

## 8. Jadwal indikatif

| Fase | Durasi |
|------|--------|
| Smoke | 0.5 hari |
| Regresi fungsional | 3 hari |
| Eksploratori | 0.5 hari |
| Buffer | 1 hari |

---

## 9. Peran

| Nama | Peran |
|------|-------|
| … | QA eksekutor utama |
| … | QA otomasi |
| … | Dev on-call defect |

---

## 10. Risiko

| Risiko | Mitigasi |
|--------|----------|
| Vendor notifikasi tidak stabil | Fallback uji in-app only |
| Data uji tidak representatif | Tambah sintetis alergi konflik |

---

## 11. Metrik

- Defect escape rate target: di bawah ambang internal kuartal lalu.
- Persentase kasus otomatis vs manual dicatat untuk perbaikan sprint berikutnya.

---

## 12. Persetujuan

| Peran | Nama | Tanggal |
|-------|------|---------|
| QA Lead | … | |
| PM Clinical | … | |

**Akhir contoh test plan.**
