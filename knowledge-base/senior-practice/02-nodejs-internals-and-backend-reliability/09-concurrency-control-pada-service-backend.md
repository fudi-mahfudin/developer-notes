# Concurrency Control pada Service Backend

## Tujuan

Topik ini penting karena banyak engineer mendengar kata concurrency lalu langsung memikirkan thread.
Itu terlalu sempit.

Dalam service backend, concurrency control adalah soal bagaimana mencegah beberapa actor yang berjalan "bersamaan" merusak konsistensi data, membebani resource secara tidak sehat, atau menghasilkan perilaku nondeterministic.

Kalau topik ini lemah, gejala yang sering muncul:

- lost update;
- duplicate processing;
- overselling stok;
- job diproses dua kali;
- retry memicu side effect ganda;
- queue panjang karena semua hal dibiarkan parallel tanpa batas.

## Kenapa Topik Ini Penting

Walaupun JavaScript utama di Node.js single-threaded, service backend tetap menghadapi concurrency dari:

- banyak request masuk bersamaan;
- banyak process/container;
- banyak consumer queue;
- dependency yang merespons di waktu berbeda;
- retry dari client atau proxy;
- background job dan cron.

Jadi siapa pun yang berkata "Node.js single-threaded jadi aman dari race condition" belum paham production reality.

## Definisi Singkat

Concurrency control adalah strategi untuk mengatur akses paralel terhadap resource, state, atau operasi agar hasil tetap benar dan sistem tetap stabil.

Fokusnya dua:

- correctness;
- controlled throughput.

## Model Mental yang Benar

Pegang ini:

1. Concurrency di backend adalah realitas, bukan pilihan.
2. Masalahnya bukan hanya data race di memory, tetapi juga race di database, queue, cache, dan external side effect.
3. Membiarkan semua operasi parallel tanpa batas bukan tanda performa tinggi, tetapi tanda kurang disiplin.
4. Concurrency control harus disesuaikan dengan invariants bisnis.
5. Tujuan utamanya adalah menjaga correctness terlebih dahulu, lalu throughput secara sehat.

## Bentuk Masalah Concurrency yang Umum

### Lost Update

Dua actor membaca state lama yang sama, lalu menulis hasil baru tanpa tahu bahwa actor lain juga mengubah.

### Double Processing

Job atau event yang sama diproses dua kali.

### Oversubscription

Terlalu banyak operasi berat berjalan bersamaan sehingga dependency atau service sendiri jenuh.

### Out-of-Order Effect

Hasil lama datang belakangan dan menimpa hasil baru yang lebih relevan.

### Duplicate Side Effect

Email, payment, webhook, atau notifikasi terkirim lebih dari sekali.

## Concurrency Control Bukan Hanya Soal Database

Memang database adalah salah satu tempat utama.
Tetapi kontrol concurrency juga diperlukan di:

- in-memory queue;
- message consumer;
- API integration;
- file processing;
- distributed lock;
- rate-limited dependency;
- scheduler.

Kalau diskusi selalu berakhir di "pakai transaction saja", itu terlalu sempit.

## Tingkat Kontrol yang Berbeda

Concurrency control bisa diterapkan di beberapa layer:

- application layer;
- database layer;
- message queue layer;
- cache/lock layer;
- infrastructure layer.

Solusi yang matang sering menggabungkan beberapa lapisan.

## Application-Level Control

Contoh:

- batasi jumlah task async bersamaan;
- serialkan job per entity;
- gunakan in-memory mutex untuk scope process lokal;
- dedupe inflight request.

Ini berguna, tetapi ada batas.
Kalau app Anda berjalan di banyak instance, kontrol lokal tidak cukup untuk correctness global.

## Database-Level Control

Database sering jadi sumber kontrol kuat:

- transaction;
- row lock;
- optimistic locking;
- unique constraint;
- compare-and-update;
- isolation level.

Ini sangat berguna untuk state kritis.
Tetapi jangan pikir DB otomatis menyelesaikan semua concurrency issue lintas sistem.

## Optimistic Locking

Pola ini mengasumsikan konflik jarang terjadi.
Biasanya memakai version number atau timestamp.

Alurnya:

1. baca data dengan version;
2. ubah secara lokal;
3. update hanya jika version masih sama.

