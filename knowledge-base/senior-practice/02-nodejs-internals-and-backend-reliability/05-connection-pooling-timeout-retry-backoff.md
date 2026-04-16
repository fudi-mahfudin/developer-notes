# Connection Pooling, Timeout, Retry, dan Backoff

## Tujuan

Topik ini sangat penting untuk reliability backend.
Banyak service kelihatan baik saat traffic normal, tetapi mulai runtuh ketika dependency melambat, koneksi menumpuk, timeout tidak disiplin, dan retry saling memperparah.

Engineer yang belum matang sering melihat empat topik ini secara terpisah.
Padahal dalam sistem nyata, mereka saling terikat.

Kalau salah desain:

- database pool habis;
- request menggantung terlalu lama;
- retry storm menghajar dependency;
- recovery sistem justru makin lambat;
- tail latency dan error rate naik bersamaan.

## Kenapa Topik Ini Penting

Setiap service backend hampir selalu bergantung pada resource terbatas:

- koneksi database;
- koneksi Redis;
- socket HTTP outbound;
- worker queue consumer slot;
- file handle;
- thread pool;
- bandwidth dependency.

Connection pooling, timeout, retry, dan backoff adalah cara Anda mengendalikan resource dan failure mode itu.
Kalau empat hal ini lemah, service Anda mungkin terlihat oke di happy path, tetapi rapuh di bawah gangguan kecil.

## Gambaran Besar

Empat konsep ini saling berhubungan:

- pooling mengatur jumlah resource aktif;
- timeout membatasi berapa lama Anda mau menunggu;
- retry menentukan apakah operasi layak dicoba lagi;
- backoff menentukan bagaimana retry dilakukan agar tidak brutal.

Kalau salah satu salah, tiga lainnya bisa ikut tidak berguna.

## Model Mental yang Benar

Pegang prinsip ini:

1. Resource koneksi selalu terbatas.
2. Menunggu tanpa batas adalah desain buruk.
3. Retry bukan tanda resilience kalau dilakukan tanpa seleksi.
4. Backoff ada untuk mengurangi amplifikasi kegagalan.
5. Pool, timeout, retry, dan backoff harus dirancang sebagai satu sistem.

## Connection Pooling

### Definisi Singkat

Connection pooling adalah teknik mempertahankan sekumpulan koneksi reusable ke dependency agar tidak perlu membuat koneksi baru untuk setiap operasi.

Ini penting karena membuat koneksi baru punya biaya:

- TCP handshake;
- TLS handshake;
- auth overhead;
- driver setup;
- socket allocation;
- latency tambahan.

Pool membantu amortisasi biaya itu.

## Kenapa Pool Penting

Tanpa pool:

- overhead per request naik;
- dependency bisa kewalahan oleh koneksi churn;
- latency lebih tidak stabil.

Dengan pool:

- reuse koneksi lebih efisien;
- throughput bisa lebih baik;
- koneksi aktif lebih terkendali.

Tetapi pool juga bisa menjadi antrean tersembunyi.

## Pool Bukan Resource Tak Terbatas

Ini kesalahan yang sering terjadi.

Kalau pool database berukuran 20 dan ada 200 request yang butuh query:

- 20 dapat koneksi;
- sisanya menunggu;
- queue internal terbentuk;
- latency bertambah bahkan sebelum query benar-benar dieksekusi.

Jadi pool membatasi resource, tetapi sekaligus menciptakan titik antrean.

## Sizing Pool

Ukuran pool tidak boleh asal.
Terlalu kecil:

- concurrency aktual tercekik;
- queue panjang;
- latency tinggi.

Terlalu besar:

- dependency dibanjiri koneksi;
- contention meningkat;
- memory bertambah;
- database bisa jenuh.

Ukuran yang tepat bergantung pada:

- karakter workload;
- kapasitas dependency;
- jumlah process/instance;
- query duration;
- traffic pattern.

## Multiplication Effect

Ini bug operasional klasik.

Misalnya:

- satu app instance punya pool DB 20;
- ada 10 instance;
- total potential connections menjadi 200.

Kalau DB hanya nyaman di 80 koneksi aktif, Anda baru saja menciptakan masalah sendiri.

Senior engineer selalu menghitung pool total lintas semua instance, bukan hanya satu process.

## Pool Saturation

Gejalanya:

- latency naik;
- request menunggu lama sebelum query jalan;
- timeout meningkat;
- CPU app belum tentu tinggi;
- dependency terlihat sibuk atau queueing.

Kalau Anda hanya melihat query execution time di DB tanpa melihat wait time di app pool, Anda bisa salah diagnosis.

## Timeout

### Definisi Singkat

Timeout adalah batas maksimal berapa lama aplikasi bersedia menunggu suatu operasi.

Tanpa timeout yang sehat:

