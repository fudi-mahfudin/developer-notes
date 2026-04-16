# External Dependency Management dan Timeout Budgeting

## Tujuan

Topik ini penting karena banyak backend gagal bukan di logic internal, tetapi di cara mereka bergantung pada sistem lain.
Dependency eksternal adalah sumber risiko terbesar dalam banyak arsitektur modern.

Kalau dependency management lemah:

- latency meledak saat partner melambat;
- timeout tidak sinkron;
- retry memperparah beban;
- thread/pool habis menunggu;
- user-facing SLA runtuh karena satu dependency.

## Kenapa Topik Ini Penting

Hampir semua service modern punya dependency:

- database;
- cache;
- payment gateway;
- auth provider;
- search service;
- notification service;
- API partner.

Setiap dependency punya:

- reliability berbeda;
- latency profile berbeda;
- timeout behavior berbeda;
- limit berbeda;
- failure mode berbeda.

Kalau semua diperlakukan sama, sistem Anda akan rapuh.

## Model Mental yang Benar

Pegang ini:

1. Dependency eksternal adalah bagian dari sistem Anda, walau bukan milik Anda.
2. Setiap call dependency mengonsumsi budget waktu user request.
3. Timeout bukan angka acak, tetapi keputusan arsitektur.
4. Retry tanpa budget dan classification adalah amplifikasi kegagalan.
5. Dependency management yang sehat adalah kombinasi contract, timeout, retry policy, dan observability.

## Dependency Inventory

Langkah awal yang sering diabaikan:

- buat daftar dependency;
- petakan criticality;
- catat SLA/SLO mereka;
- catat auth/rate limit;
- catat timeout dan retry rekomendasi;
- catat fallback yang mungkin.

Tanpa inventory ini, incident response jadi reaktif.

## Critical vs Non-Critical Dependency

Tidak semua dependency setara.

Critical:

- jika gagal, core flow gagal.

Non-critical:

- jika gagal, fitur tambahan masih bisa ditunda/fallback.

Perbedaan ini harus terlihat di:

- timeout;
- retry;
- fallback;
- error handling;
- alert severity.

## Timeout Budgeting

Timeout budgeting berarti membagi total waktu yang bisa diterima user menjadi sub-budget per dependency dan processing internal.

Contoh:

- total SLA endpoint: 1500 ms;
- auth check: 150 ms;
- DB query: 400 ms;
- external API: 500 ms;
- serialization + buffer: sisanya.

Jika satu call diberi timeout 2 detik dalam endpoint SLA 1.5 detik, desainnya sudah salah.

## Layer Timeout

Pertimbangkan timeout di berbagai lapisan:

- DNS/connect timeout;
- TLS handshake timeout;
- request timeout;
- read timeout;
- overall deadline.

Kalau hanya punya satu timeout besar, observability dan kontrol menjadi buruk.

## Deadline Propagation

Pattern lebih matang:

- hitung deadline total di awal request;
- tiap dependency call menerima sisa budget, bukan timeout statis.

Ini mencegah langkah akhir memulai pekerjaan yang sudah pasti tidak sempat selesai.

## Connection Management

Dependency management juga soal koneksi:

- pool size;
- keep-alive;
- idle timeout;
- max concurrency.

Pool tidak dikonfigurasi dengan benar bisa menjadi bottleneck tersendiri.

## Rate Limit Awareness

External dependency sering punya rate limit.
Anda harus sadar:

- limit per key;
- limit per second/minute;
- burst allowance;
- retry-after semantics.

Mengabaikan ini akan membuat integration flapping.

## Retry Policy Per Dependency

Retry tidak boleh global satu aturan untuk semua.

Setiap dependency butuh:

- error classification sendiri;
- max retry sendiri;
- backoff/jitter sendiri;
- idempotency awareness sendiri.

Jika semua call di-retry 3x default, Anda sedang menulis bom waktu.

## Circuit Breaker Mindset

Untuk dependency yang sedang sakit berat:

- kadang lebih baik fail-fast sementara;
- daripada menunggu timeout panjang pada setiap request.

Tujuannya:

- lindungi sistem Anda;
- lindungi dependency;
- pulihkan lebih cepat.

## Fallback Strategy

Untuk dependency non-kritis, fallback bisa sangat berguna:

- cache lama;
- default behavior terbatas;
- deferred processing;
- "partial response" yang jujur.

