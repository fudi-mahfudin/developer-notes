# Topik 63 — Shortest Path (BFS Unweighted; Dijkstra — Konsep)

Pada graf **tanpa bobot** (atau semua bobot sama), **BFS** memberikan jarak minimum dalam jumlah edge dari sumber. Pada graf **berbobot non-negatif**, **Dijkstra** memakai **priority queue** (min-heap) memilih edge relax terkecil—O((V+E) log V) dengan binary heap.

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

BFS: queue level-by-level, `dist[v]` first time dicapai adalah minimum hop. Dijkstra: inisialisasi `dist[s]=0`, heap berisi `(dist, node)`, pop minimum, relax semua edge `u→v` dengan `dist[v]=min(dist[v], dist[u]+w)`. Tidak berlaku untuk bobot negatif (perlu Bellman-Ford). A* menambahkan heuristic—di luar pengantar.

---

## 2. Mengapa topik ini keluar di interview

- Network delay, flight dengan harga, maze dengan cost.
- Menjelaskan mengapa BFS tidak cukup dengan bobot berbeda.

---

## 3. BFS shortest path unweighted

```javascript
function bfsDist(start, g) {
  const dist = new Map([[start, 0]]);
  const q = [start];
  for (let i = 0; i < q.length; i++) {
    const u = q[i];
    for (const v of g[u]) {
      if (!dist.has(v)) {
        dist.set(v, dist.get(u) + 1);
        q.push(v);
      }
    }
  }
  return dist;
}
```

---

## 4. Dijkstra outline

Gunakan min-heap; jika `dist[u]` pop tidak sama dengan best known, skip stale entry.

---

## 5. Kompleksitas

- BFS: O(V+E)
- Dijkstra binary heap: O((V+E) log V)

---

## 6. Pitfall: BFS pada weighted salah

Contoh: dua edge vs satu edge berat.

---

## 7. Pitfall: Dijkstra dengan negatif

Tidak valid—gunakan Bellman-Ford.

---

## 8. Pola interview

Sebutkan invariant relax edge dan nondecreasing dist Dijkstra.

---

## 9. Latihan

Contoh kecil di mana BFS salah jika bobot ada.

---

## 10. Checklist

- [ ] Pilih algoritma sesuai bobot.
- [ ] Tahu kompleksitas Dijkstra.
- [ ] Tahu limit negatif edge.

---

## 11. Referensi

CLRS shortest paths chapters.

---

## 12. Anti-pattern

DFS untuk shortest path weighted—salah.

---

## 13. Flashcard

- **Unweighted shortest:** BFS.
- **Non-neg weighted:** Dijkstra.

---

## 14. Latihan tulis

Dijkstra pada graf kecil 5 node manual.

---

## 15. Testing

Bandingkan dengan brute untuk n kecil.

---

## 16. Penutup

Pilih algoritma shortest path berdasarkan bobot dan arah.

---

## 17. Tambahan: 0-1 BFS

Edge weight 0 atau 1—deque trick O(V+E).

---

## 18. Tambahan: Floyd-Warshall

All pairs O(V³)—kecil V saja.

---

## 19. Kompleksitas memori

`dist` array/map O(V).

---

## 20. Rangkuman

BFS hop count; Dijkstra total weight non-negatif.

---

## 21. Soal terkait

Cheapest flights within k stops—BFS layered + cost state.

---

## 22. Edge: disconnected

Infinity dist.

---

## 23. Edge: self-loop

Biasanya diabaikan atau ditangani.

---

## 24. Drill

Trace BFS layer pada tree sebagai graf.

---

## 25. Performa

Dijkstra dengan heap efisien untuk sparse graph.

---

## 26. Integrasi TypeScript

`PriorityQueue` custom.

---

## 27. Debugging

Cetak relax steps kecil.

---

## 28. Heuristic

A* mempercepat goal-directed—advanced.

---

## 29. Parallel

Tidak umum.

---

## 30. Etika wawancara

Tanyakan non-negative weights dan directedness.

---

Dokumen ini membedakan jalur terpendek unweighted vs weighted pada level konsep implementatif.
