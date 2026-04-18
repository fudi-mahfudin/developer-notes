# Topik 6 — `typeof`, `instanceof`, dan Type Checking Praktis

Dokumen ini menjelaskan operator dan pola untuk menguji tipe atau “bentuk” nilai di JavaScript, keterbatasannya, serta praktik aman di runtime (tanpa menggantikan TypeScript untuk statis).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**`typeof`** mengembalikan string kasar untuk primitif dan membedakan `function`; untuk array ia mengembalikan `"object"` (kecuali Array di IE jadul—abaikan). **`instanceof`** menguji hubungan prototipe antara objek dan konstruktor. Untuk pengecekan array modern, **`Array.isArray`** lebih andal. Untuk `null`, `typeof` mengembalikan `"object"`—ini bug historis yang harus diketahui. Di production, boundary validation sering memakai library schema (Zod, Yup) daripada rantai `typeof` panjang.

---

## 2. Mengapa topik ini keluar di interview

- Menangkap asumsi salah tentang `typeof null` dan deteksi array.
- Polymorphism runtime: duck typing vs class-based checks.
- Interop dengan DOM (`iframe`) mempengaruhi `instanceof`.

---

## 3. Tabel `typeof` umum

| Nilai | Hasil `typeof` |
|-------|----------------|
| `undefined` | `"undefined"` |
| `null` | `"object"` |
| boolean | `"boolean"` |
| number | `"number"` |
| bigint | `"bigint"` |
| string | `"string"` |
| symbol | `"symbol"` |
| function | `"function"` |
| object biasa | `"object"` |

---

## 4. Menguji `null` dengan aman

```javascript
value === null;
```

Jangan `typeof value === "null"` — tidak pernah benar.

---

## 5. `Array.isArray`

```javascript
Array.isArray([]); // true
Array.isArray({ length: 0 }); // false
```

Lebih baik daripada `instanceof Array` lintas realm.

---

## 6. `instanceof` — prototipe, bukan nama tipe

```javascript
[] instanceof Array; // true
[] instanceof Object; // true (chain)
```

Subclassing native bisa membuat `instanceof` tampak “ajaib” jika prototipe diatur manual.

---

## 7. Lintas realm / iframe

`obj instanceof Array` bisa `false` jika `Array` dari realm berbeda meskipun perilaku mirip array. `Array.isArray` menangani ini.

---

## 8. `Symbol.toStringTag` dan deteksi built-in

```javascript
Object.prototype.toString.call(new Map()); // "[object Map]"
```

Pola ini dipakai untuk membedakan object subtipe ketika `typeof` kabur.

---

## 9. Duck typing

```javascript
function isThenable(x) {
  return x != null && typeof x.then === "function";
}
```

Banyak API JS mengutamakan bentuk (shape), bukan class.

---

## 10. Type checking vs TypeScript

TS hilang di runtime; guard function tetap diperlukan di boundary (HTTP, `JSON.parse`, storage).

---

## 11. `Number.isFinite` vs `typeof x === "number"`

`NaN` adalah number menurut `typeof` tetapi tidak finite—pilih fungsi yang sesuai.

---

## 12. `Object.is` untuk `-0` dan `NaN`

Berguna di numeric code; berbeda dari `===` untuk kasus tersebut.

---

## 13. Latihan

```javascript
typeof NaN;
typeof (() => {});
typeof class C {};
```

---

## 14. Jawaban latihan

- `"number"` — `NaN` adalah nilai number.
- `"function"` — arrow adalah function.
- `"function"` — class adalah function semantiknya.

---

## 15. Checklist

- [ ] Tahu `typeof null`.
- [ ] Tahu `Array.isArray` vs `instanceof`.
- [ ] Tahu keterbatasan `instanceof` lintas realm.
- [ ] Tahu pola `Object.prototype.toString.call`.

---

## 16. Referensi

`instanceof` dijelaskan lewat `OrdinaryHasInstance` di spesifikasi. `typeof` memetakan internal tipe tag.

---

## 17. Tambahan: cek plain object

```javascript
function isPlainObject(v) {
  if (v === null || typeof v !== "object") return false;
  const proto = Object.getPrototypeOf(v);
  return proto === null || proto === Object.prototype;
}
```

Berguna membedakan `{}` dari `Object.create(null)` atau instance class.

---

## 18. Tambahan: `in` vs `hasOwnProperty`

`"x" in obj` termasuk prototipe; `hasOwnProperty` hanya sendiri.

---

## 19. Tambahan: `String(obj)` vs `typeof`

Object bisa punya `toString` kustom—hati-hati saat logging.

---

## 20. Pola schema runtime

Daripada rantai if:

```javascript
function assertString(x, name) {
  if (typeof x !== "string") throw new TypeError(`${name} must be string`);
}
```

---

## 21. JSON dan tipe

`JSON.parse` menghasilkan plain object/array/string/number/boolean/null—tidak `undefined`, tidak `Date`, tidak `Map`.

---

## 22. Quiz: Date

```javascript
typeof new Date();
Object.prototype.toString.call(new Date());
```

Jawaban: `"object"` dan `"[object Date]"`.

---

## 23. BigInt campuran

`1n === 1` adalah `false`; `typeof 1n` adalah `"bigint"`.

---

## 24. Simbol sebagai key

`typeof Symbol()` adalah `"symbol"`; object dengan symbol key tidak muncul di `Object.keys` biasa.

---

## 25. Menutup

Kombinasi `typeof`, `Array.isArray`, `Object.prototype.toString`, dan guard eksplisit di boundary lebih kuat daripada satu operator aja.

---

## 26. Latihan tulis

Tulis `deepGet(obj, path)` dengan validasi `path` array string tanpa eval—uji tipe setiap langkah.

---

Dokumen ini mendukung pertanyaan interview “bagaimana Anda validasi input di runtime?” dengan jawaban yang terukur.
