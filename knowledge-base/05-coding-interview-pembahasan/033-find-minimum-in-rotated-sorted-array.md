# Find Minimum in Rotated Sorted Array

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Binary search
- **Inti masalah:** Array terurut naik lalu di-**rotate** di satu pivot unknown; cari nilai minimum tanpa scan penuh O(n) jika diminta log.

---

- Soal: `nums` distinct values (usually); return min.
- Input: `nums: number[]`
- Output: `number`
- Constraints utama: O(log n) — compare `nums[mid]` with `nums[right]` or `nums[left]` to decide which half contains min.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Binary search on rotated sorted

## 2) Jawaban Ideal Singkat (30-60 detik)

> Bandingkan `mid` dengan `right`: jika `nums[mid] > nums[right]`, minimum **pastikan** di paruh **kanan** (ada drop), set `left = mid + 1`. Jika `nums[mid] < nums[right]`, paruh kanan terurut → min di kiri termasuk `mid`, `right = mid`. Jika sama (varian dengan duplikat LC 154) susutkan `right--`. Untuk **tanpa duplikat**, loop selesai dengan `left===right` atau return `nums[left]`. O(log n) average, O(n) worst with duplicates variant.

Struktur cepat:
- Observasi inti masalah: Rotated sorted array has one valley; binary search finds unsorted side.
- Strategi final yang dipilih: Compare mid vs right (standard for min).
- Kenapa strategi ini paling cocok: Halves search space logarithmically when distinct.
- Time complexity: O(log n) **without duplicates**; O(n) worst when nums may duplicate all around (LC II)
- Space complexity: O(1)
- Edge case utama: No rotation (fully sorted); length 1; duplicates.

## 3) Versi Ultra Singkat (10-20 detik)

> If nums[mid] > nums[right], search right half; else left half including mid.

## 4) Pseudocode Ringkas (5-10 baris)

```text
left = 0, right = n - 1
while left < right:
  mid = left + (right - left) / 2
  if nums[mid] > nums[right]:
    left = mid + 1
  else:
    right = mid
return nums[left]
```

## 5) Implementasi Final (Inti Saja)

```js
function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Min is unique smallest; when right side sorted relative to `nums[right]`, min lies in left part including mid; when `nums[mid] > nums[right]`, rotation drop must be to the right of mid.
- Kenapa semua kasus valid tercakup: Distinct guarantees strict inequality tells rotated side.
- Kenapa tidak ada kasus yang terlewat: Each step reduces interval.

## 7) Dry Run Singkat

- `[3,4,5,1,2]` → 1.
- `[1,2,3,4,5]` → 1.

## 8) Red Flags (Yang Harus Dihindari)

- Return `min(nums)` O(n).
- Off-by-one in `nums[mid] vs nums[left]` variant without adjusting logic.

## 9) Follow-up yang Sering Muncul

- Find Minimum II with duplicates — shrink `right` when equal at mid and right.

## 10) Trade-off Keputusan

- Mid vs left comparison — different but equivalent with care.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Learn duplicate variant (154).

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Binary search rotated
- Inti masalah (1 kalimat): Min in rotated sorted array.
- Soal: Min value.
- Strategi final: mid vs right compare
- Kompleksitas: O(log n) distinct, O(1) space
- 2 edge case: no rotate; size 1
- 1 potensi bug: use mid vs left without adjusting branches
- 1 alasan valid: Sorted half tells min cannot be in that half when inequality shows drop elsewhere
