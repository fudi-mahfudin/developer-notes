# Graceful Degradation - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu graceful degradation
- kenapa sistem tidak harus gagal total saat sebagian komponen rusak
- bagaimana membedakan fungsi inti dan fungsi opsional
- trade-off antara pengalaman penuh vs layanan minimum yang aman

Graceful degradation adalah tanda
bahwa sistem didesain untuk dunia nyata.

Di dunia nyata:
- dependency bisa lambat
- fitur tambahan bisa gagal
- sebagian data bisa terlambat

Sistem dewasa tidak langsung berkata:
- "kalau tidak bisa sempurna, lebih baik mati total"

Ia bertanya:
- "apa versi layanan minimum
  yang masih berguna dan aman?"

---

## 1. Apa Itu Graceful Degradation?

Graceful degradation adalah kemampuan sistem
untuk tetap menyediakan fungsi terbatas
saat sebagian komponen atau fitur bermasalah.

Tujuannya:
- menjaga fungsi inti tetap hidup
- mengurangi blast radius
- memberi pengalaman yang masih dapat diterima

Ini bukan sekadar menyembunyikan error.
Ini keputusan produk dan arsitektur
tentang prioritas layanan.

---

## 2. Kenapa Ini Penting?

Karena banyak sistem
memiliki dependency yang tidak semuanya kritikal.

Jika satu fitur tambahan gagal
lalu seluruh alur ikut mati,
arsitektur terlalu rapuh.

Graceful degradation membantu memisahkan:
- must-have
  dari
- nice-to-have

Kalau pemisahan ini tidak ada,
semua gangguan terasa seperti bencana total.

---

## 3. Tidak Semua Fitur Sama Penting

Pertanyaan utama:
- fungsi apa yang benar-benar inti?

Contoh:
- booking appointment inti
- analytics widget tambahan
- recommendation panel
- email konfirmasi instan

Tidak semuanya punya nilai yang sama
pada saat yang sama.

Sistem yang sehat
punya hirarki kepentingan.

---

## 4. Fail Safe vs Degrade

Graceful degradation tidak selalu berarti:
- tetap lanjut bagaimanapun

Kadang justru harus fail safe.

Contoh:
- jika validasi slot inti gagal,
  booking tidak boleh diteruskan

Tapi jika analytics gagal,
transaksi inti tetap boleh jalan.

Degrade sehat berarti:
- hanya degradasi di area yang aman untuk didegradasi

Ini butuh ketelitian domain.

---

## 5. Dependency Classification

Cara berpikir yang berguna:
- critical dependency
- important but non-blocking dependency
- optional enhancement

Jika dependency opsional gagal,
sistem seharusnya tidak bereaksi
seolah sumber kebenaran utama hancur.

Tanpa klasifikasi ini,
tim sering terlalu mudah menjatuhkan semua layanan.

---

## 6. Bentuk Graceful Degradation

Beberapa bentuk umum:
- tampilkan data cache lama
- sembunyikan widget non-kritis
- antrekan proses untuk nanti
- fallback response sederhana
- nonaktifkan fitur mahal sementara

Degradasi tidak harus cantik.
Yang penting:
- aman
- jelas
- menjaga core path

---

## 7. UX Matters

Graceful degradation juga masalah UX.

User harus tahu:
- apa yang masih bekerja
- apa yang tertunda
- apakah perlu mencoba lagi

Kalau sistem diam-diam degrade
tanpa komunikasi jelas,
user akan mengira sistem rusak secara acak.

Degradation yang baik
terasa seperti sistem tetap memegang kendali.

---

## 8. Temporary vs Prolonged Degradation

Beberapa degradasi cocok
untuk gangguan singkat.

Tapi jika gangguan berkepanjangan,
pertanyaan baru muncul:
- apakah mode degrade ini masih aman?
- apakah ada biaya kualitas data?
- apakah operator harus intervensi?

Jangan anggap mode degrade
selalu bisa dijalankan terus-menerus
tanpa konsekuensi.

