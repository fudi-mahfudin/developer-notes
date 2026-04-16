# High-Level Design dan Pemilihan Komponen

## Tujuan

Topik ini membahas cara membentuk desain level atas yang jelas sebelum tenggelam di detail implementasi.

## Kenapa Penting

- Banyak kegagalan proyek berasal dari batas komponen kabur.
- Komponen salah pilih membuat kompleksitas operasional meledak.
- HLD yang baik mempercepat alignment lintas tim.

## Model Mental

1. Mulai dari alur data utama.
2. Pilih komponen sesuai requirement, bukan tren.
3. Definisikan batas tanggung jawab komponen.
4. Identifikasi failure path sejak awal.
5. Visualisasi dependency secara eksplisit.

## Elemen High-Level Design

- context sistem.
- komponen inti.
- alur request/read/write.
- storage utama.
- integrasi eksternal.
- non-functional control points.

## Pemilihan Komponen

Komponen umum:

- API/service layer.
- database.
- cache.
- message broker.
- search index.
- object storage.

## Kriteria Pemilihan

- cocok dengan workload.
- maturity tool.
- skill tim.
- operability.
- cost.
- lock-in risk.

## Dependency Mapping

Setiap komponen harus dipetakan:

- input/output.
- SLA dependency.
- failure mode.
- fallback plan.

## Stateful vs Stateless

Tentukan komponen mana stateful.
Stateful berarti:

- scaling lebih sulit.
- recovery strategy wajib jelas.

## Data Flow

Gambar aliran:

- write path.
- read path.
- event path.
- retry path.

Tanpa ini, blind spot arsitektur biasanya lolos.

## Single Responsibility of Components

Hindari komponen "god service".
Komponen terlalu banyak peran meningkatkan coupling dan risiko deploy.

## Consistency Boundary

Tentukan di mana konsistensi kuat dibutuhkan, dan di mana eventual acceptable.
Ini mengarahkan pilihan DB, queue, dan cache pattern.

## Performance Control Points

Di HLD, tentukan:

- caching points.
- batching points.
- async boundary.
- timeout budget boundary.

## Security Control Points

Pastikan terlihat:

- authn/authz enforcement.
- secret boundary.
- PII flow.
- audit logging points.

## Observability by Design

Desain harus menyebut:

- tracing boundary.
- metrics critical path.
- alert ownership.

## Trade-off Dokumentasi

Tuliskan kenapa komponen dipilih dan apa konsekuensinya.
Ini mencegah keputusan jadi "folklore" tim lama.

## Anti-Pattern

### 1. Diagram Cantik tanpa Alur Failure

Tidak berguna saat insiden.

### 2. Pilih Komponen Berdasar Hype

Biaya operasional tak terkendali.

### 3. Batas Komponen Kabur

Ownership sulit.

### 4. Non-functional Dianggap Nanti

Refactor mahal di belakang.

## Heuristik Senior

1. Gambar jalur kritis dulu.
2. Minimalkan jumlah komponen pada fase awal.
3. Pilih komponen yang tim mampu operasikan.
4. Explicitkan asumsi failure.
5. Pastikan security dan observability tampak di HLD.
6. Tulis trade-off, bukan hanya keputusan.
7. Revisi HLD saat data produksi menunjukkan asumsi salah.

## Pertanyaan Interview

### Dasar

- Apa itu high-level design?
- Kenapa pemilihan komponen penting?
- Kapan cache dibutuhkan?
- Kenapa ownership komponen harus jelas?

### Menengah

- Bagaimana memilih antara DB relasional vs non-relasional di HLD?
- Bagaimana memetakan failure mode per komponen?
- Kapan menambahkan message queue?
- Bagaimana menyeimbangkan simplicity vs scalability?

### Senior

- Bagaimana Anda memfasilitasi review HLD lintas tim agar cepat namun berkualitas?
- Bagaimana Anda memutuskan kapan komponen baru benar-benar diperlukan?
- Bagaimana Anda menilai kesiapan operasional sebelum adopsi komponen kompleks?
- Bagaimana Anda merancang HLD yang evolvable tanpa rewrite besar?

## Kasus Nyata

- arsitektur over-komponen menambah latency dan biaya.
- service boundary salah membuat deadlock ownership.
- sistem sulit di-debug karena observability tidak didesain dari awal.
- failure dependency merembet karena tidak ada isolation design.

## Ringkasan Brutal

- HLD bukan dokumen formalitas.
- Ia alat untuk menghindari keputusan mahal yang salah.
- Tim senior memilih komponen seperlunya dengan alasan eksplisit.

## Checklist

- Jalur data utama sudah jelas.
- Komponen dipilih berdasarkan requirement.
- Failure/security/observability terlihat di desain.
- Trade-off terdokumentasi.
- Ownership komponen jelas.

## Penutup

High-level design yang baik tidak mencoba menebak semua detail.
Ia memastikan fondasi keputusan besar tidak salah arah.

## Lampiran Praktis

Saat menyusun HLD, gunakan checklist tambahan berikut:

- dependency kritis mana yang belum punya fallback?
- komponen mana yang paling mahal dioperasikan?
- komponen mana yang paling sulit dimonitor?
- asumsi latency mana yang paling lemah buktinya?
- domain mana yang paling mungkin berubah 6 bulan ke depan?

Checklist ini membantu menghindari blind spot sebelum desain diimplementasikan.
