# Closure, Scope, `this`, Prototype, dan Inheritance

## Tujuan

Topik ini wajib dikuasai kalau Anda ingin terlihat senior di JavaScript.
Banyak developer bisa memakai syntax modern, tetapi gagal menjelaskan kenapa nilai berubah, kenapa method kehilangan context, kenapa object mewarisi properti tertentu, atau kenapa bug muncul setelah callback dipass ke tempat lain.
Kalau reasoning di area ini lemah, Anda akan sulit debugging bug yang terlihat "aneh" padahal akar masalahnya sangat fundamental.

## Kenapa Topik Ini Penting

Lima konsep ini bukan topik terpisah yang berdiri sendiri.
Mereka saling terkait dan membentuk fondasi perilaku object, function, dan state di JavaScript.

Kalau Anda tidak paham:

- Anda akan salah memakai function sebagai callback.
- Anda akan mudah membuat memory retention karena closure yang tidak sadar.
- Anda akan bingung kenapa `this` berubah antar call site.
- Anda akan salah desain class atau object composition.
- Anda akan sulit menjelaskan perbedaan `class` syntax dengan mekanisme prototype di bawahnya.

Saat interview senior, topik ini sering dipakai bukan untuk trivia, tetapi untuk mengukur apakah Anda benar-benar paham model eksekusi JavaScript.

## Gambaran Besar

Ada lima istilah inti:

- `scope`
- `closure`
- `this`
- `prototype`
- `inheritance`

Urutan belajarnya jangan dibalik.
Anda harus paham `scope` dulu.
Setelah itu baru `closure`.
Setelah itu baru paham bahwa `this` bukan closure.
Setelah itu baru masuk ke `prototype` dan `inheritance`.

Kalau urutan ini dibalik, semuanya akan terlihat seperti kumpulan aturan acak.

## Peta Mental yang Benar

Pegang model berikut:

1. `Scope` menjawab: variabel ini bisa diakses dari mana.
2. `Closure` menjawab: function ini masih membawa akses ke scope mana setelah keluar dari tempat dibuat.
3. `this` menjawab: object context apa yang dipakai saat function dipanggil.
4. `Prototype` menjawab: jika properti tidak ada di object ini, lookup lanjut ke mana.
5. `Inheritance` menjawab: bagaimana perilaku atau data diwariskan antar object.

Kalau Anda mencampur lima jawaban ini menjadi satu, Anda akan salah terus.

## Scope

### Definisi Singkat

`Scope` adalah aturan visibilitas identifier.
Pertanyaannya sederhana: saat runtime mencari nama variabel, ke lingkungan mana dia melihat?

JavaScript modern punya beberapa jenis scope utama:

- global scope
- module scope
- function scope
- block scope

### Global Scope

Variabel di global scope tersedia luas.
Masalahnya, semakin luas visibilitas, semakin besar coupling dan risiko tabrakan nama.
Di codebase modern, global scope seharusnya sangat dibatasi.

### Module Scope

Di `ES module`, file punya scope sendiri.
Ini jauh lebih aman daripada pola lama yang sering menaruh banyak hal di global object.
Kalau Anda bekerja di frontend modern atau Node.js modern, module scope adalah baseline, bukan bonus.

### Function Scope

Variabel yang dideklarasikan dengan `var` bersifat function-scoped.
Artinya ia hidup di seluruh function tempat ia dideklarasikan, walaupun secara visual ditulis di dalam blok.

Contoh:

```js
function example() {
  if (true) {
    var value = 10;
  }

  console.log(value); // 10
}
```

Ini salah satu alasan `var` sering menyebabkan bug yang tidak intuitif.

### Block Scope

`let` dan `const` bersifat block-scoped.
Ini lebih dekat dengan ekspektasi kebanyakan developer.

```js
function example() {
  if (true) {
    const value = 10;
    console.log(value); // 10
  }

  console.log(value); // ReferenceError
}
```

Block scope membuat reasoning lebih lokal dan lebih aman.

### Lexical Scope

