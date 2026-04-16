# SLI / SLO / Error Budget Dasar - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu SLI
- apa itu SLO
- apa itu error budget
- kenapa reliability butuh target yang terukur
- bagaimana metrik teknis dihubungkan ke ekspektasi layanan

Banyak tim berkata:
- "kita mau sistem andal"

Itu terdengar bagus,
tapi tanpa definisi numerik,
itu hanya niat.

SLI, SLO, dan error budget
adalah cara membuat reliability
menjadi keputusan operasional nyata,
bukan slogan.

---

## 1. Apa Itu SLI?

SLI = Service Level Indicator.

Ini adalah indikator terukur
tentang kualitas layanan.

Contoh:
- persentase request sukses
- latency p95
- fresh read success rate
- job completion within threshold

SLI harus merepresentasikan
sesuatu yang berarti bagi layanan,
bukan sekadar metrik acak yang mudah diambil.

---

## 2. Apa Itu SLO?

SLO = Service Level Objective.

Ini adalah target
yang ditetapkan untuk satu atau beberapa SLI.

Contoh:
- 99.9% request sukses per 30 hari
- 95% booking selesai < 1 detik

SLO memberi batas harapan:
- seberapa baik layanan harus berjalan

Tanpa SLO,
tim sulit tahu:
- kondisi ini masih wajar
  atau
- sudah tidak dapat diterima

---

## 3. Apa Itu Error Budget?

Error budget adalah toleransi kegagalan
yang tersisa
berdasarkan SLO.

Jika SLO adalah:
- 99.9% success

maka ada sebagian kecil failure
yang secara teoritis masih "diperbolehkan".

Error budget membantu tim menyeimbangkan:
- reliability
  dan
- change velocity

Ini konsep penting,
bukan permainan angka semata.

---

## 4. Kenapa Ini Penting?

Karena tanpa target yang jelas:
- reliability discussion jadi subjektif
- tim overreact atau underreact
- release decision tidak punya dasar

SLO memberi bahasa bersama
antara engineering, ops, dan product:
- layanan ini dianggap sehat pada level berapa?

Error budget memberi sinyal:
- kapan tim masih boleh agresif berubah
- kapan harus menahan perubahan dan fokus stabilitas

---

## 5. SLI yang Baik Harus Bermakna

Kesalahan umum:
- memilih metrik yang mudah,
  bukan yang relevan

Contoh buruk:
- CPU usage sebagai SLI utama user-facing service

CPU bisa penting,
tapi user tidak membeli CPU.

Contoh lebih baik:
- request availability
- end-to-end latency
- success rate pada action penting

SLI harus dekat ke pengalaman layanan.

---

## 6. User-Centric Thinking

SLI yang kuat
sering berpikir dari sisi user:
- apakah user bisa login?
- apakah booking berhasil?
- apakah data muncul cukup cepat?

Ini lebih berharga
daripada sekadar metric internal yang rapi
tapi tidak mewakili layanan nyata.

Reliability tanpa user perspective
mudah salah arah.

---

## 7. Availability vs Latency

Reliability bukan cuma uptime.

Layanan bisa:
- technically up
  tapi
- sangat lambat

Dari perspektif user,
itu tetap buruk.

Karena itu SLI/SLO
sering perlu mencakup:
- availability
- latency

Kadang juga freshness,
correctness,
atau timeliness untuk workflow tertentu.

---

## 8. Composite Service dan Journey

Jika layanan kompleks,
kadang satu SLI saja tidak cukup.

Misal user journey booking:
- auth
- search slot
- create booking
- confirmation

SLO yang baik
bisa melihat perjalanan penting,
bukan hanya endpoint tunggal.

Tapi hati-hati:
- jangan terlalu rumit sampai tak bisa dioperasikan.

---

## 9. Window dan Measurement Period

SLO selalu terkait jendela waktu:
- per hari
- per minggu
- per 30 hari

Jendela ini memengaruhi sensitivitas.

Terlalu pendek:
- noise tinggi

Terlalu panjang:
- respons lambat terhadap degradasi

Pilih window
yang sesuai kebutuhan operasional dan bisnis.

---

## 10. Error Budget sebagai Alat Keputusan

Error budget bukan hanya laporan.

