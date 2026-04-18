# Contoh Roadmap & Milestone — NHA Digital Clinical (Fiksi)

> **Disclaimer:** Tanggal dan scope fiksi; jangan dipakai sebagai komitmen bisnis nyata.

**Produk:** NHA Clinical Hub  
**Horizon:** FY2026–FY2027  
**Versi dokumen:** 0.4  
**Tanggal:** 18 April 2026  
**Pemilik:** VP Digital Health

---

## 1. Visi ringkas

Menyatukan **alur rujukan dan ringkasan klinis** lintas site dengan kepatuhan privasi dan keselamatan pasien sebagai prinsip pertama.

---

## 2. Tema strategis (outcome-based)

| Tema | Outcome yang dikejar |
|------|----------------------|
| Continuity of care | Informasi kritis tersedia pada transfer perawatan |
| Operational efficiency | Mengurangi rekonsiliasi manual antar-site |
| Trust & compliance | Audit trail dan kontrol akses terstandarisasi |

---

## 3. Timeline kuartal (ringkas)

| Kuartal | Fokus utama |
|---------|-------------|
| Q2 2026 | Pilot rujukan 2 site; fondasi master pasien |
| Q3 2026 | Perluasan 6 site; hardening notifikasi |
| Q4 2026 | Integrasi lab prioritas; dashboard SLA |
| Q1 2027 | Skalasi jaringan penuh (bergantung hasil Q4) |

---

## 4. Milestone terpilih

| ID | Milestone | Tanggal target | Owner | Deliverable utama |
|----|-----------|----------------|-------|-------------------|
| M-01 | Pilot go-live | 15 Jun 2026 | Program Director | Modul rujukan aktif di 2 site |
| M-02 | Security assessment gate | 30 Jun 2026 | CISO office | Laporan temuan kritis tertangani |
| M-03 | GA wave 1 | 30 Sep 2026 | PMO Clinical | 6 site produksi |
| M-04 | Integration lab wave | 15 Nov 2026 | Integration lead | Antarmuka lab prioritas stabil |

---

## 5. Dependensi lintas milestone

- **M-01** bergantung pada penyelesaian integrasi `patient-index` dengan akurasi deduplikasi minimal yang disepakati.
- **M-03** membutuhkan kapasitas **training** klinisi yang direncanakan di milestone terpisah (personnel readiness).

---

## 6. Risiko roadmap

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| Keterlambatan vendor EHR | Mundur integrasi | Adapter fallback + scope pilot mengecil |
| Fatigue adopsi | KPI adoption gagal | Program champion per site |

---

## 7. Review ritme

**Roadmap review** bulanan antara PMO, arsitektur, dan clinical ops; penyesuaian dicatat di versi dokumen.

---

## 8. Komunikasi eksternal

Peta publik menampilkan **tema dan kuartal** tanpa tanggal pasti fitur kecil—detail internal tetap pada dokumen ini.

---

## 9. Hubungan ke release train

Setiap milestone besar dipetakan ke **fix version** di Jira (`CLIN-Hub 1.5`, `1.6`, …) dengan catatan bahwa beberapa release teknis dapat terjadi antar milestone tanpa mengubah commitment bisnis utama.

---

## 10. Metrik pasca milestone (contoh)

- Persentase rujukan dengan ringkasan lengkap pada submit (pilot).
- Skor survey klinisi terhadap kepercayaan data.

---

## 11. Appendix — daftar fitur tidak dijanjikan FY2026

- Penggantian total EHR tunggal di seluruh jaringan (inisiatif terpisah).
- AI diagnosis assist (eksplorasi Research).

---

## 12. Persetujuan arah (ilustrasi)

| Nama | Peran | Status |
|------|-------|--------|
| … | VP Digital Health | Disetujui arah |
| … | CFO | Ack budget guardrail |

**Akhir contoh roadmap.**
