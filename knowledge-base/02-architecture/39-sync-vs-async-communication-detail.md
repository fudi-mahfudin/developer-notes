# Sync vs Async Communication - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- perbedaan komunikasi sinkron dan asinkron
- trade-off latency, coupling, dan reliability
- kapan memilih request-response
- kapan memilih event/message-based communication
- anti-pattern saat menyambungkan service

Tidak ada sistem besar
yang bisa sehat
jika semua komunikasinya dipilih
tanpa alasan yang jelas.

Sync dan async
bukan sekadar beda tool.
Mereka membawa model kegagalan
dan model ekspektasi yang berbeda.

Kalau salah pilih,
sistem bisa terlihat sederhana di awal
tapi menyiksa di operasi harian.

---

## 1. Apa Itu Komunikasi Sinkron?

Komunikasi sinkron berarti:
- caller mengirim permintaan
- menunggu respons
- alur lanjut setelah respons diterima

Contoh:
- HTTP API call
- RPC call

Ini natural
untuk use case yang membutuhkan jawaban langsung.

Tapi artinya:
- caller dan callee terikat secara waktu

---

## 2. Apa Itu Komunikasi Asinkron?

Komunikasi asinkron berarti:
- caller tidak harus menunggu hasil final langsung
- pesan/event dikirim
- pemrosesan terjadi belakangan

Contoh:
- queue
- event bus
- job system

Ini mengurangi temporal coupling,
tapi meningkatkan kompleksitas reasoning.

---

## 3. Temporal Coupling

Ini konsep penting.

Pada sync:
- kedua pihak harus sama-sama hidup
  pada saat yang sama

Pada async:
- producer bisa lanjut
  walau consumer memproses nanti

Jika availability callee sering bermasalah,
sync chain panjang akan rapuh.

Async bisa membantu,
tapi tidak otomatis cocok untuk semua hal.

---

## 4. User Expectation dan Latency

Jika user butuh jawaban sekarang,
sync biasanya lebih natural.

Contoh:
- login
- cek izin akses
- hitung total checkout final

Jika hasil boleh datang belakangan,
async bisa lebih baik.

Contoh:
- kirim email
- generate report
- update analytics

Mulailah dari kebutuhan pengalaman pengguna,
bukan dari tren arsitektur.

---

## 5. Error Handling Berbeda

Pada sync:
- error biasanya langsung terlihat oleh caller

Pada async:
- error bisa terjadi belakangan
- perlu retry
- perlu DLQ/repair

Async mengurangi blocking,
tapi memindahkan complexity
ke failure handling dan observability.

Kalau tim belum siap itu,
async bisa jadi jebakan.

---

## 6. Coupling yang Berbeda

Sync coupling:
- waktu
- availability
- latency chain

Async coupling:
- schema message/event
- delivery semantics
- eventual consistency

Jadi async bukan "tanpa coupling".
Ia hanya mengganti bentuk coupling.

Tim yang naif sering tidak sadar ini.

---

## 7. Sync Chain Problem

Bayangkan:
- API A panggil B
- B panggil C
- C panggil D

Sekarang latency dan failure
menjalar sepanjang rantai itu.

Setiap tambahan hop sinkron
menambah:
- timeout risk
- retry complexity
- cascading failure risk

Tidak semua dependency layak masuk request path sinkron.

---

## 8. Async Bukan Selalu Lebih Andal

Ini mitos umum.

Async memang bisa mengurangi blocking,
tapi menambah:
- queue backlog
- duplicate delivery
- lag
- harder debugging

Kalau event hilang, consumer stuck,
atau projection tertinggal,
user tetap merasakan masalah.

Async bukan obat universal.

---

## 9. Strong Consistency vs Async Flow

Jika satu keputusan bisnis
harus diketahui saat itu juga,
sync atau local transaction biasanya lebih masuk akal.

Kalau kamu memindahkan keputusan inti
ke async hanya demi decoupling,
risiko inconsistency bisa naik.

Gunakan async
untuk hal yang memang boleh tertunda
atau dikompensasi.

---

## 10. Request-Response Cocok untuk Apa?

Sinkron cocok untuk:
- query langsung
- command yang butuh immediate result
- auth check
- validation yang harus menentukan response saat itu

