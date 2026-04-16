# SQL Exit Criteria Mid-Level - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- standar skill SQL level mid
- apa yang membedakan mid dari junior
- kemampuan yang mulai wajib di area desain, performa, dan reliability

Mid-level bukan berarti "junior yang lebih cepat".
Mid-level berarti:
- bisa dipercaya lebih mandiri,
- bisa melihat trade-off,
- mulai mampu mencegah masalah,
  bukan hanya menulis query yang kebetulan berhasil.

---

## 1. Apa Itu Exit Criteria Mid?

Exit criteria mid menunjukkan seseorang:
- kuat di fondasi,
- mandiri di pekerjaan SQL sehari-hari,
- mulai paham performa, correctness, dan operasional,
- tidak lagi butuh arahan detail untuk masalah umum.

Mid belum harus merancang semua arsitektur.
Tapi sudah harus berhenti berpikir sempit.

---

## 2. Fondasi Harus Sudah Otomatis

Hal-hal level junior:
- basic query
- join
- agregasi
- DML aman
- null handling
- constraints dasar

Di level mid, semua itu tidak boleh lagi goyah.

Kalau fondasi masih sering salah,
belum bisa naik.

---

## 3. Query Composition Lebih Kompleks

Mid harus nyaman dengan:
- CTE
- subquery
- multi-join
- window function dasar-menengah
- reporting query yang cukup kompleks

Dan yang penting:
- tetap menjaga query terbaca,
- bukan menulis query rumit demi ego.

---

## 4. Grain dan Cardinality Awareness Wajib

Ini pembeda penting.

Mid harus bisa:
- menjelaskan grain hasil query
- mengenali one-to-many explosion
- menghindari double counting
- memilih pre-aggregation jika perlu

Kalau masih sering menutup masalah dengan `DISTINCT`,
itu belum mid yang matang.

---

## 5. Performance Awareness Harus Nyata

Mid harus mulai kuat di:
- membaca `EXPLAIN`
- memahami scan/join dasar
- tahu kapan query butuh index
- bisa mengidentifikasi bottleneck umum

Tidak harus jadi perf wizard,
tapi tidak boleh buta performa.

Kalau query lambat masih disikapi dengan tebakan,
belum cukup matang.

---

## 6. Index Literacy

Mid harus paham:
- single vs composite index
- urutan kolom penting
- kapan index membantu
- kapan index tidak banyak berguna
- trade-off read vs write

Minimal bisa mengusulkan index dengan alasan yang jelas,
bukan sekadar "coba tambah index".

---

## 7. Transaction Awareness

Mid harus paham:
- kapan operasi perlu transaction
- kenapa transaction terlalu besar berbahaya
- dasar isolation issue
- pentingnya idempotency untuk write kritikal

Belum harus menjadi ahli distributed systems,
tapi sudah tidak boleh naif soal multi-step write.

---

## 8. Query Plan Evidence

Mid-level yang sehat
mulai terbiasa membuktikan perubahan dengan data.

Contoh:
- sebelum fix p95 2.1s
- sesudah fix 320ms
- node mahal berubah dari seq scan ke index scan

Kalau masih hanya berkata:
- "kayaknya lebih cepat"

itu belum cukup.

---

## 9. Review Skill

Mid harus mulai bisa mereview query orang lain.

Minimal mampu menilai:
- correctness
- grain
- obvious performance risk
- SQL injection/basic security risk
- migration risk dasar

Review skill adalah tanda
bahwa pemahamanmu sudah lebih dari level individual contributor mentah.

---

## 10. Migration Awareness

Mid harus paham migration sehat:
- backward compatibility dasar
- add column vs rename/drop langsung
- backfill risk
- rollback awareness

Tidak harus memimpin migration paling kompleks,
tapi tidak boleh sembrono.

---

## 11. Data Quality Awareness

Mid harus peka terhadap:
- duplicate anomaly
- null anomaly
- referential issue
- mismatch lintas tabel