- request bisa menggantung;
- resource tertahan terlalu lama;
- caller menunggu tanpa kepastian;
- backlog membesar.

## Jenis Timeout yang Relevan

Secara praktis, Anda perlu memikirkan beberapa timeout:

- connection timeout;
- request timeout;
- read timeout;
- idle timeout;
- query timeout;
- overall operation deadline.

Kalau semua dicampur tanpa definisi jelas, sistem akan sulit dipahami.

## Timeout Bukan Sekadar Angka

Timeout harus mencerminkan:

- SLA bisnis;
- karakter dependency;
- budget total request;
- retry policy;
- user expectation.

Kalau upstream SLA 2 detik tetapi Anda memberi downstream timeout 10 detik, desain Anda tidak sinkron.

## Timeout Budgeting

Untuk satu request yang memanggil beberapa dependency, Anda harus berpikir budget.

Contoh:

- total budget request 1500 ms;
- auth service 200 ms;
- profile service 300 ms;
- DB 400 ms;
- sisa untuk app processing dan buffer.

Kalau tiap dependency diberi timeout panjang tanpa koordinasi, total waktu tunggu akan meledak.

## Retry

### Definisi Singkat

Retry adalah mencoba kembali operasi yang gagal.

Retry bisa berguna.
Tetapi retry juga salah satu cara tercepat memperburuk outage jika dilakukan tanpa disiplin.

## Kapan Retry Masuk Akal

Biasanya layak dipertimbangkan untuk error sementara seperti:

- network glitch;
- timeout sesekali;
- transient 5xx;
- rate limit sementara yang memberi petunjuk retry;
- deadlock retryable pada kondisi tertentu.

## Kapan Retry Tidak Masuk Akal

Biasanya tidak layak untuk:

- validation error;
- auth failure;
- permission error;
- payload salah;
- not found final;
- business rule rejection;
- operasi non-idempotent tanpa proteksi.

Retry pada error jenis ini hanya menambah noise dan beban.

## Retry dan Idempotency

Ini hubungan yang sangat penting.
Kalau operasi tidak idempotent, retry bisa membuat efek samping ganda.

Contoh:

- charge payment dua kali;
- kirim email ganda;
- insert record dobel;
- trigger webhook dobel.

Jadi sebelum menambah retry, tanya:

- apakah aman diulang?
- apakah ada idempotency key?
- apakah caller dan server sepakat soal semantics-nya?

## Retry Storm

Ini failure mode klasik.

Urutannya:

1. dependency mulai melambat;
2. request timeout meningkat;
3. client dan service mulai retry;
4. beban ke dependency bertambah;
5. dependency makin parah;
6. lebih banyak retry lagi.

Hasilnya: outage kecil berubah menjadi badai.

Retry bukan resilience kalau ia memperbesar load saat dependency sedang lemah.

## Backoff

### Definisi Singkat

Backoff adalah strategi memberi jeda antar retry agar percobaan ulang tidak langsung menabrak dependency yang belum pulih.

Tanpa backoff:

- retry datang rapat;
- load spike makin buruk;
- dependency tidak diberi waktu bernapas.

## Bentuk Backoff

Yang umum:

- fixed backoff;
- exponential backoff;
- exponential backoff with jitter.

Dalam banyak sistem produksi, jitter penting karena mencegah semua client retry di waktu yang sama.

## Kenapa Jitter Penting

Kalau seribu client retry tepat setiap 1 detik:

- dependency menerima gelombang serangan sinkron;
- recovery jadi makin susah.

Dengan jitter:

- retry tersebar;
- herd effect berkurang;
- load lebih natural.

## Pooling dan Retry Saling Mempengaruhi

Ini area yang sering dilupakan.

Kalau request menunggu lama di pool lalu timeout, lalu otomatis retry:

- pool makin padat;
- lebih banyak request lama menunggu;
- queue makin panjang.

Jadi retry yang terlihat "membantu" bisa sebenarnya memperparah pool saturation.

## Timeout dan Retry Harus Sinkron

Contoh desain buruk:

- timeout per call 5 detik;
- retry 3 kali;
- user-facing budget 6 detik.

Secara matematis saja ini sudah tidak masuk akal.

Pola yang lebih sehat:

- tetapkan total budget;
- turunkan sub-timeout dari budget itu;
- batasi retry count;
- gunakan backoff;
- pertimbangkan cancellation saat deadline total tercapai.

## Hedging dan Hati-Hati

Ada strategi lanjutan seperti hedged requests atau parallel fallback.
Ini kadang bermanfaat untuk tail latency.
Tetapi kalau diterapkan tanpa pengukuran dan kapasitas cukup, ia bisa menggandakan load.

Jadi jangan buru-buru memakai strategi agresif kalau dasar timeout dan retry saja belum sehat.

## Connection Leak

Pool hanya berguna kalau resource dikembalikan dengan benar.
Kalau koneksi bocor:

