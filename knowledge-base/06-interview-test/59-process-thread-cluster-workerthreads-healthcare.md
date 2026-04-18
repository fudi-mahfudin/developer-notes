# Q59 - Process vs Thread vs Cluster vs worker_threads

## Pertanyaan Interview

Jelaskan perbedaan process, thread, cluster, dan worker_threads di Node.js.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Process adalah unit isolasi OS dengan memory terpisah.
Thread adalah unit eksekusi di dalam process.
Di Node, `cluster` membuat beberapa process Node untuk memanfaatkan multi-core
di level service instance.
`worker_threads` membuat thread tambahan dalam satu process Node
untuk pekerjaan komputasi paralel.

Jika butuh isolasi kuat dan fault containment, process/cluster lebih aman.
Jika butuh komunikasi cepat antar unit compute dalam satu service,
worker_threads bisa lebih efisien.
Pemilihan bergantung pada reliability, memory overhead, dan model scaling." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan pilih cluster dibanding worker_threads?"
2. "Apa trade-off memory?"
3. "Bagaimana jika satu worker crash?"
4. "Bagaimana komunikasi antar unit?"
5. "Anti-pattern paling umum?"

### Jawaban Singkat untuk Follow-up

1) Cluster vs worker:
"Cluster untuk scale process-level; worker untuk compute parallel intra-process."

2) Trade-off memory:
"Process lebih boros memory; worker lebih hemat tapi isolasi lebih rendah."

3) Worker crash:
"Tangkap error, restart worker, dan pastikan job recoverable."

4) Komunikasi:
"Message passing; hindari shared mutable state."

5) Anti-pattern:
"Memilih model paralel tanpa benchmark kebutuhan nyata."

## Jawaban Ideal (Versi Singkat, Level Senior)

Pilihan arsitektur:
- process/cluster untuk resilience dan horizontal scaling
- worker_threads untuk CPU offload dalam service yang sama

Pastikan:
- failure handling jelas
- observability tersedia
- concurrency limit terkontrol

## Penjelasan Detail yang Dicari Interviewer

### 1) Karakteristik teknis

Process:
- isolasi kuat
- startup lebih berat
- memory lebih besar

worker_threads:
- lebih ringan
- berbagi process resource
- perlu disiplin sinkronisasi state

Cluster:
- multiprocess model untuk HTTP workload
- cocok untuk exploit multi-core di level aplikasi

### 2) Reliability considerations

- crash isolation lebih baik pada process
- backpressure harus ada di model apa pun
- job assignment perlu fair scheduling

### 3) Operasional

- deployment policy per mode
- autoscaling metric berbeda
- debugging multi-worker lebih kompleks

Mitigasi:
- standard logging context per worker/process
- health check granular
- restart strategy aman

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const executionModel = {
  webTrafficScale: "cluster",
  heavyCompute: "worker_threads",
};
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada sistem healthcare:
- ada API latency-sensitive
- ada proses data berat
- ada kebutuhan high availability

Memilih model paralel yang tepat mengurangi downtime
dan menjaga SLA layanan kritikal.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
semua task berat dan request web dicampur di process tunggal.
beban puncak membuat endpoint kritikal lambat.

Perbaikan:
- cluster untuk web traffic
- worker_threads terpisah untuk komputasi
- queue pengatur prioritas job

## Contoh Pola Kode yang Lebih Aman

```ts
type ParallelMode = "single-process" | "cluster" | "worker-threads";
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan definisi masing-masing mode.
- Menjelaskan trade-off isolasi vs efisiensi.
- Menjelaskan konteks pemilihan.
- Menyebut reliability/operasional.
- Relevan pada kebutuhan healthcare production.

## Ringkasan Final

Tidak ada mode paralel yang menang mutlak.
Process/cluster unggul di isolasi dan scaling trafik.
worker_threads unggul untuk offload komputasi dalam satu service.
Keputusan terbaik adalah kombinasi berbasis workload,
didukung observability dan failure recovery yang matang.
