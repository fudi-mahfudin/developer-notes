# SQL Transaction Dasar - Penjelasan Detail

## Tujuan Topik

Topik ini membahas transaction dasar:
- `BEGIN`
- `COMMIT`
- `ROLLBACK`
- atomicity
- konsistensi perubahan multi-step

Kalau kamu tidak paham transaction,
kamu akan menulis perubahan data yang tampak berhasil
padahal meninggalkan sistem dalam kondisi setengah rusak.

---

## 1. Apa Itu Transaction?

Transaction adalah sekumpulan operasi database
yang diperlakukan sebagai satu unit kerja.

Artinya:
- semua berhasil, atau
- semua dibatalkan.

Inilah konsep **all-or-nothing**.

---

## 2. Kenapa Transaction Penting?

Contoh:
- transfer saldo
- booking slot
- pembuatan order + payment log
- create appointment + create notification job

Jika salah satu langkah gagal
dan langkah lain sudah terlanjur tersimpan,
data jadi inkonsisten.

---

## 3. Bentuk Dasar Transaction

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 50000
WHERE id = 1;

UPDATE accounts
SET balance = balance + 50000
WHERE id = 2;

COMMIT;
```

Kalau ada masalah:

```sql
ROLLBACK;
```

---

## 4. COMMIT

`COMMIT` berarti:
- perubahan di transaction dianggap final,
- perubahan terlihat sesuai aturan engine/transaksi.

Setelah `COMMIT`,
rollback tidak bisa dilakukan dari transaction itu.

---

## 5. ROLLBACK

`ROLLBACK` berarti:
- semua perubahan dalam transaction dibatalkan.

Ini sangat penting untuk:
- error aplikasi,
- validasi gagal,
- konflik bisnis,
- exception tak terduga.

---

## 6. Studi Kasus Booking Appointment

Misal alurnya:
1. insert appointment
2. update slot availability
3. insert notification job

Kalau langkah 3 gagal
dan tidak ada transaction,
maka:
- appointment tersimpan,
- slot berkurang,
- reminder tidak ada.

Secara bisnis ini berbahaya.

Dengan transaction:
- jika salah satu gagal,
  semua dibatalkan.

---

## 7. ACID Singkat

Transaction sering dijelaskan dengan ACID:
- **Atomicity**
- **Consistency**
- **Isolation**
- **Durability**

Di topik ini fokus utama:
- atomicity
- consistency perubahan dasar

Isolation dibahas terpisah di topik berikutnya.

---

## 8. Atomicity

Atomicity = tidak ada setengah sukses.

Contoh buruk:
- saldo pengirim berkurang,
- saldo penerima tidak bertambah.

Atomicity mencegah kondisi ini.

---

## 9. Consistency

Consistency berarti transaction
harus menjaga aturan data tetap valid.

Contoh:
- saldo tidak boleh negatif,
- slot booking tidak boleh minus,
- status transisi harus sah.

Transaction membantu,
tapi constraint dan validasi tetap diperlukan.

---

## 10. Durability

Durability berarti setelah `COMMIT`,
perubahan seharusnya tidak hilang
hanya karena proses aplikasi mati biasa.

Implementasinya tergantung engine,
tetapi konsep ini penting dipahami.

---

## 11. Transaction di Aplikasi

Biasanya transaction tidak ditulis manual terus-menerus di SQL console,
tapi dikelola oleh:
- ORM
- query builder
- service layer

Masalahnya:
- banyak developer pakai ORM
  tanpa benar-benar paham kapan transaction dibutuhkan.

Itu berbahaya.

---

## 12. Kapan Harus Pakai Transaction?

Pakai transaction jika:
- ada lebih dari satu write operation saling bergantung,
- ada perubahan yang harus konsisten bersama,
- ada validasi yang bergantung pada state saat itu.

Contoh:
- booking + reserve slot
- create invoice + create invoice items
- update stock + create movement log

---

## 13. Kapan Tidak Perlu Transaction Besar?

Tidak semua hal harus masuk 1 transaction besar.

Terlalu besar bisa:
- memperpanjang lock,
- menaikkan contention,
- menurunkan throughput.

Gunakan transaction secukupnya.

Prinsip:
- sekecil mungkin,
- tapi cukup untuk menjaga integritas.

---

## 14. Savepoint (Konsep Dasar)

Beberapa engine mendukung `SAVEPOINT`.

Tujuan:
- rollback sebagian di dalam transaction besar.

Ini berguna untuk workflow kompleks,
tapi jangan dipakai untuk menutupi desain transaksi yang buruk.

---

## 15. Error Handling

Transaction tanpa error handling = percuma.

Pola aman:
1. `BEGIN`
2. jalankan semua langkah
3. jika sukses -> `COMMIT`
4. jika error -> `ROLLBACK`

Di aplikasi,
ini biasanya dibungkus try/catch.

---

## 16. Idempotency dan Transaction

Transaction tidak otomatis menyelesaikan semua masalah write.

Contoh:
- request create appointment dikirim dua kali

Transaction bisa menjaga konsistensi tiap request,
tapi idempotency tetap perlu
agar request ganda tidak membuat data ganda.

---

## 17. Transaction dan External Service

Jebakan klasik:
- buka transaction database,
- lalu panggil API eksternal,
- tunggu lama,
- lock tetap terbuka.

Ini buruk.

Prinsip:
- jangan tahan transaction sambil menunggu external call lama,
- commit dulu jika bisa,
- gunakan pola async/event jika perlu.

---

## 18. Anti-Pattern Umum

1. Tidak pakai transaction untuk operasi multi-step.
2. Transaction terlalu besar.
3. Menjalankan HTTP call di dalam transaction.
4. Tidak rollback saat exception.
5. Menganggap ORM otomatis selalu aman.

---

## 19. Best Practices Transaction Dasar

- batasi scope transaction.
- lakukan validasi penting sedekat mungkin dengan write.
- pastikan rollback pada error.
- log transaction failure dengan trace/context.
- uji skenario gagal, bukan hanya happy path.

---

## 20. Studi Kasus Healthcare yang Realistis

Kasus:
- pasien booking teleconsult.

Langkah:
1. cek slot tersedia
2. insert appointment
3. update reserved capacity
4. create audit log

Jika audit log gagal
sementara appointment sudah dibuat,
tim compliance bisa marah.

Jika kapasitas terupdate tapi appointment gagal,
slot phantom muncul.

Solusi:
- bungkus write internal penting dalam satu transaction.

---

## 21. Mini Latihan

Latihan:
1. Tulis transaction untuk transfer saldo.
2. Tulis transaction untuk create appointment + audit log.
3. Jelaskan kenapa external API call tidak ideal di dalam transaction.
4. Jelaskan kapan transaction terlalu besar.
5. Buat daftar langkah rollback-safe untuk operasi multi-step.

---

## 22. Contoh Jawaban Ringkas (No. 2)

```sql
BEGIN;

INSERT INTO appointments (id, patient_id, doctor_id, schedule_at)
VALUES (1001, 1, 7, '2026-04-20 09:00:00');

INSERT INTO appointment_audit_logs (appointment_id, action)
VALUES (1001, 'created');

COMMIT;
```

Jika salah satu gagal:

```sql
ROLLBACK;
```

---

## 23. Checklist Kelulusan Topik 12

Kamu dianggap lulus jika bisa:
- menjelaskan apa itu transaction,
- membedakan `COMMIT` dan `ROLLBACK`,
- menentukan kapan operasi harus dibungkus transaction,
- menghindari transaction terlalu besar,
- memahami bahwa transaction bukan pengganti idempotency atau desain sistem yang baik.

---

## 24. Ringkasan Brutal

- Write multi-step tanpa transaction = bom waktu.
- Transaction terlalu besar = bom waktu lain.
- Engineer yang matang tahu di mana harus ketat, dan di mana harus ringan.
