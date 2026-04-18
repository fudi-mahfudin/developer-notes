# Contoh PRD — Enterprise Healthcare (Fiksi)

> **Disclaimer:** Contoh ilustratif; nama, angka, dan alur bersifat fiksi. **Acceptance criteria** dan kepatuhan regulasi harus disesuaikan dengan kebijakan organisasi dan nasihat legal/clinical governance.

**Produk / inisiatif:** NHA Clinical Hub — Modul Rujukan Terpadu (fase 1)  
**Referensi BRD:** Program Integrasi Rekam Medis Terpadu NHA (versi BRD terkait)  
**Versi PRD:** 0.9 (Draft untuk review silang Product–Clinical–Engineering)  
**Tanggal:** 18 April 2026  
**Pemilik dokumen:** Product Owner, Digital Clinical Platform

---

## 1. Ringkasan

Modul **Rujukan Terpadu** memungkinkan klinisi dan staf rujukan di jaringan NHA membuat, melacak, dan menyelesaikan **rujukan antar-site** dengan **ringkasan klinis minimal** yang konsisten, mengurangi transfer informasi manual (fax/email) dan mendukung kesinambungan perawatan.

PRD ini membatasi diri pada **perilaku produk** untuk rilis fase 1; keputusan arsitektur dan kontrak API berada di dokumen teknis terpisah.

---

## 2. Tujuan produk dan metrik

| Metrik produk | Definisi | Target awal (6 bulan) |
|---------------|----------|------------------------|
| Kelengkapan ringkasan saat submit rujukan | Persentase rujukan dengan field wajib terisi valid | ≥ 95% |
| Waktu median buka ringkasan oleh penerima | Dari notifikasi hingga tampilan ringkasan | ≤ 2 menit (network referensi) |
| Task rujukan “tertunda tindakan” lebih dari SLA bisnis | Proporsi rujukan melewati ambang bisnis | ≤ 5% |

Metrik bisnis lengkap tetap pada BRD; metrik di atas adalah **proxy produk** untuk pelacakan sprint.

---

## 3. Pengguna dan peran

| Peran | Deskripsi singkat |
|--------|-------------------|
| **Mengirim klinisi** | Dokter/perawat yang memulai rujukan dari site asal. |
| **Staf rujukan** | Mengkoordinasi administrasi, jadwal, kelengkapan berkas. |
| **Penerima klinisi** | Dokter/perawat di site tujuan yang menerima pasien. |
| **Reviewer privasi** | Meninjau kasus akses tidak biasa jika workflow mensyaratkan (proses operasional terpisah). |

**Catatan:** Izin per peran didefinisikan di matriks RBAC produk (lampiran); PRD tidak menggantikan kebijakan IAM enterprise.

---

## 4. Ruang lingkup dan non-goals

### Dalam ruang lingkup (fase 1)

1. Pembuatan rujukan dengan **daftar field wajib** ringkasan klinis minimal.
2. Status rujukan: **Draft → Submitted → In review → Accepted / Rejected / Cancelled** (label dapat disesuaikan dengan UI).
3. Notifikasi dalam aplikasi (dan email opsional sesuai konfigurasi tenant) ke penerima.
4. **Daftar tugas** untuk staf rujukan: filter by site, status, SLA.
5. **Audit view produk**: daftar akses ringkasan untuk pasien tertentu (level produk; detail log teknis di sistem logging).

### Non-goals (fase 1)

1. Penggantian modul penjadwalan operasi penuh di rumah sakit tujuan.
2. Integrasi otomatis dengan **semua** sistem laboratorium pihak ketiga.
3. Mode offline penuh pada perangkat mobile (hanya eksplorasi fase 2).
4. Terjemahan bahasa otomatis untuk konten bebas teks klinisi (tidak termasuk).

---

## 5. User stories (cuplikan prioritas tinggi)

1. **Sebagai** mengirim klinisi **saya ingin** membuat rujukan dari daftar pasien yang saya tangani **agar** tidak perlu mengetik ulang identitas pasien manual.
2. **Sebagai** staf rujukan **saya ingin** melihat antrian rujukan yang mendekati batas waktu tindak **agar** dapat menindaklanjuti sebelum pasien tiba.
3. **Sebagai** penerima klinisi **saya ingin** membuka ringkasan klinis minimal dalam konteks rujukan **agar** keputusan awal perawatan tidak tertunda.

---

## 6. Alur utama (happy path)

