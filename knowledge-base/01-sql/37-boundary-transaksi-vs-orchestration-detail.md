# SQL Boundary Transaksi DB vs Orchestration Aplikasi - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- batas tanggung jawab transaction database
- kapan cukup diselesaikan di DB
- kapan perlu orchestration di aplikasi
- kenapa tidak semua workflow bisa dipaksa dalam satu transaksi

Ini topik pembeda antara engineer yang hanya bisa CRUD
dan engineer yang benar-benar paham desain sistem.

---

## 1. Kenapa Boundary Ini Penting?

Karena banyak workflow nyata melibatkan:
- beberapa tabel
- beberapa service
- message queue
- external API
- side effect non-database

Kalau semua dipaksa dalam satu transaksi database,
hasilnya sering:
- transaction panjang
- lock tinggi
- coupling besar
- sistem rapuh

Sebaliknya,
kalau terlalu cepat melepas semuanya ke orchestration,
integritas data bisa lemah.

Jadi kamu harus tahu batasnya.

---

## 2. Apa yang Cocok Diselesaikan di Dalam DB Transaction?

Biasanya:
- beberapa write di satu database yang harus atomik
- update state internal yang saling bergantung ketat
- pembuatan record utama + audit log lokal
- reserve resource yang berada di data store yang sama

Kalau semua hal penting hidup di satu DB
dan perlu all-or-nothing,
transaction DB adalah alat yang tepat.

---

## 3. Apa yang Tidak Cocok Dipaksa ke Satu DB Transaction?

Biasanya:
- panggilan ke external service
- email/WA/SMS sending
- pembayaran pihak ketiga
- update ke sistem vendor
- workflow lintas database/service

Kenapa?
- DB transaction tidak bisa mengontrol dunia luar dengan aman
- latensi eksternal bisa lama
- kegagalan jaringan membuat lock bertahan sia-sia

Di sini orchestration aplikasi dibutuhkan.

---

## 4. Transaction Lokal vs Distributed Workflow

Penting membedakan:
- transaksi lokal dalam satu DB
- workflow bisnis end-to-end lintas komponen

Satu transaksi lokal mungkin hanya bagian kecil
dari workflow bisnis yang lebih besar.

Kesalahan umum:
- mengira berhasil `COMMIT`
  berarti seluruh bisnis selesai.

Padahal bisa jadi:
- data lokal sukses,
- notifikasi gagal,
- payment tertunda,
- sinkronisasi vendor gagal.

---

## 5. Atomicity Tidak Bisa Dipaksakan ke Semuanya

Developer naif sering berharap:
- insert DB
- call payment gateway
- kirim email
- update analytics

semua bisa "atomik" seperti satu `COMMIT`.

Tidak realistis.

Di sistem terdistribusi,
yang lebih masuk akal adalah:
- local atomicity
- idempotency
- compensation
- retry
- observability

---

## 6. Transaction Scope Harus Kecil

Semakin panjang transaction:
- lock makin lama
- contention naik
- risiko deadlock naik

Maka:
- simpan transaction untuk inti state lokal
- keluarkan side effect eksternal ke jalur async atau orchestration yang jelas

Kalau tidak,
throughput sistem akan membayar harga mahal.

---

## 7. Contoh Workflow Appointment

Misal langkah:
1. create appointment
2. reserve slot
3. create audit log
4. kirim notification job
5. panggil vendor calendar sync

Yang bisa satu transaction DB:
- create appointment
- reserve slot
- create audit log
- create notification job record

Yang tidak perlu ditahan di transaction:
- kirim notifikasi ke provider
- sync vendor eksternal

Itu lebih cocok di-orchestrate setelah commit.

---

## 8. Outbox Pattern (Konsep)

Salah satu pola penting:
- simpan event/outbox di transaction lokal
- setelah commit, worker/proses lain mengirim side effect eksternal

Manfaat:
- state lokal tetap konsisten
- side effect eksternal tidak menahan transaction
- retry lebih aman

Ini pola yang sangat berguna
untuk menjembatani DB transaction dan orchestration aplikasi.

---

## 9. Compensation

Karena tidak semua workflow bisa atomik,
kadang perlu compensation.

Contoh:
- booking lokal sukses
- vendor teleconsult room creation gagal

