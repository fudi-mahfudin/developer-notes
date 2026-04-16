# SQL Biasakan Cek EXPLAIN ANALYZE - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- kenapa `EXPLAIN ANALYZE` harus jadi kebiasaan
- kapan dipakai
- apa yang harus dilihat
- jebakan interpretasi

Kalau kamu mengoptimasi query
tanpa pernah melihat eksekusi aktual,
kamu sedang bekerja berdasarkan asumsi,
bukan bukti.

---

## 1. Kenapa EXPLAIN ANALYZE Perlu Jadi Kebiasaan?

Karena intuisi sering salah.

Query yang terlihat sederhana bisa mahal.
Query yang terlihat rumit bisa baik-baik saja.

`EXPLAIN ANALYZE` membantu melihat:
- jalur eksekusi nyata
- actual rows
- actual time
- node paling mahal

Tanpa kebiasaan ini,
optimasi akan sering berubah jadi ritual.

---

## 2. Bedanya dengan EXPLAIN Biasa

`EXPLAIN`:
- memberi plan estimasi

`EXPLAIN ANALYZE`:
- mengeksekusi query dan memberi statistik aktual

Keduanya berguna.

Tapi untuk pembelajaran performa nyata,
actual execution jauh lebih mendidik.

---

## 3. Kapan Harus Dipakai?

Biasakan pakai saat:
- query baru masuk hot path
- query terlihat kompleks
- query lambat
- hasil plan meragukan
- ada perubahan index/schema

Tidak harus untuk semua query sepele,
tapi untuk query yang penting,
ini harus jadi refleks.

---

## 4. Kapan Harus Hati-Hati?

`EXPLAIN ANALYZE` benar-benar menjalankan query.

Jadi:
- hati-hati untuk query write
- hati-hati untuk query sangat berat di production
- hati-hati untuk query yang bisa lock atau mengubah data

Gunakan akal sehat.
Jangan "penasaran" di production lalu bikin insiden.

---

## 5. Apa yang Dilihat Pertama?

Fokus awal:
- total execution time
- node yang paling mahal
- actual rows
- scan type
- join type
- sort/aggregate hotspot

Jangan tenggelam di semua detail sekaligus.
Belajar membaca plan itu bertahap.

---

## 6. Actual Rows vs Estimated Rows

Ini salah satu bagian paling penting.

Kalau estimated rows jauh beda dari actual rows,
optimizer bisa memilih plan buruk.

Itu sinyal untuk cek:
- statistics
- skew data
- predicate
- query structure

Kalau kamu tidak pernah membandingkan dua angka ini,
skill plan-reading kamu belum matang.

---

## 7. Scan Type Awareness

Biasakan bertanya:
- apakah ini `Seq Scan`?
- apakah ini `Index Scan`?
- apakah scan besar ini wajar?

Jangan otomatis panik melihat seq scan.

Untuk tabel kecil,
seq scan bisa masuk akal.

Yang penting:
- konteks ukuran data dan selektivitas.

---

## 8. Sort dan Aggregate Nodes

`EXPLAIN ANALYZE` sering menunjukkan:
- sort mahal
- aggregate mahal

Pertanyaan:
- apakah dataset bisa difilter lebih awal?
- apakah order didukung index?
- apakah agregasi dilakukan pada grain yang tepat?

Plan reading yang matang
selalu menghubungkan node mahal ke keputusan query/schema.

---

## 9. Join Strategy dalam EXPLAIN ANALYZE

Lihat:
- `Nested Loop`
- `Hash Join`
- `Merge Join`

Jangan fanatik.

Yang penting:
- apakah join strategy cocok dengan ukuran data?
- apakah actual rows konsisten dengan asumsi?
- apakah join menyebabkan ledakan row?

---

## 10. Rows Removed by Filter

Ini sinyal penting.

Jika banyak row dibaca
lalu sebagian besar dibuang,
query mungkin:
- kurang selektif
- filter datang terlambat
- index kurang pas

Kadang sinyal ini
lebih berguna daripada sekadar total time.

---

## 11. Loop Count

Perhatikan juga loop/iterasi.

Node yang terlihat murah per loop
bisa jadi mahal total
jika dijalankan ribuan kali.

Ini penting terutama pada:
- nested loop
- correlated subquery tertentu

