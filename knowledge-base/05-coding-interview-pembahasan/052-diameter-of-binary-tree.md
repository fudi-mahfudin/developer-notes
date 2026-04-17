# Diameter of Binary Tree

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy / Medium
- **Topik utama:** Binary tree, DFS post-order
- **Inti masalah:** Diameter = **jumlah edge** pada path terpanjang antar dua node (boleh tidak melalui root), di pohon biner.

---

- Soal: `diameterOfBinaryTree(root)` return int.
- Input: `TreeNode | null`
- Output: `number` (edges count di LC)
- Constraints utama: O(n) satu DFS; gunakan helper yang mengembalikan **height** sambil update `diameter = max(diameter, leftH + rightH)`.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): DFS post-order

## 2) Jawaban Ideal Singkat (30-60 detik)

> Untuk tiap node, path terpanjang yang melewati node = `height(left) + height(right)` (dalam edge). Traverse post-order: komputasi `height` bottom-up; `ans = max(ans, leftH + rightH)`. Return `height = 1 + max(leftH, rightH)`. Variabel `ans` by reference atau closure. O(n), O(h) stack.

Struktur cepat:
- Observasi inti masalah: Best path through node uses tallest arm each side.
- Strategi final yang dipilih: Single DFS menghitung height + diameter global max.
- Kenapa strategi ini paling cocok: Each node processed once; combines subtree info.
- Time complexity: O(n)
- Space complexity: O(h)
- Edge case utama: null; two nodes only.

## 3) Versi Ultra Singkat (10-20 detik)

> Post-order: diameter candidate at each node = left height + right height; track global max.

## 4) Pseudocode Ringkas (5-10 baris)

```text
ans = 0
function height(node):
  if node == null: return 0
  L = height(node.left)
  R = height(node.right)
  ans = max(ans, L + R)
  return 1 + max(L, R)
return height(root), ans
```

## 5) Implementasi Final (Inti Saja)

```js
function diameterOfBinaryTree(root) {
  let ans = 0;
  function height(node) {
    if (!node) return 0;
    const L = height(node.left);
    const R = height(node.right);
    ans = Math.max(ans, L + R);
    return 1 + Math.max(L, R);
  }
  height(root);
  return ans;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Any longest path has a unique «highest» node (LCA of its endpoints): diameter through that node captured when processing it.
- Kenapa semua kasus valid tercakup: Every node considered as hub.
- Kenapa tidak ada kasus yang terlewat: Max over all nodes equals tree diameter.

## 7) Dry Run Singkat

- `1,2,3,4,5` example — verify ans counts edges.

## 8) Red Flags (Yang Harus Dihindari)

- Counting nodes instead of edges if problem states edges.
- Recomputing height repeatedly O(n²).

## 9) Follow-up yang Sering Muncul

- Weighted edges — DFS with weights.

## 10) Trade-off Keputusan

- One DFS vs two pass height — one pass optimal.

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
- Catatan perbaikan: Confirm edge vs node count with examples.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Tree DFS
- Inti masalah (1 kalimat): Longest path between any two nodes (edge count).
- Soal: Integer diameter.
- Strategi final: Post-order height + max L+R
- Kompleksitas: O(n), O(h)
- 2 edge case: null; two nodes
- 1 potensi bug: off-by-one nodes vs edges
- 1 alasan valid: LCA hub enumeration covers all simple paths in tree