JavaScript memakai lexical scope.
Artinya scope ditentukan oleh posisi penulisan kode, bukan oleh siapa yang memanggil function.

Ini poin yang sangat penting.
Scope ditentukan saat function dibuat, bukan saat function dipanggil.

Contoh:

```js
const name = "global";

function outer() {
  const name = "outer";

  function inner() {
    console.log(name);
  }

  return inner;
}

const fn = outer();
fn(); // "outer"
```

`inner` membaca `name` dari lexical environment tempat ia didefinisikan.
Bukan dari tempat ia dipanggil.

## Scope Chain

Saat runtime mencari identifier, ia tidak menebak.
Ia mengikuti rantai pencarian:

1. cari di scope saat ini;
2. kalau tidak ada, naik ke outer scope;
3. ulangi sampai global atau module boundary;
4. kalau tetap tidak ada, lempar error.

Ini disebut `scope chain`.

Contoh:

```js
const a = 1;

function one() {
  const b = 2;

  function two() {
    const c = 3;
    console.log(a, b, c);
  }

  two();
}

one();
```

`two()` bisa membaca `c`, lalu `b`, lalu `a`.
Sebaliknya, `one()` tidak bisa membaca `c`.
Scope chain berjalan keluar, bukan ke dalam.

## Shadowing

Shadowing terjadi saat nama yang sama dideklarasikan di scope yang lebih dalam.
Identifier yang lebih dekat akan menutupi yang di luar.

```js
const status = "global";

function printStatus() {
  const status = "local";
  console.log(status);
}

printStatus(); // "local"
```

Shadowing sah, tetapi terlalu banyak shadowing membuat code susah dibaca.
Senior engineer biasanya menghindari shadowing yang tidak perlu karena ini meningkatkan beban mental saat review dan debugging.

## Hoisting

`Hoisting` sering dijelaskan secara buruk.
Versi praktisnya:

- deklarasi function bisa dipakai sebelum baris definisinya;
- `var` dideklarasikan di awal scope, tetapi nilainya `undefined` sebelum assignment;
- `let` dan `const` juga "diangkat" secara internal, tetapi tidak bisa diakses sebelum inisialisasi karena `temporal dead zone`.

Contoh `var`:

```js
function demo() {
  console.log(value); // undefined
  var value = 10;
}
```

Contoh `let`:

```js
function demo() {
  console.log(value); // ReferenceError
  let value = 10;
}
```

Masalah hoisting bukan sekadar hafalan perilaku.
Masalah utamanya adalah predictability.
Itulah alasan code modern hampir selalu menghindari `var`.

## Closure

### Definisi Singkat

`Closure` adalah kombinasi function dan aksesnya ke lexical environment tempat function itu dibuat.
Dalam bahasa sederhana:
function bisa "mengingat" variabel dari scope luar walaupun scope luar itu secara normal sudah selesai dieksekusi.

Contoh paling dasar:

```js
function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Kenapa `count` masih ada?
Karena function `increment` menutup akses ke lexical environment milik `createCounter`.
Itulah closure.

### Closure Bukan Copy Value

Banyak developer pemula membayangkan closure sebagai "menyalin nilai".
Itu model yang salah.
Closure mempertahankan akses ke binding, bukan menyalin snapshot sederhana dalam semua kasus.

```js
function createReader() {
  let value = 1;

  return {
    read() {
      return value;
    },
    update(nextValue) {
      value = nextValue;
    },
  };
}

const reader = createReader();

console.log(reader.read()); // 1
reader.update(5);
console.log(reader.read()); // 5
```

Kalau closure hanya copy value, `read()` tidak akan melihat perubahan.
Faktanya ia tetap terhubung ke binding yang sama.

### Closure untuk Private State

Closure sering dipakai untuk menyembunyikan state internal.

```js
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) {
        throw new Error("Insufficient balance");
      }

      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}
