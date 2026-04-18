# Topik 75 — Knapsack 0/1 (Konsep)

Diberikan `n` item dengan berat `w[i]` dan nilai `v[i]`, dan kapasitas `W`, pilih subset item **paling banyak satu kali** untuk memaksimalkan nilai tanpa melebihi berat. Ini **NP-hard** umumnya, tetapi solusi pseudo-polynomial **DP** `O(nW)` memungkinkan untuk `W` tidak astronomi.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

`dp[i][c]` nilai maksimum menggunakan item awal `i` dengan kapasitas `c`. Transisi: `dp[i][c]=max(dp[i-1][c], dp[i-1][c-w[i]]+v[i])` jika `c>=w[i]`. Optimasi 1D dengan iterasi `c` **menurun** agar tidak menggunakan item dua kali. Ini **0/1 knapsack**; **unbounded** mengizinkan item berulang—loop `c` menaik.

---

## 2. Mengapa topik ini keluar di interview

- Partition equal subset sum adalah subset knapsack boolean.
- Membedakan 0/1 vs unbounded.

---

## 3. DP 2D outline

Double loop items × capacity.

---

## 4. Space optimization

```javascript
function knapsack01(weights, values, W) {
  const dp = new Array(W + 1).fill(0);
  for (let i = 0; i < weights.length; i++) {
    const w = weights[i],
      v = values[i];
    for (let c = W; c >= w; c--) dp[c] = Math.max(dp[c], dp[c - w] + v);
  }
  return dp[W];
}
```

---

## 5. Kompleksitas

O(nW) time, O(W) space optimized.

---

## 6. Pitfall: loop direction 0/1

Harus descending pada 1D.

---

## 7. Pitfall: unbounded salah arah

Unbounded naik `c`.

---

## 8. Pola interview

Jelaskan mengapa descending mencegah reuse.

---

## 9. Latihan

Subset sum dengan nilai boolean `dp[c]`.

---

## 10. Checklist

- [ ] 0/1 vs unbounded.
- [ ] Descending loop.
- [ ] Pseudo-polynomial caveat.

---

## 11. Referensi

CLRS DP knapsack.

---

## 12. Anti-pattern

Greedy by value/weight ratio tidak optimal untuk 0/1.

---

## 13. Flashcard

- **01:** item sekali.

---

## 14. Latihan tulis

Rekonstruksi item yang dipilih dengan parent pointer.

---

## 15. Testing

Random kecil brute subset enumeration.

---

## 16. Penutup

Knapsack menguji pemahaman DP dan arah iterasi.

---

## 17. Tambahan: meet-in-the-middle

Untuk n ~40—bagi dua subset.

---

## 18. Tambahan: branch and bound

Untuk kontinu—beda.

---

## 19. Kompleksitas pseudo-polynomial

Bergantung nilai W, bukan log input.

---

## 20. Rangkuman

Max value dengan baris DP menurun untuk 0/1.

---

## 21. Soal terkait

Target sum dengan +/- assignment—transform knapsack.

---

## 22. Edge: W=0

Hanya nilai 0.

---

## 23. Edge: item lebih berat dari W

Skip.

---

## 24. Drill

Trace 3 item kecil manual.

---

## 25. Performa

Bisa lambat jika W besar.

---

## 26. Integrasi TypeScript

Typed dp array.

---

## 27. Debugging

Print dp baris.

---

## 28. Memori

Bitset optimasi untuk boolean knapsack—advanced.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Tanyakan constraint W untuk memilih DP vs alternatif.

---

Dokumen ini menjelaskan knapsack 0/1 secara konsep dengan optimasi satu dimensi.
