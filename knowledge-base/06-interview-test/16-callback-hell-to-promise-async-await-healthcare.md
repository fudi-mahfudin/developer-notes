# Q16 - Callback Hell dan Migrasi ke Promise/Async-Await

## Pertanyaan Interview

Jelaskan callback hell, dan langkah migrasinya ke Promise/async-await.

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Callback hell terjadi saat alur async ditulis dalam callback bertingkat,
sehingga kode jadi sulit dibaca, sulit di-debug, dan error handling tersebar.
Migrasi ideal dilakukan bertahap: bungkus API callback ke Promise, rapikan
error handling terpusat, lalu ubah orchestration utama ke async/await.

Di production, saya hindari big-bang rewrite. Saya mulai dari path paling kritikal,
tambah test regression, lalu refactor per modul. Di workflow healthcare,
pendekatan ini menekan risiko downtime dan menjaga integrasi tetap stabil." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah semua callback harus dihapus?"
2. "Kapan Promise chain cukup tanpa async/await?"
3. "Bagaimana handle error lintas beberapa async step?"
4. "Bagaimana migrasi tanpa regresi?"
5. "Apa anti-pattern baru setelah migrasi?"

### Jawaban Singkat untuk Follow-up

1) Semua callback?
"Tidak, callback tetap valid; yang penting maintainability dan contract jelas."

2) Promise chain cukup?
"Ya, untuk flow linear sederhana chain bisa cukup jelas."

3) Error lintas step:
"Gunakan boundary try/catch terpusat dan klasifikasi error domain."

4) Tanpa regresi:
"Refactor bertahap + test contract + observability sebelum rollout penuh."

5) Anti-pattern baru:
"`await` berantai yang seharusnya paralel, dan swallow error di catch kosong."

## Jawaban Ideal (Versi Singkat, Level Senior)

Callback hell adalah symptom dari:
- nested control flow
- error handling tidak konsisten
- coupling antar langkah async terlalu kuat

Strategi migrasi:
1. promisify layer I/O lama
2. standar error object
3. refactor orchestration ke async/await
4. tambah timeout/retry/cancellation policy

## Penjelasan Detail yang Dicari Interviewer

### 1) Kenapa callback hell berbahaya

- readability buruk
- sulit melakukan rollback pada step tertentu
- instrumentation log/tracing sering tidak rapi

### 2) Urutan migrasi yang aman

- identifikasi jalur kritikal
- bungkus fungsi callback menjadi Promise
- pastikan behavior tetap sama via integration test
- rollout bertahap dengan monitoring

### 3) Anti-pattern yang harus dihindari

- langsung rewrite semua modul
- campur callback dan promise tanpa adapter jelas
- ignore unhandled rejection

Mitigasi:
- adapter layer sementara
- lint rules async
- standard error response

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
// Callback hell
readA((err, a) => {
  if (err) return done(err);
  readB(a, (err2, b) => {
    if (err2) return done(err2);
    save(b, (err3) => {
      if (err3) return done(err3);
      done(null, "ok");
    });
  });
});

// Async/await
async function runFlow() {
  const a = await readAAsync();
  const b = await readBAsync(a);
  await saveAsync(b);
  return "ok";
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada integrasi healthcare:
- alur sering melibatkan beberapa layanan eksternal
- error harus tercatat konsisten
- recovery path harus jelas saat partial failure

Async flow yang rapi mengurangi false alarm dan mempercepat incident handling.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
alur retur farmasi punya 4 callback berantai:
validasi -> map -> kirim WMS -> tulis audit.
Saat step 3 gagal, callback step 4 tetap terpanggil karena kondisi error tidak seragam.

Dampak:
- audit menunjukkan sukses padahal kirim gagal
- tim operasi mendapat status menyesatkan

Perbaikan:
- refactor ke async/await
- gunakan transaksi logical state per step
- satu handler error terpusat

## Contoh Pola Kode yang Lebih Aman

```ts
async function syncReturn(txId: string) {
  try {
    const validated = await validateTx(txId);
    const payload = await mapPayload(validated);
    await sendToWms(payload);
    await writeAudit(txId, "SYNCED");
  } catch (error) {
    await writeAudit(txId, "FAILED");
    throw error;
  }
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan masalah callback hell secara konkret.
- Menawarkan migrasi bertahap, bukan rewrite ekstrem.
- Menyentuh error handling, observability, dan rollback.
- Memberi contoh code before/after.
- Mengaitkan ke reliability healthcare integration.

## Ringkasan Final

Callback hell bukan sekadar masalah style, tapi risiko operasional.
Migrasi ke Promise/async-await harus bertahap, terukur, dan test-driven.
Di sistem healthcare, struktur async yang jelas meningkatkan keandalan,
konsistensi audit, dan kecepatan respons incident.
