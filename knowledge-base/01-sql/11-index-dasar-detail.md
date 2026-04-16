# SQL Index Dasar - Penjelasan Detail

## Tujuan Topik

Topik ini membahas fondasi index:
- apa itu index
- kenapa index mempercepat query
- single index
- composite index
- kapan index membantu
- kapan index justru membebani

Kalau kamu belum paham index, kamu akan:
- menebak-nebak performa,
- menambah index sembarangan,
- atau lebih buruk: tidak sadar query lambat karena full scan.

---

## 1. Apa Itu Index?

Index adalah struktur data tambahan
yang membantu database menemukan baris lebih cepat
tanpa harus membaca seluruh tabel.

Analogi sederhana:
- tabel = isi buku
- index = daftar isi / indeks di belakang buku

Tanpa index:
- database sering harus scan banyak baris.

Dengan index:
- database bisa lompat ke bagian yang relevan.

---

## 2. Kenapa Index Penting?

Index penting karena query nyata sering melakukan:
- filter (`WHERE`)
- join (`ON`)
- sorting (`ORDER BY`)
- uniqueness check

Contoh query:

```sql
SELECT id, full_name
FROM patients
WHERE phone_number = '+628123456789';
```

Jika tabel `patients` berisi jutaan baris,
index di `phone_number` bisa mengurangi kerja database secara signifikan.

---

## 3. Trade-off Index

Index bukan gratis.

Keuntungan:
- read lebih cepat
- filter dan join lebih efisien
- beberapa sort bisa lebih murah

Kerugian:
- insert/update/delete bisa lebih lambat
- storage bertambah
- maintenance/statistics lebih kompleks

Prinsip:
- index dibuat untuk pola query nyata,
- bukan untuk semua kolom.

---

## 4. Single-Column Index

Single index = index pada satu kolom.

Contoh:

```sql
CREATE INDEX idx_patients_phone_number
ON patients(phone_number);
```

Cocok untuk:
- pencarian exact match
- filter sederhana
- foreign key lookup tertentu

Contoh query yang terbantu:

```sql
SELECT id, full_name
FROM patients
WHERE phone_number = '+628123456789';
```

---

## 5. Composite Index

Composite index = index pada lebih dari satu kolom.

Contoh:

```sql
CREATE INDEX idx_appointments_doctor_schedule
ON appointments(doctor_id, schedule_at);
```

Cocok untuk query seperti:

```sql
SELECT *
FROM appointments
WHERE doctor_id = 10
  AND schedule_at >= '2026-04-01';
```

Composite index sangat penting
karena query produksi jarang hanya filter satu kolom.

---

## 6. Urutan Kolom pada Composite Index

Ini krusial.

Index `(doctor_id, schedule_at)` berbeda dengan `(schedule_at, doctor_id)`.

Urutan kolom harus mengikuti pola query nyata.

Contoh:
- jika query paling sering filter `doctor_id` lalu `schedule_at`,
  maka `(doctor_id, schedule_at)` lebih masuk akal.

Prinsip umum:
- kolom filter utama yang paling sering dipakai biasanya diletakkan lebih depan.

---

## 7. Leftmost Prefix Principle

Pada banyak engine B-tree,
composite index bisa dipakai efektif dari prefix kiri.

Index:

```sql
(doctor_id, schedule_at, status)
```

Biasanya efektif untuk:
- `doctor_id`
- `doctor_id, schedule_at`
- `doctor_id, schedule_at, status`

Sering tidak optimal untuk:
- hanya `schedule_at`
- hanya `status`

Ini salah satu jebakan paling umum saat desain index.

---

## 8. Query yang Cocok untuk Index

Index biasanya berguna pada:
- equality lookup (`=`)
- range filter (`>`, `<`, `BETWEEN`)
- join condition
- order by tertentu

Contoh:

```sql
SELECT *
FROM appointments
WHERE doctor_id = 10
ORDER BY schedule_at DESC;
```

Kalau index cocok,
database mungkin bisa memanfaatkan index
untuk filter dan urutan sekaligus.

---

## 9. Query yang Kurang Cocok untuk Index

Index sering kurang membantu jika:
- tabel sangat kecil
- query mengambil sebagian besar baris
- kolom memiliki selektivitas sangat rendah
- query memakai fungsi yang mematikan index usage

Contoh kurang baik:

```sql
WHERE DATE(schedule_at) = '2026-04-16'
```

Lebih baik:

```sql
WHERE schedule_at >= '2026-04-16'
  AND schedule_at < '2026-04-17'
```

---

## 10. Selectivity

Selectivity = seberapa spesifik filter.

Kolom dengan nilai sangat beragam:
- biasanya lebih selektif,
- lebih potensial mendapat manfaat dari index.

Kolom dengan nilai sangat sedikit variasi:
- misalnya `is_active` hanya `true/false`,
- index kadang tidak terlalu membantu untuk query umum.