Kalau melihat angka aneh
dan langsung percaya tanpa verifikasi,
itu bukan perilaku mid yang sehat.

---

## 12. Analytics Thinking Dasar

Mid sebaiknya sudah paham:
- unit analisis
- denominator
- cohort/funnel basic
- time bucket dan timezone impact

Karena banyak bug data
lahir dari salah definisi metrik,
bukan hanya salah syntax.

---

## 13. Security Awareness yang Lebih Kuat

Mid harus benar-benar disiplin di:
- parameterized query
- least privilege awareness
- tidak membocorkan PII sembarangan
- masking dasar di tempat yang tepat

Security tidak lagi boleh dianggap "nanti tim security yang urus".

---

## 14. Operability Awareness

Mid harus tahu bahwa query/schema change
berdampak ke:
- monitoring
- slow query log
- runbook
- deploy window
- rollback

Kalau masih berpikir semata "kodenya jalan",
sudut pandangnya belum cukup luas.

---

## 15. Problem Solving Style

Mid yang baik:
- memecah masalah
- mencari bukti
- tidak langsung menyalahkan DB atau ORM
- membandingkan beberapa opsi
- tahu kapan minta bantuan

Mid yang buruk:
- lebih cepat coding daripada berpikir
- menebak-nebak bottleneck
- defensif saat dikritik

---

## 16. Tugas yang Seharusnya Bisa Ditangani

Contoh:
- memperbaiki query reporting lambat
- menulis query dashboard operasional yang benar
- membuat migration add constraint secara aman
- men-debug double count dari join
- membuat index untuk use case tertentu

Kalau tugas seperti ini masih selalu perlu disuapi,
belum benar-benar mid.

---

## 17. Apa yang Belum Harus Penuh?

Belum harus sangat matang di:
- arsitektur data lintas sistem besar
- decision record lintas tim
- strategi partisi/replikasi kompleks
- governance data tingkat organisasi

Boleh mulai kuat,
tapi belum harus menjadi pemilik utama area itu.

---

## 18. Anti-Pattern Mid yang Menahan Kenaikan

1. Paham syntax lanjut tapi lemah di correctness.
2. Bisa optimasi query tapi tidak paham business impact.
3. Bisa review query tapi buta operasional migration.
4. Terlalu percaya diri tanpa evidence.
5. Masih mengandalkan senior untuk semua keputusan menengah.

---

## 19. Best Practices untuk Naik dari Mid ke Senior

- mulai dokumentasikan trade-off.
- biasakan memberi justifikasi berbasis metrik.
- pahami incident yang pernah terjadi.
- review lebih banyak perubahan orang lain.
- latih desain, bukan hanya implementasi.

Naik ke senior butuh perluasan sudut pandang.

---

## 20. Mini Latihan

Latihan:
1. Sebutkan 10 indikator SQL mid-level.
2. Bedakan mid dengan junior di area performa.
3. Bedakan mid dengan senior di area arsitektur.
4. Buat contoh review comment SQL yang baik.
5. Jelaskan kenapa evidence penting di level mid.

---

## 21. Jawaban Contoh Ringkas

Mid vs junior:
- junior menulis query yang benar secara dasar
- mid mulai paham grain, plan, index, migration risk, dan review

Mid vs senior:
- mid bisa menyelesaikan masalah teknis menengah
- senior menentukan desain dan trade-off lintas sistem dengan lebih luas

---

## 22. Checklist Kelulusan Topik 48

Kamu dianggap lulus jika bisa:
- menulis query menengah dengan benar dan terbaca,
- mengidentifikasi masalah performa umum,
- mereview query/migration dasar secara layak,
- memahami transaction/idempotency/schema evolution tingkat menengah,
- bekerja cukup mandiri tanpa terus-menerus dibimbing detail.

---

## 23. Ringkasan Brutal

- Mid bukan sekadar lebih cepat dari junior.
- Mid harus mulai bisa dipercaya,
  bukan hanya bisa menyelesaikan tugas setelah diarahkan rapat-rapat.
