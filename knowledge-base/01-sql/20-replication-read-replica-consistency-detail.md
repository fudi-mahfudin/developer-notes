# SQL Replication, Read Replica, dan Consistency Trade-off - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- replication
- read replica
- primary vs replica
- lag
- consistency trade-off
- kapan replica membantu dan kapan menipu

Banyak tim menambahkan read replica
dan mengira masalah performa selesai.
Seringnya tidak sesederhana itu.

---

## 1. Kenapa Replication Dipakai?

Alasan umum:
- scale read traffic
- meningkatkan availability
- membantu reporting
- menyediakan failover option
- memisahkan workload

Replication terutama berguna
saat bottleneck utama ada di sisi read.

---

## 2. Primary dan Replica

Umumnya:
- primary menerima write utama
- replica menerima salinan perubahan
- aplikasi bisa membaca dari replica

Tujuannya:
- mengurangi beban read pada primary

Namun:
- data replica bisa tertinggal.

---

## 3. Replication Lag

Lag adalah keterlambatan
antara perubahan di primary
dan ketersediaan perubahan itu di replica.

Ini inti semua trade-off replica.

Kalau lag ada,
berarti replica bisa menyajikan data lama.

---

## 4. Eventual Consistency

Banyak setup replica bekerja dengan eventual consistency:
- write masuk ke primary sekarang
- replica akan mengejar beberapa saat kemudian

Artinya:
- "akhirnya konsisten"
- tapi tidak selalu langsung konsisten

Untuk use case tertentu ini cukup.
Untuk use case lain ini berbahaya.

---

## 5. Read-After-Write Problem

Contoh:
1. user membuat appointment
2. aplikasi langsung membaca daftar appointment dari replica
3. appointment baru belum muncul karena lag

User melihat sistem seolah gagal.

Ini bukan bug UI.
Ini desain consistency yang tidak dipikirkan matang.

---

## 6. Kapan Read Replica Cocok?

Cocok untuk:
- dashboard yang toleran delay pendek
- reporting
- analytics ringan
- halaman baca yang tidak butuh freshest data

Kurang cocok untuk:
- konfirmasi hasil write langsung
- workflow kritikal setelah transaksi baru
- validasi state terbaru yang menentukan keputusan bisnis

---

## 7. Kapan Harus Baca dari Primary?

Baca dari primary saat:
- baru saja ada write penting
- perlu read-after-write consistency
- sedang verifikasi state transaksi kritikal
- data harus sangat fresh

Contoh:
- setelah booking,
  halaman confirmation sebaiknya pakai primary
  atau strategi consistency lain yang aman.

---

## 8. Replica untuk Reporting

Ini use case umum yang sehat.

Kenapa:
- laporan biasanya berat
- tidak harus millisecond-fresh
- memindahkan read berat dari primary

Tetap perlu hati-hati:
- query reporting jangan merusak replica juga
- replica bukan tempat membuang semua query jelek.

---

## 9. Lag dan User Experience

Lag kecil pun bisa terasa buruk
jika muncul di alur penting.

Contoh:
- user update profil
- refresh halaman
- data lama masih tampil

User tidak peduli istilah "eventual consistency".
User hanya tahu sistem terasa rusak.

---

## 10. Routing Read dengan Benar

Tim matang biasanya punya strategi:
- query tertentu ke primary
- query tertentu ke replica
- kondisi tertentu fallback ke primary

Jangan serahkan ini ke kebetulan.

Harus ada aturan yang jelas.

---

## 11. Stale Read Risk

Stale read = membaca data lama.

Risiko:
- user salah paham
- keputusan bisnis salah
- proses berikutnya memakai state kedaluwarsa

Contoh berbahaya:
- validasi sisa slot berbasis replica
- bisa menyebabkan overbooking

Itu desain buruk.

---

## 12. Failover dan Replica

Replica kadang dipakai untuk failover.

Tapi failover bukan sekadar "switch host".

Pertanyaan penting:
- apakah replica benar-benar up to date?
- bagaimana aplikasi reconnect?
- apa dampak transaksi in-flight?

