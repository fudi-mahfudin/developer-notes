# Topik 4 — Prototype Chain dan `class` (Syntax Sugar)

Dokumen ini menjelaskan pewarisan berbasis prototipe di JavaScript, bagaimana rantai `[[Prototype]]` bekerja, serta hubungan sintaks `class` dengan fungsi konstruktor klasik. Ini sering muncul di interview senior dan saat membaca kode transpile atau library lama.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Setiap objek JavaScript punya link internal ke prototipe lain (biasanya diakses via `Object.getPrototypeOf` atau properti legacy `__proto__`). Saat properti tidak ada di objek, pencarian naik **prototype chain** sampai `null`. **Fungsi konstruktor** punya `prototype` object tempat method instance “dititip”. Sintaks **`class`** di ES2015 menghasilkan perilaku yang setara dengan konstruktor + prototipe, ditambah `extends`/`super` untuk pewarisan yang lebih terbaca—bukan mengubah model prototipe dasar.

---

## 2. Mengapa topik ini keluar di interview

- Membedakan “tahu OOP dari bahasa lain” vs “tahu model JS”.
- Debugging: `instanceof`, shadowing prototype, dan method yang hilang karena assign langsung ke instance.
- Membaca polyfill atau kode ES5 yang masih ada di ekosistem.

---

## 3. Objek dan `[[Prototype]]`

Secara internal, engine menyimpan **[[Prototype]]** (bukan properti biasa). Akses publik yang disarankan:

```javascript
const a = { x: 1 };
const b = Object.create(a);
b.y = 2;
console.log(b.x); // 1 — ditemukan di chain
```

Jika properti tidak ada di `b`, engine mencari di prototipe, lalu naik lagi.

---

## 4. Fungsi konstruktor dan `prototype`

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  return `Hi ${this.name}`;
};
const p = new Person("Lee");
p.greet();
```

- `new` membuat objek baru yang `[[Prototype]]`-nya mengarah ke `Person.prototype`.
- Method di `Person.prototype` **dibagi** semua instance (hemat memori vs method di constructor).

---

## 5. `class` sebagai sugar

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hi ${this.name}`;
  }
}
```

Method di body class (non-static) ada di prototipe. Ada perbedaan halus dengan enumerability dan hoisting dibanding function declaration—`class` tidak di-hoist seperti function declaration biasa (TDZ mirip `let`).

---

## 6. Static method

```javascript
class Mathy {
  static add(a, b) {
    return a + b;
  }
}
```

Static hidup di constructor function (`User`), bukan di instance prototype chain untuk lookup `this` pada instance.

---

## 7. `extends` dan `super`

`extends` mengatur `[[Prototype]]` antara prototype objects dan menghubungkan constructor. Di subclass, `super()` di constructor harus dipanggil sebelum menyentuh `this` (aturan yang disebut di topik `this`).

---

## 8. `instanceof` dan hubungan prototipe

```javascript
p instanceof Person; // true jika Person.prototype ada di chain p
```

`instanceof` menguji relasi prototipe, bukan “nama class” secara magis. Objek dari realm iframe berbeda bisa membuat hasil mengejutkan jika prototipe berbeda.

---

## 9. Mengganti prototipe vs mengisi instance

```javascript
function C() {}
C.prototype.m = () => 1;
const x = new C();
C.prototype = { m: () => 2 }; // tidak mengubah x
```

Instance lama tetap menunjuk rantai lama. Ini jarang di interview tapi menjelaskan mental model link, bukan “copy class”.

---

## 10. Shadowing

Jika instance punya properti `toString` sendiri, pencarian tidak naik ke `Object.prototype.toString` kecuali Anda pakai `Reflect` atau hapus properti sendiri.

---

## 11. Pola interview: `Object.create(null)`

Membuat objek tanpa prototype chain untuk map murni (kunci tidak bentrok dengan `toString`, dll.). Trade-off: tidak punya method bawaan object.

---

## 12. Perbandingan singkat dengan class-based language

Di Java, class adalah blueprint statis. Di JS, objek bisa diubah dinamis; prototipe bisa dimutasi (meski praktik produksi modern menghindari mutasi prototipe global).

---

## 13. Latihan konsep

1. Jelaskan perbedaan `__proto__` vs `prototype` (istilah dan risiko).
2. Mengapa method di prototype menghemat memori dibanding `this.method = function(){}` di constructor?

---

## 14. Checklist

- [ ] Bisa menjelaskan lookup properti lewat prototype chain.
- [ ] Tahu `class` bukan class seperti Java secara mekanisme.
- [ ] Tahu `instanceof` menguji rantai prototipe.
- [ ] Tahu implikasi `super` dan urutan di subclass constructor.

---

## 15. Referensi

Model prototipe dijelaskan di ECMAScript melalui ordinary object internal methods dan `[[Prototype]]`. Literatur MDN “Inheritance and the prototype chain” memberikan diagram yang cocok untuk revisi cepat.

---

## 16. Tambahan: `Object.getPrototypeOf` / `Reflect.setPrototypeOf`

Mengubah prototipe setelah objek dibuat memungkinkan tapi berisiko memecahkan invariant dan memperlambat optimasi engine. Di kode aplikasi, hindari kecuali framework internal.

---

## 17. Tambahan: `hasOwnProperty`

```javascript
({ a: 1 }).hasOwnProperty("a"); // true
Object.prototype.hasOwnProperty.call(obj, "a"); // aman jika obj mungkin null-prototype
```

Membedakan properti “sendiri” vs warisan sangat penting saat iterasi key.

---

## 18. Tambahan: enumerability

Properti dari class methods biasanya non-enumerable; assignment langsung `obj.x = 1` enumerable. Ini mempengaruhi `for...in` vs `Object.keys`.

---

## 19. Contoh micro-quiz

```javascript
function F() {}
F.prototype.x = 1;
const a = new F();
const b = new F();
F.prototype.x = 2;
console.log(a.x, b.x);
```

Refleksi: karena `x` ada di prototype object yang sama, perubahan memengaruhi semua instance yang masih merujuk prototype itu.

---

## 20. Jawaban micro-quiz

Output: `2 2` — satu objek prototype dibagi.

---

## 21. Menutup: kaitan dengan modul

Di ESM, top-level tidak “mengisi” global prototype secara implisit seperti pola script lama. Memahami prototipe tetap penting untuk DOM, built-in extension (hati-hati), dan interop.

---

## 22. Flashcard cepat

- **Prototype object:** objek yang menyimpan method bersama instance.
- **Chain ends:** `null`.
- **class fields:** properti instance; method shorthand → prototype (kecuali arrow field).

---

## 23. Anti-pattern yang sering disebut

Memodifikasi `Array.prototype` atau built-in lain di library publik: bentrok dengan kode lain dan sulit di-debug.

---

## 24. Latihan tulis kode

Implementasikan `inherits(Child, Parent)` skema ES5 (tanpa `class`) lalu jelaskan di mana method `Parent` harus diletakkan agar efisien.

---

## 25. Catatan untuk TypeScript

`private` field `#x` di class JS modern tidak sama dengan `private` TypeScript yang hanya compile-time. Ini pertanyaan lanjutan di interview full-stack.

---

Dokumen ini melengkapi fondasi OOP JS tanpa masuk ke meta-programming (`Proxy`, `Reflect`) yang bisa jadi topik lanjutan.
