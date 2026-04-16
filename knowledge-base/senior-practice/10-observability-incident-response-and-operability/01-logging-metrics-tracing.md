# Logging, Metrics, dan Tracing

## Tujuan

Dokumen ini menjelaskan tiga pilar **observability**—**logging**, **metrics**, dan **tracing**—sebagai satu kesatuan: kemampuan memahami perilaku sistem di produksi, mendiagnosis insiden, dan mengambil keputusan engineering berbasis bukti, bukan asumsi.

Tanpa ketiganya bekerja sama, tim sering terjebak pada salah satu ekstrem: log berlebihan tanpa agregasi yang bermakna, dashboard metrik yang tidak menjawab pertanyaan operasi, atau trace yang ada tetapi tidak terhubung ke log dan alarm.

## Kenapa Topik Ini Penting

- **Insiden tidak bisa dipecahkan** hanya dengan “coba lihat server” jika sinyal tidak terstruktur dan tidak terkorelasi.
- **Keputusan kapasitas dan performa** membutuhkan metrik deret waktu; log mentah saja tidak cukup untuk tren.
- **Arsitektur terdistribusi** membutuhkan jejak permintaan lintas layanan; tanpa tracing, bottleneck tersembunyi di rantai dependency.
- **On-call dan postmortem** bergantung pada data yang konsisten, dapat dicari, dan aman dari kebocoran data sensitif.

## Model Mental

1. **Logging** menjawab pertanyaan: “**Apa** yang terjadi pada titik waktu tertentu, dengan konteks apa?”
2. **Metrics** menjawab: “**Seberapa sering** dan **seberapa besar** dalam agregat, sepanjang waktu?”
3. **Tracing** menjawab: “**Di mana** waktu habis sepanjang satu unit kerja (misalnya satu HTTP request) melintasi komponen?”
4. Ketiganya saling melengkapi: metrik untuk **deteksi dan SLO**, log untuk **konteks dan audit**, trace untuk **topologi dan latency breakdown**.
5. Observability bukan sekadar mengumpulkan data; ia harus **actionable** untuk keputusan dan runbook.

## Logging

### Peran logging

Log merekam kejadian diskrit: error, keputusan bisnis penting, transisi state, atau titik-titik diagnostik. Log yang baik membantu **forensik** setelah insiden dan **audit** untuk kepatuhan.

### Structured logging

Log tidak terstruktur (string bebas) sulit diparsing, difilter, dan dikorelasikan. **Structured logging** (misalnya JSON dengan field tetap) memungkinkan:

- filter cepat per `level`, `service`, `user_id` (non-PII), `trace_id`;
- agregasi di log stack (misalnya ELK/OpenSearch);
- konsistensi antar tim.

### Field minimal yang disarankan

- `timestamp` (timezone eksplisit atau UTC).
- `level` (severity).
- `service` / `component`.
- `message` atau `event` (deskripsi singkat).
- **`trace_id` / `span_id`** jika trace aktif—kunci penghubung ke APM/tracing.
- `correlation_id` atau `request_id` per unit kerja bisnis.
- `error` (type, message) untuk exception—hindari stack trace raksasa di setiap baris tanpa kebutuhan.

### Level log yang sehat

- **ERROR**: kondisi yang membutuhkan tindakan atau pelanggaran invariant; tidak dipakai untuk “flow normal yang tidak enak”.
- **WARN**: kondisi abnormal tetapi tidak pasti fatal; bisa memicu alert jika rate tinggi.
- **INFO**: milestone operasi (startup, deploy, transaksi penting selesai)—volume harus terkontrol.
- **DEBUG**: detail untuk pengembangan; biasanya dimatikan atau disampling di produksi.

### Apa yang pantas di-log

- Mulai/akhir operasi kritis dengan durasi ringkas.
- Kegagalan dependency dengan **kode error** dan **latency**, bukan seluruh body response partner.
- Keputusan authz penting (tanpa credential).

### Apa yang tidak pantas di-log

- Password, token, API key, cookie session mentah.
- Data kesehatan/finansial penuh kecuali ada kebijakan retensi dan minimisasi eksplisit.
- Payload request/response besar berulang—membengkak biaya dan mengaburkan sinyal.

### Redaksi dan kebijakan privasi

Terapkan **redaksi otomatis** pada field sensitif dan review berkala pola log baru. Observability yang bagus tidak boleh menjadi **sumber kebocoran data**.

### Anti-pattern logging

- Log di loop panjang tanpa sampling.
- “Log everything” tanpa retention policy → biaya storage dan query meledak.
- Pesan tidak unik sehingga tidak bisa di-group (`Error` saja tanpa konteks).
- Mengandalkan log sebagai satu-satunya sumber kebenaran untuk metrik bisnis—gunakan metrics atau event pipeline yang tepat.

