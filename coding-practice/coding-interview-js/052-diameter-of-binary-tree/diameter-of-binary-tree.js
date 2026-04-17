/**
 * Diameter of Binary Tree
 * @see knowledge-base/05-coding-interview-pembahasan/052-diameter-of-binary-tree.md
 */
export class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Panjang diameter = jumlah edge pada path terpanjang antar dua node.
 * @param {TreeNode|null} root
 * @returns {number}
 */
export function diameterOfBinaryTree(root) {
  let best = 0;
  function height(n) {
    if (!n) return 0;
    const L = height(n.left);
    const R = height(n.right);
    best = Math.max(best, L + R);
    return 1 + Math.max(L, R);
  }
  height(root);
  return best;
}
