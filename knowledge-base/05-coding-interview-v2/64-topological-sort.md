# Topik 64 — Topological Sort (DAG)

**Topological ordering** dari Directed Acyclic Graph (DAG) adalah urutan node di mana setiap edge `u→v` muncul sebelum `v`. Digunakan untuk penjadwalan tugas dengan dependensi.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

**Kahn’s algorithm:** hitung **indegree** tiap node, queue node dengan indegree 0, dequeue, kurangi indegree tetangga, enqueue jika jadi 0. Jika jumlah diproses < V, ada **cycle**—topological sort tidak ada. **DFS approach:** postorder push stack setelah selesai visit—reverse hasil. Kompleksitas O(V+E).

---

## 2. Mengapa topik ini keluar di interview

- Course schedule, alien dictionary, build order.

---

## 3. Kahn

```javascript
function topoSort(n, edges) {
  const g = Array.from({ length: n }, () => []);
  const indeg = new Array(n).fill(0);
  for (const [u, v] of edges) {
    g[u].push(v);
    indeg[v]++;
  }
  const q = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);
  const order = [];
  for (let i = 0; i < q.length; i++) {
    const u = q[i];
    order.push(u);
    for (const v of g[u]) {
      if (--indeg[v] === 0) q.push(v);
    }
  }
  return order.length === n ? order : [];
}
```

---

## 4. Kompleksitas

O(V+E) waktu, O(V+E) memori.

---

## 5. Pitfall: cycle

Deteksi dengan memastikan semua node terproses.

---

## 6. Pitfall: multiple valid order

Topological sort tidak unik.

---

## 7. Pola interview

Jelaskan indegree dan queue.

---

## 8. Latihan

Deteksi cycle pada directed graph dengan topo.

---

## 9. Checklist

- [ ] Kahn atau DFS post.
- [ ] Cycle detection.
- [ ] Tahu kompleksitas.

---

## 10. Referensi

CLRS topological sort.

---

## 11. Anti-pattern

Sort nodes by value—tidak menghormati edge.

---

## 12. Flashcard

- **Indegree:** edges masuk.

---

## 13. Latihan tulis

DFS version dengan warna WHITE/GRAY/BLACK.

---

## 14. Testing

Random DAG verifikasi semua edge forward.

---

## 15. Penutup

Topo sort adalah DAG property; cycle = gagal.

---

## 16. Tambahan: strongly connected components

Kosaraju—advanced.

---

## 17. Tambahan: minimum height tree

Berbeda—tree undirected.

---

## 18. Kompleksitas memori

Adjacency + indegree.

---

## 19. Rangkuman

Queue indegree 0 → relax outgoing.

---

## 20. Soal terkait

Alien dictionary—build graph per huruf.

---

## 21. Edge: node isolasi

Indegree 0 dari awal.

---

## 22. Edge: multiple components

Topo pada setiap DAG komponen.

---

## 23. Drill

Urutkan DAG kecil manual.

---

## 24. Performa

Linear dengan adjacency list.

---

## 25. Integrasi TypeScript

Edges tuple number.

---

## 26. Debugging

Log order dan cek edge violations.

---

## 27. Lexicographic smallest topo

Gunakan min-heap queue—varian.

---

## 28. Parallel

Kahn level parallel—advanced.

---

## 29. Real world

Build systems, package managers.

---

## 30. Etika wawancara

Konfirmasi DAG—jika mungkin cycle, deteksi.

---

Dokumen ini menjelaskan topological sort sebagai alat penyelesaian dependensi terarah.
