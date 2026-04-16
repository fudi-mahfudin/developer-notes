# Event Loop, Call Stack, Task Queue, dan Microtask Queue

## Tujuan

Topik ini wajib dikuasai jika ingin dianggap senior di JavaScript.
Banyak bug async, performa buruk, UI freeze, dan perilaku aneh di production muncul karena developer memakai `Promise`, `setTimeout`, atau `async/await` tanpa paham mekanisme runtime.
Kalau Anda hanya hafal "JavaScript single-threaded" tetapi tidak bisa menjelaskan urutan eksekusi detailnya, pemahaman Anda masih dangkal.

## Kenapa Topik Ini Penting

Saat interview senior, topik ini sering dipakai untuk mengukur kedalaman reasoning.
Saat debugging production, topik ini menentukan apakah Anda bisa membedakan masalah CPU, blocking code, starvation, race condition, atau urutan callback yang salah.
Saat menulis backend Node.js, topik ini menentukan apakah service tetap responsif di bawah beban.
Saat menulis frontend, topik ini menentukan apakah aplikasi terasa halus atau freeze.

## Gambaran Besar

Ada empat istilah yang harus benar-benar dibedakan:

- `call stack`
- `event loop`
- `task queue`
- `microtask queue`

Keempatnya saling berhubungan, tetapi bukan hal yang sama.
Kesalahan paling umum adalah mencampur istilah itu menjadi satu konsep kabur.

## Definisi Singkat

### Call Stack

`Call stack` adalah tumpukan eksekusi fungsi yang sedang berjalan.
Ketika satu fungsi dipanggil, runtime mendorong fungsi itu ke stack.
Ketika fungsi selesai, runtime mengeluarkannya dari stack.
Jika ada fungsi di dalam fungsi, stack akan bertambah dalam.
Kalau terlalu dalam, Anda akan kena `Maximum call stack size exceeded`.

### Event Loop

`Event loop` adalah mekanisme yang terus memeriksa apakah `call stack` kosong, lalu memutuskan callback mana yang boleh dieksekusi berikutnya.
Ia bukan queue.
Ia bukan thread tambahan ajaib.
Ia adalah pengatur giliran eksekusi.

### Task Queue

`Task queue` sering juga disebut `macrotask queue`.
Queue ini berisi callback yang dijadwalkan oleh mekanisme seperti:

- `setTimeout`
- `setInterval`
- event DOM
- I/O callback tertentu
- `setImmediate` pada konteks tertentu di Node.js

Task dari queue ini hanya akan diproses jika stack kosong dan microtask yang tertunda sudah habis diproses.

### Microtask Queue

`Microtask queue` adalah queue prioritas lebih tinggi dibanding task queue.
Biasanya diisi oleh:

- `.then()`, `.catch()`, `.finally()` dari `Promise`
- `queueMicrotask()`
- kelanjutan dari `await`
- `MutationObserver` di browser

Setelah satu unit kerja selesai dan stack kosong, runtime akan menghabiskan microtask dulu sebelum pindah ke task berikutnya.

## Model Mental yang Benar

Jangan bayangkan JavaScript sebagai bahasa yang "jalan paralel sendiri".
Model yang lebih akurat:

1. Satu bagian kode sinkron dieksekusi di `call stack`.
2. Operasi async didaftarkan ke API runtime atau environment.
3. Setelah operasi async siap, callback tidak langsung masuk ke stack.
4. Callback masuk dulu ke queue yang sesuai.
5. `Event loop` hanya akan memindahkan callback ke stack saat stack kosong.
6. `Microtask queue` diprioritaskan sebelum `task queue`.

Kalau model mental ini salah, Anda akan sering salah menebak output program.

## Analogi Sederhana

Bayangkan dapur restoran kecil.
`Call stack` adalah meja masak aktif.
Chef hanya bisa fokus mengerjakan satu langkah aktif pada satu waktu.
`Task queue` adalah daftar pekerjaan reguler yang menunggu giliran.
`Microtask queue` adalah daftar pekerjaan cepat yang wajib dibereskan dulu sebelum chef mengambil pekerjaan reguler berikutnya.
`Event loop` adalah aturan operasional dapur yang mengecek kapan meja masak kosong dan siapa yang boleh maju dulu.

