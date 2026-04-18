# Koko Eating Bananas

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Binary search on answer
- **Inti masalah:** Pilih kecepatan makan `k` pisang/jam (integer min 1) sehingga total jam ≤ `h`; minimalkan `k`.

---

- Soal: `piles[i]` pisang di tumpukan i; per jam hanya satu tumpukan; `ceil(piles[i]/k)` jam per tumpukan; total hour sum must be ≤ `h`.
- Input: `piles: number[]`, `h: number`
- Output: `number` minimum integer speed `k`
- Constraints utama: `k` in `[1, max(piles)]`; binary search O(n log max).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): BS on answer

## 2) Jawaban Ideal Singkat (30-60 detik)

> Fungsi `canFinish(k)` = Σ `ceil(pile/k)` ≤ `h` bersifat **monoton**: jika `k` lebih besar, total jam tidak naik. Jawaban = **minimum** `k` valid → binary search on range `[1, max(piles)]`. Untuk `canFinish`, akumulasi jam; `hours += Math.ceil(p / k)` atau `(p + k - 1) // k` integer safely. O(n) check per mid, ~log(max) iterasi.

Struktur cepat:
- Observasi inti masalah: Feasibility monotonic in k — classic search for min feasible.
- Strategi final yang dipilih: Binary search lowest k with `hours <= h`.
- Kenapa strategi ini paling cocok: Linear scan each guess; range bounded.
- Time complexity: O(n × log(max pile))
- Space complexity: O(1)
- Edge case utama: `h == piles.length` → k must be max pile; single pile.

## 3) Versi Ultra Singkat (10-20 detik)

> Binary search k from 1 to max pile; check total hours with ceiling division.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function hoursNeeded(k):
  sum = 0
  for p in piles: sum += ceil(p / k)
  return sum

left = 1, right = max(piles)
while left < right:
  mid = left + (right - left) / 2
  if hoursNeeded(mid) <= h: right = mid
  else: left = mid + 1
return left
```

## 5) Implementasi Final (Inti Saja)

```js
function minEatingSpeed(piles, h) {
  let lo = 1;
  let hi = Math.max(...piles);
  const need = (k) =>
    piles.reduce((s, p) => s + Math.ceil(p / k), 0);
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (need(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: If `k` works, any larger k works; if `k` fails, any smaller fails — total order for binary search on minimum.
- Kenapa semua kasus valid tercakup: `k` large enough always works (`k=max`), lower bound 1.
- Kenapa tidak ada kasus yang terlewat: Standard lower_bound BS template.

## 7) Dry Run Singkat

- `piles=[3,6,7,11]`, `h=8` → k=4 (LC).

## 8) Red Flags (Yang Harus Dihindari)

- Trying each k from 1 upward linear — O(max × n) can be huge.
- Using floating ceil wrong for big integers — use integer math `(p + k - 1) / k` for BigInt if needed.

## 9) Follow-up yang Sering Muncul

- Ship packages same pattern.
- Split array largest sum — same BS skeleton.

## 10) Trade-off Keputusan

- BS vs greedy — only BS for optimality here.

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
- Catatan perbaikan: Watch JS Math.ceil with huge numbers — overflow rare in LC constraints.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Binary search on answer
- Inti masalah (1 kalimat): Min eating speed to finish in h hours.
- Soal: Min k.
- Strategi final: BS + feasibility hours sum
- Kompleksitas: O(n log M), O(1)
- 2 edge case: h equals piles.length; one pile
- 1 potensi bug: wrong monotonic direction in BS
- 1 alasan valid: Higher k never increases hours needed
