/**
 * Judul: Topik 63 — Shortest path: BFS (unweighted) vs Dijkstra (non-negative weight)
 *
 * Soal test eksplisit:
 * - shortestPathUnweighted: BFS pada adj tak berarah → panjang edge minimum.
 * - dijkstra: graf berbobot non-negatif, jarak minimum dari source.
 * - reconstruct path dari parent / prev array.
 *
 * Contoh output:
 * - Garis 0-1-2 tanpa bobot → jarak 0→2 = 2 edge.
 *
 * Solusi: BFS queue; Dijkstra min-heap sederhana (array) atau scan O(V²).
 *
 * @see knowledge-base/05-coding-interview-v2/63-shortest-path-bfs-dijkstra-concept.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/63-shortest-path-bfs-dijkstra-concept/shortest-path-bfs-dijkstra-concept.test.js`
 */

/**
 * Judul: BFS — jarak minimum jumlah edge dari `start` (graf tak berbobot)
 *
 * Soal test eksplisit:
 * - Tidak terhubung → jarak Infinity; path null.
 *
 * Contoh output:
 * - start=0, target=2 pada path 0-1-2 → dist 2.
 *
 * Solusi: BFS level; simpan parent untuk rekonstruksi.
 *
 * @param {number[][]} adj
 * @param {number} start
 * @param {number} target
 * @returns {{ dist: number, path: number[] | null }}
 */
export function shortestPathUnweighted(adj, start, target) {
  const n = adj.length;
  if (start === target) return { dist: 0, path: [start] };
  /** @type {number[]} */
  const dist = Array(n).fill(Infinity);
  /** @type {(number | null)[]} */
  const parent = Array(n).fill(null);
  dist[start] = 0;
  const q = [start];
  let qi = 0;
  while (qi < q.length) {
    const u = q[qi++];
    if (u === target) break;
    for (const v of adj[u]) {
      if (dist[v] !== Infinity) continue;
      dist[v] = dist[u] + 1;
      parent[v] = u;
      q.push(v);
    }
  }
  if (dist[target] === Infinity) return { dist: Infinity, path: null };
  /** @type {number[]} */
  const path = [];
  for (let cur = target; cur !== null; cur = parent[cur]) path.push(cur);
  path.reverse();
  return { dist: dist[target], path };
}

/**
 * Judul: Dijkstra — edge weight non-negatif, adj[u] = array [v, w]
 *
 * Soal test eksplisit:
 * - Graf kecil dengan dua jalur; pilih yang total bobot lebih kecil.
 *
 * Contoh output:
 * - 0→1 bobot 4, 0→2 bobot 1, 2→1 bobot 1 → jarak 0→1 = 2.
 *
 * Solusi: priority queue (binary heap sederhana) atau O(V²) pilih min dist.
 *
 * @param {Array<Array<[number, number]>>} weightedAdj
 * @param {number} start
 * @param {number} target
 * @returns {{ dist: number, path: number[] | null }}
 */
export function dijkstra(weightedAdj, start, target) {
  const n = weightedAdj.length;
  /** @type {number[]} */
  const dist = Array(n).fill(Infinity);
  /** @type {(number | null)[]} */
  const parent = Array(n).fill(null);
  dist[start] = 0;
  /** @type {boolean[]} */
  const done = Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    let u = -1;
    let best = Infinity;
    for (let j = 0; j < n; j++) {
      if (!done[j] && dist[j] < best) {
        best = dist[j];
        u = j;
      }
    }
    if (u === -1 || best === Infinity) break;
    done[u] = true;
    if (u === target) break;
    for (const [v, w] of weightedAdj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        parent[v] = u;
      }
    }
  }

  if (dist[target] === Infinity) return { dist: Infinity, path: null };
  /** @type {number[]} */
  const path = [];
  for (let cur = target; cur !== null; cur = parent[cur]) path.push(cur);
  path.reverse();
  return { dist: dist[target], path };
}

/**
 * Judul: Bangun weighted adjacency dari edge list (directed) [u,v,w]
 *
 * Soal test eksplisit:
 * - Multi-edge: diambil yang terakhir atau min — di sini overwrite edge sama u→v.
 *
 * Contoh output:
 * - n=3, [[0,1,3],[0,2,1],[2,1,1]].
 *
 * @param {number} n
 * @param {number[][]} edges [u,v,w]
 * @returns {Array<Array<[number, number]>>}
 */
export function buildWeightedDirectedAdj(n, edges) {
  /** @type {Map<string, number>} */
  const map = new Map();
  for (const [u, v, w] of edges) {
    map.set(`${u},${v}`, w);
  }
  /** @type {Array<Array<[number, number]>>} */
  const adj = Array.from({ length: n }, () => []);
  for (const [key, w] of map) {
    const [u, v] = key.split(",").map(Number);
    adj[u].push([v, w]);
  }
  for (let i = 0; i < n; i++) adj[i].sort((a, b) => a[0] - b[0]);
  return adj;
}

/**
 * Judul: Konversi graf tak berarah unweighted ke adj untuk BFS
 *
 * Soal test eksplisit:
 * - Sama seperti buildUndirectedAdj di topik 62 (reuse pattern).
 *
 * @param {number} n
 * @param {number[][]} edges
 */
export function buildUndirectedAdjForBfs(n, edges) {
  /** @type {number[][]} */
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }
  for (let i = 0; i < n; i++) adj[i].sort((a, b) => a - b);
  return adj;
}
