# Topik 11 — Iterables, Iterators, dan `for...of`

Dokumen ini menjelaskan protokol iterable di JavaScript, method `Symbol.iterator`, perbedaan `for...of` vs `for...in`, serta hubungan dengan spread dan API built-in.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Iterable** adalah objek yang mengimplementasikan method `Symbol.iterator` yang mengembalikan **iterator**—objek dengan method `next()` menghasilkan `{ value, done }`. **`for...of`** mengkonsumsi iterable dengan memanggil `next` hingga `done: true`. **Spread** (`...iterable`) dan banyak konstruktor (`Array.from`, `Map`, `Promise.all`) juga memakai protokol yang sama. **`for...in`** mengiterasi **enumerable string keys** (termasuk yang diwarisi), bukan nilai—berbeda tujuan dengan `for...of`.

---

## 2. Mengapa topik ini keluar di interview

- Membaca kode custom data structure yang bisa di-loop.
- Menghindari bug `for...in` pada array (index string, properti prototipe).
- Memahami generator sebagai iterable khusus (topik berikutnya terkait).

---

## 3. Iterator protocol

```javascript
const it = [1, 2][Symbol.iterator]();
it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: undefined, done: true }
```

---

## 4. Iterable manual

```javascript
const range = {
  from: 1,
  to: 3,
  [Symbol.iterator]() {
    let n = this.from;
    const end = this.to;
    return {
      next() {
        if (n <= end) return { value: n++, done: false };
        return { done: true };
      },
    };
  },
};
console.log([...range]); // [1,2,3]
```

---

## 5. `for...of`

```javascript
for (const x of range) {
  console.log(x);
}
```

Memanggil `iterator.next()` secara implisit.

---

## 6. `for...in` vs `for...of`

```javascript
for (const k in [10, 20]) console.log(k); // "0","1" (+ mungkin enumerable lain)
for (const v of [10, 20]) console.log(v); // 10, 20
```

---

## 7. String iterable

String iterable per karakter Unicode code point (dengan aware surrogate pairs di iterasi modern).

---

## 8. Map dan Set

`Map` iterable sebagai entries `[key, value]`; `Set` iterable values.

---

## 9. Spread dan iterable

```javascript
[...new Set([1, 1, 2])];
```

---

## 10. Non-iterable array-like

`arguments` di function non-strict array-like tapi iterable di modern JS; `NodeList` di browser iterable.

---

## 11. `Array.from`

Mengubah array-like atau iterable menjadi array sungguhan—berguna untuk snapshot.

---

## 12. Error umum

Mengiterasi object plain `{a:1}` tanpa `Symbol.iterator` → TypeError di `for...of`.

---

## 13. Kompleksitas

Satu pass O(n) elemen untuk konsumsi penuh—wajar.

---

## 14. Latihan

Buat iterable yang menghasilkan bilangan Fibonacci hingga batas `max` tanpa menyimpan seluruh array di memori.

---

## 15. Checklist

- [ ] Tahu `next()` shape.
- [ ] Tahu beda `for...in` vs `for...of`.
- [ ] Tahu iterable digunakan spread/`Array.from`.

---

## 16. Referensi

Protokol dijelaskan di ECMAScript sebagai `GetIterator` dan `IteratorStep`.

---

## 17. Tambahan: async iterable

`for await...of` untuk AsyncIterable—topik async terpisah; jangan campur dengan sync iterator.

---

## 18. Tambahan: iterable exhaustion

Iterator bisa dipakai sekali; beberapa iterable membuat iterator baru setiap kali `Symbol.iterator` dipanggil (array), beberapa tidak—perilaku tergantung implementasi.

---

## 19. Quiz

```javascript
const xs = [1, 2];
const it = xs[Symbol.iterator]();
it.next();
console.log([...xs]);
```

Jawaban: `[1,2]` — spread membuat iterator baru dari iterable.

---

## 20. Pola interview: chain iterable

Implementasikan `take(n, iterable)` lazy—hentikan setelah n nilai.

---

## 21. Flashcard

- **Iterable:** punya `@@iterator`.
- **Iterator:** punya `next`.

---

## 22. Anti-pattern

Menambahkan enumerable property ke `Array.prototype`—mengotori `for...in`.

---

## 23. Latihan tulis

Implementasikan `zip(a, b)` sebagai iterable yang menghasilkan pasangan hingga salah satu habis.

---

## 24. Menutup

Memahami iterable menjembatani data structure kustom dengan ekosistem JS modern.

---

## 25. Tambahan: generator sebagai iterable factory

Generator function mengembalikan generator object yang sekaligus iterable—lanjut topik 12.

---

## 26. Performa micro

Iterator murni bisa lebih lambat dari loop index di hot path—profil dulu sebelum optimasi prematur.

---

Dokumen ini mendukung menjawab “bagaimana membuat struktur data bisa di-for-of?” dengan contoh runnable.
