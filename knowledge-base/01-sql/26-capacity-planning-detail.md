# SQL Capacity Planning - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa itu capacity planning
- growth forecasting
- bottleneck resource
- storage planning
- connection planning
- kapan harus scale up / scale out / redesign

Kalau tim tidak melakukan capacity planning,
masalah kapasitas tidak hilang.
Masalahnya hanya menunggu muncul di waktu terburuk.

---

## 1. Kenapa Capacity Planning Penting?

Database yang sehat hari ini
belum tentu sehat 6 bulan lagi.

Pertumbuhan bisa datang dari:
- user baru
- fitur baru
- query baru
- retention policy buruk
- reporting makin berat
- event logging makin liar

Capacity planning adalah usaha
agar pertumbuhan tidak berubah jadi insiden.

---

## 2. Capacity Planning Bukan Tebak-Tebakan

Capacity planning yang benar berbasis:
- data historis
- growth trend
- workload pattern
- SLO/latency target
- roadmap produk

Kalau hanya mengandalkan:
- "kayaknya masih cukup"
- "CPU belum merah"

itu bukan planning.
Itu malas berpikir.

---

## 3. Resource yang Harus Dipikirkan

Minimal:
- CPU
- memory
- disk capacity
- disk I/O
- network throughput
- connections
- replication bandwidth
- backup window

Database sering gagal
bukan hanya karena satu resource.

---

## 4. Storage Growth

Pantau pertumbuhan:
- tabel utama
- index
- audit log
- archive
- temporary files
- WAL/binlog/redo log sesuai engine

Pertanyaan penting:
- tabel mana tumbuh paling cepat?
- pertumbuhan linear atau eksponensial?
- retention sudah sehat atau belum?

Kalau tidak tahu growth rate,
kamu tidak sedang capacity planning.

---

## 5. CPU Planning

CPU penting untuk:
- query execution
- join
- sort
- aggregate
- background maintenance

Gejala CPU pressure:
- latency naik
- p95/p99 memburuk
- concurrency turun
- replicas ikut tertinggal

Tapi CPU tinggi bukan selalu musuh.
Yang penting:
- apakah masih memenuhi SLO?
- apakah bottleneck sistemik?

---

## 6. Memory Planning

Memory memengaruhi:
- cache hit
- sort/hash operation
- buffer pool effectiveness
- overall read performance

Jika memory tidak cukup:
- lebih banyak baca disk
- query makin lambat
- pressure naik

Pertumbuhan dataset tanpa penyesuaian memory
sering diam-diam merusak performa.

---

## 7. Disk I/O Planning

Disk I/O penting saat:
- scan besar
- checkpoint/flush berat
- backup
- replication
- rebuild index

Database bisa terlihat "CPU aman"
tapi tetap lambat
karena I/O jadi bottleneck utama.

Karena itu:
- jangan cuma monitor CPU.

---

## 8. Connection Capacity

Sistem bisa gagal
karena connection pool / max connection habis.

Kamu harus tahu:
- berapa max connection DB
- berapa pool size aplikasi
- berapa service yang berbagi DB
- bagaimana beban saat spike traffic

Connection planning sangat penting
pada arsitektur microservices / worker-heavy.

---

## 9. Workload Profiling

Capacity planning harus membedakan:
- OLTP write
- OLTP read
- background jobs
- analytics/reporting
- maintenance

Kalau semua dicampur,
prediksi kapasitas jadi menyesatkan.

Contoh:
- trafik harian aman,
- tapi batch malam menghancurkan I/O.

---

## 10. Peak vs Average

Rata-rata sering bohong.

Kamu harus melihat:
- jam sibuk
- burst event
- flash sale / promo
- end-of-month batch
- morning clinic rush

Planning berdasarkan average
sering membuat sistem runtuh di peak.

---

## 11. SLO-Driven Planning

Kapasitas cukup bukan berarti resource 30% terpakai.

Kapasitas cukup berarti:
- sistem masih memenuhi target latency,
- error rate terkendali,
- recovery headroom ada,
- maintenance masih mungkin dilakukan.

Jadi planning harus dikaitkan dengan SLO,
bukan sekadar utilization mentah.

---

## 12. Growth Forecast

Forecast minimal butuh:
- baseline volume saat ini
- pertumbuhan bulanan
- proyeksi fitur baru
- perubahan retention
- kampanye bisnis besar

