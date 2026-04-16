# Transaction Boundary - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu transaction boundary
- kenapa boundary transaksi penting
- bagaimana menentukan apa yang harus atomik
- trade-off antara consistency dan coupling
- kesalahan umum saat memperluas atau mempersempit transaksi

Banyak bug sistem bisnis
bukan karena transaksi tidak ada,
tapi karena boundary-nya salah.

Kalau transaction boundary terlalu sempit:
- sistem jadi inkonsisten

Kalau terlalu lebar:
- contention naik
- latency naik
- coupling naik

Boundary transaksi adalah keputusan arsitektur,
bukan sekadar `BEGIN` dan `COMMIT`.

---

## 1. Apa Itu Transaction Boundary?

Transaction boundary adalah batas
dari serangkaian operasi
yang harus diperlakukan
sebagai satu unit kerja atomik.

Pertanyaannya:
- apa saja yang harus sukses bersama?
- apa yang boleh gagal terpisah?

Itu inti desain transaksi.

---

## 2. Kenapa Ini Penting?

Karena banyak workflow bisnis
melibatkan beberapa langkah:
- validasi
- update data
- audit
- side effect

Kalau boundary tidak jelas:
- sebagian perubahan masuk
- sebagian tidak
- sistem masuk keadaan ambigu

Ini bisa jauh lebih berbahaya
daripada error total.

---

## 3. "Harus Atomik" Itu Tidak Selalu Semua Hal

Kesalahan umum:
- semua langkah dianggap harus satu transaksi

Padahal tidak semua side effect
layak atau bisa ikut atomik.

Contoh:
- update database inti
  mungkin harus atomik
- kirim email
  sering tidak harus di transaksi yang sama

Boundary sehat memisahkan:
- state inti yang wajib konsisten sekarang
  dari
- side effect yang bisa ditangani terpisah

---

## 4. Transaction Boundary Ditentukan oleh Invariant

Cara terbaik menentukannya:
- lihat invariant bisnis apa yang harus selalu benar

Contoh:
- appointment tidak boleh double-booked
- saldo tidak boleh negatif
- claim tidak boleh disetujui dua kali

Kalau invariant bergantung pada beberapa perubahan,
perubahan itu mungkin harus satu boundary atomik.

Mulai dari invariant,
bukan dari kenyamanan implementasi.

---

## 5. Boundary Terlalu Lebar

Jika transaksi mencakup terlalu banyak:
- lock lebih lama
- contention naik
- throughput turun
- downstream dependency membuat transaksi rapuh

Contoh buruk:
- buka transaksi
- update data
- panggil service eksternal
- tunggu respons
- baru commit

Itu resep masalah.

---

## 6. Boundary Terlalu Sempit

Jika transaksi terlalu kecil,
workflow bisa pecah jadi keadaan separuh jalan.

Contoh:
- slot appointment ditandai terisi
- tapi data appointment gagal tersimpan

Secara teknis mungkin ada update,
tapi secara bisnis sistem rusak.

Jadi mengecilkan transaksi
demi performa saja
tanpa melihat invariant
juga bodoh.

---

## 7. Local Transaction vs Distributed Reality

Di satu database,
transaction boundary relatif jelas.

Begitu melibatkan:
- service lain
- message broker
- external API

ceritanya berubah.

Kamu tidak bisa begitu saja
memperluas transaksi lokal
ke seluruh dunia eksternal
dengan aman dan murah.

Di sini perlu pola lain:
- outbox
- saga
- compensation

---

## 8. Request Flow Tidak Sama dengan Transaction Boundary

Sering developer mengira:
- satu request = satu transaction

Padahal tidak selalu.

Satu request bisa:
- punya satu transaction lokal
- lalu side effect async

Atau satu request
bisa memicu workflow panjang
yang tak mungkin atomik secara global.

Jangan samakan batas HTTP
dengan batas konsistensi.

---

## 9. Validation dan Boundary

Beberapa validasi
harus terjadi di dalam boundary transaksi
kalau mereka berkaitan dengan race condition.

Contoh:
- cek slot dokter masih kosong

Kalau dicek di luar,
lalu update dilakukan belakangan,
dua request bisa lolos bersamaan.

Jadi tidak semua validasi
bisa aman dipisah dari transaksi.

---

## 10. Side Effect Eksternal

Email, webhook, payment callback,
notifikasi push, analytics event
sering tidak cocok
dimasukkan ke boundary transaksi lokal.

Kenapa?
- tidak ada atomicity murah lintas sistem
- dependency luar bisa lambat/gagal

Biasanya lebih sehat:
- commit state inti dulu
- lalu picu mekanisme lanjutan yang andal

