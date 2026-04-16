# Contoh BRD Healthcare (Dengan Penjelasan Belajar)

## 1. Informasi Dokumen

- **Nama Proyek**: MedCare Connect
- **Versi Dokumen**: 1.0
- **Tanggal**: 16 April 2026
- **Disusun oleh**: Business Analyst
- **Disetujui oleh**: Head of Product, Head of Operations, Compliance Lead

> Bagian ini memastikan dokumen punya identitas resmi. Di industri healthcare, versi dan approval itu wajib karena audit dan regulasi.

## 2. Latar Belakang Bisnis

MedCare Connect adalah platform digital untuk menghubungkan pasien dengan fasilitas kesehatan (klinik dan rumah sakit) melalui fitur pendaftaran online, antrean digital, telekonsultasi, dan akses ringkasan rekam medis.

Saat ini proses pendaftaran pasien masih dominan manual (telepon atau datang langsung), menyebabkan waktu tunggu tinggi, no-show tinggi, dan beban administrasi besar.

> Latar belakang harus menjelaskan masalah bisnis nyata, bukan masalah teknis. Fokus ke dampak operasional dan pengalaman pasien.

## 3. Tujuan Bisnis

1. Mengurangi waktu tunggu pendaftaran pasien dari rata-rata 45 menit menjadi 15 menit dalam 6 bulan.
2. Menurunkan no-show appointment dari 28% menjadi 12% dalam 2 kuartal.
3. Meningkatkan kepuasan pasien (CSAT) dari 3.6 ke 4.4.
4. Menurunkan beban kerja admin pendaftaran minimal 30%.

> Tujuan harus SMART: spesifik, terukur, ada target waktu. Kalau tidak terukur, BRD jadi dokumen opini.

## 4. Ruang Lingkup (Scope)

### In Scope

- Registrasi pasien online (baru dan existing patient).
- Manajemen appointment dokter (pilih dokter, jadwal, lokasi).
- Notifikasi otomatis via WhatsApp/SMS/email (konfirmasi dan reminder).
- Telekonsultasi untuk kasus non-emergency.
- Dashboard operasional untuk admin fasilitas.

### Out of Scope

- Integrasi dengan sistem klaim asuransi pihak ketiga pada fase 1.
- Integrasi e-prescription ke apotek eksternal.
- Fitur rawat inap dan manajemen kamar.

> Scope melindungi tim dari scope creep. Out of scope harus tegas supaya stakeholder tidak memasukkan fitur tambahan diam-diam.

## 5. Stakeholder Utama

- **Pasien**: pengguna akhir untuk registrasi dan konsultasi.
- **Dokter**: mengelola jadwal dan sesi konsultasi.
- **Admin Klinik/RS**: validasi data, monitoring antrean, penjadwalan.
- **Tim Operasional**: memastikan layanan berjalan sesuai SLA.
- **Tim Compliance & Legal**: memastikan kepatuhan regulasi data kesehatan.
- **Tim IT & Security**: implementasi teknis, keamanan, dan monitoring.

> Stakeholder mapping penting agar kebutuhan tidak bias ke satu tim saja (misalnya hanya tim produk).

## 6. Problem Statement

1. Pasien tidak memiliki visibilitas slot dokter secara real-time.
2. Appointment reminder manual menyebabkan no-show tinggi.
3. Admin menginput data berulang karena sistem tidak terintegrasi.
4. Tidak ada dashboard kinerja operasional harian yang konsisten.

> Problem statement yang bagus berbasis fakta lapangan, bukan asumsi. Biasanya didukung data wawancara atau laporan operasional.

## 7. Requirement Bisnis Tingkat Tinggi

