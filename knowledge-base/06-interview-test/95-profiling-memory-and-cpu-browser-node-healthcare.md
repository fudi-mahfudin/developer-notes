# Q95 - Profiling Memory dan CPU di Browser/Node

## Pertanyaan Interview

Bagaimana cara profiling memory dan CPU di browser dan Node.js?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Untuk profiling, saya mulai dari gejala terukur:
latency naik, event loop delay, atau memory growth.
Di browser, saya pakai Performance panel dan Memory heap snapshot
untuk melihat long task, detached DOM, dan leak pattern.
Di Node.js, saya lihat CPU profile, heap snapshot, serta metric runtime
seperti event loop lag dan RSS trend.

Kuncinya bukan cuma ambil profile sekali,
tapi membandingkan baseline vs setelah perubahan.
Saya juga mengaitkan temuan profiling dengan jalur user paling kritis.
Di healthcare, ini penting karena bottleneck kecil di alur klinis
bisa berdampak ke operasional real-time." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Kapan curiga memory leak?"
2. "Bagaimana bedakan CPU spike normal vs masalah?"
3. "Tool wajib di browser?"
4. "Tool wajib di Node?"
5. "Anti-pattern investigasi?"

### Jawaban Singkat untuk Follow-up

1) Leak:
"Memory naik terus setelah GC dan tidak kembali baseline."

2) CPU spike:
"Lihat pola periodik, korelasi traffic, dan impact latency."

3) Browser tool:
"DevTools Performance + Memory heap snapshot."

4) Node tool:
"Inspector/clinic + pprof/heapdump sesuai kebutuhan."

5) Anti-pattern:
"Optimasi prematur tanpa data profiling."

## Jawaban Ideal (Versi Singkat, Level Senior)

Profiling yang baik:
- berbasis gejala nyata
- baseline-driven
- fokus jalur kritis
- ditutup dengan verifikasi pasca-fix

## Penjelasan Detail yang Dicari Interviewer

### 1) Workflow profiling

- tentukan symptom dan scope
- reproduksi stabil di environment representatif
- capture profile sebelum fix
- implement perbaikan kecil terukur
- re-profile dan bandingkan

### 2) Memory analysis

- browser: cek detached nodes, retained size besar
- Node: cek object growth lintas interval snapshot
- validasi apakah growth bersifat cache valid atau leak

### 3) CPU analysis

- identifikasi hot path function
- cek blocking sync operation
- pindahkan tugas berat ke worker/background jika perlu

Mitigasi:
- tambahkan observability untuk event-loop lag
- tetapkan SLO latency endpoint kritis
- lakukan profiling berkala pasca major release

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
const start = performance.now();
doCriticalTask();
const elapsedMs = performance.now() - start;
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Healthcare workflow menuntut respons cepat dan stabil.
CPU/memory issue yang diabaikan dapat menumpuk jadi insiden produksi.
Profiling rutin membantu menjaga sistem tetap responsif dalam jam sibuk.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
Node service agregasi data klinis mengalami latency spike sore hari.
Profiling menunjukkan parsing sinkron data besar memblokir event loop.

Perbaikan:
- ubah ke stream processing
- batasi concurrency CPU-heavy task
- tambahkan alarm event-loop delay

## Contoh Pola Kode yang Lebih Aman

```ts
type ProfilingObservation = {
  layer: "browser" | "node";
  symptom: "cpu_spike" | "memory_growth" | "long_task";
  hypothesis: string;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan workflow profiling end-to-end.
- Menjelaskan memory vs CPU analysis.
- Menjelaskan baseline dan verifikasi pasca-fix.
- Menjelaskan tool umum browser dan Node.
- Relevan terhadap kebutuhan reliability healthcare.

## Ringkasan Final

Profiling efektif adalah proses investigasi berbasis data,
bukan tebakan.
Dengan workflow yang disiplin dan validasi pasca-fix,
tim dapat mengurangi bottleneck CPU/memory secara konsisten
dan menjaga performa layanan produksi tetap stabil.
