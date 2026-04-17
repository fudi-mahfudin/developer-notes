# Topik 60 — Operasi BST (Insert, Search, Delete — Konsep)

**Binary Search Tree** mempertahankan invariant: `left.val < root.val < right.val` (asumsi tidak duplikat; duplikat punya aturan penempatan). Operasi search/insert average O(h), worst O(n) untuk pohon skewed.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Search:** bandingkan target dengan root, rekursi kiri/kanan. **Insert:** cari posisi leaf sesuai invariant, tambahkan node. **Delete:** tiga kasus—tanpa anak (hapus), satu anak (ganti dengan anak), dua anak (ganti dengan successor inorder minimum di subtree kanan, lalu hapus successor). Seimbangkan pohon memerlukan AVL/red-black—di luar pengantar.

---

## 2. Mengapa topik ini keluar di interview

- Validasi BST, kth element, successor/predecessor.

---

## 3. Search

```javascript
function searchBST(root, val) {
  if (!root || root.val === val) return root;
  return val < root.val
    ? searchBST(root.left, val)
    : searchBST(root.right, val);
}
```

---

## 4. Insert

Mirip search; saat null, tempat insert.

---

## 5. Delete (outline)

- 0 child: set parent pointer null
- 1 child: promote
- 2 children: `min(right)` successor, copy value, delete successor node

---

## 6. Kompleksitas

O(h) average; O(n) worst skewed.

---

## 7. Pitfall: duplikat

Definisikan konsisten kiri atau kanan.

---

## 8. Pola interview

Jelaskan tiga kasus delete dengan jelas.

---

## 9. Latihan

Hapus root dengan dua anak pada pohon kecil.

---

## 10. Checklist

- [ ] Invariant BST.
- [ ] Kasus delete.
- [ ] Tahu degradasi linear worst-case.

---

## 11. Referensi

CLRS BST operations.

---

## 12. Anti-pattern

Travers inorder sort untuk insert banyak elemen—tree tidak seimbang.

---

## 13. Flashcard

- **BST:** left < root < right.

---

## 14. Latihan tulis

Iterative insert dengan `while` loop.

---

## 15. Testing

Random insert, inorder harus sorted.

---

## 16. Penutup

Pahami search/insert/delete konseptual; balancing adalah topik terpisah.

---

## 17. Tambahan: randomized BST

Expected O(log n)—teori.

---

## 18. Tambahan: treap

Heap + BST—advanced.

---

## 19. Kompleksitas expected

Random insertion shuffle menghasilkan O(log n) expected height.

---

## 20. Rangkuman

BST adalah struktur order untuk search dinamis jika seimbang atau random.

---

## 21. Soal terkait

Validate BST—min/max bounds traversal.

---

## 22. Edge: empty

Insert menjadi root.

---

## 23. Edge: duplicate insert

Sesuai aturan soal.

---

## 24. Drill

Trace inorder setelah beberapa insert/delete.

---

## 25. Performa

Skewed buruk—sebutkan self-balancing sebagai perbaikan.

---

## 26. Integrasi TypeScript

Class `BST` dengan methods.

---

## 27. Debugging

Print inorder untuk cek invariant.

---

## 28. Memori

Node allocation seperti linked list.

---

## 29. Parallel

Tidak umum.

---

## 30. Etika wawancara

Tanyakan handling duplicates eksplisit.

---

## 31. Degenerate BST

Jika data masuk sudah terurut, BST tanpa balancing bisa menyublim menjadi **linked list** dan operasi menjadi O(n). Itu motivasi AVL/red-black tree di dunia struktur data—di interview sering cukup mengenali gejala dan menyebut “perlu self-balancing” bila worst-case menjadi masalah.

---

Dokumen ini merangkum operasi BST yang wajib dipahami secara konsep untuk interview.
