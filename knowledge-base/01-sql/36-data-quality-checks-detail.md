# SQL Data Quality Checks - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu data quality
- jenis pemeriksaan kualitas data
- duplicate check
- null anomaly
- referential issue
- freshness, completeness, consistency

Kalau timmu tidak punya kebiasaan memeriksa kualitas data,
cepat atau lambat dashboard, automasi, dan keputusan bisnis
akan dibangun di atas data busuk.

---

## 1. Kenapa Data Quality Penting?

Sistem bisa terlihat jalan normal:
- API sehat
- query sukses
- dashboard terisi

Tapi kalau datanya salah,
semua lapisan di atasnya ikut salah.

Data quality penting karena:
- analitik butuh akurasi
- operasional butuh keandalan
- compliance butuh bukti
- automasi butuh input yang benar

Data jelek bukan masalah "BI team saja".
Itu masalah sistem.

---

## 2. Apa Itu Data Quality?

Data quality adalah tingkat
di mana data:
- lengkap
- akurat
- konsisten
- valid
- tepat waktu
- dapat dipercaya untuk dipakai

Tidak ada satu metrik tunggal yang mewakili semuanya.
Karena itu data quality harus dilihat dari beberapa dimensi.

---

## 3. Dimensi Utama Data Quality

Dimensi yang paling umum:
- completeness
- uniqueness
- validity
- consistency
- timeliness/freshness
- referential integrity

Kalau satu dimensi rusak,
use case tertentu bisa langsung gagal
walau dimensi lain masih bagus.

---

## 4. Completeness

Completeness berarti
field penting yang seharusnya terisi
memang terisi.

Contoh:
- `patient_id` pada `appointments` tidak boleh kosong
- `schedule_at` tidak boleh hilang
- `status` harus ada

Query sederhana:

```sql
SELECT COUNT(*) AS missing_schedule
FROM appointments
WHERE schedule_at IS NULL;
```

Completeness yang buruk sering terjadi
karena bug input, integrasi gagal, atau migration setengah jalan.

---

## 5. Uniqueness

Uniqueness berarti
entitas yang seharusnya unik tidak duplikat.

Contoh:
- external payment reference
- appointment confirmation code
- MRN tertentu

Check duplikasi:

```sql
SELECT confirmation_code, COUNT(*) AS cnt
FROM appointments
GROUP BY confirmation_code
HAVING COUNT(*) > 1;
```

Duplikasi bisa merusak:
- billing
- reporting
- idempotency
- auditability

---

## 6. Validity

Validity berarti
nilai berada dalam rentang atau format yang masuk akal.

Contoh:
- `waiting_minutes >= 0`
- `status` termasuk daftar valid
- `date_of_birth` tidak di masa depan

Data bisa lengkap tapi tetap tidak valid.
Itu sebabnya `NOT NULL` saja tidak cukup.

---

## 7. Consistency

Consistency berarti
data tidak saling bertentangan lintas tabel/kolom.

Contoh:
- appointment `status = completed`
  tapi `completed_at` kosong
- payment `status = paid`
  tapi `paid_at` kosong
- patient `deleted_at` terisi
  tapi akun masih dianggap aktif di tabel lain

Inilah tipe masalah yang sering lolos
jika tim hanya cek NULL.

---

## 8. Freshness / Timeliness

Freshness berarti
data datang tepat waktu
sesuai ekspektasi sistem.

Contoh:
- ETL harian seharusnya selesai sebelum 07:00
- event notification seharusnya muncul dalam 5 menit
- replication lag tidak boleh melewati ambang tertentu

Data yang akurat tapi telat
bisa sama tidak bergunanya dengan data salah.

---

## 9. Referential Integrity

Ini memastikan hubungan antar tabel masuk akal.

Contoh:
- semua `appointments.patient_id`
  harus punya pasangan di `patients.id`

Check:

```sql
SELECT a.id
FROM appointments a
LEFT JOIN patients p
  ON a.patient_id = p.id
WHERE p.id IS NULL;
```

Kalau orphan rows muncul,
berarti ada kebocoran integritas.

---

## 10. Duplicate vs Near-Duplicate

Duplicate murni:
- nilai kunci sama persis

Near-duplicate:
- data tampak berbeda sedikit
  tapi mewakili entitas yang sama

Contoh:
- `Andi Saputra` vs `Andi  Saputra`
- `+62812...` vs `0812...`

Near-duplicate lebih sulit
dan sering butuh normalisasi/heuristik.

