/**
 * Kth Smallest Element in a BST
 * @see knowledge-base/05-coding-interview-pembahasan/061-kth-smallest-element-in-a-bst.md
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
 * @param {number} k
 * @returns {number}
 */
export function kthSmallest(root, k) {
  const st = [];
  let n = root;
  while (n || st.length) {
    while (n) {
      st.push(n);
      n = n.left;
    }
    n = st.pop();
    k--;
    if (k === 0) return n.val;
    n = n.right;
  }
  return -1;
}
