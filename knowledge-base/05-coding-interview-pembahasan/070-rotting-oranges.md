# Rotting Oranges

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Medium
- **Topik utama:** BFS multi-source layered
- **Inti masalah:** Menit demi menit, rotten menularkan ke **4-tetangga fresh**; hitung menit sampai semua busuk atau `-1` jika impossible.

---

- Soal: `orangesGrid` `0` empty `1` fresh `2` rotten.
- Output: minutes integer or -1
- Constraints utama: BFS level-order with **all initial rotten in queue** at minute 0; count fresh leftover.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Hitung `fresh`. Queue semua (r,c) rotten awal. `minutes=0`. BFS: `size = queue.length` per level; untuk setiap rotten pop, coba 4 arah: jika `1`, set `2`, `fresh--`, enqueue. Setelah selesai level, jika queue tidak kosong `minutes++` (atau count levels via steps). Akhir: return `-1` jika `fresh>0` else `minutes` (note: if already no fresh at start return `0`; some implementations count waves carefully). **Perhatian**: menit increment setelah layer propagasi — align with LC: time = levels - 1 or minutes from first batch — verify on example.

Struktur cepat:
- Observasi inti masalah: Simultaneous spreading = multi-source BFS shortest path max over fresh.
- Strategi final yang dipilih: Queue rotten frontier with per-minute layer processing.
- Kenapa strategi ini paling cocok: O(mn) natural.
- Time complexity: O(mn)
- Space complexity: O(mn) queue worst
- Edge case utama: no fresh → 0; isolated fresh unreachable.

## 3) Versi Ultra Singkat (10-20 detik)

> Multi-source BFS from all 2s; count layers until no spread; check fresh left.

## 4) Pseudocode Ringkas (5-10 baris)

```text
queue all rotten cells; count fresh
time = 0
while queue not empty and fresh > 0:
  for each cell in current layer:
    expand to fresh neighbors: rot them, enqueue, fresh--
  if queue not empty for next minute: time++
return fresh==0 ? time : -1  // tune for LC minute definition
```

## 5) Implementasi Final (Inti Saja)

```js
function orangesRotting(grid) {
  const m = grid.length,
    n = grid[0].length;
  const q = [];
  let fresh = 0;
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) q.push([i, j]);
      else if (grid[i][j] === 1) fresh++;
    }
  let mins = 0;
  const d = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  while (q.length && fresh > 0) {
    const sz = q.length;
    for (let k = 0; k < sz; k++) {
      const [r, c] = q.shift();
      for (const [dr, dc] of d) {
        const nr = r + dr,
          nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= m || nc >= n || grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2;
        fresh--;
        q.push([nr, nc]);
      }
    }
    mins++;
  }
  return fresh === 0 ? mins : -1;
}
```

*(Jika sejak awal `fresh === 0`, loop BFS tidak jalan — kembalikan `0` sebelum BFS atau cek: `if (fresh === 0) return 0`.)*

## 6) Bukti Correctness (Wajib)

- BFS layers equal minutes for synchronous spread; unreachable fresh remain.

## 7) Dry Run Singkat

- LC 3×3 example → 4 minutes.

## 8) Red Flags (Yang Harus Dihindari)

- DFS wrong for shortest time layering.

## 9) Follow-up yang Sering Muncul

- Different adjacency or obstacles — weighted BFS.

## 10) Trade-off Keputusan

- Separate minutes counter vs track timestamp per cell.

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
- Catatan perbaikan: Verify minute 0 edge cases with official LC tests.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Medium
- Topik utama: Multi-source BFS
- Inti masalah (1 kalimat): Minutes to rot all oranges 4-neighbor.
- Soal: Int minutes.
- Strategi final: Layered BFS from all rotten
- Kompleksitas: O(mn), O(mn)
- 2 edge case: no fresh at start; unreachable 1
- 1 potensi bug: off-by-one on minutes
- 1 alasan valid: synchronous propagation = BFS depth
