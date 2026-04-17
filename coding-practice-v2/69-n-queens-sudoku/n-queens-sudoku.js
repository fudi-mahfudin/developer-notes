/**
 * Judul: Topik 69 — N-Queens dan validasi Sudoku (parsial)
 *
 * Soal test eksplisit:
 * - nQueensCount: jumlah solusi valid penempatan ratu pada papan N×N.
 * - nQueensSolutions: daftar board sebagai string '.' dan 'Q'.
 * - isValidSudokuPartial: cek baris/kolom/kotak 3×3 tanpa duplikat 1–9 (board 9×9).
 *
 * Contoh output:
 * - N=1 → 1 solusi; N=4 → 2 solusi klasik.
 *
 * Solusi: backtracking per baris + Set kolom/diagonal; Sudoku = cek constraint.
 *
 * @see knowledge-base/05-coding-interview-v2/69-n-queens-sudoku.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/69-n-queens-sudoku/n-queens-sudoku.test.js`
 */

/**
 * Judul: Hitung solusi N-Queens
 *
 * Soal test eksplisit:
 * - n=4 → 2; n=8 → 92.
 *
 * Contoh output:
 * - n=0 → 0 (definisi edge).
 *
 * Solusi: DFS baris; tandai kolom dan dua diagonal.
 *
 * @param {number} n
 * @returns {number}
 */
export function nQueensCount(n) {
  if (n < 0 || !Number.isInteger(n)) throw new RangeError("n invalid");
  if (n === 0) return 0;
  let count = 0;
  /** @type {Set<number>} */
  const cols = new Set();
  /** @type {Set<number>} */
  const diag = new Set();
  /** @type {Set<number>} */
  const anti = new Set();

  /**
   * @param {number} row
   */
  function dfs(row) {
    if (row === n) {
      count += 1;
      return;
    }
    for (let c = 0; c < n; c++) {
      const d1 = row - c;
      const d2 = row + c;
      if (cols.has(c) || diag.has(d1) || anti.has(d2)) continue;
      cols.add(c);
      diag.add(d1);
      anti.add(d2);
      dfs(row + 1);
      cols.delete(c);
      diag.delete(d1);
      anti.delete(d2);
    }
  }
  dfs(0);
  return count;
}

/**
 * Judul: Semua solusi sebagai array of array string ('Q' / '.')
 *
 * Soal test eksplisit:
 * - n=4 → 2 board berbeda.
 *
 * Contoh output:
 * - Setiap baris string panjang n.
 *
 * @param {number} n
 * @returns {string[][]}
 */
export function nQueensSolutions(n) {
  /** @type {string[][]} */
  const out = [];
  /** @type {number[]} */
  const pos = Array(n).fill(-1);

  /**
   * @param {number} row
   */
  function ok(row, col) {
    for (let r = 0; r < row; r++) {
      const c = pos[r];
      if (c === col || Math.abs(c - col) === row - r) return false;
    }
    return true;
  }

  /**
   * @param {number} row
   */
  function dfs(row) {
    if (row === n) {
      /** @type {string[]} */
      const board = [];
      for (let r = 0; r < n; r++) {
        let s = "";
        for (let c = 0; c < n; c++) s += pos[r] === c ? "Q" : ".";
        board.push(s);
      }
      out.push(board);
      return;
    }
    for (let c = 0; c < n; c++) {
      if (!ok(row, c)) continue;
      pos[row] = c;
      dfs(row + 1);
      pos[row] = -1;
    }
  }
  dfs(0);
  return out;
}

/**
 * Judul: Validasi Sudoku parsial (board 9×9, '.' kosong)
 *
 * Soal test eksplisit:
 * - Duplikat di baris → false.
 *
 * Contoh output:
 * - Board kosong semua → true.
 *
 * Solusi: loop baris, kolom, blok 3×3 dengan Set.
 *
 * @param {string[][]} board
 * @returns {boolean}
 */
export function isValidSudokuPartial(board) {
  if (board.length !== 9) return false;
  for (const row of board) if (row.length !== 9) return false;

  for (let r = 0; r < 9; r++) {
    const s = new Set();
    for (let c = 0; c < 9; c++) {
      const ch = board[r][c];
      if (ch === ".") continue;
      if (s.has(ch)) return false;
      s.add(ch);
    }
  }
  for (let c = 0; c < 9; c++) {
    const s = new Set();
    for (let r = 0; r < 9; r++) {
      const ch = board[r][c];
      if (ch === ".") continue;
      if (s.has(ch)) return false;
      s.add(ch);
    }
  }
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const s = new Set();
      for (let r = br * 3; r < br * 3 + 3; r++) {
        for (let c = bc * 3; c < bc * 3 + 3; c++) {
          const ch = board[r][c];
          if (ch === ".") continue;
          if (s.has(ch)) return false;
          s.add(ch);
        }
      }
    }
  }
  return true;
}
