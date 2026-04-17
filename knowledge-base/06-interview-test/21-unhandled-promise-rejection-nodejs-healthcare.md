# Q21 - Risiko Unhandled Promise Rejection di Node.js Modern

## Pertanyaan Interview

Apa risiko unhandled promise rejection di Node.js modern?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Unhandled promise rejection terjadi saat Promise gagal tetapi error-nya tidak
ditangani dengan `.catch` atau `try/catch` pada `await`.
Di Node.js modern, ini bukan hal sepele: bisa menimbulkan warning keras,
mencemari log, membuat state aplikasi tidak konsisten, dan dalam konfigurasi tertentu
bisa menyebabkan proses terminate.

Di production healthcare, unhandled rejection berbahaya karena satu error yang lolos
bisa membuat alur sinkronisasi putus tanpa jejak recovery yang jelas.
Praktik saya: tangkap error di boundary async, pasang global handlers untuk observability,
dan pastikan setiap jalur async punya contract error yang tegas." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah global handler saja sudah cukup?"
2. "Kapan proses harus di-crash?"
3. "Bagaimana bedakan error recoverable vs fatal?"
4. "Apa kaitannya dengan graceful shutdown?"
5. "Bagaimana memastikan tidak ada unhandled di codebase besar?"

### Jawaban Singkat untuk Follow-up

1) Global handler cukup?
"Tidak, itu safety net terakhir, bukan pengganti error handling lokal."

2) Kapan crash?
"Jika state bisa korup dan tidak aman lanjut, lebih aman fail-fast + restart."

3) Recoverable vs fatal:
"Recoverable bisa retry/kompensasi; fatal merusak invariants proses."

4) Graceful shutdown:
"Handler fatal harus trigger shutdown terkontrol agar in-flight job ditutup rapi."

5) Pencegahan skala besar:
"Lint rules, test async, code review checklist, dan monitoring unhandled metric."

## Jawaban Ideal (Versi Singkat, Level Senior)

Risiko utama unhandled rejection:
- hidden failure pada background tasks
- memory/resource leak karena flow cleanup tidak jalan
- data inconsistency akibat langkah kompensasi terlewat
- potensi process instability

Strategi senior:
- local error handling by default
- global event handler sebagai telemetry + fallback decision
- kebijakan restart/shutdown yang eksplisit

## Penjelasan Detail yang Dicari Interviewer

### 1) Sumber umum unhandled rejection

- Promise dibuat tapi tidak di-await/return
- callback async dipassing ke API yang tidak menunggu promise
- `await` di `try` tapi lupa `catch` di caller chain

### 2) Anti-pattern umum

- `void someAsync()` tanpa error sink
- `.catch(() => {})` yang swallow error
- mengandalkan `process.on("unhandledRejection")` untuk semua kasus

Mitigasi:
- enforce no-floating-promises
- central error mapper
- structured logging dengan correlation id

### 3) Kebijakan runtime

Untuk service kritikal:
- tentukan kapan error fatal harus menghentikan proses
- jika fatal: expose health check failed, drain traffic, shutdown
- jika recoverable: retry dengan backoff dan audit status

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
process.on("unhandledRejection", (reason, promise) => {
  logger.error({ reason }, "Unhandled rejection");
  // putuskan: shutdown atau lanjut berdasarkan severity policy
});

async function runJob() {
  try {
    await syncToWarehouse();
  } catch (err) {
    logger.error({ err }, "Sync failed");
    throw err;
  }
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Di integrasi rumah sakit:
- banyak proses async berjalan paralel
- kegagalan tersembunyi bisa membuat status transaksi menggantung
- tim operasional butuh status jelas untuk tindakan cepat

Unhandled rejection yang dibiarkan mengganggu reliability dan auditability.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
job sinkronisasi retur memanggil API WMS async di background.
Promise reject karena timeout, tapi tidak ada catch.
Job dianggap selesai, audit tidak mencatat gagal.

Dampak:
- stok tidak sinkron
- tim farmasi melihat data mismatch
- investigasi terlambat karena log tidak jelas

Solusi:
- wajibkan promise returned/awaited
- catat hasil per job (success/failed)
- global unhandled dijadikan alarm prioritas tinggi

## Contoh Pola Kode yang Lebih Aman

```ts
async function executeSyncJob(jobId: string) {
  try {
    await doSync(jobId);
    await markJob(jobId, "SUCCESS");
  } catch (error) {
    await markJob(jobId, "FAILED");
    throw error;
  }
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan risiko teknis dan operasional.
- Menegaskan global handler bukan solusi tunggal.
- Menjelaskan kebijakan fatal vs recoverable.
- Menyediakan contoh mitigasi yang implementable.
- Mengaitkan ke workflow healthcare integrasi.

## Ringkasan Final

Unhandled promise rejection adalah sinyal serius di Node.js production.
Tanpa disiplin error handling, sistem bisa gagal diam-diam atau masuk state tidak konsisten.
Di domain healthcare, ini berdampak langsung ke sinkronisasi data kritikal,
jadi wajib ditangani dengan policy, observability, dan recovery flow yang tegas.
