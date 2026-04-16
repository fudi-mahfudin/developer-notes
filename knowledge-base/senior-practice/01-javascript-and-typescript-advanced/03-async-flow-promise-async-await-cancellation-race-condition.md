# Async Flow: `Promise`, `async/await`, Cancellation, dan Race Condition

## Tujuan

Topik ini wajib dikuasai kalau Anda ingin dianggap senior di JavaScript atau TypeScript.
Banyak developer bisa menulis `async/await`, tetapi gagal menjelaskan kapan eksekusi lanjut, bagaimana error merambat, kapan operasi bisa dibatalkan, dan kenapa data yang tampil bisa salah walaupun code terlihat "benar".

Kalau pemahaman async flow Anda dangkal, hasilnya biasanya satu dari tiga hal:

- bug yang sulit direproduksi;
- UI atau backend yang terlihat random;
- code yang tampak rapi tetapi rapuh di production.

## Kenapa Topik Ini Penting

JavaScript modern penuh dengan operasi async:

- HTTP request
- database query
- file I/O
- timer
- event listener
- background processing
- streaming
- retry dan backoff

Kalau Anda bekerja di frontend, async flow menentukan apakah UI menampilkan data yang benar, loading state yang sehat, dan pembatalan request yang aman.
Kalau Anda bekerja di backend, async flow menentukan apakah service Anda bisa menjaga latensi, cleanup resource, dan error handling yang konsisten.

Saat interview senior, topik ini sering dipakai untuk membedakan developer yang sekadar bisa "pakai syntax" dengan developer yang benar-benar paham runtime behavior dan failure mode.

## Gambaran Besar

Ada empat area inti:

- `Promise`
- `async/await`
- cancellation
- race condition

Urutan belajarnya jangan dibalik.

1. Pahami dulu bahwa async bukan magic parallelism.
2. Pahami `Promise` sebagai representasi hasil async.
3. Pahami `async/await` sebagai syntax di atas `Promise`.
4. Pahami bahwa cancellation tidak otomatis ada.
5. Pahami bahwa race condition tetap bisa terjadi walaupun code memakai `await`.

Kalau urutan ini kacau, Anda akan terus salah desain flow async.

## Model Mental yang Benar

Pegang lima kalimat ini:

1. `Promise` mewakili hasil operasi async yang belum selesai atau sudah selesai.
2. `await` tidak menghentikan seluruh program; ia hanya menjeda function async tersebut.
3. Error async tidak ditangani oleh `try/catch` biasa kecuali error itu benar-benar di-`await`.
4. Cancellation harus didesain; ia tidak muncul otomatis hanya karena Anda punya `Promise`.
5. Race condition terjadi saat hasil yang datang belakangan justru menimpa hasil yang lebih relevan.

Kalau lima poin ini belum solid di kepala Anda, async flow Anda belum matang.

## Async Bukan Berarti Semua Jalan Bersamaan

Banyak developer memakai kata "async" seolah itu sama dengan "langsung paralel".
Itu salah.

Async berarti Anda tidak memblok eksekusi sinkron saat menunggu hasil.
Tetapi apakah pekerjaannya jalan paralel, concurrent, serial, atau cuma tertunda, itu bergantung pada environment dan desain code.

Contoh:

```js
async function run() {
  const a = await fetchA();
  const b = await fetchB();
  return [a, b];
}
```

Code di atas serial.
`fetchB()` baru mulai setelah `fetchA()` selesai.

Kalau tujuannya independen, Anda mungkin justru ingin:

```js
async function run() {
  const promiseA = fetchA();
  const promiseB = fetchB();

  const [a, b] = await Promise.all([promiseA, promiseB]);
  return [a, b];
}
```

Di sini inisiasi dua operasi terjadi lebih cepat dan menunggu hasilnya bersama.

Jadi `await` yang kelihatan bersih belum tentu efisien.

## `Promise`

