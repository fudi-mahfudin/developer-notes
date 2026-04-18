# Topik 71 — Fibonacci: Memoization vs Tabulation

Deret Fibonacci `F(0)=0,F(1)=1,F(n)=F(n-1)+F(n-2)` mengilustrasikan **DP**. **Top-down memoization** menyimpan hasil subproblem di cache saat rekursi; **bottom-up tabulation** mengisi array dari basis ke n.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Tanpa memo, kompleksitas eksponensial. Dengan memo/tab O(n) waktu, O(n) ruang. Optimasi ruang O(1) dengan menyimpan hanya dua nilai terakhir. Modulo `1e9+7` sering diminta di kompetisi.

---

## 2. Mengapa topik ini keluar di interview

- Membedakan rekursi naif vs DP; stepping stone ke climbing stairs.

---

## 3. Memo top-down

```javascript
function fib(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  const v = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, v);
  return v;
}
```

---

## 4. Tab bottom-up

```javascript
function fibTab(n) {
  if (n <= 1) return n;
  let a = 0,
    b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```

---

## 5. Kompleksitas

O(n) time, O(1) space optimal.

---

## 6. Pitfall: overflow

Gunakan BigInt jika perlu.

---

## 7. Pitfall: modulo

Terapkan setelah penjumlahan di setiap langkah jika diminta.

---

## 8. Pola interview

Sebutkan overlapping subproblems + optimal substructure.

---

## 9. Latihan

Turunkan ke climbing stairs dengan langkah 1 atau 2.

---

## 10. Checklist

- [ ] Memo vs tab.
- [ ] Space optimization.
- [ ] Base cases.

---

## 11. Referensi

Introduction to DP classic.

---

## 12. Anti-pattern

Rekursi murni untuk n besar.

---

## 13. Flashcard

- **Memo:** cache on demand.

---

## 14. Latihan tulis

Fib matrix exponentiation O(log n)—advanced.

---

## 15. Testing

Bandingskan dengan iteratif untuk n kecil.

---

## 16. Penutup

Fibonacci adalah Hello World DP.

---

## 17. Tambahan: closed form

Binet—tidak integer tepat untuk besar.

---

## 18. Tambahan: fibonacci heap

Struktur berbeda—jangan tertukar nama.

---

## 19. Kompleksitas memori

O(1) rolling variables.

---

## 20. Rangkuman

Cache atau iterasi; hindari pohon rekursi eksponensial.

---

## 21. Soal terkait

Climbing stairs—sama recurrence.

---

## 22. Edge: n=0

Definisi sesuai soal.

---

## 23. Edge: negatif

Tidak valid untuk klasik.

---

## 24. Drill

Hitung fib(10) dengan tab.

---

## 25. Performa

Linear atau log dengan matrix pow.

---

## 26. Integrasi TypeScript

BigInt support.

---

## 27. Debugging

Tabel kecil untuk tabulation.

---

## 28. Memori

Map memo untuk sparse—tidak perlu fib.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Tanyakan constraint n dan modulo.

---

Dokumen ini membedakan memo dan tabulation pada contoh Fibonacci paling sederhana.
