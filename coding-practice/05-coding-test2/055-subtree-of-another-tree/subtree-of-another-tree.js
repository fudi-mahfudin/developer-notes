/**
 * Subtree of Another Tree
 * @see knowledge-base/05-coding-test2/055-subtree-of-another-tree.md
 */
export class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function same(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.val === b.val && same(a.left, b.left) && same(a.right, b.right);
}

/**
 * @param {TreeNode|null} root
 * @param {TreeNode|null} subRoot
 * @returns {boolean}
 */
export function isSubtree(root, subRoot) {
  if (!subRoot) return true;
  if (!root) return false;
  return same(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
