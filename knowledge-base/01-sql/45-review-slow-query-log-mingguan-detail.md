# SQL Review Slow Query Log Mingguan - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- kenapa slow query log harus direview rutin
- bagaimana cara review mingguan
- query mana yang diprioritaskan
- bagaimana mengubah temuan menjadi tindakan

Banyak tim mengaktifkan slow query log
lalu tidak pernah benar-benar membacanya.
Itu sama saja punya alarm
yang sengaja diabaikan.

---

## 1. Kenapa Slow Query Log Penting?

Slow query log memberi sinyal
tentang query yang menguras sistem.

Dari sini kamu bisa menemukan:
- query paling lambat
- query yang sering lambat
- pola beban yang memburuk
- regression pasca deploy

Ini salah satu sumber data terbaik
untuk perbaikan performa berbasis bukti.

---

## 2. Kenapa Harus Direview Mingguan?

Karena performa tidak statis.

Perubahan bisa datang dari:
- fitur baru
- data makin besar
- perubahan index
- query reporting baru
- beban musiman

Review mingguan memberi ritme sehat:
- cukup sering untuk deteksi dini
- cukup jarang untuk jadi kebiasaan berkelanjutan

---

## 3. Jangan Hanya Cari Query Paling Lambat

Kesalahan umum:
- hanya fokus pada 1 query paling ekstrem

Padahal yang sering lebih penting:
- query cukup lambat
  tapi dipanggil ribuan kali

Karena total biaya sistemnya bisa jauh lebih besar.

Jadi review harus mempertimbangkan:
- latency
- frequency
- total impact

---

## 4. Apa yang Direview?

Minimal lihat:
- query text/pattern
- total execution count
- total time
- average / p95 jika tersedia
- rows affected/read
- endpoint/job asal query
- kapan query melonjak

Kalau log hanya dilihat sekilas,
insight bernilai mudah hilang.

---

## 5. Group by Fingerprint

Query yang sama dengan parameter berbeda
sebaiknya digrup berdasarkan fingerprint/pattern.

Kenapa?
- fokus ke bentuk query
- bukan tenggelam di ribuan variasi literal

Ini membantu memprioritaskan perbaikan
pada pattern nyata yang dominan.

---

## 6. Prioritas Review

Urutkan perhatian ke:
1. query lambat di hot path user
2. query sering dengan total cost besar
3. query baru yang regresi
4. query yang memicu contention/lag
5. query batch yang merusak jam sibuk

Prioritas bukan semata soal "yang paling lama".

---

## 7. Cari Regression

Bandingkan minggu ini vs minggu lalu:
- apakah query tertentu naik drastis?
- apakah execution count melonjak?
- apakah average time memburuk?

Ini penting untuk mendeteksi:
- efek deploy baru
- data growth
- perubahan traffic pattern

Tanpa perbandingan historis,
review cenderung dangkal.

---

## 8. Hubungkan ke Bisnis

Saat review, tanya:
- query ini mendukung fitur apa?
- kalau lambat, user atau tim mana terdampak?
- apakah ini dashboard internal atau alur pembayaran?

Impact bisnis menentukan prioritas engineering.

Query 1 detik di checkout
lebih berbahaya daripada query 5 detik
di laporan internal bulanan.

---

## 9. Hubungkan ke Ownership

Slow query log tanpa owner = museum masalah.

Setiap temuan penting harus punya:
- owner
- severity/prioritas
- target perbaikan
- follow-up yang jelas

Kalau tidak,
review mingguan cuma ritual tanpa perubahan nyata.

---

## 10. Kategorikan Masalah

Saat review, klasifikasikan:
- missing index
- bad join/cardinality
- poor filter
- `SELECT *`
- reporting on OLTP
- lock wait
- bad pagination
- stale schema/statistics

Klasifikasi membantu melihat pola tim.

Mungkin ternyata masalahnya bukan satu query,
tapi kebiasaan desain yang buruk.

---

## 11. Korelasikan dengan EXPLAIN ANALYZE

