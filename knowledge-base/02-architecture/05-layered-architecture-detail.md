# Layered Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu layered architecture
- kenapa layering dipakai
- layer umum pada aplikasi JavaScript
- kelebihan dan kelemahan layered design
- kesalahan umum saat menerapkannya

Layered architecture adalah salah satu pola paling umum,
tapi juga salah satu yang paling mudah dibuat setengah benar.

Kalau hanya menambah layer tanpa boundary sehat,
hasilnya cuma birokrasi kode.

---

## 1. Apa Itu Layered Architecture?

Layered architecture berarti
sistem dibagi ke beberapa lapisan
berdasarkan jenis tanggung jawab.

Contoh paling umum:
- presentation layer
- application/service layer
- domain/business layer
- data access/persistence layer

Intinya:
- concern yang berbeda ditempatkan di layer yang berbeda
- dependency flow dijaga relatif terarah

Layering membantu berpikir secara terstruktur.

---

## 2. Kenapa Layering Dipakai?

Karena banyak aplikasi punya masalah berulang:
- menerima input
- menjalankan rules bisnis
- membaca/menulis data
- berbicara dengan sistem lain
- mengembalikan output

Layering membantu membedakan:
- mana yang cuma detail transport,
- mana yang aturan bisnis inti,
- mana yang akses persistence,
- mana yang integrasi luar.

Kalau semuanya campur,
maintainability cepat turun.

---

## 3. Contoh Layer Sederhana

Misal backend service:

### Presentation Layer
- route handler
- controller
- request/response mapping

### Application Layer
- use case orchestration
- koordinasi beberapa dependency

### Domain Layer
- business rules
- domain behavior
- validation rule inti

### Infrastructure / Persistence Layer
- repository
- ORM
- external API adapter
- cache adapter

Pembagian ini tidak absolut,
tapi cukup umum dan berguna.

---

## 4. Presentation Layer

Tanggung jawabnya:
- menerima request
- parsing input
- memanggil use case yang tepat
- mengembalikan response

Yang tidak ideal hidup di sini:
- query bisnis kompleks
- aturan domain besar
- external orchestration berat

Controller/handler yang sehat harus relatif tipis.

Kalau controller tebal,
layering biasanya cuma teori.

---

## 5. Application Layer

Layer ini biasanya mengorkestrasi alur use case.

Contoh:
- create appointment
- cancel appointment
- resend reminder

Application layer sering:
- memanggil domain service/entity logic
- memanggil repository
- memicu event/outbox
- berkoordinasi dengan adapter tertentu

Ini bukan tempat
untuk semua hal acak.

Tujuannya adalah
mengatur workflow aplikasi,
bukan menelan seluruh sistem.

---

## 6. Domain Layer

Domain layer berisi inti aturan bisnis.

Contoh:
- aturan double booking
- aturan late cancel
- aturan validasi status transition

Layer ini idealnya:
- tidak terlalu tahu framework
- tidak terlalu tahu detail DB
- fokus pada business truth

Semakin core domain tercampur dengan detail teknis,
semakin lemah nilai layered architecture.

---

## 7. Persistence / Infrastructure Layer

Layer ini menangani detail teknis:
- query database
- ORM mapping
- third-party API
- queue producer/consumer adapter
- cache client

Layer ini penting,
tapi sebaiknya tidak mengendalikan business rule.

Kalau business rule tersembunyi di repository,
team akan sulit reasoning dan testing.

---

## 8. Dependency Direction Itu Penting

Layered architecture bukan cuma soal folder.

Yang penting:
- siapa bergantung pada siapa

Umumnya:
- presentation boleh tahu application
- application boleh tahu domain dan abstractions
- infrastructure mengimplementasikan detail yang dipakai layer atas

Kalau dependency random silang balik,
layering tinggal nama.

---

## 9. Layering Bukan Lisensi untuk Boilerplate

Kesalahan umum:
- semua operasi sederhana dipaksa lewat 8 file
- setiap hal punya interface meski tidak perlu
- satu perubahan kecil perlu menyentuh banyak lapisan kosong

Hasilnya:
- verbose
- lambat dikembangkan
- sulit diikuti

Layering yang sehat harus memberi nilai.
Kalau hanya menambah ceremony,
desainnya overdone.

---

## 10. Layered Architecture vs Modular Architecture

Layered architecture dan modular architecture
bisa saling melengkapi.

Layering:
- memisah concern berdasarkan jenis tanggung jawab

Modularity:
- memisah sistem berdasarkan domain/boundary tanggung jawab

Sistem sehat sering:
- modular by domain
- layered inside module

Contoh:
- modul `appointment`
  punya controller/service/repository sendiri

Ini biasanya lebih sehat
daripada satu folder global besar untuk semua controller/service/repository.

---

## 11. Classic Mistake: Anemic Service Layer

Kadang semua business logic
justru bocor ke controller atau repository,
sementara service layer hanya pass-through.

Akibat:
- service layer ada,
  tapi tidak memberi nilai nyata

Itu bukan layering sehat.

