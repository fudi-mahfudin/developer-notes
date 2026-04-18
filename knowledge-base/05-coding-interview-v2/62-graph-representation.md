# Topik 62 — Representasi Graf (Adjacency List / Matrix)

Graf bisa direpresentasikan sebagai **adjacency list** `Map<u, v[]>` (sparse, umum di interview) atau **matrix** `n×n` (dense, cepat cek edge O(1) tetapi O(n²) memori).

---

## 1. Ringkasan satu paragraf (untuk jawaban lisan singkat)

Untuk `n` node, list menyimpan tetangga tiap node—iterasi edge O(degree). Matrix `adj[u][v]` boolean/weight—cepat untuk graf padat. Di JS, `Map` atau array of arrays. Pilih berdasarkan `|E|` vs `|V|²`.

---

## 2. Mengapa topik ini keluar di interview

- Build graph dari daftar edges; traversal BFS/DFS.
- Diskusi trade-off struktur.

---

## 3. Adjacency list dari edges

```javascript
function buildUndirected(n, edges) {
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    g[u].push(v);
    g[v].push(u);
  }
  return g;
}
```

---

## 4. Directed

Hanya push satu arah.

---

## 5. Weighted

Simpan `{to, w}`.

---

## 6. Kompleksitas memori

List: O(V+E); Matrix: O(V²).

---

## 7. Pitfall: off-by-one node id

0-index vs 1-index.

---

## 8. Pitfall: multi-edge

Simpan atau dedup sesuai soal.

---

## 9. Pola interview

Sebutkan list untuk sparse graph besar.

---

## 10. Latihan

Konversi matrix ke list untuk graf kecil.

---

## 11. Checklist

- [ ] Directed vs undirected.
- [ ] Weighted representation.
- [ ] Index basis.

---

## 12. Referensi

CLRS graph representations.

---

## 13. Anti-pattern

Matrix untuk graf sangat sparse—boros.

---

## 14. Flashcard

- **List:** neighbors per node.

---

## 15. Latihan tulis

Build reverse graph untuk soal tertentu.

---

## 16. Testing

BFS dari node 0, cek reachability.

---

## 17. Penutup

Representasi menentukan kompleksitas operasi lokal.

---

## 18. Tambahan: CSR format

Sparse linear algebra—jarang di interview JS.

---

## 19. Tambahan: implicit graph

Grid sebagai graf 4-neighbor—tanpa menyimpan edge eksplisit.

---

## 20. Kompleksitas iterasi neighbor

O(degree(v)).

---

## 21. Rangkuman

List untuk sparse; matrix untuk dense kecil.

---

## 22. Soal terkait

Clone graph—hash map old→new node.

---

## 23. Edge: node isolasi

Array kosong di list.

---

## 24. Edge: self-loop

Simpan atau tolak sesuai soal.

---

## 25. Drill

Hitung derajat tiap node dari list.

---

## 26. Performa

Traversal E total edges.

---

## 27. Integrasi TypeScript

`type Graph = number[][]`.

---

## 28. Debugging

Log adjacency kecil.

---

## 29. Serialization

List lebih mudah daripada matrix untuk JSON.

---

## 30. Etika wawancara

Tanyakan directed/undirected weighted sebelum kode.

---

## 31. Memilih representasi dalam satu kalimat

**Sparse** + banyak query tetangga → adjacency list. **Dense** + perlu cek edge cepat dengan indeks tetap → matrix (atau bitset). **Tree** adalah graf khusus—kadang cukup pointer parent/children tanpa struktur graf umum.

---

Dokumen ini menegaskan pemilihan representasi graf sesuai kepadatan dan operasi.
