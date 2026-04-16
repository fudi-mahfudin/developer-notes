# Hexagonal Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu hexagonal architecture
- kenapa port dan adapter berguna
- bagaimana menjaga core logic tetap bersih
- hubungan hexagonal dengan dependency inversion

Hexagonal architecture sering terdengar abstrak.
Padahal ide intinya cukup sederhana:
- core bisnis dilindungi dari detail luar
- dunia luar masuk lewat adapter yang jelas

Kalau dipahami dengan praktis,
ini sangat berguna.

---

## 1. Apa Itu Hexagonal Architecture?

Hexagonal architecture
adalah gaya arsitektur
yang memisahkan:
- core application/domain
  dari
- external actors dan teknis detail

Komunikasi dilakukan melalui:
- ports
- adapters

Nama "hexagonal" itu cuma visualisasi.
Esensinya bukan bentuk segi enam.
Esensinya adalah boundary.

---

## 2. Core Idea

Core ideanya:
- business logic tidak boleh menempel ke framework
- business logic tidak boleh terlalu tahu DB/vendor/UI
- semua interaksi luar dilakukan lewat contract yang jelas

Jadi:
- domain/use case berada di tengah
- adapter dunia luar mengelilingi core

Ini membantu menjaga perubahan di tepi
tidak merusak inti sistem.

---

## 3. Port Itu Apa?

Port adalah kontrak/interaksi
yang dibutuhkan atau disediakan oleh core.

Contoh:
- input port: `createAppointment()`
- output port: `AppointmentRepository`, `NotifierPort`

Port bukan harus selalu interface formal,
tapi harus jelas sebagai boundary contract.

Kalau boundary ini kabur,
hexagonal hanya tinggal istilah.

---

## 4. Adapter Itu Apa?

Adapter adalah implementasi konkret
yang menghubungkan port dengan dunia luar.

Contoh:
- Prisma repository adapter
- HTTP controller adapter
- WhatsApp notifier adapter
- queue publisher adapter

Core berbicara lewat port.
Adapter menangani detail teknis aktual.

Itu pembagian perannya.

---

## 5. Kenapa Ini Berguna?

Karena kebanyakan hal yang sering berubah
berada di tepi:
- framework
- ORM
- vendor
- transport layer
- storage detail

Sementara business rule inti
lebih stabil secara relatif.

Hexagonal architecture mencoba melindungi
bagian yang lebih stabil
dari bagian yang lebih volatil.

---

## 6. Input vs Output Boundary

Biasanya ada dua arah:

### Input Side
- request masuk
- command/use case dipicu

### Output Side
- core butuh menyimpan data
- core butuh memanggil notifier
- core butuh publish event

Hexagonal membantu memisahkan dua arah ini
agar tidak tercampur di tengah.

---

## 7. Controller Bukan Core

Dalam desain heksagonal,
controller/route handler
adalah adapter masuk.

Dia bertugas:
- menerima transport-specific input
- menerjemahkan ke use case

Controller bukan tempat utama
untuk business logic inti.

Kalau controller tebal,
boundary hexagonal sudah bocor.

---

## 8. Repository Bukan Domain

Repository/DB access
adalah adapter keluar atau bagian infra.

Domain/use case boleh butuh "menyimpan appointment",
tapi tidak perlu tahu:
- Prisma query persisnya
- SQL detailnya
- connection management

Kalau core tahu semua detail itu,
point hexagonal hilang.

---

## 9. Relationship with Dependency Inversion

Hexagonal architecture sangat bergantung pada:
- dependency inversion

Core bergantung pada port yang stabil.
Adapter bergantung pada core contract.

Inilah kenapa dua topik ini sangat erat.

Kalau dependency direction salah,
hexagonal hanya menjadi struktur folder,
bukan arsitektur yang nyata.

---

## 10. Testability Benefit

Salah satu keuntungan besar:
- core bisa diuji tanpa framework, tanpa DB asli, tanpa vendor SDK

Contoh:
- test use case booking
  dengan fake repository dan fake notifier

Ini membuat:
- test lebih cepat
- test lebih fokus
- reasoning lebih tajam

Kalau core langsung menempel ke ORM/framework,
testing cepat menjadi berat.

---

## 11. Replaceability Benefit

Hexagonal membantu saat detail berubah:
- ganti ORM
- ganti vendor notifikasi
- ganti framework HTTP

Tujuannya bukan supaya kamu sering ganti tool.
Tujuannya supaya perubahan tool
tidak otomatis menghancurkan logic inti.

