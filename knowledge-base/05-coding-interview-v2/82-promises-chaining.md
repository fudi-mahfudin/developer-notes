# Topik 82 — Promises: Chaining dan Error Propagation

**Promise** merepresentasikan nilai masa depan. **`.then(onFulfilled, onRejected)`** mengembalikan promise baru; **`.catch(onRejected)`** sama dengan `.then(undefined, onRejected)`. **Rantai** memungkinkan transformasi berurutan tanpa callback pyramid. Kesalahan **meluncur** ke `catch` terdekat; tanpa `catch`, **unhandled rejection**.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

`then` mengembalikan promise yang:

- Jika handler mengembalikan nilai, dilapisi resolved.
- Jika mengembalikan promise, “flatten” (mengikuti promise itu).

`catch` di akhir rantai menangkap error dari mana pun di atas. **Tanpa return** di `then` dalam `async` flow sering bug—nilai `undefined` diteruskan. Gunakan **`Promise.resolve`** untuk membungkus nilai non-promise ke rantai.

---

## 2. Mengapa topik ini keluar di interview

- Pola API modern menggantikan callback hell.
- Soal “perbaiki rantai yang hilang return”.

---

## 3. Rantai transformasi

```javascript
fetch("/api/user")
  .then((r) => {
    if (!r.ok) throw new Error(String(r.status));
    return r.json();
  })
  .then((u) => u.id)
  .then((id) => fetch(`/api/posts/${id}`))
  .then((r) => r.json())
  .catch((e) => {
    console.error(e);
    throw e;
  });
```

---

## 4. Dua argumen `then` vs `catch`

`then(null, err)` hanya menangkap error dari **sebelumnya**, tidak dari `onFulfilled` sendiri—gunakan `catch` terpisah.

---

## 5. Kompleksitas

Tidak relevan—fokus alur kontrol.

---

## 6. Pitfall: lupa `return`

```javascript
fetch("/a").then((r) => {
  r.json();
}); // undefined chain
```

Perbaikan: `return r.json()`.

---

## 7. Pitfall: swallow error

`catch` yang tidak rethrow menghentikan error—kadang disengaja, sering bug.

---

## 8. Pitfall: mixing sync throw in executor

Executor sync throw menolak promise; bedakan dengan async throw di dalam `then`.

---

## 9. Pola interview: `Promise.all` setelah map

`Promise.all(arr.map(...))` — pastikan setiap iterasi mengembalikan promise.

---

## 10. Pola interview: sequential vs parallel

`for...of` + `await` vs `reduce` chain — trade-off.

---

## 11. Latihan konsep

Jelaskan flattening promise dalam `then`.

---

## 12. Latihan kode

Tulis `delay(ms)` dengan promise dan rantai tiga delay.

---

## 13. Edge cases

- `then` dengan non-function: nilai diteruskan (identity).
- `finally` selalu dijalankan; return value dari `finally` tidak mengganti fulfilled value kecuali throw.

---

## 14. Checklist

- [ ] Return di setiap `then` async.
- [ ] `catch` scope.
- [ ] `finally` semantics.

---

## 15. Referensi

Promises/A+ spec; MDN Promise.

---

## 16. Anti-pattern

`.then(fn).then(fn)` dengan side effect tanpa return value yang konsisten.

---

## 17. Flashcard

- **Flattening:** then mengembalikan promise → menunggu.

---

## 18. Testing

`sinon` fake server + assert order calls.

---

## 19. Performa

Parallel `Promise.all` lebih cepat dari sequential jika independen.

---

## 20. Integrasi TypeScript

`Promise<T>` generics pada setiap `then`.

---

## 21. Debugging

Chrome async stack traces; `unhandledrejection` listener.

---

## 22. Memori

Rantai panjang tetap ringan—tidak menyimpan seluruh callback sekaligus seperti beberapa bayangan.

---

## 23. Parallel

Promise bukan thread—tetap satu thread JS.

---

## 24. Etika wawancara

Jelaskan perbedaan microtask queue untuk `then`.

---

## 25. Rangkuman

Chaining = composable async; return dan error propagation adalah inti.

---

## 26. Soal terkait

Implement `promisify` untuk callback Node style.

---

## 27. Drill manual

Trace nilai yang mengalir di `then` yang mengembalikan angka vs promise angka.

---

## 28. Varian: `using` promise resources

Proposal/experimental—bukan universal.

---

## 29. Varian: cancellation

Promise standar tidak bisa cancel—gunakan `AbortController` dengan fetch.

---

## 30. Penutup

Kuasai chaining berarti menguasai aliran data async dan debugging rejection.

---

Dokumen ini menjelaskan promise chaining, flattening, pitfall return, dan hubungan dengan microtask.
