# REST API Design yang Konsisten

## Tujuan

Topik ini penting karena banyak API terlihat "berjalan", tetapi tidak konsisten.
Nama endpoint berubah-ubah.
Response shape tidak stabil.
Error semantics tidak jelas.
Akibatnya integrasi makin mahal dari waktu ke waktu.

## Kenapa Topik Ini Penting

API adalah kontrak.
Kalau kontrak tidak konsisten:

- client logic penuh workaround;
- dokumentasi sulit dipercaya;
- onboarding lambat;
- perubahan kecil memecah banyak consumer;
- observability dan debugging ikut sulit.

## Model Mental yang Benar

Pegang ini:

1. API design adalah interface design.
2. Konsistensi lebih penting daripada kreativitas endpoint.
3. Semantics harus bisa diprediksi lintas resource.
4. Error dan edge case juga bagian dari kontrak.
5. API yang mudah dipakai mengurangi biaya total sistem.

## Resource-Oriented Thinking

REST yang sehat biasanya berpikir dalam resource:

- `users`
- `orders`
- `appointments`
- `invoices`

Bukan aksi acak tanpa struktur.

Tetapi resource-oriented bukan berarti semua hal harus dipaksa ke CRUD polos.
Beberapa domain action tetap perlu diekspresikan jujur.

## Naming

Nama endpoint harus:

- konsisten;
- stabil;
- cukup deskriptif;
- mengikuti bentuk yang sama lintas resource.

Contoh baik:

- `/users`
- `/users/{id}`
- `/orders`
- `/orders/{id}`

Contoh buruk:

- `/getUsers`
- `/user-list`
- `/fetchOrdersNow`

## HTTP Method Semantics

Method harus punya arti jelas:

- `GET` untuk read;
- `POST` untuk create atau action tertentu;
- `PUT` untuk replace/update idempotent tertentu;
- `PATCH` untuk partial update;
- `DELETE` untuk delete semantics tertentu.

Kalau method semantics dipakai sembarangan, API jadi mengejutkan.

## Idempotency dan Method

`GET` semestinya aman.
`PUT` dan `DELETE` sering diharapkan idempotent.
`POST` sering tidak idempotent default, tetapi bisa dibuat idempotent untuk use case tertentu.

Ini bukan detail kecil.
Ia memengaruhi retry behavior.

## Response Shape Consistency

Kalau satu endpoint mengembalikan:

- `data`

dan endpoint lain:

- `result`

dan endpoint lain:

- object langsung tanpa envelope,

maka client cost naik tanpa nilai berarti.

Konsistensi response shape sangat penting.

## Error Shape Consistency

Begitu terjadi error, consumer tetap butuh kontrak jelas.

Minimal pikirkan:

- code;
- message;
- detail field bila validasi;
- correlation/request id bila perlu;

Kalau error shape berubah-ubah, debugging client-server jadi berantakan.

## Status Code Harus Jujur

Contoh buruk:

- semua error `200` dengan `success: false`;
- semua failure jadi `500`;
- validation failure tidak dibedakan dari auth failure.

Status code yang jujur membantu:

- client behavior;
- observability;
- debugging;
- caching semantics;
- retry decision.

## Resource Lifecycle

API design harus mencerminkan lifecycle resource:

- dibuat;
- diperbarui;
- dibatalkan;
- diarsipkan;
- dihapus;
- diproses.

Kalau domain action penting disamarkan secara buruk sebagai field toggle acak, API menjadi tidak jujur.

## Domain Action

Tidak semua hal cocok dipaksa menjadi CRUD polos.
Contoh:

- `cancel`
- `approve`
- `submit`
- `retry`

Kadang action seperti ini lebih jujur diekspos sebagai domain action yang eksplisit daripada update field generik tanpa semantics jelas.

## Consistency Across Collections

Kalau satu list endpoint mendukung:

- filter;
- sort;
- pagination;

