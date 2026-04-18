# Topik 79 — Binary Search on Answer

**Binary search on answer** (juga “binary search the answer” atau “parametric search”) memakai **pencarian biner** bukan pada indeks array, tetapi pada **nilai jawaban** yang monoton terhadap suatu predikat. Jika `feasible(x)` bernilai true untuk `x ≥ jawaban` dan false di bawahnya (atau sebaliknya), kita bisa mencari batas dengan **O(log(range))** evaluasi `feasible`, masing-masing sering **O(n)** atau **O(n log n)**.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Contoh: “minimum kapasitas kapal untuk mengirim paket dalam `d` hari” — cek apakah kapasitas `m` cukup dengan greedy penjadwalan linear. Monoton: jika `m` cukup, `m'` lebih besar juga cukup. Biner `low..high` pada `m`. Pola sama untuk: meminimalkan pekerjaan maksimum, panjang kabel maksimum setelah pemotongan, koki dengan waktu, dll. Pastikan fungsi `feasible` benar dan **tidak overflow** pada tengah `(low+high)`.

---

## 2. Mengapa topik ini keluar di interview

- Menggabungkan binary search dengan greedy/validasi.
- Membedakan binary search pada array terurut vs pada domain jawaban.

---

## 3. Template umum

```javascript
function binSearchAnswer(low, high, feasible) {
  let ans = high;
  while (low <= high) {
    const mid = low + ((high - low) >> 1);
    if (feasible(mid)) {
      ans = mid;
      high = mid - 1; // minimize
    } else low = mid + 1;
  }
  return ans;
}
```

Sesuaikan `low/high` update untuk **maksimalkan** jawaban yang feasible.

---

## 4. Contoh: kapasitas minimum (paket, hari)

```javascript
function minShipCapacity(weights, days) {
  let lo = Math.max(...weights),
    hi = weights.reduce((a, b) => a + b, 0);
  const can = (cap) => {
    let need = 1,
      cur = 0;
    for (const w of weights) {
      if (cur + w > cap) {
        need++;
        cur = w;
      } else cur += w;
      if (need > days) return false;
    }
    return true;
  };
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (can(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
```

---

## 5. Kompleksitas

- **Iterasi:** O(log(upper - lower)) — sering log jumlah nilai jawaban.
- **feasible:** biasanya O(n) atau lebih.

---

## 6. Pitfall: overflow `mid`

Gunakan `lo + (hi - lo) / 2` atau `BigInt` untuk rentang besar.

---

## 7. Pitfall: monotonitas salah

Jika `feasible` tidak monoton, binary search tidak valid—verifikasi dengan counterexample kecil.

---

## 8. Pitfall: batas awal `lo`

Minimum jawaban sering `max(weights)`, bukan 0—sesuaikan soal.

---

## 9. Pola interview: split array largest sum

Isomorfik dengan kapasitas kapal.

---

## 10. Pola interview: koko eating bananas

Kecepatan makan per jam — feasible dengan ceil division.

---

## 11. Latihan konsep

Buktikan monotonitas untuk “minimum speed untuk sampai on time”.

---

## 12. Latihan kode

Tulis `feasible` untuk “d” subarray dengan jumlah ≤ `cap`.

---

## 13. Edge cases

- Satu elemen: jawaban trivial.
- `days === weights.length`: `lo = max(weights)`.

---

## 14. Checklist

- [ ] Bukti monoton.
- [ ] `feasible` linear atau sesuai.
- [ ] Hindari overflow pertengahan.

---

## 15. Referensi

Leetcode “capacity to ship packages”; competitive programming “binary search on answer”.

---

## 16. Anti-pattern

Greedy tanpa proof pada soal yang butuh DP—binary search tidak menyelamatkan predikat salah.

---

## 17. Flashcard

- **Monoton:** feasible(x) ⇒ feasible(x+δ) untuk δ positif.

---

## 18. Testing

Brute force untuk n kecil bandingkan hasil biner.

---

## 19. Performa

Log domain besar masih OK jika `feasible` murah.

---

## 20. Integrasi TypeScript

Tipe `feasible: (x: number) => boolean` dengan domain bigint opsional.

---

## 21. Debugging

Log `(lo, hi, mid, feasible(mid))` per iterasi.

---

## 22. Memori

O(1) tambahan di luar input.

---

## 23. Parallel

Evaluasi `feasible` bisa paralel—jarang diperlukan.

---

## 24. Etika wawancara

Konfirmasi integer vs real—untuk real gunakan epsilon atau berhenti setelah iterasi tetap.

---

## 25. Rangkuman

Cari jawaban optimal dengan menguji kelayakan di tengah domain yang terurut monoton.

---

## 26. Soal terkait

Aggressive cows (spoj)—klasik.

---

## 27. Drill manual

`weights=[1,2,3,4,5], days=3` — trace `can(mid)` untuk beberapa `mid`.

---

## 28. Varian: maksimalkan minimum jarak

Urutkan posisi; `feasible(d)` cek berapa banyak yang bisa dipilih dengan jarak ≥ d.

---

## 29. Varian: jawaban real

Binary search pada double dengan `1e-9` epsilon dan hati-hati presisi.

---

## 30. Penutup

Binary search on answer mengubah optimisasi menjadi serangkaian pertanyaan ya/tidak yang dapat diuji cepat.

---

Dokumen ini menjelaskan template, contoh kapasitas minimum, dan jebakan monotonitas pada binary search jawaban.
