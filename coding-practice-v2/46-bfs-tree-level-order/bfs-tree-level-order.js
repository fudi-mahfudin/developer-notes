/**
 * Judul: Topik 46 — BFS level-order (binary tree)
 *
 * Soal test:
 * - TreeNode + levelOrder: traversal per level `[[root],[children...]]`.
 * - treeHeight: tinggi pohon (edge count atau node count — di sini: kedalaman node dari root).
 *
 * Kontrak: pohon biner klasik `left`/`right`; null = tidak ada anak.
 *
 * Solusi: Queue BFS; level size = `queue.length` saat snapshot per level.
 *
 * @see knowledge-base/05-coding-interview-v2/46-bfs-tree-level-order.md
 *
 * Menjalankan tes: `pnpm test -- coding-practice-v2/46-bfs-tree-level-order/bfs-tree-level-order.test.js`
 */

/**
 * Judul: Node pohon biner
 *
 * Soal test:
 * - Dipakai untuk membangun struktur pada file tes.
 *
 * Kontrak: `val` number untuk kesederhanaan.
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
 * Judul: Level-order traversal
 *
 * Soal test:
 * - Pohon `[3,9,20,null,null,15,7]` → `[[3],[9,20],[15,7]]`.
 *
 * Kontrak: `root` boleh null → `[]`.
 *
 * Solusi: Queue BFS.
 *
 * @param {TreeNode | null} root
 * @returns {number[][]}
 */
export function levelOrder(root) {
  if (root === null) return [];
  /** @type {number[][]} */
  const res = [];
  /** @type {TreeNode[]} */
  const q = [root];
  while (q.length > 0) {
    const n = q.length;
    /** @type {number[]} */
    const level = [];
    for (let i = 0; i < n; i++) {
      const node = /** @type {TreeNode} */ (q.shift());
      level.push(node.val);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    res.push(level);
  }
  return res;
}

/**
 * Judul: Tinggi pohon (jumlah edge dari root ke daun terdalam)
 *
 * Soal test:
 * - Satu node → `0`; linear chain panjang 3 node → `2`.
 *
 * Kontrak: `root` boleh null → `-1` atau `0` — di sini null → `-1`.
 *
 * Solusi: `max(left,right)+1` dengan basis -1 untuk null.
 *
 * @param {TreeNode | null} root
 */
export function treeHeight(root) {
  if (root === null) return -1;
  return 1 + Math.max(treeHeight(root.left), treeHeight(root.right));
}

/**
 * Judul: Jumlah node dalam pohon
 *
 * Soal test:
 * - Pohon kosong → `0`; satu node → `1`.
 *
 * Kontrak: biner.
 *
 * Solusi: DFS rekursif.
 *
 * @param {TreeNode | null} root
 */
export function countNodes(root) {
  if (root === null) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

/**
 * Judul: Level-order flatten — satu array BFS
 *
 * Soal test:
 * - Urutan sama dengan BFS kiri-kanan per level.
 *
 * Kontrak: `root` boleh null → `[]`.
 *
 * Solusi: Gabung level arrays.
 *
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
export function levelOrderFlatten(root) {
  const levels = levelOrder(root);
  return levels.flat();
}

/**
 * Judul: Rata-rata nilai per level
 *
 * Soal test:
 * - Level `[10,20]` → rata-rata `15`.
 *
 * Kontrak: nilai number.
 *
 * Solusi: `levelOrder` + map mean.
 *
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
export function levelAverages(root) {
  return levelOrder(root).map((level) => level.reduce((a, b) => a + b, 0) / level.length);
}
