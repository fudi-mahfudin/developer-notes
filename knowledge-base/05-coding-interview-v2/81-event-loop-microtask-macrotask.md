# Topik 81 — Event Loop: Microtask vs Macrotask

Di JavaScript (runtime seperti browser dan Node.js), **event loop** menjadwalkan eksekusi kode setelah call stack kosong. **Macrotask** (task) contohnya: `setTimeout`, `setInterval`, I/O callback. **Microtask** contohnya: `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver`. **Urutan:** setelah satu macrotask selesai, **semua microtask** di drain sampai habis, baru rendering (browser), lalu macrotask berikutnya.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Kode sinkron berjalan dulu. Lalu microtask mengalahkan macrotask berikutnya: jika Anda `then` berantai banyak, semua itu selesai sebelum `setTimeout(...,0)` berikutnya. `async` function men-suspend di `await` dengan menjadwalkan kelanjutan sebagai microtask. Memahami ini penting untuk urutan log, starvation macrotask jika microtask loop, dan perilaku `process.nextTick` di Node (lebih prioritas dari promise di beberapa versi—bedakan dengan dokumentasi runtime).

---

## 2. Mengapa topik ini keluar di interview

- Soal “urutkan output console.log” sangat umum.
- Debugging race condition dan infinite microtask.

---

## 3. Contoh urutan klasik

```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// A, D, C, B
```

---

## 4. async/await sebagai microtask

```javascript
async function f() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}
console.log("0");
f();
console.log("3");
// 0, 1, 3, 2
```

---

## 5. Kompleksitas konseptual

Bukan Big-O—ini model konkurensi.

---

## 6. Pitfall: `setTimeout(fn,0)` vs `queueMicrotask`

Microtask selalu sebelum timer 0 berikutnya.

---

## 7. Pitfall: loop microtask

`while(true) queueMicrotask(...)` bisa menahan macrotask dan rendering—**starvation**.

---

## 8. Pitfall: Node `nextTick`

`process.nextTick` dijalankan sebelum fase promise dalam satu iterasi—perilaku spesifik Node; jangan asumsikan sama di browser.

---

## 9. Pola interview: gabungan `async` + `setTimeout`

Susun urutan dengan nested awaits.

---

## 10. Pola interview: `Promise.resolve().then` berantai

Drain microtask queue sebelum task berikutnya.

---

## 11. Latihan konsep

Jelaskan mengapa `requestAnimationFrame` bukan microtask klasik (browser paint cycle).

---

## 12. Latihan kode

Prediksi output untuk 8 baris campuran `async`, `then`, `setImmediate` (Node).

---

## 13. Edge cases

- Error di microtask: ditangani oleh rejection handler berikutnya di microtask yang sama.

---

## 14. Checklist

- [ ] Urutan sinkron → micro → (render) → macro.
- [ ] Tahu `await` memecah eksekusi.
- [ ] Waspada Node vs browser.

---

## 15. Referensi

WHATWG HTML event loop; Node.js event loop phases.

---

## 16. Anti-pattern

Mengandalkan `setTimeout(0)` untuk “prioritas tinggi”—gunakan `queueMicrotask` jika memang perlu.

---

## 17. Flashcard

- **Microtask:** promise reactions.

---

## 18. Testing

Spy pada order dengan array push di callbacks.

---

## 19. Performa

Terlalu banyak microtask menunda interaksi—batch kerja.

---

## 20. Integrasi TypeScript

Tidak mengubah semantik event loop.

---

## 21. Debugging

`console.trace` di microtask vs macrotask.

---

## 22. Memori

Antrian task tidak dibatasi—hati-hati enqueue massal.

---

## 23. Parallel

Worker thread punya loop sendiri—beda konteks.

---

## 24. Etika wawancara

Sebutkan perbedaan environment (browser vs Node) jika relevan.

---

## 25. Rangkuman

Microtask mengisi antrian antara macrotask; `await` memicu kelanjutan sebagai microtask.

---

## 26. Soal terkait

`setImmediate` vs `setTimeout` di Node—urutan dalam fase poll/check.

---

## 27. Drill manual

Tulis urutan untuk: sync, two promises, one timeout.

---

## 28. Varian: `MessageChannel`

Beberapa polyfill microtask memakai channel—detail implementasi.

---

## 29. Varian: `requestIdleCallback`

Di luar critical path—bukan microtask.

---

## 30. Penutup

Memahami event loop menjawab “mengapa urutan log begini” dan menghindari bug scheduling halus.

---

Dokumen ini menjelaskan microtask vs macrotask, contoh urutan, dan perbedaan lingkungan Node/browser.
