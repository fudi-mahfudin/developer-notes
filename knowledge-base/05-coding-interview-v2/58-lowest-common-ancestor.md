# Topik 58 — Lowest Common Ancestor (LCA) pada Binary Tree

**LCA** dari node `p` dan `q` adalah node terdalam yang merupakan ancestor keduanya. Pada **BST**, gunakan properti `val` untuk memutuskan ke kiri/kanan. Pada **binary tree biasa**, gunakan DFS yang mengembalikan pointer jika subtree mengandung `p` atau `q`.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

DFS pada tree umum: jika `root` adalah `p` atau `q`, return `root`. `left = dfs(left)`, `right = dfs(right)`. Jika keduanya non-null, `root` adalah LCA; jika satu saja non-null, return yang non-null. Kompleksitas O(n) waktu, O(h) stack. Untuk BST: mulai dari root, jika `p,q < root` ke kiri; jika keduanya > root ke kanan; else `root` adalah LCA—O(h).

---

## 2. Mengapa topik ini keluar di interview

- Fundamental tree; banyak variasi dengan parent pointer atau BST.

---

## 3. BST LCA

```javascript
function lowestCommonAncestorBST(root, p, q) {
  let cur = root;
  const [a, b] = p.val < q.val ? [p, q] : [q, p];
  while (cur) {
    if (cur.val < a.val) cur = cur.right;
    else if (cur.val > b.val) cur = cur.left;
    else return cur;
  }
  return null;
}
```

---

## 4. Binary tree umum

```javascript
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const L = lowestCommonAncestor(root.left, p, q);
  const R = lowestCommonAncestor(root.right, p, q);
  if (L && R) return root;
  return L || R;
}
```

---

## 5. Kompleksitas

O(n) waktu worst, O(h) space.

---

## 6. Pitfall: `p` ancestor of `q`

Algoritma DFS tetap mengembalikan `p` pertama—valid.

---

## 7. Pitfall: parent pointer

Naik dengan depth map atau two-pointer—soal varian.

---

## 8. Pola interview

Jelaskan kasus split kiri/kanan pada BST.

---

## 9. Latihan

Trace pohon kecil dengan `p,q` di subtree berbeda.

---

## 10. Checklist

- [ ] BST vs general.
- [ ] Return logic dua subtree.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Classic tree algorithm.

---

## 12. Anti-pattern

Membangun path array untuk setiap node O(h) memori berlebihan jika tidak perlu.

---

## 13. Flashcard

- **LCA:** deepest shared ancestor.

---

## 14. Latihan tulis

LCA dengan parent pointer dan hash set visited.

---

## 15. Testing

Semua posisi relatif p,q.

---

## 16. Penutup

LCA menguji rekursi tree dan pemahaman kasus base.

---

## 17. Tambahan: LCA DAG

Jauh lebih sulit—jarang.

---

## 18. Tambahan: multiple queries

Euler tour + RMQ—advanced.

---

## 19. Kompleksitas memori

O(h) stack.

---

## 20. Rangkuman

BST: gunakan ordering; umum: DFS split.

---

## 21. Soal terkait

Distance between two nodes—depth(p)+depth(q)-2*depth(LCA).

---

## 22. Edge: null

Tidak valid jika p,q ada.

---

## 23. Edge: root adalah LCA

Valid.

---

## 24. Drill

Gambar pohon dan warnai jalur ke p dan q.

---

## 25. Performa

Linear scan tree.

---

## 26. Integrasi TypeScript

Node references equality.

---

## 27. Debugging

Print return values bottom-up pada pohon kecil.

---

## 28. Immutability

Tidak mengubah tree.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Konfirmasi apakah BST atau general.

---

Dokumen ini memisahkan strategi LCA untuk BST dan binary tree umum.
