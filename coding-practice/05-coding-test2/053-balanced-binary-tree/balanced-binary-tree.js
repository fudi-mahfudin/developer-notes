/**
 * Balanced Binary Tree
 * @see knowledge-base/05-coding-test2/053-balanced-binary-tree.md
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
 * @returns {boolean}
 */
export function isBalanced(root) {
  function dfs(n) {
    if (!n) return 0;
    const L = dfs(n.left);
    const R = dfs(n.right);
    if (L === -1 || R === -1 || Math.abs(L - R) > 1) return -1;
    return 1 + Math.max(L, R);
  }
  return dfs(root) !== -1;
}
