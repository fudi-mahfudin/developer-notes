/**
 * Same Tree
 * @see knowledge-base/05-coding-test2/054-same-tree.md
 */
export class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param {TreeNode|null} p
 * @param {TreeNode|null} q
 * @returns {boolean}
 */
export function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
