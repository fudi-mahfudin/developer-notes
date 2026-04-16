# Non-Blocking I/O dan Kapan Bottleneck Tetap Terjadi

## Tujuan

Topik ini penting karena banyak developer mendengar slogan "Node.js non-blocking" lalu berhenti berpikir.
Hasilnya, mereka mengira semua operasi async otomatis aman, cepat, dan scalable.
Itu salah.

Node.js memang sangat kuat untuk I/O-heavy workload.
Tetapi non-blocking I/O tidak berarti bottleneck hilang.
Ia hanya berarti bottleneck berpindah atau muncul dalam bentuk yang berbeda.

## Kenapa Topik Ini Penting

Banyak incident production di service Node.js lahir dari salah kaprah ini:

- request async dianggap pasti murah;
- dependency lambat tidak dianggap ancaman;
- event loop lag tidak diukur;
- thread pool jenuh tidak terlihat;
- payload besar dianggap biasa saja;
- concurrency tinggi dianggap selalu menang.

Kalau Anda tidak bisa menjelaskan kapan non-blocking I/O tetap kalah oleh bottleneck lain, pemahaman backend Anda belum matang.

## Definisi Singkat

Non-blocking I/O berarti proses utama tidak harus menunggu satu operasi I/O selesai secara sinkron sebelum bisa melanjutkan kerja lain.
Sebaliknya, operasi didaftarkan, lalu hasilnya diproses ketika siap.

Ini sangat berbeda dari model blocking seperti:

```js
const data = readFileSync("large-file.txt");
```

di mana thread utama benar-benar berhenti sampai operasi selesai.

## Model Mental yang Benar

Pegang model ini:

1. Non-blocking I/O membuat waktu tunggu I/O bisa dimanfaatkan untuk kerja lain.
2. Non-blocking I/O tidak menghapus biaya CPU, memory, serialization, queueing, atau dependency latency.
3. Throughput tinggi tetap bisa gagal jika satu resource lain jenuh.
4. Async API bukan jaminan bahwa total sistem akan tetap responsif.
5. Bottleneck harus dicari di seluruh jalur request, bukan hanya di call site.

## Kenapa Node.js Kuat di I/O-Heavy Workload

Di banyak aplikasi backend, sebagian besar waktu request habis untuk menunggu:

- database;
- redis;
- HTTP service lain;
- file system;
- network roundtrip;
- TLS handshake;
- disk atau socket readiness.

Kalau main thread tidak dipaksa menunggu blocking di tiap operasi itu, satu process Node.js bisa menangani banyak koneksi dan banyak inflight request dengan efisien.

Itulah kekuatan intinya.

## Apa yang Sering Disalahpahami

### Salah Paham 1

"Kalau saya pakai `await`, berarti aman dan non-blocking."

Salah.
`await` hanya membuat flow lebih nyaman dibaca.
Kalau setelah hasil datang Anda melakukan CPU-heavy transform besar, main thread tetap bisa macet.

### Salah Paham 2

"Kalau operasi ini async, berarti murah."

Tidak selalu.
Operasi async bisa tetap mahal karena:

- thread pool dipakai;
- dependency lambat;
- response besar harus diparse;
- callback lanjutan berat;
- antrean kerja memanjang.

### Salah Paham 3

"Non-blocking berarti latency akan selalu bagus."

Salah.
Kalau queue inflight terlalu panjang, tail latency tetap bisa jelek.

## Bottleneck yang Tetap Bisa Terjadi

### 1. CPU Bottleneck

Service bisa sangat async tetapi tetap tumbang jika kerja CPU di callback terlalu berat.

Contoh:

- `JSON.stringify()` object raksasa;
- `JSON.parse()` payload besar;
- kompresi sinkron;
- template render berat;
- encryption atau hashing CPU-intensive;
- loop transform besar.

Di sini I/O non-blocking tidak menolong.
Yang macet adalah main thread setelah data datang.

### 2. Thread Pool Saturation

Beberapa operasi async bergantung pada libuv thread pool.
Kalau terlalu banyak operasi berat masuk:

- antrean pool memanjang;
- latency melonjak;
- request lain ikut terkena imbas.

Contoh:

- banyak `fs` tertentu;
- `crypto.pbkdf2`;
- `zlib`;
- DNS tertentu.

Developer sering tidak sadar bahwa API yang terlihat async tetap bisa jenuh di bawah lapisan ini.

### 3. Dependency Latency

Non-blocking tidak menghilangkan kenyataan bahwa dependency bisa lambat.

