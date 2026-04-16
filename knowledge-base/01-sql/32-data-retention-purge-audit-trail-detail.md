# SQL Data Retention, Purge, dan Audit Trail - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- data retention
- purge
- audit trail
- relasi antara compliance, operasional, dan storage
- bagaimana mendesain lifecycle data dengan benar

Kalau semua data disimpan selamanya tanpa strategi,
itu bukan kehati-hatian.
Itu kekacauan yang ditunda.

---

## 1. Apa Itu Data Retention?

Data retention adalah kebijakan
tentang berapa lama data disimpan,
di mana disimpan,
dan kapan dipindahkan atau dihapus.

Retention menjawab:
- data apa yang harus tetap ada
- berapa lama
- siapa yang memutuskan
- apa dasar bisnis/legalnya

---

## 2. Kenapa Retention Penting?

Karena data bukan cuma aset.
Data juga beban.

Semakin lama data disimpan:
- storage naik
- index membesar
- backup lebih berat
- risiko kebocoran meningkat
- compliance exposure bertambah

Retention yang matang
mengendalikan semua hal ini.

---

## 3. Audit Trail

Audit trail adalah jejak aktivitas penting
yang memungkinkan tim menjawab:
- siapa melakukan apa
- kapan
- terhadap data yang mana
- hasilnya apa

Audit trail penting untuk:
- keamanan
- investigasi insiden
- compliance
- akuntabilitas operasional

---

## 4. Purge

Purge berarti penghapusan permanen data
sesuai kebijakan yang berlaku.

Purge bukan:
- delete asal
- reaksi panik saat disk penuh

Purge yang sehat:
- direncanakan
- terdokumentasi
- aman
- dapat dibuktikan

---

## 5. Retention Bukan Urusan Engineer Saja

Retention harus melibatkan:
- business owner
- compliance/legal
- security/privacy
- engineering/DBA

Kalau engineer sendiri yang mengarang masa retensi
tanpa stakeholder lain,
risikonya besar.

---

## 6. Kategori Data Berdasarkan Lifecycle

Umumnya data bisa dibagi:
- hot: aktif dan sering dipakai
- warm: sesekali diakses
- cold: arsip / audit
- purgeable: sudah boleh dihapus

Klasifikasi ini membantu
menentukan strategi storage dan akses.

---

## 7. Contoh Data yang Perlu Retention Berbeda

Misal sistem healthcare:
- `appointments`: penting operasional dan histori menengah
- `audit_logs`: penting untuk jejak perubahan
- `notification_jobs`: nilai operasional jangka pendek
- `session_logs`: mungkin cukup singkat

Kalau semua diperlakukan sama,
desainmu malas.

---

## 8. Retention Policy Harus Spesifik

Jangan menulis:
- "data disimpan secukupnya"

Itu sampah dokumentasi.

Tulis:
- jenis data
- lokasi
- lama simpan aktif
- lama simpan arsip
- trigger purge
- owner approval

Baru itu kebijakan yang berguna.

---

## 9. Audit Trail Beda dengan Log Biasa

Log biasa:
- untuk observability dan debugging

Audit trail:
- untuk rekam tindakan penting yang bisa dipertanggungjawabkan

Contoh audit trail:
- siapa ubah status appointment
- siapa buka record sensitif
- siapa menghapus data

Jangan anggap log umum otomatis cukup sebagai audit trail.

---

## 10. Karakteristik Audit Trail yang Baik

Harus:
- append-only sebisa mungkin
- timestamp jelas
- actor jelas
- object/record jelas
- action jelas
- sulit dimanipulasi diam-diam

Kalau audit trail mudah diedit/hilang,
nilainya turun drastis.

---

## 11. Retention dan Query Performance

Semakin banyak data historis di tabel operasional:
- scan lebih mahal
- index lebih besar
- maintenance lebih berat

Retention yang baik membantu performa,
bukan hanya compliance.

Artinya:
- retention itu juga keputusan engineering.

---

## 12. Purge Aman

