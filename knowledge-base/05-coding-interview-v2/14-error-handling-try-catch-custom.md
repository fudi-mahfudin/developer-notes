# Topik 14 — Error Handling (`try/catch`), Custom Errors

Dokumen ini menjelaskan model error di JavaScript, stack trace, subclassing `Error`, pola async (`reject`, `await`), dan praktik observability ringan.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

JavaScript membedakan **exception throw** sinkron (`throw`) yang ditangkap `try/catch/finally`, dan **Promise rejection** asinkron yang ditangkap `.catch` atau `try/catch` di sekitar `await`. **Subclass `Error`** dengan `name` dan properti domain membantu filter di logging. **`cause`** (ES2022) menyimpan error asli saat membungkus. Pola baik: jangan menelan error tanpa log; bedakan **operational** vs **programmer** error untuk respons API.

---

## 2. Mengapa topik ini keluar di interview

- Menulis kode async yang tidak silent-fail.
- Mendesain error type untuk library.
- Memahami stack trace untuk debugging produksi.

---

## 3. `try/catch` dasar

```javascript
try {
  risky();
} catch (e) {
  console.error(e.message);
} finally {
  cleanup();
}
```

---

## 4. Semua nilai bisa di-throw

```javascript
throw "oops"; // buruk untuk konsistensi
throw new Error("oops");
```

Disarankan `Error` atau subclass.

---

## 5. Custom error

```javascript
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}
```

---

## 6. `Error.captureStackTrace`

Di V8/Node, bisa memangkas stack untuk constructor helper.

---

## 7. Async: `try/catch` dengan `await`

```javascript
async function f() {
  try {
    await mayFail();
  } catch (e) {
    // menangkap reject
  }
}
```

---

## 8. Tanpa `await`

Promise rejection tidak masuk `try/catch` sinkron kecuali di microtask boundary—gunakan `.catch`.

---

## 9. `Promise.all` dan error pertama

Satu rejection menolak seluruh all—gunakan `allSettled` jika perlu semua hasil.

---

## 10. Rethrow

```javascript
try {
  await op();
} catch (e) {
  await log(e);
  throw e;
}
```

---

## 11. Wrapping dengan `cause`

```javascript
try {
  JSON.parse("{");
} catch (e) {
  throw new Error("bad config", { cause: e });
}
```

---

## 12. Operational vs bug

Operational: validasi input gagal; bug: `undefined.foo`. Respons berbeda untuk API publik.

---

## 13. Checklist

- [ ] Tahu `try/catch` tidak menangkap rejection tanpa `await`.
- [ ] Tahu subclass Error untuk domain.
- [ ] Tahu `finally` selalu jalan (kecuali process exit).

---

## 14. Referensi

Spesifikasi menjelaskan completion records untuk try statements; Promise menggunakan `ThrowCompletion` terpisah.

---

## 15. Latihan

Tulis `withTimeout(promise, ms)` yang reject dengan `TimeoutError` custom.

---

## 16. Anti-pattern

`catch (e) {}` kosong—menyembunyikan kegagalan.

---

## 17. Flashcard

- **throw:** sinkron stack unwind.
- **reject:** async, perlu handler.

---

## 18. Quiz

```javascript
Promise.resolve()
  .then(() => {
    throw new Error("a");
  })
  .catch((e) => {
    throw new Error("b");
  })
  .catch((e) => console.log(e.message));
```

Output `b` — error kedua ditangkap chain berikutnya.

---

## 19. Menutup

Error adalah bagian API; desain pesan, kode, dan metadata sama pentingnya dengan happy path.

---

## 20. Tambahan: `AggregateError`

Menggabungkan banyak error—dipakai `Promise.any` saat semua gagal.

---

## 21. Tambahan: assertion functions

Di TS, narrowing setelah throw—runtime tetap perlu guard.

---

## 22. Observability

Sertakan `requestId`, `userId` (hati-hati PII) di context log—bukan topik JS murni tapi sering ditanya.

---

## 23. Latihan tulis

Buat hierarki `AppError` dengan `code` enum dan serializer aman untuk response HTTP.

---

## 24. Browser vs Node

`Error.stack` non-standar tapi universal—jangan parse terlalu ketat.

---

## 25. `finally` dan `return`

`return` di `try` menunggu `finally`—perilaku penting untuk cleanup resource.

---

Dokumen ini mendukung behavioral interview “ceritakan debugging produksi” dengan fondasi teknis.
