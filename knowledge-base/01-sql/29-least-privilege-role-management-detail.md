# SQL Least Privilege dan Role Management - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- least privilege
- role management
- separation of duties
- service account
- akses database yang aman

Kalau semua aplikasi dan engineer punya akses terlalu luas,
bukan pertanyaan "apakah akan ada kerusakan",
tapi "kapan".

---

## 1. Apa Itu Least Privilege?

Least privilege berarti:
- setiap user/service hanya mendapat akses minimum
  yang dibutuhkan untuk tugasnya.

Bukan:
- akses penuh karena praktis
- akses admin untuk semua
- satu akun dipakai ramai-ramai

Least privilege adalah kontrol dasar keamanan.

---

## 2. Kenapa Ini Penting?

Karena insiden bisa datang dari:
- bug aplikasi
- credential bocor
- human error
- insider misuse
- automation yang salah

Jika hak akses terlalu luas,
dampak insiden jadi jauh lebih besar.

---

## 3. Prinsip Role-Based Access

Alih-alih memberi izin per user acak,
lebih sehat membuat role dengan fungsi jelas.

Contoh:
- app_read
- app_write
- reporting_read
- migration_admin
- dba_ops

Lalu user/service diikat ke role yang sesuai.

---

## 4. Separation of Duties

Tidak semua orang/komponen
harus bisa melakukan semuanya.

Contoh pemisahan:
- aplikasi normal tidak boleh alter schema
- job reporting tidak boleh write
- migration tool tidak dipakai untuk traffic aplikasi harian

Ini mengurangi blast radius saat sesuatu salah.

---

## 5. Service Account yang Tepat

Setiap aplikasi idealnya punya account sendiri
dengan hak minimum yang sesuai.

Jangan:
- semua service pakai satu akun superuser

Karena:
- sulit audit
- blast radius besar
- revocation sulit

Satu service, satu identity yang jelas.

---

## 6. Read-Only vs Read-Write

Perbedaan ini penting.

Banyak workload hanya butuh:
- read-only

Contoh:
- reporting
- BI dashboard
- analytics ringan

Kalau tetap diberi write permission,
itu kelebihan privilege tanpa alasan.

---

## 7. Migration Role

Schema change sebaiknya dijalankan
dengan role terpisah,
bukan dari credential aplikasi normal.

Kenapa:
- mengurangi risiko abuse
- memisahkan audit trail
- mencegah aplikasi harian melakukan perubahan schema diam-diam

Ini praktik yang jauh lebih sehat.

---

## 8. Superuser Harus Sangat Terbatas

Superuser/admin access harus:
- sangat sedikit
- sangat terkontrol
- teraudit
- sebisa mungkin tidak dipakai untuk kerja rutin

Kalau semua engineer bisa superuser ke production,
itu bukan kecepatan.
Itu kelalaian kolektif.

---

## 9. Credential Sharing Itu Buruk

Satu akun dipakai ramai-ramai = mimpi buruk audit.

Masalah:
- tidak tahu siapa melakukan apa
- rotasi credential sulit
- revocation sulit
- accountability kabur

Selalu utamakan identity yang bisa ditelusuri.

---

## 10. Least Privilege untuk Query Path

Pertanyaan penting:
- apakah service ini benar-benar perlu delete?
- apakah perlu update semua tabel?
- apakah perlu akses ke data PII?

Kalau tidak,
jangan berikan.

Prinsip ini sederhana,
tapi sangat sering dilanggar karena malas setup.

---

## 11. Privilege Escalation Risk

Jika akun read-only tiba-tiba bisa write,
atau app account bisa alter schema,
risk naik drastis.

Pastikan role:
- jelas
- sempit
- ditinjau berkala

Privilege creep adalah masalah nyata.

---

## 12. Audit dan Traceability

Akses DB harus bisa diaudit:
- siapa
- kapan
- dari mana
- melakukan apa

Tanpa audit,
insiden forensik jadi kabur.

Least privilege tanpa visibility
tetap belum cukup.

---

## 13. Rotasi Credential

Akses aman bukan hanya tentang scope,
tapi juga lifecycle credential.

Pikirkan:
- rotasi berkala
- revocation cepat
- secret management
- hindari hardcode

Kalau credential bocor dan sulit diputar,
masalahmu besar.

---

## 14. Role Design yang Buruk

Contoh buruk:
- satu role `all_access`
- semua service memakainya

Masalah:
- blast radius maksimum
- audit buruk
- tidak ada separation of duties

Desain role yang baik memang lebih repot di awal,
tapi jauh lebih sehat jangka panjang.

---

## 15. PII dan Sensitive Tables

Tabel sensitif harus lebih ketat:
- patient info
- payment
- auth/session
- audit trail

Tidak semua service berhak melihat semuanya.

Filter privilege berdasarkan domain data,
bukan kenyamanan developer.

---

## 16. Read Replica dan Role

Kalau ada read replica,
gunakan itu untuk:
- read-only workloads

Tapi tetap:
- role read replica harus read-only juga
- jangan biarkan app yang tidak perlu
  punya akses ke primary write

---

## 17. Temporary Access / Break Glass

Kadang akses tinggi dibutuhkan saat darurat.

Itu boleh,
tapi:
- harus sementara
- harus tercatat
- harus disetujui
- harus dicabut setelah selesai

"Break glass" bukan izin permanen terselubung.

---

## 18. Studi Kasus

Kasus:
- service reporting hanya perlu query statistik
- tapi memakai credential aplikasi utama yang bisa write appointment

Suatu bug di job reporting:
- menjalankan update salah
- data produksi berubah

Masalah utamanya bukan hanya bug.
Masalah utamanya privilege terlalu lebar.

---

## 19. Review Privilege Berkala

Least privilege bukan set-and-forget.

Harus direview:
- service baru
- fitur baru
- role lama tidak terpakai
- akses engineer berubah

Tanpa review,
privilege creep diam-diam menumpuk.

---

## 20. Anti-Pattern Umum

1. Semua service pakai akun yang sama.
2. Aplikasi biasa punya hak alter schema.
3. Reporting role bisa write.
4. Tidak ada audit dan rotasi credential.
5. Superuser dipakai untuk kerja harian.

---

## 21. Best Practices

- desain role berdasarkan fungsi kerja.
- bedakan read-only, read-write, dan admin/migration.
- minimalkan akses ke tabel sensitif.
- audit dan rotasi credential.
- review privilege secara berkala.

---

## 22. Mini Latihan

Latihan:
1. Buat daftar role untuk sistem healthcare sederhana.
2. Tentukan role mana yang hanya read-only.
3. Jelaskan kenapa migration role harus dipisah.
4. Jelaskan risiko credential sharing.
5. Buat checklist review privilege triwulanan.

---

## 23. Jawaban Contoh Ringkas

Role contoh:
- `app_rw`
- `reporting_ro`
- `migration_admin`
- `ops_read`

`reporting_ro`:
- hanya read
- tidak boleh update/delete

Migration dipisah:
- supaya aplikasi normal tidak bisa ubah schema,
- audit dan kontrol lebih jelas.

---

## 24. Checklist Kelulusan Topik 29

Kamu dianggap lulus jika bisa:
- menjelaskan least privilege dengan benar,
- merancang role terpisah untuk fungsi berbeda,
- membatasi akses sensitif secara sadar,
- memahami pentingnya audit dan rotasi,
- menghindari shared superuser anti-pattern.

---

## 25. Ringkasan Brutal

- Hak akses berlebihan itu utang risiko.
- Cepat saat setup, mahal saat insiden.
