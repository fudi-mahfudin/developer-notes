# Target Sum

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Dynamic Programming, subset sum transform
- **Inti masalah:** Bubuhkan `+` atau `-` di depan tiap `nums[i]`; jumlah ekspresi = `target`. Hitung **jumlah cara** assignment tanda.

---

- Soal: `findTargetSumWays(nums, target)` int count.
- Input: ints (possibly zeros), target
- Constraints utama: Transform ke **subset sum**: Let `P` = sum subset assigned `+`, `S` total sum `nums`. `P - (S-P) = target` → `2P = target + S` → `P = (target+S)/2` **integer** and **≥0**. Jadi hitung subset dengan jumlah `P` (0/1 knapsack count). Zeros need combination multiplier `2^zeros` if handled separately or include in DP careful.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Hitung `sum = sum(nums)`. Jika `(target+sum)` ganjil atau `<0` atau `P` bukan integer achievable return 0. Lainnya DP count ways `dp[j] += dp[j-x]` untuk tiap `x` (perhatikan multiple zeros duplicate path multiplicity — iterative `dp` dengan processing zeros multiply counts atau extend state). **Top-down memo** index, current sum juga O(n · range) if transformation heavy — subset sum DP preferred if `P` moderate.

Struktur cepat:
- Observasi inti masalah: Sign assignment equivalent to choose positive subset with conditioned sum.
- Strategi final yang dipilih: Reduce to subset sum count after algebra.
- Kenapa strategi ini paling cocok: Avoids exponential sign enumeration.
- Time complexity: O(n · P) pseudo-polynomial
- Space complexity: O(P)
- Edge case utama: zeros double branches; negative target ok if sum alignment works.

## 3) Versi Ultra Singkat (10-20 detik)

> Map to subset sum `(target+total)/2`; DP count subsets with that sum; watch zeros.

## 4) Pseudocode Ringkas (5-10 baris)

```text
S = sum(nums)
if (target + S) % 2 != 0: return 0
P = (target + S) / 2
if P < 0: return 0
dp[0] = 1
for x in nums:
  for j from P down to x:
    dp[j] += dp[j-x]
return dp[P]  // handle zeros appropriately
```

## 5) Implementasi Final (Inti Saja)

```js
function findTargetSumWays(nums, target) {
  const S = nums.reduce((a, b) => a + b, 0);
  if (target > S || target < -S || (target + S) % 2 !== 0) return 0;
  const P = (target + S) >> 1;
  const dp = new Array(P + 1).fill(0);
  dp[0] = 1;
  for (const x of nums) for (let j = P; j >= x; j--) dp[j] += dp[j - x];
  return dp[P];
}
```

*(Catatan: Implementasi di atas mengasumsikan `nums[i] >= 0` seperti LC; jika ada nilai negatif gunakan pendekatan memo `(i, sum)`—transform tidak berlaku.)*

## 6) Bukti Correctness (Wajib)

- Algebraic equivalence between sign assignments and positive subset sum selection for nonnegative numbers.

## 7) Dry Run Singkat

- `[1,1,1,1,1]`, target `3` → 5 ways.

## 8) Red Flags (Yang Harus Dihindari)

- DFS exponential without memo when constraints allow DP transform.

## 9) Follow-up yang Sering Muncul

- Unlimited signs variants — different models.

## 10) Trade-off Keputusan

- `map<pair>` DFS memo sum path when transform invalid.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 7/10
- Kerapihan implementasi: 8/10
- Catatan perbaikan: Handle zero values explicitly — multiply combinatorics or DP extension.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: DP subset sum
- Inti masalah (1 kalimat): Count +/− assignments summing to target.
- Soal: Count.
- Strategi final: Map to subset sum (target+S)/2
- Kompleksitas: O(n·P), O(P)
- 2 edge case: impossible parity; zeros
- 1 potensi bug: wrong transform with negative nums
- 1 alasan valid: algebra reduces sign partition to one subset size
