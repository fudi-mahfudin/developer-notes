# SQL Funnel, Cohort, dan Retention Query - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- funnel query
- cohort analysis
- retention analysis
- jebakan definisi metrik
- kesalahan umum saat menghitung conversion

Banyak dashboard growth kelihatan keren,
tapi logika query-nya sampah.
Kalau definisi funnel/cohort/retention salah,
angka cantik itu tidak bernilai.

---

## 1. Kenapa Topik Ini Penting?

Tim produk dan bisnis sering bertanya:
- berapa conversion rate?
- berapa user yang lanjut ke langkah berikutnya?
- berapa retention minggu ke-4?

Jawaban SQL untuk pertanyaan ini
harus sangat disiplin.

Sedikit salah grain atau definisi waktu,
hasil bisa menyesatkan keputusan bisnis.

---

## 2. Funnel Analysis

Funnel melihat
berapa banyak entitas melewati urutan langkah.

Contoh funnel appointment:
1. buka halaman dokter
2. pilih slot
3. submit booking
4. booking confirmed
5. hadir konsultasi

Funnel bukan sekadar count event.
Yang diukur adalah transisi antar tahap.

---

## 3. Unit of Analysis

Pertanyaan paling penting:
- funnel ini diukur per user?
- per session?
- per appointment attempt?
- per patient?

Kalau unit tidak jelas,
conversion rate bisa palsu.

Contoh:
- user yang klik 10 kali
  tidak boleh otomatis dihitung sebagai 10 calon customer
  jika unit analisisnya per user.

---

## 4. Step Definition Harus Ketat

Setiap step funnel harus punya definisi eksplisit.

Misal:
- `booking confirmed` = ada record appointment status confirmed
- `attended` = appointment status completed

Kalau definisi step kabur,
funnel tidak bisa dipercaya.

---

## 5. Ordered Funnel vs Unordered Event Count

Kesalahan umum:
- hanya menghitung semua event per kategori,
  lalu menyebutnya funnel.

Padahal funnel butuh:
- urutan
- relasi antar langkah
- batas waktu yang masuk akal

Tanpa urutan,
itu cuma event summary.

---

## 6. Cohort Analysis

Cohort = kelompok entitas
berdasarkan titik awal yang sama.

Contoh:
- cohort pasien berdasarkan bulan pertama booking
- cohort dokter berdasarkan bulan onboarding

Tujuan:
- melihat perilaku kelompok dari waktu ke waktu

Cohort membantu menghindari campur aduk user lama dan baru.

---

## 7. Retention Analysis

Retention mengukur
apakah entitas kembali aktif
setelah titik awal tertentu.

Contoh:
- dari pasien yang booking pertama kali di Januari,
  berapa yang booking lagi di Februari?

Retention bukan sekadar "masih ada di database".
Retention harus didefinisikan berdasarkan perilaku aktif yang jelas.

---

## 8. Common Mistake: Wrong Denominator

Kesalahan klasik funnel/retention:
- denominator salah.

Contoh:
- conversion step 2 dihitung terhadap semua user,
  padahal seharusnya terhadap user yang lulus step 1.

Atau retention dihitung dari total user aktif bulan ini,
padahal harus dari cohort awal.

Kalau denominator salah,
persentase jadi bohong.

---

## 9. Event Table vs State Table

Funnel dan retention sering lebih cocok
dihitung dari event table,
bukan state table snapshot.

Karena:
- event memberi urutan waktu,
- perubahan perilaku bisa dilacak,
- analisis konversi jadi lebih jujur.

State table tetap berguna,
tapi tidak selalu cukup.

---

## 10. Healthcare Example Funnel

Funnel booking:
1. patient_search_doctor
2. patient_view_schedule
3. patient_select_slot
4. patient_submit_booking
5. appointment_confirmed

Pertanyaan:
- apakah 1 patient boleh masuk berkali-kali?
- apakah yang dihitung per session atau per patient?
- berapa window waktu antar step?

Semua ini harus dijawab dulu
sebelum query ditulis.

---

## 11. Time Window Constraint

Funnel sering butuh window waktu.

