/**
 * Word Search
 * @see knowledge-base/05-coding-test2/080-word-search.md
 *
 * @param {character[][]} board
 * @param {string} word
 * @returns {boolean}
 */
export function exist(board, word) {
  const m = board.length;
  const n = board[0].length;

  function dfs(r, c, k) {
    if (k === word.length) return true;
    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[k]) return false;
    const tmp = board[r][c];
    board[r][c] = '#';
    const found =
      dfs(r + 1, c, k + 1) || dfs(r - 1, c, k + 1) || dfs(r, c + 1, k + 1) || dfs(r, c - 1, k + 1);
    board[r][c] = tmp;
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}
