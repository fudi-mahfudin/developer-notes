# Error Handling Pattern di JS/TS

## Tujuan

Error handling adalah area yang sering terlihat rapi di demo tetapi rapuh di production.
Banyak developer bisa menulis `try/catch`, tetapi gagal menjawab:

- error ini harus ditangani di mana;
- mana error yang bisa di-recover;
- mana error yang harus menghentikan flow;
- bagaimana menjaga observability tetap jujur;
- bagaimana membuat caller memahami failure mode dengan jelas.

Kalau pemahaman error handling lemah, dampaknya brutal:

- bug disembunyikan;
- log penuh noise;
- retry dilakukan pada error yang salah;
- UI menampilkan pesan yang menyesatkan;
- service meneruskan state setengah jadi;
- debugging incident memakan waktu jauh lebih lama.

## Kenapa Topik Ini Penting

Dalam sistem nyata, kegagalan adalah baseline.
Bukan edge case.

Anda akan selalu berhadapan dengan:

- input invalid;
- dependency timeout;
- network failure;
- permission problem;
- race condition;
- data corruption;
- parsing failure;
- bug internal.

Senior engineer tidak bertanya "bagaimana caranya agar tidak ada error".
Senior engineer bertanya:

- bagaimana mengklasifikasikan error?
- siapa yang bertanggung jawab menangani?
- informasi apa yang perlu dipertahankan?
- kapan harus fail fast?
- kapan harus fallback?

## Model Mental yang Benar

Pegang model ini:

1. Tidak semua error sama.
2. Tidak semua error harus ditangani di tempat error muncul.
3. Menangkap error terlalu cepat bisa sama buruknya dengan tidak menangkap sama sekali.
4. Error handling adalah bagian dari API design.
5. Observability adalah bagian dari error handling, bukan fitur tambahan.

Kalau semua error hanya diperlakukan sebagai `console.error(error)`, desain Anda masih dangkal.

## Jenis Error Secara Praktis

Di aplikasi bisnis, klasifikasi berikut lebih berguna daripada teori terlalu abstrak:

- validation error
- authentication/authorization error
- not found error
- business rule error
- transient infrastructure error
- permanent dependency error
- programmer error

### Validation Error

Input tidak memenuhi kontrak.
Biasanya caller bisa memperbaiki request.

Contoh:

- email invalid;
- field wajib kosong;
- payload salah tipe;
- format tanggal rusak.

### Authorization Error

Caller tidak punya hak untuk melakukan aksi.
Ini bukan bug parsing.
Ini bukan not found biasa.
Ini kontrak keamanan.

### Business Rule Error

Input valid secara bentuk, tetapi tidak valid secara aturan domain.

Contoh:

- cuti melewati saldo;
- stok tidak cukup;
- order tidak bisa dibatalkan setelah status tertentu.

### Transient Infrastructure Error

Error seperti timeout, temporary network issue, deadlock tertentu, rate limit sementara.
Kadang layak di-retry.

### Programmer Error

Ini penting dibedakan.
Contoh:

- akses property pada `undefined`;
- null dereference;
- asumsi type salah;
- invariant internal rusak.

Error seperti ini sering tidak layak "dipulihkan" secara diam-diam.
Justru harus terlihat jelas.

## Fail Fast vs Recover Gracefully

Ini bukan pertanyaan agama.
Ini pertanyaan konteks.

### Fail Fast Tepat Saat

- invariant internal rusak;
- data kritis tidak bisa dipercaya;
- dependency wajib gagal;
- melanjutkan flow berisiko korupsi data;
- error menunjukkan bug programmer.

### Recover Gracefully Tepat Saat

- ada fallback yang valid;
- operasi tidak kritis;
- retry memang masuk akal;
- error termasuk behavior yang diantisipasi;
- caller masih bisa diberi hasil yang benar walau terbatas.

Senior engineer harus bisa membedakan dua mode ini.
Kalau semua dipaksa graceful, bug akan tersembunyi.
Kalau semua fail fast, UX bisa menjadi kaku dan tidak proporsional.

