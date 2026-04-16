# Dependency Injection - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu dependency injection
- kenapa DI penting untuk modularity dan testability
- berbagai bentuk DI di JavaScript/TypeScript
- kapan DI berguna dan kapan container-heavy DI jadi berlebihan

Dependency Injection sering dibahas
secara terlalu formal,
padahal inti idenya sederhana:
- jangan biarkan komponen membuat semua kebutuhannya sendiri
  jika itu membuat coupling jadi buruk

DI adalah tentang
bagaimana dependency diberikan,
bukan bagaimana library container terlihat keren.

---

## 1. Apa Itu Dependency Injection?

Dependency Injection adalah pola
di mana komponen menerima dependency-nya
dari luar,
bukan membuat semuanya sendiri di dalam.

Contoh sederhana:
- service menerima `repo`, `logger`, `clock`

bukan membuat sendiri
semua objek itu secara hardcoded.

Hasilnya:
- coupling turun
- testability naik
- wiring lebih eksplisit

---

## 2. Masalah yang Diselesaikan

Tanpa DI,
komponen sering:
- membuat dependency internal sendiri
- susah dites
- susah diganti implementasinya
- terlalu tahu wiring runtime

Ini membuat perubahan lebih mahal.

DI membantu memisahkan:
- business logic
  dari
- object construction / wiring

Itu manfaat utamanya.

---

## 3. Constructor / Parameter Injection

Bentuk paling sederhana:
- dependency diberikan lewat parameter
- constructor
- function arguments

Ini sering sudah cukup.

Di JavaScript/TypeScript,
pattern DI tidak harus selalu
pakai framework container besar.

Kadang:
- `createService({ repo, logger })`

sudah sangat sehat.

---

## 4. DI vs Service Locator

Perlu beda jelas.

DI:
- dependency diberikan dari luar

Service locator:
- komponen mengambil dependency
  dari registry/global locator

Service locator sering terasa nyaman,
tapi menyembunyikan dependency nyata.

DI yang baik
membuat dependency eksplisit.

Kalau dependency tersembunyi,
reasoning dan testing memburuk.

---

## 5. Explicit Wiring

Salah satu kekuatan DI:
- wiring komponen jadi eksplisit

Kita bisa melihat:
- service ini butuh apa saja

Itu bagus untuk:
- code review
- onboarding
- refactor

Kalau dependency disembunyikan
di global import atau service locator,
kompleksitas mudah tersamar.

---

## 6. Testability Benefit

Ini alasan paling sering dipakai,
dan valid.

Dengan DI:
- mock/stub dependency lebih mudah
- edge case bisa diuji terpisah
- waktu / random / IO bisa dikontrol

Tapi ingat:
- DI bukan hanya untuk testing
- DI adalah alat menjaga modularity

Kalau dipahami hanya sebagai trik mocking,
nilainya diremehkan.

---

## 7. Interface Thinking Without Overdoing It

Di TypeScript/JS,
tidak selalu perlu interface formal besar.

Kadang cukup:
- kontrak perilaku implisit lewat shape object
- atau type kecil yang jelas

DI tetap bisa sehat
tanpa ceremony berlebihan.

Yang penting:
- dependency contract cukup jelas
- consumer tidak tergantung ke detail konkret

---

## 8. Container vs Manual DI

Manual DI:
- wiring dilakukan eksplisit sendiri

Container DI:
- framework/library mengelola resolution lifecycle

Manual DI cocok untuk banyak aplikasi
dan sering lebih transparan.

Container cocok saat graph dependency besar
dan lifecycle management rumit.

Jangan lompat ke container
kalau manual wiring masih sangat cukup.

---

## 9. Hidden Magic Risk

Container-heavy DI punya risiko:
- dependency resolution terasa magis
- debugging lebih sulit
- startup error membingungkan
- lifecycle salah paham

Jika tim tidak benar-benar memahami tool DI,
container bisa menambah opacity.

DI yang baik seharusnya meningkatkan clarity,
bukan menurunkannya.

---

## 10. Healthcare Example

Misal `AppointmentService`
butuh:
- repository
- notification sender
- audit logger
- clock

Dengan DI,
service menerima dependency itu
dari composition root.

Service fokus pada use case,
bukan pada detail pembuatan dependency.

Ini sangat membantu
untuk testing skenario waktu dan integrasi.

---

## 11. Composition Root

Idealnya ada titik wiring utama:
- tempat dependency dirangkai

Sering disebut composition root.

Ini penting
agar object graph tidak dibuat acak
di berbagai sudut aplikasi.

Kalau setiap layer merakit dependency sendiri,
DI kehilangan sebagian nilainya.

Wiring yang terpusat
membuat sistem lebih terbaca.

---

## 12. Anti-Pattern Umum

1. Service membuat dependency penting sendiri di dalam.
2. Menggunakan service locator lalu menyebutnya DI.
3. Container DI dipakai terlalu dini dan terlalu magis.
4. Dependency terlalu tersembunyi untuk dipahami caller/reviewer.
5. Ceremony interface/container lebih besar dari problem yang diselesaikan.

---

## 13. Best Practices

- mulai dari explicit parameter injection yang sederhana.
- pisahkan wiring dari business logic.
- gunakan composition root jika graph mulai membesar.
- pilih container hanya jika manfaatnya nyata.
- pertahankan dependency tetap terlihat dan bisa ditelusuri.

---

## 14. Pertanyaan Desain Penting

Sebelum memperkenalkan DI, tanya:
1. Dependency mana yang sekarang terlalu terikat secara konkret?
2. Apakah wiring dan business logic sudah tercampur?
3. Apakah manual injection masih cukup?
4. Apakah container akan membantu atau hanya menambah magic?
5. Apakah dependency setelah perubahan jadi lebih jelas atau malah lebih tersembunyi?

---

## 15. Mini Latihan

Latihan:
1. Cari satu service yang membuat dependency sendiri.
2. Refactor menjadi constructor/parameter injection.
3. Buat composition root sederhana untuk modul itu.
4. Bandingkan kemudahan testing sebelum dan sesudah.
5. Audit apakah ada service locator tersembunyi yang selama ini disebut DI.

---

## 16. Checklist Kelulusan Topik Dependency Injection

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan DI sebagai pemisahan wiring dari logic,
- membedakan DI dari service locator,
- menerapkan manual DI yang cukup sederhana,
- menilai kapan container membantu dan kapan berlebihan,
- menjaga dependency tetap eksplisit dan mudah dipahami.

---

## 17. Ringkasan Brutal

- DI itu tentang kejelasan dependency, bukan tentang framework canggih.
- Kalau dependency-mu makin tersembunyi setelah "pakai DI",
  berarti implementasimu salah arah.
