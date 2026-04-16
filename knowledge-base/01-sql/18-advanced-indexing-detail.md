# SQL Advanced Indexing - Penjelasan Detail

## Tujuan Topik

Topik ini membahas index lanjutan:
- covering index
- partial index
- expression / functional index
- prefix dan selective design
- kapan advanced indexing layak dipakai

Ini level setelah kamu paham index dasar.
Kalau index dasar belum kuat, jangan sok maju ke sini.

---

## 1. Kenapa Ada Advanced Indexing?

Index dasar membantu banyak kasus,
tapi workload nyata sering lebih kompleks:
- filter hanya subset kecil data
- query memakai ekspresi/fungsi
- kolom yang dibutuhkan sedikit tapi sering
- biaya read sangat sensitif

Di sinilah advanced indexing masuk.

---

## 2. Covering Index

Ide:
- index menyimpan cukup kolom
  sehingga query bisa dijawab dari index saja
  tanpa harus baca tabel utama.

Manfaat:
- I/O lebih kecil
- query list bisa jauh lebih cepat

Konsep ini tergantung engine,
tapi prinsip umumnya sama.

---

## 3. Kapan Covering Index Berguna?

Cocok untuk query yang:
- sering dipanggil
- mengambil sedikit kolom
- punya filter stabil

Contoh:

```sql
SELECT id, status, schedule_at
FROM appointments
WHERE doctor_id = 10
ORDER BY schedule_at DESC
LIMIT 20;
```

Jika index memuat kolom yang dibutuhkan,
query bisa sangat efisien.

---

## 4. Trade-off Covering Index

Biaya:
- index lebih besar
- write overhead naik
- maintenance lebih berat

Artinya:
- jangan bikin covering index untuk semua query.

Pilih query paling penting saja.

---

## 5. Partial Index

Partial index = index hanya untuk subset data tertentu.

Contoh konsep:
- hanya index appointment aktif
- hanya index row dengan status `pending`

Ini berguna saat:
- sebagian kecil data sering diakses,
- subset itu sangat penting,
- index penuh akan terlalu besar/kurang efisien.

---

## 6. Contoh Partial Index

Misal query sering mengambil appointment yang belum selesai:

```sql
CREATE INDEX idx_appointments_active_doctor_schedule
ON appointments(doctor_id, schedule_at)
WHERE status IN ('confirmed', 'in_progress');
```

Kelebihan:
- index lebih kecil
- fokus ke workload penting

---

## 7. Kapan Partial Index Tepat?

Tepat jika:
- predicate stabil
- subset data relatif kecil
- query sangat sering memakai filter itu

Tidak tepat jika:
- predicate sering berubah-ubah,
- hampir semua data tetap masuk index,
- tim tidak paham engine behavior.

---

## 8. Expression / Functional Index

Kadang query filter memakai hasil ekspresi.

Contoh:

```sql
WHERE LOWER(email) = 'a@x.com'
```

Expression index bisa dibuat
agar query seperti ini tetap efisien.

Ini lebih baik daripada terus-menerus
memaksa fungsi yang mematikan index biasa.

---

## 9. Kapan Expression Index Berguna?

Contoh use case:
- pencarian email case-insensitive
- normalisasi nomor telepon
- bucket tanggal tertentu

Tetapi:
- expression index harus benar-benar relevan
  dengan pola query tetap.

Kalau tidak,
kamu cuma menambah kompleksitas.

---

## 10. Multi-Purpose Composite Index

Kadang satu index bisa melayani
lebih dari satu query,
jika urutan dan pola filternya cocok.

Tapi hati-hati:
- mencoba membuat satu index untuk semua kebutuhan
  sering menghasilkan index yang tanggung.

Desain index yang baik:
- fokus,
- jelas target query-nya,
- tidak terlalu ambisius.

---

## 11. Selectivity dan Advanced Index

Advanced index tetap tunduk pada kenyataan dasar:
- selektivitas penting.

Partial index bagus justru
karena ia meningkatkan fokus pada subset yang lebih selektif.

Kalau subset-nya tetap terlalu besar,
manfaatnya bisa mengecil.

