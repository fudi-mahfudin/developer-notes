# SQL Isolation Level dan Anomali Transaksi - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- isolation level
- dirty read
- non-repeatable read
- phantom read
- trade-off konsistensi vs concurrency

Ini topik yang sering dihafal setengah.
Kalau hanya hafal istilah tanpa paham dampaknya,
kamu tetap akan salah desain transaksi.

---

## 1. Kenapa Isolation Penting?

Database dipakai banyak transaksi sekaligus.

Masalah muncul saat:
- dua transaksi membaca/mengubah data bersamaan,
- hasil satu transaksi memengaruhi transaksi lain sebelum waktunya,
- pembacaan jadi tidak stabil.

Isolation level mengatur
seberapa terpisah transaksi-transaksi itu.

---

## 2. Empat Anomali yang Harus Dipahami

Yang paling umum dibahas:
- dirty read
- non-repeatable read
- phantom read

Tambahan penting secara praktik:
- lost update

Walau istilah formal tiap engine bisa berbeda,
konsep dasarnya wajib dipahami.

---

## 3. Dirty Read

Dirty read terjadi saat transaksi A
membaca perubahan transaksi B
yang belum `COMMIT`.

Jika transaksi B akhirnya `ROLLBACK`,
berarti A membaca data palsu.

Ini jelas berbahaya.

---

## 4. Non-Repeatable Read

Terjadi saat transaksi A
membaca satu baris,
lalu transaksi B mengubah dan commit,
lalu transaksi A membaca baris yang sama lagi
dan mendapat hasil berbeda.

Artinya:
- hasil baca tidak stabil untuk baris yang sama.

---

## 5. Phantom Read

Terjadi saat transaksi A
menjalankan query dengan kondisi tertentu,
lalu transaksi B menambah/menghapus baris yang cocok,
lalu transaksi A menjalankan query yang sama lagi
dan jumlah baris berubah.

Yang berubah bukan hanya nilai baris,
tapi "keberadaan baris baru/hilang".

---

## 6. Lost Update

Ini sangat penting secara praktik.

Dua transaksi membaca nilai yang sama,
lalu keduanya update,
dan update salah satu menimpa yang lain.

Contoh:
- sisa slot = 1
- dua request booking membaca slot = 1
- keduanya menurunkan slot
- hasil akhir salah

---

## 7. Isolation Level Umum

Secara umum:
- `READ UNCOMMITTED`
- `READ COMMITTED`
- `REPEATABLE READ`
- `SERIALIZABLE`

Catatan:
- implementasi detail bisa berbeda antar engine.
- pahami konsep, lalu cek dokumentasi engine spesifik saat implementasi.

---

## 8. READ UNCOMMITTED

Level sangat longgar.

Potensi:
- dirty read bisa terjadi.

Di banyak sistem serius,
ini hampir tidak pernah menjadi pilihan aman
untuk data bisnis penting.

---

## 9. READ COMMITTED

Umumnya lebih aman.

Prinsip:
- transaksi hanya membaca data yang sudah commit.

Dirty read dicegah.

Tapi:
- non-repeatable read masih bisa terjadi.
- phantom read bisa tetap terjadi.

Ini sering jadi default yang cukup baik
untuk banyak workload umum.

---

## 10. REPEATABLE READ

Tujuannya:
- baris yang sudah dibaca
  tetap konsisten selama transaksi.

Non-repeatable read dicegah.

Namun:
- perilaku terhadap phantom read
  bisa bergantung engine.

Jangan sok yakin tanpa cek engine yang dipakai.

---

## 11. SERIALIZABLE

Level paling ketat.

Ide besarnya:
- transaksi seolah-olah dieksekusi satu per satu secara serial.

Keuntungan:
- konsistensi paling kuat.

Biaya:
- throughput bisa turun,
- konflik/retry bisa naik,
- lock/serialization failure lebih sering muncul.

---

## 12. Trade-off Konsistensi vs Throughput

Semakin ketat isolation:
- semakin aman hasil,
- biasanya semakin mahal concurrency-nya.

Tidak semua use case butuh level paling tinggi.

Contoh:
- dashboard read mungkin cukup `READ COMMITTED`.
- booking slot kritikal mungkin butuh kontrol lebih ketat.

---

## 13. Studi Kasus Booking Slot

Kasus:
- dua pasien memesan slot dokter yang sama hampir bersamaan.

Kalau isolation / locking tidak tepat:
- double booking bisa terjadi.

