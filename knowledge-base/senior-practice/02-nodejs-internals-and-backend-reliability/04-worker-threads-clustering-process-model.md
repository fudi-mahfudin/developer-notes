# Worker Threads, Clustering, dan Process Model

## Tujuan

Topik ini penting karena banyak engineer tahu nama fiturnya, tetapi tidak tahu kapan memakainya dan apa trade-off-nya.
Akibatnya, worker thread, cluster, atau child process dipakai seperti jimat.

Padahal keputusan ini memengaruhi:

- isolasi kegagalan;
- penggunaan CPU;
- memory footprint;
- deployment model;
- debugging;
- komunikasi antar eksekutor;
- operability di production.

## Kenapa Topik Ini Penting

Node.js punya satu main thread untuk JavaScript utama.
Saat beban membesar atau kerja CPU meningkat, Anda perlu memahami pilihan unit concurrency dan isolation yang tersedia.

Kalau tidak, hasilnya sering salah satu dari ini:

- service blocking karena CPU-heavy task tetap di main thread;
- memory membengkak karena terlalu banyak process;
- instance ganda tidak sinkron soal state;
- worker dipakai padahal bottleneck ada di dependency luar;
- cluster dipakai tanpa strategi graceful shutdown dan observability.

## Tiga Konsep yang Harus Dipisahkan

- `process model`
- `cluster`
- `worker threads`

Kalau tiga hal ini dicampur, diskusi akan kacau.

## Process Model

Secara dasar, satu instance Node.js adalah satu process OS.
Process punya:

- memory space sendiri;
- event loop sendiri;
- heap sendiri;
- PID sendiri;
- signal lifecycle sendiri.

Ini unit isolasi yang kuat.
Kalau satu process crash, process lain tidak otomatis ikut jatuh.

## Kenapa Process Penting

Dalam deployment nyata, scaling horizontal sering dilakukan dengan banyak process atau container.
Alasannya:

- memanfaatkan beberapa core CPU;
- meningkatkan fault isolation;
- memudahkan rolling restart;
- memisahkan workload berbeda;
- membatasi blast radius crash.

Tetapi banyak process juga berarti:

- memory total naik;
- koordinasi state makin sulit;
- connection pool bisa terduplikasi;
- observability harus menggabungkan banyak sumber.

## Cluster

`cluster` adalah mekanisme Node.js untuk menjalankan beberapa worker process yang bisa berbagi server port.
Secara mental, cluster berarti:

- satu parent/primary process;
- beberapa worker process;
- load didistribusikan antar worker.

Ini historisnya sering dipakai untuk memanfaatkan banyak core pada satu mesin.

## Kapan Cluster Berguna

Cluster berguna saat:

- Anda ingin satu service memanfaatkan beberapa CPU core;
- workload relatif stateless;
- beberapa process per mesin masuk akal;
- Anda ingin isolasi antar worker lebih kuat daripada thread.

Tetapi di era container orchestration modern, banyak tim lebih memilih satu process per container lalu scale lewat orchestrator.
Jadi cluster bukan otomatis default terbaik.

## Worker Threads

`worker_threads` memungkinkan menjalankan JavaScript di thread lain dalam process yang sama.
Ini berbeda dari cluster.

Karakter penting:

- masih dalam process yang sama;
- tiap worker punya JavaScript execution context sendiri;
- komunikasi dilakukan lewat message passing atau shared memory tertentu;
- lebih cocok untuk offload CPU-heavy work.

## Kapan Worker Threads Tepat

Worker thread tepat saat:

- Anda punya kerja CPU-heavy;
- kerja itu cukup besar untuk justify offload;
- Anda ingin menghindari memblok main event loop;
- shared memory atau message passing masih manageable;
- isolasi thread-level cukup.

Contoh:

- image resize;
- document parsing;
- compression;
- cryptographic operation tertentu;
- heavy transformation.

## Child Process

Selain cluster dan worker thread, ada `child_process`.
Ini berguna saat Anda ingin:

- menjalankan command OS;
- memakai tool eksternal;
- mengisolasi kerja dengan boundary process penuh;
- menjalankan binary non-JS.

Child process berbeda dari worker thread:

- overhead lebih besar;
- isolasi lebih kuat;
- komunikasi biasanya lebih mahal;
- cocok untuk integrasi tool eksternal atau kerja yang memang lebih aman dipisah total.

## Model Mental yang Benar

Pegang aturan ini:

1. Process memberi isolasi kuat dan pemanfaatan multi-core melalui banyak instance.
2. Cluster adalah cara Node untuk menjalankan beberapa worker process yang berbagi port.
3. Worker thread cocok terutama untuk CPU-heavy JavaScript work.
4. Tidak satu pun dari ini mempercepat dependency eksternal yang lambat.
5. Setiap model membawa trade-off memory, koordinasi, debugging, dan lifecycle.