Kalau database butuh 800 ms, request Anda tetap 800 ms lebih.
Memang process Node.js masih bisa menangani request lain.
Tetapi:

- inflight request bertambah;
- memory per request bertambah;
- timeout bisa menumpuk;
- pressure ke dependency bisa makin tinggi.

Jadi non-blocking itu bukan pengganti dependency health.

### 4. Queueing Bottleneck

Saat inflight request terlalu banyak, bahkan sistem non-blocking bisa mengalami queueing parah.

Misalnya:

- upstream terus mengirim request;
- downstream rata-rata lambat;
- request menunggu slot resource;
- tail latency membengkak.

Yang kalah bukan hanya satu operasi.
Seluruh sistem mulai menumpuk backlog.

### 5. Memory Pressure

Kalau terlalu banyak request menunggu secara bersamaan:

- objek request tetap hidup;
- response buffer tertahan;
- closure menahan state;
- heap membesar;
- GC pressure naik.

Jadi kemampuan non-blocking menangani banyak inflight request juga punya batas nyata.

### 6. Socket dan File Descriptor Limit

OS punya batas resource.

Contoh:

- terlalu banyak koneksi terbuka;
- file descriptor habis;
- port ephemeral habis pada pola tertentu;
- backlog socket penuh.

Non-blocking I/O tidak membatalkan batas kernel.

### 7. Backpressure Failure

Kalau producer lebih cepat daripada consumer dan sistem tidak punya backpressure sehat:

- buffer membengkak;
- memory naik;
- latency makin tidak stabil;
- proses bisa crash.

Ini sering muncul di stream, message processing, atau proxy service.

## Non-Blocking vs Fast

Ini harus dibedakan.

Sebuah operasi bisa non-blocking tetapi tetap lambat.

Contoh:

- query database 2 detik;
- request third-party 5 detik;
- file besar butuh waktu lama dibaca;
- queue worker antre panjang.

Main thread tidak menunggu secara blocking, benar.
Tetapi pengalaman pengguna dan SLA tetap jelek.

Jadi non-blocking adalah properti eksekusi.
Bukan jaminan performa bisnis.

## Throughput vs Latency

Node.js sering unggul di throughput untuk workload I/O-bound.
Tetapi Anda tetap harus melihat latency distribution.

Pertanyaan penting:

- p50 bagaimana?
- p95 bagaimana?
- p99 bagaimana?
- apa yang terjadi saat dependency melambat?
- apa yang terjadi saat request size membesar?

Kalau Anda hanya melihat rata-rata, Anda bisa merasa sistem sehat padahal tail latency sudah rusak.

## Contoh Kasus Nyata

Bayangkan endpoint:

1. ambil data user dari database;
2. ambil notifikasi dari service lain;
3. format response besar;
4. kirim JSON ke client.

Meski langkah 1 dan 2 async, bottleneck tetap bisa muncul di:

- database lambat;
- service lain lambat;
- serialisasi response berat;
- koneksi outbound pool habis;
- memory pressure karena banyak request inflight.

Kalau Anda hanya berkata "tapi semua sudah async", itu jawaban kosong.

## Synchronous API yang Masih Berbahaya

Node.js tetap punya banyak API sinkron:

- `readFileSync`
- `writeFileSync`
- synchronous crypto tertentu
- synchronous compression tertentu

Di CLI kecil, kadang ini tidak masalah.
Di server yang menerima traffic, ini sering buruk.

Satu panggilan sync yang berat dapat menahan seluruh event loop.

## JSON sebagai Bottleneck Tersembunyi

Banyak service Node.js tidak sadar bahwa `JSON.parse` dan `JSON.stringify` bisa mahal untuk payload besar.

Contoh masalah:

- cache value sangat besar;
- aggregasi report besar;
- response list ribuan item;
- log object raksasa;
- body parser menerima payload terlalu besar.

Ini bukan masalah I/O.
Ini biaya CPU dan memory setelah I/O selesai.

## Stream vs Buffer Penuh

Salah satu cara memanfaatkan non-blocking I/O dengan sehat adalah streaming.

Kalau Anda:

- membaca file besar secara stream;
- meneruskan response upstream secara stream;
- memproses data bertahap;

Anda bisa mengurangi memory spike dan memperbaiki backpressure handling.

Kalau Anda selalu meng-buffer seluruh payload:

- memory footprint naik;
- latency akhir bisa naik;
- garbage collection lebih berat.

## Timeout dan Non-Blocking I/O

Non-blocking request yang tidak punya timeout sehat tetap berbahaya.

Kenapa?

