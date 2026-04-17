/**
 * Validate Binary Search Tree
 * @see knowledge-base/05-coding-interview-pembahasan/060-validate-binary-search-tree.md
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
export function isValidBST(root) {
  function dfs(n, lo, hi) {
    if (!n) return true;
    if (n.val <= lo || n.val >= hi) return false;
    return dfs(n.left, lo, n.val) && dfs(n.right, n.val, hi);
  }
  return dfs(root, -Infinity, Infinity);
}