```

Di sini `balance` tidak bisa diubah langsung dari luar.
Ia hanya bisa diakses lewat API yang Anda expose.
Ini adalah encapsulation tanpa class.

### Closure di Loop dan Bug Klasik

Salah satu bug klasik:

```js
for (var i = 0; i < 3; i += 1) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```

Outputnya:

```js
3
3
3
```

Kenapa?

- `var` punya function scope, bukan block scope.
- Semua callback menutup binding `i` yang sama.
- Saat callback dijalankan, loop sudah selesai dan `i` bernilai `3`.

Perbaikannya:

```js
for (let i = 0; i < 3; i += 1) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
```

Sekarang setiap iterasi punya binding `i` sendiri.
Output jadi `0`, `1`, `2`.

### Closure dan Memory Retention

Closure sangat berguna, tetapi bisa menahan data lebih lama dari yang Anda sadari.

Contoh mental model:

- sebuah function menutup object besar;
- function itu disimpan lama di cache, event listener, atau registry;
- object besar tersebut tidak bisa dibersihkan oleh garbage collector;
- hasilnya memory usage naik.

Jadi closure bukan cuma konsep akademik.
Di aplikasi besar, closure yang menyimpan referensi tidak perlu bisa ikut berkontribusi ke memory leak atau memory retention.

### Kapan Closure Tepat Dipakai

Closure tepat saat:

- Anda butuh state lokal yang tidak ingin diekspos langsung.
- Anda membuat factory function.
- Anda butuh partial application atau currying.
- Anda butuh callback yang tetap membawa context data tertentu.

Closure tidak tepat kalau:

- state perlu mudah diinspeksi lintas object;
- Anda sebenarnya butuh struktur object yang jelas;
- Anda menutup terlalu banyak data tanpa alasan;
- pola closure justru membuat debugging lebih sulit daripada model class atau plain object.

## `this`

### Definisi yang Benar

`this` bukan referensi ke function itu sendiri.
`this` bukan referensi ke lexical scope.
`this` adalah nilai context yang ditentukan oleh cara function dipanggil.

Ini sumber kebingungan paling besar di JavaScript.
Banyak bug terjadi karena developer berpikir `this` bekerja seperti variabel biasa.
Padahal tidak.

### Aturan Dasar `this`

Secara praktis, nilai `this` ditentukan oleh call site.
Pertanyaannya bukan "function ini ditulis di mana?"
Pertanyaannya adalah "function ini dipanggil bagaimana?"

### Default Binding

```js
function show() {
  console.log(this);
}

show();
```

Dalam strict mode, `this` biasanya `undefined`.
Di environment tertentu tanpa strict mode, ia bisa jatuh ke global object.
Karena perilaku ini berisiko, bergantung pada default binding adalah keputusan buruk.

### Implicit Binding

```js
const user = {
  name: "Alya",
  greet() {
    console.log(this.name);
  },
};

user.greet(); // "Alya"
```

Di sini `this` mengarah ke object sebelum tanda titik saat method dipanggil.

Tetapi hati-hati.
Yang menentukan bukan tempat method dideklarasikan.
Yang menentukan adalah cara method dipanggil saat itu.

### Lost Context

Contoh bug klasik:

```js
const user = {
  name: "Alya",
  greet() {
    console.log(this.name);
  },
};

const greet = user.greet;
greet(); // undefined atau error tergantung mode
```

Kenapa rusak?
Karena `greet()` sekarang dipanggil sebagai plain function, bukan sebagai `user.greet()`.
Implicit binding hilang.

Ini bug yang sangat umum saat method dipass sebagai callback.

### Explicit Binding

JavaScript memberi cara memaksa nilai `this` lewat:

- `call`
- `apply`
- `bind`

```js
function greet() {
  console.log(this.name);
}

const user = { name: "Alya" };

greet.call(user);  // "Alya"
greet.apply(user); // "Alya"

const boundGreet = greet.bind(user);
boundGreet(); // "Alya"
```

Perbedaannya:

- `call` mengeksekusi langsung dengan argumen satu per satu;
- `apply` mengeksekusi langsung dengan argumen dalam array;
- `bind` tidak mengeksekusi langsung, tetapi mengembalikan function baru yang terikat.

### `this` pada Arrow Function

Arrow function tidak punya `this` sendiri.
Ia mengambil `this` secara lexical dari scope luar.

Contoh:

```js
const user = {
  name: "Alya",
  greet() {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  },
};

