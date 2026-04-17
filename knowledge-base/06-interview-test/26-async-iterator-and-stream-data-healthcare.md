# Q26 - Async Iterator dan Use Case pada Stream Data

## Pertanyaan Interview

Jelaskan async iterator dan use case-nya pada stream data.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Async iterator memungkinkan kita mengonsumsi data asynchronous secara bertahap
menggunakan `for await...of`. Ini cocok untuk stream atau sumber data yang datang
incremental, bukan sekaligus. Keuntungannya adalah memory lebih efisien, alur proses
lebih natural, dan mudah dikombinasikan dengan backpressure-aware processing.

Di sistem healthcare, async iterator berguna saat memproses data transaksi besar
atau sinkronisasi bertahap antar sistem. Kita bisa proses per chunk, catat progress,
dan menghentikan lebih aman jika terjadi error." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apa beda iterator biasa vs async iterator?"
2. "Kapan async iterator lebih baik dari Promise.all?"
3. "Bagaimana error handling di for-await loop?"
4. "Bagaimana implementasi cancellation?"
5. "Apa risiko utama jika stream lambat?"

### Jawaban Singkat untuk Follow-up

1) Beda utama:
"Iterator biasa sinkron, async iterator mengembalikan Promise per step."

2) Lebih baik dari all:
"Saat data besar/streaming dan tidak ingin load semua data di memori."

3) Error handling:
"Wrap loop dengan try/catch dan simpan checkpoint progress."

4) Cancellation:
"Gabungkan dengan AbortSignal dan hentikan producer/consumer."

5) Risiko stream lambat:
"Bottleneck downstream, timeout, dan antrean menumpuk."

## Jawaban Ideal (Versi Singkat, Level Senior)

Async iterator cocok untuk:
- data berukuran besar
- event stream berkelanjutan
- pipeline transform bertahap

Nilai tambah:
- memory usage terkendali
- integrasi baik dengan backpressure
- observability progress per item/chunk

## Penjelasan Detail yang Dicari Interviewer

### 1) Konsep inti

Objek async iterable memiliki `Symbol.asyncIterator`.
Setiap `next()` mengembalikan promise berisi `{ value, done }`.

### 2) Kapan dipilih

- API paginated besar
- file/network stream
- job pipeline dengan checkpoint

### 3) Anti-pattern umum

- mengumpulkan semua hasil dulu baru proses
- tidak ada timeout/cancel di loop panjang
- tidak menyimpan offset/checkpoint

Mitigasi:
- process-as-you-go
- checkpoint berkala
- circuit breaker pada sumber data

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
async function* paginate(fetchPage) {
  let page = 1;
  while (true) {
    const items = await fetchPage(page);
    if (!items.length) return;
    yield items;
    page += 1;
  }
}

for await (const chunk of paginate(fetchTxPage)) {
  await processChunk(chunk);
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada workload healthcare:
- volume transaksi bisa tinggi
- sinkronisasi antar sistem butuh stabilitas
- proses panjang perlu progress tracking

Async iterator mempermudah desain pipeline yang tahan beban tanpa memori meledak.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
sistem mengambil semua transaksi 1 hari ke memory sebelum diproses.
Saat volume naik, service OOM dan restart berulang.

Perbaikan:
- ubah ke async iterator per halaman/chunk
- proses + commit incremental
- simpan checkpoint untuk resume setelah gagal

## Contoh Pola Kode yang Lebih Aman

```ts
async function syncDailyTransactions() {
  for await (const chunk of streamTransactionsByPage()) {
    await syncChunkToWms(chunk);
    await saveCheckpoint(chunk.at(-1)?.id ?? "");
  }
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan konsep async iterator secara akurat.
- Menjelaskan kapan dipakai dibanding Promise.all.
- Menyebut checkpoint/cancellation/error handling.
- Memberi use case streaming nyata.
- Mengaitkan ke skenario volume data healthcare.

## Ringkasan Final

Async iterator adalah pola utama untuk memproses data async bertahap secara efisien.
Pendekatan ini lebih aman untuk data besar dan integrasi panjang.
Di sistem healthcare, async iterator membantu menjaga stabilitas memori,
kontrol progress, dan recovery saat terjadi gangguan.
