# Topik 46 — BFS Level Order (Pohon Biner)

**Breadth-first search (BFS)** pada pohon mengunjungi simpul per **lapisan kedalaman** menggunakan **queue**. Level order traversal mengembalikan array-of-arrays tiap level—cocok untuk pola zigzag, right side view, dll.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Mulai dari root, enqueue node; dequeue node, tambahkan nilai ke level saat ini, enqueue anak kiri/kanan jika ada. Untuk memisahkan level, iterasi `size = queue.length` pada setiap level sebelum memproses level berikutnya. Kompleksitas O(n) waktu, O(w) ruang tambahan di mana `w` adalah lebar maksimum level (hingga ~n/2 untuk pohon lengkap).

---

## 2. Mengapa topik ini keluar di interview

- Level order traversal, average of levels, largest value each row.
- Kontras dengan DFS pre/in/post.

---

## 3. Implementasi level order

```javascript
function levelOrder(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length) {
    const row = [];
    const k = q.length;
    for (let i = 0; i < k; i++) {
      const node = q.shift();
      row.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(row);
  }
  return res;
}
```

Catatan: `shift()` pada `Array` O(n) di V8—di interview sering diterima; gunakan indeks `head` atau `deque` untuk O(1) jika dituntut.

---

## 4. Kompleksitas

- Waktu O(n)
- Ruang O(n) worst queue

---

## 5. Pitfall: `shift()` linear

Optimasi dengan pointer `let i=0` atau circular buffer.

---

## 6. Pitfall: null children

Jangan push `undefined`.

---

## 7. Variasi: zigzag

Reverse arah `row` bergantian atau deque.

---

## 8. Pola interview

Sebutkan “queue + level size snapshot”.

---

## 9. Latihan

Hitung jumlah node per level untuk pohon tidak seimbang.

---

## 10. Checklist

- [ ] Pisahkan level dengan ukuran queue.
- [ ] Tahu kompleksitas.
- [ ] Tahu trade-off `shift`.

---

## 11. Referensi

BFS tree traversal standar.

---

## 12. Anti-pattern

DFS dengan kedalaman manual untuk level order—lebih rumit.

---

## 13. Flashcard

- **FIFO:** queue.
- **Level:** breadth.

---

## 14. Latihan tulis

Right side view: ambil elemen terakhir tiap level.

---

## 15. Testing

Bandingkan dengan DFS hasil untuk pohon kecil.

---

## 16. Penutup

BFS adalah alat pertama untuk apa pun “per level”.

---

## 17. Tambahan: BFS pada graph

Tambahkan `visited` set—topik graph.

---

## 18. Tambahan: shortest path unweighted

BFS pada graph—jarak = jumlah edge.

---

## 19. Kompleksitas memori frontier

Bisa besar pada pohon lebar.

---

## 20. Rangkuman

Queue + level size = level order.

---

## 21. Soal terkait

Binary tree zigzag—variasi output.

---

## 22. Edge: pohon kosong

`[]`.

---

## 23. Edge: satu node

Satu level.

---

## 24. Drill

Trace pohon `3-9-20-15-7`.

---

## 25. Performa

Linear waktu.

---

## 26. Integrasi TypeScript

Definisi `TreeNode` class.

---

## 27. Debugging

Log queue length per level.

---

## 28. Iterator level order

Bisa generator async untuk stream besar—advanced.

---

## 29. Parallel

Level bisa diproses parallel jika independen—jarang.

---

## 30. Etika wawancara

Tanyakan format output—flatten vs nested.

---

Dokumen ini mengunci pola BFS pada pohon untuk banyak variasi soal.
