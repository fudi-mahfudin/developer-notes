# Event-Driven Architecture - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu event-driven architecture
- kapan event berguna
- kapan event justru menambah kekacauan
- bagaimana event memengaruhi coupling, consistency, dan observability

Event-driven architecture sering terdengar modern.
Tapi kalau dipakai tanpa disiplin,
hasilnya bukan fleksibilitas.
Hasilnya kebingungan yang asynchronous.

---

## 1. Apa Itu Event-Driven Architecture?

Event-driven architecture adalah pendekatan
di mana komponen sistem berkomunikasi
melalui event:
- sesuatu terjadi
- informasi tentang kejadian itu dipublikasikan
- komponen lain bereaksi

Contoh event:
- `AppointmentCreated`
- `PaymentSucceeded`
- `ReminderFailed`
- `UserRegistered`

Fokusnya:
- komunikasi berbasis kejadian
- bukan panggilan sinkron langsung

---

## 2. Kenapa Event Menarik?

Karena event memberi:
- loose coupling tertentu
- extensibility
- kemampuan menambah reaksi baru
  tanpa mengubah alur inti terlalu banyak

Contoh:
- setelah booking dibuat,
  sistem bisa:
  - kirim reminder
  - catat analytics
  - update dashboard
  - sinkron ke vendor

Tanpa harus menaruh semua hal itu
di satu call chain sinkron panjang.

---

## 3. Event Bukan Silver Bullet

Event tidak otomatis:
- lebih sederhana
- lebih aman
- lebih scalable

Event juga membawa biaya:
- eventual consistency
- duplicate delivery
- ordering issue
- observability lebih sulit
- debugging lebih kompleks

Jadi event-driven architecture
harus dipilih karena alasan yang jelas,
bukan karena terdengar keren.

---

## 4. Event vs Command

Penting membedakan:
- event = sesuatu sudah terjadi
- command = permintaan agar sesuatu dilakukan

Contoh:
- `CreateAppointment` = command
- `AppointmentCreated` = event

Kalau dua hal ini dicampur,
nama dan flow sistem cepat membingungkan.

Bahasa yang jelas
adalah bagian penting dari arsitektur event.

---

## 5. Event Bersifat Fakta

Event idealnya merepresentasikan fakta:
- hal itu sudah terjadi

Karena itu nama event
biasanya berbentuk past tense:
- `OrderPlaced`
- `InvoiceGenerated`
- `AppointmentCancelled`

Ini membantu tim membedakan
antara intent dan outcome.

---

## 6. Kapan Event-Driven Cocok?

Cocok saat:
- satu kejadian memicu banyak reaksi
- reaksi tidak semua harus sinkron
- extensibility penting
- side effect bisa diproses terpisah

Contoh:
- booking sukses memicu reminder, analytics, audit, dan vendor sync

Kalau semua itu dipaksa sinkron,
flow inti jadi berat.

Di situ event bisa sangat membantu.

---

## 7. Kapan Tidak Cocok?

Kurang cocok jika:
- butuh hasil langsung dan kuat
- consistency harus immediate
- alur sangat sederhana
- tim belum siap mengelola async complexity

Kalau satu proses hanya:
- update 2 tabel lokal
- butuh commit atomik

memaksakan event-driven
sering menambah overhead tanpa nilai.

---

## 8. Event dan Consistency

Event-driven architecture sering berarti:
- strong consistency lokal
- eventual consistency lintas komponen

Contoh:
- booking commit lokal sukses
- event dikirim
- notifikasi dan analytics menyusul

Kalau tim mengira semua langsung sinkron,
ekspektasi bisnis akan rusak.

Consistency model harus dijelaskan.

---

## 9. Delivery Semantics

Hal penting:
- event bisa terkirim lebih dari sekali
- consumer bisa gagal
- ordering bisa tidak selalu sederhana

Maka consumer harus mempertimbangkan:
- idempotency
- retry
- deduplication

Kalau event consumer tidak tahan duplicate,
sistem event-driven akan rapuh.

---

## 10. Event Payload Design

