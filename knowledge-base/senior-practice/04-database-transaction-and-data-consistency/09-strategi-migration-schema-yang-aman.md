# Strategi Migration Schema yang Aman

## Tujuan

Topik ini penting karena banyak insiden database tidak datang dari query biasa, tetapi dari perubahan schema yang dilakukan tanpa disiplin.

Schema migration yang salah bisa menyebabkan:

- downtime;
- lock panjang;
- aplikasi lama dan baru tidak kompatibel;
- deployment gagal setengah jalan;
- data hilang atau korup;
- rollback menjadi sangat sulit.

## Kenapa Topik Ini Penting

Schema selalu berkembang:

- kolom baru;
- constraint baru;
- rename field;
- split table;
- backfill;
- index creation;
- drop legacy column.

Kalau migration diperlakukan seperti formalitas kecil, biaya insidennya bisa brutal.

## Model Mental yang Benar

Pegang ini:

1. Schema migration adalah perubahan produksi pada fondasi data.
2. Aman bukan berarti cepat, tetapi berarti reversible atau setidaknya terkendali.
3. Deployment aplikasi dan schema harus kompatibel dalam window transisi.
4. Data backfill adalah operasi terpisah yang sering lebih berbahaya dari DDL kecil.
5. Rollback aplikasi tidak selalu sama dengan rollback schema.

## Expand and Contract

Strategi paling sehat untuk banyak perubahan adalah pola expand-and-contract.

Secara umum:

1. tambahkan schema baru yang kompatibel;
2. deploy aplikasi yang bisa membaca/menulis dalam mode transisi;
3. backfill bila perlu;
4. cut over;
5. hapus bagian lama setelah aman.

Ini lebih aman daripada perubahan one-shot yang memaksa semua langsung berubah sekaligus.

## Kenapa One-Shot Rename Berbahaya

Kalau langsung:

- rename kolom;
- deploy app baru;
- berharap tidak ada app lama atau job lama yang masih aktif,

Anda membuka jendela incompatibility.

Dalam sistem nyata:

- deploy rolling butuh waktu;
- worker lama bisa masih hidup;
- job terjadwal bisa jalan;
- read replica bisa tertinggal.

Jadi perubahan yang memutus kompatibilitas harus dipikirkan sangat hati-hati.

## Backward Compatibility

Schema change aman sering berarti:

- versi aplikasi lama masih bisa jalan sementara;
- versi baru juga bisa jalan;
- transisi berlangsung bertahap.

Ini sangat penting untuk deployment rolling dan multi-instance.

## Forward Compatibility

Kadang Anda juga perlu memastikan versi app saat ini tidak langsung rusak jika schema baru sudah ada lebih dulu.

Urutan deploy matters.
Jangan menganggap migration dan aplikasi selalu berpindah sinkron sempurna.

## Additive Change Lebih Aman

Perubahan yang cenderung lebih aman:

- tambah kolom nullable;
- tambah tabel baru;
- tambah index di waktu yang tepat;
- tambah enum value jika engine/app mendukung dengan aman.

Perubahan destruktif lebih berbahaya:

- drop kolom;
- rename langsung;
- ubah tipe tanpa kompatibilitas;
- tambah constraint ketat pada data lama yang belum bersih.

## Backfill

Backfill sering terlihat sederhana.
Padahal sering justru bagian paling berisiko.

Masalahnya:

- volume besar;
- lock atau write pressure;
- trigger/process lain ikut berjalan;
- replication lag;
- query log/metrics memburuk;
- batch terlalu agresif.

Backfill sebaiknya dianggap operasi produksi tersendiri.

## Batch Backfill

Pola aman biasanya:

- lakukan bertahap;
- ukur dampak;
- batasi batch size;
- beri jeda jika perlu;
- idempotent bila memungkinkan;
- bisa dilanjutkan jika terhenti.

Big bang backfill sering mengundang masalah.

## Index Migration

Menambah index juga harus hati-hati.

Pada tabel besar:

- build index bisa mahal;
- lock bisa mengganggu;
- resource usage bisa melonjak.

Cara aman bergantung database engine.
Yang penting, jangan anggap `CREATE INDEX` selalu operasi ringan.

## Constraint Migration

Menambah `NOT NULL`, foreign key, unique constraint, atau check constraint di data lama perlu validasi data lebih dulu.

Kalau tidak:

- migration gagal;
- deployment macet;
- atau data lama ternyata tidak memenuhi asumsi baru.

Sering lebih aman:

1. tambah kolom/constraint longgar dulu;
2. bersihkan/backfill data;
3. enforce constraint lebih ketat setelah valid.

## Write Path Transition

Kalau schema berubah:

- app menulis ke kolom lama atau baru?
- apakah perlu dual write sementara?
- kapan read path pindah?

Transisi ini harus eksplisit.
Kalau tidak, sebagian data akan masuk jalur lama, sebagian ke jalur baru, dan tim bingung kapan cutover benar-benar selesai.

