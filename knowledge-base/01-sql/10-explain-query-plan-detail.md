# SQL EXPLAIN / Query Plan - Penjelasan Detail

## Tujuan Topik

Topik ini membahas cara membaca query plan dengan:
- `EXPLAIN`
- `EXPLAIN ANALYZE` (jika tersedia)

Tujuan:
- paham kenapa query lambat,
- bukan menebak-nebak optimasi.

---

## 1. Kenapa EXPLAIN Wajib?

SQL yang "kelihatan benar" belum tentu cepat.
Tanpa plan:
- kamu cuma spekulasi.

Dengan plan:
- kamu lihat jalur eksekusi nyata:
  - scan apa yang dipakai,
  - join strategy,
  - estimasi baris,
  - biaya operasi.

---

## 2. EXPLAIN vs EXPLAIN ANALYZE

`EXPLAIN`:
- tampilkan rencana eksekusi (estimasi).

`EXPLAIN ANALYZE`:
- jalankan query dan tampilkan runtime aktual (engine dependent).

Gunakan:
- `EXPLAIN` saat aman cepat.
- `EXPLAIN ANALYZE` untuk investigasi performa dengan hati-hati.

---

## 3. Komponen Umum Query Plan

Umumnya kamu akan lihat:
- node scan (`Seq Scan`, `Index Scan`)
- node join (`Nested Loop`, `Hash Join`, `Merge Join`)
- sort/aggregate
- estimated rows vs actual rows
- cost / time

Nama detail berbeda per engine, tapi konsep sama.

---

## 4. Jenis Scan Dasar

### Seq Scan

Database baca tabel dari awal sampai akhir.
Normal untuk tabel kecil.
Berisiko lambat untuk tabel besar jika filter selektif.

### Index Scan

Database pakai index untuk ambil subset data.
Bagus untuk filter selektif dan index tepat.

### Index Only Scan (jika tersedia)

Semua data bisa diambil dari index tanpa baca heap/table utama.
Biasanya lebih cepat.

---

## 5. Join Strategy Dasar

### Nested Loop

Bagus jika satu sisi kecil dan sisi lain terindeks.

### Hash Join

Sering bagus untuk join dataset menengah-besar tanpa index cocok.

### Merge Join

Efektif untuk input yang sudah/sedang diurutkan.

Poin penting:
- jangan fanatik satu strategi.
- lihat konteks data.

---

## 6. Contoh Query dan Investigasi

Query:

```sql
SELECT *
FROM appointments
WHERE doctor_id = 10
  AND schedule_at >= '2026-01-01';
```

Jika plan menunjukkan `Seq Scan` di tabel besar:
- kemungkinan index belum ada/tidak cocok.

Calon perbaikan:
- index pada `(doctor_id, schedule_at)`.

---

## 7. Estimation Error

Masalah umum:
- estimated rows jauh dari actual rows.

Dampak:
- optimizer pilih plan yang buruk.

Penyebab:
- statistik usang,
- distribusi data miring/skew,
- predicate kompleks.

Tindakan:
- update statistics,
- evaluasi query rewrite,
- cek data skew.

---

## 8. Sort Mahal

Node `Sort` bisa mahal untuk data besar.

Tanda:
- time tinggi,
- memory spill ke disk (tergantung engine info).

Perbaikan:
- kurangi dataset sebelum sort,
- gunakan index yang mendukung order/filter.

---

## 9. Aggregate Mahal

`GROUP BY` besar bisa mahal.

Cek:
- jumlah baris masuk ke aggregate,
- apakah bisa filter lebih awal,
- apakah bisa pre-aggregation.

---

## 10. Filter Pushdown

Filter sebaiknya terjadi sedini mungkin.

Kalau filter terlambat:
- banyak baris diproses sia-sia.

Review query:
- apakah kondisi bisa dipindah lebih awal?
- apakah join dilakukan sebelum filter padahal tidak perlu?

---

## 11. Index dan EXPLAIN

Index tidak otomatis dipakai.

Alasan index diabaikan:
- selektivitas buruk,
- cast fungsi membuat index tidak efektif,
- statistik optimizer tidak akurat.

Contoh anti-pattern:

```sql
WHERE DATE(schedule_at) = '2026-04-16'
```

Lebih baik:

```sql
WHERE schedule_at >= '2026-04-16'
  AND schedule_at < '2026-04-17'
```

---

## 12. EXPLAIN untuk Query JOIN

Cek:
1. urutan join
2. jenis join
3. baris tiap node
4. scan tiap tabel

Jika join meledak:
- mungkin join key salah,
- mungkin cardinality one-to-many tidak dipahami,
- mungkin filter penting belum diterapkan awal.

---

## 13. Investigasi Sistematis

Langkah:
1. ambil query lambat dari slow query log.
2. jalankan `EXPLAIN`.
3. identifikasi node paling mahal.
4. hipotesis perbaikan (index/rewrite/filter).
5. uji ulang dengan `EXPLAIN ANALYZE`.
6. bandingkan sebelum-sesudah.

Ini lebih profesional daripada trial-and-error liar.

---

## 14. Metrik yang Perlu Dicatat

Saat optimasi, catat:
- query text versi sebelum/sesudah,
- runtime p50/p95,
- rows processed,
- plan snapshot,
- perubahan index/schema.

Tanpa catatan, tim tidak bisa audit hasil.

---

## 15. Kesalahan Umum Pemula

1. Menambah index tanpa lihat plan.
2. Menganggap `SELECT *` tidak berdampak.
3. Tidak cek actual vs estimated rows.
4. Optimasi query yang bukan bottleneck.
5. Tidak uji pada data volume realistis.

---

## 16. Best Practices EXPLAIN

- Mulai dari query paling lambat dan paling sering dipakai.
- Optimasi berbasis bukti, bukan intuisi.
- Simpan baseline dan hasil perbaikan.
- Hati-hati menjalankan `EXPLAIN ANALYZE` pada query berat di production.
- Sinkronkan perbaikan dengan tim backend dan DBA.

---

## 17. Studi Kasus Healthcare

Kasus:
- dashboard admin lambat saat buka daftar appointment hari ini.

Investigasi:
1. query log menunjukkan p95 = 4.8 detik.
2. plan menunjukkan seq scan pada `appointments`.
3. filter utama pakai `doctor_id` dan rentang waktu.
4. tambah index komposit `(doctor_id, schedule_at)`.
5. p95 turun jadi 650ms.

Pelajaran:
- bottleneck jelas,
- solusi tepat sasaran.

---

## 18. Mini Latihan

Latihan:
1. Ambil query filter sederhana dan baca plan-nya.
2. Identifikasi node scan yang dipakai.
3. Buat satu index yang relevan.
4. Bandingkan plan sebelum/sesudah.
5. Catat metrik runtime.

---

## 19. Checklist Kelulusan Topik 10

Kamu dianggap lulus jika bisa:
- membaca komponen dasar query plan,
- mengenali scan/join mahal,
- membedakan estimasi vs aktual,
- mengusulkan optimasi berbasis plan,
- membuktikan dampak optimasi dengan metrik.

---

## 20. Ringkasan Brutal

- EXPLAIN itu alat wajib, bukan opsional.
- Optimasi tanpa plan = tebak-tebakan.
- Senior SQL engineer selalu bawa bukti performa.
