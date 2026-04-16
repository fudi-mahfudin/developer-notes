# Retry-Safe Integration

## Tujuan

Topik ini penting karena retry sering dianggap solusi universal untuk kegagalan jaringan atau dependency sementara.
Padahal retry yang salah bisa memperparah insiden.

Retry-safe integration berarti merancang integrasi yang tetap benar saat request perlu diulang.

## Kenapa Topik Ini Penting

Tanpa desain retry-safe:

- duplicate effect muncul;
- dependency makin jenuh saat error;
- timeout ambiguity memicu state kacau;
- metrics memburuk karena sistem menyerang dependency yang sudah lemah.

## Model Mental yang Benar

Pegang ini:

1. Retry bukan sekadar loop tambahan.
2. Retry harus dipikirkan bersama idempotency, timeout, dan error classification.
3. Tidak semua error layak di-retry.
4. Retry yang aman bergantung pada semantics operasi, bukan hanya status code.
5. Integrasi yang tidak retry-safe akan pecah saat jaringan tidak sempurna.

## Kapan Retry Masuk Akal

Biasanya untuk:

- network glitch;
- timeout sementara;
- 5xx tertentu;
- transient rate limit dengan guidance jelas;
- deadlock atau transient infra failure tertentu.

## Kapan Retry Berbahaya

Biasanya untuk:

- validation error;
- auth/permission failure;
- not found final;
- operasi non-idempotent tanpa proteksi;
- duplicate effect yang mahal.

## Retry dan Idempotency

Ini pasangan wajib.

Kalau operasi tidak aman diulang:

- retry bisa menciptakan efek ganda.

Kalau operasi aman diulang:

- retry bisa menjadi alat recovery yang sangat bernilai.

Jadi retry-safe integration hampir selalu memaksa Anda membahas idempotency.

## Ambiguous Outcome

Masalah paling penting:

- request timeout;
- tetapi Anda tidak tahu apakah server sudah sempat memproses.

Di sinilah retry menjadi berbahaya tanpa contract yang benar.

Retry-safe design harus memberi jawaban:

- bagaimana caller bisa retry tanpa takut efek ganda?

## Error Classification

Retry policy yang sehat harus memisahkan:

- transient error;
- permanent error;
- business rejection;
- unknown/ambiguous failure.

Kalau semua error diperlakukan sama, retry policy Anda belum matang.

## Backoff dan Jitter

Retry-safe tidak berarti retry secepat mungkin.
Anda perlu:

- backoff;
- jitter;
- retry limit;
- total deadline.

Kalau tidak, retry Anda bisa berubah jadi load amplifier.

## Timeout Budget

Retry juga harus sinkron dengan timeout budget.

Contoh buruk:

- timeout 5 detik;
- retry 3 kali;
- total user SLA 6 detik.

Ini tidak realistis.

Retry-safe berarti total waktu dan jumlah percobaan selaras dengan kebutuhan user/system.

## At-Most-Once vs At-Least-Once Trade-off

Dalam banyak integrasi nyata, Anda harus memilih risiko:

- tidak mengulang dan mungkin kehilangan operasi;
- mengulang dan harus melindungi dari duplikasi.

Retry-safe integration yang matang tidak pura-pura menghindari trade-off ini.
Ia memilih secara sadar.

## Partner API Reality

Saat mengintegrasi third-party:

- kualitas error code bisa buruk;
- timeout bisa ambigu;
- dokumentasi bisa kurang akurat;
- idempotency support bisa terbatas.

Engineer senior tidak menganggap external API selalu rapi.
Ia merancang wrapper defensif di sekitarnya.

## Contract untuk Retry-Safe API

Jika Anda membangun API yang akan dipanggil pihak lain, pikirkan:

- operasi mana aman diulang;
- apakah ada idempotency key;
- error apa yang sebaiknya consumer retry;
- status code dan body apa yang membantu keputusan itu.

Retry-safe behavior harus menjadi bagian dari API contract.

## Side Effect Ordering

