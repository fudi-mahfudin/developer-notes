# Saga Pattern Dasar - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu saga pattern
- kenapa saga muncul dalam sistem terdistribusi
- perbedaan saga dengan transaksi lokal
- orchestration vs choreography dalam saga
- risiko dan anti-pattern saat memakai saga

Begitu workflow bisnis
menyentuh banyak service atau banyak resource
yang tidak bisa satu transaksi lokal,
masalah baru muncul:
- bagaimana menjaga alur tetap masuk akal saat ada kegagalan?

Saga adalah salah satu jawaban.

Tapi saga bukan sihir.
Ia tidak mengembalikan atomicity penuh.
Ia hanya memberi cara
untuk mengelola proses multi-langkah
di dunia yang tidak benar-benar atomik.

---

## 1. Apa Itu Saga?

Saga adalah pola
untuk mengelola workflow terdistribusi
sebagai rangkaian langkah lokal
yang masing-masing bisa sukses atau gagal.

Jika suatu langkah gagal,
saga bisa memicu:
- compensation
- rollback bisnis parsial
- atau penanganan status tertentu

Intinya:
- bukan satu transaksi global
- melainkan serangkaian transaksi lokal terkoordinasi

---

## 2. Kenapa Saga Dibutuhkan?

Karena dalam sistem terdistribusi,
sering tidak realistis
memiliki satu transaksi ACID global
lintas banyak service,
broker,
dan external system.

Contoh:
- booking appointment
- reserve payment
- assign room
- notify patient

Kalau satu langkah gagal,
apa yang harus dilakukan?

Saga memberi struktur
untuk menjawab pertanyaan itu.

---

## 3. Saga Bukan Distributed Transaction Palsu

Ini penting.

Saga tidak memberi:
- atomicity global sempurna
- instant rollback universal

Sebaliknya,
saga menerima realita:
- beberapa langkah sudah committed
- lalu langkah berikutnya gagal

Maka yang dilakukan adalah:
- kompensasi bisnis

Bukan rollback mesin waktu.

---

## 4. Transaction Lokal vs Saga

Transaksi lokal:
- satu boundary atomik pada satu resource utama tertentu

Saga:
- banyak langkah lokal
- dengan koordinasi dan kompensasi

Kalau masalahmu masih bisa selesai
dengan transaksi lokal yang sehat,
jangan lompat ke saga.

Saga cocok saat boundary sistem memang sudah terpisah
dan atomicity global tidak realistis.

---

## 5. Compensation

Konsep paling penting dalam saga:
- compensation

Compensation berarti:
- melakukan aksi korektif
  setelah langkah lain gagal

Contoh:
- payment sudah reserve
- booking room gagal
- maka reserve payment harus dibatalkan

Perlu dipahami:
- compensation tidak selalu berarti kembali 100% ke masa lalu
- ia berarti memulihkan state bisnis ke kondisi yang dapat diterima

---

## 6. Compensation Tidak Selalu Sempurna

Ini sering disalahpahami.

Beberapa hal mudah dikompensasi:
- reserve dibatalkan
- status diubah ulang

Beberapa hal sulit atau mustahil:
- email yang sudah terkirim
- notifikasi yang sudah dilihat user
- aksi pihak ketiga yang tidak reversible

Karena itu desain saga
harus mempertimbangkan:
- langkah mana yang reversible
- langkah mana yang irreversible

Urutan langkah bisa sangat penting.

---

## 7. Orchestration-Based Saga

Dalam model ini:
- ada orchestrator
  yang mengatur langkah-langkah saga

Keuntungan:
- flow eksplisit
- failure path lebih mudah dilihat
- kompensasi lebih terpusat

Kelemahan:
- orchestrator bisa jadi kompleks
- coupling ke coordinator naik

Untuk workflow inti yang kompleks,
pendekatan ini sering lebih mudah dikendalikan.

---

## 8. Choreography-Based Saga

Dalam model ini:
- service bereaksi pada event
- langkah selanjutnya muncul dari event sebelumnya

Keuntungan:
- lebih desentralisasi
- penambahan participant bisa lebih fleksibel

Kelemahan:
- flow end-to-end lebih sulit dilihat
- failure handling bisa kabur
- debugging lebih berat

Kalau tim belum punya observability kuat,
choreography saga bisa cepat jadi chaos.

---

## 9. Kapan Saga Layak Dipakai?

Biasanya layak saat:
- workflow lintas service nyata
- atomicity global tidak mungkin atau terlalu mahal
- ada langkah yang bisa dikompensasi
- bisnis menerima proses bertahap

Biasanya tidak layak saat:
- semua langkah sebenarnya bisa berada di satu boundary lokal
- problemnya sederhana
- tim belum siap mengelola complexity workflow terdistribusi

