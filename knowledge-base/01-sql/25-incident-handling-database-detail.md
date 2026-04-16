# SQL Incident Handling Database - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- cara menangani insiden database
- triage
- containment
- recovery
- komunikasi
- postmortem

Banyak tim baru sadar pentingnya topik ini
saat database sudah terbakar.
Terlambat.

---

## 1. Kenapa Incident Handling Penting?

Insiden database berdampak luas:
- API lambat
- transaksi gagal
- data tidak sinkron
- job menumpuk
- user panik

Karena database sering shared dependency,
gangguannya bisa menyebar cepat ke banyak fitur.

---

## 2. Tujuan Saat Insiden

Saat insiden,
tujuanmu bukan terlihat pintar.

Tujuanmu:
1. hentikan kerusakan
2. pulihkan layanan
3. pahami akar masalah
4. cegah terulang

Yang penting:
- stabil dulu,
- analisis detail belakangan.

---

## 3. Fase Incident Handling

Urutan umum:
1. detection
2. triage
3. containment
4. recovery
5. communication
6. postmortem

Kalau urutan ini kacau,
tim mudah panik dan membuat keputusan buruk.

---

## 4. Detection

Insiden bisa terdeteksi dari:
- alert monitoring
- error rate naik
- laporan user
- timeout di aplikasi
- lag replica
- disk hampir penuh

Detection cepat menentukan seberapa besar dampak akhirnya.

---

## 5. Triage

Pertanyaan awal:
- apa gejala utamanya?
- kapan mulai?
- siapa yang terdampak?
- read, write, atau keduanya?
- satu query, satu tabel, atau seluruh DB?

Jangan langsung lompat ke solusi acak.

Diagnosis awal yang rapi
menyelamatkan banyak waktu.

---

## 6. Klasifikasi Insiden Umum

Contoh:
- latency tinggi
- connection exhaustion
- deadlock spike
- lock storm
- storage hampir penuh
- replication lag besar
- migration gagal
- accidental delete/update

Setiap jenis butuh respons awal berbeda.

---

## 7. Containment

Containment = membatasi kerusakan.

Contoh tindakan:
- hentikan job berat
- matikan fitur non-esensial
- rollback deploy baru
- reroute read tertentu
- pause migration
- block query bermasalah

Containment bukan penyelesaian akhir,
tapi sering paling penting di menit awal.

---

## 8. Recovery

Setelah kerusakan dibatasi,
fokus ke pemulihan layanan.

Contoh:
- restart komponen yang sehat
- scale resource jika tepat
- kill blocker query
- failover terkontrol
- restore data
- re-enable traffic bertahap

Recovery harus hati-hati.
Jangan membuat insiden kedua saat mencoba memperbaiki insiden pertama.

---

## 9. Communication

Ini sering diremehkan.

Saat insiden:
- tim internal butuh status jelas
- stakeholder butuh update yang jujur
- user mungkin butuh pemberitahuan

Komunikasi buruk menghasilkan:
- kebingungan
- rumor
- duplikasi kerja
- keputusan kacau

---

## 10. Peran Saat Insiden

Idealnya ada:
- incident commander
- DB/service owner
- communication lead
- scribe/notetaker

Kalau semua orang melakukan semuanya,
insiden cepat jadi chaos.

---

## 11. Incident Commander

Tugas:
- koordinasi
- prioritas
- menjaga fokus
- mencegah banyak solusi liar dikerjakan bersamaan

IC tidak harus paling senior teknis,
tapi harus mampu menjaga struktur respons.

---

## 12. Contoh Insiden: Slow Query Storm

Gejala:
- p95 naik
- CPU tinggi
- connection menumpuk

Langkah:
1. identifikasi slow query dominan
2. cek apakah ada deploy baru
3. kill/pause query pemicu jika perlu
4. throttle/reporting job
5. pulihkan service

Jangan langsung reboot semua
tanpa tahu pemicunya.

---

## 13. Contoh Insiden: Lock Contention

Gejala:
- banyak timeout write
- lock wait tinggi
- deadlock naik

Langkah:
1. identifikasi blocker
2. cek transaction panjang
3. hentikan proses yang menyebabkan hot contention
4. rollback/pause release jika relevan
5. evaluasi transaksi yang memegang lock lama