user.greet(); // "Alya"
```

`inner` tidak membuat `this` baru.
Ia memakai `this` milik `greet`.

Ini berguna saat Anda ingin callback mempertahankan context method saat ini.

### Arrow Function Bukan Pengganti Semua Method

Karena arrow function tidak punya `this` sendiri, ia tidak cocok untuk semua kasus.

Contoh buruk:

```js
const user = {
  name: "Alya",
  greet: () => {
    console.log(this.name);
  },
};
```

Kebanyakan developer berharap ini mencetak `"Alya"`.
Biasanya tidak.
Karena `this` di arrow function diambil dari lexical scope luar, bukan dari object `user`.

Jadi aturan praktis:

- pakai method biasa kalau Anda butuh `this` dinamis dari object pemanggil;
- pakai arrow function kalau Anda ingin mewarisi `this` dari scope luar.

### `this` dan Class

Di `class`, method biasa juga tetap tunduk pada aturan call site.

```js
class Timer {
  constructor() {
    this.seconds = 0;
  }

  tick() {
    this.seconds += 1;
  }
}

const timer = new Timer();
const tick = timer.tick;
tick(); // error atau undefined behavior karena context hilang
```

Syntax `class` tidak menyelamatkan Anda dari masalah `this`.
Ia hanya membuat penulisannya lebih rapi.

Kalau method class ingin aman dipass sebagai callback, biasanya Anda:

- bind di constructor;
- gunakan field dengan arrow function jika environment mendukung;
- atau jangan pass method mentah tanpa wrapper.

## Scope vs `this`

Ini area yang sangat sering dicampur.

`Scope` dan `this` tidak sama.

- `scope` ditentukan secara lexical saat kode ditulis;
- `this` ditentukan saat function dipanggil, kecuali arrow function.

Contoh:

```js
const name = "global";

const user = {
  name: "Alya",
  greet() {
    const getName = () => name;
    console.log(getName(), this.name);
  },
};

user.greet();
```

`getName()` membaca `name` dari lexical scope luar.
`this.name` membaca properti dari context object saat method dipanggil.
Dua mekanisme berbeda sedang terjadi.

Kalau ini tidak dipisahkan dengan jelas di kepala Anda, bug callback akan selalu terasa magis.

## Prototype

### Definisi Singkat

JavaScript memakai prototype-based inheritance.
Object bisa mewarisi perilaku dari object lain melalui rantai prototype.

Saat Anda mengakses properti:

1. runtime cek object itu sendiri;
2. kalau tidak ada, runtime cek prototype-nya;
3. proses ini berulang naik ke atas;
4. kalau tidak ketemu, hasilnya `undefined`.

Itulah prototype lookup.

### Contoh Dasar

```js
const animal = {
  eats: true,
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.jumps); // true
console.log(rabbit.eats);  // true
```

`rabbit` punya `jumps` sendiri.
Tetapi `eats` ditemukan lewat prototype `animal`.

### Properti Sendiri vs Warisan

Ini penting untuk reasoning dan debugging.

```js
const animal = { eats: true };
const rabbit = Object.create(animal);

rabbit.eats = false;

console.log(rabbit.eats); // false
```

Di sini `rabbit.eats = false` tidak mengubah `animal.eats`.
Ia membuat properti milik `rabbit` sendiri yang men-shadow properti prototype.

Ini konsep yang sama seperti shadowing di scope, tetapi terjadi di property lookup object.

### Prototype Chain

Object bisa membentuk rantai.

```js
const livingThing = { alive: true };
const animal = Object.create(livingThing);
animal.eats = true;

