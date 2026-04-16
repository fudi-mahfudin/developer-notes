# Versioning Strategy

## Tujuan

Topik ini penting karena API yang dipakai banyak consumer pasti berubah.
Pertanyaannya bukan apakah perubahan akan datang.
Pertanyaannya adalah bagaimana mengelola perubahan tanpa merusak integrasi yang sudah hidup.

## Kenapa Topik Ini Penting

Tanpa strategy versioning:

- breaking change terjadi diam-diam;
- mobile client lama rusak;
- integrasi partner panik;
- tim backend takut melakukan perbaikan kontrak;
- hutang kompatibilitas menumpuk tanpa arah.

## Model Mental yang Benar

Pegang ini:

1. Versioning adalah alat untuk mengelola perubahan kontrak.
2. Tidak semua perubahan butuh versi baru.
3. Breaking change adalah inti masalah, bukan angka versi itu sendiri.
4. Strategy yang sehat juga harus memikirkan deprecation dan sunset.
5. Versioning buruk bisa sama buruknya dengan tanpa versioning.

## Kapan Perubahan Dianggap Breaking

Contoh breaking:

- hapus field yang dipakai consumer;
- ubah tipe field;
- ubah semantics field;
- ubah status code atau error contract yang dipakai logic client;
- ubah auth requirement tanpa kompatibilitas.

Contoh yang sering non-breaking:

- tambah field opsional;
- tambah endpoint baru;
- tambah enum value hanya jika consumer contract siap;
- tambah metadata opsional.

## Versioning Bukan Pengganti Discipline

Banyak tim berpikir:

- "kalau ada versi, bebas ubah apa saja."

Itu salah.

Semakin banyak versi hidup:

- maintenance naik;
- observability bercabang;
- testing bertambah;
- documentation lebih berat.

Versioning harus mengurangi risiko, bukan menjadi alasan sembrono.

## Bentuk Versioning Umum

- path versioning
- header versioning
- media type versioning

Yang terpenting bukan mode mana paling "murni".
Yang terpenting:

- mudah dipahami;
- mudah dioperasikan;
- mudah didokumentasikan;
- konsisten.

## Path Versioning

Contoh:

- `/v1/orders`
- `/v2/orders`

Kelebihan:

- sangat eksplisit;
- mudah dipahami consumer;
- sederhana untuk routing dan observability.

Kekurangan:

- perubahan versi terlihat sangat kasar;
- kadang menggandakan surface API besar.

## Header Versioning

Contoh:

- `Accept-Version: 2`

Kelebihan:

- URL lebih bersih.

Kekurangan:

- kurang terlihat;
- lebih sulit di-debug manual;
- tooling dan dokumentasi kadang kurang nyaman.

## Media Type Versioning

Secara teori elegan.
Dalam praktik, sering lebih berat bagi banyak tim aplikasi bisnis biasa.

Jangan pilih pendekatan ini hanya karena terdengar advanced.

## Whole API Version vs Resource Evolution

Kadang tim mem-version semua API sekaligus.
Kadang perubahan hanya relevan pada sebagian contract.

Pertanyaan penting:

- apakah perubahan ini cukup besar untuk memotong surface baru?
- atau cukup dikelola dengan additive evolution?

Versioning terlalu sering membuat fragmentasi besar.

## Prefer Additive Evolution

Sebelum membuat versi baru, tanyakan:

- bisakah perubahan dibuat non-breaking?
- bisakah field baru ditambah tanpa menghapus lama?
- bisakah dual support dijalankan sementara?

Sering kali jawaban sehat adalah evolusi additive terlebih dahulu.

## Deprecation

Versioning sehat harus punya jalur deprecation:

- umumkan perubahan;
- beri window migrasi;
- beri dokumentasi transisi;
- sediakan observability untuk mengetahui siapa masih memakai versi lama.

Tanpa deprecation policy, versi lama akan hidup selamanya.

## Sunset Strategy

Setelah deprecated, harus ada pertanyaan:

- kapan versi lama dihentikan?
- bagaimana consumer diberi tahu?
- apa SLA dukungannya?
- apa risk jika dipertahankan terlalu lama?

Kalau tidak ada sunset, versioning berubah jadi museum.

## Mobile App dan Versioning

Mobile client membuat masalah lebih sulit karena:

