# Contoh Struktur Wiki — Program Clinical Hub (Fiksi)

> **Disclaimer:** Hierarki ilustratif untuk Confluence atau wiki sejenis.

**Space utama:** `CLIN — Clinical Hub`  
**Space key (fiksi):** `CLIN`  
**Tanggal:** 18 April 2026  
**Space owner:** Product Operations

---

## 1. Visi halaman beranda

Beranda berisi:

- Ringkasan produk satu paragraf  
- Tautan cepat ke roadmap, squad contacts, channel Slack  
- Banner “status rilis terkini” diperbarui oleh PM setiap sprint  

---

## 2. Pohon navigasi (ringkas)

```
CLIN/
├── 00-Overview
├── 10-Requirements (links ke BRD/PRD repo docs)
├── 20-Architecture (links ke HLD diagrams)
├── 30-Delivery
│   ├── Playbooks release
│   └── Decision log (ringkas; detail di ADR repo)
├── 40-Operations
│   ├── Incident response index
│   └── Vendor contacts (restricted)
└── 50-Onboarding
    └── 30-60-90 plan template
```

---

## 3. Template halaman keputusan

Judul: `DEC-2026-04 — SLA banner approval`  
Isi: konteks, opsi, keputusan, akibat, pemilik tindakan.

---

## 4. Makro yang dipakai

| Makro | Kegunaan |
|-------|----------|
| Status | Hijau/Kuning untuk milestone |
| Jira filter | Daftar epic aktif |
| Info | Peringatan sens regulatory |

---

## 5. Label

`clinical-hub`, `phi-sensitive` (membatasi ruang), `runbook`.

---

## 6. Kebijakan sensitif

- Tidak boleh menempel **MRN** atau nama pasien.  
- Data contoh harus sintetis.

---

## 7. Review triwulan

Space owner menjalankan skrip laporan halaman tidak diubah >365 hari — kandidat arsip.

---

## 8. Integrasi dengan Git

Halaman arsitektur menyertakan **embed** diagram dari repo `architecture/` (PlantUML) lewat tautan render—sumber kebenaran tetap Git.

---

## 9. Ruang pendamping

`NHA-Security` menyimpan policy global; halaman Clinical hanya merujuk, tidak menduplikasi policy penuh.

---

## 10. Metrik adopsi

Jumlah kunjungan halaman onboarding dan pencarian tanpa hasil digunakan untuk memperbaiki struktur navigasi—bukan untuk memantau individu.

---

## 11. Kebijakan komentar dan threading

Gunakan komentar inline untuk klarifikasi kecil; untuk keputusan besar buat halaman ADR baru—menghindari debat penting tersebar di banyak thread komentar wiki.

---

## 12. Integrasi dengan analytics ruang

Monitor halaman dengan bounce tinggi sebagai kandidat restrukturisasi navigasi—data anonim aggregate tanpa melacak individu.

---

## 13. Template arsip proyek

Saat proyek selesai, pindahkan halaman aktif ke struktur arsip dengan banner status—menjaga pencarian tidak mengembalikan prosedur usang sebagai jawaban pertama.

**Akhir contoh wiki.**
