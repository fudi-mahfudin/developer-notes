# Sudoku Solver

## 1) Ringkasan Soal

**Info soal (isi dulu agar latihan terarah)**

- **Tingkat kesulitan:** Hard
- **Topik utama:** Backtracking
- **Inti masalah:** Isi `'1'-'9'` pada sel `'.'` sehingga valid **baris, kolom, subgrid 3×3** — satu solusi (asumsi solvable).

---

- Soal: `solveSudoku(board)` mutate 9×9 in-place void.
- Input: `char[][]` with `'.'` empty
- Constraints utama: Bitmask/barisan boolean untuk cek baris/kolom/kotak 3×3 index `box = (r/3)*3 + c/3`.

## 2) Jawaban Ideal Singkat (30-60 detik)

> Precompute bitmask atau `Set` untuk tiap baris/kolom/box awal dari known digits. `dfs` cari sel kosong pertama: coba digit 1..9 valid (tidak konflik); set `board[i][j]=ch`, update masks, rekurs; jika true return true; undo jika false. Ketika tidak ada `'.'` return true.

Struktur cepat:
- Observasi inti masalah: CSP with MRV optional—often find first empty cell order fixed still works 9x9.
- Strategi final yang dipilih: Backtracking with constraint tracking O(1) check.
- Kenapa strategi ini paling cocok: Standard for exact one solution Sudoku.
- Time complexity: worst exponential but heavily pruned for 9x9
- Space complexity: O(1) fixed board + recursion depth ≤81
- Edge case utama: nearly full board; invalid puzzle (not LC assumption).

## 3) Versi Ultra Singkat (10-20 detik)

> Fill first empty; try 1-9 valid; recurse; backtrack on failure.

## 4) Pseudocode Ringkas (5-10 baris)

```text
function dfs():
  find (i,j) with '.'
  if none: return true
  for d in 1..9:
    if valid(i,j,d):
      place(i,j,d)
      if dfs(): return true
      unplace(i,j,d)
  return false
```

## 5) Implementasi Final (Inti Saja)

```js
function solveSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const box = Array.from({ length: 9 }, () => new Set());
  const bi = (r, c) => ~~(r / 3) * 3 + ~~(c / 3);
  for (let r = 0; r < 9; r++)
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === '.') continue;
      const ch = board[r][c];
      rows[r].add(ch);
      cols[c].add(ch);
      box[bi(r, c)].add(ch);
    }
  const canPut = (r, c, ch) =>
    !rows[r].has(ch) && !cols[c].has(ch) && !box[bi(r, c)].has(ch);
  const dfs = () => {
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== '.') continue;
        for (let d = 1; d <= 9; d++) {
          const ch = String(d);
          if (!canPut(r, c, ch)) continue;
          board[r][c] = ch;
          rows[r].add(ch);
          cols[c].add(ch);
          box[bi(r, c)].add(ch);
          if (dfs()) return true;
          rows[r].delete(ch);
          cols[c].delete(ch);
          box[bi(r, c)].delete(ch);
          board[r][c] = '.';
        }
        return false;
      }
    return true;
  };
  dfs();
}
```

## 6) Bukti Correctness (Wajib)

- Backtracking explores full search tree with pruning; valid Sudoku guarantee ensures branch leads to completion.

## 7) Dry Run Singkat

- Partial board LC example.

## 8) Red Flags (Yang Harus Dihindari)

- Reconstruct new board ignore in-place requirement.

## 9) Follow-up yang Sering Muncul

- Valid Sudoku — only check without solve.

## 10) Trade-off Keputusan

- Bitmask 9-bit vs array[10]—same.

## 11) Checklist Siap Submit

- [x] Solusi lolos contoh soal.
- [x] Kompleksitas disebutkan jelas.
- [x] Edge case minimum sudah dicek.
- [x] Nama variabel jelas dan tidak ambigu.
- [x] Tidak ada mutasi input yang tidak perlu.
- [x] Kode bisa dijelaskan ulang dalam < 1 menit.

## 12) Skor Evaluasi Diri

- Correctness: 9/10
- Efisiensi: 9/10
- Kejelasan penjelasan: 8/10
- Kerapihan implementasi: 9/10
- Catatan perbaikan: Latih versi minimal tanpa Set jika diminta—array bit kecil 9.

---

## Template Drill Cepat (Isi < 2 Menit)

- Tingkat kesulitan: Hard
- Topik utama: Backtracking CSP
- Inti masalah (1 kalimat): Complete Sudoku valid grid.
- Soal: Void in-place.
- Strategi final: DFS first empty try 1–9
- Kompleksitas: exponential worst; tiny 9x9 OK
- 2 edge case: few empties; many branches
- 1 potensi bug: row/col/box flag desync
- 1 alasan valid: depth-first search on finite domain finishes if solvable
