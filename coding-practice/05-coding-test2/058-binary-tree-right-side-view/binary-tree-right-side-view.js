/**
 * Binary Tree Right Side View
 * @see knowledge-base/05-coding-test2/058-binary-tree-right-side-view.md
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
 * @returns {number[]}
 */
export function rightSideView(root) {
  if (!root) return [];
  const out = [];
  let q = [root];
  while (q.length) {
    const next = [];
    for (let i = 0; i < q.length; i++) {
      const n = q[i];
      if (i === q.length - 1) out.push(n.val);
      if (n.left) next.push(n.left);
      if (n.right) next.push(n.right);
    }
    q = next;
  }
  return out;
}
