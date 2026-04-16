/**
 * Invert Binary Tree
 * @see knowledge-base/05-coding-test2/050-invert-binary-tree.md
 */
export class TreeNode {
  /**
   * @param {number} val
   * @param {TreeNode|null} left
   * @param {TreeNode|null} right
   */
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param {TreeNode|null} root
 * @returns {TreeNode|null}
 */
export function invertTree(root) {
  if (!root) return null;
  const L = invertTree(root.left);
  const R = invertTree(root.right);
  root.left = R;
  root.right = L;
  return root;
}
