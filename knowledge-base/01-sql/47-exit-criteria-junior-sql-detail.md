# SQL Exit Criteria Junior - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- standar minimum skill SQL level junior
- indikator bahwa seseorang siap naik dari dasar
- apa yang harus benar-benar bisa dilakukan

Banyak orang merasa "sudah bisa SQL"
padahal baru bisa menyalin query sederhana.
Exit criteria ini memaksa standar yang lebih jujur.

---

## 1. Apa Itu Exit Criteria Junior?

Exit criteria junior adalah batas minimal
yang menunjukkan seseorang:
- tidak lagi sekadar mengenal syntax,
- tapi sudah bisa memakai SQL dengan aman untuk pekerjaan nyata level dasar.

Artinya:
- belum senior,
- tapi juga bukan pemula yang berbahaya.

---

## 2. Fokus Level Junior

Level junior harus kuat di:
- fondasi syntax
- membaca data dengan benar
- write sederhana dengan aman
- memahami relasi dasar
- menghindari kesalahan fatal umum

Kalau fondasi ini belum kuat,
naik ke topik lanjut hanya akan membuat kebingungan makin mahal.

---

## 3. Basic Query Harus Otomatis

Junior yang lulus harus bisa tanpa ragu:
- `SELECT`
- `FROM`
- `WHERE`
- `ORDER BY`
- `LIMIT`
- `DISTINCT`

Bukan sekadar hafal.
Tapi tahu kapan dan kenapa dipakai.

Kalau query dasar masih sering ngawur,
belum lulus.

---

## 4. JOIN Dasar Harus Benar

Harus paham:
- `INNER JOIN`
- `LEFT JOIN`
- join key yang benar
- bahaya duplicate dari one-to-many

Minimal bisa:
- gabungkan 2-3 tabel sederhana
- sadar kenapa hasil berlipat
- tidak asal tambal dengan `DISTINCT`

Jika join masih asal cocok-cocokan ID,
skill belum aman.

---

## 5. Agregasi Dasar Harus Dipahami

Junior harus bisa:
- `COUNT`
- `SUM`
- `AVG`
- `GROUP BY`
- `HAVING`
- `COUNT(DISTINCT ...)`

Dan yang lebih penting:
- tahu kapan denominator benar,
- tahu `WHERE` berbeda dengan `HAVING`.

Banyak junior kelihatan bisa,
tapi salah hasil agregasi.
Itu belum lulus.

---

## 6. NULL Handling Wajib Benar

Harus paham:
- `NULL` bukan `''`
- `NULL` bukan `0`
- pakai `IS NULL` / `IS NOT NULL`
- `COUNT(column)` mengabaikan `NULL`

Kalau `NULL` masih sering diperlakukan sembarangan,
query produksi akan penuh bug diam-diam.

---

## 7. DML Aman Dasar

Junior harus bisa:
- `INSERT`
- `UPDATE`
- `DELETE`

Tapi dengan disiplin:
- sadar risiko tanpa `WHERE`
- cek target data dulu
- mengerti kapan harus hati-hati di production

Kalau masih punya kebiasaan update/delete tanpa verifikasi,
belum boleh dipercaya.

---

## 8. Constraint dan Integritas Dasar

Minimal paham:
- PK
- FK
- UNIQUE
- NOT NULL

Tidak harus jadi pakar desain schema,
tapi harus tahu constraint ini bukan aksesoris.

Junior yang sehat tahu:
- data integrity dijaga di DB, bukan cuma di aplikasi.

---

## 9. Query Verification

Ini sering membedakan junior aman dan junior berbahaya.

Junior yang lulus harus:
- memeriksa sample hasil
- mengecek row count masuk akal
- sadar grain dasar query
- tidak puas hanya karena query return hasil

Kalau hasil tidak diverifikasi,
kesalahan logika mudah lolos.

---

## 10. Kebiasaan Aman Dasar

Junior yang sehat:
- menghindari `SELECT *` tanpa alasan
- tidak menjalankan write query sembarangan
- bertanya saat grain hasil tidak jelas
- tahu kapan perlu bantuan/review

Junior yang merasa paling tahu
justru sering paling berbahaya.

---

## 11. Error Awareness