const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.alive); // true
```

Lookup `rabbit.alive` berjalan:

1. cek `rabbit`;
2. tidak ada, naik ke `animal`;
3. tidak ada, naik ke `livingThing`;
4. ketemu.

Kalau prototype chain terlalu rumit, reasoning jadi lebih sulit.
Karena itu inheritance dalam JavaScript sebaiknya dipakai dengan disiplin.

## Function Constructor dan `prototype`

Sebelum `class` syntax populer, pola umum adalah function constructor.

```js
function User(name) {
  this.name = name;
}

User.prototype.greet = function greet() {
  return `Hello, ${this.name}`;
};

const user = new User("Alya");
console.log(user.greet());
```

Yang perlu dipahami:

- `new User("Alya")` membuat object baru;
- object baru itu dihubungkan ke `User.prototype`;
- `this` di constructor menunjuk ke object baru tersebut;
- method di `User.prototype` dibagi bersama antar instance.

Ini efisien dibanding menaruh method baru di dalam constructor untuk setiap object.

### Jangan Taruh Method Bersama di Constructor Kalau Tidak Perlu

Contoh kurang efisien:

```js
function User(name) {
  this.name = name;
  this.greet = function greet() {
    return `Hello, ${this.name}`;
  };
}
```

Masalahnya, setiap instance mendapat salinan function baru.
Untuk method yang identik, ini biasanya tidak perlu.
Lebih tepat simpan di `prototype`.

## `class` Adalah Syntax Sugar

Banyak developer modern belajar `class` dulu lalu lupa bahwa mekanisme dasarnya tetap prototype.

```js
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}
```

Secara mental, ini tetap berbasis prototype.
Method `greet()` tidak disalin ke setiap instance.
Ia berada di `User.prototype`.

Kalau Anda tidak paham ini, Anda akan sulit menjelaskan memory sharing, method lookup, dan perilaku inheritance pada class.

## Inheritance

### Definisi Singkat

`Inheritance` adalah mekanisme pewarisan properti atau perilaku dari parent ke child.
Di JavaScript, ini diwujudkan lewat prototype chain.

Contoh class:

```js
class Animal {
  speak() {
    return "some sound";
  }
}

class Dog extends Animal {
  speak() {
    return "woof";
  }
}

const dog = new Dog();
console.log(dog.speak()); // "woof"
```

`Dog` mewarisi dari `Animal`.
Lookup method tetap berjalan lewat prototype chain.

### Method Overriding

Child bisa mengganti implementasi parent.
Ini disebut overriding.

Tetapi overriding bukan selalu keputusan baik.
Kalau parent dan child tidak punya relasi perilaku yang stabil, inheritance justru membuat coupling rapuh.

### `super`

`super` dipakai untuk mengakses constructor atau method parent.

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `Animal: ${this.name}`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  describe() {
    return `${super.describe()} (${this.breed})`;
  }
}
```

`super(name)` memastikan inisialisasi parent berjalan.
Kalau Anda pakai `extends`, Anda harus memahami kapan `super` wajib dipanggil.

## Inheritance vs Composition

Ini pertanyaan yang lebih senior.
Bukan cuma "bisa pakai inheritance atau tidak", tetapi "haruskah?"

Inheritance cocok saat:

- ada relasi `is-a` yang kuat dan stabil;
- child benar-benar subtype dari parent;
- kontrak perilaku parent masuk akal untuk diwariskan.

Composition lebih cocok saat:

- perilaku bisa dirakit dari bagian kecil;
- Anda ingin coupling lebih rendah;
- Anda ingin fleksibilitas lebih tinggi;
- relasi antar object lebih tepat disebut `has-a`, bukan `is-a`.

Dalam banyak codebase modern JavaScript, composition sering lebih aman daripada inheritance yang dalam.

## Contoh Kesalahan Design

Misalnya Anda membuat:

- `Employee`
- `Manager extends Employee`
- `Admin extends Manager`
- `SuperAdmin extends Admin`

Secara syntax mungkin sah.
Secara design sering buruk.

Kenapa?

- chain terlalu dalam;
- perubahan parent bisa merusak child jauh di bawah;
- debugging makin sulit;
- test makin rapuh;
- reuse jadi semu karena yang diwariskan sering tidak benar-benar universal.

