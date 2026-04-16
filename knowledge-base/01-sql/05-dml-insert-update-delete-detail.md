# SQL DML (INSERT, UPDATE, DELETE) - Penjelasan Detail

## Tujuan Topik

Topik ini membahas operasi inti manipulasi data:
- `INSERT` (menambah data)
- `UPDATE` (mengubah data)
- `DELETE` (menghapus data)

Ini operasi paling berisiko. Salah 1 query bisa merusak data production.

---

## 1. Konsep DML

DML (`Data Manipulation Language`) dipakai untuk mengubah isi tabel.

Berbeda dari `SELECT` yang hanya membaca data, DML menulis perubahan permanen (kecuali dibatalkan transaction).

---

## 2. INSERT - Menambah Data

### Bentuk dasar

```sql
INSERT INTO patients (id, full_name, city, is_active)
VALUES (101, 'Rina', 'Jakarta', true);
```

Prinsip:
- selalu sebut daftar kolom,
- jangan mengandalkan urutan kolom default tabel.

### Insert banyak baris

```sql
INSERT INTO patients (id, full_name, city, is_active)
VALUES
  (102, 'Beni', 'Bandung', true),
  (103, 'Sari', 'Surabaya', false);
```

### Insert dari hasil query

```sql
INSERT INTO active_patients_archive (id, full_name, city)
SELECT id, full_name, city
FROM patients
WHERE is_active = true;
```

---

## 3. UPDATE - Mengubah Data

### Bentuk dasar

```sql
UPDATE patients
SET city = 'Yogyakarta'
WHERE id = 101;
```

### Update beberapa kolom

```sql
UPDATE patients
SET
  city = 'Jakarta',
  is_active = true
WHERE id = 103;
```

### Jebakan fatal UPDATE tanpa WHERE

```sql
UPDATE patients
SET is_active = false;
```

Efek:
- semua baris berubah.

Aturan keras:
- sebelum `UPDATE`, selalu jalankan `SELECT` dengan kondisi yang sama untuk cek target baris.

---

## 4. DELETE - Menghapus Data

### Bentuk dasar

```sql
DELETE FROM patients
WHERE id = 103;
```

### Jebakan fatal DELETE tanpa WHERE

```sql
DELETE FROM patients;
```

Efek:
- semua data terhapus.

### Soft delete (praktik umum)

Daripada hapus permanen:

```sql
UPDATE patients
SET deleted_at = NOW()
WHERE id = 103;
```

Kelebihan:
- data masih bisa diaudit atau dipulihkan.

---

## 5. RETURNING (Jika Didukung Engine)

Beberapa database (mis. PostgreSQL) mendukung `RETURNING`.

```sql
INSERT INTO patients (full_name, city, is_active)
VALUES ('Tono', 'Medan', true)
RETURNING id, full_name;
```

Manfaat:
- langsung dapat data hasil perubahan tanpa query tambahan.

---

## 6. DML + Transaction (Wajib Paham)

Untuk perubahan penting, gunakan transaksi:

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 50000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 50000
WHERE id = 2;

COMMIT;
```

Jika ada error:

```sql
ROLLBACK;
```

Tujuan:
- memastikan perubahan terjadi utuh (all-or-nothing).

---

## 7. DML Aman di Production

Checklist sebelum eksekusi:
1. Pastikan ada backup/snapshot jika perubahan besar.
2. Jalankan `SELECT` dulu dengan kondisi `WHERE` yang sama.
3. Cek jumlah baris target.
4. Eksekusi dalam transaction jika memungkinkan.
5. Verifikasi hasil setelah eksekusi.

---

## 8. Kesalahan Umum Pemula

1. `UPDATE`/`DELETE` tanpa `WHERE`.
2. Tidak cek data target sebelum ubah.
3. Tidak pakai transaction untuk perubahan multi-step.
4. Menghapus data yang seharusnya soft delete.
5. Menjalankan query produksi tanpa limit dampak.

---

## 9. Best Practices DML

- Tulis query eksplisit dan mudah direview.
- Gunakan transaction untuk operasi yang saling bergantung.
- Simpan jejak audit untuk perubahan penting.
- Prioritaskan soft delete untuk data bisnis sensitif.
- Uji query di staging dengan data representatif.

---

## 10. Mini Latihan

Gunakan tabel `patients(id, full_name, city, is_active, deleted_at)`:

1. Insert 2 pasien baru.
2. Ubah kota pasien `id=101` menjadi `Bandung`.
3. Nonaktifkan pasien dari kota tertentu.
4. Soft delete pasien `id=103`.
5. Tulis query rollback-safe dengan transaction untuk update 2 tabel.

Contoh jawaban nomor 4:

```sql
UPDATE patients
SET deleted_at = NOW()
WHERE id = 103;
```

---

## 11. Checklist Kelulusan Topik DML

Kamu dianggap lulus jika sudah bisa:
- menulis `INSERT`, `UPDATE`, `DELETE` dengan aman,
- menjelaskan kenapa `WHERE` itu wajib untuk operasi targeted,
- menggunakan transaction untuk operasi multi-step,
- membedakan hard delete vs soft delete sesuai konteks bisnis,
- menjalankan prosedur verifikasi sebelum dan sesudah perubahan data.
