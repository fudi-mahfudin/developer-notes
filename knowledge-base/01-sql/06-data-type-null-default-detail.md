# SQL Data Type, NULL, dan Default Value - Penjelasan Detail

## Tujuan Topik

Topik ini membahas 3 hal fondasi desain tabel:
- data type
- `NULL`
- `DEFAULT`

Kalau salah memilih 3 hal ini, masalahnya panjang:
- data kotor,
- query lambat,
- bug validasi,
- migration mahal.

---

## 1. Kenapa Data Type Penting?

Data type menentukan:
- bentuk nilai yang boleh disimpan,
- ukuran storage,
- operasi yang bisa dilakukan,
- performa index/query.

Contoh kesalahan klasik:
- simpan tanggal sebagai `VARCHAR`,
- simpan angka uang sebagai `FLOAT`,
- simpan status sebagai teks bebas tanpa batas.

Hasilnya:
- query susah,
- data tidak konsisten,
- logic aplikasi jadi rumit.

---

## 2. Kategori Data Type Umum

### 2.1 Numeric

- `SMALLINT`, `INT`, `BIGINT`
- `DECIMAL(p,s)` / `NUMERIC(p,s)`
- `FLOAT` / `REAL` / `DOUBLE`

Gunakan:
- integer untuk ID, hitungan.
- decimal untuk uang/nilai presisi.
- float untuk nilai ilmiah/estimasi, bukan keuangan.

### 2.2 String

- `CHAR(n)`
- `VARCHAR(n)`
- `TEXT`

Gunakan:
- `CHAR` untuk panjang fix (jarang).
- `VARCHAR` untuk nilai pendek-menengah.
- `TEXT` untuk deskripsi panjang.

### 2.3 Date & Time

- `DATE`
- `TIME`
- `TIMESTAMP`
- `TIMESTAMP WITH TIME ZONE` (tergantung engine)

Gunakan:
- `DATE` untuk tanggal lahir.
- `TIMESTAMP` untuk event time.
- pastikan kebijakan timezone konsisten.

### 2.4 Boolean

- `BOOLEAN` (`true/false`)

Jangan pakai string `'yes'/'no'` jika bisa pakai boolean.

### 2.5 UUID / Identifier

- `UUID` untuk distributed ID (tergantung kebutuhan).

---

## 3. Panduan Memilih Data Type

Prinsip:
1. pilih type paling sempit yang cukup.
2. pilih type yang sesuai makna domain.
3. hindari casting berulang di query.

Contoh:
- `phone_number`: `VARCHAR`, bukan numeric (karena ada `+`, leading zero).
- `price`: `DECIMAL(12,2)`, bukan `FLOAT`.
- `is_active`: `BOOLEAN`, bukan `VARCHAR(10)`.

---

## 4. NULL: Makna dan Dampaknya

`NULL` artinya:
- nilai tidak diketahui / tidak ada.

`NULL` bukan:
- string kosong `''`
- angka `0`
- `false`

Contoh:
- `middle_name` boleh `NULL`.
- `full_name` seharusnya `NOT NULL`.

---

## 5. Operasi dengan NULL

Perbandingan biasa dengan `NULL` tidak bekerja seperti nilai normal.

Salah:

```sql
WHERE phone_number = NULL
```

Benar:

```sql
WHERE phone_number IS NULL
```

Dan:

```sql
WHERE phone_number IS NOT NULL
```

---

## 6. Three-Valued Logic (Penting)

Di SQL, ekspresi boolean bisa:
- `TRUE`
- `FALSE`
- `UNKNOWN` (karena `NULL`)

Ini alasan kenapa filter kadang "aneh".

Contoh:
- `age > 18` untuk `age = NULL` menghasilkan `UNKNOWN`.
- baris `UNKNOWN` tidak lolos `WHERE`.

---

## 7. Fungsi Penanganan NULL

### COALESCE

```sql
SELECT COALESCE(phone_number, 'N/A') AS phone
FROM patients;
```

`COALESCE` mengembalikan nilai non-null pertama.

### NULLIF

```sql
SELECT NULLIF(trim(email), '') AS normalized_email
FROM patients;
```

Mengubah nilai tertentu jadi `NULL`.

---

## 8. Default Value

`DEFAULT` memberi nilai otomatis jika kolom tidak diisi saat insert.

Contoh:

