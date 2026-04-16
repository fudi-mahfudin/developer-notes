# SQL Time-Series Aggregation dan Timezone Handling - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- agregasi data berbasis waktu
- bucket harian/mingguan/bulanan
- timezone handling
- kesalahan umum pada analisis waktu
- desain query time-series yang benar

Kalau kamu salah menangani waktu,
angka dashboard bisa salah
meski query terlihat masuk akal.

---

## 1. Kenapa Waktu Itu Rumit?

Karena waktu bukan cuma angka timestamp.

Masalah yang sering muncul:
- timezone berbeda
- daylight saving
- boundary hari/bulan
- data event terlambat masuk
- local business time vs UTC storage

Kalau ini tidak dipahami,
reporting waktu cepat rusak.

---

## 2. Penyimpanan Waktu

Prinsip umum yang sehat:
- simpan event time secara konsisten
- banyak sistem memilih UTC untuk penyimpanan

Lalu:
- konversi ke timezone bisnis saat dibutuhkan untuk tampilan/analisis

Yang penting:
- konsistensi
- dokumentasi

---

## 3. Business Time vs Storage Time

Storage time:
- bagaimana timestamp disimpan di database

Business time:
- zona waktu yang dipakai untuk interpretasi operasional

Contoh:
- DB simpan UTC
- klinik beroperasi di WIB

Laporan "hari ini" untuk operasional klinik
harus mengikuti WIB,
bukan semata UTC.

---

## 4. Time Bucket

Agregasi time-series biasanya butuh bucket:
- per jam
- per hari
- per minggu
- per bulan

Pertanyaan penting:
- bucket ini berdasarkan timezone apa?

Kalau tidak eksplisit,
angka bisa bergeser di boundary.

---

## 5. DATE_TRUNC dan Konsep Bucket

Fungsi seperti `DATE_TRUNC` sering dipakai
untuk membentuk bucket waktu.

Tapi ingat:
- hasil bucket harus selaras dengan timezone analisis.

Kalau `DATE_TRUNC` dilakukan pada UTC
padahal bisnis butuh WIB,
angka harian bisa salah.

---

## 6. Daily Report yang Sering Salah

Kesalahan umum:
- laporan "hari ini" memakai UTC murni

Padahal user operasional berada di:
- WIB
- WITA
- WIT

Hasil:
- event jam dini hari lokal
  bisa masuk hari yang salah.

Ini sering terjadi dan sering luput.

---

## 7. Weekly dan Monthly Boundary

Tidak semua organisasi menganggap minggu dimulai hari yang sama.

Pertanyaan:
- minggu mulai Senin atau Minggu?
- bulan operasional sama dengan bulan kalender?

Jangan mengasumsikan definisi waktu universal.
Bisnis sering punya definisi sendiri.

---

## 8. Event Time vs Processing Time

Bedakan:
- event time: kapan kejadian sebenarnya terjadi
- processing time: kapan event diproses/masuk sistem

Untuk analisis perilaku,
sering event time lebih penting.

Kalau kamu pakai processing time tanpa sadar,
tren bisa bias.

---

## 9. Late Arriving Data

Kadang event datang terlambat:
- sync tertunda
- jaringan bermasalah
- batch upload belakangan

Akibat:
- laporan hari kemarin bisa berubah hari ini

Tim analytics harus sadar:
- apakah dashboard final atau near-real-time?
- apakah ada data reconciliation window?

---

## 10. Timezone Conversion Pitfall

Konversi timezone yang salah bisa menyebabkan:
- duplikasi bucket
- kehilangan event
- event masuk ke hari salah
- mismatch antar dashboard

Prinsip:
- definisikan timezone bisnis secara eksplisit
- gunakan konversi konsisten di semua query/report

---

## 11. Healthcare Example

Kasus:
- dashboard klinik menampilkan total appointment harian
- server menyimpan semua timestamp di UTC
- klinik beroperasi di WIB

Jika query harian langsung bucket UTC:
- appointment jam 00:30 WIB
  bisa jatuh ke hari sebelumnya

Secara operasional itu salah.

---

## 12. Interval Query yang Aman

