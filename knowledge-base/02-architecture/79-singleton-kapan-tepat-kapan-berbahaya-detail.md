# Singleton: Kapan Tepat, Kapan Berbahaya - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu singleton
- kapan singleton masuk akal
- kapan singleton berbahaya
- bagaimana membedakan shared instance sehat dari global state beracun

Singleton adalah pattern
yang punya reputasi buruk,
dan sering memang pantas dicurigai.

Masalahnya bukan karena
"singleton selalu salah".

Masalahnya karena
banyak orang memakai singleton
sebagai jalan pintas
untuk global state dan dependency tersembunyi.

Padahal ada kasus tertentu
di mana satu instance bersama
memang masuk akal.

Kuncinya adalah:
- apakah ini shared resource sehat
  atau
- hanya global mutable chaos?

---

## 1. Apa Itu Singleton?

Singleton adalah pola
di mana hanya ada satu instance
dari suatu komponen
dalam satu scope aplikasi/runtime tertentu.

Contoh klasik:
- config registry tertentu
- process-wide logger tertentu
- connection pool manager tertentu

Idenya:
- satu instance bersama
- akses konsisten

Tapi implementasi nyata
sering salah arah
jika instancenya diperlakukan seperti global tempat sampah.

---

## 2. Kenapa Orang Suka Singleton?

Karena terasa mudah:
- tidak perlu inject
- tinggal import/akses
- semua tempat dapat instance sama

Inilah jebakannya.

Kemudahan awal
sering dibayar dengan:
- hidden dependency
- testability buruk
- state sulit dikontrol
- coupling tinggi

Singleton memotong wiring,
tapi sering memindahkan complexity
ke tempat yang lebih berbahaya.

---

## 3. Shared Resource vs Global State

Ini perbedaan paling penting.

Shared resource sehat:
- logger stateless-ish
- connection pool manager
- immutable config snapshot

Global state berbahaya:
- mutable flags acak
- cache bisnis tanpa boundary
- auth/user context global
- runtime bag of mutable data

Yang pertama kadang masuk akal.
Yang kedua sering racun arsitektur.

---

## 4. Kapan Singleton Bisa Masuk Akal?

Biasanya masuk akal jika:
- resource secara alami process-wide
- satu instance memang cukup
- state internalnya terkendali
- lifecycle jelas

Contoh:
- logger backend
- metrics client
- configuration object immutable

Di sini singleton bisa pragmatis,
selama tidak mengaburkan dependency penting.

---

## 5. Kapan Singleton Berbahaya?

Berbahaya saat:
- menyimpan mutable business state
- menjadi service locator terselubung
- membuat order initialization rumit
- menyulitkan test isolation
- menciptakan hidden coupling lintas modul

Jika banyak bagian sistem
diam-diam menulis/membaca hal yang sama
lewat singleton,
debugging cepat menjadi menyiksa.

---

## 6. Testability Problem

Singleton sering buruk untuk test
karena:
- state bisa bocor antar test
- reset sulit
- mocking sulit
- order test memengaruhi hasil

Kalau satu singleton mutable
bertahan lintas banyak test,
determinism mudah rusak.

Ini alasan besar
kenapa singleton perlu dipakai hati-hati.

---

## 7. Hidden Dependency Smell

Jika modul diam-diam mengakses:
- `GlobalSomething.instance`

tanpa terlihat di API-nya,
dependency jadi tersembunyi.

Reviewer atau maintainer
tidak langsung tahu
apa yang dibutuhkan modul itu.

Ini berlawanan dengan desain yang eksplisit.

Singleton sering berubah jadi
DI yang gagal diam-diam.

---

## 8. Singleton vs DI

Kalau komponen penting
diakses sebagai singleton global,
DI sering terlewati.

Kadang itu terasa praktis,
tapi:
- dependency jadi tak eksplisit
- substitution sulit
- test doubles sulit

Sering lebih sehat:
- satu instance dibuat di composition root
- lalu diinject

Secara runtime tetap satu,
tapi dependency tetap eksplisit.

Ini perbedaan sangat penting.

---

## 9. Lifecycle and Initialization

Singleton sering menimbulkan masalah:
- dibuat kapan?
- apa yang terjadi jika init gagal?
- siapa yang bertanggung jawab reset/shutdown?

Kalau lifecycle tak jelas,
startup bug dan shutdown bug mudah muncul.

Satu instance bersama
tetap butuh ownership lifecycle.

Tanpa itu,
singleton jadi objek ajaib yang "harusnya ada".

---

## 10. Healthcare Example

Logger process-wide:
- masuk akal sebagai satu instance bersama

`CurrentPatientContext` global mutable:
- sangat berbahaya

Config aplikasi immutable:
- cukup masuk akal sebagai shared instance

In-memory mutable policy store
yang diubah dari banyak tempat:
- rawan bug dan audit nightmare

Contoh ini menunjukkan
bahwa masalah utama bukan "satu instance",
tapi sifat state dan aksesnya.

---

## 11. Singleton in Node.js Reality

Di Node.js,
module caching sering membuat sesuatu
bertindak seperti singleton de facto.

Ini bisa nyaman,
tapi juga menipu.

Karena developer bisa tidak sadar bahwa:
- state module-level ternyata global untuk process itu

Jadi walau tidak menulis
pattern singleton textbook,
dampaknya bisa sama.

Pahami runtime behavior,
bukan cuma pola formal.

---

## 12. Anti-Pattern Umum

1. Menaruh mutable business state di singleton/global module state.
2. Menggunakan singleton sebagai service locator.
3. Menyembunyikan dependency penting di balik import global.
4. Tidak punya reset/init lifecycle yang jelas.
5. Menganggap "cuma satu instance" otomatis berarti arsitektur sehat.

---

## 13. Best Practices

- gunakan shared instance hanya untuk resource yang memang wajar dibagi process-wide.
- usahakan dependency tetap eksplisit walau instancenya satu.
- hindari singleton untuk mutable domain state.
- pahami lifecycle dan test impact sebelum memilih pola ini.
- curigai semua global access yang terasa terlalu nyaman.

---

## 14. Pertanyaan Desain Penting

Sebelum memilih singleton, tanya:
1. Apakah resource ini memang secara alami satu per process/app?
2. Apakah state-nya mutable dan berbahaya jika dibagi?
3. Apakah dependency ini sebaiknya tetap eksplisit via DI?
4. Bagaimana test akan mengisolasi atau mereset state?
5. Siapa yang mengelola lifecycle instance ini?

---

## 15. Mini Latihan

Latihan:
1. Audit satu singleton/global module state di codebase.
2. Klasifikasikan apakah itu shared resource sehat atau global mutable smell.
3. Pindahkan satu dependency penting dari singleton global ke DI.
4. Tulis skenario test yang sekarang rusak karena state singleton.
5. Identifikasi lifecycle init/reset yang seharusnya eksplisit.

---

## 16. Checklist Kelulusan Topik Singleton

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan shared instance sehat dari global state beracun,
- mengenali hidden dependency smell,
- memahami hubungan singleton dengan DI dan testability,
- memakai singleton hanya untuk kasus process-wide yang masuk akal,
- menolak penggunaannya saat hanya menjadi jalan pintas malas.

---

## 17. Ringkasan Brutal

- Singleton bukan dosa otomatis.
- Tapi singleton adalah tempat favorit banyak dosa arsitektur bersembunyi.
- Kalau sesuatu terasa terlalu nyaman diakses dari mana saja,
  kemungkinan besar biaya nyatanya sedang ditunda.
