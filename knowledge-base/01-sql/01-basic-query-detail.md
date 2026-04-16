# SQL Basic Query - Penjelasan Detail

## Tujuan Topik

Topik ini membahas fondasi query SQL yang wajib dikuasai:
- `SELECT`
- `FROM`
- `WHERE`
- `ORDER BY`
- `LIMIT`

Kalau fondasi ini lemah, query lanjut (join, CTE, window function) akan selalu berantakan.

---

## 1. Struktur Dasar Query

Bentuk umum:

```sql
SELECT kolom1, kolom2
FROM nama_tabel
WHERE kondisi
ORDER BY kolom_sort ASC
LIMIT 10;
```

Penjelasan:
- `SELECT`: kolom apa yang ingin ditampilkan.
- `FROM`: sumber data (tabel/view).
- `WHERE`: filter baris.
- `ORDER BY`: urutan hasil.
- `LIMIT`: jumlah maksimum baris yang ditampilkan.

---

## 2. Urutan Eksekusi Logis SQL

Walaupun ditulis dari `SELECT`, mesin SQL membaca secara logis seperti ini:
1. `FROM`
2. `WHERE`
3. `SELECT`
4. `ORDER BY`
5. `LIMIT`

Contoh:

```sql
SELECT id, full_name
FROM patients
WHERE is_active = true
ORDER BY full_name ASC
LIMIT 5;
```

Artinya:
- ambil data dari `patients`,
- saring yang aktif,
- pilih kolom `id` dan `full_name`,
- urutkan nama A-Z,
- ambil 5 teratas.

---

## 3. SELECT: Memilih Kolom dengan Benar

### Pilih kolom spesifik (direkomendasikan)

```sql
SELECT id, full_name, phone_number
FROM patients;
```

Kenapa:
- lebih cepat (kolom yang diambil lebih sedikit),
- lebih jelas dibaca,
- lebih aman (menghindari ambil data sensitif tidak perlu).

### Hindari `SELECT *` di production

```sql
SELECT *
FROM patients;
```

Masalah:
- ambil semua kolom walau tidak dipakai,
- rapuh saat schema berubah,
- bisa bocorkan PII jika query dipakai lintas layer.

---

## 4. WHERE: Filter Data

### Operator umum

```sql
SELECT id, full_name
FROM patients
WHERE city = 'Jakarta';
```

```sql
SELECT id, full_name
FROM patients
WHERE age >= 17;
```

```sql
SELECT id, full_name
FROM patients
WHERE city = 'Jakarta' AND is_active = true;
```

```sql
SELECT id, full_name
FROM patients
WHERE city IN ('Jakarta', 'Bandung');
```

### Hati-hati dengan `NULL`

Salah:

```sql
SELECT id
FROM patients
WHERE phone_number = NULL;
```

Benar:

```sql
SELECT id
FROM patients
WHERE phone_number IS NULL;
```

```sql
SELECT id
FROM patients
WHERE phone_number IS NOT NULL;
```

---

## 5. ORDER BY: Mengurutkan Hasil

```sql
SELECT id, full_name, created_at
FROM patients
ORDER BY created_at DESC;
```

- `ASC` = kecil ke besar / A ke Z (default)
- `DESC` = besar ke kecil / terbaru ke terlama

Tips:
- selalu pakai `ORDER BY` saat menggunakan `LIMIT`, supaya hasil konsisten.

---

## 6. LIMIT: Membatasi Jumlah Data

```sql
SELECT id, full_name
FROM patients
ORDER BY created_at DESC
LIMIT 20;
```

Fungsi:
- debugging lebih cepat,
- mengurangi beban query,
- dasar pagination.

Catatan:
- tanpa `ORDER BY`, `LIMIT` bisa ambil baris acak tergantung engine/execution plan.

---

## 7. Aliasing untuk Keterbacaan

```sql
SELECT
  p.id AS patient_id,
  p.full_name AS patient_name
FROM patients AS p
WHERE p.is_active = true;
```

Kegunaan:
- query lebih pendek,
- menghindari ambigu saat nanti pakai join.

---

## 8. DISTINCT: Mengambil Nilai Unik

`DISTINCT` dipakai untuk menghapus duplikasi dari hasil query.

Contoh:

```sql
SELECT DISTINCT city
FROM patients;
```

Artinya:
- jika ada 1.000 pasien dari Jakarta, hasil tetap tampil 1 baris `Jakarta`.

### DISTINCT di lebih dari satu kolom

```sql
SELECT DISTINCT city, is_active
FROM patients;
```

Penting:
- SQL akan menganggap kombinasi `(city, is_active)` sebagai pasangan unik.
- Bukan unik per kolom satuan.

### Kapan DISTINCT tepat dipakai

- Membuat daftar nilai unik untuk filter/dropdown.
- Cek cepat anomali data duplikat.
- Menghindari hasil ganda dari query eksplorasi data.

### Jebakan umum DISTINCT

1. Dipakai untuk "menutupi" join yang salah.
2. Dipakai di query besar tanpa perlu, membuat query lebih berat.
3. Mengira `DISTINCT` menyelesaikan masalah kualitas data permanen.

Prinsip tegas:
- kalau duplikasi muncul karena desain join salah, perbaiki join-nya; jangan ditutup pakai `DISTINCT`.

---

## 9. Kesalahan Umum Pemula

1. Pakai `SELECT *` terus-menerus.
2. Lupa `WHERE`, lalu update/delete semua data (fatal).
3. Salah menangani `NULL`.
4. Pakai `LIMIT` tanpa `ORDER BY`.
5. Menaruh logic bisnis kompleks di query sederhana tanpa validasi.
6. Memakai `DISTINCT` untuk menyembunyikan query yang salah.

---

## 10. Praktik Baik (Best Practices)

- Selalu sebut kolom secara eksplisit.
- Gunakan nama kolom dan alias yang jelas.
- Pastikan filter di kolom yang relevan dengan index.
- Cek hasil query kecil dulu sebelum dipakai di kode aplikasi.
- Untuk data sensitif, ambil minimum kolom yang benar-benar dibutuhkan.

---

## 11. Mini Latihan

Gunakan tabel `patients(id, full_name, city, is_active, created_at)`:

1. Ambil 10 pasien aktif terbaru.
2. Ambil pasien dari Jakarta atau Bandung.
3. Ambil pasien yang belum punya nomor telepon (`NULL`).
4. Ambil daftar nama pasien, urut A-Z.
5. Ambil daftar kota unik pasien (tanpa duplikasi).

Contoh jawaban nomor 1:

```sql
SELECT id, full_name, created_at
FROM patients
WHERE is_active = true
ORDER BY created_at DESC
LIMIT 10;
```

---

## 12. Checklist Kelulusan Topik Basic Query

Kamu dianggap lulus topik ini jika sudah bisa:
- menulis query `SELECT-FROM-WHERE-ORDER BY-LIMIT` tanpa lihat contekan,
- menjelaskan beda `IS NULL` vs `= NULL`,
- menjelaskan fungsi `DISTINCT` dan kapan tidak boleh dipakai,
- konsisten menghindari `SELECT *` untuk query aplikasi,
- menulis query yang hasilnya konsisten dan bisa direview tim.