## `try/catch` Bukan Solusi Universal

`try/catch` hanya alat.
Bukan strategi penuh.

Contoh:

```js
try {
  doSomething();
} catch (error) {
  console.error(error);
}
```

Ini belum tentu baik.
Pertanyaan sebenarnya:

- lalu apa?
- error ini dipulihkan atau hanya disembunyikan?
- caller tahu bahwa operasi gagal?
- log ini cukup untuk debugging?

Menangkap error tanpa keputusan lanjutan hanyalah menunda masalah.

## Tangkap di Boundary yang Tepat

Pola sehat biasanya:

- layer rendah menambahkan context atau melempar typed error;
- layer menengah meneruskan jika belum bisa memutuskan;
- layer boundary memutuskan response, fallback, retry, atau logging utama.

Contoh boundary:

- HTTP controller;
- worker job runner;
- CLI entry point;
- React error boundary;
- event handler utama.

Kalau setiap helper kecil langsung swallow error, sistem menjadi gelap.

## Preserve Context

Error yang baik membawa context cukup untuk debugging.

Contoh buruk:

```js
throw new Error("failed");
```

Contoh lebih berguna:

```js
throw new Error(`Failed to sync invoice ${invoiceId}`);
```

Lebih baik lagi kalau Anda mempertahankan cause:

```js
throw new Error(`Failed to sync invoice ${invoiceId}`, {
  cause: error,
});
```

Kalau context hilang, root cause analysis akan lambat.

## Jangan Double Log Tanpa Alasan

Ini masalah yang sering merusak observability.

Misalnya:

- repository log error;
- service log error yang sama;
- controller log lagi;
- global middleware log lagi.

Hasilnya:

- satu kegagalan menghasilkan empat noise entry;
- signal-to-noise ratio turun;
- incident triage makin lambat.

Aturan praktis:

- tambah context di layer bawah bila perlu;
- lakukan logging utama di boundary tempat keputusan final dibuat.

## Custom Error Class

Custom error berguna kalau Anda perlu klasifikasi yang jelas.

```ts
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
```

Dengan ini caller bisa membedakan jenis kegagalan tanpa parsing string message yang rapuh.

Tetapi jangan membuat hierarchy error yang berlebihan tanpa manfaat nyata.

## Error sebagai Data vs Error dengan Exception

Ada dua gaya umum:

- melempar exception;
- mengembalikan result object seperti `{ ok: false, error }`.

### Exception Cocok Saat

- kegagalan benar-benar exceptional bagi flow saat itu;
- stack unwinding membantu;
- API yang dipakai memang idiomatik berbasis throw.

### Result Object Cocok Saat

- kegagalan adalah outcome normal yang diharapkan;
- caller harus secara eksplisit memutuskan cabang sukses/gagal;
- Anda ingin menghindari try/catch berlapis.

Contoh:

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };
```

Ini sering berguna untuk validation atau parsing.

## Jangan Campur Error Teknis dengan Error Bisnis

Contoh buruk:

- semua error dikembalikan sebagai `500`;
- semua exception dianggap bug internal;
- cancellation dianggap error fatal;
- validation dianggap server failure.

Ini membuat user experience buruk dan telemetry menipu.

Bedakan:

- request invalid;
- unauthorized;
- not found;
- conflict;
- dependency unavailable;
- internal bug.

Klasifikasi ini penting di frontend maupun backend.

## Async Error Handling

Di async flow, aturan jadi lebih halus.

Kalau Anda lupa `await` atau `.catch()`, error bisa lolos menjadi unhandled rejection.

Contoh buruk:

```js
async function run() {
  try {
    saveData();
  } catch (error) {
    console.error("tidak menangkap async rejection");
  }
}
```

Kalau `saveData()` mengembalikan promise dan tidak di-`await`, `try/catch` ini tidak berarti.

Pola benar:

```js
async function run() {
  try {
    await saveData();
  } catch (error) {
    console.error(error);
  }
}
```

## Cleanup dengan `finally`

Error handling yang sehat hampir selalu memikirkan cleanup.

```js
lock.acquire();

