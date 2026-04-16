# Queue, Pub/Sub, dan Event-Driven Flow

## Tujuan

Topik ini menjelaskan kapan dan bagaimana memakai queue/pub-sub untuk membangun alur event-driven yang tahan skala dan gangguan.

## Kenapa Penting

- Queue/pub-sub sering dipakai salah sebagai "magic scaling".
- Tanpa desain benar, sistem event-driven jadi sulit dipahami dan dipulihkan.
- Banyak bug data consistency berasal dari event flow yang lemah.

## Model Mental

1. Queue/pub-sub adalah alat komunikasi asinkron.
2. Delivery bukan berarti processing sukses.
3. Duplicate dan delay adalah normal.
4. Event contract adalah API antar service.
5. Observability wajib kuat.

## Queue vs Pub/Sub

Queue:

- biasanya satu pesan diproses satu consumer group lane.
- cocok untuk work distribution.

Pub/Sub:

- satu event bisa dikonsumsi banyak subscriber.
- cocok untuk fan-out notification.

## Kapan Gunakan Queue

- background jobs.
- task processing parallel.
- smoothing burst traffic.
- retry pipeline terkontrol.

## Kapan Gunakan Pub/Sub

- banyak bounded context butuh event yang sama.
- integrasi loosely coupled.
- audit/analytics pipeline terpisah.

## Event-Driven Flow Dasar

1. producer publish event.
2. broker menyimpan/mendistribusi.
3. consumer consume dan proses.
4. ack setelah sukses.

Kunci:

- ack timing.
- retry behavior.
- idempotency.

## Delivery Semantics

Umum:

- at-most-once.
- at-least-once.
- exactly-once (biasanya mahal/terbatas konteks).

Kebanyakan sistem praktis menggunakan at-least-once + idempotent consumer.

## Idempotent Consumer

Consumer harus aman terhadap pesan duplikat.
Teknik:

- dedup key.
- unique constraint.
- processed-event table.

## Ordering Concern

Tidak semua broker menjamin global order.
Jika order penting:

- partisi berdasarkan key.
- desain operasi tolerant terhadap reordering.

## Retry Strategy

Retry perlu:

- backoff.
- max attempts.
- klasifikasi error retriable/non-retriable.
- poison message handling.

## Dead Letter Queue

Pesan gagal berulang harus masuk DLQ.
DLQ bukan tempat buang selamanya:

- perlu observability.
- perlu workflow triage/reprocess.

## Contract Versioning

Event schema akan berubah.
Prinsip:

- backward-compatible evolution.
- consumer tolerant reader.
- schema registry/testing bila tersedia.

## Outbox Relationship

Jika event berasal dari perubahan DB, outbox pattern sering dibutuhkan untuk hindari dual-write inconsistency.

## Backpressure Management

Queue bisa menumpuk.
Butuh:

- consumer autoscaling terukur.
- concurrency limit.
- rate control producer bila perlu.

## Observability

Metric penting:

- queue depth.
- consumer lag.
- processing time.
- retry rate.
- DLQ volume.

## Security in Event Flow

- authN/authZ antar producer-consumer.
- encryption in transit.
- data minimization dalam event payload.
- tenant isolation bila multi-tenant.

## Anti-Pattern

### 1. Event tanpa kontrak jelas

Consumer mudah pecah.

### 2. Asumsi no-duplicate

Side effect ganda.

### 3. DLQ diabaikan

Data loss terselubung.

### 4. Pub/sub dipakai untuk request-response sinkron

Kompleksitas naik tanpa manfaat.

## Heuristik Senior

1. Pilih queue/pubsub berdasarkan pattern komunikasi.
2. Anggap duplicate dan delay sebagai baseline.
3. Bangun idempotency di consumer.
4. Definisikan schema contract secara eksplisit.
5. Pantau lag/retry/DLQ sejak hari pertama.
6. Sediakan tooling replay yang aman.
7. Jangan over-eventify domain tanpa kebutuhan jelas.

## Pertanyaan Interview

### Dasar

- Apa beda queue dan pub/sub?
- Kenapa idempotency penting di consumer?
- Apa fungsi DLQ?
- Kenapa event schema perlu versioning?

### Menengah

- Bagaimana menangani event duplicate?
- Bagaimana menjaga ordering saat dibutuhkan?
- Kapan event-driven lebih baik dari sync call?
- Bagaimana mencegah queue backlog kronis?

### Senior

- Bagaimana Anda merancang event-driven architecture yang dapat diaudit dan dipulihkan saat failure?
- Bagaimana Anda mengelola evolusi schema lintas banyak tim consumer?
- Bagaimana Anda menghindari distributed data inconsistency pada flow event?
- Bagaimana Anda menyeimbangkan decoupling dan operability di arsitektur berbasis event?

## Kasus Nyata

- order processed dua kali karena consumer tidak idempotent.
- event schema berubah, consumer lama crash.
- queue lag tinggi membuat SLA bisnis gagal.
- DLQ menumpuk berminggu-minggu tanpa ownership.

## Ringkasan Brutal

- Event-driven memberi fleksibilitas, tapi harga operasional tinggi.
- Queue/pub-sub bukan shortcut, melainkan kontrak plus disiplin.
- Tim senior membangun alur event yang bisa diamati, diulang, dan dipulihkan.

## Checklist

- Saya tahu kapan pakai queue vs pub/sub.
- Saya desain consumer idempotent.
- Saya punya strategi retry + DLQ.
- Saya punya observability lag/retry/dead-letter.
- Saya mengelola schema contract secara disiplin.

## Penutup

Event-driven yang sehat bukan yang paling banyak topic.
Ia yang paling jelas kontraknya dan paling siap saat terjadi failure nyata.
