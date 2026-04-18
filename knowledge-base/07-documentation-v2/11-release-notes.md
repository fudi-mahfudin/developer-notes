# Release Notes

Panduan ini menjelaskan **apa itu release notes**, **audiens**, **isi yang berkualitas**, **hubungannya dengan changelog**, serta **kesalahan** yang membuat catatan rilis tidak membantu pengguna atau tim internal.

---

## 1. Definisi singkat

**Release notes** adalah komunikasi **berorientasi manusia** tentang apa yang berubah dalam sebuah rilis produk perangkat lunak: fitur baru, peningkatan, perbaikan bug penting, breaking changes, tugas migrasi, dan kadang ancaman keamanan yang telah diperbaiki.

Berbeda dengan changelog mesin-oriented, release notes menjawab **“apa yang perlu saya lakukan sebagai pengguna atau operator?”**.

---

## 2. Audiens utama

| Audiens | Kebutuhan |
|---------|-----------|
| **Pengguna akhir / klinisi** | Bahasa simpel; dampak pada alur kerja sehari-hari. |
| **Admin IT rumah sakit** | tugas konfigurasi, downtime, kompatibilitas integrasi. |
| **Partner integrasi** | endpoint deprecated, header baru, jendela maintenance. |
| **Support internal** | ringkasan defect penting yang hilang untuk menjawab tiket. |

Sering ada dua lapisan: **catatan pelanggan** dan **catatan internal teknis**.

---

## 3. Isi yang disarankan

1. **Ringkasan eksekutif** satu paragraf tentang tema rilis.
2. **Highlights** — 3–5 bullet nilai utama.
3. **Fitur baru** — dengan konteks manfaat, bukan hanya nama internal.
4. **Perbaikan** — bug yang memengaruhi banyak pengguna atau keselamatan.
5. **Breaking changes** — dengan langkah mitigasi eksplisit.
6. **Known issues** — defect yang belum diperbaiki tetapi telah dikenal.
7. **Upgrade notes** — migrasi skema, flag fitur, urutan deploy layanan.
8. **Keamanan** — CVE yang relevan (tanpa membocorkan kerentanan yang belum dipatch di cabang lama jika masih riskan).

---

## 4. Release notes vs changelog

- **Changelog** sering mengikuti format Keep a Changelog dengan kategori Added/Changed/Fixed—baik untuk repo library.
- **Release notes** menambahkan **narasi**, **prioritisasi**, dan **panduan upgrade** untuk sistem enterprise.

Keduanya dapat dipublikasikan bersamaan dengan tautan silang.

---

## 5. Frekuensi dan versi

Selaras dengan **semantic versioning** produk atau **train release** bulanan. Untuk healthcare, **patch keamanan** dapat keluar di luar jadwal dengan release notes terpisah.

---

## 6. Proses penyusunan

1. Kumpulkan item dari tiket Jira dengan label `release-note`.
2. Tulis ulang bahasa pengguna dengan review PM.
3. Verifikasi teknis dengan engineering untuk breaking changes.
4. Terjemahkan jika multi-bahasa disyaratkan kontrak.

---

## 7. Gaya penulisan

- Gunakan **kata aktif** dan kalimat pendek.
- Hindari jargon internal (`referral-svc`) di catatan pengguna—ganti dengan nama fitur UI.
- Cantumkan **screenshot** atau link ke tutorial ringkas jika UI berubah material.

---

## 8. Kesalahan umum

- Hanya menyalin daftar commit — tidak dapat dibaca pengguna.
- Menyembunyikan breaking change di tengah paragraf panjang.
- Tidak menyebut **known issue** yang akan membanjiri support.
- Versi dokumen tidak cocok dengan artefak deploy.

---

## 9. Distribusi

Portal pelanggan, email rilis, banner in-app, Slack channel partner. Pastikan **tanggal efektif** dan **zona waktu maintenance** jelas.

---

## 10. Ringkasan

Release notes adalah **antara muka komunikasi** antara tim pengiriman dan dunia luar. Developer internal juga membacanya untuk memahami **perilaku yang diharapkan** setelah deploy—maka dokumen ini termasuk yang sering dirujuk saat debugging “apakah ini bug atau perubahan sengaja?”.

---

## 11. Pelokalan dan aksesibilitas

Jika release notes diterjemahkan, sediakan **glosarium istilah medis** konsisten antar bahasa dan hindari auto-translate mentah pada prosedur operasi. Dokumen yang sulit dipahami oleh admin rumah sakit meningkatkan risiko kesalahan konfigurasi pasca-rilis.

---

## 12. Bukti untuk audit

Untuk beberapa regulasi, release notes menjadi **bukti komunikasi perubahan** ke pengguna internal. Simpan arsip PDF/HTML versi dengan nomor build yang tidak dapat diubah retroaktif di sistem dokumen resmi.
