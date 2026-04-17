# Topik 56 — Binary Tree Traversal (Pre / In / Post, Level)

Traversal pohon biner mengunjungi setiap node tepat sekali dalam urutan tertentu. **Preorder:** root–kiri–kanan. **Inorder:** kiri–root–kanan (BST menghasilkan sorted). **Postorder:** kiri–kanan–root. **Level order:** BFS (topik 46).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Rekursi adalah cara paling pendek; iteratif memakai **stack eksplisit** dengan pola yang berbeda: preorder mudah; inorder memerlukan pointer `cur` ke subtree paling kiri; postorder sering dua stack atau `prev` pointer untuk menandai node selesai. Kompleksitas O(n) waktu, O(h) ruang stack rekursi (h tinggi pohon).

---

## 2. Mengapa topik ini keluar di interview

- Bangun traversal dari preorder+inorder, serialisasi tree.
- Pembedaan urutan output untuk pola berbeda.

---

## 3. Preorder rekursif

```javascript
function preorder(root, out = []) {
  if (!root) return out;
  out.push(root.val);
  preorder(root.left, out);
  preorder(root.right, out);
  return out;
}
```

---

## 4. Inorder BST

Inorder BST → sorted ascending—berguna verifikasi BST.

---

## 5. Postorder

Berguna menghitung subtree sum, delete tree children-first.

---

## 6. Iteratif inorder

```javascript
function inorderIter(root) {
  const out = [];
  const st = [];
  let cur = root;
  while (cur || st.length) {
    while (cur) {
      st.push(cur);
      cur = cur.left;
    }
    cur = st.pop();
    out.push(cur.val);
    cur = cur.right;
  }
  return out;
}
```

---

## 7. Kompleksitas

O(n) waktu, O(h) stack.

---

## 8. Pitfall: mutasi tree saat traversal

Hindari kecuali soal meminta.

---

## 9. Pola interview

Sebutkan makna inorder pada BST.

---

## 10. Latihan

Tulis postorder untuk pohon kecil manual.

---

## 11. Checklist

- [ ] Tiga urutan rekursif.
- [ ] Inorder iteratif.
- [ ] Tahu kompleksitas.

---

## 12. Referensi

Tree traversals standar.

---

## 13. Anti-pattern

Menyimpan seluruh tree ke array lalu sort—salah untuk struktur.

---

## 14. Flashcard

- **Inorder BST:** sorted.

---

## 15. Latihan tulis

Preorder iteratif dengan stack.

---

## 16. Testing

Bandingskan rekursif vs iteratif.

---

## 17. Penutup

Traversal adalah bahasa dasar untuk hampir semua soal pohon.

---

## 18. Tambahan: Morris traversal

O(1) extra space inorder—advanced.

---

## 19. Tambahan: threaded tree

Pointer tambahan—jarang.

---

## 20. Kompleksitas memori

Worst skewed tree O(n) stack.

---

## 21. Rangkuman

Pilih traversal sesuai informasi yang dibutuhkan (sorted, subtree, dll.).

---

## 22. Soal terkait

Kth smallest in BST—inorder counter.

---

## 23. Edge: null root

[].

---

## 24. Edge: satu node

Satu elemen semua traversal.

---

## 25. Drill

Tulis preorder untuk pohon penuh 3 level.

---

## 26. Performa

Linear.

---

## 27. Integrasi TypeScript

Fungsi generic visitor.

---

## 28. Debugging

Log traversal array.

---

## 29. Parallel

Tidak umum.

---

## 30. Etika wawancara

Konfirmasi preorder vs level untuk output yang diminta.

---

Dokumen ini merangkum traversal biner sebagai fondasi manipulasi pohon.
