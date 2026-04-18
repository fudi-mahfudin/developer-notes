# Topik 59 — Path Sum pada Binary Tree

**Path** dari root ke leaf: jumlah nilai node sepanjang jalur. Soal klasik: apakah ada path dengan jumlah tepat `target`? Gunakan DFS dengan akumulator atau kurangi `target` saat turun.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

DFS: jika leaf (`!left && !right`), cek `sum === target`. Rekursi `left` dengan `sum+node.val`, `right` serupa. Untuk menghitung **jumlah path** (bukan harus root-leaf), perlu prefix sum pada path dengan backtracking map—mirip subarray sum K pada tree (topik terpisah). Kompleksitas O(n) waktu.

---

## 2. Mengapa topik ini keluar di interview

- Path sum III dengan map prefix pada jalur DFS—kombinasi hash + tree.

---

## 3. Root-to-leaf exists

```javascript
function hasPathSum(root, target) {
  if (!root) return false;
  if (!root.left && !root.right) return target === root.val;
  const t = target - root.val;
  return hasPathSum(root.left, t) || hasPathSum(root.right, t);
}
```

---

## 4. Kompleksitas

O(n) waktu, O(h) stack.

---

## 5. Pitfall: path harus leaf

Jika bisa berhenti di internal node, ubah base case.

---

## 6. Pitfall: angka negatif

Tidak bisa prune berdasarkan partial sum positif saja.

---

## 7. Variasi: path sum start anywhere

Multi-source DFS berat—DP on tree lanjutan.

---

## 8. Pola interview

Jelaskan pengurangan `target` vs akumulasi `sum`.

---

## 9. Latihan

Hitung semua path sum = target (bukan hanya boolean).

---

## 10. Checklist

- [ ] Definisi leaf.
- [ ] Handle null.
- [ ] Tahu kompleksitas.

---

## 11. Referensi

Tree DFS path patterns.

---

## 12. Anti-pattern

BFS level untuk root-to-leaf sum—kurang natural.

---

## 13. Flashcard

- **Leaf:** no children.

---

## 14. Latihan tulis

Path sum III dengan map prefix count pada recursion stack.

---

## 15. Testing

Pohon dengan negatif numbers.

---

## 16. Penutup

Path sum adalah DFS dengan state akumulasi sederhana.

---

## 17. Tambahan: maximum path sum

Boleh melalui node manapun—DFS return max gain.

---

## 18. Tambahan: diameter

Mirip max path—beda soal.

---

## 19. Kompleksitas memori

O(h) recursion.

---

## 20. Rangkuman

Turun tree sambil menjaga jumlah; perhatikan definisi path.

---

## 21. Soal terkait

Sum root to leaf numbers—bangun integer per path.

---

## 22. Edge: null tree

false.

---

## 23. Edge: target 0 dengan null?

Tidak valid.

---

## 24. Drill

Trace pohon dengan beberapa leaf sums.

---

## 25. Performa

Linear.

---

## 26. Integrasi TypeScript

BigInt jika nilai besar.

---

## 27. Debugging

Log path stack kecil.

---

## 28. Iterative

Stack frame manual—mungkin tapi lebih verbose.

---

## 29. Parallel

Tidak relevan.

---

## 30. Etika wawancara

Konfirmasi apakah path harus root-to-leaf atau sembarang.

---

## 31. Varian: jumlah path yang menghitung

Beberapa soal meminta **berapa banyak** jalur yang menjumlahkan target, bukan hanya boolean. Polanya sama: DFS sambil membawa `sum` dan menjumlahkan kembalian dari anak kiri/kanan, dengan basis saat mencapai leaf sesuai definisi soal.

---

Dokumen ini menghubungkan DFS pohon dengan invariant jumlah pada jalur.
