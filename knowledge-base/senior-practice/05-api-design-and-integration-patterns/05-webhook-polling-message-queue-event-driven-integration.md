# Webhook, Polling, Message Queue, dan Event-Driven Integration

## Tujuan

Topik ini penting karena integrasi antar sistem tidak hanya soal "bisa kirim data".
Pertanyaan pentingnya adalah:

- siapa memulai komunikasi;
- bagaimana failure ditangani;
- apakah delivery guaranteed;
- bagaimana ordering dan retry dipikirkan;
- berapa cepat sinkronisasi dibutuhkan.

## Kenapa Topik Ini Penting

Banyak tim memilih pola integrasi berdasarkan kebiasaan, bukan kebutuhan.
Akibatnya:

- polling berlebihan membebani sistem;
- webhook tidak idempotent;
- queue consumer memproses dobel;
- event-driven flow sulit di-debug;
- real-time expectation tidak selaras dengan pola yang dipilih.

## Model Mental yang Benar

Pegang ini:

1. Tidak ada satu pola integrasi yang terbaik untuk semua kasus.
2. Webhook, polling, dan queue punya failure mode berbeda.
3. Event-driven bukan otomatis lebih baik; ia hanya memindahkan bentuk coupling.
4. Delivery guarantee dan operability lebih penting daripada slogan arsitektur.
5. Pilih pola berdasarkan ownership, latency need, dan recovery behavior.

## Polling

Polling berarti consumer secara periodik bertanya:

- ada data baru?
- status berubah?
- ada job selesai?

Kelebihan:

- sederhana;
- consumer memegang ritme;
- cocok jika provider tidak mendukung push.

Kekurangan:

- boros request;
- latency sinkronisasi tergantung interval;
- bisa menghasilkan banyak request kosong.

## Webhook

Webhook berarti producer mendorong event atau notifikasi ke consumer saat sesuatu terjadi.

Kelebihan:

- lebih push-driven;
- latency lebih baik dibanding polling periodik kasar;
- mengurangi request kosong.

Kekurangan:

- consumer harus punya endpoint publik/reachable;
- retry dan security jadi penting;
- duplicate delivery harus diasumsikan normal.

## Message Queue

Queue memisahkan producer dan consumer secara asinkron melalui broker.

Kelebihan:

- buffering;
- decoupling waktu;
- retry dan load smoothing lebih baik;
- cocok untuk pekerjaan async.

Kekurangan:

- operability lebih kompleks;
- ordering dan duplicate handling perlu disiplin;
- observability harus lebih matang.

## Event-Driven Integration

Event-driven berarti perubahan state atau kejadian domain dipublikasikan sebagai event yang kemudian dikonsumsi pihak lain.

Ini berguna untuk:

- loose coupling tertentu;
- async propagation;
- projection;
- workflow lintas service.

Tetapi event-driven tidak menghapus kebutuhan kontrak.
Ia justru membuat kontrak lebih tersebar.

## Pull vs Push

Polling adalah pull.
Webhook dan event push-driven.

Pertanyaan penting:

- siapa yang paling tepat memegang inisiatif?
- siapa yang lebih mampu menyimpan state perubahan?
- apakah consumer harus selalu up to date atau cukup eventual?

## Latency vs Simplicity

Polling sering lebih sederhana.
Webhook atau queue sering memberi latency lebih baik.

Trade-off-nya:

- semakin sederhana, bisa jadi makin lambat atau boros;
- semakin canggih, operability dan debugging makin mahal.

Engineer senior tidak malu memilih polling jika itu memang cukup dan paling jujur.

## Delivery Semantics

Pada webhook dan queue, asumsi penting:

- duplicate delivery bisa terjadi;
- delay bisa terjadi;
- order tidak selalu terjaga;
- temporary failure normal.

Tanpa idempotency dan observability, integrasi seperti ini cepat rapuh.

## Ordering

Pertanyaan penting:

- apakah event harus diproses berurutan?
- atau eventual order cukup?

Untuk beberapa domain:

- payment authorized lalu captured;
- order created lalu canceled;
- shipment created lalu delivered,

urutan sangat penting.

Kalau pola integrasi tidak menjaga atau mengompensasikan ordering, bug domain akan muncul.

## Webhook Security

Webhook bukan hanya soal menerima JSON.
Anda harus memikirkan:

- signature verification;
- replay protection bila perlu;
- source validation;
- timeout dan retry semantics;
- idempotency key atau event id.

Webhook tanpa verifikasi adalah celah keamanan operasional.

## Polling yang Sehat

Kalau polling dipilih:

- interval harus masuk akal;
- gunakan incremental fetch bila bisa;
- hindari full sync terus-menerus;
- pertimbangkan backoff saat error.

