# SQL Rollback Plan untuk Schema Change - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- kenapa rollback plan wajib
- rollback aplikasi vs rollback schema
- safe rollback pattern
- data compatibility
- decision making saat perubahan gagal

Banyak tim punya migration.
Sedikit tim punya rollback plan yang benar.
Dan itu perbedaan besar saat produksi mulai rusak.

---

## 1. Kenapa Rollback Plan Wajib?

Karena perubahan schema bisa gagal di produksi:
- query lama patah
- migration terlalu lama
- constraint baru memblokir write
- data baru tidak cocok
- worker lama crash

Saat itu pertanyaannya:
- "bagaimana kembali ke kondisi aman?"

Kalau jawabannya belum ada,
tim sedang berjudi.

---

## 2. Rollback Bukan Sekadar `down migration`

Ini kesalahan besar.

Rollback nyata harus mempertimbangkan:
- apakah data baru sudah ditulis?
- apakah aplikasi baru sudah live?
- apakah consumer lain ikut terdampak?
- apakah perubahan bisa dibalik tanpa data loss?

`down migration` kadang membantu,
tapi sering tidak cukup.

---

## 3. Tipe Perubahan dan Risiko Rollback

Contoh perubahan:
- tambah kolom
- tambah index
- tambah constraint
- drop kolom
- rename kolom
- ubah type kolom
- split/merge struktur data

Sebagian mudah dibalik.
Sebagian sangat berisiko.

Drop/rename/type change biasanya lebih berbahaya.

---

## 4. Rollback Aplikasi vs Rollback Schema

Sering kali,
rollback paling aman adalah:
- rollback aplikasi dulu,
- schema dibiarkan tetap kompatibel sementara.

Kenapa?
- membalik schema aktif bisa lebih mahal/rusak
- aplikasi lama sering bisa hidup di schema transisi

Karena itu,
schema change sebaiknya didesain agar toleran terhadap rollback aplikasi.

---

## 5. Prinsip Safe Rollback

Prinsip umum:
1. hindari perubahan irreversibel di satu langkah
2. jaga backward compatibility
3. pahami data yang sudah telanjur ditulis
4. punya titik keputusan yang jelas
5. dokumentasikan tindakan rollback

Tanpa prinsip ini,
rollback berubah jadi improvisasi panik.

---

## 6. Expand-Contract Membantu Rollback

Strategi expand-migrate-contract
secara alami lebih rollback-friendly.

Kenapa?
- struktur lama masih ada
- struktur baru belum wajib tunggal
- aplikasi bisa kembali ke jalur lama sementara

Itu jauh lebih aman
daripada rename/drop sekali langkah.

---

## 7. Contoh Aman: Tambah Kolom

Menambah kolom baru biasanya relatif aman.

Kalau ada masalah di aplikasi:
- rollback aplikasi
- kolom baru dibiarkan belum terpakai

Ini contoh perubahan dengan rollback sederhana.

---

## 8. Contoh Berbahaya: Drop Kolom

Kalau kolom lama dihapus,
lalu ternyata:
- service lain masih membaca,
- ETL masih pakai,
- query dashboard belum diubah,

rollback menjadi sulit,
karena struktur lama sudah hilang.

Itu sebabnya drop harus paling akhir.

---

## 9. Data Compatibility

Rollback harus melihat:
- data baru yang ditulis setelah deploy

Pertanyaan:
- apakah aplikasi lama bisa membaca data format baru?
- apakah field wajib lama masih tersedia?
- apakah data baru bisa direpresentasikan di model lama?

Kalau jawabannya tidak,
rollback aplikasi saja bisa tetap gagal.

---

## 10. Rollback Decision Point

Kamu perlu threshold keputusan:
- kapan deploy dianggap gagal?
- indikator apa yang dipakai?
- siapa yang berwenang memutus rollback?

Contoh indikator:
- error rate naik > x%
- p95 naik > y%
- migration belum selesai dalam z menit
- deadlock/lock spike

Tanpa threshold,
tim akan ragu terlalu lama.

---

## 11. Rollback untuk Index Change

Index baru biasanya lebih mudah ditangani:
- jika membebani write atau membuat masalah,
  bisa drop index

Tapi tetap:
- harus tahu dampak resource
- jangan drop index penting secara panik tanpa konfirmasi

Rollback tetap butuh data dan disiplin.

---

## 12. Rollback untuk Constraint Change