---

## 11. Audit Log

Apakah audit log
harus satu transaksi dengan perubahan inti?

Jawabannya tergantung sifat audit-nya.

Kalau audit itu bagian compliance inti,
mungkin ya.

Kalau audit enrichment tambahan,
mungkin tidak harus.

Jangan jawab otomatis.
Lihat kebutuhan bisnis dan regulasinya.

---

## 12. Transaction Boundary dan Contention

Transaksi yang menyentuh banyak row/resource
akan meningkatkan:
- lock wait
- deadlock risk
- throughput issue

Boundary sehat
tidak hanya benar secara logika,
tapi juga realistis secara performa.

Kalau sistem skala naik,
transaksi yang dulu "baik-baik saja"
bisa mulai jadi bottleneck.

---

## 13. Healthcare Example

Use case:
- booking appointment

Yang mungkin harus satu boundary:
- cek slot tersedia
- buat appointment
- tandai slot terpakai

Yang mungkin tidak harus:
- kirim email konfirmasi
- kirim reminder async

Ini contoh pemisahan sehat
antara consistency inti
dan side effect lanjutan.

---

## 14. Compensation Thinking

Kalau workflow melibatkan banyak sistem,
sering tidak mungkin atomik sepenuhnya.

Sebagai gantinya,
perlu berpikir:
- apa kompensasi jika langkah lanjutan gagal?

Contoh:
- booking berhasil
- sinkronisasi ke kalender eksternal gagal

Apakah perlu retry?
manual repair?
status khusus?

Itulah desain transaksi di dunia nyata.

---

## 15. Isolation dan Boundary

Transaction boundary juga terkait
dengan isolation level dan race behavior.

Satu transaksi yang tampak benar
bisa tetap salah
jika asumsi concurrency-nya salah.

Jadi boundary transaksi
tidak boleh dipikir
tanpa memikirkan contention dan isolation.

---

## 16. Testing Transaction Boundary

Boundary transaksi harus diuji
terhadap:
- partial failure
- race condition
- retry behavior
- duplicate request

Kalau hanya diuji happy path,
kamu belum benar-benar tahu
apakah boundary itu sehat.

---

## 17. Anti-Pattern Umum

1. Memasukkan external API call ke dalam transaksi database utama.
2. Memperkecil boundary sampai invariant bisnis rusak.
3. Menyamakan request lifecycle dengan atomicity boundary.
4. Mengabaikan race condition pada validasi penting.
5. Mendesain transaksi tanpa memikirkan contention.

---

## 18. Best Practices

- tentukan boundary dari invariant bisnis yang harus dijaga.
- jaga transaksi inti tetap sekecil mungkin, tapi tidak lebih kecil dari yang aman.
- keluarkan side effect eksternal dari transaksi lokal bila memungkinkan.
- pikirkan failure handling setelah commit.
- uji boundary terhadap concurrency dan partial failure.

---

## 19. Pertanyaan Desain Penting

Sebelum menentukan transaction boundary, tanya:
1. Fakta bisnis apa yang harus selalu konsisten bersama?
2. Langkah mana yang benar-benar harus atomik?
3. Langkah mana yang bisa async atau dikompensasi?
4. Apa risiko contention jika boundary terlalu besar?
5. Bagaimana perilaku saat gagal di tengah?

---

## 20. Mini Latihan

Latihan:
1. Ambil satu workflow booking/pembayaran dan tandai invariant bisnis utamanya.
2. Tentukan langkah mana yang harus satu transaksi.
3. Pisahkan side effect yang bisa async.
4. Simulasikan partial failure setelah commit.
5. Evaluasi risiko contention dari desain boundary saat ini.

---

## 21. Jawaban Contoh Ringkas

Satu boundary transaksi lokal:
- update state inti yang saling bergantung

Di luar boundary:
- notifikasi
- sinkronisasi eksternal
- analytics

Jika tetap dipaksa satu transaksi,
biaya reliability dan latency bisa meledak.

---

## 22. Checklist Kelulusan Topik Transaction Boundary

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan boundary transaksi dalam bahasa invariant bisnis,
- membedakan atomic state change dan external side effect,
- menghindari boundary yang terlalu besar atau terlalu kecil,
- memikirkan failure dan compensation,
- menghubungkan transaksi dengan concurrency reality.

---

## 23. Ringkasan Brutal

- Transaction boundary yang salah
  bisa membuat sistem tampak jalan
  padahal diam-diam berbohong.
- Atomik itu mahal.
- Tapi inkonsistensi juga mahal.
- Tugasmu adalah memilih mahal yang benar.
