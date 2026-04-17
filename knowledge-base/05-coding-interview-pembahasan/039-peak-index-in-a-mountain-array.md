# Peak Index in a Mountain Array

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Binary search
- **Inti masalah:** Array «gunung»: naik strict lalu turun strict; cari indeks puncak (nilai maksimum).

---

- Soal: `arr.length >= 3`; exists unique peak index.
- Input: `arr: number[]`
- Output: index `i` where `arr[i]` peak
- Constraints utama: O(log n) — compare mid neighbor: if `arr[mid] < arr[mid+1]`, peak strictly to right → `left = mid+1`; else peak at mid or left → `right = mid`.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Binary search on answer index

## 2) Jawaban Ideal Singkat (30-60 detik)

> Di gunung, elemen **naik** ke puncak: jika `arr[mid] < arr[mid+1]`, kita masih di lereng naik, jadi **setidaknya** satu puncak di kanan (binary move `lo = mid+1`). Jika tidak, `mid` bisa jadi peak atau puncak di kiri ⇒ `hi = mid`. Loop `while lo < hi`; return `lo`. Tidak perlu akses `mid-1` jika hati-hati. O(log n).

Struktur cepat:
- Observasi inti masalah: Unimodal array — binary search by slope comparison.
- Strategi final yang dipilih: BS with compare `arr[mid]` vs `arr[mid+1]`.
- Kenapa strategi ini paling cocok: Log time vs linear find max.
- Time complexity: O(log n)
- Space complexity: O(1)
- Edge case utama: Peak not at middle; strict monotonic sides.

## 3) Versi Ultra Singkat (10-20 detik)

> If arr[mid] < arr[mid+1] search right half; else search left including mid.

## 4) Pseudocode Ringkas (5-10 baris)

```text
left = 0, right = n - 1
while left < right:
  mid = left + (right - left) / 2
  if arr[mid] < arr[mid + 1]:
    left = mid + 1
  else:
    right = mid
return left
```

## 5) Implementasi Final (Inti Saja)

```js
function peakIndexInMountainArray(arr) {
  let lo = 0,
    hi = arr.length - 1;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (arr[mid] < arr[mid + 1]) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Increasing side guarantees peak lies in `[mid+1, right]`; else peak in `[left, mid]`.
- Kenapa semua kasus valid tercakup: Unique peak ensures unimodal predicate works.
- Kenapa tidak ada kasus yang terlewat: Interval shrinks to peak index.

## 7) Dry Run Singkat

- `[0,2,1,0]` → index `1`.

## 8) Red Flags (Yang Harus Dihindari)

- `indexOf(Math.max(...))` O(n) if log requested.
- Using `<=` wrong and infinite loop.

## 9) Follow-up yang Sering Muncul

- Find in bitonic array / search target — extend with extra binary phases.

## 10) Trade-off Keputusan

- Neighbor compare vs gradient triple — neighbor simpler.

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
- Catatan perbaikan: Note `arr[mid+1]` safe because peak not last element.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Binary search on bitonic
- Inti masalah (1 kalimat): Find peak index in mountain array.
- Soal: Index.
- Strategi final: Compare mid with mid+1
- Kompleksitas: O(log n), O(1)
- 2 edge case: long asc then drop at end; small n
- 1 potensi bug: mid+1 out of range if while wrong
- 1 alasan valid: Upward slope implies peak to the right
