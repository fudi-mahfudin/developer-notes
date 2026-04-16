# Schema Evolution - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu schema evolution
- kenapa schema tidak boleh diperlakukan statis
- bagaimana mengubah schema tanpa merusak sistem
- perbedaan perubahan additive dan breaking
- anti-pattern saat melakukan perubahan data model

Schema akan berubah.

Kalau tim berpura-pura schema itu permanen,
setiap perubahan nanti akan terasa traumatis.

Schema evolution yang sehat
bukan soal "berani migrate".
Ia soal:
- kompatibilitas
- rollout
- backfill
- observability
- risiko operasional

---

## 1. Apa Itu Schema Evolution?

Schema evolution adalah proses
mengubah bentuk data atau struktur schema
seiring kebutuhan sistem berkembang.

Perubahan bisa berupa:
- tambah kolom
- ubah constraint
- rename field
- pecah tabel
- ubah representasi data

Masalahnya bukan pada perubahan itu sendiri.
Masalahnya adalah:
- bagaimana perubahan itu digulirkan dengan aman.

---

## 2. Kenapa Ini Penting?

Karena data hidup lebih lama
daripada banyak service dan banyak engineer.

Kalau schema berubah sembarangan:
- aplikasi lama rusak
- migration gagal
- query lama pecah
- data menjadi inkonsisten

Schema evolution adalah masalah desain sistem,
bukan sekadar SQL migration file.

---

## 3. Additive vs Breaking Changes

Additive changes:
- biasanya lebih aman
- misal tambah nullable column
- tambah field baru yang opsional

Breaking changes:
- drop kolom yang masih dipakai
- ubah makna nilai
- ganti format data tanpa compatibility path

Kebiasaan sehat:
- prioritaskan perubahan additive dulu
- hindari breaking change mendadak

---

## 4. Expand and Contract Thinking

Pola yang sangat penting:
- expand
- migrate
- contract

Artinya:
1. tambahkan schema baru dulu
2. buat aplikasi kompatibel dengan keduanya
3. migrasikan data/traffic
4. baru hapus yang lama

Ini jauh lebih aman
daripada perubahan sekali tebas.

---

## 5. Kenapa Rename Itu Berbahaya?

Rename terlihat sederhana.

Tapi secara operasional,
rename bisa berarti:
- code lama masih baca nama lama
- ETL/reporting masih bergantung
- job background belum diupdate
- client lain belum migrasi

Sering lebih aman:
- tambah field baru
- tulis dual-write bila perlu
- migrasi pembaca
- baru hapus field lama

---

## 6. Backward Compatibility

Pertanyaan inti:
- apakah code lama masih bisa jalan
  saat schema baru muncul?

Kalau deployment tidak sepenuhnya serentak,
ini sangat penting.

Schema changes harus memikirkan:
- aplikasi versi lama
- worker lama
- query lama
- integrasi eksternal

Tanpa backward compatibility thinking,
rollout jadi rapuh.

---

## 7. Forward Compatibility

Kadang juga perlu dipikirkan:
- apakah code baru tahan jika data lama masih ada?

Contoh:
- kolom baru belum terisi penuh
- sebagian row masih format lama

Code baru harus bisa hidup
selama masa transisi,
bukan mengasumsikan dunia langsung bersih.

---

## 8. Data Migration vs Schema Migration

Ini dua hal berbeda.

Schema migration:
- mengubah struktur

Data migration:
- mengubah isi/format data

Sering orang hanya memikirkan DDL,
padahal risiko besar justru ada
di data backfill dan transformasi isi.

Jangan samakan keduanya.

---

## 9. Backfill

Saat field baru ditambahkan,
sering perlu backfill data lama.

Pertanyaan penting:
- backfill online atau offline?
- chunking bagaimana?
- dampak ke database apa?
- progress dipantau bagaimana?

Backfill besar tanpa strategi
bisa mengganggu produksi.

---

## 10. Dual Read / Dual Write

Saat transisi format,
kadang perlu:
- dual write ke lama dan baru
- dual read dengan fallback

Ini memang menambah complexity sementara,
tapi bisa sangat membantu transisi aman.

Kuncinya:
- sifatnya sementara
- ada rencana pembersihan

Kalau tidak,
transisi sementara bisa menjadi hutang permanen.

---

## 11. Nullability dan Default

Menambah kolom baru
sering aman jika:
- nullable dulu
- atau default aman

Memaksa not-null langsung
tanpa mengurus data lama
sering sumber kegagalan migration.