Payload event harus cukup jelas:
- identity objek
- fakta yang relevan
- timestamp
- metadata yang dibutuhkan

Tapi jangan berlebihan
sampai event menjadi dump seluruh object graph.

Payload terlalu kurus:
- consumer bingung

Payload terlalu gemuk:
- coupling naik

Perlu keseimbangan.

---

## 11. Event Versioning

Seiring waktu,
payload event bisa berubah.

Maka kamu harus pikirkan:
- compatibility
- migration consumer
- schema evolution

Kalau event contract berubah sembarangan,
consumer lama bisa rusak diam-diam.

Event juga kontrak.
Bukan hanya pesan sementara.

---

## 12. Outbox Sangat Relevan

Salah satu pola penting:
- simpan state lokal + event outbox dalam satu transaction
- proses publish keluar sesudah commit

Ini membantu menjaga:
- consistency lokal
- reliability publish

Tanpa pola seperti ini,
sering muncul gap:
- data tersimpan
- event tidak pernah terkirim

Itu sangat berbahaya.

---

## 13. Observability Lebih Sulit

Di sistem sinkron,
alur relatif linear.

Di event-driven:
- alur tersebar
- satu kejadian bisa memicu banyak consumer
- failure bisa terjadi belakangan

Maka butuh:
- correlation ID
- trace metadata
- retry visibility
- dead-letter visibility

Tanpa observability matang,
event-driven cepat terasa seperti kabut.

---

## 14. Event Storming Thought Process

Cara sehat memikirkan event:
- kejadian bisnis apa yang benar-benar penting?
- siapa producer?
- siapa consumer?
- mana side effect yang wajib,
  mana yang hanya tambahan?

Kalau event didefinisikan sembarangan,
sistem akan penuh noise
dan sulit dipahami.

---

## 15. Healthcare Example

Event yang masuk akal:
- `AppointmentCreated`
- `AppointmentRescheduled`
- `AppointmentCancelled`
- `ReminderDeliveryFailed`

Consumer:
- notification service
- analytics projector
- audit logger
- vendor sync worker

Ini masuk akal
karena satu kejadian memicu banyak reaksi
yang tidak semuanya harus sinkron.

---

## 16. Anti-Pattern Umum

1. Semua hal dijadikan event tanpa alasan.
2. Command dan event dicampur.
3. Consumer tidak idempotent.
4. Tidak ada observability/retry strategy.
5. Event dipakai untuk flow yang sebenarnya butuh strong sync response.

---

## 17. Best Practices

- pakai event untuk kejadian yang memang bernilai lintas komponen.
- bedakan command dan event.
- jaga consumer idempotent.
- desain observability dari awal.
- gunakan event untuk mengurangi coupling yang tepat, bukan memindahkan kekacauan.

---

## 18. Mini Latihan

Latihan:
1. Identifikasi 5 event bisnis yang masuk akal untuk domain healthcare.
2. Bedakan event dan command untuk satu alur booking.
3. Tentukan consumer apa saja untuk `AppointmentCreated`.
4. Jelaskan kenapa outbox penting.
5. Jelaskan kapan event-driven justru berlebihan.

---

## 19. Jawaban Contoh Ringkas

Command:
- `CreateAppointment`

Event:
- `AppointmentCreated`

Outbox penting karena:
- memastikan perubahan data lokal dan publish event
  tidak terpisah tanpa kontrol.

Event-driven berlebihan jika:
- flow sangat sederhana
- butuh hasil sinkron kuat
- tidak ada kebutuhan reaksi terpisah yang nyata.

---

## 20. Checklist Kelulusan Topik Event-Driven Architecture

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan kapan event-driven masuk akal,
- membedakan event dan command,
- memahami trade-off consistency dan observability,
- memikirkan idempotency consumer,
- menilai apakah event benar-benar memberi nilai atau hanya menambah kompleksitas.

---

## 21. Ringkasan Brutal

- Event-driven architecture bukan lambang kedewasaan otomatis.
- Kalau dipakai tanpa disiplin,
  kamu hanya menyembunyikan complexity di balik asynchrony.
