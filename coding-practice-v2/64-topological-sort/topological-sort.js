/**
 * Judul: Topik 64 — Topological sort (DAG) dan deteksi siklus
 *
 * Soal test eksplisit:
 * - topologicalSortKahn: untuk DAG, kembalikan salah satu urutan valid; jumlah node = n.
 * - Jika ada siklus → kembalikan array kosong [] (kontrak tidak melempar).
 * - topologicalSortDFS: alternatif DFS postorder reverse.
 *
 * Contoh output:
 * - Edges 0→1, 1→2 → order [0,1,2] (bukan unik).
 *
 * Solusi: Kahn — indegree, queue; DFS — rekursi + stack.
 *
 * @see knowledge-base/05-coding-interview-v2/64-topological-sort.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/64-topological-sort/topological-sort.test.js`
 */

/**
 * Judul: Bangun adjacency directed dari edge list
 *
 * Soal test eksplisit:
 * - n node, edges [u,v] berarti u harus sebelum v.
 *
 * Contoh output:
 * - Chain 0→1→2.
 *
 * @param {number} n
 * @param {number[][]} edges
 * @returns {number[][]}
 */
export function buildDirectedAdj(n, edges) {
  /** @type {number[][]} */
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
  }
  for (let i = 0; i < n; i++) adj[i].sort((a, b) => a - b);
  return adj;
}

/**
 * Judul: Kahn — topological sort (return [] jika siklus)
 *
 * Soal test eksplisit:
 * - DAG dengan 3 node linear → panjang 3.
 * - Siklus 0→1→0 → [].
 *
 * Contoh output:
 * - Diamond: 0→1, 0→2, 1→3, 2→3 → order valid dengan 0 sebelum 1,2 dan 1,2 sebelum 3.
 *
 * Solusi: hitung indegree; queue indegree 0; kurangi indegree neighbor.
 *
 * @param {number} n
 * @param {number[][]} edges
 * @returns {number[]}
 */
export function topologicalSortKahn(n, edges) {
  const adj = buildDirectedAdj(n, edges);
  /** @type {number[]} */
  const indeg = Array(n).fill(0);
  for (const [u, v] of edges) indeg[v] += 1;
  /** @type {number[]} */
  const q = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);
  /** @type {number[]} */
  const order = [];
  let qi = 0;
  while (qi < q.length) {
    const u = q[qi++];
    order.push(u);
    for (const v of adj[u]) {
      indeg[v] -= 1;
      if (indeg[v] === 0) q.push(v);
    }
  }
  if (order.length !== n) return [];
  return order;
}

/**
 * Judul: DFS postorder — topological sort (return [] jika siklus)
 *
 * Soal test eksplisit:
 * - Hasil sama validitas dengan Kahn pada DAG.
 *
 * Contoh output:
 * - White/Gray/Black — gray ketemu lagi → siklus.
 *
 * Solusi: states 0,1,2; append ke stack saat selesai.
 *
 * @param {number} n
 * @param {number[][]} edges
 * @returns {number[]}
 */
export function topologicalSortDFS(n, edges) {
  const adj = buildDirectedAdj(n, edges);
  /** @type {number[]} */
  const state = Array(n).fill(0);
  /** @type {number[]} */
  const stack = [];
  let hasCycle = false;

  /**
   * @param {number} u
   */
  function dfs(u) {
    if (hasCycle) return;
    state[u] = 1;
    for (const v of adj[u]) {
      if (state[v] === 0) dfs(v);
      else if (state[v] === 1) {
        hasCycle = true;
        return;
      } else if (state[v] === 2) {
        /* sudah selesai — tidak siklus dari sini */
      }
    }
    state[u] = 2;
    stack.push(u);
  }

  for (let i = 0; i < n; i++) if (state[i] === 0) dfs(i);
  if (hasCycle) return [];
  stack.reverse();
  return stack;
}

/**
 * Judul: Deteksi siklus pada directed graph
 *
 * Soal test eksplisit:
 * - Siklus → true; DAG → false.
 *
 * Contoh output:
 * - Self-loop [0,0] → true.
 *
 * Solusi: sama dengan DFS state atau Kahn order.length < n.
 *
 * @param {number} n
 * @param {number[][]} edges
 */
export function hasCycleDirected(n, edges) {
  return topologicalSortKahn(n, edges).length !== n;
}
