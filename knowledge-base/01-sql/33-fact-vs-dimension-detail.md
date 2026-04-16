# SQL Data Modeling Analytics: Fact vs Dimension - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- fact table
- dimension table
- grain analytics
- star schema dasar
- kesalahan umum modeling analytics

Banyak developer OLTP bingung saat masuk analytics
karena mencoba memakai pola transaksi mentah apa adanya.
Itu sering berakhir buruk.

---

## 1. Kenapa Perlu Model Analytics?

Query analytics berbeda dengan query transaksi.

Analytics biasanya bertanya:
- berapa total booking per hari?
- conversion rate per channel?
- no-show rate per dokter?
- retention user per cohort?

Untuk menjawab ini dengan stabil,
kamu butuh model data yang jelas.

---

## 2. Apa Itu Fact Table?

Fact table menyimpan:
- kejadian
- metrik
- angka
- foreign key ke konteks lain

Contoh:
- `fact_appointments`
- `fact_payments`
- `fact_sessions`

Fact biasanya:
- besar
- tumbuh cepat
- jadi pusat perhitungan analytics

---

## 3. Apa Itu Dimension Table?

Dimension table menyimpan konteks/deskripsi.

Contoh:
- `dim_doctor`
- `dim_patient`
- `dim_date`
- `dim_channel`
- `dim_clinic`

Dimension membantu menjawab:
- appointment ini milik dokter siapa?
- channel-nya apa?
- tanggalnya masuk bulan apa?

---

## 4. Grain Itu Wajib Jelas

Sebelum membuat fact,
pertanyaan utama:
- satu baris fact mewakili apa?

Contoh:
- satu appointment
- satu payment attempt
- satu notification delivery

Kalau grain tidak jelas,
semua metrik turunannya akan kacau.

---

## 5. Contoh Grain yang Benar

Misal `fact_appointments`:
- satu baris = satu appointment unik

Kolom:
- appointment_id
- doctor_key
- patient_key
- date_key
- clinic_key
- channel_key
- status
- waiting_minutes

Dengan grain ini,
count appointment jadi jelas.

---

## 6. Kesalahan Grain Umum

Contoh buruk:
- satu baris kadang satu appointment,
  kadang satu status change

Itu mencampur dua level kejadian.

Akibat:
- count membingungkan
- conversion dan no-show bisa salah
- join ke dimensi jadi ambigu

Pisahkan event yang berbeda
ke fact yang berbeda jika perlu.

---

## 7. Fact Table Tidak Sama dengan Tabel Operasional

Tabel transaksi mentah sering:
- terlalu normalized
- terlalu granular
- penuh status teknis
- tidak stabil untuk pelaporan

Fact table analytics sering merupakan:
- bentuk yang lebih stabil
- sudah dibersihkan
- sudah ditetapkan grain-nya

Jangan paksakan OLTP raw schema
jadi model analytics tanpa berpikir.

---

## 8. Dimension Table Bisa SCD

Dimension bisa berubah seiring waktu.

Contoh:
- dokter pindah klinik
- nama channel berubah
- klasifikasi spesialisasi diperbarui

Dalam analytics,
kadang perlu strategi versioning dimension
(slowly changing dimension),
tapi untuk fondasi dasar,
yang paling penting adalah paham bahwa dimensi bisa berubah.

---

## 9. Date Dimension

Date dimension sering sangat berguna.

Kenapa?
- analisis waktu sangat umum
- butuh atribut turunan:
  - hari
  - minggu
  - bulan
  - kuartal
  - hari kerja/libur

Daripada hitung terus-menerus,
dimension waktu membuat analisis lebih konsisten.

---

## 10. Star Schema Dasar

Pola umum analytics:
- satu fact di tengah
- beberapa dimension di sekeliling

Ini disebut star schema.

Keuntungan:
- query analitik lebih jelas
- metrik lebih konsisten
- dashboard lebih mudah dibangun

Untuk banyak kasus,
star schema sederhana sudah sangat kuat.

---

## 11. Snowflake vs Star

Dimension bisa dinormalisasi lagi
menjadi snowflake style.

Tapi:
- star schema biasanya lebih mudah dipakai analyst,
- join lebih sedikit,
- lebih mudah dipahami.

Terlalu banyak normalisasi di analytics
bisa merusak kemudahan pakai.

---

## 12. Factless Fact