## Process vs Thread

Perbedaan praktis:

### Process

- isolasi memory lebih kuat;
- crash isolation lebih baik;
- overhead memory lebih tinggi;
- koordinasi state lebih sulit;
- cocok untuk unit deployment dan workload separation.

### Thread

- komunikasi bisa lebih cepat;
- overhead biasanya lebih ringan daripada process;
- blast radius bisa lebih rumit jika process utama punya problem besar;
- tetap perlu desain komunikasi dan lifecycle yang disiplin.

## Kenapa Worker Thread Bukan Pengganti Cluster

Ini kesalahan umum.
Worker thread membantu offload kerja CPU dalam satu process.
Ia tidak menggantikan kebutuhan untuk:

- scaling jaringan;
- isolasi crash level process;
- distribusi traffic antar instance;
- pemanfaatan banyak process untuk service stateless.

Jadi kalau kebutuhan Anda adalah melayani lebih banyak request parallel pada banyak core dan deployment model Anda process-based, worker thread mungkin bukan jawaban utama.

## Kenapa Cluster Bukan Obat CPU Heavy Per Request

Cluster memang menambah jumlah process.
Tetapi kalau tiap request memicu kerja CPU berat di setiap worker:

- tiap worker tetap bisa macet;
- tail latency tetap buruk;
- CPU total tetap jenuh;
- scaling menjadi mahal.

Kadang yang dibutuhkan justru:

- worker thread pool internal;
- job queue;
- service terpisah untuk compute-heavy workload.

## Komunikasi Antar Unit Eksekusi

Begitu Anda punya banyak process atau worker, muncul pertanyaan:

- bagaimana data dikirim?
- berapa besar payload?
- bagaimana error dipropagasikan?
- bagaimana cancel work?
- bagaimana correlation id dibawa?

Komunikasi ini tidak gratis.
Kalau payload besar harus sering disalin, performa bisa rusak.

## Shared State dan Bahayanya

Stateless system lebih mudah di-cluster dan lebih mudah di-scale.
Begitu Anda punya shared in-memory state:

- cache lokal per process bisa berbeda;
- session lokal bisa tidak konsisten;
- job deduplication bisa gagal;
- rate limiting lokal bisa bias.

Kalau banyak worker/process dipakai, state penting biasanya harus dipindah ke storage bersama:

- Redis;
- database;
- message broker;
- distributed lock service.

## Crash Isolation

Satu alasan kuat memakai banyak process adalah isolasi crash.
Kalau worker process crash:

- process lain bisa tetap hidup;
- supervisor atau orchestrator bisa restart worker;
- blast radius lebih kecil.

Pada worker thread, isolation tetap ada sampai titik tertentu, tetapi boundary process tetap lebih kuat secara operasional.

## Memory Footprint

Banyak process berarti:

- banyak heap;
- banyak copy module state;
- banyak connection pool jika tidak hati-hati;
- overhead memory per instance.

Banyak worker thread juga bukan gratis:

- tetap ada overhead stack dan context;
- hasil kerja dan message payload tetap butuh memory;
- lifecycle yang buruk bisa menyebabkan leak.

Jadi keputusan concurrency model harus melihat memory budget nyata.

## Connection Pool Duplication

Ini masalah production yang sering luput.

Misalnya:

- satu process punya pool DB 20;
- Anda menjalankan 8 process;
- total potential connection jadi 160.

Kalau database tidak siap, Anda baru saja menciptakan bottleneck baru.

Jadi scaling process harus dihitung bersama dependency pool capacity.

## Scheduling dan Core Utilization

Banyak process atau worker memungkinkan memanfaatkan banyak core.
Tetapi lebih banyak bukan selalu lebih baik.

Risiko:

- context switching naik;
- contention resource naik;
- memory pressure naik;
- dependency overloading naik.

Yang benar adalah sizing berdasarkan pengukuran, bukan keyakinan religius.

## Cluster di Era Modern

Cluster tetap berguna untuk beberapa kasus.
Tetapi banyak platform modern lebih memilih:

- satu process per container;
- scaling melalui orchestrator;
- load balancing di luar process;
- readiness/liveness dikelola platform.

Ini sering lebih sederhana secara operasional.

Jadi engineer senior harus bisa menjawab:

- apakah saya butuh cluster in-process?
- atau lebih baik multi-instance di tingkat deployment?

## Worker Pool Pattern

Kalau worker thread dipakai, sering kali yang sehat adalah pool, bukan spawn worker per request.

Kenapa?

- startup worker punya biaya;
- spawn terlalu sering menambah overhead;
- pool memberi batas concurrency;
- queue work jadi lebih eksplisit.

Tetapi pool pun harus didesain:

- ukuran berapa;
- timeout bagaimana;
- error handling bagaimana;
- backpressure bagaimana;
- shutdown bagaimana.

## Graceful Shutdown

Kalau Anda punya banyak process atau worker, shutdown makin kompleks.

Anda perlu memikirkan:

- stop menerima traffic baru;
- selesaikan job in-flight atau timeout-kan;
- hentikan worker pool;
- tutup koneksi;
- pastikan process exit code benar.

Kalau lifecycle ini tidak didesain, restart deployment bisa menghasilkan lost work atau request terputus.

## Observability

Begitu eksekusi tersebar ke banyak worker/process:

- log harus punya correlation id;
- metric harus agregatable;
- error dari worker harus dipetakan jelas;
- tracing harus tetap nyambung bila memungkinkan.

Kalau tidak, sistem menjadi lebih cepat tetapi jauh lebih sulit didiagnosis.

## Kapan Memilih Apa

### Gunakan Banyak Process Saat

- butuh isolasi kuat;
- butuh memanfaatkan multi-core untuk serving traffic;
- deployment model memang process/container based;
- statelessness cukup baik.

### Gunakan Worker Thread Saat

- bottleneck utama CPU-heavy JS work;
- ingin menjaga event loop utama tetap responsif;
- overhead process penuh terasa terlalu besar;
- komunikasi work item masih manageable.

### Gunakan Child Process Saat

- perlu tool eksternal;
- perlu isolasi process penuh;
- kerja bukan cocok dikerjakan di JS thread biasa;
- ingin boundary yang lebih keras.

## Anti-Pattern Umum

### 1. Pakai Worker untuk Masalah I/O Lambat

Kalau database yang lambat, worker thread tidak menyelesaikan akar masalah.

### 2. Pakai Cluster tanpa Memikirkan State

Session, cache, atau dedupe lokal per worker bisa langsung merusak konsistensi.

### 3. Spawn Worker/Process per Request

Overhead bisa menghabiskan manfaat.

### 4. Lupa Menghitung Pool Total ke Dependency

Banyak process berarti banyak pool.
Ini sering membunuh database.

## Heuristik Senior

1. Pilih unit concurrency berdasarkan jenis bottleneck, bukan hype API.
2. Cluster/process lebih cocok untuk isolasi dan scaling serving.
3. Worker thread lebih cocok untuk offload CPU-heavy work.
4. Jangan lupa menghitung memory dan pool total saat scale out.
5. Desain komunikasi, observability, dan shutdown sebelum menambah eksekutor.

## Pertanyaan Interview

### Dasar

- Apa beda process dan thread di Node.js?
- Kapan worker thread dipakai?
- Apa fungsi cluster?
- Kenapa child process berbeda dari worker thread?

### Menengah

- Apa trade-off memory antara banyak process dan worker thread?
- Kenapa worker thread bukan jawaban untuk dependency lambat?
- Apa risiko cache lokal saat memakai cluster?
- Kenapa worker pool lebih sehat daripada spawn worker per request?

### Senior

- Bagaimana Anda memilih antara cluster, multi-container deployment, dan worker thread?
- Bagaimana Anda menghitung dampak scaling process ke database connection pool?
- Bagaimana Anda mendesain graceful shutdown untuk worker-heavy service?
- Bagaimana Anda menjaga observability saat execution tersebar?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- service export PDF membuat API utama lag;
- image processing ikut memperlambat request biasa;
- deploy multi-process menyebabkan koneksi DB melonjak;
- session in-memory tidak konsisten antar instance;
- satu worker crash dan perlu restart tanpa menjatuhkan seluruh service.

## Ringkasan Brutal

- Process, cluster, dan worker thread bukan hal yang sama.
- Worker thread cocok untuk CPU-heavy work.
- Process/cluster memberi isolasi lebih kuat untuk serving traffic.
- Scaling model yang salah bisa memindahkan bottleneck, bukan menghapusnya.
- Kalau Anda menambah eksekutor tanpa memikirkan state, pool, observability, dan shutdown, Anda sedang menanam incident berikutnya.

## Checklist Pemahaman

- Saya bisa menjelaskan beda process, cluster, worker thread, dan child process.
- Saya tahu kapan worker thread tepat dan kapan tidak.
- Saya sadar scaling process memengaruhi total connection pool dan memory.
- Saya tahu shared in-memory state bermasalah di multi-process setup.
- Saya paham graceful shutdown makin penting saat banyak executor terlibat.
- Saya tidak lagi memakai cluster atau worker sebagai solusi refleks.

## Penutup

Node.js memberi beberapa cara untuk memecah kerja dan memanfaatkan resource.
Engineer senior bukan yang hafal semua API-nya, tetapi yang tahu unit mana yang tepat untuk masalah mana, dan biaya operasional apa yang ikut datang bersamanya.
