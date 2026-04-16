# Modular Design - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu modular design
- kenapa modularity penting
- bagaimana membagi sistem ke modul yang sehat
- kesalahan umum saat mendesain modul
- bagaimana modular design memengaruhi maintainability, testing, dan scale tim

Kalau senior JavaScript developer tidak paham modular design,
dia mungkin bisa membangun fitur,
tapi codebase yang dihasilkan akan cepat membusuk.

---

## 1. Apa Itu Modular Design?

Modular design adalah pendekatan
untuk membagi sistem menjadi bagian-bagian yang:
- punya tanggung jawab jelas
- bisa dipahami secara terpisah
- punya boundary yang tegas
- berinteraksi lewat kontrak yang jelas

Sederhananya:
- sistem besar dipecah menjadi unit lebih kecil
  yang masih masuk akal secara domain dan teknis.

Tujuannya bukan memecah sebanyak mungkin.
Tujuannya membuat sistem lebih sehat.

---

## 2. Kenapa Modular Design Penting?

Karena software cenderung membesar.

Begitu codebase tumbuh:
- fitur bertambah
- tim bertambah
- dependency bertambah
- perubahan makin sering

Tanpa modular design,
hasilnya:
- file/folder acak
- dependency saling silang
- logic tersebar
- perubahan kecil merusak banyak area
- onboarding makin lambat

Modular design adalah salah satu senjata utama
untuk mencegah kekacauan ini.

---

## 3. Modular Bukan Berarti Banyak Folder

Ini kesalahan klasik.

Banyak orang mengira codebase modular jika:
- foldernya banyak
- nama filenya rapi
- ada banyak lapisan

Padahal belum tentu.

Codebase bisa kelihatan rapi,
tapi kalau:
- semua modul saling impor sembarangan
- tanggung jawab modul kabur
- logic bisnis menyebar ke mana-mana

maka itu hanya rapih di permukaan.

Modular design dinilai dari boundary dan tanggung jawab,
bukan kosmetik folder.

---

## 4. Tanda Sistem Tidak Modular

Beberapa gejala umum:
- satu file/service mengerjakan terlalu banyak hal
- perubahan kecil memengaruhi banyak modul
- sulit tahu logic bisnis tinggal di mana
- testing susah karena dependency bercampur
- util/helper jadi tempat sampah
- module A tahu terlalu banyak soal module B

Kalau gejala ini sering muncul,
modularity codebase kemungkinan lemah.

---

## 5. Tujuan Modular Design

Tujuan utamanya:
- memudahkan perubahan
- memudahkan pemahaman
- memudahkan testing
- memudahkan ownership
- mengurangi coupling yang tidak perlu

Tujuan modular design bukan:
- memuaskan ego arsitektur
- membuat diagram cantik
- memaksakan abstraksi berlebihan

Kalau modularity malah membuat perubahan makin sulit,
berarti desainnya gagal.

---

## 6. Konsep Inti: Tanggung Jawab yang Jelas

Setiap modul idealnya punya alasan keberadaan yang jelas.

Contoh:
- `auth` menangani autentikasi
- `appointment` menangani workflow booking
- `notification` menangani pengiriman pesan

Kalau satu modul:
- validasi user
- kirim email
- hitung billing
- update audit

semuanya sekaligus,
itu tanda boundary buruk.

Modul yang sehat punya fokus.

---

## 7. Cohesion

Cohesion = seberapa erat isi di dalam modul
memiliki tujuan yang sama.

Cohesion tinggi berarti:
- isi modul memang saling berkaitan
- reason to change-nya mirip

Contoh baik:
- semua logic appointment scheduling ada dalam modul yang sama

Contoh buruk:
- modul `utils` campur:
  - format tanggal
  - auth helper
  - payment calculator
  - API retry

Itu cohesion rendah.

Modul dengan cohesion rendah
cepat menjadi tempat sampah.

---

## 8. Coupling

Coupling = seberapa kuat modul bergantung pada modul lain.

Coupling rendah biasanya lebih sehat:
- modul bisa berubah tanpa mematahkan banyak bagian lain
- testing lebih mudah
- reasoning lebih sederhana

Coupling tinggi berbahaya jika:
- terlalu banyak asumsi tersembunyi
- module A tahu detail internal module B
- perubahan satu modul memicu efek domino

Targetnya bukan coupling nol.
Targetnya coupling yang masuk akal dan terkendali.

---

## 9. Modular Design dan Separation of Concerns

Modular design sangat terkait dengan separation of concerns.

Artinya:
- concern berbeda dipisahkan dengan sengaja

Contoh concern:
- domain logic
- persistence
- presentation
- external integration
- caching
- logging

Kalau concern ini tercampur liar,
modularitas akan cepat rusak.

---

## 10. Boundary Modul

Boundary modul menjawab:
- mana yang boleh diakses dari luar?
- mana yang private/internal?
- lewat interface/contract apa modul digunakan?

Boundary ini penting.

Kalau semua file bebas saling impor,
lama-lama tidak ada boundary nyata.

