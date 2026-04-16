# Number of Islands

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Grid DFS/BFS, flood fill
- **Inti masalah:** `1` = tanah, `0` = air; hitung wilayah tanah **4-directional** tidak terhubung (pulau terpisah).

---

- Soal: `numIslands(grid)` count.
- Input: `string[][]` or `number[][]` `m×n`
- Output: `number`
- Constraints utama: O(mn) time; mark visited in-place `0` or `visited` set — O(mn) space worst visited.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Nested loop: jika `grid[i][j]=='1'`, `count++`, jalankan `dfs(i,j)` atau BFS untuk menenggelamkan seluruh pulau (set ke `0` atau mark visited). DFS: batas grid, jika air return; set `0`; rekurs 4 arah. O(mn) total sel karena setiap sel diproses konstan kali.

Struktur cepat:
- Observasi inti masalah: Connected components in implicit grid graph.
- Strategi final yang dipilih: DFS flood fill per unseen land cell.
- Kenapa strategi ini paling cocok: Simple stack recursion or iterative queue.
- Time complexity: O(mn)
- Space complexity: O(mn) worst recursion stack / queue
- Edge case utama: full grid land → 1; empty.

## 3) Versi Ultra Singkat (10-20 detik)

> Scan grid; on each 1, flood-fill sink to 0; increment count.

## 4) Pseudocode Ringkas (5-10 baris)

```text
count = 0
for r in rows:
  for c in cols:
    if grid[r][c] == '1':
      count += 1
      dfs(r, c)
return count

dfs(r,c): if out of bounds or water: return; mark 0; dfs 4 neighbors
```

## 5) Implementasi Final (Inti Saja)

```js
function numIslands(grid) {
  const m = grid.length, n = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  };
  let count = 0;
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
  return count;
}
```

## 6) Bukti Correctness (Wajib)

- Flood fill visits exactly one connected component; increment once per undiscovered component.

## 7) Dry Run Singkat

- Standard 4×5 example grid → 3.

## 8) Red Flags (Yang Harus Dihindari)

- Counting 1 without sinking — double count.
- 8-direction when problem says 4.

## 9) Follow-up yang Sering Muncul

- Count islands II with dynamic add land — Union-Find.

## 10) Trade-off Keputusan

- Mutate grid vs visited matrix — mutation saves memory if allowed.

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
- Catatan perbaikan: Union-find alternative for dynamic version.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Grid DFS
- Inti masalah (1 kalimat): Count 4-connected land components.
- Soal: Integer count.
- Strategi final: Flood fill
- Kompleksitas: O(mn), O(mn) stack worst
- 2 edge case: all water; single cell
- 1 potensi bug: counting without visiting
- 1 alasan valid: each component started exactly once
