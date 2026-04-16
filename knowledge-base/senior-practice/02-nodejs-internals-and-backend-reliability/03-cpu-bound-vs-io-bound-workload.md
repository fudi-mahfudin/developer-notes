# CPU-Bound vs I/O-Bound Workload

## Tujuan

Topik ini penting karena banyak keputusan arsitektur backend salah total hanya karena engineer tidak membedakan jenis workload.
Semua dibungkus sebagai "performa", padahal akar masalahnya bisa sangat berbeda.

Kalau Anda salah mengklasifikasikan workload:

- Anda bisa menambah instance padahal bottleneck ada di database;
- Anda bisa memindahkan logic ke worker padahal masalah sebenarnya network timeout;
- Anda bisa melakukan caching padahal CPU serialization-lah yang berat;
- Anda bisa menyalahkan event loop padahal dependency luar yang lambat.

## Definisi Singkat

### CPU-Bound

Workload disebut CPU-bound jika waktu utamanya habis untuk komputasi di CPU.

Contoh:

- hashing berat;
- image processing;
- kompresi;
- parsing dokumen besar;
- algoritma scoring atau matching;
- transformasi JSON sangat besar.

### I/O-Bound

Workload disebut I/O-bound jika waktu utamanya habis menunggu operasi luar seperti network, disk, database, atau file.

Contoh:

- query database;
- request ke external API;
- baca file;
- write socket;
- redis access.

## Model Mental yang Benar

Pegang poin ini:

1. CPU-bound berarti CPU menjadi pembatas utama.
2. I/O-bound berarti waktu tunggu resource eksternal menjadi pembatas utama.
3. Satu request bisa mengandung campuran keduanya.
4. Optimasi yang cocok untuk satu tipe sering tidak cocok untuk tipe lain.
5. Node.js cenderung unggul di I/O-bound dan perlu perhatian lebih untuk CPU-bound.

## Kenapa Pembedaan Ini Penting di Node.js

Karena Node.js menjalankan JavaScript aplikasi utama di satu main thread.
Untuk workload I/O-bound, ini bagus karena thread utama bisa tetap responsif sambil menunggu dependency.
Untuk workload CPU-bound, ini cepat menjadi masalah karena komputasi berat memonopoli event loop.

Kalau satu callback CPU-heavy berjalan lama:

- request lain tidak bisa diproses tepat waktu;
- timeout bisa naik;
- health check bisa ikut terlambat;
- tail latency melonjak.

## Ciri-Ciri Workload I/O-Bound

Biasanya terlihat seperti ini:

- CPU app relatif rendah sampai sedang;
- latency sangat bergantung pada dependency;
- saat dependency melambat, inflight request naik;
- event loop belum tentu selalu berat;
- scaling app kadang membantu sampai dependency berikutnya jenuh.

Contoh endpoint:

1. ambil data user dari DB;
2. ambil preferences dari cache;
3. panggil service profile;
4. gabungkan hasil tipis;
5. kirim response kecil.

Di sini sebagian besar waktu habis menunggu.

## Ciri-Ciri Workload CPU-Bound

Biasanya terlihat seperti ini:

- CPU usage tinggi;
- event loop lag naik;
- throughput turun walau dependency sehat;
- satu request berat mengganggu request lain;
- latensi memburuk seiring ukuran payload atau kompleksitas data.

Contoh endpoint:

1. ambil data mentah cepat;
2. bangun report kompleks;
3. filter dan agregasi ribuan record;
4. serialisasi output besar.

Di sini bottleneck bisa pindah dari dependency ke CPU aplikasi.

## Contoh Kasus yang Menipu

Sebuah endpoint report:

- query database 100 ms;
- transformasi data 1.5 detik di JavaScript;
- response 3 MB.

Banyak orang tetap menyebut ini "query report lambat".
Padahal query hanya sebagian kecil dari masalah.
Sebagian besar waktu justru CPU-bound di application layer.

## Node.js dan I/O-Bound Workload

Ini area kekuatan alami Node.js.

Kenapa?

- banyak koneksi bisa dikelola efisien;
- waiting time tidak memblok main thread secara sinkron;
- model async cocok untuk aggregator service, API gateway, realtime I/O, dan proxying.

