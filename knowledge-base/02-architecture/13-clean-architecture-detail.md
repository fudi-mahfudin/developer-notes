# Clean Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu clean architecture
- inti idenya
- kenapa banyak orang salah memahaminya
- kapan berguna
- kapan jadi over-engineering

Clean architecture sering dijadikan identitas.
Padahal yang penting bukan labelnya.
Yang penting:
- dependency direction sehat
- core logic terlindungi
- boundary jelas

Kalau cuma banyak layer dan interface,
itu belum clean.

---

## 1. Apa Itu Clean Architecture?

Secara sederhana,
clean architecture adalah pendekatan
yang menempatkan business rules inti
di pusat,
dan detail teknis di bagian luar.

Tujuannya:
- perubahan framework/DB/UI
  tidak merusak inti sistem
- dependency mengarah ke dalam,
  ke area yang lebih stabil

Ini adalah ide inti.

---

## 2. Bukan Soal Lingkaran di Diagram

Banyak orang hanya ingat:
- diagram lingkaran
- entities, use cases, interface adapters, frameworks

Padahal inti nilainya bukan di diagram.

Inti nilainya:
- ketergantungan sehat
- pemisahan concern
- business logic tidak tenggelam dalam detail teknis

Kalau codebase masih penuh kebocoran boundary,
diagram sebagus apa pun tidak berarti.

---

## 3. Inner vs Outer

Bagian dalam:
- domain rules
- use cases
- policy inti

Bagian luar:
- web framework
- database
- UI
- vendor integration
- external infrastructure

Rule utamanya:
- bagian dalam tidak bergantung pada detail luar

Ini yang membuat arsitektur lebih "bersih".

---

## 4. Kenapa Ini Menarik?

Karena detail luar sering berubah:
- framework diganti
- ORM diganti
- API vendor berubah
- UI berganti

Business rules inti biasanya lebih stabil relatif.

Clean architecture mencoba mengoptimalkan desain
agar bagian yang lebih stabil
tidak terus-terusan rusak oleh yang lebih volatil.

---

## 5. Use Case as First-Class Concept

Salah satu kekuatan clean architecture:
- use case dianggap citizen utama

Contoh:
- create appointment
- cancel appointment
- process payment
- send reminder eligibility check

Fokusnya bukan:
- controller dulu
- DB dulu

Tapi:
- sistem ini sebenarnya melakukan apa?

Ini cara berpikir yang sehat.

---

## 6. Clean Architecture vs Layered Architecture

Layered architecture:
- fokus pada pemisahan berdasarkan lapisan concern

Clean architecture:
- lebih menekankan arah dependency
  dan perlindungan inti bisnis

Keduanya bisa sangat mirip dalam praktik,
tapi clean architecture biasanya
lebih tegas soal:
- inner core vs outer detail

Kalau layering ada
tapi dependency masih bocor ke luar,
itu belum clean.

---

## 7. Clean Architecture vs Hexagonal

Dalam praktik,
clean architecture dan hexagonal
sering sangat mirip.

Keduanya menekankan:
- core business logic
- boundary jelas
- dependency inversion

Perbedaan utamanya lebih pada framing dan istilah.

Jangan terlalu fanatik membedakan label
jika prinsip desain dasarnya sudah sehat.

---

## 8. Apa yang Harus Ada di Core?

Idealnya:
- business rules inti
- domain entity/value
- use case policy

Yang tidak ideal ada di core:
- Prisma model specifics
- Express request
- HTTP status code logic
- vendor SDK client

Kalau hal-hal ini hidup di core,
clean architecture-nya bocor.

---

## 9. Interface Adapters

Adapter berguna untuk menjembatani:
- core model
  dengan
- dunia luar

Contoh:
- controller maps HTTP request ke input use case
- presenter maps result ke response DTO
- repository adapter maps domain need ke persistence detail

Ini menjaga core tidak harus bicara bahasa teknis luar.

---

## 10. Framework Should Be Detail

Salah satu pesan paling keras dari clean architecture:
- framework adalah detail

Ini terasa kontraintuitif
karena banyak tim memulai dari framework structure.

Tapi secara desain:
- nilai bisnis sistemmu bukan berada di Express, Nest, Next, Prisma, atau React
- nilai bisnis ada di behavior yang kamu bangun

Kalau framework menguasai semua bentuk codebase,
inti domain mudah tenggelam.

---

## 11. Testing Benefit

Clean architecture sangat mendorong
testing core logic secara terisolasi.

