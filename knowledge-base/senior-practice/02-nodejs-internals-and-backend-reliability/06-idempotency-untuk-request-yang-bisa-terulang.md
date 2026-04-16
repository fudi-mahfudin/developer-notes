# Idempotency untuk Request yang Bisa Terulang

## Tujuan

Topik ini wajib dikuasai kalau Anda ingin membangun backend yang tahan terhadap retry, timeout, duplicate submission, dan kegagalan jaringan yang ambigu.
Banyak engineer tahu istilah idempotency, tetapi belum benar-benar paham kapan ia wajib, kapan ia opsional, dan bagaimana implementasinya bisa salah.

Kalau pemahaman idempotency Anda lemah, gejala yang sering muncul:

- order dobel;
- payment ter-charge dua kali;
- webhook diproses berulang;
- retry yang seharusnya menolong justru merusak data;
- incident sulit dianalisis karena sistem tidak bisa membedakan request baru dengan request ulang.

## Kenapa Topik Ini Penting

Dalam sistem nyata, request bisa terulang karena banyak hal:

- user menekan tombol dua kali;
- mobile network putus lalu client retry;
- gateway timeout padahal server sebenarnya masih memproses;
- load balancer retry;
- worker queue mengirim ulang message;
- webhook provider mengirim event yang sama lebih dari sekali.

Kalau service Anda tidak dirancang untuk kondisi itu, integritas data akan rapuh.

## Definisi Singkat

Idempotency berarti melakukan operasi yang sama berkali-kali dengan input identik menghasilkan efek akhir yang setara dengan satu kali eksekusi.

Penting:
ini bukan berarti response selalu identik byte-per-byte.
Fokus utamanya adalah efek samping dan state akhir.

## Model Mental yang Benar

Pegang lima poin ini:

1. Idempotency bukan sekadar fitur HTTP method.
2. Idempotency penting saat client atau sistem lain mungkin mengulang request.
3. Retry aman membutuhkan operasi yang idempotent atau proteksi setara.
4. Idempotency harus dipikirkan di level business effect, bukan hanya di controller.
5. Implementasi yang setengah matang bisa memberi rasa aman palsu.

## Idempotency vs Safe Operation

Ini dua konsep berbeda.

- `safe` berarti operasi tidak mengubah state;
- `idempotent` berarti perubahan berulang tidak mengubah hasil akhir lebih jauh.

Contoh:

- `GET` idealnya safe dan idempotent;
- `PUT` biasanya idempotent tetapi tidak safe;
- `POST` sering tidak idempotent secara default, tetapi bisa dibuat idempotent.

Kalau dua istilah ini dicampur, diskusi cepat kabur.

## Kenapa `POST` Sering Bermasalah

`POST` sering dipakai untuk:

- create order;
- charge payment;
- kirim email;
- trigger side effect;
- enqueue job.

Kalau request ini terulang tanpa proteksi:

- record bisa dobel;
- side effect bisa berulang;
- sistem hilang jejak mana intent awal dan mana duplicate.

Karena itu `POST` ke operasi sensitif sering butuh idempotency key.

## Duplicate Request Itu Normal, Bukan Edge Case

Banyak team memperlakukan duplicate request sebagai bug klien.
Itu pola pikir lemah.

Di dunia nyata, duplicate request adalah kondisi normal akibat jaringan dan distribusi sistem.
Sistem backend yang matang harus mengantisipasi ini, bukan sekadar menyalahkan caller.

## Idempotency di Level Business

Pertanyaan yang benar bukan:

- "endpoint ini pakai `POST` atau `PUT`?"

Pertanyaan yang lebih benar:

- "apakah user intent yang sama bisa tiba lebih dari sekali?"
- "kalau iya, apa efek yang boleh terjadi?"
- "bagaimana membedakan request baru dan request ulang?"

Contoh:

- create invoice sekali;
- retry request invoice yang sama seharusnya tidak membuat invoice kedua;
- tetapi create invoice untuk transaksi lain tetap harus menghasilkan entitas baru.

## Idempotency Key

Pola umum untuk operasi create atau action sensitif adalah idempotency key.

Client mengirim key unik yang mewakili satu intent bisnis.
Server menyimpan hasil pemrosesan untuk key itu.
Kalau request identik datang lagi dengan key sama:

- server tidak mengeksekusi efek samping baru;
- server mengembalikan hasil yang sama atau hasil yang setara.

## Apa yang Disimpan

Implementasi idempotency key bisa menyimpan:

- status request;
- fingerprint payload;
- response yang sudah dikirim;
- reference ke resource yang dibuat;
- timestamp dan TTL.

Yang penting adalah ada cara membedakan:

- request yang sama diulang;
- request beda tetapi salah memakai key yang sama.

## Payload Fingerprinting

