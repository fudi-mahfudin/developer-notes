# Topik 84 — Promise.all, allSettled, race, any

**`Promise.all(iterable)`** gagal cepat jika **satu** promise reject — hasilnya array hasil dalam urutan input. **`Promise.allSettled`** menunggu **semua**, mengembalikan `{status, value|reason}` per item — tidak pernah reject (kecuali iterable error). **`Promise.race`** menyelesaikan dengan yang **pertama** settle (fulfill atau reject). **`Promise.any`** menyelesaikan dengan **fulfill pertama**; jika semua reject, **AggregateError**.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Pilih API sesuai semantik:

- Butuh **semua sukses** atau gagal total → `all`.
- Butuh **laporan per item** tanpa throw awal → `allSettled`.
- **Timeout/pertama selesai** → `race` (waspada reject menang lebih dulu).
- **Fallback** beberapa sumber, ambil yang pertama OK → `any` (ES2021).

---

## 2. Mengapa topik ini keluar di interview

- Soal “ambil data dari beberapa endpoint, jangan gagal jika satu gagal”.
- Implementasi manual untuk memahami semantik.

---

## 3. Promise.all

```javascript
const results = await Promise.all([p1, p2, p3]);
```

Reject pertama mem-bubarkan keseluruhan (dengan alasan itu).

---

## 4. Promise.allSettled

```javascript
const out = await Promise.allSettled([p1, p2, p3]);
for (const r of out) {
  if (r.status === "fulfilled") console.log(r.value);
  else console.error(r.reason);
}
```

---

## 5. Promise.race

```javascript
const first = await Promise.race([
  fetch("/a"),
  new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 5000)),
]);
```

Jika timeout reject lebih dulu, race reject — gunakan pola yang memisahkan fulfilled-only jika perlu.

---

## 6. Promise.any

```javascript
try {
  const fastestOk = await Promise.any([fetch("/mirror1"), fetch("/mirror2")]);
} catch (e) {
  if (e instanceof AggregateError) console.log(e.errors);
}
```

---

## 7. Kompleksitas

O(n) promise dibuat; waktu wall-clock tergantung paralelisme.

---

## 8. Pitfall: all dengan satu reject

Seluruh `all` gagal — gunakan `allSettled` atau `catch` per item.

---

## 9. Pitfall: race untuk timeout

Reject timeout bisa menang — bungkus dengan `Promise` yang hanya resolve pada sukses atau gunakan `AbortController`.

---

## 10. Pitfall: urutan hasil all

Hasil **sejajar dengan input**, bukan urutan selesai.

---

## 11. Pola interview: map + all

```javascript
await Promise.all(ids.map((id) => fetchById(id)));
```

Pastikan `map` mengembalikan promise.

---

## 12. Pola interview: graceful degradation

`allSettled` lalu filter fulfilled.

---

## 13. Latihan konsep

Bandingkan `any` vs `race` ketika semua sumber bisa gagal.

---

## 14. Latihan kode

Implement `promiseAll` manual dengan counter.

---

## 15. Edge cases

- Input kosong: `Promise.all([])` resolves `[]`.
- `Promise.any([])` rejects.

---

## 16. Checklist

- [ ] Semantik fail-fast vs all results.
- [ ] AggregateError di `any`.
- [ ] Urutan output `all`.

---

## 17. Referensi

ECMAScript spec; MDN.

---

## 18. Anti-pattern

`race` untuk “ambil yang tercepat” tanpa menangani reject lebih dulu.

---

## 19. Flashcard

- **allSettled:** tidak reject gabungan.

---

## 19b. Polyfill

`allSettled` dapat di polyfill untuk lingkungan lama.

---

## 20. Testing

Stub promise dengan controlled resolve/reject order.

---

## 21. Performa

Parallel fetch mengurangi latency vs sequential.

---

## 22. Integrasi TypeScript

`Promise.all` infer tuple jika tuple tetap.

---

## 23. Debugging

Log `performance.now()` per settlement.

---

## 24. Memori

Menyimpan banyak promise besar — batasi konkurensi.

---

## 25. Parallel

Bukan thread paralel—I/O concurrent.

---

## 26. Etika wawancara

Tanyakan apakah partial success diterima.

---

## 27. Rangkuman

Pilih `all` vs `allSettled` vs `race` vs `any` berdasarkan kegagalan yang dapat diterima.

---

## 28. Soal terkait

Implement `withTimeout(p, ms)` memakai race.

---

## 29. Drill manual

Tiga promise: dua resolve 100ms, satu reject 50ms — apa hasil `all`, `allSettled`, `race`?

---

## 30. Penutup

Menguasai kombinator promise berarti menguasai orkestrasi async tanpa spaghetti.

---

Dokumen ini menjelaskan perbedaan Promise combinators dan kasus pemakaian di interview.