Contoh:
- step berikutnya harus terjadi dalam 24 jam
- atau dalam session yang sama

Kalau tidak ada batas,
user bisa melakukan step 1 hari ini
dan step 5 tiga bulan kemudian
lalu tetap dianggap satu funnel.

Itu sering tidak bermakna.

---

## 12. First Event vs Any Event

Untuk cohort/retention,
sering perlu memilih:
- first event
- first booking
- first completed appointment

Kalau tidak jelas memakai yang mana,
cohort bisa berubah-ubah
dan hasil tidak stabil.

---

## 13. Retention Window

Retention bisa dihitung:
- day 1
- day 7
- week 4
- month 3

Pilih berdasarkan ritme produk.

Untuk healthcare booking,
mungkin weekly/monthly lebih masuk akal
daripada daily untuk beberapa use case.

---

## 14. SQL Strategy Umum

Biasanya pakai:
- CTE
- window function
- `DATE_TRUNC`
- self join antar event
- grouping per cohort bucket

Tapi logika bisnisnya lebih penting
daripada sintaksnya.

Kalau definisi cohort salah,
window function canggih tidak akan menolong.

---

## 15. Duplicate Event Problem

Event tracking sering kotor:
- klik dobel
- retry event
- replay
- instrumentation bug

Kalau query funnel tidak dedupe dengan benar,
angka konversi bisa membengkak.

Maka sering perlu:
- pilih first event
- dedupe per user/session/time bucket

---

## 16. Cohort by First Booking Example

Ide:
- tentukan bulan booking pertama tiap patient
- kelompokkan jadi cohort
- hitung booking kembali di bulan berikutnya

Ini memberi gambaran retention yang lebih jujur
daripada hanya menghitung active patient mentah per bulan.

---

## 17. Retention vs Reactivation

Jangan campur retention dengan reactivation.

Retention:
- tetap kembali dalam window tertentu dari cohort

Reactivation:
- sempat hilang lalu kembali lagi

Kalau definisi dua hal ini dicampur,
strategi produk bisa salah sasaran.

---

## 18. Reporting Pitfalls

Kesalahan umum:
- timezone tidak jelas
- event duplicate
- denominator salah
- user anonim dan logged-in tercampur
- unit analisis berubah

Semua ini bisa membuat chart kelihatan bagus
tapi tidak bisa dipakai mengambil keputusan.

---

## 19. Best Practices

- tetapkan unit analisis.
- tetapkan definisi step dan cohort secara tertulis.
- kontrol duplicate event.
- gunakan time window yang logis.
- review query dengan product/analytics owner.

---

## 20. Anti-Pattern Umum

1. Menyebut event count sebagai funnel.
2. Cohort dihitung dari event yang tidak stabil.
3. Retention denominator salah.
4. Tidak dedupe event tracking.
5. Tidak mendokumentasikan definisi metric.

---

## 21. Mini Latihan

Latihan:
1. Tentukan unit analisis untuk funnel booking.
2. Definisikan cohort pasien berdasarkan first completed appointment.
3. Jelaskan beda retention dan reactivation.
4. Sebutkan 3 sumber bias umum dalam funnel query.
5. Rancang langkah dedup sederhana untuk event table.

---

## 22. Jawaban Contoh Ringkas

Unit analisis funnel booking bisa:
- per patient untuk conversion user-level,
atau
- per booking attempt untuk conversion flow-level.

Retention:
- menghitung apakah cohort kembali aktif dalam window tertentu.

Reactivation:
- menghitung kembali aktif setelah periode dorman.

---

## 23. Checklist Kelulusan Topik 34

Kamu dianggap lulus jika bisa:
- menjelaskan funnel, cohort, dan retention dengan benar,
- menentukan denominator yang tepat,
- memilih unit analisis yang jelas,
- mengendalikan duplicate event,
- menulis query analytics yang bisa dipercaya secara definisi.

---

## 24. Ringkasan Brutal

- Dashboard growth paling berbahaya
  adalah yang terlihat rapi tapi definisinya salah.
- SQL analytics yang bagus itu disiplin definisi,
  bukan cuma jago `GROUP BY`.
