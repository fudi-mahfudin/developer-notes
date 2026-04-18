# Contoh Panduan Onboarding — Engineer Clinical Platform (Fiksi)

> **Disclaimer:** Proses ilustratif; akses nyata mengikuti IT dan HR.

**Tim:** Clinical Platform Engineering  
**Versi:** 1.4  
**Tanggal:** 18 April 2026  
**Buddy default:** rotating roster (lihat sheet internal)

---

## Hari 0 — sebelum mulai

- Pastikan kontrak dan akun email aktif.  
- Terima undangan GitHub org `nha-tech` (fiksi).  
- Selesaikan modul keamanan dasar LMS internal.

---

## Hari 1 — akses dan orientasi

| Waktu | Aktivitas |
|-------|-----------|
| 09:00 | Meet buddy + overview produk 30 menit |
| 10:00 | Setup laptop — daftar software standar (`brew`, VPN, kubectl read-only staging) |
| 13:00 | Baca **Engineering Handbook** bagian PHI |
| 15:00 | Clone monorepo `clinical/` dan jalankan `./scripts/dev-bootstrap.sh` |

**Checkpoint:** dapat menjalankan UI lokal dengan data mock.

---

## Minggu 1 — kontribusi pertama

- Ikuti standup tim; dengarkan ritme.  
- Ambil tiket **good-first-issue** berlabel `onboarding-friendly`.  
- Pairing 4 jam dengan engineer senior pada area referral.

**Checkpoint:** PR kecil merge ke `main` (dokumentasi atau test diterima).

---

## 30–60–90 hari (ringkas)

| Fase | Fokus |
|------|-------|
| 30 hari | Navigasi codebase + alur rilis |
| 60 hari | Ownership komponen kecil |
| 90 hari | Presentasi pembelajaran domain klinis internal |

---

## Domain healthcare — baca wajib

- Halaman wiki `CLIN/Glossary`  
- Kebijakan logging PHI `SEC-LOG-01`  

---

## Saluran komunikasi

| Channel | Kegunaan |
|---------|----------|
| `#clinical-platform` | Diskusi harian |
| `#incidents` | Hanya production |

---

## Eskalasi jika blokir

1. Buddy  
2. Tech lead channel  
3. EM harian  

---

## Checklist akhir minggu pertama

- [ ] Akses staging VPN  
- [ ] Jalankan tes unit referral-svc  
- [ ] Buka dashboard staging read-only  

---

## Feedback

Isi survei onboarding anonim `FORM-ONB-09` — membantu memperbaiki dokumen ini.

---

## Minggu 2–4 — perdalaman

- Ikuti sesi **domain deep dive** tentang alur rujukan klinis.  
- Review PR rekan untuk memahami standar komentar.  
- Shadow on-call secondary (read-only) jika kebijakan mengizinkan.

---

## Referensi cepat

| Topik | Lokasi |
|-------|--------|
| Standar logging | Wiki `SEC-LOG-01` |
| Feature flags | Doc `platform/flags.md` |

---

## Penanda selesai onboarding 30 hari

Checklist ditandatangani buddy + EM — disimpan di HRIS internal (fiksi).

**Akhir contoh onboarding.**
