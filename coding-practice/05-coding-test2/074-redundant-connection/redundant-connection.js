/**
 * Redundant Connection
 * @see knowledge-base/05-coding-test2/074-redundant-connection.md
 *
 * @param {number[][]} edges
 * @returns {number[]}
 */
export function findRedundantConnection(edges) {
  const parent = [];

  function find(x) {
    if (parent[x] === undefined) parent[x] = x;
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(a, b) {
    const pa = find(a);
    const pb = find(b);
    if (pa === pb) return false;
    parent[pa] = pb;
    return true;
  }

  let last = null;
  for (const [a, b] of edges) {
    if (!union(a, b)) last = [a, b];
  }
  return last;
}
