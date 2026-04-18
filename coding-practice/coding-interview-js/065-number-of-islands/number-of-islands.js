/**
 * Number of Islands
 * @see knowledge-base/05-coding-interview-pembahasan/065-number-of-islands.md
 *
 * @param {character[][]} grid
 * @returns {number}
 */
export function numIslands(grid) {
  if (!grid.length) return 0;
  const m = grid.length;
  const n = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}