- pool terlihat "penuh" terus;
- request baru antre;
- service lambat atau macet;
- restart sementara terasa "menyelesaikan" masalah.

Ini salah satu alasan cleanup dan scope resource sangat penting.

## Database Pool vs HTTP Keep-Alive Pool

Tidak semua pool identik.

Database pool:

- biasanya koneksi lebih mahal;
- transaksi dan session semantics penting;
- limit DB sering ketat.

HTTP keep-alive pool:

- mengurangi handshake berulang;
- relevan untuk outbound service-to-service call;
- tuning idle socket penting.

Jangan menganggap semua pool bisa diset dengan mindset yang sama.

## Circuit Breaker dan Retry

Saat dependency benar-benar buruk, retry saja tidak cukup.
Kadang Anda butuh circuit breaker atau fail-fast behavior:

- hentikan percobaan sementara;
- kembalikan fallback atau error cepat;
- beri dependency waktu pulih.

Kalau tidak, timeout panjang dan retry terus-menerus hanya akan menahan sistem Anda sendiri.

## Deadline vs Timeout Lokal

Timeout lokal per operasi bagus.
Tetapi deadline end-to-end sering lebih sehat secara sistemik.

Artinya:

- total waktu request dibatasi;
- setiap langkah melihat sisa waktu;
- operasi baru tidak dimulai jika budget sudah tidak realistis.

Ini mencegah kerja sia-sia saat request secara keseluruhan sebenarnya sudah kalah.

## Monitoring yang Wajib Dilihat

Untuk topik ini, metrik penting meliputi:

- pool usage;
- pool wait time;
- timeout count;
- retry count;
- retry success rate;
- dependency latency;
- error code distribution;
- inflight request;
- tail latency.

Kalau retry rate naik tetapi success rate retry rendah, itu sinyal jelas bahwa strategi retry mungkin merusak lebih dari membantu.

## Heuristik Senior

1. Hitung pool total lintas semua instance, bukan per process saja.
2. Pool adalah kontrol resource sekaligus sumber antrean.
3. Semua dependency call harus punya timeout yang masuk akal.
4. Retry hanya untuk failure yang benar-benar transient dan aman diulang.
5. Gunakan backoff, dan biasanya jitter.
6. Pastikan timeout, retry, dan total request budget saling konsisten.
7. Amati apakah retry memperbaiki success rate atau hanya menambah load.

## Pertanyaan Interview

### Dasar

- Kenapa connection pooling penting?
- Kenapa timeout wajib?
- Kapan retry masuk akal?
- Kenapa backoff diperlukan?

### Menengah

- Apa risiko pool yang terlalu besar atau terlalu kecil?
- Kenapa retry bisa memperburuk outage?
- Apa hubungan retry dengan idempotency?
- Kenapa jitter berguna pada backoff?

### Senior

- Bagaimana Anda menghitung pool size pada multi-instance deployment?
- Bagaimana Anda membagi timeout budget untuk request yang punya banyak dependency?
- Bagaimana Anda mengevaluasi apakah retry policy sehat atau justru merusak?
- Kapan Anda memilih fail-fast atau circuit breaker daripada terus retry?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- database pool habis saat traffic naik;
- external API timeout lalu dipukul retry massal;
- deploy instance baru malah membuat DB makin sesak;
- queue request panjang meski CPU app rendah;
- service pulih lebih lambat karena semua client retry serempak;
- payment flow berisiko dobel karena retry tanpa idempotency.

## Ringkasan Brutal

- Pooling, timeout, retry, dan backoff adalah satu sistem, bukan empat checkbox terpisah.
- Pool membatasi resource tetapi juga menciptakan antrean.
- Timeout tanpa disiplin hanya menunda kegagalan.
- Retry tanpa seleksi dan idempotency adalah bom waktu.
- Backoff ada agar kegagalan tidak diamplifikasi.

Kalau Anda belum bisa menjelaskan hubungan antar empat hal ini, berarti reasoning reliability backend Anda belum matang.

## Checklist Pemahaman

- Saya tahu pool harus dihitung lintas seluruh instance.
- Saya paham timeout adalah batas desain, bukan angka acak.
- Saya tidak me-retry semua error.
- Saya tahu idempotency penting sebelum retry operasi sensitif.
- Saya paham exponential backoff dengan jitter biasanya lebih sehat.
- Saya mengerti retry bisa memperparah saturation dan outage.
- Saya bisa melihat hubungan antara pool wait time, timeout, dan tail latency.

## Penutup

Service backend yang stabil bukan service yang "jarang error" secara kebetulan.
Ia adalah service yang sadar bahwa dependency lambat, koneksi terbatas, dan failure transient akan selalu ada.

Yang membedakan engineer senior adalah kemampuannya mendesain batas, antrean, dan retry behavior agar sistem gagal dengan terkendali, bukan dengan panik.
