# SQL Join Strategy dan Cardinality Awareness - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- join strategy
- cardinality
- grain data
- efek one-to-many dan many-to-many
- cara mencegah hasil salah dan query mahal

Kalau kamu tidak paham cardinality,
kamu akan:
- salah hitung,
- bingung kenapa hasil berlipat,
- dan menambal query dengan `DISTINCT` seperti orang panik.

---

## 1. Kenapa Topik Ini Penting?

Banyak query rusak bukan karena syntax salah,
tetapi karena engineer tidak paham relasi data.

Masalah umum:
- jumlah revenue dobel
- count appointment membengkak
- dashboard menampilkan total palsu
- join jadi berat karena dataset meledak

Semua itu sering berakar dari:
- join strategy buruk,
- cardinality tidak dipahami.

---

## 2. Apa Itu Cardinality?

Cardinality menjelaskan hubungan jumlah baris antar entitas.

Contoh:
- one-to-one
- one-to-many
- many-to-one
- many-to-many

Ini bukan teori akademik kosong.
Ini fondasi membaca dampak join.

---

## 3. One-to-One

Contoh:
- satu user punya satu profile.

Join one-to-one biasanya aman dari duplikasi,
selama key-nya benar.

Namun tetap harus dipastikan:
- constraint unik memang ada,
- data tidak diam-diam melanggar asumsi.

---

## 4. One-to-Many

Contoh:
- satu patient punya banyak appointments.

Jika `patients` di-join ke `appointments`,
maka satu patient bisa muncul berkali-kali.

Itu normal.
Itu bukan bug.

Bug muncul saat engineer berharap hasil tetap satu baris per patient
padahal join-nya one-to-many.

---

## 5. Many-to-Many

Contoh:
- dokter bisa memiliki banyak spesialisasi tambahan,
- satu spesialisasi bisa dimiliki banyak dokter,
- biasanya ada tabel penghubung.

Many-to-many mudah memicu ledakan baris.

Kalau tidak hati-hati,
join ke beberapa tabel many-to-many bisa membuat result set membesar brutal.

---

## 6. Grain Data

Grain = satu baris mewakili apa?

Contoh:
- satu baris = satu patient
- satu baris = satu appointment
- satu baris = satu appointment item
- satu baris = satu event log

Pertanyaan wajib sebelum menulis query:
- grain hasil yang saya inginkan apa?

Kalau tidak jelas,
hasil query hampir pasti berantakan.

---

## 7. Join Strategy Bukan Sekadar Syntax

Join strategy berarti memutuskan:
- tabel mana yang jadi basis,
- urutan join,
- kapan filter diterapkan,
- kapan agregasi dilakukan,
- kapan perlu pre-aggregation.

Engineer lemah hanya bertanya:
- "join-nya pakai inner atau left?"

Engineer matang bertanya:
- "grain akhirnya apa dan bagaimana menjaga jumlah baris tetap benar?"

---

## 8. Contoh Kesalahan Umum

Tabel:
- `doctors`
- `appointments`
- `appointment_notes`

Satu appointment bisa punya banyak notes.

Query:

```sql
SELECT d.id, COUNT(a.id) AS total_appointments
FROM doctors d
LEFT JOIN appointments a
  ON d.id = a.doctor_id
LEFT JOIN appointment_notes n
  ON a.id = n.appointment_id
GROUP BY d.id;
```

Masalah:
- `COUNT(a.id)` bisa membengkak
  karena setiap appointment berulang sesuai jumlah notes.

Solusi:
- agregasikan notes dulu,
- atau hitung `COUNT(DISTINCT a.id)` jika memang tepat,
- atau ubah grain query.

---

## 9. COUNT(DISTINCT) Bukan Obat Segala Penyakit

`COUNT(DISTINCT ...)` kadang benar,
tapi sering dipakai untuk menutupi desain query salah.

Tanya dulu:
- apakah duplication ini memang berasal dari join yang valid?
- atau saya seharusnya pre-aggregate di tabel child?

Kalau semua masalah kamu selesaikan dengan `DISTINCT`,
itu tanda kamu tidak paham grain.

---

## 10. Pre-Aggregation Sebelum Join

Ini pola penting.

Contoh:
- hitung total note per appointment dulu,
- lalu join hasil ringkas ke tabel utama.

```sql
WITH note_counts AS (
  SELECT appointment_id, COUNT(*) AS total_notes
  FROM appointment_notes
  GROUP BY appointment_id
)
SELECT
  a.id,
  COALESCE(n.total_notes, 0) AS total_notes
FROM appointments a
LEFT JOIN note_counts n
  ON a.id = n.appointment_id;
```

Keuntungan:
- grain lebih terkontrol,
- join lebih bersih,
- risiko hasil dobel berkurang.

---

## 11. Join Order dan Filter Timing

Jika filter diterapkan terlambat,
dataset yang ikut join bisa terlalu besar.

Contoh buruk:
- join semua appointments 3 tahun,
- baru filter dokter atau tanggal di akhir.

Contoh lebih baik:
- filter date range lebih awal,
- baru join ke tabel lain.

---

## 12. Dimension Table vs Fact Table

