# Min Cost Climbing Stairs

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy / Medium
- **Topik utama:** Dynamic programming
- **Inti masalah:** `cost[i]` biaya melangkah **dari** i; mulai index 0 atau 1; boleh melangkah 1 atau 2; tujuan **melewati** teratas (posisi `n` di luar array). Minimalkan total biaya.

---

- Soal: `minCostClimbingStairs(cost)` int.
- Input: array length ≥2
- Output: minimum total
- Constraints utama: `dp[i] = cost[i] + min(dp[i-1], dp[i-2])` untuk mencapai i; jawaban `min(dp[n-1], dp[n-2])` atau set `dp[n]=0` top virtual step — variasi indexing.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Definisikan `dp[i]` = **minimum cost to reach step i** (sering diinterpretasi sampai **mendarat** di i). Rekursi: untuk mencapai `i`, datang dari `i-1` atau `i-2`: **`dp[i] = cost[i] + min(dp[i-1], dp[i-2])`**. Base `dp[0]=cost[0]`, `dp[1]=cost[1]` (atau 0 start depending definition). **Jawaban** = `min(dp[n-1], dp[n-2])` karena bisa finish dari dua terakhir ke atas. Rolling O(1) space `a,b`.

Struktur cepat:
- Observasi inti masalah: Optimal substructure from last two positions.
- Strategi final yang dipilih: Linear DP with min of two predecessors.
- Kenapa strategi ini paling cocok: Natural step transitions.
- Time complexity: O(n)
- Space complexity: O(1) rolling
- Edge case utama: length 2 minimal.

## 3) Versi Ultra Singkat (10-20 detik)

> `dp[i]=cost[i]+min(dp[i-1],dp[i-2])`; answer min last two.

## 4) Pseudocode Ringkas (5-10 baris)

```text
a = cost[0], b = cost[1]
for i from 2 to n-1:
  c = cost[i] + min(a, b)
  a, b = b, c
return min(a, b)
```

## 5) Implementasi Final (Inti Saja)

```js
function minCostClimbingStairs(cost) {
  let a = cost[0],
    b = cost[1];
  for (let i = 2; i < cost.length; i++) {
    const c = cost[i] + Math.min(a, b);
    a = b;
    b = c;
  }
  return Math.min(a, b);
}
```

## 6) Bukti Correctness (Wajib)

- Any path reaching end must come from one of last two stairs by allowed jumps; optimal substructure on linear chain.

## 7) Dry Run Singkat

- `[10,15,20]` → 15; `[1,100,1,1,1,100,1,1,100,1]` → 6.

## 8) Red Flags (Yang Harus Dihindari)

- Confusing whether pay cost when leaving vs arriving — keep definition consistent in recurrence.

## 9) Follow-up yang Sering Muncul

- Frogs jumping k steps—extend min window.

## 10) Trade-off Keputusan

- Top virtual step with cost 0 — alternative formulation.

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
- Catatan perbaikan: Align definition dengan contoh soal saat interview.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: DP
- Inti masalah (1 kalimat): Min cost to top with 1–2 jumps paying step cost.
- Soal: Min sum.
- Strategi final: Rolling min of two prev
- Kompleksitas: O(n), O(1)
- 2 edge case: two steps; long plateau
- 1 potensi bug: return last element not min last two
- 1 alasan valid: must arrive from n-1 or n-2 to finish