Jika caller tak bisa lanjut
tanpa hasil sekarang,
sync biasanya wajar.

Memaksa async di sini
sering justru merusak UX dan logic.

---

## 11. Event / Message Cocok untuk Apa?

Async cocok untuk:
- side effect lanjutan
- workflow tertunda
- fan-out event
- integration propagation
- buffering burst load

Jika pekerjaan tidak perlu memblokir caller,
async memberi banyak manfaat.

Tapi tetap harus ada:
- retry
- observability
- idempotency

---

## 12. Healthcare Example

Contoh sinkron:
- cek apakah slot dokter masih tersedia
- validasi akses data pasien
- simpan booking inti

Contoh async:
- kirim email konfirmasi
- push reminder
- update analytics
- sinkronisasi non-kritis ke sistem lain

Pemisahan ini membuat sistem
tetap cepat dan tetap benar.

---

## 13. Backpressure dan Load

Sync systems menerima load
secara langsung di request path.

Async systems bisa menyerap load sementara
via queue/buffer.

Ini bagus,
tapi hanya jika consumer bisa mengejar.

Kalau tidak,
backlog hanya menunda rasa sakit.

Pilih mode komunikasi
dengan memahami bentuk load-nya.

---

## 14. Debugging

Sync flow lebih mudah diikuti
karena jalurnya langsung.

Async flow lebih sulit
karena state menyebar:
- producer
- broker
- consumer
- projection

Jika sistem async tidak punya trace/log yang bagus,
tim akan cepat frustrasi.

Debugging cost adalah faktor arsitektur nyata.

---

## 15. Hybrid is Normal

Sebagian besar sistem sehat
memakai kombinasi:
- sync untuk keputusan langsung
- async untuk propagation dan side effects

Ini normal.

Yang penting:
- boundary jelas
- expectation jelas
- mode failure jelas

Tidak perlu fanatik satu sisi.

---

## 16. Anti-Pattern Umum

1. Semua hal dibuat async karena terdengar scalable.
2. Semua hal dibuat sync sampai service chain rapuh.
3. Mengabaikan failure handling async.
4. Memakai async untuk invariant inti yang butuh jawaban langsung.
5. Memilih mode komunikasi tanpa memikirkan UX dan operasional.

---

## 17. Best Practices

- pilih sync saat immediate answer benar-benar dibutuhkan.
- pilih async saat kerja bisa ditunda atau difan-out.
- minimalkan chain sinkron yang panjang.
- siapkan retry, idempotency, dan observability untuk async flow.
- dokumentasikan expectation consistency dan latency tiap interaction.

---

## 18. Pertanyaan Desain Penting

Sebelum memilih mode komunikasi, tanya:
1. Apakah caller butuh jawaban final sekarang?
2. Apa yang terjadi jika callee lambat atau down?
3. Apakah hasil bisa tertunda?
4. Bagaimana error akan terlihat dan ditangani?
5. Seberapa besar beban observability yang siap ditanggung tim?

---

## 19. Mini Latihan

Latihan:
1. Ambil lima interaction antar service dan klasifikasikan sync vs async.
2. Temukan satu sync chain yang terlalu panjang.
3. Temukan satu async flow yang seharusnya tetap sinkron.
4. Rancang fallback jika dependency sinkron gagal.
5. Rancang monitoring dasar untuk satu async pipeline.

---

## 20. Jawaban Contoh Ringkas

Sync:
- keputusan langsung
- validasi inti
- immediate response

Async:
- side effect
- propagation
- buffering workload

---

## 21. Checklist Kelulusan Topik Sync vs Async Communication

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan perbedaan temporal coupling sync vs async,
- memilih mode komunikasi berdasarkan kebutuhan nyata,
- memahami biaya failure handling async,
- menghindari sync chain berlebihan,
- mendesain sistem hybrid dengan boundary yang masuk akal.

---

## 22. Ringkasan Brutal

- Sync itu sederhana sampai dependency-mu mulai gagal.
- Async itu fleksibel sampai debugging-mu mulai buta.
- Arsitektur matang tahu kapan harus menanggung jenis rasa sakit yang mana.
