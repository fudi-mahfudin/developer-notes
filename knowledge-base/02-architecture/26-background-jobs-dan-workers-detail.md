# Background Jobs dan Workers - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu background jobs
- apa itu workers
- kapan pekerjaan harus dipindah dari request langsung
- trade-off async processing
- risiko operasional dari job system

Banyak sistem terasa lambat
bukan karena CPU lemah,
tapi karena semua kerja dipaksa selesai
di dalam request user.

Itu pola bodoh
kalau pekerjaan tersebut:
- lama
- berat
- bisa ditunda
- atau tidak perlu blocking user response

Di sinilah background jobs relevan.

---

## 1. Apa Itu Background Job?

Background job adalah unit kerja
yang dijalankan di luar alur request utama user.

Contoh:
- kirim email
- generate report
- resize image
- sinkronisasi data
- proses export

Tujuan utamanya:
- melepaskan pekerjaan non-immediate
  dari request path utama

Ini membantu response ke user
tetap cepat dan stabil.

---

## 2. Apa Itu Worker?

Worker adalah proses atau service
yang mengambil dan mengeksekusi job.

Biasanya:
- aplikasi utama membuat job
- queue menyimpan job
- worker memproses job

Worker bukan sekadar "thread lain".
Secara arsitektural,
worker adalah eksekutor asynchronous workload.

---

## 3. Kenapa Ini Penting?

Karena tidak semua kerja
perlu selesai sebelum user mendapat respons.

Kalau semua diproses sinkron:
- latency request naik
- timeout meningkat
- retry dari client jadi makin berbahaya
- pengalaman user memburuk

Job system membantu memisahkan:
- user-facing response
  dari
- deferred processing

---

## 4. Pekerjaan yang Cocok Dijadikan Job

Biasanya cocok:
- email dan notification
- laporan PDF
- import/export data
- thumbnail processing
- webhook retry
- audit enrichment non-kritis

Biasanya tidak cocok:
- validasi inti yang menentukan hasil request
- keputusan bisnis yang harus diketahui user saat itu juga
- langkah yang wajib atomik dengan response utama

Jangan pindahkan sesuatu ke background
hanya supaya terlihat modern.

---

## 5. Synchronous vs Asynchronous Thinking

Pertanyaan utama:
- apakah user harus menunggu hasil ini?

Kalau jawabannya tidak,
background job mungkin masuk akal.

Kalau jawabannya ya,
jangan asal async-kan.

Asynchronous processing
bukan cuma optimisasi performa.
Ia mengubah semantics sistem:
- hasil bisa tertunda
- error muncul belakangan
- consistency bisa berubah

---

## 6. Fire-and-Forget yang Berbahaya

Anti-pattern umum:
- setelah request sukses,
  aplikasi "diam-diam" menjalankan task async lokal
  tanpa queue yang andal

Masalah:
- task hilang jika process mati
- tidak ada retry jelas
- tidak ada observability

Kalau pekerjaan penting,
jangan mengandalkan fire-and-forget rapuh.

Gunakan mekanisme job yang benar.

---

## 7. Reliability Concern

Begitu masuk ke background jobs,
pertanyaan baru muncul:
- bagaimana kalau worker crash?
- bagaimana kalau job gagal?
- bagaimana retry diatur?
- bagaimana mencegah duplicate execution?

Job system menambah ketahanan,
tapi juga menambah kompleksitas.

Kalau tidak dipikirkan,
kamu hanya memindahkan masalah
dari request path ke tempat yang lebih gelap.

---

## 8. Idempotency

Ini konsep penting.

Karena background jobs
bisa dieksekusi ulang:
- karena retry
- karena timeout ambigu
- karena worker restart

Maka job penting
harus dirancang idempotent sebisa mungkin.

Contoh:
- kirim reminder appointment

Pastikan ada mekanisme
agar reminder tidak terkirim 5 kali
hanya karena retry kacau.

---

## 9. Retry Policy

Tidak semua kegagalan layak di-retry sama.

Contoh retry cocok:
- network timeout
- third-party temporary failure

Contoh retry tidak cocok:
- payload invalid
- data memang tidak ada
- rule bisnis pasti gagal

Retry buta
hanya membuat antrean penuh sampah.

---

## 10. Dead Letter Queue Mindset

Kalau job terus gagal,
apa yang terjadi?

Sistem sehat biasanya punya:
- retry terbatas
- lalu pindah ke DLQ / failed jobs store
- lalu bisa diinspeksi atau direplay terkontrol

Kalau job gagal terus
tanpa penanganan jelas,
operasional akan kabur.

---

## 11. Scheduling vs Event-Triggered Jobs

Ada dua pola umum:

Scheduled jobs:
- jalan per jadwal
- cron-like

