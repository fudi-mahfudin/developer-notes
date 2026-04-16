# Contoh PRD Healthcare (Dengan Penjelasan Belajar)

## 1. Ringkasan Produk

**Nama Produk**: MedCare Connect  
**Masalah Utama**: pendaftaran manual lambat, no-show tinggi, beban admin tinggi.  
**Solusi Produk**: aplikasi web/mobile untuk booking dokter, reminder otomatis, dan telekonsultasi.

> PRD fokus ke kebutuhan produk dan perilaku user, bukan ke detail implementasi backend.

## 2. Tujuan Produk

- Meningkatkan konversi booking online ke 80% dalam 6 bulan.
- Menurunkan no-show appointment dari 28% menjadi 12%.
- Meningkatkan completion rate telekonsultasi ke >90%.

> Tujuan produk harus terukur agar roadmap tidak jadi daftar fitur tanpa dampak.

## 3. Persona Pengguna

- **Pasien**: ingin booking cepat, reminder jelas, antrean transparan.
- **Dokter**: butuh jadwal rapi, notifikasi tepat waktu, data pasien ringkas.
- **Admin Klinik/RS**: butuh dashboard antrean dan validasi data cepat.

> Persona membantu tim memahami konteks nyata saat memutuskan prioritas fitur.

## 4. User Story Utama

1. Sebagai pasien, saya ingin melihat slot dokter real-time agar bisa booking tanpa telepon.
2. Sebagai pasien, saya ingin menerima reminder otomatis agar tidak lupa jadwal.
3. Sebagai dokter, saya ingin melihat jadwal harian agar sesi konsultasi tertib.
4. Sebagai admin, saya ingin memonitor no-show agar bisa melakukan follow-up.

> User story menjelaskan nilai untuk user. Format sederhana ini cukup sebelum masuk AC detail.

## 5. Fitur dan Prioritas

### P0 (Wajib Fase 1)

- Registrasi/login pasien.
- Pencarian dokter dan slot.
- Booking appointment.
- Reminder otomatis H-24 jam dan H-2 jam.

### P1 (Fase 2)

- Telekonsultasi.
- Reschedule/cancel dengan alasan.
- Dashboard operasional admin.

### P2 (Fase 3)

- Rekomendasi jadwal terbaik.
- Insight prediksi no-show.

> Prioritas mencegah tim mengerjakan fitur "menarik" tapi tidak kritis untuk outcome bisnis.

## 6. Acceptance Criteria (Contoh)

### Fitur: Booking Appointment

- Pengguna dapat memilih dokter, tanggal, dan jam.
- Slot yang sudah terisi tidak bisa dipilih user lain.
- Sistem mengirim konfirmasi maksimal 1 menit setelah booking.
- Jika booking gagal, user mendapat pesan error yang jelas.

> Acceptance criteria harus bisa diuji QA tanpa tafsir ganda.

## 7. Metrik Keberhasilan Produk

- Booking Success Rate.
- Reminder Delivery Rate.
- No-Show Rate.
- Task Completion Time (booking sampai selesai).

> Metrik produk harus langsung berkaitan dengan perilaku user, bukan vanity metrics.

## 8. Non-Goals

- Tidak membangun modul rawat inap.
- Tidak mengelola klaim asuransi di fase awal.

> Non-goals penting untuk mengunci ekspektasi stakeholder.
