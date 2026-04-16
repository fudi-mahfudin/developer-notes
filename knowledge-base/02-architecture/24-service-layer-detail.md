# Service Layer - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu service layer
- kenapa service layer sering dibutuhkan
- apa yang seharusnya ada dan tidak ada di service layer
- hubungan service layer dengan controller, repository, dan domain logic
- anti-pattern implementasi service layer

Banyak codebase backend terlihat berlapis,
tapi layer-nya palsu.

Ada controller,
ada repository,
tapi business flow tetap bocor ke mana-mana.

Di situ service layer biasanya relevan.

---

## 1. Apa Itu Service Layer?

Service layer adalah tempat
untuk orchestration use case aplikasi.

Ia biasanya duduk di antara:
- transport layer/controller
- persistence layer/repository

Service layer menangani:
- application flow
- koordinasi beberapa dependency
- validasi level aplikasi tertentu
- keputusan use case

Ia bukan sekadar tempat memindahkan kode acak.

---

## 2. Kenapa Service Layer Dibutuhkan?

Karena controller seharusnya tipis,
dan repository seharusnya fokus pada akses data.

Kalau tidak ada service layer,
sering terjadi:
- controller menjadi gemuk
- business flow tersebar
- reuse use case sulit
- testing orchestration jadi berantakan

Service layer membantu
memusatkan alur aplikasi.

---

## 3. Tanggung Jawab Service Layer

Umumnya service layer menangani:
- menjalankan use case
- memanggil repository
- memanggil external API
- menangani transaction boundary
- mengorkestrasi policy aplikasi

Ia menjawab:
- apa yang harus terjadi
  saat use case ini dipanggil?

Bukan:
- bagaimana SQL detail dijalankan
- bagaimana HTTP request diparse

---

## 4. Controller Bukan Tempat Bisnis Flow

Controller idealnya fokus pada:
- menerima request
- validasi input awal
- memanggil service
- membentuk response

Kalau controller memuat:
- branching bisnis
- multi-step orchestration
- retry policy
- transaksi

itu tanda service layer kurang sehat atau tidak ada.

---

## 5. Repository Bukan Tempat Use Case

Repository fokus pada:
- load/save data
- query persistence

Kalau repository mulai berisi:
- logic approval
- workflow bisnis
- keputusan policy

boundary rusak.

Repository harus tahu penyimpanan,
bukan seluruh alur aplikasi.

---

## 6. Service Layer vs Domain Model

Tidak semua business logic
harus ada di service layer.

Kalau ada domain model yang kaya,
sebagian invariants
bisa hidup pada entity/value object/domain service.

Service layer lebih cocok untuk:
- orchestration antar objek/dependency
- use case application-level

Kalau semua logika domain dilempar ke service,
service bisa menjadi god layer.

---

## 7. Use Case Orientation

Service layer sehat
sering mengikuti use case,
bukan tabel database.

Contoh lebih baik:
- `AppointmentService.rescheduleAppointment()`

daripada hanya:
- `AppointmentService.update()`

Use case orientation
membuat intent lebih jelas
dan mengurangi generic method yang kabur.

---

## 8. Transaction Boundary

Sering kali service layer adalah tempat alami
untuk mengontrol transaksi.

Contoh:
- update appointment
- simpan audit log
- kirim event/outbox

Semua itu mungkin perlu dianggap
satu unit kerja aplikasi.

Menaruh transaction boundary di service layer
sering lebih jelas daripada menyebarnya
di controller atau repository acak.

---

## 9. External Integration

Saat use case menyentuh:
- payment gateway
- email service
- notification service
- third-party API

service layer sering jadi tempat orchestration-nya.

Tapi tetap hati-hati:
- abstraction integration sebaiknya dipisah
- service layer mengorkestrasi,
  bukan menulis detail HTTP mentah panjang lebar

---

## 10. Error Handling

Service layer biasanya tempat yang baik
untuk mengubah error teknis
menjadi error aplikasi yang lebih bermakna.

Contoh:
- repository tidak menemukan data
- external API timeout
- policy bisnis gagal

Service layer dapat menerjemahkan itu
ke kontrak yang lebih stabil untuk layer atas.

---

