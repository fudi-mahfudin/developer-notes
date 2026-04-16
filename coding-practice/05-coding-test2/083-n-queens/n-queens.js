/**
 * N-Queens
 * @see knowledge-base/05-coding-test2/083-n-queens.md
 *
 * @param {number} n
 * @returns {string[][]}
 */
export function solveNQueens(n) {
  const res = [];
  const cols = new Set();
  const diag = new Set();
  const anti = new Set();
  const board = Array.from({ length: n }, () => Array(n).fill('.'));

  function dfs(r) {
    if (r === n) {
      res.push(board.map((row) => row.join('')));
      return;
    }
    for (let c = 0; c < n; c++) {
      if (cols.has(c) || diag.has(r - c) || anti.has(r + c)) continue;
      cols.add(c);
      diag.add(r - c);
      anti.add(r + c);
      board[r][c] = 'Q';
      dfs(r + 1);
      board[r][c] = '.';
      cols.delete(c);
      diag.delete(r - c);
      anti.delete(r + c);
    }
  }
  dfs(0);
  return res;
}