Kalau gagal, artinya ada actor lain yang sudah mengubah lebih dulu.

Keunggulan:

- tidak menahan lock lama;
- bagus untuk konflik yang relatif jarang.

Kelemahan:

- caller harus siap retry atau resolve conflict;
- tidak cocok jika konflik sangat sering.

## Pessimistic Locking

Pola ini mengunci resource lebih awal agar actor lain menunggu atau gagal.

Keunggulan:

- lebih aman untuk resource yang konflik intens dan kritis.

Kelemahan:

- throughput bisa turun;
- deadlock risk naik;
- lock contention jadi bottleneck baru.

## Unique Constraint sebagai Concurrency Guard

Untuk beberapa kasus, unique constraint sangat ampuh:

- mencegah duplicate insert;
- menjaga idempotency;
- memastikan satu external reference hanya sekali.

Keunggulannya:

- kuat;
- sederhana;
- dijaga di level data.

Tetapi constraint hanya menjaga kondisi tertentu.
Ia tidak otomatis menyelesaikan seluruh workflow bisnis multi-langkah.

## Serial Processing per Key

Kadang yang terbaik adalah memastikan operasi untuk entity tertentu diproses satu per satu.

Contoh:

- semua update untuk `accountId` yang sama;
- semua event untuk `orderId` tertentu;
- semua job untuk `inventoryItem` tertentu.

Ini bisa dilakukan lewat:

- partitioned queue;
- keyed worker;
- distributed mutex;
- per-entity scheduler.

## Distributed Lock

Distributed lock kadang berguna saat banyak instance harus berebut resource yang sama.
Tetapi ini bukan alat yang boleh dipakai sembarangan.

Pertanyaan penting:

- lock-nya reliable tidak?
- lease expiry bagaimana?
- kalau process mati, lock dilepas bagaimana?
- apa yang terjadi saat clock skew atau network partition?

Kalau lock system dipakai tanpa pemahaman failure mode, Anda hanya memindahkan risiko.

## Rate Limiting sebagai Bentuk Concurrency Control

Rate limiting bukan hanya soal keamanan.
Ia juga bentuk concurrency control untuk melindungi:

- dependency rate-limited;
- resource mahal;
- backend sendiri dari burst berlebihan.

Dengan membatasi concurrency atau request rate, Anda bisa menjaga sistem tetap degradasi secara terkendali.

## Bounded Concurrency

Salah satu pola paling penting adalah bounded concurrency.

Jangan jalankan semua task sekaligus jika:

- dependency terbatas;
- memory sensitif;
- CPU berat;
- pool kecil.

Kadang throughput terbaik justru datang dari concurrency yang dibatasi dengan sehat, bukan dari parallelism maksimal.

## Queue dan Backpressure

Kalau concurrency tidak bisa dieksekusi langsung, queue bisa membantu.
Tetapi queue hanya memindahkan antrean.

Pertanyaan penting:

- berapa panjang queue yang aman?
- apa SLA item di queue?
- kapan harus drop, defer, atau reject?
- apa retry policy-nya?

Queue tanpa backpressure policy hanyalah penundaan masalah.

## Concurrency pada External Side Effect

Contoh:

- kirim email;
- charge payment;
- publish webhook;
- update third-party system.

Concurrency di area ini berbahaya karena efeknya keluar dari boundary lokal.
Kalau operasi terulang atau saling balapan:

- state bisa tak sinkron;
- kompensasi jadi mahal;
- audit jadi sulit.

Karena itu side effect perlu idempotency dan sequencing yang baik.

## Concurrency dan Cache

Cache juga bisa menjadi sumber masalah:

- stampede saat banyak request miss bersamaan;
- stale write menimpa value baru;
- race saat invalidate dan refill.

Solusi bisa meliputi:

- single-flight dedupe;
- TTL dengan jitter;
- write-through/write-behind policy yang jelas;
- versioned cache.

## Per-Process Lock Tidak Cukup untuk Multi-Instance

Ini jebakan umum.
Mutex in-memory bisa berguna untuk satu process.
Tetapi kalau Anda punya banyak pod/container:

- instance lain tidak tahu lock itu;
- correctness global tetap bocor.

Jadi selalu tanya:

- scope concurrency issue ini lokal atau distributed?

## Retry dan Concurrency

