# Factory - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu factory pattern
- kenapa object creation kadang perlu dipisah
- kapan factory berguna
- kapan factory justru over-engineering
- bentuk factory yang sehat di JavaScript/TypeScript

Factory adalah pattern klasik
yang sering diajarkan terlalu formal.

Akibatnya ada dua ekstrem:
- orang tidak pernah memakainya saat perlu
- atau orang membuat `SomethingFactoryFactory`
  untuk kasus yang sangat sederhana

Factory yang sehat
adalah alat untuk mengelola kompleksitas pembuatan objek,
bukan ritual OOP.

---

## 1. Apa Itu Factory?

Factory adalah abstraction
untuk membuat objek atau instance.

Idenya sederhana:
- logika pembuatan dipisahkan
  dari tempat objek dipakai

Ini berguna saat proses create
tidak lagi sesederhana:
- `new Something()`

Kalau pembuatan butuh branching,
dependency,
config,
atau variasi tipe,
factory mulai relevan.

---

## 2. Kenapa Memisahkan Creation Logic?

Karena object creation
kadang membawa complexity:
- memilih implementasi berbeda
- inject dependency
- set default config
- validasi input
- normalisasi options

Kalau semua logic create tersebar
di banyak tempat,
maintenance jadi buruk.

Factory membantu
memusatkan keputusan penciptaan itu.

---

## 3. Factory Bukan Harus Class

Di JavaScript/TypeScript,
factory tidak harus class khusus.

Sering cukup berupa:
- fungsi `createX()`
- map creator
- module builder function

Ini penting.

Banyak orang terjebak
bahwa pattern hanya sah
jika dibungkus class dan interface berat.

Tidak.

Yang penting adalah tanggung jawab creation,
bukan bentuk sintaksisnya.

---

## 4. Kapan Factory Berguna?

Biasanya berguna saat:
- ada beberapa implementasi berbeda
- init object butuh config kompleks
- pemilihan tipe bergantung input/runtime
- instantiation perlu distandardisasi

Contoh:
- payment provider client
- notification sender
- parser berdasarkan format
- repository/service adapter per environment

Jika create logic mulai bercabang,
factory sering membantu.

---

## 5. Kapan Factory Tidak Perlu?

Kalau object creation
masih sangat sederhana,
factory bisa jadi noise.

Contoh:
- satu instance kecil
- tanpa variasi
- tanpa branching
- tanpa init logic khusus

Maka `new X()` atau literal function call
sering lebih jujur.

Jangan bikin factory
hanya karena ingin terlihat pattern-savvy.

---

## 6. Encapsulating Variants

Salah satu kekuatan utama factory:
- menyembunyikan pemilihan variant

Contoh:
- `createStorageClient(env)`
  memilih local, s3, atau mock

Consumer tidak perlu tahu
semua detail branching itu.

Ini membantu menurunkan coupling
ke logika selection yang berubah-ubah.

---

## 7. Factory dan Dependency Injection

Factory sering bekerja baik
dengan dependency injection.

Contoh:
- factory menerima config + dependency
- lalu mengembalikan instance siap pakai

Di Node.js/TypeScript,
pattern ini sangat umum dan sehat.

Factory bisa menjadi jembatan
antara wiring aplikasi
dan pemakaian objek di domain/service layer.

---

## 8. Centralized Defaults

Factory juga berguna
untuk menstandarkan default.

Contoh:
- timeout default
- retry policy default
- logger attachment
- validation mode

Kalau default ini tersebar
di banyak tempat pemanggilan,
sistem akan inkonsisten.

Factory memberi satu titik kendali.

---

## 9. Testability Benefit

Factory bisa membantu testing
jika ia membuat wiring instance
lebih mudah dikontrol.

Contoh:
- `createService({ clock, logger, repo })`

Pada test,
dependency bisa diganti lebih mudah.

Namun hati-hati:
- factory tidak otomatis membuat design testable
- kalau factory terlalu cerdas,
  test bisa justru makin membingungkan

---

## 10. Healthcare Example

Misal sistem notifikasi healthcare
punya beberapa channel:
- email
- SMS
- WhatsApp

Factory bisa:
- menerima channel type + config
- mengembalikan sender yang sesuai

Consumer cukup memanggil:
- `createNotificationSender(channel, config)`

Tanpa harus menyebar switch-case
di banyak titik codebase.

---

## 11. Anti-Pattern: Giant Switch Factory

Factory yang jelek sering berubah jadi:
- switch-case besar
- tahu semua hal
- sulit diperluas
- tidak punya boundary jelas

Jika factory menjadi god module,
pattern ini kehilangan elegansinya.

Factory harus memusatkan creation,
bukan menyerap seluruh arsitektur.

---

## 12. Factory vs Builder

Factory:
- fokus pada proses memilih atau membuat objek

Builder:
- fokus pada penyusunan bertahap
  untuk objek kompleks

Kalau pembuatan cukup sekali jalan
dengan input jelas,
factory mungkin cukup.

Kalau objek dibentuk langkah demi langkah,
builder mungkin lebih cocok.

Jangan campur istilah seenaknya.

---

## 13. Functional Factory in JavaScript

Di JavaScript,
factory function sering natural:
- menerima options/deps
- return object dengan method tertentu

Ini sering lebih ringan
daripada class-heavy design.

Pattern factory tetap sah
meski bentuknya fungsional.

Inilah pentingnya memahami pattern,
bukan menghafal bentuk OOP textbook.

---

## 14. Anti-Pattern Umum

1. Membuat factory untuk objek yang sangat sederhana.
2. Factory jadi god switch untuk semua kemungkinan.
3. Menyamakan factory dengan "harus class".
4. Creation logic masih tersebar walau factory sudah ada.
5. Factory dibuat hanya demi mengikuti pola, bukan problem nyata.

---

## 15. Best Practices

- gunakan factory saat creation logic punya variasi atau kompleksitas nyata.
- biarkan bentuknya sesederhana mungkin, sering kali fungsi sudah cukup.
- pusatkan default dan variant selection yang benar-benar perlu dipusatkan.
- jaga factory tetap fokus pada creation, bukan seluruh workflow.
- hindari abstraction prematur untuk kasus trivial.

---

## 16. Pertanyaan Desain Penting

Sebelum membuat factory, tanya:
1. Apa kompleksitas creation yang ingin disembunyikan?
2. Apakah ada beberapa variant nyata?
3. Apakah default/config perlu distandardisasi?
4. Apakah factory akan mengurangi coupling atau hanya menambah file?
5. Apakah fungsi sederhana sudah cukup?

---

## 17. Mini Latihan

Latihan:
1. Cari satu area codebase dengan instantiation branch berulang.
2. Refactor menjadi factory function sederhana.
3. Pisahkan default config ke satu titik create.
4. Bandingkan sebelum/sesudah dari sisi readability.
5. Identifikasi satu factory berlebihan yang bisa disederhanakan.

---

## 18. Checklist Kelulusan Topik Factory

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan factory sebagai abstraction creation, bukan ritual class,
- mengenali kapan creation logic layak dipusatkan,
- membedakan factory dari builder secara praktis,
- membuat factory sederhana yang benar-benar mengurangi coupling,
- menghindari over-engineering pada kasus trivial.

---

## 19. Ringkasan Brutal

- Factory itu berguna saat creation mulai ribet.
- Factory itu bodoh saat dipakai untuk membungkus `new` yang tidak punya masalah.
- Pattern yang baik menyelesaikan complexity.
- Pattern yang jelek hanya memindahkan baris kode.
