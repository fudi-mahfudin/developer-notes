# Immutability vs Mutation dan Dampaknya ke Maintainability

## Tujuan

Topik ini terlihat sederhana, tetapi sering jadi pemisah antara developer yang hanya bisa membuat fitur jalan dengan developer yang bisa menjaga codebase tetap waras saat sistem membesar.
Masalah immutability vs mutation bukan soal dogma.
Ini soal predictability, debugging, coupling, performance, dan kualitas perubahan jangka panjang.

Kalau Anda tidak paham topik ini, gejala yang sering muncul adalah:

- state berubah diam-diam;
- bug sulit ditelusuri karena data yang sama dimodifikasi di banyak tempat;
- komponen frontend re-render aneh;
- cache menjadi stale atau salah;
- fungsi yang kelihatan aman ternyata punya side effect;
- refactor kecil memicu regresi yang tidak proporsional.

## Kenapa Topik Ini Penting

JavaScript membuat mutation sangat mudah.
Array bisa di-`push`, object bisa langsung ditimpa, nested structure bisa diubah tanpa proteksi apa pun.

Kemudahan itu berguna.
Tetapi kemudahan juga berarti risiko.

Saat aplikasi kecil, mutation liar mungkin masih terasa murah.
Saat codebase besar, banyak module, banyak contributor, banyak asynchronous flow, mutation yang tidak terkontrol akan menjadi sumber chaos.

Senior engineer harus bisa menjawab bukan hanya:

- "bagaimana cara mengubah data?"

Tetapi juga:

- "siapa yang boleh mengubah data?"
- "kapan perubahan harus terlihat?"
- "bagaimana menjaga reasoning tetap lokal?"
- "berapa biaya copy dibanding risiko side effect?"

## Definisi Dasar

### Mutation

Mutation berarti mengubah data yang sudah ada.

Contoh:

```js
const user = { name: "Alya" };
user.name = "Bima";
```

Object yang sama berubah.

### Immutability

Immutability berarti setelah data dibuat, data itu tidak diubah.
Kalau perlu perubahan, Anda membuat nilai baru.

```js
const user = { name: "Alya" };
const nextUser = { ...user, name: "Bima" };
```

`user` lama tetap.
Perubahan direpresentasikan sebagai nilai baru.

## Model Mental yang Benar

Pegang poin ini:

1. Mutation bukan otomatis salah.
2. Immutability bukan otomatis lebih cepat.
3. Immutability biasanya membuat reasoning lebih aman.
4. Mutation biasanya lebih hemat alokasi jangka pendek.
5. Pilihan yang benar bergantung pada boundary data, ownership, dan lifecycle.

Kalau diskusi berhenti di "pokoknya immutable lebih baik", itu jawaban dangkal.

## Value vs Reference

Sumber kebingungan besar di JavaScript berasal dari perbedaan value dan reference.

Primitive seperti string, number, boolean lebih mudah dipahami karena perilakunya seperti value.
Tetapi object dan array bekerja melalui reference.

```js
const a = { count: 1 };
const b = a;

b.count = 2;

console.log(a.count); // 2
```

Masalahnya bukan syntax.
Masalahnya adalah dua variabel menunjuk object yang sama.

Kalau developer tidak paham ini, ia akan merasa JavaScript "aneh".
Padahal yang aneh adalah model mentalnya.

## Shared Mutable State

Ini musuh utamanya.
Shared mutable state berarti beberapa bagian sistem memegang referensi ke data yang sama lalu salah satunya mengubah data itu.

Contoh:

```js
function applyDiscount(cart) {
  cart.total = cart.total * 0.9;
}

const cart = { total: 100 };
const cartForSummary = cart;

applyDiscount(cart);

console.log(cartForSummary.total); // 90
```

Kalau perubahan itu disengaja dan boundary-nya jelas, tidak masalah.
Tetapi sering kali perubahan seperti ini terjadi diam-diam dan membuat module lain menerima efek samping yang tidak diantisipasi.

## Side Effect dan Maintainability

Mutation hampir selalu terkait dengan side effect.
Function bukan hanya menghasilkan output.
Ia juga mengubah sesuatu di luar dirinya.

Contoh:

```js
function addItem(items, item) {
  items.push(item);
  return items;
}
```

Function ini tidak murni.
Ia memodifikasi array input.

Bandingkan dengan:

```js
function addItem(items, item) {
  return [...items, item];
}
```

Versi kedua lebih mudah dipikirkan karena:

- input tidak rusak;
- caller tidak mendapat kejutan;
- testing lebih sederhana;
- komposisi function lebih aman.

## Kenapa Immutability Membantu

Immutability membantu di beberapa area inti:

- reasoning lebih lokal;
- perubahan data lebih eksplisit;
- undo/redo lebih mudah;
- time-travel debugging lebih realistis;
- memoization dan referential equality lebih berguna;
- parallel reasoning di tim lebih mudah.

Kalau object tidak berubah diam-diam, Anda bisa lebih percaya pada asumsi yang Anda buat saat membaca code.

## Biaya Immutability

Immutability juga punya biaya:

- object baru harus dibuat;
- nested update bisa verbose;
- copy besar bisa mahal jika dilakukan sembarangan;
- developer bisa membuat shallow copy lalu merasa sudah aman padahal belum;
- bisa menambah garbage collection pressure.

Senior engineer tidak mengabaikan biaya ini.
Ia menimbangnya terhadap manfaat maintainability.

## Shallow Copy vs Deep Copy

Ini area yang sering disalahpahami.

```js
const state = {
  user: {
    name: "Alya",
  },
};

const nextState = { ...state };
nextState.user.name = "Bima";
```

Banyak developer mengira ini immutable.
Tidak.

`{ ...state }` hanya shallow copy.
`nextState.user` masih menunjuk object yang sama dengan `state.user`.

Kalau ingin update aman:

```js
const nextState = {
  ...state,
  user: {
    ...state.user,
    name: "Bima",
  },
};
```

Kalau nested structure makin dalam, verbosity meningkat.
Itulah salah satu alasan library seperti Immer populer.

## Mutation Lokal vs Mutation Terbuka

Tidak semua mutation berbahaya.
Ada perbedaan besar antara:

- mutation lokal yang terkurung dalam satu scope;
- mutation pada data yang dibagi lintas module atau lintas lifecycle.

Contoh mutation lokal yang relatif aman:

```js
function buildIndex(items) {
  const map = {};

  for (const item of items) {
    map[item.id] = item;
  }

  return map;
}
```

Di sini ada mutation pada `map`.
Tetapi mutation itu lokal, tidak terlihat dari luar, dan hasil akhirnya tetap predictable.

Ini sering merupakan trade-off yang bagus.

## Immutability di Frontend

Topik ini sangat penting di frontend modern, terutama framework berbasis state dan rendering.

Kenapa?

- UI perlu tahu kapan state berubah;
- referential equality sering dipakai untuk optimasi;
- shared state mudah menyebar ke banyak komponen;
- stale render sering lahir dari mutation diam-diam.

Contoh bug umum:

```js
const nextItems = items;
nextItems.push(newItem);
setItems(nextItems);
```

Secara mental developer berpikir state berubah.
Secara referensi, object array lama tetap dipakai.
Di banyak sistem state management, ini bisa menghasilkan behavior yang salah atau tidak konsisten.

Pola yang lebih sehat:

```js
setItems((prevItems) => [...prevItems, newItem]);
```

## Immutability di Backend

Banyak orang salah mengira immutability hanya urusan frontend.
Salah.

Di backend, immutability penting untuk:

- request-scoped data agar tidak bocor antar flow;
- transformasi payload yang aman;
- audit reasoning;
- mencegah mutation utility function yang merusak object upstream;
- testing service yang lebih stabil.

Contoh masalah:

sebuah validator memodifikasi payload input;
lalu service lain memakai payload yang sama dengan asumsi original;
akhirnya perilaku sistem tergantung urutan pemanggilan function.

Itu desain lemah.

## Pure Function vs Impure Function

Pure function:

- output hanya bergantung pada input;
- tidak punya side effect observable.

Impure function:

- dapat memodifikasi state luar;
- dapat membaca kondisi luar;
- output bisa berbeda walau input sama karena context luar berubah.

Immutability sangat mendukung pure function.
Dan pure function biasanya lebih mudah:

- di-test;
- di-cache;
- di-reason;
- di-compose.

Tetapi tentu saja sistem nyata tidak bisa sepenuhnya pure.
Pada akhirnya Anda tetap harus menulis ke database, update DOM, kirim request, atau log.

Yang penting adalah menjaga impure boundary tetap jelas.

## Boundary yang Sehat

Pola yang baik biasanya seperti ini:

1. parse input;
2. lakukan transformasi se-pure mungkin;
3. mutasi atau side effect hanya di boundary yang memang perlu.

Contoh:

- mapper data sebaiknya pure;
- formatter sebaiknya pure;
- decision function sebaiknya pure;
- operasi tulis ke database jelas impure.

Kalau seluruh codebase impure dari ujung ke ujung, maintainability akan jatuh.

## Structural Sharing

Immutability tidak selalu berarti copy seluruh pohon data secara naif.
Konsep yang lebih matang adalah structural sharing.

