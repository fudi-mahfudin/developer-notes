# SQL Locking, Blocking, Deadlock, dan Contention - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- locking
- blocking
- deadlock
- contention
- dampaknya ke performa dan correctness

Kalau kamu belum paham topik ini,
kamu belum siap menangani sistem write-heavy yang nyata.

---

## 1. Kenapa Topik Ini Penting?

Banyak sistem lambat bukan karena query scan mahal,
tapi karena transaksi saling menunggu.

Gejala:
- query time tinggi padahal plan biasa
- API timeout saat traffic naik
- booking gagal random
- incident yang "sulit direproduksi"

Sering akar masalahnya:
- lock,
- blocking,
- deadlock,
- contention.

---

## 2. Apa Itu Locking?

Locking adalah mekanisme
untuk mengontrol akses bersamaan ke data
agar integritas tetap terjaga.

Tanpa locking/concurrency control:
- write bisa saling menimpa,
- data bisa rusak,
- hasil baca bisa kacau.

---

## 3. Jenis Lock (Konsep Umum)

Secara umum ada:
- read/shared lock
- write/exclusive lock

Implementasi detail berbeda antar engine,
tapi konsep pentingnya:
- beberapa operasi bisa berjalan bersamaan,
- beberapa harus menunggu.

---

## 4. Blocking

Blocking terjadi saat satu transaksi
harus menunggu transaksi lain
karena resource/data yang dibutuhkan sedang terkunci.

Contoh:
- transaksi A update appointment 101
- transaksi B juga ingin update appointment 101
- B menunggu A selesai

Ini blocking.

---

## 5. Contention

Contention = perebutan resource yang sama secara sering.

Contoh:
- banyak request mengupdate row counter yang sama
- banyak booking menyerang slot dokter yang sama
- worker bersamaan mengakses table queue yang sama

Blocking sesekali normal.
Contention tinggi adalah masalah desain/performa.

---

## 6. Deadlock

Deadlock terjadi saat:
- transaksi A menunggu transaksi B,
- transaksi B menunggu transaksi A,
- keduanya saling kunci dan tidak bisa lanjut.

Database biasanya memilih satu korban
untuk dibatalkan.

Deadlock bukan "bug database".
Biasanya itu hasil desain transaksi yang buruk.

---

## 7. Contoh Deadlock Sederhana

Transaksi A:
1. lock row patient
2. ingin lock row doctor

Transaksi B:
1. lock row doctor
2. ingin lock row patient

Keduanya menunggu.

Inilah deadlock klasik karena urutan resource tidak konsisten.

---

## 8. Lock Duration

Semakin lama transaction berjalan,
semakin lama lock bertahan.

Akibat:
- lebih banyak blocking,
- peluang deadlock naik,
- throughput turun.

Karena itu:
- transaction harus singkat.

---

## 9. Penyebab Contention Umum

1. hot row / hot key
2. transaction terlalu panjang
3. banyak write ke resource sama
4. update counter sentral
5. queue table didesain buruk

Hot row contoh:
- tabel setting global satu row
- slot counter tunggal
- last sequence tracker tertentu

---

## 10. Read vs Write Interaction

Tergantung engine dan isolation,
read dan write bisa saling memengaruhi.

Yang wajib dipahami:
- baca tidak selalu "gratis"
- write sering memicu wait lebih besar
- query reporting berat bisa memperburuk situasi

Jangan campur workload tanpa strategi.

---

## 11. Locking dan Transaction Scope

Masalah sering bukan di query-nya,
tapi di transaction boundary.

Contoh buruk:
1. `BEGIN`
2. query DB
3. panggil service eksternal
4. tunggu 3 detik
5. update DB lagi
6. `COMMIT`

Selama menunggu service eksternal,
lock bisa tetap bertahan.

Itu desain jelek.

---

## 12. Row Locking untuk Correctness

Kadang locking memang perlu.

Contoh:
- mengambil slot booking tertentu
- update saldo
- reserve inventory

Tujuan:
- mencegah dua transaksi memakai state lama yang sama.

Namun:
- locking untuk correctness harus tetap efisien.

---

## 13. Deadlock Prevention

