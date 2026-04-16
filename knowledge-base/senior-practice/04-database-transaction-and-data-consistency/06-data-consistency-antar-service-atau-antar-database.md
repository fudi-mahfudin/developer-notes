# Data Consistency Antar Service atau Antar Database

## Tujuan

Topik ini penting karena banyak sistem modern tidak hidup di satu database tunggal.
Begitu data tersebar antar service atau antar database, consistency menjadi jauh lebih mahal.

Kalau topik ini dangkal:

- tim membuat asumsi seolah commit lokal berarti sistem global sudah benar;
- retry memicu duplikasi;
- data antar sistem drift;
- reconciliation jadi aktivitas permanen;
- incident sulit dijelaskan karena semua service merasa dirinya benar.

## Kenapa Topik Ini Penting

Begitu satu alur bisnis menyentuh:

- service A;
- service B;
- database utama;
- cache;
- queue;
- external system,

Anda tidak lagi hidup di dunia transaction ACID tunggal.
Anda hidup di dunia distributed consistency trade-off.

## Model Mental yang Benar

Pegang ini:

1. Commit di satu database lokal tidak berarti seluruh sistem konsisten.
2. Cross-service update selalu punya failure window.
3. Synchronous flow tidak otomatis lebih konsisten.
4. Eventual consistency bukan alasan untuk chaos.
5. Setiap boundary antar sistem butuh contract dan recovery strategy.

## Satu Sumber Kebenaran

Hal pertama yang harus jelas:

- service mana yang owns fakta tertentu?

Kalau ownership data kabur:

- dua sistem bisa menulis fakta sama;
- conflict sulit diselesaikan;
- rekonsiliasi jadi rutin.

Consistency yang sehat dimulai dari ownership yang jelas.

## Local Consistency vs Global Consistency

Service bisa konsisten secara lokal:

- transaction di DB sendiri benar;
- constraint lokal terjaga.

Tetapi secara global sistem masih bisa inkonsisten jika:

- event belum terkirim;
- service downstream gagal update;
- cache belum invalid;
- external API belum sinkron.

Ini pembeda penting.

## Dual Write Problem

Ini sumber klasik inconsistency.

Contoh:

1. update database lokal;
2. publish event atau update service lain;
3. langkah kedua gagal.

Sekarang satu sistem sudah berubah, sistem lain belum.

Kalau tim masih mengandalkan dual write naif, bug consistency tinggal menunggu waktu.

## Synchronous Cross-Service Call

Banyak orang merasa synchronous call lebih aman.
Tidak selalu.

Masalahnya:

- chain dependency panjang;
- timeout ambigu;
- partial failure tetap mungkin;
- rollback lintas service tidak otomatis ada.

Jadi synchronous flow hanya memindahkan bentuk masalah, bukan menghapusnya.

## Eventual Consistency

Eventual consistency berarti sistem menerima bahwa propagasi perubahan antar boundary bisa memerlukan waktu.

Ini sah.
Tetapi harus dijawab:

- data mana yang boleh terlambat sinkron?
- berapa lama keterlambatan yang diterima?
- bagaimana user diberi ekspektasi?
- bagaimana repair saat sinkronisasi gagal?

Eventual consistency tanpa operational discipline adalah alasan untuk data berantakan.

## Read-after-Write Expectation

Pertanyaan penting:

- setelah user melakukan aksi, apakah user harus langsung melihat efeknya di semua tempat?

Kalau jawabannya ya, desain flow harus mencerminkan itu.
Kalau tidak, UI dan contract harus jujur soal keterlambatan sinkronisasi.

## Cache sebagai Sumber Inconsistency Tambahan

Begitu cache ikut bermain:

- data utama berubah;
- cache belum invalid;
- read berikutnya masih membaca data lama.

Kalau invalidation lemah, cache memperbesar gap consistency.

## Duplicate Event dan At-Least-Once Delivery

Jika sinkronisasi memakai queue/event:

- duplicate delivery mungkin terjadi;
- consumer bisa crash setelah effect parsial;
- ordering mungkin tidak selalu stabil.

Artinya consumer harus siap dengan:

- idempotency;
- dedupe;
- replay-safe behavior.

## Ordering Problem

Kadang masalah bukan hanya event telat.
Masalahnya event datang di urutan salah atau diproses berbeda waktu.

Contoh:

- status `paid`;
- lalu `refunded`;
- tetapi sistem lain memproses `refunded` duluan atau telat.

Kalau semantics ordering tidak dipikirkan, data global cepat kacau.

## Source of Truth vs Projection