## Metrics

### Peran metrics

Metrics adalah pengukuran numerik deret waktu: counter, gauge, histogram. Mereka ideal untuk **SLO**, alerting, kapasitas, dan melihat tren tanpa membaca jutaan baris log.

### Golden signals (turunan klasik)

Untuk layanan request-driven, pantau setidaknya:

- **Latency** (histogram, bukan hanya mean)—p50, p95, p99.
- **Traffic** (request rate).
- **Errors** (rate 5xx, rate timeout, rate bisnis “gagal”).
- **Saturation** (CPU, queue depth, pool wait, utilization dependency).

Tanpa keempat dimensi ini, diagnosis “kenapa lambat” sering menebak.

### Tipe metrik

- **Counter**: hanya naik (total request, total error)—cocok untuk rate.
- **Gauge**: nilai saat ini (connection pool used, queue length).
- **Histogram / summary**: distribusi (latency per bucket)—penting untuk SLO tail latency.

### Cardinality: musuh tersembunyi

Label metrik dengan kombinasi unik tinggi (misalnya `user_id` per pengguna pada counter global) dapat menghancurkan time-series database dan biaya. Aturan praktis:

- label untuk **dimensi operasional** (route, region, status_code_class), bukan identitas tinggi-kardinalitas kecuali ada kebutuhan khusus dan kontrol ketat.

### Hubungan metrics dengan logging dan tracing

- Alert dari **metrics** memicu investigasi.
- Investigasi membuka **trace** untuk breakdown span.
- Span atau `trace_id` mengarah ke **log** baris relevan.

Alur ini harus bisa dilakukan on-call dalam menit, bukan jam.

### Elastic APM dan ekosistem sejenis

Jika Anda memakai **Elastic APM** (atau tool serupa), metrik aplikasi dan trace sering terintegrasi di satu UI. Manfaatkan:

- service map untuk melihat dependency;
- transaksi dan span untuk melihat di mana latency terkonsentrasi;
- korelasi ke log melalui trace id.

Jangan berhenti di “APM terpasang”; pastikan **instrumentation** dan **naming** konsisten agar data bisa dipercaya lintas tim.

## Tracing

### Peran tracing

Tracing memetakan satu unit kerja (trace) menjadi rangkaian **span** (operasi) di berbagai proses. Ini menjawab: “request ini menghabiskan 200 ms di mana?”—misalnya 150 ms di query DB, 40 ms di HTTP call keluar.

### Propagation context

Agar trace utuh, **context** (trace id, parent span id) harus **diteruskan** antar service (header HTTP, metadata gRPC, dll.). Kegagalan propagation adalah alasan umum “trace putus di tengah jalan”.

### Sampling

Trace penuh 100% untuk semua traffic sering mahal. Strategi:

- sampling default untuk traffic normal;
- **tail-based** atau peningkatan sampling saat error/latency tinggi (jika platform mendukung).

Sampling bukan alasan untuk tidak pernah melihat request bermasalah—kebijakan harus memastikan insiden tetap terwakili.

### Span yang bermakna

- Beri nama span yang **mencerminkan operasi** (`db.orders.select`, `http.payment_gateway`), bukan `span1`.
- Catat atribut penting (query name tanpa data sensitif, status partner).
- Hindari span terlalu granular yang hanya menambah noise.

### Hubungan dengan logging

Saat log baris memuat `trace_id`, on-call dapat lompat dari span lambat ke log aplikasi pada rentang waktu yang sama. Tanpa itu, dua dunia tetap terpisah.

## Menggabungkan ketiga pilar dalam workflow insiden

1. **Alert** dari metrics (misalnya error rate atau p99 naik).
2. Buka **trace** transaksi bermasalah; identifikasi span bermasalah.
3. Drill ke **log** dengan `trace_id` / waktu / service untuk detail exception atau input konteks.
4. Perbarui runbook jika langkah yang sama terulang.

Jika langkah 2 atau 3 tidak mungkin, observability Anda belum matang.

## Trade-off

| Aspek | Logging kuat | Metrics kuat | Tracing kuat |
|-------|----------------|----------------|---------------|
| Biaya | Storage tinggi jika verbose | Cardinality salah = mahal | Sampling & storage span |
| Signal | Konteks kaya | Agregasi & alert | Latency breakdown |
| Risiko | PII leak | Metrik misleading jika definisi salah | Overhead instrumentasi |

Keseimbangan: investasi di **metrics + trace** untuk path kritis; log **terstruktur dan hemat** untuk konteks dan audit.