### Definisi Singkat

`Promise` adalah object yang merepresentasikan eventual completion atau failure dari operasi async.
Ia bukan hasil akhirnya.
Ia adalah wadah status dan nilai masa depan.

### Tiga State Utama

Secara praktis `Promise` punya tiga state:

- `pending`
- `fulfilled`
- `rejected`

Kalau sudah `fulfilled` atau `rejected`, status itu final.
`Promise` tidak bisa balik menjadi `pending`.

### Fulfilled vs Resolved

Ini detail yang sering diabaikan.
`Resolved` tidak selalu berarti sudah punya nilai final sinkron.
Sebuah promise bisa di-resolve dengan promise lain.

Contoh mental:

```js
const outer = Promise.resolve(Promise.resolve(42));
```

Runtime akan melakukan assimilation sampai nilai akhirnya jelas.
Jadi jangan terlalu longgar memakai istilah `resolved` seolah selalu sama dengan `fulfilled`.

### Membuat Promise

Contoh dasar:

```js
const promise = new Promise((resolve, reject) => {
  const ok = true;

  if (ok) {
    resolve("success");
  } else {
    reject(new Error("failed"));
  }
});
```

Tetapi jangan terlalu sering membungkus operasi manual dengan `new Promise` jika tidak perlu.
Banyak codebase penuh `Promise` wrapper yang tidak menambah nilai dan justru menambah bug.

## Konsumsi Promise

### `.then()`

`.then()` dipakai untuk mendaftarkan kelanjutan saat promise berhasil.

```js
fetchUser()
  .then((user) => {
    return user.name;
  })
  .then((name) => {
    console.log(name);
  });
```

### `.catch()`

`.catch()` menangani rejection di rantai sebelumnya.

```js
fetchUser()
  .then((user) => {
    return user.profile.name;
  })
  .catch((error) => {
    console.error(error);
  });
```

### `.finally()`

`.finally()` dipakai untuk cleanup atau penutupan state yang harus terjadi baik berhasil maupun gagal.

```js
setLoading(true);

fetchUser()
  .then(renderUser)
  .catch(showError)
  .finally(() => {
    setLoading(false);
  });
```

`finally()` bukan tempat untuk mengubah hasil utama secara diam-diam.
Ia lebih tepat untuk cleanup.

## Promise Chaining

Keunggulan utama `Promise` adalah chaining yang eksplisit.

```js
readConfig()
  .then(validateConfig)
  .then(connectDatabase)
  .then(startServer)
  .catch(handleStartupFailure);
```

Setiap `.then()` mengembalikan promise baru.
Itu sebabnya error yang dilempar di salah satu step bisa turun ke `.catch()` berikutnya.

## Error Propagation pada Promise

Ini sangat penting.
Dalam chain promise:

- `throw` di dalam `.then()` menjadi rejection;
- return promise yang reject juga akan menolak rantai;
- `.catch()` bisa menangani error sebelumnya;
- kalau `.catch()` mengembalikan nilai biasa, chain bisa lanjut sebagai sukses.

Contoh:

```js
fetchUser()
  .then((user) => {
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  })
  .catch((error) => {
    console.error("fallback:", error.message);
    return { name: "guest" };
  })
  .then((user) => {
    console.log(user.name);
  });
```

Setelah `.catch()` mengembalikan object, chain kembali ke jalur sukses.
Ini bisa berguna, tetapi juga berbahaya kalau Anda tanpa sadar menyembunyikan kegagalan.

## Anti-Pattern Promise yang Sering Muncul

### 1. Promise Constructor Wrapping Tanpa Alasan

Contoh buruk:

```js
function getUser() {
  return new Promise((resolve, reject) => {
    fetch("/api/user")
      .then(resolve)
      .catch(reject);
  });
}
```

Ini hampir selalu tidak perlu.
Langsung return promise aslinya lebih bersih.

### 2. Lupa `return` di Chain

