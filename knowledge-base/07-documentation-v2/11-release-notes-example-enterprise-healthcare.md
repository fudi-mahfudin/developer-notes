# Contoh Release Notes — Clinical Hub 1.5.0 (Fiksi)

> **Disclaimer:** Produk dan tanggal fiksi. Jangan dijadikan dasar komunikasi klien nyata.

**Produk:** NHA Clinical Hub  
**Versi:** 1.5.0  
**Tanggal rilis:** 18 April 2026  
**Lingkungan:** Production (rolling deploy 02:00–04:00 WIB)

---

## Ringkasan

Rilis ini memperluas **modul Rujukan Terpadu** ke enam site tambahan, menambahkan **peringatan SLA** untuk staf rujukan, dan memperbaiki serangkaian defect terkait validasi alergi.

---

## Sorotan

- Antrian rujukan dengan indikator ketepatan waktu untuk prioritas klinis.
- Peningkatan kinerja pemuatan daftar hingga 500 baris pada koneksi referensi.
- Perbaikan bug yang menyebabkan status ganda pada retry jaringan.

---

## Fitur baru

### Peringatan SLA pada antrian kerja

Staf rujukan kini melihat **banner peringatan** ketika rujukan mendekati batas waktu tindak sesuai kebijakan site. Peringatan bersifat informasi dan tidak menggantikan protokol klinis setempat.

**Cara memakai:** buka menu **Rujukan → Antrian saya**; kolom baru **SLA** menampilkan status warna.

---

## Peningkatan

- Filter gabungan **status + site** sekarang dipertahankan di sesi yang sama setelah refresh halaman.
- Notifikasi email menyertakan **deep link** langsung ke rujukan terkait (memerlukan login SSO).

---

## Perbaikan bug (terpilih)

| Area | Deskripsi pengguna |
|------|---------------------|
| Validasi alergi | Submit yang gagal karena format entri alergi sekarang menampilkan pesan field-level yang konsisten. |
| Status ganda | Kasus langka 409 pada retry kini ditangani dengan idempotensi submit di sisi server. |

---

## Breaking changes

**Tidak ada** bagi konsumen API `v1` yang sudah mematuhi header `Idempotency-Key` pada submit.

---

## Catatan upgrade (administrator)

1. Deploy layanan `referral-svc` **sebelum** `clinical-bff` sesuai urutan runbook `RB-CLIN-15`.
2. Aktifkan flag tenant `referral_sla_widgets` setelah smoke test pilot.

---

## Known issues

- Pada browser Safari versi lama (daftar di portal dukungan), scroll horizontal pada tabel antrian mungkin memerlukan reload sekali—perbaikan direncanakan 1.5.1.

---

## Keamanan

- Memperbarui dependensi server untuk CVE internal prioritas menengah (detail pada advisory TI NHA versi terbatas).

---

## Ucapan terima kasih

Terima kasih kepada site pilot dan tim klinisi yang memberikan umpan balik pada iterasi antrian.

---

## Kontak dukungan

Email: `clinical-support@nha.example.com` — sertakan versi **1.5.0** dan ID rujungan jika relevan.

---

## Lampiran internal — riwayat pull request (cuplikan)

| Area | PR | Catatan singkat |
|------|-----|-----------------|
| referral-svc | #4821 | Idempotency submit |
| clinical-bff | #4810 | Header proxy |

Bagian ini opsional pada catatan pelanggan; sering disertakan hanya pada dokumen internal engineering.

---

## Daftar kompatibilitas integrasi

| Sistem partner | Versi minimum yang diuji |
|----------------|---------------------------|
| patient-index API | 3.2.x |
| notification-bus schema | v2026.03 |

**Akhir contoh release notes.**
