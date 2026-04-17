/**
 * Serialize and Deserialize Binary Tree
 * @see knowledge-base/05-coding-interview-pembahasan/064-serialize-and-deserialize-binary-tree.md
 */
export class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Preorder dengan marker N untuk null.
 * @param {TreeNode|null} root
 * @returns {string}
 */
export function serialize(root) {
  const parts = [];
  function dfs(n) {
    if (!n) {
      parts.push('N');
      return;
    }
    parts.push(String(n.val));
    dfs(n.left);
    dfs(n.right);
  }
  dfs(root);
  return parts.join(',');
}

/**
 * @param {string} data
 * @returns {TreeNode|null}
 */
export function deserialize(data) {
  if (!data) return null;
  const parts = data.split(',');
  let i = 0;
  function dfs() {
    const t = parts[i++];
    if (t === 'N') return null;
    const node = new TreeNode(Number(t));
    node.left = dfs();
    node.right = dfs();
    return node;
  }
  return dfs();
}
