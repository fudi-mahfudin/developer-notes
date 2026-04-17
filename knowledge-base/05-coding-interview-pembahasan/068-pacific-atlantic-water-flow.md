# Pacific Atlantic Water Flow

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** Multi-source BFS/DFS reverse flow
- **Inti masalah:** Air mengalir dari tinggi ke tetangga **lebih rendah atau sama**; Pacific barat+utara, Atlantic timur+bawah. Sel yang bisa mencapai **kedua** samudera?

---

- Soal: return coordinates `[[r,c],...]` reachable both oceans (sorted optionally per LC).
- Input: `m×n` height matrix
- Constraints utama: Reverse thinking: dari tepi Pacific (`top`, `left`) DFS/BFS naik `>=`; dari tepi Atlantic (`bottom`,`right`) sama; intersection sets.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Alih-alih simulate drops, mulai dari sel **border** Pacific, mark `pac[r][c]=true` reachable «menyebar» ke dalam jika neighbor `h >= cur`. Lakukan serupa `atl`. Jawaban = sel di mana `pac && atl`. O(mn) waktu, O(mn) vis arrays. Multi-source BFS queue atau DFS rekursi.

Struktur cepat:
- Observasi inti masalah: Monotonic reachability from oceans reverses to «can drain to ocean» as reverse non-decreasing climb from coast.
- Strategi final yang dipilih: Two flood fills reverse gradient.
- Kenapa strategi ini paling cocok: Avoid exponential path enumeration from interior.
- Time complexity: O(mn)
- Space complexity: O(mn)
- Edge case utama: full plateau all reachable; corner cell touches both borders counts.

## 3) Versi Ultra Singkat (10-20 detik)

> DFS from Pacific borders up non-increasing reverse (i.e., climb non-decreasing heights); same Atlantic; AND masks.

## 4) Pseudocode Ringkas (5-10 baris)

```text
pac = false matrix; atl = same
dfs(r,c,reach,ocean):
  mark reach[r][c]=true
  for nr,nc in 4 neighbors:
    if in bounds and not reach[nr][nc] and height[nr][nc] >= height[r][c]:
      dfs(nr,nc,reach)
seed dfs on top row and left col for pac; bottom and right for atl
return positions where pac and atl true
```

## 5) Implementasi Final (Inti Saja)

```js
function pacificAtlantic(heights) {
  const m = heights.length, n = heights[0].length;
  const pac = Array.from({ length: m }, () => Array(n).fill(false));
  const atl = Array.from({ length: m }, () => Array(n).fill(false));
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  function dfs(r, c, reach) {
    reach[r][c] = true;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= m || nc >= n || reach[nr][nc]) continue;
      if (heights[nr][nc] < heights[r][c]) continue;
      dfs(nr, nc, reach);
    }
  }
  for (let j = 0; j < n; j++) dfs(0, j, pac);
  for (let i = 0; i < m; i++) dfs(i, 0, pac);
  for (let j = 0; j < n; j++) dfs(m - 1, j, atl);
  for (let i = 0; i < m; i++) dfs(i, n - 1, atl);
  const res = [];
  for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (pac[i][j] && atl[i][j]) res.push([i, j]);
  return res;
}
```

## 6) Bukti Correctness (Wajib)

- Reverse reachability under `>=` climb equals ability to drain to that ocean down non-increasing path (order reversal argument).

## 7) Dry Run Singkat

- Small 3×3 plateau verify overlap.

## 8) Red Flags (Yang Harus Dihindari)

- Simulating each cell path to both oceans separately — TLE.

## 9) Follow-up yang Sering Muncul

- Count cells only — same result size.

## 10) Trade-off Keputusan

- BFS vs DFS for fill — identical asymptotics.

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
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Clarify water flows to lower — reverse BFS climbs higher/equal.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Multi-source grid DFS
- Inti masalah (1 kalimat): Cells draining to both oceans.
- Soal: List of coordinates.
- Strategi final: Reverse flood from coasts with height >=
- Kompleksitas: O(mn), O(mn)
- 2 edge case: flat grid; single row
- 1 potensi bug: wrong monotonic direction
- 1 alasan valid: Reverse reachability matches downhill reach to ocean
