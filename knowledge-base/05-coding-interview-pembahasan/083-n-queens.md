# N-Queens

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Backtracking
- **Inti masalah:** Taruh `n` ratu pada papan `n×n` sehingga **tidak saling serang** (baris, kolom, diagonal). Output semua konfigurasi valid sebagai papan dengan `'Q'` dan `'.'`.

---

- Soal: `solveNQueens(n)` array of `n` string length `n`.
- Input: integer `n` (biasanya 1..9)
- Output: semua solusi
- Constraints utama: Track `cols`, `diag`, `anti` sets/mask; place row-by-row.

## 2) Jawaban Ideal Singkat (30-60 detik)

> DFS **`r`** baris: jika `r===n` materialize board dari `queenCol[r]` atau simpan `col` per row. Untuk setiap kolom `c` jika legal (`!cols[c]`, `diag[r+c]`, `anti[r-c+n-1]` atau hash set), mark, recurse `r+1`, unmark. Diagonal utama index `r-c` konstant, other `r+c`. O(n!) approximate branching pruned.

Struktur cepat:
- Observasi inti masalah: N-queens classic constraint satisfaction with incremental feasibility.
- Strategi final yang dipilih: Row-wise backtracking with diagonal bitmask arrays.
- Kenapa strategi ini paling cocok: Standard N-queens solution.
- Time complexity: exponential tight
- Space complexity: O(n) state
- Edge case utama: `n=1` single solution; `n=2,3` zero.

## 3) Versi Ultra Singkat (10-20 detik)

> Place queen per row; ban column + two diagonals; backtrack.

## 4) Pseudocode Ringkas (5-10 baris)

```text
cols = set(); d1 = set(); d2 = set()  // d1: r+c, d2: r-c

function dfs(r, placement):
  if r == n: record board; return
  for c in 0..n-1:
    if c in cols or (r+c) in d1 or (r-c) in d2: continue
    mark sets; placement[r]=c
    dfs(r+1, placement)
    unmark

```

## 5) Implementasi Final (Inti Saja)

```js
function solveNQueens(n) {
  const res = [],
    cols = new Set(),
    diag = new Set(),
    anti = new Set();
  const brd = (pos) =>
    pos.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - 1 - c));
  const dfs = (r, pos) => {
    if (r === n) {
      res.push(brd(pos));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r + c) || anti.has(r - c)) continue;
      cols.add(c);
      diag.add(r + c);
      anti.add(r - c);
      pos[r] = c;
      dfs(r + 1, pos);
      cols.delete(c);
      diag.delete(r + c);
      anti.delete(r - c);
    }
  };
  dfs(0, new Array(n));
  return res;
}
```

## 6) Bukti Correctness (Wajib)

- Row-by-row placement ensures one queen per row; column and diagonal sets enforce non-attacking.

## 7) Dry Run Singkat

- `n=4` two solutions up to symmetry.

## 8) Red Flags (Yang Harus Dihindari)

- Checking full board naively each time O(n²) per node — use sets.

## 9) Follow-up yang Sering Muncul

- N-Queens II — count only.

## 10) Trade-off Keputusan

- Bitmask integers vs three Sets — same logic.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 10/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Clarify diagonal indexing `r-c` offset for array if using booleans.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Constraint backtracking
- Inti masalah (1 kalimat): All non-attacking queen placements.
- Soal: List of boards.
- Strategi final: Row DFS + 3 constraints
- Kompleksitas: exponential
- 2 edge case: n=1; impossible small n
- 1 potensi bug: diagonal formula wrong
- 1 alasan valid: incremental validity keeps partial solutions extendable