Jangan merasa aman hanya karena punya replica.

---

## 13. Replication Tidak Menyembuhkan Query Jelek

Read replica membantu distribusi beban.

Tapi:
- query jelek tetap jelek,
- cuma pindah tempat rusaknya.

Kalau query reporting scan miliaran row tanpa index,
replica juga bisa tumbang.

---

## 14. Monitoring Replica

Yang perlu dipantau:
- replication lag
- query load di replica
- error/replay issue
- disk dan I/O
- failover health

Kalau tidak dimonitor,
replica bisa diam-diam out of date
dan tim baru sadar saat insiden.

---

## 15. Consistency Trade-off

Semakin banyak kamu memanfaatkan replica untuk skala read,
semakin kamu harus menerima
bahwa beberapa pembacaan tidak segar.

Pilihan desain selalu trade-off:
- freshness
- throughput
- complexity

Tidak ada jawaban mutlak untuk semua sistem.

---

## 16. Strategi Umum Mengurangi Masalah

Pilihan yang sering dipakai:
- sticky read ke primary setelah write
- route critical read ke primary
- gunakan cache invalidation yang benar
- tampilkan status "processing" bila perlu
- desain UX yang tidak mengandalkan immediate global consistency

---

## 17. Studi Kasus Healthcare

Kasus:
- pasien booking appointment,
- dashboard admin melihat daftar baru,
- sistem memakai replica untuk read.

Jika lag 3-5 detik:
- admin bisa mengira booking belum masuk.

Di workflow sensitif,
read harus diarahkan dengan sadar.

Misalnya:
- confirmation user dari primary
- dashboard historis dari replica

---

## 18. Multi-Replica Complexity

Semakin banyak replica:
- load balancing makin fleksibel,
- kompleksitas observability ikut naik.

Pertanyaan:
- replica mana yang dipakai?
- bagaimana distribusi query?
- replica mana yang paling lag?

Kalau routing buta,
hasil bisa tidak konsisten antar request.

---

## 19. Reporting dan OLTP Separation

Jika reporting makin berat,
kadang read replica biasa tidak cukup.

Mungkin perlu:
- analytical replica
- warehouse
- ETL/ELT pipeline

Jangan paksa semua use case analytics
ke replica OLTP jika sudah jelas tidak cocok.

---

## 20. Anti-Pattern Umum

1. Semua read dipindah ke replica tanpa klasifikasi.
2. Validasi bisnis kritikal membaca dari replica.
3. Tidak monitor replication lag.
4. Menggunakan replica untuk query jelek tanpa optimasi.
5. Tidak punya strategi read-after-write consistency.

---

## 21. Best Practices

- klasifikasikan query menurut kebutuhan freshness.
- route critical read ke primary.
- monitor lag terus-menerus.
- pisahkan reporting berat dari transactional path.
- jelaskan trade-off ini ke tim product/backend.

---

## 22. Mini Latihan

Latihan:
1. Jelaskan read-after-write problem.
2. Tentukan use case yang aman untuk replica.
3. Tentukan use case yang harus tetap ke primary.
4. Buat strategi sederhana routing read.
5. Jelaskan kenapa replica bukan solusi untuk query buruk.

---

## 23. Jawaban Contoh Ringkas

Use case aman untuk replica:
- dashboard statistik,
- laporan mingguan,
- histori non-kritis.

Use case ke primary:
- confirmation setelah write,
- booking validation,
- balance/slot check yang sensitif.

---

## 24. Checklist Kelulusan Topik 20

Kamu dianggap lulus jika bisa:
- menjelaskan primary, replica, dan lag,
- memahami eventual consistency,
- memilih read path sesuai kebutuhan freshness,
- mencegah stale read pada flow kritikal,
- menilai kapan replica cukup dan kapan butuh arsitektur lain.

---

## 25. Ringkasan Brutal

- Read replica itu alat scale, bukan alat sulap.
- Kalau kamu tidak paham consistency trade-off,
  replica cuma memindahkan masalah menjadi lebih licik.
