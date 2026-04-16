# SQL Normalisasi dan Denormalisasi - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- kenapa normalisasi penting
- 1NF, 2NF, 3NF
- kapan denormalisasi masuk akal
- trade-off desain data

Banyak orang ngomong "normalisasi" cuma untuk terdengar pintar.
Padahal yang penting adalah:
- paham masalah apa yang dicegah,
- dan kapan aturan itu boleh dilonggarkan secara sadar.

---

## 1. Kenapa Normalisasi Ada?

Normalisasi dibuat untuk mengurangi:
- redundansi data
- anomali insert
- anomali update
- anomali delete

Intinya:
- data jangan disimpan berulang tanpa kontrol,
- relasi harus jelas,
- perubahan tidak boleh memaksa update di banyak tempat secara berbahaya.

---

## 2. Contoh Tabel Buruk

Misal ada tabel:

| appointment_id | patient_name | patient_phone | doctor_name | doctor_specialization |
|---|---|---|---|---|

Masalah:
- nama pasien berulang di banyak row
- nomor telepon berulang
- spesialisasi dokter berulang
- kalau nomor telepon pasien berubah, harus update banyak row

Itu rawan inconsistency.

---

## 3. First Normal Form (1NF)

1NF menuntut:
- tiap kolom berisi nilai atomik,
- tidak ada repeating group dalam satu kolom.

Contoh buruk:
- `phone_numbers = '0812,0813,0814'`

Contoh baik:
- satu nilai per kolom,
- atau pindahkan ke tabel relasi lain jika memang multi-value.

---

## 4. Masalah Jika Melanggar 1NF

Jika satu kolom berisi banyak nilai:
- susah filter,
- susah join,
- susah validasi,
- susah index.

Contoh query jadi jelek:
- pakai `LIKE '%0812%'`
- rawan false match
- performa jelek

---

## 5. Second Normal Form (2NF)

2NF relevan ketika tabel punya primary key komposit.

Prinsip:
- semua kolom non-key harus bergantung penuh pada seluruh key,
- bukan hanya sebagian key.

Jika ada atribut yang bergantung pada sebagian key saja,
atribut itu seharusnya dipisah.

---

## 6. Contoh 2NF

Misal tabel:
- `doctor_schedule(doctor_id, room_id, doctor_name, room_name, schedule_at)`

Masalah:
- `doctor_name` hanya bergantung pada `doctor_id`
- `room_name` hanya bergantung pada `room_id`

Solusi:
- pisahkan `doctors`
- pisahkan `rooms`
- tabel schedule hanya simpan FK + waktu

---

## 7. Third Normal Form (3NF)

3NF menuntut:
- kolom non-key tidak boleh bergantung transitif pada key.

Artinya:
- jangan simpan atribut yang sebenarnya bergantung pada atribut non-key lain.

Contoh:
- `patient_id -> city_id -> city_name`

Kalau di tabel pasien langsung simpan `city_name`,
data bisa redundant dan tidak konsisten.

---

## 8. Anomali Insert

Anomali insert terjadi saat
kamu tidak bisa menambah data baru
tanpa memaksa isi data yang tidak relevan.

Contoh:
- ingin menambah dokter baru,
- tapi tabel gabungan mewajibkan ada appointment dulu.

Desain seperti ini jelek.

---

## 9. Anomali Update

Anomali update terjadi saat
satu fakta bisnis harus diubah di banyak baris.

Contoh:
- nomor telepon pasien berubah,
- tapi tersimpan di 20 row appointment lama.

Jika 2 row terlewat,
data jadi kontradiktif.

---

## 10. Anomali Delete

Anomali delete terjadi saat
menghapus satu baris justru menghilangkan fakta lain yang masih penting.

Contoh:
- hapus appointment terakhir dokter,
- lalu informasi dokter ikut hilang karena semua digabung di satu tabel.

Itu desain buruk.

---

## 11. Bentuk Desain Ternormalisasi

Biasanya akan dipisah menjadi:
- `patients`
- `doctors`
- `appointments`
- `rooms`
- `specializations`

Keuntungan:
- data inti hanya disimpan satu kali,
- perubahan lebih aman,
- relasi lebih jelas.

---

## 12. Biaya Normalisasi

Normalisasi bukan tanpa biaya.

Konsekuensi:
- query butuh lebih banyak join,
- reporting tertentu jadi lebih rumit,
- developer harus paham relasi dengan baik.

Tapi untuk OLTP,
normalisasi sering menjadi fondasi yang sehat.

---

## 13. Kapan Denormalisasi Masuk Akal?

