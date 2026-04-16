# Capacity Thinking dan Load Expectation Dasar

## Tujuan

Topik ini penting karena banyak sistem gagal bukan karena bug logika, tetapi karena ekspektasi beban tidak pernah dihitung.
Sistem didesain untuk "normal" yang tidak pernah didefinisikan.

## Kenapa Topik Ini Penting

Tanpa capacity thinking:

- scale terjadi reaktif;
- bottleneck muncul saat traffic naik sedikit;
- incident terasa "mendadak";
- budget infra boros karena overprovisioning panik.

## Model Mental yang Benar

Pegang ini:

1. Capacity planning bukan ramalan sempurna, tetapi estimasi terarah.
2. Beban harus dipikirkan sebagai rentang, bukan satu angka.
3. Peak, burst, dan growth matter.
4. Capacity harus dihitung lintas dependency, bukan app saja.
5. Headroom adalah bagian dari reliability.

## Pertanyaan Capacity Dasar

- berapa request per detik rata-rata?
- berapa puncak harian/mingguan?
- berapa burst sesaat?
- berapa ukuran payload?
- berapa read/write ratio?
- berapa SLA target?
- berapa growth 3-6 bulan?

Tanpa jawaban ini, desain performa hanya spekulasi.

## Workload Profile

Bedakan:

- read-heavy vs write-heavy;
- CPU-heavy vs I/O-heavy;
- sync request vs async job;
- hot key pattern vs uniform access.

Profil workload menentukan strategi scale.

## Headroom

Sistem tidak boleh selalu berjalan di ambang penuh.
Headroom dibutuhkan untuk:

- burst traffic;
- failover;
- deploy overhead;
- incident dependency.

Tanpa headroom, gangguan kecil cepat jadi outage.

## Capacity per Layer

Hitung kapasitas di:

- app instances;
- DB connections;
- cache throughput;
- queue consumers;
- outbound dependency limits;
- network bandwidth.

Sistem hanya sekuat bottleneck terlemah.

## Concurrency Budget

Beban bukan hanya RPS.
Juga:

- concurrent requests;
- in-flight jobs;
- open connections;
- queued tasks.

RPS sama bisa menghasilkan pressure berbeda jika service time berbeda.

## Simple Back-of-Envelope

Perkiraan kasar sering sangat berguna di awal:

- expected RPS;
- average service time;
- concurrent in-flight estimate;
- dependency calls per request;
- total outbound QPS.

Ini bukan angka final, tapi cukup untuk mendeteksi desain yang jelas tidak realistis.

## Peak vs Average

Design berbasis average biasanya gagal saat peak.

Perhatikan:

- jam sibuk harian;
- event kampanye;
- batch job berbarengan;
- traffic from retries.

Peak handling harus eksplisit.

## Burst Handling

Burst traffic bisa singkat tetapi tajam.
Strategi:

- queue buffering;
- rate limiting;
- autoscaling policy;
- load shedding untuk non-critical work.

Jika burst tidak dipikirkan, latency tail bisa meledak.

## Growth Projection

Capacity thinking harus punya horizon:

- 1 bulan;
- 3 bulan;
- 6 bulan.

Tujuannya agar perubahan scale dilakukan sebelum crisis, bukan sesudah.

## Dependency Capacity

Banyak tim hanya menghitung app server.
Padahal dependency sering limit utama:

- DB connection cap;
- third-party rate limit;
- cache throughput;
- queue throughput.

App bisa scale horizontal, dependency mungkin tidak semudah itu.

## Cost Awareness

Capacity planning juga soal biaya.

Trade-off:

- underprovision: incident risk;
- overprovision: waste budget.

Targetnya bukan minimum cost absolut, tetapi cost yang sebanding dengan risk appetite.

## Load Testing

Gunakan load test untuk:

- validasi asumsi;
- cari saturation point;
- cek behavior under peak/burst;
- verifikasi autoscaling.

Load test tanpa model traffic realistis mudah menipu.

## Autoscaling Bukan Sihir

Autoscaling membantu, tapi:

- scaling tidak instan;
- warm-up butuh waktu;
- dependency tidak otomatis ikut scale;
- policy salah bisa oscillation.

Jadi capacity baseline tetap perlu.

## Capacity Alarm

Metrik alarm penting:

- CPU/memory saturation;
- pool wait;
- queue depth;
- p95/p99 latency;
- error rate;
- dependency throttling.

Alarm harus memberi waktu bereaksi sebelum outage.

## Anti-Pattern Umum

### 1. Tidak Punya Angka Peak

Semua perencanaan jadi kabur.

### 2. Capacity Plan Hanya di App Tier

Dependency tier jadi titik gagal.

### 3. Rely Penuh ke Autoscaling

Burst cepat tetap bisa memukul.

### 4. Tidak Review Ulang Setelah Fitur Baru

Workload berubah, plan tetap lama.

## Heuristik Senior

1. Selalu punya baseline load expectation.
2. Hitung peak dan burst, bukan average saja.
3. Petakan kapasitas lintas seluruh dependency chain.
4. Sisakan headroom eksplisit.
5. Uji asumsi dengan load test.
6. Kaitkan kapasitas dengan biaya dan SLA.
7. Review ulang plan saat pola traffic berubah.

## Pertanyaan Interview

### Dasar

- Apa itu capacity thinking?
- Kenapa average traffic tidak cukup?
- Apa itu headroom?
- Kenapa burst perlu dipikirkan?

### Menengah

- Bagaimana membuat estimasi capacity awal untuk service baru?
- Apa risiko fokus kapasitas hanya pada app server?
- Kapan load test harus dilakukan?
- Kenapa autoscaling tidak menggantikan planning?

### Senior

- Bagaimana Anda menghubungkan capacity planning dengan SLA dan budget?
- Bagaimana Anda merancang strategy menghadapi traffic spike musiman?
- Bagaimana Anda menentukan prioritas scale-up antar komponen saat kapasitas terbatas?
- Bagaimana Anda mengkomunikasikan risiko capacity ke stakeholder non-teknis?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- kampanye marketing mendadak menaikkan traffic;
- queue backlog tidak turun selama jam sibuk;
- DB connection pool penuh meski app CPU masih rendah;
- autoscaling terlambat merespons burst.

## Ringkasan Brutal

- Capacity thinking adalah disiplin anti-kejutan.
- Sistem perlu dirancang untuk peak dan burst, bukan average.
- Dependency chain menentukan kapasitas nyata.
- Headroom dan observability kapasitas adalah bagian dari reliability.
- Engineer senior tidak menunggu incident untuk mulai berpikir kapasitas.

## Checklist Pemahaman

- Saya tahu angka load baseline, peak, dan burst.
- Saya paham capacity harus dihitung lintas dependency.
- Saya sadar autoscaling punya delay dan batas.
- Saya bisa menghubungkan capacity dengan SLA dan biaya.
- Saya rutin mengevaluasi ulang asumsi saat sistem berubah.

## Penutup

Capacity thinking yang baik tidak membuat Anda kebal dari semua lonjakan.
Tetapi ia membuat lonjakan menjadi kondisi yang bisa dikelola, bukan bencana yang selalu terasa mendadak.
