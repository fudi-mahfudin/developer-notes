# SQL Review Query dan Migration dengan Standar Performa dan Risiko - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- cara mereview query
- cara mereview migration
- risiko performa
- risiko correctness
- risiko operasional
- checklist review yang benar

Banyak tim menganggap review SQL
cukup dengan "query-nya jalan".
Itu standar rendah.

Query dan migration harus direview dengan kacamata:
- benar atau tidak
- aman atau tidak
- scalable atau tidak
- mudah dioperasikan atau tidak

---

## 1. Kenapa Review SQL Itu Berbeda?

Karena SQL menyentuh:
- data inti
- performa sistem
- integritas bisnis
- operasional produksi

Bug di layer UI sering terlihat cepat.
Bug di layer data bisa diam-diam merusak sistem
dan baru ketahuan jauh belakangan.

Makanya review SQL tidak boleh santai.

---

## 2. Review Query Bukan Hanya Syntax

Query bisa:
- valid secara syntax
- return hasil

tapi tetap buruk karena:
- hasil bisnis salah
- join menggandakan baris
- query lambat di data besar
- filter tidak selektif
- bocorkan data sensitif

Jadi review harus lebih dalam dari:
- "udah jalan di local".

---

## 3. Pertanyaan Dasar Saat Review Query

Tanya:
1. grain hasil yang diinginkan apa?
2. apakah hasilnya benar secara bisnis?
3. apakah ada risiko duplicate row?
4. apakah filter tepat?
5. apakah index/plan masuk akal?
6. apakah kolom sensitif diambil berlebihan?

Kalau pertanyaan ini tidak diajukan,
review query biasanya dangkal.

---

## 4. Review Correctness

Aspek pertama:
- apakah query menjawab pertanyaan yang benar?

Contoh:
- mau hitung total appointment unik,
  tapi query join ke notes lalu `COUNT(*)`

Secara syntax valid.
Secara bisnis salah.

Correctness dulu.
Baru performa.

Query cepat yang salah
tetap sampah.

---

## 5. Review Grain dan Cardinality

Hal yang sering lolos:
- reviewer tidak mengecek grain
- reviewer tidak sadar one-to-many join

Checklist:
- satu baris output mewakili apa?
- join mana yang bisa menggandakan row?
- apakah agregasi dilakukan di tahap yang benar?

Kalau grain salah,
angka bisa bohong.

---

## 6. Review Predicate dan Filtering

Tanya:
- apakah filter ditaruh di tempat yang tepat?
- apakah `LEFT JOIN` diam-diam jadi `INNER JOIN` karena `WHERE`?
- apakah fungsi pada kolom mematikan index?
- apakah query menarik data terlalu banyak lalu memfilter belakangan?

Predicate placement sering menentukan
correctness dan performa sekaligus.

---

## 7. Review Projection

Jangan abaikan kolom yang di-select.

Tanya:
- apakah `SELECT *` dipakai tanpa alasan?
- apakah query mengambil PII yang tidak perlu?
- apakah ada kolom besar/JSON berat yang tidak dipakai?

Projection yang boros:
- menambah I/O
- menambah network cost
- memperluas risiko kebocoran data

---

## 8. Review Query Plan

Untuk query penting,
review idealnya menyentuh:
- execution plan
- estimated/actual rows
- scan type
- join type
- sort/aggregate hotspot

Tidak semua query butuh analisis mendalam.
Tapi query di hot path / volume tinggi jelas harus ditinjau lebih keras.

---

## 9. Review Query Security

Tanya:
- apakah input user diparameterkan?
- apakah identifier dinamis di-whitelist?
- apakah query ini bisa bocorkan data lintas tenant/user?
- apakah role DB yang menjalankan query terlalu luas?

Query review tanpa security lens
itu buta sebelah.

---

## 10. Review Migration: Risiko Khusus

Migration harus direview lebih ketat
daripada query read biasa.

Karena migration bisa:
- lock tabel
- mengubah schema
- mengubah data massal
- mematahkan aplikasi lain
- memicu lag replica

Migration review = review correctness + operasional + rollback.

---

## 11. Pertanyaan Dasar Saat Review Migration

1. Apakah perubahan ini backward compatible?
2. Apakah ada expand-migrate-contract plan?
3. Apakah ada rollback story?
4. Apakah ada data cleanup/backfill?
5. Apakah operasi ini berisiko lock panjang?
6. Apakah semua consumer schema sudah dipetakan?

Kalau salah satu tidak jelas,
angkat isu.

---

## 12. Review DDL Risk

Contoh operasi yang harus dicurigai:
- alter column type
- add constraint pada tabel besar
- rename/drop kolom
- create index besar
- mass update/delete

