# Indexing, Query Planning, dan Performance Bottleneck

## Tujuan

Topik ini penting karena banyak engineer melihat query lambat lalu refleks menambah index tanpa memahami bagaimana database benar-benar memilih rencana eksekusi.
Itu sering menghasilkan:

- index berlebihan;
- write makin berat;
- storage membengkak;
- query tetap lambat karena bottleneck-nya bukan di sana.

## Kenapa Topik Ini Penting

Pada sistem produksi, performa database jarang rusak karena satu hal tunggal.
Ia dipengaruhi oleh:

- schema design;
- indexing;
- query shape;
- cardinality data;
- query planner decision;
- join strategy;
- sort/aggregate behavior;
- I/O pattern;
- lock dan contention.

Kalau Anda tidak paham query planner, optimasi Anda sering berubah jadi ritual.

## Definisi Singkat

### Index

Index adalah struktur data tambahan yang membantu database menemukan baris lebih cepat untuk pola akses tertentu.

### Query Planner

Query planner adalah komponen database yang memilih strategi eksekusi query:

- scan apa yang dipakai;
- join strategy mana;
- apakah pakai index atau full scan;
- urutan join;
- cara sort/aggregate.

## Model Mental yang Benar

Pegang ini:

1. Index tidak gratis.
2. Index hanya berguna untuk pattern tertentu.
3. Query planner memilih berdasarkan statistik dan estimasi biaya.
4. Query lambat tidak otomatis berarti kurang index.
5. Bottleneck bisa ada di query shape, data volume, sort, join, lock, atau transfer result.

## Apa yang Dilakukan Index

Secara praktis, index membantu:

- lookup by key;
- range scan;
- join tertentu;
- sort tertentu;
- filter kombinasi tertentu.

Tanpa index yang cocok, database mungkin harus scan jauh lebih banyak data.

## Apa yang Dibayar Saat Menambah Index

Biayanya:

- write lebih mahal;
- update/delete lebih mahal;
- insert lebih mahal;
- storage bertambah;
- maintenance bertambah;
- planner punya lebih banyak opsi yang mungkin tidak selalu bagus.

Jadi "tambah index saja" adalah jawaban malas.

## Full Table Scan Tidak Selalu Buruk

Ini salah satu miskonsepsi umum.

Jika:

- tabel kecil;
- proporsi baris yang diambil besar;
- index tidak selective;
- sequential read lebih murah,

maka full scan bisa masuk akal.

Kalau Anda menganggap full scan selalu jahat, model mental Anda lemah.

## Selectivity

Index paling berguna saat predicate cukup selective.

Contoh:

- cari berdasarkan `user_id` unik;
- cari rentang `created_at` kecil;
- cari status langka.

Kurang berguna jika:

- kolom punya sangat sedikit variasi;
- hampir semua baris cocok;
- query tetap harus membaca banyak row setelah filter.

## Composite Index

Banyak query butuh lebih dari satu kolom.
Composite index bisa sangat berguna.
Tetapi urutan kolom penting.

Misalnya index pada:

- `(tenant_id, created_at)`

berbeda behavior-nya dengan:

- `(created_at, tenant_id)`

Karena query planner memanfaatkan prefix dan shape predicate/order tertentu.

Kalau urutan index tidak sesuai pattern query, manfaatnya bisa kecil.

## Covering Behavior

Kadang index membantu bukan hanya mencari row, tetapi juga mengurangi kebutuhan membaca heap/table lebih jauh jika kolom yang dibutuhkan sudah cukup.
Tetapi lagi-lagi ini tergantung database engine dan query shape.

Jangan hafal istilahnya saja.
Pahami manfaatnya:

- lebih sedikit data dibaca;
- path eksekusi lebih murah untuk query tertentu.

## Query Planner dan Statistik

Planner memilih strategi berdasarkan statistik data:

- perkiraan jumlah row;
- distribusi nilai;
- cardinality;
- selectivity.

Kalau statistik jelek atau stale:

- planner bisa memilih index salah;
- join order buruk;
- full scan terpilih padahal seharusnya tidak;
- atau sebaliknya.

## Query Shape Lebih Penting dari Sekadar SQL Valid

Dua query yang sama-sama benar secara hasil bisa sangat berbeda secara biaya.

Masalah umum:

- filter terlambat;
- function pada kolom index;
- wildcard pattern tak efisien;
- `SELECT *` untuk data besar;
- join tak perlu;
- pagination buruk;
- nested subquery yang tidak terkontrol.

## Function on Indexed Column

Contoh pattern yang sering merusak index usage:

- membungkus kolom indexed dengan function tertentu di predicate.

Ini bisa membuat planner sulit memakai index biasa secara efisien.
Solusinya tergantung engine:

- ubah query shape;
- pakai computed/indexed expression tertentu;
- normalisasi data lebih awal.

## Sorting dan Index

Sering kali query lambat bukan karena filter, tetapi karena sort pada result besar.

Kalau query:

- filter lumayan lebar;
- lalu `ORDER BY` kolom tertentu;
- lalu `LIMIT`,