Ia dipakai untuk keputusan seperti:
- lanjut rollout atau tahan?
- fokus fitur baru atau stabilisasi?
- dependency yang sering error sudah melewati batas tidak?

Kalau error budget habis,
secara filosofi tim
harus lebih hati-hati mengubah sistem.

Kalau tidak,
SLO hanya jadi poster.

---

## 11. Trade-Off with Velocity

SLO membantu mencegah dua ekstrem:
- terlalu lambat berubah karena takut rusak
- terlalu agresif berubah sampai user terus tersakiti

Error budget membuat trade-off itu eksplisit.

Ini penting
karena engineering selalu hidup
di antara reliability dan speed.

Tim matang tidak pura-pura bisa memaksimalkan keduanya tanpa batas.

---

## 12. Healthcare Example

Untuk sistem appointment:

Contoh SLI:
- persentase booking sukses
- latency booking p95

Contoh SLO:
- 99.95% booking request sukses per 30 hari
- 95% booking selesai < 2 detik

Ini lebih berguna
daripada sekadar bilang:
- "booking service harus cepat"

Sekarang ada definisi operasional.

---

## 13. Don't Choose Impossible SLOs

SLO terlalu ketat
tanpa sumber daya dan desain memadai
akan membuat tim:
- frustasi
- gaming metrics
- mengabaikan target

SLO terlalu longgar
juga tidak berguna.

Target harus:
- menantang
- realistis
- selaras dengan kebutuhan bisnis

Ini keputusan governance,
bukan tebak angka.

---

## 14. Alerting and SLO

Alert yang baik
sering diturunkan dari burn rate/error budget usage,
bukan sekadar threshold mentah.

Karena:
- satu spike kecil mungkin tidak serius
- tapi burn rate tinggi terus-menerus sangat serius

SLO memberikan kerangka
untuk alert yang lebih cerdas.

Tanpa itu,
alerting mudah jadi noisy dan reaksioner.

---

## 15. Anti-Pattern Umum

1. Memilih SLI yang tidak mewakili pengalaman layanan.
2. Menetapkan SLO tanpa tahu apakah bisa diukur.
3. Error budget dihitung tapi tidak dipakai untuk keputusan.
4. SLO terlalu idealis atau terlalu longgar.
5. Hanya mengukur uptime, lupa latency atau correctness.

---

## 16. Best Practices

- pilih SLI yang dekat dengan pengalaman user atau workflow penting.
- tetapkan SLO yang realistis dan operasional.
- gunakan error budget sebagai alat keputusan nyata.
- hubungkan alerting dengan budget burn, bukan threshold asal.
- tinjau ulang SLI/SLO seiring evolusi produk dan arsitektur.

---

## 17. Pertanyaan Desain Penting

Sebelum menetapkan SLO, tanya:
1. Apa yang benar-benar dirasakan user sebagai kualitas layanan?
2. Apakah indikator itu bisa diukur dengan andal?
3. Target apa yang masuk akal secara bisnis dan teknis?
4. Apa keputusan yang akan dipengaruhi oleh error budget?
5. Apakah tim siap mengubah perilaku saat budget menipis?

---

## 18. Mini Latihan

Latihan:
1. Pilih satu layanan dan tentukan dua SLI yang benar-benar bermakna.
2. Tetapkan SLO awal yang realistis.
3. Hitung error budget kasarnya.
4. Tentukan aksi jika burn rate terlalu tinggi.
5. Audit apakah metric sekarang sudah cukup untuk menghitung SLO itu.

---

## 19. Checklist Kelulusan Topik SLI / SLO / Error Budget Dasar

Kamu dianggap lulus topik ini jika sudah bisa:
- membedakan SLI, SLO, dan error budget,
- memilih indikator yang user-centric,
- menetapkan target yang operasional,
- memakai error budget untuk keputusan perubahan,
- menghindari SLO yang hanya bagus di slide.

---

## 20. Ringkasan Brutal

- Reliability yang tidak didefinisikan
  tidak akan dikelola dengan baik.
- SLO membuat ekspektasi jadi nyata.
- Error budget memaksa tim jujur:
  masih aman untuk berubah,
  atau sudah terlalu banyak menyakiti user?
