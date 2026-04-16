# Builder - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu builder pattern
- kapan builder lebih cocok daripada constructor/factory biasa
- bagaimana builder membantu object construction yang kompleks
- kapan builder justru membuat kode bertele-tele

Builder adalah pattern
yang sering terlalu dipuja
atau justru diabaikan.

Kalau objek yang dibangun punya:
- banyak opsi
- banyak langkah
- kombinasi konfigurasi yang rumit

builder bisa membantu.

Tapi kalau objeknya sederhana,
builder hanya menambah upacara.

---

## 1. Apa Itu Builder?

Builder adalah pattern
untuk membangun objek secara bertahap.

Alih-alih:
- satu constructor besar
  dengan banyak parameter membingungkan

builder memberi langkah-langkah
untuk menyusun objek
sampai siap dipakai.

Fokusnya:
- construction process

Bukan sekadar memilih jenis objek,
itu wilayah factory.

---

## 2. Masalah Apa yang Diselesaikan Builder?

Builder membantu saat:
- constructor punya terlalu banyak parameter
- object punya banyak konfigurasi opsional
- urutan setup penting
- perlu validasi sebelum final build

Tanpa builder,
kode create bisa jadi:
- sulit dibaca
- rawan urutan salah
- penuh objek options yang kabur

Builder membantu membuat proses create
lebih eksplisit.

---

## 3. Builder vs Constructor Hell

Contoh klasik masalah:
- `new Report(true, false, 30, 'csv', null, 'asia', ...)`

Sulit dibaca.
Sulit diingat.
Sulit di-review.

Builder bisa membuat intent lebih jelas:
- set format
- set timezone
- enable summary
- build

Ini meningkatkan readability
untuk construction yang memang kompleks.

---

## 4. Builder vs Options Object

Di JavaScript/TypeScript,
sering kali options object
sudah cukup menggantikan constructor panjang.

Jadi builder tidak selalu perlu.

Builder menjadi relevan
jika options object saja
masih terasa:
- terlalu liar
- terlalu banyak kombinasi invalid
- butuh langkah bertahap dan validasi build

Jangan langsung pilih builder
jika object literal/options sudah memadai.

---

## 5. Fluent API

Builder sering hadir
dengan gaya fluent:
- `setX()`
- `withY()`
- `enableZ()`
- `build()`

Ini bagus untuk readability,
tapi jangan berlebihan.

Fluent API yang sehat:
- jelas
- tidak ambigu
- tidak menyembunyikan side effect aneh

Kalau method chaining hanya kosmetik
tanpa manfaat clarity,
lebih baik sederhana saja.

---

## 6. Validation Before Build

Salah satu kekuatan builder:
- validasi bisa dipusatkan
  sebelum objek final dihasilkan

Contoh:
- format wajib harus ada
- kombinasi opsi tertentu tidak valid
- dependency tertentu harus hadir bersama

Kalau validasi tersebar
di banyak tempat pemanggil,
complexity naik.

Builder bisa menjadi guardrail.

---

## 7. Immutable Result

Sering kali builder dipakai
untuk menghasilkan object final
yang siap dan stabil.

Builder sendiri mutable saat proses build,
tapi hasil akhir bisa immutable.

Ini membantu memisahkan:
- fase penyusunan
  dari
- fase pemakaian

Konsep ini berguna
untuk config atau request object kompleks.

---

## 8. Kapan Builder Cocok?

Biasanya cocok saat:
- banyak optional fields
- banyak kombinasi konfigurasi
- readability create flow penting
- urutan atau completeness perlu dijaga

Contoh:
- query/report builder
- notification payload builder
- API request configuration
- test data builder

Builder sering sangat berguna
di test code juga.

---

## 9. Kapan Builder Tidak Cocok?

Kalau objeknya sederhana:
- 2-3 properti
- satu options object cukup
- tanpa invariant rumit

builder bisa jadi berlebihan.

Over-builder menghasilkan:
- file ekstra
- method ekstra
- cognitive load ekstra

Sederhana tetap lebih baik
jika masalahnya memang sederhana.

---

## 10. Test Data Builder

Salah satu use case sangat populer:
- membangun fixture/test data

Builder di test membantu:
- default masuk akal
- override spesifik mudah
- variasi skenario cepat

Ini sering jauh lebih bermanfaat
daripada builder di production code yang dipaksakan.

Builder pattern tidak harus selalu
untuk domain object runtime utama.

---

## 11. Healthcare Example

Misal sistem butuh membangun
payload reminder pasien:
- channel
- bahasa
- waktu lokal
- template
- fallback contact
- metadata consent

Jika semua ini disusun
langsung lewat object literal liar di banyak tempat,
rawan salah.

Builder bisa membantu
membuat payload final konsisten dan tervalidasi.

---

## 12. Builder vs Factory

Factory:
- memilih/membuat instance dengan satu langkah

Builder:
- menyusun objek langkah demi langkah

Kadang keduanya bisa dipakai bersama:
- factory memilih builder yang tepat
- builder menyusun hasil akhir

Yang penting:
- jangan pakai istilah secara acak
- pahami peran masing-masing

---

## 13. Hidden Mutation Warning

Builder mutable saat proses create
bisa membingungkan
jika dipakai ulang sembarangan.

Contoh:
- satu builder direuse di banyak tempat
- state lama terbawa

Ini bahaya.

Builder sehat biasanya:
- dipakai per build flow
- tidak disebar sebagai mutable global thing

---

## 14. Anti-Pattern Umum

1. Builder untuk objek yang sangat sederhana.
2. Fluent API panjang tapi tidak menambah kejelasan.
3. Builder mutable dipakai ulang sembarangan.
4. Validasi tetap tersebar walau builder sudah ada.
5. Builder dibuat karena pattern textbook, bukan kebutuhan nyata.

---

## 15. Best Practices

- gunakan builder saat construction memang kompleks atau bertahap.
- pertimbangkan options object dulu untuk kasus sederhana.
- pusatkan validasi penting di fase build.
- hasil akhir sebaiknya jelas dan stabil.
- gunakan builder secara pragmatis, termasuk di test bila itu paling berguna.

---

## 16. Pertanyaan Desain Penting

Sebelum membuat builder, tanya:
1. Apakah construction object ini benar-benar kompleks?
2. Apakah options object sudah cukup?
3. Apakah ada kombinasi invalid yang perlu dicegah?
4. Apakah builder ini menambah clarity atau hanya method chaining?
5. Apakah builder akan dipakai ulang secara aman?

---

## 17. Mini Latihan

Latihan:
1. Cari constructor/options object yang sulit dibaca.
2. Refactor menjadi builder sederhana.
3. Tambahkan validasi build untuk kombinasi invalid.
4. Terapkan test data builder pada satu suite test.
5. Cari satu builder berlebihan yang bisa diganti object literal.

---

## 18. Checklist Kelulusan Topik Builder

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan builder dari factory,
- mengenali kapan construction layak dibuat bertahap,
- memakai builder untuk clarity dan validation,
- menghindari builder pada kasus sederhana,
- menggunakan builder secara pragmatis di production maupun test code.

---

## 19. Ringkasan Brutal

- Builder itu bagus saat proses membuat objek memang ribet.
- Builder itu buruk saat dipakai untuk membungkus objek receh.
- Kalau pattern-mu menambah upacara lebih banyak daripada kejelasan,
  pattern itu tidak membantu.
