# Search in Rotated Sorted Array

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Binary search
- **Inti masalah:** Array sorted lalu rotate; nilai **distinct**; cari indeks `target` atau -1 dalam O(log n).

---

- Soal: `search(nums, target)` pada rotated distinct sorted.
- Input / Output: index or -1
- Constraints utama: O(log n); two halves: one always sorted.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Binary search with pivot logic

## 2) Jawaban Ideal Singkat (30-60 detik)

> Di setiap `mid`, setidaknya satu sisi `[left,mid]` atau `[mid,right]` **strictly sorted** (naik). Jika `nums[mid]===target` return. Jika sisi kiri sorted (`nums[left]<=nums[mid]`): jika `target` di dalam rentang `[nums[left],nums[mid]]`, search kiri (`right=mid-1`), jika tidak `left=mid+1`. Jika kanan sorted: simetris (`target` di antara `nums[mid]` dan `nums[right]` atau tidak). Jika tidak ada duplicate, logika ini lengkap. O(log n), O(1).

Struktur cepat:
- Observasi inti masalah: Rotation leaves one sorted half identifiable by comparing endpoints with mid.
- Strategi final yang dipilih: Each step decide which half can contain target.
- Kenapa strategi ini paling cocok: Standard LC 33 for distinct integers.
- Time complexity: O(log n)
- Space complexity: O(1)
- Edge case utama: No rotation; target at pivot; not found.

## 3) Versi Ultra Singkat (10-20 detik)

> BS: determine sorted half; if target in sorted range go there else other half.

## 4) Pseudocode Ringkas (5-10 baris)

```text
left = 0, right = n - 1
while left <= right:
  mid = left + (right - left) / 2
  if nums[mid] == target: return mid
  if nums[left] <= nums[mid]:  // left half sorted
    if nums[left] <= target < nums[mid]: right = mid - 1
    else: left = mid + 1
  else:  // right half sorted
    if nums[mid] < target <= nums[right]: left = mid + 1
    else: right = mid - 1
return -1
```

## 5) Implementasi Final (Inti Saja)

```js
function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (target > nums[mid] && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: In rotated sorted distinct array, unsorted half contains pivot; target lies in sorted half iff in numeric range of that half relative to sorted order *or* must be in other half.
- Kenapa semua kasus valid tercakup: Exhaustive cases for target vs sorted segment boundaries.
- Kenapa tidak ada kasus yang terlewat: Distinct removes equality ambiguity between halves (LC 81 duplicate variant differs).

## 7) Dry Run Singkat

- `nums=[4,5,6,7,0,1,2]`, `target=0` → `4`.

## 8) Red Flags (Yang Harus Dihindari)

- Linear scan.
- Mis-handling `<=` vs `<` at boundaries.

## 9) Follow-up yang Sering Muncul

- Search with duplicates (LC 81) — collapse boundaries when `nums[left]==nums[mid]`.

## 10) Trade-off Keputusan

- Find pivot first then BS two steps — O(log n) twice, one-pass BS preferred.

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
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Drill boundary tests for off-by-one.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Binary search rotated
- Inti masalah (1 kalimat): Find target in rotated sorted distinct nums.
- Soal: Index or -1.
- Strategi final: Identify sorted half + range check
- Kompleksitas: O(log n), O(1)
- 2 edge case: single element; strictly ascending no rotate
- 1 potensi bug: inclusive/exclusive range mistake
- 1 alasan valid: One sorted half always allows discarding other