## Single-Threaded Bukan Berarti Tidak Bisa Async

Pernyataan "JavaScript single-threaded" sering dipahami terlalu sempit.
Yang single-threaded adalah eksekusi JavaScript pada `call stack`.
Tetapi environment seperti browser atau Node.js menyediakan fasilitas async di luar stack utama:

- timer
- network
- file I/O
- event handling
- rendering pipeline

Jadi async bukan berarti JavaScript tiba-tiba jadi multi-threaded di level bahasa.
Async berarti environment membantu menunda hasil kerja lalu mengembalikannya ke queue.

## Call Stack Secara Detail

Perhatikan contoh ini:

```js
function one() {
  console.log("one start");
  two();
  console.log("one end");
}

function two() {
  console.log("two");
}

one();
```

Urutan yang terjadi:

1. Global execution context masuk stack.
2. `one()` dipanggil lalu masuk stack.
3. `console.log("one start")` dieksekusi.
4. `two()` dipanggil lalu masuk stack.
5. `console.log("two")` dieksekusi.
6. `two()` selesai dan keluar dari stack.
7. `console.log("one end")` dieksekusi.
8. `one()` selesai dan keluar dari stack.
9. Global context selesai.

Tidak ada queue di sini karena semuanya sinkron.

## Contoh Stack Overflow

```js
function loop() {
  loop();
}

loop();
```

Fungsi ini terus memanggil dirinya sendiri.
Stack terus bertambah.
Karena tidak pernah unwind, runtime akan melempar error stack overflow.

Pelajaran penting:

- `call stack` punya batas.
- Rekursi tanpa base case akan merusak program.
- Bug seperti ini bukan bug async, tetapi bug stack growth.

## Event Loop Secara Detail

`Event loop` berjalan terus selama aplikasi hidup.
Ia tidak "menjalankan semua hal sekaligus".
Ia hanya mengatur kapan callback boleh naik ke stack.

Urutan sederhananya:

1. Jalankan kode sinkron yang ada di stack.
2. Jika stack kosong, cek `microtask queue`.
3. Jalankan semua microtask sampai habis.
4. Setelah itu, ambil satu task dari `task queue`.
5. Jalankan task tersebut.
6. Setelah task selesai, cek lagi semua microtask.
7. Ulangi proses ini.

Kalau Anda lupa langkah nomor 3 dan 6, Anda akan salah memahami output `Promise`.

## Task Queue Secara Detail

`Task queue` menampung callback reguler.
Contoh paling populer adalah `setTimeout`.
Tetapi banyak orang salah paham terhadap `setTimeout(fn, 0)`.

`0` bukan berarti langsung jalan.
Artinya hanya "jangan jalankan sebelum delay minimum selesai dan stack tersedia".
Kalau stack masih sibuk atau microtask masih banyak, callback tetap menunggu.

Contoh:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
```

Output:

```js
A
C
B
```

Kenapa?

- `A` sinkron, langsung jalan.
- `setTimeout` hanya mendaftarkan callback.
- `C` sinkron, langsung jalan.
- Setelah stack kosong, callback timer baru bisa diproses dari task queue.

## Microtask Queue Secara Detail

`Microtask queue` lebih prioritas daripada `task queue`.
Ini alasan kenapa `Promise.then()` sering berjalan sebelum `setTimeout(..., 0)`.

Contoh:

```js
console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("promise");
});

console.log("end");
```

Output:

```js
start
end
promise
timeout
```

Kenapa?

1. `start` sinkron.
2. Timer didaftarkan.
3. `Promise.then()` didaftarkan sebagai microtask.
4. `end` sinkron.
5. Stack kosong.
6. Microtask `promise` jalan dulu.
7. Baru task `timeout` dijalankan.

## Aturan Penting Microtask

Setelah satu task selesai, runtime akan mencoba menghabiskan semua microtask.
Bukan hanya satu microtask.
Semua microtask yang antre akan diproses sampai kosong.

Contoh:

```js
console.log("1");

Promise.resolve().then(() => {
  console.log("2");
  Promise.resolve().then(() => {
    console.log("3");
  });
});