Artinya:

- bagian yang berubah dibuat baru;
- bagian yang tidak berubah tetap memakai referensi lama.

Ini yang membuat pendekatan immutable bisa tetap praktis.
Library seperti Immer atau persistent data structure memanfaatkan ide ini.

## `Object.freeze()` dan Realitasnya

`Object.freeze()` sering dipakai sebagai simbol "immutability".
Tetapi realitasnya:

- ia hanya membekukan object itu sendiri;
- nested object tetap bisa mutable kecuali dibekukan juga;
- ia memberi safety tertentu, tetapi bukan solusi arsitektur penuh.

Contoh:

```js
const user = Object.freeze({
  profile: {
    name: "Alya",
  },
});

user.profile.name = "Bima";
```

Ini masih bisa berubah pada nested object kalau tidak deep freeze.

Jadi jangan menganggap `freeze` sebagai silver bullet.

## Array Mutation yang Sering Menjebak

Method array berikut memutasi:

- `push`
- `pop`
- `shift`
- `unshift`
- `splice`
- `sort`
- `reverse`

Method berikut umumnya mengembalikan array baru:

- `map`
- `filter`
- `slice`
- `concat`

Masalah klasik:

```js
const sorted = items.sort(compareFn);
```

Banyak developer mengira `sorted` adalah salinan terurut.
Padahal `sort()` memutasi array asli.

Kalau array itu dipakai di tempat lain, bug bisa menyebar.

Pola aman:

```js
const sorted = [...items].sort(compareFn);
```

## Object Mutation yang Sering Menjebak

Object juga mudah dimutasi lewat assignment langsung:

```js
config.timeout = 5000;
```

Kalau `config` adalah object bersama lintas module, perubahan ini bisa berdampak jauh.
Karena itu object config, schema, constants, dan metadata bersama biasanya lebih aman dibuat immutable atau setidaknya diperlakukan sebagai read-only.

## Parameter Mutation

Memodifikasi parameter function sering menjadi sumber bug halus.

Contoh buruk:

```js
function normalizeUser(user) {
  user.name = user.name.trim();
  return user;
}
```

Caller mungkin mengira `user` asli tetap.
Ternyata tidak.

Pola lebih aman:

```js
function normalizeUser(user) {
  return {
    ...user,
    name: user.name.trim(),
  };
}
```

## Mutation dan Debugging

Mutation membuat debugging lebih mahal karena sejarah data menjadi kabur.

Kalau object yang sama dimodifikasi berkali-kali:

- log lama jadi sulit dipercaya;
- stack trace tidak cukup menjelaskan kapan data rusak;
- snapshot intermediate susah dibandingkan;
- bug sering tampak non-deterministic.

Sebaliknya, dengan data immutable:

- setiap state transisi lebih eksplisit;
- snapshot lebih bermakna;
- diff antar state lebih mudah;
- root cause lebih cepat diisolasi.

## Mutation dan Concurrency

Dalam async system, shared mutable state makin berbahaya.

Contoh:

- dua callback async memodifikasi object yang sama;
- urutan penyelesaian tidak stabil;
- hasil akhir tergantung timing.

Ini bisa berubah menjadi race condition.

Immutability tidak menghapus semua race condition, tetapi mengurangi permukaan masalah karena perubahan state jadi lebih eksplisit dan terkontrol.

## Immutability dan Performance

Diskusi ini sering rusak karena terlalu ideologis.

Fakta penting:

- mutation bisa lebih cepat untuk operasi tertentu;
- copy bisa menambah alokasi dan GC pressure;
- tetapi mutation tak terkontrol bisa memicu cost maintainability jauh lebih besar;
- referential equality dari immutable update bisa memberi optimasi sistemik di banyak tempat.

Jadi jangan hanya ukur microbenchmark.
Ukur biaya total sistem:

- biaya bug;
- biaya reasoning;
- biaya review;
- biaya regression;
- biaya rendering ulang;
- biaya cache invalidation.

## Kapan Mutation Masuk Akal

Mutation biasanya masuk akal saat:

- data sangat lokal;
- lifetime pendek;
- tidak dibagi keluar;
- operasi performance-critical memang membutuhkan in-place update;
- struktur dipakai sebagai buffer, accumulator, atau internal builder.

Contoh:

- parser internal;
- loop numerik berat;
- transformasi lokal sebelum return final;
- mutable cache dengan API jelas.

## Kapan Immutability Lebih Tepat

Immutability biasanya lebih tepat saat:

- state dibagi ke banyak layer;
- data dipakai sebagai input banyak function;
- Anda butuh predictable change detection;
- debugging dan testing menjadi prioritas;
- state hidup lama;
- codebase dikerjakan banyak orang.