Daripada:
- memotong tanggal secara naif,

sering lebih aman:
- tentukan boundary awal dan akhir bucket
  di timezone bisnis,
- lalu ubah ke storage timezone jika perlu.

Ini membantu menjaga akurasi.

---

## 13. DST Awareness

Kalau produk lintas negara,
daylight saving time bisa mengubah durasi hari.

Hari tidak selalu 24 jam.

Kalau tim tidak sadar,
analisis per jam/per hari bisa bias.

Jika domain regional tidak kena DST,
bagus.
Tapi jangan lupa kemungkinan ekspansi global.

---

## 14. Gap Filling

Time-series chart sering butuh menampilkan bucket kosong.

Contoh:
- tidak ada appointment pada jam tertentu
- tapi chart tetap perlu menampilkan nilai 0

Gap filling penting untuk visualisasi dan analisis stabil.

Kalau tidak,
chart bisa menipu atau sulit dibaca.

---

## 15. Rolling Window

Analisis waktu sering bukan hanya bucket statis,
tapi juga rolling window:
- 7-day rolling average
- 30-day moving count

Ini berguna untuk:
- smoothing
- deteksi tren
- mengurangi noise harian

Window function sering dipakai di sini.

---

## 16. Seasonality Awareness

Tren waktu dipengaruhi:
- hari kerja vs akhir pekan
- jam sibuk klinik
- akhir bulan
- libur nasional

Kalau kamu hanya lihat angka mentah tanpa konteks musiman,
interpretasinya bisa salah.

Date dimension sering membantu di sini.

---

## 17. Aggregation Grain Harus Konsisten

Jangan campur:
- timestamp event mentah
- bucket harian
- bucket bulanan

tanpa sadar perubahan grain.

Contoh salah:
- menghitung average dari average harian
  lalu menganggap itu sama dengan average bulanan global.

Tidak selalu benar.

---

## 18. Query Performance untuk Time-Series

Time-series query sering berat karena:
- rentang waktu panjang
- agregasi besar
- sorting
- gap filling

Optimasi umum:
- filter rentang waktu jelas
- index sesuai timestamp + filter lain
- pre-aggregation jika perlu
- archive data lama dengan strategi sehat

---

## 19. Anti-Pattern Umum

1. Menganggap UTC bucket sama dengan local business day.
2. Tidak mendefinisikan timezone report.
3. Tidak memikirkan late-arriving data.
4. Menggunakan `DATE()` naif pada kolom timestamp besar tanpa strategi.
5. Mencampur event time dan processing time.

---

## 20. Best Practices

- simpan waktu secara konsisten.
- definisikan timezone bisnis per report.
- gunakan boundary waktu eksplisit.
- dokumentasikan grain dan definisi bucket.
- validasi hasil pada boundary hari/minggu/bulan.

---

## 21. Mini Latihan

Latihan:
1. Jelaskan beda storage time dan business time.
2. Buat contoh masalah harian jika UTC dipakai mentah untuk klinik WIB.
3. Jelaskan beda event time dan processing time.
4. Sebutkan 3 sumber error umum pada time-series query.
5. Jelaskan kenapa gap filling penting pada chart.

---

## 22. Jawaban Contoh Ringkas

Storage time:
- timestamp yang disimpan DB.

Business time:
- zona waktu yang dipakai untuk interpretasi operasional.

Gap filling penting karena:
- bucket tanpa data tetap harus terlihat sebagai 0,
- bukan hilang dari grafik.

---

## 23. Checklist Kelulusan Topik 35

Kamu dianggap lulus jika bisa:
- menjelaskan bucket waktu dan timezone dengan benar,
- membedakan event time vs processing time,
- menghindari kesalahan boundary harian/bulanan,
- mendesain query time-series yang relevan dengan konteks bisnis,
- memahami bahwa waktu adalah domain yang harus diperlakukan serius.

---

## 24. Ringkasan Brutal

- Waktu adalah salah satu sumber bug analytics paling licik.
- Kalau timezone dan bucket tidak jelas,
  dashboard kamu cuma tampil meyakinkan, bukan benar.
