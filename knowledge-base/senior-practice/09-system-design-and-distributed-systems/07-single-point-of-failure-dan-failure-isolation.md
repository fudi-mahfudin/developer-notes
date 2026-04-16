# Single Point of Failure dan Failure Isolation

## Tujuan

Topik ini membahas cara mengenali titik kegagalan tunggal (SPOF) dan mendesain isolasi agar kerusakan tidak menyebar.

## Kenapa Penting

- Satu komponen down bisa menjatuhkan seluruh sistem.
- Banyak outage besar terjadi bukan karena satu bug, tetapi karena tidak ada isolasi kegagalan.
- Failure isolation adalah fondasi reliability engineering.

## Model Mental

1. Semua komponen bisa gagal.
2. Kegagalan harus dibatasi radiusnya.
3. Redundansi tanpa isolasi tidak cukup.
4. Ketergantungan sinkron memperbesar risiko propagasi.
5. Degradasi terkontrol lebih baik dari total outage.

## Apa Itu SPOF

SPOF adalah komponen yang jika gagal menyebabkan layanan kritis ikut gagal total.

Contoh:

- satu instance database tanpa failover;
- satu cache node untuk semua request;
- satu service auth yang tidak ada fallback;
- satu region deployment untuk seluruh traffic.

## Jenis SPOF

- Infrastruktur (server, disk, network link).
- Aplikasi (service tunggal kritis).
- Data plane (database/broker tunggal).
- Operational (satu orang/satu prosedur).

## Failure Isolation Dasar

Prinsip:

- pisahkan resource pool;
- pisahkan dependency path;
- batasi concurrency per fungsi;
- lindungi core flow dari fitur non-kritis.

## Bulkhead Pattern

Bulkhead memisahkan kapasitas:

- thread pool terpisah;
- connection pool terpisah;
- queue terpisah per workload.

Tujuan: satu dependency overload tidak menghabiskan semua resource.

## Circuit Breaker

Saat dependency rusak:

- fail-fast;
- hindari timeout panjang berulang;
- beri kesempatan recovery.

Tanpa ini, sistem bisa "menunggu mati" bersama dependency.

## Timeout dan Retries

Timeout harus ketat.
Retry harus selektif.

Retry agresif tanpa batas sering memperburuk outage.

## Graceful Degradation

Jika komponen non-kritis gagal:

- nonaktifkan fitur tambahan;
- pertahankan jalur transaksi inti.

Ini memberi pengalaman "terbatas tapi tetap hidup".

## Data Layer Isolation

Pisahkan:

- read replica vs write primary;
- hot path query vs analytical query;
- tenant besar vs tenant kecil (jika perlu).

Ini mengurangi dampak workload ekstrem.

## Region dan AZ Strategy

Redundansi lintas AZ/region membantu, tetapi:

- failover plan harus diuji;
- data replication consistency harus dipahami;
- routing decision harus otomatis/terlatih.

## Queue Isolation

Pekerjaan berat dan pekerjaan kritis jangan berbagi queue tanpa kontrol.
Jika tidak, backlog non-kritis bisa menunda tugas kritis.

## Observability untuk Isolation

Pantau:

- saturation per pool;
- dependency failure rate;
- timeout/circuit open rate;
- error per route criticality.

Tanpa metrik granular, isolasi sulit diverifikasi.

## Game Day / Chaos Drill

Isolasi harus diuji:

- matikan dependency simulatif;
- cek blast radius;
- lihat apakah fallback/degradasi benar.

Desain yang tidak diuji biasanya gagal saat real incident.

## Anti-Pattern

### 1. Satu Pool untuk Semua

Satu bottleneck menular ke semua flow.

### 2. Retry Tanpa Batas

Amplifikasi beban saat failure.

### 3. Redundansi Tanpa Runbook

Failover teori, bukan praktik.

### 4. Tidak Bedakan Fitur Kritis vs Non-Kritis

Saat krisis, semua ikut mati.

## Heuristik Senior

1. Petakan dependency tree dan tandai SPOF eksplisit.
2. Pisahkan kapasitas berdasarkan criticality.
3. Terapkan timeout + circuit breaker di dependency utama.
4. Desain mode degradasi sejak awal.
5. Uji failover dan isolation secara berkala.
6. Hindari shared global bottleneck tanpa proteksi.
7. Jadikan blast radius sebagai KPI desain.

## Pertanyaan Interview

### Dasar

- Apa itu single point of failure?
- Kenapa redundancy saja tidak cukup?
- Apa itu failure isolation?
- Kenapa bulkhead penting?

### Menengah

- Bagaimana mengidentifikasi SPOF di arsitektur yang sudah berjalan?
- Kapan circuit breaker tepat dipakai?
- Bagaimana menerapkan graceful degradation?
- Apa metrik untuk menilai isolasi bekerja?

### Senior

- Bagaimana Anda merancang arsitektur yang tetap hidup saat dependency kritis gagal?
- Bagaimana Anda menyeimbangkan biaya redundancy dengan target availability?
- Bagaimana Anda memimpin game day agar menghasilkan perbaikan nyata?
- Bagaimana Anda mencegah retry storm saat incident lintas service?

## Kasus Nyata

- cache node tunggal down membuat semua API timeout.
- service notifikasi lambat menahan checkout path karena pool bersama.
- failover DB ada tetapi tidak pernah diuji, saat diperlukan gagal.
- satu region outage menjatuhkan semua pelanggan.

## Ringkasan Brutal

- SPOF yang tidak terlihat akan terlihat saat waktu terburuk.
- Failure isolation bukan kemewahan enterprise, tetapi kebutuhan dasar sistem yang serius.
- Tim senior mendesain agar kegagalan lokal tetap lokal.

## Checklist

- Saya bisa menyebut SPOF utama sistem saya.
- Saya punya strategi isolasi per dependency kritis.
- Saya punya mode degradasi untuk fitur non-kritis.
- Saya memantau metrik blast radius.
- Saya menguji failover, bukan hanya mendokumentasikannya.

## Penutup

Reliability bukan berarti "tidak pernah gagal".
Reliability berarti gagal dengan batas dampak yang bisa dikendalikan.
