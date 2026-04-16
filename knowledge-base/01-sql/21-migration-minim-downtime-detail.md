# SQL Migration Strategy Minim Downtime - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- migration schema yang aman
- backward compatibility
- rollout bertahap
- backfill
- cutover
- rollback

Kalau migration dikerjakan naif,
kamu bisa:
- mengunci tabel produksi,
- mematahkan aplikasi lama,
- merusak data,
- atau membuat deploy panik tengah malam.

---

## 1. Kenapa Migration Itu Berbahaya?

Schema database adalah fondasi sistem.

Begitu kamu mengubah:
- nama kolom,
- tipe data,
- constraint,
- index,
- tabel relasi,

dampaknya bisa langsung ke:
- aplikasi produksi,
- job background,
- reporting,
- integrasi eksternal.

Migration yang buruk jarang gagal cantik.
Biasanya gagal kotor dan mahal.

---

## 2. Prinsip Utama: Expand, Migrate, Contract

Strategi umum yang sehat:
1. **Expand**
2. **Migrate**
3. **Contract**

Artinya:
- tambah struktur baru dulu,
- pindahkan data/pemakaian bertahap,
- hapus struktur lama belakangan.

Ini jauh lebih aman daripada:
- ubah langsung,
- deploy sekaligus,
- berharap tidak ada masalah.

---

## 3. Expand Phase

Pada fase expand,
kamu menambah hal baru tanpa mematahkan yang lama.

Contoh:
- tambah kolom baru
- tambah tabel baru
- tambah index baru
- tambah nullable field sementara

Tujuan:
- aplikasi lama tetap jalan,
- aplikasi baru punya jalur migrasi.

---

## 4. Contoh Expand yang Aman

Kasus:
ingin pindah dari `full_name` menjadi `first_name` + `last_name`.

Langkah aman awal:
- tetap pertahankan `full_name`
- tambah `first_name`
- tambah `last_name`

Jangan langsung hapus `full_name`
kalau aplikasi lama masih membaca kolom itu.

---

## 5. Migrate Phase

Di fase ini:
- data lama dipindahkan / dibackfill
- aplikasi mulai membaca/menulis struktur baru
- validasi dijalankan

Ini fase paling berbahaya,
karena lama dan rawan inkonsistensi kalau tidak disiplin.

---

## 6. Backfill

Backfill = mengisi data lama ke struktur baru.

Contoh:
- isi `first_name` dan `last_name`
  berdasarkan `full_name` historis

Backfill besar jangan asal satu query raksasa di production.

Risikonya:
- lock panjang
- I/O spike
- replication lag
- timeout

Lebih aman:
- batch bertahap
- ukur progress
- monitor dampaknya

---

## 7. Contract Phase

Setelah:
- semua data sudah pindah,
- semua aplikasi sudah pakai kolom baru,
- tidak ada lagi pembaca struktur lama,

baru kamu:
- drop kolom lama
- hapus index lama
- hapus compatibility layer

Kalau contract terlalu cepat,
kamu bisa mematahkan consumer yang tertinggal.

---

## 8. Backward Compatibility

Migration sehat harus menjaga kompatibilitas
setidaknya untuk beberapa window deploy.

Kenapa?
- deploy aplikasi dan migration tidak selalu sinkron sempurna
- worker lama bisa masih hidup
- rollback aplikasi bisa terjadi

Artinya:
- schema baru harus bisa ditoleransi aplikasi lama,
- aplikasi baru harus bisa hidup di schema transisional.

---

## 9. Forward Compatibility

Kadang kamu juga perlu berpikir sebaliknya:
- apakah aplikasi lama masih aman
  saat schema sudah sedikit lebih maju?

Contoh:
- tambah kolom baru biasanya aman
- ganti nama kolom langsung biasanya tidak aman

Ini alasan rename/drop langsung sering berbahaya.

---

## 10. Migration DDL yang Berisiko

Beberapa operasi bisa berat:
- alter type kolom besar
- add constraint ketat di tabel kotor
- add index besar
- drop/rename kolom yang dipakai aplikasi

Jangan asumsikan semua DDL itu ringan.

Cek engine behavior dan volume data.

---

## 11. Zero-Downtime Mindset

Zero/minimal downtime bukan berarti
"tidak ada perubahan besar".

Artinya:
- perubahan dibuat kompatibel,
- rollout bertahap,
- hot path tetap hidup,
- rollback disiapkan.

Ini mindset desain,
bukan sekadar fitur tool migration.

---

## 12. Rename Column Bahaya

Rename kelihatan sederhana,
tapi sering mematahkan:
- ORM mapping
- raw query
- ETL
- dashboard BI
- service lain

