# Retry, Timeout, Backoff - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- peran retry, timeout, dan backoff dalam sistem terdistribusi
- kapan retry membantu
- kapan retry justru memperparah incident
- bagaimana menetapkan timeout yang sehat
- mengapa backoff dan jitter penting

Dalam sistem nyata,
kegagalan sementara itu normal:
- network blip
- dependency lambat
- rate limit sesaat
- spike load

Masalahnya bukan kegagalan sesaat itu sendiri.
Masalahnya adalah
bagaimana sistem bereaksi terhadapnya.

Retry, timeout, dan backoff
adalah tiga alat penting
untuk merespons kegagalan.

Kalau dipakai bodoh,
ketiganya juga bisa mempercepat kehancuran.

---

## 1. Apa Itu Timeout?

Timeout adalah batas waktu tunggu
untuk suatu operasi.

Tanpa timeout,
request bisa menggantung terlalu lama
dan menahan resource.

Timeout membantu sistem berkata:
- "cukup, saya berhenti menunggu"

Ini penting untuk menjaga:
- resource
- responsiveness
- failure detection

---

## 2. Apa Itu Retry?

Retry adalah mencoba ulang operasi
setelah kegagalan tertentu.

Ini berguna
jika kegagalannya memang sementara.

Contoh:
- connection reset sesaat
- timeout ringan
- temporary overload

Tapi retry bukan default
untuk semua error.

Retry ke error permanen
hanya menambah beban.

---

## 3. Apa Itu Backoff?

Backoff adalah strategi
untuk menambah jeda antar retry.

Tujuannya:
- memberi waktu dependency pulih
- mengurangi retry storm
- menghindari penumpukan tekanan

Retry tanpa backoff
sering berarti:
- gagal
- langsung serbu lagi
- gagal lagi
- memperburuk keadaan

Itu reaksi panik,
bukan desain matang.

---

## 4. Timeout Bukan Sekadar Angka Asal

Banyak sistem punya timeout
yang ditentukan sembarangan.

Misal:
- 30 detik karena terdengar aman

Padahal timeout seharusnya mempertimbangkan:
- latency normal dependency
- SLO target
- user experience
- resource cost

Timeout terlalu panjang:
- resource tersandera
- cascading failure risk naik

Timeout terlalu pendek:
- false failure naik

---

## 5. Retry Hanya untuk Error yang Tepat

Tanya dulu:
- error ini sementara atau permanen?

Contoh retryable:
- transient network issue
- 503 sementara
- timeout sesekali

Contoh non-retryable:
- payload invalid
- auth failure
- business rule reject
- 404 yang memang benar

Retry pada error non-retryable
adalah spam sistem.

---

## 6. Retry Storm

Salah satu incident pattern paling berbahaya:
- dependency mulai lambat
- semua caller timeout
- semua caller retry serentak
- dependency makin tenggelam

Ini disebut retry storm.

Ironisnya,
mekanisme resiliency yang niatnya membantu
justru mempercepat runtuhnya sistem.

Makanya retry harus dibatasi dan diatur.

---

## 7. Exponential Backoff

Pola umum:
- jeda retry makin besar tiap percobaan

Contoh:
- 100ms
- 200ms
- 400ms
- 800ms

Ini membantu mencegah
serangan ulang serentak ke dependency yang sedang sakit.

Exponential backoff
sering jauh lebih sehat
daripada interval tetap kaku.

---

## 8. Jitter

Jitter berarti menambahkan variasi acak
pada jeda retry.

Kenapa penting?

Karena kalau semua client
retry pada waktu identik,
mereka tetap bisa menabrak dependency bersamaan.

Backoff + jitter
lebih realistis dan sehat
daripada backoff seragam.

---

## 9. Budget Retry

Retry harus punya batas.

Pertanyaan:
- berapa kali?
- di layer mana?
- dengan total waktu berapa?

Kalau satu request:
- di client retry
- di gateway retry
- di service retry

maka amplification bisa gila.

Retry harus dipikirkan sebagai budget sistem,
bukan hak tak terbatas.

---

## 10. Timeout dan User Experience

Timeout memengaruhi UX.

Jika user menunggu aksi penting,
tim harus menentukan:
- lebih baik menunggu sedikit lebih lama
  atau
