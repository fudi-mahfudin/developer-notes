# Q22 - Retry dengan Exponential Backoff Tanpa Retry Storm

## Pertanyaan Interview

Bagaimana kamu melakukan retry dengan exponential backoff tanpa bikin retry storm?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Retry harus selektif. Tidak semua error layak di-retry.
Saya klasifikasikan error dulu: transient boleh retry, permanent jangan.
Lalu pakai exponential backoff + jitter untuk menyebar request dan menghindari
thundering herd. Saya juga pasang max attempts, timeout per request, dan circuit breaker
saat dependency sedang sakit.

Di healthcare production, retry storm bisa lebih berbahaya dari error awal,
karena menambah beban layanan eksternal dan memperparah keterlambatan sinkronisasi.
Jadi prinsipnya: retry cerdas, terbatas, dan terukur." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Error apa yang tidak boleh di-retry?"
2. "Kenapa wajib pakai jitter?"
3. "Berapa max retry yang ideal?"
4. "Bagaimana hubungan retry dengan idempotency?"
5. "Bagaimana monitor retry behavior?"

### Jawaban Singkat untuk Follow-up

1) Tidak boleh retry:
"Validation/auth/business rule error yang sifatnya permanent."

2) Jitter:
"Mencegah semua client retry pada waktu yang sama."

3) Max retry:
"Kontekstual, biasanya kecil (3-5) dengan batas waktu total jelas."

4) Idempotency:
"Wajib agar retry tidak menyebabkan duplikasi side effect."

5) Monitoring:
"Pantau retry count, success-after-retry ratio, dan dependency error rate."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pilar retry aman:
- error classification
- capped exponential backoff
- jitter
- idempotency key
- observability metric

Retry storm terjadi saat:
- semua permintaan retry serempak
- retry tanpa batas
- retry pada error yang tidak recoverable

## Penjelasan Detail yang Dicari Interviewer

### 1) Error taxonomy

- transient: timeout, 502, 503 -> retryable
- throttling: 429 -> retry dengan delay sesuai policy
- permanent: 400 domain validation -> no retry

### 2) Backoff policy

Contoh:
delay = min(base * 2^attempt, maxDelay) + jitterRandom

Tujuan:
- memberi waktu dependency recover
- menurunkan pressure saat outage

### 3) Anti-pattern umum

- retry semua status code
- retry infinite loop
- tidak menghormati rate limit header

Mitigasi:
- retry budget
- circuit breaker
- queue with controlled throughput

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
async function retryWithBackoff(fn, max = 4, base = 200) {
  for (let attempt = 0; attempt <= max; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === max || !isRetryable(err)) throw err;
      const jitter = Math.floor(Math.random() * 100);
      const delay = Math.min(base * 2 ** attempt, 3000) + jitter;
      await sleep(delay);
    }
  }
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di integrasi hospital-WMS:
- dependency eksternal kadang tidak stabil
- backlog bisa cepat naik saat jam sibuk
- data transaksi tetap harus akurat

Retry yang salah bisa menciptakan antrean besar dan latency ekstrem.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
WMS mengalami gangguan 2 menit.
Semua worker retry setiap 200ms tanpa backoff.
Akibatnya gateway overload, recovery makin lambat, antrean job melonjak.

Perbaikan:
- exponential backoff + jitter
- stop retry setelah batas
- kirim ke DLQ jika gagal berulang

## Contoh Pola Kode yang Lebih Aman

```ts
async function syncWithPolicy(txId: string) {
  return retryWithPolicy(
    () => sendToWms(txId),
    { maxAttempts: 4, baseDelayMs: 200, maxDelayMs: 3000, jitter: true },
  );
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan retryable vs non-retryable errors.
- Menjelaskan exponential backoff + jitter.
- Menyebut retry cap dan idempotency.
- Menyentuh circuit breaker / rate limit.
- Relevan dengan outage scenario healthcare.

## Ringkasan Final

Retry itu alat pemulihan, bukan reflex default.
Tanpa kontrol, retry bisa berubah jadi retry storm yang merusak sistem.
Dengan policy yang disiplin, sistem healthcare tetap resilien
tanpa membebani dependency secara berlebihan.
