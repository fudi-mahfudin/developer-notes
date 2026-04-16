/**
 * Count Good Nodes in Binary Tree
 * @see knowledge-base/05-coding-test2/059-count-good-nodes-in-binary-tree.md
 */
export class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param {TreeNode|null} root
 * @returns {number}
 */
export function goodNodes(root) {
  let count = 0;
  function dfs(n, mx) {
    if (!n) return;
    if (n.val >= mx) count++;
    const next = Math.max(mx, n.val);
    dfs(n.left, next);
    dfs(n.right, next);
  }
  dfs(root, -Infinity);
  return count;
}
