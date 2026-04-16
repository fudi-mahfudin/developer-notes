# Graceful Shutdown, Health Checks, Readiness, dan Liveness

## Tujuan

Topik ini penting karena banyak service backend tampak normal saat start dan saat traffic ringan, tetapi gagal secara kasar saat deploy, restart, atau dependency melambat.
Engineer yang hanya fokus pada happy path sering lupa bahwa lifecycle process adalah bagian dari reliability.

Akibatnya:

- request putus saat deploy;
- job in-flight hilang;
- orchestrator mengira service sehat padahal belum siap;
- service restart loop padahal masalahnya dependency sementara;
- shutdown memutus koneksi tanpa cleanup.

## Kenapa Topik Ini Penting

Di production, service tidak hanya "jalan".
Service akan:

- start;
- warm up;
- menerima traffic;
- kehilangan dependency;
- di-restart;
- di-scale down;
- di-deploy ulang;
- mati karena signal atau crash.

Kalau lifecycle ini tidak didesain, kualitas sistem Anda hanya kebetulan.

## Empat Konsep yang Harus Dipisahkan

- graceful shutdown
- health check
- readiness
- liveness

Empat istilah ini sering dicampur, padahal tujuan operasionalnya berbeda.

## Graceful Shutdown

Graceful shutdown berarti service berhenti dengan terkendali:

- berhenti menerima traffic baru;
- menyelesaikan request atau job yang sedang berjalan sebisa mungkin;
- menutup koneksi dan resource;
- keluar dengan status yang benar.

Ini berbeda dari mati mendadak.

## Health Check

Health check adalah mekanisme untuk memberi sinyal kondisi service.
Tetapi "sehat" itu ambigu kalau tidak dipisah.

Karena itu readiness dan liveness biasanya dipisahkan.

## Readiness

Readiness menjawab:

"Apakah service ini siap menerima traffic sekarang?"

Service bisa hidup sebagai process, tetapi belum ready karena:

- config belum tervalidasi;
- koneksi database belum siap;
- cache penting belum warm;
- migration check belum selesai;
- service sedang shutdown drain mode.

## Liveness

Liveness menjawab:

"Apakah process ini masih hidup dan tidak stuck secara fatal?"

Kalau liveness gagal, orchestrator biasanya layak me-restart process.
Tetapi kalau readiness gagal, belum tentu process harus dibunuh.

## Model Mental yang Benar

Pegang ini:

1. Readiness adalah soal menerima traffic dengan aman.
2. Liveness adalah soal apakah process layak tetap hidup.
3. Graceful shutdown adalah soal bagaimana keluar tanpa merusak user dan resource.
4. Tidak semua dependency issue harus membuat liveness gagal.
5. Deployment yang sehat sangat bergantung pada tiga konsep ini.

## Startup Lifecycle

Service yang sehat punya fase startup yang eksplisit:

1. load config;
2. validasi env;
3. init dependency penting;
4. siapkan resource internal;
5. baru tandai ready.

Kesalahan umum:

- buka port terlalu cepat;
- readiness langsung `200 OK` padahal DB belum siap;
- background init tetap jalan sementara traffic sudah masuk.

Ini membuat startup race condition yang mahal saat deploy.

## Kenapa Readiness Penting

Kalau service belum ready tetapi sudah menerima traffic:

- request awal gagal;
- warm-up menjadi insiden kecil tersembunyi;
- autoscaling bisa membuat node baru malah menambah error rate.

Readiness seharusnya melindungi service dari menerima beban sebelum benar-benar siap.

## Kapan Readiness Harus Gagal

Biasanya saat:

- dependency wajib belum tersedia;
- service sedang drain untuk shutdown;
- resource internal kritis rusak;
- initialization belum selesai.

Tetapi hati-hati.
Jangan membuat readiness terlalu sensitif terhadap dependency non-kritis yang sebenarnya masih bisa di-fallback.

## Kapan Liveness Harus Gagal

Ini lebih sempit.
Liveness gagal saat process benar-benar tidak layak dipertahankan.

Contoh:

- deadlock fatal internal;
- event loop benar-benar stuck parah;
- state internal rusak tak bisa pulih;
- proses tidak lagi memproses loop kesehatan dasar.