Di JavaScript/TypeScript,
boundary sering ditegakkan lewat:
- struktur folder
- export surface yang jelas
- lint rules
- code review discipline

Tanpa guardrail,
boundary akan bocor.

---

## 11. Public API Modul

Modul sehat idealnya punya public API kecil dan jelas.

Contoh:
- `createAppointment()`
- `cancelAppointment()`
- `sendReminder()`

Bukan:
- puluhan helper internal ikut diexpose ke seluruh codebase.

Semakin kecil permukaan public API,
semakin mudah modul dipahami dan diubah.

Kalau semua internal keluar ke publik,
coupling meningkat dan refactor jadi sakit.

---

## 12. Internal Detail Harus Tersembunyi

Modul lain seharusnya tidak perlu tahu:
- struktur internal file
- detail query
- detail vendor API
- detail caching internal

Mereka hanya perlu tahu kontraknya.

Kalau terlalu banyak detail internal bocor,
artinya boundary modul lemah.

Inilah kenapa abstraction yang tepat itu berguna:
- bukan untuk gaya-gayaan,
- tapi untuk melindungi area perubahan.

---

## 13. Modular Design vs Layered Design

Sering orang mencampur dua hal ini.

Layered design:
- membagi sistem berdasarkan lapisan
  seperti controller/service/repository

Modular design:
- membagi sistem berdasarkan unit tanggung jawab/domain

Kamu bisa punya sistem yang:
- layered tapi tidak modular,
  misalnya semua logic bisnis tersebar di service layer besar

Atau:
- modular dan layered sekaligus,
  misalnya modul `appointment` punya controller/service/repository sendiri

Ini perbedaan penting.

---

## 14. Modul Berdasarkan Domain Lebih Sehat dari Berdasarkan Teknologi Saja

Contoh pembagian berdasarkan teknologi:
- `/controllers`
- `/services`
- `/repositories`
- `/utils`

Ini bisa jalan untuk kecil,
tapi saat besar sering sulit menelusuri domain.

Alternatif yang sering lebih sehat:
- `/appointment`
- `/patient`
- `/billing`
- `/notification`

Lalu di dalam tiap modul ada layer teknisnya.

Pendekatan domain-oriented
sering lebih dekat ke cara bisnis berpikir
dan lebih mudah dikelola saat scale.

---

## 15. Monolith Bisa Modular

Kesalahan besar:
- mengira modularity hanya milik microservices

Objektifnya:
- monolith yang modular sering jauh lebih sehat
  daripada microservices yang boundary-nya berantakan

Modular monolith:
- satu deployment
- tapi boundary internal kuat
- modul punya ownership jelas

Ini sering menjadi pilihan jauh lebih rasional
daripada buru-buru pecah service.

---

## 16. Microservices Tanpa Modular Design = Bencana Terdistribusi

Kalau modul internal saja berantakan,
memecah jadi microservices
sering hanya memindahkan kekacauan ke jaringan.

Hasilnya:
- coupling tetap tinggi
- tapi sekarang lewat HTTP/message broker
- debugging lebih sulit
- failure mode lebih banyak

Senior yang matang paham:
- modular design harus kuat dulu,
  baru bicara distribusi.

---

## 17. Example: Modul Appointment

Modul `appointment` yang sehat bisa mencakup:
- entity/model appointment
- booking rules
- cancellation rules
- schedule validation
- repository untuk appointment
- public API use case

Yang tidak seharusnya berada di sini:
- logic payment penuh
- logic auth penuh
- utility generik tak terkait domain

Jika boundary seperti ini dijaga,
modul jadi lebih mudah dipahami.

---

## 18. Example: Boundary Bocor

Misal modul `appointment` langsung:
- query tabel payment
- kirim email vendor
- format UI response khusus frontend
- manipulasi auth session

Ini gejala boundary bocor.

Dampaknya:
- modul jadi besar
- testing makin sulit
- perubahan kecil di payment/vendor/UI
  bisa merusak booking flow

Modul semacam ini cepat membusuk.

---

## 19. Dependency Direction

Pertanyaan penting:
- siapa boleh bergantung ke siapa?

Dependency direction yang sehat
harus dipikirkan,
bukan dibiarkan tumbuh liar.

Contoh:
- modul domain tidak seharusnya bergantung pada detail framework UI
- use case tidak seharusnya tergantung langsung vendor SDK

Kalau dependency direction kacau,
refactor jadi mahal.

---

## 20. Stable Core, Unstable Edges

Prinsip yang berguna:
- domain core cenderung lebih stabil
- integrasi/framework/UI lebih sering berubah

Maka desain yang baik:
- lindungi core dari detail tepi

Contoh:
- logic booking inti tidak seharusnya sangat bergantung
  pada Express, Next.js, atau vendor notifikasi tertentu

Kalau core terlalu terikat ke edge,
setiap perubahan teknologi akan menyakitkan.

---

## 21. Testing dan Modular Design

Modul yang sehat lebih mudah diuji karena:
- dependency lebih jelas
- scope perilaku lebih kecil
- side effect lebih terkontrol

Modul yang berantakan:
- test setup berat
- mock di mana-mana
- sulit isolasi perilaku

