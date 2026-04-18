# Q28 - Mengukur Bottleneck CPU-bound vs I/O-bound di Aplikasi JS

## Pertanyaan Interview

Bagaimana kamu mengukur bottleneck CPU-bound vs I/O-bound di aplikasi JS?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Saya mulai dari data observability: latency endpoint, CPU usage, event loop delay,
dan dependency timing. Jika CPU tinggi, event loop lag naik, dan waktu habis di compute,
itu indikasi CPU-bound. Jika CPU rendah tapi waktu habis menunggu DB/API/network,
itu cenderung I/O-bound.

Di Node.js, saya pakai profiling (flamegraph), APM traces, dan breakdown per stage.
Di healthcare production, klasifikasi ini penting karena strategi optimasinya beda total:
CPU-bound diarahkan ke worker/algoritma, I/O-bound ke query tuning, caching, atau concurrency." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Metrik awal apa yang paling cepat dilihat?"
2. "Apa tanda event loop terblokir?"
3. "Bagaimana bedakan slow DB vs slow external API?"
4. "Kapan optimasi kode tidak cukup?"
5. "Bagaimana validasi hasil optimasi?"

### Jawaban Singkat untuk Follow-up

1) Metrik cepat:
"CPU, p95 latency, event loop lag, dan APM span breakdown."

2) Event loop block:
"Lag tinggi, timer terlambat, throughput drop meski request masuk stabil."

3) DB vs API:
"Bandingkan trace span per dependency dan error/timeout pattern."

4) Kode tidak cukup:
"Saat bottleneck ada di infrastruktur/dependency eksternal."

5) Validasi:
"Uji sebelum-sesudah dengan workload serupa dan metrik konsisten."

## Jawaban Ideal (Versi Singkat, Level Senior)

Langkah diagnosis:
1. ukur gejala (latency, error, throughput)
2. ukur resource (CPU, memory, event loop delay)
3. trace dependency (DB/API/cache)
4. profiling hotspot code
5. uji hipotesis dengan perubahan kecil

## Penjelasan Detail yang Dicari Interviewer

### 1) Pola CPU-bound

- CPU utilization tinggi stabil
- event loop delay meningkat
- response time naik meski dependency cepat

### 2) Pola I/O-bound

- CPU relatif rendah
- banyak waktu di wait state
- APM menunjukkan span DB/API dominan

### 3) Anti-pattern umum

- optimasi tanpa baseline
- menyimpulkan dari satu metrik saja
- tidak memisahkan cold start vs steady state

Mitigasi:
- dashboard metrik minimum
- tracing sampling yang sehat
- load test representatif

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const start = performance.now();
await handler();
const elapsed = performance.now() - start;
metrics.histogram("handler_latency_ms", elapsed);
```

Catatan: instrumentasi sederhana harus dilengkapi trace breakdown agar diagnosis akurat.

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Dalam sistem healthcare:
- performa lambat berdampak langsung ke operasional lapangan
- akar masalah bisa di code, DB, atau sistem eksternal
- keputusan optimasi harus tepat agar tidak buang waktu

Dengan pengalaman kamu pakai Elastic APM, pendekatan evidence-based ini krusial.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
tim mengira API lambat karena query DB.
setelah profiling, ternyata bottleneck ada di transform JSON besar di Node layer.
Optimasi DB tidak memberi dampak.

Perbaikan:
- pindah transform berat ke worker
- kurangi payload
- tambah pagination incremental

## Contoh Pola Kode yang Lebih Aman

```ts
async function handleSyncRequest() {
  const t0 = Date.now();
  const data = await loadDataFromDb(); // I/O span
  const transformed = transformData(data); // CPU span
  await pushToWms(transformed); // I/O span
  logPerf("sync_request_ms", Date.now() - t0);
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan indikator CPU-bound dan I/O-bound.
- Menyebut event loop lag sebagai sinyal penting Node.
- Menyebut tracing/profiling, bukan tebakan.
- Menjelaskan strategi optimasi berbeda per jenis bottleneck.
- Relevan ke kasus produksi healthcare.

## Ringkasan Final

Diagnosis bottleneck harus berbasis data, bukan intuisi.
CPU-bound dan I/O-bound punya gejala dan solusi berbeda.
Di domain healthcare, akurasi diagnosis mempercepat perbaikan performa
dan menjaga layanan tetap responsif saat beban tinggi.