---

## 12. Advanced Index untuk ORDER BY + LIMIT

Banyak list page production
bergantung pada pola:
- filter sempit
- order stabil
- limit kecil

Index yang dirancang tepat
bisa memberi dampak sangat besar pada pola ini.

Inilah salah satu area advanced indexing yang paling bernilai.

---

## 13. INCLUDE Columns / Engine-Specific Features

Beberapa engine mendukung
kolom tambahan non-key di index
untuk membantu covering behavior.

Konsep penting:
- bedakan kolom untuk pencarian/urutan
  dan kolom yang hanya dibutuhkan saat membaca hasil.

Kalau engine yang dipakai mendukung,
ini bisa sangat berguna.

Namun:
- tetap cek dokumentasi engine spesifik saat implementasi.

---

## 14. Advanced Index Bukan Pengganti Query Design

Jebakan umum:
- query salah/berat ditambal dengan index makin banyak.

Kalau:
- join salah,
- filter datang terlambat,
- grain query kacau,

advanced index tidak akan menyelamatkan semuanya.

Index adalah akselerator,
bukan pengganti desain yang benar.

---

## 15. Studi Kasus Healthcare

Kasus:
- dashboard triage sering mengambil appointment aktif per dokter,
  urut waktu terdekat.

Query dominan:
- `WHERE doctor_id = ?`
- `AND status IN (...)`
- `ORDER BY schedule_at ASC`
- `LIMIT 20`

Pilihan masuk akal:
- partial index untuk status aktif
- komposit dengan urutan `doctor_id, schedule_at`

Ini lebih efisien
daripada full index besar untuk semua appointment historis.

---

## 16. Red Flags saat Menambah Advanced Index

Waspada jika:
- tidak ada query target jelas,
- tidak ada baseline plan/runtime,
- index mirip sudah banyak,
- write performance sudah sensitif,
- tim tidak punya inventory index yang rapi.

Kalau red flag ini ada,
berhenti dulu dan evaluasi.

---

## 17. Audit Index Existing

Sebelum menambah index baru:
1. cek index yang sudah ada
2. cek apakah redundant
3. cek query plan aktual
4. cek dampak write
5. putuskan tambah, ubah, atau hapus

Senior engineer tidak cuma menambah.
Senior engineer juga merapikan.

---

## 18. Anti-Pattern Umum

1. Menambah partial index tanpa predicate stabil.
2. Menambah expression index padahal query seharusnya diubah.
3. Membuat covering index raksasa.
4. Tidak audit redundant index.
5. Tidak monitor dampak ke insert/update/delete.

---

## 19. Best Practices

- mulai dari bottleneck nyata.
- pahami workload read vs write.
- dokumentasikan tujuan setiap advanced index.
- cek query plan dan metrics sebelum/sesudah.
- review ulang index saat pola query berubah.

---

## 20. Mini Latihan

Latihan:
1. Jelaskan kapan partial index lebih baik daripada full index.
2. Jelaskan kapan expression index cocok.
3. Desain index untuk query active appointments per doctor.
4. Jelaskan risiko covering index yang terlalu lebar.
5. Buat checklist evaluasi sebelum menambah index lanjutan.

---

## 21. Jawaban Contoh Ringkas

Partial index cocok saat:
- query dominan hanya menyentuh subset kecil,
- predicate stabil,
- subset itu bernilai tinggi untuk performa.

Expression index cocok saat:
- pola query konsisten memakai ekspresi tertentu,
- dan rewrite query tidak cukup/kurang praktis.

---

## 22. Checklist Kelulusan Topik 18

Kamu dianggap lulus jika bisa:
- menjelaskan covering, partial, dan expression index,
- menentukan kapan advanced index layak dibuat,
- menilai trade-off read vs write,
- mendeteksi index lanjutan yang redundant/tidak perlu,
- menggunakan advanced indexing secara sadar, bukan ikut-ikutan.

---

## 23. Ringkasan Brutal

- Advanced indexing itu alat presisi.
- Kalau dipakai sembarangan, hasilnya bukan optimasi.
  Hasilnya kekacauan yang lebih cepat.