Senior engineer biasanya curiga pada inheritance chain yang terlalu panjang.

## Hubungan Antar Lima Konsep

Sekarang satukan semuanya.

### Scope dan Closure

Closure lahir karena lexical scope.
Kalau JavaScript tidak lexical-scoped, closure tidak bekerja seperti sekarang.

### Closure dan `this`

Closure menyimpan akses ke variabel lexical.
`this` pada function biasa tidak ikut "disimpan" secara lexical.
Karena itu developer sering salah berharap bahwa callback biasa akan tetap membawa `this` lama.
Yang membawa `this` secara lexical justru arrow function.

### Prototype dan Inheritance

Inheritance di JavaScript bukan magic class system terpisah.
Ia berdiri di atas prototype chain.
`class` hanya membungkus mekanisme itu dengan syntax yang lebih familiar.

## Contoh Gabungan

```js
class Counter {
  constructor(label) {
    this.label = label;
    this.count = 0;
  }

  increment() {
    this.count += 1;
    return this.count;
  }

  start() {
    setInterval(() => {
      console.log(this.label, this.increment());
    }, 1000);
  }
}
```

Di contoh ini:

- `this` di `increment()` bergantung pada pemanggilan method;
- arrow function di `setInterval` mengambil `this` secara lexical dari `start()`;
- method class sebenarnya hidup di prototype;
- object instance mewarisi method dari prototype class.

Satu snippet kecil bisa melibatkan banyak konsep sekaligus.

## Bug Nyata yang Sering Terjadi

### 1. Method Hilang Context Saat Dijadikan Callback

Contoh:

```js
class SearchPage {
  constructor(api) {
    this.api = api;
  }

  handleSubmit() {
    return this.api.search();
  }
}
```

Kalau `handleSubmit` dipass mentah ke event handler tertentu, `this` bisa hilang.
Bug ini sering muncul di React lama, DOM event manual, atau library callback generik.

### 2. State Tertutup Closure tetapi Tidak Pernah Dilepas

Factory function yang menutup cache besar, response besar, atau reference DOM bisa menahan memory lama lebih dari yang dibutuhkan.

### 3. Salah Pakai Arrow Function di Object Method

Developer berharap `this` mengarah ke object, padahal arrow function mengambil `this` dari luar object literal.

### 4. Salah Paham antara Own Property dan Prototype Property

Developer mengira perubahan properti di child akan memodifikasi parent, padahal yang terjadi hanya shadowing.

## Trade-off Praktis

### Closure

Kelebihan:

- encapsulation ringan;
- factory pattern enak dipakai;
- cocok untuk state privat kecil.

Kekurangan:

- bisa menahan memory;
- debugging reference yang tertutup kadang lebih sulit;
- jika berlebihan, object shape jadi tidak eksplisit.

### `this`

Kelebihan:

- natural untuk method pada object;
- berguna di API yang memang context-based.

Kekurangan:

- mudah hilang saat function dipass;
- reasoning lebih sulit daripada pure function;
- bug callback sering muncul dari sini.

### Prototype/Inheritance

Kelebihan:

- method sharing efisien;
- cocok untuk model object tertentu;
- fondasi dari `class`.

Kekurangan:

- chain yang dalam membuat reasoning rapuh;
- inheritance sering dipakai berlebihan;
- composition sering lebih jelas dan aman.

## Heuristik Senior

Kalau ingin berpikir lebih senior, pakai aturan berikut:

1. Default ke `const`, lalu `let` hanya bila perlu berubah.
2. Hindari `var` kecuali Anda memang sedang membaca legacy code.
3. Bedakan tegas lexical scope dengan call-site `this`.
4. Jangan pass method mentah sebagai callback kalau ia bergantung pada `this`.
5. Gunakan closure untuk state privat yang sempit dan jelas.
6. Waspadai closure yang menahan data besar.
7. Pahami bahwa `class` tetap berdiri di atas prototype.
8. Jangan membuat inheritance chain dalam tanpa alasan yang sangat kuat.
9. Prefer composition bila reuse perilaku lebih penting daripada relasi subtype.

