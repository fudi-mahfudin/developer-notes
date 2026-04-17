# Topik 16 — Two Pointers (Subarray, Palindrome String)

Dokumen ini menjelaskan teknik **dua pointer** pada array/string terurut atau struktur linear: menggeser `left` dan `right` untuk mencapai kompleksitas linear yang jika brute force bisa kuadratik.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Two pointers** memanfaatkan dua indeks yang bergerak searah atau berlawanan untuk mengeksplorasi ruang solusi secara terstruktur. Pada array **terurut**, seringkali kita bisa menghilangkan sebagian besar pasangan yang mustahil. Pada **palindrome**, pointer kiri/kanan membandingkan simbol secara simetris. Kompleksitas umum **O(n)** waktu dan **O(1)** memori tambahan (selain input).

---

## 2. Mengapa topik ini keluar di interview

- Dasar banyak soal array/string (Two Sum II sorted, container water, trapping rain water).
- Menguji apakah kandidat bisa mengurangi nested loop menjadi satu pass terarah.

---

## 3. Pola: berlawanan pada array terurut

Contoh klasik: cari dua angka yang berjumlah `target` di array **naik** terurut.

```javascript
function twoSumSorted(nums, target) {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const s = nums[l] + nums[r];
    if (s === target) return [l, r];
    if (s < target) l++;
    else r--;
  }
  return [-1, -1];
}
```

Alasan pergeseran: jika `s < target`, memperkecil `r` hanya membuat jumlah lebih kecil lagi—harus menaikkan `l`.

---

## 4. Kompleksitas

- Waktu `O(n)`, memori `O(1)`.

---

## 5. Pola: sama arah (fast/slow)

Kadang dua pointer melaju dengan kecepatan berbeda (mirip Floyd), tetapi topik itu sering diklasifikasi terpisah untuk linked list.

---

## 6. Palindrome string

```javascript
function isPalindrome(s) {
  const a = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let l = 0,
    r = a.length - 1;
  while (l < r) {
    if (a[l++] !== a[r--]) return false;
  }
  return true;
}
```

Normalisasi karakter penting untuk soal interview.

---

## 7. Subarray / window

Beberapa soal menggabungkan two pointers dengan **sliding window** ketika invariant window bisa dipelihara dengan geser ujung kanan/kiri.

---

## 8. Pitfall: array tidak terurut

Dua pointer “meet in the middle” untuk sum **tidak** langsung bekerja tanpa sorting—sorting mengubah indeks asli (perlu mapping atau soal memang hanya minta nilai).

---

## 9. Pitfall: integer overflow

Di bahasa tanpa bigint otomatis, `nums[l] + nums[r]` bisa overflow—di JS number aman untuk rentang aman umum, tapi tetap aware di konteks lain.

---

## 10. Latihan konsep

Diberikan array positif terurut, hitung berpasangan dengan selisih tetap `d`—bagaimana two pointers membantu?

---

## 11. Variasi: partition (Quickselect/QuickSort)

Lomuto/Hoare partition memakai pointer untuk menukar elemen—kaitan dengan quicksort.

---

## 12. Checklist

- [ ] Tahu kapan menggeser `l` vs `r` pada sorted pair sum.
- [ ] Tahu beda two pointers vs hash map untuk Two Sum (unsorted).
- [ ] Tahu normalisasi string untuk palindrome.

---

## 13. Referensi

Polanya umum di LeetCode “Two Pointers” tag; bukti greedy untuk sorted pair sering dengan **monotonicity** jumlah saat memindahkan pointer.

---

## 14. Contoh: remove duplicates in-place (sorted)

```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let k = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[k]) nums[++k] = nums[i];
  }
  return k + 1;
}
```

Satu pointer `k` untuk posisi tulis, `i` untuk baca.

---

## 15. Contoh: reverse array

`l`/`r` swap hingga bertemu—fundamental.

---

## 16. Latihan tulis

Implementasikan `threeSum` yang mengembalikan semua triple unik dengan two pointers setelah sort—hati-hati skip duplikat.

---

## 17. Strategi wawancara

Ucapkan invariant: “Pada setiap langkah, kita membuang ruang pencarian yang pasti tidak valid karena monotonicitas.”

---

## 18. Tambahan: two pointers pada linked list

Deteksi palindrome atau middle node memakai teknik berbeda (slow/fast)—sering dikelompokkan terpisah tetapi ide “dua penunjuk” sama.

---

## 19. Anti-pattern

Nested loop penuh tanpa memanfaatkan urutan—tanda tidak melihat pola.

---

## 20. Flashcard

- **Sorted + pair sum:** l/r.
- **Palindrome:** bandingkan simetri.

---

## 21. Kompleksitas ruang

In-place umumnya O(1) ekstra; jika perlu salinan string immutable, O(n).

---

## 22. Edge cases

Array kosong, panjang 1, semua elemen sama, target tidak tercapai.

---

## 23. Uji mental

Mengapa two pointers sorted sum bekerja? Karena untuk fixed `l`, hanya satu `r` yang mungkin cocok saat kita sweep—monotonicitas.

---

## 24. Hubungan dengan binary search

Keduanya memangkas ruang; BS memangkas logaritmik dengan evaluasi titik tengah, two pointers linear dengan struktur khusus.

---

## 25. Penutup

Kuasai pasangan sorted sum dan palindrome checker—keduanya adalah fondasi intuisi untuk variasi lebih berat.

---

## 26. Drill

Diberikan `height[]`, jelaskan bagaimana two pointers menyelesaikan “container with most water” dan invariantnya.

---

Dokumen ini mencakup inti teknik two pointers untuk persiapan coding test JavaScript.
