# Cara Ukur Performa, Bukan Asumsi Performa

## Tujuan

Topik ini penting karena banyak optimasi performa dimulai dari asumsi, bukan data.
Hasilnya sering:

- optimasi salah target;
- effort besar, dampak kecil;
- regresi tersembunyi;
- diskusi penuh opini tanpa bukti.

## Kenapa Topik Ini Penting

Performa adalah properti sistem, bukan perasaan developer di laptop.
Jika tidak diukur dengan benar:

- bottleneck salah diidentifikasi;
- keputusan arsitektur jadi spekulatif;
- tuning tidak repeatable;
- progress sulit dipertanggungjawabkan.

## Model Mental yang Benar

Pegang ini:

1. Anda tidak bisa mengoptimasi yang tidak diukur.
2. Performa punya banyak dimensi: latency, throughput, resource usage, error rate.
3. Fokus pada metrik yang relevan ke user dan bisnis.
4. Baseline sebelum perubahan wajib ada.
5. Benchmark tanpa konteks produksi bisa menipu.

## Dimensi Performa Utama

- Latency (p50, p95, p99)
- Throughput (RPS, jobs/sec)
- Error rate
- Resource usage (CPU, memory, I/O)
- Saturation (pool wait, queue depth, event loop lag)

Satu angka rata-rata tidak cukup.

## Percentile > Average

Rata-rata sering menipu.
User merasakan tail latency.

Contoh:

- p50 bagus;
- p95 buruk;
- p99 sangat buruk.

Sistem tetap terasa lambat untuk banyak user walau average tampak oke.

## Baseline dan Target

Sebelum optimasi:

- ambil baseline metrik;
- tentukan target realistis;
- tentukan skenario uji;
- tentukan batas sukses.

Tanpa baseline, Anda tidak tahu perubahan membantu atau tidak.

## Workload Realistis

Uji performa harus meniru pola nyata:

- data volume realistis;
- concurrency realistis;
- request mix realistis;
- dependency latency realistis.

Uji dengan dataset kecil sering memberi hasil palsu.

## Observability Before Optimization

Pastikan instrumentation cukup:

- tracing per request;
- metrics endpoint/dependency;
- log event penting;
- breakdown waktu per tahap.

Tanpa observability, Anda hanya menebak.

## System vs Micro Benchmark

Micro benchmark bisa berguna untuk hotspot kecil.
Tetapi banyak masalah performa adalah masalah sistem end-to-end.

Optimasi fungsi kecil tidak banyak berarti jika bottleneck ada di:

- query lambat;
- network timeout;
- serialization;
- queue backlog.

## Controlled Experiment

Gunakan pendekatan:

1. hipotesis;
2. perubahan spesifik;
3. ukur sebelum/sesudah;
4. evaluasi dampak;
5. rollback jika tidak membantu.

Ini lebih sehat daripada "coba-coba banyak tweak sekaligus".

## Noise dan Variabilitas

Metrik performa bisa noisy.
Perhatikan:

- warm-up vs steady state;
- GC effect;
- cache effect;
- traffic variance;
- environment variance.

Jangan simpulkan dari satu run.

## Capacity Context

Performa harus dilihat bersama kapasitas.
Pertanyaan:

- metrik ini pada beban berapa?
- headroom-nya berapa?
- kapan mulai saturasi?

Cepat di beban rendah belum tentu aman di beban puncak.

## User-Centric Metrics

Untuk frontend:

- TTFB;
- LCP;
- INP/interaction latency;
- hydration cost.

Untuk backend:

- end-to-end response time;
- dependency latency;
- queue time.

Pilih metrik yang berdampak nyata ke user flow.

## Anti-Pattern Umum

### 1. Optimasi Berdasar Insting

Sering salah target.

### 2. Fokus ke Rata-Rata Saja

Tail issue tersembunyi.

### 3. Benchmark di Laptop Saja

Tidak representatif.

### 4. Banyak Perubahan Sekaligus

Sulit tahu mana yang benar-benar membantu.

## Heuristik Senior

1. Mulai dari metrik user-impact.
2. Ambil baseline sebelum sentuh kode.
3. Isolasi satu hipotesis per eksperimen.
4. Lihat percentile, bukan average saja.
5. Uji pada workload realistis.
6. Validasi hasil di environment yang mendekati produksi.
7. Dokumentasikan hasil agar tim bisa belajar.

## Pertanyaan Interview

### Dasar

- Kenapa performa harus diukur?
- Kenapa average latency tidak cukup?
- Apa bedanya p50 dan p99?
- Kenapa baseline penting?

### Menengah

- Bagaimana menentukan metrik performa yang relevan?
- Apa risiko benchmark dengan data kecil?
- Bagaimana memisahkan noise dari sinyal?
- Kapan micro benchmark berguna?

### Senior

- Bagaimana Anda menyusun proses optimasi berbasis hipotesis untuk endpoint kritis?
- Bagaimana Anda meyakinkan tim agar berhenti optimasi tanpa baseline?
- Bagaimana Anda menghubungkan metrik teknis dengan dampak bisnis?
- Bagaimana Anda menilai apakah peningkatan performa sepadan dengan kompleksitas baru?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- endpoint dianggap lambat tapi tim tidak sepakat bottleneck;
- optimasi besar dilakukan tetapi SLA tidak membaik;
- p50 bagus tetapi user premium complain lambat saat jam sibuk;
- tim menambah cache tanpa mengukur dampak nyata.

## Ringkasan Brutal

- Performa tanpa pengukuran adalah opini.
- Baseline wajib.
- Percentile lebih jujur daripada average.
- Optimasi harus berbasis hipotesis dan eksperimen.
- Engineer senior mengubah diskusi performa dari debat rasa menjadi keputusan berbasis data.

## Checklist Pemahaman

- Saya tahu metrik performa utama.
- Saya paham pentingnya baseline dan target.
- Saya tidak mengandalkan average latency saja.
- Saya tahu workload realistis penting.
- Saya bisa menjalankan optimasi sebagai eksperimen terkontrol.

## Penutup

Mengukur performa dengan benar mungkin terasa lambat di awal.
Tetapi itulah yang mencegah tim menghabiskan waktu berbulan-bulan mempercepat hal yang tidak penting.
