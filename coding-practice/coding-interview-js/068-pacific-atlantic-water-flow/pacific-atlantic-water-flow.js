/**
 * Pacific Atlantic Water Flow
 * @see knowledge-base/05-coding-interview-pembahasan/068-pacific-atlantic-water-flow.md
 *
 * DFS dari perbatasan: ke dalam hanya jika tetangga lebih tinggi atau sama.
 *
 * @param {number[][]} heights
 * @returns {number[][]}
 */
export function pacificAtlantic(heights) {
  const m = heights.length;
  const n = heights[0]?.length ?? 0;
  const pac = Array.from({ length: m }, () => Array(n).fill(false));
  const atl = Array.from({ length: m }, () => Array(n).fill(false));
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfs(r, c, seen) {
    if (seen[r][c]) return;
    seen[r][c] = true;
    const h = heights[r][c];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= m || nc >= n || seen[nr][nc]) continue;
      if (heights[nr][nc] < h) continue;
      dfs(nr, nc, seen);
    }
  }

  for (let c = 0; c < n; c++) dfs(0, c, pac);
  for (let r = 0; r < m; r++) dfs(r, 0, pac);
  for (let c = 0; c < n; c++) dfs(m - 1, c, atl);
  for (let r = 0; r < m; r++) dfs(r, n - 1, atl);

  const out = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) out.push([r, c]);
    }
  }
  return out;
}
