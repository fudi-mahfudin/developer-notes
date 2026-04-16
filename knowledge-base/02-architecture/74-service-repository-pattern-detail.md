# Service-Repository Pattern - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu service-repository pattern
- kenapa pattern ini populer di aplikasi backend JavaScript/Node.js
- hubungan service layer dengan repository
- kapan pattern ini membantu
- kapan ia hanya menjadi layering kosmetik

Service-repository pattern
sering menjadi bentuk default
di banyak aplikasi backend.

Itu masuk akal,
karena ia mencoba memisahkan:
- orchestration use case
  dari
- persistence access

Tapi jika diterapkan secara malas,
yang tersisa hanya:
- controller
- service
- repository

semuanya pass-through.

Itu bukan arsitektur.
Itu tumpukan nama file.

---

## 1. Apa Itu Service-Repository Pattern?

Pattern ini membagi tanggung jawab utama menjadi:

Service:
- menjalankan use case / orchestration aplikasi

Repository:
- mengakses dan menyimpan data

Intinya:
- business/application flow
  dipisah
  dari
- persistence concern

Ini membantu menjaga boundary
kalau memang ada logic nyata di kedua sisi.

---

## 2. Kenapa Pola Ini Populer?

Karena banyak backend aplikasi
punya kebutuhan yang cukup umum:
- endpoint menerima request
- service menjalankan use case
- repository berbicara ke database

Secara mental,
ini mudah dipahami.

Pattern ini juga cukup fleksibel
untuk aplikasi bisnis khas:
- CRUD plus workflow menengah

Masalahnya muncul
jika pola ini diikuti tanpa berpikir.

---

## 3. Service Layer Responsibility

Service seharusnya menangani:
- orchestration
- transaction boundary
- kombinasi beberapa repository/integration
- policy aplikasi

Service bukan tempat
untuk semua logic acak,
tapi juga bukan lapisan kosong.

Kalau service hanya memanggil repository 1:1
tanpa nilai tambah,
pattern ini belum memberi manfaat.

---

## 4. Repository Responsibility

Repository fokus pada:
- persistence
- query domain-relevant
- save/load entity atau record penting

Repository tidak seharusnya memegang:
- business workflow besar
- auth decision
- HTTP semantics

Kalau repository mulai tahu terlalu banyak
tentang alur bisnis,
boundary ini runtuh.

---

## 5. Controller Should Stay Thin

Dalam pola ini,
controller idealnya tipis:
- parse request
- validasi awal
- panggil service
- format response

Kalau controller tetap berisi:
- branching bisnis
- multi-step orchestration
- transaction logic

berarti service-repository separation
belum benar-benar terjadi.

---

## 6. Good Fit Use Cases

Pattern ini cocok
untuk banyak backend bisnis:
- appointment management
- claim workflow
- patient data administration
- billing operations

Selama:
- service punya orchestration nyata
- repository punya persistence boundary nyata

Di situ pattern ini masuk akal dan cukup pragmatis.

---

## 7. Bad Fit / Cosmetic Layering

Pattern ini menjadi buruk
jika dipakai seperti template tanpa isi.

Contoh buruk:
- controller -> service -> repository
- semuanya pass-through
- tak ada boundary nyata

Ini menambah:
- file
- indirection
- langkah navigasi

tanpa menambah clarity.

Layering harus dibayar dengan manfaat,
bukan nama.

---

## 8. Transaction Coordination

Service-repository pattern sering berguna
karena service menjadi tempat alami
untuk transaction coordination.

Contoh:
- update appointment
- simpan audit
- enqueue outbox

Repository menjalankan operasi data,
service memutuskan batas use case.

Ini salah satu kekuatan pattern ini.

---

## 9. Multi-Repository Use Cases

Pattern ini makin terasa berguna
saat use case menyentuh banyak hal:
- lebih dari satu repository
- external integration
- policy check
- side effect terstruktur

Kalau use case seperti ini
langsung hidup di controller,
kekacauan cepat muncul.

Service layer adalah rumah yang wajar
untuk kompleksitas tersebut.

---

## 10. Testing Perspective

Pattern ini bisa membantu testability:
- service diuji dengan repo/integration stub
- repository diuji dengan integration tests

Tapi jangan salah:
- repo mock berlebihan
  tanpa query integration test
  juga bisa menipu

Pattern ini membantu boundary testing,
bukan otomatis menjamin kualitas testing.

---

## 11. Healthcare Example

Misal `AppointmentService.reschedule()`
melakukan:
- load appointment via repository
- cek policy reschedule
- cek conflict slot
- save update
- log audit / publish follow-up

Sementara `AppointmentRepository` fokus pada:
- findById
- checkConflict
- save

Ini contoh service-repository pattern
yang hidup dan bernilai.

---

## 12. Relation to Clean/Hexagonal Ideas

Service-repository pattern
sering menjadi bentuk pragmatis
dari ide layering yang lebih besar.

Ia tidak harus full clean architecture,
tapi bisa menjadi langkah sehat
menuju boundary yang lebih jelas.

Yang penting:
- jangan jadikan pattern ini slogan
- jadikan ia alat untuk clarity dan separation.

---

## 13. Anti-Pattern Umum

1. Service hanya pass-through ke repository.
2. Repository berisi business workflow.
3. Controller tetap gemuk walau service/repository sudah ada.
4. Terlalu banyak repository/service kecil tanpa boundary yang berarti.
5. Testing hanya mock semua lapisan tanpa verifikasi persistence nyata.

---

## 14. Best Practices

- pakai service untuk orchestration use case nyata.
- pakai repository untuk persistence boundary yang jelas.
- jaga controller tetap tipis.
- jangan membuat layer hanya demi mengikuti template.
- evaluasi manfaat pattern dari clarity dan maintainability, bukan dari jumlah folder.

---

## 15. Pertanyaan Desain Penting

Sebelum memakai atau menilai service-repository pattern, tanya:
1. Apakah service benar-benar mengorkestrasi use case?
2. Apakah repository benar-benar memisahkan persistence concern?
3. Apakah controller sudah cukup tipis?
4. Apakah ada layer yang sebenarnya hanya pass-through?
5. Apakah pola ini mengurangi coupling atau hanya menambah indirection?

---

## 16. Mini Latihan

Latihan:
1. Ambil satu endpoint gemuk dan pecah jadi controller + service + repository yang sehat.
2. Cari service pass-through yang bisa disederhanakan atau diperkaya boundary-nya.
3. Cari repository yang bocor ke business logic.
4. Tulis test untuk service use case utama.
5. Tulis integration test untuk query repository penting.

---

## 17. Checklist Kelulusan Topik Service-Repository Pattern

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan peran service dan repository secara jujur,
- menerapkan separation use case vs persistence,
- mengenali layering kosmetik,
- menjaga controller tetap ringan,
- menggunakan pattern ini sebagai alat pragmatis, bukan template kosong.

---

## 18. Ringkasan Brutal

- Service-repository pattern bagus saat tiap layer punya pekerjaan nyata.
- Kalau semua layer cuma meneruskan call,
  kamu tidak sedang membangun arsitektur.
  Kamu sedang memecah satu fungsi jadi tiga file.
