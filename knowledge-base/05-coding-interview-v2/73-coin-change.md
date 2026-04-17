# Topik 73 — Coin Change (Min Coins / Ways)

Diberikan koin denominasi tak terbatas, temukan **jumlah minimum koin** untuk jumlah `amount` (atau hitung **banyak cara** tergantung soal). Ini DP klasik: `dp[x]` minimum coins untuk `x`.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Inisialisasi `dp[0]=0`, lain `Infinity`. Untuk setiap `x` dari 1..amount, `dp[x]=min(dp[x-c]+1)` untuk koin `c` valid. Untuk counting ways (urutan dianggap berbeda atau tidak—perhatikan!), rumus berbeda: unbounded knapsack vs kombinasi. Kompleksitas O(amount×coins).

---

## 2. Mengapa topik ini keluar di interview

- Mendemonstrasikan unbounded knapsack style DP.

---

## 3. Min coins

```javascript
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let x = 1; x <= amount; x++) {
    for (const c of coins) {
      if (x >= c) dp[x] = Math.min(dp[x], dp[x - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

---

## 4. Ways (combinations order tidak penting)

Loop koin luar, amount dalam—hindari permutasi ganda.

---

## 5. Kompleksitas

O(amount×nCoins) waktu, O(amount) ruang.

---

## 6. Pitfall: urutan loop untuk counting

Perbedaan kombinasi vs permutasi.

---

## 7. Pitfall: tidak mungkin

Return -1 jika `Infinity`.

---

## 8. Pola interview

Jelaskan `dp` sebagai min coins untuk setiap jumlah.

---

## 9. Latihan

Bandingskan dua versi counting ways.

---

## 10. Checklist

- [ ] Inisialisasi Infinity.
- [ ] Loop order untuk ways.
- [ ] Tahu kompleksitas pseudo-polynomial.

---

## 11. Referensi

Unbounded knapsack; Bresenham tidak relevan.

---

## 12. Anti-pattern

Greedy tidak selalu optimal untuk semua set koin.

---

## 13. Flashcard

- **Unbounded:** reuse coin.

---

## 14. Latihan tulis

Rekonstruksi daftar koin untuk solusi optimal.

---

## 15. Testing

Koin canonical US vs non-canonical counterexample.

---

## 16. Penutup

Coin change menguji DP dan pemahaman greedy vs optimal.

---

## 17. Tambahan: BFS pada graph amount

Node 0..amount—alternatif shortest path unweighted.

---

## 18. Tambahan: huge amount

Tidak feasible DP—perlu matematika lain.

---

## 19. Kompleksitas pseudo-polynomial

Tergantung nilai numerik amount, bukan ukuran input bit.

---

## 20. Rangkuman

Min coins: inner loop coins; kombinasi ways: perhatikan urutan loop.

---

## 21. Soal terkait

Perfect squares min count—koin sqrt?

---

## 22. Edge: amount 0

0 koin.

---

## 23. Edge: tidak ada koin pass

-1.

---

## 24. Drill

Manual untuk amount 7 koin [1,3,4].

---

## 25. Performa

Bisa besar jika amount besar.

---

## 26. Integrasi TypeScript

TypedArray untuk dp.

---

## 27. Debugging

Cetak dp kecil.

---

## 28. Memori

Rolling 1D cukup.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Tanyakan apakah permutasi dihitung berbeda untuk ways.

---

Dokumen ini memisahkan varian min coins dan counting ways pada coin change.