1. Mengirim klinisi membuka pasien aktif dan memilih **Buat rujukan**.
2. Sistem mengisi identitas pasien dari **master pasien enterprise**; jika ada duplikasi kandidat, pengguna menyelesaikan **resolusi duplikasi** sesuai workflow (detail UI di desain).
3. Pengguna melengkapi field wajib ringkasan (lihat §7).
4. Pengguna mengirim; status menjadi **Submitted**; penerima dan staf terkait mendapat notifikasi sesuai aturan site.
5. Penerima membuka rujukan, meninjau ringkasan, memilih **Accept** atau **Reject** dengan alasan terstruktur + komentar opsional.
6. Staf dapat menambahkan catatan internal yang **tidak** terbagi ke pasien (label jelas di UI).

---

## 7. Requirement fungsional (cuplikan bernomor)

| ID | Requirement |
|----|-------------|
| FR-001 | Sistem harus mencegah submit rujukan jika **alergi** atau **diagnosis utama** (sesuai konfigurasi site) kosong. |
| FR-002 | Field **obat aktif** harus mendukung input terstruktur minimal: nama, rute, dosis jika tersedia; free-text hanya sebagai pelengkap tercatat. |
| FR-003 | Setiap perubahan status rujukan harus mencatat **siapa**, **kapan**, dan **dari status ke status**. |
| FR-004 | Penolakan rujukan wajib memilih **minimal satu** alasan dari daftar yang dapat dikonfigurasi administratif. |
| FR-005 | Pengguna tanpa izin melihat field sensitif tertentu harus melihat **placeholder** dan alasan (policy-based masking). |

---

## 8. Requirement non-fungsional (produk-relevan)

| ID | NFR |
|----|-----|
| NFR-001 | Layar daftar rujukan untuk dataset hingga 500 baris harus dapat dipakai tanpa hang UI lebih dari 2 detik pada profil jaringan referensi. |
| NFR-002 | Tindakan kritis (submit, accept, reject) harus **idempotent** dari sudut pandang pengguna; kesalahan jaringan menampilkan pesan recoverable dan status konsisten setelah refresh. |
| NFR-003 | Akses ringkasan pasien harus tercatat untuk audit review setidaknya: user, timestamp, pasien, tipe tindakan. |

---

## 9. Acceptance criteria (contoh Given/When/Then)

### AC-01 — Submit tanpa field wajib

- **Given** pengguna mengisi rujukan dengan diagnosis utama kosong  
- **When** pengguna memilih Kirim  
- **Then** sistem menampilkan error field-level dan **tidak** mengubah status dari Draft.

### AC-02 — Terima rujukan

- **Given** rujukan berstatus Submitted dan pengguna adalah penerima yang berwenang  
- **When** pengguna memilih Terima dengan konfirmasi  
- **Then** status menjadi Accepted, timestamp dan identitas pencatat tersimpan, dan notifikasi sesuai konfigurasi terkirim ke pengirim.

### AC-03 — Penolakan dengan alasan

- **Given** rujukan berstatus Submitted  
- **When** pengguna memilih Tolak tanpa memilih alasan terstruktur  
- **Then** sistem mencegah penyimpanan dan menampilkan pesan yang menjelaskan kewajiban alasan.

---

## 10. Dependensi produk

- **Master pasien enterprise** tersedia dan dapat di-resolve ke ID kanonis.
- **Notifikasi** enterprise (email/push in-app) untuk template tenant.
- **Policy masking** field sensitif dari layanan kebijakan pusat (atau fallback konfigurasi per site).

---

## 11. Rilis dan rollout

- **Pilot:** 2 site dengan volume rujukan sedang; flag tenant `referral_hub_enabled`.
- **General availability:** setelah KPI pilot terpenuhi dan sign-off clinical safety.

**Rollback produk:** menonaktifkan flag; rujukan dalam penerbangan mengikuti **runbook** transisi (dokumen operasional).

---

## 12. Analitik (event naming — contoh)

| Event | Pemicu |
|--------|--------|
| `referral_created` | Draft disimpan pertama kali |
| `referral_submitted` | Submit sukses |
| `referral_accepted` | Accept sukses |
| `referral_rejected` | Reject sukses |

Properties minimal: `referral_id`, `origin_site`, `dest_site`, `role` (hash/role id sesuai kebijakan privasi analitik).

---

## 13. Risiko produk dan mitigasi

| Risiko | Mitigasi |
|--------|----------|
| Klinisi melewati field kritis dengan cepat | Validasi bertahap, highlight risiko, pelatihan singkat dalam onboarding tooltip |
| Kebingungan peran di site campuran | Label peran konsisten; default filter site sesuai konteks login |
| Over-notifikasi | Preferensi notifikasi per peran (should-have fase 1 jika waktu memungkinkan) |

---

## 14. Lampiran (referensi)

- **LAMPIRAN A:** Daftar field wajib per jenis rujukan (konfigurasi tenant).
- **LAMPIRAN B:** Matriks RBAC ringkas per layar.

**Akhir contoh dokumen.**
