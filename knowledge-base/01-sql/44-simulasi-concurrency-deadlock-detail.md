# SQL Simulasi Concurrency Issue dan Deadlock - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- kenapa concurrency issue harus disimulasikan
- bagaimana mensimulasikan race condition
- bagaimana mensimulasikan deadlock
- apa yang dicari dari simulasi

Banyak tim belajar concurrency
hanya dari teori.
Itu tidak cukup.

Kamu harus melihat sendiri
bagaimana data bisa rusak
atau request bisa saling membunuh
saat transaksi berjalan bersamaan.

---

## 1. Kenapa Harus Disimulasikan?

Karena bug concurrency:
- sering sulit direproduksi
- muncul hanya saat timing tertentu
- bisa lolos semua unit test biasa
- sering baru terlihat di production

Simulasi membantu:
- memahami failure mode
- memvalidasi fix
- melatih intuisi transaksi

Kalau tidak pernah disimulasikan,
tim hanya mengandalkan keberuntungan.

---

## 2. Apa Itu Concurrency Issue?

Masalah concurrency muncul
saat beberapa proses/transaksi
mengakses atau mengubah data yang sama
secara tumpang tindih.

Contoh efek:
- lost update
- double booking
- duplicate write
- stale validation
- deadlock

Ini masalah real,
bukan teori ujian.

---

## 3. Kenapa Unit Test Sering Gagal Menangkap?

Karena banyak test biasa:
- sequential
- deterministic
- tidak punya timing overlap

Padahal masalah concurrency
justru lahir dari:
- overlap
- interleaving
- race timing

Jadi perlu pendekatan simulasi khusus.

---

## 4. Skenario yang Layak Disimulasikan

Contoh:
- dua user booking slot yang sama
- dua transaksi update saldo yang sama
- dua worker memproses job yang sama
- migration/backfill vs write traffic
- dua transaksi dengan urutan lock berbeda

Prioritaskan use case yang:
- kritikal bisnis,
- sering traffic tinggi,
- punya dampak besar jika salah.

---

## 5. Simulasi Lost Update

Kasus:
1. Transaksi A baca `available_slots = 1`
2. Transaksi B baca `available_slots = 1`
3. A update jadi 0
4. B update jadi 0

Secara logika bisnis:
- harusnya satu request gagal

Kalau dua-duanya lolos,
berarti ada race condition.

Simulasi ini sangat penting
untuk semua sistem reservation/inventory.

---

## 6. Simulasi Double Booking

Domain healthcare sangat relevan.

Kasus:
- 2 pasien memilih slot dokter yang sama
- request masuk nyaris bersamaan

Tujuan simulasi:
- pastikan hanya satu booking sukses
- yang lain gagal dengan sinyal yang benar

Jika dua-duanya berhasil,
desain write path belum aman.

---

## 7. Simulasi Duplicate Job Processing

Kasus:
- dua worker mengambil job reminder yang sama

Tujuan:
- pastikan side effect tidak dieksekusi dua kali
- validasi locking/idempotency/claim mechanism

Ini sangat penting untuk sistem queue/worker.

---

## 8. Simulasi Deadlock

Pola klasik:
- Transaksi A lock resource 1 lalu resource 2
- Transaksi B lock resource 2 lalu resource 1

Simulasi ini membantu melihat:
- bagaimana deadlock terjadi
- error seperti apa yang keluar
- apakah retry logic aplikasi bekerja

Kalau tim belum pernah melihat deadlock secara nyata,
respons saat production cenderung kacau.

---

## 9. Cara Simulasi Secara Manual

Cara paling sederhana:
- buka dua sesi SQL
- jalankan langkah bergantian secara sengaja

Keuntungan:
- mudah dipahami
- bagus untuk pembelajaran konsep

Kekurangan:
- tidak merepresentasikan load nyata
- butuh kedisiplinan urutan

Tapi untuk belajar dasar,
ini sangat berguna.

---

## 10. Cara Simulasi Secara Otomatis

Bisa dengan:
- test integration paralel
- skrip concurrent workers
- load test terarah

Keuntungan:
- repeatable
- bisa dijalankan di CI/staging
- cocok untuk regression test critical flows

Kekurangan:
- setup lebih kompleks

Untuk flow bisnis penting,
otomasi simulasi sangat bernilai.

---

## 11. Apa yang Harus Diamati?

