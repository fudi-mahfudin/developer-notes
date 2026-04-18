/**
 * Judul: Topik 65 — Connected components / island counting pada grid
 *
 * Soal test eksplisit:
 * - numIslands: grid '1' daratan, '0' air; 4-arah.
 * - maxAreaOfIsland: luas maksimum satu pulau (jumlah sel '1' terhubung).
 * - countComponentsUndirected: jumlah komponen terhubung dari adjacency list tak berarah.
 *
 * Contoh output:
 * - Grid 2×2 semua '1' → 1 pulau, area 4.
 *
 * Solusi: DFS/BFS flood fill; salin grid agar tidak mutasi input asli.
 *
 * @see knowledge-base/05-coding-interview-v2/65-connected-components-islands.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/65-connected-components-islands/connected-components-islands.test.js`
 */

/**
 * Judul: Salin grid karakter (immutable-friendly untuk tes)
 *
 * Soal test eksplisit:
 * - Snapshot input tidak berubah setelah numIslands jika kita salin di dalam fungsi.
 *
 * @param {string[][]} grid
 * @returns {string[][]}
 */
export function cloneGrid(grid) {
  return grid.map((row) => [...row]);
}

/**
 * Judul: Jumlah pulau (4-neighbor)
 *
 * Soal test eksplisit:
 * - Semua '0' → 0; satu sel '1' → 1.
 *
 * Contoh output:
 * - Dua pulau terpisah (tidak berbagi sisi) → 2.
 *
 * Solusi: double loop; DFS tandai '0' setelah dikunjungi.
 *
 * @param {string[][]} grid
 * @returns {number}
 */
export function numIslands(grid) {
  if (!grid.length) return 0;
  const g = cloneGrid(grid);
  const rows = g.length;
  const cols = g[0].length;
  let count = 0;

  /**
   * @param {number} r
   * @param {number} c
   */
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    if (g[r][c] !== "1") return;
    g[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (g[r][c] === "1") {
        count += 1;
        dfs(r, c);
      }
    }
  }
  return count;
}

/**
 * Judul: Luas pulau terbesar
 *
 * Soal test eksplisit:
 * - Beberapa pulau; kembalikan area integer terbesar.
 *
 * Contoh output:
 * - Dua pulau ukuran 2 dan 5 → 5.
 *
 * Solusi: DFS kembalikan jumlah sel; reuse grid salinan per komponen atau satu pass.
 *
 * @param {string[][]} grid
 * @returns {number}
 */
export function maxAreaOfIsland(grid) {
  if (!grid.length) return 0;
  const g = cloneGrid(grid);
  const rows = g.length;
  const cols = g[0].length;
  let best = 0;

  /**
   * @param {number} r
   * @param {number} c
   * @returns {number}
   */
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return 0;
    if (g[r][c] !== "1") return 0;
    g[r][c] = "0";
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (g[r][c] === "1") best = Math.max(best, dfs(r, c));
    }
  }
  return best;
}

/**
 * Judul: Komponen terhubung pada graf tak berarah (adjacency list)
 *
 * Soal test eksplisit:
 * - Dua edge terpisah pada 4 node → 2 komponen.
 *
 * Contoh output:
 * - Kosong n=0 → 0.
 *
 * Solusi: DFS dari setiap node belum dikunjungi.
 *
 * @param {number[][]} adj
 * @returns {number}
 */
export function countComponentsUndirected(adj) {
  const n = adj.length;
  /** @type {boolean[]} */
  const seen = Array(n).fill(false);
  let comp = 0;
  for (let i = 0; i < n; i++) {
    if (seen[i]) continue;
    comp += 1;
    const stack = [i];
    while (stack.length) {
      const u = stack.pop();
      if (seen[u]) continue;
      seen[u] = true;
      for (const v of adj[u]) if (!seen[v]) stack.push(v);
    }
  }
  return comp;
}

/**
 * Judul: Bangun adj tak berarah untuk uji countComponentsUndirected
 *
 * Soal test eksplisit:
 * - Sama seperti buildUndirectedAdj di topik 62.
 *
 * @param {number} n
 * @param {number[][]} edges
 */
export function buildUndirectedAdjSimple(n, edges) {
  /** @type {number[][]} */
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  for (let i = 0; i < n; i++) adj[i].sort((a, b) => a - b);
  return adj;
}
