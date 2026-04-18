/**
 * Judul: Topik 58 — Lowest common ancestor (binary tree + BST + utilitas path)
 *
 * Soal test eksplisit:
 * - lowestCommonAncestor: `p`,`q` unik di pohon; return node paling bawah yang merupakan ancestor keduanya.
 * - lowestCommonAncestorBST: manfaatkan BST ordering O(h).
 * - pathFromRoot: untuk debugging / fixture — urutan nilai root ke `target` jika ada.
 * - findNodeByValue: cari pointer node by `val` (uji kecil, asumsi unik).
 *
 * Kontrak (opsional): untuk BT klasik, `p` dan `q` selalu ada; BST asumsikan key unik.
 *
 * Contoh output:
 * - `3(5,1)` dengan `p=5`,`q=1` → LCA = `3`.
 *
 * Solusi: BT — post-order bubble; BST — walk interval [min(p,q), max(p,q)].
 *
 * @see knowledge-base/05-coding-interview-v2/58-lowest-common-ancestor.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/58-lowest-common-ancestor/lowest-common-ancestor.test.js`
 */

export class TreeNode {
  /**
   * @param {number} val
   * @param {TreeNode | null} [left]
   * @param {TreeNode | null} [right]
   */
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Judul: LCA — asumsi `p` dan `q` ada di subtree
 *
 * Soal test:
 * - Pohon `3(5,1)` dengan `5` dan `1` → `3`.
 *
 * Contoh output:
 * - `lowestCommonAncestor(root, node5, node1)` → root `3`.
 *
 * Kontrak: pointer `p`,`q` valid; tidak perlu handle jika tidak ada.
 *
 * Solusi: Jika `root` sama `p` atau `q` return root; else cari kiri/kanan.
 *
 * @param {TreeNode | null} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @returns {TreeNode | null}
 */
export function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left !== null && right !== null) return root;
  return left !== null ? left : right;
}

/**
 * Judul: LCA pada BST
 *
 * Soal test:
 * - `p.val < root.val < q.val` → turun kiri/kanan sesuai interval.
 *
 * Contoh output:
 * - BST `[6,2,8,0,4,7,9]` (level) — LCA(2,8)=6.
 *
 * @param {TreeNode | null} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @returns {TreeNode | null}
 */
export function lowestCommonAncestorBST(root, p, q) {
  let cur = root;
  const pv = p.val;
  const qv = q.val;
  const lo = Math.min(pv, qv);
  const hi = Math.max(pv, qv);
  while (cur !== null) {
    if (cur.val > hi) cur = cur.left;
    else if (cur.val < lo) cur = cur.right;
    else return cur;
  }
  return null;
}

/**
 * Judul: Path dari root ke node (nilai), jika struktur unik
 *
 * Soal test:
 * - Hanya untuk tes kecil; return `null` jika tidak ketemu.
 *
 * @param {TreeNode | null} root
 * @param {number} target
 * @returns {number[] | null}
 */
export function pathFromRoot(root, target) {
  /** @type {number[] | null} */
  let result = null;
  function dfs(n, path) {
    if (n === null || result !== null) return;
    const next = [...path, n.val];
    if (n.val === target) {
      result = next;
      return;
    }
    dfs(n.left, next);
    dfs(n.right, next);
  }
  dfs(root, []);
  return result;
}

/**
 * Judul: Cari node dengan nilai tertentu (DFS, asumsi unik pada tes kecil)
 *
 * Soal test:
 * - Pohon `3(5,1)` — find `5` → node kiri.
 *
 * Contoh output:
 * - Tidak ada → `null`.
 *
 * @param {TreeNode | null} root
 * @param {number} val
 * @returns {TreeNode | null}
 */
export function findNodeByValue(root, val) {
  if (root === null) return null;
  if (root.val === val) return root;
  return findNodeByValue(root.left, val) ?? findNodeByValue(root.right, val);
}