Dalam banyak sistem:
- fact table = event/transaksi (`appointments`)
- dimension/master table = referensi (`patients`, `doctors`)

Strategi umum:
- mulai dari fact jika query fokus transaksi,
- join ke dimension untuk enrich data.

Kalau kamu mulai dari dimensi tanpa alasan,
hasil bisa lebih berat atau membingungkan.

---

## 13. Join Explosion

Join explosion terjadi saat jumlah baris hasil
melonjak jauh di atas ekspektasi.

Penyebab umum:
- many-to-many join
- kondisi join salah
- grain tidak dipahami
- child table tidak dipre-aggregate

Tanda:
- actual rows sangat besar di plan
- count hasil tidak masuk akal
- runtime ikut meledak

---

## 14. Join Key Salah

Kesalahan fatal:

```sql
ON patients.id = appointments.id
```

padahal harusnya:

```sql
ON patients.id = appointments.patient_id
```

Query tetap bisa jalan,
tapi hasilnya salah total.

Jadi:
- query valid secara syntax
  belum tentu valid secara bisnis.

---

## 15. Semi-Join dan Anti-Join

Kadang kamu tidak perlu benar-benar join semua data.

Kalau tujuan hanya:
- cek ada relasi atau tidak,
- cari yang tidak punya relasi,

sering lebih tepat pakai:
- `EXISTS`
- `NOT EXISTS`

Ini bisa lebih jelas dan lebih efisien
daripada join lalu filter `NULL`.

---

## 16. Studi Kasus Revenue Salah Hitung

Misal:
- `orders`
- `order_items`
- `payments`

Jika order punya banyak item
dan juga banyak payment record,
join tiga tabel sekaligus bisa melipatgandakan angka.

Solusi:
- agregasikan `order_items` per order,
- agregasikan `payments` per order,
- lalu join dua hasil ringkas ke `orders`.

Inilah pentingnya cardinality awareness.

---

## 17. LEFT JOIN yang Diam-Diam Jadi INNER JOIN

Ini jebakan klasik:

```sql
SELECT ...
FROM patients p
LEFT JOIN appointments a
  ON p.id = a.patient_id
WHERE a.status = 'completed';
```

Efek:
- pasien tanpa appointment hilang,
- perilaku jadi mirip `INNER JOIN`.

Jika memang ingin mempertahankan semua pasien,
filter harus dipikirkan ulang
dan sering ditempatkan di `ON`.

---

## 18. Cardinality dan Aggregation Order

Aturan emas:
- agregasi setelah join bisa benar,
- tapi bisa salah fatal jika join menggandakan baris.

Pertanyaan:
- apakah saya harus join dulu baru agregasi,
  atau agregasi dulu baru join?

Jawabannya tergantung grain target.

---

## 19. Cara Review Query Join

Checklist review:
1. grain hasil yang diinginkan apa?
2. relasi antar tabel one-to-many atau many-to-many?
3. apakah ada child table yang perlu diringkas dulu?
4. apakah `DISTINCT` dipakai sebagai plester?
5. apakah hasil count/amount bisa berlipat?

---

## 20. Best Practices

- tulis grain query dalam pikiran atau komentar desain.
- mulai dari tabel paling relevan ke pertanyaan bisnis.
- pre-aggregate child table jika perlu.
- gunakan `EXISTS` untuk existence check.
- validasi dengan data sampel yang jelas cardinality-nya.

---

## 21. Anti-Pattern Umum

1. Join banyak tabel lalu berharap count tetap benar.
2. Pakai `DISTINCT` tanpa tahu akar duplikasi.
3. Tidak tahu satu baris hasil mewakili apa.
4. Filter penting diterapkan terlambat.
5. Menganggap hasil cepat = hasil benar.

---

## 22. Mini Latihan

Latihan:
1. Jelaskan grain untuk query daftar appointment.
2. Tunjukkan contoh join one-to-many yang menggandakan hasil.
3. Perbaiki query count appointment yang membengkak karena notes.
4. Bandingkan `JOIN` vs `EXISTS` untuk cek pasien yang pernah booking.
5. Buat strategi query untuk total revenue per order tanpa double count.

---

## 23. Jawaban Contoh Ringkas

Untuk cek pasien yang pernah booking:

```sql
SELECT p.id, p.full_name
FROM patients p
WHERE EXISTS (
  SELECT 1
  FROM appointments a
  WHERE a.patient_id = p.id
);
```

Ini sering lebih jujur terhadap kebutuhan
dibanding join yang tidak perlu membawa semua kolom child.

---

## 24. Checklist Kelulusan Topik 16

Kamu dianggap lulus jika bisa:
- menjelaskan cardinality one-to-one, one-to-many, many-to-many,
- menentukan grain query,
- mencegah double counting akibat join,
- tahu kapan perlu pre-aggregation,
- menilai join strategy berdasarkan correctness dan performa.

---

## 25. Ringkasan Brutal

- Banyak query salah bukan karena SQL-nya jelek,
  tapi karena otaknya tidak paham relasi data.
- Cardinality awareness itu pembeda antara sekadar bisa join
  dan benar-benar bisa dipercaya.
