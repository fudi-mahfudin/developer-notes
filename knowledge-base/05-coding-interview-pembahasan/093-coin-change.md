# Coin Change

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Dynamic programming (unbounded knap BOTTOM min coins)
- **Inti masalah:** Koin `coins` tanpa batas banyaknya; jumlah tepat `amount`; **minimum** jumlah koin — atau `-1` jika tidak mungkin.

---

- Soal: `coinChange(coins, amount)` int.
- Input: positive coins distinct, target
- Constraints utama: `dp[x] = min over c of dp[x-c]+1` untuk `x>=c`; base `dp[0]=0`; initialize `dp` dengan `Infinity` atau `amount+1`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `dp` array panjang `amount+1` dengan `dp[0]=0`. For `x` dari 1..amount: `dp[x]=min_c(dp[x-c]+1)` jika `x>=c` dan `dp[x-c]` finite. Akhir `dp[amount]` jika masih finite else -1. **BFS** coin change level juga populer (shortest path on weighted ungraph each coin edge). O(amount * len(coins)).

Struktur cepat:
- Observasi inti masalah: Unbounded knapsack min coins = min convolution DP.
- Strategi final yang dipilih: Bottom-up DP array.
- Kenapa strategi ini paling cocok: Direct state is remaining sum.
- Time complexity: O(amount · C)
- Space complexity: O(amount)
- Edge case utama: amount 0 → 0 (sometimes); impossible → -1.

## 3) Versi Ultra Singkat (10-20 detik)

> DP sum: min coins to make x using recurrence on subtract each coin.

## 4) Pseudocode Ringkas (5-10 baris)

```text
dp[0] = 0; others = inf
for x from 1 to amount:
  for c in coins:
    if x >= c: dp[x] = min(dp[x], dp[x-c] + 1)
return dp[amount] if finite else -1
```

## 5) Implementasi Final (Inti Saja)

```js
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let x = 1; x <= amount; x++) {
    for (const c of coins) {
      if (x >= c && dp[x - c] !== Infinity) dp[x] = Math.min(dp[x], dp[x - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

## 6) Bukti Correctness (Wajib)

- Optimal substructure on remainder amount; considering all coin choices covers combinations.

## 7) Dry Run Singkat

- `coins=[1,2,5]`, `amount=11` → 3 (`5+5+1`).

## 8) Red Flags (Yang Harus Dihindari)

- Greedy largest coin first — fails general coin sets.

## 9) Follow-up yang Sering Muncul

- Coin change 2 — count combinations (order matters subtle variants).

## 10) Trade-off Keputusan

- Top-down memo recursion identical complexity.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Pseudo-polynomial in `amount` — mention constraints.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: DP unbounded knap min
- Inti masalah (1 kalimat): Min coins sum to amount.
- Soal: Int or -1.
- Strategi final: Bottom-up dp[x]
- Kompleksitas: O(amount · C), O(amount)
- 2 edge case: amount 0; impossible
- 1 potensi bug: inf + 1 overflow
- 1 alasan valid: optimal coin count for amount-x plus one coin
