# Idempotency Key

## Tujuan

Topik ini penting karena banyak integrasi create/action sensitif tidak aman terhadap retry.
Saat jaringan ambigu atau client mengulang request, sistem menghasilkan efek ganda.

Idempotency key adalah salah satu alat paling praktis untuk mencegah itu.

## Kenapa Topik Ini Penting

Tanpa idempotency key pada operasi yang tepat:

- payment bisa dobel;
- order bisa terbuat dua kali;
- invoice eksternal bisa terbit ganda;
- webhook response handling bisa memicu side effect berulang.

## Model Mental yang Benar

Pegang ini:

1. Idempotency key dipakai untuk mewakili satu intent yang boleh diulang aman.
2. Key bukan sekadar random string; ia bagian dari contract API.
3. Server harus menyimpan hasil atau status untuk key itu.
4. Payload mismatch pada key yang sama harus dianggap masalah.
5. Idempotency key paling bernilai pada operasi create atau side effect sensitif.

## Kapan Idempotency Key Dibutuhkan

Biasanya saat:

- `POST` create resource penting;
- trigger payment;
- create invoice;
- enqueue external effect sensitif;
- partner/client punya retry otomatis.

## Kenapa Retry Membuat Ini Wajib

Failure ambigu sangat umum:

- request timeout;
- response hilang;
- client tidak tahu server sudah sempat proses atau belum.

Jika client retry tanpa proteksi, efek bisnis bisa ganda.

## Cara Kerja Inti

Alur sederhananya:

1. client kirim `Idempotency-Key`;
2. server cek apakah key ini pernah dipakai untuk intent yang sama;
3. kalau belum, proses dan simpan hasil/status;
4. kalau sudah, kembalikan hasil sebelumnya atau status yang setara.

## Payload Binding

Key saja tidak cukup.
Server juga perlu memastikan request yang datang dengan key sama memang intent yang sama.

Kalau key sama tetapi payload berbeda:

- itu bukan retry valid;
- itu conflict.

## Status yang Perlu Disimpan

Implementasi biasanya menyimpan:

- key;
- actor/scope;
- payload hash;
- status processing;
- response/result reference;
- timestamp/TTL.

Ini membuat replay aman dan terkontrol.

## Scope Key

Idempotency key harus punya scope yang masuk akal:

- per user;
- per tenant;
- per merchant;
- per operation.

Kalau scope tak jelas, collision bisa menimbulkan bug aneh.

## In-Progress Request

Kasus sulit:

- request pertama masih diproses;
- request kedua dengan key sama datang sebelum selesai.

Server harus memutuskan:

- tunggu;
- kembalikan status in-progress;
- lock dan cegah paralel processing.

Kalau ini tidak ditangani, duplicate in-flight bisa lolos.

## Storage Choice

Idempotency record bisa disimpan di:

- database;
- Redis;
- dedicated durable store.

Pilihannya tergantung:

- durability;
- latency;
- kebutuhan TTL;
- kemudahan atomicity.

## Atomicity Penting

Pattern naif:

- cek key;
- kalau belum ada, proses;
- lalu simpan.

Ini rawan race.

Yang dibutuhkan adalah operasi yang cukup atomic agar dua request bersamaan tidak lolos bersama.

## TTL

Idempotency key jarang perlu hidup selamanya.
Tetapi terlalu cepat menghapus juga berbahaya.

Pertanyaan:

- berapa lama retry realistis bisa datang?
- apa biaya menyimpan terlalu lama?
- apa risiko key reuse terlalu cepat?

## API Contract

Kalau API mendukung idempotency key, dokumentasi harus jelas:

- header atau field mana dipakai;
- endpoint mana yang mendukung;
- behavior duplicate bagaimana;
- behavior payload mismatch bagaimana;
- TTL expectation bila relevan.

Kalau tidak, consumer akan menggunakan secara keliru.

## Response Semantics

Duplicate request dengan key sama bisa:

- mengembalikan response yang sama;
- mengembalikan resource reference yang sama;
- mengembalikan status processing yang sama.

Yang penting: konsisten.

## Anti-Pattern Umum

### 1. Key Sama, Payload Berbeda, Tetap Diterima

Ini menyalahi konsep intent.

### 2. Tidak Ada Atomic Guard

Duplicate paralel tetap menciptakan efek ganda.

### 3. TTL Terlalu Pendek

Retry lambat bisa lolos sebagai request baru.

### 4. Menganggap `PUT` dan `POST` Semua Aman Tanpa Strategi Nyata

Semantics HTTP saja tidak cukup.

## Heuristik Senior

1. Terapkan idempotency key pada create/action sensitif.
2. Simpan payload hash atau binding intent.
3. Tangani duplicate in-flight dengan eksplisit.
4. Pastikan penyimpanan cukup atomic.
5. Tentukan TTL berdasarkan realitas retry.
6. Dokumentasikan contract dengan jelas.
7. Jangan gunakan idempotency key sebagai hiasan tanpa semantics server yang benar.

## Pertanyaan Interview

### Dasar

- Apa itu idempotency key?
- Kenapa ia penting untuk `POST` tertentu?
- Kenapa timeout ambigu membuat retry berbahaya?
- Apa risiko key reuse tanpa payload validation?

### Menengah

- Bagaimana menangani request paralel dengan key sama?
- Apa data minimum yang perlu disimpan?
- Kapan Redis cukup dan kapan perlu DB lebih kuat?
- Bagaimana menentukan TTL?

### Senior

- Bagaimana Anda mendesain idempotency key contract untuk payment API?
- Bagaimana Anda menjelaskan conflict antara duplicate valid dan misuse key?
- Bagaimana Anda menjaga atomicity pada high-concurrency create endpoint?
- Bagaimana Anda mengintegrasikan idempotency dengan retry policy dan observability?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- checkout timeout dan user klik lagi;
- mobile app retry request setelah jaringan putus;
- partner integrasi punya retry otomatis;
- service create invoice harus tahan duplicate call.

## Ringkasan Brutal

- Idempotency key adalah alat membuat retry aman pada operasi sensitif.
- Key tanpa intent binding dan atomicity adalah rasa aman palsu.
- Duplicate request itu normal, bukan edge case.
- Engineer senior mendesain create flow agar ambiguity jaringan tidak berubah menjadi efek bisnis ganda.

## Checklist Pemahaman

- Saya tahu kapan idempotency key benar-benar perlu.
- Saya paham payload mismatch harus ditangani.
- Saya sadar duplicate in-flight butuh solusi khusus.
- Saya tahu TTL dan storage choice adalah bagian desain.
- Saya melihat idempotency key sebagai contract, bukan header kosmetik.

## Penutup

Begitu sebuah API bisa menimbulkan efek bisnis yang mahal, idempotency key sering berubah dari nice-to-have menjadi kewajiban.