- gagal cepat lalu tampilkan feedback?

Tidak semua endpoint punya jawaban sama.

Login,
checkout,
dan export besar
mungkin perlu strategi berbeda.

---

## 11. Layering Problem

Di sistem bertingkat,
pertanyaan penting:
- layer mana yang bertanggung jawab retry?

Kalau semua layer retry sendiri,
beban bisa meledak.

Sering lebih sehat
menentukan tanggung jawab yang jelas:
- retry di client?
- di worker?
- di service caller tertentu?

Kejelasan ownership penting.

---

## 12. Deadline vs Timeout

Timeout biasa:
- batas per call

Deadline thinking:
- total waktu end-to-end yang tersedia

Ini lebih matang,
karena satu request sering punya budget waktu total.

Kalau setiap hop memakai timeout panjang sendiri,
end-to-end latency bisa tak terkendali.

---

## 13. Healthcare Example

Contoh:
- booking appointment memanggil service jadwal

Jika service jadwal timeout sesaat:
- retry singkat dengan batas bisa masuk akal

Jika validasi payload booking salah:
- jangan retry

Jika notifikasi email gagal:
- retry async dengan backoff jauh lebih masuk akal
  daripada memblokir user.

Konteks operation menentukan strategi.

---

## 14. Async Retry vs Sync Retry

Pada sync path:
- retry menambah latency user

Pada async path:
- retry lebih fleksibel,
  tapi tetap perlu limit dan observability

Sering kali
retry lebih cocok dipindahkan
ke background processing
untuk pekerjaan non-immediate.

Tapi jangan pakai async
hanya untuk menyembunyikan kegagalan.

---

## 15. Observability

Kamu perlu memantau:
- timeout rate
- retry count
- success-after-retry rate
- retry storm indicators
- per dependency latency distribution

Kalau tidak diukur,
kamu tidak tahu
apakah retry membantu atau merusak.

Retry yang "sering sukses akhirnya"
bisa tetap berarti dependency sakit parah.

---

## 16. Anti-Pattern Umum

1. Retry semua error tanpa klasifikasi.
2. Tidak ada timeout sehingga request menggantung.
3. Timeout terlalu panjang atau terlalu pendek tanpa alasan.
4. Retry tanpa backoff dan jitter.
5. Beberapa layer melakukan retry berulang tanpa koordinasi.

---

## 17. Best Practices

- tetapkan timeout berdasarkan latency target dan failure semantics.
- retry hanya untuk error transient yang masuk akal.
- gunakan exponential backoff dengan jitter.
- batasi jumlah retry dan total retry budget.
- ukur hasil retry, bukan hanya mengaktifkannya.

---

## 18. Pertanyaan Desain Penting

Sebelum menambah retry/timeout, tanya:
1. Error apa yang benar-benar transient?
2. Berapa lama saya bersedia menunggu?
3. Siapa yang bertanggung jawab melakukan retry?
4. Apa dampaknya jika banyak caller retry serentak?
5. Bagaimana saya tahu retry ini membantu?

---

## 19. Mini Latihan

Latihan:
1. Ambil tiga dependency dan tentukan timeout yang berbeda.
2. Klasifikasikan error mana retryable dan mana tidak.
3. Rancang exponential backoff dengan jitter.
4. Temukan tempat retry berlapis yang berbahaya.
5. Tentukan metrik keberhasilan retry policy.

---

## 20. Jawaban Contoh Ringkas

Retry layak untuk:
- transient failure
- temporary overload

Retry tidak layak untuk:
- invalid request
- auth failure
- business reject permanen

Timeout harus sadar user experience dan resource budget.

---

## 21. Checklist Kelulusan Topik Retry, Timeout, Backoff

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan retryable dan non-retryable error,
- menetapkan timeout dengan alasan jelas,
- memahami backoff dan jitter,
- mencegah retry storm,
- menghubungkan resilience policy dengan observability.

---

## 22. Ringkasan Brutal

- Retry bukan tanda sistem tangguh.
- Retry sering hanya tanda sistem panik,
  jika tidak dibatasi.
- Timeout dan backoff yang baik
  adalah bentuk disiplin,
  bukan angka random di config.