Ini sangat penting.
Kalau key sama tetapi payload berbeda, itu bukan retry valid.
Itu conflict.

Jadi implementasi sehat biasanya memeriksa:

- key;
- identity caller bila relevan;
- payload hash atau canonical fingerprint.

Kalau hanya melihat key tanpa validasi payload, Anda bisa mengasosiasikan request yang salah ke hasil lama.

## Idempotency Store

Data idempotency biasanya disimpan di storage yang cukup andal:

- database;
- Redis;
- dedicated durable store;
- table khusus dengan unique constraint.

Pilihan tergantung:

- kebutuhan durability;
- latency;
- volume;
- konsistensi yang dibutuhkan.

## TTL dan Window

Idempotency tidak selalu perlu disimpan selamanya.
Sering kali ada window tertentu:

- beberapa menit;
- beberapa jam;
- beberapa hari, tergantung bisnis.

Pertanyaannya:

- berapa lama duplicate request realistis terjadi?
- apa risiko menyimpan terlalu singkat?
- apa biaya menyimpan terlalu lama?

Kalau TTL terlalu pendek, retry lambat bisa lolos menjadi duplikasi nyata.

## Unique Constraint sebagai Proteksi

Kadang idempotency bisa dibantu atau bahkan dijamin oleh constraint database.

Contoh:

- `order_id` unik;
- `external_reference` unik;
- `payment_provider_reference` unik.

Ini sangat kuat karena efek akhirnya dijaga di level persistence.
Tetapi constraint saja belum selalu cukup untuk memberi response semantics yang bagus.

## Idempotency vs Deduplication

Mirip tetapi tidak identik.

- idempotency fokus pada efek ulang dari intent yang sama;
- deduplication fokus mencegah pemrosesan item duplikat.

Dalam praktik, keduanya sering bertemu di webhook, queue, atau event processing.
Tetapi jangan sembarang menukar istilah.

## Webhook dan Event Consumer

Provider eksternal sering mengirim webhook lebih dari sekali.
Queue consumer juga bisa memproses message ulang pada failure tertentu.

Kalau consumer Anda tidak idempotent:

- state bisa melompat dua kali;
- saldo bisa berubah ganda;
- email/notifikasi dobel;
- workflow meleset.

Pada event-driven system, idempotency bukan nice-to-have.
Sering kali ini baseline.

## Create vs Update

Operasi update tertentu bisa lebih mudah dibuat idempotent.

Contoh:

- set status menjadi `paid`;
- set shipping address ke nilai tertentu;
- upsert data berdasarkan key unik.

Operasi increment lebih berbahaya:

- `balance += 100`;
- `stock -= 1`;
- `send notification`.

Operasi semacam ini tidak idempotent secara natural.
Kalau perlu retry, Anda harus mendesain proteksinya.

## Contoh Klasik Payment

Bayangkan alurnya:

1. client kirim request charge;
2. server memanggil payment provider;
3. koneksi putus sebelum client dapat response;
4. client retry.

Tanpa idempotency:

- charge pertama mungkin sebenarnya sukses;
- retry menciptakan charge kedua;
- user tertagih dua kali.

Ini bukan bug langka.
Ini salah satu failure mode paling realistis dalam sistem pembayaran.

## Ambiguous Failure

Inilah alasan utama idempotency penting.

Kadang caller tidak tahu:

- request gagal sebelum diproses;
- request sedang diproses;
- request sukses tetapi response hilang.

Tanpa idempotency, retry pada kondisi ambigu berbahaya.
Dengan idempotency, retry bisa dijadikan mekanisme recovery yang aman.

## Idempotency dan Transaction Boundary

Implementasi yang sehat harus mempertimbangkan transaction boundary.

Kalau Anda:

- simpan idempotency key;
- lalu gagal sebelum efek bisnis selesai;

apa yang akan terjadi saat retry?

Anda harus menentukan status seperti:

- pending;
- completed;
- failed retryable;
- failed terminal.

Kalau state machine idempotency tidak jelas, retry bisa macet atau salah hasil.

## Race Condition pada Idempotency

Duplicate request bisa datang hampir bersamaan.

Kalau dua request dengan key sama masuk paralel:

- keduanya bisa lolos pengecekan awal;
- keduanya memproses side effect;
- baru salah satunya kalah belakangan.

Jadi idempotency tidak cukup dengan "cek lalu insert" naif.
Anda butuh atomicity:

- unique constraint;
- lock;
- transaction;
- compare-and-set.

## Response Semantics

Saat duplicate request terdeteksi, apa yang harus dikembalikan?

Pilihan umum:

- response sukses yang sama seperti pertama;
- reference ke resource yang sudah dibuat;
- status in-progress bila request pertama belum selesai;
- conflict bila payload berbeda untuk key yang sama.