Contoh:
- appointment rows tumbuh 12% per bulan
- audit log tumbuh 25% per bulan
- fitur notification event baru menambah 2x log

Tanpa angka seperti ini,
forecast hanya opini.

---

## 13. Headroom

Sistem sehat perlu headroom.

Kenapa?
- spike tidak terduga
- background task
- failover
- query buruk sesaat
- maintenance

Kalau semua resource sudah mepet
bahkan di kondisi normal,
sistem tinggal menunggu insiden.

---

## 14. Scale Up vs Scale Out

### Scale Up

Tambah resource pada node/instance yang sama.

Kelebihan:
- sederhana

Kekurangan:
- ada batas
- biaya bisa melonjak

### Scale Out

Tambah replica / shard / worker / split workload.

Kelebihan:
- lebih fleksibel

Kekurangan:
- arsitektur lebih kompleks

---

## 15. Kapan Harus Redesign?

Tidak semua masalah kapasitas
selesai dengan hardware lebih besar.

Kadang akar masalah:
- query jelek
- index berantakan
- retention buruk
- OLTP dan analytics dicampur
- hot row contention

Kalau hanya scale resource
tanpa mengubah akar bottleneck,
kamu cuma membeli waktu singkat.

---

## 16. Capacity Planning untuk Replica

Jangan hanya hitung primary.

Pikirkan juga:
- replica lag
- read load distribution
- failover target
- backup load

Replica yang selalu tertinggal
bisa berarti kapasitasnya tidak cukup,
bukan hanya query yang buruk.

---

## 17. Capacity Planning dan Retention

Retention policy sangat memengaruhi kapasitas.

Kalau data tidak pernah dipurge/archive:
- storage naik
- index naik
- backup makin lama
- maintenance makin berat

Planning kapasitas tanpa retention strategy
itu setengah buta.

---

## 18. Studi Kasus

Kasus:
- `appointments` tumbuh 10% per bulan
- `audit_logs` tumbuh 30% per bulan
- dashboard klinik makin banyak dipakai

Temuan:
- storage aman 4 bulan lagi
- p95 latency mulai naik karena index membesar
- backup window nyaris melewati slot malam

Tindakan:
1. retention audit log diperjelas
2. partitioning direncanakan
3. reporting dialihkan ke jalur terpisah
4. storage dan replica capacity dinaikkan bertahap

Ini capacity planning yang waras:
- berbasis data,
- tidak menunggu meledak.

---

## 19. Anti-Pattern Umum

1. Tidak punya growth forecast.
2. Planning berdasarkan average saja.
3. Tidak mempertimbangkan peak traffic.
4. Mengira scale up selalu cukup.
5. Tidak memasukkan retention dan backup dalam perencanaan.

---

## 20. Best Practices

- ukur growth rate setiap resource penting.
- hubungkan kapasitas dengan SLO.
- sisakan headroom.
- review forecast tiap kuartal atau saat roadmap berubah.
- dokumentasikan trigger scale / redesign.

---

## 21. Mini Latihan

Latihan:
1. Buat daftar resource yang harus dipantau untuk capacity planning.
2. Jelaskan kenapa peak lebih penting dari average.
3. Buat forecast sederhana storage 6 bulan.
4. Jelaskan kapan scale up cukup dan kapan redesign perlu.
5. Hubungkan retention dengan kapasitas.

---

## 22. Jawaban Contoh Ringkas

Peak lebih penting dari average karena:
- user dan insiden terjadi saat beban tinggi,
- average bisa terlihat aman padahal p95 saat sibuk sudah rusak.

Retention memengaruhi kapasitas karena:
- data lama memperbesar tabel, index, backup, dan biaya maintenance.

---

## 23. Checklist Kelulusan Topik 26

Kamu dianggap lulus jika bisa:
- menjelaskan konsep capacity planning,
- membuat forecast dasar,
- memahami resource bottleneck utama,
- menilai kapan perlu scale up, scale out, atau redesign,
- menghubungkan monitoring, retention, dan growth ke keputusan kapasitas.

---

## 24. Ringkasan Brutal

- Kapasitas tidak runtuh mendadak tanpa tanda.
- Biasanya tandanya ada,
  tapi tim malas melihat atau malas menghitung.