Artinya:
- jangan asal index semua kolom status/flag.

---

## 11. Index untuk JOIN

Join sering terbantu oleh index pada kolom relasi.

Contoh:

```sql
SELECT p.full_name, a.schedule_at
FROM patients p
JOIN appointments a
  ON p.id = a.patient_id;
```

Index yang relevan:
- PK pada `patients.id`
- index pada `appointments.patient_id`

Tanpa index join yang tepat,
biaya join bisa naik tajam di tabel besar.

---

## 12. Index untuk ORDER BY

Index juga bisa membantu sorting.

Contoh:

```sql
SELECT *
FROM appointments
WHERE doctor_id = 10
ORDER BY schedule_at DESC
LIMIT 20;
```

Index `(doctor_id, schedule_at)` bisa sangat berguna.

Pola ini umum pada:
- list terbaru
- recent activity
- dashboard operasional

---

## 13. Over-Indexing

Terlalu banyak index = masalah baru.

Dampaknya:
- write lebih lambat
- migration lebih berat
- storage membengkak
- optimizer punya lebih banyak opsi yang belum tentu bagus

Gejala over-indexing:
- banyak index mirip
- index dibuat tanpa query evidence
- tidak ada review setelah perubahan fitur

---

## 14. Duplicate / Redundant Index

Contoh:
- punya index `(doctor_id, schedule_at)`
- lalu tambah lagi index `(doctor_id)`

Kadang index kedua menjadi redundant,
tergantung engine dan pola query.

Senior engineer harus:
- audit index yang ada,
- bukan cuma menambah index baru terus-menerus.

---

## 15. Unique Index vs Unique Constraint

`UNIQUE` constraint sering didukung oleh unique index.

Tujuan utama:
- jaga integritas data.

Namun dari sisi performa,
ia juga bisa membantu lookup.

Contoh:
- `email UNIQUE`
- `mrn UNIQUE`

---

## 16. Cara Menentukan Index yang Dibutuhkan

Langkah praktis:
1. ambil query paling lambat / paling sering.
2. lihat filter, join, dan sort utama.
3. cek query plan.
4. desain index yang paling sesuai.
5. uji sebelum-sesudah.

Tanpa langkah ini,
indexing cuma ritual tanpa ilmu.

---

## 17. Studi Kasus Healthcare

Kasus:
- admin membuka daftar appointment per dokter per hari.

Query:

```sql
SELECT id, patient_id, schedule_at, status
FROM appointments
WHERE doctor_id = 19
  AND schedule_at >= '2026-04-16 00:00:00'
  AND schedule_at < '2026-04-17 00:00:00'
ORDER BY schedule_at ASC;
```

Index yang masuk akal:

```sql
CREATE INDEX idx_appointments_doctor_schedule
ON appointments(doctor_id, schedule_at);
```

Kenapa:
- filter utama `doctor_id`
- rentang waktu pada `schedule_at`
- urutan hasil juga `schedule_at`

---

## 18. Anti-Pattern yang Sering Terjadi

1. Index dibuat setelah incident tanpa analisis.
2. Index pada semua kolom foreign key dan flag tanpa cek query.
3. Query salah ditutup dengan index tambahan.
4. Tidak menghapus index usang.
5. Tidak cek dampak write performance.

---

## 19. Best Practices Index Dasar

- index berdasarkan query nyata, bukan intuisi.
- dokumentasikan alasan index penting.
- perhatikan urutan kolom pada composite index.
- cek plan sebelum dan sesudah.
- review index secara periodik.

---

## 20. Mini Latihan

Latihan:
1. Tentukan index untuk query lookup pasien berdasarkan nomor telepon.
2. Tentukan composite index untuk list appointment dokter per hari.
3. Jelaskan kenapa index di `is_active` belum tentu berguna.
4. Jelaskan bedanya `(doctor_id, schedule_at)` vs `(schedule_at, doctor_id)`.
5. Cari contoh redundant index dan jelaskan risikonya.

---

## 21. Jawaban Contoh Singkat

1.

```sql
CREATE INDEX idx_patients_phone_number
ON patients(phone_number);
```

2.

```sql
CREATE INDEX idx_appointments_doctor_schedule
ON appointments(doctor_id, schedule_at);
```

3.
- karena selektivitas rendah,
- database bisa memilih scan biasa jika hasil terlalu banyak.

---

## 22. Checklist Kelulusan Topik 11

Kamu dianggap lulus jika bisa:
- menjelaskan fungsi index secara benar,
- membedakan single vs composite index,
- memahami pentingnya urutan kolom,
- mendeteksi over-indexing dasar,
- mengusulkan index berdasarkan query plan dan kebutuhan nyata.

---

## 23. Ringkasan Brutal

- Index bukan sihir.
- Index yang tepat bisa menyelamatkan sistem.
- Index yang salah cuma menambah beban dan rasa percaya diri palsu.