---

## 9. Healthcare Example

Contoh:
- booking appointment

Jika provider notifikasi down:
- booking tetap tersimpan
- konfirmasi bisa tertunda

Jika dashboard analytics down:
- booking tetap berjalan

Jika database utama untuk slot down:
- booking harus fail safe

Ini contoh perbedaan
antara degradasi yang sehat
dan kompromi yang berbahaya.

---

## 10. Degradation dan Observability

Kalau sistem masuk mode degrade,
tim harus tahu.

Perlu sinyal seperti:
- feature degraded count
- fallback usage rate
- dependency unavailable rate
- mode switch events

Tanpa observability,
degradasi bisa diam-diam menjadi normal baru
dan kualitas sistem menurun tanpa sadar.

---

## 11. Dependency Timeouts and Cutoffs

Graceful degradation sering membutuhkan:
- timeout ketat untuk dependency opsional
- fallback cepat

Kalau dependency opsional dibiarkan timeout lama,
core flow tetap ikut lambat.

Degradasi yang sehat
sering berarti:
- berhenti menunggu lebih cepat
- pilih layanan minimum yang masih berguna

---

## 12. Product Alignment

Degradation tidak bisa didesain murni teknis.

Produk/business perlu menjawab:
- fitur mana yang wajib
- informasi minimum apa yang harus ada
- apa yang boleh tertunda
- apa yang tidak boleh salah

Kalau ini tidak disepakati,
engineer akan menebak-nebak
apa arti "masih layak dipakai".

---

## 13. Graceful Degradation vs Hidden Failure

Ada beda besar antara:
- degradasi yang disengaja dan terukur
  dengan
- kegagalan yang disembunyikan

Kalau sistem:
- diam-diam skip proses penting
- user tidak diberi tahu
- operator tidak tahu

itu bukan graceful degradation.
Itu silent corruption atau silent failure.

---

## 14. Anti-Pattern Umum

1. Semua dependency diperlakukan seolah sama kritikal.
2. Tidak ada fallback untuk fitur non-kritis.
3. Sistem terus menunggu dependency opsional terlalu lama.
4. Degradasi terjadi tapi tidak terlihat oleh tim maupun user.
5. Mengizinkan degradasi pada area yang seharusnya fail safe.

---

## 15. Best Practices

- identifikasi core path dan optional path secara eksplisit.
- siapkan fallback atau reduced mode untuk fitur non-kritis.
- gunakan timeout cepat untuk dependency opsional.
- ukur dan tampilkan status degrade bila relevan.
- bedakan area yang boleh degrade dari area yang harus fail safe.

---

## 16. Pertanyaan Desain Penting

Sebelum mendesain graceful degradation, tanya:
1. Fungsi minimum apa yang harus tetap hidup?
2. Dependency mana yang opsional?
3. Apa fallback yang masih aman?
4. Apa yang harus diketahui user/operator saat degrade?
5. Kapan mode degrade harus dianggap incident serius?

---

## 17. Mini Latihan

Latihan:
1. Petakan satu user journey menjadi core vs optional dependency.
2. Desain fallback untuk dua fitur non-kritis.
3. Tentukan area yang harus fail safe.
4. Buat metric untuk mendeteksi degraded mode.
5. Simulasikan provider eksternal down dan lihat alur minimum yang masih bisa hidup.

---

## 18. Checklist Kelulusan Topik Graceful Degradation

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan degrade dan fail safe,
- memetakan core vs optional path,
- mendesain fallback yang aman,
- memikirkan UX dan observability saat mode degrade aktif,
- menghindari degradasi palsu yang sebenarnya menyembunyikan kegagalan.

---

## 19. Ringkasan Brutal

- Sistem yang hanya berguna saat semua komponen sehat
  adalah sistem rapuh.
- Graceful degradation bukan kompromi murahan.
- Ia adalah bukti bahwa arsitekturmu tahu mana yang benar-benar penting.
