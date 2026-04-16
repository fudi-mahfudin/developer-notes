# Capacity To Ship Packages Within D Days

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Binary search on answer
- **Inti masalah:** Muatan harus **tepat urutan** ke kapal; kapasitas harian `W` sama; minimalkan `W` sehingga pengiriman dalam `days` hari tepat.

---

- Soal: `weights` daily load must load consecutive prefixes per day without splitting an item; ship sum per day ≤ `W`.
- Input: `weights: number[]`, `days: number`
- Output: minimum `W`
- Constraints utama: `W` ∈ `[max(weights), sum(weights)]`; BS feasibility `shipDays(W)` counts days by greedy linear scan.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Binary search + greedy partition counting

## 2) Jawaban Ideal Singkat (30-60 detik)

> `daysNeeded(W)`: iterasi weights, akumulasi `cur`; jika `cur + w > W`, hari baru `days++`, `cur=w`, else `cur+=w`. Return true iff `daysNeeded(W) <= days`. **Monotonic**: kapasitas naik → hari tidak naik. Binary search **minimum** `W` di `[max(w), sum]`. O(n) check per mid, `log(sum)` iterations.

Struktur cepat:
- Observasi inti masalah: Min max subarray sum style — same as split array / koko eating pattern.
- Strategi final yang dipilih: BS + greedy day count.
- Kenapa strategi ini paling cocok: Feasibility check linear, search space bounded.
- Time complexity: O(n × log(sum−max)) approximately
- Space complexity: O(1)
- Edge case utama: `days === weights.length` → W=max(weights); one element per day.

## 3) Versi Ultra Singkat (10-20 detik)

> BS capacity; greedy count days for mid; find min W with days ≤ D.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function countDays(W):
  days = 1, cur = 0
  for w in weights:
    if cur + w > W: days++; cur = w
    else: cur += w
  return days

lo = max(weights), hi = sum(weights)
while lo < hi:
  mid = (lo + hi) / 2
  if countDays(mid) <= days: hi = mid
  else: lo = mid + 1
return lo
```

## 5) Implementasi Final (Inti Saja)

```js
function shipWithinDays(weights, days) {
  const needDays = (cap) => {
    let d = 1, cur = 0;
    for (const w of weights) {
      if (cur + w > cap) {
        d++;
        cur = w;
      } else cur += w;
    }
    return d;
  };
  let lo = Math.max(...weights);
  let hi = weights.reduce((a, b) => a + b, 0);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (needDays(mid) <= days) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Greedily packing earliest day uses minimum days for given W — partition must respect order, so greedy is optimal check (minimize number of day breaks for fixed W? Actually for fixed W greedy minimizes days used — standard).
- Kenapa semua kasus valid tercakup: Search range bracket includes true answer; monotonic feasibility.
- Kenapa tidak ada kasus yang terlewat: Standard lower_bound BS.

## 7) Dry Run Singkat

- `weights=[1,2,3,4,5,6,7,8,9,10]`, `days=5` → `15` (LC).

## 8) Red Flags (Yang Harus Dihindari)

- DP O(n² days) when BS works.
- Allowing reorder weights — against problem.

## 9) Follow-up yang Sering Muncul

- Split array largest sum — same code skeleton.

## 10) Trade-off Keputusan

- Greedy count days — proven minimal days for capacity constraint.

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
- Catatan perbaikan: Clarify greedy minimizes `#days` for fixed W.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: BS on answer
- Inti masalah (1 kalimat): Min ship capacity for D days in order.
- Soal: Min W.
- Strategi final: BS + greedy day count
- Kompleksitas: O(n log S), O(1)
- 2 edge case: D = len(weights); single weight
- 1 potensi bug: initialise cur wrong on new day
- 1 alasan valid: Larger W never increases days needed
