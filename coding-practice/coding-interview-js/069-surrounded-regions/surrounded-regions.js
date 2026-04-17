/**
 * Surrounded Regions
 * @see knowledge-base/05-coding-interview-pembahasan/069-surrounded-regions.md
 *
 * @param {character[][]} board
 * @returns {void}
 */
export function solve(board) {
  const m = board.length;
  const n = board[0]?.length ?? 0;
  if (!m) return;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== 'O') return;
    board[r][c] = 'T';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let c = 0; c < n; c++) {
    dfs(0, c);
    dfs(m - 1, c);
  }
  for (let r = 0; r < m; r++) {
    dfs(r, 0);
    dfs(r, n - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === 'O') board[r][c] = 'X';
      else if (board[r][c] === 'T') board[r][c] = 'O';
    }
  }
}
