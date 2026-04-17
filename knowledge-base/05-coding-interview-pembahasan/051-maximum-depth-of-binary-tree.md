# Maximum Depth of Binary Tree

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Binary tree DFS / BFS
- **Inti masalah:** Kedalaman = panjang path akar → daun terpanjang (jumlah node atau edge — biasa: **jumlah node** di LC untuk depth).

---

- Soal: `maxDepth(root)` return integer.
- Input: `TreeNode | null`
- Output: `number`
- Constraints utama: O(n) waktu, O(h) ruang rekursi (O(n) worst skewed).
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): Tree DFS

## 2) Jawaban Ideal Singkat (30-60 detik)

> Depth = 1 + max(depth kiri, depth kanan); basis `null` → 0. Satu post-order traversal. BFS level-order juga bisa: hitung jumlah level. O(n) seluruh node, O(h) stack DFS atau O(n) queue BFS worst width.

Struktur cepat:
- Observasi inti masalah: Optimal substructure on subtrees.
- Strategi final yang dipilih: Rekursi atau iterative queue by level.
- Kenapa strategi ini paling cocok: Linear dan satu baris intuisi.
- Time complexity: O(n)
- Space complexity: O(h) DFS stack
- Edge case utama: `root == null`; single node.

## 3) Versi Ultra Singkat (10-20 detik)

> `if !root return 0` else `1 + max(dfs(left), dfs(right))`.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function maxDepth(node):
  if node == null: return 0
  return 1 + max(maxDepth(node.left), maxDepth(node.right))
```

## 5) Implementasi Final (Inti Saja)

```js
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Depth defined recursively; max of child depths plus current level.
- Kenapa semua kasus valid tercakup: Every node visited once.
- Kenapa tidak ada kasus yang terlewat: Exhaustive recursion with base case null.

## 7) Dry Run Singkat

- Tree `3,9,null,20,15,7` → depth 3 (per LC definition).

## 8) Red Flags (Yang Harus Dihindari)

- Confusing depth vs height off-by-one with empty tree.
- Stack overflow on degenerate deep tree — mention iterative BFS if needed.

## 9) Follow-up yang Sering Muncul

- Minimum depth to leaf — different base case (must reach leaf).
- Diameter of tree — separate problem.

## 10) Trade-off Keputusan

- DFS O(h) space vs BFS O(w) width.

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
- Catatan perbaikan: Sebutkan definisi «num nodes» vs «edges» jika interviewer beda.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Tree DFS
- Inti masalah (1 kalimat): Longest root-to-leaf path length.
- Soal: Integer depth.
- Strategi final: Recursive max depth
- Kompleksitas: O(n), O(h)
- 2 edge case: null; skewed chain
- 1 potensi bug: return 0 vs 1 on empty confusion
- 1 alasan valid: Recursive definition of tree height