Junior harus tahu pola kesalahan umum:
- join key salah
- duplicate row akibat one-to-many
- `NULL` salah tangani
- `WHERE` yang hilang
- agregasi salah denominator

Penting bukan hanya tahu teori,
tapi mulai sadar saat sedang membuat kesalahan seperti ini.

---

## 12. Debugging Dasar

Junior tidak harus menyelesaikan semua misteri data.

Tapi harus bisa:
- memecah query jadi tahap lebih kecil
- pakai CTE/subquery sederhana bila perlu
- cari kenapa hasil count tidak sesuai
- cek data input sebelum menyalahkan sistem lain

Kalau debugging masih buntu total di query sederhana,
belum lulus.

---

## 13. Security Awareness Dasar

Minimal harus paham:
- jangan bangun query dengan string concatenation dari input user
- gunakan parameterized query
- jangan ambil data sensitif tanpa alasan

Junior tidak harus jadi security expert.
Tapi harus berhenti melakukan kesalahan dasar.

---

## 14. Performance Awareness Dasar

Junior belum harus jadi optimizer kelas berat.

Tapi minimal sadar:
- query besar bisa mahal
- `SELECT *` dan filter buruk ada biayanya
- index itu penting
- `EXPLAIN` itu ada untuk alasan

Kalau tidak ada awareness sama sekali,
kode yang ditulis akan memberatkan tim lain.

---

## 15. Communication dan Reviewability

Junior yang baik:
- menulis query rapi
- pakai alias jelas
- menjelaskan maksud query
- tidak defensif saat query dikoreksi

Skill SQL bukan hanya soal menulis.
Tapi juga membuat query bisa dipahami dan direview.

---

## 16. Contoh Tugas yang Harus Mampu Diselesaikan

Contoh:
- cari daftar appointment hari ini per dokter
- hitung jumlah pasien aktif per klinik
- cari pasien tanpa nomor telepon
- cari appointment yang belum punya reminder job
- update status record tertentu dengan aman

Kalau tugas seperti ini masih kacau,
fondasinya belum cukup.

---

## 17. Apa yang Belum Wajib di Junior?

Belum wajib sangat kuat di:
- window function kompleks
- query plan mendalam
- partitioning
- replication trade-off
- distributed consistency

Boleh mulai kenal,
tapi tidak harus matang penuh untuk lolos level junior.

---

## 18. Anti-Pattern Junior yang Harus Dihentikan

1. `SELECT *` di mana-mana.
2. `DISTINCT` untuk nutup query salah.
3. Join tanpa paham grain.
4. Update/delete tanpa seleksi target jelas.
5. Merasa query benar hanya karena "hasil keluar".

Kalau ini masih dominan,
belum lulus.

---

## 19. Best Practices untuk Naik dari Junior

- biasakan verifikasi hasil query.
- review query orang lain.
- tulis query bertahap.
- latih dasar sampai otomatis.
- mulai biasakan membaca `EXPLAIN`.

Kenaikan level datang dari disiplin kecil yang konsisten.

---

## 20. Mini Latihan

Latihan:
1. Sebutkan 10 hal yang wajib dikuasai junior.
2. Jelaskan 3 kesalahan paling berbahaya di level junior.
3. Buat contoh query agregasi sederhana yang benar.
4. Buat contoh query join yang rawan duplicate.
5. Jelaskan apa yang membedakan junior aman dan junior berbahaya.

---

## 21. Jawaban Contoh Ringkas

Junior aman:
- tahu batasnya,
- teliti,
- verifikasi hasil,
- tidak sembrono write query,
- mau direview.

Junior berbahaya:
- cepat menulis,
- lambat berpikir,
- yakin query benar tanpa pembuktian.

---

## 22. Checklist Kelulusan Topik 47

Kamu dianggap lulus jika bisa:
- menjalankan query dasar dengan benar,
- join dan agregasi tanpa salah logika fatal,
- write data dengan disiplin dasar,
- menangani `NULL` dan constraint dengan benar,
- menunjukkan kebiasaan aman dan bisa direview.

---

## 23. Ringkasan Brutal

- Junior yang baik tidak harus jenius.
- Tapi harus aman.
- Kalau query dasar saja masih ceroboh,
  kamu belum siap diberi kepercayaan lebih.