Tetapi tetap ada batas:

- terlalu banyak inflight request menaikkan memory;
- dependency pool bisa jenuh;
- timeout dan retry bisa saling memperparah.

Jadi "cocok" bukan berarti "tanpa risiko".

## Node.js dan CPU-Bound Workload

Ini area yang butuh kehati-hatian.

Karena main thread mudah tersita, workload CPU-heavy sering perlu:

- dipindah ke worker thread;
- dipindah ke service lain;
- dibatasi concurrency-nya;
- di-cache;
- dipecah menjadi batch;
- atau diimplementasi dengan strategi berbeda.

Kalau Anda memaksa semua komputasi berat tetap di main event loop, sistem lain akan ikut menjadi korban.

## Campuran CPU dan I/O dalam Satu Flow

Sebagian besar sistem nyata tidak murni salah satu.

Contoh:

1. request datang;
2. fetch data dari DB;
3. decrypt data tertentu;
4. hitung ranking;
5. panggil dependency lain;
6. serialisasi response besar.

Flow ini campuran.
Karena itu Anda harus bisa mengidentifikasi bagian mana yang dominan terhadap latency dan throughput.

## Bagaimana Mengukur Secara Praktis

Jangan tebak.
Lihat sinyal:

- CPU usage process;
- event loop lag;
- response time breakdown;
- dependency span timing;
- flamegraph atau profiler;
- heap usage;
- request size dan payload size.

Kalau CPU tinggi sementara dependency timing normal, curigai CPU-bound.
Kalau CPU relatif rendah tetapi latency tinggi dan span DB panjang, curigai I/O-bound.

## Scaling Strategy Berbeda

### Untuk I/O-Bound

Strategi umum:

- connection pooling sehat;
- timeout;
- retry selektif;
- cache;
- batching;
- rate limiting;
- circuit breaking;
- horizontal scaling bila dependency sanggup.

### Untuk CPU-Bound

Strategi umum:

- worker thread;
- child process;
- offload ke service khusus;
- batching atau precomputation;
- caching hasil komputasi;
- algoritma lebih efisien;
- kurangi payload dan transform yang tidak perlu.

Kalau solusi yang dipilih tidak sesuai tipe workload, Anda hanya menambah kompleksitas tanpa hasil.

## Contoh Optimasi yang Salah Sasaran

### Kasus 1

Problem:
latency tinggi karena query eksternal 900 ms.

Solusi salah:
tambah worker thread.

Kenapa salah:
worker thread tidak membuat dependency eksternal lebih cepat.

### Kasus 2

Problem:
CPU 95% karena hashing besar.

Solusi salah:
tambah connection pool database.

Kenapa salah:
database bukan bottleneck utama.

### Kasus 3

Problem:
response besar lambat karena serialisasi dan kompresi.

Solusi salah:
optimasi query kecil-kecilan.

Kenapa salah:
major cost ada setelah data keluar dari DB.

## Tail Latency

CPU-bound dan I/O-bound sama-sama bisa merusak tail latency, tetapi mekanismenya berbeda.

Pada CPU-bound:

- satu kerja berat menghambat request lain langsung di main thread.

Pada I/O-bound:

- antrean inflight request membesar saat dependency lambat;
- queueing dan timeout memperburuk p95/p99.

Memahami mekanisme ini penting saat membaca graph observability.

## Batching dan Workload Shape

Batching bisa membantu dua tipe workload, tetapi alasannya beda.

Untuk I/O-bound:

- mengurangi roundtrip;
- mengurangi connection churn;
- menekan overhead per request.

Untuk CPU-bound:

- bisa justru memperburuk jika satu batch menjadi terlalu berat di main thread.

Jadi batching bukan otomatis baik.
Perhatikan shape kerjanya.

## Serialization Cost

Ini sering diabaikan.
Banyak sistem menganggap kerja selesai setelah data didapat.
Padahal:

- marshalling;
- validation;
- data mapping;
- serialization;
- compression

bisa mengubah workload menjadi CPU-bound.

Terutama di Node.js, serialization besar di main thread sering sangat mahal.