- update user tidak serentak;
- versi lama bisa hidup lama;
- app store rollout lambat;
- partner app mungkin lebih lambat lagi.

Ini alasan strategi backward compatibility sering jauh lebih bernilai daripada membuat banyak versi baru.

## Contract Testing dan Versioning

Semakin banyak versi, semakin penting memastikan:

- versi lama tetap sesuai janji;
- versi baru memang kompatibel sesuai desain;
- deprecation tidak memecahkan consumer diam-diam.

Versioning tanpa contract discipline akan cepat rusak.

## Semantic Drift

Bahaya besar:

- field masih ada;
- tipe masih sama;
- tetapi maknanya berubah.

Ini breaking change terselubung.
Versioning strategy harus menganggap semantics sama pentingnya dengan shape.

## Enum Evolution

Menambah enum value kadang dianggap aman.
Tidak selalu.

Kalau client:

- hardcode switch tanpa default;
- menganggap set value tertutup,

maka penambahan value baru bisa tetap memecahkan client.

Jadi additive change pun perlu dipikirkan dengan jujur.

## Dual Support Window

Strategi sehat sering berarti:

- support lama dan baru sementara;
- logging/metrics siapa masih pakai versi lama;
- migrasi consumer bertahap;
- baru sunset.

Ini lebih mahal jangka pendek.
Tetapi sering jauh lebih aman.

## Anti-Pattern Umum

### 1. Versioning Terlalu Cepat

Tiap perubahan kecil jadi versi baru.
Maintenance meledak.

### 2. Tidak Pernah Versioning

Breaking change bocor ke production.

### 3. Tidak Ada Deprecation/Sunset Policy

Versi lama hidup selamanya.

### 4. Menganggap Shape Saja yang Penting

Semantics drift tetap memecah client.

## Heuristik Senior

1. Hindari breaking change jika additive evolution masih mungkin.
2. Buat versi baru saat kontrak memang tak bisa dipertahankan tanpa kebohongan.
3. Pilih mekanisme versioning yang paling operasional untuk tim Anda.
4. Selalu siapkan deprecation dan sunset plan.
5. Pantau siapa yang masih memakai versi lama.
6. Ingat bahwa semantics change juga bisa breaking.
7. Semakin sedikit versi aktif, semakin baik, selama consumer tetap aman.

## Pertanyaan Interview

### Dasar

- Kenapa API perlu versioning?
- Apa itu breaking change?
- Apa beda path versioning dan header versioning?
- Kapan perubahan tidak perlu versi baru?

### Menengah

- Kenapa additive change lebih disukai?
- Apa risiko tidak punya sunset strategy?
- Bagaimana Anda mengelola mobile client lama?
- Kenapa penambahan enum value bisa tetap berbahaya?

### Senior

- Bagaimana Anda menentukan kapan sudah waktunya membuat `v2`?
- Bagaimana Anda mendesain deprecation policy yang realistis?
- Bagaimana Anda menjaga jumlah versi aktif tetap terkendali?
- Bagaimana Anda menjelaskan ke stakeholder bahwa beberapa perubahan tidak bisa "langsung diganti" tanpa migration window?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- frontend web dan mobile punya siklus rilis berbeda;
- partner integrasi lambat upgrade;
- backend ingin membersihkan kontrak lama;
- field lama perlu dipensiunkan tanpa mematikan client aktif.

## Ringkasan Brutal

- Versioning adalah alat untuk mengelola breaking change.
- Tidak semua perubahan butuh versi baru.
- Additive evolution biasanya lebih murah daripada proliferasi versi.
- Deprecation tanpa sunset adalah kebohongan.
- Engineer senior memikirkan consumer lifecycle, bukan hanya routing scheme.

## Checklist Pemahaman

- Saya bisa membedakan breaking dan non-breaking change.
- Saya tahu kapan additive evolution lebih baik.
- Saya paham versi baru harus disertai deprecation/sunset plan.
- Saya tidak menyamakan perubahan shape dengan seluruh masalah versioning.
- Saya memikirkan lifecycle consumer yang nyata.

## Penutup

Versioning strategy yang sehat membuat API bisa berkembang tanpa membuat consumer hidup dalam ketakutan permanen.
Itulah tujuan sebenarnya: perubahan tetap mungkin, tapi tidak brutal.