setTimeout(() => {
  console.log("4");
}, 0);

console.log("5");
```

Output:

```js
1
5
2
3
4
```

Kenapa `3` jalan sebelum `4`?
Karena microtask baru yang dijadwalkan dari microtask lain tetap akan dibereskan dalam putaran microtask yang sama sebelum pindah ke task queue.

## Microtask Starvation

Prioritas tinggi microtask juga punya sisi buruk.
Kalau Anda terus menambahkan microtask tanpa henti, task queue bisa kelaparan.
Ini disebut `microtask starvation`.

Contoh buruk:

```js
function spam() {
  queueMicrotask(spam);
}

spam();
```

Program seperti ini bisa membuat event lain tertunda sangat lama.
Di browser, UI bisa terasa macet.
Di server, callback lain bisa tertahan.

Ini pelajaran senior:

- Prioritas tinggi bukan berarti aman dipakai terus.
- Queue yang terlalu dominan bisa merusak fairness.
- Masalah performa sering muncul dari scheduling yang salah, bukan dari algoritma saja.

## Hubungan `async/await` dengan Microtask

Banyak developer tahu `async/await` lebih enak dibaca.
Sedikit yang benar-benar paham bahwa `await` tetap berdiri di atas `Promise`.

Contoh:

```js
async function run() {
  console.log("inside start");
  await Promise.resolve();
  console.log("inside after await");
}

console.log("before");
run();
console.log("after");
```

Output:

```js
before
inside start
after
inside after await
```

Penjelasan:

- Bagian sebelum `await` berjalan sinkron.
- Saat kena `await`, fungsi di-pause.
- Kelanjutan setelah `await` dijadwalkan sebagai microtask.
- Karena itu `after` muncul dulu.

## `Promise` Bukan Thread

Ini kesalahan konsep yang harus dibunuh.
`Promise` bukan thread.
`Promise` bukan proses background.
`Promise` hanyalah representasi hasil async yang akan tersedia nanti.

Yang membuat kerja async terjadi adalah environment:

- browser APIs
- Node.js APIs
- sistem operasi
- library internal runtime

`Promise` hanya memberi model komposisi dan scheduling lanjutan.

## Browser vs Node.js

Konsep umumnya sama, tetapi detail implementasi environment berbeda.
Browser punya event loop yang dekat dengan rendering.
Node.js punya event loop dengan fase-fase spesifik seperti timers, poll, dan check.

Untuk pemahaman dasar:

- `call stack` tetap ada
- `task queue` tetap ada
- `microtask queue` tetap ada
- prioritas microtask tetap penting

Untuk pemahaman senior:

- detail fase event loop Node.js penting saat debugging backend
- interaksi rendering penting saat debugging browser performance

## Kenapa UI Bisa Freeze

Banyak orang salah menyalahkan async ketika UI freeze.
Padahal penyebab paling sering adalah kode sinkron berat yang memblokir `call stack`.

Contoh:

```js
button.addEventListener("click", () => {
  const start = Date.now();
  while (Date.now() - start < 3000) {}
  console.log("done");
});
```

Selama loop ini berjalan:

- stack sibuk
- event lain tidak bisa diproses
- render tertunda
- input user terasa macet

Jadi masalahnya bukan "event loop rusak".
Masalahnya stack diblokir oleh kerja sinkron berat.

## Kenapa `setTimeout` Tidak Akurat

Sebagian developer mengira `setTimeout(fn, 1000)` berarti callback pasti jalan tepat 1000 ms.
Salah.

Yang benar:

- callback tidak akan diproses sebelum delay minimum selesai
- callback tetap harus menunggu stack kosong
- callback tetap kalah prioritas dari microtask yang menumpuk

Karena itu timer adalah "earliest possible scheduling", bukan jaminan waktu presisi.

## Urutan Eksekusi yang Sering Menjebak

Lihat contoh ini:

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));

console.log("E");
```

Output:

```js
A
E
C
D
B
```

Penjelasan brutalnya:

- `A` dan `E` adalah sinkron.
- `C` adalah microtask pertama.
- `D` menjadi microtask lanjutan dari chain promise.
- `B` tetap menunggu karena ia ada di task queue.

