# Separation of Concerns - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu separation of concerns
- kenapa pemisahan concern penting
- bagaimana menerapkannya di codebase JavaScript
- contoh concern yang sering tercampur
- hubungan separation of concerns dengan maintainability dan architecture quality

Kalau modular design adalah soal membagi sistem ke unit yang waras,
separation of concerns adalah soal
memastikan jenis tanggung jawab yang berbeda
tidak saling menumpuk tanpa kontrol.

---

## 1. Apa Itu Separation of Concerns?

Separation of concerns berarti:
- concern yang berbeda dipisahkan secara sadar
- setiap bagian menangani jenis masalah yang relatif fokus
- perubahan pada satu concern
  tidak memaksa perubahan di banyak concern lain

Concern di sini bisa berarti:
- business logic
- persistence
- presentation
- caching
- validation
- auth
- external integration
- observability

Tujuannya bukan membuat semua hal terpisah ekstrem.
Tujuannya mengurangi kekacauan.

---

## 2. Kenapa Ini Penting?

Karena software cepat sekali tercampur.

Tanpa separation of concerns:
- controller berisi query SQL, validasi, dan format UI sekaligus
- service bisnis memanggil vendor langsung dan juga mengurus auth session
- komponen frontend berisi rendering, fetch, mapping, dan state mutation campur aduk

Saat concern tercampur,
setiap perubahan jadi lebih mahal.

Hasilnya:
- sulit testing
- sulit review
- sulit refactor
- bug mudah menyebar

---

## 3. Concern Itu Apa Sebenarnya?

Concern adalah area perhatian atau tanggung jawab.

Contoh konkret:
- bagaimana data divalidasi
- bagaimana data disimpan
- bagaimana data ditampilkan
- bagaimana error dilog
- bagaimana user diotorisasi

Pemisahan concern berarti
masing-masing area ini punya tempat yang relatif jelas.

Kalau semua concern hidup di satu tempat,
kode jadi berat secara mental.

---

## 4. Pemisahan Concern Bukan Tujuan Kosmetik

Ini bukan soal:
- file terlihat rapi
- layer banyak
- pattern terdengar keren

Pemisahan concern yang sehat harus membuat:
- perubahan lebih mudah
- reasoning lebih mudah
- testing lebih mudah
- dependency lebih terkendali

Kalau hanya menambah boilerplate
tapi problem tetap campur,
desainnya gagal.

---

## 5. Contoh Concern yang Sering Tercampur

Contoh umum di backend:
- controller melakukan parsing request
- validasi bisnis
- query database
- kirim email
- logging
- format response

Semua itu di satu fungsi besar.

Contoh umum di frontend:
- komponen render UI
- fetch API
- transform data
- hitung rules bisnis
- simpan analytics event

Semua tercampur di satu component file.

Ini gejala separation of concerns yang lemah.

---

## 6. Separation of Concerns Bukan Hanya Layering

Sering orang berpikir:
- sudah ada controller/service/repository,
  berarti concern sudah terpisah

Belum tentu.

Kalau service:
- tetap campur business logic, vendor call, permission, dan DTO formatting

maka concern masih tercampur.

Layering bisa membantu,
tapi tidak otomatis menyelesaikan semuanya.

Concern harus dipikirkan secara eksplisit.

---

## 7. Business Logic Harus Punya Tempat yang Jelas

Salah satu concern paling penting adalah business logic.

Contoh:
- rule booking hanya boleh satu slot aktif
- pembatalan kurang dari 1 jam dihitung late cancel
- pasien tertentu butuh consent tambahan

Kalau rule ini tersebar di:
- controller
- UI
- worker
- helper acak

maka sistem jadi rapuh.

Business logic harus punya rumah yang jelas.

---

## 8. Presentation Concern

Presentation concern berhubungan dengan:
- bentuk response
- tampilan UI
- formatting user-facing
- penamaan field untuk client

Ini tidak seharusnya mendikte domain logic.

