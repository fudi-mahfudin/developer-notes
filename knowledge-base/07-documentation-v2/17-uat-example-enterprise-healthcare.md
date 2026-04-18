# Contoh Dokumentasi UAT — Modul Rujukan NHA (Fiksi)

> **Disclaimer:** Formulir ilustratif; tidak menggantikan persetujuan legal/klinis nyata.

**Proyek:** Clinical Hub — Rujukan Wave 1  
**Versi dokumen:** 0.6  
**Tanggal:** 18 April 2026  
**Pemilik:** PM Clinical Operations

---

## A. Rencana UAT

### A.1 Tujuan

Memvalidasi bahwa alur rujukan antar-site mendukung operasional staf dan klinisi pada dua site pilot sebelum perluasan.

### A.2 Lingkup

Modul rujukan, notifikasi dasar, audit view ringkasan.

### A.3 Jadwal

| Sesi | Tanggal | Peserta |
|------|---------|---------|
| Sesi 1 | 10 Apr 2026 | Staf rujukan site Alpha |
| Sesi 2 | 12 Apr 2026 | Klinisi pengirim/penerima |

### A.4 Prasyarat

Build `1.4.9` ke atas di staging-pilot; akun per sesi; briefing 30 menit.

---

## B. Skenario UAT (cuplikan)

### UAT-S01 — Buat dan kirim rujungan lengkap

**Actor:** Staf rujukan site Alpha  
**Tujuan:** Memastikan kelengkapan ringkasan wajib mudah dipahami.

| Langkah | Tindakan pengguna | Hasil yang diharapkan |
|---------|-------------------|------------------------|
| 1 | Login SSO | Dashboard terbuka |
| 2 | Pilih pasien sintetis PP-009 | Profil terbuka |
| 3 | Buat rujukan ke site Beta | Form muncul |
| 4 | Isi field wajib | Indikator field lengkap |
| 5 | Kirim | Status Submitted; notifikasi terkirim ke inbox uji |

**Hasil sesi:** ☐ Pass ☐ Fail  
**Komentar:** ___________________________

---

### UAT-S02 — Tolak dengan alasan

**Actor:** Klinisi penerima site Beta  
**Tujuan:** Memastikan alasan terstruktur wajib diisi.

| Langkah | Tindakan | Ekspektasi |
|---------|----------|------------|
| 1 | Buka rujukan status Submitted | Detail tampil |
| 2 | Klik Tolak tanpa alasan | Validasi muncul |
| 3 | Pilih alasan + simpan | Status Rejected; pengirim mendapat notifikasi |

**Hasil:** ☐ Pass ☐ Fail

---

## C. Ringkasan hasil

| ID skenario | Pass/Fail | Catatan |
|-------------|-----------|---------|
| UAT-S01 | Pass | |
| UAT-S02 | Pass | |

---

## D. Daftar isu ke Jira

| ID | Ringkasan | Severity |
|----|-----------|----------|
| CLIN-198 | Teks bantuan SLA kurang jelas | Low |

---

## E. Keputusan

☐ **Diterima untuk go-live pilot** dengan catatan menyelesaikan isu Low sebelum wave berikutnya.  
☐ **Ditolak** — perlu perbaikan material.

**Penandatangan sponsor bisnis:** __________________  Tanggal: _______

---

## F. Lampiran

- Screenshot terpilih disimpan di folder SharePoint proyek (fiksi).

---

## G. Daftar peserta (fiksi)

| Nama | Peran | Organisasi |
|------|-------|------------|
| … | Perawat koordinator rujukan | RS Alpha |
| … | Dokter spesialis | RS Beta |

---

## H. Bukti sesi

Rekaman sesi disimpan sesuai kebijakan retensi internal (klasifikasi **Internal**).

**Akhir contoh dokumentasi UAT.**
