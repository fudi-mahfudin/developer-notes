/**
 * Judul: Topik 62 — Representasi graf (adjacency list, matrix, konversi edge list)
 *
 * Soal test eksplisit:
 * - buildUndirectedAdj: edge [u,v] muncul di kedua arah; neighbor terurut naik.
 * - buildDirectedAdj: hanya u → v.
 * - undirectedEdgeListFromAdj: round-trip tanpa duplikat (u<v convention).
 * - degree / inOutDegree: derajat simpul untuk uji konsistensi.
 *
 * Contoh output:
 * - n=3, edges [[0,1],[1,2]] → adj[0]=[1], adj[1]=[0,2], adj[2]=[1].
 *
 * Solusi: array of arrays; sort neighbor untuk deterministik; matrix n×n untuk cek O(1) edge.
 *
 * @see knowledge-base/05-coding-interview-v2/62-graph-representation.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/62-graph-representation/graph-representation.test.js`
 */

/**
 * Judul: Adjacency list tak berarah dari daftar edge
 *
 * Soal test eksplisit:
 * - Self-loop [0,0] → 0 punya neighbor 0 sekali.
 *
 * Contoh output:
 * - Triangle 0-1-2-0 → tiap node derajat 2.
 *
 * Solusi: push kedua arah; sort setiap bucket.
 *
 * @param {number} n
 * @param {number[][]} edges
 * @returns {number[][]}
 */
export function buildUndirectedAdj(n, edges) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n invalid");
  /** @type {number[][]} */
  const adj = Array.from({ length: n }, () => []);
  for (const e of edges) {
    const [u, v] = e;
    if (u < 0 || u >= n || v < 0 || v >= n) throw new RangeError("edge out of range");
    adj[u].push(v);
    adj[v].push(u);
  }
  for (let i = 0; i < n; i++) adj[i].sort((a, b) => a - b);
  return adj;
}

/**
 * Judul: Adjacency list berarah
 *
 * Soal test eksplisit:
 * - [[0,1],[0,2]] → adj[0]=[1,2], adj[1]=[ ], adj[2]=[ ].
 *
 * Contoh output:
 * - Edge tunggal → indegree target naik.
 *
 * @param {number} n
 * @param {number[][]} edges
 * @returns {number[][]}
 */
export function buildDirectedAdj(n, edges) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n invalid");
  /** @type {number[][]} */
  const adj = Array.from({ length: n }, () => []);
  for (const e of edges) {
    const [u, v] = e;
    if (u < 0 || u >= n || v < 0 || v >= n) throw new RangeError("edge out of range");
    adj[u].push(v);
  }
  for (let i = 0; i < n; i++) adj[i].sort((a, b) => a - b);
  return adj;
}

/**
 * Judul: Matriks adjacency 0/1 (tak berarah: simetris)
 *
 * Soal test eksplisit:
 * - matrix[0][1] === matrix[1][0] === 1 jika ada edge.
 *
 * Contoh output:
 * - n=2, satu edge → jumlah 1 di matrix = 2 (karena simetris).
 *
 * Solusi: set matrix[u][v] dan matrix[v][u].
 *
 * @param {number} n
 * @param {number[][]} edges
 * @returns {number[][]}
 */
export function buildUndirectedMatrix(n, edges) {
  /** @type {number[][]} */
  const m = Array.from({ length: n }, () => Array(n).fill(0));
  for (const [u, v] of edges) {
    m[u][v] = 1;
    m[v][u] = 1;
  }
  return m;
}

/**
 * Judul: Edge list unik dari adj tak berarah (u < v)
 *
 * Soal test eksplisit:
 * - Round-trip dengan buildUndirectedAdj menghasilkan struktur setara (set edge).
 *
 * Contoh output:
 * - [[0,1],[0,2]] dari adj star di 0.
 *
 * @param {number[][]} adj
 * @returns {number[][]}
 */
export function undirectedEdgeListFromAdj(adj) {
  const n = adj.length;
  /** @type {number[][]} */
  const out = [];
  for (let u = 0; u < n; u++) {
    for (const v of adj[u]) {
      if (u < v) out.push([u, v]);
    }
  }
  out.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return out;
}

/**
 * Judul: Derajat simpul pada graf tak berarah
 *
 * Soal test eksplisit:
 * - derajat = panjang neighbor list (tanpa double count dari loop).
 *
 * Contoh output:
 * - Isolated node → 0.
 *
 * @param {number[][]} adj
 * @param {number} u
 */
export function degree(adj, u) {
  return adj[u].length;
}

/**
 * Judul: Indegree dan outdegree berarah
 *
 * Soal test eksplisit:
 * - Star masuk ke 0: indegree[0] = n-1.
 *
 * Contoh output:
 * - outdegree[u] = adj[u].length.
 *
 * @param {number[][]} adj
 * @returns {{ in: number[], out: number[] }}
 */
export function inOutDegree(adj) {
  const n = adj.length;
  /** @type {number[]} */
  const inn = Array(n).fill(0);
  const out = Array(n).fill(0);
  for (let u = 0; u < n; u++) {
    out[u] = adj[u].length;
    for (const v of adj[u]) inn[v] += 1;
  }
  return { in: inn, out };
}

/**
 * Judul: Cek edge ada (list atau matrix)
 *
 * Soal test eksplisit:
 * - hasEdgeUndirectedAdj(adj,0,1) === hasEdgeUndirectedAdj(adj,1,0).
 *
 * Contoh output:
 * - Tidak ada → false.
 *
 * Solusi: binary search pada neighbor sorted atau linear scan kecil.
 *
 * @param {number[][]} adj
 * @param {number} u
 * @param {number} v
 */
export function hasEdgeUndirectedAdj(adj, u, v) {
  const list = adj[u];
  let lo = 0;
  let hi = list.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (list[mid] === v) return true;
    if (list[mid] < v) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
}

/**
 * Judul: Jumlah edge tak berarah (tanpa double count)
 *
 * Soal test eksplisit:
 * - Jumlah edge dari edge list = sum(deg)/2.
 *
 * Contoh output:
 * - 3 node chain → 2 edge.
 *
 * @param {number[][]} adj
 */
export function countUndirectedEdges(adj) {
  let s = 0;
  for (let i = 0; i < adj.length; i++) s += adj[i].length;
  return s / 2;
}
