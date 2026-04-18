# Median of Two Sorted Arrays

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Binary search on partition
- **Inti masalah:** Median dari gabungan dua array terurut dengan gabungan ukuran genap/ganjil — jawaban O(log(min(m,n))) target.

---

- Soal: `findMedianSortedArrays(nums1, nums2)` — total length 1..2000 in LC.
- Input: dua array sorted
- Output: `number` (median, mean of two middle if even length)
- Constraints utama: O(log(m+n)) — partition shorter array.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Binary search partition

## 2) Jawaban Ideal Singkat (30-60 detik)

> Binary search **cut point** pada array lebih pendek (`A`). Partisi `A` pada `i` elemen kiri ⇒ sisa `m-i` di kanan `A`; `B` menerima `j = (m+n+1)/2 - i` elemen kiri agar total kiri ≈ half (floor). Valid jika `A[i-1] <= B[j]` dan `B[j-1] <= A[i]` (boundary indices careful). Median dari max kiri & min kanan tergantung ganjil/genap panjang total. Implementasi hati-hati indeks 0 dan infinity sentinel.

Struktur cepat:
- Observasi inti masalah: Median depends only on boundary between left/right halves of merged order — partition viewpoint.
- Strategi final yang dipilih: BS `i` in `[0,m]` for correctness predicate.
- Kenapa strategi ini paling cocok: Optimal complexity vs merge O(m+n).
- Time complexity: O(log(min(m,n)))
- Space complexity: O(1)
- Edge case utama: One empty array; all smaller in one array; even vs odd length.

## 3) Versi Ultra Singkat (10-20 detik)

> Binary search partition on shorter array; enforce left max ≤ right min on both sides; derive median from boundary values.

## 4) Pseudocode Ringkas (5-10 baris)

```text
ensure len(A) <= len(B) by swapping if needed
m, n = len(A), len(B)
left = 0, right = m
while left <= right:
  i = (left + right) / 2  // partition A
  j = (m + n + 1) / 2 - i
  adjust i using comparisons of A[i-1] vs B[j] and B[j-1] vs A[i]
compute median from maxLeft and minRight per odd/even length
```

## 5) Implementasi Final (Inti Saja)

```js
function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const m = nums1.length, n = nums2.length;
  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = ((m + n + 1) >> 1) - i;
    const maxLeftA = i === 0 ? -Infinity : nums1[i - 1];
    const minRightA = i === m ? Infinity : nums1[i];
    const maxLeftB = j === 0 ? -Infinity : nums2[j - 1];
    const minRightB = j === n ? Infinity : nums2[j];
    if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
      if (((m + n) & 1) === 1) return Math.max(maxLeftA, maxLeftB);
      return (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
    }
    if (maxLeftA > minRightB) hi = i - 1;
    else lo = i + 1;
  }
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Correct partition iff every element in merged left ≤ every element in merged right; binary search finds such partition.
- Kenapa semua kasus valid tercakup: i ranges 0..m; j determined uniquely.
- Kenapa tidak ada kasus yang terlewat: Predicate monotonic in i — adjust direction like standard BS.

## 7) Dry Run Singkat

- `nums1=[1,3]`, `nums2=[2]` → median `2`.
- Even: `[1,2]` and `[3,4]` → `2.5`.

## 8) Red Flags (Yang Harus Dihindari)

- Merge two arrays O(m+n) when interviewer asks log.
- Off-by-one in `j` formula.

## 9) Follow-up yang Sering Muncul

- k-th element two arrays — generalize partition.

## 10) Trade-off Keputusan

- Partition BS vs heap / merge — BS meets hardest constraint.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 8/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 7/10
- Kerapihan implementasi: 8/10
- Catatan perbaikan: Whiteboard full derivation before coding.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Binary search partition
- Inti masalah (1 kalimat): Median of two sorted arrays in log time.
- Soal: Number median.
- Strategi final: BS shorter array partition
- Kompleksitas: O(log(min(m,n))), O(1)
- 2 edge case: one empty; all elements in one array
- 1 potensi bug: infinity handles for empty sides
- 1 alasan valid: Partition correctness ↔ median from boundary extrema
