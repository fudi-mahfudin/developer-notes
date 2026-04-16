# Subtree of Another Tree

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy / Medium
- **Topik utama:** Binary tree, recursion
- **Inti masalah:** `subRoot` adalah **subtree** dari `root` jika ada node di `root` yang subtree-nya identik dengan `subRoot` (struktur + nilai).

---

- Soal: `isSubtree(root, subRoot)` boolean.
- Input: dua trees
- Output: boolean
- Constraints utama: O(n×m) worst naive match; bisa **serialisasi + KMP/Rabin-Karp** O(n+m) advanced — untuk interview sering cukup DFS: di setiap node `root`, coba `isSame(r, subRoot)` seperti Same Tree.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): DFS + subtree compare

## 2) Jawaban Ideal Singkat (30-60 detik)

> Fungsi `isSame(a,b)` dari soal same tree. `isSubtree`: jika `isSame(root, subRoot)` true → true. Else `isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)`. **Perhatikan**: hindari duplicate full scan tanpa same — pola «equals» harus strict. Kompleksitas worst O(n×m) ketika many overlapping checks; merkle hashing can optimize on follow-up.

Struktur cepat:
- Observasi inti masalah: Subtree rooted at some node must fully match subRoot.
- Strategi final yang dipilih: DFS on root + isSame probe at each node.
- Kenapa strategi ini paling cocok: Clear for interview scope.
- Time complexity: O(n × m) worst-case typical solution
- Space complexity: O(n + m) recursion stack
- Edge case utama: subRoot null handling (often treated as true or per problem statement); empty trees.

## 3) Versi Ultra Singkat (10-20 detik)

> At each node if `isMatch(root, subRoot)` return true; else recurse children.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function same(a, b): ... // Same Tree
function isSubtree(root, sub):
  if root == null: return false
  if same(root, sub): return true
  return isSubtree(root.left, sub) or isSubtree(root.right, sub)
```

## 5) Implementasi Final (Inti Saja)

```js
function isSubtree(root, subRoot) {
  const same = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    return a.val === b.val && same(a.left, b.left) && same(a.right, b.right);
  };
  const dfs = (r) => {
    if (!r) return false;
    if (same(r, subRoot)) return true;
    return dfs(r.left) || dfs(r.right);
  };
  return dfs(root);
}
```

## 6) Bukti Correctness (Wajib)

- Soundness: Only returns true if some match found.
- Completeness: Checks every candidate root position in main tree.

## 7) Dry Run Singkat

- root contains embedded copy of subRoot → true.

## 8) Red Flags (Yang Harus Dihindari)

- Sequence inorder comparison only — fails different structures with same inorder.

## 9) Follow-up yang Sering Muncul

- Linear time with hashing—hash(node) = val + hash(children).

## 10) Trade-off Keputusan

- Simple DFS+match vs Merkle — complexity trade.

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
- Catatan perbaikan: Mention O(nm) if asked optimal.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: DFS + match
- Inti masalah (1 kalimat): Is subRoot identical subtree somewhere.
- Soal: Boolean.
- Strategi final: DFS + isSame
- Kompleksitas: O(nm) worst
- 2 edge case: subRoot larger; single node match
- 1 potensi bug: inorder-only hack
- 1 alasan valid: Brute placement of subtree root is exhaustive
