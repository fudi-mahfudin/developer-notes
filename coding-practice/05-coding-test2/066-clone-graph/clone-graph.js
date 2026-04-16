/**
 * Clone Graph
 * @see knowledge-base/05-coding-test2/066-clone-graph.md
 */
export class GraphNode {
  /**
   * @param {number} val
   * @param {GraphNode[]} neighbors
   */
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * @param {GraphNode|null} node
 * @returns {GraphNode|null}
 */
export function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();
  function dfs(n) {
    if (map.has(n)) return map.get(n);
    const copy = new GraphNode(n.val);
    map.set(n, copy);
    for (const nb of n.neighbors) {
      copy.neighbors.push(dfs(nb));
    }
    return copy;
  }
  return dfs(node);
}
