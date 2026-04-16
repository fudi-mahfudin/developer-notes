# Instrumentation yang Membantu Keputusan, Bukan Sekadar Menambah Log

## Tujuan

Dokumen ini menjelaskan bagaimana merancang **instrumentasi** (log, metrik, trace, event bisnis) agar mendukung **keputusan operasional dan produk**, bukan sekadar menambah volume data yang mahal dan sulit dipakai.

## Kenapa Topik Ini Penting

- Log berlebihan meningkatkan biaya storage dan mengaburkan sinyal.
- Metrik tanpa konteks SLO tidak membantu prioritas.
- Trace yang tidak konsisten membuat RCA lambat.

Instrumentasi buruk adalah **noise tax** yang dibayar setiap bulan.

## Definisi “membantu keputusan”

Instrumentasi baik menjawab salah satu dari:

1. Apakah layanan memenuhi **SLO** sekarang?
2. Di mana **bottleneck** atau error boundary?
3. Apakah perilaku **bisnis** (checkout, payout) sehat?
4. Apakah perubahan rilis **aman** untuk dilanjutkan atau di-rollback?

Jika jawaban tidak pernah dipakai untuk keputusan, pertimbangkan menghapus atau menurunkan level.

## Piramida observability

1. **Metrics** untuk agregat cepat dan alerting.
2. **Traces** untuk latensi lintas layanan.
3. **Logs** untuk detail konteks pada subset kasus.

Urutan ini membantu budget: jangan mengganti metrik dengan log berfrekuensi tinggi.

## Prinsip desain metrik

### Cardinality sadar

Label berlebihan (misalnya `user_id` penuh) meledakkan cardinality dan biaya.

Gunakan:

- bucket agregat;
- sampling untuk dimensi tinggi;
- metrik bisnis agregat per menit/jam.

### Nama dan unit konsisten

Gunakan konvensi tim: `http_server_duration_seconds` bukan campuran `latency_ms` dan `response_time`.

### RED / USE sebagai baseline layanan

- **RED**: rate, errors, duration untuk request-driven.
- **USE**: utilization, saturation, errors untuk resource.

## Tracing yang actionable

### Naming span bermakna

`http GET /orders` lebih baik daripada `handler`.

### Propagasi konteks wajib

Tanpa `trace_id` lintas hop, trace terputus dan tidak membantu RCA.

### Sampling adaptif

Simpan trace error penuh; sampling normal traffic agar biaya terkendali.

## Logging: kapan cukup

### Structured logging

JSON dengan field stabil (`level`, `service`, `trace_id`, `error.code`) memudahkan query.

### Level yang jelas

- `error`: perlu tindakan atau paging;
- `warn`: degradasi yang mungkin perlu investigasi;
- `info`: milestone operasional;
- `debug`: hanya non-produksi atau sampling.

### Hindari log di hot loop

Log per item dalam loop besar adalah bottleneck CPU dan I/O.

## Event bisnis vs log teknis

Event seperti `order_paid` berguna untuk analitik produk dan rekonsiliasi.

Pisahkan:

- pipeline observability operasional;
- pipeline analitik (bisa batch, lebih murah).

Mencampur keduanya tanpa desain sering membuat biaya naik tanpa insight.

## Instrumentasi untuk release

Sebelum deploy:

- metrik **golden signals** baseline;
- flag untuk mengaktifkan trace sampling sementara;
- dashboard rilis siap.

Setelah deploy:

- bandingkan error rate dan latency p95/p99;
- pantau saturasi dependency.

Tanpa ini, keputusan “lanjut vs rollback” menjadi intuisi.

## Instrumentasi untuk insiden

Saat insiden, yang paling dibutuhkan:

- **request_id** / **trace_id** di log;
- metrik per versi binary / image;
- error breakdown per dependency.

Jika on-call harus menambahkan log baru dan redeploy untuk melihat dasar masalah, ada gap desain.

## Biaya dan retensi

Keputusan produk observability:

- retensi log per environment;
- sampling trace;
- agregasi metrik turunan.

Dokumentasikan trade-off: retensi panjang vs biaya vs kebutuhan compliance.

## Privasi dan compliance

Jangan log:

- token, password, kartu kredit;
- data kesehatan penuh tanpa kebijakan.

