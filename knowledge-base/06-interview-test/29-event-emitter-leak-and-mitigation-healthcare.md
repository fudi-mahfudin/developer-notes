# Q29 - Event Emitter Leak dan Cara Mitigasinya

## Pertanyaan Interview

Apa itu event emitter leak dan cara mitigasinya?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Event emitter leak terjadi ketika listener terus ditambahkan tapi tidak dibersihkan,
sehingga memory tumbuh dan warning seperti `MaxListenersExceededWarning` muncul.
Masalah ini sering muncul pada service long-running saat listener dipasang per request
atau per job tanpa remove.

Mitigasi utamanya: pasang listener sekali di lifecycle yang benar, gunakan `once`
jika event hanya satu kali, dan pastikan cleanup saat selesai/unsubscribe.
Di sistem healthcare yang berjalan 24/7, leak kecil pun bisa akumulatif dan
mengganggu stabilitas produksi." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Apakah menaikkan max listeners menyelesaikan masalah?"
2. "Kapan pakai `once`?"
3. "Bagaimana mendeteksi emitter leak dini?"
4. "Apa pola lifecycle listener yang benar?"
5. "Apa risiko operasional jika leak dibiarkan?"

### Jawaban Singkat untuk Follow-up

1) Naikkan max listeners?
"Itu hanya menutupi gejala, bukan memperbaiki akar masalah."

2) Pakai once:
"Saat event memang hanya perlu ditangani sekali."

3) Deteksi dini:
"Pantau listener count, memory trend, dan warning logs."

4) Lifecycle benar:
"Register di init, unregister di cleanup/shutdown."

5) Risiko operasional:
"Memory bloat, GC pressure, latency spike, bahkan crash."

## Jawaban Ideal (Versi Singkat, Level Senior)

Tanda emitter leak:
- listener count naik terus
- warning max listeners
- memory usage meningkat perlahan

Strategi mitigasi:
- review titik register listener
- enforce removeListener/off pada cleanup
- gunakan abstraction event bus dengan lifecycle guard

## Penjelasan Detail yang Dicari Interviewer

### 1) Akar penyebab umum

- `on()` dipanggil di handler request berulang
- listener anonymous sulit dilepas
- error path lupa cleanup

### 2) Anti-pattern umum

- menambah listener di loop tanpa remove
- mengandalkan process restart sebagai solusi
- mematikan warning tanpa investigasi

Mitigasi:
- listener registry
- helper wrapper auto-cleanup
- integration test long-run scenario

### 3) Monitoring penting

- `emitter.listenerCount(eventName)`
- heap snapshot berkala
- alert pada pertumbuhan memory abnormal

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
function bindJobListener(emitter, jobId, handler) {
  const eventName = `job:${jobId}:done`;
  emitter.once(eventName, handler); // auto cleanup setelah sekali trigger
}
```

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pada integrasi healthcare:
- service hidup lama dan stabilitas wajib tinggi
- job/event volume bisa besar sepanjang hari
- leak bertahap bisa menurunkan performa tanpa terlihat awalnya

Disiplin lifecycle listener mencegah degradasi jangka panjang.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
setiap job sinkronisasi menambahkan listener hasil callback.
Jika job gagal, cleanup tidak jalan.
Setelah ribuan job, listener menumpuk dan memory naik.

Perbaikan:
- ganti `on` ke `once` untuk single response event
- cleanup di blok `finally`
- pantau listener count per event kritikal

## Contoh Pola Kode yang Lebih Aman

```ts
function attachWithCleanup(
  emitter: NodeJS.EventEmitter,
  event: string,
  handler: (...args: unknown[]) => void,
) {
  emitter.on(event, handler);
  return () => emitter.off(event, handler);
}
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan leak sebagai masalah lifecycle listener.
- Menolak solusi palsu: sekadar menaikkan max listeners.
- Menyebut `once`, cleanup, dan monitoring.
- Memberi dampak teknis dan operasional.
- Relevan dengan service healthcare long-running.

## Ringkasan Final

Event emitter leak adalah masalah akumulatif yang sering terlambat terdeteksi.
Solusi efektif adalah kontrol lifecycle listener, bukan menambah limit.
Untuk sistem healthcare, mitigasi leak menjaga performa stabil
dan mencegah incident akibat degradasi memori bertahap.
