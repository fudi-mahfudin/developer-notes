# Q62 - Backpressure pada Stream

## Pertanyaan Interview

Apa itu backpressure pada stream, dan bagaimana menanganinya di Node.js?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Backpressure adalah mekanisme agar producer tidak mendorong data
lebih cepat daripada kemampuan consumer memproses.
Kalau diabaikan, buffer membengkak, memory naik, dan throughput turun.

Di Node, gunakan API stream dengan benar:
perhatikan nilai balik `write()`, pakai event `drain`,
dan lebih aman pakai `pipeline()` agar error handling dan cleanup konsisten.
Untuk proses data besar, backpressure yang benar menjaga stabilitas service.

Di sistem healthcare, ini penting saat sinkronisasi file/data besar
agar service tetap responsif dan tidak memory spike." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa tanda backpressure tidak tertangani?"
2. "Kenapa `pipeline()` direkomendasikan?"
3. "Bagaimana tuning highWaterMark?"
4. "Apa risiko buffering manual?"
5. "Anti-pattern paling sering?"

### Jawaban Singkat untuk Follow-up

1) Tanda masalah:
"Memory naik tajam, GC berat, throughput tidak stabil."

2) Pipeline:
"Mengelola error propagation dan close stream lebih aman."

3) highWaterMark:
"Tuning berbasis benchmark, bukan angka asal."

4) Buffer manual:
"Mudah bocor memory dan sulit kontrol flow."

5) Anti-pattern:
"Mengabaikan nilai return `write()`."

## Jawaban Ideal (Versi Singkat, Level Senior)

Backpressure sehat berarti:
- producer respect consumer pace
- buffer bounded
- error/cleanup terkelola
- throughput stabil di beban tinggi

## Penjelasan Detail yang Dicari Interviewer

### 1) Mekanisme inti

- `writable.write(chunk)` mengembalikan `false` jika buffer penuh
- producer harus pause sementara
- lanjut setelah event `drain`

### 2) Praktik implementasi

- gunakan `stream.pipeline()` atau `pipeline` promises
- set `highWaterMark` sesuai profile data
- hindari convert seluruh stream ke memory

### 3) Risiko jika diabaikan

- out-of-memory
- latency spike di service lain
- restart berulang saat beban puncak

Mitigasi:
- rate limiting input
- queue upstream
- observability pada buffer utilization

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
if (!writable.write(chunk)) {
  readable.pause();
  writable.once("drain", () => readable.resume());
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Workload healthcare sering melibatkan:
- transfer data batch
- ekspor/impor file besar
- sinkronisasi sistem eksternal

Backpressure yang benar mencegah satu alur berat
mengganggu endpoint transaksi yang lebih kritikal.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
service ingest file besar tanpa flow control.
memory naik dan pod sering restart.

Perbaikan:
- ganti ke streaming + pipeline
- aktifkan backpressure handling
- batasi concurrency ingestion

## Contoh Pola Kode yang Lebih Aman

```ts
type StreamPolicy = {
  highWaterMark: number;
  maxConcurrentPipelines: number;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan definisi backpressure.
- Menjelaskan write/drain behavior.
- Menyebut `pipeline` dan cleanup.
- Menjelaskan dampak performa/memory.
- Relevan untuk integrasi data healthcare.

## Ringkasan Final

Backpressure adalah kontrol fundamental pada arsitektur stream.
Mengabaikannya hampir selalu berujung pada masalah memory dan stabilitas.
Pendekatan senior di Node adalah stream-native flow control,
tuning berbasis metrik, dan error handling yang ketat.
