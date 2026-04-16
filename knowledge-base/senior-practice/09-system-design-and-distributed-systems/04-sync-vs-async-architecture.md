# Sync vs Async Architecture

## Tujuan

Topik ini membahas cara memilih alur sinkron vs asinkron agar sistem seimbang antara kesederhanaan, konsistensi, dan ketahanan.

## Kenapa Penting

- Banyak sistem terlalu sinkron sehingga rapuh saat dependency lambat.
- Banyak sistem terlalu async sehingga kompleks dan sulit dipahami.
- Pilihan ini berdampak langsung ke UX, reliability, dan operasional.

## Model Mental

1. Sync cocok untuk kebutuhan respons langsung.
2. Async cocok untuk pekerjaan yang bisa ditunda.
3. Gunakan sync untuk koordinasi minimum, async untuk decoupling.
4. Setiap async boundary menambah kompleksitas observability.
5. Keputusan harus berbasis kebutuhan bisnis, bukan preferensi teknis.

## Arsitektur Sinkron

Ciri:

- caller menunggu respons selesai.
- hasil langsung diketahui.

Kelebihan:

- alur sederhana.
- debugging relatif mudah.
- konsistensi langsung lebih mudah.

Kekurangan:

- coupling tinggi ke dependency.
- latency user terpengaruh dependency chain.
- risiko timeout cascading.

## Arsitektur Asinkron

Ciri:

- caller tidak menunggu seluruh proses.
- hasil diproses di belakang.

Kelebihan:

- decoupling lebih baik.
- tahan terhadap lonjakan.
- throughput lebih fleksibel.

Kekurangan:

- eventual consistency.
- kompleksitas retry/idempotency.
- observability lebih menantang.

## Kapan Pilih Sync

- user perlu hasil saat itu juga.
- aksi kritis butuh validasi langsung.
- flow sederhana dengan dependency stabil.

## Kapan Pilih Async

- proses berat/lama.
- side effect non-kritis untuk respons awal.
- integrasi lintas service yang toleran delay.

## Hybrid Pattern

Banyak sistem sehat memakai kombinasi:

- sync untuk command acceptance.
- async untuk pekerjaan lanjutan.

Contoh:

- request order sync.
- email/analytics async.

## User Experience Implication

Sync:

- feedback langsung.
- risiko loading lama.

Async:

- respons cepat awal.
- user butuh status/progress tracking.

## Reliability Concern

Sync failure biasanya terlihat cepat.
Async failure bisa tersembunyi jika observability lemah.

Async wajib:

- dead-letter handling.
- retry policy aman.
- idempotency.

## Data Consistency

Sync memudahkan strong consistency lokal.
Async sering berarti eventual consistency lintas komponen.

Tim harus menyepakati behavior bisnis di kondisi delay.

## Timeout Budget

Pada sync path:

- timeout budget ketat.
- fallback strategy jelas.

Pada async path:

- queue delay budget.
- processing SLA.

## Backpressure

Async tidak otomatis menyelesaikan overload.
Anda tetap perlu:

- queue limits.
- worker concurrency control.
- shed policy.

## Ordering dan Duplicate

Async sistem harus menghadapi:

- duplicate message.
- out-of-order delivery.

Design consumer harus idempotent dan order-aware jika diperlukan.

## Monitoring

Sync monitor:

- latency.
- error rate.
- saturation.

Async monitor:

- queue depth.
- processing lag.
- retry/dead-letter volume.

## Anti-Pattern

### 1. Semua dibuat async

Kompleksitas tak perlu.

### 2. Semua dibuat sync

Sistem rapuh pada dependency lambat.

### 3. Async tanpa idempotency

Duplicate side effect.

### 4. Sync chain panjang

Cascading failure.

## Heuristik Senior

1. Tentukan kebutuhan user-facing first.
2. Gunakan sync secukupnya untuk keputusan kritis.
3. Offload pekerjaan non-kritis ke async.
4. Desain async dengan retry + idempotency sejak awal.
5. Jelaskan ekspektasi eventual consistency ke product/stakeholder.
6. Pantau lag dan backlog sebagai first-class metric.
7. Evaluasi ulang boundary sync/async berdasarkan incident data.

## Pertanyaan Interview

### Dasar

- Apa beda sync dan async architecture?
- Kapan sync lebih tepat?
- Kapan async lebih tepat?
- Kenapa async butuh idempotency?

### Menengah

- Bagaimana menangani status user pada async flow?
- Bagaimana mencegah retry storm pada async worker?
- Kapan hybrid pattern paling efektif?
- Bagaimana mengukur kesehatan sistem async?

### Senior

- Bagaimana Anda merancang transisi dari flow sinkron berat ke model hybrid yang lebih resilient?
- Bagaimana Anda menyeimbangkan consistency vs responsiveness pada domain kritis?
- Bagaimana Anda mengkomunikasikan eventual consistency behavior ke stakeholder non-teknis?
- Bagaimana Anda mencegah arsitektur async berubah jadi sistem yang tidak dapat dioperasikan?

## Kasus Nyata

- checkout lambat karena menunggu notifikasi pihak ketiga secara sync.
- worker async duplicate charge karena idempotency lemah.
- queue backlog menumpuk karena concurrency tak dibatasi.
- flow hybrid sukses menurunkan p95 sambil menjaga correctness.

## Ringkasan Brutal

- Sync memberi kesederhanaan, async memberi ketahanan.
- Keduanya punya biaya.
- Tim senior memilih boundary dengan sadar, bukan dogmatis.

## Checklist

- Saya tahu flow mana yang wajib sync.
- Saya tahu flow mana yang cocok async.
- Saya punya idempotency/retry policy untuk async.
- Saya memonitor metric sync dan async yang relevan.
- Saya bisa menjelaskan trade-off ke produk dan bisnis.

## Penutup

Arsitektur matang bukan yang semua sync atau semua async.
Arsitektur matang adalah yang menaruh masing-masing pola di tempat yang tepat.