Reviewer harus bertanya:
- apa dampaknya di volume produksi?
- apa strategi rollout?
- apa mitigasi saat gagal?

Bukan sekadar "migration berhasil di staging mini".

---

## 13. Review Data Backfill

Backfill sering dianggap "nanti jalan aja".

Padahal perlu ditanya:
- berapa row yang akan disentuh?
- apakah pakai batch?
- apakah bisa di-pause/retry?
- bagaimana verifikasi hasilnya?
- apakah lag/IO sudah dipertimbangkan?

Backfill yang tidak direview
sering jadi sumber incident diam-diam.

---

## 14. Review Rollback Plan

Reviewer harus menekan:
- jika deploy salah, mundurnya bagaimana?
- apakah cukup rollback aplikasi?
- apakah schema masih kompatibel?
- apakah data baru bisa dibaca model lama?

Jika jawaban kabur,
review belum selesai.

---

## 15. Performance Risk Lens

Untuk query dan migration,
cek risiko:
- full scan tabel besar
- index miss
- lock contention
- heavy sort
- write amplification
- connection spike

Review bagus bukan hanya melihat kode,
tapi memproyeksikan dampak di produksi.

---

## 16. Operational Risk Lens

Review juga harus melihat:
- jam deploy
- observability
- alert yang perlu dipantau
- owner saat eksekusi
- runbook jika ada masalah

Terutama untuk migration,
operational preparedness itu wajib.

---

## 17. Business Risk Lens

Tanya:
- kalau query/migration salah, dampaknya apa?
- apakah hanya dashboard salah?
- atau bisa double charge / overbooking / data compliance rusak?

Semakin besar dampak bisnis,
semakin tinggi standar review yang dibutuhkan.

---

## 18. Healthcare Example

Contoh migration:
- tambah unique constraint `(doctor_id, schedule_at)`
  untuk mencegah double booking

Review harus menyentuh:
- apakah data existing sudah bersih?
- apakah ada slot historis konflik?
- apakah status cancelled ikut dihitung?
- apakah semua consumer siap?
- apa dampaknya ke booking write path?

Kalau cuma lihat syntax migration,
review itu dangkal.

---

## 19. Checklist Review Query Praktis

Checklist:
- purpose jelas
- grain jelas
- join aman
- filter tepat
- projection minimal
- plan masuk akal
- security aman
- hasil teruji dengan sample edge case

Ini checklist yang jauh lebih berguna
daripada "LGTM" kosong.

---

## 20. Checklist Review Migration Praktis

Checklist:
- change type dipahami
- volume data diketahui
- compatibility jelas
- backfill strategy jelas
- rollback plan jelas
- observability dan execution window siap
- owner dan monitoring ada

Migration yang tidak lulus checklist ini
tidak layak dianggap aman.

---

## 21. Anti-Pattern Umum

1. Review hanya lihat syntax.
2. Query analytics besar direview tanpa cek grain.
3. Migration direview tanpa pikir volume produksi.
4. Tidak ada rollback discussion.
5. Reviewer terlalu percaya "sudah dites di local".

---

## 22. Best Practices

- review berdasarkan correctness, performance, security, operability.
- minta evidence untuk query/migration penting.
- gunakan checklist yang konsisten.
- jangan takut menahan merge jika risikonya kabur.
- dokumentasikan keputusan review untuk perubahan sensitif.

---

## 23. Mini Latihan

Latihan:
1. Buat checklist review query reporting.
2. Buat checklist review migration add constraint.
3. Jelaskan kenapa grain harus dicek saat review query.
4. Jelaskan kenapa rollback plan wajib saat review migration.
5. Bedakan risiko query salah vs migration salah.

---

## 24. Jawaban Contoh Ringkas

Query salah:
- bisa hasil salah, dashboard bohong, performa jelek.

Migration salah:
- bisa lock besar, write gagal, data rusak, deploy gagal.

Itu sebabnya migration review harus lebih keras.

---

## 25. Checklist Kelulusan Topik 41

Kamu dianggap lulus jika bisa:
- mereview query dari sisi correctness dan performa,
- mereview migration dari sisi operasional dan rollback,
- memakai checklist yang tajam,
- menolak merge yang risikonya belum jelas,
- berpikir sebagai penjaga kualitas data, bukan sekadar pembaca syntax.

---

## 26. Ringkasan Brutal

- Review SQL yang malas adalah penyebab banyak insiden yang seharusnya bisa dicegah.
- `LGTM` tanpa berpikir itu bukan kolaborasi.
  Itu kelalaian yang dibungkus sopan santun.