Karena core:
- tidak terlalu tergantung DB/framework
- bisa diuji dengan fake adapter

Ini membuat test:
- lebih cepat
- lebih fokus
- lebih stabil

Kalau use case tidak bisa dites
tanpa boot full app,
boundary clean architecture mungkin lemah.

---

## 12. Cost of Clean Architecture

Kita harus jujur:
- clean architecture punya biaya

Biaya itu bisa berupa:
- lebih banyak layer
- lebih banyak wiring
- lebih banyak mapping
- developer baru lebih butuh disiplin

Kalau sistem kecil dan sangat sederhana,
biaya ini bisa terasa berlebihan.

Jadi clean architecture
tidak boleh dipakai secara buta.

---

## 13. Clean Architecture Theater

Ini sangat umum.

Gejalanya:
- banyak interface
- banyak folder
- banyak use case class
- tapi business logic tetap bocor
- dependency direction tetap kacau

Hasilnya:
- codebase verbose
- sulit dinavigasi
- tidak benar-benar lebih bersih

Kalau prinsipnya tidak hidup,
label `clean` hanya kosmetik.

---

## 14. Healthcare Example

Use case `CreateAppointment`:

Core:
- cek slot
- validasi rule booking
- tentukan status awal

Outer:
- controller HTTP
- Prisma repository
- queue publisher
- WhatsApp integration

Kalau use case ini bisa dibaca
tanpa menyentuh Express/Prisma/vendor,
itu tanda baik.

Kalau logic inti bercampur dengan semuanya,
clean architecture hanya slogan.

---

## 15. DTO dan Mapping

Clean architecture sering butuh mapping:
- HTTP request -> use case input
- use case output -> response DTO
- persistence row -> domain entity

Mapping ini kadang terasa membosankan.

Tapi tujuannya:
- menjaga boundary bahasa antar layer

Kalau semua shape data dilewatkan mentah,
detail luar gampang menginfeksi core.

---

## 16. Over-Abstraction Risk

Jangan jadikan semua hal:
- use case class
- interface
- mapper
- presenter

hanya karena mengikuti template.

Pertanyaan yang lebih sehat:
- apakah ini membantu menjaga boundary nyata?
- atau hanya menambah ceremony?

Senior engineer harus bisa membedakan
prinsip dari ritual.

---

## 17. Good Fit vs Bad Fit

Good fit:
- domain cukup penting dan kompleks
- business rules layak dilindungi
- tim butuh boundary jelas
- perubahan teknologi bisa terjadi

Bad fit:
- aplikasi sangat kecil
- logic bisnis tipis
- tim kecil dan butuh kecepatan ekstrem jangka pendek

Tapi bahkan di sistem kecil,
beberapa prinsipnya tetap berguna.

Yang penting proporsionalitas.

---

## 18. Anti-Pattern Umum

1. Menyebut arsitektur clean,
   tapi core tahu framework/ORM/vendor.
2. Interface untuk semua hal tanpa boundary nyata.
3. Use case hanya pass-through kosong.
4. Mapping berlebihan tanpa nilai.
5. Fokus pada struktur folder, bukan dependency direction.

---

## 19. Best Practices

- mulai dari use case dan domain behavior.
- jaga detail luar tetap di pinggiran.
- ukur keberhasilan dari testability dan change safety.
- hindari clean architecture theater.
- terapkan prinsip secara proporsional.

---

## 20. Mini Latihan

Latihan:
1. Ambil satu endpoint kompleks, lalu identifikasi core vs detail luar.
2. Tunjukkan di mana dependency direction bocor.
3. Buat versi input/output use case yang lebih bersih.
4. Cari contoh interface yang tidak memberi nilai boundary nyata.
5. Jelaskan kapan clean architecture terlalu formal untuk suatu sistem.

---

## 21. Jawaban Contoh Ringkas

Core:
- aturan bisnis dan use case.

Detail luar:
- web framework
- DB
- vendor API

Clean architecture gagal jika:
- core tetap tergantung pada detail luar,
  meski struktur foldernya terlihat cantik.

---

## 22. Checklist Kelulusan Topik Clean Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan inti clean architecture tanpa terjebak jargon,
- membedakan core vs detail luar,
- menilai dependency direction secara kritis,
- menghindari clean architecture theater,
- menerapkan prinsip clean secara proporsional dan pragmatis.

---

## 23. Ringkasan Brutal

- Clean architecture bukan tentang terlihat rapi.
- Clean architecture adalah tentang menjaga inti sistem
  agar tidak tenggelam oleh detail yang sering berubah.
