/**
 * Sudoku Solver
 * @see knowledge-base/05-coding-test2/084-sudoku-solver.md
 *
 * @param {character[][]} board
 * @returns {void}
 */
export function solveSudoku(board) {
  function solve() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== '.') continue;
        for (let d = 1; d <= 9; d++) {
          const ch = String(d);
          if (!valid(r, c, ch)) continue;
          board[r][c] = ch;
          if (solve()) return true;
          board[r][c] = '.';
        }
        return false;
      }
    }
    return true;
  }

  function valid(r, c, ch) {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === ch || board[i][c] === ch) return false;
    }
    const br = (r / 3) | 0;
    const bc = (c / 3) | 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[br * 3 + i][bc * 3 + j] === ch) return false;
      }
    }
    return true;
  }

  solve();
}