```sql
CREATE TABLE patients (
  id BIGINT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

Manfaat:
- konsistensi data,
- kurangi boilerplate di aplikasi.

---

## 9. Kapan Pakai DEFAULT?

Pakai jika:
- nilai awal hampir selalu sama.
- nilai bisa ditentukan di level database.

Contoh cocok:
- `created_at DEFAULT NOW()`
- `is_active DEFAULT true`
- `retry_count DEFAULT 0`

Contoh kurang cocok:
- nilai yang bergantung aturan bisnis kompleks lintas tabel.

---

## 10. Kombinasi NULL + DEFAULT

Perlu paham:
- `DEFAULT` hanya berlaku saat kolom **tidak dikirim** pada `INSERT`.
- jika eksplisit kirim `NULL`, maka nilainya tetap `NULL` (jika kolom memperbolehkan).

Contoh:

```sql
INSERT INTO patients (id, full_name) VALUES (1, 'A');
```

`is_active` akan mengambil default `true`.

Namun:

```sql
INSERT INTO patients (id, full_name, is_active) VALUES (2, 'B', NULL);
```

Jika kolom nullable, hasilnya `NULL`, bukan default.

---

## 11. Studi Kasus Desain Tabel Healthcare

Contoh tabel `appointments`:

```sql
CREATE TABLE appointments (
  id BIGINT PRIMARY KEY,
  patient_id BIGINT NOT NULL,
  doctor_id BIGINT NOT NULL,
  schedule_at TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'confirmed',
  waiting_minutes INT,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

Penjelasan:
- `waiting_minutes` boleh `NULL` sebelum appointment selesai.
- `notes` boleh `NULL` karena opsional.
- `status` wajib dengan default awal.

---

## 12. Anti-Pattern yang Sering Terjadi

1. Semua kolom dibuat nullable "biar gampang".
2. Simpan angka sebagai string.
3. Simpan tanggal sebagai string.
4. Pakai `FLOAT` untuk uang.
5. Tidak memberi default untuk kolom audit.

---

## 13. Dampak Data Type ke Performansi

Data type memengaruhi:
- ukuran row,
- ukuran index,
- cache efficiency.

Kolom terlalu besar:
- IO meningkat,
- index lebih berat.

Kolom terlalu sempit:
- gagal simpan data valid.

Keseimbangan penting.

---

## 14. Migrasi Perubahan Data Type

Perubahan type di production bisa berisiko:
- lock tabel,
- downtime,
- cast gagal.

Strategi aman:
1. tambah kolom baru.
2. backfill bertahap.
3. validasi.
4. switch aplikasi.
5. drop kolom lama.

---

## 15. Validasi Domain di Level DB

Selain data type:
- pakai `CHECK`,
- pakai `NOT NULL`,
- pakai `UNIQUE`.

Tujuan:
- data bersih sejak masuk.

---

## 16. Query Audit Kualitas Data

Cari data yang seharusnya tidak null:

```sql
SELECT id
FROM patients
WHERE full_name IS NULL;
```

Cari string kosong:

```sql
SELECT id
FROM patients
WHERE trim(full_name) = '';
```

---

## 17. Mini Latihan

Gunakan tabel:
- `patients(id, full_name, phone_number, is_active, created_at)`

Latihan:
1. Tentukan data type ideal tiap kolom.
2. Tentukan kolom mana yang `NOT NULL`.
3. Tentukan default yang tepat untuk audit kolom.
4. Tulis query mendeteksi data kosong/invalid.
5. Buat desain untuk kolom `gender` yang aman (hindari free text).

---

## 18. Jawaban Contoh Mini Latihan (Singkat)

1. `id BIGINT`, `full_name VARCHAR(120)`, `phone_number VARCHAR(20)`, `is_active BOOLEAN`, `created_at TIMESTAMP`.
2. `id`, `full_name`, `is_active`, `created_at` sebaiknya `NOT NULL`.
3. `is_active DEFAULT true`, `created_at DEFAULT NOW()`.
4. Gunakan `IS NULL` + cek string kosong.
5. Gunakan enum/check constraint sesuai standar domain.

---

## 19. Checklist Kelulusan Topik 6

Kamu dianggap lulus jika bisa:
- memilih data type sesuai domain,
- menjelaskan beda `NULL`, `''`, dan `0`,
- memakai `IS NULL`/`IS NOT NULL` dengan benar,
- memahami kapan default berlaku,
- mendesain tabel yang tidak "asal nullable",
- menghindari anti-pattern data type kritikal.

---

## 20. Ringkasan Brutal

- Data type salah = utang teknis mahal.
- `NULL` tidak dipahami = bug logika diam-diam.
- Default tidak tepat = data tidak konsisten.

Kuasai topik ini sebelum masuk optimasi query lanjutan.
