# Construct Binary Tree from Preorder and Inorder Traversal

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium / Hard
- **Topik utama:** Divide & conquer, hash map
- **Inti masalah:** `preorder` = root → kiri → kanan; `inorder` = kiri → root → kanan. Root preorder[0] membagi `inorder` menjadi subtree kiri dan kanan.

---

- Soal: `buildTree(preorder, inorder)` return `TreeNode`.
- Input: dua array sama panjang, unik elements typical
- Output: reconstructed root
- Constraints utama: O(n) dengan map `value → indexInInorder` untuk partisi O(1).

## 2) Jawaban Ideal Singkat (30-60 detik)

> Root selalu `preorder[preStart]`. Temukan `rootIndex` di inorder via `Map`. Ukuran kiri = `leftLen = rootIndex - inStart`. Rekursi: `build(preStart+1, ...)` kiri dengan inorder `[inStart, rootIndex-1]`; kanan `preStart+1+leftLen` dengan inorder `[rootIndex+1, inEnd]`. Base jika `inStart > inEnd` → null. Satu map indeks inorder. O(n) waktu.

Struktur cepat:
- Observasi inti masalah: Inorder partition uniquely defines left/right subtrees sizes.
- Strategi final yang dipilih: Divide & conquer with index ranges + hash map.
- Kenapa strategi ini paling cocok: Each node once; linear with map.
- Time complexity: O(n)
- Space complexity: O(n) map + O(h) stack
- Edge case utama: single node; skewed tree.

## 3) Versi Ultra Singkat (10-20 detik)

> preorder[0] = root; find in inorder; recurse left and right subranges.

## 4) Pseudocode Ringkas (5-10 baris)

```text
map = value -> index in inorder
function build(pL, pR, iL, iR):
  if pL > pR or iL > iR: return null
  rootVal = preorder[pL]
  i = map[rootVal]
  leftSize = i - iL
  root = new Node(rootVal)
  root.left = build(pL+1, pL+leftSize, iL, i-1)
  root.right = build(pL+leftSize+1, pR, i+1, iR)
  return root
```

## 5) Implementasi Final (Inti Saja)

```js
function buildTree(preorder, inorder) {
  const idx = new Map();
  inorder.forEach((v, i) => idx.set(v, i));
  let pre = 0;
  function dfs(lo, hi) {
    if (lo > hi) return null;
    const val = preorder[pre++];
    const i = idx.get(val);
    return {
      val,
      left: dfs(lo, i - 1),
      right: dfs(i + 1, hi),
    };
  }
  return dfs(0, inorder.length - 1);
}
```

## 6) Bukti Correctness (Wajib)

- Inductive: Root splits inorder uniquely; preorder segments align with subtree sizes by definition of traversals.

## 7) Dry Run Singkat

- `pre=[3,9,20,15,7]`, `in=[9,3,15,20,7]`.

## 8) Red Flags (Yang Harus Dihindari)

- Wrong slice length for preorder right child offset.

## 9) Follow-up yang Sering Muncul

- Post + Inorder — similar with root from post end.

## 10) Trade-off Keputusan

- Map vs linear search cut — map required for O(n).

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
- Catatan perbaikan: Latih variasi dengan rentang preorder eksplisit (`leftLen`) atau pointer `preIdx` — keduanya benar.
</think>
Memperbaiki implementasi `062` agar indeks preorder benar, lalu menulis file `063`–`075`.

<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
StrReplace