# Topik 3 — `this`, Arrow Functions, `call` / `apply` / `bind`

Dokumen ini menjelaskan bagaimana JavaScript menentukan nilai `this` saat fungsi dieksekusi, serta cara mengubah konteks secara eksplisit. Ini sering keluar di interview karena mudah dikombinasikan dengan closure, class, event handler, dan async.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Di JavaScript, **`this`** bukan “variabel leksikal” seperti closure; nilainya ditentukan oleh **cara pemanggilan** (untuk fungsi biasa) atau **lingkungan leksikal** (untuk arrow function). **`call`** dan **`apply`** memanggil fungsi dengan `this` yang Anda set serta argumen terpisah atau array-like. **`bind`** mengembalikan fungsi baru dengan `this` (dan argumen awal) terikat. Kesalahan umum: mengira `this` di method yang dilepas dari object, atau menggunakan arrow function sebagai method yang perlu `this` dinamis.

---

## 2. Mengapa topik ini keluar di interview

- Membedakan kandidat yang hanya “bisa React” dari yang paham **mechanics bahasa**.
- Bug produksi klasik: `onClick={this.handler}` tanpa bind, atau callback class component.
- Soal trivia “output `this`?” menguji pemahaman **strict mode**, **global**, dan **modul**.

---

## 3. Aturan `this` untuk fungsi biasa (non-arrow)

Secara berurutan (penyederhanaan untuk interview):

1. **Pemanggilan dengan titik:** `obj.method()` → `this` biasanya `obj` (kecuali method diambil lalu dipanggil terpisah).
2. **Panggilan langsung:** `fn()` → di non-strict browser global sering `window`; di strict mode atau Node modul, `undefined` (atau global object di skrip tertentu).
3. **`new`:** `this` mengacu instance yang sedang dibuat.
4. **`call` / `apply` / `bind`:** `this` adalah argumen pertama yang Anda berikan (kecuali `null`/`undefined` di sloppy mode yang bisa di-rebind ke global—hindari mengandalkan ini).

### 3.1 “Method extraction” memutus binding

```javascript
const user = {
  name: "Ada",
  greet() {
    return `Hi, ${this.name}`;
  },
};
const g = user.greet;
g(); // undefined name di strict; perilaku global di sloppy
```

Solusi: `user.greet.bind(user)`, arrow wrapper, atau `greet()` dipanggil sebagai `user.greet()`.

---

## 4. Arrow functions dan `this`

Arrow function **tidak** memiliki `this` sendiri; ia menutup (lexical) `this` dari scope luar tempat arrow didefinisikan.

```javascript
function Outer() {
  this.v = 1;
  this.get = () => this.v;
}
const o = new Outer();
const f = o.get;
f(); // tetap 1 — lexical this dari Outer instance
```

Gunakan arrow untuk callback yang perlu `this` dari class/constructor function; hindari arrow sebagai **prototype method** jika Anda ingin `this` mengikuti pemanggilan dinamis (jarang di kode modern).

---

## 5. `Function.prototype.call`

```javascript
function add(a, b) {
  return this.base + a + b;
}
const ctx = { base: 10 };
add.call(ctx, 1, 2); // 13
```

- Argumen setelah `this`: satu per satu.
- Berguna saat meminjam method array ke array-like: `Array.prototype.slice.call(arguments)`.

---

## 6. `Function.prototype.apply`

Sama seperti `call`, tetapi argumen kedua berupa **array-like** (misalnya array).

```javascript
Math.max.apply(null, [1, 5, 3]);
```

Catatan: spread modern sering menggantikan: `Math.max(...arr)`.

---

## 7. `Function.prototype.bind`

Mengembalikan **fungsi baru** dengan `this` terikat (partial application untuk argumen depan).

```javascript
const u = { id: 42 };
function log(prefix, msg) {
  return `${prefix} ${this.id} ${msg}`;
}
const logForU = log.bind(u, "[LOG]");
logForU("start"); // "[LOG] 42 start"
```

Pola umum di React class: `this.handleClick = this.handleClick.bind(this)` di constructor.

---

## 8. `this` di class fields dan method