Dalam kebanyakan aplikasi bisnis besar, ini sering berarti data domain utama lebih aman diperlakukan immutable.

## Library dan Tooling

### Immer

Immer membuat update immutable terasa seperti mutation.

```js
const nextState = produce(state, (draft) => {
  draft.user.name = "Bima";
});
```

Keuntungannya:

- syntax nyaman;
- structural sharing dibantu library;
- nested update lebih mudah dibaca.

Tetapi tetap ada biaya abstraction.
Anda harus tahu kapan library membantu dan kapan justru menyembunyikan biaya.

### TypeScript `readonly`

TypeScript bisa membantu memberi batas di level type.

```ts
type User = {
  readonly id: string;
  readonly name: string;
};
```

Ini tidak membuat runtime otomatis immutable.
Tetapi ia memperkuat kontrak di level pengembangan.

## Immutability di API Design

API function yang sehat harus jelas:

- apakah ia memutasi input?
- apakah ia mengembalikan nilai baru?
- apakah output berbagi referensi dengan input?

Kalau kontrak ini kabur, caller akan membuat asumsi yang salah.

Nama function juga penting.

Misalnya:

- `sortUsers()` terdengar ambigu;
- `sortUsersInPlace()` jauh lebih jujur;
- `getSortedUsers()` terdengar seperti mengembalikan hasil baru.

Nama yang jujur menurunkan biaya miskomunikasi.

## Heuristik Senior

Gunakan aturan ini:

1. Jangan mutasi input function kecuali kontraknya memang eksplisit.
2. Hindari shared mutable state lintas module.
3. Mutation lokal di dalam function sering masih sehat.
4. Untuk state publik atau state yang dipakai rendering, default ke immutable update.
5. Bedakan biaya runtime lokal dengan biaya maintainability sistemik.
6. Hati-hati pada shallow copy yang memberi rasa aman palsu.
7. Gunakan `readonly` atau convention untuk memperjelas ownership.

## Pertanyaan Interview

### Dasar

- Apa beda mutation dan immutability?
- Kenapa object dan array lebih rawan bug daripada primitive?
- Kenapa `sort()` sering menyebabkan bug halus?
- Apa beda shallow copy dan deep copy?

### Menengah

- Kapan mutation masih masuk akal?
- Kenapa immutability membantu debugging?
- Apa risiko memodifikasi parameter function?
- Bagaimana shared mutable state bisa menyebabkan race condition?

### Senior

- Bagaimana Anda menyeimbangkan immutability dengan performance?
- Kapan Anda memilih library seperti Immer?
- Bagaimana Anda mendesain API yang jelas soal ownership data?
- Dalam sistem besar, kapan biaya mutation lebih mahal daripada biaya copy?

## Koneksi ke Kasus Nyata

Dalam kerja nyata, topik ini muncul saat:

- mengelola state form kompleks;
- mengolah payload API sebelum disimpan;
- membangun selector dan memoization;
- menulis reducer state;
- merancang DTO mapper;
- membuat utility sorting dan filtering;
- menangani data cache yang dipakai banyak consumer;
- men-debug UI yang menampilkan data stale.

Jadi ini bukan topik akademik.
Ini topik operasional harian.

## Ringkasan Brutal

- Mutation memberi kemudahan jangka pendek.
- Immutability memberi predictability jangka panjang.
- Shared mutable state adalah sumber bug yang sangat mahal.
- Mutation lokal bisa sehat, mutation tersebar biasanya beracun.
- Yang benar bukan fanatisme, tetapi boundary yang jelas.

Kalau Anda belum bisa membedakan mutation yang aman dengan mutation yang merusak maintainability, berarti reasoning Anda belum cukup senior.

## Checklist Pemahaman

- Saya paham beda reference dan value.
- Saya tahu shallow copy tidak cukup untuk nested update.
- Saya tahu array method mana yang memutasi.
- Saya tidak sembarangan memodifikasi parameter input.
- Saya bisa membedakan mutation lokal yang aman dan shared mutable state yang berbahaya.
- Saya bisa menjelaskan trade-off runtime vs maintainability.
- Saya tahu kapan immutable update membantu change detection dan debugging.

## Penutup

Topik ini bukan soal gaya coding semata.
Ini soal apakah codebase Anda akan tetap bisa dipikirkan enam bulan kemudian saat jumlah fitur, async flow, dan kontributor sudah jauh lebih besar.

Kalau Anda kuat di topik ini, Anda akan lebih jarang membuat bug "hantu" yang akar masalahnya ternyata cuma satu: data berubah di tempat yang salah, pada waktu yang salah, oleh pihak yang salah.
