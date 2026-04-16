# Rate Limiting dan Abuse Prevention

## Tujuan

Topik ini membahas cara menahan penyalahgunaan sistem tanpa merusak pengalaman user normal.

## Kenapa Penting

- Endpoint publik rentan brute force.
- Bot abuse bisa menghabiskan resource.
- Tanpa kontrol, biaya infra naik dan SLA turun.

## Model Mental

1. Abuse itu normal di sistem publik.
2. Rate limit melindungi availability dan security.
3. Rate limit harus kontekstual, bukan satu angka global.
4. Deteksi + respon lebih penting daripada blokir statis.
5. False positive harus dikelola.

## Tujuan Rate Limiting

- mencegah brute force.
- menahan scraping agresif.
- melindungi dependency downstream.
- menjaga fairness antar client.

## Dimensi Limit

Bisa per:

- IP.
- user id.
- API key.
- tenant.
- endpoint sensitif.

Kombinasi beberapa dimensi biasanya lebih aman.

## Algoritma Umum

- fixed window.
- sliding window.
- token bucket.
- leaky bucket.

Pilih berdasarkan pola trafik dan kebutuhan burst.

## Burst vs Sustained Limit

Sering perlu dua kontrol:

- izinkan burst kecil.
- batasi sustained abuse.

Tanpa ini, user normal bisa ikut terdampak.

## Endpoint Sensitif

Limit lebih ketat untuk:

- login.
- OTP verify.
- password reset.
- endpoint mahal (search berat/report).

## Response Semantics

Saat limit kena:

- status code tepat.
- pesan jelas.
- optional `Retry-After`.

Client butuh sinyal jelas agar retry tidak membabi buta.

## Distributed System Concern

Di arsitektur multi-instance:

- counter harus konsisten.
- state limit biasanya di store terpusat.
- per-instance local limit saja sering tidak cukup.

## Abuse Prevention Beyond Limit

Tambahan kontrol:

- CAPTCHA/adaptive challenge.
- device fingerprint heuristik.
- behavior anomaly detection.
- IP reputation.

Rate limit sendiri tidak menutup semua pola abuse.

## Graceful Degradation

Saat traffic ekstrem:

- prioritaskan endpoint kritis.
- turunkan service untuk fitur non-kritis.
- load shed yang terkontrol.

## Monitoring

Pantau:

- rate limit hit ratio.
- endpoint paling sering terkena limit.
- false positive indikasi.
- korelasi dengan error/saturation.

Tanpa monitoring, policy limit sulit dituning.

## False Positive Risk

Risiko:

- user legit terblokir.
- B2B client sah terhambat.

Mitigasi:

- per-segment policy.
- whitelist yang ketat dan diaudit.
- jalur eskalasi operasional.

## Anti-Pattern

### 1. Satu limit global untuk semua endpoint

Tidak realistis.

### 2. Limit tanpa observability

Sulit tuning.

### 3. Blokir permanen agresif

Merusak user experience.

### 4. Mengandalkan IP saja

Mudah diakali dan false positive tinggi.

## Heuristik Senior

1. Mulai dari endpoint paling berisiko.
2. Terapkan limit per identity + per resource.
3. Kombinasikan security dan availability objective.
4. Berikan feedback yang jelas saat throttled.
5. Pantau false positive dan sesuaikan policy.
6. Uji load + abuse scenario secara rutin.
7. Siapkan runbook saat terjadi abuse spike.

## Pertanyaan Interview

### Dasar

- Kenapa rate limiting penting?
- Apa beda throttling dan blocking?
- Endpoint mana yang harus lebih ketat?
- Kenapa `Retry-After` berguna?

### Menengah

- Bagaimana desain limit di sistem multi-instance?
- Kapan token bucket lebih cocok?
- Bagaimana menyeimbangkan keamanan dan UX?
- Bagaimana mendeteksi false positive?

### Senior

- Bagaimana Anda merancang abuse prevention strategy untuk API publik skala besar?
- Bagaimana policy rate limit berubah saat insiden active attack?
- Bagaimana Anda mengkomunikasikan dampak limit ke partner eksternal?
- Bagaimana Anda mengevaluasi efektivitas strategi anti-abuse secara kuantitatif?

## Kasus Nyata

- login endpoint diserang credential stuffing.
- API publik discrape oleh bot massif.
- endpoint reporting membuat DB jenuh saat dipanggil paralel.
- partner client meledakkan retry saat timeout.

## Ringkasan Brutal

- Rate limiting bukan aksesori.
- Ia kontrol inti availability dan security.
- Policy harus cerdas, terukur, dan adaptif.
- Tim senior merancang anti-abuse sebagai bagian arsitektur produk.

## Checklist

- Saya punya limit untuk endpoint sensitif.
- Saya punya limit berbasis identitas yang relevan.
- Saya punya observability untuk tuning.
- Saya siap menangani false positive.
- Saya punya runbook saat abuse spike.

## Penutup

Sistem tanpa abuse prevention akan dipakai normal oleh user legit dan dieksploitasi maksimal oleh attacker.
Anda harus siap untuk keduanya.
