# #05 — Partial / composite index salah urutan kolom

**Indeks:** [`README.md`](./README.md) · **ID:** `#05` · **Kategori:** Database & transaksi

---

## Ringkasan

**Composite index** hanya dapat memanfaatkan **leading prefix** kolom untuk predicate equality/range secara efisien. Urutan `(facility_id, visit_date)` vs `(visit_date, facility_id)` mengubah planner sepenuhnya untuk query yang sama. **Partial index** salah predicate—misalnya indeks pada `WHERE status = 'scheduled'` tetapi query menggunakan `status IN (...)` atau mengabaikan kolom partition—menyebabkan optimiser **tidak memilih** indeks yang dibuat dengan susah payah. Di healthcare, salah urutan sering terlihat pada filter **cabang rumah sakit + rentang tanggal kunjungan**.

---

## Mitigasi ideal (~60 detik)

“Masalahnya **leading column** tidak cocok dengan cara kita query. Composite index itu seperti kamus: kalau query tidak menyentuh kolom pertama dengan equality atau range yang selaras, index itu tidak bisa dipakai untuk filter berikutnya. Mitigasinya: tuliskan pola query utama—misalnya selalu `facility_id = ? AND visit_day BETWEEN …`—lalu tempatkan **facility_id dulu**. Untuk partial index, predicate harus **match persis** dengan apa yang ada di WHERE produksi termasuk nullable. Buktikan dengan **EXPLAIN**—harus keluar **Index Scan** atau **Bitmap Index Scan**, bukan seq scan. Sesuaikan juga dengan **ORDER BY** jika list dipaginate.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Leading edge:** kolom pertama dalam indeks komposit yang dapat dipakai planner.
- **Partial index:** indeks pada subset baris dengan `WHERE <predicate>` statis di definisi indeks.

---

## Mengapa pola ini sangat umum di healthcare

1. Kebutuhan laporan berganti—query awal diasumsikan sama selamanya.
2. Kolom baru (misalnya **care_program_id**) ditambahkan tanpa reorganisasi indeks.
3. Predicate soft delete tidak konsisten antara aplikasi (`deleted_at`) dan indeks partial.

---

## Pola gagal (ilustrasi)

```sql
CREATE INDEX idx_enc_fac_date ON encounters (facility_id, visit_date);
-- Query prod: WHERE visit_date = today AND facility_id IS NULL untuk national dashboard → leading edge tidak terpakai seperti yang diharapkan
```

---

## Gejala di production

- Planner memilih sequential scan untuk query yang “seharusnya indeks”.
- Pengembang menambahkan index baru tanpa menghapus yang salah urutan → [#04](04-terlalu-banyak-index-write-lambat.md).

---

## Diagnosis

1. Bandingkan definisi indeks dengan **parameterized slow queries**.
2. `EXPLAIN` dengan `ANALYZE` dan lihat **Filter** vs **Index Cond**.
3. Periksa **correlation** dan cardinalitas dengan `pg_stats`.

---

## Mitigasi yang disarankan

1. Redefinisikan composite sesuai urutan equality → range → order by.
2. Tambahkan **partial index** terpisah untuk subset traffic besar (misalnya status aktif).
3. Dokumentasikan **query canonik** yang index dukung.

---

## Trade-off dan risiko

- Mengubah urutan index memerlukan **rebuild** dan jendela maintenance.
- Terlalu banyak partial index untuk variasi predicate kecil bisa mengacaukan planner.

---

## Aspek khusus healthcare

- Dashboard per **cabang** vs nasional mengubah leading column yang tepat—kadang perlu dua indeks berbeda dengan dokumentasi pemakaian.

---

## Checklist review PR

- [ ] Index baru punya **contoh query** yang membuktikan leading edge terpakai.
- [ ] Partial index predicate cocok dengan ORM-generated SQL.

---

## Kata kunci untuk pencarian

`composite index column order`, `leading column`, `partial index predicate`, `EXPLAIN`

---

## Contoh konkret (healthcare)

Pasien mencari kunjungan berdasarkan **tanggal + cabang**. Indeks `(visit_date, facility_id)` dibuat ketika workload mayoritas adalah laporan bulanan lintas cabang—namun aplikasi registrasi menghasilkan query `WHERE facility_id = X AND visit_date = today`. Dengan statistics tertentu planner tetap bisa memilih seq scan atau indeks tidak efisien sampai composite diubah menjadi `(facility_id, visit_date)` dan dibantu partial index aktif.

---

## Referensi internal

- [`README.md`](./README.md) · **#03**, **#04**.
