# Topik 85 — Throttle dan Debounce

**Debounce** menunda eksekusi fungsi hingga setelah **jeda** sejak pemanggilan terakhir—cocok untuk input pencarian. **Throttle** membatasi eksekusi paling banyak **sekali per periode**—cocok untuk scroll/resize. Keduanya mengurangi kerja berlebihan pada **high-frequency events**.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Debounce: timer reset setiap event; hanya setelah diam `wait` ms, jalankan. Throttle leading vs trailing: jalankan di awal interval, di akhir, atau keduanya. Di browser gunakan `requestAnimationFrame` untuk pola frame-sync. Implementasi perlu **`this`** binding dan kadang **args terakhir**. **Cancel**/`flush` untuk debounce advanced (Lodash).

---

## 2. Mengapa topik ini keluar di interview

- Soal “implement debounce” sangat umum.
- Membedakan perilaku UX search vs scroll handler.

---

## 3. Debounce leading edge (sketsa)

```javascript
function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
```

---

## 4. Throttle trailing

```javascript
function throttle(fn, wait) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

---

## 5. Kompleksitas

Per event O(1) amortized—bukan Big-O klasik pada n event.

---

## 6. Pitfall: `this` hilang

Gunakan `function` bukan arrow untuk wrapper jika perlu `this` dari pemanggil.

---

## 7. Pitfall: debounce pada submit form

Bisa menunda terlalu lama—pertimbangkan leading atau `maxWait`.

---

## 8. Pitfall: throttle tanpa trailing

Event terakhir dalam interval bisa terlewat—tambahkan trailing call (Lodash `throttle` options).

---

## 9. Pola interview: React `useMemo` + debounce

Hook custom `useDebouncedCallback` dengan `useRef` timer.

---

## 10. Pola interview: resize observer

Throttle untuk layout read.

---

## 11. Latihan konsep

Jelaskan mengapa scroll memakai throttle, bukan debounce.

---

## 12. Latihan kode

Implement `debounce` dengan `maxWait` (deadline).

---

## 13. Edge cases

- Burst event: debounce hanya satu eksekusi di akhir.
- `wait=0` — gunakan `setTimeout(0)` atau `queueMicrotask`—beda semantik.

---

## 14. Checklist

- [ ] Beda debounce vs throttle.
- [ ] Leading/trailing.
- [ ] Cleanup timer on unmount.

---

## 15. Referensi

Lodash debounce/throttle; MDN event patterns.

---

## 16. Anti-pattern

Debounce pada animasi 60fps—gunakan rAF.

---

## 17. Flashcard

- **Debounce:** tunggu diam.

---

## 18. Testing

Fake timers `vi.useFakeTimers()` lalu advance.

---

## 19. Performa

Kurangi network call autocomplete.

---

## 20. Integrasi TypeScript

`function debounce<T extends (...a: any[]) => void>(fn: T, wait: number): T`.

---

## 21. Debugging

Log timestamp setiap fire.

---

## 22. Memori

Closure menyimpan timer id—bersihkan saat destroy.

---

## 23. Parallel

Tidak relevan.

---

## 24. Etika wawancara

Tanyakan apakah leading invoke diperlukan.

---

## 25. Rangkuman

Debounce = after pause; throttle = at most once per window.

---

## 26. Soal terkait

Rate limiter server-side—konsep berbeda (token bucket).

---

## 27. Drill manual

Event pada t=0,50,120 dengan wait=100 debounce — kapan fn jalan?

---

## 28. Varian: `requestIdleCallback`

Defer non-critical work.

---

## 29. Varian: `AbortController` + debounce fetch

Cancel request lama saat ketik baru.

---

## 30. Penutup

Throttle dan debounce adalah kontrol aliran event front-end yang wajib dikuasai.

---

Dokumen ini membandingkan debounce dan throttle dengan sketsa implementasi dan konteks interview.