Slow query log memberi petunjuk.
Diagnosis detail tetap perlu `EXPLAIN ANALYZE`.

Pola sehat:
1. log menunjukkan kandidat
2. pilih query prioritas
3. jalankan plan analysis
4. usulkan fix
5. ukur sesudah deploy

Kalau berhenti di log saja,
analisis belum lengkap.

---

## 12. Review Query yang "Masih Aman"

Jangan hanya menunggu query sudah parah.

Jika ada query:
- terus memburuk perlahan
- volume tumbuh cepat

maka lebih baik diperbaiki lebih awal
daripada menunggu menjadi insiden.

Review mingguan berguna untuk deteksi tren ini.

---

## 13. Jam Sibuk vs Jam Sepi

Lihat juga kapan query berat terjadi.

Query batch yang aman di jam malam
bisa jadi bencana saat berjalan di jam operasional.

Jadi review tidak cukup hanya lihat query text,
tapi juga konteks waktu eksekusi.

---

## 14. Contoh Temuan Nyata

Misal temuan:
- query dashboard admin 1.8 detik
- dieksekusi 12.000 kali per hari
- memakai `DATE(schedule_at)` dan `SELECT *`

Analisis:
- filter mematikan index
- projection berlebihan
- total cost sistem besar

Tindak lanjut:
- ubah range filter
- batasi kolom
- tambah index yang tepat

Inilah review yang menghasilkan tindakan nyata.

---

## 15. Weekly Review Cadence

Format review sehat:
1. ambil top queries minggu ini
2. bandingkan dengan minggu lalu
3. pilih 3-5 fokus utama
4. tetapkan owner/action
5. cek hasil minggu berikutnya

Kalau terlalu banyak item,
tim tidak akan mengeksekusi.

---

## 16. Review untuk Pembelajaran Tim

Slow query review bukan cuma operasional.

Ini juga alat edukasi:
- pattern query buruk apa yang berulang?
- tim sering salah di join, index, atau pagination?
- fitur mana yang paling memicu regresi?

Kalau dipakai benar,
review log bisa meningkatkan skill tim secara kolektif.

---

## 17. Anti-Pattern Umum

1. Log aktif tapi tidak direview.
2. Hanya fokus query paling ekstrem.
3. Tidak ada owner/action item.
4. Tidak bandingkan tren mingguan.
5. Tidak menghubungkan log dengan plan analysis.

---

## 18. Best Practices

- review slow query log secara rutin.
- prioritaskan berdasarkan impact total.
- fingerprint query pattern.
- tetapkan owner dan tindak lanjut.
- gunakan hasil review untuk edukasi dan improvement berulang.

---

## 19. Mini Latihan

Latihan:
1. Buat template review slow query log mingguan.
2. Tentukan 5 metrik yang harus dilihat.
3. Jelaskan kenapa frequency penting selain latency.
4. Jelaskan bagaimana memilih 3 query prioritas.
5. Buat contoh action item dari satu temuan log.

---

## 20. Jawaban Contoh Ringkas

5 metrik penting:
- total exec count
- total time
- avg/p95 latency
- rows read
- fingerprint/query pattern

Frequency penting karena:
- query yang "lumayan lambat" tapi sangat sering
  bisa lebih mahal secara total daripada query ekstrem yang jarang.

---

## 21. Checklist Kelulusan Topik 45

Kamu dianggap lulus jika bisa:
- menjelaskan nilai slow query review mingguan,
- memprioritaskan query berdasarkan impact,
- menghubungkan log dengan tindakan nyata,
- membangun ritme review yang tidak sekadar seremonial,
- memakai review log sebagai alat operasional dan pembelajaran tim.

---

## 22. Ringkasan Brutal

- Slow query log yang tidak direview
  hanyalah tumpukan bukti yang diabaikan.
- Tim yang disiplin membacanya
  biasanya lebih cepat mencegah insiden performa
  daripada tim yang hanya bereaksi saat user sudah marah.
