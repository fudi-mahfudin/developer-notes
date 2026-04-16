# SQL Idempotency untuk Operasi Write Kritikal - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu idempotency
- kenapa write kritikal butuh idempotency
- duplicate request
- retry aman
- pola implementasi dasar

Kalau kamu membangun sistem write kritikal
tanpa idempotency,
request ganda tinggal tunggu waktu
untuk merusak data atau pengalaman user.

---

## 1. Apa Itu Idempotency?

Operasi idempotent berarti:
- jika request yang sama dijalankan berulang,
- hasil akhirnya tetap sama,
- tidak membuat efek samping ganda.

Contoh ideal:
- user klik tombol booking dua kali,
- sistem tetap membuat satu booking valid saja.

---

## 2. Kenapa Request Bisa Ganda?

Sangat banyak alasan:
- user double click
- mobile retry karena jaringan putus-putus
- gateway timeout padahal write sudah sukses
- worker retry job
- client bug
- at-least-once delivery dari message broker

Kalau sistem tidak siap,
duplikasi itu akan jadi data ganda.

---

## 3. Transaction Saja Tidak Cukup

Ini poin penting.

Transaction menjaga konsistensi
di dalam satu request.

Tapi transaction tidak otomatis mencegah:
- request yang sama masuk dua kali,
- create record ganda dari dua attempt berbeda.

Karena itu:
- transaction dan idempotency saling melengkapi.

---

## 4. Write Kritikal yang Wajib Pikir Idempotency

Contoh:
- create payment
- create order
- create appointment
- reserve inventory
- kirim email/notifikasi berbayar
- create invoice

Semua operasi ini bisa mahal
jika terduplikasi.

---

## 5. Idempotency Key

Pola paling umum:
- client mengirim `idempotency_key`
- server menyimpan key itu
- request berikutnya dengan key sama
  tidak membuat efek baru

Tujuan:
- retry aman
- duplicate handling eksplisit

---

## 6. Tabel Idempotency

Secara konsep,
kamu bisa punya tabel:
- `idempotency_key`
- `request_hash`
- `status`
- `response_snapshot`
- `created_at`

Lalu key dibuat unik.

Dengan begitu:
- request duplikat bisa dikenali
- response bisa dikembalikan ulang

---

## 7. Unique Constraint Sebagai Guard

Salah satu senjata utama idempotency:
- unique constraint

Contoh:
- satu external payment reference harus unik
- satu booking token harus unik
- satu appointment slot unik per doctor/time

Unique constraint tidak menyelesaikan semua,
tapi sangat penting sebagai pagar terakhir.

---

## 8. Request Hash Validation

Kalau request datang dengan idempotency key yang sama
tapi payload berbeda,
itu harus dianggap masalah.

Karena:
- key yang sama seharusnya mewakili intent yang sama.

Maka sering perlu:
- simpan request fingerprint/hash
- validasi kesesuaian

Kalau beda:
- return error,
- jangan diam-diam proses sebagai request baru.

---

## 9. Response Replay

Sistem idempotent yang matang
sering tidak hanya menolak duplikasi,
tapi mengembalikan hasil yang sama
seperti request pertama.

Keuntungan:
- client tidak perlu menebak
- retry terasa aman
- UX lebih stabil

---

## 10. Insert-First Pattern

Kadang pola yang dipakai:
1. simpan key idempotency lebih dulu
2. jalankan proses bisnis
3. update status hasil

Tapi harus aman terhadap crash di tengah jalan.

Kalau tidak dirancang baik,
kamu bisa punya key "stuck"
tanpa hasil jelas.

---

## 11. Processing State

Status umum:
- `processing`
- `succeeded`
- `failed`

Ini berguna untuk:
- membedakan request yang sedang berjalan
- mencegah race condition antar retry
- memberi respons yang lebih jujur

---

## 12. TTL dan Expiration

Idempotency key biasanya tidak harus hidup selamanya.

Tapi TTL harus sesuai domain.

