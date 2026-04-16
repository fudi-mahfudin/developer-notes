# Composition over Inheritance - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu composition
- apa itu inheritance
- kenapa prinsip `composition over inheritance` penting
- kapan inheritance masih masuk akal
- bagaimana pola ini relevan untuk JavaScript/TypeScript modern

Banyak developer pernah diajari inheritance
seolah itu default desain OO yang dewasa.
Dalam praktik modern JavaScript,
composition sering jauh lebih sehat.

---

## 1. Definisi Singkat

Inheritance:
- membuat class baru berdasarkan class lama
- child mewarisi behavior/structure parent

Composition:
- membangun object/module dari gabungan bagian lain
- behavior didapat lewat kolaborasi, bukan pewarisan

Prinsip `composition over inheritance` berarti:
- jika dua pendekatan sama-sama mungkin,
  composition sering lebih fleksibel dan lebih aman.

---

## 2. Kenapa Prinsip Ini Muncul?

Karena inheritance sering terlihat elegan di awal,
tapi menjadi kaku saat sistem tumbuh.

Masalah umum inheritance:
- hierarki membesar
- parent class makin gemuk
- child bergantung pada detail parent
- override behavior jadi membingungkan
- perubahan parent memukul semua turunan

Composition muncul sebagai respons praktis:
- lebih fleksibel
- lebih lokal
- lebih mudah diuji dan diganti

---

## 3. Inheritance Tidak Selalu Buruk

Penting jujur:
- inheritance bukan dosa

Ada kasus di mana inheritance masih masuk akal:
- hubungan is-a yang benar-benar kuat
- hierarki kecil dan stabil
- framework tertentu memang memakai inheritance secara alami

Tapi masalahnya:
- inheritance terlalu sering dipakai
  untuk masalah yang sebenarnya lebih cocok diselesaikan dengan composition.

---

## 4. Kenapa Composition Lebih Disukai?

Composition biasanya memberi:
- fleksibilitas lebih tinggi
- coupling lebih rendah
- testing lebih mudah
- behavior lebih modular
- lebih sedikit hierarki rapuh

Dalam JavaScript,
yang sangat mendukung fungsi, object, dan module composition,
keuntungan ini makin terasa.

---

## 5. Contoh Masalah Inheritance Klasik

Misal kamu punya:
- `BaseService`
- `AuthService extends BaseService`
- `PaymentService extends BaseService`
- `NotificationService extends BaseService`

Lalu `BaseService` mulai menampung:
- logging
- metrics
- retry
- permission helper
- cache helper

Hasilnya:
- parent class jadi monster
- semua child mewarisi hal yang mungkin tidak semuanya butuh

Ini smell klasik inheritance yang salah arah.

---

## 6. Contoh Composition yang Lebih Sehat

Daripada parent besar,
service bisa menerima dependency:
- logger
- retry policy
- cache adapter
- metrics client

Lalu service hanya memakai yang dibutuhkan.

Ini composition:
- behavior dirakit dari bagian-bagian spesifik
- bukan diwarisi secara paksa

Hasilnya biasanya lebih jelas dan lebih fleksibel.

---

## 7. JavaScript Cocok dengan Composition

Karena JavaScript punya:
- function sebagai first-class citizen
- object literals
- higher-order function
- module system

Maka banyak behavior bisa dibangun dengan:
- fungsi kecil
- object composition
- dependency injection
- wrapper/interceptor

Kamu tidak harus bergantung pada class hierarchy
untuk mencapai reusable design.

---

## 8. Behavior Reuse Tidak Harus Lewat Parent Class

Ini inti penting.

Reuse bisa dilakukan dengan:
- helper functions
- pure functions
- injected collaborators
- mixin dengan hati-hati
- decorator/wrapper
- module composition

Kalau setiap reusable behavior
langsung dibungkus ke inheritance tree,
itu tanda pola pikir masih terlalu kaku.

---

## 9. Tight Coupling pada Inheritance

Child class biasanya cukup erat terikat ke parent.

Masalah:
- child tahu terlalu banyak contract implicit parent
- parent berubah = child ikut kena
- override tertentu bisa melanggar asumsi parent

Ini membuat inheritance
sering menghasilkan coupling yang tinggi.

Composition biasanya memberi dependency yang lebih eksplisit.

---

## 10. Fragile Base Class Problem

Ini problem terkenal.

Parent class berubah sedikit,
tapi turunan banyak ikut rusak
atau berperilaku aneh.

Kenapa?
- child bergantung pada detail internal parent,
  bukan hanya interface yang jelas

Semakin banyak turunan,
semakin besar risiko ini.

Inilah salah satu alasan
senior engineer lebih hati-hati dengan inheritance.

---

## 11. Override Hell

Saat inheritance mulai kompleks,
sering muncul:
- method override di banyak child
- super call membingungkan
- hook lifecycle tak jelas

Hasilnya:
- sulit menelusuri alur
- sulit memprediksi behavior
- testing makin berat

Composition cenderung lebih eksplisit:
- modul A memakai B dan C
- bukan A mewarisi lapisan perilaku tersembunyi dari atas.

---

## 12. Composition dan Dependency Injection

Composition sering berjalan selaras dengan DI.

Contoh:
- `AppointmentService` menerima `logger`, `repository`, `notifier`

Lalu behavior terbentuk dari dependency yang dipasok.

Keuntungan:
- mudah diganti di test
- mudah mengganti implementasi
- kontrak dependency lebih jelas

Ini sangat cocok dengan backend Node.js modern.

---

## 13. Frontend Example

Di frontend,
composition muncul lewat:
- component composition
- hooks
- render prop / wrapper pattern
- reusable behavior lewat custom hooks/util

