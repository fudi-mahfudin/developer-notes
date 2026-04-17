/**
 * Maximum Depth of Binary Tree
 * @see knowledge-base/05-coding-interview-pembahasan/051-maximum-depth-of-binary-tree.md
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
export function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
