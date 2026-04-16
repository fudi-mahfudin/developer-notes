/**
 * Lowest Common Ancestor of a BST
 * @see knowledge-base/05-coding-test2/056-lowest-common-ancestor-of-a-bst.md
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @returns {TreeNode|null}
 */
export function lowestCommonAncestor(root, p, q) {
  let cur = root;
  while (cur) {
    if (p.val < cur.val && q.val < cur.val) cur = cur.left;
    else if (p.val > cur.val && q.val > cur.val) cur = cur.right;
    else return cur;
  }
  return null;
}
