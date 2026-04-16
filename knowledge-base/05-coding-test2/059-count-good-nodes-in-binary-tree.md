# Count Good Nodes in Binary Tree

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** DFS, path max prefix
- **Inti masalah:** Node **baik** jika nilainya ≥ **semua** nilai pada path dari root ke node tersebut (inklusif dirinya).

---

- Soal: `goodNodes(root)` return count.
- Input: `TreeNode | null`
- Output: `number`
- Constraints utama: O(n); carry `maxSoFar` down DFS.

## 2) Jawaban Ideal Singkat (30-60 detik)

> DFS(`node`, `mx`): jika `!node` return 0. `curMx = max(mx, node.val)`; `add = node.val >= mx ? 1 : 0` (atau compare sebelum update per spec — LC: **≥ max on path before including current** varies; standard: track max of ancestors **excluding** current then check `node.val >= that max`, atau simplifikasi: pass max including path — so good if `node.val >= maxSoFarFromParent` dengan `maxSoFar` update include current for children). **LC def**: good if ≥ all **previous** on path — typically `if (node.val >= mx) cnt++` dengan `mx = max(mx, node.val)` before children using updated mx for downward semantics — verify: count node if node.val ≥ max value seen **from root to parent**; then update max including self for recursion.

Struktur cepat:
- Observasi inti masalah: Path max can be tracked in O(1) extra per step.
- Strategi final yang dipilih: DFS with running max.
- Kenapa strategi ini paling cocok: One pass.
- Time complexity: O(n)
- Space complexity: O(h)
- Edge case utama: negative values still work with `mx` initialized `-Infinity` or `root.val`.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS pass running max on path; +1 if current ≥ running max before merge (per problem) — LC: count if `val >= max_so_far` where max_so_far from root to parent.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function dfs(node, hi):
  if node == null: return 0
  nextHi = max(hi, node.val)
  good = 1 if node.val >= hi else 0   // hi = max on path from root to parent
  return good + dfs(node.left, nextHi) + dfs(node.right, nextHi)
return dfs(root, -infinity)
```

## 5) Implementasi Final (Inti Saja)

```js
function goodNodes(root) {
  function dfs(node, maxOnPath) {
    if (!node) return 0;
    const good = node.val >= maxOnPath ? 1 : 0;
    const next = Math.max(maxOnPath, node.val);
    return good + dfs(node.left, next) + dfs(node.right, next);
  }
  return dfs(root, -Infinity);
}
```

## 6) Bukti Correctness (Wajib)

- Path max from root to parent determines goodness; DFS visits each node exactly once with correct `maxOnPath` invariant.

## 7) Dry Run Singkat

- Example tree [3,1,4,3,null,1,5] → 4 good nodes (LC).

## 8) Red Flags (Yang Harus Dihindari)

- Comparing only to parent value, not full path max.

## 9) Follow-up yang Sering Muncul

- Good paths in grid — similar prefix max on paths.

## 10) Trade-off Keputusan

- DFS only — BFS also works with same state.

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
- Catatan perbaikan: Re-read LC line about inclusive comparison.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: DFS path max
- Inti masalah (1 kalimat): Count nodes not smaller than any ancestor.
- Soal: Count.
- Strategi final: DFS + running max
- Kompleksitas: O(n), O(h)
- 2 edge case: all decreasing; all same
- 1 potensi bug: wrong inclusive boundary
- 1 alasan valid: Path max propagates correctly along DFS