Pilihan:
- retry async
- tandai status `pending_external_setup`
- atau cancel/compensate workflow

Compensation bukan rollback database literal.
Ini rollback bisnis/logika.

---

## 10. Idempotency di Orchestration

Begitu workflow keluar dari satu DB transaction,
idempotency jadi sangat penting.

Kenapa?
- retry bisa terjadi
- message bisa terkirim dua kali
- callback vendor bisa duplikat

Orchestration tanpa idempotency
adalah undangan untuk side effect ganda.

---

## 11. Kapan Tetap Lebih Baik di DB Saja?

Kalau use case:
- sederhana
- seluruh state ada di satu DB
- kebutuhan konsistensi sangat ketat
- tidak ada dependency eksternal

Jangan over-engineer.

Kadang transaction DB lokal sudah cukup.
Tidak semua hal harus dipecah jadi saga besar.

---

## 12. Kapan Harus Naik ke Application Orchestration?

Kalau use case:
- lintas service
- lintas database
- bergantung pada vendor eksternal
- latency side effect tidak bisa diprediksi
- perlu retry/compensation

Maka logika coordination harus naik
ke layer aplikasi/workflow.

---

## 13. Consistency Model Harus Jelas

Saat orchestration digunakan,
tim harus tahu:
- mana yang strong consistency lokal
- mana yang eventual consistency lintas komponen

Kalau ini tidak dijelaskan,
product dan ops akan punya ekspektasi palsu.

---

## 14. Failure Mode Thinking

Saat mendesain boundary, tanyakan:
- bagaimana jika commit sukses tapi external call gagal?
- bagaimana jika outbox tersimpan tapi worker terlambat?
- bagaimana jika callback vendor datang dua kali?
- bagaimana jika compensation gagal?

Desain matang selalu dimulai dari failure mode,
bukan hanya happy path.

---

## 15. Healthcare Example

Kasus teleconsult:
1. create appointment lokal
2. create audit log
3. enqueue notification
4. create video room di vendor

Desain sehat:
- langkah 1-3 atomik di DB
- langkah 4 async/idempotent
- status appointment mencerminkan progress provisioning

Desain naif:
- buka transaction DB,
- panggil vendor video,
- tunggu,
- baru commit

Itu resep contention dan timeout.

---

## 16. Anti-Pattern Umum

1. Semua side effect dipaksa dalam satu transaction DB.
2. External API call di dalam transaction.
3. Tidak ada outbox / event record untuk side effect.
4. Mengira commit lokal = bisnis end-to-end selesai.
5. Workflow lintas service tanpa idempotency dan retry.

---

## 17. Best Practices

- gunakan DB transaction untuk inti state lokal.
- keluarkan side effect eksternal dari transaction.
- gunakan outbox/event pattern bila perlu.
- desain compensation untuk workflow lintas komponen.
- dokumentasikan consistency boundary dengan jelas.

---

## 18. Mini Latihan

Latihan:
1. Bedakan local transaction dan distributed workflow.
2. Tentukan bagian workflow booking yang cocok di-transaction-kan.
3. Jelaskan kenapa external call di dalam transaction buruk.
4. Jelaskan kegunaan outbox pattern.
5. Buat contoh compensation sederhana.

---

## 19. Jawaban Contoh Ringkas

External call di dalam transaction buruk karena:
- menahan lock lebih lama
- meningkatkan contention
- menambah risiko timeout
- tidak memberi atomicity nyata ke sistem eksternal

Outbox pattern berguna untuk:
- menjaga state lokal konsisten
- tetap mengirim side effect eksternal secara andal sesudah commit

---

## 20. Checklist Kelulusan Topik 37

Kamu dianggap lulus jika bisa:
- menentukan apa yang layak masuk DB transaction,
- memahami batas transaction lokal,
- memilih kapan orchestration aplikasi diperlukan,
- menggunakan konsep outbox/idempotency/compensation,
- mendesain workflow yang realistis terhadap kegagalan.

---

## 21. Ringkasan Brutal

- Semua yang dipaksa atomik akan menghukummu saat scale naik.
- Engineer matang tahu:
  kapan harus ketat di DB,
  dan kapan harus jujur bahwa sistem butuh orchestration.
