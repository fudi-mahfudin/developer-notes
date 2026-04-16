# Max Area of Island

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Grid DFS
- **Inti masalah:** Sama seperti number of islands tetapi **ukur** ukuran tiap pulau (jumlah `1` terhubung 4-arah), return **maksimum**.

---

- Soal: `maxAreaOfIsland(grid)` int.
- Input: `m×n` binary grid
- Output: max area (0 jika tidak ada tanah)
- Constraints utama: O(mn) single pass; reuse flood fill with return `sum` per DFS.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Scan tiap sel `1`: jalankan `area(r,c)` yang return 1 + sum 4 tetangga valid dengan sink (mark `0`) seperti islands. `ans = max(ans, area)`. Tidak mulai hitung baru dari sel yang sudah `0`. Kompleksitas O(mn).

Struktur cepat:
- Observasi inti masalah: Area of component = size of DFS/BFS tree on grid.
- Strategi final yang dipilih: Counting flood fill with accumulation.
- Kenapa strategi ini paling cocok: Same pattern as islands with metric.
- Time complexity: O(mn)
- Space complexity: O(mn) worst stack
- Edge case utama: no land; full grid.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS return cells sunk per island; track global max.

## 4) Pseudocode Ringkas (5-10 baris)

```text
ans = 0
for each cell:
  if grid[r][c]==1: ans = max(ans, dfs(r,c))

dfs(r,c):
  if invalid or 0: return 0
  mark 0; return 1 + sum(dfs(neighbors))
```

## 5) Implementasi Final (Inti Saja)

```js
function maxAreaOfIsland(grid) {
  const m = grid.length,
    n = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] === 0) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };
  let ans = 0;
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (grid[i][j] === 1) ans = Math.max(ans, dfs(i, j));
  return ans;
}
```

## 6) Bukti Correctness (Wajib)

- DFS counts each land cell in component exactly once when first discovered.

## 7) Dry Run Singkat

- LC example grid → 6.

## 8) Red Flags (Yang Harus Dihindari)

- BFS queue area without marking visited — double count risk.

## 9) Follow-up yang Sering Muncul

- Number of islands — same skeleton.

## 10) Trade-off Keputusan

- Mutate vs visited[][] — mutation OK if input copy allowed.

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
- Kerapihan implementasi: 10/10
- Catatan perbaikan: —

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Grid DFS
- Inti masalah (1 kalimat): Largest 4-connected 1-component size.
- Soal: Max area int.
- Strategi final: DFS count + sink
- Kompleksitas: O(mn), O(mn) stack
- 2 edge case: no 1s; entire grid 1
- 1 potensi bug: recount visited
- 1 alasan valid: flood sum equals component size