index yang tepat bisa sangat membantu.
Kalau tidak, database mungkin perlu sort besar yang mahal.

## Join Strategy

Query planner juga memilih strategi join:

- nested loop;
- hash join;
- merge join;

Mana yang dipilih tergantung ukuran data, index, dan estimasi biaya.

Kalau Anda tidak memahami ini secara praktis, Anda sulit menjelaskan kenapa query berubah drastis saat volume naik.

## N+1 di Level Querying

Kadang bottleneck bukan satu query berat.
Kadang justru ratusan query kecil.

Contoh:

- fetch list item;
- lalu untuk tiap item fetch detail tambahan.

Ini menghasilkan total cost besar walaupun masing-masing query terlihat cepat sendiri-sendiri.

Jadi query performance harus dilihat secara sistem end-to-end.

## Hot Index dan Write Pattern

Index yang banyak atau salah bentuk bisa membuat write-heavy workload menderita.

Pertanyaan penting:

- tabel ini read-heavy atau write-heavy?
- query mana paling kritis?
- apakah index ini benar-benar dipakai sering?

Index yang jarang dipakai tetapi mahal saat write adalah utang.

## Over-Indexing

Tanda over-indexing:

- banyak index mirip tumpang tindih;
- write makin lambat;
- storage besar;
- tim tak tahu index mana masih berguna;
- planner options berlebihan.

Index harus diaudit secara periodik.
Bukan hanya terus ditambah.

## Query Plan Analysis

Melihat query plan adalah keharusan.
Yang dicari bukan hanya satu angka waktu.
Lihat:

- row estimated vs actual;
- scan type;
- join order;
- sort step;
- temp usage;
- filter placement.

Kalau actual jauh beda dari estimate, itu sinyal penting.

## Bottleneck Bukan Selalu Database Engine

Query lambat bisa disebabkan:

- terlalu banyak data diambil ke app;
- serialization mahal;
- network latency;
- lock wait;
- app-level N+1;
- pagination tak sehat.

Kalau Anda hanya fokus ke planner, bisa jadi Anda melewatkan akar masalah.

## Pagination dan Query Cost

Offset pagination besar bisa mahal.

Kenapa?

- database tetap harus melangkahi banyak row;
- sort besar tetap terjadi;
- page makin jauh makin mahal.

Kadang keyset/cursor pagination lebih sehat.

## Select Only What You Need

`SELECT *` pada tabel lebar:

- menambah I/O;
- menambah network transfer;
- menambah memory;
- menambah serialization cost.

Pada sistem besar, memilih kolom yang benar-benar perlu adalah keputusan performa nyata.

## Heuristik Senior

1. Jangan tambah index tanpa memahami query pattern.
2. Evaluasi read gain vs write cost.
3. Gunakan query plan, bukan intuisi semata.
4. Curigai sort, join, dan result width, bukan hanya filter.
5. Audit index yang overlap atau tak terpakai.
6. Perhatikan actual vs estimated rows.
7. Bedakan query lambat tunggal dari pola N+1 yang sistemik.

## Pertanyaan Interview

### Dasar

- Apa fungsi index?
- Kenapa index tidak gratis?
- Kapan full table scan masih masuk akal?
- Kenapa composite index butuh urutan yang tepat?

### Menengah

- Bagaimana query planner memilih rencana eksekusi?
- Apa arti perbedaan besar antara estimated row dan actual row?
- Kenapa `SELECT *` bisa mahal?
- Kapan sorting menjadi bottleneck utama?

### Senior

- Bagaimana Anda mengevaluasi apakah sebuah query butuh index baru atau butuh query rewrite?
- Bagaimana Anda menyeimbangkan read optimization dengan write-heavy workload?
- Bagaimana Anda mendeteksi dan memperbaiki over-indexing?
- Bagaimana Anda menjelaskan query bottleneck yang ternyata berasal dari application-level N+1, bukan satu query besar?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- endpoint list lambat walau sudah ada index;
- query plan berubah buruk setelah data tumbuh;
- sort dashboard mahal;
- offset pagination page besar terasa sangat lambat;
- write throughput turun setelah banyak index ditambahkan.

## Ringkasan Brutal

- Index itu alat, bukan mantra.
- Query planner membuat keputusan biaya, bukan keputusan moral.
- Full scan tidak selalu salah.
- Query lambat sering berasal dari shape query dan volume data, bukan sekadar index yang kurang.
- Engineer senior membaca query plan dan workload, bukan menebak berdasarkan perasaan.

## Checklist Pemahaman

- Saya paham index punya cost write dan storage.
- Saya tahu selectivity penting.
- Saya bisa membaca query bottleneck lebih luas dari sekadar filter predicate.
- Saya tidak menganggap full scan selalu buruk.
- Saya tahu actual vs estimated row mismatch adalah sinyal penting.

## Penutup

Optimasi database yang matang dimulai dari memahami bagaimana database berpikir tentang query.
Bukan dari menambah index secara reaktif.

Kalau Anda paham planner, Anda jauh lebih jarang membuat optimasi palsu yang mahal.