## Cara Menjelaskan di Interview

Kalau interviewer bertanya topik ini, jangan jawab seperti hafalan definisi.
Jawab dengan struktur:

1. definisi singkat;
2. model mental;
3. contoh bug umum;
4. trade-off di production code.

Contoh jawaban ringkas yang kuat:

"`Scope` menentukan visibilitas variabel berdasarkan lexical structure. `Closure` membuat function tetap bisa mengakses lexical scope luar setelah scope itu selesai. `this` berbeda karena nilainya biasanya ditentukan oleh call site, bukan lexical scope, kecuali pada arrow function. Sementara `prototype` adalah mekanisme lookup property antar object, dan inheritance di JavaScript dibangun di atas prototype chain, walaupun sekarang sering dibungkus syntax `class`."

Jawaban seperti itu menunjukkan Anda paham hubungan antar konsep, bukan sekadar hafal istilah.

## Latihan Interview

### Pertanyaan Dasar

- Apa beda `scope` dan `this`?
- Kenapa `let` di loop sering memperbaiki bug callback dibanding `var`?
- Kenapa method object bisa kehilangan `this` saat dipass sebagai callback?
- Apa arti `class` hanyalah syntax sugar di JavaScript?

### Pertanyaan Menengah

- Jelaskan bagaimana closure bisa membantu encapsulation sekaligus berisiko menahan memory.
- Jelaskan alur lookup properti pada prototype chain.
- Kapan Anda memilih composition dibanding inheritance?
- Kenapa arrow function cocok untuk callback tertentu tetapi buruk untuk sebagian object method?

### Pertanyaan Senior

- Bagaimana Anda menjelaskan bug production yang berasal dari lost `this` context?
- Bagaimana Anda menilai kapan closure membuat code elegant vs membuat observability lebih buruk?
- Apa risiko design dari inheritance hierarchy yang dalam?
- Bagaimana Anda menjelaskan perbedaan private state berbasis closure vs state pada class instance?

## Contoh Koneksi ke Pengalaman Nyata

Kalau dikaitkan ke kerja backend dan frontend nyata:

- Saat membuat handler integrasi, Anda harus paham apakah callback masih punya `this` yang benar.
- Saat membuat module cache atau service factory, Anda harus paham closure dan memory retention.
- Saat mengorganisasi domain model di frontend besar, Anda harus tahu kapan class atau factory lebih masuk akal.
- Saat membaca library atau framework, Anda harus bisa mengenali apakah abstraction-nya bertumpu pada closure, context binding, atau prototype.

Kalau Anda tidak paham fondasi ini, Anda bisa tetap shipping.
Tetapi Anda akan sering hanya menebak saat bug muncul.
Itu bukan level senior.

## Ringkasan Brutal

- `scope` adalah soal akses variabel.
- `closure` adalah function yang tetap membawa akses ke lexical environment.
- `this` adalah context pemanggilan, bukan lexical scope.
- `prototype` adalah jalur lookup properti antar object.
- `inheritance` di JavaScript dibangun di atas prototype chain.

Kalau lima kalimat itu belum benar-benar hidup di kepala Anda, berarti topik ini belum matang.

## Checklist Pemahaman

- Saya bisa menjelaskan kenapa closure muncul dari lexical scope.
- Saya bisa membedakan tegas `this` biasa vs `this` pada arrow function.
- Saya bisa menjelaskan kenapa callback method sering rusak.
- Saya bisa menjelaskan lookup properti pada prototype chain.
- Saya bisa menjelaskan kenapa `class` tidak mengganti fondasi prototype.
- Saya bisa membedakan kapan inheritance masuk akal dan kapan composition lebih baik.

## Penutup

Topik ini terlihat dasar, tetapi justru di sinilah banyak developer kuat secara delivery terlihat rapuh saat diuji reasoning.
Kalau Anda ingin naik level, jangan puas dengan "sudah pernah pakai".
Anda harus bisa menjelaskan perilaku, failure mode, dan trade-off-nya dengan presisi.
