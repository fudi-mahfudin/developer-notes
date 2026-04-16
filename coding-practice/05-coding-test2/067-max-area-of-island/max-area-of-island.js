/**
 * Max Area of Island
 * @see knowledge-base/05-coding-test2/067-max-area-of-island.md
 *
 * @param {number[][]} grid
 * @returns {number}
 */
export function maxAreaOfIsland(grid) {
  const m = grid.length;
  const n = grid[0]?.length ?? 0;
  let best = 0;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== 1) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) best = Math.max(best, dfs(r, c));
    }
  }
  return best;
}
