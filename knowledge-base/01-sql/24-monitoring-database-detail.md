# SQL Monitoring Database - Penjelasan Detail

## Tujuan Topik

Topik ini membahas:
- apa yang harus dimonitor di database
- latency
- slow query
- connections
- cache hit
- disk, CPU, I/O
- alerting yang berguna

Kalau kamu tidak memonitor database dengan benar,
kamu akan selalu telat tahu masalah.

---

## 1. Kenapa Monitoring Wajib?

Database sering jadi jantung sistem.

Saat database bermasalah:
- API melambat
- queue tertahan
- dashboard rusak
- write gagal

Monitoring yang baik memberi:
- deteksi dini
- diagnosis cepat
- baseline performa
- data untuk keputusan kapasitas

---

## 2. Monitoring Bukan Sekadar "DB Up"

Health check sederhana tidak cukup.

Database bisa:
- hidup,
- tapi lambat,
- penuh,
- lag,
- lock contention tinggi,
- slow query menumpuk.

Jadi monitoring harus lebih dalam.

---

## 3. Metrik Inti yang Harus Dipantau

Minimal:
- query latency
- slow queries
- active connections
- CPU
- memory
- disk usage
- I/O
- lock wait
- replication lag (jika ada)

Kalau ini saja belum rapi,
jangan dulu merasa observability kamu matang.

---

## 4. Query Latency

Pantau:
- p50
- p95
- p99

Kenapa bukan average saja?
- average sering menipu.

User merasakan tail latency,
bukan angka rata-rata manis.

---

## 5. Slow Query Monitoring

Slow query log adalah sumber emas.

Pantau:
- query paling lambat
- query paling sering
- query paling mahal total cost-nya

Jangan hanya fokus pada query paling ekstrem,
tapi juga yang paling sering menggerogoti resource.

---

## 6. Connections

Connection count penting karena:
- connection habis = aplikasi tidak bisa kerja
- connection spike bisa jadi gejala kebocoran pool atau traffic abnormal

Pantau:
- active connections
- idle connections
- max connections usage

Kalau connection pool jelek,
DB bisa tumbang walau query-nya tidak terlalu berat.

---

## 7. CPU, Memory, dan I/O

CPU tinggi:
- bisa karena query berat, sorting, aggregation, contention overhead

Memory issue:
- cache hit turun
- sorts spill
- pressure naik

I/O tinggi:
- scan besar
- checkpoint/flush berat
- storage bottleneck

Semua ini harus dibaca dalam konteks,
bukan angka mentah saja.

---

## 8. Disk Usage

Pantau:
- total disk usage
- growth rate
- free space

Disk penuh = insiden serius.

Lebih buruk lagi kalau:
- tim baru tahu saat write gagal.

Itu berarti monitoring gagal.

---

## 9. Cache Hit Ratio

Cache hit ratio memberi sinyal
apakah workload banyak terselesaikan dari memory
atau terlalu sering ke disk.

Angka ini tidak berdiri sendiri,
tapi berguna sebagai indikator.

Kalau cache hit turun drastis,
cari tahu:
- query pattern berubah?
- memory pressure naik?
- dataset bertumbuh?

---

## 10. Lock Wait dan Blocking

Pantau:
- lock wait time
- blocked sessions
- deadlock count

Ini penting untuk sistem write-heavy.

Sering kali latency API naik
bukan karena query plan jelek,
tapi karena transaksi saling tunggu.

---

## 11. Replication Lag

Kalau pakai replica,
lag wajib dipantau.

Kenapa:
- stale read
- failover risk
- reporting tidak akurat

Lag kecil kadang normal,
tapi lag besar tanpa alert
adalah bom waktu.

---

## 12. Error Rate

Pantau juga:
- failed queries
- deadlock errors
- timeout
- connection failure
- replication/replay error

Monitoring performa tanpa error monitoring
itu setengah buta.

---

## 13. Workload Breakdown

Pisahkan observasi menurut:
- read vs write
- OLTP vs reporting
- API endpoint penting
- batch job

Kalau semua dicampur,
kamu sulit tahu siapa penyebab utama beban.

---

## 14. Baseline

Kamu perlu baseline:
- normal p95 berapa
- normal CPU berapa
- normal connection usage berapa
- normal lag berapa

Tanpa baseline,
angka monitoring sulit ditafsirkan.

---

## 15. Alerting yang Berguna

Alert bagus:
- actionable
- tidak spam
- punya threshold masuk akal
- mengarah ke diagnosis

Alert buruk:
- terlalu sensitif
- terlalu umum
- bunyi terus tapi tidak jelas penyebabnya

Kalau alerting buruk,
tim akan mati rasa.

---

## 16. Dashboards yang Harus Ada

Minimal:
- overview health DB
- slow query dashboard
- lock/blocking dashboard
- replication dashboard
- storage growth dashboard

Dashboard bukan hiasan.
Dashboard harus membantu keputusan cepat.

---

## 17. Studi Kasus

Kasus:
- p95 API naik dari 250ms jadi 2.1s.

Monitoring menunjukkan:
- CPU sedang
- slow query tidak melonjak besar
- lock wait naik tajam

Kesimpulan:
- bottleneck utama bukan query scan,
  tapi contention transaksi.

Inilah nilai monitoring yang benar:
- menghindari diagnosis palsu.

---

## 18. Capacity Planning Connection

Monitoring bukan cuma untuk insiden.

Juga untuk:
- memprediksi growth
- merencanakan storage
- menyesuaikan instance size
- mengatur retention policy

Tim matang pakai monitoring
untuk keputusan proaktif,
bukan hanya reaktif.

---

## 19. Anti-Pattern Umum

1. Hanya monitor "DB alive".
2. Tidak pantau p95/p99.
3. Tidak punya slow query log yang dipakai.
4. Alert terlalu banyak dan tidak actionable.
5. Dashboard penuh angka tapi tanpa owner.

---

## 20. Best Practices

- tentukan golden signals database.
- pantau latency, error, saturation, dan lag.
- buat alert yang benar-benar bisa ditindaklanjuti.
- review slow query secara rutin.
- gunakan monitoring untuk capacity planning, bukan cuma firefighting.

---

## 21. Mini Latihan

Latihan:
1. Sebutkan 5 metrik wajib database.
2. Jelaskan kenapa average latency tidak cukup.
3. Buat contoh alert untuk replication lag.
4. Jelaskan kenapa lock wait harus dipantau.
5. Rancang dashboard minimum untuk DB production.

---

## 22. Jawaban Contoh Ringkas

5 metrik wajib:
- p95 latency
- slow query count
- active connections
- disk usage
- lock wait / deadlock

Jika ada replica:
- replication lag juga wajib.

---

## 23. Checklist Kelulusan Topik 24

Kamu dianggap lulus jika bisa:
- menentukan metrik inti database,
- membaca gejala utama dari dashboard,
- membedakan alert berguna vs alert sampah,
- memakai monitoring untuk diagnosis dan capacity planning,
- menghubungkan kesehatan DB dengan dampak user-facing.

---

## 24. Ringkasan Brutal

- Database tanpa monitoring yang benar
  sama seperti mengemudi malam tanpa lampu.
- Kamu mungkin masih jalan,
  sampai akhirnya menabrak sesuatu.
