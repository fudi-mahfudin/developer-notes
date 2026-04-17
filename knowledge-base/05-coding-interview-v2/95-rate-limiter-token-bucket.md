# Topik 95 — Rate Limiter: Token Bucket (Konsep)

**Token bucket** mengisi “token” dengan laju tetap hingga kapasitas maksimum. Setiap permintaan mengonsumsi satu token; jika kosong, permintaan **ditunda** atau **ditolak**. Ini memodelkan **burst** singkat yang diizinkan sambil menjaga **rata-rata** laju. Di interview front-end, sering diminta **client-side throttle**; di sistem, limiter melindungi API.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

State: `tokens` (float), `last` timestamp. Setiap `allow()` atau `take()`:

1. Tambahkan token proporsional waktu berlalu: `tokens = min(capacity, tokens + rate * dt)`.
2. Jika `tokens >= 1`, kurangi 1 dan izinkan; jika tidak, tolak atau tunggu `sleep` sampai cukup.

**Leaky bucket** adalah varian lain (aliran keluar konstan)—beda bentuk burst. **Fixed window** lebih sederhana tetapi border effect buruk.

---

## 2. Mengapa topik ini keluar di interview

- Soal “rate limit 10 req/s” untuk `fetch`.
- Membedakan token bucket vs sliding window counter.

---

## 3. Sketsa token bucket

```javascript
class TokenBucket {
  constructor(capacity, refillPerSec) {
    this.cap = capacity;
    this.rate = refillPerSec;
    this.tokens = capacity;
    this.last = Date.now() / 1000;
  }
  allow() {
    const now = Date.now() / 1000;
    this.tokens = Math.min(this.cap, this.tokens + (now - this.last) * this.rate);
    this.last = now;
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }
}
```

---

## 4. Kompleksitas

O(1) per permintaan pada implementasi di atas.

---

## 5. Pitfall: jam mundur

Gunakan monotonic clock jika tersedia (`performance.now` relatif, bukan wall clock absolut untuk durasi).

---

## 6. Pitfall: distributed limiter

Instance banyak perlu Redis + atomic INCR atau Lua script—bukan struktur lokal murni.

---

## 7. Pitfall: menunggu vs drop

Kebijakan produksi: 429 dengan `Retry-After`.

---

## 8. Pola interview: queue requests

Tarik dari antrian selama token ada—backpressure.

---

## 9. Pola interview: combine dengan retry

Backoff ketika server mengembalikan 429.

---

## 10. Latihan konsep

Bandingkan burst token bucket vs fixed window 10 req/detik.

---

## 11. Latihan kode

Implement `async acquire()` yang `await` sampai token tersedia.

---

## 12. Edge cases

- `capacity=0` — tidak pernah allow (definisikan).
- Refill sangat besar `rate` — clamp ke cap.

---

## 13. Checklist

- [ ] Refill berdasarkan delta waktu.
- [ ] Clamp token.
- [ ] Kebijakan saat kosong.

---

## 14. Referensi

NGINX limit_req; Stripe rate limits docs.

---

## 15. Anti-pattern

`setInterval` tambah token tanpa drift correction—akumulasi error.

---

## 16. Flashcard

- **Burst:** izin lonjakan singkat.

---

## 17. Testing

Simulasi waktu dengan fake timers; assert allow/deny sequence.

---

## 18. Performa

Sangat murah per request—cocok hot path.

---

## 19. Integrasi TypeScript

Interface `RateLimiter { tryAcquire(): boolean }`.

---

## 20. Debugging

Log `tokens` setelah refill untuk trace.

---

## 21. Memori

O(1) state per bucket.

---

## 22. Parallel

Distributed limiter butuh sinkronisasi.

---

## 23. Etika wawancara

Tanyakan apakah blocking await atau reject langsung.

---

## 24. Rangkuman

Token bucket mengatur rata-rata dengan toleransi burst melalui isi ulang kontinu.

---

## 25. Soal terkait

Semaphore untuk concurrency—mirip tetapi beda semantik (slot vs token rate).

---

## 26. Drill manual

Cap 2, rate 1/s, burst awal penuh — berapa allow dalam 2 detik pertama?

---

## 27. Varian: sliding log

Akurat tetapi memori lebih besar—window log timestamps.

---

## 28. Penutup

Rate limiting adalah jembatan antara UX responsif dan perlindungan sumber daya.

---

Dokumen ini menjelaskan token bucket, refill, burst, dan perbedaan dengan window tetap.
