/**
 * Walls and Gates
 * @see knowledge-base/05-coding-test2/071-walls-and-gates.md
 *
 * Gate = 0, dinding = -1, ruang kosong = INF
 * @param {number[][]} rooms
 * @returns {void}
 */
const INF = 2147483647;

export function wallsAndGates(rooms) {
  const m = rooms.length;
  const n = rooms[0]?.length ?? 0;
  const q = [];

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (rooms[r][c] === 0) q.push([r, c]);
    }
  }

  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let qi = 0;
  while (qi < q.length) {
    const [r, c] = q[qi++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= m || nc >= n || rooms[nr][nc] !== INF) continue;
      rooms[nr][nc] = rooms[r][c] + 1;
      q.push([nr, nc]);
    }
  }
}
