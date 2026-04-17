# Topik 86 — Retry dengan Backoff

**Retry** memanggil ulang operasi yang gagal (jaringan, 503, timeout). **Backoff** menambah jeda antar percobaan untuk mengurangi beban server dan menghindari **thundering herd**. Pola umum: **exponential backoff** dengan **jitter**, batas **maksimum percobaan**, dan klasifikasi error **boleh diulang** vs **tidak** (4xx client error sering tidak).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Implementasi: loop atau rekursi dengan `await sleep(delay)`; setelah gagal, `delay = min(maxDelay, delay * factor)`; tambahkan **jitter** acak dalam rentang untuk menghindari sinkronisasi klien. Hentikan jika `attempts >= max` atau error non-retryable. Untuk HTTP, **429**/`Retry-After` header bisa mengarahkan jeda. **Idempotensi** penting jika retry mengirim ulang POST—gunakan idempotency key.

---

## 2. Mengapa topik ini keluar di interview

- Soal “fetch dengan retry” atau “wrapper retry untuk promise”.
- Diskusi produksi: observability, circuit breaker.

---

## 3. Exponential backoff + jitter

```javascript
async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function retry(fn, {
  retries = 3,
  base = 200,
  maxDelay = 5000,
  factor = 2,
} = {}) {
  let attempt = 0,
    delay = base;
  while (true) {
    try {
      return await fn();
    } catch (e) {
      if (attempt++ >= retries) throw e;
      const jitter = Math.random() * delay * 0.2;
      await sleep(Math.min(maxDelay, delay + jitter));
      delay *= factor;
    }
  }
}
```

---

## 4. Kompleksitas

O(attempts) percobaan; waktu wall-clock tumbuh eksponensial.

---

## 5. Pitfall: retry pada 4xx salah

Jangan loop tanpa batas pada `400 Bad Request`.

---

## 6. Pitfall: non-idempotent POST

Ganda pembayaran—perlu deduplication key.

---

## 7. Pitfall: backoff tanpa jitter

Semua klien bangkit bersamaan setelah outage—memperparah beban.

---

## 8. Pola interview: `fetch` dengan status check

Retry hanya jika `status >= 500` atau network error.

---

## 9. Pola interview: `AbortController` + retry

Abort attempt lama saat timeout per attempt.

---

## 10. Latihan konsep

Definisikan fungsi `isRetryable(err)` untuk `TypeError` network vs `DOMException` abort.

---

## 11. Latihan kode

Tambahkan **full jitter**: `delay = random between base and prev*factor`.

---

## 12. Edge cases

- `retries=0`: satu percobaan.
- Fungsi sukses segera return tanpa delay tambahan.

---

## 13. Checklist

- [ ] Max attempts.
- [ ] Klasifikasi error.
- [ ] Idempotensi untuk mutasi.

---

## 14. Referensi

AWS SDK retry; Google SRE books on backoff.

---

## 15. Anti-pattern

Retry tanpa batas pada loop while true.

---

## 16. Flashcard

- **Jitter:** randomisasi delay.

---

## 17. Testing

Mock fetch gagal N kali lalu sukses; ukur jumlah panggilan.

---

## 18. Performa

Kurangi beban server saat pemulihan.

---

## 19. Integrasi TypeScript

Generic `retry<T>(fn: () => Promise<T>): Promise<T>`.

---

## 20. Debugging

Log `attempt`, `delay`, `error.name`.

---

## 21. Memori

State ringan—hanya counter dan timer.

---

## 22. Parallel

Retry independen per request—waspada stampede.

---

## 23. Etika wawancara

Sebutkan **circuit breaker** jika layanan terus down.

---

## 24. Rangkuman

Backoff + batas + klasifikasi error + idempotensi = retry aman produksi.

---

## 25. Soal terkait

Polly.js / undici retry—bandingkan fitur.

---

## 26. Drill manual

Base 100ms, factor 2, 3 retry — total max delay teoritis (tanpa cap).

---

## 27. Varian: linear backoff

Lebih sederhana; kurang agresif menurunkan beban.

---

## 28. Varian: gRPC retry policy

Konfigurasi declarative—konsep sama.

---

## 29. Penutup

Retry adalah fitur keandalan; tanpa disiplin, ia menjadi beban atau bug finansial.

---

Dokumen ini menjelaskan exponential backoff, jitter, idempotensi, dan klasifikasi error untuk retry.
