# Q83 - Membuat Test Async Tidak Flaky

## Pertanyaan Interview

Bagaimana membuat test async di JavaScript tetap stabil dan tidak flaky?

## Jawaban Lisan 60-90 Detik (Siap Pakai Interview)

"Flaky async tests biasanya disebabkan race condition, timeout sembarang,
atau ketergantungan ke state eksternal yang tidak terkontrol.
Prinsip saya: buat test deterministik.

Caranya:
kontrol clock/timer bila perlu,
hindari sleep arbitrer,
isolate test data,
dan pastikan setiap async operation benar-benar di-await.
Untuk integration test, dependency eksternal sebaiknya distub atau di-sandbox.
Di healthcare, flaky tests berbahaya karena menurunkan kepercayaan pipeline
dan memperlambat release fitur penting." 

## Follow-up yang Biasanya Ditanya Interviewer

1. "Penyebab flaky paling sering?"
2. "Kenapa `setTimeout` di test berisiko?"
3. "Bagaimana menstabilkan test yang bergantung API?"
4. "Apa peran retry di test runner?"
5. "Anti-pattern umum?"

### Jawaban Singkat untuk Follow-up

1) Penyebab sering:
"Race async, shared state antar test, dan dependency non-deterministic."

2) `setTimeout` berisiko:
"Bergantung timing environment CI yang tidak konsisten."

3) API dependency:
"Gunakan mock server atau contract sandbox yang konsisten."

4) Retry di runner:
"Boleh untuk diagnosis, bukan menutupi akar masalah."

5) Anti-pattern:
"Menambah timeout terus tanpa memperbaiki determinisme."

## Jawaban Ideal (Versi Singkat, Level Senior)

Anti-flaky playbook:
- deterministic inputs
- explicit async awaits
- isolated environment
- stable dependency emulation
- root-cause fixing policy

## Penjelasan Detail yang Dicari Interviewer

### 1) Sumber nondeterminism

- shared DB state
- concurrency antar test
- event loop timing variability
- random data tanpa seed

### 2) Teknik stabilisasi

- setup/teardown ketat
- unique test fixtures
- fake timers pada unit level
- polling berbasis condition, bukan sleep statis

### 3) Operasional CI

- track flaky rate per test suite
- quarantine test bermasalah sementara
- RCA wajib sebelum re-enable

Mitigasi:
- serialisasi test tertentu jika resource conflict
- minimize global mutable state
- observability log di test failure

## Contoh Kode Kecil (Menunjukkan Perbedaan)

```js
await waitFor(() => expect(status()).toBe("ready"));
```

Lebih aman daripada `await sleep(2000)` yang arbitrer.

## Kenapa Ini Penting di Industri Healthcare (Sesuai Profil Kamu)

Pipeline yang flaky memperlambat release dan mengurangi kepercayaan tim.
Di domain healthcare, keterlambatan rilis bisa berdampak operasional nyata.
Test async yang stabil menjaga delivery tetap konsisten.

## Contoh Skenario Healthcare yang Sering Jadi Bug

Skenario:
test notifikasi async sering gagal random di CI.
tim mengabaikannya hingga bug real lolos.

Perbaikan:
- isolate queue test environment
- ganti sleep dengan condition wait
- tambah logging event state

## Contoh Pola Kode yang Lebih Aman

```ts
type AsyncTestPolicy = {
  deterministicData: boolean;
  allowArbitrarySleep: false;
};
```

## Checklist Kualitas Jawaban (Self-Review)

- Menjelaskan penyebab flaky tests.
- Menjelaskan teknik stabilisasi yang konkret.
- Menjelaskan praktik CI untuk flaky management.
- Menolak timeout arbitrer sebagai solusi utama.
- Relevan untuk release reliability healthcare.

## Ringkasan Final

Flaky async tests adalah debt kualitas yang mahal.
Solusi efektif adalah determinisme, isolasi, dan disiplin await/cleanup.
Dengan test async yang stabil, pipeline menjadi sinyal kualitas yang bisa dipercaya.
