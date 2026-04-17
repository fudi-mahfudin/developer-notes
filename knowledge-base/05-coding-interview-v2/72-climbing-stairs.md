# Topik 72 — Climbing Stairs

Anda bisa naik **1** atau **2** anak tangga setiap langkah. Berapa cara mencapai puncak `n`? Ini Fibonacci bergeser: `ways(n)=ways(n-1)+ways(n-2)` dengan basis `ways(0)=1,ways(1)=1` (atau serupa).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Interpretasi: langkah terakhir dari `n-1` atau `n-2`. DP O(n) waktu, O(1) ruang dengan rolling variables. Variasi: langkah `[1..k]` → `ways(n)=sum(ways(n-j))` untuk j dalam langkah valid—gunakan array panjang k sliding window.

---

## 2. Mengapa topik ini keluar di interview

- DP paling sederhana setelah fibonacci.

---

## 3. Implementasi O(1) space

```javascript
function climbStairs(n) {
  let a = 1,
    b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```

---

## 4. Kompleksitas

O(n) time, O(1) space.

---

## 5. Pitfall: basis off-by-one

Definisikan `ways(0)` dengan hati-hati.

---

## 6. Pitfall: modulo

Terapkan jika diminta.

---

## 7. Variasi: cost per step

Tambahkan weight—beda DP.

---

## 8. Pola interview

Relasi ke fibonacci secara eksplisit.

---

## 9. Latihan

Tiga langkah {1,3,5} ke n.

---

## 10. Checklist

- [ ] Rekurens benar.
- [ ] Basis cases.
- [ ] Optimasi ruang.

---

## 11. Referensi

Counting compositions—kombinatorika.

---

## 12. Anti-pattern

Rekursi eksponensial.

---

## 13. Flashcard

- **Last step:** 1 or 2.

---

## 14. Latihan tulis

Matrix exponentiation untuk linear recurrence.

---

## 15. Testing

Bandingkan dengan brute rekursi kecil n.

---

## 16. Penutup

Climbing stairs adalah latihan translasi masalah ke DP linear.

---

## 17. Tambahan: forbidden step

Dynamic transitions berubah—perlu state lebih.

---

## 18. Tambahan: prime steps only

Filter j dalam loop.

---

## 19. Kompleksitas memori

O(k) jika k steps window.

---

## 20. Rangkuman

Fibonacci-like counting dengan basis yang tepat.

---

## 21. Soal terkait

Decode ways string digit—mirip DP.

---

## 22. Edge: n=1

Satu cara.

---

## 23. Edge: n=0

Satu cara (tidak bergerak)—definisi.

---

## 24. Drill

Hitung untuk n=5 manual.

---

## 25. Performa

Linear.

---

## 26. Integrasi TypeScript

Return bigint jika besar.

---

## 27. Debugging

Tabel kecil `dp[i]`.

---

## 28. Memori

Rolling cukup untuk 2-term recurrence.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Konfirmasi apakah urutan langkah dianggap berbeda (biasanya ya).

---

## 31. Perumuman ke-k langkah

Jika boleh memilih langkah dari himpunan `S = {s1, s2, …, sk}` (semua positif), maka `ways(n) = sum_{s in S} ways(n - s)` dengan basis `ways(0)=1` dan `ways(x)=0` untuk `x<0` (atau definisi setara yang konsisten). Kompleksitas naik menjadi **O(n · |S|)** waktu dan **O(n)** ruang untuk array `dp`, atau **O(k)** ruang jika Anda hanya perlu window terakhir (untuk Fibonacci murni `k=2`).

---

## 32. Modulo dan bilangan besar

Untuk `n` besar, hasil sering diminta modulo `M`. Terapkan `(a + b) % M` setelah setiap penjumlahan. Di JavaScript, `Number` aman sampai sekitar `2^53`; untuk nilai di luar itu gunakan `BigInt` atau tetap dalam modulo sepanjang perhitungan.

---

Dokumen ini mengaitkan climbing stairs dengan pola Fibonacci dan perumuman langkah.
