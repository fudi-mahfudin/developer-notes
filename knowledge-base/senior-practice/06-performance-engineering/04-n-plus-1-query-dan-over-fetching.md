# N+1 Query dan Over-Fetching

## Tujuan

Topik ini penting karena banyak sistem lambat bukan karena satu query raksasa, tetapi karena pola query yang boros.
N+1 query dan over-fetching adalah dua sumber pemborosan paling umum.

## Kenapa Topik Ini Penting

Jika dibiarkan:

- latency naik seiring ukuran data;
- load database membengkak;
- network transfer boros;
- CPU aplikasi tersita serialisasi data tak perlu;
- biaya infrastruktur naik tanpa nilai user tambahan.

## Model Mental yang Benar

Pegang ini:

1. N+1 adalah masalah jumlah roundtrip query.
2. Over-fetching adalah masalah volume data berlebihan.
3. Keduanya bisa terjadi bersamaan.
4. Solusi harus menjaga correctness sekaligus maintainability.
5. Optimasi data access harus berdasarkan pola akses user nyata.

## N+1 Query

Pola klasik:

1. query satu list utama (`N` item);
2. untuk tiap item, query tambahan satu per item.

Total query menjadi:

- 1 + N

Ini terlihat kecil di data kecil.
Menjadi mahal di data besar.

## Contoh N+1

Misal:

- ambil 100 order;
- lalu untuk tiap order ambil customer detail.

Hasil:

- 101 query.

Jika latency per query kecil pun, total cost dan connection pressure bisa besar.

## Kenapa N+1 Sulit Terlihat

Pada local dev:

- data sedikit;
- koneksi cepat;
- cache hangat.

Di production:

- data lebih banyak;
- concurrency tinggi;
- pool lebih sibuk.

N+1 yang tak terlihat di local bisa memukul p95 di produksi.

## Over-Fetching

Over-fetching terjadi saat API/query mengambil data jauh lebih banyak dari yang dibutuhkan use case saat itu.

Contoh:

- select semua kolom termasuk blob besar padahal UI hanya butuh 3 field;
- join relasi besar padahal tak ditampilkan;
- response list membawa detail nested penuh.

## Biaya Over-Fetching

- I/O database lebih besar;
- network payload lebih besar;
- parsing/serialization lebih berat;
- memory usage naik;
- render client lebih mahal.

Over-fetching sering terlihat "aman" karena fitur tetap jalan.
Tetapi ia menggerogoti performa sistemik.

## N+1 vs Over-Fetching Trade-off

Menghindari N+1 dengan eager join berlebihan bisa memicu over-fetching.
Menghindari over-fetching dengan query terlalu granular bisa memicu N+1.

Jadi solusi bukan hitam-putih.
Anda perlu pattern yang sesuai use case.

## Cara Deteksi N+1

- log query count per request;
- lihat trace span DB berulang;
- lihat endpoint dengan query count linear terhadap jumlah item;
- review ORM usage yang memicu lazy load per row.

Kalau query count naik seiring row count, curigai N+1.

## Cara Deteksi Over-Fetching

- audit kolom yang dipakai vs dikirim;
- ukur payload size;
- lihat field besar yang jarang dipakai;
- lihat endpoint list yang membawa detail tak perlu.

Jika sebagian besar payload tidak dipakai consumer, itu over-fetching.

## Solusi N+1 Umum

- batch loading;
- join/query yang lebih tepat;
- preloading relasi yang memang diperlukan;
- query khusus untuk view tertentu;
- cache yang tepat (dengan hati-hati).

Tujuan: kurangi jumlah roundtrip.

## Solusi Over-Fetching Umum

- select field minimal;
- endpoint/view model khusus use case;
- pagination;
- lazy loading detail;
- contract response yang lebih tipis.

Tujuan: kurangi volume data yang tak bernilai.

## ORM dan N+1

ORM mempermudah developer, tapi bisa menyembunyikan N+1.

Pattern berbahaya:

- iterasi entity;
- akses property relasi;
- ORM memicu query tambahan per item.