Denormalisasi berarti
secara sadar menyimpan data redundan
untuk alasan performa atau kemudahan baca.

Cocok jika:
- query reporting sangat sering dan berat,
- cost join terlalu mahal,
- data turunan jarang berubah,
- ada kebutuhan read-optimized store.

---

## 14. Contoh Denormalisasi yang Masuk Akal

Di tabel `appointments`,
kamu mungkin simpan:
- `doctor_name_snapshot`
- `patient_name_snapshot`

Kenapa?
- untuk histori,
- untuk audit,
- untuk menghindari perubahan nama masa depan
  merusak representasi data masa lalu.

Ini contoh denormalisasi sadar dan masuk akal.

---

## 15. Denormalisasi yang Buruk

Buruk jika:
- dilakukan karena malas join,
- tidak ada owner sinkronisasi data,
- tidak ada alasan bisnis/performa nyata.

Contoh buruk:
- salin semua data dokter ke 5 tabel
  tanpa mekanisme update yang jelas.

---

## 16. OLTP vs Analytics

Untuk OLTP:
- normalisasi biasanya lebih diutamakan.

Untuk analytics:
- denormalisasi / star schema sering lebih praktis.

Jangan mencampur tujuan dua dunia ini
tanpa sadar konsekuensinya.

---

## 17. Snapshot vs Live Reference

Pertanyaan penting:
- apakah data harus selalu mengikuti versi terbaru?
- atau perlu snapshot historis?

Contoh:
- `doctor_name` live reference cocok untuk master data.
- `doctor_name_snapshot` cocok untuk invoice/audit.

Ini keputusan desain, bukan kebetulan.

---

## 18. Studi Kasus Healthcare

`appointments` normal:
- `patient_id`
- `doctor_id`
- `schedule_at`
- `status`

Kemudian denormalisasi terkontrol:
- `doctor_name_snapshot`
- `specialization_snapshot`

Alasan:
- laporan historis tetap akurat,
- perubahan nama dokter tidak mengubah catatan lama.

---

## 19. Checklist Desain Saat Menormalisasi

Tanya:
1. apakah data ini fakta inti atau turunan?
2. apakah nilai ini disimpan berulang?
3. jika nilainya berubah, berapa banyak row harus diupdate?
4. apakah redundansi ini disengaja?
5. siapa yang menjaga konsistensinya?

---

## 20. Kapan Tidak Perlu Terlalu Akademis

Tidak semua tabel harus dibedah sampai tingkat akademik ekstrem.

Kalau data kecil,
use case sederhana,
dan tidak ada risiko inconsistency besar,
desain pragmatis boleh.

Tapi pragmatis bukan berarti asal.

---

## 21. Anti-Pattern Umum

1. Semua digabung jadi satu tabel besar.
2. Denormalisasi tanpa mekanisme sinkronisasi.
3. Memakai tabel ternormalisasi untuk reporting berat
   tapi tidak menyediakan layer read model.
4. Tidak jelas mana data master, mana snapshot.
5. Mendesain schema berdasarkan tampilan UI sesaat.

---

## 22. Best Practices

- normalisasi dulu untuk model transaksi utama.
- denormalisasi hanya jika ada alasan jelas.
- dokumentasikan data snapshot vs live reference.
- evaluasi pattern read dan write secara terpisah.
- review dampak perubahan domain ke schema.

---

## 23. Mini Latihan

Latihan:
1. Ambil contoh tabel appointment gabungan dan pecah menjadi tabel normal.
2. Identifikasi anomali update dari desain buruk.
3. Tentukan kapan snapshot nama dokter dibutuhkan.
4. Jelaskan kenapa analytics model tidak harus sama dengan OLTP model.
5. Beri contoh denormalisasi yang bagus dan yang buruk.

---

## 24. Jawaban Contoh Singkat

Contoh denormalisasi bagus:
- simpan `doctor_name_snapshot` di invoice / appointment audit.

Contoh denormalisasi buruk:
- salin email dokter ke banyak tabel transaksi
  tanpa aturan sinkronisasi.

---

## 25. Checklist Kelulusan Topik 14

Kamu dianggap lulus jika bisa:
- menjelaskan tujuan normalisasi,
- memahami 1NF, 2NF, 3NF secara praktis,
- mengidentifikasi anomali insert/update/delete,
- menentukan kapan denormalisasi masuk akal,
- mendesain schema berdasarkan kebutuhan read/write nyata.

---

## 26. Ringkasan Brutal

- Normalisasi mencegah kekacauan.
- Denormalisasi mempercepat, tapi harus dibayar dengan disiplin.
- Kalau kamu denormalisasi karena malas berpikir, hasilnya sampah.
