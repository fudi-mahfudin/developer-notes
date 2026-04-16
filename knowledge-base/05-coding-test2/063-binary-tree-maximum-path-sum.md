# Binary Tree Maximum Path Sum

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Binary tree DFS, glob max
- **Inti masalah:** **Path** = urutan node terhubung tanpa cabang berganda; bobot = jumlah `val`; bisa negatif; cari **jumlah maksimum**.

---

- Soal: `maxPathSum(root)` integer (path min satu node).
- Input: `TreeNode` dengan `val` integer
- Output: `number`
- Constraints utama: O(n); helper mengembalikan **max sum chain ke atas** dari subtree ke parent (satu sisi), sambil update answer dengan `left+right+val` through node dengan **max(0, child)** untuk tidak memaksa sum negatif.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `dfs(node)`: jika null return 0 untuk chain contribution. `gainL = max(dfs(left),0)`, `gainR = max(dfs(right),0)`. **Path melalui node** = `node.val + gainL + gainR` → update `ans`. **Return** ke parent: `node.val + max(gainL,gainR)` (hanya satu chain naik). Nilai negatif node tetap bisa jadi path tunggal karena kita max dengan child 0 but node itself always included in pass-through — per handle: return `node.val + max(0, max(L,R))` and local max considers full split. O(n).

Struktur cepat:
- Observasi inti masalah: Path either extends up through parent or forks at hub — global max picks best hub.
- Strategi final yang dipilih: Post-order with max gain upward vs best path through node.
- Kenapa strategi ini paling cocok: Linear single traversal.
- Time complexity: O(n)
- Space complexity: O(h)
- Edge case utama: All negative — answer largest single val; skewed tree.

## 3) Versi Ultra Singkat (10-20 detik)

> Post-order: best chain up = val + max child gain (>=0); ans = max(ans, val + both gains).

## 4) Pseudocode Ringkas (5-10 baris)

```text
ans = -infinity
function dfs(node):
  if node == null: return 0
  L = max(dfs(node.left), 0)
  R = max(dfs(node.right), 0)
  ans = max(ans, node.val + L + R)
  return node.val + max(L, R)
dfs(root)
return ans
```

## 5) Implementasi Final (Inti Saja)

```js
function maxPathSum(root) {
  let ans = -Infinity;
  function dfs(node) {
    if (!node) return 0;
    const L = Math.max(0, dfs(node.left));
    const R = Math.max(0, dfs(node.right));
    ans = Math.max(ans, node.val + L + R);
    return node.val + Math.max(L, R);
  }
  dfs(root);
  return ans;
}
```

## 6) Bukti Correctness (Wajib)

- Any optimal path has highest node as pivot — DFS processes pivot when left/right gains known.

## 7) Dry Run Singkat

- `[-10,9,20,null,null,15,7]` → 42.

## 8) Red Flags (Yang Harus Dihindari)

- Including both negative children when both reduce sum — `max(0, child)` fixes.

## 9) Follow-up yang Sering Muncul

- Path sum target count — different DP on prefix.

## 10) Trade-off Keputusan

- Global ans vs return tuple — same idea.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 10/10
- Catatan perbaikan: Trace all-negative list.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Tree max path
- Inti masalah (1 kalimat): Max sum any connected path.
- Soal: Integer.
- Strategi final: Post-order + max upward chain
- Kompleksitas: O(n), O(h)
- 2 edge case: all negative; linear tree
- 1 potensi bug: sum both children without max(0)
- 1 alasan valid: Every path has unique highest node as pivot