Kadang satu operasi memicu:

- simpan record;
- kirim email;
- publish event.

Jika retry terjadi setelah sebagian effect terjadi, apa yang aman?
Tanpa jawaban jelas, integrasi akan rawan side effect ganda atau side effect hilang.

## Webhook dan Retry

Webhook sender hampir selalu melakukan retry.
Berarti webhook consumer harus:

- idempotent;
- tahan duplicate delivery;
- bisa memvalidasi payload;
- tidak men-trigger efek ganda.

Kalau tidak, webhook system akan rusak justru saat jaringan mulai bermasalah.

## Queue Consumer dan Retry

Di queue-based integration:

- retry sering built-in atau di layer consumer;
- poison message harus dipisahkan;
- dead-letter queue mungkin perlu;
- handler harus aman diulang.

Retry-safe integration di queue tidak sama persis dengan HTTP, tetapi prinsip idempotency dan classification tetap berlaku.

## Anti-Pattern Umum

### 1. Retry Semua Error

Ini sering hanya membuat sistem lebih rusak.

### 2. Tidak Ada Idempotency

Retry menciptakan duplicate effect.

### 3. Timeout Pendek + Retry Banyak Tanpa Budget

User tetap gagal, dependency ikut dihajar.

### 4. Mengandalkan Dokumentasi Partner Sepenuhnya

Runtime reality sering lebih jelek dari brochure.

## Heuristik Senior

1. Tentukan apakah operasi aman diulang sebelum menambah retry.
2. Klasifikasikan error dengan disiplin.
3. Sinkronkan retry dengan timeout dan total deadline.
4. Gunakan backoff dan jitter.
5. Dokumentasikan retry-safe semantics pada API yang Anda expose.
6. Lindungi integrasi eksternal dengan wrapper yang jujur terhadap realitas.
7. Amati retry success rate; kalau rendah, retry mungkin hanya noise.

## Pertanyaan Interview

### Dasar

- Kenapa retry bisa berbahaya?
- Kapan retry masuk akal?
- Apa hubungan retry dengan idempotency?
- Kenapa timeout ambiguity penting?

### Menengah

- Bagaimana Anda membedakan transient dan permanent error?
- Kenapa retry perlu backoff dan jitter?
- Apa risiko retry pada operasi side effect?
- Bagaimana Anda membuat webhook consumer retry-safe?

### Senior

- Bagaimana Anda mendesain retry-safe integration untuk payment atau invoicing?
- Bagaimana Anda mengevaluasi apakah retry policy saat ini membantu atau malah memperburuk outage?
- Bagaimana Anda mengelola partner API yang dokumentasinya tidak sepenuhnya bisa dipercaya?
- Bagaimana Anda menjelaskan trade-off retry ke product/business ketika operasi bernilai tinggi tidak boleh dobel?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- provider timeout tapi mungkin sudah proses charge;
- webhook terkirim dua kali;
- queue consumer crash setelah side effect parsial;
- client mobile auto-retry request create.

## Ringkasan Brutal

- Retry bukan fitur kecil; ia keputusan correctness.
- Retry-safe integration mensyaratkan idempotency, error classification, dan timeout discipline.
- Tanpa itu, retry hanya memperbesar chaos.
- Engineer senior tidak bertanya "boleh retry?" saja, tetapi "apa yang terjadi jika retry sukses setelah percobaan pertama sebenarnya sudah sukses diam-diam?"

## Checklist Pemahaman

- Saya tahu tidak semua error layak di-retry.
- Saya paham retry harus dipasangkan dengan idempotency.
- Saya sadar timeout ambiguity adalah kasus paling berbahaya.
- Saya tahu backoff dan deadline harus masuk desain.
- Saya melihat retry policy sebagai bagian dari contract integrasi.

## Penutup

Integrasi yang benar-benar andal bukan integrasi yang tidak pernah gagal.
Ia adalah integrasi yang tetap benar saat kegagalan sementara memaksa percobaan ulang.
