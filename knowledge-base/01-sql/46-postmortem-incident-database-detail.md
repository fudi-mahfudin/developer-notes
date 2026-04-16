# SQL Postmortem untuk Incident Database - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu postmortem
- kenapa postmortem penting setelah insiden database
- struktur postmortem yang baik
- bagaimana mengubah insiden jadi pembelajaran sistemik

Kalau insiden selesai
lalu tim langsung move on tanpa postmortem yang jujur,
tim itu sedang memelihara pengulangan kesalahan.

---

## 1. Apa Itu Postmortem?

Postmortem adalah dokumen evaluasi
setelah insiden terjadi,
yang menjelaskan:
- apa yang terjadi
- kapan terjadi
- dampaknya apa
- akar masalahnya apa
- faktor yang memperparah
- tindakan pencegahan ke depan

Tujuannya bukan menyalahkan orang.
Tujuannya memperbaiki sistem.

---

## 2. Kenapa Postmortem Penting untuk Database Incident?

Karena insiden database sering:
- berdampak luas
- sulit dilacak akar masalahnya
- melibatkan banyak lapisan
- berpotensi terulang jika tidak dibedah

Contoh:
- slow query storm
- lock contention
- deadlock spike
- replication lag
- disk penuh
- migration gagal
- accidental delete/update

Kalau insiden seperti ini tidak dibedah,
tim akan mengulang pola yang sama.

---

## 3. Tujuan Postmortem yang Sehat

Tujuan utamanya:
1. membangun pemahaman bersama tentang insiden
2. mencari akar masalah sistemik
3. menghasilkan action item konkret
4. meningkatkan runbook, monitoring, atau desain

Postmortem bukan laporan "siapa salah".
Itu budaya jelek dan tidak produktif.

---

## 4. Blameless, Tapi Bukan Lembek

Blameless bukan berarti:
- semua hal dibungkus halus
- tidak ada kritik
- semua kesalahan dianggap sepele

Blameless yang sehat berarti:
- fokus pada sistem, proses, dan keputusan
- tetap jujur soal kelemahan
- tidak menjadikan satu orang kambing hitam

Postmortem yang terlalu lembek
juga tidak berguna.

---

## 5. Waktu Menulis Postmortem

Jangan terlalu cepat saat informasi masih kacau.
Jangan terlalu lama sampai detail lupa.

Praktik sehat:
- draft awal segera setelah stabil
- finalisasi setelah data dan timeline cukup jelas

Kalau menunggu terlalu lama,
insight penting hilang.

---

## 6. Struktur Dasar Postmortem

Minimal:
- summary
- timeline
- impact
- root cause
- contributing factors
- detection
- response
- action items

Kalau struktur ini ada,
postmortem sudah punya tulang punggung yang cukup kuat.

---

## 7. Summary

Summary harus ringkas dan tajam.

Contoh isi:
- apa insidennya
- kapan terjadi
- sistem mana terdampak
- durasi
- status akhir

Jangan tulis summary yang kabur seperti:
- "terjadi gangguan kecil pada database"

Itu tidak membantu siapa pun.

---

## 8. Timeline

Timeline adalah salah satu bagian terpenting.

Catat:
- waktu deteksi
- waktu eskalasi
- tindakan containment
- keputusan penting
- waktu pemulihan

Timeline yang jelas membantu melihat:
- apakah deteksi terlambat
- apakah respons lambat
- apakah komunikasi kacau

Tanpa timeline,
postmortem terasa seperti opini.

---

## 9. Impact

Impact harus konkret.

Contoh:
- 27% request booking gagal selama 18 menit
- admin dashboard tidak bisa diakses 35 menit
- 1.200 reminder tertunda
- 3 klinik terdampak

Jangan tulis impact samar.

Tim butuh tahu:
- seberapa besar dampaknya
- siapa yang kena
- apa konsekuensi bisnisnya

---

## 10. Root Cause

Root cause adalah penyebab utama
yang kalau diperbaiki
akan mencegah insiden serupa.

Contoh root cause:
- query baru tidak memakai index dan memicu full scan besar
- migration add constraint dijalankan tanpa cleanup data
- transaction panjang menyebabkan lock storm

Root cause tidak boleh berhenti di:
- "database lambat"
- "server sibuk"

Itu gejala, bukan akar masalah.

---

## 11. Contributing Factors

Selain akar utama,
sering ada faktor yang memperburuk:
- alert kurang tajam
- runbook tidak ada
- rollback plan lemah
- ownership kabur
- review SQL kurang disiplin

