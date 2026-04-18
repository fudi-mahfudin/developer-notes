# #58 — Konversi “local midnight” untuk recurring appointment salah hari

**Indeks:** [`README.md`](./README.md) · **ID:** `#58` · **Kategori:** Runtime Node.js & waktu

---

## Ringkasan

Menjadwalkan kunjungan berulang dengan mengambil **tanggal kalender lokal** lalu mengonversi ke UTC secara naif bisa menggeser ke **hari sebelumnya atau sesudahnya** bagi pengguna di zona tertentu. Kesalahan “local midnight” mempengaruhi pola mingguan terapi atau kontrol kehamilan.

---

## Mitigasi ideal (~60 detik)

“Bangun **DateTime** di zona pasien, set jam sesuai jadwal lokal, lalu konversi ke UTC instant untuk penyimpanan—jangan mulai dari UTC midnight. Untuk pola mingguan, simpan aturan RRULE dengan zona IANA. Uji lintas zona dan DST. Komunikasikan kepada pengguna zona referensi jadwal.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Anchor local:** titik acuan jam di zona pengguna.
- **Calendar shift bug:** offset memindahkan hari kalender.

---

## Mengapa pola ini sangat umum di healthcare

1. Telemedicine lintas zona.
2. Normalisasi ke UTC midnight yang salah.
3. UI date picker mengirim tanggal tanpa waktu.

---

## Pola gagal (ilustrasi)

`new Date(`${date}T00:00:00Z`)` padahal maksudnya tengah malam lokal Tokyo.

---

## Gejala di production

- Appointment recurring muncul hari lain untuk subset pasien internasional.

---

## Diagnosis

1. Bandingkan instant UTC vs wall clock pasien untuk contoh bermasalah.
2. Periksa urutan konversi zona dalam kode.

---

## Mitigasi yang disarankan

1. Gunakan Luxon untuk konstruksi local→UTC.
2. Simpan zona pengguna pada profil.
3. Tampilkan preview jadwal dalam zona pasien sebelum simpan.

---

## Trade-off dan risiko

- Menyimpan zona salah pada profil menyebarkan error—validasi onboarding.

---

## Aspek khusus healthcare

- Program TB atau HIV dengan jadwal mingguan sangat sensitif terhadap shift hari.

---

## Checklist review PR

- [ ] Fitur recurring tidak memakai UTC midnight sebagai shortcut.

---

## Kata kunci untuk pencarian

`recurring schedule`, `RRULE`, `local midnight`, `timezone`

---

## Catatan tambahan operasional

Simpan **timezone database version** jika menggunakan library yang dapat berubah aturan politik waktu negara.

Uji skenario **pasien bepergian** yang mengubah zona ponsel—pastikan UI tidak menggeser jadwal rawat inap tanpa konfirmasi.

Pastikan **notifikasi pengingat** menggunakan zona pasien, bukan zona server pengirim pesan.

Uji **perubahan zona pasien** pada profil untuk memastikan jadwal tidak bergeser diam-diam.

---

## Referensi internal

- [`README.md`](./README.md) · **#57**, **#59**.