Terlalu pendek:
- retry valid bisa gagal terdeteksi.

Terlalu panjang:
- storage membengkak,
- kebijakan jadi tidak efisien.

Pilih berdasarkan risiko bisnis.

---

## 13. Idempotency dan External API

Jika sistem kamu memanggil gateway eksternal,
idempotency makin penting.

Contoh:
- payment provider timeout
- kamu tidak tahu charge sudah terjadi atau belum

Tanpa idempotency/external reference unik,
retry bisa membuat charge dobel.

---

## 14. Idempotency untuk Async Worker

Worker yang consume pesan dari queue
sering bersifat at-least-once.

Artinya pesan bisa diproses lebih dari sekali.

Kalau handler tidak idempotent:
- duplicate row
- duplicate side effect
- duplicate notification

Jadi idempotency bukan cuma urusan API.

---

## 15. Studi Kasus Booking Appointment

Kasus:
- user tap tombol booking dua kali
- request pertama sukses tapi response timeout
- aplikasi retry

Tanpa idempotency:
- dua appointment bisa terbentuk
  atau satu request gagal dengan error membingungkan

Dengan idempotency:
- request kedua dikenali
- hasil booking pertama dikembalikan lagi

---

## 16. Idempotency vs De-Dup Sederhana

Jangan samakan:
- "cek apakah data sudah ada"
  dengan
- idempotency yang benar

Cek data sudah ada kadang tidak cukup,
karena:
- race condition masih mungkin
- intent request tidak terdokumentasi
- response replay tidak tersedia

---

## 17. Race Condition pada Idempotency

Jika dua request dengan key sama
masuk hampir bersamaan,
sistem harus tetap aman.

Biasanya butuh:
- unique constraint
- insert atomik
- transaction pendek

Kalau implementasi longgar,
dua request bisa lolos bersamaan.

---

## 18. Anti-Pattern Umum

1. Menganggap retry pasti aman tanpa idempotency.
2. Hanya mengandalkan check manual tanpa unique constraint.
3. Tidak memvalidasi payload untuk key yang sama.
4. Menyimpan key tanpa status/hasil.
5. Tidak memikirkan worker dan async flow.

---

## 19. Best Practices

- gunakan idempotency key untuk create/write kritikal.
- kombinasikan dengan unique constraint.
- simpan status dan hasil request.
- validasi payload untuk key yang sama.
- desain retry behavior yang jelas.

---

## 20. Kapan Idempotency Tidak Wajib?

Tidak semua endpoint perlu selevel ini.

Contoh:
- read-only endpoint
- update minor non-kritikal yang aman diulang

Tapi untuk operasi bernilai bisnis tinggi,
jangan pelit desain.

---

## 21. Mini Latihan

Latihan:
1. Jelaskan beda transaction dan idempotency.
2. Rancang tabel dasar untuk idempotency key.
3. Jelaskan kenapa request hash perlu.
4. Buat skenario duplicate request pada booking.
5. Tentukan TTL idempotency untuk payment vs booking.

---

## 22. Jawaban Contoh Ringkas

Transaction:
- menjaga konsistensi dalam satu eksekusi.

Idempotency:
- menjaga hasil tetap aman saat eksekusi yang sama terulang.

Keduanya berbeda.
Keduanya sering dibutuhkan bersama.

---

## 23. Checklist Kelulusan Topik 22

Kamu dianggap lulus jika bisa:
- menjelaskan konsep idempotency dengan benar,
- memahami kenapa retry bisa berbahaya,
- merancang idempotency key flow sederhana,
- menggabungkan idempotency dengan constraint/transaksi,
- membedakan duplicate prevention yang matang vs tambalan naif.

---

## 24. Ringkasan Brutal

- Kalau write kritikal bisa dieksekusi dua kali,
  cepat atau lambat user akan menemukan celahnya.
- Idempotency bukan fitur mewah.
  Itu pagar dasar untuk sistem yang serius.
