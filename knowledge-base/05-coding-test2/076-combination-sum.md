# Combination Sum

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Backtracking
- **Inti masalah:** `candidates` **unik** positif; pilih boleh **ulang**; jumlah tepat `target`; semua kombinasi **unik multiset** (urutan tidak menggandakan — biasanya indeks naik untuk hindari permutasi).

---

- Soal: `combinationSum(candidates, target)` → array of arrays.
- Input: `number[]`, `target`
- Output: semua kombinasi yang berjumlah `target`
- Constraints utama: Sort opsional; DFS `start` index agar tidak recount permutasi.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Backtracking

## 2) Jawaban Ideal Singkat (30-60 detik)

> DFS dari `start`: untuk `i` dari `start` sampai akhir, `push candidates[i]`, `remain = target - val`; jika `remain < 0` break (jika sorted); jika `remain === 0` simpan salinan path; else rekurs `dfs(remain, i)` — **i** sama karena boleh pakai lagi elemen sama. Backtrack `pop`. Tanpa sort tetap benar jika hati-hati. O(2^k) style bound, output bisa besar.

Struktur cepat:
- Observasi inti masalah: Unbounded knapsack-style unrepeat permutations via ordered indices.
- Strategi final yang dipilih: Backtrack dengan `start` indeks.
- Kenapa strategi ini paling cocok: Natural enumeration dengan pruning.
- Time complexity: eksponensial dalam worst (banyak solusi)
- Space complexity: O(target/min) depth untuk rekursi + path
- Edge case utama: `target` tercapai dengan satu angka berulang; tidak ada solusi → `[]`.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS + start index; subtract candidate; reuse same index; backtrack.

## 4) Pseudocode Ringkas (5-10 baris)

```text
ans = []
function dfs(start, remain, path):
  if remain == 0: ans.append(copy(path)); return
  if remain < 0: return
  for i from start to n-1:
    path.push(candidates[i])
    dfs(i, remain - candidates[i], path)
    path.pop()
dfs(0, target, [])
return ans
```

## 5) Implementasi Final (Inti Saja)

```js
function combinationSum(candidates, target) {
  const res = [];
  const path = [];
  const dfs = (start, remain) => {
    if (remain === 0) {
      res.push([...path]);
      return;
    }
    if (remain < 0) return;
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      dfs(i, remain - candidates[i]);
      path.pop();
    }
  };
  dfs(0, target);
  return res;
}
```

## 6) Bukti Correctness (Wajib)

- Partisi berdasarkan indeks non-decreasing mencegah duplicate permutation; reuse indeks sama mencakup pengulangan angka.

## 7) Dry Run Singkat

- `candidates = [2,3,6,7]`, `target = 7` → `[[7],[2,2,3]]`.

## 8) Red Flags (Yang Harus Dihindari)

- Set ke visited per depth lalu keliru melarang reuse angka yang sama.

## 9) Follow-up yang Sering Muncul

- Combination Sum IV — urutan dihitung (DP count) berbeda soal.

## 10) Trade-off Keputusan

- Sort + early break jika `candidates[i] > remain` — pruning.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 8/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Latih kompleksitas kasar untuk jumlah solusi besar.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Backtracking
- Inti masalah (1 kalimat): Unbounded reuse, unique combinations by index order.
- Soal: List of lists.
- Strategi final: DFS start index + backtrack
- Kompleksitas: eksponensial output-bound
- 2 edge case: target equals one candidate; impossible
- 1 potensi bug: use i+1 and forbid duplicate use wrong for this variant
- 1 alasan valid: nondecreasing index prevents permutation duplicates