try {
  await doWork();
} finally {
  lock.release();
}
```

Kalau cleanup bergantung pada jalur sukses saja, failure akan meninggalkan sistem dalam kondisi bocor.

## Wrapping Error dengan Context

Pola sehat:

```js
async function loadInvoice(invoiceId) {
  try {
    return await repository.getInvoice(invoiceId);
  } catch (error) {
    throw new Error(`Failed to load invoice ${invoiceId}`, {
      cause: error,
    });
  }
}
```

Pola tidak sehat:

```js
try {
  return await repository.getInvoice(invoiceId);
} catch (error) {
  throw new Error("Failed");
}
```

Versi kedua membuang detail penting.

## Retry Harus Selektif

Retry adalah bagian dari error handling.
Tetapi retry pada error yang salah justru merusak sistem.

Layak dipertimbangkan untuk retry:

- timeout sementara;
- connection reset;
- temporary rate limit dengan backoff;
- deadlock retryable.

Biasanya tidak layak di-retry:

- validation error;
- permission error;
- not found yang final;
- programmer bug;
- payload malformed.

Kalau semua error di-retry, Anda hanya memperbanyak beban dan memperlambat kegagalan yang sebenarnya sudah pasti.

## User-Facing Message vs Internal Diagnostic

Pesan untuk user tidak harus sama dengan detail internal.

Contoh:

- user butuh pesan jelas dan aman;
- developer butuh context teknis;
- log butuh identifier dan dependency detail;
- monitoring butuh severity dan kategori.

Kalau Anda menampilkan raw error internal ke user, itu buruk untuk UX dan bisa berisiko keamanan.
Kalau Anda menyembunyikan semua detail dari observability internal, debugging jadi mahal.

## Frontend Error Handling

Di frontend, error handling sering terbagi ke:

- load failure;
- submit failure;
- optimistic update rollback;
- component rendering error;
- cancellation atau request stale.

Kesalahan umum:

- semua error ditampilkan dengan toast generik;
- request canceled dianggap error merah;
- loading state tidak dipulihkan;
- stale request menimpa state baru;
- exception render tidak dibatasi error boundary.

Frontend yang dewasa butuh pendekatan berbeda untuk tiap jenis kegagalan.

## Backend Error Handling

Di backend, error handling yang sehat mencakup:

- mapping error ke HTTP status yang tepat;
- preserving cause;
- structured logging;
- retry policy terkontrol;
- idempotency awareness;
- cleanup resource;
- crash policy untuk programmer error tertentu.

Service yang selalu membungkus semua exception menjadi `500 Something went wrong` mungkin terlihat sederhana, tetapi observability-nya buruk.

## TypeScript dan Narrowing Error

Dalam TypeScript modern, `catch (error)` sering bertipe `unknown`.
Itu bagus.
Itu memaksa Anda tidak mengasumsikan semua error pasti `Error`.

```ts
try {
  await doWork();
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Unknown error", error);
  }
}
```

Ini lebih jujur daripada cast sembarangan.

## Pattern: Mapping Error di Boundary

Contoh mental:

- repository melempar `NotFoundError`;
- service menambah context bisnis;
- controller mapping ke HTTP `404`.

Dengan pola ini:

- domain tetap bersih;
- transport mapping tidak bocor ke bawah;
- observability lebih rapi.

Ini jauh lebih sehat daripada membiarkan semua layer saling tahu detail transport.

## Pattern: Guard Clause untuk Failure Awal

Kadang penanganan error terbaik adalah menghentikan lebih awal.

```js
function processOrder(order) {
  if (!order.customerId) {
    throw new ValidationError("customerId is required");
  }

  if (order.items.length === 0) {
    throw new ValidationError("items must not be empty");
  }

  return continueProcess(order);
}
```

Guard clause membuat invariant eksplisit.

## Anti-Pattern yang Sering Terjadi

### 1. Swallow Error

```js
try {
  await doWork();
} catch {
  // ignore
}
```

Ini hanya boleh dilakukan kalau kegagalannya memang sengaja diabaikan dan ada alasan bisnis yang sangat jelas.
Selain itu, ini berbahaya.

### 2. Catch Lalu Return Nilai Default Sembarangan

```js
try {
  return await getPrice();
} catch {
  return 0;
}
```

Kalau `0` bukan fallback yang valid secara domain, Anda sedang menyembunyikan corruption.

### 3. Throw String

```js
throw "something failed";
```

Ini buruk.
Pakai `Error` atau typed error.

### 4. Parsing String Message untuk Logic

```js
if (error.message.includes("timeout")) {
  retry();
}
```

Ini rapuh.
Gunakan error type, code, atau metadata yang lebih stabil.

## Observability dan Error Handling

Error handling yang baik harus selaras dengan logging, tracing, dan metrics.

Pertanyaan yang harus bisa dijawab:

- error ini muncul dari operasi apa?
- dependency mana yang gagal?
- request atau job mana yang terdampak?
- apakah error transient atau permanent?
- berapa sering error ini terjadi?

Kalau error handling hanya memikirkan `throw` dan `catch`, Anda belum selesai.

## Heuristik Senior

1. Klasifikasikan error, jangan perlakukan semuanya sama.
2. Tangani error di boundary yang bisa membuat keputusan bermakna.
3. Tambah context tanpa membuang cause.
4. Jangan swallow error tanpa alasan kuat.
5. Logging utama cukup sekali di tempat yang tepat.
6. Bedakan programmer error dari error bisnis atau infra.
7. Retry harus selektif, bukan refleks.
8. Pesan user dan diagnostic internal punya audiens berbeda.

## Pertanyaan Interview

### Dasar

- Apa beda validation error dan programmer error?
- Kenapa `try/catch` tidak otomatis cukup untuk semua failure?
- Kenapa menelan error itu berbahaya?
- Apa fungsi `finally`?

### Menengah

- Bagaimana Anda memutuskan apakah error harus di-retry?
- Kenapa preserve context itu penting?
- Apa beda melempar exception vs mengembalikan result object?
- Bagaimana Anda mencegah duplicate logging?

### Senior

- Di layer mana sebaiknya error di-map ke HTTP status?
- Kapan sistem harus fail fast?
- Bagaimana Anda merancang error taxonomy yang cukup berguna tanpa overengineering?
- Bagaimana error handling mempengaruhi observability dan incident response?

## Koneksi ke Kasus Nyata

Topik ini muncul saat:

- integrasi API eksternal timeout;
- input form salah;
- upload file gagal parsial;
- background job retry;
- operasi database deadlock;
- UI optimistic update harus rollback;
- data parsing dari service lain rusak;
- service internal melempar exception yang perlu diubah jadi response aman.

Ini topik harian, bukan teori pinggiran.

## Ringkasan Brutal

- Error handling bukan sekadar `try/catch`.
- Failure mode harus diklasifikasikan.
- Swallow error adalah cara cepat membuat sistem gelap.
- Retry sembarangan adalah cara cepat membuat sistem makin rusak.
- Observability adalah bagian dari error handling.

Kalau Anda belum bisa menjelaskan kapan harus handle, kapan harus rethrow, dan kapan harus fail fast, berarti topik ini belum matang.

## Checklist Pemahaman

- Saya bisa membedakan validation, business, infra, dan programmer error.
- Saya tahu boundary yang tepat untuk mapping dan logging.
- Saya tidak membuang context saat membungkus error.
- Saya tidak menganggap semua error layak di-retry.
- Saya paham beda pesan user dan diagnostic internal.
- Saya paham async error harus benar-benar di-`await` agar tertangkap.
- Saya selalu memikirkan cleanup dan observability.

## Penutup

Sistem yang dewasa bukan sistem yang "tidak pernah error".
Sistem yang dewasa adalah sistem yang gagal dengan cara yang jujur, terklasifikasi, terobservasi, dan tidak membuat operator atau developer menebak-nebak.

Itulah level error handling yang membedakan engineer senior dari coder biasa.
