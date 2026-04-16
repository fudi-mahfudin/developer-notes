# Contoh SRS Healthcare (Dengan Penjelasan Belajar)

## 1. Pendahuluan

Dokumen ini mendefinisikan spesifikasi kebutuhan sistem MedCare Connect untuk modul registrasi, appointment, reminder, dan telekonsultasi.

> SRS lebih formal dari PRD. Tujuannya jadi referensi tunggal untuk dev, QA, dan auditor.

## 2. Ruang Lingkup Sistem

- Sistem web untuk pasien, dokter, dan admin.
- Integrasi notifikasi (SMS/WhatsApp/email).
- Integrasi video service untuk telekonsultasi.

> Scope sistem harus konsisten dengan BRD/PRD agar tidak terjadi konflik requirement.

## 3. Definisi Pengguna

- `Patient`
- `Doctor`
- `Admin`
- `Supervisor`

> Definisi role di awal menghindari salah tafsir hak akses di requirement berikutnya.

## 4. Functional Requirements

### FR-01 Registrasi Pasien
- Sistem harus memungkinkan pasien membuat akun dengan nomor ponsel dan OTP.

### FR-02 Login
- Sistem harus mendukung login dengan OTP dan session timeout 30 menit tidak aktif.

### FR-03 Booking Appointment
- Sistem harus menampilkan slot dokter yang masih tersedia secara real-time.

### FR-04 Reminder
- Sistem harus mengirim reminder otomatis H-24 jam dan H-2 jam.

### FR-05 Telekonsultasi
- Sistem harus menghasilkan tautan sesi telekonsultasi untuk appointment valid.

> Format FR-ID memudahkan traceability ke test case dan defect.

## 5. Non-Functional Requirements

- NFR-01 Availability minimum 99.5% per bulan.
- NFR-02 Respon API utama <3 detik untuk 95 persentil.
- NFR-03 Data pasien dienkripsi saat transit dan saat tersimpan.
- NFR-04 Audit log aktivitas kritikal minimal 2 tahun.

> NFR wajib eksplisit. Banyak kegagalan produksi terjadi karena NFR tidak ditulis sejak awal.

## 6. Business Rules

- BR-01 Pasien hanya bisa memiliki 1 appointment aktif per dokter pada waktu yang sama.
- BR-02 Pembatalan kurang dari 1 jam sebelum jadwal ditandai late cancel.
- BR-03 Dokter hanya dapat melihat data pasien yang punya appointment aktif dengannya.

> Business rule adalah kebijakan domain; biasanya sumber konflik utama jika tidak terdokumentasi.

## 7. Constraint

- Harus mematuhi kebijakan perlindungan data kesehatan internal.
- Harus kompatibel dengan browser modern 2 versi terakhir.

> Constraint adalah batasan non-negotiable yang mempengaruhi desain teknis.
