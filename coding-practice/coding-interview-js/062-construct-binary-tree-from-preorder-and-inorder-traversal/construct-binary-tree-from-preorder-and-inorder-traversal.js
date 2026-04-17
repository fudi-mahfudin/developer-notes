/**
 * Construct Binary Tree from Preorder and Inorder Traversal
 * @see knowledge-base/05-coding-interview-pembahasan/062-construct-binary-tree-from-preorder-and-inorder-traversal.md
 */
export class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @returns {TreeNode|null}
 */
export function buildTree(preorder, inorder) {
  const index = new Map(inorder.map((v, i) => [v, i]));
  let pre = 0;
  function dfs(lo, hi) {
    if (lo > hi) return null;
    const v = preorder[pre++];
    const mid = index.get(v);
    const node = new TreeNode(v);
    node.left = dfs(lo, mid - 1);
    node.right = dfs(mid + 1, hi);
    return node;
  }
  return dfs(0, inorder.length - 1);
}