Tetapi fallback harus tetap benar secara bisnis.
Fallback salah bisa lebih berbahaya daripada error jelas.

## Bulkhead Principle

Pisahkan resource agar kegagalan satu dependency tidak menyedot semuanya.

Contoh:

- pool terpisah;
- queue terpisah;
- worker terpisah;
- timeout policy terpisah.

Kalau semua call dependency berbagi resource yang sama tanpa pembatasan, satu dependency lambat bisa menjatuhkan seluruh service.

## Observability per Dependency

Anda harus bisa melihat per dependency:

- latency p50/p95/p99;
- error rate;
- timeout rate;
- retry rate;
- success-after-retry rate;
- saturation/pool wait;
- volume call.

Tanpa ini, Anda tidak tahu dependency mana yang benar-benar menyakiti sistem.

## Contract Drift

Dependency management bukan hanya latency.
Juga soal contract stability:

- schema response berubah;
- field penting hilang;
- semantics berubah;
- auth flow berubah.

Validasi dan contract testing membantu mencegah drift memecahkan production diam-diam.

## Dependency Isolation in Code

Bungkus dependency call dalam module/adapter khusus.
Jangan sebar raw HTTP call ke seluruh codebase.

Manfaat:

- policy timeout/retry terpusat;
- observability konsisten;
- contract handling terkontrol;
- perubahan provider lebih mudah.

## Health vs Dependency Availability

Service Anda bisa hidup walau dependency non-kritis down.
Jangan samakan:

- service liveness;
- dependency health total.

Readiness/liveness harus mencerminkan critical dependency only secara hati-hati.

## Anti-Pattern Umum

### 1. Timeout Sama untuk Semua Dependency

Biasanya salah.

### 2. Retry Default Global

Mengabaikan semantics operasi.

### 3. Tidak Ada Deadline Budget

Total response time jadi tak terkontrol.

### 4. Tidak Ada Adapter Layer

Policy call dependency tersebar liar.

## Heuristik Senior

1. Inventory dependency dan klasifikasikan criticality.
2. Tetapkan timeout berdasarkan request budget nyata.
3. Terapkan retry selektif dengan backoff/jitter.
4. Siapkan fallback untuk dependency non-kritis.
5. Pantau dependency metrics per provider, bukan agregat saja.
6. Isolasi dependency lewat adapter agar policy konsisten.
7. Asumsikan dependency akan lambat atau salah pada waktu terburuk.

## Pertanyaan Interview

### Dasar

- Kenapa timeout budget penting?
- Apa risiko dependency call tanpa timeout?
- Kapan retry boleh?
- Kenapa tidak semua dependency setara?

### Menengah

- Bagaimana membagi timeout budget di endpoint yang memanggil beberapa dependency?
- Apa itu fail-fast dan kapan dipakai?
- Kenapa adapter layer membantu dependency management?
- Bagaimana membedakan dependency critical vs non-critical?

### Senior

- Bagaimana Anda mendesain dependency policy untuk service dengan banyak external provider?
- Bagaimana Anda mencegah satu dependency lambat menghabiskan seluruh resource service?
- Metrics apa yang paling penting untuk menilai health integrasi eksternal?
- Bagaimana Anda menjelaskan trade-off fallback ke stakeholder agar tidak melanggar correctness bisnis?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- payment provider sedang degrade;
- auth provider intermittently timeout;
- notifikasi partner rate-limited;
- satu dependency lambat membuat API utama ikut time out;
- retry storm memperburuk outage.

## Ringkasan Brutal

- Dependency eksternal adalah risiko utama, bukan detail samping.
- Timeout budget harus dirancang, bukan ditebak.
- Retry policy harus selektif dan kontekstual.
- Observability per dependency adalah syarat dasar.
- Engineer senior mendesain integrasi untuk hari buruk, bukan hanya hari normal.

## Checklist Pemahaman

- Saya bisa membedakan dependency critical dan non-critical.
- Saya paham timeout harus mengikuti SLA budget.
- Saya tahu retry tidak boleh disamaratakan.
- Saya sadar fallback harus benar secara bisnis.
- Saya tahu pentingnya isolasi dan observability dependency.

## Penutup

Sistem yang kuat bukan yang bergantung pada dependency sempurna.
Sistem yang kuat adalah yang tetap terkendali ketika dependency tidak sempurna.
