# Maximum Product Subarray

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Dynamic programming
- **Inti masalah:** Subarray **kontinu** dengan **hasil kali** maksimum (bisa negatif; dua negatif → positif — harus track **max dan min** prefix).

---

- Soal: `maxProduct(nums)` int.
- Input: array integer
- Output: max product
- Constraints utama: O(n) simpan `curMax`, `curMin` karena multiply by negative flips min↔max possibly.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Initialize `res = nums[0]`, `curMax = curMin = nums[0]`. Iterate `x = nums[i]`: `nextMax = max(x, curMax*x, curMin*x)`; `nextMin = min(x, curMax*x, curMin*x)`; update `curMax,curMin`; `res = max(res, curMax)` — karena min bisa jadi max after future numbers optional; actually need recompute from `x` fresh each time for **restart** subarray at `x` when beneficial (pattern handles by comparing `x` alone). Standard three-way max/min.

Struktur cepat:
- Observasi inti masalah: Sign flip makes smallest product become candidate for largest later when multiplied by negatives.
- Strategi final yang dipilih: Track both extremes rolling.
- Kenapa strategi ini paling cocok: O(n) single pass constant memory.
- Time complexity: O(n)
- Space complexity: O(1)
- Edge case utama: zeros reset chain; single negative.

## 3) Versi Ultra Singkat (10-20 detik)

> Keep running max and min product; update with each x including starting new at x.

## 4) Pseudocode Ringkas (5-10 baris)

```text
curMax = curMin = res = nums[0]
for x in nums[1..]:
  tmpMax = max(x, curMax * x, curMin * x)
  curMin = min(x, curMax * x, curMin * x)  // use previous curMax before overwrite
  curMax = tmpMax
  res = max(res, curMax)
```

## 5) Implementasi Final (Inti Saja)

```js
function maxProduct(nums) {
  let res = nums[0],
    curMax = nums[0],
    curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const a = curMax * x,
      b = curMin * x;
    curMax = Math.max(x, a, b);
    curMin = Math.min(x, a, b);
    res = Math.max(res, curMax);
  }
  return res;
}
```

## 6) Bukti Correctness (Wajib)

- Local optimum for product subarray ending at i depends on both best and worst products ending at i-1 with sign considerations—recurrence captures all.

## 7) Dry Run Singkat

- `[2,3,-2,4]` → 6; `[-2,0,-1]` careful zero.

## 8) Red Flags (Yang Harus Dihindari)

- Only tracking maximum product ignoring min — misses double negative positives.

## 9) Follow-up yang Sering Muncul

- Maximum subarray sum — Kadane simpler no min.

## 10) Trade-off Keputusan

- Log-domain transform fails with zeros and non-positive logs.

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
- Catatan perbaikan: Use temp vars if not careful order—above code uses a,b before overwrite.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: DP Kadane variant
- Inti masalah (1 kalimat): Max product contiguous subarray.
- Soal: Integer.
- Strategi final: Track max and min rolling
- Kompleksitas: O(n), O(1)
- 2 edge case: contains zero; two negatives
- 1 potensi bug: only max product tracking
- 1 alasan valid: min stores candidate to flip on negative next