Saga bukan default.

---

## 10. State Machine Thinking

Saga yang sehat sering dipahami
sebagai state machine:
- started
- pending
- step X completed
- compensation running
- failed
- completed

Kalau state workflow tidak jelas,
operator dan developer
akan kesulitan tahu:
- proses ini sedang di mana?
- aman atau macet?

Saga tanpa status yang eksplisit
terasa seperti alur gelap.

---

## 11. Timeout dan Stuck Flow

Apa yang terjadi jika satu langkah
tidak pernah memberi respons?

Saga harus punya jawaban:
- timeout
- retry
- manual intervention
- fail and compensate

Kalau tidak,
workflow bisa nyangkut selamanya
dan tidak ada yang tahu harus berbuat apa.

---

## 12. Idempotency Sangat Penting

Karena langkah saga
bisa di-retry,
diproses ulang,
atau menerima event duplikat,
maka:
- command
- compensation
- side effect

sebisa mungkin harus idempotent.

Kalau tidak,
saga failure akan menciptakan chaos ganda.

---

## 13. Healthcare Example

Contoh:
- pasien booking paket layanan
- sistem reserve slot dokter
- reserve ruang
- reserve pembayaran
- kirim konfirmasi

Jika reserve pembayaran gagal
setelah slot dokter sudah dipegang,
maka saga mungkin perlu:
- release slot dokter
- release ruang
- tandai booking gagal

Ini contoh tipikal alasan saga ada.

---

## 14. Visibility untuk Operator

Workflow terdistribusi perlu visibility:
- langkah mana yang berhasil
- mana yang gagal
- compensation apa yang sudah jalan
- apakah butuh intervensi manual

Tanpa dashboard/status saga,
tim support dan ops akan buta.

Jangan bangun saga
lalu berharap log mentah cukup.

---

## 15. Manual Recovery

Tidak semua kegagalan
bisa otomatis dipulihkan.

Kadang perlu:
- retry manual
- force complete
- force compensate
- human review

Saga matang tidak hanya memikirkan happy path,
tapi juga jalur pemulihan manusia.

---

## 16. Ordering of Irreversible Steps

Langkah yang tidak bisa dibatalkan
sebaiknya dipikirkan urutannya.

Contoh:
- kirim email final konfirmasi

Mungkin jangan dilakukan
sebelum langkah inti lain cukup aman.

Saga yang buruk sering gagal
karena langkah irreversible dieksekusi terlalu dini.

---

## 17. Anti-Pattern Umum

1. Memakai saga untuk workflow yang sebenarnya masih bisa lokal.
2. Compensation dianggap sama dengan rollback sempurna.
3. Tidak punya saga state yang eksplisit.
4. Tidak memikirkan timeout dan stuck steps.
5. Tidak menyiapkan observability dan manual recovery.

---

## 18. Best Practices

- gunakan saga hanya saat transaksi lokal tidak cukup.
- desain compensation secara eksplisit dan realistis.
- pilih orchestration atau choreography sesuai kompleksitas dan kemampuan observability tim.
- modelkan workflow sebagai state machine.
- siapkan timeout, retry, dan jalur intervensi manual.

---

## 19. Pertanyaan Desain Penting

Sebelum memakai saga, tanya:
1. Kenapa transaksi lokal tidak cukup?
2. Langkah mana yang reversible dan mana yang tidak?
3. Siapa yang mengoordinasikan alur?
4. Apa yang terjadi jika satu langkah timeout?
5. Bagaimana operator melihat dan memperbaiki workflow yang gagal?

---

## 20. Mini Latihan

Latihan:
1. Ambil satu workflow lintas service dan petakan langkah-langkahnya.
2. Tandai tiap langkah sebagai reversible atau irreversible.
3. Desain compensation plan dasar.
4. Pilih orchestration atau choreography dan jelaskan alasannya.
5. Tentukan state-status saga yang perlu dipantau.

---

## 21. Jawaban Contoh Ringkas

Saga cocok untuk:
- workflow multi-step lintas service
- kondisi tanpa atomicity global
- kebutuhan compensation bisnis

Saga tidak cocok untuk:
- operasi sederhana yang masih bisa lokal
- tim tanpa monitoring dan ownership workflow

---

## 22. Checklist Kelulusan Topik Saga Pattern Dasar

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan mengapa saga ada,
- membedakannya dari transaksi lokal,
- mendesain compensation yang realistis,
- memahami orchestration vs choreography saga,
- memikirkan observability dan recovery workflow.

---

## 23. Ringkasan Brutal

- Saga bukan rollback terdistribusi.
- Saga adalah cara sopan
  mengelola kenyataan bahwa sistemmu tidak atomik secara global.
- Kalau kamu lupa itu,
  desainmu akan berbohong sejak awal.