Saat simulasi, perhatikan:
- apakah hasil bisnis benar?
- apakah ada duplicate row?
- apakah salah satu request gagal dengan benar?
- apakah ada deadlock/timeout?
- apakah retry/idempotency bekerja?
- apakah observability cukup jelas?

Simulasi tanpa observasi yang baik
tidak memberi banyak pelajaran.

---

## 12. Success Criteria

Jangan hanya tanya:
- "apakah sistem crash?"

Tanya juga:
- apakah invariants bisnis tetap terjaga?
- apakah user mendapat hasil yang konsisten?
- apakah error dapat ditangani dan dijelaskan?

Sistem bisa tidak crash
tapi tetap salah secara bisnis.

---

## 13. Instrumentation Penting

Saat simulasi concurrency,
log dan trace sangat membantu:
- request id
- transaction boundaries
- row affected
- conflict/deadlock error

Kalau tidak ada visibility,
tim bisa sulit memahami
apa yang sebenarnya terjadi.

---

## 14. Simulasi untuk Validasi Fix

Begitu bug concurrency ditemukan,
simulasikan:
- sebelum fix
- sesudah fix

Kalau fix tidak bisa dibuktikan
melalui simulasi/reproduction,
risiko regression tetap tinggi.

Ini penting untuk engineering yang serius.

---

## 15. Healthcare Example

Contoh skenario:
- slot teleconsult dokter hanya 1
- dua pasien submit booking bersamaan

Validasi:
- salah satu dapat `confirmed`
- satu lagi dapat conflict / slot unavailable
- tidak ada dua row valid untuk slot sama
- audit trail menunjukkan konflik bila relevan

Skenario sederhana ini sangat kuat
untuk melatih concurrency awareness.

---

## 16. Deadlock Recovery Validation

Jika deadlock sengaja dipicu,
cek:
- apakah salah satu transaksi dibatalkan?
- apakah aplikasi melakukan retry?
- apakah retry aman/idempotent?
- apakah observability menangkap kejadian?

Kalau deadlock tidak tertangani,
insiden acak akan muncul di waktu sibuk.

---

## 17. Simulasi vs Production Reality

Simulasi tidak akan sempurna meniru produksi.

Tapi itu bukan alasan untuk tidak melakukannya.

Tujuan simulasi:
- mengungkap kelemahan desain
- membangun intuisi
- mencegah masalah paling jelas

Lebih baik punya simulasi yang masuk akal
daripada nihil sama sekali.

---

## 18. Anti-Pattern Umum

1. Menganggap concurrency issue terlalu "langka" untuk diuji.
2. Hanya test sequential happy path.
3. Tidak pernah mensimulasikan duplicate request.
4. Tidak pernah memvalidasi fix concurrency.
5. Mengabaikan deadlock karena "nanti juga jarang".

---

## 19. Best Practices

- simulasikan use case bisnis yang paling sensitif.
- mulai dari manual untuk belajar, lalu otomatiskan.
- ukur hasil bisnis, bukan hanya error teknis.
- pastikan logging/trace membantu analisis.
- simpan skenario concurrency sebagai regression test penting.

---

## 20. Mini Latihan

Latihan:
1. Rancang simulasi double booking.
2. Rancang simulasi lost update.
3. Rancang simulasi deadlock dua resource.
4. Tentukan observasi apa yang harus dicatat.
5. Jelaskan kapan simulasi manual cukup dan kapan perlu otomatis.

---

## 21. Jawaban Contoh Ringkas

Simulasi deadlock:
- sesi A lock row X lalu akses Y
- sesi B lock row Y lalu akses X

Yang dicatat:
- error deadlock
- transaksi korban
- apakah retry berhasil

Simulasi otomatis diperlukan saat:
- flow sangat kritikal
- regression risk tinggi
- tim ingin menjadikannya tes berulang.

---

## 22. Checklist Kelulusan Topik 44

Kamu dianggap lulus jika bisa:
- menjelaskan kenapa concurrency issue perlu simulasi,
- membuat skenario lost update / double booking / deadlock,
- mengamati hasil teknis dan bisnis,
- memvalidasi fix dengan simulasi ulang,
- memperlakukan concurrency sebagai risiko nyata, bukan teori sampingan.

---

## 23. Ringkasan Brutal

- Bug concurrency tidak peduli kalau test-mu hijau.
- Kalau kamu tidak pernah mensimulasikannya,
  produksi yang akan menjadi tempat belajarmu.
