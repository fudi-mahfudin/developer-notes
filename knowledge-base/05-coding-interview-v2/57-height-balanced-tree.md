# Topik 57 — Height / Depth dan Balanced Binary Tree

Pohon **seimbang** (AVL-style definition sering dipakai di soal) jika untuk setiap node, selisih tinggi subtree kiri dan kanan ≤ 1. Cek dapat dilakukan dengan DFS mengembalikan tinggi atau `-1` jika tidak seimbang (**bottom-up**).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Fungsi `height(node)` mengembalikan `-1` jika subtree tidak balanced; jika tidak, `1+max(left,right)`. Selisih tinggi anak >1 → propagate `-1`. Satu pass O(n). Alternatif hitung tinggi murni lalu pass kedua—tidak efisien.

---

## 2. Mengapa topik ini keluar di interview

- `isBalanced` klasik; menguji DFS dengan sentinel.

---

## 3. Implementasi

```javascript
function isBalanced(root) {
  function dfs(node) {
    if (!node) return 0;
    const L = dfs(node.left);
    if (L === -1) return -1;
    const R = dfs(node.right);
    if (R === -1) return -1;
    if (Math.abs(L - R) > 1) return -1;
    return Math.max(L, R) + 1;
  }
  return dfs(root) !== -1;
}
```

---

## 4. Kompleksitas

O(n) waktu, O(h) stack.

---

## 5. Pitfall: memisahkan fungsi tinggi dan balanced

Dua pass O(n) masih OK tetapi lebih panjang.

---

## 6. Pitfall: definisi tinggi

Leaf tinggi 0 vs 1—konsisten.

---

## 7. Pola interview

Jelaskan early return `-1` untuk pruning.

---

## 8. Latihan

Pohon skewed tidak seimbang.

---

## 9. Checklist

- [ ] Satu pass DFS.
- [ ] Sentinel -1.
- [ ] Tahu kompleksitas.

---

## 10. Referensi

Height-balanced definition untuk interview (LeetCode).

---

## 11. Anti-pattern

Hitung tinggi subtree berulang tanpa memo O(n²).

---

## 12. Flashcard

- **Balance:** |L-R|≤1.

---

## 13. Latihan tulis

Diameter of tree—DFS return height + max path.

---

## 14. Testing

Random trees kecil, brute cek selisih.

---

## 15. Penutup

Balanced check adalah latihan DFS dengan informasi agregat.

---

## 16. Tambahan: AVL rotations

Struktur seimbang mutasi—di luar banyak interview coding.

---

## 17. Tambahan: black height

Red-black tree—beda definisi.

---

## 18. Kompleksitas memori

O(h) rekursi.

---

## 19. Rangkuman

Kembalikan tinggi atau gagal dengan sentinel.

---

## 20. Soal terkait

Maximum depth of tree—lebih sederhana.

---

## 21. Edge: null

Tinggi 0, balanced.

---

## 22. Edge: dua node

Selalu balanced.

---

## 23. Drill

Cek pohon `[1,null,2,null,3,null,4]` skewed.

---

## 24. Performa

Linear.

---

## 25. Integrasi TypeScript

Return type number | -1.

---

## 26. Debugging

Cetak tinggi subtree per node kecil.

---

## 27. Iterative

Bisa postorder dua stack—lebih rumit.

---

## 28. Parallel

Tidak relevan.

---

## 29. Variasi: balance factor

Sama intuisi.

---

## 30. Etika wawancara

Konfirmasi definisi balanced (biasanya |diff|≤1).

---

Dokumen ini menggabungkan tinggi pohon dengan pengecekan keseimbangan secara efisien.
