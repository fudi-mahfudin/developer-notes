# Backpressure - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu backpressure
- kenapa sistem perlu memberi sinyal "cukup"
- hubungan backpressure dengan queue, throughput, dan stability
- cara mencegah producer membanjiri consumer
- anti-pattern saat sistem menerima beban melebihi kapasitasnya

Backpressure adalah konsep
yang sering diabaikan
sampai sistem mulai overload.

Saat itu barulah orang sadar:
- menerima semua beban
  tidak sama dengan melayani semua beban

Sistem sehat tahu
kapan harus melambat,
menolak,
atau menahan arus.

Kalau tidak,
ia akan menumpuk kerja
sampai mati perlahan.

---

## 1. Apa Itu Backpressure?

Backpressure adalah mekanisme
untuk mengendalikan laju aliran kerja
saat producer lebih cepat
daripada consumer.

Intinya:
- consumer atau sistem keseluruhan
  memberi sinyal bahwa kapasitas terbatas

Tujuannya:
- mencegah antrean tak terkendali
- menjaga latency
- mencegah collapse

---

## 2. Kenapa Ini Penting?

Karena banyak sistem modern
punya komponen yang laju kerjanya berbeda:
- API menerima request cepat
- worker memproses lambat
- producer publish event besar
- consumer lebih lambat

Tanpa backpressure:
- queue membengkak
- memory naik
- latency meledak
- timeout meningkat

Backpressure adalah alat menjaga sistem
tetap berada dalam batas realistis.

---

## 3. Throughput Bukan Infinite

Salah satu kesalahan pemula:
- mengira selama request diterima,
  sistem masih baik-baik saja

Padahal bisa jadi:
- request masuk cepat
- kerja belum selesai
- backlog tersembunyi tumbuh

Throughput nyata
ditentukan oleh komponen paling lambat
di jalur kerja.

Backpressure memaksa arsitektur
jujur terhadap batas itu.

---

## 4. Queue Bukan Solusi Tanpa Batas

Queue sering dipakai
untuk menyerap lonjakan.

Itu bagus.

Tapi queue bukan lubang hitam ajaib.

Kalau producer terus lebih cepat
daripada consumer,
queue hanya:
- menunda rasa sakit
- menyimpan beban
- memperpanjang waktu gagal

Backpressure penting
agar queue tidak jadi kuburan kerja tertunda.

---

## 5. Bentuk Backpressure

Beberapa bentuk umum:
- reject request baru
- slow down producer
- bounded queue
- load shedding
- rate limiting
- concurrency limit

Tidak semua harus dipakai sekaligus.

Yang penting:
- sistem punya respons sadar
  saat kapasitas mendekati batas

---

## 6. Bounded Queue

Queue yang sehat
sering punya batas.

Kenapa?

Karena antrean tanpa batas
terlihat aman di awal,
tapi berbahaya:
- memory bisa habis
- latency bisa tak terbatas
- pekerjaan lama jadi tak relevan

Bounded queue memaksa sistem
menghadapi kenyataan kapasitas.

---

## 7. Rejecting Work Itu Kadang Sehat

Ini terdengar kasar,
tapi sering benar.

Lebih sehat:
- menolak sebagian kerja dengan jelas

daripada:
- menerima semua kerja
- lalu gagal diam-diam belakangan

Fail fast yang jujur
kadang lebih baik
daripada sukses palsu yang terlambat.

---

## 8. Producer Throttling

Kadang producer bisa diperlambat:
- publish rate diturunkan
- polling interval dinaikkan
- concurrency producer dikurangi

Ini bagus
jika producer dan consumer
punya koordinasi yang cukup.

Kalau producer buta
terhadap kesehatan downstream,
overload akan terus berulang.

---

## 9. Concurrency Limits

Backpressure juga bisa berupa
pembatasan concurrency:
- hanya N request berat sekaligus
- hanya M job mahal bersamaan

Ini penting
agar resource kritikal
tidak diperebutkan berlebihan.

Kadang masalahnya bukan total request,
tetapi terlalu banyak pekerjaan berat
dijalankan paralel tanpa kontrol.

---

## 10. Load Shedding

Load shedding berarti:
- sengaja membuang sebagian beban
  saat sistem tidak sanggup

Ini masuk akal untuk:
- traffic rendah prioritas
- fitur non-kritis
- sampling analytics