Schema evolution yang matang
memikirkan keadaan data saat ini,
bukan hanya bentuk ideal target.

---

## 12. Constraint Changes

Menambah:
- foreign key
- unique constraint
- check constraint

terdengar bagus,
tapi harus diuji terhadap data eksisting.

Kalau data lama kotor,
constraint baru bisa gagal atau mengunci proses migration.

Urutan kerja yang sehat:
- audit data
- bersihkan pelanggaran
- baru terapkan constraint

---

## 13. Large Table Risk

Perubahan kecil di tabel besar
bisa berdampak besar.

Contoh risiko:
- lock lama
- migration timeout
- replication lag
- deploy tersendat

Tim senior tidak hanya bertanya:
- "SQL-nya benar?"

Tapi juga:
- "apa dampak operasionalnya?"

---

## 14. Multi-Service Reality

Kalau banyak service/worker
mengakses schema yang sama,
schema evolution lebih sulit.

Kamu harus pikirkan:
- versi pembaca/penulis yang berbeda
- deployment bertahap
- rollback possibility

Schema design bukan hanya urusan satu repo.
Ia urusan ekosistem yang terhubung ke data itu.

---

## 15. Healthcare Example

Misal ingin memecah:
- `patient_name`
menjadi:
- `first_name`
- `last_name`

Jangan langsung drop field lama.

Pola sehat:
1. tambah field baru
2. backfill dari nilai lama
3. update write path
4. update read path
5. observasi
6. baru hapus field lama

Ini lebih lambat,
tapi jauh lebih aman.

---

## 16. Observability Selama Evolusi

Saat migration besar,
kamu perlu tahu:
- progress backfill
- error rate
- query latency
- lock contention
- consumer compatibility

Schema evolution tanpa observability
adalah operasi buta.

Kalau ada masalah,
kamu akan terlambat sadar.

---

## 17. Rollback Thinking

Pertanyaan brutal:
- jika migration gagal di tengah,
  apa yang terjadi?

Tidak semua migration mudah di-rollback.

Karena itu:
- desain perubahan yang reversible jika bisa
- atau minimal buat blast radius kecil

Perubahan data destruktif
harus dipikir dua kali.

---

## 18. Anti-Pattern Umum

1. Rename/drop langsung tanpa compatibility window.
2. Menganggap schema migration sama dengan data migration.
3. Menambah constraint tanpa audit data lama.
4. Backfill besar tanpa throttling/monitoring.
5. Tidak punya rencana contract cleanup setelah transisi.

---

## 19. Best Practices

- gunakan pola expand-migrate-contract.
- prioritaskan additive changes.
- pisahkan schema change dari data backfill strategy.
- pikirkan compatibility antar versi aplikasi.
- pantau migration secara operasional, bukan hanya dari file SQL.

---

## 20. Pertanyaan Desain Penting

Sebelum mengubah schema, tanya:
1. Apakah ini additive atau breaking?
2. Siapa saja pembaca/penulis schema ini?
3. Apakah butuh backfill?
4. Bagaimana rollout dan rollback-nya?
5. Kapan field/shape lama aman dihapus?

---

## 21. Mini Latihan

Latihan:
1. Ambil satu perubahan schema dan desain expand-migrate-contract plan.
2. Tentukan langkah backfill aman untuk tabel besar.
3. Identifikasi perubahan mana yang sebenarnya breaking.
4. Rancang dual-read/dual-write sementara.
5. Buat checklist observability saat migration.

---

## 22. Jawaban Contoh Ringkas

Perubahan aman:
- tambah kolom nullable dulu
- deploy code kompatibel
- backfill bertahap
- hapus lama belakangan

Perubahan berbahaya:
- rename/drop langsung
- constraint baru tanpa audit data

---

## 23. Checklist Kelulusan Topik Schema Evolution

Kamu dianggap lulus topik ini jika sudah bisa:
- menjelaskan schema evolution sebagai proses operasional,
- membedakan additive dan breaking change,
- memakai pola expand-migrate-contract,
- memikirkan backfill, compatibility, dan rollback,
- menghindari migration destruktif sembrono.

---

## 24. Ringkasan Brutal

- Schema akan berubah. Titik.
- Yang membedakan tim matang dan tim ceroboh
  adalah cara mereka menggulirkan perubahan itu.
- Kalau strategi evolusimu cuma "rename lalu deploy",
  kamu sedang berjudi dengan data produksi.
