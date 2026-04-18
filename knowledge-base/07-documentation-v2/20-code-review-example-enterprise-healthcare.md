# Contoh Code Review Checklist — PR Clinical Hub (Fiksi)

> **Disclaimer:** Daftar ilustratif; sesuaikan risiko proyek.

**Repo:** `nha/clinical-bff`  
**Versi checklist:** 1.3  
**Tanggal:** 18 April 2026

---

## A. Informasi PR

| Item | Jawaban singkat |
|------|-----------------|
| Tiket | CLIN-121 |
| Risiko data | ☐ Tidak PHI ☐ PHI — review tambahan |
| Lingkup | UI antrian rujukan |

---

## B. Kebenaran & domain

- [ ] Perilaku sesuai AC di tiket dan tidak mengandalkan efek samping tidak terdokumentasi.
- [ ] State kosong/error ditangani tanpa crash.
- [ ] Tidak ada regresi pada alur Accept/Reject yang sudah stabil.

---

## C. Keamanan & privasi

- [ ] Tidak ada PHI di `console.log` atau error boundary yang terlihat pengguna.
- [ ] Otorisasi memeriksa site context sebelum render data sensitif.
- [ ] Dependensi baru dicek advisori (npm audit / supply chain).

---

## D. Kinerja & UX

- [ ] Query daftar tidak memuat ribuan baris sekaligus tanpa virtualisasi/pagination.
- [ ] Loading dan skeleton state tidak menyesatkan mengenai kegagalan jaringan.

---

## E. Observabilitas

- [ ] Event analitik (`referral_queue_view`) memakai payload tanpa PHI—hanya ID teknik.

---

## F. Pengujian

- [ ] Tes unit komponen untuk filter SLA (ikon warna).
- [ ] Snapshot tidak rapuh — gunakan data stabil fixture.

---

## G. Dokumentasi

- [ ] Storybook / docs komponen diperbarui jika props publik berubah.

---

## H. Rollout

- [ ] Fitur berada di belakang flag `referral_sla_widgets` default off hingga QA.

---

## I. Persetujuan reviewer

| Reviewer | Fokus | Status |
|----------|-------|--------|
| @alex | Domain | Approved |
| @sam-security | Keamanan | Approved dengan catatan kecil |

---

## J. Catatan catatan reviewer (contoh)

> Pastikan tooltip SLA tidak menyinggung interpretasi klinis—tekstual netral.

---

## K. Skor risiko otomatis (ilustrasi)

| Kriteria | Bobot |
|----------|-------|
| Menyentuh autentikasi | +2 |
| Menyentuh query pasien | +3 |

Skor ≥4 memerlukan reviewer keamanan tambahan.

---

## L. Lampiran referensi kebijakan

- `SEC-REVIEW-GUIDE` (fiksi) untuk data sensitif.

---

## M. Riwayat penggunaan checklist

| Tanggal PR | Catatan |
|------------|---------|
| 2026-04-18 | Review pertama SLA banner |

**Akhir contoh checklist.**
