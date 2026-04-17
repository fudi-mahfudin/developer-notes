# Q63 - Mengamankan API Node dari Abuse

## Pertanyaan Interview

Bagaimana mengamankan API Node.js dari abuse di production?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Mengamankan API dari abuse perlu kontrol berlapis:
authentication kuat, authorization ketat, rate limiting,
request validation, dan anomaly detection.
Saya selalu menganggap endpoint publik akan diuji batasnya:
spam request, brute-force, payload besar, dan scraping agresif.

Praktiknya:
pasang rate limit berbasis identitas dan IP,
batasi ukuran payload,
gunakan timeout dan circuit breaker,
serta audit log untuk pattern serangan.
Di healthcare, kontrol ini penting agar endpoint kritikal
tetap tersedia untuk user valid." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Rate limiting paling efektif seperti apa?"
2. "Bagaimana bedakan traffic normal vs abuse?"
3. "Apa peran WAF?"
4. "Bagaimana melindungi endpoint login?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Rate limiting efektif:
"Per route dan per identity, bukan global satu angka."

2) Bedakan traffic:
"Gunakan baseline metrik + deteksi anomali perilaku."

3) WAF:
"Layer tambahan, tapi bukan pengganti kontrol aplikasi."

4) Endpoint login:
"Rate limit ketat + lockout policy + MFA support."

5) Anti-pattern:
"Mengandalkan auth saja tanpa pembatasan request abuse."

## Jawaban Ideal (Versi Singkat, Level Senior)

Defence-in-depth API:
- authn/authz
- rate & quota
- schema validation
- timeout & resource guard
- monitoring & incident response

## Penjelasan Detail yang Dicari Interviewer

### 1) Tipe abuse yang umum

- brute-force credential
- scraping massal
- resource exhaustion (large payload, slowloris style)
- repeated retry flood

### 2) Kontrol teknis utama

- token bucket/leaky bucket limiter
- request body size limit
- connection/time budget
- denylist/allowlist adaptif

### 3) Operasional

- dashboard abuse signals
- alert berdasarkan SLO degradation
- runbook mitigasi cepat (temporary stricter limits)

Mitigasi:
- tuning per endpoint criticality
- fallback response cache
- isolate expensive endpoints

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const securityPolicy = {
  rateLimitPerMinute: 120,
  maxBodyKb: 256,
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Healthcare API melayani alur sensitif dan time-critical.
Abuse yang tidak terkendali bisa:
- menurunkan availability
- menghambat operasional tim
- mempengaruhi kualitas layanan ke pengguna akhir

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
endpoint pencarian tanpa limit diserang scraping berat.
CPU naik, endpoint transaksi ikut lambat.

Perbaikan:
- rate limit khusus endpoint pencarian
- cache hasil populer
- proteksi auth scope dan audit scraping

## Contoh Pola Kode yang Lebih Aman

```ts
type AbuseControl = {
  route: string;
  perIdentityLimit: number;
  burstLimit: number;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan abuse model nyata.
- Menjelaskan rate limiting yang benar.
- Menjelaskan validation + resource guard.
- Menjelaskan observability + response.
- Relevan untuk availability healthcare API.

## Ringkasan Final

API security dari abuse bukan satu fitur, tapi sistem kontrol berlapis.
Tujuannya menjaga endpoint tetap usable untuk traffic valid.
Pendekatan senior menggabungkan prevention, detection, dan response
dengan tuning berdasarkan kritikalitas bisnis.
