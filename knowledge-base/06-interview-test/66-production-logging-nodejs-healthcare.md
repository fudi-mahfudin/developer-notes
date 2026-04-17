# Q66 - Logging Production di Node.js

## Pertanyaan Interview

Bagaimana mendesain logging production Node.js yang benar-benar berguna?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Logging production harus terstruktur, konsisten, dan minim noise.
Saya selalu pakai structured logs (JSON), level log yang jelas,
dan correlation ID supaya satu request bisa ditelusuri lintas service.

Prinsip utama:
log untuk keputusan operasional, bukan sekadar print debug.
Info sensitif wajib di-mask.
Error log harus punya context: route, tenant, request id, release version.
Di sistem healthcare, logging yang rapi mempercepat incident response
tanpa melanggar kebijakan data sensitif." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa beda log aplikasi dan audit log?"
2. "Bagaimana menghindari log noise?"
3. "Apa yang wajib ada di setiap log entry?"
4. "Bagaimana menangani PII di log?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) App log vs audit log:
"App log untuk operasi teknis, audit log untuk jejak aktivitas kepatuhan."

2) Hindari noise:
"Gunakan level policy dan sampling untuk event sangat sering."

3) Wajib ada:
"timestamp, level, message, service, correlationId."

4) PII handling:
"Masking/redaction di logger middleware."

5) Anti-pattern:
"Dump object mentah besar tanpa struktur."

## Jawaban Ideal (Versi Singkat, Level Senior)

Logging matang mencakup:
- structured format
- correlation
- security redaction
- retention policy
- queryability untuk incident

## Penjelasan Detail yang Dicari Interviewer

### 1) Elemen desain logging

- schema log standar lintas service
- level: debug/info/warn/error/fatal
- context propagation
- sink terpusat (ELK, Loki, dsb.)

### 2) Operasional

- alert berbasis log patterns
- dashboard per error class
- log retention berdasar regulasi dan biaya

### 3) Keamanan data

- jangan log token/password
- redaction fields sensitif
- akses ke log dibatasi role

Mitigasi:
- linting rule larangan log raw secrets
- test redaction di pipeline CI
- periodic log review

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const logEvent = {
  level: "error",
  msg: "payment callback failed",
  correlationId: "req-123",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam healthcare:
- troubleshooting harus cepat
- data sensitif harus tetap aman
- audit kebutuhan compliance tinggi

Logging berkualitas tinggi mengurangi MTTR
dan menurunkan risiko kebocoran informasi.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
service gagal sinkronisasi, tapi log tidak punya correlation id.
tim butuh waktu lama melacak root cause.

Perbaikan:
- standardisasi correlation propagation
- enforce log schema lintas service

## Contoh Pola Kode yang Lebih Aman

```ts
type LogContext = {
  correlationId: string;
  service: string;
  release: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan structured logging.
- Menjelaskan correlation ID.
- Menjelaskan redaction data sensitif.
- Menjelaskan operasi alert/query.
- Relevan untuk compliance healthcare.

## Ringkasan Final

Logging production yang baik adalah alat observability dan auditability.
Ia harus terstruktur, aman, dan bisa ditindaklanjuti.
Di Node.js production, kualitas logging sangat menentukan
kecepatan pemulihan saat incident dan kualitas operasi harian.