Solusi mungkin melibatkan:
- isolation lebih ketat,
- row locking,
- unique constraint,
- retry logic.

Poin penting:
- isolation level saja sering tidak cukup.

---

## 14. Isolation Bukan Solusi Tunggal

Banyak engineer junior berpikir:
"naikkan isolation level, selesai."

Salah.

Masalah concurrency sering butuh kombinasi:
- constraint
- locking
- transaction boundary yang benar
- idempotency
- retry mechanism

---

## 15. Locking Singkat

Isolation terkait erat dengan locking / MVCC,
tergantung engine.

Kamu tidak harus langsung jadi ahli internals,
tapi harus tahu:
- concurrency control ada biaya,
- read/write bisa saling memengaruhi,
- blocking dan deadlock itu nyata.

---

## 16. READ COMMITTED dalam Praktik

Sering cukup untuk:
- CRUD umum
- dashboard operasional ringan
- workflow yang tidak sensitif pada repeat read

Namun hati-hati pada:
- stock decrement
- seat reservation
- appointment capacity

Karena race condition tetap mungkin terjadi.

---

## 17. REPEATABLE READ dalam Praktik

Cocok saat:
- kamu butuh hasil baca stabil selama satu transaksi,
- perhitungan bergantung pada snapshot data yang konsisten.

Tapi jangan lupa:
- biaya bisa lebih tinggi,
- perilaku phantom tergantung engine.

---

## 18. SERIALIZABLE dalam Praktik

Pakai saat:
- invariants bisnis sangat penting,
- biaya anomali lebih mahal daripada biaya retry.

Contoh:
- settlement finansial tertentu,
- inventory super-ketat,
- workflow compliance sensitif.

Biasanya perlu:
- retry strategy,
- timeout dan monitoring.

---

## 19. Contoh Anomali Non-Repeatable Read

Transaksi A:
1. baca status appointment = `confirmed`

Transaksi B:
1. update status jadi `cancelled`
2. commit

Transaksi A:
2. baca lagi status appointment
3. sekarang jadi `cancelled`

Hasil baca berubah di tengah transaction A.

---

## 20. Contoh Phantom Read

Transaksi A:
1. hitung appointment hari ini untuk dokter 10 = 9

Transaksi B:
1. insert appointment baru dokter 10 hari ini
2. commit

Transaksi A:
2. hitung lagi = 10

Ada "phantom" row baru yang muncul.

---

## 21. Lost Update dan Pencegahannya

Lost update sering dicegah dengan:
- row-level locking (`SELECT ... FOR UPDATE`)
- update atomik
- optimistic locking
- unique/business constraint

Jangan andalkan "semoga request tidak bersamaan".

Itu bukan desain. Itu doa.

---

## 22. Anti-Pattern Umum

1. Tidak tahu isolation default engine.
2. Naikkan semua transaksi ke `SERIALIZABLE` tanpa alasan.
3. Mengira `READ COMMITTED` otomatis aman untuk booking/stock.
4. Tidak punya retry mechanism untuk serialization failure.
5. Tidak test concurrency.

---

## 23. Best Practices

- pahami isolation default database yang dipakai.
- tentukan kebutuhan konsistensi per use case.
- kombinasikan isolation dengan constraint dan locking.
- test skenario race condition.
- log dan monitor konflik transaksi.

---

## 24. Mini Latihan

Latihan:
1. Jelaskan beda dirty read dan non-repeatable read.
2. Jelaskan phantom read dengan contoh appointment.
3. Tentukan kenapa booking slot butuh kontrol lebih ketat.
4. Jelaskan risiko memakai `SERIALIZABLE` untuk semua query.
5. Buat strategi kombinasi isolation + constraint untuk mencegah double booking.

---

## 25. Jawaban Contoh Singkat (No. 5)

Strategi:
- transaction pendek,
- unique constraint pada kombinasi jadwal kritikal,
- row locking / update atomik jika perlu,
- retry bila konflik.

---

## 26. Checklist Kelulusan Topik 13

Kamu dianggap lulus jika bisa:
- menjelaskan dirty read, non-repeatable read, phantom read,
- memahami trade-off level isolasi,
- tahu bahwa isolation bukan solusi tunggal,
- memilih pendekatan yang sesuai use case,
- berpikir concurrency-aware saat mendesain write path.

---

## 27. Ringkasan Brutal

- Hafal definisi isolation tanpa paham dampak = tidak berguna.
- Sistem rusak bukan karena istilahmu salah,
  tapi karena transaksi bersaing dan kamu tidak siap.
