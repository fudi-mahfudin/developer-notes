# Interceptor Pattern - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu interceptor pattern
- kapan interceptor berbeda dari middleware
- bagaimana interceptor membungkus call sebelum/sesudah eksekusi
- risiko saat interceptor dipakai untuk logic yang salah tempat

Interceptor pattern
sering muncul di:
- HTTP clients
- frameworks
- RPC stacks
- request/response pipelines

Secara semangat,
ia dekat dengan middleware dan decorator.

Tapi fokus utamanya adalah:
- behavior di sekitar satu invocation

Memahami pola ini penting
karena banyak framework modern
menyediakan hook yang sebenarnya interceptor.

---

## 1. Apa Itu Interceptor?

Interceptor adalah komponen
yang bisa menjalankan logic
sebelum,
sesudah,
atau saat error
dari suatu eksekusi/call.

Biasanya interceptor:
- menerima context/invocation
- bisa meneruskan call
- bisa mengubah request/response tertentu
- bisa menambah behavior tambahan

Ini menjadikannya sangat cocok
untuk cross-cutting concern
di sekitar invocation.

---

## 2. Masalah yang Diselesaikan

Interceptor membantu saat
ingin menambahkan behavior
tanpa menulis ulang
di setiap call site.

Contoh:
- logging request/response
- metrics timing
- auth header injection
- error mapping
- response normalization

Jika concern seperti ini tersebar
di banyak tempat,
konsistensi dan maintainability turun.

---

## 3. Interceptor vs Middleware

Middleware:
- biasanya pipeline berurutan
- sering untuk request flow lengkap

Interceptor:
- lebih fokus membungkus satu invocation
- before/after/around execution

Secara implementasi bisa mirip,
tapi cara berpikirnya berbeda:
- middleware = chain flow
- interceptor = around call

Ini penting untuk menilai
di mana suatu concern paling pas ditempatkan.

---

## 4. Interceptor vs Decorator

Decorator membungkus satu komponen
dengan kontrak yang sama.

Interceptor sering lebih generik:
- hook ke invocation pipeline framework/client
- tidak selalu berupa object wrapping manual

Decorator dan interceptor bisa terasa mirip,
tapi interceptor sering lebih cocok
di framework/runtime pipeline.

Decorator lebih cocok
sebagai pattern object composition.

---

## 5. Kapan Interceptor Cocok?

Biasanya cocok untuk:
- client request instrumentation
- auth token injection
- response/error transformation
- tracing span around call
- timing and latency measurement

Kalau concern-nya:
- selalu ingin berada di sekitar eksekusi
- reusable lintas banyak call

interceptor sangat masuk akal.

---

## 6. Kapan Tidak Cocok?

Tidak cocok untuk:
- business logic inti domain
- branching workflow utama
- decision domain yang harus eksplisit

Kalau aturan bisnis penting
disembunyikan di interceptor,
alur sistem jadi sulit dipahami.

Interceptor seharusnya melayani invocation boundary,
bukan menampung domain logic utama.

---

## 7. Request and Response Mutation

Interceptor sering bisa:
- menambah header
- menambah metadata
- mengubah format response
- memetakan error

Ini powerful.

Tapi mutation yang terlalu banyak
bisa membuat pemanggil bingung:
- request asli sebenarnya apa?
- response berubah di mana?

Semakin besar mutasi,
semakin penting transparansi dan dokumentasi.

---

## 8. Ordering Matters

Jika ada banyak interceptor,
urutannya memengaruhi perilaku:
- auth dulu atau tracing dulu?
- retry di luar metrics atau sebaliknya?
- error mapping sebelum logging atau sesudah?

Urutan yang salah
bisa membuat observability bohong
atau behavior retry aneh.

Interceptor pattern bukan kumpulan plugin random.
Ia butuh urutan semantik.

---

## 9. Error Handling

Interceptor sangat cocok
untuk menangani error lintas banyak call:
- map vendor error ke domain error
- enrich log context
- attach trace info

Tapi jangan sampai
interceptor menyembunyikan error penting
dengan cara yang tidak eksplisit.

Error translation bagus.
Error distortion berbahaya.

---

## 10. Healthcare Example

Misal client ke vendor lab eksternal:
- request perlu auth token
- latency perlu dimetric
- error code vendor perlu dinormalisasi

Interceptor chain pada client
bisa menangani itu semua
tanpa membuat setiap call site
menulis boilerplate berulang.

Ini contoh pattern yang sangat cocok.

---

## 11. Framework Dependency

Banyak framework
punya konsep interceptor bawaan.

Itu berguna,
tapi juga berisiko:
- behavior penting tersembunyi di layer framework
- developer baru sulit menelusuri flow

Kalau tim pakai interceptor banyak,
documentasikan:
- di mana mereka aktif
- urutannya
- efeknya

Jangan serahkan semuanya ke magic framework.

---

## 12. Anti-Pattern Umum

1. Menaruh business logic inti di interceptor.
2. Terlalu banyak interceptor dengan urutan tidak jelas.
3. Request/response dimodifikasi besar-besaran tanpa transparansi.
4. Error ditelan atau diubah berlebihan.
5. Mengira interceptor dan middleware/decorator selalu setara tanpa melihat konteks.

---

## 13. Best Practices

- gunakan interceptor untuk concern around-invocation yang reusable.
- jaga business logic tetap eksplisit di layer domain/use case.
- tentukan ordering interceptor dengan sadar.
- dokumentasikan mutation dan error translation yang dilakukan.
- hindari framework magic yang tak terlihat oleh tim.

---

## 14. Pertanyaan Desain Penting

Sebelum menambah interceptor, tanya:
1. Concern ini benar-benar cross-cutting around-call tidak?
2. Apakah ini lebih cocok sebagai middleware atau decorator?
3. Apa yang diubah pada request/response/error?
4. Interceptor ini harus berada di urutan ke berapa?
5. Apakah perilakunya akan mudah dilacak oleh tim?

---

## 15. Mini Latihan

Latihan:
1. Identifikasi satu client/service call yang penuh boilerplate around-call.
2. Desain interceptor untuk logging/metrics/error mapping.
3. Tentukan urutan beberapa interceptor dan alasannya.
4. Cari contoh interceptor yang sekarang menyimpan business logic tak semestinya.
5. Dokumentasikan satu pipeline interceptor yang ada di sistem.

---

## 16. Checklist Kelulusan Topik Interceptor Pattern

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan interceptor sebagai around-invocation pattern,
- membedakannya dari middleware dan decorator,
- memakai interceptor untuk cross-cutting concern yang tepat,
- mengelola ordering dan error translation dengan jelas,
- mencegah business logic tersembunyi masuk ke layer interception.

---

## 17. Ringkasan Brutal

- Interceptor bagus saat ia mengurangi boilerplate around-call.
- Interceptor jelek saat ia membuat behavior penting menghilang ke balik framework magic.
- Kalau timmu tidak tahu apa yang terjadi sebelum dan sesudah sebuah call,
  interceptor-mu sudah terlalu gelap.