Tidak semua fact butuh angka eksplisit.

Kadang keberadaan baris itu sendiri adalah fakta.

Contoh:
- attendance event
- patient check-in event
- doctor availability slot

Count atas baris-baris ini
sudah menjadi metrik.

---

## 13. Additive, Semi-Additive, Non-Additive Measure

Measure di fact bisa berbeda sifat:
- additive: bisa dijumlah lintas dimensi
- semi-additive: terbatas di dimensi tertentu
- non-additive: tidak bisa dijumlah sembarangan

Contoh:
- total_amount additive
- account balance sering semi-additive
- ratio biasanya non-additive

Kalau ini tidak dipahami,
dashboard bisa kelihatan rapi tapi salah.

---

## 14. Healthcare Example

Fact:
- `fact_appointments`

Dimensions:
- `dim_doctor`
- `dim_clinic`
- `dim_date`
- `dim_channel`
- `dim_status`

Metrik:
- total appointments
- completed appointments
- no-show count
- average waiting time

Model ini jauh lebih cocok
untuk analisis operasional
daripada query langsung dari tabel transaksi mentah berlapis.

---

## 15. Surrogate Key vs Natural Key

Dimension analytics sering memakai surrogate key.

Kenapa?
- memudahkan history/versioning
- decouple dari ID operasional
- lebih fleksibel saat source system berubah

Natural key kadang tetap disimpan
sebagai business identifier,
tapi tidak selalu jadi key utama analytics.

---

## 16. Slowly Changing Dimension Awareness

Misal dokter pindah spesialisasi.

Pertanyaan:
- laporan historis harus mengikuti spesialisasi lama atau baru?

Ini keputusan penting.

Kalau tidak dipikirkan,
angka historis bisa bergeser
hanya karena master data hari ini berubah.

---

## 17. Common Modeling Mistakes

1. Grain fact tidak jelas.
2. Mencampur event berbeda dalam satu fact.
3. Menggunakan raw OLTP schema mentah tanpa transformasi.
4. Dimension terlalu teknis untuk dipakai analyst.
5. Ratio disimpan/diagregasi sembarangan.

---

## 18. Query Benefit

Dengan fact/dimension yang baik:
- query lebih konsisten
- dashboard lebih stabil
- definisi KPI lebih mudah dijaga

Tanpa model yang baik:
- setiap analyst membuat logika sendiri
- angka antar dashboard bisa konflik

Itu masalah governance, bukan sekadar SQL.

---

## 19. Best Practices

- tetapkan grain sebelum desain tabel.
- pisahkan fact dan dimension dengan disiplin.
- buat naming yang jelas.
- dokumentasikan measure dan definisi KPI.
- jangan memaksa model OLTP menjadi model analytics final.

---

## 20. Anti-Pattern Umum

1. Satu tabel besar campur fakta dan atribut acak.
2. Dashboard langsung query ke tabel transaksi mentah.
3. Tidak ada date dimension untuk analisis waktu intensif.
4. Grain berubah-ubah antar pipeline.
5. Tidak ada definisi metric yang konsisten.

---

## 21. Mini Latihan

Latihan:
1. Tentukan fact dan dimension untuk sistem appointment.
2. Tentukan grain dari `fact_appointments`.
3. Jelaskan kenapa `dim_date` berguna.
4. Jelaskan kapan raw OLTP schema tidak cocok untuk analytics.
5. Bedakan metric additive vs non-additive dengan contoh.

---

## 22. Jawaban Contoh Ringkas

Contoh:
- fact: `fact_appointments`
- dimensions: `dim_doctor`, `dim_clinic`, `dim_date`, `dim_channel`

Grain:
- satu baris = satu appointment unik

`dim_date` berguna karena:
- atribut waktu jadi konsisten,
- analisis hari/minggu/bulan lebih mudah.

---

## 23. Checklist Kelulusan Topik 33

Kamu dianggap lulus jika bisa:
- menjelaskan fact vs dimension,
- menentukan grain analytics,
- membuat model star schema dasar,
- memahami kenapa OLTP dan analytics model berbeda,
- berpikir KPI-oriented, bukan hanya table-oriented.

---

## 24. Ringkasan Brutal

- Analytics tanpa grain yang jelas = pabrik angka palsu.
- Fact dan dimension bukan jargon BI.
  Itu alat supaya angka bisa dipercaya.