Yang penting adalah contract-nya jelas dan konsisten.

## Idempotency Key Scope

Key sebaiknya punya scope yang jelas.
Biasanya terkait dengan:

- satu user;
- satu tenant;
- satu merchant;
- satu endpoint atau operation type.

Kalau scope tidak jelas, risiko collision atau reuse salah meningkat.

## Jangan Menyimpan Key Tanpa Boundary

Masalah praktis:

- storage tumbuh tak terkendali;
- cleanup tidak ada;
- key reuse lintas operasi menyebabkan behavior aneh;
- data sensitif ikut tersimpan.

Karena itu desain store harus matang:

- TTL;
- indeks yang tepat;
- payload hash;
- minimal metadata yang cukup.

## Idempotency pada Queue Consumer

Queue biasanya memberi at-least-once delivery.
Artinya duplicate processing bukan kemungkinan kecil, tetapi bagian dari kontrak.

Consumer harus siap:

- cek apakah message/event sudah diproses;
- pastikan update state bisa diulang dengan aman;
- atau simpan processed event id.

Kalau tidak, restart consumer atau redelivery akan menyebabkan efek samping ganda.

## Idempotency Bukan Pengganti Good UX Saja

Kadang orang mengira idempotency hanya untuk tombol submit dobel.
Itu terlalu sempit.

Idempotency adalah fondasi reliability untuk:

- retry-safe API;
- payment flow;
- event processing;
- webhook consumption;
- distributed workflow.

## Kapan Tidak Perlu Overengineering

Tidak semua endpoint perlu idempotency key.

Kalau operasi:

- benar-benar read-only;
- side effect-nya tidak sensitif;
- duplicate effect dapat diterima;
- atau sudah dilindungi kontrak lain yang lebih sederhana,

mungkin Anda tidak perlu lapisan tambahan.

Tetapi jangan pakai alasan ini untuk operasi yang jelas berisiko tinggi.

## Heuristik Senior

1. Anggap duplicate request sebagai realitas sistem, bukan edge case.
2. Prioritaskan idempotency pada operasi create atau side effect sensitif.
3. Validasi key bersama scope caller dan payload fingerprint.
4. Pastikan duplicate parallel request tidak lolos race condition.
5. Gunakan unique constraint atau atomic store bila memungkinkan.
6. Bedakan duplicate valid dari misuse key dengan payload berbeda.
7. Jangan lupa lifecycle data idempotency: TTL, cleanup, observability.

## Pertanyaan Interview

### Dasar

- Apa itu idempotency?
- Kenapa retry aman membutuhkan idempotency?
- Apa beda safe dan idempotent?
- Kapan endpoint `POST` butuh idempotency key?

### Menengah

- Bagaimana Anda mendesain idempotency key store?
- Kenapa payload fingerprint penting?
- Apa yang terjadi jika dua request dengan key sama masuk bersamaan?
- Kapan unique constraint database membantu?

### Senior

- Bagaimana Anda menangani ambiguous failure pada payment flow?
- Bagaimana Anda mendesain status lifecycle untuk idempotent request yang in-progress?
- Apa trade-off antara Redis-based idempotency store dan database transaction-based approach?
- Bagaimana Anda menerapkan idempotency pada webhook consumer atau queue worker?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- payment gateway timeout;
- form checkout di-submit dua kali;
- webhook invoice dikirim ulang;
- worker queue restart lalu memproses ulang message;
- API client auto-retry setelah jaringan mobile putus;
- external provider tidak jelas apakah permintaan sebelumnya sukses atau tidak.

## Ringkasan Brutal

- Duplicate request itu normal.
- Retry tanpa idempotency adalah perjudian.
- Idempotency harus dijaga di level efek bisnis, bukan sekadar route handler.
- Key tanpa payload fingerprint bisa menipu.
- Race condition pada duplicate request bisa membunuh implementasi naif.

Kalau Anda belum bisa menjelaskan bagaimana membuat operasi create tetap aman saat request terulang, berarti reliability thinking Anda belum cukup senior.

## Checklist Pemahaman

- Saya tahu kapan idempotency benar-benar penting.
- Saya bisa membedakan safe, idempotent, dan duplicate processing.
- Saya tahu idempotency key perlu scope dan payload validation.
- Saya sadar duplicate request paralel butuh atomic protection.
- Saya paham queue consumer dan webhook juga butuh idempotency.
- Saya mengerti TTL dan cleanup pada idempotency store.

## Penutup

Idempotency adalah salah satu fondasi backend yang tahan terhadap dunia nyata.
Dunia nyata penuh retry, packet loss, timeout ambigu, dan duplicate delivery.

Engineer senior tidak berharap dunia itu bersih.
Ia mendesain sistem yang tetap benar walaupun permintaan yang sama datang lagi.
