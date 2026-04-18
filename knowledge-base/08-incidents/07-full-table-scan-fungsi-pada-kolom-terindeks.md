# #07 — Full table scan karena fungsi pada kolom terindeks

**Indeks:** [`README.md`](./README.md) · **ID:** `#07` · **Kategori:** Database & transaksi

---

## Ringkasan

Predikat seperti `WHERE lower(email) = lower($1)` atau `WHERE date_trunc('day', started_at) = ...` membuat database **tidak dapat** menggunakan indeks B-tree biasa pada kolom mentah—fungsi membungkus kolom sehingga seluruh tabel harus dievaluasi. Di aplikasi healthcare Node.js, pola ini sering muncul dari **case-insensitive** login email pasien atau **perbandingan tanggal** yang dipusatkan di SQL tanpa index ekspresi.

---

## Mitigasi ideal (~60 detik)

“Masalahnya kita membungkus kolom dengan fungsi—optimizer tidak bisa pakai indeks normal. Mitigasinya: **index ekspresi** yang sama dengan fungsi query (`lower(email)`), atau ubah model data—misalnya simpan **email sudah lower-case** dan enforce di app; untuk tanggal pakai **range** `started_at >= $day AND started_at < $day+1` daripada `date_trunc`. Kalau tetap perlu fungsi kompleks, pertimbangkan **kolom generated** yang terindeks. Bukti dengan EXPLAIN harus menunjukkan **Index Scan** pada indeks ekspresi, bukan Seq Scan penuh.”

*Perkiraan durasi ucapan: ~55–65 detik.*

---

## Definisi operasional

- **Sargable:** predicate dapat memanfaatkan indeks (tanpa fungsi pada kolom terindeks).
- **Non-sargable:** fungsi pada kolom → scan luas.

---

## Mengapa pola ini sangat umum di healthcare

1. Pencarian pasien **tidak case-sensitive** pada nama/email.
2. **Laporan harian** memakai `date_trunc` agar mudah dibaca tim bisnis.
3. ORM abstraction menghasilkan SQL yang “rapi” tetapi tidak sargable.

---

## Pola gagal (ilustrasi)

```sql
SELECT * FROM patients WHERE lower(email) = $1;
-- Tanpa index expression pada lower(email) → sequential scan
```

---

## Gejala di production

- Endpoint login / cari pasien lambat meski “ada index email”.
- CPU DB tinggi pada query yang seharusnya point lookup.

---

## Diagnosis

1. `EXPLAIN` menunjukkan **Seq Scan** pada tabel besar.
2. Bandingkan dengan rewrite predicate range untuk timestamp.

---

## Mitigasi yang disarankan

1. **Index ekspresi** `(lower(email))` atau citext di Postgres.
2. **Normalize** data di aplikasi + constraint check.
3. **Generated column** untuk potongan tanggal jika query tidak bisa diubah.

---

## Trade-off dan risiko

- Index ekspresi menambah biaya write—monitor ukuran dan [#04](04-terlalu-banyak-index-write-lambat.md).
- Normalisasi email mempengaruhi integrasi legacy—komunikasikan ke tim integrasi.

---

## Aspek khusus healthcare

- Email portal pasien dan **identifier** internasional sering membutuhkan case-insensitive match—desain indeks harus mengikuti kebijakan privasi (tidak log email plaintext).

---

## Checklist review PR

- [ ] Tidak ada fungsi pada kolom filter utama tanpa indeks pendamping.
- [ ] Query ORM di-review SQL aktual untuk sargability.

---

## Kata kunci untuk pencarian

`sargable`, `index expression`, `lower(email)`, `functional index`, `date_trunc`

---

## Catatan tambahan operasional

Latih tim untuk melihat **SQL aktual** dari Prisma/TypeORM saat review—ORM mudah menyembunyikan fungsi implisit pada kolom datetime atau string.

---

## Referensi internal

- [`README.md`](./README.md) · **#03**.
