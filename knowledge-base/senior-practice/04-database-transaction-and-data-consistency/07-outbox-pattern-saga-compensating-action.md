# Outbox Pattern, Saga, dan Compensating Action

## Tujuan

Topik ini penting karena begitu sistem Anda perlu mengubah data lokal sekaligus memberi tahu sistem lain, dual write problem muncul.
Outbox, saga, dan compensating action adalah jawaban untuk dunia di mana distributed transaction penuh sulit atau tidak realistis.

Kalau topik ini dipahami setengah-setengah:

- event hilang;
- effect ganda terjadi;
- rollback lintas service dibayangkan terlalu naif;
- workflow panjang menjadi rapuh;
- tim mengira saga adalah sihir pengganti desain.

## Kenapa Topik Ini Penting

Contoh nyata:

- simpan order lalu publish event;
- charge payment lalu update shipment;
- update DB lalu kirim webhook;
- create booking lalu notify sistem lain.

Kalau salah satu langkah gagal setelah langkah lain sukses, Anda menghadapi state parsial lintas boundary.
Di sinilah pattern ini relevan.

## Model Mental yang Benar

Pegang ini:

1. Distributed consistency butuh orchestration sadar.
2. Outbox pattern memecahkan publish-after-commit problem lokal.
3. Saga mengatur serangkaian langkah lintas service yang bisa gagal di tengah.
4. Compensating action bukan rollback ACID.
5. Tidak semua flow butuh saga; beberapa cukup dengan outbox dan idempotent consumer.

## Outbox Pattern

Masalah yang diselesaikan outbox:

1. Anda update database lokal;
2. Anda juga harus mengirim event;
3. Kalau event publish gagal setelah commit lokal sukses, sistem lain tertinggal.

Outbox pattern menyimpan pesan/event ke tabel outbox dalam transaction yang sama dengan perubahan bisnis.

Jadi:

- perubahan domain dan catatan event committed bersama;
- publisher terpisah mengambil dari outbox dan mengirimkannya.

## Kenapa Outbox Kuat

Karena ia menghindari dual write naif.

Daripada:

- commit DB;
- lalu publish event secara terpisah,

Anda:

- commit DB + outbox record bersama.

Kalau publisher mati, event tidak hilang.
Ia masih ada di outbox untuk diproses ulang.

## Trade-off Outbox

Anda membayar:

- kompleksitas worker/publisher;
- monitoring backlog outbox;
- cleanup;
- idempotent publishing/consuming;
- kemungkinan delay sinkronisasi.

Tetapi ini sering jauh lebih sehat daripada percaya publish langsung akan selalu sukses.

## Polling vs Triggered Publisher

Outbox bisa diproses dengan:

- polling periodik;
- change-data-capture;
- worker internal terjadwal.

Pilihannya bergantung pada:

- latency requirement;
- infrastructure;
- operability;
- kompleksitas yang siap ditanggung.

## Idempotency dan Outbox

Outbox tidak menghilangkan kebutuhan idempotency.
Kenapa?

- publisher bisa retry;
- broker bisa redeliver;
- consumer bisa crash setelah side effect parsial.

Jadi event handler tetap harus aman terhadap duplicate processing.

## Saga

Saga adalah pola koordinasi untuk serangkaian langkah lintas service yang masing-masing punya transaction lokal, tetapi keseluruhan flow bisnis bisa gagal di tengah.

Saga biasanya berarti:

- step 1 sukses;
- step 2 sukses;
- step 3 gagal;
- perlu action kompensasi pada step sebelumnya bila dibutuhkan.

## Saga Bukan Transaction Global

Ini poin penting.

Saga tidak memberi ilusi ACID global.
Ia mengelola serangkaian keputusan lokal dan recovery path.

Karena itu:

- intermediate state bisa terlihat;
- order step penting;
- compensating action harus dirancang jelas.

## Orchestration vs Choreography

Saga bisa dijalankan dengan:

### Orchestration

Satu orchestrator mengarahkan langkah-langkah.

Kelebihan:

- flow lebih eksplisit;
- observability lebih mudah;
- reasoning lebih terpusat.

Kekurangan:

- satu komponen menjadi pusat koordinasi;
- coupling bisa naik.

### Choreography

Service bereaksi terhadap event satu sama lain tanpa controller pusat.

Kelebihan:

- lebih desentralisasi.

Kekurangan:

- flow sulit dilihat;
- debugging lebih susah;
- dependency implisit membesar.

Untuk domain kompleks, choreography sering cepat menjadi kabur jika tidak sangat disiplin.

## Compensating Action

Compensating action adalah aksi baru untuk meniadakan atau mengurangi dampak langkah yang sudah terjadi saat workflow lintas service gagal di tahap selanjutnya.

Contoh:

- reserve stock lalu gagal payment, maka release stock;
- create shipment lalu order dibatalkan, maka cancel shipment;
- kirim loyalty point lalu transaksi dibatalkan, maka reverse point.

## Kompensasi Bukan Undo Sempurna

Ini sangat penting.

Rollback database lokal bisa menghapus perubahan seolah tak pernah terjadi.
Kompensasi tidak selalu begitu.

Misalnya:

