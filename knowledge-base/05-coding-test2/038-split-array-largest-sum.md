# Split Array Largest Sum

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Binary search on answer
- **Inti masalah:** Bagi `nums` menjadi `k` subarray **kontigu** non-kosong; minimalkan **jumlah terbesar** di antara subarray (largest sum among k parts).

---

- Soal: Classic LC 410 — minimize largest sum when splitting into k contiguous parts.
- Input: `nums: number[]`, `k: number` (subarrays)
- Output: `number` minimized largest subarray sum
- Constraints utama: Same feasibility as ship packages: `can(mid)` = bisa memakai ≤ k−1 splits dengan semua part sum ≤ `mid`? Need `mid ≥ max(nums)` and `mid ≤ sum`.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Binary search + greedy count splits

## 2) Jawaban Ideal Singkat (30-60 detik)

> **Feasibility(`limit`)**: iterasi array; akumulasi `cur`; jika `cur + x > limit`, mulai segmen baru (splits++), `cur = x`. Akhirnya `splits+1` segments? Actually count pieces: start `pieces=1`, ketika overflow increment pieces. Return `pieces <= k`. Jika `pieces > k`, `limit` terlalu kecil. Binary search **minimal** `limit` di `[max(nums), sum(nums)]`. Identik dengan kapasitas kapal dengan `days = k` (jumlah segmen = k). O(n log sum).

Struktur cepat:
- Observasi inti masalah: Minimize max sum ≡ find smallest threshold so greedy uses at most k segments.
- Strategi final yang dipilih: BS on answer + greedy segment count.
- Kenapa strategi ini paling cocok: Monotonic predicate `can(limit)`.
- Time complexity: O(n × log(sum−max))
- Space complexity: O(1)
- Edge case utama: `k === nums.length` → answer `max(nums)`; `k=1` → `sum`.

## 3) Versi Ultra Singkat (10-20 detik)

> BS largest allowed sum; greedily count contiguous pieces; feasible if pieces ≤ k.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function pieces(limit):
  count = 1, cur = 0
  for x in nums:
    if cur + x > limit: count++; cur = x
    else: cur += x
  return count

binary search smallest limit in [max(nums), sum(nums)] with pieces(limit) <= k
```

## 5) Implementasi Final (Inti Saja)

```js
function splitArray(nums, k) {
  const can = (limit) => {
    let parts = 1,
      cur = 0;
    for (const x of nums) {
      if (cur + x > limit) {
        parts++;
        cur = x;
      } else cur += x;
      if (parts > k) return false;
    }
    return true;
  };
  let lo = Math.max(...nums),
    hi = nums.reduce((a, b) => a + b, 0);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (can(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: For a given limit, greedy packing into maximal segments under limit minimizes number of segments — if greedy uses >k segments, any arrangement must use ≥ that many (standard partition proof).
- Kenapa semua kasus valid tercakup: Monotonic BS on threshold.
- Kenapa tidak ada kasus yang terlewat: Answer lies in bracket by bounds.

## 7) Dry Run Singkat

- `nums=[7,2,5,10,8]`, `k=2` → `18`.

## 8) Red Flags (Yang Harus Dihindari)

- DP O(n²k) when BS acceptable for constraints.
- Confusing splits vs segments count.

## 9) Follow-up yang Sering Muncul

- Allocate minimum pages / book allocations — same pattern.

## 10) Trade-off Keputusan

- BS vs DP — BS O(n log range) often better for large n per constraints.

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
- Catatan perbaikan: Link mentally to «Painter's Partition».

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: BS on answer
- Inti masalah (1 kalimat): Minimize largest contiguous part sum with k−1 cuts.
- Soal: Min max sum.
- Strategi final: Greedy pieces + BS
- Kompleksitas: O(n log sum), O(1)
- 2 edge case: k equals n; k equals 1
- 1 potensi bug: off-by-one in segment count
- 1 alasan valid: Greedy minimizes segments under threshold
