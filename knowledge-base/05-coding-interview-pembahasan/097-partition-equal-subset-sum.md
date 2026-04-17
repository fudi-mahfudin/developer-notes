# Partition Equal Subset Sum

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Dynamic programming (subset sum), bitmask possible
- **Inti masalah:** Bisakah `nums` dibagi dua subset dengan **jumlah sama**? Equiv: ada subset yang berjumlah `sum/2` jika total genap.

---

- Soal: `canPartition(nums)` boolean.
- Input: array positif integers
- Constraints utama: Total ganjil → false. Target `T = sum/2`. `dp[j]` boolean achievable sum `j` using elements — 0/1 knapsack boolean. O(n * T).

## 2) Jawaban Ideal Singkat (30-60 detik)

> Hitung `sum`; jika ganjil return false. `target = sum/2`. **DP 1D**: `dp[0]=true`; iterate each `num`, iterate `j` dari **target turun ke num**: `dp[j] = dp[j] || dp[j-num]`. Reverse inner loop agar setiap angka dipakai sekali per iteration. Return `dp[target]`.

Struktur cepat:
- Observasi inti masalah: Equivalent to subset sum to half of total — classic 0/1 knapsack existence.
- Strategi final yang dipilih: Boolean DP bitset or 1D array.
- Kenapa strategi ini paling cocok: Polynomial in n and sum.
- Time complexity: O(n · sum)
- Space complexity: O(target)
- Edge case utama: `[1,5,11,5]` true; sum odd impossible.

## 3) Versi Ultra Singkat (10-20 detik)

> Subset sum to sum/2 with 0/1 items; bitset or bool array backward loop.

## 4) Pseudocode Ringkas (5-10 baris)

```text
if sum % 2: return false
target = sum / 2
dp = array bool size target+1; dp[0]=true
for x in nums:
  for j from target down to x:
    dp[j] = dp[j] or dp[j-x]
return dp[target]
```

## 5) Implementasi Final (Inti Saja)

```js
function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum & 1) return false;
  const t = sum >> 1;
  const dp = new Array(t + 1).fill(false);
  dp[0] = true;
  for (const x of nums) for (let j = t; j >= x; j--) dp[j] = dp[j] || dp[j - x];
  return dp[t];
}
```

## 6) Bukti Correctness (Wajib)

- DP enumerates achievable sums using subset; exists partition iff half-sum achievable.

## 7) Dry Run Singkat

- `[1,5,11,5]` → true (subset 11 vs 11).

## 8) Red Flags (Yang Harus Dihindari)

- Greedy sort halves — wrong. Forward inner loop reusing same element multiple times same round.

## 9) Follow-up yang Sering Muncul

- Minimum subset sum difference — variation.

## 10) Trade-off Keputusan

- Bitset `bits |= bits << x` for speed in C++/use BigInt bitwise in JS rarer.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Mention pseudo-polynomial dependence on sum magnitude.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: 0/1 knapsack boolean
- Inti masalah (1 kalimat): Split into equal sum subsets.
- Soal: Boolean.
- Strategi final: DP subset sum to sum/2
- Kompleksitas: O(n·sum), O(sum)
- 2 edge case: odd total; single element
- 1 potensi bug: forward loop allowing reuse
- 1 alasan valid: partition exists iff subset hits half sum
