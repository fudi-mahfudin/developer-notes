# Binary Tree Right Side View

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** BFS / DFS (level + preorder)
- **Inti masalah:** Tampilan dari **kanan** = ambil **node terkanan tiap level** (jika tidak ada kanan, node kiri paling kanan visible).

---

- Soal: `rightSideView(root)` return `number[]` (values right-to-left visibility).
- Input: `TreeNode | null`
- Output: satu node per depth dalam urutan top→bottom.
- Constraints utama: O(n); BFS ambil last each level **ata** preorder DFS `depth` first visit right then left, record first seen per depth.

## 2) Jawaban Ideal Singkat (30-60 detik)

> **DFS**: `dfs(node, depth)` — proses **kanan dulu** lalu kiri: `if depth === ans.length` push `node.val` (first node encountered at this depth is rightmost). **BFS**: level order, ambil elemen **terakhir** tiap row. Keduanya O(n).

Struktur cepat:
- Observasi inti masalah: Rightmost visible = last node in level traversal left-to-right OR first in right-first preorder per depth.
- Strategi final yang dipilih: DFS right-first or BFS last-of-level.
- Kenapa strategi ini paling cocok: Single pass, clear invariant.
- Time complexity: O(n)
- Space complexity: O(h) DFS, O(w) BFS queue
- Edge case utama: skewed left spine — still one node per level from side view (rightmost available).

## 3) Versi Ultra Singkat (10-20 detik)

> DFS: visit right child before left; append value when entering new depth.

## 4) Pseudocode Ringkas (5-10 baris)

```text
ans = []
function dfs(node, d):
  if node == null: return
  if d == len(ans): ans.append(node.val)
  dfs(node.right, d + 1)
  dfs(node.left, d + 1)
dfs(root, 0)
return ans
```

## 5) Implementasi Final (Inti Saja)

```js
function rightSideView(root) {
  const ans = [];
  function dfs(node, d) {
    if (!node) return;
    if (d === ans.length) ans.push(node.val);
    dfs(node.right, d + 1);
    dfs(node.left, d + 1);
  }
  dfs(root, 0);
  return ans;
}
```

## 6) Bukti Correctness (Wajib)

- First node visited at depth d when preferring right subtree always is rightmost node at that level in original tree.

## 7) Dry Run Singkat

- `[1,2,3,null,5,null,4]` → `[1,3,4]` per LC.

## 8) Red Flags (Yang Harus Dihindari)

- Taking only leaves — wrong; need level rightmost, not necessarily leaf.

## 9) Follow-up yang Sering Muncul

- Left view — swap order left-first.

## 10) Trade-off Keputusan

- BFS last element vs DFS — both fine.

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
- Catatan perbaikan: —

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: DFS preorder order
- Inti masalah (1 kalimat): Rightmost node per level from perspective.
- Soal: Array top to bottom.
- Strategi final: Right-first DFS depth check
- Kompleksitas: O(n), O(h)
- 2 edge case: null; left-only chain
- 1 potensi bug: use left-first by mistake
- 1 alasan valid: First hit per depth with right-priority is rightmost in level order
