/**
 * Rotting Oranges
 * @see knowledge-base/05-coding-test2/070-rotting-oranges.md
 *
 * @param {number[][]} grid
 * @returns {number}
 */
export function orangesRotting(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const q = [];
  let fresh = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) q.push([r, c, 0]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  if (fresh === 0) return 0;
  let t = 0;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let qi = 0;
  while (qi < q.length) {
    const [r, c, time] = q[qi++];
    t = time;
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= m || nc >= n || grid[nr][nc] !== 1) continue;
      grid[nr][nc] = 2;
      fresh--;
      q.push([nr, nc, time + 1]);
    }
  }
  return fresh === 0 ? t : -1;
}