---

## 11. Source of Data Quality Problems

Masalah kualitas data sering datang dari:
- bug aplikasi
- import manual
- integrasi pihak ketiga
- retry yang tidak idempotent
- migration gagal
- validasi lemah
- race condition

Kalau akar sumber tidak diperbaiki,
quality check cuma jadi alarm berulang.

---

## 12. Preventive vs Detective Controls

Preventive:
- constraint
- validation
- type safety
- idempotency

Detective:
- query quality check
- anomaly dashboard
- reconciliation report

Kamu butuh keduanya.

Kalau hanya detective,
data jelek terus masuk.
Kalau hanya preventive,
beberapa masalah masih bisa lolos.

---

## 13. Row-Level vs Aggregate-Level Checks

Row-level check:
- cari baris invalid

Aggregate-level check:
- total harian tiba-tiba turun 80%
- jumlah appointment hari ini jauh anomali

Aggregate checks penting
karena beberapa masalah tidak terlihat dari satu baris saja.

---

## 14. Reconciliation

Reconciliation berarti
membandingkan dua sumber data
yang seharusnya selaras.

Contoh:
- total booking di app vs total booking di warehouse
- payment success di gateway vs payment table internal

Reconciliation sangat penting
untuk sistem dengan banyak integrasi.

---

## 15. Data Quality Threshold

Tidak semua pelanggaran harus bernilai nol.

Beberapa metrik bisa punya ambang:
- missing optional field < 0.1%
- replication lag < 60 detik
- duplicate payment reference = 0

Tentukan mana yang absolut
dan mana yang tolerable.

---

## 16. Healthcare Example

Contoh check penting:
- `appointments.schedule_at` tidak null
- `status='completed'` harus punya `completed_at`
- semua `doctor_id` harus valid
- tidak ada double booking dokter di slot yang sama
- nomor telepon pasien mengikuti format dasar tertentu

Sistem healthcare tidak boleh bergantung
pada asumsi data "mungkin benar".

---

## 17. Dashboard Data Quality

Sebaiknya quality checks tidak hanya dijalankan,
tapi juga divisualisasikan.

Contoh panel:
- duplicate rate
- missing mandatory fields
- orphan rows
- stale data pipeline
- anomaly volume harian

Kalau hasil check tersembunyi di script sunyi,
tim cepat lupa.

---

## 18. Ownership

Setiap quality metric harus punya owner.

Tanpa owner:
- alert muncul tapi tak diurus
- query check dibuat tapi tidak ditindaklanjuti
- masalah jadi normalisasi kebiasaan buruk

Data quality tanpa ownership
tidak akan bertahan.

---

## 19. Anti-Pattern Umum

1. Hanya cek NULL lalu merasa aman.
2. Tidak membedakan optional vs mandatory field.
3. Tidak punya reconciliation untuk integrasi penting.
4. Tidak ada threshold atau owner.
5. Data quality issue dianggap urusan belakang.

---

## 20. Best Practices

- tetapkan dimensi quality yang relevan.
- buat preventive dan detective control.
- prioritaskan data kritikal bisnis lebih dulu.
- visualisasikan dan monitor tren anomaly.
- tindak lanjuti akar masalah, bukan hanya symptom.

---

## 21. Mini Latihan

Latihan:
1. Buat 5 data quality check untuk tabel `appointments`.
2. Bedakan completeness vs validity dengan contoh.
3. Buat query orphan-row check.
4. Tentukan metrik yang harus bernilai nol.
5. Buat contoh reconciliation sederhana.

---

## 22. Jawaban Contoh Ringkas

Contoh check `appointments`:
- `patient_id IS NOT NULL`
- `doctor_id IS NOT NULL`
- `schedule_at IS NOT NULL`
- `status` valid
- tidak ada `(doctor_id, schedule_at)` duplikat untuk status aktif

Metrik nol:
- duplicate primary business key
- orphan foreign key

---

## 23. Checklist Kelulusan Topik 36

Kamu dianggap lulus jika bisa:
- menjelaskan dimensi utama data quality,
- membedakan preventive vs detective control,
- membuat query check dasar,
- memahami pentingnya reconciliation,
- mengaitkan kualitas data dengan dampak operasional nyata.

---

## 24. Ringkasan Brutal

- Data quality buruk itu utang diam-diam.
- Saat akhirnya terasa, biasanya kerusakannya sudah menyebar ke mana-mana.
