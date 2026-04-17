# Q27 - Kapan Perlu Worker Thread / Web Worker

## Pertanyaan Interview

Kapan perlu worker thread / web worker?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Worker dipakai ketika pekerjaan CPU-intensive berisiko memblokir main thread.
Di browser, gunakan Web Worker untuk menjaga UI tetap responsif.
Di Node.js, gunakan worker_threads untuk pekerjaan komputasi berat agar event loop
tetap fokus pada I/O request.

Saya tidak pakai worker untuk semua hal karena ada biaya serialisasi data,
kompleksitas komunikasi, dan overhead lifecycle. Rule praktis:
jika bottleneck terbukti CPU-bound dan berdampak ke latency, worker jadi kandidat kuat." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Bagaimana membedakan CPU-bound vs I/O-bound?"
2. "Apa overhead worker?"
3. "Kapan pakai process/queue dibanding worker thread?"
4. "Bagaimana monitoring worker?"
5. "Apa anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Bedakan bottleneck:
"Profiling: CPU tinggi + event loop lag biasanya CPU-bound."

2) Overhead:
"Spawn cost, memory tambahan, dan data transfer/serialization."

3) Process/queue:
"Untuk isolasi kuat atau workload lintas mesin."

4) Monitoring:
"Pantau throughput, queue depth, crash rate, dan processing latency."

5) Anti-pattern:
"Memindahkan task ringan ke worker tanpa analisis cost-benefit."

## Jawaban Ideal (Versi Singkat, Level Senior)

Gunakan worker jika:
- operasi CPU berat (enkripsi, parsing besar, transform kompleks)
- blocking berdampak ke UX/latency
- paralelisasi terukur memberi keuntungan nyata

Jangan gunakan jika:
- task dominan I/O
- overhead komunikasi lebih besar dari manfaat

## Penjelasan Detail yang Dicari Interviewer

### 1) Evaluasi kebutuhan

- ambil baseline latency/event loop delay
- jalankan profiling CPU flamegraph
- uji PoC worker dengan workload representatif

### 2) Trade-off

Kelebihan:
- responsivitas main thread terjaga
- throughput CPU task meningkat

Kekurangan:
- kompleksitas orchestration
- memory footprint naik
- error handling lintas thread lebih rumit

### 3) Anti-pattern umum

- worker pool tanpa backpressure
- payload transfer terlalu besar per message
- tidak ada restart strategy saat worker crash

Mitigasi:
- bounded queue
- chunking payload
- health checks + supervisor policy

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// Node worker_threads (pseudo)
const { Worker } = require("node:worker_threads");
const worker = new Worker("./heavy-task-worker.js");
worker.postMessage({ jobId: "tx-01" });
worker.on("message", (result) => console.log(result));
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada sistem healthcare:
- jam sibuk menghasilkan volume data besar
- request response tetap harus cepat
- komputasi berat (rekonsiliasi/agregasi) sering diperlukan

Worker membantu memisahkan jalur komputasi dan jalur transaksi real-time.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
service melakukan transform data besar sinkron di thread utama.
latency API naik drastis, timeout meningkat, dan antrean integrasi menumpuk.

Perbaikan:
- pindah transform CPU-heavy ke worker
- pertahankan API utama untuk I/O ringan
- monitor queue backlog worker

## Contoh Pola Kode yang Lebih Aman

```ts
async function processHeavyJob(input: unknown) {
  return workerPool.execute("reconcile", input);
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan kapan worker benar-benar diperlukan.
- Menyebut overhead dan trade-off nyata.
- Menjelaskan evaluasi berbasis profiling.
- Menyebut backpressure dan restart strategy.
- Relevan dengan latency kritikal healthcare.

## Ringkasan Final

Worker adalah alat untuk mengatasi bottleneck CPU, bukan default architecture.
Keputusan harus berbasis data profiling, bukan asumsi.
Di domain healthcare, penggunaan worker yang tepat menjaga performa
tanpa mengorbankan stabilitas layanan utama.
