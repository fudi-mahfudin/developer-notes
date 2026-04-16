# SQL Agregasi - Penjelasan Detail

## Tujuan Topik

Topik ini membahas cara merangkum data menggunakan:
- `COUNT`
- `SUM`
- `AVG`
- `MIN`
- `MAX`
- `GROUP BY`
- `HAVING`

Ini fondasi analisis data. Tanpa agregasi, kamu hanya bisa lihat baris mentah.

---

## 1. Konsep Dasar Agregasi

Agregasi = mengubah banyak baris menjadi ringkasan.

Contoh pertanyaan:
- berapa total appointment?
- berapa rata-rata kunjungan per dokter?
- kota mana dengan pasien aktif terbanyak?

---

## 2. Fungsi Agregasi Inti

### COUNT

```sql
SELECT COUNT(*) AS total_patients
FROM patients;
```

- `COUNT(*)` menghitung semua baris.
- `COUNT(column)` menghitung baris dengan nilai **tidak NULL** pada kolom tersebut.

### SUM

```sql
SELECT SUM(total_amount) AS total_revenue
FROM payments;
```

### AVG

```sql
SELECT AVG(waiting_minutes) AS avg_waiting_time
FROM appointments;
```

### MIN dan MAX

```sql
SELECT
  MIN(schedule_at) AS first_appointment,
  MAX(schedule_at) AS last_appointment
FROM appointments;
```

---

## 3. GROUP BY: Ringkas per Kelompok

```sql
SELECT
  city,
  COUNT(*) AS total_patients
FROM patients
GROUP BY city;
```

Artinya:
- data dikelompokkan berdasarkan `city`,
- tiap kota dihitung jumlah pasiennya.

Aturan penting:
- kolom non-agregat di `SELECT` harus masuk `GROUP BY`.

---

## 4. HAVING vs WHERE

`WHERE` memfilter **sebelum** agregasi.  
`HAVING` memfilter **setelah** agregasi.

### WHERE

```sql
SELECT city, COUNT(*) AS total_patients
FROM patients
WHERE is_active = true
GROUP BY city;
```

### HAVING

```sql
SELECT city, COUNT(*) AS total_patients
FROM patients
GROUP BY city
HAVING COUNT(*) >= 10;
```

### Kombinasi WHERE + HAVING

```sql
SELECT city, COUNT(*) AS total_active_patients
FROM patients
WHERE is_active = true
GROUP BY city
HAVING COUNT(*) >= 10;
```

---

## 5. COUNT(*) vs COUNT(column) vs COUNT(DISTINCT)

```sql
SELECT
  COUNT(*) AS total_rows,
  COUNT(phone_number) AS rows_with_phone,
  COUNT(DISTINCT city) AS unique_cities
FROM patients;
```

Penjelasan:
- `COUNT(*)`: semua baris.
- `COUNT(phone_number)`: hanya baris dengan `phone_number` tidak `NULL`.
- `COUNT(DISTINCT city)`: jumlah nilai kota unik.

---

## 6. Agregasi Setelah JOIN

Contoh: jumlah appointment per dokter.

```sql
SELECT
  d.id,
  d.full_name,
  COUNT(a.id) AS total_appointments
FROM doctors d
LEFT JOIN appointments a
  ON d.id = a.doctor_id
GROUP BY d.id, d.full_name
ORDER BY total_appointments DESC;
```

Kenapa `LEFT JOIN`:
- supaya dokter tanpa appointment tetap muncul dengan hitungan 0 (tergantung engine/perhitungan kolom).

---

## 7. Kesalahan Umum Pemula

1. Pakai kolom non-agregat di `SELECT` tanpa `GROUP BY`.
2. Pakai `WHERE COUNT(*) > ...` (harusnya `HAVING`).
3. Tidak sadar `COUNT(column)` mengabaikan `NULL`.
4. Salah tafsir hasil agregasi karena join menggandakan baris.
5. Memakai agregasi tanpa validasi dataset dasar.

---

## 8. Best Practices Agregasi

- Gunakan alias jelas (`total_appointments`, `avg_waiting_time`).
- Validasi hasil agregasi dengan query sederhana pembanding.
- Pisahkan filter baris (`WHERE`) dan filter grup (`HAVING`) dengan benar.
- Saat join, pastikan grain data jelas (per pasien? per appointment? per dokter?).
- Untuk report penting, dokumentasikan definisi metrik.

---

## 9. Mini Latihan

Gunakan tabel:
- `patients(id, city, is_active)`
- `appointments(id, doctor_id, waiting_minutes, status)`

Latihan:
1. Hitung total pasien.
2. Hitung jumlah kota unik.
3. Hitung rata-rata waktu tunggu appointment selesai (`status='completed'`).
4. Tampilkan dokter dengan minimal 20 appointment.

Contoh jawaban nomor 4:

```sql
SELECT
  doctor_id,
  COUNT(*) AS total_appointments
FROM appointments
GROUP BY doctor_id
HAVING COUNT(*) >= 20
ORDER BY total_appointments DESC;
```

---

## 10. Checklist Kelulusan Topik Agregasi

Kamu dianggap lulus jika sudah bisa:
- menjelaskan beda `WHERE` dan `HAVING`,
- memakai `GROUP BY` dengan benar,
- menjelaskan beda `COUNT(*)`, `COUNT(column)`, dan `COUNT(DISTINCT ...)`,
- membuat ringkasan data yang konsisten dan bisa diaudit logikanya.
