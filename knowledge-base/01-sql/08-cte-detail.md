# SQL CTE (WITH) - Penjelasan Detail

## Tujuan Topik

Topik ini membahas CTE (`WITH`) untuk:
- membuat query kompleks lebih terbaca,
- memecah logic menjadi tahap,
- menyiapkan data sebelum agregasi/filter lanjutan.

CTE bukan "fitur gaya-gayaan". Ini alat struktur query.

---

## 1. Apa Itu CTE?

CTE = Common Table Expression.

Bentuk dasar:

```sql
WITH nama_cte AS (
  SELECT ...
)
SELECT ...
FROM nama_cte;
```

CTE bersifat sementara:
- hanya hidup selama query itu dieksekusi,
- bukan tabel permanen.

---

## 2. Kenapa CTE Berguna?

Tanpa CTE:
- query nested jadi sulit dibaca,
- debugging susah,
- rawan salah logic.

Dengan CTE:
- tiap langkah bisa diberi nama,
- query bisa dipecah per tahap,
- review code lebih mudah.

---

## 3. CTE Sederhana

Contoh: ambil pasien aktif dulu, lalu tampilkan.

```sql
WITH active_patients AS (
  SELECT id, full_name, city
  FROM patients
  WHERE is_active = true
)
SELECT id, full_name, city
FROM active_patients
ORDER BY full_name;
```

---

## 4. Multi CTE dalam Satu Query

Kamu bisa chaining beberapa CTE.

```sql
WITH active_patients AS (
  SELECT id, full_name
  FROM patients
  WHERE is_active = true
),
recent_appointments AS (
  SELECT patient_id, schedule_at
  FROM appointments
  WHERE schedule_at >= NOW() - INTERVAL '30 days'
)
SELECT
  p.full_name,
  a.schedule_at
FROM active_patients p
LEFT JOIN recent_appointments a
  ON p.id = a.patient_id;
```

Kelebihan:
- tiap CTE punya tanggung jawab jelas.

---

## 5. CTE vs Subquery

Subquery bagus untuk kasus kecil.
CTE unggul saat logic berlapis.

Bandingkan:
- subquery bertingkat sering sulit dibaca,
- CTE membuat alur query "atas ke bawah" seperti pipeline.

---

## 6. Contoh Kasus Report Healthcare

Tujuan:
- hitung no-show rate dokter per bulan.

```sql
WITH monthly_appointments AS (
  SELECT
    doctor_id,
    DATE_TRUNC('month', schedule_at) AS month_bucket,
    status
  FROM appointments
),
monthly_totals AS (
  SELECT
    doctor_id,
    month_bucket,
    COUNT(*) AS total_appointments
  FROM monthly_appointments
  GROUP BY doctor_id, month_bucket
),
monthly_noshow AS (
  SELECT
    doctor_id,
    month_bucket,
    COUNT(*) AS no_show_count
  FROM monthly_appointments
  WHERE status = 'no_show'
  GROUP BY doctor_id, month_bucket
)
SELECT
  t.doctor_id,
  t.month_bucket,
  t.total_appointments,
  COALESCE(n.no_show_count, 0) AS no_show_count
FROM monthly_totals t
LEFT JOIN monthly_noshow n
  ON t.doctor_id = n.doctor_id
 AND t.month_bucket = n.month_bucket;
```

---

## 7. CTE untuk Data Cleaning Pipeline

Contoh:
1. normalisasi nomor telepon,
2. buang nilai invalid,
3. pilih record unik.

```sql
WITH normalized AS (
  SELECT
    id,
    REGEXP_REPLACE(phone_number, '[^0-9+]', '', 'g') AS phone_clean
  FROM patients
),
filtered AS (
  SELECT id, phone_clean
  FROM normalized
  WHERE phone_clean IS NOT NULL
    AND phone_clean <> ''
)
SELECT DISTINCT phone_clean
FROM filtered;
```

---

## 8. Recursive CTE (Konsep Dasar)

Recursive CTE dipakai untuk data hierarki:
- struktur organisasi,
- kategori bertingkat,
- chain referral.

Bentuk umum:

```sql
WITH RECURSIVE tree AS (
  SELECT ...
  UNION ALL
  SELECT ...
  FROM tree
  JOIN ...
)
SELECT * FROM tree;
```

Catatan:
- recursive CTE butuh batas/stop condition yang jelas.

---

## 9. Performance Notes CTE

Tidak semua engine memperlakukan CTE sama.

Di beberapa engine:
- CTE bisa di-inline.
Di engine lain:
- CTE bisa termaterialisasi.

Dampak:
- performa bisa beda walau hasil sama.

Aturan:
- jangan asumsi, cek `EXPLAIN`.

---

## 10. Kapan CTE Tepat Dipakai?

Pakai CTE saat:
- query punya banyak tahap transformasi.
- ada kebutuhan reusability logic dalam query yang sama.
- readability lebih penting dari trik singkat.

Jangan pakai CTE berlebihan untuk query sangat sederhana.

---

## 11. Naming CTE yang Benar

Gunakan nama deskriptif:
- `active_patients`
- `monthly_totals`
- `filtered_events`

Hindari:
- `tmp1`, `tmp2`, `x`.

Nama buruk bikin query tetap sulit dibaca.

---

## 12. Kesalahan Umum Pemula

1. Menaruh semua logic di 1 CTE raksasa.
2. Nama CTE tidak bermakna.
3. Tidak mengecek performa hasil akhir.
4. Menyalin CTE panjang tanpa test tiap tahap.
5. Salah urutan dependensi CTE.

---

## 13. Strategi Debug Query CTE

Langkah:
1. jalankan CTE pertama saja.
2. cek hasil baris dan kolom.
3. lanjut CTE berikutnya bertahap.
4. validasi output akhir.

Ini jauh lebih cepat daripada debug query nested raksasa.

---

## 14. CTE + Window Function

CTE sering dipasangkan dengan window function.

Contoh:
- CTE menyiapkan dataset,
- window function memberi ranking/analitik.

Ini pola yang sering dipakai di reporting dashboard.

---

## 15. CTE + DML

Beberapa engine mendukung CTE sebelum `UPDATE`/`DELETE`.

Contoh konsep:
- pilih target baris di CTE,
- update target saja.

Tujuan:
- logic target lebih eksplisit.

---

## 16. Mini Latihan

Latihan:
1. Buat CTE pasien aktif lalu join ke appointment.
2. Buat 2 CTE: total booking dan total no-show per dokter.
3. Gunakan CTE untuk membersihkan nomor telepon.
4. Bandingkan query CTE vs subquery untuk kasus yang sama.
5. Cek execution plan salah satu query CTE.

---

## 17. Jawaban Contoh Ringkas (No. 1)

```sql
WITH active_patients AS (
  SELECT id, full_name
  FROM patients
  WHERE is_active = true
)
SELECT p.full_name, a.schedule_at
FROM active_patients p
LEFT JOIN appointments a
  ON p.id = a.patient_id;
```

---

## 18. Checklist Kelulusan Topik 8

Kamu dianggap lulus jika bisa:
- menulis CTE tunggal dan multi-CTE,
- menjelaskan kapan CTE lebih baik dari subquery,
- membuat query berlapis yang tetap terbaca,
- debug CTE per tahap,
- mengecek dampak performa dengan `EXPLAIN`.

---

## 19. Ringkasan Brutal

- Query susah dibaca = future bug.
- CTE adalah alat struktur, bukan sulap performa.
- Gunakan CTE untuk kejelasan; validasi performa dengan bukti.