Contributing factors penting
karena insiden besar jarang disebabkan satu hal saja.

---

## 12. Detection

Tulis:
- bagaimana insiden pertama kali terdeteksi
- apakah dari monitoring, user report, atau kebetulan
- apakah alert bekerja dengan baik

Kalau insiden terdeteksi dari user complaint
padahal seharusnya monitoring bisa lebih dulu,
itu gap yang harus diakui.

---

## 13. Response

Bagian ini menjelaskan:
- apa yang dilakukan tim
- apa yang berhasil
- apa yang tidak
- apakah containment cepat
- apakah recovery aman

Ini berguna untuk mengevaluasi kesiapan operasional,
bukan hanya teknologi.

---

## 14. What Went Well / What Went Poorly

Bagian ini berguna
untuk menjaga postmortem tetap seimbang.

Contoh:

Yang berjalan baik:
- tim cepat identifikasi query blocker
- rollback aplikasi berhasil

Yang berjalan buruk:
- tidak ada alert lock wait
- komunikasi ke ops terlambat 20 menit

Kejujuran bagian ini sangat penting.

---

## 15. Action Items

Tanpa action item,
postmortem hanyalah cerita sedih.

Action item harus:
- konkret
- punya owner
- punya deadline/prioritas

Contoh:
- tambahkan alert deadlock rate
- buat runbook purge emergency
- optimalkan query endpoint X
- ubah migration checklist

---

## 16. Action Item Harus Sistemik

Jangan puas dengan action item dangkal:
- "lebih hati-hati"
- "tim diminta teliti"

Itu bukan tindakan sistemik.

Lebih baik:
- tambah validation gate
- tambahkan test concurrency
- wajibkan plan review untuk query tertentu
- perbaiki privilege / rollback procedure

Orang bisa salah lagi.
Sistem harus dibuat lebih tahan.

---

## 17. Healthcare Example

Contoh incident:
- dashboard appointment harian lambat 10x
- penyebab: query baru memakai `DATE(schedule_at)` di tabel besar
- dampak: staf registrasi terlambat memproses antrean

Postmortem yang baik akan menangkap:
- regression dari deploy
- tidak adanya performance review
- kurangnya alert pada p95 dashboard
- action item untuk query review gate dan index

Itu jauh lebih berguna
daripada hanya menyalahkan engineer deploy.

---

## 18. Data Evidence

Postmortem harus berbasis bukti:
- log
- metric
- query plan
- slow query log
- incident notes

Kalau isinya hanya ingatan orang,
kualitasnya lemah.

Kumpulkan evidence sebelum menyimpulkan.

---

## 19. Anti-Pattern Umum

1. Tidak membuat postmortem sama sekali.
2. Postmortem hanya formalitas satu paragraf.
3. Menyalahkan individu tanpa memperbaiki sistem.
4. Action item kabur dan tanpa owner.
5. Tidak pernah follow-up hasil postmortem.

---

## 20. Best Practices

- buat struktur yang konsisten.
- fokus pada akar masalah dan faktor sistemik.
- sertakan timeline dan impact yang jelas.
- ubah temuan menjadi tindakan konkret.
- review tindak lanjut pada pertemuan berikutnya.

---

## 21. Mini Latihan

Latihan:
1. Buat template postmortem incident database.
2. Bedakan root cause dan contributing factor.
3. Tulis contoh action item yang sistemik.
4. Jelaskan kenapa timeline penting.
5. Jelaskan kenapa "lebih hati-hati" bukan action item yang bagus.

---

## 22. Jawaban Contoh Ringkas

Root cause:
- penyebab utama sistemik.

Contributing factor:
- faktor yang memperburuk tapi bukan akar utama.

Contoh action item bagus:
- wajibkan `EXPLAIN ANALYZE` review untuk query dashboard dengan execution > N rows.

Contoh action item buruk:
- "developer harus lebih teliti."

---

## 23. Checklist Kelulusan Topik 46

Kamu dianggap lulus jika bisa:
- menulis struktur postmortem yang jelas,
- membedakan gejala, root cause, dan contributing factor,
- menyusun action item yang benar-benar memperbaiki sistem,
- melihat insiden sebagai sumber pembelajaran,
- menjaga budaya blameless tanpa kehilangan ketegasan.

---

## 24. Ringkasan Brutal

- Insiden tanpa postmortem adalah biaya mahal yang disia-siakan.
- Tim yang tidak belajar dari incident
  sedang menabung incident berikutnya.