sementara list endpoint lain memakai istilah dan format berbeda tanpa alasan, API terasa liar.

Team besar sangat diuntungkan oleh pola konsisten lintas collection endpoint.

## Optional Expansion vs Chatty API

Kadang resource detail butuh field tambahan atau relation tertentu.
Anda perlu memilih:

- endpoint khusus;
- expansion parameter;
- dedicated view model;
- composition di client.

Tujuannya menghindari:

- over-fetching;
- under-fetching;
- endpoint terlalu gemuk.

## Partial Update

Kalau `PATCH` dipakai:

- semantics field opsional harus jelas;
- bedakan field tidak dikirim vs field dikosongkan;
- validation harus stabil.

Kalau ini kabur, bug update parsial akan sering muncul.

## Consistency Over Purity

Kadang teori REST murni tidak sepenting pengalaman consumer yang konsisten.
Engineer senior tahu kapan menjadi pragmatis tanpa merusak kontrak inti.

Tujuannya bukan terlihat "paling RESTful".
Tujuannya membuat API tahan perubahan dan mudah dipakai.

## Anti-Pattern Umum

### 1. RPC Style Campur REST Tanpa Aturan

API jadi sulit diprediksi.

### 2. Error Semantics Berubah-ubah

Client penuh if khusus.

### 3. Response Shape Tidak Konsisten

Integrasi dan type generation jadi mahal.

### 4. Action Domain Disembunyikan Secara Aneh

Intent bisnis jadi kabur.

## Heuristik Senior

1. Optimalkan untuk contract clarity.
2. Jaga naming, error shape, dan list semantics tetap konsisten.
3. Gunakan status code jujur.
4. Jangan takut action endpoint jika domain memang membutuhkannya.
5. Pilih pragmatisme yang menurunkan biaya integrasi, bukan yang menambah kekacauan.
6. Review API sebagai produk untuk consumer.
7. Ingat bahwa edge case adalah bagian dari desain, bukan pengecualian setelahnya.

## Pertanyaan Interview

### Dasar

- Kenapa konsistensi API penting?
- Apa arti resource-oriented API?
- Kenapa status code harus jujur?
- Kapan action domain pantas diekspos?

### Menengah

- Bagaimana Anda menjaga response shape tetap konsisten lintas endpoint?
- Apa risiko mencampur semantics `PATCH` dan `PUT` sembarangan?
- Kapan CRUD murni tidak cukup?
- Kenapa error shape penting untuk consumer?

### Senior

- Bagaimana Anda mendesain guideline API untuk banyak tim agar tidak drift?
- Bagaimana Anda menyeimbangkan REST purity dengan kebutuhan domain nyata?
- Bagaimana Anda mereview API contract agar tidak membebani client dalam jangka panjang?
- Bagaimana Anda menghindari action sprawl tanpa memaksakan semua hal ke CRUD?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- frontend harus menulis banyak special case per endpoint;
- mobile client sulit maintain karena contract tidak seragam;
- observability error API tidak jelas;
- tim backend berbeda menghasilkan gaya response yang saling tabrak.

## Ringkasan Brutal

- API adalah kontrak, bukan sekadar endpoint yang jalan.
- Konsistensi menurunkan biaya integrasi.
- Error semantics sama pentingnya dengan happy path.
- REST yang sehat harus jujur terhadap domain, bukan dogmatis kosong.
- Engineer senior mendesain API agar consumer tidak perlu menebak.

## Checklist Pemahaman

- Saya tahu resource-oriented design bukan sekadar plural noun.
- Saya paham pentingnya response dan error consistency.
- Saya tidak menyalahgunakan status code.
- Saya bisa membedakan kapan CRUD cukup dan kapan domain action lebih jujur.
- Saya melihat API sebagai contract product.

## Penutup

API design yang baik jarang terlihat spektakuler.
Nilainya terasa justru karena consumer tidak perlu terus-menerus melawan kontrak yang aneh.