```js
fetchUser()
  .then((user) => {
    saveAuditLog(user);
  })
  .then(() => {
    console.log("done");
  });
```

Kalau `saveAuditLog(user)` async tetapi tidak di-return, chain berikutnya tidak menunggu.
Ini bug klasik.

### 3. Menelan Error di `.catch()`

```js
fetchUser().catch(() => {});
```

Kalau Anda menelan error tanpa logging, fallback, atau alasan bisnis yang jelas, Anda sedang membunuh observability.

## `async/await`

### Definisi Singkat

`async/await` adalah syntax yang membuat flow promise terlihat lebih linear.
Ia bukan pengganti mekanisme `Promise`.
Ia adalah lapisan syntax di atas `Promise`.

Function yang diberi keyword `async` selalu mengembalikan promise.

```js
async function getValue() {
  return 42;
}
```

Secara praktis ini mirip:

```js
function getValue() {
  return Promise.resolve(42);
}
```

### Apa yang Dilakukan `await`

`await` menunggu settlement dari promise lalu melanjutkan eksekusi function async setelah hasil tersedia.

Tetapi penting:

- `await` tidak memblok seluruh thread aplikasi;
- `await` hanya menjeda kelanjutan function async tersebut;
- kelanjutan itu dijadwalkan kembali melalui mekanisme microtask.

Kalau model ini tidak dipahami, orang sering bicara seolah `await` "menghentikan semuanya".
Itu salah.

## Contoh Dasar `async/await`

```js
async function loadUser() {
  const response = await fetch("/api/user");
  const user = await response.json();
  return user;
}
```

Ini lebih mudah dibaca daripada promise chaining panjang.
Tetapi lebih mudah dibaca bukan berarti otomatis lebih aman.

## Error Handling dengan `async/await`

Pola paling umum:

```js
async function loadUser() {
  try {
    const response = await fetch("/api/user");

    if (!response.ok) {
      throw new Error("Request failed");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

### `try/catch` Hanya Menangkap yang Benar-Benar Di-`await`

Ini poin penting.

```js
async function broken() {
  try {
    fetch("/api/user").then(() => {
      throw new Error("boom");
    });
  } catch (error) {
    console.log("tidak tertangkap di sini");
  }
}
```

Error di callback async tersebut tidak tertangkap oleh `try/catch` luar karena flow-nya sudah keluar.

Kalau ingin tertangkap:

```js
async function fixed() {
  try {
    await fetch("/api/user").then(() => {
      throw new Error("boom");
    });
  } catch (error) {
    console.log("tertangkap");
  }
}
```

Kalau Anda tidak paham batas ini, Anda akan merasa error handling async itu "acak".
Padahal bukan acak.
Andalah yang salah memahami boundary eksekusi.

## `await` Serial vs Paralel

Ini sumber bug performa yang sangat sering terjadi.

### Serial

```js
async function loadDashboard() {
  const user = await getUser();
  const notifications = await getNotifications();
  const settings = await getSettings();

  return { user, notifications, settings };
}
```

Kalau ketiga operasi independen, ini lambat.

### Paralel

```js
async function loadDashboard() {
  const userPromise = getUser();
  const notificationsPromise = getNotifications();
  const settingsPromise = getSettings();

  const [user, notifications, settings] = await Promise.all([
    userPromise,
    notificationsPromise,
    settingsPromise,
  ]);

  return { user, notifications, settings };
}
```

Senior engineer harus bisa melihat perbedaan ini dengan cepat.

## `Promise.all`, `Promise.allSettled`, `Promise.race`, `Promise.any`

### `Promise.all`

Dipakai saat semua hasil dibutuhkan dan satu kegagalan harus menggagalkan keseluruhan.

```js
const [user, team] = await Promise.all([getUser(), getTeam()]);
```

Kalau satu reject, keseluruhan reject.

### `Promise.allSettled`

Dipakai saat Anda ingin tahu hasil semua operasi, baik sukses maupun gagal.

```js
const results = await Promise.allSettled([
  syncUsers(),
  syncOrders(),
  syncInvoices(),
]);
```

Ini cocok untuk batch job, dashboard admin, atau observability summary.

### `Promise.race`

Mengembalikan hasil promise pertama yang settle, baik sukses maupun gagal.

Contoh umum:

```js
const timeout = new Promise((_, reject) => {
  setTimeout(() => reject(new Error("timeout")), 3000);
});

