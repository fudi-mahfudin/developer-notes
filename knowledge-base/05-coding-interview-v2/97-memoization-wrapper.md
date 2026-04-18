# Topik 97 — Memoization (Wrapper Fungsi)

**Memoization** menyimpan **hasil** pemanggilan fungsi murni berdasarkan **argumen** agar pemanggilan berikutnya dengan argumen sama mengembalikan cache. Di JavaScript, kunci sering **`Map`** atau **serialisasi argumen** (hati-hati objek referensi). Fungsi dengan **side effect** atau **waktu-dependent** tidak cocok tanpa invalidasi.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Wrapper `memoize(fn)` mengembalikan fungsi yang:

1. Membangun kunci dari `args` (misalnya `JSON.stringify` untuk primitif/array datar—**berbahaya** untuk fungsi/circular).
2. Jika kunci ada di `cache`, return nilai tersimpan.
3. Jika tidak, panggil `fn`, simpan, return.

Pertimbangkan **batas ukuran cache (LRU)** agar tidak membocorkan memori. **WeakMap** hanya untuk kunci objek referensi—cache hidup selama objek hidup.

---

## 2. Mengapa topik ini keluar di interview

- Soal “memoize dengan max cache size”.
- React `useMemo` konsep terkait (dependency array berbeda mekanisme).

---

## 3. Implementasi naif

```javascript
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const v = fn.apply(this, args);
    cache.set(key, v);
    return v;
  };
}
```

---

## 4. Kompleksitas

Hit: O(1) map average; miss: biaya `fn` + O(1) store.

---

## 5. Pitfall: JSON.stringify kunci

Urutan kunci objek, `undefined` hilang, `NaN` → null.

---

## 6. Pitfall: fungsi non-murni

Cache mengembalikan nilai basi.

---

## 7. Pitfall: argumen besar

Kunci string besar — mahal.

---

## 8. Pola interview: LRU memo

Gabungkan dengan struktur LRU (topik 94).

---

## 9. Pola interview: `once`

Memo khusus tanpa argumen—single invocation.

---

## 10. Latihan konsep

Kapan `WeakMap` lebih tepat dari `Map`?

---

## 11. Latihan kode

Resolver kunci custom `(a,b)=>`${a.id}:${b}`.

---

## 12. Edge cases

- `this` binding — gunakan `function` bukan arrow jika perlu.

---

## 13. Checklist

- [ ] Pure function assumption.
- [ ] Key strategy.
- [ ] Memory cap.

---

## 14. Referensi

lodash `memoize`; dynamic programming top-down.

---

## 15. Anti-pattern

Memoize fungsi I/O fetch tanpa TTL.

---

## 16. Flashcard

- **Top-down DP:** memo rekursi.

---

## 17. Testing

Assert hit count dengan spy.

---

## 18. Performa

Trade-off compute vs memory.

---

## 19. Integrasi TypeScript

Overload tuple args dengan generics.

---

## 20. Debugging

Expose `cache.size` untuk inspeksi dev-only.

---

## 21. Memori

Tanpa eviction — unbounded.

---

## 22. Parallel

Race pada miss pertama—bisa dedupe in-flight promise.

---

## 23. Etika wawancara

Tanyakan apakah dedupe async promise diperlukan.

---

## 24. Rangkuman

Memoization = trade-off waktu vs memori dengan asumsi murni dan kunci benar.

---

## 25. Soal terkait

Fibonacci memo (topik 71) — contoh klasik.

---

## 26. Drill manual

`memoize((a,b)=>a+b)` panggil (1,2) dua kali — berapa kali fn dieksekusi?

---

## 27. Varian: `memoize-one`

Hanya cache hasil terakhir — O(1) memori.

---

## 28. Penutup

Wrapper memo adalah pola fungsional kecil dengan implikasi besar pada kebenaran dan memori.

---

## 29. Dedupe promise (in-flight)

Untuk fungsi async yang mengembalikan `Promise`, dua pemanggilan cepat dengan argumen sama sebaiknya **berbagi satu promise** yang sama sampai selesai, agar tidak menggandakan request jaringan. Pola: simpan `Map<key, Promise>` sementara; setelah settle, hapus entri atau biarkan hasil di cache hasil.

---

## 30. Memoization vs mengingat di React

`useMemo` dan `useCallback` bergantung pada **dependency array** dan siklus render—bukan cache global berbasis argumen dinamis seperti `memoize` klasik. Jangan mencampur semantik keduanya tanpa rencana.

---

Dokumen ini menjelaskan memoize, kunci argumen, LRU, dan pemisahan dari React hooks.
