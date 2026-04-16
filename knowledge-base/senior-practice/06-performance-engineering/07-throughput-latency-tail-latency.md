# Throughput, Latency, dan Tail Latency

## Tujuan

Topik ini penting karena banyak diskusi performa berhenti di satu angka rata-rata.
Padahal sistem produksi dinilai dari kombinasi throughput dan distribusi latency, terutama tail latency.

## Kenapa Topik Ini Penting

Sistem bisa:

- throughput tinggi tetapi p99 buruk;
- average latency bagus tetapi user sering menunggu lama;
- atau throughput turun drastis saat tail memburuk.

Tanpa memahami hubungan ini, optimasi bisa salah arah.

## Model Mental yang Benar

Pegang ini:

1. Throughput = seberapa banyak pekerjaan selesai per satuan waktu.
2. Latency = berapa lama satu pekerjaan selesai.
3. Tail latency = latency pada persentil tinggi (p95/p99).
4. Throughput dan latency saling memengaruhi melalui queueing dan saturation.
5. User merasakan tail lebih daripada average.

## Throughput

Throughput bisa diukur sebagai:

- requests/sec;
- jobs/min;
- messages/sec.

Throughput tinggi berguna, tetapi tidak boleh dibeli dengan latency ekstrem atau error tinggi.

## Latency

Latency adalah waktu end-to-end untuk satu operasi.

Biasanya dilihat dalam percentile:

- p50;
- p90;
- p95;
- p99.

## Tail Latency

Tail latency adalah bagian "ekor" distribusi, misalnya p95/p99.
Ini sering menunjukkan pengalaman terburuk user.

Jika tail buruk:

- sebagian user selalu kena lambat;
- timeout lebih sering;
- retry meningkat;
- sistem makin tertekan.

## Little’s Law Intuition

Saat inflight work naik dan service time tidak turun, queueing naik.
Queueing mendorong latency, terutama tail.

Jadi throughput tidak bisa dilihat terpisah dari concurrency dan queue length.

## Saturation Point

Setiap sistem punya titik di mana resource hampir penuh:

- CPU;
- connection pool;
- thread/worker;
- queue consumer capacity;
- dependency limit.

Dekat saturation, latency bisa naik tajam nonlinear.

## Throughput-First Trap

Anti-pattern:

- mengejar RPS maksimal;
- mengabaikan p95/p99;
- menganggap sistem sehat karena average masih oke.

Ini berbahaya untuk flow user nyata.

## Latency Budget

Untuk operasi kompleks, bagi latency budget per tahap:

- request handling;
- DB;
- external dependency;
- serialization.

Kalau satu tahap memakan budget berlebihan, tail latency ikut terdorong.

## Tail Amplification

Tail latency sering diperparah oleh:

- retry;
- fan-out call ke banyak dependency;
- GC pause;
- lock contention;
- queueing delay.

Dalam fan-out, satu slow sub-call bisa menentukan total latency request.

## Fan-Out Risk

Jika endpoint memanggil banyak service paralel:

- median bisa baik;
- tetapi probabilitas satu call lambat meningkat;
- total p99 memburuk.

Semakin banyak dependency paralel, semakin penting timeout/fallback discipline.

## Queueing Delay

Sering latency bukan karena processing lambat.
Tetapi karena menunggu giliran:

- pool wait;
- queue wait;
- lock wait.

Inilah alasan metrik saturation penting.

## Tail Latency dan User Experience

User tidak peduli p50 jika ia berada di p99.
Satu flow lambat bisa merusak persepsi kualitas produk.

Untuk flow kritis:

- checkout;
- submit order;
- login;

tail latency harus dijaga ketat.

## Measurement Pitfalls

### 1. Lihat Average Saja

Menutupi masalah tail.

### 2. Tanpa Traffic Realistis

Tail issue sering tak muncul di low load.

### 3. Tidak Pisahkan Warm-up

Hasil bisa bias.

### 4. Mengabaikan Error Rate

Throughput tinggi dengan banyak error tidak bernilai.

## SLO Perspektif

Banyak tim menetapkan SLO berbasis percentile:

- contoh: 95% request < X ms.

Ini mendorong fokus ke distribusi, bukan average.
Tail latency jadi explicit engineering target.

## Tuning Strategy

Untuk memperbaiki tail:

- kurangi queueing;
- kurangi dependency fan-out;
- perketat timeout dan fallback;
- optimasi hotspot p95 path;
- stabilkan GC/memory pattern;
- batasi concurrency agar tidak melewati saturation.

## Throughput vs Stability

Kadang throughput puncak sedikit lebih rendah tetapi tail jauh lebih baik.
Untuk kebanyakan sistem user-facing, ini trade-off yang sehat.

## Anti-Pattern Umum

### 1. Benchmark Peak RPS Tanpa Latency Distribution

Hasilnya menipu.

### 2. Menambah Concurrency Tanpa Batas

Tail bisa memburuk akibat queueing.

### 3. Mengabaikan Dependency Tail

P99 endpoint sering didorong oleh p99 dependency.

### 4. Menganggap Retry Menyelesaikan Tail

Sering malah memperparah.

## Heuristik Senior

1. Selalu lihat throughput bersama p95/p99 dan error.
2. Cari saturation signal, bukan hanya CPU.
3. Tetapkan latency budget per komponen penting.
4. Waspadai fan-out yang tidak terkontrol.
5. Optimasi untuk kestabilan, bukan angka puncak sesaat.
6. Gunakan load test yang realistis.
7. Jadikan tail latency bagian KPI teknis yang nyata.

## Pertanyaan Interview

### Dasar

- Apa bedanya throughput dan latency?
- Apa itu tail latency?
- Kenapa average latency menipu?
- Kenapa p99 penting?

### Menengah

- Bagaimana saturation memengaruhi tail latency?
- Kenapa fan-out call bisa memperburuk p99?
- Apa hubungan queueing dengan latency?
- Bagaimana Anda menilai trade-off throughput vs latency?

### Senior

- Bagaimana Anda merancang SLO yang menyeimbangkan throughput, latency, dan error?
- Bagaimana Anda menurunkan tail latency pada endpoint dengan banyak dependency?
- Bagaimana Anda menjelaskan ke bisnis mengapa throughput maksimum bukan target utama untuk UX?
- Bagaimana Anda menghindari retry loop yang memperburuk tail saat sistem overload?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- API average cepat tetapi p99 buruk saat jam sibuk;
- checkout sporadis timeout;
- dashboard fan-out ke banyak service sering tersendat;
- throughput naik sebentar lalu sistem collapse.

## Ringkasan Brutal

- Throughput tinggi tidak otomatis berarti sistem cepat untuk user.
- Tail latency menentukan pengalaman terburuk yang sering paling terasa.
- Queueing dan saturation adalah musuh utama tail.
- Engineer senior mengoptimasi distribusi performa, bukan hanya angka rata-rata.

## Checklist Pemahaman

- Saya bisa membedakan throughput, latency, dan tail latency.
- Saya tahu kenapa p95/p99 harus dipantau.
- Saya paham hubungan saturation, queueing, dan tail.
- Saya sadar fan-out dependency menaikkan risiko tail.
- Saya tidak lagi menganggap average latency cukup.

## Penutup

Performa yang matang adalah performa yang stabil di bawah beban nyata, bukan performa yang terlihat bagus pada angka rata-rata saat kondisi ideal.
