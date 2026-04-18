# Longest Increasing Subsequence

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Dynamic programming, patience sorting
- **Inti masalah:** **Subsequence** (tidak harus kontigu) **strictly increasing** terpanjang.

---

- Soal: `lengthOfLIS(nums)` int length.
- Input: integer array
- Constraints utama: O(n²) DP `dp[i]=max(dp[j]+1)` for `j<i` `nums[j]<nums[i]`; **O(n log n)** binary search on auxiliary `tails` array (smallest tail value for LIS length=k).

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Patience / binary search**: maintain `tails` sorted; for `x` in nums binary search **leftmost** position `tails[pos] >= x` to replace; if at end append length grows. Length = `tails.length`. Intuition: smaller tail enables longer future extensions. **O(n log n)**. Naive DP O(n²) acceptable smaller constraints.

Struktur cepat:
- Observasi inti masalah: Equivalent to patience game or longest chain with order constraint.
- Strategi final yang dipilih: tails + bisect (lower_bound).
- Kenapa strategi ini paling cocok: Optimal time for large n.
- Time complexity: O(n log n) optimized; O(n²) DP simple
- Space complexity: O(n)
- Edge case utama: strictly increasing whole array → n; duplicates not counted equal must skip — strict `<` vs `<=` matters for versions.

## 3) Versi Ultra Singkat (10-20 detik)

> tails array; for each x, lower_bound replace; else push — size is LIS length.

## 4) Pseudocode Ringkas (5-10 baris)

```text
tails = empty list
for x in nums:
  pos = binary_search first index with tails[pos] >= x
  if pos == len(tails): tails.append(x)
  else: tails[pos] = x
return len(tails)
```

## 5) Implementasi Final (Inti Saja)

```js
function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let lo = 0,
      hi = tails.length;
    while (lo < hi) {
      const m = (lo + hi) >> 1;
      if (tails[m] < x) lo = m + 1;
      else hi = m;
    }
    if (lo === tails.length) tails.push(x);
    else tails[lo] = x;
  }
  return tails.length;
}
```

## 6) Bukti Correctness (Wajib)

- `tails[k]` minimal ending value for LIS length k+1 possible — exchange argument/Greedy compatibility.

## 7) Dry Run Singkat

- `[10,9,2,5,3,7,101,18]` → 4.

## 8) Red Flags (Yang Harus Dihindari)

- Using `<=` bisect variant wrong for duplicate handling depending on strict increase.

## 9) Follow-up yang Sering Muncul

- Count LIS number — DP with pairs count.

## 10) Trade-off Keputusan

- O(n²) DP with path reconstruction easier to extend story.

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
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Practice greedy proof sketch for patience sorting.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: LIS patience / bisect
- Inti masalah (1 kalimat): Longest strictly increasing subsequence length.
- Soal: Int.
- Strategi final: tails binary search
- Kompleksitas: O(n log n), O(n)
- 2 edge case: descending array 1; duplicates
- 1 potensi bug: non-strict compare when problem strict
- 1 alasan valid: minimal tail invariant for each length class
