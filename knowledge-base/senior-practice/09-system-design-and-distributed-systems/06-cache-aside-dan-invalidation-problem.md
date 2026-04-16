# Cache-Aside dan Invalidation Problem

## Tujuan

Topik ini membahas pola cache-aside yang paling umum dipakai dan alasan kenapa invalidation jadi sumber bug paling mahal.

## Kenapa Penting

- Cache-aside mudah diadopsi.
- Invalidation yang salah merusak correctness data.
- Banyak incident performa dan data stale berasal dari sini.

## Model Mental

1. Cache adalah akselerator, bukan source of truth.
2. Data stale adalah default risk.
3. Invalidation adalah problem desain, bukan detail coding.
4. Hit ratio tinggi tidak menjamin hasil benar.
5. Cache policy harus domain-aware.

## Cache-Aside Dasar

Alur umum:

1. cek cache;
2. jika miss, baca database;
3. simpan hasil ke cache;
4. kembalikan ke caller.

Keuntungan:

- implementasi relatif simpel;
- mengurangi load ke DB untuk hot reads.

## Write Path pada Cache-Aside

Umumnya write ke DB dulu, lalu:

- invalidate key cache, atau
- update cache secara eksplisit.

Keduanya punya trade-off.

## Kenapa Invalidation Sulit

Karena Anda harus tahu:

- key mana yang dipengaruhi;
- kapan invalidasi aman;
- bagaimana menangani race antar write/read;
- bagaimana mengelola cache multi-layer.

## Bentuk Invalidation

- TTL-based expiry.
- explicit key delete.
- event-driven invalidation.
- tag-based invalidation.

Tidak ada satu metode universal.

## TTL Trade-off

TTL panjang:

- hit ratio bagus;
- risiko stale tinggi.

TTL pendek:

- freshness lebih baik;
- miss rate naik.

TTL harus ditetapkan berdasarkan toleransi domain.

## Event-Driven Invalidation

Perubahan data mem-publish event invalidation.
Bagus untuk konsistensi lintas instance, tapi:

- butuh infrastruktur event stabil;
- event delay/loss harus ditangani.

## Race Condition Umum

Contoh:

1. Reader A miss cache, baca DB lama.
2. Writer update DB.
3. Reader A menulis value lama ke cache.

Hasil:

- cache berisi data stale walau DB sudah baru.

Mitigasi:

- version/timestamp check;
- short TTL + revalidation;
- singleflight per key.

## Thundering Herd

Saat key populer expired bersamaan:

- banyak request miss;
- semua hit DB;
- DB overload.

Mitigasi:

- jitter pada TTL;
- request coalescing;
- stale-while-revalidate.

## Multi-Node Concern

Pada banyak instance:

- cache lokal bisa tidak sinkron.
- invalidation harus tersebar konsisten.

Gunakan distributed cache/event invalidation bila perlu.

## Negative Caching

Caching hasil "not found" bisa menurunkan load.
Tapi TTL harus pendek agar create baru tidak lama "tak terlihat".

## Cache Key Design

Key harus mencerminkan:

- identity data;
- tenant scope;
- locale/version bila relevan.

Key design buruk = leakage atau invalidation kacau.

## Consistency by Domain

Data yang sensitif correctness tinggi:

- saldo;
- permission;
- status pembayaran;

butuh strategi lebih ketat daripada data display non-kritis.

## Observability

Pantau:

- hit/miss ratio;
- stale read incidents;
- DB fallback rate;
- key cardinality;
- invalidation latency.

Tanpa ini, tuning cache buta.

## Anti-Pattern

### 1. Cache Ditambahkan Tanpa Invalidation Plan

Cepat jadi sumber bug.

### 2. TTL Random Tanpa Dasar Domain

Data sering terlalu stale atau terlalu miss.

### 3. Cache Semua Hal

Biaya kompleksitas melebihi manfaat.

### 4. Mengabaikan Multi-Tenant Scope pada Key

Bisa memicu data leakage.

## Heuristik Senior

1. Definisikan toleransi stale per data type.
2. Mulai dari key paling hot.
3. Gunakan invalidation paling sederhana yang cukup.
4. Tangani stampede dari awal.
5. Uji race condition read/write.
6. Pantau cache dan DB fallback bersama.
7. Dokumentasikan kontrak cache behavior.

## Pertanyaan Interview

### Dasar

- Apa itu cache-aside?
- Kenapa invalidation sulit?
- Apa trade-off TTL?
- Kenapa cache bukan source of truth?

### Menengah

- Bagaimana menangani cache stampede?
- Kapan pakai explicit invalidation vs TTL?
- Bagaimana mencegah stale overwrite race?
- Metric apa yang wajib dipantau?

### Senior

- Bagaimana Anda mendesain cache policy untuk domain dengan level freshness berbeda?
- Bagaimana Anda mengelola invalidation lintas instance/region?
- Bagaimana Anda menilai kapan cache layer baru tidak layak ditambah?
- Bagaimana Anda membangun runbook saat incident stale-data terjadi?

## Kasus Nyata

- katalog produk menampilkan harga lama pasca update.
- permission user tidak langsung berubah karena cache stale.
- traffic spike membuat DB jenuh setelah mass expiry.
- cache key salah membuat data antar tenant tercampur.

## Ringkasan Brutal

- Cache-aside itu sederhana di whiteboard, rumit di produksi.
- Invalidation adalah inti correctness.
- Tim senior memperlakukan cache sebagai sistem yang harus diobservasi, bukan patch performa cepat.

## Checklist

- Saya punya kebijakan stale per domain.
- Saya tahu strategi invalidation per key penting.
- Saya mengantisipasi stampede dan race condition.
- Saya memantau metrik cache+DB secara bersama.
- Saya mendokumentasikan perilaku cache untuk tim.

## Penutup

Jika Anda belum bisa menjelaskan invalidation strategy dengan jelas, Anda belum benar-benar "punya cache".
