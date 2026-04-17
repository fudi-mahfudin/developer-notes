# Topik 77 — Merge Sort dan Quick Sort

**Merge sort** membagi array menjadi dua, mengurutkan rekursif, lalu **menggabung** dua array terurut dalam **O(n)**. **Quick sort** memilih **pivot**, mempartisi elemen `< pivot`, `= pivot`, `> pivot`, lalu rekursi pada sisi kiri/kanan. Keduanya adalah contoh **divide & conquer**, tetapi profil kompleksitas dan stabilitas berbeda.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Merge sort punya kompleksitas **O(n log n)** di kasus terburuk, **stabil** jika merge mempertahankan urutan relatif elemen sama, membutuhkan **O(n)** ruang tambahan untuk array bantu. Quick sort rata-rata **O(n log n)** waktu, tetapi terburuk **O(n²)** jika pivot selalu ekstrem; partisi **Lomuto** vs **Hoare** mempengaruhi konstanta dan perilaku; **tidak stabil** pada implementasi standar. Quick sort in-place populer di praktik; merge sort dipilih ketika stabilitas atau jaminan O(n log n) terburuk penting (misalnya linked list).

---

## 2. Mengapa topik ini keluar di interview

- Menguji pemahaman rekursi, partisi, dan trade-off waktu/ruang/stabilitas.
- Soal lanjutan: `k`-th element, counting inversions (merge sort), quickselect.

---

## 3. Merge sort — ide inti

```javascript
function mergeSort(a, aux = a.slice(), lo = 0, hi = a.length - 1) {
  if (lo >= hi) return;
  const mid = (lo + hi) >> 1;
  mergeSort(a, aux, lo, mid);
  mergeSort(a, aux, mid + 1, hi);
  merge(a, aux, lo, mid, hi);
}

function merge(a, aux, lo, mid, hi) {
  for (let k = lo; k <= hi; k++) aux[k] = a[k];
  let i = lo,
    j = mid + 1;
  for (let k = lo; k <= hi; k++) {
    if (i > mid) a[k] = aux[j++];
    else if (j > hi) a[k] = aux[i++];
    else if (aux[j] < aux[i]) a[k] = aux[j++];
    else a[k] = aux[i++];
  }
}
```

---

## 4. Quick sort — Lomuto (sketsa)

```javascript
function quickSort(a, lo = 0, hi = a.length - 1) {
  if (lo >= hi) return;
  const p = partition(a, lo, hi);
  quickSort(a, lo, p - 1);
  quickSort(a, p + 1, hi);
}

function partition(a, lo, hi) {
  const pivot = a[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (a[j] <= pivot) [a[i], a[j]] = [a[j], a[i]], i++;
  }
  [a[i], a[hi]] = [a[hi], a[i]];
  return i;
}
```

---

## 5. Kompleksitas

| Algoritma   | Rata-rata | Terburuk | Ruang tambahan | Stabil |
|------------|-----------|----------|----------------|--------|
| Merge sort | O(n log n) | O(n log n) | O(n)           | Ya (merge benar) |
| Quick sort | O(n log n) | O(n²)     | O(log n) stack | Biasanya tidak |

---

## 6. Pitfall: quick sort pada array sudah terurut

Tanpa pivot acak atau median-of-three, partisi bisa tidak seimbang. Mitigasi: random pivot, `introsort`, atau switch ke heap sort di kedalaman tertentu.

---

## 7. Pitfall: stabilitas

Sorting di JS (`Array.prototype.sort`) implementasi engine-dependent untuk stabilitas (modern: stabil). Jangan mengandalkan perilaku lama IE.

---

## 8. Pitfall: merge sort ruang

Butuh buffer; untuk linked list bisa merge in-place dengan teknik khusus (lebih jarang di interview JS).

---

## 9. Pola interview: quickselect

Seleksi elemen urutan-k dengan partisi quick sort satu sisi—**O(n)** rata-rata.

---

## 10. Pola interview: inversion count

Hitung pasangan `i<j` dengan `a[i]>a[j]` menggunakan merge sort—**O(n log n)**.

---

## 11. Latihan konsep

Jelaskan mengapa merge sort tidak in-place pada array tanpa struktur tambahan.

---

## 12. Latihan kode

Implementasikan `partition` Hoare dan bandingkan indeks kembalian dengan Lomuto.

---

## 13. Edge cases

- Array kosong atau satu elemen: basis rekursi.
- Duplikat banyak: partisi tiga arah (Dutch national flag) mengurangi rekursi dalam.

---

## 14. Checklist

- [ ] Tahu perbedaan merge vs quick pada worst case.
- [ ] Bisa jelaskan stabilitas.
- [ ] Tahu mitigasi O(n²) pada quick sort.

---

## 15. Referensi

Sedgewick/Wayne *Algorithms*; CLRS bab sorting.

---

## 16. Tambahan: tail recursion elimination

Beberapa kompilator mengoptimalkan sisi rekursi tunggal quick sort—konsep, bukan wajib di JS murni.

---

## 17. Tambahan: sort besar di disk

External merge sort—beda konteks sistem.

---

## 18. Tambahan: comparators

`sort((x,y)=>x-y)` untuk angka; string per locale `localeCompare`.

---

## 19. Anti-pattern

Menggunakan O(n²) bubble sort “karena sederhana” pada n besar.

---

## 20. Flashcard cepat

- **Stabil:** urutan relatif kunci sama terjaga.

---

## 21. Testing

Property-based: hasil terurut + permutasi input menghasilkan multiset sama.

---

## 22. Performa praktis

Quick sort cache-friendly untuk array; merge sort prediktif untuk analisis worst-case.

---

## 23. Integrasi TypeScript

Generik `T[]` dengan comparator `(a:T,b:T)=>number`.

---

## 24. Debugging

Log subarray `lo..hi` dan pivot untuk trace kecil.

---

## 25. Memori stack

Quick sort kedalaman rekursi O(n) worst—iteratif + stack eksplisit bisa membantu.

---

## 26. Parallel

Merge sort mudah diparalelkan di level merge; quick sort lebih sulit seimbang.

---

## 27. Etika wawancara

Tanyakan apakah stabilitas atau batas memori menjadi constraint.

---

## 28. Rangkuman

Merge sort aman dan stabil dengan harga memori; quick sort cepat in-place dengan waspada worst case.

---

## 29. Soal terkait

Sort warna (0,1,2) linear—bukan comparison sort.

---

## 30. Drill manual

Urutkan `[3,1,4,1,5]` dengan merge sort; tulis pohon pemanggilan.

---

## 31. Penutup singkat

Penguasaan kedua algoritma menunjukkan pemahaman divide & conquer yang dapat dipindah ke banyak struktur lain.

---

## 32. Perbandingan dengan heap sort

Heap sort **O(n log n)** worst-case in-place, tidak stabil—kadang dipilih ketika jaminan worst-case diperlukan tanpa buffer merge.

---

## 33. Varian pivot

Median-of-medians memberikan pivot “baik” untuk quickselect worst-case linear—lanjutan teori.

---

## 34. Catatan JavaScript

`Array.prototype.sort` tidak menjamin algoritma tertentu; untuk pembelajaran, implementasi sendiri mengilustrasikan konsep.

---

Dokumen ini membandingkan merge sort dan quick sort dari sudut kompleksitas, stabilitas, dan pola interview umum.