Load shedding terasa keras,
tapi bisa menyelamatkan fungsi inti.

Sistem matang
punya prioritas,
bukan mencoba menyelamatkan semuanya sekaligus.

---

## 11. Priority-Aware Backpressure

Tidak semua pekerjaan sama penting.

Contoh:
- booking inti lebih penting
  daripada refresh analytics

Backpressure yang sehat
sering mempertimbangkan prioritas:
- queue terpisah
- lane berbeda
- quota berbeda

Kalau semua diperlakukan sama,
pekerjaan kecil tidak penting
bisa menghambat alur kritis.

---

## 12. Latency vs Throughput

Backpressure membantu menjaga keseimbangan:
- berapa banyak kerja yang bisa diproses
- berapa lama kerja harus menunggu

Sistem yang hanya fokus throughput
bisa mengorbankan latency parah.

Sistem yang hanya fokus latency
bisa terlalu banyak reject.

Keputusan backpressure
adalah keputusan trade-off layanan.

---

## 13. Healthcare Example

Misal sistem klinik punya:
- appointment booking
- export laporan besar
- analytics dashboard refresh

Saat beban tinggi:
- booking harus diprioritaskan
- export bisa dibatasi
- analytics bisa ditunda

Ini backpressure yang sehat.

Kalau semua beban diterima setara,
fungsi inti bisa ikut tenggelam.

---

## 14. Backpressure di Streaming / Event System

Dalam stream atau consumer system,
backpressure penting saat:
- consumer lambat
- producer terus mem-push data

Jika tidak ada mekanisme kontrol:
- buffer membengkak
- lag meningkat
- crash bisa terjadi

Arsitektur event/stream
tanpa backpressure awareness
sering hanya menunda overload.

---

## 15. Observability

Kalau backpressure penting,
ukur:
- queue depth
- oldest age
- reject rate
- shed rate
- concurrency saturation
- processing lag

Backpressure tanpa metrik
akan terasa seperti perilaku acak.

Tim harus tahu:
- kapan sistem penuh
- siapa yang dikorbankan
- apakah kebijakan itu berhasil

---

## 16. Anti-Pattern Umum

1. Queue tanpa batas.
2. Menerima semua workload tanpa prioritas.
3. Menyembunyikan overload sampai latency meledak.
4. Tidak memisahkan pekerjaan kritis dan non-kritis.
5. Menganggap backpressure berarti sistem jelek, lalu menghindarinya.

---

## 17. Best Practices

- akui bahwa kapasitas sistem terbatas.
- gunakan bounded queue atau concurrency limit.
- prioritaskan workload inti.
- pilih reject, delay, atau shed secara sadar.
- ukur saturation dan backlog secara terus-menerus.

---

## 18. Pertanyaan Desain Penting

Sebelum menentukan backpressure strategy, tanya:
1. Komponen mana yang paling mudah overload?
2. Apa tanda bahwa sistem sudah penuh?
3. Beban mana yang harus diprioritaskan?
4. Lebih baik reject, throttle, atau queue?
5. Bagaimana operator tahu kebijakan ini sedang aktif?

---

## 19. Mini Latihan

Latihan:
1. Petakan producer dan consumer pada satu alur berat.
2. Tentukan queue mana yang harus dibatasi.
3. Tentukan workload mana yang bisa di-shed.
4. Rancang prioritas untuk job inti vs non-inti.
5. Buat daftar metrik saturation yang perlu dipantau.

---

## 20. Jawaban Contoh Ringkas

Backpressure cocok untuk:
- async job system
- queue-heavy architecture
- API dengan expensive operations

Backpressure penting saat:
- producer lebih cepat dari consumer
- backlog mulai mengancam stabilitas

---

## 21. Checklist Kelulusan Topik Backpressure

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan kenapa menerima semua beban itu berbahaya,
- merancang bounded queue atau concurrency limit,
- membedakan reject, throttle, dan shed,
- memprioritaskan workload kritikal,
- mengoperasikan sistem dengan saturation awareness.

---

## 22. Ringkasan Brutal

- Sistem yang tidak bisa berkata "cukup"
  akhirnya akan roboh karena terlalu sopan.
- Backpressure bukan kelemahan.
- Backpressure adalah bentuk kejujuran terhadap kapasitas.
