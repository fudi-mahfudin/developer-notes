# Q58 - Menangani CPU-Intensive Task di Backend Node

## Pertanyaan Interview

Bagaimana menangani task CPU-intensive di backend Node.js?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Node.js unggul untuk I/O-bound, jadi CPU-intensive task perlu strategi khusus.
Kalau task berat dijalankan di event loop utama, latency endpoint lain ikut naik.
Solusi praktis: offload ke `worker_threads`, proses terpisah, atau job queue.

Saya biasanya pisahkan jalur:
request API tetap ringan,
task berat diproses async dengan progress status.
Untuk kebutuhan throughput tinggi, saya benchmark:
worker_threads vs service terpisah.
Di healthcare, pendekatan ini mencegah gangguan ke alur transaksi utama." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan pilih worker_threads?"
2. "Kapan harus pakai service terpisah?"
3. "Bagaimana monitor dampak CPU?"
4. "Bagaimana fallback kalau worker gagal?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) worker_threads:
"Saat masih satu domain service dan butuh shared deployment."

2) Service terpisah:
"Saat beban sangat tinggi atau lifecycle scaling berbeda."

3) Monitoring:
"Pantau event loop lag, CPU usage, queue latency."

4) Fallback:
"Retry terbatas + dead-letter + status error yang jelas."

5) Anti-pattern:
"Task berat sinkron di endpoint request utama."

## Jawaban Ideal (Versi Singkat, Level Senior)

Prinsip:
- lindungi event loop utama
- isolate heavy compute
- gunakan async workflow
- ukur before-after dengan metrik nyata

## Penjelasan Detail yang Dicari Interviewer

### 1) Dampak CPU-heavy pada Node

- event loop tertahan
- response time melonjak
- timeout meningkat
- pengalaman user memburuk

### 2) Opsi arsitektur

- `worker_threads` untuk parallel compute intra-service
- child process untuk isolasi memory/runtime
- queue + worker service untuk skalabilitas horizontal

### 3) Operasional dan reliability

- concurrency limit di worker
- circuit breaker untuk job submission
- backpressure saat antrean panjang

Mitigasi:
- prioritasi job
- timeouts per task
- observability per queue stage

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const heavyTaskPolicy = {
  runInRequestThread: false,
  executionMode: "worker",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Healthcare backend sering memproses:
- transform data besar
- kalkulasi rule kompleks
- sinkronisasi lintas sistem

Jika task berat tidak diisolasi,
endpoint kritikal (order/status) bisa ikut lambat.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
ekspor laporan besar dieksekusi langsung di endpoint.
selama proses, API transaksi lain timeout.

Perbaikan:
- pindah ekspor ke async queue
- endpoint hanya mengembalikan jobId
- client polling status job

## Contoh Pola Kode yang Lebih Aman

```ts
type HeavyTaskRequest = {
  jobType: string;
  priority: "high" | "normal" | "low";
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan kenapa event loop harus dilindungi.
- Menyebut opsi worker/process/queue.
- Menyebut monitoring dan backpressure.
- Menyebut trade-off operasional.
- Relevan dengan workload healthcare.

## Ringkasan Final

CPU-intensive task di Node harus dipisahkan dari request path utama.
Arsitektur yang benar menjaga latency endpoint tetap stabil.
Pendekatan senior adalah menggabungkan isolasi compute,
queue control, dan observability agar skala tetap aman.