Kalau Anda menjawab `A E B C D`, berarti Anda belum paham prioritas queue.

## Contoh Kombinasi `await` dan Timer

```js
async function example() {
  console.log("1");
  setTimeout(() => console.log("2"), 0);
  await null;
  console.log("3");
}

console.log("4");
example();
console.log("5");
```

Output:

```js
4
1
5
3
2
```

Kenapa `3` lebih dulu?
Karena kelanjutan setelah `await` masuk microtask.
Timer tetap ada di task queue.

## Peran `queueMicrotask()`

`queueMicrotask()` memberi cara eksplisit untuk mendaftarkan microtask.
Ini berguna kalau Anda memang ingin menjalankan pekerjaan sangat cepat setelah stack selesai tetapi sebelum task lain diproses.

Namun jangan dipakai sembarangan.
Kalau semua hal dijadikan microtask, fairness memburuk.
Ini tools khusus, bukan default answer untuk semua scheduling.

## Hubungan dengan Render di Browser

Browser umumnya melakukan render di sela-sela putaran event loop.
Kalau Anda terus menahan stack atau menumpuk microtask berlebihan, render bisa tertunda.
Akibatnya:

- animasi patah-patah
- interaksi terasa lag
- loading state tidak muncul tepat waktu

Jadi memahami event loop bukan teori kosong.
Ia langsung berdampak ke UX.

## Hubungan dengan Backend Node.js

Di backend, kesalahan memahami event loop bisa menyebabkan:

- request lambat
- throughput turun
- callback penting tertunda
- timeout beruntun
- service terlihat "random" padahal penyebabnya scheduling atau blocking code

Contoh umum:

- parsing JSON sangat besar secara sinkron
- looping CPU-heavy di request handler
- komputasi hashing berat di thread utama tanpa strategi yang tepat

## Miskonsepsi yang Paling Umum

### Miskonsepsi 1

`setTimeout(fn, 0)` berarti langsung jalan.

Salah.
Ia hanya masuk jalur task.

### Miskonsepsi 2

`Promise` berjalan paralel.

Salah.
Yang paralel atau async adalah pekerjaan environment-nya, bukan `Promise` itu sendiri.

### Miskonsepsi 3

Kalau pakai `await`, urutan kode jadi sinkron murni.

Salah.
Ia terlihat sinkron secara syntax, tetapi tetap memakai scheduling async.

### Miskonsepsi 4

Semua callback punya prioritas yang sama.

Salah.
Microtask lebih prioritas dari task.

### Miskonsepsi 5

Masalah async selalu berarti race condition.

Salah.
Kadang masalahnya cuma blocking synchronous code.

## Trade-off Praktis

### Kapan Microtask Berguna

- Finalisasi kecil setelah operasi sinkron selesai.
- Menjaga urutan internal library.
- Menjalankan kelanjutan `Promise` dengan cepat.

### Kapan Task Lebih Aman

- Saat ingin memberi kesempatan render atau I/O lain berjalan dulu.
- Saat ingin menghindari starvation.
- Saat pekerjaan tidak harus super-prioritas.

### Trade-off Inti

- Microtask lebih cepat diproses, tetapi lebih mudah menciptakan starvation.
- Task lebih lambat, tetapi lebih fair terhadap pekerjaan lain.
- Kode sinkron sederhana mudah dibaca, tetapi bisa memblokir sistem jika berat.

## Debugging Pattern untuk Dunia Nyata

Saat urutan log tidak sesuai ekspektasi, jangan panik.
Pakai checklist ini:

1. Tandai mana kode sinkron.
2. Tandai mana callback task.
3. Tandai mana callback microtask.
4. Cek apakah ada `await` yang memecah flow.
5. Cek apakah ada loop sinkron berat yang menahan stack.
6. Cek apakah ada microtask yang memicu microtask lagi terus-menerus.

Kalau perlu, pecah kode jadi log kecil dan prediksi output sebelum run.
Senior engineer tidak menebak.
Senior engineer memodelkan eksekusi.

## Contoh Cara Menjelaskan di Interview

Jawaban jelek:

"Event loop itu buat async supaya JavaScript bisa multitasking."

