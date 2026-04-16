# Dependency Inversion - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu dependency inversion
- kenapa penting dalam arsitektur modern
- beda antara dependency inversion dan dependency injection
- bagaimana prinsip ini diterapkan di JavaScript/TypeScript
- kapan prinsip ini membantu dan kapan bisa disalahgunakan

Dependency inversion adalah salah satu prinsip
yang sering diulang,
tapi juga sering disalahpahami.

Banyak developer mengira:
- pakai interface = dependency inversion

Padahal tidak sesederhana itu.

---

## 1. Apa Itu Dependency Inversion?

Dependency inversion berarti:
- modul level tinggi tidak seharusnya bergantung langsung pada detail level rendah
- keduanya seharusnya bergantung pada abstraksi yang lebih stabil

Dalam bahasa yang lebih membumi:
- logic inti tidak seharusnya menempel keras ke framework, ORM, atau vendor SDK

Kalau core logic terlalu tergantung pada detail teknis,
perubahan infrastruktur akan menyebar ke mana-mana.

---

## 2. Kenapa Disebut "Inversion"?

Karena dependency alami yang naif biasanya seperti ini:
- business logic -> ORM
- business logic -> vendor API client
- business logic -> framework request object

Dependency inversion membalik cara berpikir itu:
- business logic bergantung pada kontrak yang lebih stabil
- detail teknis menyesuaikan kontrak tersebut

Jadi yang "dibalik" adalah arah ketergantungan desain.

---

## 3. Masalah Jika Tidak Ada Dependency Inversion

Tanpa prinsip ini,
sering muncul masalah:
- domain logic sulit dites tanpa DB/framework
- vendor ganti = core code ikut rusak
- migration framework mahal
- use case sulit dipahami karena bercampur detail teknis

Kamu jadi punya core bisnis
yang terus-menerus tersandera oleh tepi sistem.

Itu desain yang rapuh.

---

## 4. High-Level vs Low-Level Module

High-level module:
- menyimpan policy, aturan bisnis, use case

Low-level module:
- detail teknis implementasi
- database access
- external API client
- filesystem
- framework-specific adapter

Dependency inversion ingin menjaga
agar high-level module tidak terkunci ke low-level detail.

---

## 5. Contoh Sederhana

Kasus:
- `AppointmentService` butuh menyimpan appointment

Desain naif:
- `AppointmentService` langsung membuat query Prisma/SQL

Masalah:
- service bisnis sekarang bergantung pada detail persistence

Desain lebih sehat:
- `AppointmentService` bergantung pada kontrak `AppointmentRepository`
- implementasi repository yang konkret
  berada di lapisan infrastruktur

Dengan begitu,
service tidak perlu tahu detail persistence.

---

## 6. Beda Dependency Inversion dan Dependency Injection

Ini wajib jelas.

Dependency inversion:
- prinsip desain
- mengatur arah ketergantungan

Dependency injection:
- teknik memasukkan dependency dari luar
- salah satu cara membantu menerapkan dependency inversion

Kamu bisa memakai DI
tanpa benar-benar menerapkan dependency inversion dengan baik.

Dan kamu bisa menerapkan dependency inversion
tanpa framework DI besar.

Jangan campur dua konsep ini.

---

## 7. Abstraction Itu Alat, Bukan Tujuan

Banyak orang salah langkah:
- setiap class langsung dibungkus interface
- semua hal diabstraksikan sejak awal

Itu bukan dependency inversion yang sehat.

Abstraksi berguna jika:
- melindungi core dari detail yang mungkin berubah
- mempermudah testing
- mempermudah penggantian implementasi

Kalau abstraksi tidak memberi nilai,
itu hanya kebisingan.

---

## 8. Interface Mania Adalah Anti-Pattern

Contoh buruk:
- satu service konkret punya satu interface
- tapi tidak ada kemungkinan implementasi lain
- tidak ada boundary arsitektural yang benar-benar dilindungi

Hasilnya:
- file bertambah
- kompleksitas naik
- manfaat minim

Dependency inversion bukan lomba membuat interface.
Ini soal ketepatan abstraction boundary.

---

## 9. Boundary yang Layak Diberi Abstraksi

Abstraksi paling bernilai biasanya ada di:
- persistence boundary
- external service boundary
- messaging boundary
- cache/storage boundary
- domain-service interaction tertentu

Karena area-area ini:
- lebih mungkin berubah
- lebih sulit di-test jika melekat langsung
- punya dampak besar jika bocor ke core

Di sinilah dependency inversion paling terasa manfaatnya.

---

## 10. JavaScript/TypeScript Context

Di TypeScript,
abstraksi bisa berupa:
- interface
- type contract
- port object shape
- function signature

Di JavaScript murni,
abstraksi tetap bisa ada
meski tanpa interface formal,
dengan:
- contract by convention
- object capability
- module boundary yang jelas

Jadi dependency inversion bukan milik bahasa OOP statis saja.

---

## 11. Port and Adapter Thinking

Dependency inversion sangat cocok
dengan pola ports-and-adapters.

Core:
- mendefinisikan port / contract

Infrastructure:
- mengimplementasikan adapter yang memenuhi port itu

Keuntungan:
- core lebih stabil
- tepi bisa berubah
- testing lebih mudah

