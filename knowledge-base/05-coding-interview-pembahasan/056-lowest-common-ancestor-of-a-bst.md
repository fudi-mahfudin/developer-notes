# Lowest Common Ancestor of a BST

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy / Medium
- **Topik utama:** Binary search tree properties
- **Inti masalah:** Diberi BST dan dua node `p`, `q` (nilai unik), LCA = node terdalam yang merupakan ancestor keduanya — manfaat properti `left < root < right`.

---

- Soal: `lowestCommonAncestor(root, p, q)` return `TreeNode`.
- Input: BST root, two nodes guaranteed in tree
- Output: LCA node
- Constraints utama: O(h) waktu — satu jalur dari root; `p,q` bisa ditukar.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): BST walk

## 2) Jawaban Ideal Singkat (30-60 detik)

> Mulai dari `root`: jika **keduanya** lebih kecil dari `root.val` → LCA di **kiri**; jika keduanya lebih besar → **kanan**; jika `p` dan `q` **terpisah** di kedua sisi root (atau salah satu sama dengan root) → `root` adalah LCA. Satu loop pointer O(h). Rekursif setara.

Struktur cepat:
- Observasi inti masalah: BST order splits search space; first node where values diverge across subtrees is LCA.
- Strategi final yang dipilih: Iteratif while node not between p,q values inclusively in BST sense.
- Kenapa strategi ini paling cocok: No parent pointers needed — structure sufficient.
- Time complexity: O(h) average, O(n) skewed worst
- Space complexity: O(1) iterative
- Edge case utama: `p` ancestor of `q`; equal values not in standard BST.

## 3) Versi Ultra Singkat (10-20 detik)

> Walk BST: go left if both smaller, right if both larger; else current is LCA.

## 4) Pseudocode Ringkas (5-10 baris)

```text
cur = root
while cur:
  if p.val < cur.val and q.val < cur.val: cur = cur.left
  else if p.val > cur.val and q.val > cur.val: cur = cur.right
  else: return cur
```

## 5) Implementasi Final (Inti Saja)

```js
function lowestCommonAncestor(root, p, q) {
  let cur = root;
  while (cur) {
    if (p.val < cur.val && q.val < cur.val) cur = cur.left;
    else if (p.val > cur.val && q.val > cur.val) cur = cur.right;
    else return cur;
  }
}
```

## 6) Bukti Correctness (Wajib)

- Invariant: Remaining subtree always contains both p and q until split; split node must be LCA in BST.

## 7) Dry Run Singkat

- Standard LC BST example with p=2,q=8 → ancestor 6.

## 8) Red Flags (Yang Harus Dihindari)

- Running parent pointer / DFS when BST property gives O(h) simpler.

## 9) Follow-up yang Sering Muncul

- LCA on **binary tree** not BST — need parent map or post-order return.

## 10) Trade-off Keputusan

- Iterative vs recursive — both O(h).

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
- Catatan perbaikan: Handle p,q order-agnostic explicit.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: BST
- Inti masalah (1 kalimat): LCA using BST ordering.
- Soal: LCA node.
- Strategi final: One pointer descent
- Kompleksitas: O(h), O(1)
- 2 edge case: one node is root; p q in same subtree deep
- 1 potensi bug: strict < vs ≤ depending duplicates policy
- 1 alasan valid: First divergence point is deepest common ancestor
