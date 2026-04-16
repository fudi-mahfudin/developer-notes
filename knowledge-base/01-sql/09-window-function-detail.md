# SQL Window Function - Penjelasan Detail

## Tujuan Topik

Topik ini membahas window function inti:
- `ROW_NUMBER`
- `RANK`
- `DENSE_RANK`
- `LAG`
- `LEAD`
- `PARTITION BY`
- `ORDER BY` pada window

Window function itu level-up SQL.
Kalau belum paham, analisis data kamu akan banyak workaround jelek.

---

## 1. Apa Itu Window Function?

Window function melakukan kalkulasi per baris
tanpa menghilangkan detail baris asli.

Bedanya dengan agregasi:
- agregasi menggabungkan baris jadi ringkasan.
- window function tetap mempertahankan tiap baris.

---

## 2. Struktur Dasar

```sql
fungsi_window() OVER (
  PARTITION BY ...
  ORDER BY ...
)
```

Komponen:
- `PARTITION BY`: kelompok data.
- `ORDER BY`: urutan di dalam kelompok.

---

## 3. ROW_NUMBER

Memberi nomor urut unik per partisi.

```sql
SELECT
  doctor_id,
  schedule_at,
  ROW_NUMBER() OVER (
    PARTITION BY doctor_id
    ORDER BY schedule_at DESC
  ) AS rn
FROM appointments;
```

Use case:
- ambil appointment terbaru per dokter (`rn = 1`).

---

## 4. RANK vs DENSE_RANK

### RANK

Jika ada nilai sama, ranking lompat.

### DENSE_RANK

Jika ada nilai sama, ranking tidak lompat.

Contoh:
- nilai: 100, 90, 90, 80
- `RANK`: 1, 2, 2, 4
- `DENSE_RANK`: 1, 2, 2, 3

---

## 5. LAG dan LEAD

`LAG` ambil nilai baris sebelumnya.
`LEAD` ambil nilai baris sesudahnya.

```sql
SELECT
  patient_id,
  schedule_at,
  LAG(schedule_at) OVER (
    PARTITION BY patient_id
    ORDER BY schedule_at
  ) AS prev_schedule,
  LEAD(schedule_at) OVER (
    PARTITION BY patient_id
    ORDER BY schedule_at
  ) AS next_schedule
FROM appointments;
```

Use case:
- hitung jeda antar kunjungan pasien.

---

## 6. Running Total

Contoh jumlah kumulatif:

```sql
SELECT
  doctor_id,
  schedule_at,
  COUNT(*) OVER (
    PARTITION BY doctor_id
    ORDER BY schedule_at
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_count
FROM appointments;
```

Ini berguna untuk tren waktu.

---

## 7. Window Frame (Konsep)

Frame menentukan rentang baris yang dipakai fungsi window.

Contoh frame umum:
- `UNBOUNDED PRECEDING` -> dari awal partisi.
- `CURRENT ROW` -> sampai baris saat ini.

Kalau tidak paham frame, hasil bisa beda dari ekspektasi.

---

## 8. Top-N per Group

Contoh:
ambil 3 appointment terbaru per dokter.

```sql
WITH ranked AS (
  SELECT
    a.*,
    ROW_NUMBER() OVER (
      PARTITION BY doctor_id
      ORDER BY schedule_at DESC
    ) AS rn
  FROM appointments a
)
SELECT *
FROM ranked
WHERE rn <= 3;
```

Ini pola sangat sering dipakai.

---

## 9. Dedup Data dengan Window

Pilih 1 baris terbaru untuk data duplikat:

```sql
WITH ranked AS (
  SELECT
    *,
    ROW_NUMBER() OVER (
      PARTITION BY patient_id, schedule_at
      ORDER BY created_at DESC
    ) AS rn
  FROM appointments
)
SELECT *
FROM ranked
WHERE rn = 1;
```

---

## 10. Persentase Kontribusi

```sql
SELECT
  doctor_id,
  COUNT(*) AS total_appointments,
  COUNT(*) * 100.0 / SUM(COUNT(*)) OVER () AS pct_of_total
FROM appointments
GROUP BY doctor_id;
```

Gabungan agregasi + window = analitik kuat.

---

## 11. Kesalahan Umum Pemula

1. Lupa `ORDER BY` di window saat butuh urutan.
2. Salah pilih `RANK` vs `ROW_NUMBER`.
3. Mengira window function menggantikan semua agregasi.
4. Tidak paham efek partisi kosong/salah.
5. Query berat tanpa index pendukung.

---

## 12. Best Practices Window Function

- Tentukan grain analisis dulu.
- Gunakan alias kolom hasil yang jelas.
- Gunakan CTE untuk memisahkan tahap ranking/filter.
- Pastikan kolom partisi/urut relevan dengan index.
- Validasi hasil dengan sampel kecil.

---

## 13. Studi Kasus Healthcare

Kasus:
- cari pasien dengan no-show beruntun.

Ide:
1. urutkan appointment per pasien.
2. pakai `LAG(status)` untuk cek status sebelumnya.
3. tandai pola no-show berulang.

Ini sulit dilakukan tanpa window function.

---

## 14. Optimasi Dasar

Window function butuh sort.
Sort mahal pada dataset besar.

Optimasi:
- filter baris lebih awal.
- batasi kolom select.
- index pada kolom partisi/ordering jika relevan.

Tetap cek `EXPLAIN ANALYZE`.

---

## 15. Perbandingan dengan Self Join

Dulu banyak orang pakai self join untuk "baris sebelumnya".
Sekarang:
- `LAG/LEAD` lebih bersih,
- lebih mudah dibaca,
- sering lebih mudah dioptimasi.

---

## 16. Mini Latihan

Latihan:
1. Buat nomor urut appointment per dokter.
2. Ambil appointment terbaru per pasien.
3. Hitung jeda hari antar appointment pasien.
4. Ambil top 5 dokter dengan booking terbanyak.
5. Bandingkan `RANK` vs `DENSE_RANK`.

---

## 17. Jawaban Contoh Ringkas (No. 2)

```sql
WITH ranked AS (
  SELECT
    a.*,
    ROW_NUMBER() OVER (
      PARTITION BY patient_id
      ORDER BY schedule_at DESC
    ) AS rn
  FROM appointments a
)
SELECT *
FROM ranked
WHERE rn = 1;
```

---

## 18. Checklist Kelulusan Topik 9

Kamu dianggap lulus jika bisa:
- menjelaskan konsep `OVER`, `PARTITION BY`, `ORDER BY`,
- memilih `ROW_NUMBER`/`RANK`/`DENSE_RANK` sesuai kebutuhan,
- memakai `LAG/LEAD` untuk analisis sekuens,
- membangun top-N per group dengan benar,
- memahami biaya sort dan dampaknya ke performa.

---

## 19. Ringkasan Brutal

- Window function itu wajib untuk SQL level menengah ke atas.
- Kalau kamu masih pakai workaround rumit untuk ranking/sekuens, skill SQL kamu belum matang.
