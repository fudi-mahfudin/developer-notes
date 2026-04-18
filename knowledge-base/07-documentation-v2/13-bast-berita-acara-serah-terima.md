# BAST (Berita Acara Serah Terima)

Panduan ini menjelaskan **apa itu BAST** dalam konteks proyek TI dan layanan, **isi umum**, **perbedaan dengan acceptance form internal**, **pemakai**, serta **tip legal/operasional** di lingkungan enterprise—termasuk healthcare.

---

## 1. Definisi singkat

**BAST (Berita Acara Serah Terima)** adalah dokumen formal yang mencatat **penyerahan hasil pekerjaan atau deliverable** dari satu pihak ke pihak lain, biasanya dari **vendor/kontraktor** ke **pemesanan**, atau dari **tim proyek** ke **unit operasional**, dengan pernyataan bahwa objek yang diserahterimakan telah diuji/diterima sesuai ketentuan kontrak atau ruang lingkup yang disepakati.

Dalam konteks software, objek sering berupa **modul aplikasi**, **lingkungan produksi**, **dokumentasi**, atau **hak lisensi**.

---

## 2. Mengapa BAST penting

- Menandai **milestone pembayaran** atau penutupan fase kontrak.
- Menjadi **bukti hukum** bahwa risiko operasional beralih ke penerima setelah tanggal tertentu.
- Mengurangi perselisihan tentang **apa** yang termasuk dalam delivery.

---

## 3. Isi tipikal BAST proyek TI

1. **Judul dan nomor dokumen** — referensi kontrak/perjanjian.
2. **Para pihak** — nama badan, alamat, penandatangan berwenang.
3. **Objek serah terima** — daftar deliverable (modul, URL, versi).
4. **Lokasi dan tanggal** serah terima.
5. **Pernyataan pengujian / acceptance** — menyatakan telah memenuhi persyaratan atau dengan daftar pengecualian.
6. **Catatan kekurangan** — item yang disetujui ditindaklanjuti terpisah dengan jadwal.
7. **Tanda tangan** dan cap jika diperlukan.

---

## 4. BAST vs berita acara uji (BAT)

Organisasi kadang membedakan **uji fungsional** (BAT) dan **serah terima administrasi** (BAST). Software enterprise healthcare mungkin menambahkan **validasi regulasi** sebagai lampiran.

---

## 5. Kaitan dengan dokumentasi teknis

Lampiran BAST sering merujuk:

- daftar requirement yang diverifikasi (RTM ringkas),
- release notes versi deploy,
- dokumen runbook operasional.

---

## 6. Risiko dan mitigasi

- **Menandatangani sebelum UAT selesai** — menyerahkan risiko defect ke operasional; mitigasi: kriteria acceptance eksplisit.
- **Objek tidak spesifik** — menulis “sistem selesai” tanpa versi; mitigasi: nomor build dan checksum artefak.

---

## 7. Healthcare

Untuk sistem yang memproses data kesehatan, BAST dapat disertai **pernyataan kepatuhan** terhadap kebijakan internal dan daftar kontrol yang telah diverifikasi—detail hukum ditangani legal.

---

## 8. Kesalahan umum

- Versi bahasa Inggris/Indonesia tidak konsisten dalam kontrak internasional.
- Tidak ada lampiran daftar defect yang diizinkan tertunda.
- Penandatangan tidak berwenang secara organisasi.

---

## 9. Penyimpanan

Simpan BAST bersama kontrak dalam **repositori dokumen resmi** dengan klasifikasi akses; audit eksternal dapat meminta bukti fisik/digital.

---

## 10. Ringkasan

BAST adalah **momen transfer tanggung jawab** dari proyek ke operasional atau dari vendor ke klien. Developer jarang menulisnya setiap minggu, tetapi dokumen ini menjadi **referensi hukum dan keuangan** ketika delivery besar selesai—maka termasuk dokumen penting dalam siklus hidup enterprise.

---

## 11. Lampiran teknis yang umum

Lampirkan **checksum artefak** (SHA256), **hash konfigurasi**, atau **screenshot versi** pada sistem produksi jika disyaratkan kontrak. Untuk software healthcare, lampiran dapat mencakup **hasil scan keamanan** atau **ringkasan temuan kritis** yang telah ditutup.

---

## 12. Jadwal remediasi follow-up

Jika BAST mengizinkan pekerjaan tersisa, definisikan **SLA remediasi** dan pemicu eskalasi—menghindari interpretasi “nanti” yang tidak terukur.

---

## 13. Koordinasi multi-site

Untuk organisasi rumah sakit dengan banyak cabang, cantumkan **lingkup site** yang diserahterimakan pada fase ini agar tidak terjadi ambiguitas cakupan izin operasional per lokasi.

---

## 14. Lampiran checklist administrasi

Sertakan daftar dokumen pendukung yang diserahkan bersamaan (lisensi perangkat lunak, skrip pelatihan, akun layanan integrasi)—menghindari perselisihan “apa yang termasuk paket?” saat pembayaran milestone.

---

## 15. Bahasa ganda

Jika kontrak bilingual, sediakan versi terjemahan resmi dengan referensi silang nomor pasal—menghindari interpretasi berbeda pada istilah teknis “deliverable”.
