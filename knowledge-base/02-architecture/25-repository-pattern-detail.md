# Repository Pattern - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu repository pattern
- kapan repository pattern berguna
- apa tanggung jawab repository
- apa yang seharusnya tidak dimasukkan ke repository
- trade-off repository pattern di aplikasi modern

Repository pattern sering dipakai
tanpa benar-benar dipahami.

Hasilnya:
- wrapper tipis di atas ORM
- interface berlebihan
- abstraction tanpa manfaat

Padahal repository bisa sangat berguna
jika dipakai untuk problem yang tepat.

---

## 1. Apa Itu Repository Pattern?

Repository adalah abstraction
untuk akses dan penyimpanan data domain.

Ia memberi cara bagi application layer
untuk:
- mengambil entity/data
- menyimpan perubahan

tanpa terlalu tahu detail persistence.

Repository idealnya mewakili
bahasa domain,
bukan sekadar API database mentah.

---

## 2. Kenapa Repository Dipakai?

Beberapa alasan:
- memisahkan use case dari detail persistence
- mempermudah test pada layer aplikasi
- menjaga query logic tetap terkonsentrasi
- memberi surface yang lebih domain-friendly

Tapi ini hanya berguna
jika repository benar-benar menambah boundary yang jelas.

Kalau tidak,
ia menjadi boilerplate.

---

## 3. Tanggung Jawab Repository

Repository biasanya menangani:
- load entity by id/criteria
- save/update entity
- query domain-relevant data access

Repository bukan tempat untuk:
- parsing HTTP
- workflow bisnis end-to-end
- side effect eksternal

Fokus utamanya:
- persistence interaction
  dalam bahasa yang masuk akal untuk domain/aplikasi.

---

## 4. Repository vs ORM

ORM/tool database
bukan repository pattern itu sendiri.

ORM memberi mekanisme data access.

Repository adalah layer desain
yang memutuskan:
- query apa yang diekspos
- contract apa yang diberikan ke application layer

Kalau application layer langsung tersebar
memakai ORM mentah ke mana-mana,
boundary persistence menjadi lemah.

---

## 5. Wrapper Tipis Anti-Pattern

Contoh buruk:
- `findById` -> langsung panggil ORM `findUnique`
- `create` -> langsung panggil ORM `create`
- tanpa tambahan boundary berarti

Kalau repository hanya menyalin 1:1 API ORM,
nilainya sering kecil.

Repository seharusnya membantu
mengekspresikan kebutuhan aplikasi/domain,
bukan menambah lapisan kosong.

---

## 6. Query Bahasa Domain

Repository yang baik
sering punya method yang berbicara dalam istilah domain.

Contoh:
- `findActiveAppointmentsForDoctor`
- `findPendingClaimsByPatientId`
- `saveAppointment`

Ini lebih bernilai
daripada method generik samar
yang memaksa application layer
merakit sendiri semuanya berulang.

---

## 7. Batasan Penting

Repository sebaiknya tidak memuat:
- business rule approval
- email sending
- event publishing orchestration
- auth decision

Begitu repository tahu terlalu banyak
tentang use case,
ia bukan lagi boundary persistence.

Ia berubah jadi layer campur aduk.

---

## 8. Read Model vs Aggregate Access

Tidak semua query
harus dipaksa melalui satu jenis repository yang sama.

Kadang:
- aggregate write model
  butuh repository yang lebih kaya boundary

Sementara:
- reporting/read model
  bisa punya query service yang berbeda

Memaksa satu repository pattern
untuk semua jenis data access
sering tidak sehat.

---

## 9. Repository pada CRUD Sederhana

Untuk aplikasi CRUD sederhana,
repository kadang terasa seperti overkill.

Kalau use case sederhana,
ORM langsung pada service tertentu
mungkin cukup pragmatis.

Jangan pakai repository
hanya karena pernah baca "arsitektur bersih".

Pilih saat boundary-nya memberi manfaat nyata.

---

## 10. Repository pada Domain yang Tumbuh

Saat domain makin kompleks,
repository sering makin bernilai.

Karena:
- query penting makin banyak
- persistence concern makin bercabang
- application layer butuh kontrak yang stabil

Repository dapat menjadi titik kontrol
untuk akses data yang sehat.

---

## 11. Transaction dan Unit of Work

Repository sering terkait dengan:
- transaction
- unit of work

Tapi transaction boundary
tidak selalu milik repository.

