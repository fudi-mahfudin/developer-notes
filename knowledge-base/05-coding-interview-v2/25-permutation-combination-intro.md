# Topik 25 — Permutasi dan Kombinasi (Pengantar untuk Backtracking)

**Permutasi** adalah penyusunan ulang elemen dengan urutan penting; **kombinasi** memilih subset tanpa mempedulikan urutan (biasanya “choose k from n”). Keduanya tumbuh eksponensial pada kasus buruk, sehingga wawancara fokus pada **pruning**, **representasi state**, dan **kompleksitas**.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Permutasi `n` elemen berbeda ada `n!` buah. Kombinasi `C(n,k) = n!/(k!(n-k)!)`. Di coding test, Anda jarang menghitung formula saja—lebih sering **menghasilkan** semua permutasi/kombinasi dengan **backtracking** atau **next permutation** untuk satu urutan lexikografis. Batasi `n` kecil (misalnya ≤10) agar brute force masuk akal; untuk lebih besar, butuh DP atau matematika khusus.

---

## 2. Mengapa topik ini keluar di interview

- Soal “generate parentheses”, “letter combinations”, “subsets” adalah entri ke backtracking.
- Menguji apakah kandidat menghitung kompleksitas secara kasar.

---

## 3. Notasi dan hubungan

- Permutasi: urutan penting.
- Kombinasi: urutan tidak penting—biasanya dihasilkan dengan memaksa urutan naik indeks untuk menghindari duplikasi.

---

## 4. Rekurens kombinasi matematika

`C(n,k) = C(n-1,k-1) + C(n-1,k)` identitas Pascal—berguna untuk DP counting.

---

## 5. Pseudocode backtracking permutasi (distinct)

```javascript
function permute(nums) {
  const res = [];
  const path = [];
  const used = new Array(nums.length).fill(false);
  function dfs() {
    if (path.length === nums.length) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  }
  dfs();
  return res;
}
```

---

## 6. Duplikat dalam input

Sort dulu + skip elemen sama di loop untuk menghindari permutasi ganda—pola wawancara penting.

---

## 7. Kombinasi dari `n` angka pilih `k`

```javascript
function combine(n, k) {
  const res = [];
  function dfs(start, path) {
    if (path.length === k) {
      res.push(path.slice());
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      dfs(i + 1, path);
      path.pop();
    }
  }
  dfs(1, []);
  return res;
}
```

---

## 8. Kompleksitas

Jumlah output permutasi `n!`; kombinasi `C(n,k)`—waktu proporsional jumlah solusi × panjang langkah.

---

## 9. Pitfall: memutasi array referensi bersama

Gunakan `path.slice()` saat push ke hasil.

---

## 10. Pitfall: stack overflow

`n` besar membuat rekursi dalam—iterative next permutation atau batasi `n`.

---

## 11. Next permutation lexicographic

Algoritma O(n) untuk permutasi berikutnya—berguna tanpa menghasilkan semua sekaligus.

---

## 12. Pola interview

Sebutkan “Saya sort untuk duplicate handling, lalu DFS dengan pruning.”

---

## 13. Latihan

Hitung berapa node rekursi untuk `permute` tanpa pruning pada `n=8`.

---

## 14. Checklist

- [ ] Bedakan permutasi vs kombinasi.
- [ ] Tahu penanganan duplikat.
- [ ] Tahu pertumbuhan faktorial.

---

## 15. Referensi

Combinatorics dasar; backtracking di CLRS/Skiena.

---

## 16. Variasi: multiset permutasi

Hitung frekuensi, kurangi saat pakai—serupa topik 68.

---

## 17. Variasi: k-permutation

Nomor ke-k dalam urutan lex—matematika + faktoradic.

---

## 18. Anti-pattern

Menyimpan semua permutasi untuk `n=12` di memori—meledak.

---

## 19. Flashcard

- **Permutation:** order matters.
- **Combination:** choose without order.

---

## 20. Latihan tulis

Implementasikan `combinations(nums, k)` dengan duplikat di `nums` tetapi output unik—sort + skip.

---

## 21. Integrasi JS

`Set` tidak cukup untuk multiset—pakai `Map` frekuensi.

---

## 22. Testing

Bandingkan ukuran output dengan formula `n!` atau `C(n,k)` untuk instance kecil.

---

## 23. Bitmask representasi

Untuk `n ≤ 20`, subset bisa sebagai bitmask—hubung ke topik 26.

---

## 24. Penutup

Pahami basis rekursi, loop pilihan, undo (backtrack), dan analisis pertumbuhan eksponensial.

---

## 25. Soal terkait

Generate Parentheses adalah kombinasi valid dengan constraint—latihan backtracking.

---

## 26. Optimasi pruning

Jika partial sum sudah melebihi target (soal tertentu), hentikan cabang.

---

## 27. Memori call stack

ES recursion limit—untuk `n` besar pertimbangkan iterative.

---

## 28. Kompleksitas waktu kasar

`O(b^d)` untuk branching factor `b`, kedalaman `d`—perkiraan untuk komunikasi.

---

## 29. Rangkuman

Permutasi/kombinasi adalah bahasa untuk banyak soal enumerasi—backtracking adalah alat utama.

---

## 30. Bacaan lanjutan

Knuth TAoCP volume 4A untuk enumeration—untuk yang sangat tertarik.

---

Dokumen ini menjadi jembatan dari kombinatorika murni ke implementasi backtracking di bab berikutnya.