- request bisa menggantung lama;
- socket tertahan;
- inflight request menumpuk;
- user menunggu tanpa kepastian;
- retry dari client bisa memperparah beban.

Jadi non-blocking tanpa timeout discipline adalah setengah matang.

## Connection Pool dan Non-Blocking

Anda bisa punya app non-blocking, tetapi tetap bottleneck di connection pool.

Contoh:

- database pool hanya 10 koneksi;
- app menerima ratusan request bersamaan;
- query menunggu slot;
- latency naik;
- queueing bertambah.

Async API di level aplikasi tidak menghapus kapasitas terbatas resource di bawahnya.

## Non-Blocking I/O dan Rate of Failure

Ironisnya, sistem non-blocking yang sangat efisien juga bisa gagal lebih cepat.

Kenapa?

- ia mampu mendorong dependency lebih agresif;
- ia mampu menahan lebih banyak inflight request sebelum jatuh;
- saat downstream melambat, backlog bisa tumbuh cepat.

Kalau tidak ada circuit breaking, timeout, atau backpressure control, service bisa menjadi amplifier kegagalan.

## Monitoring yang Relevan

Untuk memahami bottleneck pada service non-blocking, Anda harus mengukur:

- event loop lag;
- CPU usage;
- memory usage;
- GC activity;
- thread pool saturation bila relevan;
- inflight request;
- queue depth;
- dependency latency;
- timeout rate;
- error rate.

Kalau Anda hanya melihat request per second, Anda buta.

## Heuristik Senior

1. Non-blocking I/O meningkatkan efisiensi, bukan menghapus bottleneck.
2. Cari bottleneck di seluruh path request.
3. Curigai CPU setelah I/O kembali ke callback.
4. Curigai dependency dan pool limit saat latensi meningkat.
5. Gunakan stream bila payload besar.
6. Batasi inflight work dengan timeout, pooling, dan backpressure yang sehat.
7. Ukur tail latency, bukan rata-rata saja.

## Pertanyaan Interview

### Dasar

- Apa arti non-blocking I/O?
- Kenapa Node.js cocok untuk I/O-heavy workload?
- Kenapa async tidak selalu berarti cepat?
- Apa risiko API sinkron di server Node.js?

### Menengah

- Bagaimana thread pool saturation bisa memengaruhi latency?
- Kenapa database lambat tetap jadi bottleneck walaupun app non-blocking?
- Apa hubungan inflight request dengan memory pressure?
- Kapan stream lebih baik daripada membaca seluruh payload ke memory?

### Senior

- Bagaimana Anda menjelaskan bahwa sistem non-blocking tetap bisa kolaps saat downstream lambat?
- Metrics apa yang Anda lihat untuk membedakan event loop issue dari dependency issue?
- Kenapa throughput tinggi bisa datang bersama tail latency yang buruk?
- Bagaimana Anda merancang backpressure untuk service Node.js I/O-heavy?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- endpoint agregasi lambat padahal semua request pakai `await`;
- service proxy memory-nya naik terus di traffic tinggi;
- upload/download file besar memicu latency spike;
- downstream timeout membuat seluruh cluster terlihat hang;
- cache service cepat, tetapi serialisasi response jadi bottleneck;
- pool database habis walaupun CPU app rendah.

## Ringkasan Brutal

- Non-blocking I/O itu kuat, tetapi bukan sihir.
- Ia mengurangi blocking wait pada main thread.
- Ia tidak menghapus bottleneck CPU, memory, pool, queue, dependency, atau kernel resource.
- Async syntax yang rapi bisa tetap menyembunyikan sistem yang rapuh.
- Kalau Anda tidak tahu di mana bottleneck pindah, Anda belum paham non-blocking secara senior.

## Checklist Pemahaman

- Saya bisa menjelaskan arti non-blocking I/O tanpa slogan kosong.
- Saya tahu non-blocking tidak sama dengan fast.
- Saya paham thread pool, dependency latency, dan queueing tetap bisa jadi bottleneck.
- Saya sadar payload besar bisa mengubah bottleneck menjadi CPU/memory.
- Saya tahu pentingnya timeout, pooling, dan backpressure.
- Saya tidak lagi menyederhanakan semua performa Node.js menjadi "karena async".

## Penutup

Node.js memberi alat yang kuat untuk menangani banyak I/O secara efisien.
Tetapi engineer senior tahu bahwa efisiensi itu hanya satu bagian dari sistem.

Yang membedakan level senior adalah kemampuan melihat seluruh jalur kerja, menemukan titik jenuh yang sebenarnya, dan mendesain batasan yang sehat sebelum sistem kolaps.
