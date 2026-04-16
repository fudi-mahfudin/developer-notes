# Eventual Consistency - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu eventual consistency
- kenapa sistem modern sering tidak bisa selalu strongly consistent secara global
- trade-off antara consistency, latency, dan decoupling
- bagaimana merancang sistem yang tetap bisa dipercaya walau konsistensinya tertunda

Banyak engineer membenci eventual consistency
karena terdengar seperti:
- "data salah untuk sementara"

Jujur saja,
memang ada unsur itu.

Tapi dalam sistem terdistribusi,
sering kali itu bukan kegagalan desain.
Itu konsekuensi desain yang sadar trade-off.

---

## 1. Apa Itu Eventual Consistency?

Eventual consistency berarti:
- setelah perubahan terjadi,
  semua bagian sistem tidak langsung melihat nilai yang sama
- tetapi jika tidak ada perubahan baru,
  sistem akhirnya akan konvergen ke keadaan yang sama

Kata kuncinya:
- eventually

Artinya:
- ada jendela ketertinggalan
- bukan ketidakbenaran permanen

---

## 2. Kenapa Ini Muncul?

Karena sistem modern sering terdiri dari:
- banyak service
- cache
- replica
- queue
- read model terpisah

Begitu data melewati boundary ini,
instant global consistency menjadi mahal
atau tidak realistis.

Kalau tim menuntut semua hal langsung sinkron,
biaya coupling dan latency bisa meledak.

---

## 3. Strong Consistency vs Eventual Consistency

Strong consistency:
- setelah write sukses,
  pembacaan relevan melihat state terbaru sesuai kontrak

Eventual consistency:
- pembacaan tertentu bisa sementara melihat state lama

Tidak ada yang gratis.

Strong consistency:
- lebih sederhana untuk reasoning tertentu
- tapi bisa lebih mahal atau lebih membatasi

Eventual consistency:
- lebih fleksibel/distributed-friendly
- tapi lebih sulit untuk UX dan reasoning

---

## 4. Tidak Semua Data Perlu Konsisten dengan Cara Sama

Ini penting.

Beberapa data butuh konsistensi kuat:
- saldo
- slot booking
- status approval inti

Beberapa data boleh eventual:
- dashboard summary
- search index
- analytics projection
- notification view

Sistem matang
tidak memperlakukan semua data
seolah punya kebutuhan konsistensi identik.

---

## 5. Eventual Consistency Bukan Alasan Ceroboh

Mengatakan:
- "ini eventual consistency"

bukan izin untuk:
- kehilangan event
- data nyangkut selamanya
- sinkronisasi diam-diam gagal

Eventual consistency yang sehat
butuh:
- mekanisme propagation jelas
- retry
- observability
- reconciliation

Kalau tidak,
itu bukan eventual consistency.
Itu cuma sistem rusak.

---

## 6. Window of Inconsistency

Konsep penting:
- berapa lama jendela ketidaksinkronan ini?

Milidetik?
Detik?
Menit?
Jam?

Bisnis perlu tahu ini.

Karena dampak UX dan operasional
sangat bergantung pada panjang window tersebut.

Eventual consistency tanpa SLA mental
akan terasa seperti kekacauan acak.

---

## 7. Read-After-Write Expectation

User sering mengharapkan:
- saya baru update
- saya refresh
- saya melihat hasil terbaru

Kalau sistem eventual,
harapan ini bisa gagal.

Karena itu desain harus mempertimbangkan:
- apakah route/read model tertentu
  perlu stronger consistency?
- apakah UI perlu optimistic/local pending state?

Reasoning produk dan UX
harus ikut masuk pembahasan consistency.

---

## 8. Eventual Consistency dan Queue

Saat update disebarkan lewat queue/event,
consumer memproses belakangan.

Artinya:
- read model turunan
- cache turunan
- notifikasi

bisa tertinggal.

Ini normal.

Yang tidak normal:
- tidak tahu apakah pesan tersampaikan
- tidak tahu backlog
- tidak tahu siapa yang tertinggal

---

## 9. Projection / Read Model Lag

Dalam arsitektur CQRS atau read model terpisah,
projection lag adalah realita.

Pertanyaan penting:
- seberapa besar lag yang diterima?
- bagaimana jika projection gagal?
- apakah UI tahu data bisa tertunda?

Projection lag yang tak terlihat
bisa membuat user merasa sistem bohong.

---

## 10. Compensation dan Repair

