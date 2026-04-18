# Topik 99 — Pipeline dan Compose

**Compose** menggabungkan fungsi `f∘g∘h` sehingga data mengalir dari kanan ke kiri: `compose(f,g,h)(x) = f(g(h(x)))`. **Pipe** / **pipeline** sering **kiri ke kanan**: `pipe(h,g,f)(x) = f(g(h(x)))`. Pola ini membuat transformasi data **tanpa variabel perantara** dan mudah diuji per langkah.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Implementasi: `const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x)`; `pipe` memakai `reduce` biasa. Pastikan setiap fungsi **unary** atau bungkus dengan partial untuk arity lebih. Di TypeScript, inferensi tipe rantai sulit—sering perlu overload manual atau library `fp-ts`. Ramda `pipe`/`compose` adalah referensi.

---

## 2. Mengapa topik ini keluar di interview

- Soal “implement pipe” atau refactor rantai `.map().filter()`.
- Diskusi readability vs chaining method.

---

## 3. Compose

```javascript
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);
```

---

## 4. Pipe

```javascript
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);
```

---

## 5. Kompleksitas

O(jumlah fungsi) aplikasi—linear.

---

## 6. Pitfall: arity

Compose klasik unary—fungsi multi-arg perlu curry/wrap.

---

## 7. Pitfall: async

`pipe` sinkron tidak menunggu Promise—gunakan `pipe` async atau `reduce` dengan `await` dalam `async` function.

---

## 8. Pola interview: data transform

`pipe(trim, toLower, slugify)`.

---

## 9. Pola interview: middleware chain

Express mirip pipeline—urutan penting.

---

## 10. Latihan konsep

Buktikan `compose(f,g) === pipe(g,f)` untuk dua fungsi.

---

## 11. Latihan kode

`pipeAsync` dengan `for await` atau `reduce` promise.

---

## 12. Edge cases

- Array kosong fungsi — identitas `x => x`.

---

## 13. Checklist

- [ ] Arah compose vs pipe.
- [ ] Unary assumption.
- [ ] Async variant.

---

## 14. Referensi

Ramda; lodash `flow`/`flowRight`.

---

## 15. Anti-pattern

Pipe 15 fungsi satu baris tanpa nama—sulit debug.

---

## 16. Flashcard

- **Compose:** kanan ke kiri.

---

## 17. Testing

Unit test tiap fungsi kecil dalam pipeline.

---

## 18. Performa

Overhead minimal; fokus pada kerja tiap langkah.

---

## 19. Integrasi TypeScript

`Pipe` generic rekursif—advanced.

---

## 20. Debugging

Beri nama intermediate dengan `tap` helper logging.

---

## 21. Memori

Closure ringan.

---

## 22. Parallel

Tidak kecuali langkah paralel eksplisit.

---

## 23. Etika wawancara

Tanyakan arah yang diinginkan (lodash `flow` = pipe).

---

## 24. Rangkuman

Compose dan pipe adalah reduksi fungsi untuk aliran data.

---

## 25. Soal terkait

Transducer (Clojure) — optimasi komposisi map/filter—lanjutan.

---

## 26. Drill manual

`compose(x=>x+1, x=>x*2)(3)` — hasil?

---

## 27. Varian: tap

`const tap = (f) => (x) => (f(x), x)` untuk side effect logging.

---

## 28. Penutup

Pipeline membuat transformasi deklaratif asalkan setiap langkah tetap kecil dan jelas.

---

## 29. `pipe` async (urutan tetap)

```javascript
const pipeAsync =
  (...fns) =>
  async (x) => {
    let v = x;
    for (const f of fns) v = await f(v);
    return v;
  };
```

Setiap langkah boleh mengembalikan `Promise` atau nilai biasa; `await` menormalisasi keduanya.

---

## 30. Bandingkan dengan method chaining

`value.trim().toLowerCase()` adalah pipeline berorientasi objek pada **satu tipe**; `pipe(trim, toLower)` lebih mudah jika langkah adalah **fungsi bebas** atau berasal dari modul berbeda tanpa prototype chain.

---

## 31. Error handling di pipeline

Tanpa helper, error di tengah menghentikan `reduce`. Pola `andThen`/`Result` (Either) dari fp atau `try/catch` di luar untuk pipeline sync; untuk async gunakan `async`/`await` eksplisit per langkah jika perlu pemetaan error ke nilai fallback.

---

Dokumen ini menjelaskan compose vs pipe, unary, dan varian async.