Constraint baru bisa memblokir write.

Kalau ternyata data dunia nyata
tidak sebersih asumsi desain,
constraint bisa langsung menimbulkan insiden.

Rollback plan harus mencakup:
- cara menonaktifkan / membatalkan constraint
- cara memulihkan write path
- cara mengaudit data yang gagal

---

## 13. Rollback untuk Type Change

Type change berbahaya karena:
- cast bisa gagal
- data bisa kehilangan presisi
- aplikasi lama bisa tidak cocok

Strategi aman:
- buat kolom baru
- backfill
- switch bertahap
- drop lama belakangan

Ini membuat rollback lebih realistis.

---

## 14. Shadow Write / Dual Write dan Rollback

Jika pakai dual-write,
rollback perlu menjawab:
- data mana sumber kebenaran saat mundur?
- apakah write ke format baru diabaikan?
- apakah perlu sinkronisasi balik?

Tanpa aturan jelas,
rollback bisa menghasilkan dua sumber kebenaran.

---

## 15. Verification Setelah Rollback

Rollback belum selesai sampai diverifikasi.

Cek:
- aplikasi kembali sehat?
- write path normal?
- query utama jalan?
- data baru tidak rusak?
- worker/background job aman?

Kalau rollback dilakukan tanpa verifikasi,
tim hanya mengganti satu risiko dengan risiko lain.

---

## 16. Runbook Rollback

Rollback plan harus ditulis,
bukan disimpan di kepala senior engineer.

Minimal isi:
- kondisi pemicu rollback
- urutan langkah
- dependency yang terdampak
- owner per langkah
- cara verifikasi

Saat insiden,
dokumen ini menyelamatkan waktu dan emosi.

---

## 17. Studi Kasus

Kasus:
- aplikasi pindah dari `status` lama ke `status_v2`
- beberapa worker lama masih membaca `status`
- tim terlalu cepat drop kolom lama

Hasil:
- worker error
- retry storm
- backlog naik

Rollback sulit
karena struktur lama sudah hilang.

Pelajaran:
- contract terlalu cepat,
- rollback plan tidak matang.

---

## 18. Kapan Rollback Bukan Pilihan Terbaik?

Kadang rollback lebih berbahaya
daripada forward fix.

Contoh:
- data baru sudah telanjur banyak dan format lama tidak kompatibel
- rollback schema akan menyebabkan data loss

Dalam kasus seperti ini:
- mungkin lebih aman hotfix cepat
  daripada memaksa rollback buta.

Senior engineer harus bisa menilai ini dengan tenang.

---

## 19. Anti-Pattern Umum

1. Menganggap `down migration` selalu cukup.
2. Drop/rename kolom terlalu cepat.
3. Tidak memikirkan compatibility data baru.
4. Tidak punya trigger keputusan rollback.
5. Tidak melakukan verifikasi pasca rollback.

---

## 20. Best Practices

- desain schema change agar rollback-friendly.
- prioritaskan rollback aplikasi jika lebih aman.
- simpan struktur lama sampai transisi benar-benar selesai.
- buat runbook rollback tertulis.
- latih rollback di staging / game day.

---

## 21. Mini Latihan

Latihan:
1. Jelaskan beda rollback aplikasi dan rollback schema.
2. Buat rollback plan untuk penambahan constraint yang gagal.
3. Buat rollback plan untuk rename kolom secara aman.
4. Tentukan indikator pemicu rollback.
5. Jelaskan kapan forward fix lebih aman daripada rollback.

---

## 22. Jawaban Contoh Ringkas

Rollback aplikasi lebih aman jika:
- schema masih kompatibel,
- masalah utama ada di kode,
- membalik schema berisiko lebih tinggi.

Forward fix lebih aman jika:
- data baru tidak kompatibel dengan model lama,
- rollback akan menimbulkan data loss atau downtime lebih besar.

---

## 23. Checklist Kelulusan Topik 27

Kamu dianggap lulus jika bisa:
- menjelaskan pentingnya rollback plan,
- membedakan rollback aplikasi vs schema,
- merancang perubahan yang rollback-friendly,
- menentukan trigger dan verifikasi rollback,
- berpikir realistis saat perubahan produksi gagal.

---

## 24. Ringkasan Brutal

- Perubahan tanpa rollback plan itu bukan keberanian.
- Itu kecerobohan yang belum ketemu waktunya saja.