Polling buruk cepat berubah jadi self-inflicted load.

## Queue Consumer Discipline

Consumer queue harus siap dengan:

- duplicate message;
- poison message;
- retry limit;
- dead-letter handling;
- idempotency;
- observability.

Queue bukan tempat "masalah nanti".
Ia tempat masalah berubah bentuk.

## Event Contract

Untuk event-driven system, event contract harus jelas:

- event name;
- version;
- payload shape;
- source;
- semantics field penting;
- ordering guarantee kalau ada.

Kalau event contract longgar, consumer akan menebak-nebak.

## Webhook vs Queue

Webhook cocok saat:

- integrasi lintas organisasi;
- producer mendorong notifikasi langsung ke consumer.

Queue cocok saat:

- Anda mengontrol broker/internal platform;
- ingin decouple load dan processing;
- butuh buffering atau async work queue.

## Polling vs Webhook

Polling cocok saat:

- provider tidak mendukung push;
- kebutuhan freshness moderat;
- simplicity lebih penting.

Webhook cocok saat:

- low-latency notification dibutuhkan;
- consumer sanggup menerima push;
- duplicate/retry discipline siap.

## Event-Driven Bukan Solusi Otomatis

Banyak tim terlalu cepat berkata:

- "pakai event-driven biar loosely coupled."

Padahal coupling tetap ada:

- schema event;
- semantics event;
- timing expectation;
- operational dependency.

Coupling tidak hilang.
Ia hanya jadi lebih implisit.

## Observability

Apa pun pola integrasinya, Anda perlu tahu:

- request/event mana yang gagal;
- berapa lama delay sinkronisasi;
- siapa yang retry;
- apakah duplicate terjadi;
- apakah consumer tertinggal.

Kalau tidak, integrasi jadi sulit didiagnosis.

## Anti-Pattern Umum

### 1. Polling Agresif Tanpa Incremental Strategy

Beban tinggi, nilai kecil.

### 2. Webhook Tanpa Idempotency

Duplicate delivery jadi bug bisnis.

### 3. Queue Consumer Tanpa Dead-Letter Strategy

Pesan bermasalah bisa menyumbat sistem.

### 4. Event-Driven Tanpa Contract Governance

Consumer dan producer drift diam-diam.

## Heuristik Senior

1. Pilih pola integrasi dari kebutuhan, bukan tren.
2. Asumsikan duplicate dan delay itu normal pada push/async flow.
3. Polling sederhana bisa valid jika kebutuhan latency tidak ketat.
4. Webhook butuh security dan idempotency.
5. Queue butuh dead-letter, retry policy, dan observability.
6. Event contract harus diperlakukan seketat API contract.
7. Jangan menjual event-driven sebagai solusi bebas biaya.

## Pertanyaan Interview

### Dasar

- Apa beda polling dan webhook?
- Kapan queue lebih tepat?
- Kenapa duplicate delivery harus diasumsikan normal?
- Apa risiko event-driven yang tidak di-govern?

### Menengah

- Bagaimana Anda mengamankan webhook?
- Kapan polling masih merupakan pilihan sehat?
- Apa bedanya queue untuk workload smoothing vs event bus untuk propagation?
- Kenapa ordering penting pada beberapa domain?

### Senior

- Bagaimana Anda memilih pola integrasi untuk partner eksternal vs internal service?
- Bagaimana Anda mendesain webhook consumer yang tahan retry dan duplicate?
- Bagaimana Anda menjaga event-driven flow tetap observable dan debuggable?
- Kapan Anda menolak event-driven dan memilih integrasi yang lebih sederhana?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- partner hanya mendukung polling;
- payment provider mengirim webhook dobel;
- internal queue tertinggal saat traffic spike;
- event consumer memproses status dalam urutan salah;
- tim bingung mengapa async integration sulit di-debug.

## Ringkasan Brutal

- Integrasi bukan soal bisa kirim data, tetapi soal semantics delivery.
- Polling sederhana, webhook push, queue memberi buffering, event-driven memberi propagasi asinkron.
- Masing-masing punya biaya.
- Duplicate, delay, dan ordering harus dipikirkan dari awal.
- Engineer senior memilih pola yang paling jujur terhadap kebutuhan operasional.

## Checklist Pemahaman

- Saya bisa membedakan polling, webhook, queue, dan event-driven flow.
- Saya tahu webhook dan queue butuh idempotency.
- Saya paham polling tidak selalu buruk jika konteksnya tepat.
- Saya sadar event contract perlu governance.
- Saya memikirkan security dan observability sebagai bagian inti integrasi.

## Penutup

Pola integrasi yang sehat adalah yang paling cocok dengan kebutuhan latency, ownership, dan operability.
Bukan yang paling fashionable di diagram arsitektur.