const result = await Promise.race([fetchData(), timeout]);
```

Tetapi ingat:
`Promise.race` tidak otomatis membatalkan promise lain yang kalah.
Ini kesalahan konsep yang sangat sering terjadi.

### `Promise.any`

Mengembalikan promise pertama yang berhasil fulfilled.
Cocok untuk fallback ke beberapa sumber data.

```js
const data = await Promise.any([
  fetchFromPrimary(),
  fetchFromReplica(),
  fetchFromCache(),
]);
```

Kalau semua gagal, hasilnya reject dengan `AggregateError`.

## Cancellation

### Kenapa Cancellation Penting

Di dunia nyata, tidak semua operasi yang dimulai masih relevan saat hasilnya datang.

Contoh:

- user menutup halaman;
- user mengetik keyword baru sebelum request lama selesai;
- server shutdown saat request masih berjalan;
- job timeout dan tidak layak diteruskan;
- komponen UI unmount.

Kalau operasi lama tetap dibiarkan:

- resource terbuang;
- UI bisa menampilkan data usang;
- callback lama bisa menimpa state baru;
- memory atau koneksi bisa bertahan lebih lama dari perlu.

### Promise Tidak Punya Cancellation Bawaan

Ini fakta penting.
`Promise` standard JavaScript tidak punya `.cancel()`.

Karena itu cancellation harus didesain di level operasi, bukan di level promise mentah.

### `AbortController`

Di platform web modern dan Node.js modern, cancellation yang umum dipakai adalah `AbortController`.

```js
const controller = new AbortController();

fetch("/api/user", { signal: controller.signal })
  .then((response) => response.json())
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("request dibatalkan");
      return;
    }

    throw error;
  });

controller.abort();
```

Di sini yang dibatalkan adalah operasi yang mendukung `signal`.
Bukan promise secara generik.

### Pattern Cancellation yang Sehat

Langkah umumnya:

1. buat controller;
2. pass `signal` ke operasi async;
3. saat tidak relevan lagi, panggil `abort()`;
4. tangani `AbortError` sebagai flow yang memang diharapkan, bukan sebagai error bisnis biasa.

### Cancellation Bukan Error Bisnis

Ini penting secara design.
Request yang dibatalkan user bukan berarti sistem rusak.
Jangan campur cancellation dengan:

- validation failure
- permission failure
- dependency outage
- server bug

Kalau semua dimasukkan ke log error yang sama, observability Anda jadi kotor.

## Timeout vs Cancellation

Keduanya terkait, tetapi bukan hal yang sama.

- timeout berarti operasi melewati batas waktu yang diizinkan;
- cancellation berarti operasi dinyatakan tidak lagi relevan atau harus dihentikan.

Timeout sering diimplementasikan dengan cancellation, tetapi secara konsep alasannya berbeda.

Contoh:

```js
async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();

  const timerId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });
    return response;
  } finally {
    clearTimeout(timerId);
  }
}
```

Code seperti ini lebih sehat daripada sekadar `Promise.race` timeout tanpa membatalkan request asli.

## Race Condition

### Definisi Singkat

Race condition terjadi saat hasil akhir bergantung pada urutan penyelesaian beberapa operasi yang tidak bisa Anda andalkan.

Dalam JavaScript, race condition tetap sangat mungkin terjadi walaupun eksekusi JavaScript single-threaded.
Masalahnya bukan dua baris sinkron berjalan bersamaan.
Masalahnya adalah beberapa operasi async selesai dalam urutan yang tidak stabil.

### Contoh UI Search

Bayangkan user mengetik:

1. `r`
2. `re`
3. `rea`

Setiap input men-trigger request.
Kalau request untuk `r` selesai paling akhir dan Anda langsung set state dari hasil itu, UI bisa menampilkan hasil lama walaupun user sekarang sudah mengetik `rea`.

Itulah race condition.

Contoh buruk:

```js
async function handleSearch(query) {
  const result = await search(query);
  setResults(result);
}
```

Secara syntax ini bersih.
Secara behavior ini bisa salah total.

### Kenapa `await` Tidak Menyelesaikan Race Condition

`await` hanya membuat satu function terlihat linear.
Ia tidak memberi jaminan bahwa request yang relevan akan selesai paling akhir.

Jadi kalau Anda berpikir "saya sudah pakai `await`, berarti aman", itu keliru.

## Cara Menangani Race Condition

### 1. Abort Request Lama

Pendekatan paling sehat untuk request yang memang tidak relevan lagi.

```js
let currentController;