## Read Path Transition

Sering lebih aman:

1. app baru tetap bisa baca format lama;
2. setelah backfill, app mulai membaca format baru;
3. baru kolom lama dipensiunkan.

Ini mengurangi blast radius deployment.

## Rollback Reality

Rollback aplikasi sering masih mungkin.
Rollback schema tidak selalu mudah.

Kalau Anda sudah:

- drop kolom;
- ubah tipe destruktif;
- menulis format baru yang tak bisa dibaca kode lama,

maka rollback jadi sangat sulit.

Karena itu migration aman sering lebih menekankan forward fix dan transisi bertahap daripada rollback agresif.

## Data Contract dan Multiple Versions

Dalam deployment rolling, Anda hidup sementara di dunia campuran:

- app lama;
- app baru;
- worker lama;
- worker baru.

Schema strategy harus tahan terhadap kondisi campuran ini.

Kalau tidak, bug hanya muncul saat deploy, bukan di local dev.

## Migration Ordering

Pertanyaan penting:

- migration dulu atau app dulu?

Jawabannya bergantung jenis perubahan.
Tetapi aturan umumnya:

- lakukan perubahan yang compatible dulu;
- deploy app yang mendukung keduanya;
- lakukan cutover;
- bersihkan lama belakangan.

## Observability Selama Migration

Anda perlu memantau:

- error rate aplikasi;
- lock wait;
- replication lag;
- query latency;
- migration progress;
- backfill throughput;
- deadlock atau timeout yang muncul.

Migration tanpa observability adalah perjudian.

## Kill Switch dan Pause Strategy

Untuk backfill atau migration berat, Anda perlu kemampuan:

- pause;
- resume;
- throttle;
- abort dengan aman.

Kalau satu-satunya mode adalah "lanjut atau mati", operability-nya buruk.

## Anti-Pattern Umum

### 1. Rename Kolom Langsung di Production

Sering memutus kompatibilitas rolling deploy.

### 2. Tambah Constraint Ketat Tanpa Bersihkan Data Lama

Migration gagal di tengah.

### 3. Big Bang Backfill

Load melonjak dan dampaknya sulit dikendalikan.

### 4. Drop Kolom Terlalu Cepat

App lama atau job lama masih membutuhkannya.

## Heuristik Senior

1. Favor additive change dan pola expand-contract.
2. Anggap deployment berjalan dalam mode campuran untuk sementara.
3. Pisahkan schema change, code change, dan backfill sebagai concern berbeda.
4. Backfill harus bertahap, terukur, dan dapat dihentikan.
5. Constraint enforcement datang setelah data siap.
6. Jangan cepat menjatuhkan jembatan ke schema lama.
7. Observability migration adalah syarat, bukan bonus.

## Pertanyaan Interview

### Dasar

- Kenapa migration schema bisa berbahaya?
- Apa itu expand-and-contract?
- Kenapa additive change cenderung lebih aman?
- Kenapa backfill sering lebih berisiko dari DDL kecil?

### Menengah

- Bagaimana Anda menambah kolom baru tanpa merusak rolling deploy?
- Kapan constraint baru sebaiknya ditegakkan?
- Kenapa drop kolom tidak boleh dilakukan terlalu cepat?
- Bagaimana Anda memantau migration di production?

### Senior

- Bagaimana Anda merancang perubahan schema besar untuk sistem yang tidak boleh downtime?
- Bagaimana Anda menangani rollback jika schema already changed tetapi code baru bermasalah?
- Bagaimana Anda melakukan backfill besar tanpa menghancurkan performa produksi?
- Bagaimana Anda menjelaskan strategi migration aman ke tim yang tergoda shortcut big bang?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- menambah kolom wajib ke tabel besar;
- memecah satu kolom menjadi beberapa kolom baru;
- mengganti model status lama ke model baru;
- membuat index pada tabel produksi besar;
- worker lama dan baru hidup bersamaan saat deploy.

## Ringkasan Brutal

- Migration schema adalah operasi produksi berisiko tinggi.
- Perubahan kompatibel bertahap hampir selalu lebih aman daripada big bang.
- Backfill sering menjadi titik sakit utama.
- Rollback schema jarang sesederhana rollback aplikasi.
- Engineer senior merancang migration untuk dunia nyata: deploy bertahap, data lama kotor, dan kebutuhan operasional yang tidak sempurna.

## Checklist Pemahaman

- Saya tahu kenapa additive change lebih aman.
- Saya paham pola expand-and-contract.
- Saya sadar backfill perlu diperlakukan sebagai operasi khusus.
- Saya tidak mengandalkan rename/drop langsung di production.
- Saya tahu migration butuh observability dan kontrol pause/resume.

## Penutup

Schema change yang aman bukan hasil keberuntungan.
Ia hasil dari desain transisi yang sadar bahwa produksi adalah lingkungan hidup, bukan laboratorium steril.
