# Topik 12 — Generators (`function*`)

Dokumen ini menjelaskan generator function di JavaScript, method `yield`, komunikasi dua arah (`next(arg)`), exception dari luar, serta pola lazy evaluation dan async generator (sentuhan).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Generator** adalah fungsi yang bisa dijeda dan dilanjutkan; memanggilnya mengembalikan **generator object** yang sekaligus **iterator** dan **iterable**. **`yield`** mengeluarkan nilai ke konsumen dan menjeda eksekusi hingga `next()` dipanggil lagi. **`yield*`** mendelegasikan ke iterable/generator lain. Generator memungkinkan lazy sequence, traversal tree tanpa stack eksplisit besar, dan pola coroutine sederhana.

---

## 2. Mengapa topik ini keluar di interview

- Soal implementasi iterator kompleks lebih sederhana dengan generator.
- Membaca middleware/kode async generator (Node streams kadang terkait).
- Memahami trade-off memori vs call stack untuk rekursi.

---

## 3. Generator dasar

```javascript
function* nums() {
  yield 1;
  yield 2;
}
const g = nums();
g.next(); // { value:1, done:false }
g.next(); // { value:2, done:false }
g.next(); // { done:true }
```

---

## 4. Iterable otomatis

```javascript
[...nums()]; // [1,2]
```

---

## 5. `yield*` delegasi

```javascript
function* concat(a, b) {
  yield* a;
  yield* b;
}
```

---

## 6. Passing values kembali ke generator

```javascript
function* echo() {
  const x = yield 1; // nilai dari next(arg)
  return x;
}
const g = echo();
g.next(); // start sampai yield pertama
g.next(42); // mengisi x
```

---

## 7. Exception dari luar

```javascript
function* f() {
  try {
    yield 1;
  } catch (e) {
    yield "caught";
  }
}
const g = f();
g.next();
g.throw(new Error("x"));
```

---

## 8. Generator dan `return`

`return` di dalam generator menyelesaikan iterator (`done: true`) dengan `value` sesuai return.

---

## 9. Lazy infinite sequence

```javascript
function* naturals() {
  let n = 0;
  while (true) yield n++;
}
```

Hati-hati loop tak terbatas saat spread—akan hang.

---

## 10. Tree traversal

Generator DFS bisa `yield*` subtree—menghindari membangun array besar.

---

## 11. Kompleksitas

Sama seperti iterator manual, tetapi lebih ergonomis; overhead generator state machine kecil.

---

## 12. Latihan

Tulis generator `permutations(arr)` untuk array kecil (n!) dan diskusikan batas praktis.

---

## 13. Checklist

- [ ] Tahu `yield` vs `yield*`.
- [ ] Tahu `next(arg)` mengisi hasil yield sebelumnya.
- [ ] Tahu `throw` pada iterator.

---

## 14. Referensi

Generator ditranspile menjadi state machine; spesifikasi menjelaskan `GeneratorResume` dan sejenisnya.

---

## 15. Async generator (`async function*`)

Meng-`yield` Promise; dikonsumsi dengan `for await...of`. Berguna untuk stream data async.

---

## 16. Quiz

Apa bedanya:

```javascript
function* a() {
  yield [1, 2];
}
function* b() {
  yield* [1, 2];
}
```

`a` menghasilkan satu nilai array; `b` menghasilkan dua nilai terpisah.

---

## 17. Anti-pattern

Generator untuk I/O berat tanpa `async`—gunakan async generator atau async/await.

---

## 18. Flashcard

- **Generator object:** iterator+iterable.
- **yield*:** delegasi.

---

## 19. Latihan tulis

Implementasikan `take(n, gen)` yang membungkus iterable dan berhenti setelah n yield.

---

## 20. Menutup

Generator adalah alat ergonomis di atas iterator protocol—pahami dulu iterator murni.

---

## 21. Tambahan: `return()` pada iterator

Memanggil `g.return(value)` menghentikan generator lebih awal—penting untuk cleanup.

---

## 22. Tambahan: generator dan `this`

Generator bisa jadi method; `this` mengikuti aturan fungsi biasa (bukan arrow).

---

## 23. Debugging

Stack trace bisa membingungkan karena state machine—gunakan nama yield deskriptif.

---

## 24. Kaitan coroutine

Generator bukan coroutine penuh seperti di beberapa bahasa, tapi cukup untuk banyak pola cooperatif.

---

## 25. Performa

Untuk numerik hot path murni, loop for biasa lebih cepat—generator untuk kejelasan dan lazy.

---

Dokumen ini melengkapi pemahaman iterator dengan alat yang lebih ekspresif.
