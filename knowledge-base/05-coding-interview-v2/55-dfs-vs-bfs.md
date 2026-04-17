# Topik 55 — DFS vs BFS (Graf dan Pohon)

**DFS** menjelajah sedalam mungkin sebelum mundur; implementasi umum **rekursi** atau **stack eksplisit**. **BFS** menjelajah per lapisan jarak; implementasi dengan **queue**. Pilihan mempengaruhi memori, urutan kunjungan, dan jenis masalah yang natural.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Pada pohon, DFS pre/in/post-order memetakan pola berbeda; pada graf, DFS butuh `visited` untuk hindari siklus. BFS menemukan **jarak terpendek** pada graf tak berbobot (atau bobot seragam) dalam jumlah edge. Memori DFS biasanya O(h) stack untuk pohon dengan tinggi `h`, sedangkan BFS O(w) lebar frontier. Untpa shortest path weighted non-negatif gunakan Dijkstra—bukan BFS murni.

---

## 2. Mengapa topik ini keluar di interview

- “Kapan pakai BFS?” “Apa trade-off DFS?”
- Number of islands, level order, path existence.

---

## 3. DFS rekursif pohon

```javascript
function dfs(node) {
  if (!node) return;
  // preorder: process node
  dfs(node.left);
  dfs(node.right);
}
```

---

## 4. BFS graf

Queue + visited set; dequeue, enqueue tetangga belum dikunjungi.

---

## 5. Kompleksitas

O(V+E) untuk graf; pohon O(n).

---

## 6. Pitfall: DFS tanpa visited di graf

Infinite loop pada cycle.

---

## 7. Pitfall: BFS memori pada graf besar

Frontier bisa besar—IDS DFS depth-limited alternatif.

---

## 8. Pola interview

Sebutkan shortest path unweighted → BFS; backtracking exhaustive → DFS.

---

## 9. Latihan

Bandingkan urutan kunjungan DFS vs BFS pada pohon kecil.

---

## 10. Checklist

- [ ] visited pada graf.
- [ ] struktur data stack vs queue.
- [ ] Tahu kompleksitas memori tipikal.

---

## 11. Referensi

CLRS graph search; BFS shortest path unweighted.

---

## 12. Anti-pattern

BFS pada weighted graph umum tanpa modifikasi—salah.

---

## 13. Flashcard

- **DFS:** stack/recursion.
- **BFS:** queue.

---

## 14. Latihan tulis

Connected components count dengan BFS/DFS pada adjacency list.

---

## 15. Testing

Graf kecil acyclic vs cyclic.

---

## 16. Penutup

Pilih traversal sesuai pertanyaan: jarak vs eksplorasi mendalam.

---

## 17. Tambahan: bidirectional BFS

Dari sumber dan target—mempercepat shortest path di beberapa kasus.

---

## 18. Tambahan: topological sort

DFS post-order atau Kahn BFS indegree—arah DAG.

---

## 19. Kompleksitas memori frontier

BFS bisa lebih besar dari DFS pada pohon seimbang lebar.

---

## 20. Rangkuman

BFS untuk layer/distance unweighted; DFS untuk path enumeration/backtracking.

---

## 21. Soal terkait

Rotting oranges—multi-source BFS.

---

## 22. Edge: node tunggal

Kedua traversal trivial.

---

## 23. Edge: graf kosong

Tangani input.

---

## 24. Drill

Tulis order DFS preorder untuk pohon 3 level.

---

## 25. Performa

O(V+E) linear dengan adjacency list.

---

## 26. Integrasi TypeScript

Representasi graf `Map<number, number[]>`.

---

## 27. Debugging

Warnai state visited/time untuk BFS layer.

---

## 28. Memori

Rekursi DFS bisa stack overflow—gunakan iterative stack jika perlu.

---

## 29. Parallel

BFS layer bisa parallel—advanced.

---

## 30. Etika wawancara

Tanyakan bobot edge sebelum memilih algoritma shortest path.

---

## 31. Ringkas: kapan memilih mana

Butuh **urutan level** atau **jarak terpendek tanpa bobot** → BFS. Butuh **backtracking**, **topologi**, atau **deteksi siklus** dengan warna → DFS sering lebih alami. Jika graf besar dan kedalaman DFS membahayakan stack, pertimbangkan **iterative DFS** dengan stack eksplisit.

---

Dokumen ini membandingkan DFS dan BFS secara strategis, bukan hanya sintaks.
