# House Robber

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Dynamic programming
- **Inti masalah:** Barisan rumah dengan uang `nums[i]`; **tidak boleh** merampok dua rumah **bertetangga**; maksimalkan jumlah.

---

- Soal: `rob(nums)` max sum.
- Input: `number[]` nonneg
- Output: integer
- Constraints utama: `dp[i] = max(dp[i-1], nums[i] + dp[i-2])`; O(n) time O(1) space rolling.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Di rumah `i` pil: **lewati** (wariskan `dp[i-1]`) atau **rampok** (`nums[i] + dp[i-2]` karena tidak boleh ambil `i-1`). Jadi `take = max(prev1, nums[i]+prev2)`. Iteratif `a,b` rolling: initialize `prev2=0`, `prev1=0` then update. Mirip Fibonacci dengan weights.

Struktur cepat:
- Observasi inti masalah: Choice at i depends only on i-1 and i-2 — interval scheduling on path graph.
- Strategi final yang dipilih: Linear DP constant memory.
- Kenapa strategi ini paling cocok: Classic interview recurrence.
- Time complexity: O(n)
- Space complexity: O(1)
- Edge case utama: `[1]`; `[2,1,1,2]` pattern.

## 3) Versi Ultra Singkat (10-20 detik)

> `cur = max(prev, nums[i] + prev2)` slide two variables.

## 4) Pseudocode Ringkas (5-10 baris)

```text
prev2 = 0; prev1 = 0
for each x in nums:
  cur = max(prev1, x + prev2)
  prev2 = prev1; prev1 = cur
return prev1
```

## 5) Implementasi Final (Inti Saja)

```js
function rob(nums) {
  let prev2 = 0,
    prev1 = 0;
  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
```

## 6) Bukti Correctness (Wajib)

- Optimal for prefix up to i either excludes i (carry prev) or includes i forcing skip i-1.

## 7) Dry Run Singkat

- `[2,7,9,3,1]` → 12.

## 8) Red Flags (Yang Harus Dihindari)

- Greedy pick local max always — fails `[2,1,1,2]`.

## 9) Follow-up yang Sering Muncul

- House Robber II — circular array.

## 10) Trade-off Keputusan

- `dp` array if clarity over rolling — same O(n) space trade.

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
- Kejelasan penjelasan: 10/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: —

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: DP linear
- Inti masalah (1 kalimat): Max sum no two adjacent.
- Soal: Integer.
- Strategi final: max(skip, take+prev2)
- Kompleksitas: O(n), O(1)
- 2 edge case: one house; two houses
- 1 potensi bug: off-by-one on rolling vars
- 1 alasan valid: only previous two houses matter for constraint