Ini salah satu bentuk paling praktis
dari dependency inversion.

---

## 12. Testing Benefit

Salah satu manfaat besar:
- test use case tidak perlu benar-benar ke DB/vendor

Kalau `AppointmentService`
bergantung pada kontrak repository,
maka di test kamu bisa pakai:
- fake repository
- in-memory adapter
- stub sederhana

Ini membuat test:
- lebih cepat
- lebih fokus
- lebih murah dijalankan

Kalau service langsung menempel ke detail DB,
test jadi lebih berat dan rapuh.

---

## 13. Framework Lock-In

Dependency inversion sangat berguna
untuk mengurangi lock-in ke framework atau tool.

Contoh:
- domain service tidak tahu Express/Fastify request object
- use case tidak tahu Prisma langsung
- notification policy tidak tahu vendor SDK tertentu

Kalau framework berganti,
tepi sistem yang diubah.

Core tetap relatif aman.

Ini bukan berarti kamu akan sering ganti framework,
tapi ini melindungi area perubahan.

---

## 14. Example: Notification Boundary

Use case:
- setelah booking sukses, kirim reminder

Desain naif:
- `AppointmentService` langsung memanggil WhatsApp SDK

Desain lebih sehat:
- `AppointmentService` bergantung pada `NotifierPort`
- adapter konkret bisa:
  - WhatsApp notifier
  - Email notifier
  - Fake notifier

Keuntungan:
- core logic tidak tahu vendor
- vendor bisa berubah
- test lebih mudah

---

## 15. Dependency Inversion dan Domain Purity

Semakin core domain dipisah dari detail luar,
semakin mudah domain itu dipahami.

Ini bukan soal kemurnian akademik saja.
Ini soal:
- maintainability
- testability
- change safety

Jika business rule bercampur dengan SDK/ORM specifics,
reasoning jadi lebih berat.

Dependency inversion membantu menjaga domain tetap lebih bersih.

---

## 16. Kapan Tidak Perlu Dipaksakan?

Kalau aplikasinya kecil,
use case sederhana,
dan boundary belum jelas berubah,
jangan berlebihan.

Contoh:
- helper kecil internal
- script sederhana
- utility sangat lokal

Tidak semua hal perlu abstraction formal.

Prinsip ini harus diterapkan dengan akal,
bukan dengan fanatisme.

---

## 17. Wrong Abstraction

Abstraksi yang salah lebih buruk
daripada detail yang jujur.

Contoh:
- interface terlalu generik
- contract tidak mencerminkan domain
- semua hal disamakan demi "konsistensi"

Akibat:
- nama kontrak kabur
- behavior dipaksa masuk model abstrak palsu

Dependency inversion sehat
butuh abstraction yang tepat,
bukan abstraction sebanyak mungkin.

---

## 18. Healthcare Example

Contoh:
- modul booking harus:
  - cek slot
  - simpan appointment
  - catat audit
  - kirim notifikasi

Core booking sebaiknya bergantung pada:
- `AppointmentRepository`
- `AuditLoggerPort`
- `NotifierPort`

Implementasi konkret:
- DB repository
- audit table logger
- WhatsApp notifier

Dengan ini:
- logic booking tidak terkunci ke vendor/persistence detail
- boundary lebih jelas

---

## 19. Anti-Pattern Umum

1. Core use case langsung tahu ORM/framework.
2. Semua hal dibuat interface tanpa alasan.
3. Abstraksi terlalu generik sampai kehilangan makna domain.
4. DI container dipakai, tapi boundary desain tetap buruk.
5. Interface dibuat hanya karena tren, bukan karena perubahan yang dilindungi.

---

## 20. Best Practices

- lindungi core dari detail yang mudah berubah.
- abstrahkan boundary penting, bukan semua hal.
- gunakan contract yang bermakna secara domain.
- pakai DI sebagai teknik, bukan tujuan.
- evaluasi apakah abstraction benar-benar mengurangi coupling.

---

## 21. Mini Latihan

Latihan:
1. Ambil satu service yang langsung memakai ORM/vendor SDK, lalu identifikasi boundary yang bisa dipisah.
2. Tentukan mana dependency yang layak dijadikan contract.
3. Buat contoh kontrak sederhana untuk notifier/repository.
4. Jelaskan beda DI dan dependency inversion.
5. Cari contoh interface di codebase yang tidak memberi nilai.

---

## 22. Jawaban Contoh Ringkas

Boundary yang cocok diabstraksikan:
- DB repository
- external notifier
- payment gateway

DI vs dependency inversion:
- DI = teknik memberi dependency
- dependency inversion = prinsip arah desain

Interface tanpa nilai:
- interface satu-satu untuk class yang tidak punya boundary perubahan jelas

---

## 23. Checklist Kelulusan Topik Dependency Inversion

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan dependency inversion dengan bahasa praktis,
- membedakannya dari dependency injection,
- mengidentifikasi boundary yang tepat untuk diabstraksikan,
- menghindari abstraction overkill,
- menjaga core logic tidak terlalu menempel ke detail teknis.

---

## 24. Ringkasan Brutal

- Dependency inversion yang baik melindungi core dari dunia luar.
- Dependency inversion yang buruk cuma menambah interface
  dan membuat codebase terdengar pintar, tapi tetap rapuh.
