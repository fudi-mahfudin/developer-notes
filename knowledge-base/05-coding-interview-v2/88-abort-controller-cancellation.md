# Topik 88 — AbortController dan Pembatalan

**`AbortController`** menyediakan **`signal`** (`AbortSignal`) yang dapat diteruskan ke API seperti **`fetch`** untuk **membatalkan** permintaan jaringan. Memanggil **`controller.abort(reason)`** menandai sinyal aborted; operasi yang mendukung akan reject dengan **`DOMException` `AbortError`** (di banyak lingkungan). Pola ini menggantikan pola lama `cancel token` ad-hoc.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Buat `const ac = new AbortController()`; pass `ac.signal` ke `fetch(url, { signal })`. Saat user navigasi pergi, timeout, atau debounce input baru, panggil `ac.abort()`. **`signal.aborted`** dan event `abort` tersedia untuk cleanup. **`AbortSignal.timeout(ms)`** (modern) membuat sinyal yang abort otomatis. **Composable:** `AbortSignal.any([s1,s2])` menggabungkan beberapa sinyal (fitur baru—cek dukungan runtime).

---

## 2. Mengapa topik ini keluar di interview

- Soal “cancel fetch saat user mengetik huruf baru”.
- Memahami perbedaan abort vs ignore hasil.

---

## 3. Contoh fetch + abort

```javascript
const ac = new AbortController();
const p = fetch("/data", { signal: ac.signal });
// user action:
ac.abort();
```

---

## 4. Timeout dengan AbortSignal.timeout

```javascript
const res = await fetch("/data", { signal: AbortSignal.timeout(5000) });
```

---

## 5. Kompleksitas

Membatalkan mengurangi pekerjaan jaringan—hemat sumber daya.

---

## 6. Pitfall: membaca body setelah abort

Pastikan `catch` menangani abort tanpa log error berisik jika disengaja.

---

## 7. Pitfall: abort bukan “undo” server

Server mungkin tetap memproses—abort hanya klien.

---

## 8. Pitfall: reuse controller

Satu controller sekali pakai untuk batch—buat baru per request.

---

## 9. Pola interview: race debounce

Controller baru per ketikan; abort sebelumnya.

---

## 10. Pola interview: React `useEffect` cleanup

```javascript
useEffect(() => {
  const ac = new AbortController();
  fetchData({ signal: ac.signal });
  return () => ac.abort();
}, [deps]);
```

---

## 11. Latihan konsep

Jelaskan mengapa `finally` tetap jalan setelah abort catch.

---

## 12. Latihan kode

Wrapper `fetchWithRetry` yang menghormati abort parent.

---

## 13. Edge cases

- Abort sebelum fetch dimulai: promise reject segera.
- `reason` di `abort(reason)` dapat dibaca di beberapa API.

---

## 14. Checklist

- [ ] Signal diteruskan ke fetch.
- [ ] Cleanup di effect/component unmount.
- [ ] UX: tidak tampilkan error untuk abort disengaja.

---

## 15. Referensi

MDN AbortController; Fetch standard.

---

## 16. Anti-pattern

Flag boolean `cancelled` manual tanpa membatalkan I/O—buang bandwidth.

---

## 17. Flashcard

- **AbortSignal:** token pembatalan.

---

## 18. Testing

`new AbortController()` lalu abort sebelum resolve; assert rejection name.

---

## 19. Performa

Membatalkan unduhan besar menghemat data.

---

## 20. Integrasi TypeScript

`RequestInit` sudah punya `signal?: AbortSignal`.

---

## 21. Debugging

Network tab menunjukkan status cancelled.

---

## 22. Memori

Controller kecil—tidak perlu khawatir leak jika tidak retain closure besar.

---

## 23. Parallel

Banyak request paralel masing-masing signal sendiri.

---

## 24. Etika wawancara

Sebutkan kompatibilitas `AbortSignal.any` vs manual merge.

---

## 25. Rangkuman

AbortController adalah cara standar membatalkan async I/O di web modern.

---

## 26. Soal terkait

Node `fetch` dan undici mendukung signal—konsisten.

---

## 27. Drill manual

Dua fetch paralel — abort satu, yang lain tetap.

---

## 28. Varian: WritableStream abort

Stream API juga mendukung signal di beberapa operasi.

---

## 29. Penutup

Tanpa pembatalan, aplikasi reactive akan memboroskan jaringan dan menampilkan data basi.

---

## 30. Catatan Node.js

Di Node 18+, `fetch` global mendukung `AbortSignal` seperti di browser. Untuk klien HTTP lain (misalnya versi lama `http.request`), pola pembatalan bisa berbeda; selalu baca dokumentasi modul yang dipakai.

---

Dokumen ini menjelaskan AbortController, integrasi fetch, timeout, dan pola React cleanup.
