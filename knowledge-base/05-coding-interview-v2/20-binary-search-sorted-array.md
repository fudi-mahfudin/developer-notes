# Topik 20 — Binary Search pada Array Terurut

Binary search menemukan posisi elemen target (atau titik sisip) dalam array **terurut** dengan membagi rentang menjadi dua setiap langkah, mencapai **O(log n)** waktu dan **O(1)** ruang untuk versi iteratif.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Invariant klasik: `lo` dan `hi` membatasi indeks di mana jawaban bisa berada. Setiap iterasi, bandingkan elemen tengah dengan target; buang setengah rentang yang mustahil. Variasi termasuk **lower bound** (indeks pertama `>= x`), **upper bound**, dan pencarian pada jawaban monoton meskipun fungsi bukan array (topik 79). Di JavaScript, perhatikan **integer mid** dengan `Math.floor((lo+hi)/2)` atau `lo + ((hi-lo)>>1)` untuk mengurangi risiko overflow (kurang relevan di JS number tapi bagus untuk pola umum).

---

## 2. Mengapa topik ini keluar di interview

- Hampir semua developer “tahu” binary search, tetapi banyak yang salah implementasi off-by-one.
- Soal rotated sorted array, peak element, first/last position—semua varian BS.

---

## 3. Template klasik: index atau -1

```javascript
function binarySearch(nums, target) {
  let lo = 0,
    hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const v = nums[mid];
    if (v === target) return mid;
    if (v < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```

Invariant: target (jika ada) selalu di `[lo, hi]`.

---

## 4. Lower bound (first >= target)

```javascript
function lowerBound(nums, x) {
  let lo = 0,
    hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
```

Rentang `[lo, hi)` setengah terbuka—template alternatif yang mengurangi error `+1/-1`.

---

## 5. Kompleksitas

- Waktu O(log n), memori O(1) iteratif; rekursif O(log n) stack.

---

## 6. Pitfall: overflow mid

Di JS biasanya aman; tetap gunakan `lo + ((hi - lo) >> 1)` sebagai kebiasaan lintas bahasa.

---

## 7. Pitfall: duplikat

Menemukan **salah satu** indeks vs **first/last** memerlukan kondisi berbeda—jelaskan ke interviewer.

---

## 8. Rotated sorted array (outline)

Cari pivot dengan membandingkan `nums[mid]` dengan `nums[hi]` atau `nums[lo]`—dua fase atau satu fase tergantung soal.

---

## 9. Pola interview

Sebelum menulis kode, ucapkan invariant: “Saya menjaga bahwa jawaban berada di rentang [lo,hi].”

---

## 10. Latihan konsep

Bedakan `lowerBound` dan `upperBound` untuk array dengan duplikat—hubungkan dengan counting frequency.

---

## 11. Checklist

- [ ] Pilih rentang inklusif vs setengah terbuka dan konsisten.
- [ ] Tahu update `lo/hi` saat `mid` dibuang atau dipertahankan.
- [ ] Tahu O(log n) dan kapan linear scan lebih sederhana (n kecil).

---

## 12. Referensi

Knuth membahas binary search sebagai algoritma pertama yang salah di literatur—bukti betapa mudahnya off-by-one.

---

## 13. Contoh trace

`nums = [1,3,5,7,9]`, target `7` → mid steps mengarah ke index 3.

---

## 14. Anti-pattern

`indexOf` pada array besar ketika sorted—O(n) tidak memanfaatkan urutan.

---

## 15. Tambahan: binary search pada jawaban

Lihat topik 79—monotonic predicate ` feasible(mid)` menggantikan perbandingan langsung dengan elemen array.

---

## 16. Tambahan: floating binary search

Untuk akar kuadrat numerik, ulangi sampai `hi-lo < eps`.

---

## 17. Quiz

Pada `lowerBound`, apa arti `lo === nums.length`? Semua elemen `< x.

---

## 18. Latihan tulis

Implementasikan `searchRange(nums, target)` yang mengembalikan `[first, last]` dalam O(log n).

---

## 19. Jawaban sketsa

Cari first dengan lower bound pada target, cek validitas, lalu lower bound pada `target+epsilon` atau pola kedua BS untuk last—atau first untuk `target` dan first untuk `target+1` pada integer diskret.

---

## 20. Flashcard

- **Sorted + query banyak:** BS.
- **Invariant:** buang setengah.

---

## 21. Edge: array kosong

`lo`/`hi` awal harus menangani `n=0`.

---

## 22. Edge: satu elemen

Pastikan loop berhenti benar.

---

## 23. Rekursi vs iteratif

Interview: iteratif lebih disukai untuk kontrol stack.

---

## 24. Integrasi JS

Untuk `TypedArray`, BS sama; untuk `ArrayLike`, konversi indeks.

---

## 25. Performa konstanta

BS sangat cepat; bottleneck sering I/O atau predicate mahal.

---

## 26. Testing

Property test: bandingkan hasil `lowerBound` dengan linear scan untuk array kecil acak.

---

## 27. Monotonic predicate

` feasible(mid)` false lalu true—cari boundary pertama true.

---

## 28. Penutup

Kuasai satu template (setengah terbuka atau inklusif) hingga otomatis—variasi rotated/peak jadi lebih mudah.

---

## 29. Bacaan lanjutan

“Binary search on answer” sering muncul di soal “minimum capacity”, “Koko eating bananas”.

---

## 30. Rangkuman

Terurut + query → pertimbangkan log n dengan invariant yang jelas; tulis mid dan update tanpa off-by-one.

---

Dokumen ini mendukung implementasi BS yang benar di whiteboard atau editor langsung.