## 11. Validation di Mana?

Ada beberapa jenis validation:
- request shape validation
- domain invariant validation
- use case/policy validation

Request shape:
- biasanya di controller/input layer

Invariant domain:
- di domain object/domain rule

Use case validation:
- sering masuk akal di service layer

Kalau semua validation ditumpuk di satu tempat,
layering jadi tidak jujur.

---

## 12. Healthcare Example

Use case:
- reschedule appointment

Service layer mungkin:
1. memuat appointment
2. cek apakah status masih bisa di-reschedule
3. cek slot dokter tersedia
4. update jadwal
5. simpan audit log
6. publish reminder update

Controller tidak seharusnya memegang flow ini.
Repository juga tidak.

Ini wilayah service layer.

---

## 13. Service Layer yang Terlalu Tipis

Kadang ada service layer
yang hanya pass-through:
- controller -> service -> repository

tanpa menambah nilai.

Kalau service tidak mengorkestrasi apa-apa,
bisa jadi layer itu belum perlu
atau desain use case belum jelas.

Jangan menambah layer
hanya demi checklist arsitektur.

---

## 14. Service Layer yang Terlalu Gemuk

Ekstrem lain:
- semua logika dilempar ke service
- service ribuan baris
- method terlalu banyak
- banyak branching domain bercampur

Itu juga jelek.

Service layer harus menjaga fokus pada use case,
bukan menjadi tempat sampah business logic.

---

## 15. Naming Matters

Nama method service
harus mencerminkan intent.

Lebih baik:
- `approveClaim`
- `rescheduleAppointment`
- `assignDoctor`

Daripada:
- `process`
- `handle`
- `updateData`

Nama kabur
menandakan desain kabur.

---

## 16. Testability

Service layer yang sehat
mudah diuji pada level use case.

Kamu bisa memverifikasi:
- dependency dipanggil dengan benar
- policy dijalankan
- branch error ditangani

Tanpa perlu menyiapkan HTTP end-to-end penuh
untuk setiap skenario bisnis.

Ini salah satu manfaat utamanya.

---

## 17. Anti-Pattern Umum

1. Controller menyimpan orchestration bisnis utama.
2. Repository berisi logic workflow.
3. Service hanya pass-through tanpa nilai.
4. Semua domain logic dilempar ke service sampai jadi god layer.
5. Method service generic dan tidak merepresentasikan use case.

---

## 18. Best Practices

- gunakan service layer untuk orchestration use case yang nyata.
- jaga controller tetap tipis.
- jaga repository tetap fokus pada persistence.
- pikirkan transaction boundary di service layer.
- namai method berdasarkan intent bisnis.

---

## 19. Pertanyaan Desain Penting

Saat menambah service baru, tanya:
1. Use case apa yang sedang diwakili?
2. Apakah logic ini orchestration aplikasi atau detail persistence?
3. Siapa yang seharusnya memiliki transaction boundary?
4. Apakah service ini menambah clarity atau hanya lapisan ekstra?
5. Apakah sebagian logic seharusnya hidup di domain object?

---

## 20. Mini Latihan

Latihan:
1. Ambil controller gemuk dan pindahkan flow utamanya ke service layer.
2. Identifikasi repository yang memuat business flow.
3. Refactor method generic menjadi use-case-oriented methods.
4. Tentukan transaction boundary untuk satu workflow penting.
5. Bedakan validation mana milik input, service, atau domain.

---

## 21. Jawaban Contoh Ringkas

Controller:
- parse request
- call service
- return response

Service:
- orchestration use case
- policy application
- transaction

Repository:
- persistence access

---

## 22. Checklist Kelulusan Topik Service Layer

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan peran service layer secara jujur,
- membedakannya dari controller dan repository,
- menempatkan orchestration pada layer yang tepat,
- menghindari service layer yang terlalu tipis atau terlalu gemuk,
- merancang method service berdasarkan use case nyata.

---

## 23. Ringkasan Brutal

- Service layer bukan dekorasi.
- Kalau controller tetap gemuk,
  service layer-mu palsu.
- Kalau semua logic dibuang ke service,
  kamu hanya memindahkan kekacauan,
  bukan menyelesaikannya.
