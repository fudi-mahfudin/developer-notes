# Clone Graph

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Graph DFS/BFS, hash map cloning
- **Inti masalah:** Node undirected dengan `val` dan `neighbors[]`; buat **deep copy** semua node dan sisi tanpa struktur bersama dengan graph asli.

---

- Soal: `cloneGraph(node)` return copy of start node.
- Input: `Node` reference (# class with val + neighbors)
- Output: cloned start node
- Constraints utama: O(V+E) — map `original → clone`; traverse from start, untuk tiap edge connect clone neighbors lazily.

## 2) Jawaban Ideal Singkat (30-60 detik)

> `Map` old→new `Node`. `clone(o)`: if map has `o`, return clone; buat `copy = new Node(o.val)`, set map; untuk neighbor `n` dalam `o.neighbors`, `copy.neighbors.push(clone(n))` (lazy ensures all exist). DFS atau BFS queue — sama. Hindari infinite loop karena map short-circuit.

Struktur cepat:
- Observasi inti masalah: Graph copy needs identity mapping to deduplicate split references.
- Strategi final yang dipilih: DFS + hashmap memoization.
- Kenapa strategi ini paling cocok: Visit each adjacency once overall with mapping guarantee.
- Time complexity: O(V + E)
- Space complexity: O(V) map + recursion
- Edge case utama: single node no neighbors; self-loop not typical in LC undirected cloning.

## 3) Versi Ultra Singkat (10-20 detik)

> Memo map; recursive clone neighbors; visit each node once.

## 4) Pseudocode Ringkas (5-10 baris)

```text
map = empty
function clone(node):
  if node == null: return null
  if map has node: return map[node]
  copy = new Node(node.val)
  map[node] = copy
  for nb in node.neighbors:
    copy.neighbors.append(clone(nb))
  return copy
```

## 5) Implementasi Final (Inti Saja)

```js
function cloneGraph(node) {
  const map = new Map();
  function dfs(n) {
    if (!n) return null;
    if (map.has(n)) return map.get(n);
    const c = new _Node(n.val);
    map.set(n, c);
    for (const nb of n.neighbors) c.neighbors.push(dfs(nb));
    return c;
  }
  return dfs(node);
}
```

*(Asumsikan constructor `_Node` / `Node` sesuai soal.)*

## 6) Bukti Correctness (Wajib)

- Structural induction on connected component; map ensures each vertex single clone and edges replicate exactly once per adjacency walk from each endpoint if undirected — careful duplicate neighbor push but undirected graph in LC: neighbors list includes both directions once each — implementation aligns.

## 7) Dry Run Singkat

- Triangle 3 nodes fully connected — 3 clones same structure.

## 8) Red Flags (Yang Harus Dihindari)

- Shallow copy reusing neighbor array from original.

## 9) Follow-up yang Sering Muncul

- Clone directed graph — same idea.

## 10) Trade-off Keputusan

- DFS vs BFS queue — both O(V+E).

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Samakan API `Node` dengan soal (LeetCode #133).

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Graph clone
- Inti masalah (1 kalimat): Deep copy undirected adjacency graph.
- Soal: Cloned node.
- Strategi final: DFS + Map
- Kompleksitas: O(V+E), O(V)
- 2 edge case: null; singleton
- 1 potensi bug: no memo infinite recursion
- 1 alasan valid: map gives canonical clone per original node
