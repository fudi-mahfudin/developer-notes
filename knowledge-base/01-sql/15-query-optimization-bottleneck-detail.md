# SQL Query Optimization Berbasis Bottleneck Nyata - Penjelasan Detail

## Tujuan Topik

Topik ini membahas optimasi query yang benar:
- berbasis bottleneck nyata
- bukan mitos
- bukan copy-paste tips

Fokus:
- cara berpikir
- alur investigasi
- jenis bottleneck umum
- prioritas optimasi

Query optimization bukan lomba menulis SQL paling rumit.
Tujuannya sederhana:
- lebih cepat,
- lebih stabil,
- lebih murah.

---

## 1. Kenapa "Berbasis Bottleneck" Itu Penting?

Banyak developer optimasi hal yang salah.

Contoh:
- menambah index pada query yang jarang dipakai,
- micro-optimize syntax,
- mengubah query 20ms menjadi 15ms
  padahal ada query lain 8 detik yang diabaikan.

Itu bukan engineering.
Itu distraksi.

---

## 2. Definisi Bottleneck

Bottleneck adalah bagian
yang paling membatasi performa sistem secara nyata.

Dalam query SQL,
bottleneck bisa berupa:
- full table scan besar
- sort mahal
- join mahal
- agregasi berat
- lock wait
- I/O tinggi
- network/data transfer berlebihan

---

## 3. Urutan Investigasi yang Benar

Langkah:
1. cari query lambat/frekuensi tinggi dari log/monitoring.
2. ukur runtime dan volume.
3. baca execution plan.
4. identifikasi node paling mahal.
5. tentukan hipotesis optimasi.
6. uji sebelum/sesudah.
7. cek dampak sistemik.

Kalau tidak ada metrik sebelum/sesudah,
kamu tidak sedang optimasi.

---

## 4. Query Lambat vs Query Mahal

Tidak semua query lambat itu masalah terbesar.

Contoh:
- query 5 detik dipakai 1 kali sehari
- query 300ms dipakai 50.000 kali sehari

Yang kedua bisa lebih mahal secara total.

Karena itu lihat:
- latency
- frequency
- business criticality

---

## 5. Kategori Bottleneck Umum

1. scan terlalu banyak baris
2. join strategy buruk
3. sort ke disk / memory pressure
4. agregasi di volume terlalu besar
5. fungsi/cast mematikan index
6. select terlalu banyak kolom
7. pagination jelek
8. contention/locking

---

## 6. Scan Terlalu Banyak Baris

Gejala:
- `Seq Scan` di tabel besar
- actual rows sangat besar

Penyebab:
- index belum ada
- filter tidak selektif
- query rewrite buruk

Solusi:
- tambah index relevan
- ubah predicate
- kecilkan dataset lebih awal

---

## 7. Join Strategy Buruk

Join bisa mahal jika:
- key salah
- cardinality meledak
- filter datang terlambat
- tidak ada index yang cocok

Tanda:
- actual rows naik drastis setelah join
- runtime tersedot di node join

Solusi:
- review grain data
- filter lebih awal
- pastikan join condition tepat
- cek index kedua sisi

---

## 8. Sort Mahal

Sort mahal saat:
- dataset besar
- order by tidak didukung index
- limit datang terlambat

Solusi:
- gunakan index yang sejalan dengan filter + sort
- kurangi baris sebelum sort
- hindari sort pada kolom yang tidak perlu

---

## 9. Agregasi Mahal

Agregasi mahal jika:
- data mentah sangat besar
- join dilakukan sebelum filter
- metric bisa diprecompute tapi tidak dilakukan

Solusi:
- filter lebih awal
- gunakan pre-aggregation/materialized strategy bila perlu
- cek apakah reporting seharusnya dipisah dari OLTP

---

## 10. Fungsi yang Mematikan Index

Contoh buruk:

```sql
WHERE LOWER(email) = 'a@x.com'
```

atau:

```sql
WHERE DATE(created_at) = '2026-04-16'
```

Sering menyebabkan index biasa tidak dipakai efektif.

Solusi:
- normalisasi data lebih awal,
- pakai range query,
- atau gunakan expression index jika memang tepat.

---

## 11. SELECT Terlalu Banyak Kolom

`SELECT *` sering memperburuk:
- I/O
- network transfer
- memory

Kalau query list hanya butuh 4 kolom,
jangan ambil 30 kolom.

Ini terlihat sepele,
tapi dampaknya nyata pada query sering dipanggil.

---

## 12. Pagination Buruk

Offset besar:

```sql
LIMIT 20 OFFSET 100000
```

sering mahal.

Kenapa:
- database tetap harus melewati banyak baris dulu.

Alternatif:
- keyset/cursor pagination

Contoh:

```sql
WHERE created_at < :last_seen
ORDER BY created_at DESC
LIMIT 20
```

---

## 13. Query Rewrite

Kadang bottleneck tidak selesai hanya dengan index.

Perlu rewrite:
- ubah subquery ke join atau sebaliknya
- gunakan CTE untuk filter bertahap
- ganti `IN` besar dengan join yang lebih cocok
- hindari repeated work

Tapi lagi:
- buktikan dengan plan.

---

## 14. Data Skew

Optimizer bisa salah jika distribusi data tidak merata.

Contoh:
- 95% appointment status = `completed`
- 5% sisanya tersebar kecil

Query dengan status tertentu bisa punya perilaku sangat berbeda.

Jangan menganggap satu query mewakili semua parameter.

---

## 15. Cardinality Awareness

Kamu harus tahu grain data:
- per patient?
- per appointment?
- per doctor?
- per event?

Banyak query lambat dan salah hasil
karena engineer tidak sadar join one-to-many
menggandakan data sebelum agregasi.

---

## 16. Locking / Contention Sebagai Bottleneck

Kadang query lambat bukan karena scan,
tapi karena menunggu lock.

Gejala:
- runtime tinggi
- plan terlihat biasa
- wait event menunjukkan blocking

Solusi:
- pendekkan transaction
- ubah urutan write
- kurangi scope lock

---

## 17. Bottleneck Sistemik

Query optimization tidak berdiri sendiri.

Kadang masalah ada di:
- schema buruk
- index berantakan
- data retention tidak sehat
- query analytics lari di database OLTP utama

Kalau akar masalah arsitektural,
rewrite query kecil tidak cukup.

---

## 18. Studi Kasus Nyata: Dashboard Appointment

Gejala:
- halaman admin butuh 4.5 detik.

Query:
- filter appointment per dokter, hari ini, status aktif
- order by waktu

Temuan:
- seq scan tabel `appointments`
- fungsi `DATE(schedule_at)` mematikan pemanfaatan index

Perbaikan:
1. ubah filter jadi range timestamp
2. tambah index `(doctor_id, schedule_at)`
3. ambil kolom yang dibutuhkan saja

Hasil:
- turun menjadi 420ms

Ini optimasi yang benar:
- masalah jelas,
- perubahan terukur,
- dampak signifikan.

---

## 19. Prioritas Optimasi

Optimalkan dulu:
1. query paling lambat dan sering dipakai
2. query di user-facing critical path
3. query yang memicu contention
4. query reporting berat di jam sibuk

Jangan mulai dari:
- query internal jarang dipakai
- micro-tuning tanpa data

---

## 20. Framework Berpikir Cepat

Saat lihat query lambat, tanya:
1. bottleneck utamanya scan, join, sort, atau lock?
2. apakah filter datang cukup awal?
3. apakah index cocok?
4. apakah query membawa terlalu banyak data?
5. apakah masalahnya seharusnya diselesaikan di schema/arsitektur?

---

## 21. Anti-Pattern Umum

1. Menambah index tanpa baca plan.
2. Rewrite query kompleks tanpa baseline.
3. Mengoptimasi query yang salah hasilnya.
4. Tidak membedakan problem SQL vs problem app cache vs problem lock.
5. Tidak ukur dampak write setelah tambah index.

---

## 22. Best Practices

- selalu mulai dari evidence.
- gunakan slow query log dan metrics.
- cek actual rows, bukan hanya teori.
- dokumentasikan perubahan.
- pastikan optimasi tidak merusak correctness.

---

## 23. Mini Latihan

Latihan:
1. pilih satu query lambat dan klasifikasikan bottleneck-nya.
2. usulkan 2 perbaikan yang berbeda.
3. tentukan mana yang paling murah dan paling aman.
4. jelaskan bagaimana mengukur keberhasilan optimasi.
5. jelaskan kenapa `SELECT *` bisa jadi bottleneck.

---

## 24. Jawaban Contoh Singkat

Mengukur keberhasilan:
- p50/p95 runtime turun,
- rows processed turun,
- load DB turun,
- user-facing latency membaik,
- tidak ada regression correctness.

---

## 25. Checklist Kelulusan Topik 15

Kamu dianggap lulus jika bisa:
- mencari bottleneck nyata dengan metode yang rapi,
- mengklasifikasikan jenis bottleneck query,
- memilih solusi paling relevan,
- mengukur hasil optimasi,
- menolak optimasi palsu yang tidak berdasar bukti.

---

## 26. Ringkasan Brutal

- Optimasi tanpa data = ego, bukan engineering.
- Query cepat bukan hasil trik, tapi hasil diagnosis yang benar.
- Senior engineer tidak sibuk "ngoprek", senior engineer menghilangkan bottleneck yang nyata.
