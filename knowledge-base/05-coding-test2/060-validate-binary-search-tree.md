# Validate Binary Search Tree

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** BST, DFS bounds
- **Inti masalah:** BST iff untuk setiap node nilai dalam **rentang (low, high)** terbuka/tertutup konsisten — **bukan** cukup `node.left.val < node.val < node.right.val` (perlu batas global).

---

- Soal: `isValidBST(root)` boolean.
- Input: `TreeNode | null`
- Output: `boolean`
- Constraints utama: O(n); pass `(min, max)` bounds; watch **Number** equality and edge `MIN_SAFE_INTEGER` issues — use `null` bound or BigInt if needed.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `dfs(node, lo, hi)`: null → true. Jika `node.val <= lo` atau `>= hi` (sesuai strictness) → false. Return `dfs(left, lo, node.val)` && `dfs(right, node.val, hi)`. Awal `(-∞, +∞)` — di JS pakai `null` atau `Number.NEGATIVE_INFINITY`. **Alternatif**: inorder traversal cek **strictly increasing** (handle duplicates policy).

Struktur cepat:
- Observasi inti masalah: BST property is **global** ordering, not local triple.
- Strategi final yang dipilih: DFS dengan interval bounds atau inorder prev pointer.
- Kenapa strategi ini paling cocok: O(n) single pass, O(h) stack.
- Time complexity: O(n)
- Space complexity: O(h)
- Edge case utama: `[5,4,null,null,6,3,7]` invalid — local OK global bad; duplicates `[1,1]` policy.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS with (min,max) per subtree; or inorder must be strictly increasing.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function valid(node, lo, hi):
  if node == null: return true
  if (lo != null and node.val <= lo) return false
  if (hi != null and node.val >= hi) return false
  return valid(node.left, lo, node.val) and valid(node.right, node.val, hi)
```

*(Untuk strict left<node<right gunakan ≤ sesuai spesifikasi duplicate handling LC.)*

## 5) Implementasi Final (Inti Saja)

```js
function isValidBST(root) {
  function dfs(node, lo, hi) {
    if (!node) return true;
    if ((lo !== null && node.val <= lo) || (hi !== null && node.val >= hi))
      return false;
    return dfs(node.left, lo, node.val) && dfs(node.right, node.val, hi);
  }
  return dfs(root, null, null);
}
```

*(LC allows duplicates in left/right with <= / >= — adjust comparisons if inclusive BST variant.)*

## 6) Bukti Correctness (Wajib)

- Bounds propagate full ancestor constraints; equivalent to defining BST recursively.

## 7) Dry Run Singkat

- Invalid local OK tree above → false.

## 8) Red Flags (Yang Harus Dihindari)

- Naive local min/max only checking immediate children.

## 9) Follow-up yang Sering Muncul

- Recover BST by swapping two wrong nodes — advanced.

## 10) Trade-off Keputusan

- Bounds vs inorder — both O(n); inorder may need stack for iterative Morris optional.

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
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Verify duplicate policy on LC statement.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: BST validation
- Inti masalah (1 kalimat): Global BST bounds not local compare.
- Soal: Boolean.
- Strategi final: DFS (lo,hi) or inorder
- Kompleksitas: O(n), O(h)
- 2 edge case: min/max int boundary; duplicate nodes
- 1 potensi bug: only compare with parent
- 1 alasan valid: Interval nesting encodes all ancestor constraints
