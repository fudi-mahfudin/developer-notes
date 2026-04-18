# Climbing Stairs

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Dynamic programming (Fibonacci)
- **Inti masalah:** Naik anak tangga `n` langkah; tiap gerak **1 atau 2** langkah; berapa cara berbeda?

---

- Soal: `climbStairs(n)` int.
- Input: `n` positif (biasanya 1..45)
- Output: jumlah cara
- Constraints utama: O(n) waktu O(1) ruang rolling — `f(n)=f(n-1)+f(n-2)`, base `f(1)=1`, `f(2)=2`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Relasi sama Fibonacci bergeser: mencapai anak ke-`n` bisa dari `n-1` (+1) atau `n-2` (+2). **`dp[n] = dp[n-1] + dp[n-2]`** dengan `dp[1]=1`, `dp[2]=2`. Space-optimized: `a,b = b, a+b` iterate `n-1` times dari base. O(n) time O(1) space.

Struktur cepat:
- Observasi inti masalah: Overlapping subproblems optimal sum of last two ways.
- Strategi final yang dipilih: Linear DP or matrix exponentiation optional.
- Kenapa strategi ini paling cocok: Trivial after recurrence.
- Time complexity: O(n) or O(log n) with fast doubling rare
- Space complexity: O(1) rolling
- Edge case utama: n=1,2.

## 3) Versi Ultra Singkat (10-20 detik)

> Fibonacci-like: ways(n)=ways(n-1)+ways(n-2); base cases 1 and 2.

## 4) Pseudocode Ringkas (5-10 baris)

```text
if n <= 2: return n
a, b = 1, 2
repeat n-2 times:
  a, b = b, a + b
return b
```

## 5) Implementasi Final (Inti Saja)

```js
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1,
    b = 2;
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```

## 6) Bukti Correctness (Wajib)

- Last step either 1 or 2 uniquely partitions paths ⇒ recurrence count.

## 7) Dry Run Singkat

- n=5 → 8.

## 8) Red Flags (Yang Harus Dihindari)

- Recursion without memo exponential time.

## 9) Follow-up yang Sering Muncul

- Min cost climbing stairs — weights on steps (next problem).

## 10) Trade-off Keputusan

- Full array `dp[0..n]` if need reconstruct — not needed here.

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

- Tingkat kesulitan: Easy
- Topik utama: DP linear
- Inti masalah (1 kalimat): Count paths 1-or-2 steps to top.
- Soal: Integer.
- Strategi final: Fibonacci recurrence
- Kompleksitas: O(n), O(1)
- 2 edge case: n=1; n=2
- 1 potensi bug: wrong base cases
- 1 alasan valid: partition by last move size