Tanpa discipline, ORM bisa membuat N+1 masif.

## API Contract dan Fetch Shape

Over-fetching sering berakar dari contract API yang terlalu generik.

Jika satu endpoint dipaksa melayani semua kebutuhan:

- response cenderung gemuk;
- data banyak terbuang;
- consumer sulit efisien.

Kadang endpoint spesifik use case lebih sehat daripada satu endpoint super generik.

## Pagination sebagai Mitigasi

Pagination tidak menyelesaikan N+1 sendirian.
Tetapi membantu membatasi ukuran query/payload per request.

Tanpa pagination, over-fetching bisa eksplosif.

## Cache Bukan Obat Utama

Cache bisa membantu dampak N+1 atau over-fetching.
Tetapi:

- tidak memperbaiki akar query shape;
- menambah invalidation complexity;
- bisa menutupi desain buruk.

Perbaiki query/data contract dulu jika memungkinkan.

## Frontend Perspective

Over-fetching juga bisa datang dari frontend:

- meminta detail penuh padahal hanya butuh summary;
- request berulang data sama;
- tidak menggunakan field selection pattern bila tersedia.

Kolaborasi backend-frontend penting untuk memperbaiki ini.

## Anti-Pattern Umum

### 1. "Fix" N+1 dengan Join Semua Relasi

Bisa berubah jadi over-fetching masif.

### 2. Endpoint Super Generic untuk Semua Screen

Biasanya menghasilkan payload gemuk.

### 3. Tidak Memantau Query Count

N+1 lolos terus.

### 4. Menganggap Cache Menyelesaikan Semua

Bottleneck dasar tetap ada.

## Heuristik Senior

1. Pantau query count per request.
2. Pilih data shape sesuai use case.
3. Jangan eager load berlebihan tanpa alasan.
4. Hindari response gemuk untuk list view.
5. Optimasi roundtrip dan payload bersamaan.
6. Uji dengan dataset realistis.
7. Jadikan N+1/over-fetching check bagian code review.

## Pertanyaan Interview

### Dasar

- Apa itu N+1 query?
- Apa itu over-fetching?
- Kenapa keduanya berbahaya?
- Apa bedanya masalah jumlah query vs volume data?

### Menengah

- Bagaimana mendeteksi N+1 pada ORM?
- Kapan eager loading membantu dan kapan berbahaya?
- Bagaimana mengurangi over-fetching pada endpoint list?
- Kenapa cache bukan solusi utama?

### Senior

- Bagaimana Anda menyeimbangkan trade-off N+1 vs over-fetching pada endpoint kompleks?
- Bagaimana Anda mendesain kontrak API agar cocok untuk beberapa view tanpa membuat payload gemuk?
- Bagaimana Anda membangun guardrail agar N+1 tidak terus muncul saat tim bertambah?
- Metrics apa yang Anda gunakan untuk menilai keberhasilan optimasi data access?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- endpoint list order lambat hanya pada page besar;
- query count melonjak linear saat item bertambah;
- payload API besar tetapi UI hanya pakai sedikit field;
- DB CPU tinggi meski traffic tidak ekstrem.

## Ringkasan Brutal

- N+1 memboroskan roundtrip.
- Over-fetching memboroskan data transfer dan processing.
- Dua-duanya sering hadir bersama.
- Solusi harus presisi per use case, bukan satu trik untuk semua.
- Engineer senior memperlakukan query shape sebagai bagian inti desain API, bukan detail implementasi belakangan.

## Checklist Pemahaman

- Saya bisa mengenali N+1 dan over-fetching.
- Saya tahu biaya masing-masing di produksi.
- Saya tidak menggunakan eager loading secara membabi buta.
- Saya paham pentingnya query count dan payload size observability.
- Saya bisa merancang kontrak data yang lebih hemat sesuai kebutuhan layar/flow.

## Penutup

Banyak sistem merasa lambat karena mereka terlalu banyak bertanya ke database dan membawa terlalu banyak data pulang.
Memperbaiki dua kebiasaan ini sering memberi dampak besar dengan perubahan arsitektur yang masuk akal.