---

## 14. Contoh Insiden: Disk Hampir Penuh

Gejala:
- free space kritis
- write error mulai muncul

Respon:
1. hentikan proses non-esensial yang menulis besar
2. identifikasi growth source
3. purge/archive yang aman jika sudah prosedural
4. tambah kapasitas jika perlu
5. review retention failure

Ini insiden yang sering "pelan-pelan datang"
dan tim gagal melihat dari monitoring.

---

## 15. Contoh Insiden: Replication Lag

Gejala:
- replica tertinggal jauh
- read stale
- failover readiness turun

Langkah:
1. cek beban replica
2. cek query/report berat
3. cek network/storage issue
4. alihkan critical read ke primary jika aman
5. pulihkan replica health

Lag bukan selalu krisis,
tapi bisa jadi krisis jika dibiarkan.

---

## 16. Restore sebagai Incident Response

Untuk data corruption atau delete massal,
restore bisa menjadi bagian respons.

Tapi restore bukan tombol ajaib.

Pertanyaan:
- full restore atau point-in-time?
- target environment dulu atau langsung produksi?
- bagaimana verifikasi data?

Kalau prosedur tidak jelas,
restore bisa memperparah kekacauan.

---

## 17. Triage Questions yang Harus Dibiasakan

Saat insiden, tanyakan:
1. gejalanya apa?
2. dampaknya ke user apa?
3. blast radius seberapa luas?
4. perubahan terbaru apa?
5. resource mana yang jenuh?
6. containment tercepat apa?

Ini jauh lebih berguna
daripada langsung berdebat teori.

---

## 18. Jangan Terburu-Buru Menyentuh Data

Saat panic mode,
godaan terbesar:
- jalankan query cepat
- hapus sesuatu
- update sesuatu

Tanpa validasi, kamu bisa:
- kehilangan bukti
- memperbesar kerusakan
- membuat recovery makin sulit

Disiplin itu membedakan penyelamat dan perusak.

---

## 19. Postmortem

Setelah pulih,
wajib buat postmortem:
- timeline
- root cause
- contributing factors
- impact
- tindakan perbaikan

Tujuan postmortem:
- belajar sistemik,
- bukan mencari kambing hitam.

---

## 20. CAPA / Preventive Action

Hasil insiden harus berubah jadi tindakan nyata:
- query optimization
- index fix
- migration guardrail
- alert baru
- runbook baru
- training tim

Kalau tidak,
postmortem cuma dokumen pamer luka.

---

## 21. Anti-Pattern Umum

1. Semua orang langsung eksekusi tanpa koordinasi.
2. Tidak ada containment, langsung lompat ke root cause.
3. Komunikasi ke stakeholder telat dan kacau.
4. Tidak simpan timeline insiden.
5. Insiden selesai lalu tidak ada tindak lanjut.

---

## 22. Best Practices

- punya runbook per jenis insiden umum.
- latih triage dan komunikasi.
- batasi perubahan liar saat insiden.
- catat setiap keputusan penting.
- ubah hasil insiden jadi perbaikan sistem.

---

## 23. Mini Latihan

Latihan:
1. Buat langkah triage untuk lock contention.
2. Buat langkah containment untuk disk hampir penuh.
3. Jelaskan kapan failover masuk akal.
4. Jelaskan kenapa komunikasi penting saat insiden DB.
5. Buat struktur postmortem singkat.

---

## 24. Jawaban Contoh Ringkas

Struktur postmortem:
- summary
- timeline
- impact
- root cause
- contributing factors
- action items

Simple, tapi harus tajam dan jujur.

---

## 25. Checklist Kelulusan Topik 25

Kamu dianggap lulus jika bisa:
- menjelaskan fase incident handling,
- melakukan triage dengan tenang,
- membedakan containment dan recovery,
- memahami pentingnya komunikasi dan postmortem,
- merespons insiden database tanpa memperparah keadaan.

---

## 26. Ringkasan Brutal

- Saat insiden, sistem tidak peduli gelar atau ego.
- Yang berguna cuma:
  diagnosis yang benar,
  containment yang cepat,
  dan recovery yang disiplin.