Layer harus punya tanggung jawab nyata.
Kalau tidak,
lebih baik sederhanakan daripada pura-pura arsitektural.

---

## 12. Classic Mistake: Fat Service Layer

Sebaliknya,
service layer juga bisa terlalu gemuk:
- bisnis
- auth
- cache
- vendor API
- DTO mapping
- logging
- retry

semua menumpuk di satu service.

Ini menjadikan service layer
sebagai tempat sampah concern.

Layer tetap ada,
tapi separation of concerns hilang.

---

## 13. Frontend Layering

Layering juga relevan di frontend.

Contoh:
- presentation component
- state management/use case layer
- data access layer
- API client

Kalau komponen UI
langsung tahu semua detail HTTP, mapping, cache, dan domain rule,
layering frontend lemah.

JavaScript frontend modern juga butuh arsitektur,
bukan hanya kumpulan komponen.

---

## 14. Layered Architecture dan Testing

Layering membantu testing jika boundary jelas.

Contoh:
- controller test fokus request/response
- domain test fokus rule bisnis
- repository test fokus persistence

Kalau layer bocor:
- test jadi berat
- banyak mock silang
- sulit isolasi perilaku

Jadi kualitas layering
bisa dilihat dari kualitas dan fokus test.

---

## 15. Layered Architecture dan Framework Lock-in

Kalau domain/application terlalu erat dengan framework,
perubahan framework akan mahal.

Contoh buruk:
- core use case bergantung langsung pada Express request object
- business logic langsung bergantung pada Prisma/ORM specifics

Layering yang sehat
membatasi dampak framework ke area yang tepat.

Tujuannya bukan anti-framework.
Tujuannya anti-ketergantungan berlebihan.

---

## 16. Healthcare Example

Contoh endpoint booking:

### Controller
- parse payload
- cek auth context dasar
- panggil use case booking
- format response

### Use Case / Service
- cek aturan booking
- koordinasi repository
- buat audit log
- enqueue notification record

### Repository
- simpan appointment
- update slot reservation

### Adapter
- kirim event/outbox atau vendor call terpisah

Pembagian seperti ini lebih sehat
daripada semua logic hidup di route handler.

---

## 17. Layer Crossing yang Buruk

Contoh buruk:
- controller langsung query DB
- repository mengembalikan response DTO untuk UI
- domain object tahu cara kirim email

Ini tanda layer boundary bocor.

Begitu ini terjadi,
layered architecture hanya tinggal tampilan.

---

## 18. Latency dan Layering

Kadang orang takut layering
karena merasa "terlalu banyak layer bikin lambat".

Secara umum,
masalah utama biasanya bukan function call antar layer.

Masalah utamanya justru:
- query
- network
- blocking
- desain dependency

Jangan menjadikan performa
sebagai alasan malas menata concern.

Tapi juga jangan bikin indirection tak perlu.

---

## 19. Kapan Layering Layak Disederhanakan?

Untuk aplikasi kecil/sederhana,
layering tidak perlu terlalu formal.

Asal:
- concern utama tetap tidak campur brutal
- boundary cukup jelas

Layering sehat itu proporsional.

Tidak semua service kecil
harus dipecah ekstrem seperti enterprise megacorp.

---

## 20. Anti-Pattern Umum

1. Layer hanya jadi folder, tanpa boundary nyata.
2. Controller terlalu gemuk.
3. Service jadi tempat semua concern.
4. Repository berisi business logic besar.
5. Boilerplate berlebihan tanpa nilai.

---

## 21. Best Practices

- gunakan layering untuk memisahkan concern yang memang berbeda.
- jaga controller/handler tipis.
- tempatkan business logic pada layer yang konsisten.
- cegah detail infrastruktur membanjiri core logic.
- terapkan layering secara proporsional, bukan dogmatis.

---

## 22. Mini Latihan

Latihan:
1. Ambil satu endpoint backend dan petakan concern-nya ke layer yang tepat.
2. Cari satu controller yang terlalu gemuk dan jelaskan kenapa.
3. Cari satu repository yang berisi logic bisnis berlebihan.
4. Rancang layering sederhana untuk fitur booking.
5. Bedakan modular-by-domain dan layering-by-concern dengan contoh.

---

## 23. Jawaban Contoh Ringkas

Controller gemuk biasanya:
- parse request
- rule bisnis
- query DB
- vendor call
- response mapping

Itu terlalu banyak concern.

Repository dengan logic bisnis berlebihan:
- memutuskan policy domain,
  bukan hanya persistence.

Use case booking ideal:
- orchestration di service/use case
- persistence di repository
- external integration lewat adapter

---

## 24. Checklist Kelulusan Topik Layered Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan apa itu layered architecture secara praktis,
- membedakan tanggung jawab layer utama,
- mendeteksi layer boundary yang bocor,
- menerapkan layering tanpa over-engineering,
- memahami bahwa layering sehat harus membantu reasoning, testing, dan perubahan.

---

## 25. Ringkasan Brutal

- Layered architecture yang sehat membuat codebase lebih mudah diikuti.
- Layered architecture yang palsu
  cuma menambah folder dan rasa frustasi.
