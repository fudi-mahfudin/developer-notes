# Q5 - Event Loop, Call Stack, Task Queue, Microtask Queue

## Pertanyaan Interview

Jelaskan event loop secara detail: call stack, task queue, microtask queue.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"JavaScript berjalan single-threaded untuk eksekusi main code. Function sinkron masuk ke
call stack. Saat operasi async selesai, callback tidak langsung dieksekusi, tetapi masuk
ke antrian. Ada dua antrian penting: microtask dan task queue. Microtask seperti Promise
callback diproses lebih dulu sampai habis sebelum event loop mengambil task berikutnya.

Urutan ini penting untuk prediksi timing, terutama di UI dan Node service. Di backend
healthcare, salah paham event loop bisa menyebabkan starvation, latency spike, atau urutan
proses yang tidak sesuai ekspektasi bisnis." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa bedanya task dan microtask secara praktis?"
2. "Bisakah microtask membuat aplikasi freeze?"
3. "Di Node.js, bagaimana peran phases event loop?"
4. "Kenapa Promise callback sering terasa 'lebih cepat'?"
5. "Bagaimana menghindari event loop blocking?"

### Jawaban Singkat untuk Follow-up

1) Task vs microtask:
"Microtask dieksekusi setelah stack kosong dan sebelum task berikutnya."

2) Freeze:
"Ya, microtask chain tak terbatas bisa menunda task lain dan membuat starvation."

3) Node phases:
"Timer, pending callbacks, poll, check, close callbacks; microtask diproses di sela eksekusi."

4) Promise terasa cepat:
"Karena masuk microtask queue yang diprioritaskan dibanding task queue biasa."

5) Hindari blocking:
"Pecah pekerjaan berat, pakai worker thread/job queue untuk CPU-heavy task."

## Jawaban Ideal (Versi Singkat, Level Senior)

Komponen utama:
- call stack: tempat eksekusi sinkron
- task queue (macrotask): `setTimeout`, I/O callbacks tertentu
- microtask queue: `Promise.then`, `queueMicrotask`
- event loop: scheduler yang memindahkan callback ke stack sesuai aturan prioritas

Aturan penting:
setelah stack kosong, engine menghabiskan microtask dulu, baru ambil task berikutnya.

## Penjelasan Detail yang Dicari Interviewer

### 1) Kenapa prioritas microtask penting

Prioritas ini memberi konsistensi perilaku Promise chain.
Namun jika berlebihan, bisa menunda task lain terlalu lama.

### 2) Dampak ke performa backend

Pada Node.js service:
- event loop delay naik jika ada synchronous heavy work
- throughput turun jika callback menumpuk
- timeout eksternal meningkat saat poll phase terhambat

### 3) Anti-pattern umum

- loop CPU berat di request handler
- chaining Promise tanpa yield pada batch besar
- logging sinkron besar di jalur request kritikal

Mitigasi:
- pindahkan CPU task ke worker
- batasi batch size
- ukur event loop lag secara berkala

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
console.log("A");

setTimeout(() => console.log("B-task"), 0);

Promise.resolve().then(() => console.log("C-microtask"));

console.log("D");

// Output:
// A
// D
// C-microtask
// B-task
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Kamu menangani integrasi sistem hospital + WMS.
Di skenario ini:
- urutan pemrosesan mempengaruhi konsistensi status stok
- timeout eksternal bisa berdampak ke SLA operasional
- performa spike jam sibuk harus tetap terkendali

Pemahaman event loop membuat desain retry, batching, dan concurrency lebih aman.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
handler sinkronisasi retur melakukan transform data besar secara sinkron
sebelum mengirim ke antrean downstream.
Saat beban puncak, event loop delay naik dan callback I/O tertunda.

Akibat:
- ack ke sistem asal terlambat
- job retry meningkat
- tim melihat anomali delay pembaruan inventory

## Contoh Pola Kode yang Lebih Aman

```ts
async function processInChunks<T>(
  data: T[],
  chunkSize: number,
  handler: (chunk: T[]) => Promise<void>,
) {
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    await handler(chunk);
    await Promise.resolve(); // memberi kesempatan microtask/task lain diproses
  }
}
```

Pola ini tidak menyelesaikan semua bottleneck, tapi membantu mengurangi blocking panjang.

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan stack, task, microtask dengan urutan benar.
- Menyebut prioritas microtask sebelum task.
- Menjelaskan risiko starvation/event loop lag.
- Menyediakan contoh runtime order yang jelas.
- Mengaitkan dengan reliability dan latency healthcare systems.

## Ringkasan Final

Event loop adalah inti concurrency model JavaScript.
Memahami prioritas microtask vs task adalah kunci prediksi urutan eksekusi.
Untuk production healthcare, ini berdampak langsung ke latency, konsistensi proses,
dan stabilitas integrasi antar sistem.