Purge harus dirancang hati-hati:
- batch bertahap
- tidak lock besar
- tidak merusak foreign key sembarangan
- tercatat dan dapat diverifikasi

Delete besar satu shot di production
bisa menimbulkan incident baru.

---

## 13. Soft Delete vs Purge

Soft delete:
- record disembunyikan/logis dihapus
- data masih ada

Purge:
- data benar-benar dihapus permanen

Keduanya beda.

Sering:
- soft delete untuk operasional,
- purge untuk lifecycle final.

---

## 14. Data Minimization

Prinsip penting:
- jangan simpan data lebih lama dari yang perlu.

Ini berkaitan erat dengan privasi.

Kalau suatu field tidak lagi dibutuhkan,
pertimbangkan:
- purge
- anonymize
- tokenize

Menyimpan data tanpa batas
adalah risiko, bukan kemenangan.

---

## 15. Anonymization vs Purge

Kadang data historis masih berguna
untuk analytics,
tapi identitas personal tidak lagi dibutuhkan.

Solusi:
- anonymization / pseudonymization
  alih-alih menyimpan PII penuh

Ini bisa jadi kompromi sehat
antara kebutuhan bisnis dan privasi.

---

## 16. Studi Kasus Healthcare

Contoh kebijakan:
- `notification_jobs`: 90 hari operasional, lalu purge
- `appointments`: 18 bulan hot, lalu archive
- `audit_logs`: minimal 24 bulan
- `patient_contact_change_logs`: retensi lebih panjang karena kebutuhan audit

Kebijakan seperti ini jauh lebih matang
daripada "simpan semua saja".

---

## 17. Purge Harus Dapat Diaudit

Ironis tapi penting:
- proses purge juga harus tercatat.

Minimal:
- siapa menjalankan
- kapan
- data kategori apa
- berapa banyak row
- dasar kebijakan apa

Kalau purge tidak terlacak,
investigasi masa depan akan kacau.

---

## 18. Restore dan Retention

Retention dan backup harus sinkron.

Pertanyaan:
- jika data sudah dipurge,
  apakah backup lama masih menyimpannya?
- apakah itu sesuai kebijakan?

Retention yang matang
harus mempertimbangkan jejak data di backup/arsip juga.

---

## 19. Anti-Pattern Umum

1. Semua data disimpan selamanya tanpa alasan.
2. Tidak ada perbedaan retention antar jenis data.
3. Purge dilakukan manual saat storage hampir habis.
4. Audit trail tidak lengkap atau mudah diubah.
5. Backup melanggar kebijakan retention tanpa disadari.

---

## 20. Best Practices

- definisikan retention per kategori data.
- pisahkan audit trail dari log biasa.
- purge dalam batch dan terdokumentasi.
- pertimbangkan anonymization untuk histori analytics.
- sinkronkan retention dengan backup dan archive.

---

## 21. Mini Latihan

Latihan:
1. Buat retention policy sederhana untuk 4 tabel.
2. Jelaskan beda audit trail dan application log.
3. Jelaskan beda soft delete dan purge.
4. Rancang proses purge yang aman untuk tabel besar.
5. Jelaskan kapan anonymization lebih baik daripada simpan PII penuh.

---

## 22. Jawaban Contoh Ringkas

Audit trail:
- untuk bukti tindakan dan akuntabilitas.

Application log:
- untuk debugging/observability.

Soft delete:
- data masih ada.

Purge:
- data benar-benar dihapus.

---

## 23. Checklist Kelulusan Topik 32

Kamu dianggap lulus jika bisa:
- menjelaskan retention, purge, dan audit trail,
- membedakan kebutuhan data operasional vs histori,
- merancang lifecycle data sederhana,
- memahami bahwa purge harus aman dan terkontrol,
- menghubungkan privasi, storage, dan compliance dalam satu desain.

---

## 24. Ringkasan Brutal

- Menyimpan semua data selamanya bukan tanda dewasa.
- Itu tanda tim tidak mau membuat keputusan sulit.
