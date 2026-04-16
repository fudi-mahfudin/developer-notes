# Requirement Clarification dan Estimasi Beban

## Tujuan

Topik ini memastikan desain sistem dimulai dari masalah yang benar, bukan asumsi teknis.

## Kenapa Penting

- Desain bagus bisa gagal jika requirement salah.
- Estimasi beban menentukan batas teknis realistis.
- Banyak overengineering berasal dari requirement kabur.

## Model Mental

1. Jelaskan tujuan bisnis dulu.
2. Definisikan constraint eksplisit.
3. Quantify load expectation.
4. Prioritaskan use case kritis.
5. Sepakati trade-off sejak awal.

## Klarifikasi Requirement

Pertanyaan wajib:

- siapa user utama?
- flow paling kritis apa?
- target latency berapa?
- target availability berapa?
- data mana paling sensitif?
- growth expectation berapa?

## Functional vs Non-Functional

Functional:

- fitur apa yang harus dilakukan sistem.

Non-functional:

- performa.
- reliability.
- security.
- compliance.
- cost limit.

## Definisi Sukses

Sebelum desain:

- metrik sukses bisnis.
- SLO teknis minimum.
- batas biaya operasional.

Tanpa ini, keputusan arsitektur jadi debat subjektif.

## Load Estimation Dasar

Hitung minimal:

- DAU/MAU.
- peak RPS.
- read/write ratio.
- ukuran payload.
- growth rate.

## Peak dan Burst

Average tidak cukup.
Anda perlu:

- peak harian.
- peak musiman.
- burst sesaat.

## Workload Pattern

- read-heavy atau write-heavy?
- sync atau async?
- hot key atau distribusi rata?
- request kecil sering atau request besar jarang?

Pattern ini memengaruhi semua desain lanjut.

## Capacity Back-of-Envelope

Contoh komponen hitung:

- request per detik.
- service time rata-rata.
- concurrent inflight.
- outbound dependency QPS.
- storage growth per bulan.

## Data Retention Requirement

Pertanyaan:

- berapa lama data disimpan?
- archive policy?
- legal retention?

Ini mempengaruhi storage design, cost, dan query strategy.

## Availability Requirement

Perlu jelas:

- SLA bisnis.
- toleransi downtime.
- RTO/RPO jika relevan.

Tanpa ini, Anda tidak bisa memilih redundancy level yang tepat.

## Consistency Expectation

Tidak semua data butuh strong consistency.
Tentukan:

- mana yang wajib strong.
- mana yang boleh eventual.

## Failure Scenario Clarification

Bahas sejak awal:

- dependency down bagaimana?
- partial failure bagaimana?
- timeout/retry policy baseline?

## Security Requirement

Klarifikasi:

- data klasifikasi.
- authz model.
- audit requirement.
- regional data constraint.

## Observability Requirement

Harus jelas:

- metrik apa penting.
- alert threshold utama.
- tracing kebutuhan minimal.

## Cost Constraint

Desain harus sadar:

- budget infrastruktur.
- budget operasional.
- skill tim untuk mengelola solusi.

## Requirement Drift

Requirement akan berubah.
Catat asumsi awal dan validasi berkala agar desain tetap relevan.

## Anti-Pattern

### 1. Langsung Pilih Teknologi

Sebelum requirement jelas.

### 2. Menggunakan Angka Tebakan Tanpa Sumber

Mendorong desain salah.

### 3. Fokus ke Average Load Saja

Peak failure tak terduga.

### 4. Tidak Menulis Asumsi

Sulit evaluasi saat realita berubah.

## Heuristik Senior

1. Paksa requirement menjadi angka.
2. Tulis asumsi dan sumbernya.
3. Bedakan must-have vs nice-to-have.
4. Uji requirement dengan failure scenario.
5. Kaitkan NFR dengan keputusan arsitektur.
6. Review ulang estimasi setelah data real masuk.
7. Jangan desain "sempurna", desain yang sesuai konteks.

## Pertanyaan Interview

### Dasar

- Kenapa requirement clarification penting?
- Apa itu non-functional requirement?
- Kenapa peak load lebih penting dari average?
- Apa risiko asumsi load salah?

### Menengah

- Bagaimana membuat estimasi load awal jika data historis minim?
- Bagaimana menentukan target latency yang realistis?
- Bagaimana memprioritaskan requirement saat saling konflik?
- Apa metrik minimum untuk memvalidasi asumsi awal?

### Senior

- Bagaimana Anda memfasilitasi requirement clarification lintas produk-bisnis-engineering?
- Bagaimana Anda menghindari overengineering pada fase awal?
- Bagaimana Anda mengubah requirement kabur menjadi design decision yang terukur?
- Bagaimana Anda mengelola perubahan requirement tanpa rewrite total?

## Kasus Nyata

- sistem dirancang microservices padahal load kecil.
- database jenuh karena write ratio diremehkan.
- biaya cloud membengkak karena retention tidak jelas.
- SLA gagal karena tidak pernah didefinisikan realistis.

## Ringkasan Brutal

- Arsitektur baik dimulai dari requirement yang jelas.
- Estimasi beban bukan formalitas, tapi fondasi kapasitas.
- Tim senior memaksa percakapan abstrak menjadi angka dan trade-off nyata.

## Checklist

- Requirement bisnis dan teknis saya eksplisit.
- Peak/burst load sudah diestimasi.
- Asumsi saya terdokumentasi.
- SLO dan cost boundary jelas.
- Ada rencana validasi asumsi pasca-go-live.

## Penutup

Desain terbaik untuk masalah yang salah tetaplah desain gagal.
Mulai dari klarifikasi requirement dan estimasi beban yang jujur.
