/**
 * Judul: Topik 55 — DFS vs BFS pada graf tak berarah (traversal, path, komponen)
 *
 * Soal test eksplisit:
 * - buildUndirectedAdj: edge `[u,v]` → keduanya di neighbor list, neighbor terurut naik.
 * - dfsPreorder: stack iteratif, neighbor besar didahulukan push agar kecil dikunjungi dulu.
 * - bfsOrder: antrian FIFO, urutan lebar-pertama.
 * - hasPathBfs / hasPathDfs: uji konektivitas dua titik (hasil harus konsisten).
 * - countComponents: hitung komponen terhubung (DFS/BFS penuh).
 *
 * Kontrak (opsional): simpul `0..n-1`; tidak multi-edge di uji (tetap aman jika duplikat).
 *
 * Contoh output:
 * - Star center `0`: BFS dari `0` → `[0,1,2,3]`.
 *
 * Solusi: DFS = stack/backtrack; BFS = queue; path = BFS/DFS dari `a`; komponen = loop semua simpul + DFS.
 *
 * @see knowledge-base/05-coding-interview-v2/55-dfs-vs-bfs.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/55-dfs-vs-bfs/dfs-vs-bfs.test.js`
 */

/**
 * Judul: Bangun adjacency list dari pasangan tak berarah
 *
 * Soal test:
 * - `[[0,1],[0,2]]` → `0:[1,2], 1:[0], 2:[0]` setelah sort.
 *
 * @param {number} n
 * @param {number[][]} edges
 * @returns {number[][]}
 */
export function buildUndirectedAdj(n, edges) {
  if (!Number.isInteger(n) || n < 0) throw new RangeError("n must be non-negative integer");
  if (!Array.isArray(edges)) throw new TypeError("edges must be array");
  /** @type {number[][]} */
  const adj = Array.from({ length: n }, () => []);
  for (const e of edges) {
    if (!Array.isArray(e) || e.length !== 2) throw new TypeError("each edge must be [u,v]");
    const [u, v] = e;
    if (!Number.isInteger(u) || !Number.isInteger(v) || u < 0 || v < 0 || u >= n || v >= n) {
      throw new RangeError("edge out of range");
    }
    adj[u].push(v);
    adj[v].push(u);
  }
  for (let i = 0; i < n; i++) adj[i].sort((a, b) => a - b);
  return adj;
}

/**
 * Judul: DFS preorder (iteratif stack)
 *
 * Soal test:
 * - Graf baris `0-1-2`, start 0 → `[0,1,2]` (neighbor kecil dulu).
 *
 * @param {number[][]} adj
 * @param {number} start
 * @returns {number[]}
 */
export function dfsPreorder(adj, start) {
  if (!Array.isArray(adj)) throw new TypeError("adj must be array");
  if (!Number.isInteger(start) || start < 0 || start >= adj.length) throw new RangeError("bad start");
  /** @type {number[]} */
  const out = [];
  /** @type {boolean[]} */
  const seen = Array(adj.length).fill(false);
  /** @type {number[]} */
  const stack = [start];
  while (stack.length) {
    const u = stack.pop();
    if (seen[u]) continue;
    seen[u] = true;
    out.push(u);
    for (let i = adj[u].length - 1; i >= 0; i--) {
      const v = adj[u][i];
      if (!seen[v]) stack.push(v);
    }
  }
  return out;
}

/**
 * Judul: BFS level order
 *
 * Soal test:
 * - Sama graf kecil; urutan lebar dulu.
 *
 * Contoh output:
 * - `bfsOrder(adj, 0)` pada star `0` pusat → `[0,1,2,3]`.
 *
 * @param {number[][]} adj
 * @param {number} start
 * @returns {number[]}
 */
export function bfsOrder(adj, start) {
  if (!Array.isArray(adj)) throw new TypeError("adj must be array");
  if (!Number.isInteger(start) || start < 0 || start >= adj.length) throw new RangeError("bad start");
  /** @type {number[]} */
  const out = [];
  /** @type {boolean[]} */
  const seen = Array(adj.length).fill(false);
  /** @type {number[]} */
  const q = [start];
  seen[start] = true;
  let qi = 0;
  while (qi < q.length) {
    const u = q[qi++];
    out.push(u);
    for (const v of adj[u]) {
      if (!seen[v]) {
        seen[v] = true;
        q.push(v);
      }
    }
  }
  return out;
}

/**
 * Judul: Ada jalur antara `a` dan `b` (BFS)
 *
 * Soal test:
 * - Terhubung → `true`; komponen terpisah → `false`.
 *
 * @param {number[][]} adj
 * @param {number} a
 * @param {number} b
 */
export function hasPathBfs(adj, a, b) {
  if (a === b) return true;
  /** @type {boolean[]} */
  const seen = Array(adj.length).fill(false);
  const q = [a];
  seen[a] = true;
  let qi = 0;
  while (qi < q.length) {
    const u = q[qi++];
    if (u === b) return true;
    for (const v of adj[u]) {
      if (!seen[v]) {
        seen[v] = true;
        q.push(v);
      }
    }
  }
  return false;
}

/**
 * Judul: Ada jalur antara `a` dan `b` (DFS rekursif dengan `seen`)
 *
 * Soal test:
 * - Sama boolean dengan `hasPathBfs` pada graf kecil terhubung dan terputus.
 *
 * Contoh output:
 * - Path `0-1-2`, `hasPathDfs(adj,0,2)` → `true`.
 *
 * Kontrak: `adj` valid; tidak ubah struktur graf.
 *
 * Solusi: `dfs(u)` — mark visited; rekursi neighbor belum dikunjungi.
 *
 * @param {number[][]} adj
 * @param {number} a
 * @param {number} b
 */
export function hasPathDfs(adj, a, b) {
  if (a === b) return true;
  /** @type {boolean[]} */
  const seen = Array(adj.length).fill(false);
  /**
   * @param {number} u
   * @returns {boolean}
   */
  function dfs(u) {
    if (u === b) return true;
    seen[u] = true;
    for (const v of adj[u]) {
      if (!seen[v] && dfs(v)) return true;
    }
    return false;
  }
  return dfs(a);
}

/**
 * Judul: Jumlah edge (undirected, tiap pasangan sekali)
 *
 * Soal test:
 * - `n=3`, edges `[[0,1],[1,2]]` → `2`.
 *
 * Contoh output:
 * - Graf kosong → `0`.
 *
 * @param {number[][]} edges
 */
export function undirectedEdgeCount(edges) {
  if (!Array.isArray(edges)) throw new TypeError("edges must be array");
  return edges.length;
}

/**
 * Judul: Komponen terhubung — jumlah
 *
 * Soal test:
 * - Dua edge terpisah → `2` komponen.
 *
 * @param {number[][]} adj
 */
export function countComponents(adj) {
  const n = adj.length;
  /** @type {boolean[]} */
  const seen = Array(n).fill(false);
  let c = 0;
  for (let i = 0; i < n; i++) {
    if (seen[i]) continue;
    c += 1;
    const stack = [i];
    while (stack.length) {
      const u = stack.pop();
      if (seen[u]) continue;
      seen[u] = true;
      for (const v of adj[u]) if (!seen[v]) stack.push(v);
    }
  }
  return c;
}