Sering lebih sehat:
- service/use case mengatur transaction
- repository menjalankan operasi persistence di dalamnya

Kalau repository diam-diam mengelola segalanya sendiri,
alur unit kerja bisa kabur.

---

## 12. Error Translation

Repository bisa membantu
menerjemahkan error persistence teknis
menjadi error yang lebih stabil untuk layer atas.

Contoh:
- unique constraint violation
- record not found
- timeout database tertentu

Tapi jangan berlebihan.

Tujuan utamanya:
- mengurangi kebocoran detail vendor persistence

---

## 13. Testing Perspective

Repository abstraction kadang membantu test
karena service layer dapat bergantung
pada kontrak yang lebih kecil.

Tapi jangan tertipu:
- mocking repository berlebihan juga bisa memberi tes palsu

Repository pattern membantu testability,
tapi tidak otomatis berarti semua tes jadi bagus.

Tetap butuh integration test
untuk query penting.

---

## 14. Healthcare Example

Contoh repository:
- `AppointmentRepository`
- `PatientRepository`

Method yang sehat:
- `findById`
- `findUpcomingByDoctorId`
- `save`
- `existsConflictForDoctorSchedule`

Method yang kurang sehat:
- `approveInsuranceAndNotifyAndAudit`

Karena itu bukan lagi concern persistence.

---

## 15. Specification Explosion

Sebagian codebase
punya repository dengan ratusan method query.

Ini tanda lain masalah boundary.

Kalau repository jadi katalog semua kemungkinan query,
ia akan sulit dirawat.

Mungkin perlu dipisah:
- write repository
- read query service
- reporting access layer

Satu abstraction tidak harus memikul semua kebutuhan.

---

## 16. Interface Segregation

Tidak semua consumer
butuh semua operasi repository.

Kadang lebih sehat
bergantung pada kontrak yang lebih kecil:
- read-only contract
- write contract
- feature-specific query port

Ini membantu
mencegah coupling berlebihan ke "super repository".

---

## 17. Anti-Pattern Umum

1. Repository hanya wrapper 1:1 di atas ORM.
2. Repository berisi business workflow.
3. Satu repository dipaksa melayani semua jenis query.
4. Semua hal dimock tanpa integration test query penting.
5. Menggunakan repository pattern untuk CRUD kecil tanpa manfaat nyata.

---

## 18. Best Practices

- gunakan repository saat ingin menjaga boundary persistence tetap sehat.
- buat method yang berbicara dalam bahasa domain/use case.
- jangan campur persistence dengan orchestration bisnis.
- pertimbangkan pemisahan read/write bila kebutuhan berbeda jauh.
- jaga kontrak repository tetap fokus dan bermakna.

---

## 19. Pertanyaan Desain Penting

Sebelum membuat repository, tanya:
1. Boundary apa yang ingin dijaga?
2. Apakah ini benar-benar lebih baik daripada ORM langsung?
3. Query mana yang domain-relevant dan stabil?
4. Apakah read dan write punya kebutuhan berbeda?
5. Apakah abstraction ini mengurangi coupling atau hanya menambah file?

---

## 20. Mini Latihan

Latihan:
1. Evaluasi satu repository yang sekarang hanya wrapper tipis.
2. Ubah method generik menjadi domain-oriented query.
3. Pisahkan logic bisnis yang bocor ke repository.
4. Tentukan query mana yang lebih cocok jadi query service terpisah.
5. Buat boundary antara service layer dan repository lebih jelas.

---

## 21. Jawaban Contoh Ringkas

Repository sehat:
- fokus pada persistence
- kontrak jelas
- method relevan untuk domain/use case

Repository buruk:
- wrapper tipis ORM
- penuh workflow bisnis
- menampung semua query tanpa struktur

---

## 22. Checklist Kelulusan Topik Repository Pattern

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan tujuan repository pattern secara praktis,
- membedakannya dari ORM biasa,
- menempatkan concern persistence pada boundary yang tepat,
- menghindari wrapper kosong dan business-logic leakage,
- menilai kapan repository pattern layak atau tidak layak dipakai.

---

## 23. Ringkasan Brutal

- Repository pattern bagus saat menjaga boundary.
- Repository pattern bodoh saat hanya mengganti nama ORM.
- Kalau abstraction tidak mengurangi coupling atau menambah clarity,
  itu bukan arsitektur.
  Itu kosmetik.