Event-triggered jobs:
- dibuat karena ada event atau action user

Contoh scheduled:
- nightly reconciliation
- cleanup session

Contoh event-triggered:
- kirim invoice setelah pembayaran

Keduanya berbeda
dan sebaiknya tidak dipikir sama persis.

---

## 12. Job Payload Design

Payload job harus:
- cukup untuk diproses
- tidak berlebihan
- tidak membawa data sensitif sembarangan

Sering lebih aman:
- kirim identifier penting
- lalu worker load data terbaru

Daripada mengirim snapshot besar
yang mudah stale dan bocor.

Tapi tergantung use case.

Kalau data bisa berubah cepat,
snapshot kadang justru perlu.

Jadi desain payload
harus sadar trade-off.

---

## 13. Visibility dan Status

Kalau pekerjaan berjalan di background,
user atau operator kadang perlu tahu statusnya.

Contoh:
- export report sedang diproses
- import 80% selesai
- reminder batch gagal sebagian

Jangan membuat background system
menjadi black box sepenuhnya.

Status dan progress
adalah bagian dari desain produk dan operasi.

---

## 14. Healthcare Example

Contoh use case:
- setelah appointment dibuat,
  sistem perlu:
  - kirim email konfirmasi
  - kirim WhatsApp reminder
  - sinkronkan ke calendar integration

Yang wajib sinkron:
- validasi slot dokter
- penyimpanan appointment

Yang bisa background:
- pengiriman notifikasi
- integrasi non-kritis

Ini pemisahan yang sehat.

---

## 15. Worker Capacity

Begitu job system tumbuh,
kamu harus pikirkan:
- concurrency worker
- prioritas job
- resource usage
- backlog size

Kalau semua job dianggap sama penting,
antrian bisa dikuasai job berat
dan job kecil penting ikut tertahan.

Arsitektur worker butuh capacity thinking.

---

## 16. Priority dan Queue Separation

Sering lebih sehat
memisahkan queue:
- high priority
- low priority
- CPU-heavy
- IO-heavy

Kenapa?

Karena satu queue besar campur aduk
bisa menciptakan head-of-line blocking.

Pemisahan queue
adalah alat untuk menjaga fairness dan latency.

---

## 17. Observability

Untuk job system,
kamu perlu tahu:
- enqueue rate
- processing rate
- success/failure rate
- retry count
- backlog age
- stuck jobs

Kalau kamu tidak tahu
berapa banyak job gagal atau tertunda,
sistem async-mu sedang buta.

---

## 18. Anti-Pattern Umum

1. Semua pekerjaan dibuat async tanpa alasan bisnis jelas.
2. Fire-and-forget lokal untuk pekerjaan penting.
3. Retry buta pada error permanen.
4. Tidak memikirkan idempotency.
5. Tidak ada visibility atas job gagal atau backlog.

---

## 19. Best Practices

- pindahkan hanya pekerjaan yang memang tidak harus blocking request.
- desain job agar idempotent bila memungkinkan.
- klasifikasikan error retryable vs non-retryable.
- monitor backlog dan failure rate.
- pisahkan queue/worker sesuai karakter workload jika perlu.

---

## 20. Pertanyaan Desain Penting

Sebelum membuat background job, tanya:
1. Apakah user harus menunggu hasil ini?
2. Apa konsekuensi jika job terlambat?
3. Apa konsekuensi jika job dieksekusi dua kali?
4. Bagaimana retry dan failure handling bekerja?
5. Apakah operator bisa melihat statusnya?

---

## 21. Mini Latihan

Latihan:
1. Ambil satu request berat dan tentukan bagian mana yang cocok dipindah ke background.
2. Tentukan payload job minimal yang aman.
3. Rancang retry policy untuk email reminder.
4. Identifikasi kebutuhan idempotency pada job pembayaran/notifikasi.
5. Buat daftar metrik penting untuk worker system.

---

## 22. Jawaban Contoh Ringkas

Cocok dijadikan job:
- email
- report generation
- sync integration

Tidak cocok dijadikan job:
- keputusan valid/tidak valid request inti
- langkah transaksi yang harus langsung diketahui user

---

## 23. Checklist Kelulusan Topik Background Jobs dan Workers

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan kapan pekerjaan harus async,
- memahami peran queue dan worker,
- merancang retry dan idempotency dasar,
- memikirkan observability job system,
- menghindari fire-and-forget yang rapuh.

---

## 24. Ringkasan Brutal

- Background jobs bukan tong sampah untuk semua hal lambat.
- Async processing menukar latency dengan complexity.
- Kalau kamu tidak siap mengelola retry, duplicate, dan observability,
  kamu belum siap punya worker system.