Gunakan **redaksi** dan **hash** bila perlu korelasi tanpa konten sensitif.

## Anti-pattern

### “Log semua object request”

Berisiko privasi dan mahal.

### Metrik tanpa owner

Metric tanpa dashboard dan alert owner menjadi sampah.

### Alert pada metrik mentah tanpa SLO

Menghasilkan alert fatigue.

### Trace tanpa korelasi log

Investigator harus menebak hubungan manual.

## Heuristik senior

1. Setiap instrument baru harus punya **consumer**: dashboard, alert, atau query RCA.
2. Uji dampak cardinality di staging.
3. Review instrumentasi dalam code review seperti fitur.
4. Matikan atau turunkan instrument yang tidak pernah dibaca dalam kuartal.

## Pertanyaan interview

### Dasar

- Apa beda metrik dan log untuk debugging?
- Kenapa cardinality penting?

### Menengah

- Bagaimana Anda mendesain metrik untuk endpoint dengan traffic sangat tinggi?
- Bagaimana sampling trace mempengaruhi RCA?

### Senior

- Bagaimana Anda menyeimbangkan observability lengkap dengan biaya di startup vs enterprise?

## Kasus nyata

- Tim menambahkan label `tenant_id` pada counter permintaan—cardinality meledak saat promo. Mitigasi: agregasi per shard atau sampling tenant.

## Ringkasan brutal

- Instrumentasi tanpa keputusan adalah **hobby collecting**.
- Desain baik = **metrics first**, trace terkontrol, log terstruktur dan jarang di jalur panas.

## Checklist

- Saya bisa menjelaskan consumer setiap metrik baru.
- Saya menghindari PII di log default.
- Saya punya konvensi naming dan propagasi trace.
- Saya meninjau biaya cardinality sebelum merge.

## Penutup

Observability matang bukan tentang “lebih banyak data”, melainkan **lebih sedikit noise** dengan sinyal yang terhubung ke SLO dan RCA.

## Kedalaman: SLI dari instrumentasi

Pastikan metrik yang mendukung SLI:

- availability diukur dari probe atau success rate;
- latency diukur dari histogram server-side dan client-side bila perlu.

Instrumentasi yang tidak memetakan ke SLI sulit dipertahankan saat review budget.

## Kedalaman: OpenTelemetry sebagai lapisan abstraksi

Standar vendor-netral mengurangi lock-in dan mempermudah rotasi backend observability.

Investasi awal di propagator dan exporter sering membayar saat merger atau migrasi cloud.

## Kedalaman: “debug mode” terkontrol

Fitur untuk meningkatkan sampling atau log detail per tenant/request harus:

- memerlukan otorisasi;
- auto-expire;
- audit log.

Tanpa kontrol, debug mode menjadi backdoor performa.

## Latihan meja

Pilih satu endpoint kritis. Tulis tiga metrik, satu span wajib, dan satu log line yang cukup untuk RCA tanpa spam.

## Glosarium

- **Cardinality**: jumlah kombinasi unik label—driver biaya metrik time-series.
- **Golden signals**: latency, traffic, errors, saturation—kerangka cepat kesehatan layanan.

## Penutup organisasi

Observability adalah **produk internal**. Perlakukan dengan roadmap, owner, dan deprecation policy seperti produk lain.

## Lampiran: template PR checklist instrumentasi

- [ ] Apakah ada consumer (dashboard/alert/runbook)?
- [ ] Apakah cardinality diperkirakan?
- [ ] Apakah PII dihindari?
- [ ] Apakah trace_id dipropagasikan?
- [ ] Apakah level log sesuai?

## Ekstensi: business KPI

Hubungkan metrik teknis ke KPI bisnis (conversion, settlement time) dengan join waktu atau event pipeline terpisah agar diskusi insiden tidak hanya teknis.

## Ekstensi: chaos dan observability

Saat game day, verifikasi apakah instrumentasi cukup untuk mendeteksi degradasi yang diinjeksikan. Jika tidak, perbaiki sebelum chaos di produksi.

## Penutup akhir

Keputusan cepat dan benar di produksi bergantung pada **instrumentasi yang direncanakan**, bukan pada keberuntungan menemukan satu baris log di tengah lautan teks.
