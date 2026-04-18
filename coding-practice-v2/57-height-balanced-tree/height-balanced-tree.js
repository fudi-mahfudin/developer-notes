/**
 * Judul: Topik 57 — Height-balanced binary tree (selisih tinggi subtree ≤ 1)
 *
 * Soal test eksplisit:
 * - isBalanced: skew chain → `false`; pohon penuh kecil → `true`.
 * - isBalancedNaive: O(n log n) — harus setuju dengan `isBalanced` pada kasus uji.
 * - heightEdges: tinggi dalam **edge** (null = -1, satu node = 0).
 * - minDepthNodes: jalur terpendek root–daun dalam jumlah **node** (leaf-level minimum).
 *
 * Kontrak (opsional): definisi balance per node |h(left)−h(right)|≤1 dengan h dari `dfs` internal.
 *
 * Contoh output:
 * - Linked list 3 node: `isBalanced` → `false`.
 *
 * Solusi: bottom-up height; sentinel `-1` jika subtree tidak balance.
 *
 * @see knowledge-base/05-coding-interview-v2/57-height-balanced-tree.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/57-height-balanced-tree/height-balanced-tree.test.js`
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
 * Judul: Tinggi pohon (jumlah edge pada jalur terpanjang ke daun)
 *
 * Soal test:
 * - null → `-1` (atau 0 tergantung kontrak); di sini **edge height**: null = -1.
 * - satu node → `0`.
 *
 * Contoh output:
 * - height(single) → `0`.
 *
 * @param {TreeNode | null} root
 * @returns {number}
 */
export function heightEdges(root) {
  if (root === null) return -1;
  return 1 + Math.max(heightEdges(root.left), heightEdges(root.right));
}

/**
 * Judul: Apakah pohon seimbang tinggi
 *
 * Soal test:
 * - Linked list `1-2-3` (skew) → `false` (selisih >1).
 * - `1(2,3)` → `true`.
 *
 * Kontrak: `O(n)` satu pass; short-circuit `height` -1 jika tidak balance.
 *
 * Solusi: DFS kembalikan `{h, ok}` atau `-1` sentinel.
 *
 * @param {TreeNode | null} root
 * @returns {boolean}
 */
export function isBalanced(root) {
  /**
   * @returns {number} height atau -1 jika tidak balance
   */
  function dfs(n) {
    if (n === null) return 0;
    const lh = dfs(n.left);
    if (lh === -1) return -1;
    const rh = dfs(n.right);
    if (rh === -1) return -1;
    if (Math.abs(lh - rh) > 1) return -1;
    return 1 + Math.max(lh, rh);
  }
  return dfs(root) !== -1;
}

/**
 * Judul: Versi eksplisit (dua fungsi)
 *
 * Soal test:
 * - Sama boolean dengan `isBalanced`.
 *
 * @param {TreeNode | null} root
 */
export function isBalancedNaive(root) {
  if (root === null) return true;
  const lh = heightEdges(root.left);
  const rh = heightEdges(root.right);
  if (Math.abs(lh - rh) > 1) return false;
  return isBalancedNaive(root.left) && isBalancedNaive(root.right);
}

/**
 * Judul: Kedalaman maksimum (node count)
 *
 * Soal test:
 * - null → `-1` (konsisten edge height); satu node depth 0.
 *
 * @param {TreeNode | null} root
 */
export function maxDepthNodes(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepthNodes(root.left), maxDepthNodes(root.right));
}

/**
 * Judul: Minimum depth (jumlah node pada jalur root–daun terpendek)
 *
 * Soal test:
 * - null → `0`; hanya root → `1`; pohon `1(2,3)` → `2`.
 *
 * Contoh output:
 * - `1(null,2)` → `2` (jalur ke-2 lebih pendek dari turun kiri).
 *
 * Kontrak: daun = tidak punya kedua anak; jika satu anak null, jangan anggap leaf (definisi LC 111).
 *
 * Solusi: DFS `min(left,right)` dengan guard jika satu subtree kosong.
 *
 * @param {TreeNode | null} root
 * @returns {number}
 */
export function minDepthNodes(root) {
  if (root === null) return 0;
  if (root.left === null && root.right === null) return 1;
  if (root.left === null) return 1 + minDepthNodes(root.right);
  if (root.right === null) return 1 + minDepthNodes(root.left);
  return 1 + Math.min(minDepthNodes(root.left), minDepthNodes(root.right));
}

/**
 * Judul: Selisih maxDepth vs minDepth (indikator skew — bukan definisi balance resmi)
 *
 * Soal test:
 * - List panjang 4 → selisih besar.
 *
 * @param {TreeNode | null} root
 */
export function depthSpread(root) {
  return maxDepthNodes(root) - minDepthNodes(root);
}