- email yang sudah terkirim tidak bisa "di-unsend";
- webhook yang sudah diterima pihak ketiga tidak bisa dijamin dibatalkan;
- pembayaran yang sudah capture mungkin perlu refund, bukan rollback diam-diam.

Karena itu kompensasi adalah tindakan bisnis baru, bukan delete magic.

## Kapan Saga Layak Dipakai

Saga layak saat:

- workflow lintas service cukup penting;
- ada beberapa step yang saling tergantung;
- partial failure punya dampak bisnis nyata;
- distributed transaction penuh tidak realistis;
- tiap service tetap punya boundary sendiri.

Tidak layak jika:

- flow sebenarnya sederhana dan cukup dengan outbox plus consumer idempotent;
- sistem belum kompleks tetapi tim tergoda overengineering.

## State Machine Penting

Saga sehat biasanya punya state machine eksplisit:

- pending;
- reserved;
- paid;
- failed;
- compensated;
- completed.

Tanpa state yang jelas:

- observability buruk;
- retry/repair kacau;
- operator sulit tahu posisi flow.

## Retry dalam Saga

Beberapa failure step mungkin transient.
Berarti retry bisa masuk akal.
Tetapi:

- harus ada batas;
- harus tahu step mana aman diulang;
- idempotency wajib;
- timeout semantics harus jelas.

Kalau retry liar, saga justru jadi badai side effect.

## Observability

Untuk outbox dan saga, observability bukan bonus.
Anda perlu:

- outbox backlog;
- publish failure count;
- step success/failure rate;
- compensation rate;
- stuck saga detection;
- correlation id lintas service.

Kalau tidak, workflow lintas sistem cepat menjadi kotak hitam.

## Outbox vs Saga

Outbox:

- fokus pada perubahan lokal + publish event reliably.

Saga:

- fokus pada koordinasi banyak langkah lintas service.

Outbox sering menjadi bagian dari implementasi saga, tetapi keduanya bukan hal yang sama.

## Anti-Pattern Umum

### 1. Dual Write Tanpa Outbox

DB commit sukses, event hilang.

### 2. Saga Tanpa State Eksplisit

Sulit dipulihkan dan sulit dipahami.

### 3. Menganggap Kompensasi = Rollback Sempurna

Ini salah konsep.

### 4. Choreography Tanpa Discipline

Flow tersebar dan dependency implisit menjadi liar.

## Heuristik Senior

1. Gunakan outbox saat perlu perubahan lokal dan publish event dengan reliabel.
2. Gunakan saga hanya jika workflow lintas service memang cukup kompleks dan penting.
3. Selalu desain idempotency pada publisher dan consumer.
4. Perlakukan compensating action sebagai aksi bisnis baru, bukan rollback ajaib.
5. Pilih orchestration vs choreography dengan sadar; jangan default ke event storm.
6. Pastikan state machine dan observability jelas.
7. Jangan overengineer jika use case cukup dengan pola yang lebih sederhana.

## Pertanyaan Interview

### Dasar

- Apa masalah yang diselesaikan outbox pattern?
- Apa itu saga?
- Kenapa compensating action bukan rollback ACID?
- Kenapa idempotency tetap penting walau sudah pakai outbox?

### Menengah

- Kapan outbox saja cukup dan kapan perlu saga?
- Apa beda orchestration dan choreography?
- Bagaimana Anda mendeteksi saga yang macet?
- Kenapa duplicate delivery harus diasumsikan normal?

### Senior

- Bagaimana Anda mendesain saga untuk workflow order-payment-shipment yang bisa gagal di berbagai titik?
- Bagaimana Anda memilih antara choreography dan orchestrator pada domain yang terus berkembang?
- Bagaimana Anda mengukur apakah compensation rate menunjukkan desain yang salah?
- Bagaimana Anda menjelaskan ke bisnis bahwa sebagian langkah tidak bisa di-rollback sempurna, hanya dikompensasi?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- order tersimpan tetapi event ke fulfillment hilang;
- payment sukses tetapi shipment gagal dibuat;
- reserve stock perlu dibatalkan saat step berikutnya gagal;
- workflow lintas service sulit didiagnosis tanpa correlation id.

## Ringkasan Brutal

- Outbox menyelamatkan Anda dari dual write naif.
- Saga mengelola kegagalan lintas service, bukan menghapus kompleksitasnya.
- Compensating action adalah langkah bisnis baru, bukan undo magic.
- Idempotency dan observability adalah tulang punggung pattern ini.
- Engineer senior tahu kapan pattern ini benar-benar perlu dan kapan tim hanya sedang overengineering.

## Checklist Pemahaman

- Saya paham perbedaan outbox dan saga.
- Saya tahu dual write problem dan kenapa outbox relevan.
- Saya mengerti kompensasi tidak sama dengan rollback lokal.
- Saya sadar event duplicate dan retry tetap bagian dari desain.
- Saya tahu saga butuh state machine dan observability.

## Penutup

Begitu sistem Anda bergerak lintas boundary, konsistensi tidak lagi bisa dibeli dengan satu transaction global sederhana.
Pattern seperti outbox dan saga membantu, tetapi hanya jika dipakai dengan disiplin dan pemahaman failure mode yang nyata.