Kalau hanya lihat per-node sepintas,
kamu bisa salah diagnosis.

---

## 12. Gunakan untuk Belajar, Bukan Hanya Memadamkan Api

Kebiasaan bagus:
- jalankan `EXPLAIN ANALYZE` bahkan saat query belum incident

Tujuan:
- membangun intuisi
- memahami pengaruh index
- belajar trade-off query rewrite

Kalau tool ini hanya dipakai saat panik,
kurva belajarmu lebih lambat.

---

## 13. Bandingkan Sebelum dan Sesudah

Pola bagus:
1. simpan plan awal
2. ubah query / index
3. jalankan lagi
4. bandingkan

Jangan optimasi secara kabur.

Harus bisa jawab:
- time turun?
- rows processed turun?
- node mahal berubah?
- cost write bertambah?

Itu baru optimasi berbasis bukti.

---

## 14. Biasakan pada Data Realistis

Query yang tampak cepat di local kecil
bisa ambruk di data produksi.

Kalau belajar plan
hanya di dataset mini,
intuisi mudah menipu.

Gunakan data yang cukup representatif
kalau ingin belajar serius.

---

## 15. Healthcare Example

Kasus:
- query daftar appointment harian dokter terasa lambat

Dengan `EXPLAIN ANALYZE` terlihat:
- `Seq Scan` pada `appointments`
- function `DATE(schedule_at)` mematikan index
- rows removed by filter sangat besar

Perbaikan:
- ubah filter ke range time
- tambah index `(doctor_id, schedule_at)`

Tanpa `EXPLAIN ANALYZE`,
tim bisa menghabiskan waktu di area salah.

---

## 16. Common Misread

Kesalahan umum:
- lihat `Seq Scan` lalu otomatis menganggap salah
- lihat cost lalu mengira itu waktu nyata
- fokus pada node kecil dan mengabaikan bottleneck utama
- tidak melihat actual rows

Membaca plan adalah skill.
Bukan sekadar melihat beberapa kata kunci.

---

## 17. Biasakan Menulis Catatan

Saat membaca plan, catat:
- query
- total time
- node mahal
- hypothesis
- perubahan yang dicoba
- hasil sesudah perubahan

Ini membantu:
- pembelajaran
- kolaborasi
- postmortem optimasi

Tanpa catatan,
banyak insight hilang.

---

## 18. Anti-Pattern Umum

1. Optimasi tanpa pernah menjalankan `EXPLAIN ANALYZE`.
2. Menjalankan `EXPLAIN ANALYZE` di production tanpa kehati-hatian.
3. Tidak membandingkan actual vs estimated rows.
4. Hanya melihat satu node tanpa konteks total.
5. Tidak menyimpan baseline sebelum perubahan.

---

## 19. Best Practices

- jadikan `EXPLAIN ANALYZE` kebiasaan untuk query penting.
- fokus pada actual execution, bukan tebakan.
- bandingkan sebelum/sesudah.
- gunakan data realistis.
- pahami bahwa interpretasi plan butuh konteks ukuran data dan workload.

---

## 20. Mini Latihan

Latihan:
1. Jalankan `EXPLAIN ANALYZE` pada query filter sederhana.
2. Identifikasi scan type dan actual rows.
3. Ubah query/index, lalu bandingkan hasil.
4. Temukan node paling mahal.
5. Jelaskan kenapa estimated vs actual rows penting.

---

## 21. Jawaban Contoh Ringkas

Estimated vs actual rows penting karena:
- optimizer memilih plan berdasarkan estimasi,
- jika estimasi meleset jauh,
  plan yang dipilih bisa buruk.

Node paling mahal penting karena:
- di situlah upaya optimasi biasanya paling bernilai.

---

## 22. Checklist Kelulusan Topik 43

Kamu dianggap lulus jika bisa:
- menjelaskan kapan `EXPLAIN ANALYZE` dipakai,
- membaca komponen utamanya,
- membandingkan plan sebelum/sesudah,
- menghindari misread dasar,
- menjadikan evidence performa sebagai kebiasaan.

---

## 23. Ringkasan Brutal

- Kalau kamu belum terbiasa melihat actual plan,
  maka banyak keputusan performa SQL-mu masih berdasarkan feeling.
- Feeling itu murah.
  Incident production tidak.