Strategi lebih aman:
- tambah kolom baru
- dual-write / backfill
- pindah read path
- drop lama belakangan

---

## 13. Dual Write

Kadang selama masa transisi,
aplikasi perlu menulis ke:
- kolom lama
- kolom baru

Ini membantu transisi,
tapi menambah kompleksitas.

Harus ada:
- batas waktu jelas
- observability
- rencana penghapusan

Kalau tidak,
dual write berubah jadi utang permanen.

---

## 14. Read Switch

Setelah backfill cukup aman,
aplikasi bisa dipindah
dari membaca struktur lama ke baru.

Lakukan bertahap jika bisa:
- feature flag
- canary
- partial rollout

Tujuannya:
- kalau ada bug,
  dampaknya tidak menghancurkan semua traffic.

---

## 15. Constraint Introduction Strategy

Menambah `NOT NULL` atau `UNIQUE`
di tabel lama sering berbahaya jika data belum bersih.

Langkah sehat:
1. audit data
2. cleanup data jelek
3. backfill nilai kosong
4. tambah constraint
5. monitor violation

Kalau kamu langsung pasang constraint,
deploy bisa gagal atau write path mendadak rusak.

---

## 16. Index Rollout

Index baru juga bagian migration.

Di tabel besar:
- pembuatan index bisa mahal
- bisa memengaruhi write
- bisa menambah lag

Harus direncanakan:
- kapan dijalankan
- berapa dampak resource-nya
- apakah ada mode non-blocking/concurrent sesuai engine

---

## 17. Rollback Strategy

Rollback migration tidak selalu sesederhana `down`.

Kalau sudah:
- backfill data
- drop kolom lama
- write format baru

maka rollback penuh bisa sulit.

Karena itu:
- desain migration harus rollback-aware sejak awal.

Sering strategi terbaik:
- schema tetap kompatibel,
- rollback cukup di level aplikasi dulu.

---

## 18. Data Loss Risk

Waspadai migration yang bisa merusak data:
- type cast yang menghilangkan presisi
- split kolom dengan parsing lemah
- merge kolom tanpa aturan jelas

Sebelum menjalankan:
- uji pada snapshot produksi / staging representatif
- hitung data affected
- siapkan validation query

---

## 19. Observability Selama Migration

Pantau:
- error aplikasi
- lock time
- CPU/IO DB
- replication lag
- job failure
- row count progress

Migration tanpa observability
adalah berjudi buta.

---

## 20. Studi Kasus

Kasus:
ganti `status` string bebas
menjadi status terkontrol dengan check constraint
dan struktur state baru.

Strategi:
1. audit nilai status existing
2. tambah kolom `status_v2` nullable
3. backfill mapping bertahap
4. aplikasi dual-write
5. read switch ke `status_v2`
6. tambah constraint valid
7. drop `status` lama

Ini jauh lebih aman
daripada mengubah kolom lama langsung di tempat.

---

## 21. Anti-Pattern Umum

1. Rename/drop langsung di production.
2. Backfill besar satu shot tanpa batch.
3. Tidak ada validasi hasil migration.
4. Tidak tahu siapa consumer schema.
5. Tidak punya rollback story.

---

## 22. Best Practices

- pakai expand-migrate-contract.
- uji migration pada data realistis.
- dokumentasikan compatibility window.
- lakukan backfill bertahap.
- pastikan observability dan rollback jelas.

---

## 23. Mini Latihan

Latihan:
1. Rancang migration rename kolom yang aman.
2. Buat langkah menambah `NOT NULL` pada kolom lama yang masih banyak `NULL`.
3. Jelaskan kapan dual-write diperlukan.
4. Jelaskan kenapa rollback migration sering sulit.
5. Buat checklist observability migration.

---

## 24. Jawaban Contoh Ringkas

Menambah `NOT NULL`:
1. audit `NULL`
2. backfill default/hasil valid
3. update app supaya selalu mengisi
4. baru tambahkan `NOT NULL`

---

## 25. Checklist Kelulusan Topik 21

Kamu dianggap lulus jika bisa:
- menjelaskan expand-migrate-contract,
- merancang migration yang backward compatible,
- memahami risiko backfill dan rollback,
- mengelola perubahan schema tanpa mematahkan produksi,
- memikirkan data, aplikasi, dan operasional sekaligus.

---

## 26. Ringkasan Brutal

- Migration sukses bukan yang "jalan di laptop".
- Migration sukses adalah yang lolos produksi
  tanpa drama, tanpa data rusak, dan tanpa panik rollback.
