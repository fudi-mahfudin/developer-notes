# Binary Search

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Binary search
- **Inti masalah:** Cari indeks `target` dalam array **terurut naik** atau return `-1`.

---

- Soal: `search(nums, target)` classic.
- Input: `nums: number[]` sorted ascending, `target: number`
- Output: `number` index or -1
- Constraints utama: O(log n); avoid integer overflow in `mid`.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Binary search

## 2) Jawaban Ideal Singkat (30-60 detik)

> Invariant: `left..right` selalu berisi jawaban jika ada. `while left <= right`: `mid = floor((left+right)/2)`; if `nums[mid]===target` return mid; if lebih kecil, `left=mid+1`; else `right=mid-1`. **Perhatikan overflow:** `mid = left + ((right-left)>>1)`. Return -1. O(log n), O(1).

Struktur cepat:
- Observasi inti masalah: Monotonic order → half search space each step.
- Strategi final yang dipilih: Closed interval [left, right] loop while left<=right.
- Kenapa strategi ini paling cocok: Standard, easy to prove.
- Time complexity: O(log n)
- Space complexity: O(1)
- Edge case utama: Single element; target at ends; not found.

## 3) Versi Ultra Singkat (10-20 detik)

> Two pointers; halve range by comparing mid with target until found or empty range.

## 4) Pseudocode Ringkas (5-10 baris)

```text
left = 0
right = n - 1
while left <= right:
  mid = left + (right - left) / 2
  if nums[mid] == target: return mid
  if nums[mid] < target: left = mid + 1
  else: right = mid - 1
return -1
```

## 5) Implementasi Final (Inti Saja)

```js
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Jika target exists at index k, k stays inside [left,right] because each branch discards half that cannot contain target by sorted order.
- Kenapa semua kasus valid tercakup: Search space shrinks until element found or empty.
- Kenapa tidak ada kasus yang terlewat: Exhaustive halving.

## 7) Dry Run Singkat

- `[-1,0,3,5,9,12]`, target `9` → `4`.
- target `2` → `-1`.

## 8) Red Flags (Yang Harus Dihindari)

- `mid = (left+right)/2` overflow in langs C++/Java (in JS rare but show awareness).
- Off-by-one with `[left,right)` variant — stay consistent.

## 9) Follow-up yang Sering Muncul

- Lower bound / first ≥ target — tweak conditions.
- Binary search on answer (min capacity, etc.).

## 10) Trade-off Keputusan

- Closed vs half-open interval — both OK, pick one template.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Master `lowerBound` / `upperBound` variants.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Binary search
- Inti masalah (1 kalimat): Find index in sorted array.
- Soal: Index or -1.
- Strategi final: Halving with inclusive bounds
- Kompleksitas: O(log n), O(1)
- 2 edge case: length 1; not found
- 1 potensi bug: infinite loop when mid calculation wrong
- 1 alasan valid: Monotonic elimination of impossible half