Daripada:
- class component inheritance chain

React modern sendiri mendorong composition kuat.

Ini contoh ekosistem yang secara budaya
sudah bergerak ke arah prinsip ini.

---

## 14. Backend Example

Daripada:
- `BaseController`
- `AuthenticatedController`
- `TrackedAuthenticatedController`
- `TrackedCachedAuthenticatedController`

yang makin absurd,
sering lebih sehat:
- pakai middleware/interceptor
- pakai injected collaborators
- pakai reusable function/wrapper

Behavior jadi lebih modular dan eksplisit.

---

## 15. Composition Membantu Testing

Kalau behavior dibangun dari dependency yang eksplisit,
test jadi lebih mudah:
- bisa mock/fake dependency tertentu
- tidak perlu mewarisi hierarchy test aneh

Inheritance sering membuat test ikut mewarisi kompleksitas:
- setup parent state
- override behavior
- implicit dependency

Composition cenderung lebih ramah test.

---

## 16. Kapan Inheritance Masih Masuk Akal?

Contoh masuk akal:
- error hierarchy
- small stable abstraction
- framework extension point tertentu
- domain model yang benar-benar punya hubungan `is-a` kuat dan stabil

Tapi tetap:
- gunakan hemat
- hati-hati terhadap pembesaran hierarchy

Kalau ragu,
composition sering lebih aman.

---

## 17. Composition Bukan Silver Bullet

Jangan romantisasi juga.

Composition bisa jelek jika:
- dependency terlalu banyak
- object graph tidak terkelola
- wiring terlalu verbose
- tidak ada boundary yang jelas

Jadi prinsip ini bukan izin
untuk membuat constructor dengan 15 dependency
dan menyebutnya desain matang.

Kualitas composition tetap harus dinilai.

---

## 18. Mixin dan Hati-Hati

JavaScript kadang memakai mixin.

Mixin bisa terasa seperti composition,
tapi bisa juga membawa masalah serupa inheritance:
- asal-usul behavior kabur
- konflik nama method
- dependency tersembunyi

Gunakan hati-hati.

Kalau mixin membuat perilaku makin sulit dilacak,
itu bukan kemenangan.

---

## 19. Domain Behavior vs Shared Technical Behavior

Composition sangat cocok untuk shared technical behavior:
- logging
- caching
- retry
- metrics

Behavior seperti ini
lebih sehat jika dipasang sebagai kolaborator atau wrapper,
bukan diwariskan ke semua turunan.

Ini menjaga core domain lebih bersih.

---

## 20. Healthcare Example

Misal sistem punya beberapa service:
- `AppointmentService`
- `PatientService`
- `NotificationService`

Semua butuh:
- logger
- metrics
- maybe audit helper

Daripada mewarisi `BaseService`,
lebih sehat:
- inject `logger`
- inject `metrics`
- gunakan wrapper/interceptor bila perlu

Dengan begitu,
setiap service tetap fokus
dan tidak terikat pada parent monster.

---

## 21. Composition dan Maintainability

Karena dependency eksplisit,
composition sering lebih mudah dirawat:
- tahu modul ini pakai apa
- tahu behavior datang dari mana
- tahu apa yang bisa diganti

Inheritance sering menyimpan behavior
di rantai kelas yang harus ditelusuri ke atas dan ke bawah.

Untuk codebase besar,
kejelasan seperti ini sangat berharga.

---

## 22. Anti-Pattern Umum

1. Membuat `Base*` class untuk hampir semua hal.
2. Menaruh logging/cache/retry di parent class gemuk.
3. Menggunakan inheritance hanya untuk reuse cepat.
4. Child class override banyak behavior sampai parent contract kabur.
5. Menganggap composition otomatis baik walau dependency-nya sudah berlebihan.

---

## 23. Best Practices

- pilih composition sebagai default mental model.
- gunakan inheritance hanya jika hubungan `is-a` benar-benar kuat dan stabil.
- jaga dependency tetap eksplisit.
- gunakan wrapper/middleware/interceptor untuk shared technical behavior.
- nilai desain dari kejelasan dan kemudahan perubahan, bukan dari keren tidaknya hierarchy.

---

## 24. Mini Latihan

Latihan:
1. Cari satu `Base*` class di codebase, lalu evaluasi apakah memang layak diwariskan.
2. Refactor contoh parent class gemuk menjadi composition.
3. Identifikasi reusable behavior yang lebih cocok jadi wrapper/dependency.
4. Buat contoh use case di mana inheritance masih masuk akal.
5. Jelaskan kenapa React modern dianggap lebih composition-friendly.

---

## 25. Jawaban Contoh Ringkas

Contoh inheritance masih masuk akal:
- `AppError` -> `ValidationError`, `AuthError`, `ConflictError`

Contoh yang lebih cocok composition:
- service dengan kebutuhan logging, metrics, cache, retry

React modern composition-friendly karena:
- perilaku reusable dibangun lewat component composition dan hooks,
  bukan class inheritance chain.

---

## 26. Checklist Kelulusan Topik Composition over Inheritance

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan beda inheritance dan composition secara praktis,
- memahami masalah umum inheritance,
- mengusulkan composition untuk reuse behavior yang lebih sehat,
- tahu kapan inheritance masih wajar,
- menilai desain berdasarkan fleksibilitas dan maintainability, bukan kebiasaan lama OO.

---

## 27. Ringkasan Brutal

- Inheritance sering terlihat cerdas di awal
  lalu terasa seperti perangkap di kemudian hari.
- Composition biasanya tidak seheroik itu.
  Tapi lebih sering membuat sistem tetap waras.
