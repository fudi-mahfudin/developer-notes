# Contoh BAST — Serah Terima Modul Rujukan Terpadu (Fiksi)

> **Disclaimer:** Format ilustratif; konsultasikan tim legal untuk kontrak nyata.

---

**BERITA ACARA SERAH TERIMA**  
Nomor: **BAST-DIG-2026/04/017**

Pada hari ini, **Sabtu, 18 April 2026**, bertempat di **Kantor Pusat Digital NHA, Jakarta**, telah dilaksanakan serah terima pekerjaan sebagai berikut:

---

## I. Para Pihak

**PIHAK PERTAMA (Penyerah/Pelaksana):**  
Nama Badan: **PT Solusi Klinis Digital** (fiksi)  
Alamat: …  
Dalam hal ini diwakili oleh: **Nama Lengkap**, jabatan **Project Director**, selanjutnya disebut **PIHAK PERTAMA**.

**PIHAK KEDUA (Penerima/Pemesan):**  
Nama Badan: **Nusantara Health Alliance** (fiksi)  
Alamat: …  
Dalam hal ini diwakili oleh: **Nama Lengkap**, jabatan **VP Digital Health**, selanjutnya disebut **PIHAK KEDUA**.

---

## II. Dasar Pekerjaan

Perjanjian/Purchase Order nomor **PO-NHA-DIG-2025/88** tanggal … mengenai implementasi **Clinical Hub — Modul Rujukan Terpadu Fase 1**.

---

## III. Objek Serah Terima

PIHAK PERTAMA menyerahkan kepada PIHAK KEDUA hasil pekerjaan berikut:

| No | Deskripsi Deliverable | Versi / Referensi |
|----|------------------------|-------------------|
| 1 | Perangkat lunak modul Rujukan Terpadu pada lingkungan produksi | Build `1.5.0` |
| 2 | Dokumentasi administrator dan runbook operasional terkait modul | DocSet `CLIN-RB-2026` |
| 3 | Paket pelatihan singkat (rekaman) untuk staf rujukan | Repositori LMS internal |

---

## IV. Hasil Pemeriksaan / Acceptance

PIHAK KEDUA menyatakan telah melaksanakan pemeriksaan sesuai **kriteria acceptance** pada lampiran **A** (Daftar pengujian UAT tertutup—fiksi) dan menyatakan:

- **Deliverable utama** pada pasal III nomor **1 dan 2** telah memenuhi persyaratan fungsional yang disepakati untuk go-live wave pertama enam site sebagaimana lampiran PO.
- Item pelatihan nomor **3** telah diunggah pada portal yang ditentukan.

---

## V. Catatan Penyelesaian/Kekurangan

Item berikut dicatat sebagai **follow-up terjadwal** dan tidak menunda efektivitas serah terima utama:

| No | Deskripsi | Target penyelesaian |
|----|-----------|---------------------|
| 1 | Perbaikan minor UI Safari pada tabel antrian | Versi patch **1.5.1** (target 30 Apr 2026) |

---

## VI. Pengalihan Risiko Operasional

Mulai tanggal ditandatangani BAST ini, pemeliharaan tier-1 terhadap modul pada lingkungan produksi sesuai SLA dukungan dalam PO ditanggung oleh PIHAK PERTAMA sebagaimana mestinya; eskalasi ke TI pusat NHA mengikuti prosedur governansi yang berlaku.

*(Sesuaikan dengan kontrak nyata—kalimat ini ilustratif.)*

---

## VII. Tanda Tangan

Demikian Berita Acara ini dibuat dalam rangkap yang mempunyai kekuatan hukum yang sama.

**PIHAK PERTAMA**  
(Nama & Jabatan)  
Tanda tangan: ____________________

**PIHAK KEDUA**  
(Nama & Jabatan)  
Tanda tangan: ____________________

---

## Lampiran A — Ringkasan UAT (cuplikan fiksi)

| Requirement | Status |
|-------------|--------|
| Submit rujukan dengan ringkasan wajib | Lulus |
| Accept/Reject dengan alasan terstruktur | Lulus |
| Audit akses ringkasan | Lulus |

---

## Lampiran B — Daftar lingkungan (fiksi)

| Lingkungan | Versi deploy | Tanggal verifikasi |
|------------|--------------|---------------------|
| Production | 1.5.0 | 18 Apr 2026 |
| DR standby | 1.5.0 (sinkron) | 17 Apr 2026 |

**Akhir contoh BAST.**
