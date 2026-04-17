# Topik 44 — Monotonic Stack (Next Greater Element)

**Monotonic stack** menjaga elemen dalam urutan naik atau turun ketat; dipakai untuk menemukan **next greater/smaller** dalam O(n) untuk semua elemen—setiap elemen masuk/keluar stack paling sekali.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Untuk next greater ke kanan: iterasi dari kanan ke kiri atau kiri ke kanan tergandung variasi; pola umum memindai kiri ke kanan, while stack top < current, pop dan set answer untuk index popped. Stack menyimpan indeks elemen yang menunggu “pasangan” lebih besar. Hasil untuk elemen tanpa pasangan `-1` atau `0` sesuai soal.

---

## 2. Mengapa topik ini keluar di interview

- Daily temperatures, largest rectangle in histogram (variasi monotonic).
- Menguji invariant stack.

---

## 3. Next Greater Element (klasik)

```javascript
function nextGreater(nums) {
  const n = nums.length;
  const ans = new Array(n).fill(-1);
  const st = [];
  for (let i = 0; i < n; i++) {
    while (st.length && nums[st[st.length - 1]] < nums[i]) {
      const j = st.pop();
      ans[j] = nums[i];
    }
    st.push(i);
  }
  return ans;
}
```

---

## 4. Kompleksitas

O(n) amortized—setiap indeks push/pop sekali.

---

## 5. Pitfall: circular array

Ulangi array 2x atau mod index—soal varian.

---

## 6. Pitfall: duplicate values

Gunakan strict inequality sesuai soal `<` vs `<=`.

---

## 7. Variasi: next smaller

Ubah komparasi.

---

## 8. Pola interview

Sebutkan “while stack not empty and condition, pop and assign answer”.

---

## 9. Latihan

Trace `[1,3,2,4]` manual.

---

## 10. Checklist

- [ ] Indeks vs nilai di stack.
- [ ] Tahu amortized linear.
- [ ] Tahu variasi circular.

---

## 11. Referensi

Monotonic stack technique di competitive programming.

---

## 12. Anti-pattern

O(n²) nested loop untuk setiap next greater.

---

## 13. Flashcard

- **Monotonic:** menjaga order.

---

## 14. Latihan tulis

Histogram largest rectangle—gunakan stack menyimpan indeks bar tinggi naik.

---

## 15. Testing

Random array, brute verify next greater.

---

## 16. Penutup

Monotonic stack mengubah banyak soal “tetangga” menjadi linear.

---

## 17. Tambahan: deque

Untuk sliding window max—topik 47.

---

## 18. Tambahan: pair dengan counts

Untuk beberapa soal kombinatorik.

---

## 19. Kompleksitas memori

O(n) stack worst-case.

---

## 20. Rangkuman

Pop saat menemukan elemen yang “menyelesaikan” pending indices.

---

## 21. Soal terkait

Car fleet—monotonic dari belakang.

---

## 22. Edge: array naik

Semua -1 kecuali yang terbesar? tergantung definisi.

---

## 23. Edge: satu elemen

Tidak ada greater → -1.

---

## 24. Drill

Implementasikan next greater untuk `TypedArray`.

---

## 25. Performa

Linear sangat cepat.

---

## 26. Integrasi TypeScript

Stack `number[]` indeks.

---

## 27. Debugging

Cetak stack isi indeks setiap i.

---

## 28. 2D grid

Monotonic stack per baris/kolom pada histogram 2D—advanced.

---

## 29. Parallel

Tidak umum.

---

## 30. Etika wawancara

Konfirmasi arah (kiri/kanan) dan circular atau tidak.

---

Dokumen ini memperkenalkan monotonic stack sebagai upgrade dari stack biasa untuk pola “nearest greater”.
