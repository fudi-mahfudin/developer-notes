# Topik 98 — Curry dan Partial Application

**Currying** mengubah fungsi `f(a,b,c)` menjadi `f(a)(b)()` serangkaian fungsi unary yang masing-masing mengembalikan fungsi berikutnya hingga argumen cukup. **Partial application** membangun fungsi baru dengan **mengunci** beberapa argumen awal: `partial(f, a)(b) == f(a,b)`. Keduanya mendukung **komposisi** dan **reuse** di gaya fungsional.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Curry berguna ketika Anda ingin **mendefinisikan keluarga fungsi** dari parameter pertama (misalnya konfigurasi API base URL). Partial application lebih fleksibel urutan argumen jika Anda menyediakan placeholder. Di JavaScript, **`Function.prototype.bind`** adalah partial native: `add.bind(null, 2)` mengunci argumen pertama. Implementasi curry manual sering memakai rekursi panjang arity atau variadic dengan closure.

---

## 2. Mengapa topik ini keluar di interview

- Soal “implement curry(fn)” untuk arity tetap.
- Membedakan curry vs bind.

---

## 3. Curry arity 3

```javascript
const curry3 = (f) => (a) => (b) => (c) => f(a, b, c);
```

---

## 4. Partial dengan bind

```javascript
function add(a, b) {
  return a + b;
}
const add2 = add.bind(null, 2);
```

---

## 5. Kompleksitas

Overhead closure kecil—bukan bottleneck.

---

## 6. Pitfall: konteks `this`

`bind` mengikat `this`; arrow curry tidak punya `this` sendiri.

---

## 7. Pitfall: arity tidak jelas

Fungsi variadic sulit dicurry tanpa konvensi.

---

## 8. Pola interview: middleware Express

`app.use(prefix, router)` mirip partial application.

---

## 9. Pola interview: event handlers

`onClick={handler.bind(null, id)}` — hati-hati re-render.

---

## 10. Latihan konsep

Bandingkan lodash `curry` vs `partial`.

---

## 11. Latihan kode

`curryN(fn)` yang membaca `fn.length`.

---

## 12. Edge cases

- Over-application: terlalu banyak panggilan — error atau ignore.
- Placeholder `_` untuk partial urutan acak (lodash style).

---

## 13. Checklist

- [ ] Arity vs variadic.
- [ ] `this` semantics.
- [ ] Bind vs closure.

---

## 14. Referensi

Haskell curry; JS functional libraries (Ramda).

---

## 15. Anti-pattern

Curry semua fungsi tanpa kebutuhan—kode sulit dibaca.

---

## 16. Flashcard

- **Partial:** beberapa argumen tetap.

---

## 17. Testing

Assert hasil sama dengan fungsi asli.

---

## 18. Performa

Closure banyak — biasanya OK.

---

## 19. Integrasi TypeScript

Overload tuple untuk curry bertingkat—sulit tapi mungkin.

---

## 20. Debugging

Nama fungsi hilang — set `name` untuk devtools.

---

## 21. Memori

Closure menyimpan argumen awal.

---

## 22. Parallel

Tidak relevan.

---

## 23. Etika wawancara

Tanyakan arity tetap atau tidak.

---

## 24. Rangkuman

Curry = seri unary; partial = mengunci awal argumen.

---

## 25. Soal terkait

Pipeline (topik 99) — komposisi hasil curry.

---

## 26. Drill manual

Curry `f(a,b,c)=a+b+c` — evaluasi `curry(f)(1)(2)(3)`.

---

## 27. Varian: auto curry

Ramda-style — detect jumlah argumen pada call.

---

## 28. Penutup

Memahami curry membantu membaca kode fungsional modern dan pola library.

---

## 29. Contoh praktis partial

Membungkus callback yang membutuhkan argumen tetap sering memakai partial:

```javascript
const users = [1, 2, 3];
users.map(fetchUserById); // jika fetchUserById menerima id
// vs
users.map((id) => fetch("/api/" + id)); // closure eksplisit
```

`bind` cocok ketika fungsi sudah ada dan Anda ingin mengunci parameter pertama tanpa membungkus arrow baru.

---

## 30. Keterbacaan

Curry panjang seperti `f(a)(b)(c)` bisa mengurangi kejelasan bagi tim yang tidak terbiasa. Pola kompromi: curry hanya pada **parameter konfigurasi** pertama (misalnya `createApi(baseUrl)`), sisanya tetap satu panggilan biasa.

---

## 31. Hubungan dengan `Function.length`

Di JavaScript, `fn.length` menghitung parameter **sebelum** parameter default/rest—berguna untuk implementasi `curry` otomatis yang membaca arity, meskipun tidak sempurna untuk semua bentuk deklarasi.

---

Dokumen ini menjelaskan curry, partial application, bind, dan arity di JavaScript.