## Failure mode umum

- **Tidak ada correlation id**: log dan trace tidak bisa disatukan.
- **Mean latency saja**: tail buruk tak terlihat sampai pengguna komplain.
- **Alert pada metrik mentah** tanpa hubungan SLO: fatigue on-call.
- **Trace tanpa ownership**: tidak ada standar nama span antar tim.

## Heuristik senior

1. Definisikan **3 pertanyaan operasi** yang paling sering diajukan on-call; pastikan metrics/logging/tracing bisa menjawabnya.
2. Wajibkan `trace_id`/`request_id` pada log path kritis.
3. Gunakan histogram untuk latency SLO, bukan rata-rata.
4. Kendalikan cardinality; review label baru di PR.
5. Uji alur “alert → trace → log” secara berkala, bukan hanya saat insiden.

## Pertanyaan interview

### Dasar

- Apa perbedaan logging, metrics, dan tracing?
- Apa itu structured logging?
- Mengapa correlation id penting?
- Apa golden signals?

### Menengah

- Bagaimana Anda mendeteksi dan memperbaiki cardinality explosion?
- Kapan sampling trace masuk akal?
- Bagaimana menghubungkan log dengan trace di arsitektur multi-service?
- Metrik apa yang Anda gunakan untuk SLO latency?

### Senior

- Bagaimana Anda merancang observability standard untuk 20+ layanan?
- Bagaimana menyeimbangkan biaya log dengan kebutuhan forensik?
- Bagaimana Anda mengukur apakah observability benar-benar mempercepat MTTR?

## Koneksi ke kasus nyata

- Lonjakan p99: trace menunjukkan satu query N+1; log menunjukkan parameter request yang memicu pola buruk.
- Outage partner: metrics menunjukkan timeout naik; trace menunjukkan span eksternal; log menunjukkan kode retry.
- Audit keamanan: log terstruktur dengan actor dan action, tanpa menyimpan secret.

## Ringkasan brutal

- **Log tanpa struktur dan id korelasi** hampir sama tidak bergunanya dengan log yang tidak ada.
- **Metrics tanpa histogram dan definisi error yang jelas** menipu dashboard.
- **Tracing tanpa propagation dan sampling policy** menjadi hiasan mahal.

Observability yang matang adalah ketika on-call bisa menjawab “apa, seberapa besar, di mana” dalam satu alur kerja.

## Checklist pemahaman

- Saya bisa menjelaskan peran masing-masing pilar dan kapan memakainya.
- Saya menulis log terstruktur dengan field minimal dan redaksi.
- Saya memahami golden signals dan bahaya cardinality.
- Saya tahu pentingnya propagation trace dan sampling.
- Saya bisa menelusuri insiden dari metrics ke trace ke log.

## Penutup

Logging, metrics, dan tracing bukan tiga produk terpisah yang dipasang oleh tiga tim berbeda. Mereka adalah **satu bahasa** untuk perilaku sistem. Semakin rapat integrasinya, semakin murah biaya insiden—dan semakin tinggi kepercayaan tim terhadap data produksi.

## Lampiran: checklist instrumentasi untuk PR

Saat menambah fitur kritis, tanyakan:

- Metrik apa yang menunjukkan fitur ini sehat atau sakit?
- Log event apa yang diperlukan untuk audit atau debug tanpa verbose berlebihan?
- Apakah span baru diperlukan, atau cukup span library yang sudah ada?
- Apakah `trace_id`/`request_id` ikut ke semua log error path?

Jika jawaban “belum tahu”, observability masih dipikirkan belakangan.

## Referensi perilaku integrasi (APM)

Alat seperti Elastic APM menggabungkan aspek **trace** dan **metrics** aplikasi. Tetap anggap **log** sebagai sumber konteks tambahan yang harus disepakati format dan retention-nya. Satu UI tidak menggantikan disiplin field dan kebijakan data.

## Glosarium singkat

- **MTTR (Mean Time To Repair)**: metrik operasi yang dipengaruhi langsung oleh kualitas observability—bukan definisi teknis logging, tetapi konsekuensi bisnis dari observability yang buruk.
- **Exemplar**: tautan dari titik metrik ke contoh trace—berguna untuk menjembatani metrics dan tracing bila didukung stack Anda.

## Contoh skenario latihan

1. Diberi alert “error rate naik 5x”: tuliskan langkah metrics → trace → log yang Anda ambil.
2. Diberi keluhan “kadang lambat”: metrik percentile mana yang Anda buka pertama, dan mengapa?

Latihan ini menguji apakah konsep di dokumen ini sudah internalized, bukan hanya dibaca.