Method biasa di class adalah di prototype; `this` mengikuti pemanggilan. Class fields dengan arrow function membuat instance field—`this` di arrow mengunci leksikal ke instance.

```javascript
class C {
  x = 1;
  a() {
    return this.x;
  }
  b = () => this.x;
}
```

Pilih sesuai apakah Anda perlu binding otomatis untuk dilepas sebagai callback.

---

## 9. Strict mode dan modul

Di **strict mode**, `this` pada pemanggilan fungsi bebas adalah `undefined`. Modul ES selalu strict. Ini mengurangi kebocoran ke global object secara diam-diam.

---

## 10. Pola interview: `setTimeout` dan `this`

```javascript
const o = {
  v: 1,
  tick() {
    console.log(this.v);
  },
};
setTimeout(o.tick, 0); // this hilang
setTimeout(() => o.tick(), 0); // OK
setTimeout(o.tick.bind(o), 0); // OK
```

---

## 11. Hubungan dengan topik lain

- **Closure** menjawab variabel leksikal mana; **`this`** menjawab konteks pemanggilan—jangan dicampur aduk dalam satu kalimat tanpa membedakan.
- **Hoisting / TDZ** tidak mengubah aturan `this`; tapi urutan deklarasi bisa mempengaruhi kapan fungsi dieksekusi.

---

## 12. Latihan prediksi output

```javascript
"use strict";
const obj = {
  a: function () {
    return this;
  },
  b: () => this,
};
console.log(obj.a());
console.log(obj.b());
```

Refleksi: arrow `b` mengambil `this` leksikal luar `obj` (misalnya `undefined` di modul atau global di skrip browser).

---

## 13. Checklist

- [ ] Tahu perbedaan **dynamic `this`** (function) vs **lexical** (arrow).
- [ ] Bisa menjelaskan `call` vs `apply` vs `bind`.
- [ ] Tahu gejala “method extracted” dan perbaikannya.
- [ ] Tahu perilaku strict mode / modul untuk `this` default.

---

## 14. Referensi

Perilaku `this` diatur oleh algoritma `GetThisValue` dan aturan pemanggilan di ECMAScript. Nama “binding” eksplisit berasal dari perilaku `Function.prototype.call` dan sejenisnya.

---

Dokumen ini sengaja padat; latihan tambahan: tulis contoh `addEventListener` dengan class method dan jelaskan mengapa `bind` atau arrow sering dipakai.

---

## 15. Tambahan: `super` dan `this` di subclass

Di method class, `super` memanggil implementasi induk. Urutan inisialisasi field dan pemanggilan `super()` di constructor memengaruhi kapan `this` boleh disentuh. Di subclass, akses `this` sebelum `super()` di constructor mengarah ke **ReferenceError** (kelas turunan). Ini bukan trivia kosong: error ini sering muncul saat refactor constructor React class atau pola OOP legacy.

---

## 16. Tambahan: peminjaman method (borrowing)

```javascript
function sliceLike() {
  return Array.prototype.slice.call(arguments, 1);
}
sliceLike("a", "b", "c"); // ["b", "c"]
```

Pola ini menunjukkan bahwa `call` mengubah `this` menjadi `arguments` (array-like), lalu `slice` dijalankan seolah milik array sungguhan. Di kode modern, `Array.from` atau rest parameter sering lebih jelas, tapi pola “borrow” masih ditanyakan sebagai pengetahuan historis dan kompatibilitas.

---

## 17. Jawaban singkat latihan (section 12)

- `obj.a()` mengembalikan `obj` (pemanggilan sebagai method).
- `obj.b()` mengembalikan `this` leksikal dari scope tempat `obj` dibuat (misalnya `undefined` di modul strict); **bukan** `obj` kecuali Anda membungkusnya berbeda.

---

## 18. Ringkas untuk flashcard

- `call(this, a, b)` — argumen terpisah.
- `apply(this, [a, b])` — array-like.
- `bind(this, ...partial)` — fungsi baru, lazy invocation.
- Arrow: tidak punya `this` sendiri; hindari sebagai method yang harus polymorphic by call site.

