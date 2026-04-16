# SQL Backup dan Restore Drill - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- kenapa backup penting
- jenis backup
- restore
- restore drill
- RPO dan RTO
- kesalahan umum tim saat merasa "sudah aman"

Backup yang belum pernah diuji restore
itu bukan perlindungan.
Itu cuma rasa aman palsu.

---

## 1. Kenapa Backup Wajib?

Kehilangan data bisa terjadi karena:
- human error
- bug aplikasi
- migration rusak
- storage failure
- ransomware
- region outage
- delete massal yang tidak sengaja

Pada titik itu,
pertanyaan paling penting bukan:
- "apakah kita punya backup?"

Tapi:
- "apakah backup itu bisa dipulihkan tepat waktu?"

---

## 2. Backup vs Restore

Backup:
- proses membuat salinan data.

Restore:
- proses mengembalikan data dari salinan tersebut.

Banyak tim fokus pada backup,
tapi lemah di restore.

Padahal nilai backup baru nyata
saat restore berhasil.

---

## 3. RPO dan RTO

### RPO

Recovery Point Objective:
- seberapa banyak data maksimal yang rela hilang.

Contoh:
- RPO 5 menit berarti kehilangan data >5 menit tidak dapat diterima.

### RTO

Recovery Time Objective:
- berapa lama maksimal layanan boleh down / terganggu saat pemulihan.

Contoh:
- RTO 30 menit

RPO dan RTO menentukan strategi backup.

---

## 4. Full Backup

Full backup = salinan lengkap data.

Kelebihan:
- restore relatif sederhana

Kekurangan:
- ukuran besar
- waktu backup lebih lama
- biaya storage lebih tinggi

Sering dipakai sebagai fondasi,
lalu dikombinasikan dengan strategi lain.

---

## 5. Incremental Backup

Incremental backup menyimpan perubahan
sejak backup terakhir.

Kelebihan:
- lebih hemat storage
- lebih cepat per backup

Kekurangan:
- restore bisa lebih kompleks
- butuh rantai backup yang sehat

---

## 6. Differential Backup

Differential backup menyimpan perubahan
sejak full backup terakhir.

Trade-off:
- ukuran biasanya lebih besar daripada incremental
- restore lebih sederhana dibanding incremental penuh

Pilihan strategi tergantung platform dan kebutuhan.

---

## 7. Snapshot

Snapshot sering dipakai
untuk point-in-time capture.

Cepat dan praktis,
tapi kamu harus paham:
- snapshot bukan selalu pengganti strategi backup lengkap,
- ketergantungan pada storage/platform harus dinilai.

---

## 8. Point-in-Time Recovery

Ideal untuk kasus:
- ada kesalahan pada jam tertentu,
- kamu ingin kembali ke momen sebelum insiden.

Ini sangat berharga untuk:
- human error
- migration rusak
- delete/update massal

Tapi point-in-time recovery
butuh logging/journal yang sehat.

---

## 9. Restore Drill

Restore drill = latihan memulihkan data secara nyata.

Tujuan:
- memastikan prosedur benar
- mengukur waktu restore
- menguji integritas backup
- memastikan tim tidak panik saat insiden beneran

Tanpa restore drill,
tim hanya berharap backup bekerja.

---

## 10. Kenapa Restore Drill Sering Diabaikan?

Alasan buruk yang sering muncul:
- "belum sempat"
- "sudah ada managed service"
- "harusnya aman"
- "nanti kalau ada waktu"

Objektifnya:
- itu alasan malas,
- bukan strategi reliability.

---

## 11. Apa yang Harus Diuji Saat Restore?

Minimal:
- restore berhasil secara teknis
- data konsisten
- aplikasi bisa terhubung
- query penting jalan
- role/permission relevan ada
- waktu restore tercatat

Kalau hanya tes "file backup ada",
itu bukan drill.

---

## 12. Validasi Integritas Setelah Restore

Jangan berhenti di "database hidup".

Cek:
- jumlah tabel/row kunci
- constraint penting
- indeks utama
- sample query bisnis
- aplikasi kritikal bisa membaca data

Restore yang hidup tapi datanya setengah rusak
tetap kegagalan.

---

## 13. Backup Retention

Backup juga perlu retention policy.

Pertanyaan:
- disimpan berapa lama?
- berapa versi restore point yang tersedia?
- backup lama dihapus kapan?

Retention harus sinkron dengan:
- compliance
- biaya
- RPO/RTO

---

## 14. Lokasi Backup

Pertimbangkan:
- same region
- cross-region
- offsite

Kalau backup hanya satu lokasi yang sama
dengan resource utama,
risiko correlated failure tetap tinggi.

---

## 15. Security Backup

Backup berisi data sensitif.

Maka wajib pikirkan:
- encryption at rest
- encryption in transit
- access control
- audit access

Kalau backup bocor,
kerusakannya bisa sama parahnya dengan DB utama bocor.

---

## 16. Studi Kasus Migration Gagal

Kasus:
- migration update massal salah `WHERE`
- jutaan row berubah keliru

Tanpa point-in-time recovery:
- recovery bisa manual dan menyakitkan

Dengan backup + restore plan:
- tim bisa restore ke titik sebelum migration
  atau melakukan data recovery terkontrol

Ini alasan backup bukan formalitas.

---

## 17. Backup untuk Managed Service

Banyak orang terlalu percaya managed DB.

Managed service membantu,
tapi bukan berarti:
- restore otomatis sesuai kebutuhanmu,
- retention cocok dengan kebijakanmu,
- drill jadi tidak perlu.

Pahami capability platform,
jangan berasumsi.

---

## 18. Metrics yang Harus Dicatat

Saat drill:
- kapan backup diambil
- kapan restore mulai
- kapan restore usable
- berapa data point hilang
- masalah yang muncul

Ini penting untuk mengevaluasi RPO/RTO nyata,
bukan angka khayalan di slide.

---

## 19. Anti-Pattern Umum

1. Punya backup tapi tidak pernah diuji.
2. Tidak tahu RPO/RTO.
3. Backup tidak dienkripsi.
4. Restore hanya pernah dicoba pada data mini yang tidak realistis.
5. Tidak ada dokumentasi langkah restore.

---

## 20. Best Practices

- tetapkan RPO/RTO jelas.
- lakukan restore drill berkala.
- simpan backup aman dan terkontrol.
- validasi restore sampai level aplikasi/kueri bisnis.
- dokumentasikan hasil drill dan gap yang ditemukan.

---

## 21. Mini Latihan

Latihan:
1. Jelaskan beda RPO dan RTO.
2. Tentukan jenis backup yang cocok untuk sistem transaksi harian.
3. Buat checklist restore drill.
4. Jelaskan kenapa managed service bukan alasan mengabaikan restore drill.
5. Buat strategi sederhana backup + retention + offsite.

---

## 22. Jawaban Contoh Ringkas

Checklist restore drill:
1. siapkan target environment
2. restore backup
3. validasi data utama
4. jalankan query bisnis penting
5. catat durasi dan gap

---

## 23. Checklist Kelulusan Topik 23

Kamu dianggap lulus jika bisa:
- menjelaskan backup vs restore,
- memahami RPO/RTO,
- memilih strategi backup yang masuk akal,
- menilai pentingnya restore drill,
- merancang verifikasi pasca-restore yang nyata.

---

## 24. Ringkasan Brutal

- Backup tanpa restore drill itu kosmetik.
- Saat insiden datang,
  hanya backup yang bisa dipulihkan yang bernilai.