Service yang owns data utama sebaiknya dibedakan dari service yang hanya memegang projection, cache, atau copy untuk kebutuhan read.

Kalau projection dianggap sumber kebenaran, tim akan membuat keputusan salah saat conflict.

## Reconciliation

Dalam distributed system nyata, reconciliation bukan tanda kegagalan total.
Ia sering kebutuhan normal.

Tetapi:

- jika reconciliation terlalu sering diperlukan;
- jika dilakukan manual terus-menerus;
- jika tidak ada tooling untuk itu,

maka desain awal kemungkinan lemah.

## Detecting Drift

Anda harus bisa menjawab:

- bagaimana tahu bahwa dua sistem sudah berbeda?
- metrik apa yang menunjukkan drift?
- bagaimana compare source-of-truth dengan projection?
- siapa yang bertanggung jawab repair?

Kalau drift tidak terdeteksi, inconsistency bisa hidup lama.

## Strong Consistency Kapan Perlu

Tidak semua flow boleh eventual.
Contoh yang sering lebih ketat:

- charge finansial;
- alokasi stok terakhir;
- permission kritis;
- uniqueness tertentu.

Pada flow seperti ini, boundary dan orchestration harus lebih hati-hati.

## Eventual Consistency Kapan Masuk Akal

Biasanya cukup masuk akal untuk:

- analytics;
- search indexing;
- dashboard summary;
- notification state;
- projection read model tertentu.

Yang penting adalah bisnis menerima latency sinkronisasi tersebut.

## Idempotency di Lintas Sistem

Consistency antar service hampir selalu terkait idempotency.
Kenapa?

- retry call eksternal bisa terjadi;
- event duplicate bisa datang;
- ambiguous timeout terjadi.

Tanpa idempotency, cross-system consistency jadi jauh lebih rapuh.

## Compensating Action

Kalau perubahan lintas sistem gagal sebagian, kadang Anda butuh kompensasi.
Tetapi kompensasi bukan rollback ajaib.

Ia adalah aksi baru dengan efek bisnis tersendiri.
Harus:

- aman;
- terobservasi;
- punya semantics jelas.

## Heuristik Senior

1. Pastikan ownership data per service jelas.
2. Jangan percaya dual write naif.
3. Bedakan source-of-truth dari projection.
4. Anggap duplicate dan delayed delivery sebagai kondisi normal.
5. Tentukan mana flow yang boleh eventual dan mana yang tidak.
6. Siapkan drift detection dan reconciliation, bukan berharap tidak perlu.
7. Idempotency dan observability adalah bagian inti consistency lintas sistem.

## Pertanyaan Interview

### Dasar

- Kenapa consistency antar service lebih sulit daripada satu database?
- Apa itu dual write problem?
- Apa arti eventual consistency?
- Kenapa ownership data penting?

### Menengah

- Kapan eventual consistency masih acceptable?
- Apa risiko cache dalam flow consistency?
- Kenapa duplicate event harus dianggap normal?
- Bagaimana projection berbeda dari source-of-truth?

### Senior

- Bagaimana Anda mendesain flow lintas service agar dual write problem tidak menghancurkan integritas?
- Bagaimana Anda menentukan SLA sinkronisasi antar sistem?
- Bagaimana Anda membangun reconciliation strategy yang realistis?
- Bagaimana Anda menjelaskan ke stakeholder bahwa strong consistency global mungkin terlalu mahal untuk use case tertentu?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- status order di service A beda dengan service B;
- event sukses simpan DB tetapi gagal publish;
- cache menampilkan data lama setelah mutation;
- dashboard dan sumber transaksi berbeda angka;
- integrasi eksternal telat menerima update.

## Ringkasan Brutal

- Consistency lintas service selalu lebih mahal dari consistency lokal.
- Commit lokal tidak menjamin kebenaran global.
- Dual write naif adalah jebakan klasik.
- Eventual consistency sah, tetapi harus dikelola dengan disiplin.
- Engineer senior tahu kapan menerima keterlambatan sinkronisasi dan kapan tidak boleh kompromi.

## Checklist Pemahaman

- Saya paham commit lokal bukan global truth.
- Saya tahu dual write problem dan kenapa berbahaya.
- Saya bisa membedakan source-of-truth dari projection.
- Saya paham duplicate event dan retry adalah realitas.
- Saya tahu reconciliation bukan backup plan sembarangan, tetapi bagian operasi.

## Penutup

Begitu sistem Anda tersebar ke beberapa service atau database, consistency tidak lagi bisa diselesaikan hanya dengan "pakai transaction".
Anda butuh ownership jelas, contract yang jujur, dan strategi recovery yang nyata.
