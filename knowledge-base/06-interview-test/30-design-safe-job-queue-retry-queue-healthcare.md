# Q30 - Mendesain Job Queue / Retry Queue yang Aman di Node.js

## Pertanyaan Interview

Bagaimana kamu mendesain job queue/retry queue yang aman di Node.js?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Queue yang aman harus punya delivery contract jelas: at-least-once biasanya realistis,
jadi idempotency wajib. Saya desain dengan komponen utama: retry policy bertingkat,
dead-letter queue, visibility timeout, dan observability per job.

Setiap job harus punya status lifecycle: queued, processing, success, failed, dead-letter.
Retry hanya untuk transient error, dengan backoff dan jitter.
Di healthcare, desain ini penting karena kita tidak boleh kehilangan transaksi,
tapi juga tidak boleh memproses duplikasi tanpa kontrol." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "At-least-once vs exactly-once, pilih mana?"
2. "Kapan job masuk DLQ?"
3. "Bagaimana cegah duplicate processing?"
4. "Bagaimana menentukan concurrency worker?"
5. "Metrik queue apa yang wajib dipantau?"

### Jawaban Singkat untuk Follow-up

1) Pilih mana:
"Praktisnya at-least-once + idempotency; exactly-once mahal dan kompleks."

2) DLQ:
"Saat retry melewati limit atau error permanent."

3) Cegah duplikasi:
"Idempotency key + dedup store + state guard."

4) Concurrency:
"Sesuaikan kapasitas dependency downstream dan SLA."

5) Metrik wajib:
"queue depth, processing latency, retry rate, DLQ rate, success ratio."

## Jawaban Ideal (Versi Singkat, Level Senior)

Prinsip queue aman:
- reliability (tidak hilang)
- controlled retry (tidak storm)
- idempotent processing
- observability end-to-end

Komponen wajib:
- producer validation
- worker with retry classification
- DLQ handler
- dashboard + alert

## Penjelasan Detail yang Dicari Interviewer

### 1) Alur lifecycle job

1. enqueue validated payload
2. worker pick + lock/visibility timeout
3. process + ack success
4. jika gagal transient -> reschedule retry
5. jika gagal permanent/exceed max -> DLQ

### 2) Anti-pattern umum

- retry tanpa backoff
- no idempotency
- no timeout per job
- no dead-letter path

Mitigasi:
- retry budget
- status machine tegas
- per-job trace id

### 3) Recovery strategy

- re-drive DLQ terkontrol
- manual review untuk error bisnis
- replay aman dengan idempotency token

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
async function handleJob(job) {
  try {
    await processJob(job);
    await ack(job.id);
  } catch (err) {
    if (isRetryable(err) && job.attempt < MAX_RETRY) {
      await requeueWithBackoff(job);
    } else {
      await moveToDlq(job, err);
    }
  }
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada integrasi healthcare:
- transaksi tidak boleh hilang
- throughput harus stabil saat peak
- error harus dapat ditelusuri dan direkonsiliasi

Queue yang buruk bisa membuat status operasional tidak akurat.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
retry queue tidak punya max attempts.
saat dependency down, job berputar tanpa akhir dan memonopoli worker.
job baru tertahan dan SLA terganggu.

Perbaikan:
- tambah max retry + DLQ
- pisahkan priority queue
- alert saat retry ratio melewati ambang

## Contoh Pola Kode yang Lebih Aman

```ts
type JobState = "QUEUED" | "PROCESSING" | "SUCCESS" | "FAILED" | "DLQ";

interface JobRecord {
  id: string;
  state: JobState;
  attempt: number;
  idempotencyKey: string;
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan contract delivery realistis.
- Menyebut idempotency, backoff, DLQ.
- Menjelaskan lifecycle state job.
- Menyebut metrik operasional queue.
- Relevan untuk integrasi healthcare kritikal.

## Ringkasan Final

Queue aman bukan sekadar antrean, tapi sistem kontrol reliability.
Kombinasi retry terukur, idempotency, dan DLQ adalah fondasi utamanya.
Di lingkungan healthcare, desain ini menjaga transaksi tetap terproses,
terlacak, dan dapat dipulihkan tanpa merusak konsistensi data.
