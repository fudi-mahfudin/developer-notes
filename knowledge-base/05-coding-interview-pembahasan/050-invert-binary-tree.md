# Invert Binary Tree

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Binary tree traversal, recursion / BFS
- **Inti masalah:** Swap `left` dan `right` untuk **setiap** node (mirror tree).

---

- Soal: `invertTree(root)` return new root same structure mirrored.
- Input: `TreeNode` or null
- Output: root of inverted tree (in-place mutation typical)
- Constraints utama: O(n) nodes visit; O(h) stack recursion depth vs O(n) queue BFS.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): DFS / BFS

## 2) Jawaban Ideal Singkat (30-60 detik)

> **DFS**: jika `node` null return; `swap(node.left, node.right)`; recurse `invert(node.left)`; `invert(node.right)`; return `node`. **BFS**: queue nodes; dequeue; swap children; enqueue non-null children. Tree mirror invariant preserved recursively. O(n) time, O(h) recursion stack (worst skewed O(n)).

Struktur cepat:
- Observasi inti masalah: Mirror = local swap at every subtree root with recursive structure unchanged except swapped pointers.
- Strategi final yang dipilih: Post/pre order DFS or level BFS — all fine.
- Kenapa strategi ini paling cocok: Simple correctness proof; famous interview meme «Google refused homebrew» 😉
- Time complexity: O(n)
- Space complexity: O(h) stack recursive; O(n) worst queue width
- Edge case utama: null root; single node; full tree.

## 3) Versi Ultra Singkat (10-20 detik)

> Recurse: swap left/right pointers at each node, then invert subtrees.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function invert(node):
  if node == null: return null
  swap(node.left, node.right)
  invert(node.left)
  invert(node.right)
  return node
```

## 5) Implementasi Final (Inti Saja)

```js
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  return root;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Structural induction — mirrored subtrees with swapped pointers at root yields global mirror.
- Kenapa semua kasus valid tercakup: DFS visits each node exactly once performing swap.
- Kenapa tidak ada kasus yang terlewat: Base case null stops recursion correctly.

## 7) Dry Run Singkat

- Small tree depth 2 — draw before/after mirror.

## 8) Red Flags (Yang Harus Dihindari)

- Rebuilding new tree unnecessarily when in-place requested.
- Swapping values instead of pointers (wrong for structural invert).

## 9) Follow-up yang Sering Muncul

- Symmetric tree check — similar traversal compare.

## 10) Trade-off Keputusan

- Recursive vs iterative queue — recursion shorter for balanced, iterative avoids deep stack issues.

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
- Catatan perbaikan: Optional iterative for enterprise stack limits.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Tree DFS
- Inti masalah (1 kalimat): Mirror binary tree in-place.
- Soal: New root (same object).
- Strategi final: swap children + recurse
- Kompleksitas: O(n) time, O(h) stack
- 2 edge case: null; one child only
- 1 potensi bug: forget to return root
- 1 alasan valid: Induction on subtrees after local swap