Kalau setiap DB hiccup membuat liveness gagal, service akan restart loop tanpa alasan sehat.

## Readiness vs Dependency Failure

Dependency penting turun tidak otomatis berarti liveness harus gagal.
Sering kali yang tepat:

- readiness jadi false;
- traffic baru dihentikan;
- process tetap hidup untuk recovery atau cleanup.

Kalau semua kegagalan dependency memicu restart, Anda hanya menambah churn.

## Graceful Shutdown Trigger

Shutdown biasanya dipicu oleh:

- `SIGTERM`;
- `SIGINT`;
- deployment rolling update;
- scale down;
- manual restart;
- node eviction.

Service harus punya handler yang jelas untuk kondisi ini.

## Langkah Graceful Shutdown yang Sehat

Secara praktis:

1. terima signal shutdown;
2. tandai readiness false;
3. berhenti menerima koneksi atau request baru;
4. biarkan in-flight request selesai sampai batas waktu;
5. tutup pool/koneksi/resource;
6. flush telemetry penting bila perlu;
7. exit.

Kalau urutannya salah, request baru bisa tetap masuk saat proses sedang mati.

## Drain Mode

Drain mode berarti service masih hidup, tetapi tidak lagi mau menerima traffic baru.
Ini penting untuk:

- rolling deployment;
- graceful scale down;
- mencegah request baru masuk saat shutdown berjalan.

Readiness endpoint biasanya harus merefleksikan kondisi ini.

## HTTP Server Shutdown

Pada service HTTP, graceful shutdown berarti:

- stop `listen` untuk koneksi baru;
- handle koneksi lama dengan aturan yang jelas;
- timeout-kan koneksi yang terlalu lama bila perlu.

Kalau Anda hanya memanggil `process.exit()`, semua request aktif bisa putus mendadak.

## Background Job dan Shutdown

Untuk worker atau scheduler, graceful shutdown berarti:

- stop ambil job baru;
- selesaikan job aktif atau simpan checkpoint;
- release lock atau lease;
- commit progress yang perlu.

Kalau tidak, job bisa hilang, diproses dua kali, atau meninggalkan resource menggantung.

## Shutdown Timeout

Graceful shutdown tidak boleh tanpa batas.
Kalau ada request atau job yang tidak selesai-selesai, Anda butuh batas waktu.

Trade-off-nya:

- terlalu singkat: user atau job sering terputus;
- terlalu panjang: deploy dan recovery lambat.

Anda harus memilih berdasarkan SLA dan karakter workload.

## Health Check Endpoint yang Baik

Health endpoint seharusnya:

- ringan;
- cepat;
- tidak melakukan kerja berat;
- tidak memicu dependency storm;
- merefleksikan state yang benar.

Kesalahan umum:

- health check memanggil terlalu banyak dependency mahal;
- tiap probe memicu query berat;
- check sendiri menjadi sumber load tambahan.

## Shallow vs Deep Health Check

### Shallow

Cek proses dasar hidup dan loop masih merespons.

### Deep

Cek dependency atau komponen lain.

Keduanya punya tempat.
Tetapi jangan pakai deep health check untuk liveness jika itu membuat restart tidak perlu.

## Dependency Check dengan Bijak

Kalau readiness memeriksa database, misalnya:

- pastikan check-nya ringan;
- jangan membuat query mahal;
- cache hasil sesaat bila perlu;
- hindari storm saat ribuan probe datang.

Health system yang buruk bisa menambah masalah saat dependency sudah sakit.

## Orchestrator Semantics

Platform seperti Kubernetes memakai readiness dan liveness untuk keputusan berbeda.
Karena itu definisi Anda harus presisi:

- readiness false: jangan kirim traffic baru;
- liveness false: restart container/process.

Kalau Anda salah memetakan keduanya, perilaku operasional akan kacau.

## Graceful Shutdown dan Load Balancer

Saat service mulai shutdown:

- readiness false memberi sinyal agar traffic baru dihentikan;
- tetapi request yang sudah diroute masih mungkin datang sebentar;
- connection draining di LB juga berperan.

Jadi aplikasi dan platform harus sinkron.
Jangan berasumsi satu sisi saja cukup.

## WebSocket dan Long-Lived Connection

Shutdown menjadi lebih rumit jika ada:

- WebSocket;
- SSE;
- streaming panjang;
- long-polling.

Anda harus menentukan:

- apakah koneksi diberi waktu drain?
- apakah akan diputus dengan notifikasi?
- bagaimana client reconnect?

Kalau tidak dipikirkan, deploy akan terasa kasar bagi user realtime.

## Readiness Selama Recovery

Kadang service masih hidup tetapi perlu berhenti menerima beban sementara:

- dependency kritis sedang flapping;
- queue backlog terlalu tinggi;
- memory pressure ekstrem;
- internal subsystem masuk degraded mode.

Readiness bisa dipakai sebagai alat proteksi, bukan sekadar startup signal.

## Observability untuk Lifecycle

Anda harus bisa melihat:

- kapan service menjadi ready;
- kapan readiness turun;
- berapa lama shutdown drain;
- berapa banyak request diputus saat shutdown;
- kenapa liveness gagal;
- apakah deploy menyebabkan spike error.

Kalau lifecycle tidak terobservasi, Anda hanya berharap deploy berjalan baik.

## Anti-Pattern Umum

### 1. `process.exit()` Langsung

Ini cara cepat merusak in-flight request.

### 2. Readiness Selalu `200`

Ini membuat endpoint kesehatan tidak ada gunanya.

### 3. Liveness Tergantung Dependency Eksternal yang Flaky

Ini menyebabkan restart loop yang tidak menyelesaikan akar masalah.

### 4. Health Check Berat

Probe menjadi beban tambahan saat sistem sudah lemah.

## Heuristik Senior

1. Pisahkan readiness dari liveness secara disiplin.
2. Readiness harus false sebelum shutdown mulai drain.
3. Liveness jangan terlalu sensitif terhadap dependency eksternal biasa.
4. Health endpoint harus ringan dan cepat.
5. Tetapkan shutdown timeout yang realistis.
6. Pikirkan request aktif, background job, dan long-lived connection.
7. Ukur dampak deploy dan shutdown, bukan hanya asumsi.

## Pertanyaan Interview

### Dasar

- Apa beda readiness dan liveness?
- Kenapa graceful shutdown penting?
- Kapan service boleh dianggap ready?
- Kenapa `process.exit()` langsung berbahaya?

### Menengah

- Kenapa dependency database down tidak selalu berarti liveness harus gagal?
- Apa langkah umum graceful shutdown pada service HTTP?
- Bagaimana menangani in-flight request saat deploy?
- Kenapa health check berat itu buruk?

### Senior

- Bagaimana Anda mendesain readiness untuk service dengan dependency kritis dan non-kritis?
- Bagaimana Anda menghindari restart loop akibat probe yang salah desain?
- Bagaimana Anda menangani graceful shutdown untuk worker queue dan WebSocket server?
- Metrics apa yang Anda lihat untuk menilai kualitas lifecycle management saat deploy?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- rolling deployment memicu spike `502`;
- service restart saat DB flapping padahal restart tidak membantu;
- worker mati saat job setengah jalan;
- pod baru menerima traffic sebelum warm-up selesai;
- WebSocket client sering disconnect kasar saat deploy.

## Ringkasan Brutal

- Service yang hidup belum tentu ready.
- Service yang tidak ready belum tentu harus di-restart.
- Graceful shutdown adalah bagian inti reliability, bukan polish opsional.
- Health check yang salah bisa lebih merusak daripada tidak ada.
- Kalau lifecycle process Anda tidak dirancang, deploy hanyalah gangguan terjadwal.

## Checklist Pemahaman

- Saya tahu beda readiness dan liveness.
- Saya paham readiness harus turun sebelum shutdown drain.
- Saya tidak memetakan dependency hiccup biasa ke liveness failure.
- Saya tahu health endpoint harus ringan.
- Saya paham shutdown butuh batas waktu dan cleanup resource.
- Saya sadar background job dan long-lived connection punya kebutuhan shutdown khusus.

## Penutup

Service production yang matang bukan hanya service yang bisa start.
Ia juga tahu kapan siap, kapan harus berhenti menerima beban, dan bagaimana mati tanpa merusak pengalaman pengguna atau integritas kerja yang sedang berjalan.

Itulah bedanya sistem yang sekadar hidup dengan sistem yang operable.