## Streaming Bisa Mengubah Profil Workload

Kalau response besar diproses streaming:

- memory pressure bisa turun;
- burst CPU bisa lebih terkendali;
- latency awal ke client bisa membaik.

Tetapi streaming juga menambah kompleksitas:

- error handling berubah;
- backpressure harus dipahami;
- observability perlu lebih teliti.

## Worker Thread Bukan Obat Universal

CPU-bound sering membuat orang reflek ke worker thread.
Kadang benar.
Tetapi pertanyaan yang harus diajukan:

- apakah biaya serialization ke worker sepadan?
- apakah work-nya cukup besar untuk justify offload?
- apakah concurrency worker harus dibatasi?
- apakah hasil perlu di-cache?
- apakah lebih baik dipindahkan ke service terpisah?

Kalau task kecil tetapi sangat sering, overhead offload bisa menggerus manfaatnya.

## Cost of Waiting pada I/O-Bound

Menunggu tidak gratis.
Walau non-blocking, request yang menunggu masih memegang:

- memory;
- timer;
- context tracing;
- slot pool tertentu;
- kemungkinan retry logic.

Jadi sistem I/O-bound pun perlu disiplin timeout dan concurrency control.

## Heuristik Senior

1. Pertama-tama klasifikasikan workload dominannya.
2. Jangan samakan semua latency sebagai satu jenis masalah.
3. Untuk CPU-bound, curigai main thread starvation dan event loop lag.
4. Untuk I/O-bound, curigai dependency latency, pool limit, dan queueing.
5. Ingat bahwa serialization dan parsing bisa mengubah workload menjadi CPU-bound.
6. Jangan optimasi tanpa pengukuran yang menunjukkan titik berat sebenarnya.

## Pertanyaan Interview

### Dasar

- Apa beda CPU-bound dan I/O-bound workload?
- Kenapa Node.js cocok untuk I/O-bound?
- Kenapa CPU-heavy code berbahaya di Node.js?
- Apa contoh workload CPU-bound di backend?

### Menengah

- Bagaimana Anda membedakan bottleneck CPU dari bottleneck dependency?
- Kenapa response besar bisa membuat endpoint menjadi CPU-bound?
- Kapan worker thread masuk akal?
- Kenapa menunggu dependency tetap punya biaya walaupun non-blocking?

### Senior

- Bagaimana Anda mendesain strategi scaling berbeda untuk CPU-bound vs I/O-bound service?
- Metrics apa yang Anda gunakan untuk mengidentifikasi workload dominan?
- Kapan batching membantu dan kapan justru memperburuk?
- Bagaimana Anda menjelaskan campuran CPU dan I/O dalam satu request path?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- endpoint report memakan CPU tinggi;
- aggregation service lambat saat provider eksternal melambat;
- kompresi file membuat API lain ikut tersendat;
- cache miss menyebabkan serialization besar;
- service sederhana tiba-tiba tidak stabil setelah fitur export ditambahkan.

## Ringkasan Brutal

- CPU-bound dan I/O-bound bukan istilah akademik.
- Mereka menentukan strategi optimasi dan scaling.
- Node.js kuat di I/O-bound dan rentan pada CPU-bound jika tidak hati-hati.
- Serialization, parsing, dan transform bisa diam-diam mengubah profil workload.
- Kalau Anda salah klasifikasi workload, solusi Anda hampir pasti salah sasaran.

## Checklist Pemahaman

- Saya bisa membedakan CPU-bound dan I/O-bound dengan contoh konkret.
- Saya tahu kenapa Node.js unggul di I/O-bound.
- Saya sadar workload campuran sangat umum.
- Saya paham serialization bisa menjadi bottleneck CPU.
- Saya tahu worker thread bukan obat universal.
- Saya mengerti bahwa strategi scaling harus mengikuti tipe workload.

## Penutup

Engineer senior tidak berkata "service ini lambat" seolah itu sudah cukup.
Ia bertanya: lambat karena apa, resource mana yang jenuh, dan workload jenis apa yang sedang dominan.

Tanpa disiplin itu, semua optimasi hanya akan menjadi ritual mahal.
