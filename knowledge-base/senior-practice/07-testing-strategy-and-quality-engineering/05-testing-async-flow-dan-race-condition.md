# Testing Async Flow dan Race Condition

## Tujuan

Topik ini penting karena bug async dan race condition sering lolos test biasa.
Sistem terlihat benar di skenario normal, tetapi gagal pada urutan eksekusi tertentu.

## Kenapa Topik Ini Penting

Jika async flow tidak diuji serius:

- state jadi tidak konsisten;
- duplicate side effect terjadi;
- error intermittent sulit direproduksi;
- flaky production issue meningkat.

## Model Mental yang Benar

1. Async bukan hanya soal delay, tetapi soal urutan dan interleaving.
2. Race condition terjadi saat hasil bergantung pada timing.
3. Test async harus mengontrol waktu, urutan, dan concurrency.
4. Happy path async jarang cukup.
5. Deterministic testing adalah kunci.

## Jenis Masalah Async Umum

- forgotten await;
- unhandled rejection;
- out-of-order updates;
- shared mutable state race;
- cancellation tidak ditangani;
- duplicate processing karena retry.

## Kenapa Sulit Ditest

Karena:

- timing nondeterministic;
- environment CI berbeda;
- dependency delay variatif;
- bug muncul hanya pada interleaving tertentu.

Tanpa strategi, test jadi flaky atau gagal menangkap masalah.

## Prinsip Test Async Sehat

- buat asumsi urutan explicit;
- gunakan timeout realistis dan tegas;
- hindari sleep arbitrary bila bisa;
- verifikasi outcome akhir dan invariants penting.

## Control Time

Gunakan teknik kontrol waktu (fake timers/scheduler abstraction) saat tepat untuk:

- retry/backoff logic;
- timeout behavior;
- delayed tasks.

Ini membuat test lebih cepat dan deterministik.

## Control Concurrency

Untuk race condition:

- jalankan operasi paralel terkontrol;
- atur urutan resolve/reject dependency;
- verifikasi state final tetap benar.

Tujuan: memaksa interleaving berisiko muncul di test.

## Test Cancellation

Jika sistem mendukung cancellation:

- uji bahwa operasi berhenti;
- uji cleanup resource;
- uji tidak ada side effect setelah cancel.

Cancellation yang tidak diuji sering menyebabkan leak/ghost update.

## Test Idempotency in Async

Untuk operasi retryable:

- kirim request duplikat;
- simulasi timeout ambigu;
- pastikan side effect tetap satu kali atau konsisten secara kontrak.

Ini penting untuk robustness produksi.

## State Invariants

Dalam async testing, assertion kuat fokus ke invariants:

- tidak ada double charge;
- status tidak mundur ilegal;
- total counter konsisten;
- event tidak hilang/duplikat tanpa aturan.

## Queue/Worker Async Testing

Untuk worker:

- uji at-least-once semantics;
- uji duplicate message handling;
- uji ordering assumptions;
- uji dead-letter path.

Race di worker sering berdampak besar ke data consistency.

## API Async Flow

Untuk endpoint async:

- uji timeout path;
- uji retry behavior;
- uji downstream lambat;
- uji partial failure.

Jangan hanya test "respon 200 saat dependency cepat."

## Flaky Test Reduction

Tips:

- hilangkan sleep magic number;
- isolasi shared state antar test;
- gunakan deterministic fixtures;
- pastikan cleanup async selesai sebelum test berikutnya.

Flaky test pada async biasanya tanda test design lemah.

## Anti-Pattern Umum

### 1. Test Async Seperti Sync

Melewatkan race path penting.

### 2. Bergantung pada Delay Arbitrary

Test menjadi lambat dan flaky.

### 3. Tidak Menguji Error/Timeout Path

Padahal ini area paling berisiko.

### 4. Tidak Menguji Duplicate/Retry Scenario

Race produksi mudah lolos.

## Heuristik Senior

1. Uji async flow dengan skenario urutan berbeda, bukan satu jalur.
2. Validasi invariants bisnis, bukan sekadar response code.
3. Gunakan kontrol waktu/concurrency agar test deterministik.
4. Uji cancellation, retry, dan timeout sebagai first-class path.
5. Kurangi sumber nondeterminism yang tidak perlu.
6. Jadikan bug race sebelumnya sebagai regression test permanen.
7. Perlakukan flaky async test sebagai defect yang harus diperbaiki.

## Pertanyaan Interview

### Dasar

- Apa itu race condition?
- Kenapa async bug sulit direproduksi?
- Kenapa sleep-based test sering buruk?
- Apa itu deterministic async test?

### Menengah

- Bagaimana mengetes retry/backoff logic?
- Bagaimana memaksa race condition muncul saat test?
- Apa assertion penting untuk async workflow?
- Bagaimana menguji cancellation secara benar?

### Senior

- Bagaimana Anda merancang strategy testing untuk service event-driven dengan at-least-once delivery?
- Bagaimana Anda mengurangi flaky async tests di pipeline besar?
- Bagaimana Anda memastikan invariants data tetap aman di bawah concurrency tinggi?
- Bagaimana Anda memanfaatkan incident race production menjadi guardrail test jangka panjang?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- duplicate order sesekali terjadi;
- status job stuck karena timeout + retry clash;
- webhook diproses dua kali;
- UI menampilkan data lama karena response datang terbalik.

## Ringkasan Brutal

- Async flow yang tidak diuji serius akan gagal di produksi.
- Race condition bukan edge case; ia konsekuensi natural concurrency.
- Test harus mengontrol timing dan interleaving secara sengaja.
- Engineer senior menguji skenario buruk sebelum user yang menemukannya.

## Checklist Pemahaman

- Saya tahu jenis bug async paling umum.
- Saya paham cara membuat test async deterministik.
- Saya bisa merancang test untuk race, retry, timeout, dan cancellation.
- Saya fokus pada invariants bisnis dalam assertion.
- Saya tidak membiarkan flaky async test menumpuk.

## Penutup

Testing async yang matang bukan soal menambah `await` di test.
Ini soal mendesain eksperimen kecil untuk membuktikan sistem tetap benar meski urutan kejadian tidak bersahabat.