Contoh buruk:
- domain model diubah hanya demi memuaskan satu layar UI

Yang lebih sehat:
- pisahkan domain representation
- dan presentation mapping jika memang perlu

Kalau tidak,
core logic terlalu bergantung pada tampilan.

---

## 9. Persistence Concern

Persistence concern meliputi:
- query
- ORM mapping
- struktur tabel
- transaksi lokal

Ini penting,
tapi tidak boleh menelan business logic.

Contoh buruk:
- semua aturan bisnis hanya tersembunyi di query repository
- service lain jadi tidak jelas kenapa keputusan dibuat

Persistence harus melayani domain,
bukan menjadi tempat semua logika diam-diam.

---

## 10. Validation Concern

Validation juga sering tercampur.

Ada beberapa jenis validasi:
- shape validation
- domain validation
- permission validation

Contoh:
- request body harus punya field tertentu
- user harus punya role tertentu
- slot dokter harus tersedia

Tiga hal ini berbeda.

Kalau semua dianggap "validasi" lalu dicampur di satu blok,
reasoning cepat kacau.

---

## 11. Infrastructure Concern

Contoh concern infrastruktur:
- HTTP framework
- queue SDK
- vendor email
- storage client
- observability agent

Concern ini sering berubah lebih cepat
dibanding domain core.

Karena itu sebaiknya tidak terlalu bocor
ke logic inti.

Kalau core sangat bergantung pada detail infrastruktur,
setiap pergantian tool/vendor jadi mahal.

---

## 12. Cross-Cutting Concerns

Beberapa concern memang melintang:
- logging
- metrics
- tracing
- auth
- caching
- error handling

Ini disebut cross-cutting concerns.

Tantangannya:
- concern ini perlu ada di banyak tempat,
  tapi tidak boleh membuat semua file penuh noise

Arsitektur yang sehat
harus memberi tempat yang masuk akal
untuk concern lintas ini.

---

## 13. SoC di Frontend

Di frontend JavaScript,
separation of concerns sering kelihatan pada:
- presentational component
- stateful/container logic
- data fetching layer
- UI mapping
- domain logic ringan

Contoh buruk:
- satu React component 800 baris
- render, fetch, local cache, permission, analytics, dan business rule semua campur

Ini tidak sustainable.

Frontend juga butuh architecture,
bukan sekadar component numpuk.

---

## 14. SoC di Backend

Di backend,
SoC sering terkait:
- request handling
- use case / service logic
- persistence
- integration client
- event publishing

Contoh sehat:
- controller parse request
- service/use case jalankan rule bisnis
- repository urus persistence
- adapter/client urus vendor eksternal

Ini bukan aturan suci,
tapi pattern ini membantu menjaga concern tetap terbaca.

---

## 15. SoC di Node.js Service

Dalam Node.js service,
area yang sering tercampur:
- Express/Fastify route
- validation
- auth check
- orchestration
- DB access
- external API call

Kalau semua ditulis di handler route,
maintainability cepat ambruk.

Handler route sebaiknya tipis.
Concern utama dipindah ke layer yang lebih tepat.

---

## 16. SoC dan Testability

Semakin concern tercampur,
semakin sulit test.

Kenapa?
- satu function punya terlalu banyak dependency
- perlu mock separuh dunia
- sulit tahu mana yang sedang diuji

Kalau concern dipisah dengan sehat,
test bisa lebih fokus:
- test domain rule
- test repository
- test adapter vendor
- test controller behavior

SoC yang baik sangat membantu test design.

---

## 17. SoC dan Team Collaboration

Pemisahan concern juga mempermudah kerja tim.

Contoh:
- orang A fokus domain logic
- orang B fokus API integration
- orang C fokus UI presentation

Kalau concern tercampur,
perubahan mereka mudah tabrakan.

SoC yang baik
mengurangi friksi kolaborasi dan review.

---

## 18. Jangan Pisahkan Secara Buta

SoC bisa disalahgunakan menjadi:
- file kecil-kecil tak bermakna
- indirection berlebihan
- abstraction sebelum perlu

