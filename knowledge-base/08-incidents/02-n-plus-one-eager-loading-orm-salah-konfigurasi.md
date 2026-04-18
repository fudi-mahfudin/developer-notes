# #02 — N+1 pada eager loading ORM yang salah konfigurasi

**Indeks:** [`README.md`](./README.md) · **ID:** `#02` · **Kategori:** Database & transaksi

---

## Ringkasan

**Eager loading** pada ORM dimaksudkan untuk menghindari N+1 dengan memuat relasi sekaligus. Namun **salah konfigurasi**—`include`/`relations` yang memicu **subquery per baris**, **join yang tidak sesuai cardinality**, atau **deep graph default**—masih menghasilkan pola **1 + N** atau **1 + k×N** di production. Di sistem healthcare, endpoint seperti daftar order lab atau appointment sering memuat pasien, layanan, dan lokasi; satu “switch include” yang naif dapat melipatgandakan round-trip SQL tanpa tim sadar sampai staging menyerupai volume production.

---

## Mitigasi ideal (~60 detik)

“Bedanya dengan N+1 loop manual: di ORM kita *kira* sudah eager, tapi SQL yang keluar tetap **per-row subselect** atau **JOIN** yang membesar tidak terkontrol. Mitigasinya: **baca SQL nyata** dari log ORM atau `EXPLAIN`, lalu sesuaikan—pakai **join eksplisit dengan proyeksi kolom**, **batch `IN`**, atau **DataLoader**; hindari **nested include** mendalam untuk layar list; untuk one-to-many berat, **pisahkan** query agregat atau pagination relasi. Setelah ubah konfigurasi, **hitung query per request**—harus **plat** saat `limit` naik, bukan linear. Di healthcare, kita juga cek bahwa eager tidak menarik **PHI berlebih** ke response list.”

*Perkiraan durasi ucapan: ~55–65 detik (Bahasa Indonesia, tempo presentasi teknis).*

---

## Definisi operasional

- **Eager loading benar:** satu atau sedikit statement SQL yang membawa semua parent + relasi yang diperlukan untuk response, atau batch `IN` terkontrol.
- **Eager loading palsu:** ORM menampilkan API `include: { all: true }` atau rantai relasi yang di bawah kap mesin menghasilkan **SELECT** berulang per `id` parent, atau **JOIN** yang meledak karena one-to-many tanpa limit.

---

## Mengapa pola ini sangat umum di healthcare

1. **Domain relasi dalam** (pasien → encounter → order → hasil) mendorong `include` bertingkat.
2. **Generator / boilerplate** mengaktifkan relasi default untuk “kemudahan”.
3. **Tim full-stack** mengandalkan dokumentasi ORM tanpa verifikasi SQL aktual pada dataset besar.
4. **Soft delete / filter fasilitas** kadang dipasang di layer yang memicu **lazy load tambahan** setelah eager pertama.

---

## Pola gagal (ilustrasi)

```text
// Terlihat “eager”, SQL bisa tetap N+1 jika ORM memilih strategi subquery per row
findMany({ include: { patient: true, orders: { include: { lines: true } } } })
```

Produsen query mungkin mengeluarkan satu SELECT encounter + **N** SELECT orders atau lines bergantung pada dialect dan versi ORM.

---

## Gejala di production

- Latency naik ketika tim menambah **include** baru pada endpoint yang sama.
- Jumlah statement SQL **linear** dengan ukuran halaman walau sudah pakai eager.
- CPU DB tinggi pada pola SELECT berparameter identik dengan `WHERE … = ?` berganti ID.

---

## Diagnosis

1. Aktifkan **SQL logging** di staging dengan volume realistis.
2. Gunakan **query counter middleware** pada satu endpoint.
3. Bandingkan plan **Prisma `query` events**, **TypeORM logging**, atau trace di APM untuk melihat pengulangan.

---

## Mitigasi yang disarankan

1. **Verifikasi strategi load:** paksa `join` vs `select-in` sesuai dokumentasi ORM untuk kasus Anda.
2. **Batasi kedalaman include** pada endpoint list; detail pindahkan ke endpoint `GET /resource/:id`.
3. **Projection eksplisit:** `select` kolom yang dibutuhkan UI list, bukan seluruh entitas.
4. **GraphQL:** DataLoader untuk field yang mengarah ke DB.

---

## Trade-off dan risiko

- Join besar bisa **membengkakkan row** (duplikasi parent) jika one-to-many tidak di-pagination di SQL.
- Batch `IN` dengan daftar ID sangat panjang bisa mendekati limit parameter—perlu chunking.
- Terlalu banyak **micro-endpoint** untuk menghindari join bisa membebani frontend dengan banyak request—keseimbangan desain.

---

## Aspek khusus healthcare

- **Daftar encounter/order** sering membutuhkan status sensitif—pastikan kolom PHI tidak ikut ter-select oleh eager yang luas.
- **Multi-tenant:** filter organisasi harus ada di query utama, bukan filter di memori setelah fetch besar.

---

## Checklist review PR

- [ ] Log SQL menunjukkan **tidak** ada pola SELECT berulang per ID untuk satu request list.
- [ ] Include pada list endpoint **dibatasi** sesuai UI; tidak ada deep graph tanpa kebutuhan bisnis.
- [ ] Ditambahkan tes atau checklist manual **query count** saat mengubah relasi.

---

## Kata kunci untuk pencarian

`eager loading`, `ORM N+1`, `Prisma include`, `TypeORM relations`, `subquery per row`, `select in strategy`

---

## Referensi internal

- [`README.md`](./README.md) · **#01** (N+1 daftar encounter), **#03** (index untuk filter).
