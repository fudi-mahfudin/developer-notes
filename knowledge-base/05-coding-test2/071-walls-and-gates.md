# Walls and Gates

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** BFS multi-source from gates
- **Inti masalah:** Grid: `-1` wall, `0` gate, `INF` empty room; isi setiap ruang dengan **jarak Manhattan** ke gate terdekat (BFS layer). Mutasi in-place.

---

- Soal: `wallsAndGates(rooms)` void.
- Input: `m×n` integer grid
- Constraints utama: O(mn) — BFS queue all gates `0` simultaneously.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Initialize queue with every gate position. BFS: for each cell pop, try 4 neighbors; if neighbor is empty room (`INF` or large sentinel) set `rooms[nr][nc] = rooms[r][c] + 1` (actually first visit sets distance = dist+1) and enqueue. Skip walls `-1`. Tidak perlu Dijkstra karena edge weight 1.

Struktur cepat:
- Observasi inti masalah: Unweighted shortest path from nearest of multiple sources = multi-source BFS.
- Strategi final yang dipilih: BFS from all gates at once.
- Kenapa strategi ini paling cocok: O(mn) tight.
- Time complexity: O(mn)
- Space complexity: O(mn) queue worst
- Edge case utama: no gate; single gate center.

## 3) Versi Ultra Singkat (10-20 detik)

> Push all gates; BFS expand shortest distance to empty cells.

## 4) Pseudocode Ringkas (5-10 baris)

```text
queue = all (r,c) where rooms[r][c]==0
while queue:
  r,c = pop
  for each neighbor:
    if neighbor is room (INF) and would improve distance:
       rooms[nr][nc] = rooms[r][c] + 1
       push neighbor
```

## 5) Implementasi Final (Inti Saja)

```js
function wallsAndGates(rooms) {
  const m = rooms.length,
    n = rooms[0].length,
    INF = 2147483647;
  const q = [];
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (rooms[i][j] === 0) q.push([i, j]);
  const d = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (q.length) {
    const [r, c] = q.shift();
    for (const [dr, dc] of d) {
      const nr = r + dr,
        nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= m || nc >= n || rooms[nr][nc] !== INF) continue;
      rooms[nr][nc] = rooms[r][c] + 1;
      q.push([nr, nc]);
    }
  }
}
```

## 6) Bukti Correctness (Wajib)

- BFS on unweighted graph yields shortest path distances from nearest gate when layers expand uniformly.

## 7) Dry Run Singkat

- 4×4 example with INF rooms from LC.

## 8) Red Flags (Yang Harus Dihindari)

- Running BFS from each empty room — O((mn)²).

## 9) Follow-up yang Sering Muncul

- Add obstacles cost variants — weighted BFS / 0-1 BFS.

## 10) Trade-off Keputusan

- DFS wrong for shortest distance here.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 10/10
- Kejelasan penjelasan: 9/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Use deque in languages where shift is O(n).

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Multi-source BFS
- Inti masalah (1 kalimat): Distance to nearest gate in grid.
- Soal: Mutate rooms in-place.
- Strategi final: BFS from all 0 gates
- Kompleksitas: O(mn), O(mn)
- 2 edge case: all walls; INF rooms surrounded
- 1 potensi bug: overwrite shorter path wrong (BFS first visit is optimal)
- 1 alasan valid: Unweighted multi-source BFS shortest path
