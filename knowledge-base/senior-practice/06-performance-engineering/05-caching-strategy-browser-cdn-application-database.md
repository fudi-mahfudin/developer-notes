# Caching Strategy: Browser, CDN, Application, Database

## Tujuan

Topik ini penting karena banyak sistem memakai cache tanpa strategi.
Hasilnya:

- data stale tidak terkontrol;
- invalidation kacau;
- cache miss storm;
- biaya infra tetap tinggi walau cache banyak.

## Kenapa Topik Ini Penting

Cache bisa:

- menurunkan latency;
- mengurangi beban dependency;
- meningkatkan throughput.

Tetapi cache juga menambah kompleksitas:

- invalidation;
- consistency;
- observability;
- memory cost.

## Model Mental yang Benar

Pegang ini:

1. Cache adalah trade-off latency vs freshness.
2. Setiap layer cache punya fungsi berbeda.
3. Cache bukan pengganti desain query/API yang buruk.
4. Invalidation adalah inti, bukan detail samping.
5. Hit ratio tinggi tanpa correctness tetap bisa salah.

## Layer Cache Umum

- Browser cache
- CDN cache
- Application cache
- Database cache/buffer

Strategi sehat memanfaatkan layer sesuai konteks.

## Browser Cache

Cocok untuk:

- static assets;
- file JS/CSS;
- image;
- resource yang jarang berubah.

Kunci:

- cache-control yang tepat;
- versioned assets;
- invalidation saat release.

## CDN Cache

CDN bagus untuk:

- konten publik;
- static responses;
- edge delivery;
- mengurangi latency geografis.

Tapi CDN cache harus sadar:

- cache key;
- variation by header/query;
- purge strategy.

## Application Cache

Application cache biasa dipakai untuk:

- data hot read;
- expensive computation result;
- profile/reference data;
- temporary lookup.

Bisa in-memory atau distributed cache (misalnya Redis).

## Database-Level Cache

DB engine sendiri punya buffer/cache.
Kadang masalah performa bukan karena "kurang Redis", tetapi query pattern tidak sehat.

Jangan menambah cache layer baru tanpa memahami bottleneck asli.

## Cache Key Design

Cache key harus:

- unik sesuai data semantics;
- stabil;
- tidak terlalu panjang;
- mengandung dimensi penting (tenant/user/locale bila relevan).

Key design buruk = collision atau invalidation sulit.

## TTL Strategy

TTL adalah keputusan bisnis dan teknis:

- terlalu singkat: hit ratio rendah;
- terlalu panjang: data stale berlebihan.

TTL harus mengikuti:

- update frequency data;
- dampak stale;
- biaya miss.

## Invalidation Strategy

Pilihan umum:

- time-based expiry;
- event-based invalidation;
- explicit delete/update on write;
- tag/key grouping.

Tidak ada yang universal.
Yang penting: konsisten dan terukur.

## Cache-Aside Pattern

Pattern populer:

1. baca cache;
2. miss -> baca source;
3. simpan ke cache.

Sederhana, tetapi punya risiko:

- thundering herd saat miss besar;
- stale data jika invalidation lemah.

## Write-Through / Write-Behind

Write-through:

- write ke source dan cache langsung.

Write-behind:

- write ke cache lalu flush ke source.

Write-behind bisa cepat tetapi berisiko durability/consistency.
Gunakan dengan sangat hati-hati.

## Thundering Herd

Saat key populer expired bersamaan:

- banyak request miss;
- semua hit source sekaligus;
- source overload.

Mitigasi:

- jitter TTL;
- single-flight request dedupe;
- stale-while-revalidate;
- lock per key.

## Stale-While-Revalidate

Pola ini melayani data lama sebentar sambil refresh di background.

Kelebihan:

- latency bagus;
- spike miss berkurang.

Kekurangan:

- user bisa lihat stale data sementara.

Harus cocok dengan toleransi bisnis.

## Multi-Tenant Cache Concern

Untuk sistem multi-tenant, pastikan key membawa tenant scope.
Kalau tidak, data leakage lintas tenant bisa terjadi.

## Security dan Cache

Jangan cache sembarangan:

- data sensitif user-specific pada layer publik;
- response auth-bound tanpa key variation benar;
- token/secrets.

Cache strategy harus mempertimbangkan access control.

## Cache Observability

Metrik minimal:

- hit ratio;
- miss ratio;
- eviction rate;
- memory usage;
- key size distribution;
- latency source vs cache.

Tanpa metrik ini, cache tuning jadi tebak-tebakan.

## Anti-Pattern Umum

### 1. "Cache Everything"

Meningkatkan kompleksitas tanpa prioritas.

### 2. Tidak Punya Invalidation Plan

Data stale jadi masalah permanen.

### 3. Menganggap Hit Ratio Saja Sudah Cukup

Correctness bisa tetap buruk.

### 4. Menambah Cache untuk Menutupi Query Buruk

Akar masalah tetap ada.

## Heuristik Senior

1. Mulai dari data paling mahal dibaca dan paling sering diakses.
2. Tentukan toleransi stale per data domain.
3. Gunakan key design yang disiplin.
4. Pilih invalidation strategy eksplisit.
5. Lindungi dari thundering herd.
6. Pantau metrik cache dan dampak bisnisnya.
7. Ingat: cache harus bisa dijelaskan dan dipulihkan saat salah.

## Pertanyaan Interview

### Dasar

- Kenapa cache membantu performa?
- Apa trade-off utama cache?
- Apa itu cache-aside?
- Kenapa invalidation sulit?

### Menengah

- Bagaimana memilih TTL?
- Bagaimana menangani cache stampede?
- Kapan stale-while-revalidate cocok?
- Apa risiko cache di sistem multi-tenant?

### Senior

- Bagaimana Anda merancang caching strategy lintas browser, CDN, app, dan DB untuk flow kritis?
- Bagaimana Anda menyeimbangkan freshness dan latency pada data semi-kritis?
- Bagaimana Anda memutuskan kapan cache layer tambahan tidak sepadan?
- Bagaimana Anda mencegah cache menjadi sumber inconsistency sistemik?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- endpoint hot read membebani DB;
- data stale muncul lama setelah update;
- traffic spike memicu miss storm;
- tenant data bocor karena key salah.

## Ringkasan Brutal

- Cache adalah alat kuat sekaligus berbahaya.
- Invalidation adalah inti desain cache.
- Setiap layer cache punya tugas berbeda.
- Hit ratio tinggi tidak berarti sistem benar.
- Engineer senior memakai cache untuk masalah yang tepat, dengan observability dan recovery plan yang jelas.

## Checklist Pemahaman

- Saya paham layer cache berbeda.
- Saya tahu TTL dan invalidation harus dirancang.
- Saya sadar stampede risk nyata.
- Saya bisa mengukur dampak cache secara teknis dan bisnis.
- Saya tidak menjadikan cache sebagai plester permanen untuk desain buruk.

## Penutup

Caching strategy yang matang bukan yang paling banyak layernya.
Melainkan yang paling jujur dalam menyeimbangkan kecepatan, biaya, dan kebenaran data.