Jawaban ini dangkal, kabur, dan setengah salah.

Jawaban yang lebih tajam:

"JavaScript mengeksekusi kode sinkron di call stack. Saat ada operasi async seperti timer, network, atau promise continuation, callback tidak langsung dieksekusi, tetapi masuk ke queue. Event loop memindahkan callback ke stack hanya saat stack kosong. Yang penting, microtask seperti promise continuation diproses lebih dulu sebelum task seperti setTimeout, sehingga urutan output sering berbeda dari urutan penulisan kode."

Itu baru jawaban yang menunjukkan pemahaman.

## Contoh Kasus Nyata di Kerja

Misalnya Anda punya halaman dashboard yang memicu:

- fetch data
- update state
- render tabel besar
- loading indicator

Kalau Anda salah mengelola scheduling:

- loading tidak muncul tepat waktu
- render terasa berat
- event klik terasa terlambat
- retry logic tampak kacau

Memahami event loop membantu Anda menjawab:

- mana yang benar-benar blocking
- mana yang hanya tertunda scheduling
- mana yang harus diprioritaskan
- mana yang harus dipindah ke strategi lain

## Relevansi ke Level Senior

Level junior cukup tahu contoh output.
Level menengah tahu bedanya `Promise` dan `setTimeout`.
Level senior harus bisa:

- menjelaskan model runtime dengan presisi
- menghubungkan teori ke bug production
- memilih scheduling yang tepat
- menghindari starvation dan blocking
- mengedukasi tim yang salah paham

Kalau Anda belum bisa menghubungkan topik ini ke reliability dan performance, Anda belum ada di level senior.

## Checklist Pemahaman

- [ ] Saya bisa menjelaskan perbedaan `call stack`, `event loop`, `task queue`, dan `microtask queue`.
- [ ] Saya tahu kenapa `Promise.then()` biasanya jalan sebelum `setTimeout(..., 0)`.
- [ ] Saya paham bahwa `await` melanjutkan eksekusi melalui microtask.
- [ ] Saya tahu kenapa `setTimeout` bukan jaminan waktu presisi.
- [ ] Saya bisa membedakan blocking synchronous code vs scheduling async.
- [ ] Saya paham risiko `microtask starvation`.
- [ ] Saya bisa menjelaskan dampaknya ke browser dan Node.js.

## Latihan Mandiri

### Latihan 1

Prediksi output dari kombinasi:

- `console.log`
- `setTimeout`
- `Promise.resolve().then`

Lalu buktikan hasilnya.

### Latihan 2

Buat contoh `async/await` yang menghasilkan output tidak sesuai urutan tulisannya.
Jelaskan kenapa itu terjadi.

### Latihan 3

Buat contoh loop sinkron berat yang memblokir UI atau request handler.
Jelaskan kenapa event loop tidak bisa "menyelamatkan" kasus itu.

### Latihan 4

Bandingkan perilaku:

- `queueMicrotask`
- `Promise.resolve().then`
- `setTimeout(..., 0)`

Jelaskan prioritas dan risiko masing-masing.

## Pertanyaan Interview yang Harus Bisa Dijawab

- Apa perbedaan `call stack`, `task queue`, dan `microtask queue`?
- Kenapa `Promise.then()` dieksekusi sebelum `setTimeout(..., 0)`?
- Apa hubungan `await` dengan microtask?
- Kenapa JavaScript disebut single-threaded tetapi tetap bisa async?
- Dalam kasus apa event loop tidak membantu dan aplikasi tetap freeze?
- Apa risiko terlalu banyak microtask?
- Bagaimana topik ini memengaruhi performa frontend dan backend?

## Ringkasan Brutal

Kalau Anda tidak paham topik ini, Anda akan sering salah membaca perilaku JavaScript.
Akibatnya Anda akan:

- salah memprediksi output
- salah diagnosis bug async
- salah memilih strategi scheduling
- salah menyalahkan framework padahal masalahnya runtime behavior

Kalau Anda ingin dianggap senior JavaScript developer, pemahaman topik ini harus tajam, operasional, dan bisa dipakai menjelaskan masalah nyata, bukan sekadar hafalan definisi.