- Sistem harus menyediakan pendaftaran dan penjadwalan pasien secara online 24/7.
- Sistem harus memberi notifikasi otomatis H-1 dan H-2 jam sebelum jadwal.
- Sistem harus menyediakan kanal telekonsultasi aman untuk pasien dan dokter.
- Sistem harus menyimpan jejak audit aktivitas penting (login, update data, cancel appointment).
- Sistem harus mendukung role-based access untuk pasien, dokter, admin, dan supervisor.

> Di BRD, requirement masih level bisnis (apa yang dibutuhkan), belum masuk detail teknis implementasi (bagaimana dibangun).

## 8. Non-Functional Requirements (Ringkas)

- **Availability**: 99.5% uptime bulanan.
- **Performance**: waktu respons < 3 detik untuk 95% request utama.
- **Security**: enkripsi data in-transit dan at-rest.
- **Compliance**: sesuai kebijakan perlindungan data kesehatan yang berlaku.
- **Auditability**: log aktivitas tersimpan minimal 2 tahun.

> Healthcare tidak cukup hanya fungsi jalan. Sistem harus stabil, aman, dan bisa diaudit.

## 9. Asumsi dan Ketergantungan

### Asumsi

- Fasilitas kesehatan menyediakan jadwal dokter mingguan secara konsisten.
- Pasien memiliki akses smartphone dan nomor aktif untuk notifikasi.

### Ketergantungan

- Vendor notifikasi WhatsApp/SMS.
- Layanan video call pihak ketiga untuk telekonsultasi.
- Persetujuan legal untuk template consent digital.

> Bagian ini memperjelas hal-hal yang jika gagal dipenuhi bisa membuat proyek terlambat atau gagal.

## 10. Risiko Bisnis

1. **Adopsi dokter rendah** karena perubahan proses kerja.
2. **Kebocoran data** jika kontrol akses dan monitoring lemah.
3. **Gangguan vendor notifikasi** yang meningkatkan no-show.
4. **Resistensi admin** karena kekhawatiran otomatisasi pekerjaan.

Mitigasi awal:
- Program training dan change management untuk dokter/admin.
- Security hardening dan audit berkala.
- Fallback channel notifikasi.

> BRD yang matang harus jujur soal risiko. Menyembunyikan risiko hanya memindahkan masalah ke fase implementasi.

## 11. KPI dan Metode Pengukuran

- **Average Registration Time**: median waktu dari registrasi hingga nomor antrean.
- **No-Show Rate**: persentase appointment tanpa kehadiran.
- **CSAT**: skor kepuasan pasien pasca layanan.
- **Admin Productivity**: jumlah pasien diproses per shift per admin.
- **Teleconsult Completion Rate**: persentase sesi telekonsultasi yang selesai.

> KPI harus punya definisi metrik yang jelas, bukan label saja. Kalau definisi kabur, tim akan berdebat di pelaporan.

## 12. Timeline Tingkat Tinggi

- **Fase 1 (0-2 bulan)**: registrasi online + appointment + notifikasi.
- **Fase 2 (3-4 bulan)**: telekonsultasi + dashboard operasional.
- **Fase 3 (5-6 bulan)**: optimasi performa + audit & compliance hardening.

> Timeline BRD cukup high-level. Detail sprint dan teknis biasanya pindah ke PRD + project plan.

## 13. Kriteria Keberhasilan (Success Criteria)

- 80% appointment dibuat via platform digital dalam 6 bulan.
- Penurunan no-show minimal 16 poin persentase.
- Minimal 70% dokter aktif menggunakan sistem mingguan.
- Tidak ada insiden keamanan level kritikal pada 2 kuartal pertama.

> Success criteria adalah "garis finish" yang disepakati bisnis. Tanpa ini, proyek bisa dianggap selesai padahal dampak bisnis nihil.

## 14. Persetujuan

- Head of Product: `__________________`
- Head of Operations: `__________________`
- Compliance Lead: `__________________`
- IT Security Lead: `__________________`

> Tanda tangan/approval memperjelas akuntabilitas. Di sektor regulated seperti healthcare, ini bukan formalitas.
