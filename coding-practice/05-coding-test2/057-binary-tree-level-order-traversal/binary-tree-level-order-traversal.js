/**
 * Binary Tree Level Order Traversal
 * @see knowledge-base/05-coding-test2/057-binary-tree-level-order-traversal.md
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
 * @returns {number[][]}
 */
export function levelOrder(root) {
  if (!root) return [];
  const out = [];
  let q = [root];
  while (q.length) {
    const row = [];
    const next = [];
    for (const n of q) {
      row.push(n.val);
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    out.push(row);
    q = next;
  }
  return out;
}