Cara umum mengurangi deadlock:
1. akses resource dalam urutan konsisten
2. pendekkan transaction
3. kurangi jumlah row yang disentuh
4. tambahkan retry logic
5. hindari pola saling silang yang tidak perlu

Urutan konsisten itu sederhana tapi kuat.

---

## 14. Deadlock Handling

Deadlock tetap bisa terjadi
meski desain sudah cukup baik.

Karena itu aplikasi harus siap:
- tangkap error deadlock
- retry dengan batas wajar
- log konteks transaksi

Kalau tidak ada retry,
error akan bocor ke user secara acak.

---

## 15. Blocking Diagnosis

Saat query lambat,
jangan langsung salahkan index.

Cek:
- apakah query menunggu lock?
- siapa blocker-nya?
- transaksi apa yang memegang lock paling lama?

Ini butuh:
- DB monitoring
- lock view / session insight
- correlation ke request aplikasi

---

## 16. Hotspot Design Problem

Kadang contention berasal dari desain data yang buruk.

Contoh:
- semua increment disimpan di satu row tunggal
- semua worker update status satu tabel cara naif

Solusi mungkin bukan query tuning,
tapi desain ulang write path.

---

## 17. Studi Kasus Booking Slot Dokter

Kasus:
- 30 user berebut slot dokter populer.

Masalah:
- banyak request mencoba reserve slot yang sama.
- konflik tinggi.

Pendekatan:
- unique constraint pada slot
- transaction pendek
- retry terkontrol
- mungkin optimistic approach + conflict handling

Kalau desainnya salah,
contention bisa jadi bencana saat flash traffic.

---

## 18. Lock Granularity

Semakin luas resource yang terkunci,
semakin besar dampaknya.

Tujuan desain yang baik:
- lock sesempit mungkin,
- selama tetap menjaga integritas.

Engine punya perilaku berbeda,
tapi prinsip ini universal.

---

## 19. Blocking vs Slow Query

Query bisa lambat karena:
- eksekusi mahal
- menunggu lock

Dua hal ini berbeda.

Kalau salah diagnosis:
- kamu menambah index
  padahal bottleneck utamanya lock wait.

Hasil:
- masalah tetap hidup.

---

## 20. Contention dan Throughput

Saat contention naik:
- antrian request naik
- latency p95/p99 naik
- timeout meningkat
- error ikut muncul

Makanya:
- concurrency issue sering terlihat
  sebagai masalah performa,
  padahal akarnya koordinasi write.

---

## 21. Best Practices

- pendekkan transaction.
- hindari external call di dalam transaction.
- akses resource dengan urutan konsisten.
- monitor blocking/deadlock.
- siapkan retry logic untuk konflik tertentu.

---

## 22. Anti-Pattern Umum

1. Transaction panjang dengan banyak langkah non-DB.
2. Tidak tahu query lambat karena lock wait.
3. Semua update diarahkan ke satu hot row.
4. Tidak ada retry untuk deadlock.
5. Menganggap deadlock itu kejadian langka yang boleh diabaikan.

---

## 23. Mini Latihan

Latihan:
1. Jelaskan beda blocking dan deadlock.
2. Jelaskan kenapa transaction panjang memperburuk contention.
3. Beri contoh urutan akses resource yang konsisten.
4. Buat strategi menangani booking slot populer.
5. Jelaskan kenapa retry penting setelah deadlock.

---

## 24. Jawaban Contoh Ringkas

Blocking:
- satu transaksi menunggu yang lain.

Deadlock:
- dua transaksi saling menunggu dan buntu.

Retry penting:
- karena DB bisa membatalkan salah satu transaksi
  sebagai korban deadlock,
- dan aplikasi harus bisa mencoba ulang dengan aman.

---

## 25. Checklist Kelulusan Topik 17

Kamu dianggap lulus jika bisa:
- menjelaskan locking, blocking, deadlock, contention,
- membedakan query lambat vs lock wait,
- mendesain transaction yang lebih aman,
- mengurangi peluang deadlock,
- berpikir concurrency-aware pada sistem write-heavy.

---

## 26. Ringkasan Brutal

- Banyak engineer merasa jago SQL
  sampai sistem kena traffic nyata.
- Di situ baru kelihatan:
  siapa yang paham locking,
  dan siapa yang cuma paham `SELECT`.
