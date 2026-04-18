# Contoh SRS — Modul Rujukan Terpadu (Fiksi)

> **Disclaimer:** Dokumen ilustratif untuk pembelajaran. Organisasi, ID pasien, dan parameter teknis bersifat fiksi. Persyaratan regulasi dan klinis nyata harus ditetapkan oleh tim compliance dan clinical governance.

**Sistem:** NHA Clinical Hub — Layanan Rujukan  
**Versi SRS:** 0.4  
**Tanggal:** 18 April 2026  
**Referensi:** BRD Integrasi Rekam Medis NHA, PRD Modul Rujukan Terpadu v0.9

---

## 1. Pendahuluan

### 1.1 Tujuan dokumen

Dokumen ini menspesifikasi requirement perangkat lunak untuk **pembuatan, pengelolaan status, dan audit akses** terhadap **ringkasan klinis minimal** dalam alur rujukan antar-site pada jaringan NHA.

### 1.2 Ruang lingkup sistem

Perangkat lunak mencakup layanan backend, API application, dan antarmuka pengguna web untuk peran yang didefinisikan di PRD. Di luar ruang lingkup: penggantian penuh EHR vendor, billing penuh, dan integrasi laboratorium seluruh site.

### 1.3 Definisi singkat

| Istilah | Definisi |
|---------|----------|
| PHI | Informasi kesehatan yang dapat diidentifikasi sesuai kebijakan organisasi. |
| Ringkasan klinis minimal | Himpunan field wajib untuk kontinuitas perawatan pada konteks rujukan. |
| Site | Fasilitas dalam jaringan NHA dengan identitas tenant. |

---

## 2. Deskripsi umum

### 2.1 Perspektif produk

Sistem merupakan komponen dari platform digital NHA dan bergantung pada **master pasien enterprise**, **IAM**, **layanan notifikasi**, dan **policy masking** pusat.

### 2.2 Batasan dan asumsi

- Konektivitas klinisi diasumsikan melalui jaringan terpercaya atau VPN sesuai kebijakan.
- Jam referensi server UTC; tampilan zona waktu mengikuti preferensi user/site.

---

## 3. Requirement fungsional

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| SYS-FR-001 | Sistem harus membuat entitas `Referral` dengan status awal `Draft` ketika pengguna berwenang memulai rujukan dari konteks pasien aktif. | Must |
| SYS-FR-002 | Sistem harus mencegah transisi status ke `Submitted` jika field wajib ringkasan (site policy) tidak lengkap atau tidak valid. | Must |
| SYS-FR-003 | Sistem harus mencatat setiap transisi status dengan actor, timestamp, dan pasangan status `from`/`to`. | Must |
| SYS-FR-004 | Sistem harus menyediakan endpoint/API untuk mengambil daftar rujukan yang difilter berdasarkan site asal/tujuan sesuai otorisasi pengguna. | Must |
| SYS-FR-005 | Sistem harus mendukung penolakan rujukan dengan set alasan terstruktur yang dapat dikonfigurasi per tenant. | Must |
| SYS-FR-006 | Sistem harus menampilkan ringkasan klinis minimal kepada penerima sesuai policy masking field-per-field. | Must |
| SYS-FR-007 | Sistem harus menyediakan catatan internal rujukan yang tidak diekspor ke saluran pasien dan dilabeli eksplisit di UI. | Should |

---

## 4. Requirement non-fungsional

| ID | Requirement |
|----|-------------|
| SYS-NFR-001 | Operasi baca daftar rujukan hingga 500 baris pada dataset referensi harus mencapai respons siap pakai UI dalam ambang yang ditetapkan dokumen lingkungan validasi (nilai numerik di baseline QA). |
| SYS-NFR-002 | Semua akses ke ringkasan pasien untuk tujuan perawatan harus meninggalkan jejak audit minimal: user id, waktu, patient id, jenis tindakan. |
| SYS-NFR-003 | Komunikasi antar layanan melalui TLS 1.2 minimum pada boundary eksternal sesuai standar organisasi. |
| SYS-NFR-004 | Sistem harus mendukung deployment multi-site dengan konfigurasi tenant tanpa rebuild kode untuk parameter yang tercantum sebagai “tenant-configurable” di lampiran. |

---

## 5. Antarmuka eksternal

### 5.1 Master pasien

Sistem harus memanggil layanan resolusi identitas pasien kanonis; format error dan retry mengikuti kontrak layanan pusat (detail di TSD/API spec).

### 5.2 Notifikasi

Sistem harus mengirim event notifikasi pada `Submitted`, `Accepted`, `Rejected` sesuai template tenant; kegagalan notifikasi tidak boleh mengubah status rujukan tanpa alur kompensasi yang terdokumentasi di runbook.

---

## 6. Keamanan dan privasi

- Otentikasi melalui SSO organisasi; otorisasi berbasis peran dan konteks site.
- Field sensitif mengikuti **policy masking**; akses di luar pola normal mengikuti prosedur break-the-glass bisnis (pelacakan review pasca-akses di luar cakupan SRS modul ini namun event harus tersedia untuk pipeline audit).

---

## 7. Matriks verifikasi (ringkas)

| ID | Metode verifikasi utama |
|----|-------------------------|
| SYS-FR-001–003 | Uji fungsional otomatis + inspeksi log |
| SYS-NFR-002 | Inspeksi skema audit + tes integrasi |

---

## 8. Lampiran

- **Lampiran A:** Daftar field wajib per jenis rujukan (konfigurasi).
- **Lampiran B:** Diagram konteks sistem (referensi HLD).

**Akhir contoh SRS.**
