# SQL JOIN Dasar - Penjelasan Detail

## Tujuan Topik

Topik ini membahas fondasi `JOIN` yang wajib dikuasai:
- `INNER JOIN`
- `LEFT JOIN`
- `RIGHT JOIN`
- kondisi `ON`
- perbedaan hasil antar jenis join

Kalau tidak paham join, kamu tidak bisa baca relasi data antar tabel dengan benar.

---

## 1. Kenapa JOIN Dibutuhkan?

Di sistem nyata, data disimpan di banyak tabel.

Contoh:
- `patients` menyimpan data pasien
- `appointments` menyimpan jadwal konsultasi

Kalau kamu butuh: "nama pasien + jadwal konsultasi", kamu harus gabungkan dua tabel dengan `JOIN`.

---

## 2. Dataset Contoh

### Tabel `patients`

| id | full_name |
|---|---|
| 1 | Andi |
| 2 | Budi |
| 3 | Citra |

### Tabel `appointments`

| id | patient_id | schedule_at |
|---|---|---|
| 101 | 1 | 2026-04-20 09:00 |
| 102 | 1 | 2026-04-22 10:00 |
| 103 | 2 | 2026-04-21 08:30 |

> `patient_id` di `appointments` merujuk ke `patients.id`.

---

## 3. INNER JOIN

`INNER JOIN` hanya menampilkan data yang match di kedua tabel.

```sql
SELECT
  p.id,
  p.full_name,
  a.schedule_at
FROM patients p
INNER JOIN appointments a
  ON p.id = a.patient_id;
```

Hasil:
- Andi muncul 2 kali (karena punya 2 appointment)
- Budi muncul 1 kali
- Citra tidak muncul (tidak punya appointment)

Gunakan saat:
- kamu hanya ingin data yang punya pasangan valid di kedua sisi.

---

## 4. LEFT JOIN

`LEFT JOIN` menampilkan semua baris dari tabel kiri, walaupun tidak ada pasangan di kanan.

```sql
SELECT
  p.id,
  p.full_name,
  a.schedule_at
FROM patients p
LEFT JOIN appointments a
  ON p.id = a.patient_id;
```

Hasil:
- Andi, Budi, Citra semua muncul
- kolom `a.*` untuk Citra bernilai `NULL`

Gunakan saat:
- kamu ingin daftar master lengkap (misal semua pasien), termasuk yang belum punya aktivitas.

---

## 5. RIGHT JOIN

`RIGHT JOIN` kebalikan dari `LEFT JOIN`: semua baris dari tabel kanan dipertahankan.

```sql
SELECT
  p.full_name,
  a.id AS appointment_id,
  a.schedule_at
FROM patients p
RIGHT JOIN appointments a
  ON p.id = a.patient_id;
```

Catatan:
- di praktik modern, banyak tim lebih memilih `LEFT JOIN` (lebih mudah dibaca), tinggal tukar posisi tabel.

---

## 6. Perbedaan ON vs WHERE (Penting)

### Kasus yang benar (filter di `ON` untuk LEFT JOIN)

```sql
SELECT
  p.full_name,
  a.schedule_at
FROM patients p
LEFT JOIN appointments a
  ON p.id = a.patient_id
 AND a.schedule_at >= '2026-04-21';
```

Ini tetap mempertahankan semua pasien.

### Kasus yang sering salah (filter di `WHERE`)

```sql
SELECT
  p.full_name,
  a.schedule_at
FROM patients p
LEFT JOIN appointments a
  ON p.id = a.patient_id
WHERE a.schedule_at >= '2026-04-21';
```

Efek:
- baris yang `a.schedule_at` = `NULL` akan hilang,
- `LEFT JOIN` berubah perilaku jadi mirip `INNER JOIN`.

---

## 7. Duplicates pada JOIN

JOIN bisa menggandakan baris jika relasi one-to-many.

Contoh:
- 1 pasien punya 3 appointment
- setelah join, pasien itu muncul 3 baris

Ini normal, bukan bug.

Kalau butuh 1 baris per pasien:
- pakai agregasi (`GROUP BY`) atau
- pilih record tertentu (misal terbaru) dengan window function.

Jangan buru-buru menutup masalah dengan `DISTINCT`.

---

## 8. JOIN Lebih dari 2 Tabel

Contoh gabung pasien + appointment + dokter:

```sql
SELECT
  p.full_name AS patient_name,
  d.full_name AS doctor_name,
  a.schedule_at
FROM appointments a
INNER JOIN patients p
  ON a.patient_id = p.id
INNER JOIN doctors d
  ON a.doctor_id = d.id;
```

Tips:
- tentukan tabel "fakta utama" (sering `appointments`) lalu join ke tabel referensi.

---

## 9. Kesalahan Umum Pemula

1. Lupa kondisi `ON`, menyebabkan Cartesian product.
2. Salah join key (misal `patients.id = appointments.id`).
3. Filter kolom tabel kanan di `WHERE` saat pakai `LEFT JOIN`.
4. Tidak memahami kenapa baris jadi duplikat.
5. Terlalu cepat pakai `DISTINCT` tanpa analisis akar masalah.

---

## 10. Best Practices JOIN

- Selalu pakai alias tabel yang jelas (`p`, `a`, `d`).
- Pastikan join key sesuai relasi PK-FK.
- Mulai dari query kecil, validasi jumlah baris hasil.
- Untuk query penting, cek execution plan (`EXPLAIN`).
- Tambahkan index di kolom join yang sering dipakai.

---

## 11. Mini Latihan

Gunakan tabel:
- `patients(id, full_name)`
- `appointments(id, patient_id, doctor_id, schedule_at)`
- `doctors(id, full_name)`

Latihan:
1. Tampilkan semua pasien beserta jadwalnya (jika ada).
2. Tampilkan hanya pasien yang punya appointment.
3. Tampilkan daftar appointment beserta nama pasien dan dokter.
4. Cari pasien yang belum pernah booking.

Contoh jawaban nomor 4:

```sql
SELECT
  p.id,
  p.full_name
FROM patients p
LEFT JOIN appointments a
  ON p.id = a.patient_id
WHERE a.id IS NULL;
```

---

## 12. Checklist Kelulusan Topik JOIN Dasar

Kamu dianggap lulus jika sudah bisa:
- menjelaskan beda `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`,
- menulis join dengan key yang benar,
- paham dampak penempatan filter di `ON` vs `WHERE`,
- membaca hasil join one-to-many tanpa panik,
- menulis query "data yang belum punya relasi" (anti-join dasar).
