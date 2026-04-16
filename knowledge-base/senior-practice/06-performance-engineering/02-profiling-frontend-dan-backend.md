# Profiling Frontend dan Backend

## Tujuan

Topik ini penting karena profiling adalah jembatan antara gejala performa dan akar masalah.
Tanpa profiling, tim sering optimasi berdasarkan dugaan.

## Kenapa Topik Ini Penting

Masalah performa bisa muncul di:

- frontend render/hydration;
- backend CPU/query/dependency;
- network;
- serialization;
- lock/queue.

Profiling membantu menemukan lokasi biaya terbesar secara konkret.

## Model Mental yang Benar

Pegang ini:

1. Profiling adalah observasi runtime, bukan tebakan.
2. Cari hotspot terbesar dulu.
3. Fokus pada end-to-end path sebelum micro-tuning.
4. Profiling harus dilakukan di skenario realistis.
5. Profiling tanpa baseline bisa menyesatkan.

## Profiling Frontend

Tujuan profiling frontend:

- menemukan komponen rerender mahal;
- menemukan hydration bottleneck;
- menemukan script parse/execute cost;
- menemukan layout/paint issue.

## Frontend Signals Umum

- long task di main thread;
- frame drop;
- interaction delay;
- rerender berlebihan;
- bundle parse/execution tinggi.

## React Profiling

Untuk React/Next.js, perhatikan:

- komponen mana sering rerender;
- durasi render per commit;
- prop/state flow yang memicu rerender;
- apakah memoization atau state locality bisa membantu.

Jangan langsung menambah `memo` ke semua komponen.

## Browser Performance Tools

Gunakan profiling browser untuk melihat:

- scripting time;
- rendering time;
- painting time;
- network waterfall;
- blocking resource.

Ini membantu memisahkan:

- masalah JavaScript;
- masalah CSS/layout;
- masalah network.

## Frontend Bundle Profiling

Pertanyaan penting:

- dependency mana paling berat?
- code split efektif atau tidak?
- initial route memuat terlalu banyak JS atau tidak?

Bundle analyzer sering memberi wins cepat yang sangat nyata.

## Profiling Backend

Tujuan profiling backend:

- menemukan hotspot CPU;
- melihat latency breakdown per dependency;
- melihat query cost;
- melihat lock/queue wait;
- melihat memory pressure.

## Backend Signals Umum

- CPU tinggi;
- event loop lag;
- query lambat;
- dependency timeout;
- GC pause;
- pool wait time.

## CPU Profiling

CPU profiling membantu menemukan function/hot path paling mahal.
Gunakan saat:

- throughput turun dengan CPU tinggi;
- latency naik tanpa dependency masalah jelas;
- ada kecurigaan transform/serialization berat.

## Allocation/Memory Profiling

Penting saat:

- memory terus naik;
- GC sering;
- latency spike periodik;
- OOM risk.

Memory issue sering terlihat sebagai performa issue sebelum jadi crash.

## Tracing untuk End-to-End Breakdown

Tracing sangat membantu untuk:

- waktu total request;
- waktu per dependency;
- waktu di app processing;
- retry yang terjadi;
- queue delay.

Tanpa trace breakdown, bottleneck lintas service sulit dibuktikan.

## DB Query Profiling

Profiling backend hampir selalu butuh query insight:

- query paling mahal;
- query paling sering;
- scan/sort/join mahal;
- N+1 pattern.

Optimasi backend tanpa query insight sering tidak efektif.

## Sampling Strategy

Profiling terus-menerus full detail di produksi bisa mahal.
Gunakan sampling yang masuk akal:

- fokus endpoint kritis;
- fokus periode incident;
- fokus percentile buruk.

## Reproduce Before Fix

Pola sehat:

1. reproduksi gejala;
2. profiling;
3. identifikasi hotspot;
4. ubah terarah;
5. profil ulang.

Kalau langkah profiling di-skip, Anda berisiko "memperbaiki" bagian yang salah.

## Common Profiling Pitfalls

### 1. Profiling di Kondisi Tidak Realistis

Data kecil, traffic kecil, hasil tidak representatif.

### 2. Menginterpretasi Satu Snapshot Saja

Butuh pola, bukan titik tunggal.

### 3. Mengabaikan Dependency Time

Tim fokus ke code app padahal waktu habis menunggu luar.

### 4. Over-optimizing Tiny Functions

Hotspot utama tetap tidak tersentuh.

## Heuristik Senior

1. Profiling dulu, optimasi kemudian.
2. Mulai dari path user paling penting.
3. Cari top 1-2 bottleneck terbesar, bukan 20 micro issue.
4. Pisahkan masalah frontend render dari network/dependency.
5. Di backend, lihat CPU + dependency + query secara bersamaan.
6. Validasi hasil dengan profil ulang.
7. Dokumentasikan temuan agar tim tidak mengulang asumsi lama.

## Pertanyaan Interview

### Dasar

- Apa itu profiling?
- Kenapa profiling penting sebelum optimasi?
- Apa beda profiling frontend dan backend?
- Kenapa hot path lebih penting dari micro optimization?

### Menengah

- Bagaimana mendeteksi rerender mahal di frontend?
- Kapan backend perlu CPU profiling?
- Bagaimana tracing membantu diagnosis performa?
- Kenapa query profiling penting untuk API latency?

### Senior

- Bagaimana Anda menyusun workflow profiling saat incident performa produksi?
- Bagaimana Anda membedakan bottleneck app code vs dependency?
- Bagaimana Anda menyeimbangkan observability detail dengan overhead profiling di production?
- Bagaimana Anda memastikan hasil optimasi benar-benar berdampak ke user-facing metrics?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- UI terasa berat meski network cepat;
- API latency tinggi tapi CPU app normal;
- p99 memburuk hanya di endpoint tertentu;
- memory naik dan response time ikut naik.

## Ringkasan Brutal

- Profiling adalah fakta, asumsi adalah noise.
- Frontend dan backend butuh pendekatan profiling berbeda tetapi saling melengkapi.
- Cari hotspot terbesar dulu.
- Optimasi tanpa profiling biasanya hanya menambah kompleksitas.
- Engineer senior selalu bisa menunjukkan bukti, bukan sekadar pendapat.

## Checklist Pemahaman

- Saya tahu kapan butuh profiling frontend vs backend.
- Saya paham tracing dan query profiling untuk breakdown latency.
- Saya tidak optimasi sebelum tahu hotspot.
- Saya tahu pentingnya profiling ulang setelah perubahan.
- Saya paham profiling harus realistis dan repeatable.

## Penutup

Profiling bukan langkah mewah.
Ia langkah dasar jika Anda serius ingin meningkatkan performa tanpa menebak.
