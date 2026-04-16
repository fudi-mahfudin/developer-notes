# SQL Constraints - Penjelasan Detail

## Tujuan Topik

Topik ini membahas constraint inti:
- `PRIMARY KEY`
- `FOREIGN KEY`
- `UNIQUE`
- `NOT NULL`
- `CHECK` (pelengkap penting)

Constraint adalah penjaga kualitas data.
Tanpa constraint, database jadi "tempat sampah legal".

---

## 1. Kenapa Constraint Wajib?

Aplikasi bisa bug.
Script manual bisa salah.
ETL bisa kotor.

Constraint memastikan data rusak ditolak sejak awal.

Prinsip:
- validasi di aplikasi bagus,
- validasi di database wajib.

---

## 2. PRIMARY KEY

`PRIMARY KEY` = identitas unik tiap baris.

Ciri:
- unik,
- tidak boleh null,
- biasanya terindeks otomatis.

Contoh:

```sql
CREATE TABLE patients (
  id BIGINT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL
);
```

Tanpa PK:
- update/delete bisa ambigu,
- relasi FK tidak stabil.

---

## 3. UNIQUE Constraint

`UNIQUE` mencegah nilai duplikat.

Contoh:

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE
);
```

Kasus umum:
- email user harus unik.
- nomor rekam medis harus unik.

### Composite UNIQUE

```sql
UNIQUE (doctor_id, schedule_at)
```

Artinya kombinasi dua kolom harus unik.

---

## 4. NOT NULL Constraint

`NOT NULL` melarang kolom kosong.

Contoh:

```sql
full_name VARCHAR(120) NOT NULL
```

Gunakan untuk kolom wajib domain:
- nama,
- id relasi,
- timestamp audit.

Jangan pakai `NOT NULL` membabi buta untuk kolom yang memang opsional.

---

## 5. FOREIGN KEY

`FOREIGN KEY` menjaga integritas relasi antar tabel.

Contoh:

```sql
CREATE TABLE appointments (
  id BIGINT PRIMARY KEY,
  patient_id BIGINT NOT NULL,
  CONSTRAINT fk_appointments_patient
    FOREIGN KEY (patient_id)
    REFERENCES patients(id)
);
```

Efek:
- tidak bisa insert appointment dengan `patient_id` yang tidak ada di `patients`.

---

## 6. ON DELETE / ON UPDATE Behavior

Saat baris parent berubah/hapus, apa dampaknya ke child?

Pilihan umum:
- `RESTRICT` / `NO ACTION`: tolak jika masih direferensikan.
- `CASCADE`: ikut hapus/update child.
- `SET NULL`: child jadi null (jika kolom nullable).

Contoh:

```sql
FOREIGN KEY (patient_id)
REFERENCES patients(id)
ON DELETE RESTRICT
```

Di domain healthcare, `CASCADE` harus sangat hati-hati.

---

## 7. CHECK Constraint

`CHECK` untuk aturan nilai valid.

Contoh:

```sql
CHECK (waiting_minutes >= 0)
```

Contoh lain:

```sql
CHECK (status IN ('confirmed', 'cancelled', 'completed', 'no_show'))
```

Manfaat:
- cegah typo/invalid state dari awal.

---

## 8. Named Constraint (Direkomendasikan)

Selalu beri nama constraint:

```sql
CONSTRAINT uq_users_email UNIQUE (email)
```

Kenapa:
- error message lebih jelas,
- migration lebih mudah dikelola,
- drop/alter constraint lebih aman.

---

## 9. Constraint vs Index

Sering tertukar:
- `UNIQUE` constraint biasanya membuat unique index.
- index biasa **tidak** otomatis memvalidasi aturan bisnis.

Pakai:
- constraint untuk validasi data,
- index untuk performa query,
- kadang keduanya diperlukan.

---

## 10. Studi Kasus Healthcare

Tabel `appointments`:

```sql
CREATE TABLE appointments (
  id BIGINT PRIMARY KEY,
  patient_id BIGINT NOT NULL,
  doctor_id BIGINT NOT NULL,
  schedule_at TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL,
  CONSTRAINT fk_appointments_patient
    FOREIGN KEY (patient_id) REFERENCES patients(id),
  CONSTRAINT fk_appointments_doctor
    FOREIGN KEY (doctor_id) REFERENCES doctors(id),
  CONSTRAINT ck_appointments_status
    CHECK (status IN ('confirmed', 'cancelled', 'completed', 'no_show')),
  CONSTRAINT uq_doctor_schedule UNIQUE (doctor_id, schedule_at)
);
```

Hasil:
- tidak ada double booking dokter di jam sama,
- status selalu valid,
- relasi patient/doctor terjaga.

---

## 11. Kapan Constraint Bisa Mengganggu?

Kalau desain salah:
- write throughput turun,
- migration sulit,
- insert batch sering gagal.

Tapi solusi bukan "hapus semua constraint".
Solusi:
- desain constraint tepat,
- urutkan load/migration dengan benar,
- monitoring error constraint.

---

## 12. Error Constraint yang Umum

1. Duplicate key (`UNIQUE`/`PK` violation)
2. Foreign key violation
3. Not-null violation
4. Check violation

Setiap error harus ditangani:
- aplikasi menampilkan pesan yang bisa dipahami user,
- log internal simpan detail teknis.

---

## 13. Strategi Menambah Constraint di Tabel Lama

Langkah aman:
1. audit data existing.
2. bersihkan data yang melanggar.
3. tambah constraint.
4. monitor error pasca deploy.

Jangan langsung pasang constraint tanpa data cleanup.

---

## 14. Anti-Pattern Constraint

1. Tidak ada foreign key karena "nanti saja".
2. Semua business rule dipindah ke aplikasi tanpa guard DB.
3. Pakai cascade delete sembarangan.
4. Kolom penting dibiarkan nullable.
5. Constraint tanpa nama.

---

## 15. Best Practices Constraint

- Definisikan constraint dari awal desain.
- Gunakan nama constraint konsisten.
- Gabungkan constraint dan migration review.
- Dokumentasikan alasan constraint penting.
- Uji skenario pelanggaran di test suite.

---

## 16. Mini Latihan

Desain tabel:
- `patients`
- `doctors`
- `appointments`

Latihan:
1. Tentukan PK tiap tabel.
2. Tentukan FK di `appointments`.
3. Buat rule agar dokter tidak double booking.
4. Buat rule status valid.
5. Tentukan kolom wajib `NOT NULL`.

---

## 17. Contoh Jawaban Singkat

1. PK: `id` di semua tabel.
2. FK: `appointments.patient_id -> patients.id`, `appointments.doctor_id -> doctors.id`.
3. `UNIQUE (doctor_id, schedule_at)`.
4. `CHECK status IN (...)`.
5. `patient_id`, `doctor_id`, `schedule_at`, `status` wajib `NOT NULL`.

---

## 18. Checklist Kelulusan Topik 7

Kamu dianggap lulus jika bisa:
- menjelaskan fungsi PK, FK, UNIQUE, NOT NULL,
- memilih `ON DELETE` behavior sesuai konteks bisnis,
- menulis constraint yang menjaga integritas data,
- menghindari cascade berbahaya,
- merancang migration constraint dengan aman.

---

## 19. Ringkasan Brutal

- Tanpa constraint, data corruption tinggal tunggu waktu.
- Constraint bukan penghambat, tapi pagar keselamatan.
- Senior engineer wajib mendesain constraint, bukan cuma query.