Ini bentuk proteksi desain.

---

## 12. Over-Engineering Warning

Hexagonal bisa disalahgunakan.

Gejala:
- setiap hal dibuat port tanpa alasan
- adapter terlalu banyak untuk use case kecil
- file berlipat tanpa nilai nyata

Kalau aplikasi sederhana,
jangan paksa semua jadi super formal.

Prinsip pentingnya:
- lindungi core dari detail penting

Bukan:
- buat semua jadi diagram cantik.

---

## 13. Healthcare Example

Use case:
- create appointment

Core butuh:
- validasi booking rules
- save appointment
- save audit trail
- enqueue reminder

Hexagonal design:
- input adapter: controller/handler
- core use case: booking service
- output ports:
  - `AppointmentRepository`
  - `AuditPort`
  - `ReminderPort`
- adapters:
  - DB repository
  - audit table writer
  - queue producer

Ini membuat flow lebih jelas.

---

## 14. Boundary Clarity

Pertanyaan sehat:
- apakah business rule bisa dibaca tanpa menelusuri framework?
- apakah adapter bisa diganti tanpa mengubah inti?
- apakah test core bisa jalan tanpa infrastruktur penuh?

Jika jawabannya ya,
hexagonal-mu mungkin cukup sehat.

Jika tidak,
kemungkinan boundary masih bocor.

---

## 15. Ports Harus Bermakna

Port yang baik:
- mencerminkan kebutuhan domain/use case
- tidak terlalu generik
- tidak terlalu teknis

Contoh kurang sehat:
- `GenericDataAccessPort`

Contoh lebih sehat:
- `AppointmentRepository`
- `NotificationPort`

Nama yang terlalu generik
sering menyembunyikan makna domain.

---

## 16. Adapter Tidak Boleh Mengendalikan Core

Adapter adalah detail.

Kalau adapter mulai menentukan:
- aturan bisnis inti
- policy domain
- validasi domain utama

berarti boundary salah.

Adapter boleh melakukan translation teknis,
bukan mengambil alih domain core.

---

## 17. Input Validation vs Domain Validation

Dalam desain heksagonal:
- adapter masuk bisa validasi shape transport
- core tetap validasi aturan domain penting

Ini penting.

Kalau domain validation hanya ada di adapter,
use case lain yang masuk lewat jalur berbeda
bisa lolos tanpa aturan yang sama.

Core harus tetap menjaga kebenaran inti.

---

## 18. Anti-Pattern Umum

1. Menyebut arsitektur hexagonal tapi core tetap tahu framework/ORM.
2. Port dibuat terlalu generik dan tak bermakna.
3. Adapter berisi policy domain.
4. Semua hal diabstraksikan berlebihan.
5. Folder rapi, tapi dependency direction salah.

---

## 19. Best Practices

- lindungi core dari detail teknis yang volatil.
- buat port yang bermakna secara domain.
- jaga adapter sebagai detail, bukan pengendali domain.
- gunakan hexagonal secara proporsional.
- evaluasi boundary dengan testability dan replaceability.

---

## 20. Mini Latihan

Latihan:
1. Ambil satu use case backend, lalu identifikasi input adapter, core, output port, dan output adapter.
2. Cari satu tempat di codebase yang "terlihat hexagonal" tapi sebenarnya core masih tahu detail framework.
3. Buat contoh port yang terlalu generik dan refactor jadi lebih bermakna.
4. Jelaskan hubungan hexagonal dan dependency inversion.
5. Jelaskan kapan hexagonal terlalu formal untuk use case kecil.

---

## 21. Jawaban Contoh Ringkas

Input adapter:
- controller / route handler

Core:
- use case / domain logic

Output adapter:
- DB repository
- external API client
- queue publisher

Hexagonal dan dependency inversion terkait karena:
- core bergantung pada kontrak,
  bukan pada implementasi tepi.

---

## 22. Checklist Kelulusan Topik Hexagonal Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan konsep ports dan adapters,
- membedakan core vs edge,
- menilai apakah core masih tercemar detail teknis,
- merancang boundary input/output yang masuk akal,
- menghindari hexagonal theater tanpa manfaat nyata.

---

## 23. Ringkasan Brutal

- Hexagonal architecture yang sehat melindungi core.
- Hexagonal architecture yang palsu
  hanya menambah kata `port` dan `adapter`
  tanpa mengubah kualitas desain.