async function handleSearch(query) {
  currentController?.abort();
  currentController = new AbortController();

  try {
    const response = await fetch(`/api/search?q=${query}`, {
      signal: currentController.signal,
    });

    const result = await response.json();
    setResults(result);
  } catch (error) {
    if (error.name !== "AbortError") {
      throw error;
    }
  }
}
```

Ini tidak hanya mencegah stale update.
Ia juga menghentikan kerja yang tidak lagi perlu.

### 2. Gunakan Request ID atau Versioning

Kalau operasi tidak bisa dibatalkan, Anda bisa validasi bahwa hasil yang datang masih versi terbaru.

```js
let latestRequestId = 0;

async function handleSearch(query) {
  const requestId = ++latestRequestId;
  const result = await search(query);

  if (requestId !== latestRequestId) {
    return;
  }

  setResults(result);
}
```

Ini pola sederhana tetapi efektif.

### 3. Serialize Akses ke Resource Tertentu

Untuk kasus update data, kadang Anda tidak ingin beberapa operasi tulis berjalan bersaing.
Solusinya bisa berupa queue, mutex, atau sequencing eksplisit.

### 4. Gunakan Idempotency atau Last-Write-Wins dengan Sadar

Di backend atau distributed flow, Anda harus sadar aturan bisnis yang dipakai.
Kalau dua update datang bersamaan:

- apakah request pertama harus ditolak?
- apakah request terakhir menang?
- apakah perlu version check?
- apakah perlu transaction?

Kalau aturan ini tidak eksplisit, race condition akan berubah menjadi data corruption.

## Race Condition di Backend

Banyak orang mengaitkan race condition hanya ke frontend.
Itu sempit.

Di backend, race condition muncul saat:

- dua request update stok datang bersamaan;
- dua worker memproses job yang sama;
- retry menyebabkan operasi tulis ganda;
- dua service menulis state berbeda ke record yang sama;
- cache update kalah cepat dari database update.

JavaScript di Node.js tetap bisa mengalami semua ini karena sumber masalahnya adalah concurrency di level I/O, request, dan sistem, bukan hanya CPU thread JavaScript.

## Lost Update

Salah satu bentuk race condition yang umum adalah lost update.

Contoh mental:

1. request A baca saldo `100`;
2. request B baca saldo `100`;
3. request A tulis saldo `90`;
4. request B tulis saldo `80`;
5. perubahan A hilang.

Masalah ini tidak selesai hanya dengan `async/await`.
Anda butuh:

- transaction
- optimistic locking
- pessimistic locking
- compare-and-swap
- serial processing

## Retry dan Race Condition

Retry memang penting untuk reliability.
Tetapi retry juga bisa memperparah race condition kalau operasi tidak idempotent.

Contoh:

- request charge payment timeout;
- client retry;
- request pertama sebenarnya sukses telat;
- request kedua juga sukses;
- user tertagih dua kali.

Jadi saat bicara async flow di production, Anda tidak boleh berhenti di syntax `await`.
Anda harus berpikir:

- apakah operasi ini aman diulang?
- apa efek jika response datang terlambat?
- apa yang terjadi jika dua actor melakukan hal yang sama bersamaan?

## Cleanup dan Resource Safety

Async flow yang sehat selalu memikirkan cleanup:

- timer dibersihkan;
- subscription dilepas;
- abort controller dipanggil saat tidak relevan;
- loading state dipulihkan;
- file handle atau stream ditutup;
- lock dilepas.

Kalau cleanup diabaikan, bug Anda mungkin tidak langsung muncul sebagai exception.
Ia muncul sebagai:

- memory leak;
- zombie request;
- koneksi menggantung;
- UI stuck di loading;
- throughput turun perlahan.

## `finally` untuk Cleanup

Pola ini sangat penting:

```js
async function processJob() {
  acquireLock();

  try {
    await doWork();
  } finally {
    releaseLock();
  }
}
```

Kalau resource acquisition tidak diikuti cleanup yang terjamin, Anda sedang membuat bom waktu.

## Unhandled Rejection

Unhandled rejection adalah sinyal bahwa ada promise yang reject tanpa penanganan yang layak.

Ini buruk karena:

- error bisa hilang dari flow bisnis;
- state sistem bisa setengah jalan;
- observability jadi lemah;
- di beberapa environment, ini bisa menyebabkan proses dianggap gagal.

Contoh buruk:

```js
doImportantTask();
```

Kalau `doImportantTask()` async dan Anda tidak `await` atau `.catch()`, Anda mungkin kehilangan error.

Pola yang lebih sadar:

```js
void doImportantTask().catch((error) => {
  reportError(error);
});
```

Atau memang `await` hasilnya di tempat yang tepat.

## Fire-and-Forget Itu Berbahaya

Kadang fire-and-forget masuk akal.
Tetapi secara default, ini berbahaya.

Kalau Anda memulai operasi async tanpa lifecycle yang jelas, tanyakan:

- siapa yang bertanggung jawab pada error-nya?
- apa yang terjadi kalau proses mati di tengah jalan?
- apakah hasilnya masih relevan?
- apakah perlu retry?
- apakah perlu cancellation?

Kalau tidak ada jawaban jelas, berarti desain Anda lemah.

## Concurrency Limiting

Masalah async flow bukan cuma serial vs paralel.
Kadang terlalu banyak paralel juga buruk.

Contoh:

- memanggil 10.000 request sekaligus ke dependency;
- membaca terlalu banyak file bersamaan;
- memproses job tanpa batas;
- memukul database dengan burst yang tidak dikontrol.

Solusinya sering berupa concurrency limit atau batching.

Senior engineer harus paham bahwa "lebih paralel" tidak identik dengan "lebih baik".

## Heuristik Praktis

Gunakan aturan berikut:

1. Kalau operasi independen, evaluasi apakah perlu `Promise.all`.
2. Kalau hanya satu hasil paling cepat yang penting, evaluasi `Promise.race` atau `Promise.any` dengan hati-hati.
3. Kalau operasi bisa jadi tidak relevan lagi, siapkan cancellation.
4. Kalau hasil lama bisa menimpa hasil baru, anggap ada race condition sampai terbukti aman.
5. Kalau ada resource yang dibuka, siapkan cleanup dengan `finally`.
6. Jangan menelan error async tanpa alasan bisnis yang jelas.
7. Jangan percaya bahwa syntax yang rapi berarti flow-nya benar.

## Pertanyaan Interview yang Sering Muncul

### Dasar

- Apa beda `Promise` dengan `async/await`?
- Apa yang terjadi jika function `async` me-return nilai biasa?
- Apa beda `Promise.all` dan `Promise.allSettled`?
- Kenapa `await` serial bisa menyebabkan latency membengkak?

### Menengah

- Kenapa `Promise.race` tidak sama dengan cancellation?
- Bagaimana Anda membedakan timeout dengan cancellation?
- Kenapa `try/catch` kadang tidak menangkap error async?
- Bagaimana Anda menangani request search agar hasil lama tidak menimpa hasil baru?

### Senior

- Bagaimana Anda mendesain cancellation di frontend dan backend?
- Bagaimana Anda memutuskan operasi mana yang boleh paralel dan mana yang harus serial?
- Apa risiko retry terhadap operasi non-idempotent?
- Bagaimana Anda menjelaskan race condition pada sistem Node.js walaupun JavaScript single-threaded?

## Cara Menjelaskan di Interview

Jawaban yang kuat jangan berhenti di definisi syntax.
Gunakan struktur ini:

1. jelaskan model mental;
2. jelaskan perilaku runtime;
3. jelaskan failure mode;
4. jelaskan trade-off desain.

Contoh jawaban ringkas yang kuat:

"`Promise` adalah representasi hasil async, sedangkan `async/await` hanya syntax yang membuat flow promise terlihat linear. Cancellation bukan bawaan promise, jadi harus didesain di level operasi, misalnya dengan `AbortController`. Dan walaupun memakai `await`, race condition tetap bisa terjadi kalau beberapa request selesai dalam urutan yang tidak stabil lalu menimpa state yang salah."

Kalau Anda bisa menjawab seperti itu, Anda terlihat paham sistem, bukan sekadar hafal API.

## Koneksi ke Kasus Nyata

Dalam kerja nyata, topik ini muncul di banyak tempat:

- form submit yang bisa di-click berulang;
- search autocomplete;
- load dashboard dengan banyak endpoint;
- sinkronisasi data lintas sistem;
- retry request ke dependency eksternal;
- graceful shutdown service Node.js;
- background job yang timeout;
- pembacaan cache dan database yang bisa saling balapan.

Jadi ini bukan topik akademik.
Ini topik survival.

## Ringkasan Brutal

- `Promise` adalah wadah hasil async, bukan hasil itu sendiri.
- `async/await` hanya syntax di atas `Promise`.
- `await` tidak membuat code otomatis optimal atau aman.
- cancellation harus didesain, bukan diasumsikan.
- race condition tetap hidup walaupun syntax Anda bersih dan JavaScript single-threaded.

Kalau lima poin itu belum benar-benar tertanam, Anda belum aman menulis flow async kompleks.

## Checklist Pemahaman

- Saya bisa menjelaskan kapan `await` membuat flow serial yang tidak perlu.
- Saya bisa memilih antara `Promise.all`, `Promise.allSettled`, `Promise.race`, dan `Promise.any`.
- Saya paham kenapa `Promise.race` tidak otomatis membatalkan operasi lain.
- Saya paham bahwa `Promise` tidak punya cancellation bawaan.
- Saya bisa memakai `AbortController` untuk request yang tidak lagi relevan.
- Saya bisa mengenali race condition pada UI dan backend.
- Saya bisa menjelaskan kenapa retry bisa berbahaya tanpa idempotency.
- Saya selalu memikirkan cleanup, timeout, dan error propagation.

## Penutup

Kalau Anda ingin naik level, berhenti puas karena "code saya sudah pakai `async/await`".
Itu standar minimum, bukan bukti kedewasaan teknis.

Yang membedakan engineer senior adalah kemampuan membaca async flow sebagai sistem:

- urutan eksekusi;
- dampak performa;
- propagasi error;
- lifecycle operasi;
- cancellation;
- dan race condition.

Kalau Anda kuat di area ini, kualitas reasoning Anda akan terlihat jauh lebih senior, baik di interview maupun di production incident.
