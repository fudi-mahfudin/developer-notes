# Q79 - Fallback Saat Dependency Eksternal Down

## Pertanyaan Interview

Bagaimana merancang fallback saat dependency eksternal sedang down?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Fallback yang baik dimulai dari klasifikasi dependency:
mana yang critical-blocking dan mana yang bisa degraded mode.
Saat dependency down, sistem tidak boleh collapse total.

Saya biasanya pakai kombinasi:
timeout ketat, circuit breaker, retry terkendali, dan fallback response.
Untuk alur kritikal, status harus transparan ke user, bukan seolah sukses.
Selain itu, harus ada queue/reconciliation jika transaksi perlu dipulihkan.
Di healthcare, fallback yang jelas mencegah kebingungan operasional
saat sistem pihak ketiga bermasalah." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan fallback diperbolehkan?"
2. "Bagaimana membedakan fail fast vs retry?"
3. "Apa peran circuit breaker?"
4. "Bagaimana menjaga data consistency setelah dependency pulih?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Fallback diperbolehkan:
"Saat bisnis menerima degraded behavior yang terdokumentasi."

2) Fail fast vs retry:
"Retry untuk error transient; fail fast jika dependency jelas unhealthy."

3) Circuit breaker:
"Mencegah request storm ke service yang sedang down."

4) Setelah pulih:
"Gunakan reconciliation job dan idempotent replay."

5) Anti-pattern:
"Retry tanpa batas yang memperburuk outage."

## Jawaban Ideal (Versi Singkat, Level Senior)

Resilience pattern:
- timeout budget
- circuit breaker
- limited retry with jitter
- graceful degradation
- reconciliation path

## Penjelasan Detail yang Dicari Interviewer

### 1) Desain fallback by criticality

- critical path: explicit failure + operational action
- non-critical path: cached/stale response atau delayed processing

### 2) Kontrol runtime

- health check dependency eksternal
- backoff terkoordinasi
- per-route resilience policy

### 3) Operasional saat incident

- alert cepat dengan context dependency
- status page internal
- runbook switching mode

Mitigasi:
- chaos testing dependency outage
- synthetic monitoring third-party endpoints
- fallback path integration tests

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const fallbackPolicy = {
  timeoutMs: 1500,
  retries: 2,
  useCircuitBreaker: true,
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Banyak proses healthcare tergantung sistem eksternal.
Saat dependency down, layanan internal tetap harus memberi status yang benar
agar tim operasional bisa mengambil langkah tepat.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
gateway eksternal timeout, service internal retry agresif.
antrian request meledak dan melumpuhkan endpoint lain.

Perbaikan:
- aktifkan circuit breaker
- kurangi retry + tambah jitter
- tampilkan status "pending external confirmation"

## Contoh Pola Kode yang Lebih Aman

```ts
type DependencyFallback = {
  dependencyName: string;
  degradedModeEnabled: boolean;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan fallback berdasarkan criticality.
- Menjelaskan timeout/retry/circuit breaker.
- Menjelaskan transparansi status ke user.
- Menjelaskan reconciliation pasca pemulihan.
- Relevan pada operasi healthcare.

## Ringkasan Final

Fallback bukan sekadar return default value.
Ia adalah strategi ketahanan sistem saat dependency gagal.
Dengan desain resilience yang tepat,
sistem tetap stabil dan operasional tetap bisa berjalan
meskipun pihak eksternal sedang bermasalah.
