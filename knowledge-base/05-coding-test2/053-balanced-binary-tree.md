# Balanced Binary Tree

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy / Medium
- **Topik utama:** Binary tree DFS
- **Inti masalah:** Pohon **seimbang** jika untuk setiap node, `|height(kiri) − height(kanan)| ≤ 1`.

---

- Soal: `isBalanced(root)` boolean.
- Input: `TreeNode | null`
- Output: `boolean`
- Constraints utama: Target O(n) — hindari hitung tinggi O(n) per node total **O(n²)**; gunakan **single pass** yang mengembalikan tinggi atau `-1` sentinel jika subtree tidak balance.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Helper `check(node)` → tinggi jika balanced, **-1** jika subtree tidak balance. Rekursi: `L = check(left)`, jika `-1` return `-1`; sama kanan; jika `|L-R|>1` return `-1`; else `1+max(L,R)`. Akhir `check(root) >= 0`. Satu traversal O(n).

Struktur cepat:
- Observasi inti masalah: Early exit with sentinel avoids repeated height computations.
- Strategi final yang dipilih: DFS dengan bubble up imbalance flag via -1 height.
- Kenapa strategi ini paling cocok: Optimal single pass.
- Time complexity: O(n)
- Space complexity: O(h)
- Edge case utama: null balanced; skewed chain invalid if height diff >1 at some ancestor.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS return height or -1 if subtree unbalanced; prune early.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function depth(node):
  if node == null: return 0
  L = depth(node.left)
  if L == -1: return -1
  R = depth(node.right)
  if R == -1: return -1
  if abs(L - R) > 1: return -1
  return 1 + max(L, R)

return depth(root) != -1
```

## 5) Implementasi Final (Inti Saja)

```js
function isBalanced(root) {
  function dfs(node) {
    if (!node) return 0;
    const L = dfs(node.left);
    if (L === -1) return -1;
    const R = dfs(node.right);
    if (R === -1) return -1;
    if (Math.abs(L - R) > 1) return -1;
    return 1 + Math.max(L, R);
  }
  return dfs(root) !== -1;
}
```

## 6) Bukti Correctness (Wajib)

- Invariant / alasan logika benar: Height well-defined iff subtrees balanced; -1 propagates any violation upward.
- Kenapa semua kasus valid tercakup: First violation short-circuits.
- Kenapa tidak ada kasus yang terlewat: Balance is local property checked at every node.

## 7) Dry Run Singkat

- `[1,2,2,3,3,null,null,4,4]` → false (LC example).

## 8) Red Flags (Yang Harus Dihindari)

- Naive: `height` function called per node — quadratic.

## 9) Follow-up yang Sering Muncul

- Other balance definitions — AVL rotations — beyond basic problem.

## 10) Trade-off Keputusan

- Sentinel -1 vs pair `{height, ok}` — same complexity.

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
- Catatan perbaikan: None critical.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: DFS prune
- Inti masalah (1 kalimat): Height diff at every node ≤ 1.
- Soal: Boolean.
- Strategi final: DFS -1 sentinel
- Kompleksitas: O(n), O(h)
- 2 edge case: empty tree; perfect tree
- 1 potensi bug: recompute height repeatedly
- 1 alasan valid: bubble imbalance -1 avoids O(n²)
