# Same Tree

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Easy
- **Topik utama:** Binary tree recursion
- **Inti masalah:** Dua pohon **struktur dan nilai** identik?

---

- Soal: `isSameTree(p, q)` boolean.
- Input: dua `TreeNode | null`
- Output: `boolean`
- Constraints utama: O(min(n,m)) nodes comparison; O(h) stack.
- Pattern utama (Array / HashMap / Two Pointers / DP / Graph / dll): DFS preorder sync

## 2) Jawaban Ideal Singkat (30-60 detik)

> Keduanya null → true. Satu null → false. Nilai beda → false. Rekursi `left same` dan `right same`. Urutan: nilai di node ini lalu subtree — preorder pas untuk «same». Iteratif bisa pakai dua stack queue parallel.

Struktur cepat:
- Observasi inti masalah: Structural equality recursive definition.
- Strategi final yang dipilih: Simultaneous DFS.
- Kenapa strategi ini paling cocok: Natural one-to-one walk.
- Time complexity: O(n)
- Space complexity: O(h)
- Edge case utama: both null; one-sided missing child differs structure.

## 3) Versi Ultra Singkat (10-20 detik)

> Base null checks and val match; recurse left and right.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function same(a, b):
  if a == null and b == null: return true
  if a == null or b == null: return false
  if a.val != b.val: return false
  return same(a.left, b.left) and same(a.right, b.right)
```

## 5) Implementasi Final (Inti Saja)

```js
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

## 6) Bukti Correctness (Wajib)

- Inductive: trees same iff roots match and left subtrees same and right subtrees same.

## 7) Dry Run Singkat

- `[1,2,3]` vs `[1,2,3]` true; missing child asymmetry false.

## 8) Red Flags (Yang Harus Dihindari)

- Serializing both to string compare — works but heavier and edge on ordering.

## 9) Follow-up yang Sering Muncul

- Subtree problem — similar walk.

## 10) Trade-off Keputusan

- Recursion vs iterative queues — recursion clearer.

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
- Catatan perbaikan: —

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Easy
- Topik utama: Tree DFS
- Inti masalah (1 kalimat): Structural + value equality of two BST/binary trees.
- Soal: Boolean.
- Strategi final: Sync recursion
- Kompleksitas: O(n), O(h)
- 2 edge case: both null; different shape
- 1 potensi bug: only compare values not structure
- 1 alasan valid: Inductive same-tree definition