Kalau testing selalu terasa menyakitkan,
sering itu gejala modular design buruk.

---

## 22. Refactoring dan Modular Design

Tujuan besar modularity adalah
mempermudah perubahan.

Pertanyaan saat menilai modularity:
- seberapa mudah saya mengubah aturan booking
  tanpa menyentuh 10 file acak?
- seberapa mudah ganti vendor notifikasi?
- seberapa mudah menambah rule baru?

Kalau jawabannya sulit,
modular design belum sehat.

---

## 23. Modul Terlalu Besar vs Terlalu Kecil

Dua ekstrem sama-sama buruk.

Terlalu besar:
- god object / god module
- sulit dipahami
- perubahan sulit diisolasi

Terlalu kecil:
- fragmentasi berlebihan
- navigation sulit
- abstraction noise
- terlalu banyak hop untuk paham flow

Targetnya bukan jumlah modul maksimal.
Targetnya modul dengan ukuran dan boundary yang masuk akal.

---

## 24. Over-Engineering Warning

Modular design bisa disalahgunakan.

Contoh:
- bikin interface untuk semua hal
- file terlalu banyak untuk logic kecil
- abstraksi dibuat sebelum ada kebutuhan

Ini menghasilkan sistem yang:
- formal di atas kertas
- melelahkan saat dikerjakan

Modular design yang baik itu pragmatis,
bukan teatrikal.

---

## 25. Refactor Smell yang Harus Diperhatikan

Beberapa tanda perlu refactor modularity:
- cyclic dependency
- util module makin gemuk
- perubahan satu fitur menyentuh terlalu banyak area
- naming modul makin kabur
- team ownership makin tidak jelas

Kalau smell ini muncul terus,
jangan ditunda terlalu lama.

---

## 26. Ownership dan Modul

Modul sehat mempermudah ownership tim.

Contoh:
- tim booking punya boundary jelas
- tim payment punya area jelas
- tim notification punya area jelas

Kalau boundary modul kabur,
ownership tim juga kabur.

Hasilnya:
- tanggung jawab tumpang tindih
- review lebih sulit
- incident lebih membingungkan

---

## 27. Modular Design dan Onboarding

Codebase modular yang baik
membuat engineer baru lebih cepat paham:
- fitur ini tinggal di mana
- alur data melewati modul apa
- siapa pemilik area tertentu

Codebase tidak modular
membuat onboarding seperti berburu hantu.

Engineer baru harus menebak-nebak
logic mana tinggal di mana.

Itu mahal untuk tim.

---

## 28. JavaScript / TypeScript Specific Concerns

Di ekosistem JS/TS,
modular design sering rusak karena:
- file util liar
- barrel export berlebihan
- alias import membocorkan internal module
- terlalu banyak shared helper tanpa domain ownership

Boundary harus dijaga dengan disiplin:
- export surface jelas
- hindari import silang sembarangan
- review dependency direction

Tooling bisa bantu,
tapi budaya review tetap kunci.

---

## 29. Anti-Pattern Umum

1. `utils` menjadi tempat sampah.
2. Modul domain tahu terlalu banyak detail infrastruktur.
3. Semua hal dipecah terlalu kecil tanpa alasan.
4. Layer banyak tapi tanggung jawab tetap kabur.
5. Boundary modul bocor lewat import bebas.

Kalau anti-pattern ini muncul,
codebase akan mahal dirawat.

---

## 30. Best Practices

- bagi modul berdasarkan tanggung jawab/domain yang jelas.
- jaga public API modul tetap kecil.
- sembunyikan detail internal.
- batasi coupling dan jaga cohesion tinggi.
- review boundary modul secara berkala saat sistem berkembang.

---

## 31. Mini Latihan

Latihan:
1. Ambil satu fitur besar, lalu pecah menjadi 3-5 modul yang masuk akal.
2. Tentukan public API tiap modul.
3. Identifikasi dependency yang boleh dan tidak boleh.
4. Cari contoh `utils` yang seharusnya dipindah ke domain tertentu.
5. Jelaskan apakah codebase kamu sekarang lebih technology-oriented atau domain-oriented.

---

## 32. Jawaban Contoh Ringkas

Contoh pemecahan fitur booking:
- `appointment-core`
- `schedule-validation`
- `notification`
- `audit`

Public API `appointment-core`:
- `createAppointment()`
- `cancelAppointment()`
- `rescheduleAppointment()`

Yang tidak boleh:
- modul lain mengakses helper internal booking secara bebas.

---

## 33. Checklist Kelulusan Topik Modular Design

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan apa itu modular design tanpa definisi kabur,
- membedakan cohesion dan coupling,
- mendeteksi boundary modul yang bocor,
- memecah sistem berdasarkan tanggung jawab yang masuk akal,
- menilai apakah sebuah codebase benar-benar modular atau hanya terlihat rapi.

---

## 34. Ringkasan Brutal

- Modular design yang buruk membuat setiap perubahan terasa mahal.
- Modular design yang baik tidak membuat sistem terlihat lebih pintar.
  Ia membuat sistem lebih waras.
