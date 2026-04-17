# Combination Sum II

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Backtracking, deduplikasi
- **Inti masalah:** Setiap angka dipakai **sekali per kombinasi**; **duplikat** dalam input dapat menghasilkan subset yang sama — sort + skip **neighbor sama** pada level yang sama.

---

- Soal: `combinationSum2(candidates, target)` unique combinations sum to target.
- Input: array (may contain duplicates), target
- Output: array of arrays
- Constraints utama: Sort dulu; pada loop DFS level, `if (i > start && candidates[i] === candidates[i-1]) skip`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Sort `candidates`. DFS(`start`, `remain`): untuk `i` dari `start..`, skip jika `i>start && cand[i]==cand[i-1]` untuk menghindari duplicate branch pada **kedalaman yang sama**. Pilih `cand[i]`, lanjut `dfs(i+1, remain-c[i])` — satu-kali pakai. `remain<0` prune. Mirip subset sum dengan dedup. O(2^n) worst.

Struktur cepat:
- Observasi inti masalah: Duplikat input membuat tree search berulang tanpa skip.
- Strategi final yang dipilih: Sort + skip sibling duplicates.
- Kenapa strategi ini paling cocok: Standard pattern for Combination Sum II.
- Time complexity: O(2^n) worst
- Space complexity: O(n) recursion path
- Edge case utama: banyak duplikat; tidak ada jawaban.

## 3) Versi Ultra Singkat (10-20 detik)

> Sort; DFS; skip equal neighbors at same depth; next index i+1.

## 4) Pseudocode Ringkas (5-10 baris)

```text
sort candidates
function dfs(start, remain, path):
  if remain == 0: save path; return
  if remain < 0: return
  for i in start..n-1:
    if i > start and cand[i] == cand[i-1]: continue
    path.push(cand[i])
    dfs(i+1, remain - cand[i], path)
    path.pop()
```

## 5) Implementasi Final (Inti Saja)

```js
function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const res = [],
    path = [];
  const dfs = (start, remain) => {
    if (remain === 0) {
      res.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      if (candidates[i] > remain) break;
      path.push(candidates[i]);
      dfs(i + 1, remain - candidates[i]);
      path.pop();
    }
  };
  dfs(0, target);
  return res;
}
```

## 6) Bukti Correctness (Wajib)

- Ordered exploration with skip guarantees each multiset subset chosen once.

## 7) Dry Run Singkat

- `[10,1,2,7,6,1,5]`, target `8` → unique pairs avoiding duplicate `1`s paths.

## 8) Red Flags (Yang Harus Dihindari)

- Same as Combination Sum I reuse index — wrong for one-use-each.

## 9) Follow-up yang Sering Muncul

- Subset sum II — same dedup idea.

## 10) Trade-off Keputusan

- Visited boolean per index worse than sorted skip pattern.

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
- Catatan perbaikan: Jelaskan bedanya «skip at same level» vs «skip forever».

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Backtracking + dedup
- Inti masalah (1 kalimat): Each number once; duplicate input values.
- Soal: Unique combo lists.
- Strategi final: Sort + sibling skip
- Kompleksitas: O(2^n) rough
- 2 edge case: all duplicates; multiple equal sums
- 1 potensi bug: skip i>start logic wrong
- 1 alasan valid: duplicates only rebranch from different first pick index