Retry menambah actor yang ikut bersaing.
Kalau operasi tidak terlindungi:

- duplicate work naik;
- contention naik;
- conflict frequency naik.

Jadi retry policy dan concurrency control tidak bisa dipikirkan terpisah.

## Observability untuk Concurrency Problem

Anda perlu bisa melihat:

- queue depth;
- lock wait time;
- conflict rate;
- duplicate processing rate;
- deadlock atau retry rate;
- pool saturation;
- inflight operation count;
- event lag untuk keyed processing.

Kalau tidak, issue concurrency akan terlihat seperti "bug random".

## Pilih Berdasarkan Invariant

Pertanyaan senior bukan:

- "pakai lock atau queue?"

Tetapi:

- "invariant bisnis apa yang harus selalu benar?"
- "di boundary mana invariant itu paling aman dijaga?"
- "berapa biaya jika conflict lolos?"

Contoh invariant:

- saldo tidak boleh negatif;
- stok tidak boleh terjual di bawah nol;
- order tertentu tidak boleh diproses dua kali;
- satu invoice eksternal hanya sekali dibuat.

## Anti-Pattern Umum

### 1. Parallelism Tanpa Batas

Semua task dijalankan sekaligus lalu berharap sistem kuat.

### 2. Mengandalkan In-Memory Flag untuk Distributed Problem

Ini gagal begitu ada lebih dari satu instance.

### 3. Retry Tanpa Idempotency

Duplicate side effect sangat mungkin terjadi.

### 4. Locking Berlebihan

Semua hal dikunci hingga throughput ambruk.

## Heuristik Senior

1. Identifikasi invariant bisnis yang harus dijaga.
2. Bedakan problem lokal per process dari problem distributed.
3. Gunakan unique constraint dan transaction bila itu paling sederhana dan kuat.
4. Pakai optimistic locking jika konflik jarang dan retry acceptable.
5. Pakai bounded concurrency untuk melindungi sistem dari overload.
6. Jangan lupa bahwa queue dan retry juga bagian dari concurrency story.
7. Ukur contention dan conflict, jangan hanya menebak.

## Pertanyaan Interview

### Dasar

- Kenapa Node.js service tetap punya concurrency issue walaupun single-threaded?
- Apa itu lost update?
- Apa beda optimistic dan pessimistic locking?
- Kenapa bounded concurrency penting?

### Menengah

- Kapan unique constraint cukup sebagai proteksi?
- Kenapa mutex in-memory tidak cukup di multi-instance system?
- Bagaimana queue membantu concurrency control?
- Apa hubungan retry dengan duplicate processing?

### Senior

- Bagaimana Anda memilih layer yang tepat untuk menjaga invariant bisnis?
- Kapan Anda memilih serial processing per key dibanding lock umum?
- Bagaimana Anda menghindari cache stampede?
- Metrics apa yang Anda gunakan untuk mengidentifikasi contention dan overload?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- dua user checkout item stok terakhir;
- worker queue memproses event yang sama dua kali;
- request update saldo balapan;
- cache miss besar memicu stampede;
- external API rate-limited dihajar banyak request parallel.

## Ringkasan Brutal

- Concurrency control bukan soal thread saja.
- Node.js tetap sangat rentan terhadap race dan overload jika desainnya lemah.
- Correctness dulu, throughput kedua.
- Lock bukan satu-satunya alat, dan bukan selalu alat terbaik.
- Kalau Anda tidak tahu invariant apa yang dijaga, Anda tidak sedang mengontrol concurrency. Anda hanya bereaksi terhadap chaos.

## Checklist Pemahaman

- Saya tahu concurrency problem tetap ada di backend Node.js.
- Saya bisa membedakan local vs distributed concurrency issue.
- Saya paham optimistic locking, pessimistic locking, dan unique constraint.
- Saya mengerti bounded concurrency dan backpressure.
- Saya tahu queue dan retry bisa memperparah atau membantu tergantung desain.
- Saya selalu mulai dari invariant bisnis, bukan dari tool.

## Penutup

Concurrency control adalah salah satu area yang paling membedakan engineer senior dari engineer yang hanya jago menulis endpoint.
Karena di sinilah sistem diuji bukan hanya untuk "jalan", tetapi untuk tetap benar saat banyak hal terjadi sekaligus.
