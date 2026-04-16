# SQL Subquery Dasar - Penjelasan Detail

## Tujuan Topik

Topik ini membahas subquery dasar:
- subquery di `WHERE`
- subquery di `FROM`
- subquery di `SELECT`
- `IN`, `EXISTS`, dan subquery scalar

Subquery membantu memecah masalah query kompleks jadi potongan logis.

---

## 1. Apa Itu Subquery?

Subquery adalah query di dalam query lain.

Contoh bentuk:

```sql
SELECT ...
FROM ...
WHERE column IN (
  SELECT ...
  FROM ...
);
```

---

## 2. Subquery di WHERE (Paling Umum)

Contoh: cari pasien yang pernah booking.

```sql
SELECT id, full_name
FROM patients
WHERE id IN (
  SELECT DISTINCT patient_id
  FROM appointments
);
```

Logika:
- query dalam mengambil daftar `patient_id`,
- query luar ambil pasien yang id-nya ada di daftar itu.

---

## 3. NOT IN dan Jebakan NULL

Contoh niat: pasien yang belum pernah booking.

```sql
SELECT id, full_name
FROM patients
WHERE id NOT IN (
  SELECT patient_id
  FROM appointments
);
```

Masalah:
- jika subquery mengandung `NULL`, hasil bisa jadi tidak sesuai ekspektasi.

Pendekatan lebih aman:

```sql
SELECT p.id, p.full_name
FROM patients p
WHERE NOT EXISTS (
  SELECT 1
  FROM appointments a
  WHERE a.patient_id = p.id
);
```

---

## 4. EXISTS vs IN

### EXISTS

```sql
SELECT p.id, p.full_name
FROM patients p
WHERE EXISTS (
  SELECT 1
  FROM appointments a
  WHERE a.patient_id = p.id
);
```

Kelebihan:
- cocok untuk cek "ada/tidak ada" relasi,
- sering lebih efisien di banyak engine untuk data besar.

### IN

```sql
SELECT id, full_name
FROM patients
WHERE id IN (
  SELECT patient_id
  FROM appointments
);
```

`IN` tetap valid dan mudah dibaca untuk banyak kasus sederhana.

---

## 5. Subquery Scalar (Menghasilkan 1 Nilai)

Contoh: appointment di atas rata-rata durasi tunggu.

```sql
SELECT id, waiting_minutes
FROM appointments
WHERE waiting_minutes > (
  SELECT AVG(waiting_minutes)
  FROM appointments
);
```

Catatan:
- subquery harus menghasilkan satu nilai; kalau lebih dari satu, query error.

---

## 6. Subquery di FROM (Derived Table)

Contoh: hitung jumlah appointment per dokter, lalu filter.

```sql
SELECT t.doctor_id, t.total_appointments
FROM (
  SELECT doctor_id, COUNT(*) AS total_appointments
  FROM appointments
  GROUP BY doctor_id
) AS t
WHERE t.total_appointments >= 20
ORDER BY t.total_appointments DESC;
```

Kegunaan:
- memecah query panjang menjadi tahap yang lebih mudah dibaca.

---

## 7. Correlated Subquery (Dasar)

Subquery yang memakai kolom dari query luar.

```sql
SELECT p.id, p.full_name
FROM patients p
WHERE EXISTS (
  SELECT 1
  FROM appointments a
  WHERE a.patient_id = p.id
    AND a.status = 'completed'
);
```

Di sini `p.id` dari query luar dipakai di subquery.

---

## 8. Kesalahan Umum Pemula

1. Memakai subquery padahal join lebih jelas.
2. Pakai `NOT IN` tanpa sadar ada `NULL`.
3. Subquery scalar mengembalikan lebih dari satu baris.
4. Tidak mengecek performa query bertingkat.
5. Menulis subquery sulit dibaca tanpa alias yang jelas.

---

## 9. Best Practices Subquery

- Pilih `EXISTS` untuk cek keberadaan relasi.
- Hati-hati `NOT IN`; prefer `NOT EXISTS` untuk kasus aman `NULL`.
- Tambahkan alias jelas di query luar dan dalam.
- Uji subquery secara terpisah sebelum digabung.
- Untuk query besar, bandingkan performa subquery vs join dengan `EXPLAIN`.

---

## 10. Mini Latihan

Gunakan tabel:
- `patients(id, full_name)`
- `appointments(id, patient_id, status, waiting_minutes)`

Latihan:
1. Cari pasien yang punya appointment completed.
2. Cari pasien yang belum pernah booking.
3. Cari appointment dengan waiting time di atas rata-rata.
4. Tampilkan dokter (dari tabel appointment) yang total booking >= 15 menggunakan subquery di `FROM`.

Contoh jawaban nomor 2:

```sql
SELECT p.id, p.full_name
FROM patients p
WHERE NOT EXISTS (
  SELECT 1
  FROM appointments a
  WHERE a.patient_id = p.id
);
```

---

## 11. Checklist Kelulusan Topik Subquery Dasar

Kamu dianggap lulus jika sudah bisa:
- menjelaskan kapan pakai `IN`, `EXISTS`, `NOT EXISTS`,
- menghindari jebakan `NOT IN` + `NULL`,
- membuat subquery scalar yang valid,
- memecah query kompleks dengan subquery di `FROM`,
- menulis subquery yang tetap terbaca dan bisa direview.