Contoh:
- satu function sederhana dipecah ke 7 file
- developer perlu membuka 10 file hanya untuk paham alur dasar

Itu bukan separation of concerns yang sehat.
Itu fragmentasi.

Concern harus dipisah jika:
- memang berbeda tanggung jawab,
- bukan hanya demi terlihat arsitektural.

---

## 19. Rule of Change

Cara praktis mengecek concern:
- bagian mana yang berubah karena alasan yang sama?

Kalau dua hal berubah karena alasan sangat berbeda,
kemungkinan mereka seharusnya tidak tinggal bersama.

Contoh:
- perubahan vendor SMS
- perubahan rule bisnis booking

Kalau dua hal ini hidup di class/file yang sama,
separation of concerns kemungkinan buruk.

---

## 20. Example: Booking Flow

Flow booking mungkin punya concern:
- parse request
- validate request shape
- authorize actor
- validate business rule
- persist appointment
- publish event
- build response DTO

Semua concern ini ada dalam satu flow,
tapi tidak harus bercampur dalam satu blok kode besar.

Pemisahan yang sehat
membuat flow tetap jelas
tanpa menjadikannya spaghetti.

---

## 21. Hubungan dengan Clean Architecture / Hexagonal

Banyak architecture style formal
sebenarnya memperkuat separation of concerns.

Contoh:
- clean architecture memisahkan domain dari framework
- hexagonal memisahkan core dari adapters

Tapi ingat:
- kamu tidak perlu label formal
  untuk mulai menerapkan SoC yang baik

Prinsipnya lebih penting daripada istilahnya.

---

## 22. Code Smells yang Menandakan SoC Buruk

Beberapa smell:
- god service
- fat controller
- util dumping ground
- UI component terlalu pintar
- repository berisi logic bisnis kompleks
- domain layer tahu detail vendor SDK

Kalau smell-smell ini ada,
itu sinyal untuk refactor boundary concern.

---

## 23. Anti-Pattern Umum

1. Semua logic ditaruh di controller/route handler.
2. Semua helper dilempar ke `utils`.
3. Business logic tersebar di UI, API, dan DB sekaligus.
4. External integration detail bocor ke mana-mana.
5. SoC diubah jadi over-abstraction tanpa nilai nyata.

---

## 24. Best Practices

- bedakan concern utama sejak awal.
- tempatkan business logic di lokasi yang konsisten.
- jaga infrastruktur tidak membanjiri core domain.
- kurangi noise cross-cutting concern dengan pattern yang sehat.
- refactor saat boundary concern mulai kabur.

---

## 25. Mini Latihan

Latihan:
1. Ambil satu endpoint Node.js, lalu identifikasi concern yang tercampur.
2. Pecah concern itu ke bagian yang lebih sehat.
3. Ambil satu komponen frontend besar, lalu identifikasi concern presentational vs data logic.
4. Cari contoh cross-cutting concern di projectmu.
5. Jelaskan kenapa `utils` sering menjadi kuburan concern.

---

## 26. Jawaban Contoh Ringkas

Contoh endpoint yang kacau:
- parse request
- cek auth
- validasi payload
- rule bisnis
- query DB
- kirim vendor API
- bentuk response

Pemisahan yang lebih sehat:
- handler tipis
- service/use case untuk orchestration
- repository untuk persistence
- adapter untuk vendor

---

## 27. Checklist Kelulusan Topik Separation of Concerns

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan apa itu concern secara konkret,
- membedakan beberapa jenis concern utama,
- mendeteksi concern yang tercampur di codebase,
- memecah concern tanpa over-fragmentation,
- menilai kualitas pemisahan concern berdasarkan kemudahan perubahan dan reasoning.

---

## 28. Ringkasan Brutal

- Separation of concerns yang buruk membuat software terasa "lengket":
  semua menempel ke semua.
- Saat itu terjadi,
  setiap perubahan jadi lebih mahal dari yang seharusnya.