Karena tidak semua hal langsung sinkron,
sistem perlu siap untuk:
- retry
- reconciliation
- repair process
- manual intervention tertentu

Kalau sinkronisasi gagal sekali
dan tidak ada mekanisme pemulihan,
eventual consistency berubah jadi permanent inconsistency.

Itu kegagalan desain operasional.

---

## 11. Idempotency dan Ordering

Propagation eventual consistency
sering bergantung pada:
- event processing
- retry
- at least once delivery

Maka:
- idempotency penting
- ordering tertentu mungkin penting

Kalau event lama diproses setelah event baru,
read model bisa mundur.

Desain harus sadar pada causal order
dan update semantics.

---

## 12. UX Pattern yang Membantu

Beberapa cara mengurangi kebingungan user:
- pending status
- "sedang diproses"
- polling terarah
- optimistic UI dengan fallback
- route tertentu membaca dari source of truth

Ini bukan cuma urusan backend.
UX adalah bagian dari strategi eventual consistency.

---

## 13. Healthcare Example

Misal:
- pasien booking appointment

Yang harus strong:
- slot inti di source of truth

Yang bisa eventual:
- dashboard summary admin
- search projection
- notifikasi reminder queue

Kalau summary dashboard terlambat 5 detik,
mungkin masih bisa diterima.

Kalau slot booking double karena eventual di area inti,
itu bencana.

---

## 14. Monitoring Consistency Lag

Kalau sistem eventual,
ukur:
- propagation lag
- consumer lag
- outbox backlog
- projection failure
- stale read complaint

Kalau tidak diukur,
tim hanya akan berkata:
- "harusnya nanti sinkron"

Itu bukan kontrol.
Itu harapan.

---

## 15. Reconciliation Jobs

Sering perlu ada proses periodik
untuk mendeteksi dan memperbaiki drift.

Contoh:
- bandingkan source of truth dengan projection
- cari event yang belum terproses
- repair cache/read model rusak

Dalam sistem eventual,
reconciliation bukan aksesori.
Ia sering bagian dari safety net.

---

## 16. Organizational Honesty

Tim harus jujur:
- bagian mana yang eventual
- apa dampaknya
- berapa window normal
- kapan dianggap incident

Kalau tidak,
ekspektasi stakeholder akan salah.

Eventual consistency yang tidak dikomunikasikan
terasa seperti bug.

---

## 17. Anti-Pattern Umum

1. Menyebut semua inkonsistensi sebagai "eventual consistency".
2. Tidak mengukur propagation lag.
3. Memakai eventual consistency untuk invariant inti yang seharusnya strong.
4. Tidak punya retry/repair path.
5. Mengabaikan UX dari stale read.

---

## 18. Best Practices

- bedakan area yang butuh strong consistency vs yang boleh eventual.
- buat propagation mechanism observable.
- desain retry, idempotency, dan reconciliation.
- komunikasikan lag ke UX/produk jika relevan.
- jangan glorifikasi eventual consistency sebagai default universal.

---

## 19. Pertanyaan Desain Penting

Sebelum menerima eventual consistency, tanya:
1. Data mana yang boleh tertinggal?
2. Berapa lama lag yang diterima?
3. Apa dampak user jika membaca nilai lama?
4. Bagaimana mendeteksi dan memperbaiki drift?
5. Apa source of truth yang harus dipercaya?

---

## 20. Mini Latihan

Latihan:
1. Identifikasi area sistem yang boleh eventual dan yang tidak.
2. Tentukan UX untuk read-after-write yang tertunda.
3. Rancang monitoring untuk projection lag.
4. Buat strategi reconciliation sederhana.
5. Nilai risiko at-least-once event delivery pada read model.

---

## 21. Jawaban Contoh Ringkas

Strong consistency:
- booking slot inti
- saldo/approval inti

Eventual consistency:
- dashboard
- analytics
- search index
- notification projection

---

## 22. Checklist Kelulusan Topik Eventual Consistency

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan eventual consistency tanpa slogan kosong,
- membedakan area strong dan eventual secara sadar,
- memahami lag, retry, idempotency, dan repair,
- memikirkan dampak UX dari stale read,
- mengoperasikan sistem eventual dengan observability.

---

## 23. Ringkasan Brutal

- Eventual consistency bukan sihir.
- Ia adalah kompromi.
- Kalau kamu tidak bisa menjelaskan komprominya,
  kamu tidak sedang mendesain distributed system.
  Kamu sedang menamai kekacauan.
