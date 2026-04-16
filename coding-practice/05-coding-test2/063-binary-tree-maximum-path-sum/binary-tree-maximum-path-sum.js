/**
 * Binary Tree Maximum Path Sum
 * @see knowledge-base/05-coding-test2/063-binary-tree-maximum-path-sum.md
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
export function maxPathSum(root) {
  let best = -Infinity;
  function gain(n) {
    if (!n) return 0;
    const gL = Math.max(0, gain(n.left));
    const gR = Math.max(0, gain(n.right));
    best = Math.max(best, n.val + gL + gR);
    return n.val + Math.max(gL, gR);
  }
  gain(root);
  return best;
}
