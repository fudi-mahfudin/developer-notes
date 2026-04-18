# #04 — Terlalu banyak index → write lambat dan maintenance berat

**Indeks:** [`README.md`](./README.md) · **ID:** `#04` · **Kategori:** Database & transaksi

---

## Ringkasan

Setiap **INSERT**, **UPDATE**, dan **DELETE** pada baris harus **memperbarui semua indeks sekunder** yang mencakup kolom yang berubah. Ketika tim menambahkan indeks secara defensif untuk setiap laporan ad hoc, tabel transaksi tinggi—misalnya **order farmasi**, **audit event**, atau **hasil lab mentah**—mengalami **write amplification**. Di production Node.js, ekstra latency DB memanjangkan transaksi, meningkatkan contention, dan memperbesar risiko **lock timeout** pada jam puncak rumah sakit.

---

## Mitigasi ideal (~60 detik)

“Terlalu banyak index bikin **tulis dan update jadi mahal**, karena tiap index harus ikut di-update. Mitigasinya: **audit index yang ada**—hapus yang redundan atau tidak pernah dipakai planner; gabungkan yang overlap ke **composite**; untuk laporan berat pertimbangkan **materialized view** atau **OLAP** sink, bukan index ke-15 di tabel hot. Pantau **`pg_stat_user_indexes`** atau DMVs di SQL Server untuk **idx_scan** rendah. Di healthcare, tabel order dan encounter sering hot—index harus **prioritas query pasien aktif**, bukan semua dashboard historis.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Write amplification:** jumlah indeks × frekuensi update baris.
- **Redundant index:** `(a)` dan `(a,b)` dengan query yang tidak membutuhkan `(a)` sendiri—kadang bisa dirapikan (tergantung DB).

---

## Mengapa pola ini sangat umum di healthcare

1. Laporan regulasi dan billing menuntut banyak kombinasi filter → indeks ditambahkan tanpa review holistik.
2. Tim takut slow query → menambah index daripada memperbaiki query.
3. Lingkungan multi-tenant menambah kolom `tenant_id` tanpa menyusun ulang indeks lama.

---

## Pola gagal (ilustrasi)

```sql
CREATE INDEX idx_enc_1 ON encounters (patient_id);
CREATE INDEX idx_enc_2 ON encounters (patient_id, facility_id);
CREATE INDEX idx_enc_3 ON encounters (facility_id, patient_id);
-- Overlap tanpa dokumentasi pemakaian query
```

---

## Gejala di production

- Latency **INSERT/UPDATE** naik setelah rilis yang “menambah index untuk laporan”.
- Autovacuum / maintenance window memakan waktu lebih lama.
- Ukuran disk DB membengkak lebih cepat dari pertumbuhan data mentah.

---

## Diagnosis

1. Postgres: `pg_stat_user_indexes` — index dengan `idx_scan = 0` dalam periode panjang.
2. SQL Server: missing/low usage DMV index usage stats.
3. Bandingkan **write throughput** sebelum dan sesudah penambahan index pada load test.

---

## Mitigasi yang disarankan

1. **Drop / merge** index redundan setelah verifikasi plan query.
2. **Partial / filtered** index untuk subset yang memang dipisah di query.
3. Alihkan workload analitik ke **replica read-only** atau pipeline batch.
4. Dokumentasikan **owner index** dan kasus penggunaan di ADR.

---

## Trade-off dan risiko

- Menghapus index bisa memperlambat query tertentu—harus ada **baseline EXPLAIN** sebelum/sesudah.
- Composite index salah urutan bisa tidak membantu—koordinasi dengan [#05](05-partial-composite-index-urutan-salah.md).

---

## Aspek khusus healthcare

- **Order obat high-frequency:** setiap milidetik ekstra pada insert mempengaruhi antrian farmasi.
- **Audit tables:** indexing harus selektif agar tidak mengorbankan ingest event besar.

---

## Checklist review PR

- [ ] Index baru punya **justifikasi query** dan perkiraan dampak write.
- [ ] Dicek redundansi dengan index yang ada.
- [ ] Tidak menambah index pada tabel hot tanpa load test.

---

## Kata kunci untuk pencarian

`index bloat`, `write amplification`, `pg_stat_user_indexes`, `unused index`, `composite vs redundant`

---

## Referensi internal

- [`README.md`](./README.md) · **#03**, **#05**.
