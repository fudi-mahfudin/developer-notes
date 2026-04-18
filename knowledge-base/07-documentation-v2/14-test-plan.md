# Test Plan

Panduan ini menjelaskan **apa itu test plan**, **isi standar**, **perbedaan dengan test case**, **peran dalam regulasi healthcare**, serta **kesalahan umum** yang membuat rencana uji tidak dapat dieksekusi tim QA.

---

## 1. Definisi singkat

**Test plan** adalah dokumen yang menjelaskan **strategi dan ruang lingkup pengujian** untuk suatu rilis, proyek, atau iterasi: tujuan, fitur dalam/out scope, lingkungan, data uji, peran, jadwal, risiko, metrik keluaran, dan kriteria masuk/keluar.

Test plan menjawab **“bagaimana dan mengapa kita menguji”**, bukan setiap langkah klik individual (itu test case).

---

## 2. Tujuan utama

1. Menyelaraskan **tim QA, dev, PM** tentang apa yang harus diverifikasi sebelum rilis.
2. Mengidentifikasi **risiko pengujian** (data PHI, integrasi vendor) lebih awal.
3. Menyediakan dasar **audit** di industri terregulasi.
4. Menjembatani ekspektasi **coverage** vs waktu yang tersedia.

---

## 3. Audiens

| Peran | Manfaat |
|--------|---------|
| QA lead | Menyusun jadwal dan alokasi orang. |
| Developer | Mengetahui area yang akan digempur regresi. |
| PM | Trade-off scope jika waktu slip. |
| Compliance | Bukti perencanaan verifikasi terkontrol. |

---

## 4. Isi tipikal test plan

1. **Identifikasi** — nama proyek/versi, referensi requirement (PRD/SRS).
2. **Lingkup** — fitur yang diuji vs tidak (eksplisit).
3. **Tujuan pengujian** — misalnya memverifikasi AC modul rujukan.
4. **Strategi** — piramida tes (unit/integration/E2E), otomasi vs manual.
5. **Lingkungan** — staging, data sintetis, akun peran.
6. **Kriteria masuk** — build stabil, smoke hijau.
7. **Kriteria keluar** — seluruh kasus kritis Pass, defect terbuka sesuai kebijakan.
8. **Jadwal** — fase smoke, regresi, UAT overlap.
9. **Peran & tanggung jawab** — siapa eksekutor, siapa penandatangan.
10. **Risiko & mitigasi** — ketergantungan vendor, ketersediaan data de-identified.
11. **Metrik** — defect density, pass rate, coverage target jika ada.

---

## 5. Test plan vs test strategy

**Strategi organisasi** adalah dokumen payung untuk banyak produk; **test plan** spesifik pada rilis atau milestone. Jangan mencampur keduanya tanpa struktur.

---

## 6. Healthcare

Data uji harus **de-identified** atau sintetis sesuai kebijakan; skenario klinis harus direview **clinical safety** jika berdampak pada peringatan pasien.

---

## 7. Integrasi dengan RTM

Test plan merujuk requirement melalui **RTM**—memastikan tidak ada requirement Must yang tidak punya metode verifikasi.

---

## 8. Otomasi

Cantumkan **ciapa yang memelihara** suite otomatis dan **gate** pipeline yang harus hijau sebelum promosi ke staging.

---

## 9. Kesalahan umum

- Lingkup “uji semuanya” tanpa prioritas—menyebabkan kehabisan waktu pada fitur rendah risiko.
- Tidak ada **exit criteria** — endless testing.
- Data uji berisi PHI nyata tanpa kontrol.
- Jadwal tidak menyisakan buffer untuk defect kritis.

---

## 10. Persetujuan

Test plan material untuk rilis besar sering memerlukan **sign-off** QA lead dan PM sebelum eksekusi penuh dimulai.

---

## 11. Ringkasan

Test plan adalah **rencana operasi QA**: menjawab scope, risiko, dan definisi selesai pengujian. Developer sering merujuknya untuk mengetahui **kapan** mereka akan menerima gelombang bug terstruktur dan **area mana** yang menjadi fokus hardening pra-rilis.

---

## 12. Suspensi dan resume pengujian

Dokumentasikan kapan pengujian dihentikan sementara (misalnya build rusak) dan **siapa** yang mengotorisasi resume—menghindari laporan status ambigu di rapat status.

---

## 13. Bukti untuk validasi regulasi

Pada perangkat medis atau sistem yang diaudit ketat, test plan dapat menjadi **lampiran protokol validasi**. Cantumkan referensi ke versi prosedur organisasi (SOP QA-XX) agar peninjau eksternal dapat menelusuri rantai dokumen.

---

## 14. Pelajaran dari sprint sebelumnya

Sertakan **retro singkat** defect escape atau area yang kurang diliput pada rilis lalu sebagai input scope pengujian saat ini—menghindari pengulangan blind spot.
