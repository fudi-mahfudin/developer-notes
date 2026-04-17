# Topik 83 — async/await dan Penanganan Error

**`async` function** selalu mengembalikan **Promise**. **`await`** menunda eksekusi fungsi hingga promise selesai, membungkus hasil atau melempar jika rejected. **Error handling** memakai **`try/catch`** di sekitar `await`, atau `.catch()` pada pemanggilan fungsi async. Pola **parallel** vs **sequential** sangat mempengaruhi performa.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

`try/catch` menangkap rejection dari `await` seolah synchronous. Tanpa `try/catch`, error menjadi rejection promise dari fungsi async. **`await` dalam loop** `for...of` sequential; `Promise.all` parallel. **Jangan** `await` di `forEach`—callback tidak menunggu. Gabungkan dengan **`AbortController`** untuk membatalkan fetch. Untuk beberapa error, pertimbangkan **batas retry** atau **fallback**.

---

## 2. Mengapa topik ini keluar di interview

- Bug klasik: `async` map tanpa `Promise.all`.
- Soal “tulis fungsi dengan timeout dan error handling”.

---

## 3. try/catch dasar

```javascript
async function load() {
  try {
    const res = await fetch("/api");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
}
```

---

## 4. Parallel dengan Promise.all

```javascript
async function loadBoth() {
  const [a, b] = await Promise.all([
    fetch("/a").then((r) => r.json()),
    fetch("/b").then((r) => r.json()),
  ]);
  return { a, b };
}
```

---

## 5. Anti-pattern: forEach + async

```javascript
// salah: tidak menunggu
items.forEach(async (x) => {
  await doWork(x);
});
```

Gunakan `for...of` atau `await Promise.all(items.map(...))`.

---

## 6. Kompleksitas

Parallel mengurangi latency wall-clock jika independen.

---

## 7. Pitfall: swallow di catch kosong

Menelan error menyembunyikan bug—log atau rethrow selektif.

---

## 8. Pitfall: `return await` di try/catch

Di dalam `try`, `return await p` memastikan stack trace untuk rejection—di luar debatable; konsisten saja.

---

## 9. Pitfall: mengabaikan floating promise

Memanggil `async` tanpa `await`/`catch` → unhandled rejection.

---

## 10. Pola interview: timeout race

`Promise.race([fetch(...), delay(ms).then(()=>Promise.reject(new Error('timeout')))])`.

---

## 11. Pola interview: retry dengan backoff

Loop `try` dengan `await sleep(backoff)` — lihat topik retry.

---

## 12. Latihan konsep

Jelaskan mengapa `async` function mengembalikan promise meski tidak ada `await`.

---

## 13. Latihan kode

Tulis `allSettled` manual untuk array task async.

---

## 14. Edge cases

- `await` pada non-promise: dibungkus `Promise.resolve`.
- Uncaught exception di `async` executor: reject promise.

---

## 15. Checklist

- [ ] try/catch di sekitar await.
- [ ] Parallel vs sequential disengaja.
- [ ] Tidak forEach async tanpa all.

---

## 16. Referensi

MDN async function; TypeScript `Promise<T>`.

---

## 17. Anti-pattern

Nested `async` tanpa kebutuhan—flatten chain.

---

## 18. Flashcard

- **Sequential await:** total waktu ≈ jumlah.

---

## 19. Testing

`assert.rejects` untuk async test; di Vitest/Jest: `await expect(fn()).rejects.toThrow()`.

---

## 20. Integrasi TypeScript

`async function f(): Promise<User>` eksplisit.

---

## 21. Debugging

`debugger` di `catch`; async stack di Chrome.

---

## 22. Memori

Parallel banyak promise — batasi konkurensi (pool).

---

## 23. Parallel

Worker untuk CPU—beda dari async I/O.

---

## 24. Etika wawancara

Sebutkan `Promise.allSettled` jika beberapa gagal boleh.

---

## 25. Rangkuman

async/await membuat alur linear; tangani rejection dengan try/catch atau `.catch` di boundary.

---

## 26. Soal terkait

Supervisor pattern: batas N request paralel.

---

## 27. Drill manual

Tulis urutan await tiga call masing-masing 100ms — sequential 300ms, parallel 100ms.

---

## 28. Varian: top-level await

Modules — pastikan environment mendukung.

---

## 29. Varian: `using` / explicit resource management

Experimental—defer cleanup.

---

## 30. Penutup

Error handling async adalah bagian integral desain API, bukan tambahan.

---

Dokumen ini merangkum try/catch dengan await, paralelisasi, dan antipola forEach async.
